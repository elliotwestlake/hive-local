"""Reading our own entities' recorded history (for Stats and pre-heat)."""

from __future__ import annotations

from datetime import datetime

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from .const import CHANNEL_HEAT, CHANNEL_WATER, DOMAIN
from .stats import Sample, sample_from_state

_ENTITY = {CHANNEL_HEAT: ("climate", "climate"), CHANNEL_WATER: ("water_heater", "water_heater")}


def channel_entity_id(hass: HomeAssistant, entry_id: str, channel: str) -> str | None:
    """Our climate (heating) or water_heater (hot water) entity for a receiver's channel."""
    platform, key = _ENTITY[channel]
    return er.async_get(hass).async_get_entity_id(platform, DOMAIN, f"{entry_id}_{channel}_{key}")


def _history(hass: HomeAssistant, entity_id: str, start: datetime, end: datetime) -> list:
    """Every recorded state (attribute changes too), plus the one in force at `start`. Executor."""
    from homeassistant.components.recorder import history  # noqa: PLC0415

    states = history.get_significant_states(
        hass,
        start,
        end,
        entity_ids=[entity_id],
        include_start_time_state=True,
        significant_changes_only=False,
        minimal_response=False,
        no_attributes=False,
    )
    return states.get(entity_id, [])


async def async_samples(
    hass: HomeAssistant, channel: str, entity_id: str, start: datetime, end: datetime
) -> list[Sample]:
    """The recorded states of a channel's entity between start and end, as stats Samples."""
    from homeassistant.components.recorder import get_instance  # noqa: PLC0415

    states = await get_instance(hass).async_add_executor_job(_history, hass, entity_id, start, end)
    return [
        sample_from_state(channel, s.last_updated.timestamp(), s.state, dict(s.attributes))
        for s in states
    ]
