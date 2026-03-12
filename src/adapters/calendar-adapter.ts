import { ISourceAdapter } from './adapter';
import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, SeverityLevel } from '../models/event';
import { SourceConfig } from '../models/config';
import { resolveIcon, resolveColor } from '../utils/icon-resolver';

interface CalendarEventResponse {
  uid?: string;
  summary?: string;
  description?: string;
  start?: { dateTime?: string; date?: string } | string;
  end?: { dateTime?: string; date?: string } | string;
  location?: string;
  recurrence_id?: string;
}

function extractDateTime(field: CalendarEventResponse['start'], fallback: string): string {
  if (!field) return fallback;
  if (typeof field === 'string') return field;
  return field.dateTime || field.date || fallback;
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

function detectCategory(text: string): string {
  const lower = (text || '').toLowerCase();
  const keywords: Record<string, string[]> = {
    person: ['person', 'visitor', 'guest', 'meeting', 'appointment'],
    vehicle: ['vehicle', 'car', 'delivery', 'parking'],
    security: ['security', 'alarm', 'alert'],
    motion: ['motion', 'movement'],
    pet: ['pet', 'cat', 'dog', 'animal'],
    automation: ['automation', 'script', 'routine'],
    system: ['system', 'update', 'maintenance', 'restart'],
    climate: ['climate', 'temperature', 'hvac', 'weather'],
    light: ['light', 'lamp', 'lighting'],
  };
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some((w) => lower.includes(w))) {
      return category;
    }
  }
  return 'default';
}

export class CalendarAdapter implements ISourceAdapter {
  readonly type = 'calendar';
  private config!: SourceConfig;

  configure(config: SourceConfig): void {
    this.config = config;
  }

  async fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]> {
    const entity = this.config.entity;
    if (!entity) {
      console.warn('[chronicle-card] CalendarAdapter: no entity configured');
      return [];
    }

    try {
      const startStr = range.start.toISOString();
      const endStr = range.end.toISOString();

      // HA calendar uses REST API: GET /api/calendars/{entity_id}?start=...&end=...
      const path = `calendars/${entity}?start=${encodeURIComponent(startStr)}&end=${encodeURIComponent(endStr)}`;
      const response = await hass.callApi<CalendarEventResponse[]>('GET', path);

      if (!Array.isArray(response)) {
        console.warn('[chronicle-card] CalendarAdapter: unexpected response format');
        return [];
      }

      return response.map((event) => {
        const title = event.summary || 'Untitled Event';
        const description = event.description || '';
        const category = detectCategory(`${title} ${description}`);
        const startDt = extractDateTime(event.start, startStr);
        const uid = event.uid || simpleHash(`${title}:${startDt}`);

        return {
          id: `calendar:${entity}:${uid}`,
          sourceType: 'calendar' as const,
          sourceId: this.config.name || entity,
          title,
          description,
          start: startDt,
          end: extractDateTime(event.end, endStr),
          icon: resolveIcon(title, category, undefined, this.config.icon_map, this.config.default_icon),
          color: resolveColor(title, category, undefined, this.config.color_map, this.config.default_color),
          category,
          severity: (this.config.default_severity || 'info') as SeverityLevel,
          entityId: entity,
          entityName: hass.states[entity]?.attributes?.friendly_name as string || entity,
          actions: this.config.actions,
          metadata: {
            location: event.location,
            recurrence_id: event.recurrence_id,
            uid: event.uid,
          },
        };
      });
    } catch (err) {
      console.warn('[chronicle-card] CalendarAdapter: failed to fetch events', err);
      return [];
    }
  }

}
