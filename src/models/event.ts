import { ActionConfig } from './config';

export type SeverityLevel = 'critical' | 'warning' | 'info' | 'debug';
export type SourceType = 'calendar' | 'rest' | 'history' | 'static' | 'logbook';

export interface ChronicleEvent {
  id: string;
  sourceType: SourceType;
  sourceId: string;
  title: string;
  description: string;
  /** Formatted attribute summary (history `show_attributes`), shown even in compact mode. */
  details?: string;
  start: string;
  end: string;
  mediaUrl?: string;
  mediaContentId?: string;
  icon: string;
  color: string;
  category: string;
  label?: string;
  severity: SeverityLevel;
  entityId?: string;
  entityName?: string;
  actions?: ChronicleAction[];
  tapAction?: ActionConfig;
  holdAction?: ActionConfig;
  metadata?: Record<string, unknown>;
}

/**
 * Button under an event. Either a native HA action (`action: perform-action`,
 * `navigate`, `url`, … — same keys as tap_action) or the legacy
 * `type: service | navigate | fire-event` shape.
 */
export interface ChronicleAction extends Partial<ActionConfig> {
  label: string;
  icon?: string;
  type?: 'service' | 'navigate' | 'fire-event';
  serviceData?: Record<string, unknown>;
  url?: string;
  eventType?: string;
  eventData?: Record<string, unknown>;
}

export interface EventGroup {
  representative: ChronicleEvent;
  events: ChronicleEvent[];
  summary: string;
  expanded: boolean;
}

export function isEventGroup(item: ChronicleEvent | EventGroup): item is EventGroup {
  return 'events' in item && Array.isArray((item as EventGroup).events);
}
