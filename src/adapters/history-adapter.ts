import { ISourceAdapter } from './adapter';
import { HomeAssistant, TimeRange } from '../types';
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

// ---------------------------------------------------------------------------
// Device-class-aware state labels
// ---------------------------------------------------------------------------

/** Maps device_class → { state → human label } for binary sensors. */
const BINARY_SENSOR_LABELS: Record<string, Record<string, string>> = {
  door:          { on: 'Opened',           off: 'Closed' },
  opening:       { on: 'Opened',           off: 'Closed' },
  garage_door:   { on: 'Opened',           off: 'Closed' },
  window:        { on: 'Opened',           off: 'Closed' },
  lock:          { on: 'Unlocked',         off: 'Locked' },
  motion:        { on: 'Motion Detected',  off: 'Motion Cleared' },
  occupancy:     { on: 'Occupied',         off: 'Unoccupied' },
  presence:      { on: 'Present',          off: 'Away' },
  smoke:         { on: 'Smoke Detected',   off: 'Clear' },
  moisture:      { on: 'Wet',              off: 'Dry' },
  gas:           { on: 'Gas Detected',     off: 'Clear' },
  co:            { on: 'CO Detected',      off: 'Clear' },
  vibration:     { on: 'Vibration',        off: 'Still' },
  tamper:        { on: 'Tampered',         off: 'Secure' },
  safety:        { on: 'Unsafe',           off: 'Safe' },
  power:         { on: 'On',              off: 'Off' },
  plug:          { on: 'Plugged In',       off: 'Unplugged' },
  sound:         { on: 'Sound Detected',   off: 'Quiet' },
  problem:       { on: 'Problem',          off: 'OK' },
  connectivity:  { on: 'Connected',        off: 'Disconnected' },
  battery:       { on: 'Low',              off: 'Normal' },
  running:       { on: 'Running',          off: 'Stopped' },
  heat:          { on: 'Hot',              off: 'Normal' },
  cold:          { on: 'Cold',             off: 'Normal' },
  light:         { on: 'Light Detected',   off: 'Dark' },
};

/** Domain-level state labels for non-binary-sensor entities. */
const DOMAIN_STATE_LABELS: Record<string, Record<string, string>> = {
  lock: {
    locked: 'Locked', unlocked: 'Unlocked', jammed: 'Jammed',
    locking: 'Locking', unlocking: 'Unlocking',
  },
  cover: {
    open: 'Opened', closed: 'Closed', opening: 'Opening', closing: 'Closing',
  },
  alarm_control_panel: {
    armed_away: 'Armed Away', armed_home: 'Armed Home',
    armed_night: 'Armed Night', armed_vacation: 'Armed Vacation',
    armed_custom_bypass: 'Armed Custom', disarmed: 'Disarmed',
    triggered: 'Triggered', pending: 'Pending', arming: 'Arming',
  },
  person: {
    home: 'Home', not_home: 'Away',
  },
  device_tracker: {
    home: 'Home', not_home: 'Away',
  },
  light: { on: 'On', off: 'Off' },
  switch: { on: 'On', off: 'Off' },
  fan: { on: 'On', off: 'Off' },
  input_boolean: { on: 'On', off: 'Off' },
  climate: {
    off: 'Off', heat: 'Heating', cool: 'Cooling', auto: 'Auto',
    heat_cool: 'Heat/Cool', fan_only: 'Fan Only', dry: 'Dry',
  },
  vacuum: {
    cleaning: 'Cleaning', docked: 'Docked', returning: 'Returning',
    idle: 'Idle', paused: 'Paused', error: 'Error',
  },
  media_player: {
    playing: 'Playing', paused: 'Paused', idle: 'Idle',
    standby: 'Standby', off: 'Off', on: 'On', buffering: 'Buffering',
  },
};

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

  async fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]> {
    const entities = this.getEntities();
    if (entities.length === 0) {
      console.warn('[chronicle-card] HistoryAdapter: no entities configured');
      return [];
    }

    try {
      const startISO = range.start.toISOString();
      const endISO = range.end.toISOString();
      const entityFilter = entities.join(',');
      const path = `history/period/${startISO}?filter_entity_id=${entityFilter}&end_time=${endISO}&minimal_response`;

      const response = await hass.callApi<HistoryState[][]>('GET', path);

      if (!Array.isArray(response)) {
        console.warn('[chronicle-card] HistoryAdapter: unexpected response format');
        return [];
      }

      const events: ChronicleEvent[] = [];

      for (const entityHistory of response) {
        if (!Array.isArray(entityHistory) || entityHistory.length === 0) {
          continue;
        }

        for (let i = 1; i < entityHistory.length; i++) {
          const prev = entityHistory[i - 1];
          const curr = entityHistory[i];
          const entityId = curr.entity_id || entityHistory[0].entity_id;

          if (!entityId) continue;

          // Skip unavailable/unknown transitions — they're noise
          if (curr.state === 'unavailable' || curr.state === 'unknown') continue;
          if (prev.state === 'unavailable' || prev.state === 'unknown') continue;

          const event = this.stateChangeToEvent(hass, entityId, prev, curr);
          events.push(event);
        }
      }

      return events;
    } catch (err) {
      console.warn('[chronicle-card] HistoryAdapter: failed to fetch events', err);
      return [];
    }
  }

  async subscribeLive(
    hass: HomeAssistant,
    onEvent: (e: ChronicleEvent) => void,
  ): Promise<() => void> {
    const entities = new Set(this.getEntities());

    const unsubscribe = await hass.connection.subscribeEvents((hassEvent) => {
      const data = hassEvent.data as {
        entity_id?: string;
        old_state?: HistoryState;
        new_state?: HistoryState;
      };

      const entityId = data.entity_id;
      if (!entityId || !entities.has(entityId)) {
        return;
      }

      if (!data.old_state || !data.new_state) {
        return;
      }

      if (data.old_state.state === data.new_state.state) {
        return;
      }

      // Skip unavailable/unknown
      if (data.new_state.state === 'unavailable' || data.new_state.state === 'unknown') return;
      if (data.old_state.state === 'unavailable' || data.old_state.state === 'unknown') return;

      const event = this.stateChangeToEvent(hass, entityId, data.old_state, data.new_state);
      onEvent(event);
    }, 'state_changed');

    return unsubscribe;
  }

  private getEntities(): string[] {
    const entities: string[] = [];
    if (this.config.entity) {
      entities.push(this.config.entity);
    }
    if (this.config.entities) {
      entities.push(...this.config.entities);
    }
    return entities;
  }

  /** Get the device_class from the current HA state, or from attributes snapshot. */
  private getDeviceClass(hass: HomeAssistant, entityId: string, state: HistoryState): string {
    // Live state is more reliable (minimal_response strips attributes)
    const liveEntity = hass.states[entityId];
    if (liveEntity?.attributes?.device_class) {
      return String(liveEntity.attributes.device_class);
    }
    // Fall back to history snapshot attributes
    if (state.attributes?.device_class) {
      return String(state.attributes.device_class);
    }
    return '';
  }

  /** Translate a raw state value into a human label. */
  private humanizeState(
    entityId: string,
    state: string,
    deviceClass: string,
  ): string {
    // 1. User-provided state_map takes priority
    const userLabel = this.config.state_map?.[state];
    if (userLabel) return userLabel;

    const domain = entityId.split('.')[0];

    // 2. Binary sensor — check device_class-specific labels
    if (domain === 'binary_sensor' && deviceClass) {
      const dcLabels = BINARY_SENSOR_LABELS[deviceClass];
      if (dcLabels?.[state]) return dcLabels[state];
    }

    // 3. Domain-level labels
    const domainLabels = DOMAIN_STATE_LABELS[domain];
    if (domainLabels?.[state]) return domainLabels[state];

    // 4. Generic on/off
    if (state === 'on') return 'On';
    if (state === 'off') return 'Off';

    // 5. Capitalize raw state
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

  private stateChangeToEvent(
    hass: HomeAssistant,
    entityId: string,
    prevState: HistoryState,
    currState: HistoryState,
  ): ChronicleEvent {
    const deviceClass = this.getDeviceClass(hass, entityId, currState);
    const category = this.detectCategory(entityId, deviceClass);
    const friendlyName = hass.states[entityId]?.attributes?.friendly_name as string || entityId;

    const newLabel = this.humanizeState(entityId, currState.state, deviceClass);
    const oldLabel = this.humanizeState(entityId, prevState.state, deviceClass);

    // Clean title: "Front Door Opened" instead of "Front Door: on -> off"
    const title = `${friendlyName} ${newLabel}`;
    const description = `${oldLabel} \u2192 ${newLabel}`;

    return {
      id: `history:${entityId}:${currState.last_changed}`,
      sourceType: 'history',
      sourceId: this.config.name || 'history',
      title,
      description,
      start: currState.last_changed,
      end: currState.last_changed,
      icon: resolveIcon(title, category, undefined, this.config.icon_map, this.config.default_icon),
      color: resolveColor(title, category, undefined, this.config.color_map, this.config.default_color),
      category,
      severity: (this.config.default_severity || 'info') as SeverityLevel,
      entityId,
      entityName: friendlyName,
      actions: this.config.actions,
      metadata: {
        old_state: prevState.state,
        new_state: currState.state,
        old_label: oldLabel,
        new_label: newLabel,
        device_class: deviceClass,
        last_updated: currState.last_updated,
      },
    };
  }
}
