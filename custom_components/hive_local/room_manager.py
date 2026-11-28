"""House-wide rooms: Hive radiator valves, an optional temperature sensor, and the
receiver whose zone heats each room.

Valves are used through their Home Assistant climate entities, so they work on ZHA
and Zigbee2MQTT alike. Only Hive valves are offered (rooms.is_hive_valve). One
RoomManager per HA, in hass.data[DATA_ROOMS], stored in .storage/hive_local.rooms.
"""

from __future__ import annotations

import logging
from typing import Any

from homeassistant.components.climate import ATTR_CURRENT_TEMPERATURE, ATTR_HVAC_ACTION
from homeassistant.const import ATTR_TEMPERATURE, STATE_UNAVAILABLE, STATE_UNKNOWN
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from . import valve_sensor
from .const import DOMAIN
from .rooms import RoomError, clean_room, is_hive_valve, new_room_id, suggest_rooms, summarise

STORAGE_VERSION = 1
DATA_ROOMS = f"{DOMAIN}_rooms"
# Fired when rooms are added, changed or removed.
_LOGGER = logging.getLogger(__name__)
SIGNAL_ROOMS = f"{DOMAIN}_rooms"

# A room's mode, as its climate entity shows it (auto / heat / off).
ROOM_SCHEDULE = "schedule"
ROOM_MANUAL = "manual"
ROOM_OFF = "off"
ROOM_MODES = (ROOM_SCHEDULE, ROOM_MANUAL, ROOM_OFF)
# A Hive valve can't switch off: "off" holds the room at frost protection, the same number the
# heating shows in its schedule's off periods (Settings → Frost protection, default 12 °C).
ROOM_OFF_TEMPERATURE = 12.0


class RoomManager:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{DOMAIN}.rooms")
        self.rooms: list[dict[str, Any]] = []
        # The last schedule read from or written to each room's valves ({room_id: {schedule, at}}),
        # so the panel can show it without waking every valve (valve_schedule.py).
        self.schedules: dict[str, dict[str, Any]] = {}
        # valve_sensor_controller.ValveSensors, set in async_setup: each valve's use of the room sensor.
        self.valve_sensors: Any = None

    async def async_load(self) -> None:
        data = await self._store.async_load()
        if data is None:
            await self._async_import_per_receiver()
            return
        self.rooms = data.get("rooms", [])
        self.schedules = data.get("schedules", {})

    async def _async_import_per_receiver(self) -> None:
        """0.3.0 kept rooms per receiver; bring them into the house-wide list."""
        for entry in self.hass.config_entries.async_entries(DOMAIN):
            old: Store[dict[str, Any]] = Store(self.hass, STORAGE_VERSION, f"{DOMAIN}.rooms.{entry.entry_id}")
            if data := await old.async_load():
                self.rooms += [room | {"receiver": entry.entry_id} for room in data.get("rooms", [])]
            await old.async_remove()
        if self.rooms:
            await self._store.async_save({"rooms": self.rooms, "schedules": self.schedules})

    async def _async_save(self) -> None:
        await self._store.async_save({"rooms": self.rooms, "schedules": self.schedules})
        async_dispatcher_send(self.hass, SIGNAL_ROOMS)

    @callback
    def cached_schedule(self, room_id: str) -> dict[str, Any] | None:
        """The room's schedule as last read from or written to its valves, with when."""
        self._room(room_id)
        return self.schedules.get(room_id)

    async def async_schedule_seen(self, room_id: str, schedule: dict[str, Any]) -> None:
        """Remember the days read from or written to the valves (days not in it are kept)."""
        if not schedule:
            return  # nothing came back: keep what we knew
        old = (self.schedules.get(room_id) or {}).get("schedule", {})
        self.schedules[room_id] = {"schedule": old | schedule, "at": dt_util.utcnow().isoformat()}
        await self._store.async_save({"rooms": self.rooms, "schedules": self.schedules})

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

    def _device_id(self, entity_id: str) -> str | None:
        entry = er.async_get(self.hass).async_get(entity_id)
        return entry.device_id if entry else None

    @callback
    def suggestions(self) -> list[dict[str, Any]]:
        """A room per area with Hive valves that aren't in a room yet (first-time setup)."""
        found = self.candidates()
        valve_devices = {self._device_id(v["entity_id"]) for v in found["valves"]} - {None}
        # A valve's own temperature sensor isn't a room sensor.
        sensors = [s for s in found["sensors"] if self._device_id(s["entity_id"]) not in valve_devices]
        taken = {v for room in self.rooms for v in room["valves"]}
        return suggest_rooms(found["valves"], sensors, taken)

    def _identify_button(self, entity_id: str) -> str | None:
        """The Identify button on the valve's device (ZHA, or Z2M if it exposes one), if any."""
        registry = er.async_get(self.hass)
        entry = registry.async_get(entity_id)
        if not entry or not entry.device_id:
            return None
        for other in er.async_entries_for_device(registry, entry.device_id):
            if other.domain == "button" and (other.device_class or other.original_device_class) == "identify":
                return other.entity_id
        return None

    async def async_identify(self, entity_id: str) -> None:
        """Make a Hive valve flash its light, to tell which one it is."""
        if not self._is_hive_valve(entity_id):
            raise RoomError("Not a Hive radiator valve")
        button = self._identify_button(entity_id)
        if button is None:
            raise RoomError("This valve can't flash its light (no Identify button in Home Assistant)")
        try:
            await self.hass.services.async_call("button", "press", {"entity_id": button}, blocking=True)
        except HomeAssistantError as err:
            raise RoomError(f"The valve didn't respond: {err}") from err

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
            "identify": self._identify_button(entity_id) is not None,
        } | (self.valve_sensors.valve_status(entity_id) if self.valve_sensors else {})

    @callback
    def status(self) -> dict[str, Any]:
        """Everything the Rooms tab shows: the receivers and every room's live state."""
        names = {r["entry_id"]: r["name"] for r in self.receivers()}
        boosts = self.hass.data.get(f"{DOMAIN}_room_boosts")  # room_boost_controller.DATA_ROOM_BOOSTS
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
                    "sensor_on_valves": room.get("sensor_on_valves", True),
                    "external_sensor": valve_sensor.room_status(
                        [v["external_sensor"] for v in valves if "external_sensor" in v]
                    ),
                    "boost": boosts.as_dict(room["id"]) if boosts else None,
                    "frost": self.frost(room["id"]),
                    "away": "away_restore" in room,
                }
                | summarise(valves, sensor.state if sensor else None)
            )
        return {"receivers": self.receivers(), "rooms": out}

    @callback
    def valves(self) -> list[dict[str, Any]]:
        """Every Hive radiator valve HA knows about, for the Devices tab: live state, area and room."""
        in_room = {v: room["name"] for room in self.rooms for v in room["valves"]}
        return [
            self._valve(c["entity_id"]) | {"area": c["area"], "room": in_room.get(c["entity_id"])}
            for c in self.candidates()["valves"]
        ]

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
        if raw.get("sensor_on_valves") is None and room_id is not None:
            # Not given (an older panel): keep the room's setting.
            raw = raw | {"sensor_on_valves": self._room(room_id).get("sensor_on_valves", True)}
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

    # --- the room's mode (its climate entity: auto / heat / off) ---------------------

    def frost(self, room_id: str) -> float:
        """The frost protection temperature of the receiver that heats the room: what "off" means
        for its valves, which can't switch off."""
        room = self._room(room_id)
        entries = self.hass.config_entries.async_loaded_entries(DOMAIN)
        entry = next((e for e in entries if e.entry_id == room.get("receiver")), entries[0] if entries else None)
        if entry is None:
            return ROOM_OFF_TEMPERATURE
        return float(entry.runtime_data.boost_defaults("heat").frost)

    def mode(self, room_id: str) -> str:
        """"schedule" (the valves follow their own schedule), "manual" (they hold the target) or "off"."""
        return self._room(room_id).get("mode", ROOM_MANUAL)

    async def async_set_mode(self, room_id: str, mode: str, *, away: bool = False) -> list[str]:
        """Change the room's mode. Returns the valves that didn't take it.

        Off: a Hive valve can't switch off, so each goes to its lowest (5 °C) and its target
        is kept to go back to. Schedule turns on the valves' own weekly schedule (#5).
        """
        from . import valve_schedule  # noqa: PLC0415 - avoid an import cycle

        if mode not in ROOM_MODES:
            raise RoomError(f"Unknown mode: {mode}")
        room = self._room(room_id)
        if not away and room.pop("away_restore", None) is not None:
            # Changed by hand while away: it stays as set when you come back.
            await self._async_save()
        before = room.get("mode", ROOM_MANUAL)
        if mode == before:
            return []
        failed: set[str] = set()
        if before == ROOM_SCHEDULE:
            failed |= set((await valve_schedule.async_set_room_schedule_mode(self.hass, self, room_id, False))["failed"])
        if mode == ROOM_OFF:
            room["off_targets"] = {v: self._target(v) for v in room["valves"]}
            failed |= set(await self.async_set_target(room_id, self.frost(room_id)))
        elif before == ROOM_OFF:
            for entity_id, target in (room.pop("off_targets", None) or {}).items():
                if target is not None and entity_id in room["valves"]:
                    failed |= set(await self._async_set_valves([entity_id], target))
        if mode == ROOM_SCHEDULE:
            failed |= set((await valve_schedule.async_set_room_schedule_mode(self.hass, self, room_id, True))["failed"])
        room["mode"] = mode
        await self._async_save()
        return sorted(failed)

    async def async_away(self, entry_id: str, away: bool) -> None:
        """Away (the holiday or the Away toggle) on a receiver: its rooms go Off (frost
        protection) and remember their mode; coming back puts each one back."""
        entries = self.hass.config_entries.async_loaded_entries(DOMAIN)
        first = entries[0].entry_id if entries else None
        for room in list(self.rooms):
            if (room.get("receiver") or first) != entry_id:
                continue
            try:
                if away and "away_restore" not in room:
                    room["away_restore"] = room.get("mode", ROOM_MANUAL)
                    await self.async_set_mode(room["id"], ROOM_OFF, away=True)
                elif not away and "away_restore" in room:
                    mode = room.pop("away_restore")
                    await self.async_set_mode(room["id"], mode, away=True)
            except Exception:  # noqa: BLE001 - one room mustn't stop the others
                _LOGGER.warning("Away: couldn't change %s", room.get("name"), exc_info=True)
        await self._async_save()

    def _target(self, entity_id: str) -> float | None:
        state = self.hass.states.get(entity_id)
        value = state.attributes.get(ATTR_TEMPERATURE) if state else None
        return float(value) if isinstance(value, (int, float)) and not isinstance(value, bool) else None

    async def async_delete_room(self, room_id: str) -> None:
        self.rooms.remove(self._room(room_id))
        self.schedules.pop(room_id, None)
        await self._async_save()

    async def async_set_target(self, room_id: str, temperature: float) -> list[str]:
        """Set every valve in the room to temperature. Returns the valves that refused."""
        return await self._async_set_valves(self._room(room_id)["valves"], temperature)

    async def _async_set_valves(self, valves: list[str], temperature: float) -> list[str]:
        failed = []
        for entity_id in valves:
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
