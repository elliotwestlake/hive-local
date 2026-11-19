"""Zigbee2MQTT transport: everything goes over MQTT to <base>/<friendly name>."""

from __future__ import annotations

import asyncio
import json
import logging
from datetime import datetime
from typing import Any

from homeassistant.components import mqtt
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.event import async_track_time_interval

from ..const import BOOST_POLL_INTERVAL, CHANNEL_HEAT, CHANNEL_WATER, READ_TIMEOUT
from ..schedule import DAYS, parse_z2m_reply, schedule_key, to_z2m_payloads
from ..z2m import (
    MODE_BOOST,
    boost_payload,
    channel_status,
    mode_payload,
    refresh_payload,
    setpoint_payload,
    suffix,
)
from .base import Schedule, Transport

_LOGGER = logging.getLogger(__name__)


async def async_read_schedule(
    hass: HomeAssistant, topic: str, key: str, timeout: float
) -> tuple[Schedule, bool]:
    """Ask Z2M for a device's weekly schedule (a receiver channel, or a valve).

    Replies arrive one day (or day group) at a time on the device's state topic.
    """
    collected: Schedule = {}
    all_days = asyncio.Event()
    request_sent = False

    @callback
    def _on_reply(message) -> None:
        # Ignore anything that arrives before our request (cached state).
        if not request_sent:
            return
        try:
            payload = json.loads(message.payload)
        except (ValueError, TypeError):
            return
        if not isinstance(payload, dict) or key not in payload:
            return
        # Z2M republishes the *last* reply on every state update, so merging by
        # day is safe; each getWeeklySchedule response covers one day group.
        collected.update(parse_z2m_reply(payload[key]))
        _LOGGER.debug("%s %s reply: %s", topic, key, payload[key])
        if all(day in collected for day in DAYS):
            all_days.set()

    unsub = await mqtt.async_subscribe(hass, topic, _on_reply, qos=0)
    try:
        request_sent = True
        await mqtt.async_publish(hass, f"{topic}/get", json.dumps({key: ""}))
        try:
            await asyncio.wait_for(all_days.wait(), timeout)
        except TimeoutError:
            pass
    finally:
        unsub()
    schedule = {d: collected[d] for d in DAYS if d in collected}
    return schedule, len(schedule) == len(DAYS)


async def async_write_schedule(
    hass: HomeAssistant, topic: str, schedule: Schedule, ep: str | None = None
) -> int:
    """Publish a validated schedule to <topic>/set, one payload per day."""
    payloads = to_z2m_payloads(schedule, ep)
    for payload in payloads:
        _LOGGER.debug("%s/set: %s", topic, payload)
        await mqtt.async_publish(hass, f"{topic}/set", json.dumps(payload))
        # Give the device a moment between commands.
        await asyncio.sleep(0.5)
    return len(payloads)


class Z2MTransport(Transport):
    def __init__(
        self,
        hass: HomeAssistant,
        entry_id: str,
        *,
        base_topic: str,
        device: str,
        multi_endpoint: bool,
    ) -> None:
        super().__init__(
            hass,
            entry_id,
            (CHANNEL_HEAT, CHANNEL_WATER) if multi_endpoint else (CHANNEL_HEAT,),
        )
        self._topic = f"{base_topic}/{device}"
        self._multi = multi_endpoint
        self._unsubs: list = []

    def _ep(self, channel: str) -> str | None:
        """SLR1 is single-endpoint (no suffix); SLR2 uses _heat/_water."""
        self.check_channel(channel)
        return channel if self._multi else None

    async def _publish(self, verb: str, payload: dict[str, Any]) -> None:
        _LOGGER.debug("%s/%s: %s", self._topic, verb, payload)
        await mqtt.async_publish(self.hass, f"{self._topic}/{verb}", json.dumps(payload))

    async def async_start(self) -> None:
        self._unsubs.append(
            await mqtt.async_subscribe(self.hass, self._topic, self._on_state, qos=0)
        )
        self._unsubs.append(
            async_track_time_interval(self.hass, self._poll_boost, BOOST_POLL_INTERVAL)
        )
        # Z2M doesn't retain device state by default, so ask for it.
        for channel in self.channels:
            await self._publish("get", refresh_payload(self._ep(channel)))

    async def async_stop(self) -> None:
        self._clear_deadlines()
        while self._unsubs:
            self._unsubs.pop()()

    @callback
    def _on_state(self, message) -> None:
        try:
            payload = json.loads(message.payload)
        except (ValueError, TypeError):
            return
        for channel in self.channels:
            if (status := channel_status(payload, self._ep(channel))) is not None:
                self._update_status(channel, status)

    async def _poll_boost(self, _now: datetime) -> None:
        for channel in self.channels:
            if (self.status(channel) or {}).get("mode") == MODE_BOOST:
                sfx = suffix(self._ep(channel))
                await self._publish("get", {f"temperature_setpoint_hold_duration{sfx}": ""})

    async def async_read(self, channel: str) -> tuple[Schedule, bool]:
        return await async_read_schedule(
            self.hass, self._topic, schedule_key(self._ep(channel)), READ_TIMEOUT
        )

    async def async_write(self, channel: str, schedule: Schedule) -> int:
        return await async_write_schedule(self.hass, self._topic, schedule, self._ep(channel))

    async def _async_set_mode(self, channel: str, mode: str, setpoint: float | None) -> None:
        await self._publish("set", mode_payload(self._ep(channel), mode, setpoint))

    async def _async_set_setpoint(self, channel: str, setpoint: float) -> None:
        await self._publish("set", setpoint_payload(self._ep(channel), setpoint))

    async def _async_boost(self, channel: str, minutes: int, setpoint: float | None) -> None:
        await self._publish("set", boost_payload(self._ep(channel), minutes, setpoint))
