import { ChronicleEvent } from '../models/event';

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/**
 * Safely coerce a Date or ISO string into a Date object.
 * Returns current date/time if the input is invalid.
 */
function toDate(date: Date | string): Date {
  if (date instanceof Date) {
    return isNaN(date.getTime()) ? new Date() : date;
  }
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

/**
 * Pad a number to two digits.
 */
function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

/**
 * Format a time value as either "14:30" (24h) or "2:30 PM" (12h).
 */
export function formatTime(date: Date | string, format: '12h' | '24h'): string {
  const d = toDate(date);
  const hours = d.getHours();
  const minutes = pad(d.getMinutes());

  if (format === '24h') {
    return `${pad(hours)}:${minutes}`;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes} ${period}`;
}

/**
 * Format a date as "Mon, Mar 10".
 */
export function formatDate(date: Date | string): string {
  const d = toDate(date);
  const dayName = DAY_NAMES[d.getDay()];
  const monthName = MONTH_NAMES[d.getMonth()];
  const dayOfMonth = d.getDate();
  return `${dayName}, ${monthName} ${dayOfMonth}`;
}

/**
 * Return a human-readable relative time string.
 * Produces values like "just now", "2 min ago", "3h ago", "Yesterday", or a formatted date.
 */
export function relativeTime(date: Date | string): string {
  const d = toDate(date);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();

  // Future dates – just return the formatted date
  if (diffMs < 0) {
    return formatDate(d);
  }

  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);

  if (diffSec < 60) {
    return 'just now';
  }
  if (diffMin < 60) {
    return `${diffMin} min ago`;
  }
  if (diffHr < 24 && isToday(d)) {
    return `${diffHr}h ago`;
  }
  if (isYesterday(d)) {
    return 'Yesterday';
  }
  return formatDate(d);
}

/**
 * Check whether a date falls on today's calendar date.
 */
export function isToday(date: Date | string): boolean {
  const d = toDate(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

/**
 * Check whether a date falls on yesterday's calendar date.
 */
export function isYesterday(date: Date | string): boolean {
  const d = toDate(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate()
  );
}

/**
 * Produce a "YYYY-MM-DD" key for a given date.
 */
function dateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Group an array of ChronicleEvents by their start date, keyed as "YYYY-MM-DD".
 * Events are placed into groups in the order they appear; groups are insertion-ordered.
 */
export function groupByDate(events: ChronicleEvent[]): Map<string, ChronicleEvent[]> {
  const groups = new Map<string, ChronicleEvent[]>();

  for (const event of events) {
    const d = toDate(event.start);
    const key = dateKey(d);
    const bucket = groups.get(key);
    if (bucket) {
      bucket.push(event);
    } else {
      groups.set(key, [event]);
    }
  }

  return groups;
}

/**
 * Convert a "YYYY-MM-DD" date key to a human-readable label:
 * "Today", "Yesterday", or a formatted date like "Mon, Mar 10".
 */
export function getDateLabel(key: string): string {
  const parsed = new Date(key + 'T00:00:00');
  if (isNaN(parsed.getTime())) {
    return key;
  }
  if (isToday(parsed)) {
    return 'Today';
  }
  if (isYesterday(parsed)) {
    return 'Yesterday';
  }
  return formatDate(parsed);
}
