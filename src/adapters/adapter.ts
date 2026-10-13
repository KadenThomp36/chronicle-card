import { HomeAssistant, TimeRange } from '../types';
import { ChronicleEvent } from '../models/event';
import { SourceConfig } from '../models/config';

export interface ISourceAdapter {
  readonly type: string;
  configure(config: SourceConfig): void;
  fetchEvents(hass: HomeAssistant, range: TimeRange): Promise<ChronicleEvent[]>;
  /**
   * Optional live updates. Called on every `hass` update with the previous
   * object; return events for any relevant state transitions. HA already
   * streams state changes into `hass.states`, so adapters should diff that
   * rather than opening their own websocket subscriptions.
   */
  processStateChanges?(hass: HomeAssistant, oldHass: HomeAssistant): ChronicleEvent[];
}
