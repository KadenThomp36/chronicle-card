import { SeverityLevel } from '../models/event';
import { CATEGORY_ICONS, SEVERITY_COLORS } from '../constants';

const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;
const FUNC_COLOR_RE = /^(?:rgb|rgba|hsl|hsla)\(\s*[0-9.,%\s/-]+\s*\)$/i;
const NAMED_COLOR_RE = /^[a-zA-Z]{3,20}$/;
const COLOR_FALLBACK = '#78909C';

/**
 * Validate a CSS color string for safe interpolation into a style attribute.
 * Returns the input if it matches a hex / rgb()/rgba() / hsl()/hsla() / named-color
 * shape, otherwise returns the fallback. Prevents attribute-escape XSS when the
 * color is rendered via innerHTML.
 */
export function safeColor(value: unknown, fallback: string = COLOR_FALLBACK): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  if (HEX_COLOR_RE.test(trimmed)) return trimmed;
  if (FUNC_COLOR_RE.test(trimmed)) return trimmed;
  if (NAMED_COLOR_RE.test(trimmed)) return trimmed;
  return fallback;
}

/** Mix a hex color toward white for icon contrast; non-hex colors get white. */
export function tintColor(hex: string, amount = 0.82): string {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return '#ffffff';
  const mix = (c: string) => Math.round(parseInt(c, 16) + (255 - parseInt(c, 16)) * amount);
  return `#${[m[1], m[2], m[3]].map((c) => mix(c).toString(16).padStart(2, '0')).join('')}`;
}

/**
 * Get the display color for a severity level.
 * Allows optional per-severity custom color overrides that fall back to
 * the default palette defined in constants.ts.
 */
export function getSeverityColor(
  severity: SeverityLevel,
  customColors?: Partial<Record<SeverityLevel, string>>,
): string {
  if (customColors && customColors[severity]) {
    return customColors[severity]!;
  }
  return SEVERITY_COLORS[severity] ?? SEVERITY_COLORS.info;
}

/**
 * Any "prefix:name" icon — mdi:, hass:, and custom icon sets registered with
 * HA's icon picker (e.g. phu:, si:) all render through <ha-icon>.
 */
export function validIcon(icon: string | undefined): string {
  return icon && /^[a-z0-9_-]+:[a-z0-9_-]+$/i.test(icon) ? icon : CATEGORY_ICONS.default;
}
