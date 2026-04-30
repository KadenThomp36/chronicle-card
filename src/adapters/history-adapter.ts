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

  /** True if any per-entity config has an image_template. */
  private hasEntityImageTemplates(): boolean {
    if (!this.config.entity_config) return false;
    return Object.values(this.config.entity_config).some(c => !!c.image_template);
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
      // Skip minimal_response when image_template is configured — we need full attributes for template context
      const needsAttributes = !!(this.config.image_template || this.hasEntityImageTemplates());
      const path = `history/period/${startISO}?filter_entity_id=${entities.join(',')}&end_time=${endISO}${needsAttributes ? '' : '&minimal_response'}`;

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

          // Skip if state didn't actually change (attribute-only updates)
          if (prev.state === curr.state) continue;

          // Skip unavailable/unknown transitions
          if (curr.state === 'unavailable' || curr.state === 'unknown') continue;
          if (prev.state === 'unavailable' || prev.state === 'unknown') continue;

          // Apply per-entity or source-level state filter
          const stateFilter = this.getStateFilter(entityId);
          if (stateFilter && !stateFilter.has(curr.state.toLowerCase())) continue;

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
    const entities = this.getEntities();
    if (entities.length === 0) return () => {};

    const entitySet = new Set(entities);

    const unsubscribe = await hass.connection.subscribeEvents((hassEvent) => {
      const data = hassEvent.data as {
        entity_id?: string;
        old_state?: HistoryState;
        new_state?: HistoryState;
      };

      if (!data.entity_id || !entitySet.has(data.entity_id)) return;
      if (!data.old_state || !data.new_state) return;
      if (data.old_state.state === data.new_state.state) return;

      // Skip unavailable/unknown
      if (data.new_state.state === 'unavailable' || data.new_state.state === 'unknown') return;
      if (data.old_state.state === 'unavailable' || data.old_state.state === 'unknown') return;

      // Apply per-entity or source-level state filter
      const stateFilter = this.getStateFilter(data.entity_id);
      if (stateFilter && !stateFilter.has(data.new_state.state.toLowerCase())) return;

      const event = this.stateChangeToEvent(hass, data.entity_id, data.old_state, data.new_state);
      onEvent(event);
    }, 'state_changed');

    return unsubscribe;
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
    // 1. Per-entity state_map takes highest priority
    const entityLabel = this.config.entity_config?.[entityId]?.state_map?.[state];
    if (entityLabel) return entityLabel;

    // 2. Source-level state_map
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

  private stateChangeToEvent(
    hass: HomeAssistant,
    entityId: string,
    prevState: HistoryState,
    currState: HistoryState,
  ): ChronicleEvent {
    const deviceClass = this.getDeviceClass(hass, entityId, currState);
    const category = this.detectCategory(entityId, deviceClass);
    const friendlyName = hass.states[entityId]?.attributes?.friendly_name as string || entityId;
    const entityConf = this.config.entity_config?.[entityId];

    // Per-entity name > friendly name for multi-entity; source name > friendly name for single-entity
    const isMultiEntity = this.getEntities().length > 1;
    const displayName = entityConf?.name
      || (isMultiEntity ? friendlyName : (this.config.name || friendlyName));

    const newLabel = this.humanizeState(entityId, currState.state, deviceClass);
    const oldLabel = this.humanizeState(entityId, prevState.state, deviceClass);

    // Smart title: strip word overlap so "Doorbell Motion" + "Motion Cleared" → "Doorbell Motion Cleared"
    const title = `${displayName} ${this.stripOverlap(displayName, newLabel)}`;

    // Short description: strip the same overlap from both labels
    const shortOld = this.stripOverlap(displayName, oldLabel);
    const shortNew = this.stripOverlap(displayName, newLabel);
    const description = `${shortOld} \u2192 ${shortNew}`;

    // Per-entity overrides for icon, color, severity
    const effectiveIcon = entityConf?.icon
      || resolveIcon(title, category, undefined, this.config.icon_map, this.config.default_icon);
    const effectiveColor = entityConf?.color
      || resolveColor(title, category, undefined, this.config.color_map, this.config.default_color);
    const effectiveSeverity = (entityConf?.severity || this.config.default_severity || 'info') as SeverityLevel;

    // Resolve image_template and action overrides (per-entity > source-level)
    const imageTemplate = entityConf?.image_template || this.config.image_template;
    const tapAction = entityConf?.tap_action || this.config.tap_action;
    const holdAction = entityConf?.hold_action || this.config.hold_action;

    // Collect entity attributes for template context.
    // Shallow-merge live and historical: live attrs first, historical overrides
    // on top. Per-state values win for keys present at that snapshot, while
    // keys that only exist on the current entity (e.g. attributes added after
    // the historical entry was recorded) fall back to the live value rather
    // than rendering empty.
    const liveEntity = hass.states[entityId];
    const attributes = { ...(liveEntity?.attributes ?? {}), ...(currState.attributes ?? {}) };

    return {
      id: `history:${entityId}:${currState.last_changed}`,
      sourceType: 'history',
      sourceId: this.config.name || 'history',
      title,
      description,
      start: currState.last_changed,
      end: currState.last_changed,
      icon: effectiveIcon,
      color: effectiveColor,
      category,
      severity: effectiveSeverity,
      entityId,
      actions: this.config.actions,
      tapAction,
      holdAction,
      metadata: {
        old_state: prevState.state,
        new_state: currState.state,
        old_label: oldLabel,
        new_label: newLabel,
        device_class: deviceClass,
        last_updated: currState.last_updated,
        attributes,
        source_name: this.config.name || 'history',
        _image_template: imageTemplate,
      },
    };
  }
}
