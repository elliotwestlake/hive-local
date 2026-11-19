"""Hive Local — local control of Hive receivers via Zigbee2MQTT or ZHA."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend, mqtt, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.typing import ConfigType

from . import services, websocket
from .const import (
    CONF_BASE_TOPIC,
    CONF_DEVICE,
    CONF_DEVICE_ID,
    CONF_MODEL,
    CONF_TRANSPORT,
    DOMAIN,
    MODEL_SLR2,
    PANEL_COMPONENT,
    PANEL_URL,
    STATIC_URL,
    TRANSPORT_Z2M,
    TRANSPORT_ZHA,
)
from .data import HiveConfigEntry, HiveData
from .room_manager import RoomManager
from .transports import Transport, Z2MTransport

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = Path(__file__).parent / "frontend"
BUNDLE = "hive-local-panel.js"
PLATFORMS = [
    Platform.BUTTON,
    Platform.CLIMATE,
    Platform.NUMBER,
    Platform.SELECT,
    Platform.SENSOR,
    Platform.WATER_HEATER,
]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
    )
    websocket.async_register(hass)
    services.async_register(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: HiveConfigEntry) -> bool:
    transport = await _async_transport(hass, entry)
    await transport.async_start()
    rooms = RoomManager(hass, entry.entry_id)
    await rooms.async_load()
    entry.runtime_data = HiveData(transport, rooms)
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)

    if PANEL_URL not in hass.data.get(frontend.DATA_PANELS, {}):
        await panel_custom.async_register_panel(
            hass,
            webcomponent_name=PANEL_COMPONENT,
            frontend_url_path=PANEL_URL,
            sidebar_title="Hive Local",
            sidebar_icon="mdi:home-thermometer",
            # Query string busts the browser cache when the bundle changes.
            module_url=f"{STATIC_URL}/{BUNDLE}?v={_bundle_mtime()}",
            embed_iframe=False,
            require_admin=False,
        )
    return True


async def _async_transport(hass: HomeAssistant, entry: HiveConfigEntry) -> Transport:
    if entry.data.get(CONF_TRANSPORT, TRANSPORT_Z2M) == TRANSPORT_ZHA:
        # Only ZHA entries import zigpy / the ZHA integration.
        from .transports.zha import ZHATransport, find_receiver

        try:
            _device, clusters = find_receiver(hass, entry.data[CONF_DEVICE_ID])
        except LookupError as err:
            raise ConfigEntryNotReady(f"ZHA isn't ready: {err}") from err
        return ZHATransport(hass, entry.entry_id, clusters)

    if not await mqtt.async_wait_for_mqtt_client(hass):
        raise ConfigEntryNotReady("MQTT is not connected")
    return Z2MTransport(
        hass,
        entry.entry_id,
        base_topic=entry.data[CONF_BASE_TOPIC],
        device=entry.data[CONF_DEVICE],
        multi_endpoint=entry.data[CONF_MODEL] == MODEL_SLR2,
    )


async def async_unload_entry(hass: HomeAssistant, entry: HiveConfigEntry) -> bool:
    if not await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        return False
    await entry.runtime_data.transport.async_stop()
    others = [
        e for e in hass.config_entries.async_loaded_entries(DOMAIN) if e.entry_id != entry.entry_id
    ]
    if not others:
        frontend.async_remove_panel(hass, PANEL_URL)
    return True


def _bundle_mtime() -> int:
    try:
        return int((FRONTEND_DIR / BUNDLE).stat().st_mtime)
    except OSError:
        return 0
