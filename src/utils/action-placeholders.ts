import { ChronicleEvent } from '../models/event';
import { EventTextConfig } from '../models/config';

/**
 * Expand `{field}` placeholders in action strings with values from the event.
 *
 * Supported placeholders: `{id}` (raw source id when available, e.g. the
 * Frigate event id for REST sources), `{title}`, `{description}`, `{entity}` /
 * `{entity_id}`, `{source}`, `{category}`, `{severity}`, `{start}`, `{end}`,
 * `{media_url}`, plus any scalar metadata key (e.g. `{new_state}`) and dotted
 * paths into object metadata (e.g. `{attributes.temperature}`).
 * Unknown placeholders are left untouched, or removed with `dropUnknown`.
 */
export function expandPlaceholders(template: string, event: ChronicleEvent, dropUnknown = false): string {
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

  return template.replace(/\{([\w.]+)\}/g, (match, key: string) => {
    const value = ctx[key] ?? (key.includes('.') ? lookupPath(meta, key) : undefined);
    if (value != null && typeof value !== 'object') return String(value);
    return dropUnknown ? '' : match;
  });
}

function lookupPath(obj: Record<string, unknown>, path: string): unknown {
  let cur: unknown = obj;
  for (const part of path.split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[part];
  }
  return cur;
}

/**
 * Apply `title_template` / `description_template` / `show_description` to an
 * adapter's default event text. Per-entity settings win over source-level
 * ones. Templates expand against the default event, so `{title}` and
 * `{description}` are the default text. Placeholders with no value for an
 * event (e.g. `{context_name}` on an entry nothing triggered) expand to
 * nothing; a title that expands to nothing keeps the default so an event is
 * never blank.
 */
export function applyEventText(
  event: ChronicleEvent,
  entity: EventTextConfig | undefined,
  source: EventTextConfig | undefined,
): ChronicleEvent {
  const titleTemplate = entity?.title_template || source?.title_template;
  const descriptionTemplate = entity?.description_template || source?.description_template;
  const showDescription = entity?.show_description ?? source?.show_description ?? true;
  if (!titleTemplate && !descriptionTemplate && showDescription) return event;

  const title = titleTemplate ? expandPlaceholders(titleTemplate, event, true).trim() || event.title : event.title;
  let description = descriptionTemplate ? expandPlaceholders(descriptionTemplate, event, true).trim() : event.description;
  if (!showDescription) description = '';
  return { ...event, title, description };
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
