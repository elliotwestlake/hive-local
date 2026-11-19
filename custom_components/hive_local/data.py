"""Per-entry runtime data."""

from __future__ import annotations

from dataclasses import dataclass, field

from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.dispatcher import async_dispatcher_send

from .const import DEFAULT_BOOST_MINUTES, DEFAULT_BOOST_TEMP, DEFAULT_FROST_TEMP, SIGNAL_STATUS
from .room_manager import RoomManager
from .transports import Transport


@dataclass
class BoostDefaults:
    """Per-channel settings kept in HA, set by the number entities.

    minutes/temperature are used when a boost doesn't say otherwise; frost is the
    heating frost-protection temperature shown during schedule "off" periods.
    """

    minutes: int = DEFAULT_BOOST_MINUTES
    temperature: float = DEFAULT_BOOST_TEMP
    frost: float = DEFAULT_FROST_TEMP


@dataclass
class HiveData:
    transport: Transport
    rooms: RoomManager
    boost: dict[str, BoostDefaults] = field(default_factory=dict)

    def boost_defaults(self, channel: str) -> BoostDefaults:
        return self.boost.setdefault(channel, BoostDefaults())

    def notify_settings(self) -> None:
        """Tell entities and open panels the settings changed."""
        async_dispatcher_send(self.transport.hass, f"{SIGNAL_STATUS}_{self.transport.entry_id}")
        async_dispatcher_send(self.transport.hass, SIGNAL_STATUS)

    async def async_boost(
        self, channel: str, minutes: int | None = None, temperature: float | None = None
    ) -> None:
        defaults = self.boost_defaults(channel)
        await self.transport.async_boost(
            channel,
            minutes if minutes is not None else defaults.minutes,
            temperature if temperature is not None else defaults.temperature,
        )


type HiveConfigEntry = ConfigEntry[HiveData]
