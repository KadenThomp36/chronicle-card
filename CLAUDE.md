# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Chronicle Card is a custom Lovelace card for Home Assistant, distributed via HACS. It renders a unified timeline from multiple event sources (calendar entities, REST/WS APIs, entity history, static YAML) using Lit. There is no backend — everything runs in the HA frontend against the `hass` object.

## Build & Release

```bash
npm install
npm run build      # one-shot Rollup build → dist/chronicle-card.js
npm run watch      # rebuild on change
```

There are **no tests, linter, or formatter** configured. `tsc` runs only as part of the Rollup pipeline (`@rollup/plugin-typescript`); to type-check standalone, use `npx tsc --noEmit`.

**`dist/chronicle-card.js` is committed and must be rebuilt before any release.** HACS serves this file directly to users — `hacs.json` points at it (`"filename": "chronicle-card.js"`). A change to `src/` without a rebuilt `dist/` ships nothing.

**Version is duplicated** between `src/constants.ts` (`CARD_VERSION`, shown in the console banner and used by HA) and `package.json`. The `constants.ts` value is the source of truth; bump both when releasing.

CI (`.github/workflows/validate.yml`) only runs HACS validation — it does not build or type-check.

**Docs live in three places — update all of them for any user-facing change:**
- `README.md` (also what HACS renders)
- `docs/documentation.html` + `docs/index.html` — the GitHub Pages site (https://kadenthomp36.github.io/chronicle-card/, served from `main:/docs`). Hand-written HTML: bump the `version-badge` in both files, and keep option tables, examples, install steps and FAQ in sync with the README. Code blocks use `hl-key`/`hl-str`/`hl-num`/`hl-comment` spans in `documentation.html` and `key`/`str`/`num` in `index.html`.
- `CHANGELOG.md` — holds only the *current* release's notes (overwritten each release) and doubles as the GitHub release body.

Release checklist: bump `CARD_VERSION` + `package.json` → `npm run build` → update README, both `docs/` pages and CHANGELOG → commit → tag `vX.Y.Z` → `gh release create` with the CHANGELOG text → close the fixed issues with a link to the release.

`hacs.json` declares `"homeassistant": "2024.8.0"` as the minimum. Anything newer must be feature-detected (see `atLeast()` in `components/editor-utils.ts`, and the optional `hass.format*` helpers in `types.ts`) or the minimum must be raised deliberately.

## Architecture

The data flow is **adapters → store → component → layout/elements**:

1. **Adapters** (`src/adapters/`) — one per source type (`calendar`, `rest`, `history`, `logbook`, `static`). Each implements `ISourceAdapter` (`adapter.ts`): `configure()`, `fetchEvents()`, and optional `processStateChanges(hass, oldHass)` for live updates. New source types are added by implementing the interface and registering in `adapter-registry.ts`. The registry is the only place that knows about concrete adapter classes — `EventStore` only sees the interface.

2. **EventStore** (`src/store/event-store.ts`) — single source of truth for the card. Owns adapter instances, runs `Promise.allSettled` over all `fetchEvents()` calls, dedupes by `id`, sorts newest-first, then runs two async resolution passes: `resolveMedia` (mediaContentId → URL via HA media browser) and `resolveTemplates` (`image_template`/`clip_template`: plain strings are used as-is; Jinja2 is rendered via one-shot `render_template` subscriptions in `utils/template-renderer.ts`, chunked at 50 and cached by template+variables). After resolution it filters, applies grouping (`event-grouper.ts`), and notifies subscribers. The poll interval is the *minimum* `poll_interval` across sources. `configure()` bumps a generation counter, so fetches started under an old config are discarded. Group expansion is kept in the store by `groupKey()` (the oldest event id), so it survives re-fetches.

3. **`<chronicle-card>`** (`src/components/chronicle-card.ts`) — thin LitElement shell. `setConfig` merges defaults from `models/config.ts` and forces a refetch. Polling runs on a timer while connected, and the store listener is attached in `connectedCallback`, not `setConfig`, because HA detaches and re-attaches cards. The `hass` setter does **not** re-render on every state change. It passes old/new `hass` to `store.processStateChanges` and only bumps `_localeKey` when language, time format or time zone change. Also implements `getGridOptions()` (sections view) and `getStubConfig(hass)`. Picks `vertical-timeline` or `horizontal-timeline` (`components/layouts/`), which render `event-group` / `event-item` (`components/elements/`). Tap/hold run through `utils/actions.ts`: no action or `default` → `chronicle-show-detail` (the detail dialog), otherwise the native `hass-action` event so HA's own handler runs it (perform-action, confirmation, url, assist…). The detail dialog is a self-contained Lit overlay rendered into `document.body`, because HA's dialog elements are internal and churn.

4. **Visual editor** (`src/components/chronicle-editor.ts` + `source-editor.ts`) — `ha-form` schemas throughout, with `expandable` sections and native selectors (`ui_action`, `state`, `object` for maps/JSON, `icon`, `color_rgb`, `template`); no raw inputs. HA components are force-loaded via `utils/load-ha-components.ts`. Display data has defaults merged in; `pruneConfig()` in `editor-utils.ts` strips them back out so saved YAML only holds what the user set. Hex colors are converted to and from `color_rgb` arrays at the form boundary. `source-editor.ts` builds one schema per source type plus per-entity expandables.

### Key conventions

- All adapter output is normalized to the `ChronicleEvent` shape in `models/event.ts` — adapters do their own field mapping (`field_map` for REST; history uses `hass.formatEntityState` / `formatEntityAttributeName|Value` for localized labels, with user `state_map` taking priority). Store code never branches on `sourceType`.
- Icons and colors flow through `utils/icon-resolver.ts`'s 5-level chain: explicit event field → source `icon_map`/`color_map` → 150+ keyword fuzzy match → category default → global fallback. Adding new keyword rules is the usual reason to touch this file.
- **Live updates diff `hass.states`; don't open websocket subscriptions for them.** HA already pushes every state change into `hass`. The old `state_changed` firehose cost ~500 KB/s on busy instances (#33). History fetches use WS `history/history_during_period` (compressed `{s, a, lu, lc}` epoch-seconds format). Live and fetched copies of an event can differ by ~1 ms, so the store dedupes with `isSameEvent()`, not only by id. It also carries recent live events across polls, because the recorder commits with a delay.
- Dates go through `utils/date-utils.ts` (`setFormatContext` from the card): `Intl` with `hass.locale` language, 12/24h (`time_format` config overrides) and time zone (`time_zone: server` → `hass.config.time_zone`). Date-only strings (all-day events) parse as local midnight. Whole-number `days_back`/`days_forward` snap to midnight in the display time zone.
- HA `/api/camera_proxy/` URLs require bearer auth that `<img>` tags can't send — `image_template` examples must use `/local/` paths or integration proxies (Frigate snapshots, etc.). This is documented in README and the editor; don't suggest camera_proxy URLs.
- Action strings (tap/hold `ChronicleAction`/`ActionConfig`) support `{field}` placeholders expanded per-event by `utils/action-placeholders.ts` — `{id}` prefers `metadata.raw_id` (the upstream id, e.g. Frigate event id) over the namespaced store id, so adapters should set `raw_id` when the source has a meaningful native id. Any scalar `metadata` key is also a valid placeholder.
- This is a single-bundle ESM build (Rollup + terser). Runtime deps are bundled; only `lit` is a real dep, the rest is dev tooling.

### Localization

`src/localize.ts` is a self-contained 9-language string table (en, de, fr, es, it, pt, nl, sv, pl) for the card's own strings only. Auto-detected from `hass.locale.language`, override via the `language` config option. Adding a string means adding it to all 9 locales in this file. Prefer HA/`Intl` over new strings: relative times and Today/Yesterday use `Intl.RelativeTimeFormat`, state labels use `hass.format*`, and editor labels for generic fields use `hass.localize('ui.panel.lovelace.editor.card.generic.*')`.

### Blueprints

`blueprints/` contains two HA automation blueprints (`chronicle_log_event.yaml`, `chronicle_camera_snapshots.yaml`) referenced from the README via `my.home-assistant.io` import buttons. The camera-snapshots blueprint and `image_template` examples must agree on timestamp formatting — both use `as_timestamp() | timestamp_custom('%Y%m%d_%H%M%S', true)` to stay timezone-consistent.
