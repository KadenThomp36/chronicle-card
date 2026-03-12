import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent } from '../models/event';
import { SourceConfig } from '../models/config';

export interface ISourceAdapter {
  readonly type: string;
  configure(config: SourceConfig): void;
  fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]>;
  subscribeLive?(hass: HomeAssistant, onEvent: (e: ChronicleEvent) => void): Promise<() => void>;
  canDelete?: boolean;
  deleteEvent?(hass: HomeAssistant, eventId: string): Promise<boolean>;
}
