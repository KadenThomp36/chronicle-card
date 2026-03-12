import { ISourceAdapter } from './adapter';
import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, SeverityLevel } from '../models/event';
import { SourceConfig } from '../models/config';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';

export class StaticAdapter implements ISourceAdapter {
  readonly type = 'static';
  private config!: SourceConfig;

  configure(config: SourceConfig): void {
    this.config = config;
  }

  async fetchEvents(_hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]> {
    const configEvents = this.config.events;
    if (!configEvents || configEvents.length === 0) {
      console.warn('[chronicle-card] StaticAdapter: no events configured');
      return [];
    }

    try {
      const sourceName = this.config.name || 'static';

      return configEvents
        .map((entry, index) => {
          const category = entry.category || 'default';
          const startDate = new Date(entry.start);
          const endDate = entry.end ? new Date(entry.end) : startDate;

          // Filter events outside the requested range
          if (endDate < range.start || startDate > range.end) {
            return null;
          }

          return {
            id: `static:${sourceName}:${index}`,
            sourceType: 'static' as const,
            sourceId: sourceName,
            title: entry.title,
            description: entry.description || '',
            start: entry.start,
            end: entry.end || entry.start,
            icon: entry.icon || this.config.default_icon || CATEGORY_ICONS[category] || CATEGORY_ICONS.default,
            color: entry.color || this.config.default_color || CATEGORY_COLORS[category] || CATEGORY_COLORS.default,
            category,
            severity: (entry.severity || this.config.default_severity || 'info') as SeverityLevel,
            actions: this.config.actions,
            metadata: {
              static_index: index,
            },
          } as ChronicleEvent;
        })
        .filter((event): event is ChronicleEvent => event !== null);
    } catch (err) {
      console.warn('[chronicle-card] StaticAdapter: failed to process events', err);
      return [];
    }
  }
}
