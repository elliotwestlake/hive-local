"""The panel's first-run walkthrough is remembered house-wide (hive_local/settings `onboarded`)."""
from homeassistant.setup import async_setup_component


async def test_onboarded_flag(hass, hass_ws_client, hass_storage):
    assert await async_setup_component(hass, "hive_local", {})
    await hass.async_block_till_done()
    client = await hass_ws_client(hass)

    await client.send_json({"id": 1, "type": "hive_local/settings"})
    msg = await client.receive_json()
    assert msg["success"], msg
    assert msg["result"]["onboarded"] is False  # a new install sees the walkthrough

    await client.send_json({"id": 2, "type": "hive_local/settings/set", "onboarded": True})
    msg = await client.receive_json()
    assert msg["success"] and msg["result"]["onboarded"] is True
    await hass.async_block_till_done()
    assert hass_storage["hive_local.settings"]["data"]["onboarded"] is True

    # "Run setup again" only opens it in the panel; finishing sets it again.
    await client.send_json({"id": 3, "type": "hive_local/settings"})
    assert (await client.receive_json())["result"]["onboarded"] is True
