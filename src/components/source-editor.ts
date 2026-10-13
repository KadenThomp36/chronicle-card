import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { SourceConfig } from '../models/config';
import { atLeast, GROUP_BY_OPTIONS, hexToRgb, makeComputeLabel, mapKeys, pruneConfig, rgbToHex, Schema } from './editor-utils';

const TYPE_OPTIONS = [
  { value: 'history', label: 'Entity state (history)' },
  { value: 'logbook', label: 'Logbook' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'rest', label: 'REST / WebSocket API' },
  { value: 'static', label: 'Static events' },
];

const SEVERITY_SELECT = {
  select: {
    mode: 'dropdown',
    options: [
      { value: 'critical', label: 'Critical' },
      { value: 'warning', label: 'Warning' },
      { value: 'info', label: 'Info' },
      { value: 'debug', label: 'Debug' },
    ],
  },
};

/**
 * Fallback state options for HA < 2025.9 (no multi-select state selector):
 * the entity's current state, attribute-provided options, and common
 * per-domain states, labelled with HA's own formatting.
 */
const DOMAIN_STATES: Record<string, string[]> = {
  binary_sensor: ['on', 'off'],
  switch: ['on', 'off'],
  light: ['on', 'off'],
  fan: ['on', 'off'],
  input_boolean: ['on', 'off'],
  lock: ['locked', 'unlocked', 'jammed', 'locking', 'unlocking', 'open'],
  cover: ['open', 'closed', 'opening', 'closing'],
  person: ['home', 'not_home'],
  device_tracker: ['home', 'not_home'],
  alarm_control_panel: ['armed_away', 'armed_home', 'armed_night', 'armed_vacation', 'disarmed', 'triggered', 'pending', 'arming'],
  vacuum: ['cleaning', 'docked', 'returning', 'idle', 'paused', 'error'],
  media_player: ['playing', 'paused', 'idle', 'standby', 'off', 'on'],
};

const LABELS: Record<string, string> = {
  type: 'Source type',
  url: 'API URL',
  ws_params: 'WebSocket command',
  response_path: 'Response path',
  field_map: 'Field map',
  media_url_template: 'Media URL template',
  clip_url_template: 'Clip URL template',
  poll_interval: 'Poll interval',
  show_attributes: 'Show attributes',
  image_template: 'Image template',
  clip_template: 'Clip template',
  events: 'Events',
  actions: 'Action buttons',
  default_icon: 'Default icon',
  default_color: 'Default color',
  default_severity: 'Default severity',
  severity: 'Severity',
  color: 'Color',
  icon_map: 'Icon map',
  color_map: 'Color map',
  state_filter: 'Only these states',
  state_map: 'State labels',
  state_icon: 'Icon per state',
  state_color: 'Color per state',
  grouping: 'Grouping override',
  window_seconds: 'Window',
  min_group_size: 'Minimum group size',
  group_by: 'Group by',
  group_name: 'Group name',
  entity_config: 'Per-entity settings',
};

const HELPERS: Record<string, string> = {
  name: 'Shown in the timeline and usable in filters.',
  url: 'Internal HA API path (e.g. /api/…) or a full external URL.',
  ws_params: 'Use a WebSocket command instead of the URL, e.g. {type: frigate/events/get, limit: 50}.',
  response_path: 'Dot-path to the array in the response, e.g. data.items.',
  field_map: 'Map response fields to: id, title, description, start, end, mediaUrl, category, label, entityId.',
  media_url_template: 'Image URL built from response fields, e.g. /api/frigate/notifications/{id}/snapshot.jpg',
  clip_url_template: 'Video URL played in the detail dialog, e.g. /api/frigate/notifications/{id}/clip.mp4',
  poll_interval: 'Seconds between refreshes (default 30).',
  show_attributes: 'Attribute values shown under each event.',
  image_template: 'A URL/path, or a Jinja2 template. Variables: entity_id, state, old_state, timestamp, attributes, source_name. Use /local/ or proxy URLs — camera_proxy needs auth that images can\'t send.',
  clip_template: 'Video URL/path or Jinja2 template (same variables as the image template), played in the detail dialog.',
  events: 'List of events: title, start, end, description, icon, color, severity, category.',
  actions: 'Buttons under each event. Native actions use tap_action keys (action: perform-action, …); strings support {field} placeholders.',
  tap_action: '"Default action" opens the Chronicle detail dialog. Strings support {field} placeholders such as {id} or {entity_id}.',
  icon_map: 'Category/keyword → icon, e.g. {person: mdi:walk}.',
  color_map: 'Category/keyword → color, e.g. {person: "#FF9800"}.',
  state_filter: 'Only log changes into these states. Empty = all changes.',
  state_map: 'Raw state → label, e.g. {"on": Opened}.',
  state_icon: 'Raw state → icon, e.g. {"on": mdi:door-open}.',
  state_color: 'Raw state → color, e.g. {"on": "#4CAF50"}.',
  window_seconds: 'Leave empty to inherit the card-level grouping.',
  entity_config: 'Overrides for individual entities.',
};

@customElement('chronicle-source-editor')
export class SourceEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ attribute: false }) source!: SourceConfig;
  @property({ type: Number }) index = 0;

  static styles = css`
    :host { display: block; margin-bottom: 8px; }
    .body { padding: 0 0 8px; }
    .remove {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 12px;
      padding: 6px 12px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.3));
      border-radius: 18px;
      background: transparent;
      color: var(--error-color, #db4437);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .remove:hover, .remove:focus-visible { border-color: var(--error-color, #db4437); outline: none; }
    .remove ha-icon { --mdc-icon-size: 16px; }
  `;

  private get _entities(): string[] {
    const list = [...(this.source.entities ?? [])];
    if (this.source.entity && !list.includes(this.source.entity)) list.push(this.source.entity);
    return list;
  }

  private _friendlyName(entityId: string): string {
    return (this.hass?.states[entityId]?.attributes?.friendly_name as string) || entityId;
  }

  private _attributeOptions(entityIds: string[]) {
    const hidden = new Set(['friendly_name', 'icon', 'entity_picture', 'supported_features', 'device_class', 'unit_of_measurement', 'attribution', 'restored']);
    const seen = new Map<string, string>();
    for (const id of entityIds) {
      const stateObj = this.hass?.states[id];
      for (const attr of Object.keys(stateObj?.attributes ?? {})) {
        if (hidden.has(attr) || seen.has(attr)) continue;
        seen.set(attr, (stateObj && this.hass?.formatEntityAttributeName?.(stateObj, attr)) || attr);
      }
    }
    return [...seen].map(([value, label]) => ({ value, label }));
  }

  private _stateFilterSelector(entityId: string) {
    if (atLeast(this.hass, 2025, 9)) {
      return { state: { entity_id: entityId, multiple: true } };
    }
    const stateObj = this.hass?.states[entityId];
    const attrs = stateObj?.attributes ?? {};
    const states = new Set<string>([
      ...(DOMAIN_STATES[entityId.split('.')[0]] ?? []),
      ...(Array.isArray(attrs.options) ? attrs.options as string[] : []),
      ...(Array.isArray(attrs.hvac_modes) ? attrs.hvac_modes as string[] : []),
      ...(stateObj ? [stateObj.state] : []),
    ]);
    const options = [...states].map((s) => ({
      value: s,
      label: (stateObj && this.hass?.formatEntityState?.(stateObj, s)) || s,
    }));
    return { select: { multiple: true, custom_value: true, mode: 'dropdown', options } };
  }

  private _entitySchema(entityId: string, type: SourceConfig['type']): Schema[] {
    const common: Schema[] = [
      { name: 'name', selector: { text: {} } },
      {
        name: '', type: 'grid', schema: [
          { name: 'icon', selector: { icon: {} } },
          { name: 'color', selector: { color_rgb: {} } },
          { name: 'severity', selector: SEVERITY_SELECT },
        ],
      },
    ];
    const actions: Schema[] = [
      { name: 'tap_action', selector: { ui_action: {} } },
      { name: 'hold_action', selector: { ui_action: {} } },
    ];
    if (type !== 'history') return [...common, ...actions];
    return [
      ...common,
      { name: 'state_filter', selector: this._stateFilterSelector(entityId) },
      { name: 'show_attributes', selector: { select: { multiple: true, custom_value: true, mode: 'dropdown', options: this._attributeOptions([entityId]) } } },
      { name: 'state_map', selector: { object: {} } },
      { name: 'state_icon', selector: { object: {} } },
      { name: 'state_color', selector: { object: {} } },
      { name: 'image_template', selector: { template: {} } },
      { name: 'clip_template', selector: { template: {} } },
      ...actions,
    ];
  }

  private get _schema(): Schema[] {
    const type = this.source.type;
    const entities = this._entities;

    const head: Schema = {
      name: '', type: 'grid', schema: [
        { name: 'type', required: true, selector: { select: { mode: 'dropdown', options: TYPE_OPTIONS } } },
        { name: 'name', selector: { text: {} } },
      ],
    };

    const pollInterval = { name: 'poll_interval', selector: { number: { min: 5, max: 86400, mode: 'box', unit_of_measurement: 's' } } };

    let fields: Schema[] = [];
    switch (type) {
      case 'calendar':
        fields = [{ name: 'entity', selector: { entity: { filter: { domain: 'calendar' } } } }];
        break;
      case 'rest':
        fields = [
          { name: 'url', selector: { text: {} } },
          { name: 'ws_params', selector: { object: {} } },
          { name: 'response_path', selector: { text: {} } },
          { name: 'field_map', selector: { object: {} } },
          { name: 'media_url_template', selector: { text: {} } },
          { name: 'clip_url_template', selector: { text: {} } },
          pollInterval,
        ];
        break;
      case 'history':
        fields = [
          { name: 'entities', selector: { entity: { multiple: true } } },
          { name: 'show_attributes', selector: { select: { multiple: true, custom_value: true, mode: 'dropdown', options: this._attributeOptions(entities) } } },
          { name: 'image_template', selector: { template: {} } },
          { name: 'clip_template', selector: { template: {} } },
        ];
        break;
      case 'logbook':
        fields = [
          { name: 'entities', selector: { entity: { multiple: true } } },
          pollInterval,
        ];
        break;
      case 'static':
        fields = [{ name: 'events', selector: { object: {} } }];
        break;
    }

    const perEntity: Schema[] = (type === 'history' || type === 'logbook') && entities.length
      ? [{
          type: 'expandable', name: 'entity_config', title: 'Per-entity settings', icon: 'mdi:tune',
          schema: entities.map((id) => ({
            type: 'expandable', name: id, title: this._friendlyName(id), schema: this._entitySchema(id, type),
          })),
        }]
      : [];

    return [
      head,
      ...fields,
      ...perEntity,
      {
        type: 'expandable', title: 'Interactions', icon: 'mdi:gesture-tap', schema: [
          { name: 'tap_action', selector: { ui_action: {} } },
          { name: 'hold_action', selector: { ui_action: {} } },
          { name: 'actions', selector: { object: {} } },
        ],
      },
      {
        type: 'expandable', title: 'Appearance', icon: 'mdi:palette-outline', schema: [
          {
            name: '', type: 'grid', schema: [
              { name: 'default_icon', selector: { icon: {} } },
              { name: 'default_color', selector: { color_rgb: {} } },
              { name: 'default_severity', selector: SEVERITY_SELECT },
            ],
          },
          ...(type === 'static' ? [] : [
            { name: 'icon_map', selector: { object: {} } },
            { name: 'color_map', selector: { object: {} } },
          ]),
        ],
      },
      {
        type: 'expandable', name: 'grouping', title: 'Grouping override', icon: 'mdi:group', schema: [
          {
            name: '', type: 'grid', schema: [
              { name: 'window_seconds', selector: { number: { min: 0, max: 86400, mode: 'box', unit_of_measurement: 's' } } },
              { name: 'min_group_size', selector: { number: { min: 2, max: 100, mode: 'box' } } },
            ],
          },
          { name: 'group_by', selector: { select: { mode: 'dropdown', options: GROUP_BY_OPTIONS } } },
          { name: 'group_name', selector: { text: {} } },
        ],
      },
    ];
  }

  /** Source as the form shows it: legacy `entity` folded into `entities`, colors as RGB. */
  private get _data(): Record<string, unknown> {
    const s = { ...this.source } as Record<string, unknown>;
    if (s.type === 'history' || s.type === 'logbook') {
      s.entities = this._entities;
      delete s.entity;
      const ec = (this.source.entity_config ?? {}) as Record<string, Record<string, unknown>>;
      s.entity_config = Object.fromEntries(
        this._entities.map((id) => [id, mapKeys({ ...ec[id] }, ['color'], hexToRgb)]),
      );
    }
    return mapKeys(s, ['default_color'], hexToRgb);
  }

  private _hint(): string {
    const entities = this._entities;
    if (entities.length === 1) return this._friendlyName(entities[0]);
    if (entities.length > 1) return `${entities.length} entities`;
    if (this.source.url) return this.source.url;
    if (this.source.ws_params?.type) return String(this.source.ws_params.type);
    if (this.source.events?.length) return `${this.source.events.length} events`;
    return '';
  }

  protected render() {
    if (!this.source || !this.hass) return nothing;
    const typeLabel = TYPE_OPTIONS.find((t) => t.value === this.source.type)?.label ?? this.source.type;
    const hint = this._hint();

    return html`
      <ha-expansion-panel
        outlined
        .header=${this.source.name || typeLabel}
        .secondary=${hint ? `${typeLabel} · ${hint}` : typeLabel}
      >
        <div class="body">
          <ha-form
            .hass=${this.hass}
            .data=${this._data}
            .schema=${this._schema}
            .computeLabel=${makeComputeLabel(this.hass, LABELS)}
            .computeHelper=${(schema: { name?: string }) => HELPERS[schema.name ?? '']}
            @value-changed=${this._valueChanged}
          ></ha-form>
          <button class="remove" @click=${this._remove}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>Remove source
          </button>
        </div>
      </ha-expansion-panel>
    `;
  }

  private _valueChanged(e: CustomEvent): void {
    e.stopPropagation();
    const value = mapKeys({ ...(e.detail.value as Record<string, unknown>) }, ['default_color'], rgbToHex);

    if (value.type === 'history' || value.type === 'logbook') {
      delete value.entity;
      const keep = new Set((value.entities as string[] | undefined) ?? []);
      const ec = (value.entity_config ?? {}) as Record<string, Record<string, unknown>>;
      value.entity_config = Object.fromEntries(
        Object.entries(ec)
          .filter(([id]) => keep.has(id))
          .map(([id, conf]) => [id, pruneConfig(mapKeys(conf, ['color'], rgbToHex), undefined, undefined)]),
      );
    }

    const source = pruneConfig(value, undefined, undefined) as unknown as SourceConfig;
    this.dispatchEvent(new CustomEvent('source-changed', {
      bubbles: true,
      composed: true,
      detail: { index: this.index, source },
    }));
  }

  private _remove(): void {
    this.dispatchEvent(new CustomEvent('source-removed', {
      bubbles: true,
      composed: true,
      detail: { index: this.index },
    }));
  }
}
