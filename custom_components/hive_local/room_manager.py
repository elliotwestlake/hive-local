"""House-wide rooms: Hive radiator valves, an optional temperature sensor, and the
receiver whose zone heats each room.

Valves are used through their Home Assistant climate entities, so they work on ZHA
and Zigbee2MQTT alike. Only Hive valves are offered (rooms.is_hive_valve). One
RoomManager per HA, in hass.data[DATA_ROOMS], stored in .storage/hive_local.rooms.
"""

from __future__ import annotations

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

from . import valve_sensor
from .const import DOMAIN
from .rooms import RoomError, clean_room, is_hive_valve, new_room_id, suggest_rooms, summarise

STORAGE_VERSION = 1
DATA_ROOMS = f"{DOMAIN}_rooms"
# Fired when rooms are added, changed or removed.
SIGNAL_ROOMS = f"{DOMAIN}_rooms"


class RoomManager:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{DOMAIN}.rooms")
        self.rooms: list[dict[str, Any]] = []
        # valve_sensor_controller.ValveSensors, set in async_setup: each valve's use of the room sensor.
        self.valve_sensors: Any = None

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
