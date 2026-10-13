import { ISourceAdapter } from './adapter';
import { HomeAssistant, HassEntity, TimeRange } from '../types';
import { ChronicleEvent, SeverityLevel } from '../models/event';
import { SourceConfig } from '../models/config';
import { resolveIcon, resolveColor } from '../utils/icon-resolver';

interface HistoryState {
  entity_id: string;
  state: string;
  attributes?: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

/**
 * Compressed state from `history/history_during_period`: `s` state, `a`
 * attributes (first entry, or all entries without minimal_response), `lu`
 * last_updated and `lc` last_changed as epoch seconds (`lc` omitted when equal
 * to `lu`; minimal-response entries carry last_changed in `lu`).
 */
interface CompressedHistoryState {
  s: string;
  a?: Record<string, unknown>;
  lu: number;
  lc?: number;
}

const epochToISO = (epoch: number) => new Date(epoch * 1000).toISOString();

const UNTRACKED_STATES = new Set(['unavailable', 'unknown']);

// ---------------------------------------------------------------------------
// Device-class → category mapping for binary sensors
// ---------------------------------------------------------------------------

const BINARY_SENSOR_CATEGORY: Record<string, string> = {
  door: 'door', opening: 'door', garage_door: 'door', window: 'door',
  lock: 'lock',
  motion: 'motion', occupancy: 'motion', presence: 'person',
  vibration: 'motion',
  smoke: 'security', gas: 'security', co: 'security',
  moisture: 'climate', heat: 'climate', cold: 'climate',
  tamper: 'security', safety: 'security', problem: 'system',
  connectivity: 'system', battery: 'system',
  power: 'system', plug: 'system', running: 'system',
  sound: 'motion', light: 'light',
};

const DOMAIN_CATEGORY: Record<string, string> = {
  person: 'person',
  device_tracker: 'person',
  sensor: 'system',
  light: 'light',
  switch: 'automation',
  lock: 'lock',
  cover: 'door',
  climate: 'climate',
  camera: 'camera',
  alarm_control_panel: 'security',
  automation: 'automation',
  vacuum: 'automation',
  media_player: 'system',
  fan: 'climate',
};

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

export class HistoryAdapter implements ISourceAdapter {
  readonly type = 'history';
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

  /** Resolve the effective state filter for an entity (per-entity → source-level → null). */
  private getStateFilter(entityId: string): Set<string> | null {
    const perEntity = this.config.entity_config?.[entityId]?.state_filter;
    if (perEntity?.length) return new Set(perEntity.map(s => s.toLowerCase()));
    if (this.config.state_filter?.length) return new Set(this.config.state_filter.map(s => s.toLowerCase()));
    return null;
  }

  /** Per-state attributes are needed for templates and show_attributes. */
  private needsAttributes(): boolean {
    const entityConfs = Object.values(this.config.entity_config ?? {});
    return !!(
      this.config.image_template ||
      this.config.clip_template ||
      this.config.show_attributes?.length ||
      entityConfs.some((c) => c.image_template || c.clip_template || c.show_attributes?.length)
    );
  }

  /** True when prev → curr is a real, unfiltered state transition. */
  private isTransition(entityId: string, prev: HistoryState, curr: HistoryState): boolean {
    // Guard null/undefined before any string ops (attribute-only entries)
    if (curr.state == null || prev.state == null) return false;
    if (prev.state === curr.state) return false;
    if (UNTRACKED_STATES.has(curr.state) || UNTRACKED_STATES.has(prev.state)) return false;
    const stateFilter = this.getStateFilter(entityId);
    return !stateFilter || stateFilter.has(curr.state.toLowerCase());
  }

  async fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]> {
    const entities = this.getEntities();
    if (entities.length === 0) {
      console.warn('[chronicle-card] HistoryAdapter: no entities configured');
      return [];
    }

    try {
      const withAttributes = this.needsAttributes();
      const end = Math.min(range.end.getTime(), Date.now());
      const response = await hass.callWS<Record<string, CompressedHistoryState[]>>({
        type: 'history/history_during_period',
        start_time: range.start.toISOString(),
        end_time: new Date(end).toISOString(),
        entity_ids: entities,
        minimal_response: !withAttributes,
        no_attributes: !withAttributes,
        significant_changes_only: true,
      });

      if (!response || typeof response !== 'object') {
        console.warn('[chronicle-card] HistoryAdapter: unexpected response format');
        return [];
      }

      const events: ChronicleEvent[] = [];
      for (const [entityId, compressed] of Object.entries(response)) {
        if (!Array.isArray(compressed)) continue;
        let prev: HistoryState | undefined;
        for (const c of compressed) {
          const lastChanged = epochToISO(c.lc ?? c.lu);
          const curr: HistoryState = {
            entity_id: entityId,
            state: c.s,
            // Without minimal_response every entry carries its attributes
            attributes: c.a ?? prev?.attributes,
            last_changed: lastChanged,
            last_updated: epochToISO(c.lu),
          };
          if (prev && this.isTransition(entityId, prev, curr)) {
            events.push(this.stateChangeToEvent(hass, entityId, prev, curr));
          }
          prev = curr;
        }
      }

      return events;
    } catch (err) {
      console.warn('[chronicle-card] HistoryAdapter: failed to fetch events', err);
      return [];
    }
  }

  processStateChanges(hass: HomeAssistant, oldHass: HomeAssistant): ChronicleEvent[] {
    const events: ChronicleEvent[] = [];
    for (const entityId of this.getEntities()) {
      const curr = hass.states[entityId];
      const prev = oldHass.states[entityId];
      if (!curr || !prev || curr === prev) continue;
      if (this.isTransition(entityId, prev, curr)) {
        events.push(this.stateChangeToEvent(hass, entityId, prev, curr));
      }
    }
    return events;
  }

  /** Get the device_class from the current HA state, or from attributes snapshot. */
  private getDeviceClass(hass: HomeAssistant, entityId: string, state: HistoryState): string {
    // Live state is more reliable (minimal_response strips attributes)
    const liveEntity = hass.states[entityId];
    if (liveEntity?.attributes?.device_class) {
      return String(liveEntity.attributes.device_class);
    }
    if (state.attributes?.device_class) {
      return String(state.attributes.device_class);
    }
    return '';
  }

  /**
   * Translate a raw state into a label: user state_map (entity → source),
   * then HA's own localized, device-class-aware formatting.
   */
  private humanizeState(hass: HomeAssistant, stateObj: HassEntity, state: string): string {
    const entityId = stateObj.entity_id;
    const userLabel = this.config.entity_config?.[entityId]?.state_map?.[state] ?? this.config.state_map?.[state];
    if (userLabel) return userLabel;

    if (hass.formatEntityState) {
      try {
        return hass.formatEntityState(stateObj, state);
      } catch {
        /* fall through */
      }
    }
    return state.charAt(0).toUpperCase() + state.slice(1).replace(/_/g, ' ');
  }

  /** Detect the event category based on device_class and domain. */
  private detectCategory(entityId: string, deviceClass: string): string {
    const domain = entityId.split('.')[0];

    // Binary sensor — use device_class for fine-grained category
    if (domain === 'binary_sensor' && deviceClass) {
      return BINARY_SENSOR_CATEGORY[deviceClass] || 'default';
    }

    return DOMAIN_CATEGORY[domain] || 'default';
  }

  /**
   * Strip leading words from a label that overlap with trailing words of the
   * display name, so "Doorbell Motion" + "Motion Cleared" → "Doorbell Motion Cleared"
   * instead of "Doorbell Motion Motion Cleared".
   */
  private stripOverlap(name: string, label: string): string {
    const nameWords = name.toLowerCase().split(/\s+/);
    const labelParts = label.split(/\s+/);
    const labelLower = labelParts.map(w => w.toLowerCase());

    for (let len = Math.min(nameWords.length, labelLower.length); len > 0; len--) {
      const tail = nameWords.slice(-len);
      const head = labelLower.slice(0, len);
      if (tail.every((w, i) => w === head[i])) {
        const remainder = labelParts.slice(len).join(' ');
        return remainder || label;
      }
    }
    return label;
  }

  /** "Temperature 21.5 °C · Mode Heat" via HA's attribute formatters. */
  private formatAttributes(
    hass: HomeAssistant,
    stateObj: HassEntity,
    names: string[],
    attributes: Record<string, unknown>,
  ): string {
    return names
      .map((name) => {
        const v = attributes[name];
        if (v == null || v === '' || typeof v === 'object') return null;
        const label = hass.formatEntityAttributeName?.(stateObj, name) ?? name.replace(/_/g, ' ');
        let value: string;
        try {
          value = hass.formatEntityAttributeValue?.(stateObj, name, v) ?? String(v);
        } catch {
          value = String(v);
        }
        return `${label}: ${value}`;
      })
      .filter(Boolean)
      .join(' \u00b7 ');
  }

  private stateChangeToEvent(
    hass: HomeAssistant,
    entityId: string,
    prevState: HistoryState,
    currState: HistoryState,
  ): ChronicleEvent {
    const deviceClass = this.getDeviceClass(hass, entityId, currState);
    const category = this.detectCategory(entityId, deviceClass);
    const liveEntity = hass.states[entityId];
    const friendlyName = (liveEntity?.attributes?.friendly_name as string) || entityId;
    const entityConf = this.config.entity_config?.[entityId];

    // Per-entity name > friendly name for multi-entity; source name > friendly name for single-entity
    const isMultiEntity = this.getEntities().length > 1;
    const displayName = entityConf?.name
      || (isMultiEntity ? friendlyName : (this.config.name || friendlyName));

    // Shallow-merge live and historical attributes: per-state values win for
    // keys present at that snapshot; keys that only exist on the current
    // entity fall back to the live value rather than rendering empty.
    const attributes = { ...(liveEntity?.attributes ?? {}), ...(currState.attributes ?? {}) };

    // Formatting needs a state object (device_class, unit, translation key);
    // the live one is authoritative, the historical snapshot is the fallback.
    const stateObj: HassEntity = liveEntity ?? {
      entity_id: entityId,
      state: currState.state,
      attributes,
      last_changed: currState.last_changed,
      last_updated: currState.last_updated,
    };

    const newLabel = this.humanizeState(hass, stateObj, currState.state);
    const oldLabel = this.humanizeState(hass, stateObj, prevState.state);

    // Smart title: strip word overlap so "Doorbell Motion" + "Motion Cleared" → "Doorbell Motion Cleared"
    const title = `${displayName} ${this.stripOverlap(displayName, newLabel)}`;
    const description = `${this.stripOverlap(displayName, oldLabel)} \u2192 ${this.stripOverlap(displayName, newLabel)}`;

    const showAttrs = entityConf?.show_attributes ?? this.config.show_attributes;
    const details = showAttrs?.length ? this.formatAttributes(hass, stateObj, showAttrs, attributes) : '';

    // Per-state overrides win over per-entity, which win over the fuzzy chain:
    // state_icon/state_color[state] (entity > source) → icon/color → resolve*()
    const effectiveIcon = entityConf?.state_icon?.[currState.state]
      || this.config.state_icon?.[currState.state]
      || entityConf?.icon
      || resolveIcon(title, category, undefined, this.config.icon_map, this.config.default_icon);
    const effectiveColor = entityConf?.state_color?.[currState.state]
      || this.config.state_color?.[currState.state]
      || entityConf?.color
      || resolveColor(title, category, undefined, this.config.color_map, this.config.default_color);
    const effectiveSeverity = (entityConf?.severity || this.config.default_severity || 'info') as SeverityLevel;

    const start = new Date(currState.last_changed).toISOString();

    return {
      id: `history:${entityId}:${new Date(start).getTime()}`,
      sourceType: 'history',
      sourceId: this.config.name || 'history',
      title,
      description,
      details: details || undefined,
      start,
      end: start,
      icon: effectiveIcon,
      color: effectiveColor,
      category,
      severity: effectiveSeverity,
      entityId,
      actions: this.config.actions,
      tapAction: entityConf?.tap_action || this.config.tap_action,
      holdAction: entityConf?.hold_action || this.config.hold_action,
      metadata: {
        old_state: prevState.state,
        new_state: currState.state,
        old_label: oldLabel,
        new_label: newLabel,
        device_class: deviceClass,
        last_updated: currState.last_updated,
        attributes,
        source_name: this.config.name || 'history',
        _image_template: entityConf?.image_template || this.config.image_template,
        _clip_template: entityConf?.clip_template || this.config.clip_template,
      },
    };
  }
}
