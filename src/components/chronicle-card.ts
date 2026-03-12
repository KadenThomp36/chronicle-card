import { LitElement, html, css, nothing } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { HomeAssistant } from '../types';
import { ChronicleCardConfig, DEFAULT_CONFIG } from '../models/config';
import { ChronicleEvent, EventGroup } from '../models/event';
import { EventStore } from '../store/event-store';
import './layouts/vertical-timeline';
import './layouts/horizontal-timeline';
import './elements/detail-dialog';

@customElement('chronicle-card')
export class ChronicleCard extends LitElement {
  @state() private _config!: ChronicleCardConfig;
  @state() private _items: Array<ChronicleEvent | EventGroup> = [];
  @state() private _layout: 'vertical' | 'horizontal' = 'vertical';

  @query('chronicle-detail-dialog') private _dialog?: any;

  private _store = new EventStore();
  private _storeUnsub?: () => void;
  private _hass?: HomeAssistant;
  private _liveSubscribed = false;

  static getConfigElement() {
    return document.createElement('chronicle-card-editor');
  }

  static getStubConfig() {
    return {
      type: 'custom:chronicle-card',
      title: 'Timeline',
      layout: 'vertical',
      sources: [],
    };
  }

  setConfig(config: ChronicleCardConfig): void {
    if (!config) throw new Error('No configuration provided');

    this._config = {
      ...DEFAULT_CONFIG,
      ...config,
      filters: { ...DEFAULT_CONFIG.filters, ...config.filters },
      grouping: { ...DEFAULT_CONFIG.grouping, ...config.grouping },
      appearance: { ...DEFAULT_CONFIG.appearance, ...config.appearance },
    } as ChronicleCardConfig;

    this._layout = this._config.layout ?? 'vertical';
    this._store.configure(this._config);

    this._storeUnsub?.();
    this._storeUnsub = this._store.subscribe(() => {
      this._items = [...this._store.items];
    });
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this.requestUpdate();

    this._store.fetch(hass).catch((err: unknown) => {
      console.warn('[chronicle-card] Fetch error:', err);
    });

    if (!this._liveSubscribed) {
      this._liveSubscribed = true;
      this._store.subscribeLive(hass).catch(() => {});
    }
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this._hass) {
      this._store.subscribeLive(this._hass).catch(() => {});
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._store.unsubscribeLive();
    this._liveSubscribed = false;
    this._storeUnsub?.();
  }

  static styles = css`
    :host {
      display: block;
      contain: content;
    }

    ha-card {
      overflow: hidden;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      border-radius: var(--ha-card-border-radius, 12px);
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
      color: var(--primary-text-color, #333);
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
    .layout-toggle.active {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      box-shadow: 0 1px 4px rgba(3,169,244,0.25);
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

    const showHeader = this._config.show_header !== false;
    const showToggle = this._config.show_layout_toggle !== false;
    const appearance = this._config.appearance ?? {};
    const timeFormat = this._config.time_format ?? '24h';
    const compact = appearance.compact ?? false;
    const animate = appearance.animate_new_events !== false;

    return html`
      <ha-card>
        ${showHeader ? html`
          <div class="card-header">
            <span class="title">${this._config.title ?? ''}</span>
            ${showToggle ? html`
              <div class="header-actions">
                <button
                  class="layout-toggle ${this._layout === 'vertical' ? 'active' : ''}"
                  @click=${() => this._setLayout('vertical')}
                  title="Vertical timeline"
                >
                  <ha-icon icon="mdi:view-sequential"></ha-icon>
                </button>
                <button
                  class="layout-toggle ${this._layout === 'horizontal' ? 'active' : ''}"
                  @click=${() => this._setLayout('horizontal')}
                  title="Horizontal timeline"
                >
                  <ha-icon icon="mdi:view-carousel"></ha-icon>
                </button>
              </div>
            ` : ''}
          </div>
        ` : ''}

        <div class="card-content" @chronicle-show-detail=${this._onShowDetail} @chronicle-toggle-group=${this._onToggleGroup}>
          ${this._layout === 'vertical'
            ? html`
              <chronicle-vertical-timeline
                .items=${this._items}
                .appearance=${appearance}
                .hass=${this.hass}
                .timeFormat=${timeFormat}
                ?compact=${compact}
                ?animateNew=${animate}
              ></chronicle-vertical-timeline>
            `
            : html`
              <chronicle-horizontal-timeline
                .items=${this._items}
                .appearance=${appearance}
                .hass=${this.hass}
                .timeFormat=${timeFormat}
              ></chronicle-horizontal-timeline>
            `
          }
        </div>

        <chronicle-detail-dialog .hass=${this.hass}></chronicle-detail-dialog>
      </ha-card>
    `;
  }

  private _setLayout(layout: 'vertical' | 'horizontal') {
    this._layout = layout;
  }

  private _onShowDetail(e: CustomEvent) {
    const event = e.detail.event as ChronicleEvent;
    if (this._dialog) {
      this._dialog.show(event);
    }
  }

  private _onToggleGroup(e: CustomEvent) {
    const group = e.detail.group as EventGroup;
    this._store.toggleGroup(group);
  }

  getCardSize(): number {
    return 4;
  }
}
