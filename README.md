# Hive Local

Local control of Hive receivers from Home Assistant, with no Hive cloud involved. It adds a **Hive** sidebar panel and entities for boost and mode. Schedules are written to the receiver itself, so they keep running if HA is down.

Works with Hive receivers paired to **Zigbee2MQTT** (SLR1, SLR1b/c/d, OTR1, SLR2, SLR2b/c/d). ZHA support is planned.

> ⚠️ Early and experimental. Z2M includes the standard Zigbee `setWeeklySchedule` / `getWeeklySchedule` commands for these receivers but hides them from its UI. Reading works on a real SLR1-style receiver. Writing is still being tested, so read before you write, and check the change shows on the thermostat.

## Install

**Marketplace** (HA 2026.11+, formerly HACS): **Settings → Marketplace** → ⋮ → Custom repositories → add this repo as an *Integration* → install → restart HA. On older HA, use the same steps in HACS.

**Manual:** copy `custom_components/hive_local` into your HA `config/custom_components/`, then restart.

Then go to **Settings → Devices & services → Add integration → Hive Local**. Confirm the Z2M base topic (default `zigbee2mqtt`), then pick your receiver from the list. The receiver type (heating only, or heating + hot water) is detected from Zigbee2MQTT.

> Upgrading from **Hive Schedule**? The integration was renamed. Delete the old Hive Schedule entry and its `custom_components/hive_schedule` folder, then add Hive Local.

## The Hive panel

- **Overview:** each channel's current temperature, mode, heating/idle, and boost time left. Click a card to open its controls.
- **Heating** / **Hot water:** the weekly schedule editor. **Read** fetches the schedule from the receiver (also on open). Edit a day, use **Copy to** for weekdays, the weekend or every day, then **Write to receiver**. One command is sent for each group of identical days.
- **Boost & mode:** switch between Schedule, Manual (a fixed temperature) and Off, start a boost for a set time (and temperature, for heating), or cancel one.

Schedule limits: 6 events per day, setpoints 1–32 °C in 0.5 steps.

## Entities and actions

For each channel (heating, plus hot water on SLR2):

| Entity | What it does |
|---|---|
| `select.<receiver>_heating_mode` | Schedule / Manual / Off / Boost. Picking Boost uses the boost defaults below. |
| `sensor.<receiver>_heating_boost_remaining` | Minutes left on a boost, 0 when not boosting. |
| `button.<receiver>_boost_heating` / `cancel_heating_boost` | Start or cancel a boost. |
| `number.<receiver>_heating_boost_duration` / `heating_boost_temperature` | Defaults used by the button, the select and the actions. These are stored in HA, not on the receiver. |

Actions: `hive_local.boost_heating` (`minutes`, `temperature`), `hive_local.boost_water` (`minutes`), `hive_local.cancel_boost_heating`, `hive_local.cancel_boost_water`. Each takes an optional `device_id`, which is only needed if you have more than one receiver. Cancelling a boost returns the channel to whatever it was doing before.

```yaml
action: hive_local.boost_heating
data:
  minutes: 60
  temperature: 21
```

The Zigbee2MQTT integration already gives you a climate entity for the receiver. Hive Local adds to it and doesn't replace it.

### Hot water values

The setpoints the receiver uses for hot water on/off in a schedule are **not yet confirmed**. They default to `WATER_ON = 22` and `WATER_OFF = 1` in `const.py`. Read your existing hot water schedule first. If the panel shows values like `22°?`, update the constants to match.

## Test it by hand (Z2M → device → Dev console)

Run the `getWeeklySchedule` command on the `hvacThermostat` cluster (endpoint 5 on SLR2) with `{"daystoreturn": 127, "modetoreturn": 1}`. The Z2M log should show one `weekly_schedule` (SLR1) or `weekly_schedule_heat` (SLR2) message per day.

## Development

```bash
cd frontend && npm install && npm run build   # writes custom_components/hive_local/frontend/hive-local-panel.js
npm run watch                                  # rebuild on change
pytest -q tests                                # pure logic tests (no HA needed)
```

The built bundle is committed so Marketplace users don't need a build step.
