---
title: Supported hardware
description: The Hive receivers, valves and thermostats Hive Local works with, on Zigbee2MQTT or ZHA.
section: Reference
order: 2
---

## Receivers

| Model | Channels |
| --- | --- |
| SLR1, SLR1b, SLR1c, SLR1d | Heating |
| OTR1 (OpenTherm) | Heating |
| SLR2, SLR2b, SLR2c, SLR2d | Heating and hot water |

Channels come from the model. A receiver Hive Local doesn't recognise is set up from the Zigbee endpoints it has: heating on endpoint 5, hot water on endpoint 6.

## Thermostats

Hive's wall thermostats (SLT) keep working alongside Hive Local. Pair them to the same Zigbee network.

On ZHA, a Hive thermostat can stop reporting often enough for the receiver, which then shows a red light and "No signal" and turns the boiler off. Hive Local fixes the thermostat's reporting automatically. See [Troubleshooting](/docs/troubleshooting/).

## Radiator valves

The Hive radiator valve (UK7004240, a rebadged Danfoss Ally) works with [Rooms](/docs/rooms/). ZHA lists it as Danfoss TRV001 or TRV003.

## Zigbee2MQTT or ZHA

Both are supported, and everything works the same way on either.

- **Zigbee2MQTT:** Hive Local talks to the receiver over MQTT, at `<base topic>/<friendly name>`.
- **ZHA:** Hive Local talks to the receiver's Thermostat clusters directly. It only loads ZHA's libraries for ZHA receivers.
