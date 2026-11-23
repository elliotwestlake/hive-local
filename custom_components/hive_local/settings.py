"""House-wide settings (not per receiver), stored in .storage/hive_local.settings.

For now that's the outdoor temperature shown in the heating history: a weather entity
or an outdoor temperature sensor. One HouseSettings per HA, in hass.data[DATA_SETTINGS].
"""

from __future__ import annotations

from typing import Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import area_registry as ar
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers import entity_registry as er
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.helpers.storage import Store

from .const import DOMAIN

STORAGE_VERSION = 1
DATA_SETTINGS = f"{DOMAIN}_settings"
# Fired when the settings change.
SIGNAL_SETTINGS = f"{DOMAIN}_settings"


class SettingsError(ValueError):
    """Raised for an invalid setting (shown to the user)."""


class HouseSettings:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self._store: Store[dict[str, Any]] = Store(hass, STORAGE_VERSION, f"{DOMAIN}.settings")
        self.outdoor_entity: str | None = None

    async def async_load(self) -> None:
        data = await self._store.async_load() or {}
        self.outdoor_entity = data.get("outdoor_entity") or None

    def _area(self, entity_id: str) -> str | None:
        entry = er.async_get(self.hass).async_get(entity_id)
        area_id = entry.area_id if entry else None
        if not area_id and entry and entry.device_id:
            device = dr.async_get(self.hass).async_get(entry.device_id)
            area_id = device.area_id if device else None
        area = ar.async_get(self.hass).async_get_area(area_id) if area_id else None
        return area.name if area else None

    @callback
    def outdoor_candidates(self) -> list[dict[str, Any]]:
        """Weather entities, then temperature sensors (not our own), for the outdoor temperature."""
        registry = er.async_get(self.hass)

        def ours(entity_id: str) -> bool:
            entry = registry.async_get(entity_id)
            return entry is not None and entry.platform == DOMAIN

        out = [
            {"entity_id": s.entity_id, "name": s.name, "area": None, "kind": "weather"}
            for s in self.hass.states.async_all("weather")
        ]
        out += [
            {"entity_id": s.entity_id, "name": s.name, "area": self._area(s.entity_id), "kind": "sensor"}
            for s in self.hass.states.async_all("sensor")
            if s.attributes.get("device_class") == "temperature" and not ours(s.entity_id)
        ]
        return sorted(out, key=lambda c: (c["kind"] != "weather", c["name"].lower()))

    @callback
    def as_dict(self) -> dict[str, Any]:
        return {"outdoor_entity": self.outdoor_entity, "outdoor_candidates": self.outdoor_candidates()}

    async def async_set_outdoor(self, entity_id: str | None) -> None:
        entity_id = entity_id or None
        if entity_id is not None and entity_id not in {c["entity_id"] for c in self.outdoor_candidates()}:
            raise SettingsError("Pick a weather entity or a temperature sensor")
        self.outdoor_entity = entity_id
        await self._store.async_save({"outdoor_entity": entity_id})
        async_dispatcher_send(self.hass, SIGNAL_SETTINGS)
