---
title: Troubleshooting
description: No reply from the receiver, the ZHA "receiver goes red" problem, and how to report a bug.
section: Help
order: 1
---

## "No reply" when reading the schedule

The receiver sent nothing back.

- **On Zigbee2MQTT**, this is almost always the **friendly name** or **base topic**. Snug listens on `<base topic>/<friendly name>`, so if you renamed the receiver in Zigbee2MQTT or changed the base topic, remove the receiver from Snug and add it again.
- Check the receiver has power and is online in Zigbee2MQTT or ZHA.
- Try again: the receiver can be slow to answer straight after a change.

## The receiver isn't reporting

If the Devices tab says **Waiting** for a receiver, Snug hasn't heard from it since Home Assistant started. Check it's online in Zigbee2MQTT or ZHA, and on Zigbee2MQTT check the friendly name and base topic as above.

## The receiver goes red and says "No signal" (ZHA)

On ZHA, Hive thermostats (SLT) are set to report the temperature only every 15 minutes, and the receiver drops a thermostat it hasn't heard from in a few minutes. It shows a red light and "No signal", and turns the boiler off, about every six minutes.

Snug fixes this automatically: when the thermostat next reports (it's battery powered, so it's asleep the rest of the time), Snug asks it to report at least every two minutes, and checks again every day. Look for this line in your log:

```
Hive thermostat … now reports temperature at least every 120 s
```

Credit to mikestir, who tracked it down in [zha-device-handlers#2776](https://github.com/zigpy/zha-device-handlers/issues/2776).

## A schedule change didn't stick

- Read the schedule back and compare it with the thermostat's screen.
- Snug writes only the days you changed, each padded to the receiver's six slots. If a day still comes back wrong, please [report it](#reporting-a-bug) with diagnostics.

## A boost won't end

Zigbee2MQTT can lose a boost's duration, and the receiver then boosts until something changes it. Snug keeps its own deadline for every boost and ends it if the receiver is still boosting a couple of minutes after it should have stopped, even across a restart.

## Two of everything

Zigbee2MQTT and ZHA make their own climate entities for the receiver. Once Snug works, disable those on the receiver's device page.

## Reporting a bug

[Open an issue](https://github.com/elliotwestlake/hive-local/issues/new/choose) and attach diagnostics: **Settings → Devices & services → Snug for Hive → ⋮ → Download diagnostics**. They include the receiver's state, the last schedule read with the receiver's raw replies, and Snug's entities, with addresses removed.

For more detail, turn on debug logging:

```yaml
logger:
  logs:
    custom_components.hive_local: debug
```
