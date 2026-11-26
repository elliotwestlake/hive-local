"""A schedule can't be written while it's being read: the read would cross the write."""
import asyncio
from unittest.mock import patch

from homeassistant.setup import async_setup_component


async def test_no_writes_while_a_room_schedule_is_read(hass, hass_ws_client):
    assert await async_setup_component(hass, "hive_local", {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)
    started, finish = asyncio.Event(), asyncio.Event()

    async def slow_read(hass, rooms, room_id):
        started.set()
        await finish.wait()
        return {"schedule": {}, "complete": False, "differs": [], "valves": [], "limits": {}}

    async def write(hass, rooms, room_id, schedule):
        return {"schedule": schedule, "commands": 1, "valves": [], "failed": []}

    with (
        patch("custom_components.hive_local.valve_schedule.async_read_room", slow_read),
        patch("custom_components.hive_local.valve_schedule.async_write_room", write),
    ):
        await client.send_json({"id": 1, "type": "hive_local/rooms/schedule/get", "room_id": "lounge"})
        await started.wait()

        # Reading: a save and a schedule-mode change are both refused.
        await client.send_json({"id": 2, "type": "hive_local/rooms/schedule/set", "room_id": "lounge", "schedule": {}})
        msg = await client.receive_json()
        assert msg["id"] == 2 and not msg["success"] and msg["error"]["code"] == "busy"
        await client.send_json({"id": 3, "type": "hive_local/rooms/schedule/mode", "room_id": "lounge", "enabled": True})
        msg = await client.receive_json()
        assert msg["id"] == 3 and msg["error"]["code"] == "busy"
        # Another room isn't held up.
        await client.send_json({"id": 4, "type": "hive_local/rooms/schedule/set", "room_id": "bedroom", "schedule": {}})
        msg = await client.receive_json()
        assert msg["id"] == 4 and msg["success"], msg

        # Read finished: saving works again.
        finish.set()
        msg = await client.receive_json()
        assert msg["id"] == 1 and msg["success"]
        await client.send_json({"id": 5, "type": "hive_local/rooms/schedule/set", "room_id": "lounge", "schedule": {}})
        msg = await client.receive_json()
        assert msg["id"] == 5 and msg["success"], msg
