import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { ChronicleCardConfig, DEFAULT_CONFIG, SourceConfig } from '../models/config';
import { loadHaComponents } from '../utils/load-ha-components';
import { GROUP_BY_OPTIONS, hexToRgb, makeComputeLabel, mapKeys, pruneConfig, rgbToHex, Schema } from './editor-utils';
import { EDITOR_NAME } from '../constants';
import './source-editor';

const SEVERITY_OPTIONS = [
  { value: 'critical', label: 'Critical' },
  { value: 'warning', label: 'Warning' },
  { value: 'info', label: 'Info' },
  { value: 'debug', label: 'Debug' },
];

const CATEGORY_OPTIONS = [
  'person', 'vehicle', 'animal', 'pet', 'security', 'motion', 'door', 'lock',
  'camera', 'light', 'climate', 'automation', 'system',
].map((value) => ({ value, label: value.charAt(0).toUpperCase() + value.slice(1) }));

const SOURCE_TYPES: Array<{ type: SourceConfig['type']; label: string; icon: string }> = [
  { type: 'history', label: 'Entity state', icon: 'mdi:history' },
  { type: 'logbook', label: 'Logbook', icon: 'mdi:format-list-bulleted' },
  { type: 'calendar', label: 'Calendar', icon: 'mdi:calendar' },
  { type: 'rest', label: 'REST / WebSocket', icon: 'mdi:api' },
  { type: 'static', label: 'Static events', icon: 'mdi:playlist-edit' },
];

const SEVERITY_KEYS = ['critical', 'warning', 'info', 'debug'];

/** Defaults as the form round-trips them (color_rgb → lowercase hex), for pruning. */
const PRUNE_DEFAULTS = {
  ...DEFAULT_CONFIG,
  appearance: {
    ...DEFAULT_CONFIG.appearance,
    severity_colors: mapKeys(
      DEFAULT_CONFIG.appearance!.severity_colors as Record<string, unknown>,
      SEVERITY_KEYS,
      (v) => rgbToHex(hexToRgb(v)),
    ),
  },
} as Record<string, unknown>;

const LABELS: Record<string, string> = {
  layout: 'Layout',
  time_format: 'Time format',
  max_events: 'Max events',
  days_back: 'Days back',
  days_forward: 'Days forward',
  show_header: 'Show header',
  show_layout_toggle: 'Show layout toggle',
  filters: 'Filters',
  search: 'Search',
  categories: 'Categories',
  severities: 'Severities',
  sources: 'Sources',
  entities: 'Entities',
  exclude_search: 'Exclude search',
  exclude_categories: 'Exclude categories',
  exclude_severities: 'Exclude severities',
  exclude_sources: 'Exclude sources',
  exclude_entities: 'Exclude entities',
  grouping: 'Grouping',
  enabled: 'Group similar events',
  window_seconds: 'Window',
  min_group_size: 'Minimum group size',
  group_by: 'Group by',
  group_name: 'Group name',
  appearance: 'Appearance',
  card_height: 'Card height',
  compact: 'Compact mode',
  show_description: 'Show description',
  show_images: 'Show images',
  show_icons: 'Show icons',
  show_severity_badge: 'Show severity badge',
  show_category: 'Show category tags',
  animate_new_events: 'Animate new events',
  severity_colors: 'Severity colors',
  critical: 'Critical',
  warning: 'Warning',
  info: 'Info',
  debug: 'Debug',
};

const HELPERS: Record<string, string> = {
  time_format: 'Leave empty to follow your Home Assistant profile.',
  days_back: 'Whole numbers are calendar days (0 = today since midnight); decimals are a rolling window.',
  days_forward: 'Show upcoming calendar/static events. 0 = none.',
  search: 'Only show events containing this text.',
  exclude_search: 'Hide events containing this text.',
  group_name: 'Custom summary. Placeholders: {count}, {label}, {source}, {entity}.',
  card_height: 'A fixed height (e.g. 400px), "fill" for Panel layout, or "auto" to grow with content. In a sections view, resizing the card height also fills.',
  compact: 'Single-line events. Descriptions are hidden unless "Show description" is enabled explicitly.',
  show_description: 'Secondary line such as "Off → On".',
};

@customElement(EDITOR_NAME)
export class ChronicleEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config?: ChronicleCardConfig;

  connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents().then(() => this.requestUpdate());
  }

  setConfig(config: ChronicleCardConfig): void {
    this._config = config;
  }

  static styles = css`
    :host { display: block; }
    .sources {
      margin: 16px 0;
    }
    .sources-header {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin: 0 0 8px;
      font-size: 15px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    .sources-header .count {
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .empty {
      font-size: 13px;
      color: var(--secondary-text-color);
      margin: 0 0 8px;
    }
    .add-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .add-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border: 1px dashed var(--divider-color, rgba(127,127,127,0.3));
      border-radius: 18px;
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      font-size: 13px;
      cursor: pointer;
    }
    .add-btn:hover, .add-btn:focus-visible {
      border-color: var(--primary-color);
      outline: none;
    }
    .add-btn ha-icon { --mdc-icon-size: 16px; }
  `;

  private get _generalSchema(): Schema[] {
    return [
      { name: 'title', selector: { text: {} } },
      {
        name: '', type: 'grid', schema: [
          { name: 'layout', selector: { select: { mode: 'dropdown', options: [
            { value: 'vertical', label: 'Vertical' },
            { value: 'horizontal', label: 'Horizontal' },
          ] } } },
          { name: 'time_format', selector: { select: { mode: 'dropdown', options: [
            { value: '24h', label: '24 hour' },
            { value: '12h', label: '12 hour' },
          ] } } },
          { name: 'days_back', selector: { number: { min: 0, max: 365, step: 'any', mode: 'box', unit_of_measurement: 'days' } } },
          { name: 'days_forward', selector: { number: { min: 0, max: 365, step: 'any', mode: 'box', unit_of_measurement: 'days' } } },
          { name: 'max_events', selector: { number: { min: 1, max: 1000, mode: 'box' } } },
        ],
      },
      {
        name: '', type: 'grid', schema: [
          { name: 'show_header', selector: { boolean: {} } },
          { name: 'show_layout_toggle', selector: { boolean: {} } },
        ],
      },
    ];
  }

  private get _optionsSchema(): Schema[] {
    const sourceNames = (this._config?.sources ?? [])
      .filter((s) => s.name)
      .map((s) => ({ value: s.name!, label: s.name! }));
    const selectMulti = (options: unknown[], custom = true) =>
      ({ select: { multiple: true, custom_value: custom, mode: 'dropdown', options } });

    return [
      {
        type: 'expandable', name: 'filters', title: 'Filters', icon: 'mdi:filter-outline', schema: [
          { name: 'search', selector: { text: {} } },
          { name: 'categories', selector: selectMulti(CATEGORY_OPTIONS) },
          { name: 'severities', selector: selectMulti(SEVERITY_OPTIONS, false) },
          { name: 'sources', selector: selectMulti(sourceNames) },
          { name: 'entities', selector: { entity: { multiple: true } } },
          {
            type: 'expandable', title: 'Exclusions', icon: 'mdi:filter-remove-outline', schema: [
              { name: 'exclude_search', selector: { text: {} } },
              { name: 'exclude_categories', selector: selectMulti(CATEGORY_OPTIONS) },
              { name: 'exclude_severities', selector: selectMulti(SEVERITY_OPTIONS, false) },
              { name: 'exclude_sources', selector: selectMulti(sourceNames) },
              { name: 'exclude_entities', selector: { entity: { multiple: true } } },
            ],
          },
        ],
      },
      {
        type: 'expandable', name: 'grouping', title: 'Grouping', icon: 'mdi:group', schema: [
          { name: 'enabled', selector: { boolean: {} } },
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
      {
        type: 'expandable', name: 'appearance', title: 'Appearance', icon: 'mdi:palette-outline', schema: [
          { name: 'card_height', selector: { select: { mode: 'dropdown', custom_value: true, options: [
            { value: '400px', label: '400px' },
            { value: 'auto', label: 'Auto (grow with content)' },
            { value: 'fill', label: 'Fill available space' },
          ] } } },
          {
            name: '', type: 'grid', schema: [
              { name: 'compact', selector: { boolean: {} } },
              { name: 'show_description', selector: { boolean: {} } },
              { name: 'show_images', selector: { boolean: {} } },
              { name: 'show_icons', selector: { boolean: {} } },
              { name: 'show_severity_badge', selector: { boolean: {} } },
              { name: 'show_category', selector: { boolean: {} } },
              { name: 'animate_new_events', selector: { boolean: {} } },
            ],
          },
          {
            type: 'expandable', name: 'severity_colors', title: 'Severity colors', schema: [
              { name: '', type: 'grid', schema: SEVERITY_KEYS.map((name) => ({ name, selector: { color_rgb: {} } })) },
            ],
          },
        ],
      },
    ];
  }

  /** Config merged with defaults for display; severity colors as RGB for color_rgb. */
  private get _displayData(): Record<string, unknown> {
    const c = this._config!;
    const appearance = { ...DEFAULT_CONFIG.appearance, ...c.appearance };
    return {
      ...DEFAULT_CONFIG,
      ...c,
      filters: { ...DEFAULT_CONFIG.filters, ...c.filters },
      grouping: { ...DEFAULT_CONFIG.grouping, ...c.grouping },
      appearance: {
        ...appearance,
        show_description: appearance.show_description ?? !appearance.compact,
        severity_colors: mapKeys(
          { ...DEFAULT_CONFIG.appearance!.severity_colors, ...appearance.severity_colors },
          SEVERITY_KEYS,
          hexToRgb,
        ),
      },
    };
  }

  private _computeHelper = (schema: { name?: string }) => HELPERS[schema.name ?? ''];

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const data = this._displayData;
    const computeLabel = makeComputeLabel(this.hass, LABELS);
    const sources = this._config.sources ?? [];

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._generalSchema}
        .computeLabel=${computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._formChanged}
      ></ha-form>

      <div class="sources">
        <div class="sources-header">Sources <span class="count">${sources.length}</span></div>
        ${sources.length === 0 ? html`<p class="empty">Add a source to start building the timeline.</p>` : nothing}
        ${sources.map((src, i) => html`
          <chronicle-source-editor
            .hass=${this.hass}
            .source=${src}
            .index=${i}
            @source-changed=${this._sourceChanged}
            @source-removed=${this._sourceRemoved}
          ></chronicle-source-editor>
        `)}
        <div class="add-row">
          ${SOURCE_TYPES.map((t) => html`
            <button class="add-btn" @click=${() => this._addSource(t.type)}>
              <ha-icon .icon=${t.icon}></ha-icon>${t.label}
            </button>
          `)}
        </div>
      </div>

      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._optionsSchema}
        .computeLabel=${computeLabel}
        .computeHelper=${this._computeHelper}
        @value-changed=${this._formChanged}
      ></ha-form>
    `;
  }

  private _formChanged(e: CustomEvent): void {
    e.stopPropagation();
    const value = { ...(e.detail.value as Record<string, unknown>) };
    const appearance = { ...(value.appearance as Record<string, unknown> | undefined) };
    if (appearance.severity_colors) {
      appearance.severity_colors = mapKeys(appearance.severity_colors as Record<string, unknown>, SEVERITY_KEYS, rgbToHex);
    }
    // show_description is displayed as its effective value; only persist a real override
    const prev = this._config?.appearance;
    if (prev?.show_description === undefined && appearance.show_description === !prev?.compact) {
      delete appearance.show_description;
    }
    value.appearance = appearance;
    this._commit(value);
  }

  private _sourceChanged(e: CustomEvent): void {
    e.stopPropagation();
    const { index, source } = e.detail as { index: number; source: SourceConfig };
    const sources = [...(this._config!.sources ?? [])];
    sources[index] = source;
    this._commit({ ...this._config!, sources });
  }

  private _sourceRemoved(e: CustomEvent): void {
    e.stopPropagation();
    const sources = [...(this._config!.sources ?? [])];
    sources.splice(e.detail.index as number, 1);
    this._commit({ ...this._config!, sources });
  }

  private _addSource(type: SourceConfig['type']): void {
    const label = SOURCE_TYPES.find((t) => t.type === type)?.label ?? type;
    const sources = [...(this._config!.sources ?? []), { type, name: label } as SourceConfig];
    this._commit({ ...this._config!, sources });
  }

  /** Strip display defaults back out and tell HA about the new config. */
  private _commit(next: Record<string, unknown>): void {
    const raw = this._config as unknown as Record<string, unknown>;
    const { type, sources, ...rest } = next;
    const pruned = pruneConfig(rest, raw, PRUNE_DEFAULTS);
    // Keep the user's key order; new keys go after, sources last
    const order = [...Object.keys(raw).filter((k) => k in pruned), ...Object.keys(pruned).filter((k) => !(k in raw))];
    const config = {
      type: type ?? raw.type,
      ...Object.fromEntries(order.map((k) => [k, pruned[k]])),
      sources: sources ?? raw.sources ?? [],
    } as unknown as ChronicleCardConfig;
    this._config = config;
    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config },
    }));
  }
}
