"""Config flow for Hive Schedule."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers.selector import (
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
)

from .const import (
    CONF_BASE_TOPIC,
    CONF_DEVICE,
    CONF_MODEL,
    DEFAULT_BASE_TOPIC,
    DOMAIN,
    MODEL_SLR1,
    MODEL_SLR2,
)


class HiveScheduleConfigFlow(ConfigFlow, domain=DOMAIN):
    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        if user_input is not None:
            device = user_input[CONF_DEVICE].strip().strip("/")
            base = user_input[CONF_BASE_TOPIC].strip().strip("/")
            if not device:
                errors[CONF_DEVICE] = "required"
            else:
                await self.async_set_unique_id(f"{base}/{device}")
                self._abort_if_unique_id_configured()
                return self.async_create_entry(
                    title=device,
                    data={
                        CONF_DEVICE: device,
                        CONF_BASE_TOPIC: base,
                        CONF_MODEL: user_input[CONF_MODEL],
                    },
                )

        schema = vol.Schema(
            {
                vol.Required(CONF_DEVICE): TextSelector(),
                vol.Required(CONF_MODEL, default=MODEL_SLR2): SelectSelector(
                    SelectSelectorConfig(
                        options=[MODEL_SLR1, MODEL_SLR2],
                        translation_key="model",
                        mode=SelectSelectorMode.LIST,
                    )
                ),
                vol.Required(CONF_BASE_TOPIC, default=DEFAULT_BASE_TOPIC): TextSelector(),
            }
        )
        return self.async_show_form(step_id="user", data_schema=schema, errors=errors)
