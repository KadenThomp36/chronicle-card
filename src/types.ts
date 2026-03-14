export interface HomeAssistant {
  callApi: <T>(method: string, path: string, data?: Record<string, unknown>) => Promise<T>;
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
  callService: (domain: string, service: string, data?: Record<string, unknown>, target?: ServiceTarget) => Promise<void>;
  connection: HassConnection;
  states: Record<string, HassEntity>;
  language: string;
  locale: HassLocale;
  themes: { darkMode: boolean };
}

export interface HassConnection {
  subscribeEvents: (callback: (event: HassEvent) => void, eventType?: string) => Promise<() => void>;
  subscribeMessage: <T>(callback: (msg: T) => void, msg: Record<string, unknown>) => Promise<() => void>;
}

export interface HassEvent {
  event_type: string;
  data: Record<string, unknown>;
  time_fired: string;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HassLocale {
  language: string;
  number_format: string;
  time_format: string;
}

export interface ServiceTarget {
  entity_id?: string | string[];
  device_id?: string | string[];
  area_id?: string | string[];
}

export interface TimeRange {
  start: Date;
  end: Date;
}
