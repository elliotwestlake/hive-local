"""Hive Schedule — edit a Hive receiver's onboard weekly schedule via Zigbee2MQTT."""

from __future__ import annotations

import logging
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from . import websocket
from .const import DOMAIN, PANEL_COMPONENT, PANEL_URL, STATIC_URL

_LOGGER = logging.getLogger(__name__)

FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.setdefault(DOMAIN, {"entries": {}, "setup": False})
    data["entries"][entry.entry_id] = entry

    if not data["setup"]:
        # Static path + websocket commands can only be registered once per HA run.
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
        )
        websocket.async_register(hass)
        data["setup"] = True

    if PANEL_URL not in hass.data.get(frontend.DATA_PANELS, {}):
        version = entry.version
        await panel_custom.async_register_panel(
            hass,
            webcomponent_name=PANEL_COMPONENT,
            frontend_url_path=PANEL_URL,
            sidebar_title="Heating Schedule",
            sidebar_icon="mdi:calendar-clock",
            # Query string busts the browser cache when the bundle changes.
            module_url=f"{STATIC_URL}/hive-schedule-panel.js?v={_bundle_mtime()}-{version}",
            embed_iframe=False,
            require_admin=False,
        )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    data = hass.data.get(DOMAIN, {})
    data.get("entries", {}).pop(entry.entry_id, None)
    if not data.get("entries"):
        frontend.async_remove_panel(hass, PANEL_URL)
    return True


def _bundle_mtime() -> int:
    try:
        return int((FRONTEND_DIR / "hive-schedule-panel.js").stat().st_mtime)
    except OSError:
        return 0
