import { ActionConfig } from './config';

export type SeverityLevel = 'critical' | 'warning' | 'info' | 'debug';
export type SourceType = 'calendar' | 'rest' | 'history' | 'static';

export interface ChronicleEvent {
  id: string;
  sourceType: SourceType;
  sourceId: string;
  title: string;
  description: string;
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

export interface ChronicleAction {
  label: string;
  icon?: string;
  type: 'service' | 'navigate' | 'fire-event';
  service?: string;
  serviceData?: Record<string, unknown>;
  target?: { entity_id?: string };
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
