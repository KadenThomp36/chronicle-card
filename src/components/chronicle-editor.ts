import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { ChronicleCardConfig, DEFAULT_CONFIG } from '../models/config';
import { loadHaComponents } from '../utils/load-ha-components';
import './source-editor';

@customElement('chronicle-card-editor')
export class ChronicleEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: ChronicleCardConfig;

  connectedCallback(): void {
    super.connectedCallback();
    loadHaComponents();
  }

  static styles = css`
    :host {
      display: block;
    }

    .editor {
      padding: 4px 0;
    }

    details {
      margin-bottom: 4px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.15));
      border-radius: 10px;
      overflow: hidden;
    }
    summary {
      padding: 12px 14px;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      cursor: pointer;
      user-select: none;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--secondary-background-color, rgba(127,127,127,0.04));
    }
    summary::-webkit-details-marker { display: none; }
    summary::before {
      content: '▸';
      transition: transform 0.15s ease;
      font-size: 11px;
      color: var(--secondary-text-color, #999);
    }
    details[open] > summary::before {
      transform: rotate(90deg);
    }

    .section-body {
      padding: 12px 14px;
    }

    .field {
      margin-bottom: 12px;
    }
    label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    input[type="color"] {
      width: 100%;
      height: 36px;
      padding: 2px 4px;
      cursor: pointer;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      box-sizing: border-box;
    }
    input[type="color"]:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    ha-textfield, ha-select, ha-entity-picker, ha-selector {
      display: block;
      width: 100%;
    }

    .row {
      display: flex;
      gap: 12px;
    }
    .row .field { flex: 1; }

    .toggle-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 6px 0;
    }
    .toggle-label {
      font-size: 13px;
      color: var(--primary-text-color, #333);
    }

    .add-source-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }
    .add-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px 6px;
      border: 2px dashed var(--divider-color, rgba(127,127,127,0.25));
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      font-family: inherit;
      transition: border-color 0.15s ease, background 0.15s ease;
    }
    .add-btn:hover {
      border-color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.04);
    }

    /* ha-switch alignment */
    ha-switch {
      --mdc-theme-secondary: var(--primary-color, #03a9f4);
    }

  `;

  setConfig(config: ChronicleCardConfig): void {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      filters: { ...DEFAULT_CONFIG.filters, ...config.filters },
      grouping: { ...DEFAULT_CONFIG.grouping, ...config.grouping },
      appearance: { ...DEFAULT_CONFIG.appearance, ...config.appearance },
    } as ChronicleCardConfig;
  }

  protected render() {
    if (!this._config) return nothing;
    const c = this._config;
    const g = c.grouping ?? {};
    const a = c.appearance ?? {};

    return html`
      <div class="editor">
        <!-- General -->
        <details open>
          <summary>General</summary>
          <div class="section-body">
            <div class="field">
              <label>Title</label>
              <ha-textfield
                .value=${c.title ?? ''}
                .label=${"Card title"}
                @input=${(e: any) => this._set('title', e.target.value)}
              ></ha-textfield>
            </div>
            <div class="row">
              <div class="field">
                <label>Layout</label>
                <ha-select
                  .value=${c.layout ?? 'vertical'}
                  @change=${(e: any) => this._set('layout', e.target.value)}
                  @closed=${(e: any) => e.stopPropagation()}
                >
                  <mwc-list-item value="vertical">Vertical</mwc-list-item>
                  <mwc-list-item value="horizontal">Horizontal</mwc-list-item>
                </ha-select>
              </div>
              <div class="field">
                <label>Time Format</label>
                <ha-select
                  .value=${c.time_format ?? '24h'}
                  @change=${(e: any) => this._set('time_format', e.target.value)}
                  @closed=${(e: any) => e.stopPropagation()}
                >
                  <mwc-list-item value="24h">24 Hour</mwc-list-item>
                  <mwc-list-item value="12h">12 Hour</mwc-list-item>
                </ha-select>
              </div>
            </div>
            <div class="row">
              <div class="field">
                <label>Max Events</label>
                <ha-textfield
                  type="number"
                  .value=${String(c.max_events ?? 50)}
                  .label=${"Max events"}
                  @input=${(e: any) => this._set('max_events', Number(e.target.value))}
                ></ha-textfield>
              </div>
              <div class="field">
                <label>Days Back</label>
                <ha-textfield
                  type="number"
                  .value=${String(c.days_back ?? 7)}
                  .label=${"Days back"}
                  @input=${(e: any) => this._set('days_back', Number(e.target.value))}
                ></ha-textfield>
              </div>
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Header</span>
              ${this._renderToggle(c.show_header !== false, (v) => this._set('show_header', v))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Layout Toggle</span>
              ${this._renderToggle(c.show_layout_toggle !== false, (v) => this._set('show_layout_toggle', v))}
            </div>
          </div>
        </details>

        <!-- Sources -->
        <details>
          <summary>Sources (${(c.sources ?? []).length})</summary>
          <div class="section-body"
            @source-changed=${this._onSourceChanged}
            @source-removed=${this._onSourceRemoved}
          >
            ${(c.sources ?? []).map((src, i) => html`
              <chronicle-source-editor
                .source=${src}
                .index=${i}
                .hass=${this.hass}
              ></chronicle-source-editor>
            `)}
            <div class="add-source-row">
              <button class="add-btn" @click=${() => this._addSource('calendar')}>+ Calendar</button>
              <button class="add-btn" @click=${() => this._addSource('rest')}>+ REST API</button>
              <button class="add-btn" @click=${() => this._addSource('history')}>+ Entity State</button>
              <button class="add-btn" @click=${() => this._addSource('static')}>+ Template</button>
            </div>
          </div>
        </details>

        <!-- Filters -->
        <details>
          <summary>Filters</summary>
          <div class="section-body">
            <div class="field">
              <label>Search</label>
              <ha-textfield
                .value=${c.filters?.search ?? ''}
                .label=${"Filter events by keyword..."}
                @input=${(e: any) => this._setNested('filters', 'search', e.target.value)}
              ></ha-textfield>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ select: {
                  options: this._getCategoryOptions(),
                  multiple: true,
                  custom_value: true,
                  mode: 'list',
                } }}
                .value=${c.filters?.categories ?? []}
                .label=${"Categories"}
                .helper=${"Filter timeline to specific event categories"}
                @value-changed=${(e: any) => this._setNested('filters', 'categories', e.detail.value)}
              ></ha-selector>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ select: {
                  options: [
                    { value: 'critical', label: 'Critical' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'info', label: 'Info' },
                    { value: 'debug', label: 'Debug' },
                  ],
                  multiple: true,
                } }}
                .value=${c.filters?.severities ?? []}
                .label=${"Severities"}
                .helper=${"Filter timeline to specific severity levels"}
                @value-changed=${(e: any) => this._setNested('filters', 'severities', e.detail.value)}
              ></ha-selector>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ select: {
                  options: this._getSourceNameOptions(),
                  multiple: true,
                  custom_value: true,
                } }}
                .value=${c.filters?.sources ?? []}
                .label=${"Sources"}
                .helper=${"Filter timeline to specific source names"}
                @value-changed=${(e: any) => this._setNested('filters', 'sources', e.detail.value)}
              ></ha-selector>
            </div>
            <div class="field">
              <ha-selector
                .hass=${this.hass}
                .selector=${{ entity: { multiple: true } }}
                .value=${c.filters?.entities ?? []}
                .label=${"Filter Entities"}
                @value-changed=${(e: any) => this._setNested('filters', 'entities', e.detail.value ?? [])}
              ></ha-selector>
            </div>

            <details class="nested-details">
              <summary>Exclusions</summary>
              <div class="section-body">
                <div class="field">
                  <label>Exclude Search</label>
                  <ha-textfield
                    .value=${c.filters?.exclude_search ?? ''}
                    .label=${"Hide events matching keyword..."}
                    @input=${(e: any) => this._setNested('filters', 'exclude_search', e.target.value)}
                  ></ha-textfield>
                </div>
                <div class="field">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ select: {
                      options: this._getCategoryOptions(),
                      multiple: true,
                      custom_value: true,
                      mode: 'list',
                    } }}
                    .value=${c.filters?.exclude_categories ?? []}
                    .label=${"Exclude Categories"}
                    .helper=${"Hide events in these categories"}
                    @value-changed=${(e: any) => this._setNested('filters', 'exclude_categories', e.detail.value)}
                  ></ha-selector>
                </div>
                <div class="field">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ select: {
                      options: [
                        { value: 'critical', label: 'Critical' },
                        { value: 'warning', label: 'Warning' },
                        { value: 'info', label: 'Info' },
                        { value: 'debug', label: 'Debug' },
                      ],
                      multiple: true,
                    } }}
                    .value=${c.filters?.exclude_severities ?? []}
                    .label=${"Exclude Severities"}
                    @value-changed=${(e: any) => this._setNested('filters', 'exclude_severities', e.detail.value)}
                  ></ha-selector>
                </div>
                <div class="field">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ select: {
                      options: this._getSourceNameOptions(),
                      multiple: true,
                      custom_value: true,
                    } }}
                    .value=${c.filters?.exclude_sources ?? []}
                    .label=${"Exclude Sources"}
                    @value-changed=${(e: any) => this._setNested('filters', 'exclude_sources', e.detail.value)}
                  ></ha-selector>
                </div>
                <div class="field">
                  <ha-selector
                    .hass=${this.hass}
                    .selector=${{ entity: { multiple: true } }}
                    .value=${c.filters?.exclude_entities ?? []}
                    .label=${"Exclude Entities"}
                    @value-changed=${(e: any) => this._setNested('filters', 'exclude_entities', e.detail.value ?? [])}
                  ></ha-selector>
                </div>
              </div>
            </details>
          </div>
        </details>

        <!-- Grouping -->
        <details>
          <summary>Grouping</summary>
          <div class="section-body">
            <div class="toggle-row">
              <span class="toggle-label">Enable Grouping</span>
              ${this._renderToggle(g.enabled !== false, (v) => this._setNested('grouping', 'enabled', v))}
            </div>
            <div class="row">
              <div class="field">
                <label>Window (seconds)</label>
                <ha-textfield
                  type="number"
                  .value=${String(g.window_seconds ?? 120)}
                  .label=${"Window seconds"}
                  @input=${(e: any) => this._setNested('grouping', 'window_seconds', Number(e.target.value))}
                ></ha-textfield>
              </div>
              <div class="field">
                <label>Min Group Size</label>
                <ha-textfield
                  type="number"
                  .value=${String(g.min_group_size ?? 3)}
                  .label=${"Min group size"}
                  @input=${(e: any) => this._setNested('grouping', 'min_group_size', Number(e.target.value))}
                ></ha-textfield>
              </div>
            </div>
            <div class="field">
              <label>Group By</label>
              <ha-select
                .value=${g.group_by ?? 'category'}
                @change=${(e: any) => this._setNested('grouping', 'group_by', e.target.value)}
                @closed=${(e: any) => e.stopPropagation()}
              >
                <mwc-list-item value="category">Category</mwc-list-item>
                <mwc-list-item value="source">Source</mwc-list-item>
                <mwc-list-item value="entity">Entity</mwc-list-item>
                <mwc-list-item value="none">None</mwc-list-item>
              </ha-select>
            </div>
          </div>
        </details>

        <!-- Appearance -->
        <details>
          <summary>Appearance</summary>
          <div class="section-body">
            <div class="field">
              <label>Card Height</label>
              <ha-textfield
                .value=${a.card_height ?? '400px'}
                .label=${"400px or auto"}
                @input=${(e: any) => this._setNested('appearance', 'card_height', e.target.value)}
              ></ha-textfield>
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Compact Mode</span>
              ${this._renderToggle(a.compact ?? false, (v) => this._setNested('appearance', 'compact', v))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Images</span>
              ${this._renderToggle(a.show_images !== false, (v) => this._setNested('appearance', 'show_images', v))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Icons</span>
              ${this._renderToggle(a.show_icons !== false, (v) => this._setNested('appearance', 'show_icons', v))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Severity Badge</span>
              ${this._renderToggle(a.show_severity_badge !== false, (v) => this._setNested('appearance', 'show_severity_badge', v))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Show Category Tags</span>
              ${this._renderToggle(a.show_category !== false, (v) => this._setNested('appearance', 'show_category', v))}
            </div>
            <div class="toggle-row">
              <span class="toggle-label">Animate New Events</span>
              ${this._renderToggle(a.animate_new_events !== false, (v) => this._setNested('appearance', 'animate_new_events', v))}
            </div>

            <div style="margin-top: 12px;">
              <label>Severity Colors</label>
              <div class="row">
                <div class="field">
                  <label>Critical</label>
                  <input type="color" .value=${a.severity_colors?.critical ?? '#D32F2F'} @input=${(e: any) => this._setSeverityColor('critical', e.target.value)} />
                </div>
                <div class="field">
                  <label>Warning</label>
                  <input type="color" .value=${a.severity_colors?.warning ?? '#FF9800'} @input=${(e: any) => this._setSeverityColor('warning', e.target.value)} />
                </div>
                <div class="field">
                  <label>Info</label>
                  <input type="color" .value=${a.severity_colors?.info ?? '#2196F3'} @input=${(e: any) => this._setSeverityColor('info', e.target.value)} />
                </div>
                <div class="field">
                  <label>Debug</label>
                  <input type="color" .value=${a.severity_colors?.debug ?? '#9E9E9E'} @input=${(e: any) => this._setSeverityColor('debug', e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>
    `;
  }

  private _renderToggle(checked: boolean, onChange: (val: boolean) => void) {
    return html`
      <ha-switch
        .checked=${checked}
        @change=${(e: any) => onChange(e.target.checked)}
      ></ha-switch>
    `;
  }

  private _set(key: string, value: unknown) {
    this._config = { ...this._config, [key]: value };
    this._fire();
  }

  private _setNested(section: string, key: string, value: unknown) {
    const current = (this._config as any)[section] ?? {};
    this._config = { ...this._config, [section]: { ...current, [key]: value } };
    this._fire();
  }

  private _setSeverityColor(severity: string, color: string) {
    const current = this._config.appearance?.severity_colors ?? {};
    this._setNested('appearance', 'severity_colors', { ...current, [severity]: color });
  }

  private _csvToArray(value: string): string[] {
    const trimmed = value.trim();
    if (!trimmed) return [];
    return trimmed.split(',').map(s => s.trim()).filter(Boolean);
  }

  /** Build category options from known categories in constants. */
  private _getCategoryOptions(): Array<{ value: string; label: string }> {
    return [
      { value: 'person', label: 'Person' },
      { value: 'vehicle', label: 'Vehicle' },
      { value: 'animal', label: 'Animal' },
      { value: 'pet', label: 'Pet' },
      { value: 'security', label: 'Security' },
      { value: 'motion', label: 'Motion' },
      { value: 'door', label: 'Door' },
      { value: 'lock', label: 'Lock' },
      { value: 'camera', label: 'Camera' },
      { value: 'light', label: 'Light' },
      { value: 'climate', label: 'Climate' },
      { value: 'automation', label: 'Automation' },
      { value: 'system', label: 'System' },
    ];
  }

  /** Build source name options from the current config's sources. */
  private _getSourceNameOptions(): Array<{ value: string; label: string }> {
    return (this._config.sources ?? [])
      .filter(s => s.name)
      .map(s => ({ value: s.name!, label: s.name! }));
  }

  private _addSource(type: 'calendar' | 'rest' | 'history' | 'static') {
    const nameMap = { calendar: 'Calendar', rest: 'REST API', history: 'Entity State', static: 'Template' };
    const sources = [...(this._config.sources ?? []), { type, name: nameMap[type] }];
    this._config = { ...this._config, sources };
    this._fire();
  }

  private _onSourceChanged(e: CustomEvent) {
    const { index, key, value } = e.detail;
    const sources = [...(this._config.sources ?? [])];
    sources[index] = { ...sources[index], [key]: value };
    this._config = { ...this._config, sources };
    this._fire();
  }

  private _onSourceRemoved(e: CustomEvent) {
    const { index } = e.detail;
    const sources = [...(this._config.sources ?? [])];
    sources.splice(index, 1);
    this._config = { ...this._config, sources };
    this._fire();
  }

  private _fire() {
    this.dispatchEvent(new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: this._config },
    }));
  }
}
