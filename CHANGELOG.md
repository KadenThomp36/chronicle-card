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
