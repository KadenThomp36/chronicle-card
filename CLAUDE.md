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

## Architecture

The data flow is **adapters → store → component → layout/elements**:

1. **Adapters** (`src/adapters/`) — one per source type (`calendar`, `rest`, `history`, `static`). Each implements `ISourceAdapter` (`adapter.ts`): `configure()`, `fetchEvents()`, optional `subscribeLive()` for push updates. New source types are added by implementing the interface and registering in `adapter-registry.ts`. The registry is the only place that knows about concrete adapter classes — `EventStore` only sees the interface.

2. **EventStore** (`src/store/event-store.ts`) — single source of truth for the card. Owns adapter instances, runs `Promise.allSettled` over all `fetchEvents()` calls, dedupes by `id`, sorts newest-first, then runs two async resolution passes: `resolveMedia` (mediaContentId → URL via HA media browser) and `resolveTemplates` (Jinja2 `image_template` → URL via batched WS `render_template` calls in `utils/template-renderer.ts`). After resolution it filters, applies grouping (`event-grouper.ts`), and notifies subscribers. Polling staleness is the *minimum* `poll_interval` across sources. Live events bypass the fetch path via `injectLiveEvent`.

3. **`<chronicle-card>`** (`src/components/chronicle-card.ts`) — thin LitElement shell. `setConfig` merges defaults from `models/config.ts`. The `hass` setter triggers store fetch + live subscription. Picks `vertical-timeline` or `horizontal-timeline` (`components/layouts/`), which render `event-group` / `event-item` (`components/elements/`). Detail dialog and tap/hold actions bubble up via custom events.

4. **Visual editor** (`src/components/chronicle-editor.ts` + `source-editor.ts`) — full GUI editor returned from `ChronicleCard.getConfigElement()`. Uses HA's native `ha-selector`/`ha-form` components (loaded lazily via `utils/load-ha-components.ts`). Source editor is a separate ~38KB file because each adapter type has its own form schema.

### Key conventions

- All adapter output is normalized to the `ChronicleEvent` shape in `models/event.ts` — adapters do their own field mapping (`field_map` for REST, device-class label tables for history). Store code never branches on `sourceType`.
- Icons and colors flow through `utils/icon-resolver.ts`'s 5-level chain: explicit event field → source `icon_map`/`color_map` → 150+ keyword fuzzy match → category default → global fallback. Adding new keyword rules is the usual reason to touch this file.
- The `image_template` (Jinja2) flow is performance-sensitive: events sharing the same template string are rendered in one WS call, chunked at 50. Don't change to per-event rendering without measuring.
- HA `/api/camera_proxy/` URLs require bearer auth that `<img>` tags can't send — `image_template` examples must use `/local/` paths or integration proxies (Frigate snapshots, etc.). This is documented in README and the editor; don't suggest camera_proxy URLs.
- This is a single-bundle ESM build (Rollup + terser). Runtime deps are bundled; only `lit` is a real dep, the rest is dev tooling.

### Localization

`src/localize.ts` is a self-contained 8-language string table (en, de, fr, es, it, pt, nl, sv). Auto-detected from `hass.language`, override via the `language` config option. Adding a string means adding it to all 8 locales in this file.

### Blueprints

`blueprints/` contains two HA automation blueprints (`chronicle_log_event.yaml`, `chronicle_camera_snapshots.yaml`) referenced from the README via `my.home-assistant.io` import buttons. The camera-snapshots blueprint and `image_template` examples must agree on timestamp formatting — both use `as_timestamp() | timestamp_custom('%Y%m%d_%H%M%S', true)` to stay timezone-consistent.
