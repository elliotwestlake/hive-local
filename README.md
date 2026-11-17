# Hive Schedule

Edit a Hive receiver's **onboard** weekly heating / hot water schedule from a Home Assistant sidebar panel. The schedule is written to the receiver itself, so it keeps running if HA is down.

Works with Hive receivers paired to **Zigbee2MQTT** (SLR1, SLR1b/c/d, OTR1, SLR2, SLR2b/c/d). ZHA support is planned.

> ⚠️ Early and experimental. Z2M includes the standard Zigbee `setWeeklySchedule` / `getWeeklySchedule` commands for these receivers but hides them from its UI. Whether Hive firmware fully honours them is still being tested. Read before you write, and check the change shows on the thermostat.

## Install

**Marketplace** (HA 2026.11+, formerly HACS): **Settings → Marketplace** → ⋮ → Custom repositories → add this repo as an *Integration* → install → restart HA. On older HA, use the same steps in HACS.

**Manual:** copy `custom_components/hive_schedule` into your HA `config/custom_components/`, then restart.

Then go to **Settings → Devices & services → Add integration → Hive Schedule** and enter:

- the receiver's Zigbee2MQTT friendly name (case sensitive)
- receiver type (SLR1/OTR1 = heating only, SLR2 = heating + hot water)
- Z2M base topic (default `zigbee2mqtt`)

A **Heating Schedule** item appears in the sidebar.

## Using it

- **Read** fetches the current schedule from the receiver. This also happens on open.
- Edit a day, then use **Copy to** to apply it to weekdays, the weekend or every day.
- **Write to receiver** sends one command for each group of identical days.
- **Follow schedule** puts the receiver in schedule mode (`system_mode: heat`, hold off).

Limits: 6 events per day, setpoints 1–32 °C in 0.5 steps.

### Hot water values

The setpoints the receiver uses for hot water on/off are **not yet confirmed**. They default to `WATER_ON = 22` and `WATER_OFF = 1` in `const.py`. Read your existing hot water schedule first. If the panel shows values like `22°?`, update the constants to match.

## Test it by hand first (Developer Tools → Actions → `mqtt.publish`)

```yaml
# read (SLR2: weekly_schedule_heat / weekly_schedule_water; SLR1: weekly_schedule)
topic: zigbee2mqtt/HiveReceiver/get
payload: '{"weekly_schedule_heat": ""}'
```

Watch `zigbee2mqtt/HiveReceiver` in MQTT Explorer or the Z2M logs for the `weekly_schedule_heat` replies.

## Development

```bash
cd frontend && npm install && npm run build   # writes custom_components/hive_schedule/frontend/hive-schedule-panel.js
npm run watch                                  # rebuild on change
pytest -q tests                                # schedule logic tests
```

The built bundle is committed so Marketplace (HACS) users don't need a build step.
