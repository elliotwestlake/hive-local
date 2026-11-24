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
    timed_hold_payload,
    channel_status,
    mode_payload,
    refresh_payload,
    setpoint_payload,
    suffix,
)
from .base import Schedule, Transport

_LOGGER = logging.getLogger(__name__)


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
        self._last_payload: Any = None

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
                self._last_payload = payload
                self._update_status(channel, status)

    async def _poll_boost(self, _now: datetime) -> None:
        for channel in self.channels:
            if (self.status(channel) or {}).get("mode") == MODE_BOOST:
                sfx = suffix(self._ep(channel))
                await self._publish("get", {f"temperature_setpoint_hold_duration{sfx}": ""})

    async def async_read(self, channel: str) -> tuple[Schedule, bool]:
        key = schedule_key(self._ep(channel))
        collected: Schedule = {}
        raw: list[Any] = []
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
            raw.append(payload[key])
            collected.update(parse_z2m_reply(payload[key]))
            _LOGGER.debug("weekly_schedule reply: %s", payload[key])
            if all(day in collected for day in DAYS):
                all_days.set()

        unsub = await mqtt.async_subscribe(self.hass, self._topic, _on_reply, qos=0)
        try:
            request_sent = True
            await self._publish("get", {key: ""})
            try:
                await asyncio.wait_for(all_days.wait(), READ_TIMEOUT)
            except TimeoutError:
                pass
        finally:
            unsub()

        schedule = {d: collected[d] for d in DAYS if d in collected}
        complete = len(schedule) == len(DAYS)
        self._record_read(channel, raw, schedule, complete)
        return schedule, complete

    def diagnostics(self) -> dict[str, Any]:
        return super().diagnostics() | {
            "multi_endpoint": self._multi,
            "last_state_message": self._last_payload,
        }

    async def async_write(self, channel: str, schedule: Schedule) -> int:
        payloads = to_z2m_payloads(schedule, self._ep(channel))
        for payload in payloads:
            await self._publish("set", payload)
            # Give the receiver a moment between commands; it's a sleepy-ish device.
            await asyncio.sleep(0.5)
        return len(payloads)

    async def _async_set_mode(self, channel: str, mode: str, setpoint: float | None) -> None:
        await self._publish("set", mode_payload(self._ep(channel), mode, setpoint))

    async def _async_set_setpoint(self, channel: str, setpoint: float) -> None:
        await self._publish("set", setpoint_payload(self._ep(channel), setpoint))

    async def _async_boost(self, channel: str, minutes: int, setpoint: float | None) -> None:
        await self._publish("set", boost_payload(self._ep(channel), minutes, setpoint))

    async def _async_timed_hold(self, channel: str, setpoint: float, minutes: int) -> None:
        await self._publish("set", timed_hold_payload(self._ep(channel), minutes, setpoint))

    async def async_read_hold(self, channel: str) -> dict[str, Any]:
        sfx = suffix(self._ep(channel))
        keys = (f"system_mode{sfx}", f"temperature_setpoint_hold{sfx}", f"temperature_setpoint_hold_duration{sfx}")
        await self._publish("get", {k: "" for k in keys})
        await asyncio.sleep(3)  # the reply arrives as a state message
        state = self._last_payload or {}
        return {"system_mode": state.get(keys[0]), "hold": state.get(keys[1]), "duration": state.get(keys[2])}
