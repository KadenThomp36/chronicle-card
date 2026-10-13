# Chronicle Card v1.14.0 — Native Home Assistant Integration, Look-Ahead, Lighter Live Updates

This release re-audits the whole card against current Home Assistant frontend APIs and moves everything possible onto HA's own building blocks: its state formatting, action handler, form editor and locale settings.

## ⚠️ Behavior changes

- **Requires Home Assistant 2024.8 or newer** (declared in `hacs.json`).
- **History state labels now come from Home Assistant** (`formatEntityState`). They are translated into your language and device-class aware, but some English wording changes: e.g. a door is "Front Door **Open**" instead of "Opened". `state_map` still overrides anything.
- **`time_format` now follows your HA profile by default** (12/24h, plus the profile's time zone setting). Set `time_format: 12h`/`24h` to force one.
- **Whole-number `days_back` counts calendar days.** `days_back: 0` now means "today since midnight" (it used to show nothing), and `1` means yesterday + today, regardless of the time of day (thanks @varhub, #36). Decimals keep the old rolling window (`0.5` = the last 12 hours).
- **Compact mode** keeps hiding descriptions, but `show_attributes` values now show in compact mode too.

## Bug Fixes

- **History sources no longer subscribe to the entire `state_changed` firehose (#33).** Live updates now come from the state stream Home Assistant already sends the dashboard, so they add **zero** websocket traffic; previously a busy instance pushed hundreds of KB/s to every open dashboard. This also removes the double subscription race. Huge thanks to @dimatx for the measurements and the PRs (#34, #35) that pinned this down.
- **Attributes now show in compact mode (#28).** They were appended to the description, which compact mode hides; they now have their own line.
- **Group time ranges read oldest → newest (#30)** instead of "20:33 – 20:32".
- **`image_template` accepts a plain URL or path (#31)**, e.g. `image_template: /local/pets/yoshi.jpg`. No Jinja wrapper needed.
- **Cards kept running after HA moved them, but stopped updating.** After a view switch or edit mode, a card could keep its old events forever; config edits also didn't refetch until the next poll. Both are fixed.
- REST, logbook and calendar sources now refresh on their `poll_interval` even when no entity state is changing.
- All-day calendar events no longer shift to the previous day west of UTC and show without a misleading "00:00".
- Expanded groups stay expanded across refreshes.
- The "Animate new events" option actually animates new events now.
- Severity override in the editor no longer offers "Detail Dialog" as a severity.
- Custom icon sets (`hass:`, `phu:`, `si:` …) are no longer replaced with the default icon.
- The card's documentation link in the card picker pointed to a nonexistent repository.

## New Features

- **`days_forward` (#29)** — show upcoming calendar and static events alongside the past:
  ```yaml
  days_back: 0
  days_forward: 7
  sources:
    - type: calendar
      entity: calendar.family
  ```
- **`appearance.show_description` (#32)** — hide the "Breakfast → 2. Breakfast" second line for event-like sensors. Defaults to on (off in compact mode).
- **`clip_template` for history sources (#21)** — a URL/path or Jinja2 template whose video plays in the detail dialog. If a clip can't play inline (reported on iOS), the dialog falls back to the still image and shows an **Open clip** link.
- **Every Home Assistant action type** works for tap/hold and action buttons, because the card now hands them to HA's own handler: `perform-action` (with `confirmation`), `navigate`, `url`, `toggle`, `more-info`, `assist`, `fire-dom-event`. Tap/hold actions are now available on **all** source types, and buttons accept native action keys:
  ```yaml
  actions:
    - label: Dismiss
      icon: mdi:close
      action: perform-action
      perform_action: input_boolean.turn_off
      target: { entity_id: input_boolean.alert }
      confirmation: { text: Dismiss this alert? }
  ```
  The older `type: service | navigate | fire-event` buttons keep working.
- **Localized everywhere:** attribute names and values (with units), "Today"/"Tomorrow", and relative times come from Home Assistant and your browser, so they're translated in every language HA supports.
- **Sections view support:** sensible default width, and resizing the card's height in the layout editor makes the timeline fill it. The card picker preview uses a calendar or a few entities from your system. On HA 2026.6+ the card is suggested when adding a card for a calendar, door, lock, person, etc.
- Detail dialog shows calendar event **location**, uses your custom severity colors, and is keyboard accessible. Timeline entries can be focused and activated with the keyboard.

## Visual editor

- Rebuilt on Home Assistant's own form system with native pickers:
  - HA's action editor for tap/hold
  - a state picker for state filters
  - attribute pickers
  - icon and color pickers
  - YAML editors (instead of raw JSON boxes) for field maps, WebSocket commands, state labels and static events
- Saving from the editor no longer writes every default (empty filter lists, default colors, …) into your YAML. Existing configs are unaffected.

## Under the hood

- History is fetched with the WebSocket `history/history_during_period` command (compressed format, no URL length limits).
- Jinja2 template results are cached, so polling doesn't re-render them.
- Bundle size dropped from 180 KB to 133 KB after removing dead code (unused virtual-scroll and API helper modules, English state-label tables, unused strings).
