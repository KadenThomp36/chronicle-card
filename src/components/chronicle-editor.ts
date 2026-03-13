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
    input, select {
      width: 100%;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #333);
      font-size: 13px;
      font-family: inherit;
      box-sizing: border-box;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    input[type="color"] {
      height: 36px;
      padding: 2px 4px;
      cursor: pointer;
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

    /* Toggle switch */
    .switch {
      position: relative;
      width: 40px;
      height: 22px;
    }
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
      position: absolute;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      inset: 0;
      background: var(--divider-color, #ccc);
      border-radius: 11px;
      transition: background 0.2s ease;
    }
    .slider::before {
      content: '';
      position: absolute;
      height: 18px;
      width: 18px;
      left: 2px;
      bottom: 2px;
      background: #fff;
      border-radius: 50%;
      transition: transform 0.2s ease;
    }
    .switch input:checked + .slider {
      background: var(--primary-color, #03a9f4);
    }
    .switch input:checked + .slider::before {
      transform: translateX(18px);
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
      width: auto;
      padding: 0;
      margin: 0;
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
              <input type="text" .value=${c.title ?? ''} @input=${(e: any) => this._set('title', e.target.value)} />
            </div>
            <div class="row">
              <div class="field">
                <label>Layout</label>
                <select .value=${c.layout ?? 'vertical'} @change=${(e: any) => this._set('layout', e.target.value)}>
                  <option value="vertical">Vertical</option>
                  <option value="horizontal">Horizontal</option>
                </select>
              </div>
              <div class="field">
                <label>Time Format</label>
                <select .value=${c.time_format ?? '24h'} @change=${(e: any) => this._set('time_format', e.target.value)}>
                  <option value="24h">24 Hour</option>
                  <option value="12h">12 Hour</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="field">
                <label>Max Events</label>
                <input type="number" .value=${String(c.max_events ?? 50)} @input=${(e: any) => this._set('max_events', Number(e.target.value))} />
              </div>
              <div class="field">
                <label>Days Back</label>
                <input type="number" .value=${String(c.days_back ?? 7)} @input=${(e: any) => this._set('days_back', Number(e.target.value))} />
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
              <input type="text"
                .value=${c.filters?.search ?? ''}
                @input=${(e: any) => this._setNested('filters', 'search', e.target.value)}
                placeholder="Filter events by keyword..."
              />
            </div>
            <div class="field">
              <label>Categories (comma-separated)</label>
              <input type="text"
                .value=${(c.filters?.categories ?? []).join(', ')}
                @input=${(e: any) => this._setNested('filters', 'categories', this._csvToArray(e.target.value))}
                placeholder="motion, door, security, person"
              />
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
              <input type="text"
                .value=${(c.filters?.sources ?? []).join(', ')}
                @input=${(e: any) => this._setNested('filters', 'sources', this._csvToArray(e.target.value))}
                placeholder="Frigate, Front Door History"
              />
            </div>
            <div class="field">
              <label>Entities (comma-separated)</label>
              <input type="text"
                .value=${(c.filters?.entities ?? []).join(', ')}
                @input=${(e: any) => this._setNested('filters', 'entities', this._csvToArray(e.target.value))}
                placeholder="binary_sensor.front_door, lock.front_door"
              />
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
                <input type="number" .value=${String(g.window_seconds ?? 120)} @input=${(e: any) => this._setNested('grouping', 'window_seconds', Number(e.target.value))} />
              </div>
              <div class="field">
                <label>Min Group Size</label>
                <input type="number" .value=${String(g.min_group_size ?? 3)} @input=${(e: any) => this._setNested('grouping', 'min_group_size', Number(e.target.value))} />
              </div>
            </div>
            <div class="field">
              <label>Group By</label>
              <select .value=${g.group_by ?? 'category'} @change=${(e: any) => this._setNested('grouping', 'group_by', e.target.value)}>
                <option value="category">Category</option>
                <option value="source">Source</option>
                <option value="entity">Entity</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </details>

        <!-- Appearance -->
        <details>
          <summary>Appearance</summary>
          <div class="section-body">
            <div class="field">
              <label>Card Height</label>
              <input type="text" .value=${a.card_height ?? '400px'} @input=${(e: any) => this._setNested('appearance', 'card_height', e.target.value)} placeholder="400px or auto" />
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
      <label class="switch">
        <input type="checkbox" .checked=${checked} @change=${(e: any) => onChange(e.target.checked)} />
        <span class="slider"></span>
      </label>
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
