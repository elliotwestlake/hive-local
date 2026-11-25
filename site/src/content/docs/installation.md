---
title: Installation
description: Install Hive Local from the Marketplace, add your receiver, and tidy up the entities Zigbee2MQTT or ZHA made.
section: Start here
order: 2
---

## 1. Pair the receiver

Pair your Hive receiver to Zigbee2MQTT or ZHA, the same way as any other Zigbee device. Pair the wall thermostat too, so it keeps talking to the receiver.

- **Zigbee2MQTT:** give the receiver a friendly name you'll recognise (for example `Receiver`). Hive Local finds it by that name.
- **ZHA:** nothing special. Hive Local finds the receiver's Thermostat clusters itself.

## 2. Install Hive Local

[Open Hive Local in the Marketplace](https://my.home-assistant.io/redirect/marketplace_repository/?owner=elliotwestlake&repository=hive-local&category=integration) (formerly HACS), install it and restart Home Assistant.

Or add `https://github.com/elliotwestlake/hive-local` to the Marketplace as a custom *Integration* repository. Without the Marketplace, copy `custom_components/hive_local` into your `config/custom_components/` folder and restart.

## 3. Add your receiver

Go to **Settings → Devices & services → Add integration → Hive Local**, then choose how the receiver is connected:

- **Zigbee2MQTT:** enter the base topic (`zigbee2mqtt` unless you changed it), then pick the receiver from the list Zigbee2MQTT reports.
- **ZHA:** pick the receiver from your ZHA devices. Choose the receiver (SLR or OTR), not the wall thermostat.

Hot water is set up automatically on receivers that have it (SLR2).

Got several receivers, for several heating zones? Add each one the same way.

## 4. Read your schedule

Open **Hive** in the sidebar, tap the heating card, go to **Schedule** and choose **Read from the receiver** from the ⋯ menu. Do this before changing anything, so the panel starts from what the receiver really has.

## 5. Tidy up

Once Hive Local works, disable Zigbee2MQTT's or ZHA's own climate entities for the receiver (on the receiver's device page), so you don't have two of everything. Keep the device itself.

## Moving from Hive Local Thermostat

Hive Local covers what Hive Local Thermostat did, with entities designed to match: boost and cancel buttons and actions, boost remaining sensors, boost duration and temperature numbers, a mode select and frost protection. Add Hive Local, update your automations to its [entities and actions](/docs/entities-and-actions/), then remove the old integration.

## Updating

The Marketplace offers new releases as updates. To try a pre-release, choose **Redownload** on Hive Local in the Marketplace and pick the version.
