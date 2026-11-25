---
title: Rooms
description: Group Hive radiator valves into rooms with one target, a room temperature and battery warnings.
section: Using Hive Local
order: 3
---

A room is a set of **Hive radiator valves**, an optional temperature sensor, and the receiver whose zone heats it. Rooms appear as cards on the Overview.

Rooms work with Hive radiator valves (UK7004240) on either Zigbee2MQTT or ZHA. Hive Local uses the valves' own Home Assistant climate entities, so pair them as you would any Zigbee device first.

## Setting up rooms

Go to **Settings → Rooms**.

- **Set up rooms from your areas:** Hive Local suggests a room for each Home Assistant area that has Hive valves not yet in a room, with the area's temperature sensor if it has one. Tick the ones you want. With several receivers, choose which one heats each room.
- **Add a room:** name it, tick its valves, and optionally pick a sensor.

In the valve list, **Find** makes a valve flash its light, to tell which is which (if Home Assistant has an Identify button for it). Valves are listed with the ones in the matching area first, then valves in no room, then valves already in another room. With more than eight, there's a search box.

Tap a room in Settings to edit or delete it.

## Using a room

Tap a room's card on the Overview to open it:

- **Temperature:** from the room's sensor, or the average of its valves.
- **Target − / +** sets every valve in the room. If the valves disagree, the room shows the range.
- **Valves:** each one's temperature, target, whether it's heating, and battery.

The card's subtitle warns about a low battery (20% or less) or valves that aren't responding.

## What rooms don't do yet

Rooms set the valves' targets. They don't yet ask the boiler for heat when a room is cold, or send the room sensor's reading to the valves. Both are planned.
