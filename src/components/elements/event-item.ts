import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleEvent } from '../../models/event';
import { AppearanceConfig, ActionConfig } from '../../models/config';
import { HomeAssistant } from '../../types';
import { CATEGORY_ICONS } from '../../constants';
import { formatTime } from '../../utils/date-utils';
import './severity-badge';
import './action-button';

const HOLD_DURATION = 500;

function validIcon(icon: string): string {
  return icon && icon.startsWith('mdi:') ? icon : CATEGORY_ICONS.default;
}

/** Mix a hex color toward white to create a light tint for icon contrast. */
function tintColor(hex: string, amount = 0.82): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return '#ffffff';
  const r = Math.round(parseInt(m[1], 16) + (255 - parseInt(m[1], 16)) * amount);
  const g = Math.round(parseInt(m[2], 16) + (255 - parseInt(m[2], 16)) * amount);
  const b = Math.round(parseInt(m[3], 16) + (255 - parseInt(m[3], 16)) * amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

@customElement('chronicle-event-item')
export class EventItem extends LitElement {
  @property({ attribute: false }) event!: ChronicleEvent;
  @property({ attribute: false }) appearance?: AppearanceConfig;
  @property({ attribute: false }) hass?: HomeAssistant;
  @property({ type: Boolean }) compact = false;
  @property({ type: String }) timeFormat: '12h' | '24h' = '24h';
  @property({ type: Boolean, reflect: true }) animated = false;

  static styles = css`
    :host {
      display: block;
    }
    :host([animated]) .event-item {
      animation: chronicle-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    @keyframes chronicle-slide-in {
      from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    .event-row {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* Icon sits outside the hoverable card area, over the timeline line */
    .icon-wrap {
      flex-shrink: 0;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
      z-index: 2;
      margin-top: 9px;
      margin-right: 8px;
    }
    .icon-wrap ha-icon {
      --mdc-icon-size: 17px;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
    }
    :host([compact]) .icon-wrap {
      width: 26px;
      height: 26px;
      margin-right: 6px;
    }
    :host([compact]) .icon-wrap ha-icon {
      --mdc-icon-size: 13px;
    }

    .event-item {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid transparent;
    }
    .event-item:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border-color: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }
    .event-item:active {
      transform: scale(0.99);
      transition: transform 0.1s ease;
    }

    .content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .top-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .title {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
      min-width: 0;
      letter-spacing: -0.15px;
      line-height: 1.35;
    }
    .time {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--secondary-text-color, #999);
      white-space: nowrap;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.2px;
    }

    .description {
      font-size: 12px;
      color: var(--secondary-text-color, #888);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.45;
      opacity: 0.85;
    }

    .meta-row {
      display: flex;
      align-items: center;
      gap: 5px;
      flex-wrap: wrap;
      margin-top: 1px;
    }
    .category-tag {
      font-size: 10px;
      font-weight: 500;
      padding: 1px 7px;
      border-radius: 20px;
      background: var(--divider-color, rgba(127,127,127,0.08));
      color: var(--secondary-text-color, #888);
      letter-spacing: 0.15px;
      line-height: 1.6;
    }

    .thumbnail {
      flex-shrink: 0;
      width: 52px;
      height: 52px;
      border-radius: 10px;
      object-fit: cover;
      background: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .event-item:hover .thumbnail {
      transform: scale(1.03);
      box-shadow: 0 2px 8px rgba(0,0,0,0.14);
    }
    :host([compact]) .thumbnail {
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }

    .actions-row {
      display: flex;
      gap: 6px;
      margin-top: 4px;
      flex-wrap: wrap;
    }

    :host([compact]) .content { gap: 0; }
    :host([compact]) .title { font-size: 12px; }
    :host([compact]) .description,
    :host([compact]) .meta-row,
    :host([compact]) .actions-row { display: none; }
  `;

  protected render() {
    const e = this.event;
    if (!e) return nothing;

    const showImages = this.appearance?.show_images !== false;
    const showIcons = this.appearance?.show_icons !== false;
    const showBadge = this.appearance?.show_severity_badge !== false;
    const time = formatTime(e.start, this.timeFormat);

    return html`
      <div class="event-row">
        ${showIcons ? html`
          <div class="icon-wrap" style="background-color: ${e.color}">
            <ha-icon .icon=${validIcon(e.icon)} style="color: ${tintColor(e.color)}"></ha-icon>
          </div>
        ` : ''}

        <div class="event-item"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._onPointerCancel}
          @contextmenu=${(e: Event) => { if (this.event.holdAction) e.preventDefault(); }}
        >
          <div class="content">
            <div class="top-row">
              <span class="title">${e.title}</span>
              ${showBadge && e.severity !== 'info' ? html`
                <chronicle-severity-badge
                  .severity=${e.severity}
                  .customColors=${this.appearance?.severity_colors}
                ></chronicle-severity-badge>
              ` : ''}
              <span class="time">${time}</span>
            </div>
            ${e.description ? html`<div class="description">${e.description}</div>` : ''}
            <div class="meta-row">
              ${e.category ? html`<span class="category-tag">${e.category}</span>` : ''}
              ${e.label ? html`<span class="category-tag">${e.label}</span>` : ''}
              ${e.entityName ? html`<span class="category-tag">${e.entityName}</span>` : ''}
            </div>
            ${e.actions && e.actions.length > 0 ? html`
              <div class="actions-row">
                ${e.actions.map((a) => html`
                  <chronicle-action-button .action=${a} .hass=${this.hass}></chronicle-action-button>
                `)}
              </div>
            ` : ''}
          </div>

          ${showImages && e.mediaUrl ? html`
            <img class="thumbnail" src=${e.mediaUrl} alt="" loading="lazy" />
          ` : ''}
        </div>
      </div>
    `;
  }

  private _holdTimer: ReturnType<typeof setTimeout> | null = null;
  private _holdFired = false;
  private _startX = 0;
  private _startY = 0;

  private _onPointerDown(e: PointerEvent) {
    this._holdFired = false;
    this._startX = e.clientX;
    this._startY = e.clientY;
    this._holdTimer = setTimeout(() => {
      this._holdFired = true;
      this._handleAction('hold');
    }, HOLD_DURATION);
  }

  private _onPointerUp(e: PointerEvent) {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
    // Ignore if pointer moved (user was scrolling, not tapping)
    const dx = e.clientX - this._startX;
    const dy = e.clientY - this._startY;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) return;

    if (!this._holdFired) {
      this._handleAction('tap');
    }
  }

  private _onPointerCancel() {
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  private _handleAction(type: 'tap' | 'hold') {
    const config = type === 'hold' ? this.event.holdAction : this.event.tapAction;

    // No config → tap opens detail dialog (existing default behavior)
    if (!config) {
      if (type === 'tap') {
        this.dispatchEvent(
          new CustomEvent('chronicle-show-detail', {
            bubbles: true,
            composed: true,
            detail: { event: this.event },
          }),
        );
      }
      return;
    }

    switch (config.action) {
      case 'more-info':
        if (this.event.entityId) {
          this.dispatchEvent(
            new CustomEvent('hass-more-info', {
              bubbles: true,
              composed: true,
              detail: { entityId: this.event.entityId },
            }),
          );
        }
        break;

      case 'navigate':
        if (config.navigation_path) {
          history.pushState(null, '', config.navigation_path);
          const locEvt = new CustomEvent('location-changed', {
            bubbles: true,
            composed: true,
          });
          window.dispatchEvent(locEvt);
        }
        break;

      case 'call-service':
        if (config.service && this.hass) {
          const [domain, service] = config.service.split('.', 2);
          if (domain && service) {
            this.hass.callService(domain, service, config.service_data ?? {}, config.target);
          }
        }
        break;

      case 'none':
        break;

      default:
        // Unknown action — fall back to detail dialog for tap
        if (type === 'tap') {
          this.dispatchEvent(
            new CustomEvent('chronicle-show-detail', {
              bubbles: true,
              composed: true,
              detail: { event: this.event },
            }),
          );
        }
    }
  }
}
