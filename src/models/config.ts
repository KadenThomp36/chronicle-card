import { SeverityLevel } from './event';

/** HA-standard action configuration for tap/hold on timeline events. */
export interface ActionConfig {
  action: 'more-info' | 'navigate' | 'call-service' | 'none' | 'default';
  navigation_path?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: { entity_id?: string | string[]; device_id?: string | string[]; area_id?: string | string[] };
}

/** Per-entity overrides within a history source. */
export interface EntityOverrides {
  name?: string;
  state_filter?: string[];
  state_map?: Record<string, string>;
  icon?: string;
  color?: string;
  severity?: SeverityLevel;
  image_template?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
}

export interface SourceConfig {
  type: 'calendar' | 'rest' | 'history' | 'static';
  name?: string;
  entity?: string;
  entities?: string[];
  entity_config?: Record<string, EntityOverrides>;
  url?: string;
  response_path?: string;
  field_map?: Record<string, string>;
  media_url_template?: string;
  ws_params?: Record<string, unknown>;
  poll_interval?: number;
  default_icon?: string;
  default_color?: string;
  default_severity?: SeverityLevel;
  icon_map?: Record<string, string>;
  color_map?: Record<string, string>;
  actions?: Array<{
    label: string;
    icon?: string;
    type: 'service' | 'navigate' | 'fire-event';
    service?: string;
    serviceData?: Record<string, unknown>;
    target?: { entity_id?: string };
    url?: string;
    eventType?: string;
    eventData?: Record<string, unknown>;
  }>;
  state_map?: Record<string, string>;
  state_filter?: string[];
  image_template?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
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
}

export interface AppearanceConfig {
  card_height?: string;
  compact?: boolean;
  show_images?: boolean;
  show_icons?: boolean;
  show_severity_badge?: boolean;
  show_source_badge?: boolean;
  show_category?: boolean;
  animate_new_events?: boolean;
  severity_colors?: Partial<Record<SeverityLevel, string>>;
}

export interface ChronicleCardConfig {
  type: string;
  title?: string;
  layout?: 'vertical' | 'horizontal';
  show_layout_toggle?: boolean;
  max_events?: number;
  days_back?: number;
  time_format?: '12h' | '24h';
  language?: string;
  show_header?: boolean;
  sources: SourceConfig[];
  filters?: FilterConfig;
  grouping?: GroupingConfig;
  appearance?: AppearanceConfig;
}

export const DEFAULT_CONFIG: Partial<ChronicleCardConfig> = {
  layout: 'vertical',
  show_layout_toggle: true,
  max_events: 50,
  days_back: 7,
  time_format: '24h',
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
    show_source_badge: false,
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
