export interface HomeAssistant {
  callApi: <T>(method: string, path: string, data?: Record<string, unknown>) => Promise<T>;
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
  callService: (domain: string, service: string, data?: Record<string, unknown>, target?: ServiceTarget) => Promise<void>;
  connection: HassConnection;
  states: Record<string, HassEntity>;
  language: string;
  locale: HassLocale;
  config: { time_zone: string };
  themes: { darkMode: boolean };
  localize: (key: string, ...args: unknown[]) => string;
  /** Native state formatting (HA 2023.9+) — device-class aware and localized. */
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  formatEntityAttributeName?: (stateObj: HassEntity, attribute: string) => string;
  formatEntityAttributeValue?: (stateObj: HassEntity, attribute: string, value?: unknown) => string;
}

export interface HassConnection {
  subscribeMessage: <T>(callback: (msg: T) => void, msg: Record<string, unknown>) => Promise<() => void>;
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
  /** "language" | "system" | "12" | "24" */
  time_format: string;
  /** "local" | "server" */
  time_zone?: string;
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
