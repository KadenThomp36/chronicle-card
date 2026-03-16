import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SourceConfig, ActionConfig } from '../models/config';

/** Domain-based state options for the per-entity state filter selector. */
const DOMAIN_STATE_OPTIONS: Record<string, Array<{ value: string; label: string }>> = {
  binary_sensor: [
    { value: 'on', label: 'On' },
    { value: 'off', label: 'Off' },
  ],
  lock: [
    { value: 'locked', label: 'Locked' },
    { value: 'unlocked', label: 'Unlocked' },
    { value: 'jammed', label: 'Jammed' },
    { value: 'locking', label: 'Locking' },
    { value: 'unlocking', label: 'Unlocking' },
  ],
  cover: [
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'opening', label: 'Opening' },
    { value: 'closing', label: 'Closing' },
  ],
  light: [
    { value: 'on', label: 'On' },
    { value: 'off', label: 'Off' },
  ],
  switch: [
    { value: 'on', label: 'On' },
    { value: 'off', label: 'Off' },
  ],
  fan: [
    { value: 'on', label: 'On' },
    { value: 'off', label: 'Off' },
  ],
  input_boolean: [
    { value: 'on', label: 'On' },
    { value: 'off', label: 'Off' },
  ],
  person: [
    { value: 'home', label: 'Home' },
    { value: 'not_home', label: 'Away' },
  ],
  device_tracker: [
    { value: 'home', label: 'Home' },
    { value: 'not_home', label: 'Away' },
  ],
  alarm_control_panel: [
    { value: 'armed_away', label: 'Armed Away' },
    { value: 'armed_home', label: 'Armed Home' },
    { value: 'armed_night', label: 'Armed Night' },
    { value: 'disarmed', label: 'Disarmed' },
    { value: 'triggered', label: 'Triggered' },
    { value: 'pending', label: 'Pending' },
  ],
  climate: [
    { value: 'off', label: 'Off' },
    { value: 'heat', label: 'Heating' },
    { value: 'cool', label: 'Cooling' },
    { value: 'auto', label: 'Auto' },
    { value: 'fan_only', label: 'Fan Only' },
    { value: 'dry', label: 'Dry' },
  ],
  vacuum: [
    { value: 'cleaning', label: 'Cleaning' },
    { value: 'docked', label: 'Docked' },
    { value: 'returning', label: 'Returning' },
    { value: 'idle', label: 'Idle' },
    { value: 'paused', label: 'Paused' },
  ],
  media_player: [
    { value: 'playing', label: 'Playing' },
    { value: 'paused', label: 'Paused' },
    { value: 'idle', label: 'Idle' },
    { value: 'off', label: 'Off' },
  ],
};

const DEFAULT_STATE_OPTIONS = [
  { value: 'on', label: 'On' },
  { value: 'off', label: 'Off' },
];

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
    ha-textfield, ha-select, ha-entity-picker, ha-icon-picker, ha-selector {
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

    /* Per-entity expansion panels */
    ha-expansion-panel {
      margin-bottom: 4px;
      --expansion-panel-summary-padding: 8px 12px;
    }
    .entity-panel-content {
      padding: 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .state-label-row {
      display: flex;
      gap: 8px;
      align-items: flex-end;
      margin-bottom: 4px;
    }
    .state-label-row ha-textfield {
      flex: 1;
    }
    .state-label-remove {
      border: none;
      background: none;
      color: var(--error-color, #db4437);
      cursor: pointer;
      font-size: 16px;
      padding: 4px 8px;
      flex-shrink: 0;
      line-height: 1;
      margin-bottom: 8px;
    }
    .state-label-remove:hover {
      background: rgba(219, 68, 55, 0.1);
      border-radius: 4px;
    }
    .add-label-btn {
      border: 1px dashed var(--divider-color, rgba(127,127,127,0.3));
      background: transparent;
      color: var(--primary-color, #03a9f4);
      cursor: pointer;
      font-size: 12px;
      padding: 6px 10px;
      border-radius: 6px;
      font-family: inherit;
    }
    .add-label-btn:hover {
      border-color: var(--primary-color, #03a9f4);
      background: rgba(3, 169, 244, 0.04);
    }

    .clearable-row {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .clearable-row > :first-child {
      flex: 1;
      min-width: 0;
    }
    .clear-btn {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 50%;
      background: var(--secondary-background-color, rgba(127,127,127,0.06));
      color: var(--secondary-text-color, #888);
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: background 0.15s ease, color 0.15s ease;
    }
    .clear-btn:hover {
      background: rgba(219, 68, 55, 0.1);
      color: var(--error-color, #db4437);
      border-color: var(--error-color, #db4437);
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

  /** Get domain-based state options for per-entity state filter. */
  private _getStateOptions(entityId: string): Array<{ value: string; label: string }> {
    const domain = entityId.split('.')[0];
    return DOMAIN_STATE_OPTIONS[domain] || DEFAULT_STATE_OPTIONS;
  }

  /** Get a friendly name for an entity. */
  private _getFriendlyName(entityId: string): string {
    return this.hass?.states[entityId]?.attributes?.friendly_name || entityId;
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
            <ha-selector
              .hass=${this.hass}
              .selector=${{ entity: { filter: [{ domain: 'calendar' }] } }}
              .value=${this.source.entity ?? ''}
              .label=${"Calendar entity"}
              @value-changed=${(e: any) => this._update('entity', e.detail.value)}
            ></ha-selector>
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
            <ha-selector
              .hass=${this.hass}
              .selector=${{ entity: { multiple: true } }}
              .value=${this._getHistoryEntities()}
              .label=${"Entities"}
              @value-changed=${this._onEntitiesChanged}
            ></ha-selector>
            <p class="help-text">Each state change becomes a timeline event.</p>
          </div>
          ${this._renderPerEntityConfig()}
          ${this._renderTemplateAndActions()}
          ${this._renderSourceLevelDefaults()}
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

  // ---------------------------------------------------------------------------
  // Per-entity config panels
  // ---------------------------------------------------------------------------

  private _renderPerEntityConfig() {
    const entities = this._getHistoryEntities();
    if (entities.length === 0) return nothing;

    return html`
      <div class="section-label">Entity Settings</div>
      <p class="help-text" style="margin-bottom: 8px;">
        Expand an entity to customize its name, state filter, labels, icon, and severity.
        Unconfigured entities use smart defaults based on their device class.
      </p>
      ${entities.map(entityId => this._renderEntityPanel(entityId))}
    `;
  }

  private _renderEntityPanel(entityId: string) {
    const conf = this.source.entity_config?.[entityId] ?? {};
    const friendlyName = this._getFriendlyName(entityId);
    const hasOverrides = Object.keys(conf).length > 0;
    const domain = entityId.split('.')[0];
    const stateOptions = this._getStateOptions(entityId);

    // Build state_map entries for the key-value editor
    const stateMapEntries = conf.state_map ? Object.entries(conf.state_map) : [];

    return html`
      <ha-expansion-panel
        .outlined=${true}
        .header=${friendlyName}
        .secondary=${hasOverrides ? `${entityId} · customized` : entityId}
      >
        <div class="entity-panel-content">
          <!-- Custom name -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{ text: {} }}
            .value=${conf.name ?? ''}
            .label=${"Custom display name"}
            .helper=${"Override the entity's friendly name in the timeline"}
            @value-changed=${(e: any) => this._updateEntityConfig(entityId, 'name', e.detail.value)}
          ></ha-selector>

          <!-- State filter (chip-based multi-select) -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{ select: { options: stateOptions, multiple: true, custom_value: true, mode: 'list' } }}
            .value=${conf.state_filter ?? []}
            .label=${"State filter"}
            .helper=${"Only log events for these states. Leave empty to log all changes."}
            @value-changed=${(e: any) => this._updateEntityConfig(entityId, 'state_filter', e.detail.value)}
          ></ha-selector>

          <!-- State labels (key-value pairs) -->
          ${stateMapEntries.length > 0 || conf.state_map ? html`
            <label>State Labels</label>
            ${stateMapEntries.map(([state, label], idx) => html`
              <div class="state-label-row">
                <ha-textfield
                  .value=${state}
                  .label=${"State value"}
                  @change=${(e: any) => this._updateStateMapKey(entityId, idx, e.target.value, label)}
                ></ha-textfield>
                <ha-textfield
                  .value=${label}
                  .label=${"Display label"}
                  @change=${(e: any) => this._updateStateMapValue(entityId, state, e.target.value)}
                ></ha-textfield>
                <button
                  class="state-label-remove"
                  @click=${() => this._removeStateMapEntry(entityId, state)}
                  title="Remove label"
                >&#x2715;</button>
              </div>
            `)}
          ` : nothing}
          <button
            class="add-label-btn"
            @click=${() => this._addStateMapEntry(entityId)}
          >+ Add state label</button>

          <!-- Icon override -->
          <div class="clearable-row">
            <ha-selector
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${conf.icon ?? ''}
              .label=${"Icon override"}
              @value-changed=${(e: any) => this._updateEntityConfig(entityId, 'icon', e.detail.value)}
            ></ha-selector>
            ${conf.icon ? html`
              <button class="clear-btn" @click=${() => this._updateEntityConfig(entityId, 'icon', undefined)} title="Clear icon override">&times;</button>
            ` : nothing}
          </div>

          <!-- Color override -->
          <div class="clearable-row">
            <div class="field" style="flex:1;margin-bottom:0;">
              <label>Color override</label>
              <input
                type="color"
                .value=${conf.color ?? this.source.default_color ?? '#2196F3'}
                @input=${(e: any) => this._updateEntityConfig(entityId, 'color', e.target.value)}
              />
            </div>
            ${conf.color ? html`
              <button class="clear-btn" @click=${() => this._updateEntityConfig(entityId, 'color', undefined)} title="Clear color override">&times;</button>
            ` : nothing}
          </div>

          <!-- Severity override -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{ select: {
              options: [
                { value: 'default', label: 'Detail Dialog (default)' },
                { value: 'critical', label: 'Critical' },
                { value: 'warning', label: 'Warning' },
                { value: 'info', label: 'Info' },
                { value: 'debug', label: 'Debug' },
              ],
              mode: 'dropdown',
            } }}
            .value=${conf.severity ?? ''}
            .label=${"Severity override"}
            @value-changed=${(e: any) => this._updateEntityConfig(entityId, 'severity', e.detail.value || undefined)}
          ></ha-selector>

          <!-- Per-entity image template -->
          <ha-selector
            .hass=${this.hass}
            .selector=${{ template: {} }}
            .value=${conf.image_template ?? ''}
            .label=${"Image template override"}
            .helper=${"Overrides the source-level image template for this entity"}
            @value-changed=${(e: any) => this._updateEntityConfig(entityId, 'image_template', e.detail.value || undefined)}
          ></ha-selector>

          <!-- Per-entity tap action -->
          ${this._renderEntityActionEditor(entityId, 'tap_action', 'Tap Action', conf.tap_action)}

          <!-- Per-entity hold action -->
          ${this._renderEntityActionEditor(entityId, 'hold_action', 'Hold Action', conf.hold_action)}
        </div>
      </ha-expansion-panel>
    `;
  }

  // ---------------------------------------------------------------------------
  // Template + Actions (history sources)
  // ---------------------------------------------------------------------------

  private _renderTemplateAndActions() {
    if (this.source.type !== 'history') return nothing;

    return html`
      <div class="section-label">Image Template & Actions</div>
      <div class="field">
        <ha-selector
          .hass=${this.hass}
          .selector=${{ template: {} }}
          .value=${this.source.image_template ?? ''}
          .label=${"Image template (Jinja2)"}
          .helper=${"Dynamic thumbnail per event. Variables: entity_id, state, old_state, timestamp, attributes, source_name"}
          @value-changed=${(e: any) => this._update('image_template', e.detail.value || undefined)}
        ></ha-selector>
      </div>
      <div class="row">
        <div class="field">
          ${this._renderActionEditor('tap_action', 'Tap Action', this.source.tap_action)}
        </div>
        <div class="field">
          ${this._renderActionEditor('hold_action', 'Hold Action', this.source.hold_action)}
        </div>
      </div>
      <p class="help-text">
        Default tap opens the detail dialog. "More Info" opens the entity's native HA dialog.
      </p>
    `;
  }

  private _renderActionEditor(key: string, label: string, config?: ActionConfig) {
    return html`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ select: {
          options: [
            { value: 'default', label: 'Detail Dialog (default)' },
            { value: 'more-info', label: 'More Info' },
            { value: 'navigate', label: 'Navigate' },
            { value: 'call-service', label: 'Call Service' },
            { value: 'none', label: 'None' },
          ],
          mode: 'dropdown',
        } }}
        .value=${config?.action || 'default'}
        .label=${label}
        @value-changed=${(e: any) => this._onActionTypeChange(key, e.detail.value)}
      ></ha-selector>
      ${config?.action === 'navigate' ? html`
        <ha-textfield
          .value=${config.navigation_path ?? ''}
          .label=${"Navigation path"}
          @input=${(e: any) => this._updateActionField(key, 'navigation_path', e.target.value)}
          style="margin-top: 4px;"
        ></ha-textfield>
      ` : nothing}
      ${config?.action === 'call-service' ? html`
        <ha-textfield
          .value=${config.service ?? ''}
          .label=${"Service (e.g. light.toggle)"}
          @input=${(e: any) => this._updateActionField(key, 'service', e.target.value)}
          style="margin-top: 4px;"
        ></ha-textfield>
      ` : nothing}
    `;
  }

  private _onActionTypeChange(key: string, value: string) {
    if (!value || value === 'default') {
      this._update(key, undefined);
    } else {
      const existing = (this.source as any)[key] ?? {};
      this._update(key, { ...existing, action: value });
    }
  }

  private _updateActionField(actionKey: string, field: string, value: string) {
    const existing = (this.source as any)[actionKey] ?? {};
    this._update(actionKey, { ...existing, [field]: value || undefined });
  }

  private _renderEntityActionEditor(entityId: string, key: string, label: string, config?: ActionConfig) {
    return html`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ select: {
          options: [
            { value: 'default', label: 'Detail Dialog (default)' },
            { value: 'more-info', label: 'More Info' },
            { value: 'navigate', label: 'Navigate' },
            { value: 'call-service', label: 'Call Service' },
            { value: 'none', label: 'None' },
          ],
          mode: 'dropdown',
        } }}
        .value=${config?.action || 'default'}
        .label=${label}
        @value-changed=${(e: any) => {
          const v = e.detail.value;
          this._updateEntityConfig(entityId, key, (v && v !== 'default') ? { ...(config ?? {}), action: v } : undefined);
        }}
      ></ha-selector>
      ${config?.action === 'navigate' ? html`
        <ha-textfield
          .value=${config.navigation_path ?? ''}
          .label=${"Navigation path"}
          @input=${(e: any) => {
            this._updateEntityConfig(entityId, key, { ...(config ?? {}), navigation_path: e.target.value || undefined });
          }}
          style="margin-top: 4px;"
        ></ha-textfield>
      ` : nothing}
      ${config?.action === 'call-service' ? html`
        <ha-textfield
          .value=${config.service ?? ''}
          .label=${"Service (e.g. light.toggle)"}
          @input=${(e: any) => {
            this._updateEntityConfig(entityId, key, { ...(config ?? {}), service: e.target.value || undefined });
          }}
          style="margin-top: 4px;"
        ></ha-textfield>
      ` : nothing}
    `;
  }

  /**
   * Source-level defaults (state_filter, state_map) are still supported via YAML
   * but no longer shown in the GUI to reduce visual noise. Per-entity config
   * panels are the preferred way to configure these.
   */
  private _renderSourceLevelDefaults() {
    // No longer rendered in the editor — YAML-only for backward compat
    return nothing;
  }

  // ---------------------------------------------------------------------------
  // Entity list handlers (native ha-selector entity multiple)
  // ---------------------------------------------------------------------------

  private _onEntitiesChanged(e: any) {
    const value = e.detail.value;
    if (!Array.isArray(value)) return;

    this._update('entities', value.length > 0 ? value : undefined);

    // Clear legacy single-entity field
    if (this.source.entity) {
      this._update('entity', undefined);
    }

    // Clean up entity_config for removed entities
    if (this.source.entity_config) {
      const validEntities = new Set(value);
      const cleanedConfig: Record<string, any> = {};
      for (const [key, val] of Object.entries(this.source.entity_config)) {
        if (validEntities.has(key)) {
          cleanedConfig[key] = val;
        }
      }
      this._update('entity_config', Object.keys(cleanedConfig).length > 0 ? cleanedConfig : undefined);
    }
  }

  // ---------------------------------------------------------------------------
  // Per-entity config handlers
  // ---------------------------------------------------------------------------

  private _updateEntityConfig(entityId: string, key: string, value: any) {
    const current = { ...(this.source.entity_config ?? {}) };
    const entityConf = { ...(current[entityId] ?? {}), [key]: value };

    // Clean up empty/falsy values
    if (!value || (Array.isArray(value) && value.length === 0)) {
      delete (entityConf as any)[key];
    }

    if (Object.keys(entityConf).length === 0) {
      delete current[entityId];
    } else {
      current[entityId] = entityConf;
    }

    this._update('entity_config', Object.keys(current).length > 0 ? current : undefined);
  }

  private _addStateMapEntry(entityId: string) {
    const current = { ...(this.source.entity_config ?? {}) };
    const entityConf = { ...(current[entityId] ?? {}) };
    const stateMap = { ...(entityConf.state_map ?? {}), '': '' };
    entityConf.state_map = stateMap;
    current[entityId] = entityConf;
    this._update('entity_config', current);
  }

  private _updateStateMapKey(entityId: string, index: number, newKey: string, label: string) {
    const current = { ...(this.source.entity_config ?? {}) };
    const entityConf = { ...(current[entityId] ?? {}) };
    const entries = Object.entries(entityConf.state_map ?? {});
    // Remove old entry, add with new key
    if (index < entries.length) {
      entries.splice(index, 1);
    }
    if (newKey) {
      entries.push([newKey, label]);
    }
    entityConf.state_map = Object.fromEntries(entries);
    if (Object.keys(entityConf.state_map).length === 0) {
      delete entityConf.state_map;
    }
    current[entityId] = entityConf;
    if (Object.keys(entityConf).length === 0) {
      delete current[entityId];
    }
    this._update('entity_config', Object.keys(current).length > 0 ? current : undefined);
  }

  private _updateStateMapValue(entityId: string, state: string, label: string) {
    const current = { ...(this.source.entity_config ?? {}) };
    const entityConf = { ...(current[entityId] ?? {}) };
    const stateMap = { ...(entityConf.state_map ?? {}), [state]: label };
    entityConf.state_map = stateMap;
    current[entityId] = entityConf;
    this._update('entity_config', current);
  }

  private _removeStateMapEntry(entityId: string, state: string) {
    const current = { ...(this.source.entity_config ?? {}) };
    const entityConf = { ...(current[entityId] ?? {}) };
    const stateMap = { ...(entityConf.state_map ?? {}) };
    delete stateMap[state];
    if (Object.keys(stateMap).length === 0) {
      delete entityConf.state_map;
    } else {
      entityConf.state_map = stateMap;
    }
    if (Object.keys(entityConf).length === 0) {
      delete current[entityId];
    } else {
      current[entityId] = entityConf;
    }
    this._update('entity_config', Object.keys(current).length > 0 ? current : undefined);
  }

  // ---------------------------------------------------------------------------
  // Appearance maps
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // Serialization helpers
  // ---------------------------------------------------------------------------

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
