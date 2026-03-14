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
      margin-bottom: 6px;
    }

    /* Collapsible source wrapper */
    details {
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 10px;
      overflow: hidden;
      background: var(--secondary-background-color, rgba(127,127,127,0.04));
    }
    summary {
      padding: 10px 12px;
      font-size: 13px;
      cursor: pointer;
      user-select: none;
      list-style: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    summary::-webkit-details-marker { display: none; }
    summary::before {
      content: '▸';
      transition: transform 0.15s ease;
      font-size: 10px;
      color: var(--secondary-text-color, #999);
      flex-shrink: 0;
    }
    details[open] > summary::before {
      transform: rotate(90deg);
    }

    .type-badge {
      display: inline-block;
      padding: 2px 7px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      flex-shrink: 0;
    }
    .type-badge.calendar { background: rgba(33,150,243,0.12); color: #1976d2; }
    .type-badge.rest { background: rgba(156,39,176,0.12); color: #7b1fa2; }
    .type-badge.history { background: rgba(255,152,0,0.12); color: #e65100; }
    .type-badge.static { background: rgba(76,175,80,0.12); color: #2e7d32; }

    .source-name {
      font-weight: 500;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }
    .source-hint {
      font-size: 11px;
      color: var(--secondary-text-color, #999);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
      flex: 1;
    }
    .remove-btn {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 11px;
      padding: 3px 6px;
      border-radius: 4px;
      font-family: inherit;
      flex-shrink: 0;
      margin-left: auto;
    }
    .remove-btn:hover {
      background: rgba(219, 68, 55, 0.1);
    }

    .source-body {
      padding: 12px;
      border-top: 1px solid var(--divider-color, rgba(127,127,127,0.12));
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
    textarea {
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
    textarea:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }
    input[type="color"] {
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
    input[type="color"]:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
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
    ha-icon-picker {
      display: block;
      width: 100%;
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
    .entity-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 4px;
    }
    .entity-row ha-entity-picker {
      flex: 1;
    }
    .remove-entity-btn {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 18px;
      padding: 4px 8px;
      flex-shrink: 0;
      line-height: 1;
    }
    .remove-entity-btn:hover {
      background: rgba(219, 68, 55, 0.1);
      border-radius: 4px;
    }
  `;

  /** Build the summary hint (entity or url). */
  private _getHint(): string {
    if (this.source.type === 'history') {
      const entities = this._getHistoryEntities();
      if (entities.length === 1) return entities[0];
      if (entities.length > 1) return `${entities.length} entities`;
    }
    if (this.source.entity) return this.source.entity;
    if (this.source.url) return this.source.url;
    if (this.source.events?.length) return `${this.source.events.length} event(s)`;
    return '';
  }

  /**
   * Return the canonical entities list for the history source, migrating a
   * legacy `entity` string into the `entities` array on first access when
   * `entities` is not yet set.
   */
  private _getHistoryEntities(): string[] {
    if (this.source.entities?.length) {
      return this.source.entities;
    }
    if (this.source.entity) {
      return [this.source.entity];
    }
    return [];
  }

  protected render() {
    if (!this.source) return nothing;

    const name = this.source.name || 'Unnamed';
    const hint = this._getHint();
    const type = this.source.type;

    return html`
      <details>
        <summary>
          <span class="type-badge ${type}">${{calendar:'calendar',rest:'rest',history:'entity state',static:'template'}[type] || type}</span>
          <span class="source-name">${name}</span>
          ${hint ? html`<span class="source-hint">${hint}</span>` : nothing}
          <button class="remove-btn" @click=${this._remove}>Remove</button>
        </summary>
        <div class="source-body">
          <div class="row">
            <div class="field" style="flex:2;">
              <label>Source Type</label>
              <ha-select
                .value=${this.source.type}
                @change=${this._onTypeChange}
                @closed=${(e: any) => e.stopPropagation()}
              >
                <mwc-list-item value="calendar">Calendar Entity</mwc-list-item>
                <mwc-list-item value="rest">REST API</mwc-list-item>
                <mwc-list-item value="history">Entity State</mwc-list-item>
                <mwc-list-item value="static">Template</mwc-list-item>
              </ha-select>
            </div>
            <div class="field" style="flex:3;">
              <label>Name</label>
              <ha-textfield
                .value=${this.source.name ?? ''}
                .label=${"Source display name"}
                @input=${(e: any) => this._update('name', e.target.value)}
              ></ha-textfield>
            </div>
          </div>

          ${this._renderTypeFields()}

          <div class="section-label">Appearance</div>

          <div class="row">
            <div class="field">
              <label>Default Icon</label>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${this.source.default_icon ?? ''}
                @value-changed=${(e: any) => this._update('default_icon', e.detail.value)}
              ></ha-icon-picker>
            </div>
            <div class="field">
              <label>Default Color</label>
              <input type="color" .value=${this.source.default_color ?? '#2196F3'} @input=${(e: any) => this._update('default_color', e.target.value)} />
            </div>
            <div class="field">
              <label>Severity</label>
              <ha-select
                .value=${this.source.default_severity ?? 'info'}
                @change=${(e: any) => this._update('default_severity', e.target.value)}
                @closed=${(e: any) => e.stopPropagation()}
              >
                <mwc-list-item value="critical">Critical</mwc-list-item>
                <mwc-list-item value="warning">Warning</mwc-list-item>
                <mwc-list-item value="info">Info</mwc-list-item>
                <mwc-list-item value="debug">Debug</mwc-list-item>
              </ha-select>
            </div>
          </div>

          ${this._renderIconColorMaps()}
        </div>
      </details>
    `;
  }

  private _renderTypeFields() {
    switch (this.source.type) {
      case 'calendar':
        return html`
          <div class="field">
            <label>Calendar Entity</label>
            <ha-entity-picker
              .hass=${this.hass}
              .value=${this.source.entity ?? ''}
              .includeDomains=${["calendar"]}
              allow-custom-entity
              @value-changed=${(e: any) => this._update('entity', e.detail.value)}
            ></ha-entity-picker>
          </div>
        `;

      case 'rest':
        return html`
          <div class="field">
            <label>API URL</label>
            <ha-textfield
              .value=${this.source.url ?? ''}
              .label=${"llmvision/timeline/events?limit=50"}
              @input=${(e: any) => this._update('url', e.target.value)}
            ></ha-textfield>
            <p class="help-text">Internal HA API path (no /api/ prefix needed) or full external URL</p>
          </div>
          <div class="field">
            <label>Response Path</label>
            <ha-textfield
              .value=${this.source.response_path ?? ''}
              .label=${"events"}
              @input=${(e: any) => this._update('response_path', e.target.value)}
            ></ha-textfield>
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
            <ha-textfield
              .value=${this.source.media_url_template ?? ''}
              .label=${"/api/frigate/notifications/{id}/snapshot.jpg"}
              @input=${(e: any) => this._update('media_url_template', e.target.value)}
            ></ha-textfield>
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
            <ha-textfield
              type="number"
              .value=${String(this.source.poll_interval ?? 60)}
              .label=${"Poll interval"}
              @input=${(e: any) => this._update('poll_interval', Number(e.target.value))}
            ></ha-textfield>
          </div>
        `;

      case 'history':
        return html`
          <div class="field">
            <label>Entities</label>
            ${this._getHistoryEntities().map((entity: string, idx: number) => html`
              <div class="entity-row">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${entity}
                  allow-custom-entity
                  @value-changed=${(e: any) => this._updateHistoryEntity(idx, e.detail.value)}
                ></ha-entity-picker>
                <button
                  class="remove-entity-btn"
                  @click=${() => this._removeHistoryEntity(idx)}
                  title="Remove entity"
                >&#x2715;</button>
              </div>
            `)}
            <ha-entity-picker
              .hass=${this.hass}
              .value=${''}
              allow-custom-entity
              @value-changed=${(e: any) => this._addHistoryEntity(e.detail.value)}
            ></ha-entity-picker>
            <p class="help-text">Each state change becomes a timeline event. Add multiple entities to track them all in one source.</p>
          </div>
          <div class="field">
            <label>State Filter (comma-separated, optional)</label>
            <ha-textfield
              .value=${(this.source.state_filter ?? []).join(', ')}
              .label=${"on, locked, open"}
              @input=${(e: any) => {
                const val = e.target.value.trim();
                if (!val) {
                  this._update('state_filter', undefined);
                } else {
                  this._update('state_filter', val.split(',').map((s: string) => s.trim()).filter(Boolean));
                }
              }}
            ></ha-textfield>
            <p class="help-text">Only log events when the new state matches one of these values. Leave empty to log all state changes.</p>
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

  private _addHistoryEntity(value: string) {
    if (!value) return;
    // Migrate legacy `entity` into `entities` on first multi-entity edit
    const current = this.source.entities?.length
      ? [...this.source.entities]
      : this.source.entity ? [this.source.entity] : [];
    if (!current.includes(value)) {
      current.push(value);
      this._update('entities', current);
      // Clear the legacy single-entity field now that we have an array
      if (this.source.entity) {
        this._update('entity', undefined);
      }
    }
  }

  private _removeHistoryEntity(index: number) {
    const current = this.source.entities?.length
      ? [...this.source.entities]
      : this.source.entity ? [this.source.entity] : [];
    current.splice(index, 1);
    this._update('entities', current.length ? current : undefined);
    // Keep entity field clear once we've migrated to the array
    if (this.source.entity) {
      this._update('entity', undefined);
    }
  }

  private _updateHistoryEntity(index: number, value: string) {
    const current = this.source.entities?.length
      ? [...this.source.entities]
      : this.source.entity ? [this.source.entity] : [];
    if (value) {
      current[index] = value;
    } else {
      current.splice(index, 1);
    }
    this._update('entities', current.length ? current : undefined);
    if (this.source.entity) {
      this._update('entity', undefined);
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

  private _remove(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent('source-removed', {
      bubbles: true,
      composed: true,
      detail: { index: this.index },
    }));
  }
}
