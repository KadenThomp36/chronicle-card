import { ISourceAdapter } from './adapter';
import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, SeverityLevel } from '../models/event';
import { SourceConfig } from '../models/config';
import { resolveIcon, resolveColor } from '../utils/icon-resolver';

function traversePath(obj: unknown, path: string): unknown {
  const parts = path.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as Record<string, unknown>)[part];
  }
  return current;
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

function isInternalPath(url: string): boolean {
  return !url.startsWith('http://') && !url.startsWith('https://');
}

/** Convert a value to an ISO date string. Handles ISO strings, Unix timestamps, and epoch floats. */
function toISOString(value: unknown): string {
  if (!value && value !== 0) return '';
  const str = String(value);
  // If it looks like a Unix timestamp (numeric, possibly with decimals)
  const num = Number(value);
  if (!isNaN(num) && num > 1e9 && num < 1e13) {
    return new Date(num * 1000).toISOString();
  }
  // Already an ISO string or other date format
  return str;
}

export class RestAdapter implements ISourceAdapter {
  readonly type = 'rest';
  private config!: SourceConfig;

  configure(config: SourceConfig): void {
    this.config = config;
  }

  async fetchEvents(hass: HomeAssistant, _range: TimeRange): Promise<ChronicleEvent[]> {
    const wsParams = this.config.ws_params;
    const url = this.config.url;

    if (!url && !wsParams) {
      console.warn('[chronicle-card] RestAdapter: no url or ws_params configured');
      return [];
    }

    try {
      let rawData: unknown;

      if (wsParams) {
        // Fetch via WebSocket (e.g. frigate/events/get)
        // Spread into new object — HA's callWS mutates the msg to add an "id" field
        const params = { ...wsParams };
        // Auto-default instance_id for Frigate WS calls — Frigate integration requires it
        if (typeof params.type === 'string' && params.type.startsWith('frigate/') && !params.instance_id) {
          params.instance_id = 'frigate';
        }
        const result = await hass.callWS<unknown>(params);
        // Some WS commands return pre-serialized JSON strings — parse if needed
        rawData = typeof result === 'string' ? JSON.parse(result) : result;
      } else if (isInternalPath(url!)) {
        // Strip leading /api/ prefix and leading slashes — callApi prepends /api/ internally
        const cleanPath = url!.replace(/^\/api\//, '').replace(/^\/+/, '');
        rawData = await hass.callApi<unknown>('GET', cleanPath);
      } else {
        const response = await fetch(url!);
        if (!response.ok) {
          console.warn(`[chronicle-card] RestAdapter: HTTP ${response.status} from ${url}`);
          return [];
        }
        rawData = await response.json();
      }

      let items: unknown[];
      if (this.config.response_path) {
        const traversed = traversePath(rawData, this.config.response_path);
        if (!Array.isArray(traversed)) {
          console.warn('[chronicle-card] RestAdapter: response_path did not resolve to an array');
          return [];
        }
        items = traversed;
      } else if (Array.isArray(rawData)) {
        items = rawData;
      } else {
        console.warn('[chronicle-card] RestAdapter: response is not an array and no response_path configured');
        return [];
      }

      return items.map((item, index) => this.mapItem(item as Record<string, unknown>, index));
    } catch (err) {
      console.warn('[chronicle-card] RestAdapter: failed to fetch events', err);
      return [];
    }
  }

  /**
   * Convert a raw media path to the appropriate format.
   * /media/... paths become media-source:// content IDs for later resolution via WS.
   * HTTP(S) URLs pass through as-is for direct use in mediaUrl.
   */
  private classifyMedia(rawUrl: string | undefined): { mediaUrl?: string; mediaContentId?: string } {
    if (!rawUrl) return {};
    if (rawUrl.startsWith('/media/')) {
      // Convert HA /media/ path to media_source content ID for WS resolution
      return { mediaContentId: `media-source://media_source/local/${rawUrl.slice('/media/'.length)}` };
    }
    // Absolute URLs or other paths can be used directly
    return { mediaUrl: rawUrl };
  }

  /**
   * Expand a template string like "/api/frigate/notifications/{id}/snapshot.jpg"
   * by replacing {field} placeholders with values from the item.
   */
  private expandTemplate(template: string, item: Record<string, unknown>): string {
    return template.replace(/\{(\w+)\}/g, (_match, field) => {
      const val = item[field];
      return val != null ? String(val) : '';
    });
  }

  private mapItem(item: Record<string, unknown>, index: number): ChronicleEvent {
    const fieldMap = this.config.field_map || {};

    const getField = (chronicleField: string, fallback: unknown = ''): unknown => {
      const sourceField = fieldMap[chronicleField];
      if (sourceField && item[sourceField] !== undefined) {
        return item[sourceField];
      }
      if (item[chronicleField] !== undefined) {
        return item[chronicleField];
      }
      return fallback;
    };

    const mappedId = String(getField('id', index));
    const title = String(getField('title', 'Untitled'));
    const category = String(getField('category', 'default'));
    const label = getField('label', undefined) as string | undefined;

    // Resolve media URL: template takes priority, then field_map, then direct field
    let rawMediaUrl = getField('mediaUrl', undefined) as string | undefined;
    if (this.config.media_url_template) {
      rawMediaUrl = this.expandTemplate(this.config.media_url_template, item);
    }
    const rawMediaContentId = getField('mediaContentId', undefined) as string | undefined;
    const media = this.classifyMedia(rawMediaUrl);

    // Resolve icon/color: explicit field → icon_map → fuzzy keyword → default → category → fallback
    const explicitIcon = getField('icon', undefined) as string | undefined;
    const explicitColor = getField('color', undefined) as string | undefined;

    return {
      id: `rest:${this.config.url || this.config.name || 'ws'}:${mappedId}`,
      sourceType: 'rest',
      sourceId: this.config.name || this.config.url || 'rest',
      title,
      description: String(getField('description', '')),
      start: toISOString(getField('start', new Date().toISOString())),
      end: toISOString(getField('end', '')),
      mediaUrl: media.mediaUrl,
      mediaContentId: rawMediaContentId || media.mediaContentId,
      icon: explicitIcon || resolveIcon(title, category, label, this.config.icon_map, this.config.default_icon),
      color: explicitColor || resolveColor(title, category, label, this.config.color_map, this.config.default_color),
      category,
      label,
      severity: (getField('severity', this.config.default_severity || 'info') as SeverityLevel),
      entityId: getField('entityId', undefined) as string | undefined,
      entityName: getField('entityName', undefined) as string | undefined,
      actions: this.config.actions,
      metadata: {
        source_url: this.config.url,
        raw_index: index,
        ...((getField('metadata', undefined) as Record<string, unknown>) || {}),
      },
    };
  }
}
