import { HomeAssistant } from '../types';

/**
 * Date/time formatting that follows the user's Home Assistant profile:
 * language, 12/24h preference (`hass.locale.time_format`) and time zone
 * (`hass.locale.time_zone` — "server" formats in `hass.config.time_zone`).
 *
 * Like localize.ts, the active context is module-level and set by
 * <chronicle-card> before each render, so pure helpers don't need `hass`.
 */
interface FormatContext {
  language: string | undefined;
  hour12: boolean | undefined;
  timeZone: string | undefined;
}

let ctx: FormatContext = { language: undefined, hour12: undefined, timeZone: undefined };
const formatterCache = new Map<string, Intl.DateTimeFormat>();

function validLocale(language: string | undefined): string | undefined {
  if (!language) return undefined;
  try {
    new Intl.DateTimeFormat(language);
    return language;
  } catch {
    return undefined;
  }
}

export function setFormatContext(
  hass: HomeAssistant | undefined,
  language: string | undefined,
  timeFormat: '12h' | '24h' | undefined,
): void {
  let hour12: boolean | undefined;
  if (timeFormat) {
    hour12 = timeFormat === '12h';
  } else {
    switch (hass?.locale?.time_format) {
      case '12': hour12 = true; break;
      case '24': hour12 = false; break;
      case 'system':
        hour12 = new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hour12;
        break;
      default: hour12 = undefined; // "language" — let Intl decide for the locale
    }
  }
  const timeZone = hass?.locale?.time_zone === 'server' ? hass.config?.time_zone : undefined;
  const next = { language: validLocale(language), hour12, timeZone };
  if (next.language !== ctx.language || next.hour12 !== ctx.hour12 || next.timeZone !== ctx.timeZone) {
    ctx = next;
    formatterCache.clear();
  }
}

/**
 * Cached formatter in the display time zone. `machine` formatters use a fixed
 * locale so parts can be parsed back into numbers regardless of language.
 */
function formatter(key: string, options: Intl.DateTimeFormatOptions, machine = false): Intl.DateTimeFormat {
  let f = formatterCache.get(key);
  if (!f) {
    const locale = machine ? 'en-US' : ctx.language;
    try {
      f = new Intl.DateTimeFormat(locale, { timeZone: ctx.timeZone, ...options });
    } catch {
      // Unknown server time zone — fall back to the browser's
      f = new Intl.DateTimeFormat(locale, options);
    }
    formatterCache.set(key, f);
  }
  return f;
}

/**
 * Parse an ISO string or Date. Date-only strings ("2026-10-13", e.g. all-day
 * calendar events) are local midnight — `new Date()` would treat them as UTC
 * and shift them to the previous day west of Greenwich.
 */
export function toDate(date: Date | string): Date {
  if (date instanceof Date) return isNaN(date.getTime()) ? new Date() : date;
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const parsed = dateOnly
    ? new Date(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]))
    : new Date(date);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

export function timestampOf(date: Date | string): number {
  return toDate(date).getTime();
}

/** "14:30" / "2:30 PM", per the user's locale and 12/24h preference. */
export function formatTime(date: Date | string): string {
  return formatter('time', { hour: 'numeric', minute: '2-digit', hour12: ctx.hour12 }).format(toDate(date));
}

/** "Mon, Oct 13, 14:30" for the detail dialog. */
export function formatDateTime(date: Date | string): string {
  return formatter('datetime', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: ctx.hour12,
  }).format(toDate(date));
}

function formatShortDate(date: Date): string {
  return formatter('date', { weekday: 'short', month: 'short', day: 'numeric' }).format(date);
}

/** Calendar-day key ("YYYY-MM-DD") in the display time zone. */
export function dateKey(date: Date | string): string {
  const parts = formatter('key', { year: 'numeric', month: '2-digit', day: '2-digit' }, true)
    .formatToParts(toDate(date));
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** Whole days between two day keys (b - a). */
function dayDiff(a: string, b: string): number {
  const toUtc = (k: string) => {
    const [y, m, d] = k.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(b) - toUtc(a)) / 86_400_000);
}

function relativeFormatter(): Intl.RelativeTimeFormat {
  return new Intl.RelativeTimeFormat(ctx.language, { numeric: 'auto' });
}

/** "Today" / "Yesterday" / "Tomorrow", else "Mon, Oct 13". */
export function formatDateHeader(date: Date | string): string {
  const d = toDate(date);
  const diff = dayDiff(dateKey(new Date()), dateKey(d));
  if (Math.abs(diff) <= 1) {
    const s = relativeFormatter().format(diff, 'day');
    return s.charAt(0).toLocaleUpperCase() + s.slice(1);
  }
  return formatShortDate(d);
}

/** "now", "5 minutes ago", "3 hours ago", "yesterday", or a short date. */
export function relativeTime(date: Date | string): string {
  const d = toDate(date);
  const diffSec = Math.round((d.getTime() - Date.now()) / 1000);
  const rtf = relativeFormatter();
  if (Math.abs(diffSec) < 60) return rtf.format(0, 'second');
  if (Math.abs(diffSec) < 3600) return rtf.format(Math.trunc(diffSec / 60), 'minute');
  const days = dayDiff(dateKey(new Date()), dateKey(d));
  if (days === 0) return rtf.format(Math.trunc(diffSec / 3600), 'hour');
  if (Math.abs(days) === 1) return rtf.format(days, 'day');
  return formatShortDate(d);
}

/** UTC offset (ms) of the display time zone at `t`. */
function zoneOffset(t: number): number {
  if (!ctx.timeZone) return -new Date(t).getTimezoneOffset() * 60_000;
  const parts = formatter('offset', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23',
  }, true).formatToParts(new Date(t));
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  const wall = Date.UTC(get('year'), get('month') - 1, get('day'), get('hour'), get('minute'), get('second'));
  return wall - Math.floor(t / 1000) * 1000;
}

/** Midnight (display time zone) `offsetDays` from today. */
export function startOfDay(offsetDays: number): Date {
  const [y, m, d] = dateKey(new Date()).split('-').map(Number);
  const wallMidnight = Date.UTC(y, m - 1, d + offsetDays);
  // Two passes settle DST transitions
  let t = wallMidnight - zoneOffset(wallMidnight);
  t = wallMidnight - zoneOffset(t);
  return new Date(t);
}
