"""Config flow for Hive Local."""

from __future__ import annotations

import asyncio
import json
from typing import Any

import voluptuous as vol

from homeassistant.components import mqtt
from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.selector import (
    DeviceSelector,
    DeviceSelectorConfig,
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
)

from .const import (
    CONF_BASE_TOPIC,
    CONF_DEVICE,
    CONF_DEVICE_ID,
    CONF_MODEL,
    CONF_TRANSPORT,
    CONF_Z2M_MODEL,
    DEFAULT_BASE_TOPIC,
    DEVICES_TIMEOUT,
    DOMAIN,
    MODEL_SLR1,
    MODEL_SLR2,
    TRANSPORT_Z2M,
    TRANSPORT_ZHA,
)
from .devices import hive_receivers


async def _async_fetch_z2m_devices(hass: HomeAssistant, base: str) -> Any:
    """Read Z2M's retained bridge/devices list, or None if nothing arrives."""
    if not await mqtt.async_wait_for_mqtt_client(hass):
        return None
    reply: asyncio.Future[str] = hass.loop.create_future()

    @callback
    def _on_message(message) -> None:
        if not reply.done():
            reply.set_result(message.payload)

    unsub = await mqtt.async_subscribe(hass, f"{base}/bridge/devices", _on_message)
    try:
        payload = await asyncio.wait_for(reply, DEVICES_TIMEOUT)
    except TimeoutError:
        return None
    finally:
        unsub()
    try:
        return json.loads(payload)
    except (ValueError, TypeError):
        return None


class HiveScheduleConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    def __init__(self) -> None:
        self._base = DEFAULT_BASE_TOPIC
        self._receivers: dict[str, dict[str, Any]] = {}

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        return self.async_show_menu(step_id="user", menu_options=[TRANSPORT_Z2M, TRANSPORT_ZHA])

    async def async_step_z2m(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            self._base = user_input[CONF_BASE_TOPIC].strip().strip("/")
            devices = await _async_fetch_z2m_devices(self.hass, self._base)
            if devices is None:
                errors["base"] = "no_bridge"
            else:
                configured = {e.unique_id for e in self._async_current_entries()}
                self._receivers = {
                    r["name"]: r
                    for r in hive_receivers(devices)
                    if f"{self._base}/{r['name']}" not in configured
                }
                if self._receivers:
                    return await self.async_step_device()
                errors["base"] = "no_receivers"

        schema = vol.Schema(
            {vol.Required(CONF_BASE_TOPIC, default=self._base): TextSelector()}
        )
        return self.async_show_form(step_id="z2m", data_schema=schema, errors=errors)

    async def async_step_device(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if user_input is not None:
            receiver = self._receivers[user_input[CONF_DEVICE]]
            await self.async_set_unique_id(f"{self._base}/{receiver['name']}")
            self._abort_if_unique_id_configured()
            return self.async_create_entry(
                title=receiver["name"],
                data={
                    CONF_TRANSPORT: TRANSPORT_Z2M,
                    CONF_DEVICE: receiver["name"],
                    CONF_BASE_TOPIC: self._base,
                    # Z2M only suffixes keys (_heat/_water) for multi-endpoint receivers.
                    CONF_MODEL: MODEL_SLR2 if receiver["multi_endpoint"] else MODEL_SLR1,
                    CONF_Z2M_MODEL: receiver["model"],
                },
            )

        options = [
            SelectOptionDict(value=r["name"], label=f"{r['name']} ({r['model']})")
            for r in self._receivers.values()
        ]
        schema = vol.Schema(
            {
                vol.Required(CONF_DEVICE, default=options[0]["value"]): SelectSelector(
                    SelectSelectorConfig(options=options, mode=SelectSelectorMode.DROPDOWN)
                )
            }
        )
        return self.async_show_form(step_id="device", data_schema=schema)

    async def async_step_zha(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        if TRANSPORT_ZHA not in self.hass.config.components:
            return self.async_abort(reason="no_zha")
        errors: dict[str, str] = {}
        if user_input is not None:
            from .transports.zha import find_receiver

            device_id = user_input[CONF_DEVICE_ID]
            try:
                device, clusters = find_receiver(self.hass, device_id)
            except LookupError:
                errors["base"] = "not_hive"
            else:
                await self.async_set_unique_id(f"zha:{device.ieee}")
                self._abort_if_unique_id_configured()
                entry = dr.async_get(self.hass).async_get(device_id)
                return self.async_create_entry(
                    title=(entry and (entry.name_by_user or entry.name)) or device.model,
                    data={
                        CONF_TRANSPORT: TRANSPORT_ZHA,
                        CONF_DEVICE_ID: device_id,
                        CONF_MODEL: MODEL_SLR2 if len(clusters) > 1 else MODEL_SLR1,
                        CONF_Z2M_MODEL: device.model,
                    },
                )

        schema = vol.Schema(
            {
                vol.Required(CONF_DEVICE_ID): DeviceSelector(
                    DeviceSelectorConfig(integration=TRANSPORT_ZHA)
                )
            }
        )
        return self.async_show_form(step_id="zha", data_schema=schema, errors=errors)
