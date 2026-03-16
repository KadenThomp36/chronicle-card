import { SeverityLevel } from './models/event';

export const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  critical: '#D32F2F',
  warning: '#FF9800',
  info: '#2196F3',
  debug: '#9E9E9E',
};

export const SEVERITY_ICONS: Record<SeverityLevel, string> = {
  critical: 'mdi:alert-circle',
  warning: 'mdi:alert',
  info: 'mdi:information',
  debug: 'mdi:bug',
};

export const CATEGORY_ICONS: Record<string, string> = {
  person: 'mdi:walk',
  vehicle: 'mdi:car',
  animal: 'mdi:paw',
  pet: 'mdi:paw',
  security: 'mdi:shield-home',
  motion: 'mdi:motion-sensor',
  door: 'mdi:door',
  lock: 'mdi:lock',
  camera: 'mdi:cctv',
  light: 'mdi:lightbulb',
  climate: 'mdi:thermostat',
  automation: 'mdi:robot',
  system: 'mdi:cog',
  default: 'mdi:calendar-clock',
};

export const CATEGORY_COLORS: Record<string, string> = {
  person: '#FF9800',
  vehicle: '#2196F3',
  animal: '#43A047',
  pet: '#43A047',
  security: '#F44336',
  motion: '#9C27B0',
  door: '#795548',
  lock: '#607D8B',
  camera: '#FF5722',
  light: '#FFC107',
  climate: '#00BCD4',
  automation: '#3F51B5',
  system: '#9E9E9E',
  default: '#78909C',
};

export const CARD_VERSION = '1.9.2-rc.1';
export const CARD_NAME = 'chronicle-card';
export const EDITOR_NAME = 'chronicle-card-editor';

export const DEFAULT_POLL_INTERVAL = 30;
export const MEDIA_CACHE_TTL = 3 * 60 * 60 * 1000; // 3 hours
export const VIRTUAL_SCROLL_BUFFER = 5;
export const VIRTUAL_SCROLL_ITEM_HEIGHT = 72;
export const VIRTUAL_SCROLL_ITEM_HEIGHT_COMPACT = 48;
