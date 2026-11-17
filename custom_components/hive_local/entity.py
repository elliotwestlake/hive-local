"""Base entity: one receiver channel, refreshed from the transport's status signal."""

from __future__ import annotations

from typing import Any

from homeassistant.helpers.device_registry import DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import Entity

from .const import CONF_Z2M_MODEL, DOMAIN, SIGNAL_STATUS
from .data import HiveConfigEntry


class HiveEntity(Entity):
    _attr_has_entity_name = True
    _attr_should_poll = False

    def __init__(self, entry: HiveConfigEntry, channel: str, key: str) -> None:
        self._entry = entry
        self._data = entry.runtime_data
        self._channel = channel
        self._attr_translation_key = f"{channel}_{key}"
        self._attr_unique_id = f"{entry.entry_id}_{channel}_{key}"
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry.entry_id)},
            name=entry.title,
            manufacturer="Hive",
            model=entry.data.get(CONF_Z2M_MODEL),
        )

    @property
    def _status(self) -> dict[str, Any] | None:
        return self._data.transport.status(self._channel)

    async def async_added_to_hass(self) -> None:
        await super().async_added_to_hass()
        self.async_on_remove(
            async_dispatcher_connect(
                self.hass,
                f"{SIGNAL_STATUS}_{self._entry.entry_id}",
                self.async_write_ha_state,
            )
        )


class HiveStatusEntity(HiveEntity):
    """Unavailable until the receiver has reported its state."""

    @property
    def available(self) -> bool:
        return self._status is not None


def channels(entry: HiveConfigEntry) -> tuple[str, ...]:
    return entry.runtime_data.transport.channels
