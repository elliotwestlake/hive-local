"""Reading recorded history: our own entities (for Stats, pre-heat and the cost), the
outdoor temperature, and a gas meter's daily use (long-term statistics)."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from homeassistant.util.unit_conversion import TemperatureConverter

from .const import CHANNEL_HEAT, CHANNEL_WATER, DOMAIN
from .cost import kwh_per_unit
from .stats import Reading, Sample, outdoor_from_state, sample_from_state

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


async def async_outdoor(hass: HomeAssistant, entity_id: str, start: datetime, end: datetime) -> list[Reading]:
    """A weather entity's or temperature sensor's recorded temperatures, in HA's unit system."""
    from homeassistant.components.recorder import get_instance  # noqa: PLC0415

    states = await get_instance(hass).async_add_executor_job(_history, hass, entity_id, start, end)
    domain = entity_id.split(".", 1)[0]
    to_unit = hass.config.units.temperature_unit
    out = []
    for s in states:
        found = outdoor_from_state(domain, s.state, dict(s.attributes))
        value = None
        if found is not None:
            value, unit = found
            if unit and unit != to_unit and unit in TemperatureConverter.VALID_UNITS:
                value = TemperatureConverter.convert(value, unit, to_unit)
        out.append(Reading(s.last_updated.timestamp(), value))
    return out


def _gas_statistics(hass: HomeAssistant, statistic_id: str, start: datetime, end: datetime) -> tuple[str | None, list[dict[str, Any]]]:
    """A meter's unit and its daily changes. Executor."""
    from homeassistant.components.recorder.statistics import get_metadata, statistics_during_period  # noqa: PLC0415

    meta = get_metadata(hass, statistic_ids={statistic_id}).get(statistic_id)
    unit = meta[1].get("unit_of_measurement") if meta else None
    rows = statistics_during_period(hass, start, end, {statistic_id}, "day", None, {"change"})
    return unit, rows.get(statistic_id, [])


async def async_gas_per_day(hass: HomeAssistant, statistic_id: str, day_starts: list[datetime], end: datetime) -> list[float | None]:
    """kWh used each day (local days starting at `day_starts`), None where there's no data.

    From the recorder's daily statistics, so it works for an entity's own statistics and
    for ones imported by an energy supplier's integration (e.g. a smart meter's readings,
    a day or two late). Volumes are converted to kWh.
    """
    from homeassistant.components.recorder import get_instance  # noqa: PLC0415

    unit, rows = await get_instance(hass).async_add_executor_job(_gas_statistics, hass, statistic_id, day_starts[0], end)
    per = kwh_per_unit(unit) or (1.0 if unit is None else None)
    if per is None:
        return [None] * len(day_starts)
    by_day: dict[int, float] = {}
    for row in rows:
        start, change = row.get("start"), row.get("change")
        if change is None or start is None:
            continue
        t = start.timestamp() if isinstance(start, datetime) else float(start)
        by_day[round(t)] = change * per
    return [by_day.get(round(d.timestamp())) for d in day_starts]
