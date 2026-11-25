"""Diagnostics download: what a bug report needs."""

from __future__ import annotations

from dataclasses import asdict
from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.core import HomeAssistant
from homeassistant.helpers import device_registry as dr, entity_registry as er

from .const import CONF_DEVICE_ID, DOMAIN
from .data import HiveConfigEntry
from .room_manager import DATA_ROOMS

TO_REDACT = {CONF_DEVICE_ID, "unique_id", "ieee", "identifiers", "connections", "serial_number"}


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant, entry: HiveConfigEntry
) -> dict[str, Any]:
    data = entry.runtime_data
    rooms = hass.data.get(DATA_ROOMS)
    entities = [
        {
            "entity_id": e.entity_id,
            "disabled": e.disabled_by is not None,
            "state": (s.state if (s := hass.states.get(e.entity_id)) else None),
            "attributes": dict(s.attributes) if s else None,
        }
        for e in er.async_entries_for_config_entry(er.async_get(hass), entry.entry_id)
    ]
    device = None
    if device_id := entry.data.get(CONF_DEVICE_ID):
        if zha_device := dr.async_get(hass).async_get(device_id):
            device = {
                "manufacturer": zha_device.manufacturer,
                "model": zha_device.model,
                "model_id": zha_device.model_id,
                "sw_version": zha_device.sw_version,
            }
    return {
        "entry": async_redact_data(
            {"title": entry.title, "version": entry.version, "data": dict(entry.data), "options": dict(entry.options)},
            TO_REDACT,
        ),
        "integration_version": _version(hass),
        "zha_device": device,
        "transport": async_redact_data(data.transport.diagnostics(), TO_REDACT),
        "boost_defaults": {c: asdict(d) for c, d in data.boost.items()},
        "preheat": data.preheat.diagnostics(),
        "health": data.health.diagnostics() if data.health else None,
        "entities": entities,
        "rooms": [r for r in rooms.rooms if r.get("receiver") in (None, entry.entry_id)] if rooms else None,
    }


def _version(hass: HomeAssistant) -> str | None:
    from homeassistant.loader import async_get_loaded_integration  # noqa: PLC0415

    try:
        return str(async_get_loaded_integration(hass, DOMAIN).version)
    except Exception:  # noqa: BLE001
        return None
