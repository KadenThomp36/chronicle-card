import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SourceConfig } from '../models/config';

@customElement('chronicle-source-editor')
export class SourceEditor extends LitElement {
  @property({ attribute: false }) source!: SourceConfig;
  @property({ type: Number }) index = 0;
  @property({ attribute: false }) hass?: any;

  static styles = css`
    :host {
      display: block;
    }
    .source-card {
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 10px;
      padding: 12px;
      margin-bottom: 8px;
      background: var(--secondary-background-color, rgba(127,127,127,0.04));
    }
    .source-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .remove-btn {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 4px;
      font-family: inherit;
    }
    .remove-btn:hover {
      background: rgba(219, 68, 55, 0.1);
    }
    .field {
      margin-bottom: 8px;
    }
    .row {
      display: flex;
      gap: 8px;
    }
    .row .field { flex: 1; }
    label {
      display: block;
      font-size: 11px;
      font-weight: 500;
      color: var(--secondary-text-color, #888);
      margin-bottom: 4px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
    }
    input, select, textarea {
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
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    textarea {
      min-height: 60px;
      resize: vertical;
      font-family: monospace;
      font-size: 12px;
    }
    .section-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color, #777);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 12px 0 6px;
      padding-top: 8px;
      border-top: 1px solid var(--divider-color, rgba(127,127,127,0.12));
    }
    .help-text {
      font-size: 11px;
      color: var(--secondary-text-color, #999);
      margin: 2px 0 0;
      line-height: 1.4;
    }
  `;

  protected render() {
    if (!this.source) return nothing;

    return html`
      <div class="source-card">
        <div class="source-header">
          <div class="field" style="flex:1; margin-bottom:0; margin-right:8px;">
            <label>Source Type</label>
            <select .value=${this.source.type} @change=${this._onTypeChange}>
              <option value="calendar">Calendar Entity</option>
              <option value="rest">REST API</option>
              <option value="history">Entity History</option>
              <option value="static">Static Events</option>
            </select>
          </div>
          <button class="remove-btn" @click=${this._remove}>Remove</button>
        </div>

        <div class="field">
          <label>Name</label>
          <input type="text" .value=${this.source.name ?? ''} @input=${(e: any) => this._update('name', e.target.value)} placeholder="Source display name" />
        </div>

        ${this._renderTypeFields()}

        <div class="section-label">Appearance</div>

        <div class="row">
          <div class="field">
            <label>Default Icon</label>
            <input type="text" .value=${this.source.default_icon ?? ''} @input=${(e: any) => this._update('default_icon', e.target.value)} placeholder="mdi:calendar-clock" />
          </div>
          <div class="field">
            <label>Default Color</label>
            <input type="color" .value=${this.source.default_color ?? '#2196F3'} @input=${(e: any) => this._update('default_color', e.target.value)} />
          </div>
          <div class="field">
            <label>Severity</label>
            <select .value=${this.source.default_severity ?? 'info'} @change=${(e: any) => this._update('default_severity', e.target.value)}>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
              <option value="debug">Debug</option>
            </select>
          </div>
        </div>

        ${this._renderIconColorMaps()}
      </div>
    `;
  }

  private _renderTypeFields() {
    switch (this.source.type) {
      case 'calendar':
        return html`
          <div class="field">
            <label>Calendar Entity</label>
            <input type="text" .value=${this.source.entity ?? ''} @input=${(e: any) => this._update('entity', e.target.value)} placeholder="calendar.my_calendar" />
          </div>
        `;

      case 'rest':
        return html`
          <div class="field">
            <label>API URL</label>
            <input type="text" .value=${this.source.url ?? ''} @input=${(e: any) => this._update('url', e.target.value)} placeholder="llmvision/timeline/events?limit=50" />
            <p class="help-text">Internal HA API path (no /api/ prefix needed) or full external URL</p>
          </div>
          <div class="field">
            <label>Response Path</label>
            <input type="text" .value=${this.source.response_path ?? ''} @input=${(e: any) => this._update('response_path', e.target.value)} placeholder="events" />
            <p class="help-text">Dot-path to the array in the JSON response (e.g. "events" or "data.items")</p>
          </div>
          <div class="field">
            <label>Field Map (JSON)</label>
            <textarea
              .value=${this._fieldMapToString()}
              @change=${this._onFieldMapChange}
              placeholder='{"id":"uid","title":"title","start":"start","mediaUrl":"key_frame"}'
            ></textarea>
            <p class="help-text">Maps response fields to: id, title, description, start, end, mediaUrl, category, label, entityId</p>
          </div>
          <div class="field">
            <label>Media URL Template</label>
            <input type="text" .value=${this.source.media_url_template ?? ''} @input=${(e: any) => this._update('media_url_template', e.target.value)} placeholder="/api/frigate/notifications/{id}/snapshot.jpg" />
            <p class="help-text">Build image URL from response fields using {field} placeholders. Overrides mediaUrl field mapping.</p>
          </div>
          <div class="field">
            <label>WebSocket Params (JSON)</label>
            <textarea
              .value=${this._wsParamsToString()}
              @change=${this._onWsParamsChange}
              placeholder='{"type":"frigate/events/get","instance_id":"frigate","labels":["cat"],"limit":25}'
            ></textarea>
            <p class="help-text">Use WebSocket instead of REST. Overrides API URL. Required for Frigate events.</p>
          </div>
          <div class="field">
            <label>Poll Interval (seconds)</label>
            <input type="number" .value=${String(this.source.poll_interval ?? 60)} @input=${(e: any) => this._update('poll_interval', Number(e.target.value))} min="5" />
          </div>
        `;

      case 'history':
        return html`
          <div class="field">
            <label>Entities (comma-separated)</label>
            <input type="text"
              .value=${(this.source.entities ?? []).join(', ')}
              @input=${(e: any) => this._update('entities', e.target.value.split(',').map((s: string) => s.trim()).filter(Boolean))}
              placeholder="binary_sensor.front_door, lock.front_door_lock"
            />
            <p class="help-text">Each state change becomes a timeline event. Titles use device class for human-readable labels (e.g. "Front Door Opened").</p>
          </div>
          <div class="field">
            <label>State Labels (JSON, optional)</label>
            <textarea
              .value=${this._mapToString(this.source.state_map)}
              @change=${(e: any) => this._onMapChange('state_map', e)}
              placeholder='{"on": "Opened", "off": "Closed"}'
              style="min-height:40px;"
            ></textarea>
            <p class="help-text">Override how raw state values are displayed. Device class labels are used automatically when not specified.</p>
          </div>
        `;

      case 'static':
        return html`
          <div class="field">
            <label>Events (JSON array)</label>
            <textarea
              .value=${this._staticEventsToString()}
              @change=${this._onStaticEventsChange}
              placeholder='[{"title":"Filter Change","start":"2026-04-01T10:00:00","icon":"mdi:air-filter"}]'
            ></textarea>
            <p class="help-text">Define events directly. Fields: title, start, end, description, icon, color, severity, category</p>
          </div>
        `;

      default:
        return nothing;
    }
  }

  private _renderIconColorMaps() {
    if (this.source.type === 'static') return nothing;

    return html`
      <div class="section-label">Category Mapping (optional)</div>
      <div class="row">
        <div class="field">
          <label>Icon Map (JSON)</label>
          <textarea
            .value=${this._mapToString(this.source.icon_map)}
            @change=${(e: any) => this._onMapChange('icon_map', e)}
            placeholder='{"person":"mdi:walk","vehicle":"mdi:car"}'
            style="min-height:40px;"
          ></textarea>
        </div>
        <div class="field">
          <label>Color Map (JSON)</label>
          <textarea
            .value=${this._mapToString(this.source.color_map)}
            @change=${(e: any) => this._onMapChange('color_map', e)}
            placeholder='{"person":"#FF9800","vehicle":"#2196F3"}'
            style="min-height:40px;"
          ></textarea>
        </div>
      </div>
    `;
  }

  private _fieldMapToString(): string {
    if (!this.source.field_map || Object.keys(this.source.field_map).length === 0) return '';
    try { return JSON.stringify(this.source.field_map, null, 2); } catch { return ''; }
  }

  private _wsParamsToString(): string {
    if (!this.source.ws_params || Object.keys(this.source.ws_params).length === 0) return '';
    try { return JSON.stringify(this.source.ws_params, null, 2); } catch { return ''; }
  }

  private _onWsParamsChange(e: any) {
    const val = e.target.value.trim();
    if (!val) {
      this._update('ws_params', undefined);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        this._update('ws_params', parsed);
      }
    } catch {
      // Don't update on invalid JSON
    }
  }

  private _onFieldMapChange(e: any) {
    const val = e.target.value.trim();
    if (!val) {
      this._update('field_map', undefined);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        this._update('field_map', parsed);
      }
    } catch {
      // Don't update on invalid JSON — user is still typing
    }
  }

  private _staticEventsToString(): string {
    if (!this.source.events || this.source.events.length === 0) return '';
    try { return JSON.stringify(this.source.events, null, 2); } catch { return ''; }
  }

  private _onStaticEventsChange(e: any) {
    const val = e.target.value.trim();
    if (!val) {
      this._update('events', undefined);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        this._update('events', parsed);
      }
    } catch {
      // Don't update on invalid JSON
    }
  }

  private _mapToString(map?: Record<string, string>): string {
    if (!map || Object.keys(map).length === 0) return '';
    try { return JSON.stringify(map); } catch { return ''; }
  }

  private _onMapChange(key: string, e: any) {
    const val = e.target.value.trim();
    if (!val) {
      this._update(key, undefined);
      return;
    }
    try {
      const parsed = JSON.parse(val);
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        this._update(key, parsed);
      }
    } catch {
      // Don't update on invalid JSON
    }
  }

  private _onTypeChange(e: any) {
    this._update('type', e.target.value);
  }

  private _update(key: string, value: unknown) {
    this.dispatchEvent(new CustomEvent('source-changed', {
      bubbles: true,
      composed: true,
      detail: { index: this.index, key, value },
    }));
  }

  private _remove() {
    this.dispatchEvent(new CustomEvent('source-removed', {
      bubbles: true,
      composed: true,
      detail: { index: this.index },
    }));
  }
}
