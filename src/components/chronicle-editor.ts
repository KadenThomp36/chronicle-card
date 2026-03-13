import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { ChronicleCardConfig, DEFAULT_CONFIG } from '../models/config';
import './source-editor';

@customElement('chronicle-card-editor')
export class ChronicleEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private _config!: ChronicleCardConfig;

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
    input[type="checkbox"] {
      width: auto;
      padding: 0;
      margin: 0;
      cursor: pointer;
    }
    ha-textfield {
      display: block;
      width: 100%;
    }
    ha-select {
      display: block;
      width: 100%;
    }
    ha-entity-picker {
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

    .severity-checks {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .check-label {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: var(--primary-text-color, #333);
      cursor: pointer;
      text-transform: none;
      letter-spacing: 0;
      font-weight: 400;
    }
    .check-label input[type="checkbox"] {
      cursor: pointer;
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
                  @selected=${(e: any) => this._set('layout', e.detail.value)}
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
                  @selected=${(e: any) => this._set('time_format', e.detail.value)}
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
              <button class="add-btn" @click=${() => this._addSource('history')}>+ History</button>
              <button class="add-btn" @click=${() => this._addSource('static')}>+ Static</button>
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
              <label>Categories (comma-separated)</label>
              <ha-textfield
                .value=${(c.filters?.categories ?? []).join(', ')}
                .label=${"motion, door, security, person"}
                @input=${(e: any) => this._setNested('filters', 'categories', this._csvToArray(e.target.value))}
              ></ha-textfield>
            </div>
            <div class="field">
              <label>Severities</label>
              <div class="severity-checks">
                ${(['critical', 'warning', 'info', 'debug'] as const).map(sev => {
                  const checked = (c.filters?.severities ?? []).includes(sev);
                  return html`
                    <label class="check-label">
                      <input type="checkbox" .checked=${checked} @change=${(e: any) => this._toggleSeverityFilter(sev, e.target.checked)} />
                      <span>${sev.charAt(0).toUpperCase() + sev.slice(1)}</span>
                    </label>
                  `;
                })}
              </div>
            </div>
            <div class="field">
              <label>Sources (comma-separated)</label>
              <ha-textfield
                .value=${(c.filters?.sources ?? []).join(', ')}
                .label=${"Frigate, Front Door History"}
                @input=${(e: any) => this._setNested('filters', 'sources', this._csvToArray(e.target.value))}
              ></ha-textfield>
            </div>
            <div class="field">
              <label>Filter Entities</label>
              ${(c.filters?.entities ?? []).map((entity: string, idx: number) => html`
                <div class="row" style="margin-bottom: 4px; align-items: center;">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${entity}
                    allow-custom-entity
                    @value-changed=${(e: any) => this._updateFilterEntity(idx, e.detail.value)}
                    style="flex: 1;"
                  ></ha-entity-picker>
                  <button
                    class="remove-entity-btn"
                    @click=${() => this._removeFilterEntity(idx)}
                    title="Remove entity"
                    style="border: none; background: none; color: var(--error-color, #db4437); cursor: pointer; font-size: 18px; padding: 4px 8px; flex-shrink: 0;"
                  >&#x2715;</button>
                </div>
              `)}
              <ha-entity-picker
                .hass=${this.hass}
                .value=${''}
                allow-custom-entity
                @value-changed=${(e: any) => this._addFilterEntity(e.detail.value)}
              ></ha-entity-picker>
            </div>
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
                @selected=${(e: any) => this._setNested('grouping', 'group_by', e.detail.value)}
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

  private _addFilterEntity(value: string) {
    if (!value) return;
    const current = [...(this._config.filters?.entities ?? [])];
    if (!current.includes(value)) {
      current.push(value);
      this._setNested('filters', 'entities', current);
    }
  }

  private _removeFilterEntity(index: number) {
    const current = [...(this._config.filters?.entities ?? [])];
    current.splice(index, 1);
    this._setNested('filters', 'entities', current);
  }

  private _updateFilterEntity(index: number, value: string) {
    const current = [...(this._config.filters?.entities ?? [])];
    if (value) {
      current[index] = value;
    } else {
      current.splice(index, 1);
    }
    this._setNested('filters', 'entities', current);
  }

  private _toggleSeverityFilter(severity: string, checked: boolean) {
    const current = [...(this._config.filters?.severities ?? [])];
    if (checked && !current.includes(severity as any)) {
      current.push(severity as any);
    } else if (!checked) {
      const idx = current.indexOf(severity as any);
      if (idx >= 0) current.splice(idx, 1);
    }
    this._setNested('filters', 'severities', current);
  }

  private _addSource(type: 'calendar' | 'rest' | 'history' | 'static') {
    const nameMap = { calendar: 'Calendar', rest: 'REST API', history: 'History', static: 'Static' };
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
