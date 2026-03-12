import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent, EventGroup } from '../models/event';
import { ChronicleCardConfig, DEFAULT_CONFIG } from '../models/config';
import { ISourceAdapter } from '../adapters/adapter';
import { adapterRegistry } from '../adapters/adapter-registry';
import { groupEvents } from './event-grouper';
import { resolveMediaUrl } from '../utils/media-resolver';
import { DEFAULT_POLL_INTERVAL } from '../constants';

type ChangeCallback = () => void;

export class EventStore {
  private adapters: ISourceAdapter[] = [];
  private allEvents: ChronicleEvent[] = [];
  private filteredItems: Array<ChronicleEvent | EventGroup> = [];
  private lastFetch = 0;
  private lastHash = '';
  private liveUnsubscribers: Array<() => void> = [];
  private listeners: Set<ChangeCallback> = new Set();
  private config!: ChronicleCardConfig;
  private fetchPromise: Promise<void> | null = null;

  get items(): Array<ChronicleEvent | EventGroup> {
    return this.filteredItems;
  }

  get events(): ChronicleEvent[] {
    return this.allEvents;
  }

  configure(config: ChronicleCardConfig): void {
    this.config = config;
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
    const staleness = (this.config?.sources ?? []).reduce(
      (min, s) => Math.min(min, (s.poll_interval ?? DEFAULT_POLL_INTERVAL) * 1000),
      DEFAULT_POLL_INTERVAL * 1000,
    );

    if (!force && Date.now() - this.lastFetch < staleness) {
      return;
    }

    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    this.fetchPromise = this._doFetch(hass);
    try {
      await this.fetchPromise;
    } finally {
      this.fetchPromise = null;
    }
  }

  private async _doFetch(hass: HomeAssistant): Promise<void> {
    const daysBack = this.config.days_back ?? DEFAULT_CONFIG.days_back ?? 7;
    const end = new Date();
    const start = new Date(end.getTime() - daysBack * 24 * 60 * 60 * 1000);
    const range: TimeRange = { start, end };

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

    // Sort newest first
    unique.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

    // Resolve media content IDs to URLs
    await this.resolveMedia(hass, unique);

    // Check if data actually changed
    const hash = this.computeHash(unique);
    if (hash === this.lastHash) {
      this.lastFetch = Date.now();
      return;
    }

    this.allEvents = unique;
    this.lastHash = hash;
    this.lastFetch = Date.now();
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

    // Search filter
    if (filters.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase().trim();
      events = events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          (e.label && e.label.toLowerCase().includes(q)),
      );
    }

    // Limit
    const max = this.config.max_events ?? DEFAULT_CONFIG.max_events ?? 50;
    if (events.length > max) {
      events = events.slice(0, max);
    }

    // Group
    const groupingConfig = {
      enabled: true,
      window_seconds: 120,
      min_group_size: 3,
      group_by: 'category' as const,
      ...this.config.grouping,
    };

    this.filteredItems = groupEvents(events, groupingConfig);
    this.notify();
  }

  injectLiveEvent(event: ChronicleEvent): void {
    // Add to front if not duplicate
    if (this.allEvents.some((e) => e.id === event.id)) return;

    this.allEvents.unshift(event);
    this.lastHash = this.computeHash(this.allEvents);
    this.applyFiltersAndGroup();
  }

  async subscribeLive(hass: HomeAssistant): Promise<void> {
    // Unsubscribe existing
    this.unsubscribeLive();

    for (const adapter of this.adapters) {
      if (adapter.subscribeLive) {
        try {
          const unsub = await adapter.subscribeLive(hass, (event) => {
            this.injectLiveEvent(event);
          });
          this.liveUnsubscribers.push(unsub);
        } catch (err) {
          console.warn('[chronicle-card] Live subscription failed:', err);
        }
      }
    }
  }

  unsubscribeLive(): void {
    for (const unsub of this.liveUnsubscribers) {
      try { unsub(); } catch { /* ignore */ }
    }
    this.liveUnsubscribers = [];
  }

  toggleGroup(group: EventGroup): void {
    group.expanded = !group.expanded;
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

  private computeHash(events: ChronicleEvent[]): string {
    // Fast hash: join IDs + lengths
    if (events.length === 0) return '0';
    return `${events.length}:${events[0]?.id}:${events[events.length - 1]?.id}`;
  }
}
