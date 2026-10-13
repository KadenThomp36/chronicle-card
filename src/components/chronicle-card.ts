import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { AppearanceConfig, ChronicleCardConfig, DEFAULT_CONFIG, SourceConfig } from '../models/config';
import { ChronicleEvent, EventGroup } from '../models/event';
import { EventStore } from '../store/event-store';
import { setLocale } from '../localize';
import { setFormatContext } from '../utils/date-utils';
import { EDITOR_NAME } from '../constants';
import type { DetailDialog } from './elements/detail-dialog';
import './layouts/vertical-timeline';
import './layouts/horizontal-timeline';
import './elements/detail-dialog';

@customElement('chronicle-card')
export class ChronicleCard extends LitElement {
  @state() private _config?: ChronicleCardConfig;
  @state() private _items: Array<ChronicleEvent | EventGroup> = [];
  @state() private _layout: 'vertical' | 'horizontal' = 'vertical';
  /** Bumped when hass settings that affect rendering (language, time format/zone) change. */
  @state() private _localeKey = '';

  @query('chronicle-detail-dialog') private _dialog?: DetailDialog;

  private _store = new EventStore();
  private _storeUnsub?: () => void;
  private _pollTimer?: ReturnType<typeof setInterval>;
  private _hass?: HomeAssistant;
  private _rawConfig?: ChronicleCardConfig;

  static getConfigElement() {
    return document.createElement(EDITOR_NAME);
  }

  /** Card-picker preview: a timeline of something this instance actually has. */
  static getStubConfig(hass?: HomeAssistant): Partial<ChronicleCardConfig> {
    const ids = Object.keys(hass?.states ?? {});
    const calendar = ids.find((id) => id.startsWith('calendar.'));
    const tracked = ids
      .filter((id) => /^(binary_sensor|lock|cover|person|light)\./.test(id))
      .slice(0, 3);
    const sources: SourceConfig[] = calendar
      ? [{ type: 'calendar', entity: calendar }]
      : tracked.length
        ? [{ type: 'history', entities: tracked }]
        : [];
    return { title: 'Timeline', sources };
  }

  setConfig(config: ChronicleCardConfig): void {
    if (!config) throw new Error('No configuration provided');
    if (config.sources !== undefined && !Array.isArray(config.sources)) {
      throw new Error('"sources" must be a list');
    }
    // HA calls setConfig again with an identical object on many re-renders
    if (this._rawConfig && JSON.stringify(this._rawConfig) === JSON.stringify(config)) return;
    const layoutChanged = this._rawConfig?.layout !== config.layout;
    this._rawConfig = config;

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      sources: config.sources ?? [],
      filters: { ...DEFAULT_CONFIG.filters, ...config.filters },
      grouping: { ...DEFAULT_CONFIG.grouping, ...config.grouping },
      appearance: { ...DEFAULT_CONFIG.appearance, ...config.appearance },
    } as ChronicleCardConfig;

    if (layoutChanged) this._layout = this._config.layout ?? 'vertical';
    this._store.configure(this._config);
    if (this._hass && this.isConnected) this._fetch(true);
    if (this.isConnected) this._startPolling();
  }

  set hass(hass: HomeAssistant) {
    const old = this._hass;
    this._hass = hass;

    // Only re-render for hass changes that affect formatting — the timeline
    // itself re-renders through the store subscription.
    const localeKey = [
      this._config?.language, hass.locale?.language, hass.language,
      hass.locale?.time_format, hass.locale?.time_zone, hass.config?.time_zone,
    ].join('|');
    if (localeKey !== this._localeKey) this._localeKey = localeKey;

    if (!this.isConnected || !this._config) return;
    if (!old) {
      this._fetch(false);
    } else {
      this._store.processStateChanges(hass, old).catch((err: unknown) => {
        console.warn('[chronicle-card] Live update error:', err);
      });
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._storeUnsub?.();
    this._storeUnsub = this._store.subscribe(() => {
      this._items = [...this._store.items];
    });
    this._items = [...this._store.items];
    this._startPolling();
    // Catch up on anything missed while detached (fetch is staleness-throttled)
    if (this._hass && this._config) this._fetch(false);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._storeUnsub?.();
    this._storeUnsub = undefined;
    this._stopPolling();
  }

  private _fetch(force: boolean): void {
    if (!this._hass) return;
    this._syncLocale();
    this._store.fetch(this._hass, force).catch((err: unknown) => {
      console.warn('[chronicle-card] Fetch error:', err);
    });
  }

  /** Poll on a timer so REST/logbook/calendar sources refresh even when no states change. */
  private _startPolling(): void {
    this._stopPolling();
    if (!this._config) return;
    this._pollTimer = setInterval(() => this._fetch(true), this._store.pollInterval);
  }

  private _stopPolling(): void {
    if (this._pollTimer) clearInterval(this._pollTimer);
    this._pollTimer = undefined;
  }

  /**
   * Sync module-level language and date formatting from `config.language`
   * (explicit override) or the HA user profile. Called at render time so
   * multiple cards with different `language` settings each render correctly.
   */
  private _syncLocale(): void {
    const language = this._config?.language || this._hass?.locale?.language || this._hass?.language || 'en';
    setLocale(language);
    setFormatContext(this._hass, language, this._config?.time_format);
  }

  /** card_height: fill, or a row count set in the sections-view layout editor. */
  private get _fill(): boolean {
    const h = this._config?.appearance?.card_height;
    return h === 'fill' || h === '100%' || typeof this._config?.grid_options?.rows === 'number';
  }

  protected willUpdate(changed: PropertyValues): void {
    super.willUpdate(changed);
    // Reflect a `fill` attribute so :host([fill]) styles stretch the card to
    // the height the dashboard hands us (Panel layout, sized grid sections).
    this.toggleAttribute('fill', this._fill);
  }

  static styles = css`
    :host {
      display: block;
      contain: content;
    }

    /* Fill mode — stretch the whole chain to the height the dashboard gives us. */
    :host([fill]) {
      height: 100%;
    }

    ha-card {
      overflow: hidden;
    }

    :host([fill]) ha-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    :host([fill]) .card-content {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    :host([fill]) .card-content > * {
      flex: 1 1 auto;
      min-height: 0;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 16px 6px;
    }

    .title {
      font-size: 15px;
      font-weight: 700;
      color: var(--ha-card-header-color, var(--primary-text-color, #333));
      letter-spacing: -0.3px;
    }

    .header-actions {
      display: flex;
      gap: 3px;
    }

    .layout-toggle {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #999);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease, color 0.2s ease;
    }
    .layout-toggle:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.08));
      color: var(--primary-text-color, #333);
    }
    .layout-toggle:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: 1px;
    }
    .layout-toggle.active {
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
    }
    .layout-toggle ha-icon {
      --mdc-icon-size: 17px;
    }

    .card-content {
      padding: 0 16px 14px;
    }
  `;

  protected render() {
    if (!this._config) return nothing;
    this._syncLocale();

    const showHeader = this._config.show_header !== false;
    const showToggle = this._config.show_layout_toggle !== false;
    const appearance: AppearanceConfig = {
      ...this._config.appearance,
      ...(this._fill ? { card_height: 'fill' } : {}),
    };
    const compact = appearance.compact ?? false;
    const animate = appearance.animate_new_events !== false;

    return html`
      <ha-card>
        ${showHeader && (this._config.title || showToggle) ? html`
          <div class="card-header">
            <span class="title">${this._config.title ?? ''}</span>
            ${showToggle ? html`
              <div class="header-actions">
                ${this._renderToggle('vertical', 'mdi:view-sequential', 'Vertical timeline')}
                ${this._renderToggle('horizontal', 'mdi:view-carousel', 'Horizontal timeline')}
              </div>
            ` : nothing}
          </div>
        ` : nothing}

        <div class="card-content" @chronicle-show-detail=${this._onShowDetail} @chronicle-toggle-group=${this._onToggleGroup}>
          ${this._layout === 'vertical'
            ? html`
              <chronicle-vertical-timeline
                .items=${this._items}
                .appearance=${appearance}
                ?compact=${compact}
                ?animateNew=${animate}
              ></chronicle-vertical-timeline>
            `
            : html`
              <chronicle-horizontal-timeline
                .items=${this._items}
                .appearance=${appearance}
              ></chronicle-horizontal-timeline>
            `
          }
        </div>

        <chronicle-detail-dialog .severityColors=${appearance.severity_colors}></chronicle-detail-dialog>
      </ha-card>
    `;
  }

  private _renderToggle(layout: 'vertical' | 'horizontal', icon: string, label: string) {
    const active = this._layout === layout;
    return html`
      <button
        class="layout-toggle ${active ? 'active' : ''}"
        aria-pressed=${active ? 'true' : 'false'}
        aria-label=${label}
        title=${label}
        @click=${() => { this._layout = layout; }}
      >
        <ha-icon .icon=${icon}></ha-icon>
      </button>
    `;
  }

  private _onShowDetail(e: CustomEvent) {
    this._dialog?.show(e.detail.event as ChronicleEvent);
  }

  private _onToggleGroup(e: CustomEvent) {
    this._store.toggleGroup(e.detail.group as EventGroup);
  }

  /** 1 unit = 50px (masonry view). */
  getCardSize(): number {
    const header = this._config?.show_header !== false ? 1 : 0;
    const h = this._config?.appearance?.card_height ?? '400px';
    const px = /^(\d+)px$/.exec(h);
    return header + (px ? Math.ceil(Number(px[1]) / 50) : 6);
  }

  /** Sections view: full width by default, auto height unless resized. */
  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      min_rows: 3,
    };
  }
}
