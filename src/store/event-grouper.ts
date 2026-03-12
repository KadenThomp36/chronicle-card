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
  let bucketAnchor: number | null = null;

  const getKey = (e: ChronicleEvent): string => {
    switch (groupBy) {
      case 'category': return e.category;
      case 'source': return `${e.sourceType}:${e.sourceId}`;
      case 'entity': return e.entityId ?? '';
      default: return '';
    }
  };

  const flushBucket = () => {
    if (currentBucket.length === 0) return;
    if (currentBucket.length >= minSize) {
      const representative = currentBucket[0];
      const categoryLabel = representative.category || representative.sourceType;
      result.push({
        representative,
        events: currentBucket,
        summary: `${currentBucket.length} ${categoryLabel} events`,
        expanded: false,
      });
    } else {
      result.push(...currentBucket);
    }
    currentBucket = [];
    bucketKey = null;
    bucketAnchor = null;
  };

  for (const event of events) {
    const key = getKey(event);
    const ts = new Date(event.start).getTime();

    if (bucketKey === null) {
      bucketKey = key;
      bucketAnchor = ts;
      currentBucket.push(event);
      continue;
    }

    const withinWindow = bucketAnchor !== null && Math.abs(ts - bucketAnchor) <= windowMs;
    const sameKey = key === bucketKey;

    if (sameKey && withinWindow) {
      currentBucket.push(event);
    } else {
      flushBucket();
      bucketKey = key;
      bucketAnchor = ts;
      currentBucket.push(event);
    }
  }

  flushBucket();
  return result;
}
