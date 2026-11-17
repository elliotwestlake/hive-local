# Hive Schedule — project notes

A Home Assistant Marketplace (formerly HACS) custom integration (`hive_schedule`) that adds a sidebar panel for editing a Hive receiver's **onboard** weekly schedule. Built for Elliot's own Hive setup. Local-first and no cloud.

## Layout

- `custom_components/hive_schedule/`
  - `__init__.py`: registers the static path, websocket commands and sidebar panel (`panel_custom`). Removes the panel when the last entry unloads.
  - `config_flow.py`: Z2M friendly name, model (`slr1` | `slr2`), base topic.
  - `websocket.py`: `hive_schedule/devices|get|set|mode`. All MQTT work happens here.
  - `schedule.py`: pure helpers with no HA imports (parse Z2M replies, validate, group days, build payloads). Unit-tested in `tests/`.
  - `const.py`: limits, and the **unverified** `WATER_ON` / `WATER_OFF`.
  - `frontend/hive-schedule-panel.js`: **built artifact**. Don't edit it. Run `npm run build` in `/frontend`.
- `frontend/src/`: React 18 panel. `main.tsx` defines the custom element (shadow DOM; `hass` kept in a getter so we don't re-render on every state change). `App.tsx` is the UI, `styles.ts` uses HA theme vars.

## Key facts

- zigbee-herdsman-converters `hive.ts`: every SLR model includes `fz/tz.thermostat_weekly_schedule` and `tz.thermostat_clear_weekly_schedule`. They're just not in `exposes`.
- SLR2 is `multiEndpoint` with endpoints heat=5 and water=6, so keys are `weekly_schedule_heat` / `weekly_schedule_water`. SLR1/OTR1 use plain `weekly_schedule`.
- The read reply arrives as one `commandGetWeeklyScheduleRsp` **per day group**. Z2M publishes each one as `{"weekly_schedule[_ep]": {"days": [...], "transitions": [{"time": <min>, "heating_setpoint": <°C>}]}}`. `ws_get` subscribes first, then collects for `READ_TIMEOUT` and merges by day.
- Write payload: `{"weekly_schedule[_ep]": {"dayofweek": [...], "transitions": [{"heatSetpoint": 20, "transitionTime": "06:30"}]}}`. Z2M works out the mode and the number of transitions.
- Z2M schedule mode is `{"system_mode": "heat", "temperature_setpoint_hold": false}`, **not** `auto`.
- Boost (Z2M docs) must be **one** payload: `{"system_mode":"emergency_heating","temperature_setpoint_hold_duration":30,"temperature_setpoint_hold":1,"occupied_heating_setpoint":21}`.

## Status

- [x] Z2M backend + panel, built and type-checked. Schedule logic has 10 passing tests. The panel was checked in headless Chrome against a mock `hass`.
- [ ] **Not yet run on a real HA or a real receiver.** First job:
  1. Install into HA (copy the folder, or add it as a custom repository under Settings → Marketplace) and add the integration.
  2. Open the panel. Does **Read** return 7 days? If not, check the Z2M logs for `getWeeklySchedule` errors.
  3. Change one day, **Write**, then **Read** again, and confirm on the SLT thermostat screen.
  4. Read the hot water schedule and set `WATER_ON` / `WATER_OFF` to match.
- [ ] Replace the placeholder GitHub owner (`elliotwestlake`) in `manifest.json`.

## Roadmap: ZHA support + Hive Local Thermostat feature parity

Goal: one integration that works whether the receiver is on Z2M or ZHA. It should also cover what the (now retired) andrew-codechimp *Hive Local Thermostat* integration did: boost/cancel actions, boost-remaining sensors and schedule-mode switching.

1. **Transport abstraction.** Add a `transports/` package with a base class:
   `async_read(channel) -> Schedule`, `async_write(channel, Schedule)`, `async_set_mode(channel, "schedule"|"manual"|"off", setpoint=None)`, `async_boost(channel, minutes, setpoint)`, `async_cancel_boost(channel)`.
   Move the current MQTT code out of `websocket.py` into `Z2MTransport`. The websocket handlers then call `entry.runtime_data.transport`.
2. **Config flow.** First step: choose Z2M or ZHA. For ZHA, use a `DeviceSelector(integration="zha")` and detect SLR1 or SLR2 from the model / available endpoints.
3. **ZHATransport** (zigpy, checked against zigpy 2.4.1 `zcl/clusters/hvac.py`):
   - Get the device with `homeassistant.components.zha.helpers.async_get_zha_device_proxy(hass, device_id).device.device` (the zigpy device). Look up endpoint 5 (heat) or 6 (water) and its `thermostat` cluster. For SLR1, take the endpoint that has the thermostat cluster.
   - Write: `await cluster.set_weekly_schedule(num_transitions_for_sequence=n, day_of_week_for_sequence=SeqDayOfWeek bitmap (Sun=0x01 … Sat=0x40), mode_for_sequence=SeqMode.Heat, values=[min0, sp0*100, min1, sp1*100, ...])`. Send one call per day group, reusing `schedule.group_days`.
   - Read: attach a listener with `cluster.add_listener(obj)`, where `obj.cluster_command(tsn, command_id, args)` catches client command 0x00 `get_weekly_schedule_response`. Then call `cluster.get_weekly_schedule(days_to_return=0x7F, mode_to_return=SeqMode.Heat)`, collect replies for `READ_TIMEOUT` and decode the values in pairs.
   - Modes and boost: one `cluster.write_attributes({...})` call with `system_mode` (0x001C), `temperature_setpoint_hold` (0x0023), `temperature_setpoint_hold_duration` (0x0024) and `occupied_heating_setpoint` (0x0012, in centi-°C). Keep it as one write, because the Hive timing quirk the Z2M docs mention probably applies here too.
   - Check whether ZHA's existing climate entity for Hive needs a quirk. Don't fight it; add our own entities alongside.
4. **Parity entities and actions** (both transports): `hive_schedule.boost_heating` / `boost_water` / `cancel_boost_*` services, boost-remaining sensors (from `temperature_setpoint_hold_duration`), a "follow schedule" switch, and default boost time/temperature number entities.
5. Panel: add boost controls and a mode indicator.

## Conventions

- Python: HA style, type hints, `from __future__ import annotations`. Keep `schedule.py` free of HA imports so it stays testable.
- Run `pytest -q tests` and `cd frontend && npm run build` before committing, and commit the rebuilt bundle.
