import { HomeAssistant, HassEvent } from '../types';

// ---------------------------------------------------------------------------
// Local interfaces
// ---------------------------------------------------------------------------

export interface CalendarEvent {
  summary: string;
  description?: string;
  start: string | { dateTime: string; date?: string };
  end: string | { dateTime: string; date?: string };
  location?: string;
  uid?: string;
  recurrence_id?: string;
  rrule?: string;
}

export interface HistoryEntry {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

/**
 * Fetch calendar events for a given entity within a time range.
 *
 * Uses the Home Assistant REST API endpoint:
 *   GET /api/calendars/<entity_id>?start=<ISO>&end=<ISO>
 */
export async function fetchCalendarEvents(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date,
): Promise<CalendarEvent[]> {
  const startIso = start.toISOString();
  const endIso = end.toISOString();

  try {
    const events = await hass.callApi<CalendarEvent[]>(
      'GET',
      `calendars/${entityId}?start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}`,
    );
    return Array.isArray(events) ? events : [];
  } catch {
    return [];
  }
}

/**
 * Fetch state history for one or more entities within a time range.
 *
 * Uses the Home Assistant REST API endpoint:
 *   GET /api/history/period/<start>?end_time=<end>&filter_entity_id=<ids>
 *
 * Returns an array of arrays: one inner array per entity, each containing
 * HistoryEntry objects sorted chronologically.
 */
export async function fetchHistory(
  hass: HomeAssistant,
  entityIds: string[],
  start: Date,
  end: Date,
): Promise<HistoryEntry[][]> {
  if (entityIds.length === 0) {
    return [];
  }

  const startIso = start.toISOString();
  const endIso = end.toISOString();
  const ids = entityIds.join(',');

  try {
    const history = await hass.callApi<HistoryEntry[][]>(
      'GET',
      `history/period/${encodeURIComponent(startIso)}?end_time=${encodeURIComponent(endIso)}&filter_entity_id=${encodeURIComponent(ids)}&minimal_response&no_attributes`,
    );
    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

/**
 * Subscribe to real-time state change events via the Home Assistant
 * WebSocket connection.
 *
 * The callback receives every `state_changed` event. Returns an
 * unsubscribe function that the caller should invoke when the subscription
 * is no longer needed (e.g. when the card is disconnected).
 */
export async function subscribeStateChanges(
  hass: HomeAssistant,
  callback: (event: HassEvent) => void,
): Promise<() => void> {
  try {
    const unsub = await hass.connection.subscribeEvents(
      (event: HassEvent) => {
        callback(event);
      },
      'state_changed',
    );
    return unsub;
  } catch {
    // Return a no-op unsubscribe if the subscription fails
    return () => {};
  }
}
