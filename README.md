# Chronicle Card

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-support-yellow?style=flat&logo=buy-me-a-coffee)](https://buymeacoffee.com/kadenthomp36)
[![HACS][hacs-badge]][hacs-url]
[![GitHub Release][release-badge]][release-url]
[![License][license-badge]][license-url]

A universal, extensible timeline card for [Home Assistant](https://www.home-assistant.io/). Display events from **any source** — calendar entities, REST APIs, Frigate, entity state history, or manually defined events — in a single, interactive timeline.

![Chronicle Card Preview](https://raw.githubusercontent.com/KadenThomp36/chronicle-card/main/images/preview.png)

---

## Features

- **4 built-in source adapters** — Calendar entities, REST/WebSocket APIs, entity state history, static YAML events
- **Vertical & horizontal layouts** — Toggle between a scrollable timeline and a horizontal card ribbon
- **Automatic icon & color inference** — 150+ keyword rules match event titles to MDI icons and colors, no config needed
- **Event grouping** — Clusters rapid events (e.g. 5 motion detections in 2 minutes) into expandable groups
- **Thumbnail support** — Displays event images from cameras, Frigate snapshots, or any URL
- **Severity system** — Critical / Warning / Info / Debug badges with customizable colors
- **Action buttons** — Call services, navigate to URLs, or fire events from each timeline entry
- **Detail dialog** — Click any event for a rich popup with full description, image, metadata, and actions
- **Visual config editor** — Full GUI editor in the HA dashboard editor, no YAML required
- **Localization** — English, German, French, Spanish, Italian, Portuguese, Dutch, Swedish
- **Performance** — Virtual scrolling, debounced fetching, media URL caching

---

## Installation

### HACS (Recommended)

> **Note:** HACS Default store listing is pending approval. For now, add as a custom repository. Once approved, a one-click install button will be available.

1. Open HACS in your Home Assistant instance
2. Go to the **three-dot menu** (top right) > **Custom repositories**
3. Enter `https://github.com/KadenThomp36/chronicle-card` and select **Dashboard** as the category
4. Click **Add**, then find **Chronicle Card** in the list and click **Download**
5. Go to **Settings → Dashboards → Resources**, click **Add**, and enter `/hacsfiles/chronicle-card/chronicle-card.js` as **JavaScript Module**
6. Restart Home Assistant

### Manual

1. Download `chronicle-card.js` from the [latest release][release-url]
2. Copy it to `/config/www/chronicle-card.js`
3. Add the resource in **Settings > Dashboards > Resources**:
   - URL: `/local/chronicle-card.js`
   - Type: JavaScript Module

---

## Quick Start

Add the card to any dashboard:

```yaml
type: custom:chronicle-card
title: Home Timeline
sources:
  - type: calendar
    entity: calendar.home_events
```

That's it. The card will fetch events from the calendar entity, automatically assign icons and colors based on event titles, and render them in a vertical timeline.

---

## Configuration

### Card Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | Must be `custom:chronicle-card` |
| `title` | string | `""` | Card title displayed in the header |
| `layout` | string | `vertical` | `vertical` or `horizontal` |
| `show_layout_toggle` | boolean | `true` | Show button to switch layouts |
| `max_events` | number | `50` | Maximum events to display |
| `days_back` | number | `7` | How many days of history to fetch |
| `time_format` | string | `24h` | `12h` or `24h` |
| `language` | string | *auto* | Override language (`en`, `de`, `fr`, `es`, `it`, `pt`, `nl`, `sv`) |
| `show_header` | boolean | `true` | Show the card header |
| `sources` | list | **Required** | Array of source configurations (see below) |
| `filters` | object | `{}` | Filter configuration |
| `grouping` | object | `{}` | Grouping configuration |
| `appearance` | object | `{}` | Appearance configuration |

### Sources

Each source defines where events come from. You can configure multiple sources and they all merge into a single timeline.

#### Calendar Source

Fetches events from any Home Assistant calendar entity.

```yaml
sources:
  - type: calendar
    entity: calendar.home_events
    name: Home Events              # Optional display name
    default_icon: mdi:calendar     # Fallback icon
    default_color: "#4CAF50"       # Fallback color
    default_severity: info         # Fallback severity
```

#### REST Source

Fetches events from any REST API or Home Assistant WebSocket command.

```yaml
sources:
  # External or internal REST API
  - type: rest
    url: /api/some_integration/events
    name: My Events
    response_path: data.events     # Dot-notation path to the events array
    field_map:                     # Map API fields to Chronicle fields
      id: uid
      title: name
      start: timestamp
      description: details
      mediaUrl: image_url
      category: type
    poll_interval: 60              # Seconds between fetches (default: 30)

  # Home Assistant WebSocket command
  - type: rest
    name: Frigate Events
    ws_params:
      type: frigate/events/get
      limit: 50
    field_map:
      id: id
      title: label
      start: start_time
      category: label
      entityId: camera
    media_url_template: /api/frigate/notifications/{id}/snapshot.jpg
```

#### History Source

Converts entity state changes into timeline events. The adapter reads each entity's `device_class` to generate human-readable titles and assign correct categories automatically.

For example, a `binary_sensor` with `device_class: door` produces **"Front Door Opened"** / **"Front Door Closed"** instead of raw on/off values. Supported device classes include door, motion, window, lock, smoke, moisture, occupancy, vibration, and many more.

```yaml
sources:
  - type: history
    entities:
      - binary_sensor.front_door
      - lock.front_door_lock
      - alarm_control_panel.home
    name: Security History
    default_severity: warning
```

You can override how state values are displayed using `state_map`:

```yaml
sources:
  - type: history
    entities:
      - binary_sensor.garage_tilt
    name: Garage
    state_map:
      "on": "Garage Opened"
      "off": "Garage Closed"
```

**Per-entity overrides** let you customize filtering, naming, and appearance for individual entities within a single source:

```yaml
sources:
  - type: history
    name: Doors & Locks
    entities:
      - binary_sensor.front_door
      - lock.front_door_lock
    entity_config:
      binary_sensor.front_door:
        name: Front Entry
        state_filter:
          - "on"
      lock.front_door_lock:
        state_filter:
          - locked
          - unlocked
        state_map:
          locked: "Secured"
          unlocked: "Opened"
        severity: warning
        icon: mdi:lock-alert
```

Per-entity settings override source-level defaults, which override auto-detected device class defaults. Entities without `entity_config` use smart defaults automatically.

**Dynamic image thumbnails** — Use Jinja2 templates to generate per-event thumbnail URLs:

```yaml
sources:
  - type: history
    entities:
      - binary_sensor.front_door
    name: Door Activity
    image_template: >-
      /local/cameras/front_door/{{ timestamp | replace(':', '-') }}.jpg
```

Template variables: `entity_id`, `state`, `old_state`, `timestamp`, `attributes`, `source_name`. Templates are batch-rendered in a single WebSocket call for performance.

**Tap & hold actions** — Attach HA's standard action system to timeline events:

```yaml
sources:
  - type: history
    entities:
      - binary_sensor.front_door
    name: Front Door
    tap_action:
      action: more-info        # Opens HA's native entity dialog
    hold_action:
      action: navigate
      navigation_path: /lovelace/cameras
    entity_config:
      binary_sensor.front_door:
        tap_action:
          action: call-service
          service: camera.snapshot
          service_data:
            filename: /config/www/snapshot.jpg
```

Action types: `more-info`, `navigate`, `call-service`, `none`. Default tap (no config) opens the detail dialog.

Built-in device class translations:

| Device Class | `on` | `off` |
|-------------|------|-------|
| door / opening / window | Opened | Closed |
| motion | Motion Detected | Motion Cleared |
| lock | Unlocked | Locked |
| smoke | Smoke Detected | Clear |
| moisture | Wet | Dry |
| occupancy | Occupied | Unoccupied |
| presence | Present | Away |
| vibration | Vibration | Still |
| connectivity | Connected | Disconnected |
| battery | Low | Normal |

Non-binary entities (locks, covers, alarms, climate, etc.) also get human-readable labels automatically.

#### Static Source

Define events directly in YAML. Useful for scheduled reminders or manual entries.

```yaml
sources:
  - type: static
    name: Reminders
    events:
      - title: Change HVAC Filter
        start: "2025-04-01T10:00:00"
        icon: mdi:air-filter
        color: "#FF9800"
        severity: info
        category: maintenance
      - title: Smoke Detector Battery Check
        start: "2025-04-15T09:00:00"
        icon: mdi:smoke-detector
        severity: warning
```

### Source Options (All Types)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `type` | string | **Required** | `calendar`, `rest`, `history`, or `static` |
| `name` | string | `""` | Display name for the source |
| `default_icon` | string | *auto* | Fallback MDI icon (e.g. `mdi:calendar`) |
| `default_color` | string | *auto* | Fallback hex color (e.g. `#4CAF50`) |
| `default_severity` | string | `info` | `critical`, `warning`, `info`, or `debug` |
| `icon_map` | object | `{}` | Keyword-to-icon mapping (see [Icon Resolution](#icon--color-resolution)) |
| `color_map` | object | `{}` | Keyword-to-color mapping |
| `actions` | list | `[]` | Action buttons shown on each event (see [Actions](#actions)) |

### Source Options (Calendar)

| Option | Type | Description |
|--------|------|-------------|
| `entity` | string | Calendar entity ID (e.g. `calendar.home_events`) |

### Source Options (REST)

| Option | Type | Description |
|--------|------|-------------|
| `url` | string | REST API URL. Internal paths use `hass.callApi`, full URLs use `fetch` |
| `ws_params` | object | WebSocket message params (alternative to `url`). E.g. `{ type: "frigate/events/get" }` |
| `response_path` | string | Dot-notation path to the events array in the response (e.g. `data.events`) |
| `field_map` | object | Map response fields to Chronicle fields. Keys are Chronicle field names, values are source field names |
| `media_url_template` | string | URL template with `{field}` placeholders (e.g. `/api/frigate/notifications/{id}/snapshot.jpg`) |
| `poll_interval` | number | Seconds between fetches (default: 30) |

**Field map keys:** `id`, `title`, `description`, `start`, `end`, `mediaUrl`, `mediaContentId`, `icon`, `color`, `category`, `label`, `severity`, `entityId`, `entityName`

### Source Options (History)

| Option | Type | Description |
|--------|------|-------------|
| `entities` | list | Entity IDs to track state changes for (recommended) |
| `entity` | string | Single entity ID (shorthand — use `entities` for multiple) |
| `state_filter` | list | Source-level default: only log events when the new state matches one of these values |
| `state_map` | object | Source-level default: override state labels (e.g. `{"on": "Opened", "off": "Closed"}`) |
| `entity_config` | object | Per-entity overrides, keyed by entity ID. See table below |
| `image_template` | string | Jinja2 template rendered per event to produce a thumbnail URL. Variables: `entity_id`, `state`, `old_state`, `timestamp`, `attributes`, `source_name` |
| `tap_action` | object | Action on tap: `{ action: "more-info" \| "navigate" \| "call-service" \| "none" }` |
| `hold_action` | object | Action on hold (500ms): same format as `tap_action` |

**Per-Entity Config** (`entity_config.<entity_id>`):

| Option | Type | Description |
|--------|------|-------------|
| `name` | string | Custom display name (overrides friendly name) |
| `state_filter` | list | Only log events matching these states (overrides source-level) |
| `state_map` | object | Override state labels for this entity (overrides source-level) |
| `icon` | string | MDI icon override for this entity |
| `color` | string | Hex color override for this entity |
| `severity` | string | Severity override (`critical`, `warning`, `info`, `debug`) |
| `image_template` | string | Per-entity image template override |
| `tap_action` | object | Per-entity tap action override |
| `hold_action` | object | Per-entity hold action override |

### Source Options (Static)

| Option | Type | Description |
|--------|------|-------------|
| `events` | list | Array of event objects with `title`, `start`, and optional `description`, `end`, `icon`, `color`, `severity`, `category` |

### Filters

Narrow down which events are displayed.

```yaml
filters:
  categories:
    - person
    - vehicle
  severities:
    - critical
    - warning
  sources:
    - Frigate Events
  entities:
    - binary_sensor.front_door
  search: "front door"
```

| Option | Type | Description |
|--------|------|-------------|
| `categories` | list | Show only these categories. Empty = show all |
| `severities` | list | Show only these severity levels. Empty = show all |
| `sources` | list | Show only events from these source names. Empty = show all |
| `entities` | list | Show only events from these entity IDs. Empty = show all |
| `search` | string | Full-text search filter |

### Grouping

Cluster rapid events together into expandable groups.

```yaml
grouping:
  enabled: true
  window_seconds: 120
  min_group_size: 3
  group_by: category
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `enabled` | boolean | `true` | Enable/disable event grouping |
| `window_seconds` | number | `120` | Time window in seconds. Events within this window may be grouped |
| `min_group_size` | number | `3` | Minimum events to form a group |
| `group_by` | string | `category` | `category`, `source`, `entity`, or `none` |

### Appearance

```yaml
appearance:
  card_height: 400px
  compact: false
  show_images: true
  show_icons: true
  show_severity_badge: true
  show_source_badge: false
  animate_new_events: true
  severity_colors:
    critical: "#D32F2F"
    warning: "#FF9800"
    info: "#2196F3"
    debug: "#9E9E9E"
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `card_height` | string | `400px` | Fixed height with scroll, or `auto` for no limit |
| `compact` | boolean | `false` | Reduced padding and hidden descriptions |
| `show_images` | boolean | `true` | Show event thumbnails |
| `show_icons` | boolean | `true` | Show category icons |
| `show_severity_badge` | boolean | `true` | Show severity level badges |
| `show_source_badge` | boolean | `false` | Show source name badges |
| `animate_new_events` | boolean | `true` | Slide-in animation for new events |
| `severity_colors` | object | *(see above)* | Override colors per severity level |

### Actions

Add interactive buttons to events that call services, navigate, or fire events.

```yaml
sources:
  - type: calendar
    entity: calendar.cameras
    actions:
      - label: View Camera
        icon: mdi:cctv
        type: navigate
        url: /lovelace/cameras

      - label: Dismiss
        icon: mdi:close
        type: service
        service: input_boolean.turn_off
        target:
          entity_id: input_boolean.alert_active

      - label: Trigger Alarm
        icon: mdi:alarm-light
        type: fire-event
        eventType: custom_alarm
        eventData:
          zone: front_yard
```

| Option | Type | Description |
|--------|------|-------------|
| `label` | string | Button text |
| `icon` | string | Optional MDI icon |
| `type` | string | `service`, `navigate`, or `fire-event` |
| `service` | string | HA service to call (for `service` type) |
| `serviceData` | object | Service call data |
| `target` | object | Service call target (e.g. `{ entity_id: "light.kitchen" }`) |
| `url` | string | URL to navigate to (for `navigate` type) |
| `eventType` | string | Custom event type (for `fire-event` type) |
| `eventData` | object | Custom event data |

---

## Icon & Color Resolution

Chronicle automatically assigns icons and colors to events using a multi-level resolution chain:

1. **`icon_map` / `color_map`** — Your custom keyword-to-icon/color mappings
2. **Fuzzy keyword inference** — 150+ built-in rules match event titles, categories, and labels
3. **`default_icon` / `default_color`** — Per-source fallback
4. **Category defaults** — Built-in category-to-icon/color map
5. **Global fallback** — `mdi:calendar-clock` / `#78909C`

The fuzzy matching is case-insensitive and checks the combined text of title + category + label. Examples:

| Keywords in event title | Icon | Color |
|------------------------|------|-------|
| cat, kitten, feline | `mdi:cat` | `#7f41eb` |
| dog, puppy, canine | `mdi:dog` | `#8D6E63` |
| person, visitor, guest | `mdi:walk` | `#FF9800` |
| car, truck, vehicle | `mdi:car` | `#2196F3` |
| package, delivery, mail | `mdi:package-variant-closed` | `#795548` |
| alarm, alert, security | `mdi:alarm-light` | `#F44336` |
| door, gate, entry | `mdi:door` | `#795548` |
| motion, movement | `mdi:motion-sensor` | `#9C27B0` |
| camera, cctv | `mdi:cctv` | `#FF5722` |
| light, lamp, bulb | `mdi:lightbulb` | `#FFC107` |
| temperature, thermostat | `mdi:thermostat` | `#00BCD4` |
| 3d print, bambu | `mdi:printer-3d-nozzle` | `#00ACC1` |

To override, use `icon_map` and `color_map` on a source:

```yaml
sources:
  - type: rest
    url: /api/my/events
    icon_map:
      garage: mdi:garage
      backyard: mdi:tree
    color_map:
      garage: "#795548"
      backyard: "#4CAF50"
```

---

## Examples

### Frigate Camera Events

```yaml
type: custom:chronicle-card
title: Camera Timeline
sources:
  - type: rest
    name: Frigate
    ws_params:
      type: frigate/events/get
      limit: 50
    field_map:
      id: id
      title: label
      start: start_time
      end: end_time
      category: label
      entityId: camera
    media_url_template: /api/frigate/notifications/{id}/snapshot.jpg
    default_severity: info
    actions:
      - label: View Clip
        icon: mdi:filmstrip
        type: navigate
        url: /media-browser/frigate
appearance:
  card_height: 500px
grouping:
  window_seconds: 60
  min_group_size: 2
  group_by: category
```

### Multi-Source Home Timeline

```yaml
type: custom:chronicle-card
title: Home Timeline
layout: vertical
show_layout_toggle: true
days_back: 3
max_events: 100
time_format: 12h
sources:
  - type: calendar
    entity: calendar.family
    name: Family Calendar
    default_icon: mdi:calendar
    default_color: "#4CAF50"

  - type: rest
    name: Frigate
    ws_params:
      type: frigate/events/get
      limit: 30
    field_map:
      id: id
      title: label
      start: start_time
      category: label
      entityId: camera
    media_url_template: /api/frigate/notifications/{id}/snapshot.jpg

  - type: history
    entities:
      - binary_sensor.front_door
      - binary_sensor.back_door
      - lock.front_door_lock
    name: Door Activity
    default_icon: mdi:door
    default_color: "#795548"
    default_severity: warning

  - type: static
    name: Maintenance
    events:
      - title: Change HVAC Filter
        start: "2025-04-01T10:00:00"
        icon: mdi:air-filter
        severity: info
grouping:
  enabled: true
  window_seconds: 120
  group_by: category
appearance:
  card_height: 500px
  show_images: true
  animate_new_events: true
```

### Compact Security Log

```yaml
type: custom:chronicle-card
title: Security Log
sources:
  - type: history
    entities:
      - alarm_control_panel.home
      - binary_sensor.front_door
      - binary_sensor.garage_door
      - lock.front_door_lock
    name: Security
    default_severity: warning
filters:
  severities:
    - critical
    - warning
appearance:
  compact: true
  card_height: 300px
  show_images: false
```

### Horizontal Camera Ribbon

```yaml
type: custom:chronicle-card
layout: horizontal
show_header: false
sources:
  - type: rest
    name: Cameras
    ws_params:
      type: frigate/events/get
      limit: 20
    field_map:
      id: id
      title: label
      start: start_time
      category: label
    media_url_template: /api/frigate/notifications/{id}/snapshot.jpg
appearance:
  show_severity_badge: false
```

---

## Adding Events from Automations

The simplest way to push events into Chronicle from automations is through a **calendar entity**. Home Assistant's `calendar.create_event` service writes to any local calendar, and the Chronicle calendar adapter picks them up automatically.

```yaml
# Example automation that logs events to the timeline
automation:
  - alias: Log Front Door Activity
    trigger:
      - platform: state
        entity_id: binary_sensor.front_door
        to: "on"
    action:
      - service: calendar.create_event
        target:
          entity_id: calendar.home_timeline
        data:
          summary: "Front door opened"
          description: "Door sensor triggered"
          start_date_time: "{{ now().isoformat() }}"
          end_date_time: "{{ (now() + timedelta(minutes=1)).isoformat() }}"
```

A ready-to-use blueprint is included in this repository. See [blueprints/chronicle_log_event.yaml](blueprints/chronicle_log_event.yaml).

---

## Supported Languages

| Code | Language |
|------|----------|
| `en` | English |
| `de` | German |
| `fr` | French |
| `es` | Spanish |
| `it` | Italian |
| `pt` | Portuguese |
| `nl` | Dutch |
| `sv` | Swedish |

Language is auto-detected from your Home Assistant locale. Override with the `language` option.

---

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run watch
```

Output is written to `dist/chronicle-card.js`.

---

## License

MIT License. See [LICENSE](LICENSE).

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=KadenThomp36/chronicle-card&type=Date)](https://star-history.com/#KadenThomp36/chronicle-card&Date)

## Support

If you find this card useful, consider buying me a coffee!

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://buymeacoffee.com/kadenthomp36)

[hacs-badge]: https://img.shields.io/badge/HACS-Custom-41BDF5.svg
[hacs-url]: https://github.com/hacs/integration
[release-badge]: https://img.shields.io/github/v/release/KadenThomp36/chronicle-card
[release-url]: https://github.com/KadenThomp36/chronicle-card/releases
[license-badge]: https://img.shields.io/github/license/KadenThomp36/chronicle-card
[license-url]: https://github.com/KadenThomp36/chronicle-card/blob/main/LICENSE
