# Chronicle Card v1.9.1 — Bug Fixes

## Bug Fixes

- Fixed severity dropdown in source editor not saving selections — switched from `ha-select` to native `ha-selector` component (#5)
- Fixed REST API double-slash when URL includes `/api/` prefix — `hass.callApi` already prepends `/api/`, now strips redundant prefix (#7)
- Fixed Frigate WebSocket events failing with `instance_id` error — auto-defaults `instance_id: "frigate"` for `frigate/*` WS types (#6)

---

# Chronicle Card v1.9.0 — Changes from v1.8.1

## Jinja2 Template Support

### `image_template` — Dynamic Thumbnails
- New `image_template` option on history sources renders a Jinja2 template per event to produce dynamic thumbnail URLs
- Template context variables: `entity_id`, `state`, `old_state`, `timestamp`, `attributes`, `source_name`
- Batch rendering: all events sharing the same template are rendered in a single WebSocket call (chunked at 50 events)
- Works at source level and per-entity (per-entity overrides source-level)
- Use `/local/` URLs or integration-specific proxies (HA's `/api/camera_proxy/` requires auth that `<img>` tags can't send)

### Native `tap_action` / `hold_action`
- Timeline events now support HA's standard action system
- `tap_action` and `hold_action` support: `more-info`, `navigate`, `call-service`, `none`
- Default tap behavior (open Chronicle detail dialog) is preserved when no action is configured
- `more-info` fires `hass-more-info` from inside HA's DOM tree to open the entity's native dialog
- `navigate` uses `history.pushState` for in-app navigation
- `call-service` calls any HA service with data and target
- Hold detection via pointer events with 500ms threshold, scroll-aware on touch devices
- Editor shows "Detail Dialog (default)" as an explicit option — can always revert after changing

### "More Info" Button in Detail Dialog
- New pill button in the event detail dialog opens the entity's native HA more-info dialog
- Only shown for history source events (calendar/REST/static events don't have meaningful HA entity dialogs)
- Closes the detail dialog first, then opens more-info

## Per-Entity Configuration
- New `entity_config` option on history sources for per-entity overrides
- Each entity can have its own `name`, `state_filter`, `state_map`, `icon`, `color`, `severity`, `image_template`, `tap_action`, and `hold_action`
- Per-entity settings override source-level defaults, which override auto-detected device class defaults
- Multi-entity sources now use each entity's friendly name by default (instead of the source name)

## Native HA Editor Components
- Entity list: Replaced manual add/remove buttons with native `ha-selector` multi-entity chip picker
- Per-entity settings: Native `ha-expansion-panel` per entity with `ha-selector` components inside
- State filter: Chip-based multi-select with domain-aware state suggestions and custom value support (case-insensitive matching)
- Calendar entity: Replaced `ha-entity-picker` with `ha-selector` entity selector
- Filters section: Categories, severities, sources, and filter entities all use native `ha-selector` components
- Image template field uses `ha-selector` with `{ template: {} }` for Jinja2 syntax highlighting
- Tap/hold action editors use `ha-selector` dropdowns with conditional sub-fields (navigation path, service name)
- Icon and color override fields have × clear buttons to revert to source defaults
- Removed legacy source-level `state_filter`/`state_map` from GUI (still supported via YAML)
- Force-loads `hui-action-editor` component from HA

## Bug Fixes
- Fixed `ha-select` dropdowns not applying changes inside `ha-expansion-panel` — switched to `ha-selector`
- Fixed `ha-entity-picker` not rendering (lazy-load timing issue)
- Fixed per-entity state filter case sensitivity (`"Off"` now matches `"off"`)
- Fixed `hass-more-info` event not reaching HA — was dispatched on `document.body` instead of from inside HA's DOM tree

---

# Chronicle Card v1.8.0 — Changes from v1.7.1

## History Adapter Overhaul

### Single entity per source
- History sources now use `entity` (singular) instead of `entities` (comma-separated array)
- Users should add one history source per entity they want to track
- Removed `entities?: string[]` from SourceConfig type

### Same-state duplicate filtering (bug fix)
- `fetchEvents()` now skips entries where `prev.state === curr.state`
- Fixes climate/thermostat entities flooding the timeline with duplicate "Heat/Cool" events when only attributes (temperature) changed but state stayed the same
- `subscribeLive()` already had this check; now both paths are consistent

### State filter
- Added `state_filter?: string[]` to SourceConfig
- Only creates timeline events when the new state matches one of the listed values
- e.g. `state_filter: ["on"]` on a motion sensor only logs "Motion Detected", ignores "Cleared"
- Applied in both `fetchEvents()` and `subscribeLive()`
- Empty/undefined = log all state changes (default behavior)

### Smart title deduplication
- Title no longer doubles words: "Doorbell Motion Motion Cleared" → "Doorbell Motion Cleared"
- Strips leading words from state label that overlap with trailing words of the display name
- Description also deduplicates: "Motion Detected → Motion Cleared" → "Detected → Cleared"

### Source name flows through to events
- Setting `name` on a history source now overrides the entity's friendly_name in event titles
- e.g. name: "Doorbell" → title becomes "Doorbell Cleared" instead of "Doorbell Motion Cleared"
- `entityName` field no longer set on history events (was redundant with title)

## Editor: Collapsible Sources

- Each source in the editor is now wrapped in a collapsible `<details>` element
- Summary line shows: color-coded type badge + source name + entity/URL hint + remove button
- All sources collapsed by default — much cleaner when 4+ sources are configured
- Source type and name are in a row layout inside the expanded body

## Editor: Filter UI (new section)

- Added **Filters** section between Sources and Grouping in the visual editor
- The event store already applied filters — this adds the missing UI:
  - **Search** — text input for keyword filtering across event titles/descriptions
  - **Categories** — comma-separated input (e.g. `motion, door, security, person`)
  - **Severities** — 4 checkboxes (Critical, Warning, Info, Debug)
  - **Sources** — comma-separated source name filter
  - **Entities** — comma-separated entity ID filter

## Color & Icon Resolution Priority Fix

- `default_color` and `default_icon` now take priority over automatic keyword inference
- Previous order: color_map → keyword inference → default_color → category color
- New order: color_map → default_color → keyword inference → category color
- Explicit user choices now always win over auto-detection

## Tinted Icon Colors

- Timeline icons are no longer pure white on colored backgrounds
- Icons now use a subtle light tint of the event color (82% toward white)
- Creates a more refined, cohesive look — icons feel part of the color circle, not floating on top
- Applied to both individual events and group icons

## Event Group Redesign

### Visual consistency with individual events
- Group header now uses identical layout to event-item: same icon size (34px), same padding, same title/time positioning
- Time range appears in same position as individual event time (right-aligned in top row)
- Removed visual jarring between grouped and ungrouped cards

### Performant expand/collapse
- Replaced `max-height: 4000px` transition hack with CSS `grid-template-rows: 0fr → 1fr`
- Eliminates lag/delay when expanding and collapsing groups
- Smooth, consistent animation regardless of content height

### Fixed thumbnail strip
- Rewrote the blur/count overlay to use proper container sizing
- The "+N" count and blur are now correctly centered on the thumbnail
- Last thumbnail uses explicit `<div>` wrapper instead of pseudo-element sizing tricks

### Removed background band on expanded children
- Children now render with clean left-border indent, no colored background band
- Cleaner visual treatment that doesn't compete with individual event cards

## Grouping Logic Fixes

### Sliding window (bug fix)
- Window comparison now uses **previous event** timestamp, not the first event in the group
- Previously: events at 9:43, 9:41, 9:39 with 120s window — 9:39 was compared to 9:43 (4min gap, outside window)
- Now: 9:39 compared to 9:41 (2min gap, inside window) — correct chaining behavior
- Groups form naturally when events are consecutive within the window

### Accurate group summaries
- Fixed "7 cat events" when group contains cat, person, speech events
- When all events share the same label: "7 cat events" (correct)
- When labels are mixed and group_by is source: "7 Frigate events" (uses source name)
- When labels are mixed and group_by is entity: "7 Front Door events" (uses entity name)

## Detail Dialog Fixes

- Close (x) button: added `line-height: 0` and explicit SVG sizing for pixel-perfect centering
- Severity tag: replaced fixed `height: 22px` with `padding: 4px 10px` for natural text centering

## Severity Badge Fix

- Replaced fixed height with symmetric padding for reliable vertical text centering
- Added `flex-shrink: 0` to prevent badge from collapsing in tight layouts

## Config Model Cleanup

- Removed `entities?: string[]` from `SourceConfig` (dead field, was only used by old multi-entity history)
- `entity` (singular) is the canonical field for calendar and history source types

## Version & Build

- Bumped `CARD_VERSION` to `1.8.0` in `src/constants.ts`
- Updated lovelace_resources cache bust to `?v=1.8.0`
