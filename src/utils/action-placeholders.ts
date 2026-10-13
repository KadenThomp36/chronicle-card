import { ChronicleEvent } from '../models/event';

/**
 * Expand `{field}` placeholders in action strings with values from the event.
 *
 * Supported placeholders: `{id}` (raw source id when available, e.g. the
 * Frigate event id for REST sources), `{title}`, `{description}`, `{entity}` /
 * `{entity_id}`, `{source}`, `{category}`, `{severity}`, `{start}`, `{end}`,
 * `{media_url}`, plus any scalar metadata key (e.g. `{new_state}`).
 * Unknown placeholders are left untouched.
 */
export function expandPlaceholders(template: string, event: ChronicleEvent): string {
  const meta = event.metadata ?? {};

  const ctx: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(meta)) {
    if (v == null || typeof v === 'object') continue;
    ctx[k] = v;
  }

  Object.assign(ctx, {
    // Prefer the raw upstream id (set by adapters) over the namespaced store id
    id: (meta.raw_id as string | undefined) ?? event.id,
    title: event.title,
    description: event.description,
    entity: event.entityId ?? '',
    entity_id: event.entityId ?? '',
    source: event.sourceId,
    category: event.category,
    severity: event.severity,
    start: event.start,
    end: event.end,
    media_url: event.mediaUrl ?? '',
  });

  return template.replace(/\{([\w.]+)\}/g, (match, key: string) =>
    ctx[key] != null ? String(ctx[key]) : match,
  );
}

/** Recursively expand placeholders in every string value of a plain object. */
function expandDeep<T>(value: T, event: ChronicleEvent): T {
  if (typeof value === 'string') {
    return expandPlaceholders(value, event) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => expandDeep(v, event)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = expandDeep(v, event);
    }
    return out as unknown as T;
  }
  return value;
}

/** Expand placeholders in every string field of an action config. */
export function expandActionConfig<T extends object>(config: T, event: ChronicleEvent): T {
  return expandDeep(config, event);
}
