import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleEvent, EventGroup, isEventGroup } from '../../models/event';
import { AppearanceConfig } from '../../models/config';
import { dateKey, formatDateHeader } from '../../utils/date-utils';
import '../elements/event-item';
import '../elements/event-group';
import '../elements/date-header';
import '../elements/empty-state';

interface DateSection {
  dateKey: string;
  label: string;
  items: Array<ChronicleEvent | EventGroup>;
}

@customElement('chronicle-vertical-timeline')
export class VerticalTimeline extends LitElement {
  @property({ attribute: false }) items: Array<ChronicleEvent | EventGroup> = [];
  @property({ attribute: false }) appearance?: AppearanceConfig;
  @property({ type: Boolean }) compact = false;
  @property({ type: Boolean }) animateNew = true;

  /** Event ids already shown — anything not in here on update is new and animates in. */
  private _seen = new Set<string>();
  private _fresh = new Set<string>();

  protected willUpdate(changed: PropertyValues): void {
    if (!changed.has('items')) return;
    const ids = new Set<string>();
    for (const item of this.items ?? []) {
      for (const e of isEventGroup(item) ? item.events : [item]) ids.add(e.id);
    }
    // First paint isn't "new" — only animate arrivals after that
    this._fresh = this._seen.size && this.animateNew
      ? new Set([...ids].filter((id) => !this._seen.has(id)))
      : new Set();
    this._seen = ids;
  }

  static styles = css`
    :host {
      display: block;
    }

    /* Fill mode — host + container stretch to the parent's available height
       (set by chronicle-card's :host([fill]) flex chain). */
    :host(.fill) {
      height: 100%;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    :host(.fill) .timeline-container {
      flex: 1 1 auto;
      min-height: 0;
    }

    .timeline-container {
      position: relative;
      overflow-y: auto;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      scrollbar-color: var(--divider-color, rgba(127,127,127,0.15)) transparent;
    }
    .timeline-container::-webkit-scrollbar {
      width: 4px;
    }
    .timeline-container::-webkit-scrollbar-track {
      background: transparent;
    }
    .timeline-container::-webkit-scrollbar-thumb {
      background: var(--divider-color, rgba(127,127,127,0.2));
      border-radius: 4px;
    }

    .timeline-inner {
      position: relative;
    }

    /* Vertical timeline line — centered on icon column (17px = half of 34px icon) */
    .timeline-inner::before {
      content: '';
      position: absolute;
      left: 16px;
      top: 28px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--divider-color, rgba(127,127,127,0.15)) 4%,
        var(--divider-color, rgba(127,127,127,0.15)) 92%,
        transparent 100%
      );
      border-radius: 2px;
    }

    .date-section {
      margin-bottom: 2px;
    }
    .date-section:last-child {
      margin-bottom: 0;
    }
  `;

  protected render() {
    if (!this.items || this.items.length === 0) {
      return html`<chronicle-empty-state></chronicle-empty-state>`;
    }

    const sections = this._groupByDate(this.items);
    const height = this.appearance?.card_height ?? '400px';
    const fill = height === 'fill' || height === '100%';
    const style = fill || height === 'auto' ? '' : `max-height: ${height}`;
    this.classList.toggle('fill', fill);

    return html`
      <div class="timeline-container" style=${style}>
        <div class="timeline-inner">
          ${sections.map((section) => html`
            <div class="date-section">
              <chronicle-date-header
                .label=${section.label}
                .eventCount=${this._countEvents(section.items)}
              ></chronicle-date-header>
              ${section.items.map((item) =>
                isEventGroup(item)
                  ? html`
                    <chronicle-event-group
                      .group=${item}
                      .appearance=${this.appearance}
                      ?compact=${this.compact}
                    ></chronicle-event-group>
                  `
                  : html`
                    <chronicle-event-item
                      .event=${item}
                      .appearance=${this.appearance}
                      ?compact=${this.compact}
                      ?animated=${this._fresh.has(item.id)}
                    ></chronicle-event-item>
                  `,
              )}
            </div>
          `)}
        </div>
      </div>
    `;
  }

  private _groupByDate(items: Array<ChronicleEvent | EventGroup>): DateSection[] {
    const sections = new Map<string, DateSection>();
    for (const item of items) {
      const start = isEventGroup(item) ? item.representative.start : item.start;
      const key = dateKey(start);
      let section = sections.get(key);
      if (!section) {
        section = { dateKey: key, label: formatDateHeader(start), items: [] };
        sections.set(key, section);
      }
      section.items.push(item);
    }
    return Array.from(sections.values());
  }

  private _countEvents(items: Array<ChronicleEvent | EventGroup>): number {
    let count = 0;
    for (const item of items) {
      count += isEventGroup(item) ? item.events.length : 1;
    }
    return count;
  }
}
