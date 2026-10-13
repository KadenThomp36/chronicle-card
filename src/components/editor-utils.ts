import { HomeAssistant } from '../types';

export type Schema = Record<string, unknown>;

export const GROUP_BY_OPTIONS = [
  { value: 'category', label: 'Category' },
  { value: 'source', label: 'Source' },
  { value: 'entity', label: 'Entity' },
  { value: 'none', label: 'None' },
];

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  !!v && typeof v === 'object' && !Array.isArray(v);

const isEmpty = (v: unknown) =>
  v === undefined || v === null || v === '' ||
  (Array.isArray(v) && v.length === 0) ||
  (isPlainObject(v) && Object.keys(v).length === 0);

const deepEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Turn the data ha-form hands back (which includes display defaults) into a
 * minimal config: keep keys the user already had, drop values that only
 * restate a default, and drop emptied fields. Keeps YAML free of noise.
 */
export function pruneConfig(
  next: Record<string, unknown>,
  raw: Record<string, unknown> | undefined,
  defaults: Record<string, unknown> | undefined,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(next)) {
    if (isEmpty(value)) continue;
    const hadKey = !!raw && key in raw;
    const def = defaults?.[key];
    if (isPlainObject(value)) {
      const rawSub = isPlainObject(raw?.[key]) ? raw![key] as Record<string, unknown> : undefined;
      const sub = pruneConfig(value, rawSub, isPlainObject(def) ? def : undefined);
      if (Object.keys(sub).length) out[key] = sub;
      continue;
    }
    if (!hadKey && def !== undefined && deepEqual(value, def)) continue;
    out[key] = value;
  }
  return out;
}

export function hexToRgb(hex: unknown): [number, number, number] | undefined {
  if (typeof hex !== 'string') return undefined;
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) return undefined;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];
}

export function rgbToHex(rgb: unknown): string | undefined {
  if (!Array.isArray(rgb) || rgb.length !== 3) return typeof rgb === 'string' ? rgb : undefined;
  return `#${rgb.map((v) => Math.max(0, Math.min(255, Math.round(Number(v)))).toString(16).padStart(2, '0')).join('')}`;
}

/** Map `keys` of `obj` through `fn`, leaving everything else untouched. */
export function mapKeys(obj: Record<string, unknown>, keys: string[], fn: (v: unknown) => unknown): Record<string, unknown> {
  const out = { ...obj };
  for (const k of keys) {
    if (k in out) out[k] = fn(out[k]);
  }
  return out;
}

/** HA version check, e.g. atLeast(hass, 2025, 9). */
export function atLeast(hass: HomeAssistant | undefined, year: number, month: number): boolean {
  const m = /^(\d+)\.(\d+)/.exec((hass?.config as { version?: string } | undefined)?.version ?? '');
  if (!m) return false;
  const [y, mo] = [Number(m[1]), Number(m[2])];
  return y > year || (y === year && mo >= month);
}

/**
 * Label lookup: HA's own translations for generic card-editor fields (so
 * "Title", "Entities", "Icon", "Tap action"… match built-in editors in every
 * language), then our English labels.
 */
export function makeComputeLabel(hass: HomeAssistant | undefined, labels: Record<string, string>) {
  const generic = new Set(['title', 'name', 'entity', 'entities', 'icon', 'tap_action', 'hold_action', 'state_color']);
  return (schema: { name?: string; title?: string }): string => {
    const name = schema.name ?? '';
    if (generic.has(name)) {
      const t = hass?.localize?.(`ui.panel.lovelace.editor.card.generic.${name}`);
      if (t) return t;
    }
    return labels[name] ?? schema.title ?? name;
  };
}
