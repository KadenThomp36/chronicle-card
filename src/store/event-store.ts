import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, EventGroup, isEventGroup } from '../models/event';
import { ChronicleCardConfig, DEFAULT_CONFIG, GroupingConfig, SourceConfig } from '../models/config';
import { ISourceAdapter } from '../adapters/adapter';
import { adapterRegistry } from '../adapters/adapter-registry';
import { groupEvents, groupKey } from './event-grouper';
import { resolveMediaUrl } from '../utils/media-resolver';
import { isJinjaTemplate, renderTemplate, TemplateContext } from '../utils/template-renderer';
import { startOfDay, timestampOf } from '../utils/date-utils';
import { DEFAULT_POLL_INTERVAL } from '../constants';

/**
 * Compute the sourceId an adapter will stamp on its events for a given config.
 * Mirrors the `config.name || <fallback>` rule each adapter uses internally so
 * we can route events back to their source-level config without having to
 * thread the SourceConfig object through every event.
 */
function effectiveSourceId(s: SourceConfig): string {
  if (s.name) return s.name;
  switch (s.type) {
    case 'calendar': return s.entity || 'calendar';
    case 'rest':     return s.url || 'rest';
    default:         return s.type;
  }
}

function itemTimestamp(item: ChronicleEvent | EventGroup): number {
  return timestampOf(isEventGroup(item) ? item.representative.start : item.start);
}

/**
 * Same real-world event from two paths (history fetch vs live `hass.states`),
 * whose timestamps can differ by float rounding.
 */
function isSameEvent(a: ChronicleEvent, b: ChronicleEvent): boolean {
  return a.id === b.id || (
    a.sourceType === b.sourceType &&
    a.entityId === b.entityId &&
    a.title === b.title &&
    Math.abs(timestampOf(a.start) - timestampOf(b.start)) < 1000
  );
}

const newestFirst = (a: ChronicleEvent, b: ChronicleEvent) => timestampOf(b.start) - timestampOf(a.start);

/**
 * Template fields resolved per event: metadata key holding the template →
 * where the rendered value goes.
 */
const TEMPLATE_FIELDS: Array<{ key: string; apply: (e: ChronicleEvent, v: string) => void; has: (e: ChronicleEvent) => boolean }> = [
  { key: '_image_template', apply: (e, v) => { e.mediaUrl = v; }, has: (e) => !!e.mediaUrl },
  { key: '_clip_template', apply: (e, v) => { e.metadata = { ...e.metadata, clip_url: v }; }, has: (e) => !!e.metadata?.clip_url },
];

/** Rendered template results keyed by template + variables, so polls don't re-render. */
const TEMPLATE_CACHE_MAX = 1000;
const templateCache = new Map<string, string>();

/**
 * Fetch window. Whole-number day counts snap to calendar days (days_back: 0 =
 * today since midnight, 1 = yesterday + today), so the timeline shows complete
 * days regardless of the time of day. Fractions keep a rolling window.
 */
function computeRange(config: ChronicleCardConfig): TimeRange {
  const now = new Date();
  const back = Math.max(0, config.days_back ?? DEFAULT_CONFIG.days_back ?? 7);
  const forward = Math.max(0, config.days_forward ?? 0);
  const start = Number.isInteger(back) ? startOfDay(-back) : new Date(now.getTime() - back * 86_400_000);
  const end = forward === 0
    ? now
    : Number.isInteger(forward) ? startOfDay(forward + 1) : new Date(now.getTime() + forward * 86_400_000);
  return { start, end };
}

type ChangeCallback = () => void;

export class EventStore {
  private adapters: ISourceAdapter[] = [];
  private allEvents: ChronicleEvent[] = [];
  private filteredItems: Array<ChronicleEvent | EventGroup> = [];
  private lastFetch = 0;
  private lastHash = '';
  private listeners: Set<ChangeCallback> = new Set();
  private config!: ChronicleCardConfig;
  private fetchPromise: Promise<void> | null = null;
  /** Bumped on configure() so a fetch started under an old config is discarded. */
  private generation = 0;
  /** Expanded groups survive re-grouping (keyed by their oldest event id). */
  private expandedGroups = new Set<string>();
  /**
   * Live events by id → time received. The recorder commits with a short
   * delay, so a poll right after a live event may not include it yet; these
   * are carried over until a fetch returns them (or they age out).
   */
  private recentLive = new Map<string, { event: ChronicleEvent; at: number }>();

  get items(): Array<ChronicleEvent | EventGroup> {
    return this.filteredItems;
  }

  get events(): ChronicleEvent[] {
    return this.allEvents;
  }

  /** Minimum poll interval across sources, in ms. */
  get pollInterval(): number {
    return (this.config?.sources ?? []).reduce(
      (min, s) => Math.min(min, (s.poll_interval ?? DEFAULT_POLL_INTERVAL) * 1000),
      DEFAULT_POLL_INTERVAL * 1000,
    );
  }

  configure(config: ChronicleCardConfig): void {
    this.config = config;
    this.generation++;
    this.lastFetch = 0;
    this.lastHash = '';
    this.fetchPromise = null;
    this.recentLive.clear();
    this.adapters = [];
    for (const sourceConfig of config.sources ?? []) {
      try {
        const adapter = adapterRegistry.create(sourceConfig.type);
        adapter.configure(sourceConfig);
        this.adapters.push(adapter);
      } catch (err) {
        console.warn('[chronicle-card] Skipping source:', err);
      }
    }
    // Re-filter what we have so filter/appearance edits show immediately
    if (this.allEvents.length) this.applyFiltersAndGroup();
  }

  subscribe(callback: ChangeCallback): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notify(): void {
    for (const cb of this.listeners) {
      cb();
    }
  }

  async fetch(hass: HomeAssistant, force = false): Promise<void> {
    if (!this.config) return;
    if (!force && Date.now() - this.lastFetch < this.pollInterval) {
      return;
    }

    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    const promise = this._doFetch(hass, this.generation);
    this.fetchPromise = promise;
    try {
      await promise;
    } finally {
      if (this.fetchPromise === promise) this.fetchPromise = null;
    }
  }

  private async _doFetch(hass: HomeAssistant, generation: number): Promise<void> {
    // Mark up front so concurrent hass updates don't queue another fetch
    this.lastFetch = Date.now();
    const range = computeRange(this.config);

    const results = await Promise.allSettled(
      this.adapters.map((a) => a.fetchEvents(hass, range)),
    );

    const events: ChronicleEvent[] = [];
    for (const result of results) {
      if (result.status === 'fulfilled') {
        events.push(...result.value);
      } else {
        console.warn('[chronicle-card] Adapter fetch failed:', result.reason);
      }
    }

    // Deduplicate by ID
    const seen = new Set<string>();
    const unique: ChronicleEvent[] = [];
    for (const e of events) {
      if (!seen.has(e.id)) {
        seen.add(e.id);
        unique.push(e);
      }
    }

    const now = Date.now();
    for (const [id, live] of this.recentLive) {
      if (now - live.at > 120_000 || unique.some((e) => isSameEvent(e, live.event))) {
        this.recentLive.delete(id);
      } else {
        seen.add(id);
        unique.push(live.event);
      }
    }

    unique.sort(newestFirst);

    await this.resolveMedia(hass, unique);
    await this.resolveTemplates(hass, unique);

    if (generation !== this.generation) return;

    const hash = this.computeHash(unique);
    if (hash === this.lastHash) return;

    this.allEvents = unique;
    this.lastHash = hash;
    this.applyFiltersAndGroup();
  }

  /**
   * Live updates: let adapters diff the previous and current `hass.states`.
   * HA already pushes every state change to the card via the `hass` setter,
   * so this costs no extra websocket traffic.
   */
  async processStateChanges(hass: HomeAssistant, oldHass: HomeAssistant): Promise<void> {
    if (hass.states === oldHass.states) return;
    const generation = this.generation;
    const fresh: ChronicleEvent[] = [];
    for (const adapter of this.adapters) {
      const events = adapter.processStateChanges?.(hass, oldHass);
      if (events?.length) fresh.push(...events);
    }
    const added = fresh.filter((e) => !this.allEvents.some((x) => isSameEvent(x, e)));
    if (added.length === 0) return;

    await this.resolveMedia(hass, added);
    await this.resolveTemplates(hass, added);
    if (generation !== this.generation) return;

    const stillNew = added.filter((e) => !this.allEvents.some((x) => isSameEvent(x, e)));
    if (stillNew.length === 0) return;
    for (const e of stillNew) this.recentLive.set(e.id, { event: e, at: Date.now() });
    this.allEvents = [...stillNew, ...this.allEvents].sort(newestFirst);
    this.lastHash = this.computeHash(this.allEvents);
    this.applyFiltersAndGroup();
  }

  private applyFiltersAndGroup(): void {
    let events = [...this.allEvents];
    const filters = this.config.filters ?? {};

    // Category filter
    if (filters.categories && filters.categories.length > 0) {
      const cats = new Set(filters.categories);
      events = events.filter((e) => cats.has(e.category));
    }

    // Severity filter
    if (filters.severities && filters.severities.length > 0) {
      const sevs = new Set(filters.severities);
      events = events.filter((e) => sevs.has(e.severity));
    }

    // Source filter
    if (filters.sources && filters.sources.length > 0) {
      const srcs = new Set(filters.sources);
      events = events.filter((e) => srcs.has(e.sourceId) || srcs.has(e.sourceType));
    }

    // Entity filter
    if (filters.entities && filters.entities.length > 0) {
      const ents = new Set(filters.entities);
      events = events.filter((e) => e.entityId && ents.has(e.entityId));
    }

    const matches = (e: ChronicleEvent, q: string) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      !!(e.label && e.label.toLowerCase().includes(q));

    // Search filter
    if (filters.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase().trim();
      events = events.filter((e) => matches(e, q));
    }

    // Exclusion filters — applied after inclusion filters
    if (filters.exclude_categories && filters.exclude_categories.length > 0) {
      const cats = new Set(filters.exclude_categories);
      events = events.filter((e) => !cats.has(e.category));
    }
    if (filters.exclude_severities && filters.exclude_severities.length > 0) {
      const sevs = new Set(filters.exclude_severities);
      events = events.filter((e) => !sevs.has(e.severity));
    }
    if (filters.exclude_sources && filters.exclude_sources.length > 0) {
      const srcs = new Set(filters.exclude_sources);
      events = events.filter((e) => !srcs.has(e.sourceId) && !srcs.has(e.sourceType));
    }
    if (filters.exclude_entities && filters.exclude_entities.length > 0) {
      const ents = new Set(filters.exclude_entities);
      events = events.filter((e) => !e.entityId || !ents.has(e.entityId));
    }
    if (filters.exclude_search && filters.exclude_search.trim().length > 0) {
      const q = filters.exclude_search.toLowerCase().trim();
      events = events.filter((e) => !matches(e, q));
    }

    // Limit
    const max = this.config.max_events ?? DEFAULT_CONFIG.max_events ?? 50;
    if (events.length > max) {
      events = events.slice(0, max);
    }

    // Card-level grouping defaults (used as fallback when a source doesn't
    // declare its own grouping config).
    const cardGrouping: GroupingConfig = {
      ...DEFAULT_CONFIG.grouping,
      ...this.config.grouping,
    };

    // Per-source grouping overrides: each overriding source is grouped in
    // isolation with its merged config, everything else goes through a single
    // global pass with the card-level config. The streams are then merged by
    // timestamp (newest first) so the timeline stays time-ordered overall.
    const perSourceConfigs = new Map<string, GroupingConfig>();
    for (const s of this.config.sources ?? []) {
      if (s.grouping) {
        perSourceConfigs.set(effectiveSourceId(s), { ...cardGrouping, ...s.grouping });
      }
    }

    let items: Array<ChronicleEvent | EventGroup>;
    if (perSourceConfigs.size === 0) {
      items = groupEvents(events, cardGrouping);
    } else {
      const sourceBuckets = new Map<string, ChronicleEvent[]>();
      const globalBucket: ChronicleEvent[] = [];
      for (const e of events) {
        if (perSourceConfigs.has(e.sourceId)) {
          const list = sourceBuckets.get(e.sourceId) ?? [];
          list.push(e);
          sourceBuckets.set(e.sourceId, list);
        } else {
          globalBucket.push(e);
        }
      }

      items = [];
      for (const [sourceId, bucket] of sourceBuckets) {
        items.push(...groupEvents(bucket, perSourceConfigs.get(sourceId)!));
      }
      items.push(...groupEvents(globalBucket, cardGrouping));
      items.sort((a, b) => itemTimestamp(b) - itemTimestamp(a));
    }

    for (const item of items) {
      if (isEventGroup(item)) item.expanded = this.expandedGroups.has(groupKey(item));
    }

    this.filteredItems = items;
    this.notify();
  }

  toggleGroup(group: EventGroup): void {
    const key = groupKey(group);
    if (this.expandedGroups.has(key)) this.expandedGroups.delete(key);
    else this.expandedGroups.add(key);
    // New array identity so Lit re-renders the layouts
    this.filteredItems = this.filteredItems.map((item) =>
      isEventGroup(item) && groupKey(item) === key ? { ...item, expanded: !item.expanded } : item,
    );
    this.notify();
  }

  /**
   * Resolve mediaContentId → mediaUrl for events that have a content ID but no URL yet.
   */
  private async resolveMedia(hass: HomeAssistant, events: ChronicleEvent[]): Promise<void> {
    const needsResolution = events.filter((e) => e.mediaContentId && !e.mediaUrl);
    if (needsResolution.length === 0) return;

    const results = await Promise.allSettled(
      needsResolution.map((e) => resolveMediaUrl(hass, e.mediaContentId!)),
    );

    for (let i = 0; i < needsResolution.length; i++) {
      const result = results[i];
      if (result.status === 'fulfilled' && result.value) {
        needsResolution[i].mediaUrl = result.value;
      }
    }
  }

  /**
   * Resolve `image_template` / `clip_template` (stored in metadata by the
   * adapter). Plain strings without Jinja syntax are used as-is; templates are
   * rendered via HA's `render_template` with the event's variables, chunked
   * to bound concurrent subscriptions, and cached across polls.
   */
  private async resolveTemplates(hass: HomeAssistant, events: ChronicleEvent[]): Promise<void> {
    const jobs: Array<{ event: ChronicleEvent; template: string; apply: (e: ChronicleEvent, v: string) => void }> = [];

    for (const e of events) {
      for (const field of TEMPLATE_FIELDS) {
        const tpl = e.metadata?.[field.key];
        if (typeof tpl !== 'string' || !tpl.trim() || field.has(e)) continue;
        if (!isJinjaTemplate(tpl)) {
          field.apply(e, tpl.trim());
          continue;
        }
        jobs.push({ event: e, template: tpl, apply: field.apply });
      }
    }
    if (jobs.length === 0) return;

    const contextOf = (e: ChronicleEvent): TemplateContext => ({
      entity_id: e.entityId || '',
      state: (e.metadata?.new_state as string) || '',
      old_state: (e.metadata?.old_state as string) || '',
      timestamp: e.start,
      attributes: (e.metadata?.attributes as Record<string, unknown>) || {},
      source_name: (e.metadata?.source_name as string) || '',
    });

    const CHUNK = 50;
    for (let i = 0; i < jobs.length; i += CHUNK) {
      await Promise.allSettled(
        jobs.slice(i, i + CHUNK).map(async (job) => {
          const vars = contextOf(job.event);
          const cacheKey = `${job.template}\u0000${JSON.stringify(vars)}`;
          let value = templateCache.get(cacheKey);
          if (value === undefined) {
            try {
              value = ((await renderTemplate(hass, job.template, { ...vars })) ?? '').trim();
            } catch (err) {
              console.warn('[chronicle-card] Template resolution failed:', err);
              return;
            }
            if (templateCache.size >= TEMPLATE_CACHE_MAX) {
              templateCache.delete(templateCache.keys().next().value as string);
            }
            templateCache.set(cacheKey, value);
          }
          if (value) job.apply(job.event, value);
        }),
      );
    }
  }

  private computeHash(events: ChronicleEvent[]): string {
    return events
      .map((e) => `${e.id}|${e.title}|${e.description}|${e.details ?? ''}|${e.mediaUrl ?? ''}|${e.metadata?.clip_url ?? ''}`)
      .join('\n');
  }
}
