"""Tidy up the entities ZHA or Zigbee2MQTT make that Hive Local's replace (Settings → Entities).

- The receiver's own thermostat (its climate / water_heater entities on the ZHA or Z2M
  device) is **disabled**: Hive Local talks to the receiver directly, never through them.
- The climate entities of valves that are in a room are **hidden**, not disabled: rooms read
  and set the valves through them, and a disabled entity has no state. Hidden ones still
  work; they just leave dashboards and pickers to the room's own entity.

Both are marked as done by the user, so they can be switched back in HA as usual. What we
changed is kept in `.storage/hive_local.tidy`, and Undo puts back only those, and only
while they're still as we left them.
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er
from homeassistant.helpers.storage import Store

from .const import CONF_DEVICE, CONF_DEVICE_ID, CONF_TRANSPORT, DOMAIN

DATA_TIDY = f"{DOMAIN}_tidy"
STORE_VERSION = 1
RECEIVER_DOMAINS = ("climate", "water_heater")
DISABLED = "disabled_by"
HIDDEN = "hidden_by"


class Tidy:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORE_VERSION, f"{DOMAIN}.tidy")
        # What we changed: entity_id → "disabled_by" or "hidden_by".
        self.changed: dict[str, str] = {}

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.changed = {str(k): str(v) for k, v in (data.get("changed") or {}).items() if v in (DISABLED, HIDDEN)}

    # -- what there is to tidy ---------------------------------------------------------------

    def _receiver_device(self, entry: Any) -> dr.DeviceEntry | None:
        """The receiver's own device in ZHA or Zigbee2MQTT (not Hive Local's)."""
        devices = dr.async_get(self.hass)
        if entry.data.get(CONF_TRANSPORT) == "zha":
            return devices.async_get(entry.data.get(CONF_DEVICE_ID) or "")
        # Z2M names its devices after their friendly name; its identifiers carry the IEEE.
        name = entry.data.get(CONF_DEVICE)
        for device in devices.devices.values():
            if (device.name == name or device.name_by_user == name) and any(
                d == "mqtt" and v.startswith("zigbee2mqtt_0x") for d, v in device.identifiers
            ):
                return device
        return None

    def _row(self, entity: er.RegistryEntry, field: str) -> dict[str, Any]:
        state = self.hass.states.get(entity.entity_id)
        return {
            "entity_id": entity.entity_id,
            "name": (state.name if state else None) or entity.name or entity.original_name or entity.entity_id,
            "done": getattr(entity, field) is not None,
            "ours": self.changed.get(entity.entity_id) == field,
        }

    def receiver_entities(self) -> list[er.RegistryEntry]:
        registry = er.async_get(self.hass)
        out = []
        for entry in self.hass.config_entries.async_entries(DOMAIN):
            device = self._receiver_device(entry)
            if device is None:
                continue
            out += [
                e for e in er.async_entries_for_device(registry, device.id, include_disabled_entities=True)
                if e.domain in RECEIVER_DOMAINS and e.platform != DOMAIN
            ]
        return out

    def valve_entities(self) -> list[er.RegistryEntry]:
        from .room_manager import DATA_ROOMS  # noqa: PLC0415 - avoid an import cycle

        registry = er.async_get(self.hass)
        rooms = self.hass.data.get(DATA_ROOMS)
        valves = sorted({v for room in (rooms.rooms if rooms else []) for v in room["valves"]})
        return [e for v in valves if (e := registry.async_get(v)) is not None]

    def status(self) -> dict[str, Any]:
        receiver = [self._row(e, DISABLED) for e in self.receiver_entities()]
        valves = [self._row(e, HIDDEN) for e in self.valve_entities()]
        return {
            "receiver": receiver,
            "valves": valves,
            "pending": sum(not r["done"] for r in receiver + valves),
            "undoable": sum(r["ours"] and r["done"] for r in receiver + valves),
        }

    # -- doing it ----------------------------------------------------------------------------------

    async def async_apply(self) -> dict[str, Any]:
        registry = er.async_get(self.hass)
        for entity in self.receiver_entities():
            if entity.disabled_by is None:
                registry.async_update_entity(entity.entity_id, disabled_by=er.RegistryEntryDisabler.USER)
                self.changed[entity.entity_id] = DISABLED
        for entity in self.valve_entities():
            if entity.hidden_by is None:
                registry.async_update_entity(entity.entity_id, hidden_by=er.RegistryEntryHider.USER)
                self.changed[entity.entity_id] = HIDDEN
        await self._store.async_save({"changed": self.changed})
        return self.status()

    async def async_undo(self) -> dict[str, Any]:
        registry = er.async_get(self.hass)
        for entity_id, field in list(self.changed.items()):
            entity = registry.async_get(entity_id)
            if entity is not None and field == DISABLED and entity.disabled_by == er.RegistryEntryDisabler.USER:
                registry.async_update_entity(entity_id, disabled_by=None)
            elif entity is not None and field == HIDDEN and entity.hidden_by == er.RegistryEntryHider.USER:
                registry.async_update_entity(entity_id, hidden_by=None)
            del self.changed[entity_id]
        await self._store.async_save({"changed": self.changed})
        return self.status()
