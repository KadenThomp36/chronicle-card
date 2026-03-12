import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EventGroup } from '../../models/event';
import { AppearanceConfig } from '../../models/config';
import { CATEGORY_ICONS } from '../../constants';
import { formatTime } from '../../utils/date-utils';
import './event-item';

function validIcon(icon: string): string {
  return icon && icon.startsWith('mdi:') ? icon : CATEGORY_ICONS.default;
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

    .group-row {
      display: flex;
      align-items: flex-start;
      position: relative;
    }

    /* Icon sits outside the hoverable area, matching event-item */
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
      color: #fff;
      filter: drop-shadow(0 1px 1px rgba(0,0,0,0.15));
    }

    .count-badge {
      position: absolute;
      top: -4px;
      right: -4px;
      min-width: 16px;
      height: 16px;
      border-radius: 8px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 3px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      font-variant-numeric: tabular-nums;
      line-height: 1;
      box-shadow: 0 1px 3px rgba(3,169,244,0.25);
    }

    .group-header {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: background 0.2s ease, box-shadow 0.2s ease;
      border: 1px solid transparent;
    }
    .group-header:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border-color: var(--divider-color, rgba(127,127,127,0.08));
      box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    }

    .content {
      flex: 1;
      min-width: 0;
    }
    .summary {
      font-size: 13px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      letter-spacing: -0.15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1.35;
    }
    .time-range {
      font-size: 10.5px;
      font-weight: 500;
      color: var(--secondary-text-color, #999);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1px;
      margin-top: 2px;
    }

    /* Thumbnail strip — up to 3 small images */
    .thumb-strip {
      display: flex;
      flex-shrink: 0;
      gap: 0;
      margin-right: 4px;
    }
    .thumb-strip img {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      object-fit: cover;
      margin-left: -6px;
      border: 2px solid var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .thumb-strip img:first-child {
      margin-left: 0;
    }
    .thumb-strip .thumb-more {
      position: relative;
      overflow: hidden;
    }
    .thumb-strip .thumb-more img {
      filter: blur(2px) brightness(0.7);
    }
    .thumb-strip .thumb-more::after {
      content: attr(data-count);
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 9px;
      font-weight: 700;
      text-shadow: 0 1px 2px rgba(0,0,0,0.4);
    }

    .expand-icon {
      flex-shrink: 0;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      color: var(--secondary-text-color, #999);
      --mdc-icon-size: 18px;
    }
    .expand-icon.expanded {
      transform: rotate(180deg);
    }

    /* Expanded children — indented with subtle background band */
    .children {
      margin-left: 42px;
      overflow: hidden;
      border-radius: 12px;
    }
    .children.collapsed {
      max-height: 0;
      opacity: 0;
      transition: max-height 0.25s ease, opacity 0.15s ease;
    }
    .children.expanded {
      max-height: 4000px;
      opacity: 1;
      transition: max-height 0.4s ease, opacity 0.2s ease 0.05s;
    }
    .children-inner {
      padding: 4px 0 4px 8px;
      border-left: 2px solid var(--divider-color, rgba(127,127,127,0.12));
      background: var(--secondary-background-color, rgba(127,127,127,0.025));
      border-radius: 8px;
    }
  `;

  protected render() {
    const g = this.group;
    if (!g) return nothing;

    const rep = g.representative;
    const first = g.events[0];
    const last = g.events[g.events.length - 1];
    const timeRange = `${formatTime(first.start, this.timeFormat)} — ${formatTime(last.start, this.timeFormat)}`;
    const showImages = this.appearance?.show_images !== false;

    // Collect up to 3 thumbnails from grouped events
    const thumbs = showImages
      ? g.events.map((e) => e.mediaUrl).filter(Boolean).slice(0, 3) as string[]
      : [];
    const extraCount = g.events.filter((e) => e.mediaUrl).length - 3;

    return html`
      <div>
        <div class="group-row">
          <div class="icon-wrap" style="background-color: ${rep.color}">
            <ha-icon .icon=${validIcon(rep.icon)}></ha-icon>
            <span class="count-badge">${g.events.length}</span>
          </div>

          <div class="group-header" @click=${this._toggle}>
            <div class="content">
              <div class="summary">${g.summary}</div>
              <div class="time-range">${timeRange}</div>
            </div>

            ${thumbs.length > 0 ? html`
              <div class="thumb-strip">
                ${thumbs.map((url, i) =>
                  i === 2 && extraCount > 0
                    ? html`<span class="thumb-more" data-count="+${extraCount}"><img src=${url} alt="" loading="lazy" /></span>`
                    : html`<img src=${url} alt="" loading="lazy" />`
                )}
              </div>
            ` : ''}

            <ha-icon
              class="expand-icon ${g.expanded ? 'expanded' : ''}"
              icon="mdi:chevron-down"
            ></ha-icon>
          </div>
        </div>

        <div class="children ${g.expanded ? 'expanded' : 'collapsed'}">
          ${g.expanded ? html`
            <div class="children-inner">
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
