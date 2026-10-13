import { ChronicleAction, SeverityLevel } from './event';

/**
 * Tap/hold action — HA's native action schema, handed to the frontend via the
 * `hass-action` event, so every native action type (perform-action, url,
 * toggle, assist, confirmation, …) works. `default` is Chronicle's own: open
 * the detail dialog. String fields support `{field}` event placeholders.
 */
export interface ActionConfig {
  action:
    | 'default'
    | 'more-info'
    | 'toggle'
    | 'navigate'
    | 'url'
    | 'perform-action'
    | 'call-service'
    | 'assist'
    | 'fire-dom-event'
    | 'none';
  navigation_path?: string;
  url_path?: string;
  perform_action?: string;
  data?: Record<string, unknown>;
  target?: { entity_id?: string | string[]; device_id?: string | string[]; area_id?: string | string[] };
  /** Pre-2024.8 names — still accepted by HA. */
  service?: string;
  service_data?: Record<string, unknown>;
  [key: string]: unknown;
}

/** Per-entity overrides within a history source. */
export interface EntityOverrides {
  name?: string;
  state_filter?: string[];
  state_map?: Record<string, string>;
  state_color?: Record<string, string>;
  state_icon?: Record<string, string>;
  /** Attribute names whose values are appended to the event description. */
  show_attributes?: string[];
  icon?: string;
  color?: string;
  severity?: SeverityLevel;
  image_template?: string;
  clip_template?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface SourceConfig {
  type: 'calendar' | 'rest' | 'history' | 'static' | 'logbook';
  name?: string;
  entity?: string;
  entities?: string[];
  entity_config?: Record<string, EntityOverrides>;
  url?: string;
  response_path?: string;
  field_map?: Record<string, string>;
  media_url_template?: string;
  /**
   * Optional template for a video clip URL (e.g. Frigate clip.mp4), expanded
   * with the same `{field}` placeholders as media_url_template. When set, the
   * detail dialog plays the clip instead of showing the still/gif thumbnail.
   */
  clip_url_template?: string;
  ws_params?: Record<string, unknown>;
  poll_interval?: number;
  default_icon?: string;
  default_color?: string;
  default_severity?: SeverityLevel;
  icon_map?: Record<string, string>;
  color_map?: Record<string, string>;
  /** Buttons rendered under each event. */
  actions?: ChronicleAction[];
  state_map?: Record<string, string>;
  state_color?: Record<string, string>;
  state_icon?: Record<string, string>;
  show_attributes?: string[];
  state_filter?: string[];
  /** Jinja2 (or a plain URL/path) resolved to the event's image. */
  image_template?: string;
  /** Jinja2 (or a plain URL/path) resolved to a video clip for the detail dialog. */
  clip_template?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  /**
   * Optional per-source grouping override. Merged on top of the card-level
   * `grouping` config. When set, events from this source are grouped in
   * isolation rather than mixing with events from other sources.
   */
  grouping?: GroupingConfig;
  events?: Array<{
    title: string;
    description?: string;
    start: string;
    end?: string;
    icon?: string;
    color?: string;
    severity?: SeverityLevel;
    category?: string;
  }>;
}

export interface FilterConfig {
  categories?: string[];
  severities?: SeverityLevel[];
  sources?: string[];
  entities?: string[];
  search?: string;
  exclude_categories?: string[];
  exclude_severities?: SeverityLevel[];
  exclude_sources?: string[];
  exclude_entities?: string[];
  exclude_search?: string;
}

export interface GroupingConfig {
  enabled?: boolean;
  window_seconds?: number;
  min_group_size?: number;
  group_by?: 'category' | 'source' | 'entity' | 'none';
  /**
   * Custom summary label for groups (overrides the auto-generated "N X events").
   * Supports placeholders: {count}, {label}, {source}, {entity}.
   */
  group_name?: string;
}

export interface AppearanceConfig {
  card_height?: string;
  compact?: boolean;
  show_images?: boolean;
  show_icons?: boolean;
  show_severity_badge?: boolean;
  show_category?: boolean;
  animate_new_events?: boolean;
  /** Secondary description line (e.g. "Off → On"). Unset = shown, except in compact mode. */
  show_description?: boolean;
  severity_colors?: Partial<Record<SeverityLevel, string>>;
}

export interface ChronicleCardConfig {
  type: string;
  title?: string;
  layout?: 'vertical' | 'horizontal';
  show_layout_toggle?: boolean;
  max_events?: number;
  /** Whole numbers count calendar days (0 = today since midnight); fractions are a rolling window. */
  days_back?: number;
  /** Look ahead (calendar/static sources), same day semantics as days_back. */
  days_forward?: number;
  /** Unset = follow the user's Home Assistant profile setting. */
  time_format?: '12h' | '24h';
  language?: string;
  show_header?: boolean;
  sources: SourceConfig[];
  filters?: FilterConfig;
  grouping?: GroupingConfig;
  appearance?: AppearanceConfig;
  /** Sections-view sizing written by HA's layout editor. */
  grid_options?: { rows?: number | 'auto'; columns?: number | 'full' };
}

export const DEFAULT_CONFIG: Partial<ChronicleCardConfig> = {
  layout: 'vertical',
  show_layout_toggle: true,
  max_events: 50,
  days_back: 7,
  days_forward: 0,
  show_header: true,
  filters: {
    categories: [],
    severities: [],
    sources: [],
    entities: [],
    search: '',
    exclude_categories: [],
    exclude_severities: [],
    exclude_sources: [],
    exclude_entities: [],
    exclude_search: '',
  },
  grouping: {
    enabled: true,
    window_seconds: 120,
    min_group_size: 3,
    group_by: 'category',
  },
  appearance: {
    card_height: '400px',
    compact: false,
    show_images: true,
    show_icons: true,
    show_severity_badge: true,
    show_category: true,
    animate_new_events: true,
    severity_colors: {
      critical: '#D32F2F',
      warning: '#FF9800',
      info: '#2196F3',
      debug: '#9E9E9E',
    },
  },
};
