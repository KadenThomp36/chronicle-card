# Chronicle Card v1.15.0 — Custom Titles, Wrapping Text, Clips on iOS

This release lets you write your own event titles and descriptions for history and logbook sources, lets long titles wrap, and makes Frigate clips play on iPhone, iPad and Safari. Existing configs look the same as before.

## Bug Fixes

- **Frigate clips now play on iPhone, iPad and Safari, including the Home Assistant iOS app (#21).** Frigate streams `clip.mp4` on the fly without byte-range support, and Apple's WebKit refuses to play MP4 without it. That caused the crossed-out play icon. On Apple devices the card now plays Frigate's HLS playlist (`master.m3u8`) for the same event, which is what Frigate itself recommends for iOS. This covers `/api/frigate/notifications/{id}/clip.mp4` and Frigate's own `/api/events/{id}/clip.mp4`. Other browsers keep using `clip.mp4`. No config change is needed. Thanks @dnestico for the report.
- **The clip player never stays blank.** If a clip can't play, the dialog tries the other format. If that fails too, it shows the still image, the message "This clip can't be played here." and an **Open clip** link.
- **Authenticated clip URLs work.** Clip URLs under `/api/…` and `/media/…` are now signed automatically, valid for 15 minutes. This also fixes Frigate notification clips when the integration's notification expiry option is on.
- Inline autoplay is more reliable on iOS.

## New Features

- **Custom titles and descriptions for history and logbook sources (#37).** New `title_template` and `description_template` options use the same `{field}` placeholders as action strings. `{title}` and `{description}` insert the default text. A placeholder with no value expands to nothing, and a title that ends up empty falls back to the default. `show_description: false` hides the description line. All three work at the source level and per entity in `entity_config`, and per-entity settings win. Thanks @Popiche for the request.
  - Logbook placeholders: `{name}`, `{message}`, `{entity_name}`, `{entity_id}`, `{state}`, `{domain}`, plus every `context_*` field Home Assistant returns (`{context_name}`, `{context_entity_id}`, `{context_user_id}`, …).
  - History placeholders: `{name}`, `{entity_name}`, `{new_label}`, `{old_label}`, `{new_state}`, `{old_state}`, `{device_class}`, `{attributes.<name>}`.

  ```yaml
  # automation
  - action: logbook.log
    data:
      entity_id: switch.dishwasher
      name: Dishwasher · Delayed Start
      message: "Program {{ program }} · starts in {{ delay }} h"
  # card
  sources:
    - type: logbook
      entities: [switch.dishwasher, automation.noise_alert]
      title_template: "{name}"
      description_template: "{message}"
      entity_config:
        automation.noise_alert:
          show_description: false
  appearance:
    title_lines: 2
    description_lines: 0
  ```

  `logbook.log` entries only show up when their `entity_id` is one of the source's entities.
- **Wrapping titles and descriptions (#37).** New `appearance.title_lines` and `appearance.description_lines`. `1` (the default) keeps the single line with "…", `N` wraps and cuts off after N lines, and `0` means no limit. Works in both vertical and horizontal layouts, and line breaks in descriptions are kept.
- **Clips and images for logbook sources.** Logbook sources now support `image_template` and `clip_template`, at the source level and per entity, the same as history sources.
- **`clip_url_template` works on history and logbook sources (#21)** as another name for `clip_template`, so the same option name works on every source type.
- **`clip_template` accepts `media-source://` ids**, e.g. clips in your media folder:
  ```yaml
  sources:
    - type: history
      entities: [binary_sensor.driveway_motion]
      clip_template: >-
        media-source://media_source/local/clips/driveway_{{ as_timestamp(timestamp) | timestamp_custom('%Y%m%d_%H%M%S', true) }}.mp4
  ```
- **Placeholders in plain image and clip templates.** Plain (non-Jinja) `image_template` / `clip_template` strings now expand `{field}` placeholders, e.g. `/local/snapshots/{entity_id}.jpg`.
- **Dotted placeholders.** Placeholders accept metadata paths like `{attributes.temperature}`, in actions too.

## Visual editor

- Each history and logbook source has a new **Title & description** section, with the same fields per entity.
- **Title lines** and **Description lines** are under Appearance.
- Logbook sources show image and clip template fields.

## Other changes

- The entity-name tag is hidden when it's identical to the event title.
- New docs section: "Clip playback on iPhone/iPad". Servers other than Frigate must answer range requests (HTTP 206) or serve `.m3u8` for clips to play on iOS.
