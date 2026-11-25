---
title: The Hive panel
description: The Overview, Devices, Stats and Settings tabs, and each channel's own page.
section: Using Hive Local
order: 1
---

Hive Local adds **Hive** to Home Assistant's sidebar. Its tabs are **Overview**, **Devices**, **Stats** and **Settings**. On a phone they move to a tab bar along the bottom.

The panel follows your Home Assistant theme, light or dark.

## Overview

- **Quick actions** boost each channel with its defaults, or put everything back to schedule.
- **Your devices** has a card for heating, hot water and each room, with filter pills along the top.

Each card shows the mode, what it's doing and the temperature. The **Boost** button opens the boost sheet: pick a temperature (heating) and how long (30 min, 1, 2 or 3 hours, or your default). While it's boosting the sheet shows the time left and **Stop boost**, and the card says how long is left.

Tap a heating or hot water card to open its page. Tap a room card to open the room.

## Heating and hot water pages

Each channel has its own page with three tabs:

- **Control:** the target − / + (heating), Schedule, Manual or Off, Boost and, for heating, [Pre-heat](/docs/pre-heat/). Taps on − / + are gathered for a moment and sent together.
- **Schedule:** the [schedule editor](/docs/schedules/).
- **History:** the [stats](/docs/stats/) for that channel.

What changing the target does depends on the mode:

| Mode | Changing the target |
| --- | --- |
| Schedule | Overrides the temperature until the next scheduled change |
| Manual | Changes the temperature it holds |
| Boost | Boosts to the new temperature, keeping the time left |
| Away | Changes the holiday temperature |

On hot water, Manual means always on.

## Devices

A card for each receiver (its model, whether it's reporting, Zigbee2MQTT or ZHA, and links to its pages) and for each Hive radiator valve (online, its room, battery and temperature). The + button explains how to add a receiver or a valve.

## Stats

Heating history, with a tab per receiver. See [Stats and heating cost](/docs/stats/).

## Settings

- **Outside temperature:** a weather entity or temperature sensor, used by Stats.
- **Heating cost:** your boiler, gas meter and gas price.
- **Rooms:** set up and edit [rooms](/docs/rooms/).
- **Per receiver:** the heating boost's default time and temperature, frost protection, and the hot water boost's default time.
