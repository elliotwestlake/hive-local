---
title: Entities and actions
description: Every entity Snug creates, and the actions you can use in automations.
section: Reference
order: 1
---

Entity ids start with your receiver's device name, for example `climate.receiver_heating`.

## Entities

### Heating

| Entity | What it is |
| --- | --- |
| Climate: **Heating** | `auto` = Schedule, `heat` = Manual, `off`. Presets: `boost`, and `away` during a holiday. Has `holiday_until` and, while pre-heating, `preheat`. |
| Select: **Heating mode** | Schedule, Manual, Off or Boost. |
| Sensor: **Heating boost remaining** | Minutes left on a boost. |
| Number: **Heating boost duration** | The default boost length, in minutes. |
| Number: **Heating boost temperature** | The default boost temperature. |
| Number: **Heating frost protection** | Shown during scheduled off times and used for holidays (display only). |
| Switch: **Pre-heat** | Turns [pre-heat](/docs/pre-heat/) on or off. |
| Number: **Pre-heat starts at most** | The longest lead pre-heat may take, in minutes. |
| Buttons: **Boost heating**, **Cancel heating boost** | Boost with the defaults, or end a boost. |

### Hot water (SLR2)

| Entity | What it is |
| --- | --- |
| Water heater: **Hot water** | Schedule, On, Off or Boost. No temperature. Has `holiday_until`. |
| Select: **Hot water mode** | Schedule, Always on, Off or Boost. |
| Sensor: **Hot water boost remaining** | Minutes left on a boost. |
| Number: **Hot water boost duration** | The default boost length. |
| Buttons: **Boost hot water**, **Cancel hot water boost** | |

Boost settings, frost protection and pre-heat are kept in Home Assistant and restored after a restart. They're never sent to the receiver.

## Actions

`device_id` can be left out when you have only one receiver. The holiday actions cover every receiver without it.

| Action | Fields |
| --- | --- |
| `hive_local.boost_heating` | `device_id`, `minutes` (1–360), `temperature` (5–32 °C). Defaults to the boost settings. |
| `hive_local.boost_water` | `device_id`, `minutes` (1–360). |
| `hive_local.cancel_boost_heating` | `device_id`. Goes back to the previous mode. |
| `hive_local.cancel_boost_water` | `device_id`. |
| `hive_local.set_holiday` | `device_id`, `until` (local time unless it has a time zone), `temperature`. |
| `hive_local.cancel_holiday` | `device_id`. |

### Examples

Boost the heating for an hour when you're on your way home:

```yaml
action: hive_local.boost_heating
data:
  minutes: 60
  temperature: 21
```

Away until Sunday evening:

```yaml
action: hive_local.set_holiday
data:
  until: "2026-12-06 18:00"
```
