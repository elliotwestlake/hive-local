---
title: Schedules
description: Read the weekly schedule from the receiver, edit a day, and write back only what changed.
section: Using Snug
order: 2
---

The weekly schedule lives **on the receiver**, so it keeps running if Home Assistant or your network goes down. Snug reads it from the receiver and writes changes back. Heating and hot water each have their own schedule.

Open it from the heating or hot water card: **Schedule** tab.

## Reading

Choose **Read from the receiver** from the orange ⋯ button. The receiver sends one reply per day, all within a second or so. Always read before your first edit, so you start from what the receiver really holds.

If the panel says **No reply**, see [Troubleshooting](/docs/troubleshooting/).

## Editing a day

Pick a day from the circles along the top. Today is outlined, and a dot marks days with unsaved changes.

Each row is one stretch of the day, like `07:00 – 12:00`, with its temperature in the round badge. A snowflake means off (the receiver stores off as 1 °C). The last row runs into the next day's first, for example `22:30 – 06:30 (Tue)`.

- **Tap a row** to change when it starts, its temperature, or to turn it off. **Remove** deletes it.
- **Add a time** adds a new change. A day can have up to six.
- **Copy** (from the ⋯ button) copies the day to the weekdays, the weekend or every day.

On hot water, each time is on or off.

## Saving

While anything's unsaved, a bar along the bottom says **Unsaved changes**, with **Undo** and **Save**. Save writes to the receiver.

Snug only writes **the days you changed**, one day at a time. Each day is padded to the receiver's six slots (by repeating the last change, as the receiver does itself), because a shorter write leaves old entries behind.

Edits survive switching tabs, so you can check something on Control and come back.

> Writing is still being tested. After saving, read the schedule back and check the change on the thermostat's screen.

## Schedule, Manual and Off

The schedule only runs when the channel is on **Schedule**. The top of the Schedule tab says whether it's in use. On Manual the receiver holds one temperature (or, for hot water, stays on); on Off it stays off apart from frost protection.

## Frost protection

During a scheduled "off" stretch the receiver reports 1 °C, not the frost protection temperature it really uses, and doesn't say what that is. So Snug shows your **Frost protection** setting instead (12 °C unless you change it in Settings). Set it to match your thermostat. It's only for display and is never sent to the receiver.
