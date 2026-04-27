import { SeverityLevel } from '../models/event';
import { SEVERITY_COLORS } from '../constants';

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

/**
 * Parse a hex color string (with or without #, 3 or 6 digits) into RGB components.
 * Returns { r: 0, g: 0, b: 0 } for invalid input.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const fallback = { r: 0, g: 0, b: 0 };

  if (typeof hex !== 'string') {
    return fallback;
  }

  let cleaned = hex.replace(/^#/, '');

  // Expand shorthand (e.g. "F0A" -> "FF00AA")
  if (cleaned.length === 3) {
    cleaned = cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
  }

  if (cleaned.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return fallback;
  }

  return {
    r: parseInt(cleaned.substring(0, 2), 16),
    g: parseInt(cleaned.substring(2, 4), 16),
    b: parseInt(cleaned.substring(4, 6), 16),
  };
}

/**
 * Convert RGB components to a 6-digit hex color string with leading #.
 * Values are clamped to 0-255.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Darken a hex color by the given amount (0 = no change, 1 = black).
 */
export function darken(hex: string, amount: number): string {
  const clamped = Math.max(0, Math.min(1, amount));
  const { r, g, b } = hexToRgb(hex);
  const factor = 1 - clamped;
  return rgbToHex(
    Math.round(r * factor),
    Math.round(g * factor),
    Math.round(b * factor),
  );
}

/**
 * Lighten a hex color by the given amount (0 = no change, 1 = white).
 */
export function lighten(hex: string, amount: number): string {
  const clamped = Math.max(0, Math.min(1, amount));
  const { r, g, b } = hexToRgb(hex);
  return rgbToHex(
    Math.round(r + (255 - r) * clamped),
    Math.round(g + (255 - g) * clamped),
    Math.round(b + (255 - b) * clamped),
  );
}

/**
 * Return an rgba() CSS string for the given hex color and alpha (0-1).
 */
export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  const a = Math.max(0, Math.min(1, alpha));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
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
