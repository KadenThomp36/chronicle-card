import { ISourceAdapter } from './adapter';
import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, SeverityLevel } from '../models/event';
import { SourceConfig } from '../models/config';
import { resolveIcon, resolveColor } from '../utils/icon-resolver';

/** Entry shape returned by the `logbook/get_events` WS command. */
interface LogbookEntry {
  when: number | string;
  name?: string;
  message?: string;
  entity_id?: string;
  state?: string;
  icon?: string;
  domain?: string;
  source?: string;
  context_service?: string;
  context_event_type?: string;
}

/** Domain → Chronicle category (subset relevant to logbook entries). */
const DOMAIN_CATEGORY: Record<string, string> = {
  person: 'person',
  device_tracker: 'person',
  light: 'light',
  switch: 'automation',
  lock: 'lock',
  cover: 'door',
  climate: 'climate',
  camera: 'camera',
  alarm_control_panel: 'security',
  automation: 'automation',
  script: 'automation',
  scene: 'automation',
  vacuum: 'automation',
  media_player: 'system',
  fan: 'climate',
  sensor: 'system',
};

/**
 * Logbook source adapter.
 *
 * Fetches events from HA's logbook API, which records automation/script
 * triggers even when the state change is too fast for the history DB to
 * capture (e.g. automations that fire and return to idle within milliseconds).
 * Poll-based — the logbook has no lightweight push channel, so live updates
 * arrive on the next poll (`poll_interval`).
 */
export class LogbookAdapter implements ISourceAdapter {
  readonly type = 'logbook';
  private config!: SourceConfig;

  configure(config: SourceConfig): void {
    this.config = config;
  }

  private getEntities(): string[] {
    const list: string[] = [];
    if (this.config.entities?.length) {
      list.push(...this.config.entities);
    }
    if (this.config.entity && !list.includes(this.config.entity)) {
      list.push(this.config.entity);
    }
    return list;
  }

  async fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]> {
    const entities = this.getEntities();
    if (entities.length === 0) {
      console.warn('[chronicle-card] LogbookAdapter: no entities configured');
      return [];
    }

    try {
      const response = await hass.callWS<LogbookEntry[]>({
        type: 'logbook/get_events',
        start_time: range.start.toISOString(),
        end_time: new Date(Math.min(range.end.getTime(), Date.now())).toISOString(),
        entity_ids: entities,
      });

      if (!Array.isArray(response)) return [];
      return response
        .filter((entry) => entry && entry.when != null)
        .map((entry) => this.entryToEvent(hass, entry));
    } catch (err) {
      console.warn('[chronicle-card] LogbookAdapter: failed to fetch events', err);
      return [];
    }
  }

  /** Normalize the `when` field (WS returns seconds; REST returns ISO). */
  private whenToISO(when: number | string): string {
    if (typeof when === 'string') {
      const parsed = new Date(when);
      return isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
    }
    // Heuristic: values above 1e12 are already milliseconds
    const ms = when > 1e12 ? when : when * 1000;
    return new Date(ms).toISOString();
  }

  private entryToEvent(hass: HomeAssistant, entry: LogbookEntry): ChronicleEvent {
    const entityId = entry.entity_id;
    const domain = entry.domain || entityId?.split('.')[0] || '';
    const category = DOMAIN_CATEGORY[domain] || 'default';
    const entityConf = entityId ? this.config.entity_config?.[entityId] : undefined;

    const friendlyName = entityId
      ? (hass.states[entityId]?.attributes?.friendly_name as string | undefined)
      : undefined;
    const displayName = entityConf?.name || entry.name || friendlyName || entityId || 'Logbook';

    // Logbook entries read naturally as "<name> <message>", e.g.
    // "Noise above 30dB triggered by state of binary_sensor.entry_sound"
    const message = entry.message || (entry.state ? `→ ${entry.state}` : '');
    const title = message ? `${displayName} ${message}` : displayName;

    const startISO = this.whenToISO(entry.when);

    const effectiveIcon = entityConf?.icon
      || entry.icon
      || resolveIcon(title, category, undefined, this.config.icon_map, this.config.default_icon);
    const effectiveColor = entityConf?.color
      || resolveColor(title, category, undefined, this.config.color_map, this.config.default_color);
    const effectiveSeverity = (entityConf?.severity || this.config.default_severity || 'info') as SeverityLevel;

    return {
      id: `logbook:${entityId || domain || 'ha'}:${startISO}`,
      sourceType: 'logbook',
      sourceId: this.config.name || 'logbook',
      title,
      description: entry.message || '',
      start: startISO,
      end: startISO,
      icon: effectiveIcon,
      color: effectiveColor,
      category,
      severity: effectiveSeverity,
      entityId,
      entityName: displayName,
      actions: this.config.actions,
      tapAction: entityConf?.tap_action || this.config.tap_action,
      holdAction: entityConf?.hold_action || this.config.hold_action,
      metadata: {
        domain,
        state: entry.state,
        context_service: entry.context_service,
        context_event_type: entry.context_event_type,
        source_name: this.config.name || 'logbook',
      },
    };
  }
}
