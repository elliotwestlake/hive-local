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
    CHANNEL_HEAT,
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
from .demand_controller import Demand
from .health import DATA_VALVE_HEALTH, ReceiverHealth, ValveHealth
from .holiday_controller import Holiday
from .preheat_controller import Preheat
from .settings import DATA_SETTINGS, HouseSettings
from .room_boost_controller import DATA_ROOM_BOOSTS, RoomBoosts
from .room_manager import DATA_ROOMS, RoomManager
from .valve_sensor_controller import DATA_VALVE_SENSORS, ValveSensors
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
    Platform.SWITCH,
    Platform.WATER_HEATER,
]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    await hass.http.async_register_static_paths(
        [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
    )
    websocket.async_register(hass)
    services.async_register(hass)
    # Rooms are house-wide, not per receiver.
    rooms = RoomManager(hass)
    await rooms.async_load()
    hass.data[DATA_ROOMS] = rooms
    room_boosts = RoomBoosts(hass, rooms)
    await room_boosts.async_load()
    room_boosts.start()
    hass.data[DATA_ROOM_BOOSTS] = room_boosts
    valve_sensors = ValveSensors(hass, rooms)
    rooms.valve_sensors = valve_sensors
    valve_sensors.start()
    hass.data[DATA_VALVE_SENSORS] = valve_sensors
    settings = HouseSettings(hass)
    await settings.async_load()
    hass.data[DATA_SETTINGS] = settings
    settings.async_start()
    valves = ValveHealth(hass, rooms)
    valves.start()
    hass.data[DATA_VALVE_HEALTH] = valves
    return True


async def async_setup_entry(hass: HomeAssistant, entry: HiveConfigEntry) -> bool:
    transport = await _async_transport(hass, entry)
    await transport.async_load_boosts()
    await transport.async_start()
    preheat = Preheat(hass, transport)
    await preheat.async_start()
    holiday = Holiday(hass, transport)
    await holiday.async_start()
    preheat.blocked = lambda: CHANNEL_HEAT in holiday.away
    demand = Demand(hass, transport, preheat, holiday)
    await demand.async_start()
    # Pre-heat may start over the rooms' boost (it wins; the rooms step aside).
    preheat.overridable = demand.owns_boost
    entry.runtime_data = HiveData(transport, preheat, holiday, demand)
    entry.runtime_data.health = ReceiverHealth(hass, entry)
    entry.runtime_data.health.start()
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
        return ZHATransport(hass, entry.entry_id, clusters, entry.data[CONF_DEVICE_ID])

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
    if entry.runtime_data.health:
        entry.runtime_data.health.stop()
    await entry.runtime_data.preheat.async_stop()
    await entry.runtime_data.holiday.async_stop()
    await entry.runtime_data.demand.async_stop()
    await entry.runtime_data.transport.async_stop()
    others = [
        e for e in hass.config_entries.async_loaded_entries(DOMAIN) if e.entry_id != entry.entry_id
    ]
    if not others:
        frontend.async_remove_panel(hass, PANEL_URL)
    return True


async def async_remove_entry(hass: HomeAssistant, entry: HiveConfigEntry) -> None:
    """Delete what we saved for this receiver."""
    from homeassistant.helpers.storage import Store  # noqa: PLC0415

    from .transports.base import BOOST_STORE_VERSION  # noqa: PLC0415

    await Store(hass, BOOST_STORE_VERSION, f"{DOMAIN}.boost.{entry.entry_id}").async_remove()
    await Store(hass, 1, f"{DOMAIN}.demand.{entry.entry_id}").async_remove()


def _bundle_mtime() -> int:
    try:
        return int((FRONTEND_DIR / BUNDLE).stat().st_mtime)
    except OSError:
        return 0
