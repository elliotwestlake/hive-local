"""Fix flows for our Repairs issues (health.py)."""

from __future__ import annotations

from typing import Any

from homeassistant import data_entry_flow
from homeassistant.components.repairs import RepairsFlow
from homeassistant.core import HomeAssistant


class ReloadFlow(RepairsFlow):
    """Reload Snug's entry for a receiver, to pick up ZHA's device again."""

    def __init__(self, entry_id: str) -> None:
        self.entry_id = entry_id

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> data_entry_flow.FlowResult:
        return await self.async_step_confirm()

    async def async_step_confirm(
        self, user_input: dict[str, Any] | None = None
    ) -> data_entry_flow.FlowResult:
        entry = self.hass.config_entries.async_get_entry(self.entry_id)
        if user_input is not None:
            if entry:
                await self.hass.config_entries.async_reload(self.entry_id)
            return self.async_create_entry(data={})
        return self.async_show_form(
            step_id="confirm",
            description_placeholders={"name": entry.title if entry else "the receiver"},
        )


async def async_create_fix_flow(
    hass: HomeAssistant, issue_id: str, data: dict[str, Any] | None
) -> RepairsFlow:
    return ReloadFlow((data or {})["entry_id"])
