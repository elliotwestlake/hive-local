"""House-wide rooms: Hive radiator valves, an optional temperature sensor, and the
receiver whose zone heats each room.

Valves are used through their Home Assistant climate entities, so they work on ZHA
and Zigbee2MQTT alike. Only Hive valves are offered (rooms.is_hive_valve). One
RoomManager per HA, in hass.data[DATA_ROOMS], stored in .storage/hive_local.rooms.
"""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any

from homeassistant.components.climate import ATTR_CURRENT_TEMPERATURE, ATTR_HVAC_ACTION
from homeassistant.const import ATTR_TEMPERATURE, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.event import async_call_later, async_track_time_interval
from homeassistant.helpers.storage import Store

from .const import DOMAIN, MAX_TRANSITIONS
from .rooms import RoomError, clean_room, is_hive_valve, new_room_id, summarise
from .schedule import validate
from .valves import async_valve
from .zcl import VALVE_MAX, VALVE_MIN

_LOGGER = logging.getLogger(__name__)
# ZHA only sets a valve's clock at pairing, without daylight saving; refresh it.
CLOCK_INTERVAL = timedelta(hours=12)

STORAGE_VERSION = 1
DATA_ROOMS = f"{DOMAIN}_rooms"
# Fired when rooms are added, changed or removed.
SIGNAL_ROOMS = f"{DOMAIN}_rooms"


class RoomManager:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{DOMAIN}.rooms")
        self.rooms: list[dict[str, Any]] = []

    async def async_load(self) -> None:
        data = await self._store.async_load()
        if data is None:
            await self._async_import_per_receiver()
            return
        self.rooms = data.get("rooms", [])

    async def _async_import_per_receiver(self) -> None:
        """0.3.0 kept rooms per receiver; bring them into the house-wide list."""
        for entry in self.hass.config_entries.async_entries(DOMAIN):
            old: Store[dict[str, Any]] = Store(self.hass, STORAGE_VERSION, f"{DOMAIN}.rooms.{entry.entry_id}")
            if data := await old.async_load():
                self.rooms += [room | {"receiver": entry.entry_id} for room in data.get("rooms", [])]
            await old.async_remove()
        if self.rooms:
            await self._store.async_save({"rooms": self.rooms})

    async def _async_save(self) -> None:
        await self._store.async_save({"rooms": self.rooms})
        async_dispatcher_send(self.hass, SIGNAL_ROOMS)

    @callback
    def receivers(self) -> list[dict[str, str]]:
        """Hive Local receivers (each one a heating zone), in setup order."""
        return [
            {"entry_id": e.entry_id, "name": e.title}
            for e in self.hass.config_entries.async_entries(DOMAIN)
        ]

    def _room(self, room_id: str) -> dict[str, Any]:
        for room in self.rooms:
            if room["id"] == room_id:
                return room
        raise RoomError("That room no longer exists")

    # --- what can go in a room --------------------------------------------------

    def _area(self, entity_id: str) -> str | None:
        entry = er.async_get(self.hass).async_get(entity_id)
        area_id = entry.area_id if entry else None
        if not area_id and entry and entry.device_id:
            device = dr.async_get(self.hass).async_get(entry.device_id)
            area_id = device.area_id if device else None
        area = ar.async_get(self.hass).async_get_area(area_id) if area_id else None
        return area.name if area else None

    def _is_hive_valve(self, entity_id: str) -> bool:
        entry = er.async_get(self.hass).async_get(entity_id)
        device = dr.async_get(self.hass).async_get(entry.device_id) if entry and entry.device_id else None
        return device is not None and is_hive_valve(device.model, device.model_id)

    @callback
    def candidates(self) -> dict[str, list[dict[str, Any]]]:
        """Hive radiator valves' climate entities, temperature sensors, and receivers."""
        valves, sensors = [], []
        for state in self.hass.states.async_all("climate"):
            if not self._is_hive_valve(state.entity_id):
                continue
            valves.append({"entity_id": state.entity_id, "name": state.name, "area": self._area(state.entity_id)})
        for state in self.hass.states.async_all("sensor"):
            if state.attributes.get("device_class") == "temperature":
                sensors.append({"entity_id": state.entity_id, "name": state.name, "area": self._area(state.entity_id)})
        key = lambda c: ((c["area"] or "~").lower(), c["name"].lower())  # noqa: E731
        return {"valves": sorted(valves, key=key), "sensors": sorted(sensors, key=key), "receivers": self.receivers()}

    # --- live state ----------------------------------------------------------------

    def _battery_entity(self, entity_id: str) -> str | None:
        """The battery sensor on the same device as this valve, if any."""
        registry = er.async_get(self.hass)
        entry = registry.async_get(entity_id)
        if not entry or not entry.device_id:
            return None
        for other in er.async_entries_for_device(registry, entry.device_id):
            if other.domain == "sensor" and (other.device_class or other.original_device_class) == "battery":
                return other.entity_id
        return None

    def _valve(self, entity_id: str) -> dict[str, Any]:
        state = self.hass.states.get(entity_id)
        available = state is not None and state.state not in (STATE_UNAVAILABLE, STATE_UNKNOWN)
        battery_id = self._battery_entity(entity_id)
        battery = self.hass.states.get(battery_id) if battery_id else None
        return {
            "entity_id": entity_id,
            "name": state.name if state else entity_id,
            "available": available,
            "current_temperature": state.attributes.get(ATTR_CURRENT_TEMPERATURE) if state else None,
            "target": state.attributes.get(ATTR_TEMPERATURE) if state else None,
            "hvac_action": state.attributes.get(ATTR_HVAC_ACTION) if state else None,
            "battery": battery.state if battery else None,
            "battery_entity": battery_id,
        }

    @callback
    def status(self) -> dict[str, Any]:
        """Everything the Rooms tab shows: the receivers and every room's live state."""
        names = {r["entry_id"]: r["name"] for r in self.receivers()}
        out = []
        for room in self.rooms:
            valves = [self._valve(v) for v in room["valves"]]
            sensor = self.hass.states.get(room["sensor"]) if room.get("sensor") else None
            out.append(
                room
                | {
                    "sensor_name": sensor.name if sensor else None,
                    "receiver_name": names.get(room.get("receiver")),
                    "valve_states": valves,
                }
                | summarise(valves, sensor.state if sensor else None)
            )
        return {"receivers": self.receivers(), "rooms": out}

    @callback
    def tracked_entities(self) -> set[str]:
        """Entities whose changes affect the rooms' status (valves, sensors, batteries)."""
        entities: set[str] = set()
        for room in self.rooms:
            entities.update(room["valves"])
            if room.get("sensor"):
                entities.add(room["sensor"])
            entities.update(b for v in room["valves"] if (b := self._battery_entity(v)))
        return entities

    # --- changes -------------------------------------------------------------------

    async def async_save_room(self, raw: dict[str, Any], room_id: str | None = None) -> dict[str, Any]:
        found = self.candidates()
        room = clean_room(
            raw,
            known_valves={v["entity_id"] for v in found["valves"]},
            known_sensors={s["entity_id"] for s in found["sensors"]},
            receivers=[r["entry_id"] for r in self.receivers()],
        )
        if room_id is None:
            room = {"id": new_room_id({r["id"] for r in self.rooms})} | room
            self.rooms.append(room)
        else:
            existing = self._room(room_id)
            existing.update(room)
            room = existing
        await self._async_save()
        return room

    async def async_delete_room(self, room_id: str) -> None:
        self.rooms.remove(self._room(room_id))
        await self._async_save()

    async def async_set_target(self, room_id: str, temperature: float) -> list[str]:
        """Set every valve in the room to temperature. Returns the valves that refused."""
        failed = []
        for entity_id in self._room(room_id)["valves"]:
            try:
                await self.hass.services.async_call(
                    "climate",
                    "set_temperature",
                    {"entity_id": entity_id, ATTR_TEMPERATURE: temperature},
                    blocking=True,
                )
            except HomeAssistantError:
                failed.append(entity_id)
        return failed

    # --- schedules on the valves -------------------------------------------------

    async def async_read_schedule(self, room_id: str) -> dict[str, Any]:
        """Read the room's schedule from its first valve that answers."""
        room = self._room(room_id)
        problems = []
        for entity_id in room["valves"]:
            try:
                valve = async_valve(self.hass, entity_id)
                schedule, complete = await valve.async_read_schedule()
            except HomeAssistantError as err:
                problems.append(str(err))
                continue
            if schedule:
                room["schedule"] = schedule
                await self._async_save()
                return {"schedule": schedule, "complete": complete, "valve": valve.name}
            problems.append(f"{valve.name} didn't answer")
        raise HomeAssistantError(
            "No valve answered. Battery valves can take a minute to wake up; try again. "
            + "; ".join(problems)
        )

    async def async_write_schedule(self, room_id: str, schedule: dict[str, Any]) -> dict[str, Any]:
        """Write the given days to every valve in the room and make them follow it.

        Each valve gets its clock set first (it runs the schedule on its own clock).
        Returns per-valve results; one asleep valve doesn't stop the others.
        """
        room = self._room(room_id)
        clean = validate(
            schedule, max_transitions=MAX_TRANSITIONS, min_setpoint=VALVE_MIN, max_setpoint=VALVE_MAX
        )
        results: dict[str, str] = {}
        for entity_id in room["valves"]:
            name = entity_id
            try:
                valve = async_valve(self.hass, entity_id)
                name = valve.name
                await valve.async_set_clock()
                await valve.async_write_schedule(clean)
                await valve.async_follow_schedule()
                results[name] = "ok"
            except HomeAssistantError as err:
                results[name] = str(err)
        if any(r == "ok" for r in results.values()):
            room["schedule"] = {**room.get("schedule", {}), **clean}
            await self._async_save()
        return {"schedule": clean, "results": results}

    @callback
    def async_start(self) -> None:
        """Keep ZHA valves' clocks right: shortly after start, then every 12 hours."""
        async_call_later(self.hass, 120, self._async_set_clocks)
        async_track_time_interval(self.hass, self._async_set_clocks, CLOCK_INTERVAL)

    async def _async_set_clocks(self, _now: datetime | None = None) -> None:
        for room in self.rooms:
            for entity_id in room["valves"]:
                try:
                    await async_valve(self.hass, entity_id).async_set_clock()
                except HomeAssistantError as err:
                    _LOGGER.debug("Couldn't set %s's clock: %s", entity_id, err)
