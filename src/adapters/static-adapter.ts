import { ISourceAdapter } from './adapter';
import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, SeverityLevel } from '../models/event';
import { SourceConfig } from '../models/config';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';
import { parseDateString } from '../utils/date-utils';
import { isJinjaTemplate, renderTemplate } from '../utils/template-renderer';

type StaticEntry = NonNullable<SourceConfig['events']>[number];

const DATE_ONLY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Normalize a static start/end value: date-only strings stay as-is (all-day
 * events parse as local midnight downstream), anything else becomes ISO.
 */
function normalizeDate(value: string): { iso: string; date: Date } | null {
  const str = value.trim();
  const date = parseDateString(str);
  if (!date) return null;
  return { iso: DATE_ONLY_RE.test(str) ? str : date.toISOString(), date };
}

export class StaticAdapter implements ISourceAdapter {
  readonly type = 'static';
  private config!: SourceConfig;

  configure(config: SourceConfig): void {
    this.config = config;
  }

  /** Render a Jinja2 field (re-rendered every fetch, so `now()` stays current). */
  private async render(hass: HomeAssistant, value: unknown, label: string): Promise<string | undefined> {
    if (value === undefined || value === null || value === '') return undefined;
    const str = String(value);
    if (!isJinjaTemplate(str)) return str;
    try {
      return ((await renderTemplate(hass, str)) ?? '').toString().trim();
    } catch (err) {
      console.warn(`[chronicle-card] StaticAdapter: failed to render ${label} template "${str}"`, err);
      return undefined;
    }
  }

  private async resolveEntry(hass: HomeAssistant, entry: StaticEntry) {
    const [start, end, title, description] = await Promise.all([
      this.render(hass, entry.start, 'start'),
      this.render(hass, entry.end, 'end'),
      this.render(hass, entry.title, 'title'),
      this.render(hass, entry.description, 'description'),
    ]);
    return { start, end, title, description };
  }

  async fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]> {
    const configEvents = this.config.events;
    if (!configEvents || configEvents.length === 0) {
      console.warn('[chronicle-card] StaticAdapter: no events configured');
      return [];
    }

    try {
      const sourceName = this.config.name || 'static';
      const resolved = await Promise.all(configEvents.map((entry) => this.resolveEntry(hass, entry)));

      return configEvents
        .map((entry, index) => {
          const fields = resolved[index];
          const start = fields.start !== undefined ? normalizeDate(fields.start) : null;
          if (!start) {
            console.warn(
              `[chronicle-card] StaticAdapter: skipping "${entry.title}", start is not a valid date:`,
              fields.start ?? entry.start,
            );
            return null;
          }
          const end = (fields.end !== undefined && normalizeDate(fields.end)) || start;

          // Filter events outside the requested range
          if (end.date < range.start || start.date > range.end) {
            return null;
          }

          const category = entry.category || 'default';
          return {
            id: `static:${sourceName}:${index}`,
            sourceType: 'static' as const,
            sourceId: sourceName,
            title: fields.title ?? entry.title ?? '',
            description: fields.description || '',
            start: start.iso,
            end: end.iso,
            icon: entry.icon || this.config.default_icon || CATEGORY_ICONS[category] || CATEGORY_ICONS.default,
            color: entry.color || this.config.default_color || CATEGORY_COLORS[category] || CATEGORY_COLORS.default,
            category,
            severity: (entry.severity || this.config.default_severity || 'info') as SeverityLevel,
            actions: this.config.actions,
            tapAction: this.config.tap_action,
            holdAction: this.config.hold_action,
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
