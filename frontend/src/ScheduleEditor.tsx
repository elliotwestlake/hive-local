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
import { Icon } from "./Icon";

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
            : { kind: "error", text: "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." },
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
    // Leave out schedule "off" periods (1°C) so they don't stretch the colour scale.
    const all = Object.values(schedule).flat().map((t) => t!.setpoint).filter((t) => t > limits.heat_min);
    return { lo: Math.min(15, ...all), hi: Math.max(24, ...all) };
  }, [schedule, limits.heat_min]);

  const today = DAYS[(new Date().getDay() + 6) % 7];
  const now = useNow();

  return (
    <div className="stack">
      <section className={`card ${channel}`}>
        <div className="card-head">
          <div className="title">
            <Icon name={isWater ? "water-boiler" : "radiator"} className="title-icon" />
            <div>
              <h2>{isWater ? "Hot water schedule" : "Heating schedule"}</h2>
              <div className="muted small">Stored on the receiver, so it keeps running without HA.</div>
            </div>
          </div>
          <div className="toolbar">
            {dirty && <span className="chip unsaved">Unsaved changes</span>}
            <button onClick={read} disabled={status.kind === "busy"}>
              <Icon name="download" /> Read
            </button>
            <button className="primary" onClick={write} disabled={!dirty || status.kind === "busy"}>
              <Icon name="upload" /> Write to receiver
            </button>
          </div>
        </div>

        {status.text && <div className={`status ${status.kind}`}>{status.text}</div>}

        <div className="week">
          {DAYS.map((d) => (
            <button key={d} className={`row ${d === day ? "selected" : ""}`} onClick={() => setDay(d)}>
              <span className={`day ${d === today ? "today" : ""}`}>{label(d)}</span>
              <Timeline
                transitions={schedule[d]}
                isWater={isWater}
                limits={limits}
                range={range}
                now={d === today ? now : null}
              />
            </button>
          ))}
          <div className="row hours-row">
            <span className="day" />
            <div className="hours">
              {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
                <span key={h} style={{ left: `${(h / 24) * 100}%` }}>
                  {String(h).padStart(2, "0")}
                </span>
              ))}
            </div>
          </div>
        </div>
        {!isWater && (
          <div className="legend">
            <span className="muted small">Cooler</span>
            <span className="legend-bar" />
            <span className="muted small">Warmer</span>
            <span className="legend-off" />
            <span className="muted small">Off (1°)</span>
          </div>
        )}
      </section>

      <section className="card">
        <div className="card-head">
          <h2>{day[0].toUpperCase() + day.slice(1)}</h2>
          <span className="chip">
            {transitions.length}/{max} events
          </span>
        </div>
        {transitions.length === 0 && <p className="muted">No events for this day yet.</p>}
        <div className="events">
          {transitions.map((t, i) => (
            <div className="transition" key={i}>
              <span
                className="swatch"
                style={{ background: isWater ? (t.setpoint >= limits.water_on ? "var(--hl-water)" : "var(--hl-off-fill)") : heatColor(t.setpoint, range, limits) }}
              />
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
                <div className="stepper">
                  <button className="round" onClick={() => bump(i, -0.5)} aria-label="Lower">
                    <Icon name="minus" />
                  </button>
                  <span className="stepper-value">{t.setpoint <= limits.heat_min ? "Off" : `${t.setpoint.toFixed(1)}°`}</span>
                  <button className="round" onClick={() => bump(i, 0.5)} aria-label="Raise">
                    <Icon name="plus" />
                  </button>
                </div>
              )}
              <button className="round danger" onClick={() => updateDay(transitions.filter((_, j) => j !== i))} aria-label="Remove">
                <Icon name="delete-outline" />
              </button>
            </div>
          ))}
        </div>
        <div className="actions">
          <button onClick={addTransition} disabled={transitions.length >= max}>
            <Icon name="plus" /> Add event
          </button>
          <span className="spacer" />
          <span className="muted small">Copy this day to</span>
          <div className="segmented">
            <button onClick={() => copyTo(WEEKDAYS)} disabled={!transitions.length}>Weekdays</button>
            <button onClick={() => copyTo(WEEKEND)} disabled={!transitions.length}>Weekend</button>
            <button onClick={() => copyTo([...DAYS])} disabled={!transitions.length}>All</button>
          </div>
        </div>
      </section>
    </div>
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

/** Minutes since midnight, refreshed every minute. */
function useNow() {
  const get = () => {
    const d = new Date();
    return d.getHours() * 60 + d.getMinutes();
  };
  const [now, setNow] = useState(get);
  useEffect(() => {
    const id = setInterval(() => setNow(get()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Soft amber for cooler setpoints through to deep orange-red for warmer; schedule "off" (1°C) is neutral. */
function heatColor(setpoint: number, range: { lo: number; hi: number }, limits: Limits) {
  if (setpoint <= limits.heat_min) return "var(--hl-off-fill)";
  const f = Math.min(1, Math.max(0, (setpoint - range.lo) / Math.max(1, range.hi - range.lo)));
  return `hsl(${Math.round(42 - 34 * f)} ${Math.round(88 + 4 * f)}% ${Math.round(64 - 14 * f)}%)`;
}

function Timeline({
  transitions,
  isWater,
  limits,
  range,
  now,
}: {
  transitions?: Transition[];
  isWater: boolean;
  limits: Limits;
  range: { lo: number; hi: number };
  now: number | null;
}) {
  const marker = now != null && <i className="now" style={{ left: `${(now / 1440) * 100}%` }} />;
  if (!transitions?.length) return <div className="timeline empty">{marker}</div>;
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
        const off = isWater ? t.setpoint < limits.water_on : t.setpoint <= limits.heat_min;
        return (
          <span
            key={i}
            className={off ? "off" : ""}
            title={`${t.time} → ${isWater ? (off ? "Off" : "On") : off ? "Off" : `${t.setpoint}°`}`}
            style={{
              left: `${(start / 1440) * 100}%`,
              width: `${((end - start) / 1440) * 100}%`,
              background: off ? undefined : isWater ? "var(--hl-water)" : heatColor(t.setpoint, range, limits),
            }}
          >
            {!isWater && !off && end - start >= 120 ? `${t.setpoint}°` : ""}
          </span>
        );
      })}
      {marker}
    </div>
  );
}
