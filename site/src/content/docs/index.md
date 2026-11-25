---
title: Introduction
description: What Snug is, what it needs, and how it fits alongside your Hive thermostat.
section: Start here
order: 1
---

Snug is a Home Assistant integration for **local control of Hive heating and hot water**. It talks to your Hive receiver over Zigbee, through Zigbee2MQTT or ZHA, so there's no Hive hub, no Hive account and nothing in the cloud.

It adds a **Hive** panel to Home Assistant's sidebar, plus entities and actions for automations.

## What it does

- **Heating and hot water:** Schedule, Manual and Off, a target − / +, and boost.
- **[Schedules](/docs/schedules/)** read from and written to the receiver, so they keep running without Home Assistant.
- **[Rooms](/docs/rooms/)** of Hive radiator valves, with one target per room and battery warnings.
- **[Stats](/docs/stats/)**: how long the boiler ran, the temperature outside and an estimated cost.
- **[Pre-heat](/docs/pre-heat/)** starts early, so the house is warm by the time the schedule says.
- **[Away until…](/docs/holiday/)**: holiday mode that fails safe if Home Assistant goes down.
- **[Entities and actions](/docs/entities-and-actions/)** for automations, designed to match the Hive Local Thermostat integration.

## What you need

- Home Assistant with **Zigbee2MQTT** or **ZHA**, and a Zigbee coordinator.
- A Hive receiver paired to it: SLR1, SLR1b/c/d, OTR1 (heating), or SLR2, SLR2b/c/d (heating and hot water). See [Supported hardware](/docs/hardware/).

Your Hive wall thermostat keeps working. Pair it to the same Zigbee network and it carries on talking to the receiver.

## How it works

The receiver is the box by the boiler. It holds the weekly schedule and switches the boiler, and the wall thermostat tells it the room temperature. Snug reads the receiver's state and sends it the same Zigbee commands the Hive hub would: modes, boosts and schedules.

Because the receiver does the work, your heating doesn't depend on Home Assistant. Anything time-limited that Snug starts (a boost, a pre-heat, a holiday hold) is a boost on the receiver, which ends by itself.

> Snug is early software. Reading schedules works on real receivers; writing is still being tested. Read your schedule before you change it, and check the change shows on the thermostat.

## Not affiliated with Hive

Snug is an independent community project. It isn't affiliated with, endorsed by or supported by Hive or Centrica. "Hive" is used only to describe the hardware it works with.
