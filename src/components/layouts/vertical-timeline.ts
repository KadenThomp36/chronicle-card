import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ChronicleEvent, EventGroup, isEventGroup } from '../../models/event';
import { AppearanceConfig } from '../../models/config';
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
  @property({ attribute: false }) hass?: any;
  @property({ type: Boolean }) compact = false;
  @property({ type: String }) timeFormat: '12h' | '24h' = '24h';
  @property({ type: Boolean }) animateNew = true;

  static styles = css`
    :host {
      display: block;
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
    const style = height === 'auto' ? '' : `max-height: ${height}`;

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
                      .hass=${this.hass}
                      .timeFormat=${this.timeFormat}
                      ?compact=${this.compact}
                    ></chronicle-event-group>
                  `
                  : html`
                    <chronicle-event-item
                      .event=${item}
                      .appearance=${this.appearance}
                      .hass=${this.hass}
                      .timeFormat=${this.timeFormat}
                      ?compact=${this.compact}
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
    const now = new Date();
    const today = this._dateKey(now);
    const yesterday = this._dateKey(new Date(now.getTime() - 86400000));

    for (const item of items) {
      const startStr = isEventGroup(item) ? item.representative.start : item.start;
      const key = this._dateKey(new Date(startStr));

      if (!sections.has(key)) {
        let label: string;
        if (key === today) {
          label = 'Today';
        } else if (key === yesterday) {
          label = 'Yesterday';
        } else {
          const d = new Date(startStr);
          label = d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
        }
        sections.set(key, { dateKey: key, label, items: [] });
      }
      sections.get(key)!.items.push(item);
    }

    return Array.from(sections.values());
  }

  private _dateKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private _countEvents(items: Array<ChronicleEvent | EventGroup>): number {
    let count = 0;
    for (const item of items) {
      count += isEventGroup(item) ? item.events.length : 1;
    }
    return count;
  }
}
