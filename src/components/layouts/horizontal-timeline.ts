import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ChronicleEvent, EventGroup, isEventGroup } from '../../models/event';
import { AppearanceConfig } from '../../models/config';
import { CATEGORY_ICONS } from '../../constants';
import { relativeTime } from '../../utils/date-utils';
import { safeColor } from '../../utils/color-utils';
import '../elements/empty-state';

function validIcon(icon: string): string {
  return icon && icon.startsWith('mdi:') ? icon : CATEGORY_ICONS.default;
}

@customElement('chronicle-horizontal-timeline')
export class HorizontalTimeline extends LitElement {
  @property({ attribute: false }) items: Array<ChronicleEvent | EventGroup> = [];
  @property({ attribute: false }) appearance?: AppearanceConfig;
  @property({ attribute: false }) hass?: any;
  @property({ type: String }) timeFormat: '12h' | '24h' = '24h';

  @query('.scroll-container') private scrollEl?: HTMLElement;

  static styles = css`
    :host {
      display: block;
    }

    .wrapper {
      position: relative;
    }

    .scroll-container {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding: 8px 4px 12px;
    }
    .scroll-container::-webkit-scrollbar {
      display: none;
    }

    .scroll-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: none;
      background: var(--ha-card-background, var(--card-background-color, #fff));
      box-shadow: 0 1px 6px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.06);
      color: var(--primary-text-color, #333);
      cursor: pointer;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease, box-shadow 0.15s ease;
    }
    .scroll-btn:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
    }
    .scroll-btn.left { left: 4px; }
    .scroll-btn.right { right: 4px; }
    .scroll-btn ha-icon {
      --mdc-icon-size: 16px;
    }

    .event-card {
      flex-shrink: 0;
      width: 152px;
      scroll-snap-align: start;
      border-radius: 14px;
      overflow: hidden;
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border: 1px solid var(--divider-color, rgba(127,127,127,0.08));
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .event-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
    .event-card:active {
      transform: translateY(-1px) scale(0.99);
    }

    .card-media {
      width: 100%;
      height: 88px;
      object-fit: cover;
      display: block;
      background: var(--divider-color, rgba(127,127,127,0.08));
    }
    .card-placeholder {
      width: 100%;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .card-placeholder ha-icon {
      --mdc-icon-size: 26px;
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
    }

    .card-body {
      padding: 8px 10px 10px;
    }
    .card-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
      letter-spacing: -0.1px;
    }
    .card-time {
      font-size: 10px;
      color: var(--secondary-text-color, #999);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1px;
    }
    .card-severity {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      margin-right: 4px;
      vertical-align: middle;
      box-shadow: 0 0 3px currentColor;
    }

    /* Group card — collapsed state */
    .group-card {
      flex-shrink: 0;
      width: 152px;
      scroll-snap-align: start;
      border-radius: 14px;
      overflow: hidden;
      background: var(--secondary-background-color, rgba(127,127,127,0.05));
      border: 1px solid var(--divider-color, rgba(127,127,127,0.08));
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .group-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.1);
    }
    .group-card:active {
      transform: translateY(-1px) scale(0.99);
    }
    .group-media {
      width: 100%;
      height: 88px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .group-media .card-media {
      position: absolute;
      top: 0; left: 0; width: 100%; height: 100%;
      object-fit: cover;
    }
    .group-media ha-icon {
      --mdc-icon-size: 26px;
      color: #fff;
      filter: drop-shadow(0 1px 2px rgba(0,0,0,0.15));
    }
    .group-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      min-width: 22px;
      height: 22px;
      border-radius: 11px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 5px;
      line-height: 1;
      font-variant-numeric: tabular-nums;
      box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }
    .group-body {
      padding: 8px 10px 10px;
    }
    .group-title {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--primary-text-color, #333);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
      letter-spacing: -0.1px;
    }
    .group-time {
      font-size: 10px;
      color: var(--secondary-text-color, #999);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.1px;
    }

    /* Expanded group — unfurled inline */
    .group-expanded {
      flex-shrink: 0;
      display: flex;
      gap: 6px;
      scroll-snap-align: start;
      padding: 4px;
      border-radius: 16px;
      background: var(--divider-color, rgba(127,127,127,0.06));
      border: 1px solid var(--divider-color, rgba(127,127,127,0.1));
      transition: background 0.2s ease;
    }
    .group-expanded .event-card {
      width: 140px;
      border: 1px solid var(--divider-color, rgba(127,127,127,0.12));
    }
    .group-expanded .card-media,
    .group-expanded .card-placeholder {
      height: 76px;
    }

    /* Collapse button inside expanded group */
    .group-collapse-btn {
      flex-shrink: 0;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border-radius: 10px;
      transition: background 0.15s ease;
    }
    .group-collapse-btn:hover {
      background: var(--secondary-background-color, rgba(127,127,127,0.08));
    }
    .group-collapse-btn ha-icon {
      --mdc-icon-size: 16px;
      color: var(--secondary-text-color, #999);
    }
  `;

  protected render() {
    if (!this.items || this.items.length === 0) {
      return html`<chronicle-empty-state></chronicle-empty-state>`;
    }

    const height = this.appearance?.card_height;
    const containerStyle = height && height !== 'auto' ? `height: ${height}; align-items: center;` : '';

    return html`
      <div class="wrapper">
        <button class="scroll-btn left" @click=${() => this._scroll(-200)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </button>

        <div class="scroll-container" style=${containerStyle}>
          ${this.items.map((item) =>
            isEventGroup(item)
              ? (item.expanded ? this._renderExpandedGroup(item) : this._renderGroupCard(item))
              : this._renderEventCard(item),
          )}
        </div>

        <button class="scroll-btn right" @click=${() => this._scroll(200)}>
          <ha-icon icon="mdi:chevron-right"></ha-icon>
        </button>
      </div>
    `;
  }

  private _renderEventCard(event: ChronicleEvent) {
    const showImages = this.appearance?.show_images !== false;
    const color = safeColor(event.color);

    return html`
      <div class="event-card" @click=${() => this._showDetail(event)}>
        ${showImages && event.mediaUrl
          ? html`<img class="card-media" src=${event.mediaUrl} alt="" loading="lazy" />`
          : html`
            <div class="card-placeholder" style="background-color: ${color}">
              <ha-icon .icon=${validIcon(event.icon)}></ha-icon>
            </div>
          `
        }
        <div class="card-body">
          <div class="card-title">
            <span class="card-severity" style="background-color: ${color}"></span>
            ${event.title}
          </div>
          <div class="card-time">${relativeTime(event.start)}</div>
        </div>
      </div>
    `;
  }

  private _renderGroupCard(group: EventGroup) {
    const rep = group.representative;
    const showImages = this.appearance?.show_images !== false;

    return html`
      <div class="group-card" @click=${() => this._toggleGroup(group)}>
        ${showImages && rep.mediaUrl
          ? html`
            <div class="group-media" style="padding: 0;">
              <img class="card-media" src=${rep.mediaUrl} alt="" loading="lazy" />
              <span class="group-badge">${group.events.length}</span>
            </div>
          `
          : html`
            <div class="group-media" style="background-color: ${safeColor(rep.color)}">
              <ha-icon .icon=${validIcon(rep.icon)}></ha-icon>
              <span class="group-badge">${group.events.length}</span>
            </div>
          `
        }
        <div class="group-body">
          <div class="group-title">${group.summary}</div>
          <div class="group-time">${relativeTime(rep.start)}</div>
        </div>
      </div>
    `;
  }

  private _renderExpandedGroup(group: EventGroup) {
    const showImages = this.appearance?.show_images !== false;

    return html`
      <div class="group-expanded">
        ${group.events.map((event) => html`
          <div class="event-card" @click=${() => this._showDetail(event)}>
            ${showImages && event.mediaUrl
              ? html`<img class="card-media" src=${event.mediaUrl} alt="" loading="lazy" />`
              : html`
                <div class="card-placeholder" style="background-color: ${safeColor(event.color)}">
                  <ha-icon .icon=${validIcon(event.icon)}></ha-icon>
                </div>
              `
            }
            <div class="card-body">
              <div class="card-title">
                <span class="card-severity" style="background-color: ${safeColor(event.color)}"></span>
                ${event.title}
              </div>
              <div class="card-time">${relativeTime(event.start)}</div>
            </div>
          </div>
        `)}
        <div class="group-collapse-btn" @click=${() => this._toggleGroup(group)}>
          <ha-icon icon="mdi:chevron-left"></ha-icon>
        </div>
      </div>
    `;
  }

  private _scroll(offset: number) {
    this.scrollEl?.scrollBy({ left: offset, behavior: 'smooth' });
  }

  private _showDetail(event: ChronicleEvent) {
    this.dispatchEvent(
      new CustomEvent('chronicle-show-detail', {
        bubbles: true,
        composed: true,
        detail: { event },
      }),
    );
  }

  private _toggleGroup(group: EventGroup) {
    this.dispatchEvent(
      new CustomEvent('chronicle-toggle-group', {
        bubbles: true,
        composed: true,
        detail: { group },
      }),
    );
  }
}
