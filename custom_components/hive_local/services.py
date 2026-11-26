"""hive_local.boost_heating / boost_water / cancel_boost_heating / cancel_boost_water / set_holiday / cancel_holiday / set_away / cancel_away."""

from __future__ import annotations

import voluptuous as vol

from homeassistant.core import HomeAssistant, ServiceCall, callback
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv, device_registry as dr
from homeassistant.util import dt as dt_util

from .const import BOOST_MIN_TEMP, CHANNEL_HEAT, CHANNEL_WATER, DOMAIN, HEAT_MAX
from .data import HiveConfigEntry
from .schedule import ScheduleError
from .z2m import BOOST_MAX_MINUTES

ATTR_DEVICE_ID = "device_id"
ATTR_MINUTES = "minutes"
ATTR_TEMPERATURE = "temperature"
ATTR_UNTIL = "until"

_DEVICE = {vol.Optional(ATTR_DEVICE_ID): cv.string}
_MINUTES = {
    vol.Optional(ATTR_MINUTES): vol.All(vol.Coerce(int), vol.Range(1, BOOST_MAX_MINUTES))
}
BOOST_HEATING_SCHEMA = vol.Schema(
    _DEVICE
    | _MINUTES
    | {
        vol.Optional(ATTR_TEMPERATURE): vol.All(
            vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)
        )
    }
)
BOOST_WATER_SCHEMA = vol.Schema(_DEVICE | _MINUTES)
CANCEL_SCHEMA = vol.Schema(_DEVICE)
SET_HOLIDAY_SCHEMA = vol.Schema(
    _DEVICE
    | {
        vol.Required(ATTR_UNTIL): cv.datetime,
        vol.Optional(ATTR_TEMPERATURE): vol.All(
            vol.Coerce(float), vol.Range(BOOST_MIN_TEMP, HEAT_MAX)
        ),
    }
)
SET_AWAY_SCHEMA = vol.Schema(_DEVICE)


def _entries(hass: HomeAssistant, call: ServiceCall) -> list[HiveConfigEntry]:
    """The entry for `device_id`, or every receiver."""
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if device_id := call.data.get(ATTR_DEVICE_ID):
        device = dr.async_get(hass).async_get(device_id)
        entry_ids = {i[1] for i in device.identifiers if i[0] == DOMAIN} if device else set()
        entries = [e for e in entries if e.entry_id in entry_ids]
        if not entries:
            raise ServiceValidationError(f"{device_id} is not a Hive Local receiver")
    if not entries:
        raise ServiceValidationError("No Hive Local receivers are loaded")
    return entries


def _entry(hass: HomeAssistant, call: ServiceCall) -> HiveConfigEntry:
    """The entry for `device_id`, or the only receiver if there's just one."""
    entries = _entries(hass, call)
    if len(entries) != 1:
        raise ServiceValidationError("More than one receiver: pass device_id")
    return entries[0]


@callback
def async_register(hass: HomeAssistant) -> None:
    def boost(channel: str):
        async def handler(call: ServiceCall) -> None:
            try:
                await _entry(hass, call).runtime_data.async_boost(
                    channel, call.data.get(ATTR_MINUTES), call.data.get(ATTR_TEMPERATURE)
                )
            except ScheduleError as err:
                raise ServiceValidationError(str(err)) from err

        return handler

    def cancel(channel: str):
        async def handler(call: ServiceCall) -> None:
            try:
                await _entry(hass, call).runtime_data.transport.async_cancel_boost(channel)
            except ScheduleError as err:
                raise ServiceValidationError(str(err)) from err

        return handler

    async def set_holiday(call: ServiceCall) -> None:
        """Every receiver unless device_id says which. A naive `until` is local time."""
        until = call.data[ATTR_UNTIL]
        if until.tzinfo is None:
            until = until.replace(tzinfo=dt_util.get_default_time_zone())
        try:
            for entry in _entries(hass, call):
                await entry.runtime_data.async_set_holiday(until, call.data.get(ATTR_TEMPERATURE))
        except ScheduleError as err:
            raise ServiceValidationError(str(err)) from err

    async def cancel_holiday(call: ServiceCall) -> None:
        for entry in _entries(hass, call):
            await entry.runtime_data.holiday.async_cancel()

    async def set_away(call: ServiceCall) -> None:
        """Away until you're back (the Away switch): every receiver unless device_id says which."""
        try:
            for entry in _entries(hass, call):
                await entry.runtime_data.async_set_holiday(None)
        except ScheduleError as err:
            raise ServiceValidationError(str(err)) from err

    hass.services.async_register(DOMAIN, "set_holiday", set_holiday, SET_HOLIDAY_SCHEMA)
    hass.services.async_register(DOMAIN, "cancel_holiday", cancel_holiday, CANCEL_SCHEMA)
    hass.services.async_register(DOMAIN, "set_away", set_away, SET_AWAY_SCHEMA)
    hass.services.async_register(DOMAIN, "cancel_away", cancel_holiday, CANCEL_SCHEMA)
    hass.services.async_register(DOMAIN, "boost_heating", boost(CHANNEL_HEAT), BOOST_HEATING_SCHEMA)
    hass.services.async_register(DOMAIN, "boost_water", boost(CHANNEL_WATER), BOOST_WATER_SCHEMA)
    hass.services.async_register(DOMAIN, "cancel_boost_heating", cancel(CHANNEL_HEAT), CANCEL_SCHEMA)
    hass.services.async_register(DOMAIN, "cancel_boost_water", cancel(CHANNEL_WATER), CANCEL_SCHEMA)
