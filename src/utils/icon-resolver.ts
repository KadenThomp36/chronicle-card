import { CATEGORY_ICONS, CATEGORY_COLORS } from '../constants';

/**
 * Keyword → icon mapping for fuzzy matching against event titles, categories, and labels.
 * More specific entries first — "cat" before "animal" so "cat" wins when both match.
 */
const KEYWORD_ICONS: Array<[string[], string]> = [
  // Specific animals
  [['cat', 'kitten', 'feline'], 'mdi:cat'],
  [['dog', 'puppy', 'canine'], 'mdi:dog'],
  [['bird', 'robin', 'crow', 'pigeon', 'sparrow'], 'mdi:bird'],
  [['fish', 'aquarium'], 'mdi:fish'],
  [['rabbit', 'bunny'], 'mdi:rabbit'],
  [['horse', 'pony'], 'mdi:horse'],
  [['snake', 'reptile', 'lizard'], 'mdi:snake'],
  [['bear'], 'mdi:paw'],
  [['deer'], 'mdi:deer'],
  [['insect', 'bug', 'spider', 'bee', 'wasp'], 'mdi:bee'],

  // General animals
  [['animal', 'pet', 'wildlife'], 'mdi:paw'],

  // People
  [['person', 'human', 'people', 'visitor', 'guest', 'face'], 'mdi:walk'],
  [['baby', 'infant', 'child', 'kid'], 'mdi:baby-face-outline'],
  [['meeting', 'appointment', 'interview'], 'mdi:account-group'],

  // Vehicles
  [['car', 'automobile', 'sedan'], 'mdi:car'],
  [['truck', 'lorry'], 'mdi:truck'],
  [['motorcycle', 'motorbike', 'bike', 'bicycle'], 'mdi:bike'],
  [['bus', 'transit'], 'mdi:bus'],
  [['boat', 'ship'], 'mdi:sail-boat'],
  [['airplane', 'plane', 'flight'], 'mdi:airplane'],
  [['vehicle', 'transport'], 'mdi:car'],

  // Delivery / packages
  [['package', 'parcel', 'delivery', 'mail', 'post', 'courier'], 'mdi:package-variant-closed'],
  [['amazon'], 'mdi:package-variant-closed'],

  // Security
  [['alarm', 'alert', 'intrusion', 'break-in', 'breach'], 'mdi:alarm-light'],
  [['security', 'surveillance', 'guard'], 'mdi:shield-home'],
  [['smoke', 'fire', 'flame'], 'mdi:fire'],
  [['flood', 'water leak', 'leak'], 'mdi:water-alert'],
  [['co2', 'carbon monoxide', 'gas'], 'mdi:molecule-co2'],

  // Doors / access
  [['doorbell', 'ring', 'knock'], 'mdi:doorbell'],
  [['door', 'gate', 'entry', 'entrance', 'exit'], 'mdi:door'],
  [['lock', 'unlock', 'locked', 'unlocked'], 'mdi:lock'],
  [['window'], 'mdi:window-closed-variant'],
  [['garage'], 'mdi:garage'],

  // Motion
  [['motion', 'movement', 'activity', 'detected'], 'mdi:motion-sensor'],

  // Camera
  [['camera', 'cctv', 'snapshot', 'recording', 'footage', 'clip'], 'mdi:cctv'],

  // Lighting
  [['light', 'lamp', 'bulb', 'lighting', 'illumin'], 'mdi:lightbulb'],

  // Climate / weather
  [['temperature', 'temp', 'thermostat', 'hvac', 'heat', 'cool'], 'mdi:thermostat'],
  [['weather', 'rain', 'snow', 'storm', 'wind', 'sunny', 'cloud'], 'mdi:weather-partly-cloudy'],
  [['humidity', 'moisture'], 'mdi:water-percent'],

  // Home appliances
  [['vacuum', 'roomba', 'clean'], 'mdi:robot-vacuum'],
  [['washer', 'laundry', 'wash'], 'mdi:washing-machine'],
  [['dryer'], 'mdi:tumble-dryer'],
  [['dishwasher', 'dishes'], 'mdi:dishwasher'],
  [['oven', 'stove', 'cook', 'bake'], 'mdi:stove'],
  [['fridge', 'refrigerator', 'freezer'], 'mdi:fridge'],
  [['microwave'], 'mdi:microwave'],
  [['coffee', 'espresso'], 'mdi:coffee'],

  // Media / entertainment
  [['music', 'song', 'audio', 'speaker', 'playing'], 'mdi:music'],
  [['tv', 'television', 'movie', 'video', 'stream', 'netflix', 'plex'], 'mdi:television'],
  [['gaming', 'game', 'playstation', 'xbox', 'nintendo'], 'mdi:gamepad-variant'],

  // 3D printing
  [['3d print', 'printer', 'bambu', 'print job', 'filament'], 'mdi:printer-3d-nozzle'],

  // Health / fitness
  [['health', 'heart', 'blood', 'medical', 'medicine'], 'mdi:heart-pulse'],
  [['sleep', 'bedtime', 'nap'], 'mdi:sleep'],
  [['workout', 'exercise', 'fitness', 'run', 'walk', 'step'], 'mdi:run'],

  // Calendar / time
  [['birthday', 'anniversary'], 'mdi:cake-variant'],
  [['holiday', 'vacation', 'day off'], 'mdi:beach'],
  [['reminder', 'todo', 'task'], 'mdi:bell-ring'],
  [['calendar', 'event', 'schedule'], 'mdi:calendar'],

  // System / tech
  [['update', 'upgrade', 'firmware'], 'mdi:update'],
  [['restart', 'reboot', 'reset'], 'mdi:restart'],
  [['backup', 'snapshot'], 'mdi:backup-restore'],
  [['error', 'fail', 'crash'], 'mdi:alert-circle'],
  [['automation', 'script', 'routine', 'workflow'], 'mdi:robot'],
  [['battery', 'charge', 'power'], 'mdi:battery'],
  [['wifi', 'network', 'internet', 'connect'], 'mdi:wifi'],
  [['bluetooth'], 'mdi:bluetooth'],
  [['system', 'server', 'maintenance'], 'mdi:cog'],

  // Energy / utility
  [['solar', 'panel'], 'mdi:solar-power'],
  [['energy', 'electricity', 'power', 'watt', 'kwh'], 'mdi:flash'],
  [['water', 'irrigation', 'sprinkler'], 'mdi:water'],
  [['gas', 'natural gas', 'propane'], 'mdi:gas-cylinder'],

  // Misc
  [['trash', 'garbage', 'waste', 'bin', 'recycl'], 'mdi:trash-can'],
  [['litter', 'litter box', 'kitty litter'], 'mdi:cat'],
  [['food', 'feed', 'meal', 'eat', 'dinner', 'lunch', 'breakfast'], 'mdi:food'],
  [['plant', 'garden', 'flower', 'grow'], 'mdi:flower'],
  [['filter', 'air filter', 'hvac filter'], 'mdi:air-filter'],
];

/**
 * Same structure but for colors — matches keywords to hex colors.
 */
const KEYWORD_COLORS: Array<[string[], string]> = [
  [['cat', 'kitten', 'feline'], '#7f41eb'],
  [['dog', 'puppy', 'canine'], '#8D6E63'],
  [['bird'], '#4CAF50'],
  [['animal', 'pet', 'wildlife'], '#43A047'],
  [['person', 'human', 'people', 'visitor', 'guest', 'face'], '#FF9800'],
  [['car', 'truck', 'vehicle', 'automobile', 'motorcycle'], '#2196F3'],
  [['package', 'delivery', 'mail', 'amazon'], '#795548'],
  [['alarm', 'alert', 'security', 'smoke', 'fire', 'intrusion'], '#F44336'],
  [['door', 'gate', 'lock', 'window', 'garage'], '#795548'],
  [['doorbell', 'ring', 'knock'], '#FF5722'],
  [['motion', 'movement', 'detected'], '#9C27B0'],
  [['camera', 'cctv', 'snapshot'], '#FF5722'],
  [['light', 'lamp', 'bulb'], '#FFC107'],
  [['temperature', 'thermostat', 'hvac', 'climate'], '#00BCD4'],
  [['weather'], '#42A5F5'],
  [['automation', 'script', 'routine'], '#3F51B5'],
  [['error', 'fail', 'crash'], '#D32F2F'],
  [['system', 'update', 'restart', 'maintenance'], '#9E9E9E'],
  [['trash', 'garbage', 'waste'], '#78909C'],
  [['plant', 'garden', 'flower'], '#4CAF50'],
  [['3d print', 'printer', 'bambu'], '#00ACC1'],
];

function matchKeywords(text: string, table: Array<[string[], string]>): string | undefined {
  const lower = text.toLowerCase();
  for (const [keywords, value] of table) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return value;
    }
  }
  return undefined;
}

/**
 * Infer an icon from event text (title, category, label combined).
 * Returns undefined if no keyword matches, so the caller can fall back to defaults.
 */
export function inferIcon(title: string, category?: string, label?: string): string | undefined {
  // Build a search string from all available text fields
  const text = [title, category, label].filter(Boolean).join(' ');
  return matchKeywords(text, KEYWORD_ICONS);
}

/**
 * Infer a color from event text (title, category, label combined).
 * Returns undefined if no keyword matches.
 */
export function inferColor(title: string, category?: string, label?: string): string | undefined {
  const text = [title, category, label].filter(Boolean).join(' ');
  return matchKeywords(text, KEYWORD_COLORS);
}

/**
 * Full icon resolution chain:
 * 1. icon_map pattern matching (user-configured)
 * 2. Fuzzy keyword inference from title/category/label
 * 3. default_icon from source config
 * 4. CATEGORY_ICONS exact match on category
 * 5. CATEGORY_ICONS.default
 */
export function resolveIcon(
  title: string,
  category: string,
  label: string | undefined,
  iconMap?: Record<string, string>,
  defaultIcon?: string,
): string {
  // 1. User-specified icon_map (pattern match against title + category + label)
  if (iconMap) {
    const searchText = [title, category, label].filter(Boolean).join(' ').toLowerCase();
    for (const [pattern, icon] of Object.entries(iconMap)) {
      if (searchText.includes(pattern.toLowerCase())) {
        return icon;
      }
    }
  }

  // 2. Fuzzy keyword inference (gives per-event icons like cat/person/vehicle)
  const inferred = inferIcon(title, category, label);
  if (inferred) return inferred;

  // 3. Source default icon (fallback when no keyword matches)
  if (defaultIcon) return defaultIcon;

  // 4. Exact category match
  if (CATEGORY_ICONS[category]) return CATEGORY_ICONS[category];

  // 5. Fallback
  return CATEGORY_ICONS.default;
}

/**
 * Full color resolution chain (mirrors icon resolution).
 */
export function resolveColor(
  title: string,
  category: string,
  label: string | undefined,
  colorMap?: Record<string, string>,
  defaultColor?: string,
): string {
  if (colorMap) {
    const searchText = [title, category, label].filter(Boolean).join(' ').toLowerCase();
    for (const [pattern, color] of Object.entries(colorMap)) {
      if (searchText.includes(pattern.toLowerCase())) {
        return color;
      }
    }
  }

  if (defaultColor) return defaultColor;

  const inferred = inferColor(title, category, label);
  if (inferred) return inferred;
  if (CATEGORY_COLORS[category]) return CATEGORY_COLORS[category];
  return CATEGORY_COLORS.default;
}
