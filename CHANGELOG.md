# Chronicle Card v1.15.1 — Templates in Static Events

A small fix release: static events now understand Jinja2 templates. Existing configs look the same as before.

## Bug Fixes

- **Templated start times on static events work (#40).** A static event with `start: "{{ now() + timedelta(hours=3) }}"` used to show up at the current time, because the template was never rendered and the unparseable text fell back to "now". The card now renders Jinja2 in `start`, `end`, `title` and `description` through Home Assistant on every refresh, so relative times stay current. Thanks @wiccan2 for the report.

  ```yaml
  days_forward: 1
  sources:
    - type: static
      name: Upcoming
      events:
        - title: "Dishwasher done"
          start: "{{ now() + timedelta(hours=3) }}"
        - title: "Next alarm"
          start: "{{ states('sensor.phone_next_alarm') }}"
  ```

- **A static event with a start that isn't a valid date is skipped** with a warning in the browser console, instead of silently appearing at the current time.
- **More date formats are accepted everywhere**, including Python/Jinja output such as `2025-04-01 10:00:00.123456+00:00` (which Safari and the iOS app used to reject) and epoch seconds from `as_timestamp()`.

Remember that future events only show when `days_forward` is set.
