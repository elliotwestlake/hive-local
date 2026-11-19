"""Rooms for one receiver: radiator valves (any climate entity) plus an optional sensor.

Everything goes through Home Assistant entities, so valves from any integration
(Zigbee2MQTT, ZHA, Tuya, ...) work. Rooms are kept in HA storage per receiver.
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

from .const import DOMAIN
from .rooms import RoomError, clean_room, new_room_id, summarise

STORAGE_VERSION = 1


def signal_rooms(entry_id: str) -> str:
    """Fired when this receiver's rooms are added, changed or removed."""
    return f"{DOMAIN}_rooms_{entry_id}"


class RoomManager:
    def __init__(self, hass: HomeAssistant, entry_id: str) -> None:
        self.hass = hass
        self.entry_id = entry_id
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{DOMAIN}.rooms.{entry_id}")
        self.rooms: list[dict[str, Any]] = []

    async def async_load(self) -> None:
        self.rooms = ((await self._store.async_load()) or {}).get("rooms", [])

    async def _async_save(self) -> None:
        await self._store.async_save({"rooms": self.rooms})
        async_dispatcher_send(self.hass, signal_rooms(self.entry_id))

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

    @callback
    def candidates(self) -> dict[str, list[dict[str, Any]]]:
        """Climate entities that could be valves (not ours), and temperature sensors."""
        registry = er.async_get(self.hass)
        valves, sensors = [], []
        for state in self.hass.states.async_all("climate"):
            entry = registry.async_get(state.entity_id)
            if entry and entry.platform == DOMAIN:
                continue  # Hive Local's own heating entity
            valves.append({"entity_id": state.entity_id, "name": state.name, "area": self._area(state.entity_id)})
        for state in self.hass.states.async_all("sensor"):
            if state.attributes.get("device_class") == "temperature":
                sensors.append({"entity_id": state.entity_id, "name": state.name, "area": self._area(state.entity_id)})
        key = lambda c: ((c["area"] or "~").lower(), c["name"].lower())  # noqa: E731
        return {"valves": sorted(valves, key=key), "sensors": sorted(sensors, key=key)}

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
    def status(self) -> list[dict[str, Any]]:
        out = []
        for room in self.rooms:
            valves = [self._valve(v) for v in room["valves"]]
            sensor = self.hass.states.get(room["sensor"]) if room.get("sensor") else None
            out.append(
                room
                | {"sensor_name": sensor.name if sensor else None, "valve_states": valves}
                | summarise(valves, sensor.state if sensor else None)
            )
        return out

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
