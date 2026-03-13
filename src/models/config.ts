import { SeverityLevel } from './event';

export interface SourceConfig {
  type: 'calendar' | 'rest' | 'history' | 'static';
  name?: string;
  entity?: string;
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
    animate_new_events: true,
    severity_colors: {
      critical: '#D32F2F',
      warning: '#FF9800',
      info: '#2196F3',
      debug: '#9E9E9E',
    },
  },
};
