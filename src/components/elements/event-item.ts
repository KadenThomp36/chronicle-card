import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleEvent } from '../../models/event';
import { AppearanceConfig } from '../../models/config';
import { formatTime } from '../../utils/date-utils';
import { safeColor, tintColor, validIcon } from '../../utils/color-utils';
import { handleEventAction } from '../../utils/actions';
import './severity-badge';
import './action-button';

const HOLD_DURATION = 500;

@customElement('chronicle-event-item')
export class EventItem extends LitElement {
  @property({ attribute: false }) event!: ChronicleEvent;
  @property({ attribute: false }) appearance?: AppearanceConfig;
  @property({ type: Boolean, reflect: true }) compact = false;
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
    .event-item:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
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

    .details {
      font-size: 11.5px;
      color: var(--secondary-text-color, #888);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.4;
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
    :host([compact]) .details { font-size: 11px; }
    :host([compact]) .meta-row,
    :host([compact]) .actions-row { display: none; }
  `;

  protected render() {
    const e = this.event;
    if (!e) return nothing;

    const showImages = this.appearance?.show_images !== false;
    const showIcons = this.appearance?.show_icons !== false;
    const showBadge = this.appearance?.show_severity_badge !== false;
    const showCategory = this.appearance?.show_category !== false;
    // Compact hides the description unless explicitly enabled
    const showDescription = this.compact
      ? this.appearance?.show_description === true
      : this.appearance?.show_description !== false;
    // Date-only starts are all-day events — a "00:00" time would mislead
    const time = /^\d{4}-\d{2}-\d{2}$/.test(e.start) ? '' : formatTime(e.start);
    const color = safeColor(e.color);

    return html`
      <div class="event-row">
        ${showIcons ? html`
          <div class="icon-wrap" style="background-color: ${color}">
            <ha-icon .icon=${validIcon(e.icon)} style="color: ${tintColor(color)}"></ha-icon>
          </div>
        ` : nothing}

        <div class="event-item"
          role="button"
          tabindex="0"
          @pointerdown=${this._onPointerDown}
          @pointerup=${this._onPointerUp}
          @pointercancel=${this._cancelHold}
          @pointerleave=${this._cancelHold}
          @keydown=${this._onKeyDown}
          @contextmenu=${(ev: Event) => { if (this.event.holdAction) ev.preventDefault(); }}
        >
          <div class="content">
            <div class="top-row">
              <span class="title">${e.title}</span>
              ${showBadge && e.severity !== 'info' ? html`
                <chronicle-severity-badge
                  .severity=${e.severity}
                  .customColors=${this.appearance?.severity_colors}
                ></chronicle-severity-badge>
              ` : nothing}
              ${time ? html`<span class="time">${time}</span>` : nothing}
            </div>
            ${showDescription && e.description ? html`<div class="description">${e.description}</div>` : nothing}
            ${e.details ? html`<div class="details">${e.details}</div>` : nothing}
            <div class="meta-row">
              ${showCategory && e.category ? html`<span class="category-tag">${e.category}</span>` : nothing}
              ${showCategory && e.label ? html`<span class="category-tag">${e.label}</span>` : nothing}
              ${showCategory && e.entityName ? html`<span class="category-tag">${e.entityName}</span>` : nothing}
            </div>
            ${e.actions && e.actions.length > 0 ? html`
              <div class="actions-row">
                ${e.actions.map((a) => html`
                  <chronicle-action-button .action=${a} .event=${e}></chronicle-action-button>
                `)}
              </div>
            ` : nothing}
          </div>

          ${showImages && e.mediaUrl ? html`
            <img class="thumbnail" src=${e.mediaUrl} alt="" loading="lazy" />
          ` : nothing}
        </div>
      </div>
    `;
  }

  private _holdTimer: ReturnType<typeof setTimeout> | null = null;
  private _pressed = false;
  private _holdFired = false;
  private _startX = 0;
  private _startY = 0;

  private _onPointerDown(e: PointerEvent) {
    if (e.button !== 0) return;
    this._pressed = true;
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
    if (!this._pressed) return;
    this._pressed = false;
    // Ignore if pointer moved (user was scrolling, not tapping)
    if (Math.abs(e.clientX - this._startX) > 10 || Math.abs(e.clientY - this._startY) > 10) return;
    if (!this._holdFired) this._handleAction('tap');
  }

  private _cancelHold() {
    this._pressed = false;
    if (this._holdTimer) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleAction('tap');
    }
  }

  private _handleAction(type: 'tap' | 'hold') {
    handleEventAction(this, this.event, type);
  }
}
