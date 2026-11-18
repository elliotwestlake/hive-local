# Hive Local — project notes

A Home Assistant Marketplace (formerly HACS) custom integration, domain `hive_local`, for local control of Hive receivers on Zigbee2MQTT or ZHA. It adds a **Hive** sidebar panel with tabs, in the style of the Wiser integration, plus boost/mode entities and actions. Built for Elliot's own Hive setup. Local-first and no cloud.

Don't use the domain `hive`: HA core's cloud Hive integration already has it, and a custom integration with the same domain would override it.

## Layout

- `custom_components/hive_local/`
  - `__init__.py`: `async_setup` registers the static path, websocket commands and services once. `async_setup_entry` builds the transport, stores `HiveData` in `entry.runtime_data`, forwards the platforms and registers the panel. The panel is removed when the last entry unloads.
  - `config_flow.py`: a menu (`z2m` | `zha`), stored as `transport` (entries without it are Z2M). Z2M: base topic, then a dropdown of Hive receivers read from Z2M's retained `bridge/devices`; multi-endpoint climate exposes → `slr2`. ZHA: a `DeviceSelector(integration="zha")`; Thermostat clusters on endpoints 5 and 6 → `slr2`, unique id `zha:<ieee>`, stores `device_id`. Both store the receiver's model in `z2m_model` (e.g. `SLR1c`), despite the name.
  - `transports/`: `base.Transport` (per-channel status, resume-after-boost, default manual setpoint), `z2m.Z2MTransport` (all MQTT) and `zha.ZHATransport` (zigpy). Z2M subscribes to `<base>/<name>`, sends a `/get` refresh on start, and polls the hold duration every 60 s while boosting. ZHA is described under Key facts. `base.Transport` also keeps a boost deadline (from our own boost, else the first valid reported duration): if the receiver is still boosting `BOOST_DEADLINE_GRACE` after it, we cancel the boost (back to the pre-boost mode), and when the receiver reports no duration the time left comes from the deadline. Z2M can replace the duration with null/65535 and the receiver then boosts indefinitely (reported by the HomeDash fork of Hive Local Thermostat). Deadlines aren't persisted across HA restarts. Status changes fire `SIGNAL_STATUS` and `f"{SIGNAL_STATUS}_{entry_id}"`.
  - `transports/zha.py` is imported lazily, only for ZHA entries, so Z2M installs never import zigpy. `mqtt` and `zha` are `after_dependencies`, not `dependencies`.
  - `data.py`: `HiveData` (transport + per-channel boost defaults); `HiveConfigEntry`.
  - `climate.py` (heating: auto = schedule, heat = manual hold, off; boost is a preset; schedule "off" periods (1 °C) show the HA-side frost protection number (default 12 °C, display only, like Hive Local Thermostat) so the target stays adjustable; no target when off; setting a temperature on auto sends only `occupied_heating_setpoint` (override until the next scheduled change, as Hive Local Thermostat did; **unverified** on Elliot's receiver), mid-boost re-boosts keeping the time left, and on heat changes the hold), `water_heater.py` (hot water: schedule/on/off/boost, no temperatures) and `entity.py` + `select.py` (mode), `sensor.py` (boost remaining), `number.py` (boost duration/temperature and heating frost protection, restored, stored in HA only) and `button.py` (boost/cancel).
  - `services.py` / `services.yaml`: `boost_heating`, `boost_water`, `cancel_boost_heating`, `cancel_boost_water`. `device_id` is optional when there's only one receiver.
  - `websocket.py`: `hive_local/devices|subscribe|get|set|mode|boost|cancel_boost`.
  - Pure helpers with no HA imports, unit-tested in `tests/`: `schedule.py` (schedule parse/validate/group/payloads), `z2m.py` (state → mode/status, and mode/boost payloads), `zcl.py` (the same for raw ZCL attributes and set/get_weekly_schedule args, for ZHA) and `devices.py` (filter `bridge/devices`).
  - `const.py`: limits, boost defaults, and the **unverified** `WATER_ON` / `WATER_OFF`.
  - `frontend/hive-local-panel.js`: **built artifact**. Don't edit it. Run `npm run build` in `/frontend`.
- `frontend/src/`: React 18 panel. `main.tsx` defines the custom element (shadow DOM; `hass` kept in a getter so we don't re-render on every state change). `App.tsx` has the header, tabs and status subscription. `Overview.tsx` (dial cards with quick mode/boost buttons; `Dial.tsx` is the ring), `ScheduleEditor.tsx` (used for both heating and hot water; timelines are coloured by setpoint and today has a "now" marker) and `Controls.tsx` (Boost & mode). `api.ts` has `useSender` for websocket commands. Icons use HA's own `<ha-icon>` via `Icon.tsx`. `styles.ts` uses HA theme vars, with `--hl-*` accents layered on top.

## Key facts

- zigbee-herdsman-converters `hive.ts`: every SLR model includes `fz/tz.thermostat_weekly_schedule` and `tz.thermostat_clear_weekly_schedule`. They're just not in `exposes`.
- SLR2 is `multiEndpoint` with endpoints heat=5 and water=6, so keys are `weekly_schedule_heat` / `weekly_schedule_water` (and `system_mode_heat` etc.). SLR1/OTR1 use plain keys.
- Z2M's `get` for `weekly_schedule` sends `getWeeklySchedule` with `daystoreturn: 0xff, modetoreturn: 3`. Elliot's receiver accepts that, and also `127` / `1`.
- **Verified on Elliot's receiver (single-endpoint, plain `weekly_schedule`):** the reply arrives as one `commandGetWeeklyScheduleRsp` **per day**, all within about 1 s. Z2M publishes each one as `{"weekly_schedule": {"days": ["monday"], "transitions": [{"time": 390, "heating_setpoint": 20}, ...]}}` and always sends 6 transitions, padded with 1 °C entries. In the Z2M log, Sunday didn't appear: check whether it's genuinely missing.
- Write payload: `{"weekly_schedule[_ep]": {"dayofweek": [...], "transitions": [{"heatSetpoint": 20, "transitionTime": "06:30"}]}}`. Z2M works out the mode and the number of transitions.
- Modes (Z2M SLR2b docs): schedule = `{"system_mode": "heat", "temperature_setpoint_hold": false}` (**not** `auto`); manual = `system_mode heat` + hold `1` + `occupied_heating_setpoint` (5–32); off = `system_mode off` + hold `0`. On water, manual means "always on" and has no setpoint (`occupied_heating_setpoint_water` is always 22).
- Boost must be **one** payload: `{"system_mode":"emergency_heating","temperature_setpoint_hold_duration":30,"temperature_setpoint_hold":1,"occupied_heating_setpoint":21}`. Water boost has no setpoint. Duration is 1–360 minutes, and `65535` means not used.
- "No reply" in the panel means zero days were collected. On Z2M that's almost always a wrong friendly name or base topic.

### ZHA (zigpy 0.92 / zha 0.0.90, as pinned by HA 2026.2)

- zigpy's attribute names are `temp_setpoint_hold` (0x0023) and `temp_setpoint_hold_duration` (0x0024), not Z2M's `temperature_setpoint_hold*`. Temperatures are centi-°C.
- **Reading the schedule:** the receiver answers with one `get_weekly_schedule_response` per day, all with the request's TSN. With `expect_reply=True`, zigpy hands the first one to the request future and never shows it to listeners, so we send with `expect_reply=False` and collect every reply with a legacy `cluster.add_listener` (`cluster_command`). The scratch e2e test fails if this is flipped back.
- **State:** we listen to the cluster's `attribute_read/report/updated/written` events and rebuild status from the attribute cache. ZHA configures reporting for `system_mode`, `occupied_heating_setpoint`, `local_temperature` and `running_state`, but **not** the hold attributes. So we read all state on start and every 5 min, re-read the hold attributes 3 s after a reported mode or setpoint change (and after each of our writes), and poll while boosting.
- Modes and boost are one `write_attributes` call, in the same field order as the Z2M payload.
- **Thermostat reporting fix (`_ThermostatReporting` in `transports/zha.py`):** ZHA configures a Hive SLT's temperature (0x0402) reporting as 30 s / 900 s / 0.5 °C, and the receiver drops a thermostat it hasn't heard from in a few minutes: red light, boiler off, "No signal", about every 6 min (zigpy/zha-device-handlers#2776, fixed there with zha_toolkit `conf_report` 5/120/50 on endpoint 9). We find SLT thermostats (`zcl.is_hive_thermostat`) in the ZHA gateway, and on each temperature report (it's awake) call `configure_reporting("measured_value", 5, 120, 50)` until it's accepted, then again after `THERMOSTAT_REPORTING_REFRESH` (24 h). One watcher per thermostat across entries (`hass.data[THERMOSTATS_WATCHED]`). Reported on Elliot's OTR1 + SLT3d after moving to ZHA.
- **Channels come from the model, like Z2M:** SLR1* / OTR1 are heating only (endpoint 5), SLR2* are heating 5 + hot water 6, and unknown models go by which endpoints have a Thermostat cluster (`zcl.receiver_endpoints`). A single-channel receiver on ZHA was reported showing hot water, so it probably lists a Thermostat cluster on endpoint 6 too.
- Z2M's definitions give every Hive receiver `meta: {disableDefaultResponse: true}`, so `set_weekly_schedule` is sent the same way (`disable_default_response=True, expect_reply=False`). Errors only show up when the schedule is read back.
- If the ZHA integration reloads, it rebuilds its devices and our cluster references go stale until Hive Local is reloaded. Not handled yet.

## Status

- [x] Z2M backend + panel, built and type-checked. 20 pure tests pass.
- [x] Read works against a real receiver, once the friendly name was right.
- [x] Rename to `hive_local`, transports, entities, services and tabbed panel. Checked end to end with `pytest-homeassistant-custom-component` (HA 2026.2.3, mocked MQTT): config flow, entity states from Z2M state messages, exact boost/cancel/mode payloads, and the websocket API including a 7-day read. That test isn't in the repo, because CI only installs `pytest`.
- [x] Climate (heating) and water_heater (hot water) entities, so Z2M's discovered climate entities can be disabled. Covered by the end-to-end test.
- [ ] On real HA: add Hive Local and check the entities and the panel's Overview and Boost & mode tabs against the receiver.
- [ ] Check boost-remaining counts down. We poll `temperature_setpoint_hold_duration` every 60 s while boosting; unverified that Hive reports a decreasing value.
- [ ] Change one day, **Write**, then **Read** again, and confirm on the SLT thermostat screen.
- [ ] SLR2: read the hot water schedule and set `WATER_ON` / `WATER_OFF` to match.
- [x] GitHub repo renamed to `elliotwestlake/hive-local`, and the `manifest.json` links updated.
- [x] ZHA transport and config flow. Checked end to end (HA 2026.2.3 + zha 0.0.90) against a real zigpy `Device` with a fake radio that decodes every ZCL frame and answers like the receiver: config flow, initial reads, exact Write Attributes for boost/cancel/water boost, report → hold re-read, 7-day read, write and partial read. Also a Z2M regression test (menu flow, legacy entry without `transport`). Neither is in the repo, because CI only installs `pytest`.
- [x] ZHA on a real receiver, first step: Elliot's **OTR1** (now on ZHA with a Home Assistant Connect ZBT-2, alongside the **SLT3d** wall thermostat) set up via the ZHA flow. It showed hot water until channels were decided by model; now heating only.
- [ ] Confirm the thermostat reporting fix stops the OTR1 going red (look for the `now reports temperature` log line).
- [ ] ZHA on the OTR1: check the mode/boost entities and Overview, boost countdown, then **Read**, then **Write** one day.

## Roadmap: ZHA support + Hive Local Thermostat feature parity

Goal: one integration that works whether the receiver is on Z2M or ZHA. It should also cover what the (now retired) andrew-codechimp *Hive Local Thermostat* integration did: boost/cancel actions, boost-remaining sensors and schedule-mode switching.

1. ~~**Transport abstraction.**~~ Done. A `transports/` package with a base class:
   `async_read(channel) -> Schedule`, `async_write(channel, Schedule)`, `async_set_mode(channel, "schedule"|"manual"|"off", setpoint=None)`, `async_boost(channel, minutes, setpoint)`, `async_cancel_boost(channel)`.
   The MQTT code is in `Z2MTransport`, and the websocket handlers call `entry.runtime_data.transport`. A `ZHATransport` implements `_async_set_mode`, `_async_boost`, `async_read`, `async_write`, `async_start`/`async_stop` and calls `_update_status(channel, status)`.
2. ~~**Config flow.**~~ Done.
3. ~~**ZHATransport**~~ Done (the original plan is below; see Key facts → ZHA for what changed):
   - Get the device with `homeassistant.components.zha.helpers.async_get_zha_device_proxy(hass, device_id).device.device` (the zigpy device). Look up endpoint 5 (heat) or 6 (water) and its `thermostat` cluster. For SLR1, take the endpoint that has the thermostat cluster.
   - Write: `await cluster.set_weekly_schedule(num_transitions_for_sequence=n, day_of_week_for_sequence=SeqDayOfWeek bitmap (Sun=0x01 … Sat=0x40), mode_for_sequence=SeqMode.Heat, values=[min0, sp0*100, min1, sp1*100, ...])`. Send one call per day group, reusing `schedule.group_days`.
   - Read: attach a listener with `cluster.add_listener(obj)`, where `obj.cluster_command(tsn, command_id, args)` catches client command 0x00 `get_weekly_schedule_response`. Then call `cluster.get_weekly_schedule(days_to_return=0x7F, mode_to_return=SeqMode.Heat)`, collect replies for `READ_TIMEOUT` and decode the values in pairs.
   - Modes and boost: one `cluster.write_attributes({...})` call with `system_mode` (0x001C), `temperature_setpoint_hold` (0x0023), `temperature_setpoint_hold_duration` (0x0024) and `occupied_heating_setpoint` (0x0012, in centi-°C). Keep it as one write, because the Hive timing quirk the Z2M docs mention probably applies here too.
   - Check whether ZHA's existing climate entity for Hive needs a quirk. Don't fight it; add our own entities alongside.
4. ~~**Parity entities and actions**~~ Done for Z2M: services, boost-remaining sensors, a mode select (instead of a "follow schedule" switch), boost buttons and default boost time/temperature numbers. They're written against `Transport`, so ZHA gets them for free.
5. ~~Panel: boost controls and mode indicator~~ Done. These are the Overview and Boost & mode tabs. Future tabs could cover settings or devices.

## Conventions

- Python: HA style, type hints, `from __future__ import annotations`. Keep `schedule.py`, `z2m.py` and `devices.py` free of HA imports so it stays testable.
- Run `pytest -q tests` and `cd frontend && npm run build` before committing, and commit the rebuilt bundle.
