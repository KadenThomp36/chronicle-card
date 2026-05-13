import { ChronicleEvent, EventGroup } from '../models/event';
import { GroupingConfig } from '../models/config';

export function groupEvents(
  events: ChronicleEvent[],
  config: GroupingConfig,
): Array<ChronicleEvent | EventGroup> {
  if (!config.enabled || config.group_by === 'none' || events.length === 0) {
    return [...events];
  }

  const windowMs = (config.window_seconds ?? 120) * 1000;
  const minSize = config.min_group_size ?? 3;
  const groupBy = config.group_by ?? 'category';

  const result: Array<ChronicleEvent | EventGroup> = [];
  let currentBucket: ChronicleEvent[] = [];
  let bucketKey: string | null = null;
  let lastTs: number | null = null;

  const getKey = (e: ChronicleEvent): string => {
    switch (groupBy) {
      case 'category': return e.category;
      case 'source': return `${e.sourceType}:${e.sourceId}`;
      case 'entity': return e.entityId ?? '';
      default: return '';
    }
  };

  const buildSummary = (bucket: ChronicleEvent[]): string => {
    const count = bucket.length;
    const rep = bucket[0];

    // Custom group_name template wins outright. Supports {count} / {label} /
    // {source} / {entity} placeholders so users can write e.g. "{count} camera
    // detections" without losing the dynamic count.
    if (config.group_name) {
      return config.group_name
        .replace(/\{count\}/g, String(count))
        .replace(/\{label\}/g, rep.label || rep.category || '')
        .replace(/\{source\}/g, rep.sourceId || '')
        .replace(/\{entity\}/g, rep.entityName || rep.entityId || '');
    }

    // When the user explicitly groups by entity or source, that dimension is
    // what they want to see in the summary — regardless of whether all events
    // happen to share a label. (Previously, all-default-category events would
    // render as "5 default events" even with `group_by: entity`.)
    switch (groupBy) {
      case 'source':
        return `${count} ${rep.sourceId} events`;
      case 'entity':
        return `${count} ${rep.entityName || rep.entityId || 'entity'} events`;
    }

    // Category grouping (or fallback): prefer a shared label when present.
    const uniqueLabels = new Set(bucket.map(e => e.label || e.category).filter(Boolean));
    if (uniqueLabels.size === 1) {
      return `${count} ${[...uniqueLabels][0]} events`;
    }
    return `${count} ${rep.category} events`;
  };

  const flushBucket = () => {
    if (currentBucket.length === 0) return;
    if (currentBucket.length >= minSize) {
      const representative = currentBucket[0];
      result.push({
        representative,
        events: currentBucket,
        summary: buildSummary(currentBucket),
        expanded: false,
      });
    } else {
      result.push(...currentBucket);
    }
    currentBucket = [];
    bucketKey = null;
    lastTs = null;
  };

  for (const event of events) {
    const key = getKey(event);
    const ts = new Date(event.start).getTime();

    if (bucketKey === null) {
      bucketKey = key;
      lastTs = ts;
      currentBucket.push(event);
      continue;
    }

    // Sliding window: compare to the PREVIOUS event, not the first
    const withinWindow = lastTs !== null && Math.abs(ts - lastTs) <= windowMs;
    const sameKey = key === bucketKey;

    if (sameKey && withinWindow) {
      currentBucket.push(event);
      lastTs = ts;
    } else {
      flushBucket();
      bucketKey = key;
      lastTs = ts;
      currentBucket.push(event);
    }
  }

  flushBucket();
  return result;
}
