import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DAYS,
  errorText,
  type Channel,
  type Day,
  type Device,
  type Hass,
  type Limits,
  type Schedule,
  type Transition,
} from "./types";

type Status = { kind: "idle" | "busy" | "ok" | "error"; text?: string };

const WEEKDAYS: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const WEEKEND: Day[] = ["saturday", "sunday"];
const label = (d: Day) => d[0].toUpperCase() + d.slice(1, 3);
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function ScheduleEditor({
  getHass,
  device,
  channel,
  limits,
}: {
  getHass: () => Hass;
  device: Device;
  channel: Channel;
  limits: Limits;
}) {
  const [schedule, setSchedule] = useState<Schedule>({});
  const [loaded, setLoaded] = useState<Schedule>({});
  const [day, setDay] = useState<Day>("monday");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const entryId = device.entry_id;
  const isWater = channel === "water";
  const dirty = JSON.stringify(schedule) !== JSON.stringify(loaded);

  const read = useCallback(async () => {
    setStatus({ kind: "busy", text: "Reading from receiver…" });
    try {
      const r = await getHass().callWS<{ schedule: Schedule; complete: boolean }>({
        type: "hive_local/get",
        entry_id: entryId,
        channel,
      });
      setSchedule(r.schedule);
      setLoaded(r.schedule);
      const n = Object.keys(r.schedule).length;
      setStatus(
        r.complete
          ? { kind: "ok", text: "Schedule read from receiver" }
          : n
            ? { kind: "error", text: `Only got ${n}/7 days — try reading again` }
            : { kind: "error", text: "No reply. Check the receiver's friendly name matches Zigbee2MQTT." },
      );
    } catch (e) {
      setStatus({ kind: "error", text: errorText(e) });
    }
  }, [entryId, channel, getHass]);

  useEffect(() => {
    read();
  }, [read]);

  const write = async () => {
    setStatus({ kind: "busy", text: "Writing to receiver…" });
    try {
      const r = await getHass().callWS<{ commands: number; schedule: Schedule }>({
        type: "hive_local/set",
        entry_id: entryId,
        channel,
        schedule,
      });
      setSchedule(r.schedule);
      setLoaded(r.schedule);
      setStatus({
        kind: "ok",
        text: `Sent ${r.commands} command${r.commands === 1 ? "" : "s"}. Read back to confirm the receiver kept it.`,
      });
    } catch (e) {
      setStatus({ kind: "error", text: errorText(e) });
    }
  };

  const transitions = schedule[day] ?? [];
  const max = limits.max_transitions;

  const updateDay = (next: Transition[]) =>
    setSchedule((s) => ({ ...s, [day]: [...next].sort((a, b) => toMin(a.time) - toMin(b.time)) }));

  const addTransition = () => {
    const last = transitions[transitions.length - 1];
    const time = last ? nextFreeTime(transitions, toMin(last.time) + 60) : "06:00";
    const setpoint = isWater ? limits.water_on : last?.setpoint ?? 20;
    updateDay([...transitions, { time, setpoint }]);
  };

  const copyTo = (targets: Day[]) =>
    setSchedule((s) => {
      const out = { ...s };
      for (const d of targets) out[d] = transitions.map((t) => ({ ...t }));
      return out;
    });

  const range = useMemo(() => {
    const all = Object.values(schedule).flat().map((t) => t!.setpoint);
    return { lo: Math.min(5, ...all), hi: Math.max(22, ...all) };
  }, [schedule]);

  return (
    <>
      <div className="toolbar">
        <span className="spacer" />
        <button onClick={read} disabled={status.kind === "busy"}>
          Read
        </button>
        <button className="primary" onClick={write} disabled={!dirty || status.kind === "busy"}>
          Write to receiver
        </button>
      </div>

      {status.text && <div className={`status ${status.kind}`}>{status.text}</div>}

      <section className="card">
        <div className="week">
          {DAYS.map((d) => (
            <button key={d} className={`row ${d === day ? "selected" : ""}`} onClick={() => setDay(d)}>
              <span className="day">{label(d)}</span>
              <Timeline transitions={schedule[d]} isWater={isWater} limits={limits} range={range} />
            </button>
          ))}
          <div className="hours">
            {[0, 6, 12, 18, 24].map((h) => (
              <span key={h} style={{ left: `${(h / 24) * 100}%` }}>
                {String(h).padStart(2, "0")}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="card">
        <div className="card-head">
          <h2>{day[0].toUpperCase() + day.slice(1)}</h2>
          <span className="muted">
            {transitions.length}/{max} events
          </span>
        </div>
        {transitions.length === 0 && <p className="muted">No events for this day yet.</p>}
        {transitions.map((t, i) => (
          <div className="transition" key={i}>
            <input
              type="time"
              value={t.time}
              onChange={(e) =>
                updateDay(transitions.map((x, j) => (j === i ? { ...x, time: e.target.value } : x)))
              }
            />
            {isWater ? (
              <div className="segmented">
                {(["on", "off"] as const).map((v) => {
                  const sp = v === "on" ? limits.water_on : limits.water_off;
                  return (
                    <button
                      key={v}
                      className={t.setpoint === sp ? "on" : ""}
                      onClick={() => updateDay(transitions.map((x, j) => (j === i ? { ...x, setpoint: sp } : x)))}
                    >
                      {v === "on" ? "On" : "Off"}
                    </button>
                  );
                })}
                {t.setpoint !== limits.water_on && t.setpoint !== limits.water_off && (
                  <span className="muted raw" title="Value read from the receiver doesn't match WATER_ON/WATER_OFF in const.py">
                    {t.setpoint}°?
                  </span>
                )}
              </div>
            ) : (
              <div className="setpoint">
                <button className="icon" onClick={() => bump(i, -0.5)}>−</button>
                <span>{t.setpoint.toFixed(1)}°</span>
                <button className="icon" onClick={() => bump(i, 0.5)}>+</button>
              </div>
            )}
            <button className="icon danger" onClick={() => updateDay(transitions.filter((_, j) => j !== i))} aria-label="Remove">
              ✕
            </button>
          </div>
        ))}
        <div className="actions">
          <button onClick={addTransition} disabled={transitions.length >= max}>
            + Add event
          </button>
          <span className="spacer" />
          <span className="muted">Copy to:</span>
          <button onClick={() => copyTo(WEEKDAYS)} disabled={!transitions.length}>Weekdays</button>
          <button onClick={() => copyTo(WEEKEND)} disabled={!transitions.length}>Weekend</button>
          <button onClick={() => copyTo([...DAYS])} disabled={!transitions.length}>All</button>
        </div>
      </section>
    </>
  );

  function bump(i: number, delta: number) {
    updateDay(
      transitions.map((x, j) =>
        j === i
          ? { ...x, setpoint: Math.min(limits.heat_max, Math.max(limits.heat_min, Math.round((x.setpoint + delta) * 2) / 2)) }
          : x,
      ),
    );
  }
}

function nextFreeTime(ts: Transition[], start: number) {
  const used = new Set(ts.map((t) => toMin(t.time)));
  let m = Math.min(start, 23 * 60 + 30);
  while (used.has(m) && m < 1439) m += 15;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

function Timeline({
  transitions,
  isWater,
  limits,
  range,
}: {
  transitions?: Transition[];
  isWater: boolean;
  limits: Limits;
  range: { lo: number; hi: number };
}) {
  if (!transitions?.length) return <div className="timeline empty" />;
  const sorted = [...transitions].sort((a, b) => toMin(a.time) - toMin(b.time));
  // Before the first event of the day the previous day's last setpoint applies;
  // approximate with this day's last one.
  const segs = [{ time: "00:00", setpoint: sorted[sorted.length - 1].setpoint }, ...sorted];
  return (
    <div className="timeline">
      {segs.map((t, i) => {
        const start = toMin(t.time);
        const end = i + 1 < segs.length ? toMin(segs[i + 1].time) : 1440;
        if (end <= start) return null;
        const on = isWater ? t.setpoint >= limits.water_on : false;
        const heat = (t.setpoint - range.lo) / Math.max(1, range.hi - range.lo);
        return (
          <span
            key={i}
            title={`${t.time} → ${isWater ? (on ? "On" : "Off") : `${t.setpoint}°`}`}
            style={{
              left: `${(start / 1440) * 100}%`,
              width: `${((end - start) / 1440) * 100}%`,
              opacity: isWater ? (on ? 1 : 0.12) : 0.15 + 0.85 * heat,
            }}
          >
            {!isWater && end - start >= 120 ? `${t.setpoint}°` : ""}
          </span>
        );
      })}
    </div>
  );
}
