import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EventGroup } from '../../models/event';
import { AppearanceConfig } from '../../models/config';
import { CATEGORY_ICONS } from '../../constants';
import { formatTime } from '../../utils/date-utils';
import { safeColor } from '../../utils/color-utils';
import './event-item';

function validIcon(icon: string): string {
  return icon && icon.startsWith('mdi:') ? icon : CATEGORY_ICONS.default;
}

function tintColor(hex: string, amount = 0.82): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return '#ffffff';
  const r = Math.round(parseInt(m[1], 16) + (255 - parseInt(m[1], 16)) * amount);
  const g = Math.round(parseInt(m[2], 16) + (255 - parseInt(m[2], 16)) * amount);
  const b = Math.round(parseInt(m[3], 16) + (255 - parseInt(m[3], 16)) * amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

@customElement('chronicle-event-group')
export class EventGroupElement extends LitElement {
  @property({ attribute: false }) group!: EventGroup;
  @property({ attribute: false }) appearance?: AppearanceConfig;
  @property({ attribute: false }) hass?: any;
  @property({ type: Boolean }) compact = false;
  @property({ type: String }) timeFormat: '12h' | '24h' = '24h';

  static styles = css`
    :host {
      display: block;
    }

    /* ── Outer row — mirrors event-item's .event-row exactly ── */
    .group-row {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* ── Icon — identical to event-item ── */
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
      position: relative;
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

    .count-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      min-width: 17px;
      height: 17px;
      border-radius: 9px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      font-variant-numeric: tabular-nums;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(3,169,244,0.25);
    }

    /* ── Clickable header — mirrors event-item's .event-item ── */
    .group-header {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: flex-start;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.15s ease, box-shadow 0.15s ease;
      border: 1px solid transparent;
    }
    .group-header:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border-color: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }
    .group-header:active {
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

    /* ── Top row — title + time, same as event-item ── */
    .top-row {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .summary {
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
    .time-range {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--secondary-text-color, #999);
      white-space: nowrap;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.2px;
    }

    /* ── Thumbnail strip ── */
    .thumb-strip {
      display: flex;
      flex-shrink: 0;
      align-items: center;
    }
    .thumb-strip .thumb {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      object-fit: cover;
      margin-left: -6px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      display: block;
      flex-shrink: 0;
    }
    .thumb-strip .thumb:first-child {
      margin-left: 0;
    }
    .thumb-more-wrap {
      position: relative;
      width: 32px;
      height: 32px;
      border-radius: 6px;
      overflow: hidden;
      margin-left: -6px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }
    .thumb-more-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      filter: blur(2px) brightness(0.65);
    }
    .thumb-more-wrap .more-count {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    }

    .chevron {
      flex-shrink: 0;
      transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--secondary-text-color, #999);
      --mdc-icon-size: 18px;
      margin-top: 2px;
    }
    .chevron.open {
      transform: rotate(180deg);
    }

    /* ── Expand/collapse via CSS grid — no max-height lag ── */
    .children {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      margin-left: 42px;
    }
    .children.expanded {
      grid-template-rows: 1fr;
    }
    .children-inner {
      overflow: hidden;
    }
    .children-content {
      padding: 4px 0 4px 10px;
      border-left: 2px solid var(--divider-color, rgba(127,127,127,0.12));
    }

    :host([compact]) .summary { font-size: 12px; }
  `;

  protected render() {
    const g = this.group;
    if (!g) return nothing;

    const rep = g.representative;
    const first = g.events[0];
    const last = g.events[g.events.length - 1];
    const t1 = formatTime(first.start, this.timeFormat);
    const t2 = formatTime(last.start, this.timeFormat);
    const timeStr = t1 === t2 ? t1 : `${t1} – ${t2}`;
    const showImages = this.appearance?.show_images !== false;

    // Collect thumbnails
    const allThumbs = showImages
      ? g.events.map((e) => e.mediaUrl).filter(Boolean) as string[]
      : [];
    const thumbs = allThumbs.slice(0, 3);
    const extraCount = allThumbs.length - 3;

    return html`
      <div>
        <div class="group-row">
          <div class="icon-wrap" style="background-color: ${safeColor(rep.color)}">
            <ha-icon .icon=${validIcon(rep.icon)} style="color: ${tintColor(safeColor(rep.color))}"></ha-icon>
            <span class="count-badge">${g.events.length}</span>
          </div>

          <div class="group-header" @click=${this._toggle}>
            <div class="content">
              <div class="top-row">
                <span class="summary">${g.summary}</span>
                <span class="time-range">${timeStr}</span>
              </div>
            </div>

            ${thumbs.length > 0 ? html`
              <div class="thumb-strip">
                ${thumbs.map((url, i) =>
                  i === 2 && extraCount > 0
                    ? html`
                        <div class="thumb-more-wrap">
                          <img src=${url} alt="" loading="lazy" />
                          <span class="more-count">+${extraCount}</span>
                        </div>
                      `
                    : html`<img class="thumb" src=${url} alt="" loading="lazy" />`
                )}
              </div>
            ` : ''}

            <ha-icon
              class="chevron ${g.expanded ? 'open' : ''}"
              icon="mdi:chevron-down"
            ></ha-icon>
          </div>
        </div>

        <div class="children ${g.expanded ? 'expanded' : ''}">
          <div class="children-inner">
            ${g.expanded ? html`
              <div class="children-content">
                ${g.events.map((event) => html`
                  <chronicle-event-item
                    .event=${event}
                    .appearance=${this.appearance}
                    .hass=${this.hass}
                    .timeFormat=${this.timeFormat}
                    ?compact=${this.compact}
                  ></chronicle-event-item>
                `)}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  private _toggle() {
    this.dispatchEvent(
      new CustomEvent('chronicle-toggle-group', {
        bubbles: true,
        composed: true,
        detail: { group: this.group },
      }),
    );
  }
}
