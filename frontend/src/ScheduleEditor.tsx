import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DAYS,
  errorText,
  type Channel,
  type Day,
  type Device,
  type Hass,
  type Limits,
  type Mode,
  type Schedule,
  type Transition,
} from "./types";
import { Icon } from "./Icon";

type Status = { kind: "idle" | "busy" | "ok" | "error"; text?: string };

const WEEKDAYS: Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const WEEKEND: Day[] = ["saturday", "sunday"];
const label = (d: Day) => d[0].toUpperCase() + d.slice(1, 3);
/**
 * Where a schedule is read from and written to. The receiver's channel by default; a
 * room passes one for its valves (RoomSchedule.tsx).
 */
export interface ScheduleSource {
  /** What it's stored on, for messages: "receiver", "valves". */
  noun: string;
  read: () => Promise<{ schedule: Schedule; complete: boolean }>;
  /** Write the changed days; note replaces the usual "Wrote …" message. */
  write: (changed: Schedule) => Promise<{ schedule: Schedule; note?: string; error?: boolean }>;
  /** The line at the top, instead of the receiver's mode. */
  statusLine?: string;
  /** Inside a dialog: the ⋯ button and the save bar stick to the dialog, not the page. */
  embedded?: boolean;
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function ScheduleEditor({
  getHass,
  device,
  channel,
  limits,
  mode,
  preheatFor,
  demandFor,
  source,
}: {
  getHass: () => Hass;
  device?: Device;
  channel?: Channel;
  limits: Limits;
  mode?: Mode | null;
  /** "06:30" while pre-heating for that change. */
  preheatFor?: string | null;
  /** "Bedroom" while rooms are calling for heat. */
  demandFor?: string | null;
  source?: ScheduleSource;
}) {
  const [schedule, setSchedule] = useState<Schedule>({});
  const [loaded, setLoaded] = useState<Schedule>({});
  const [day, setDay] = useState<Day>("monday");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const entryId = device?.entry_id;
  const isWater = channel === "water";
  const dirty = JSON.stringify(schedule) !== JSON.stringify(loaded);
  const noun = source?.noun ?? "receiver";

  const read = useCallback(async () => {
    setStatus({ kind: "busy", text: `Reading from the ${noun}…` });
    try {
      const r = source
        ? await source.read()
        : await getHass().callWS<{ schedule: Schedule; complete: boolean }>({
            type: "hive_local/get",
            entry_id: entryId,
            channel,
          });
      setSchedule(r.schedule);
      setLoaded(r.schedule);
      const n = Object.keys(r.schedule).length;
      setStatus(
        r.complete
          ? { kind: "ok", text: `Schedule read from the ${noun}` }
          : n
            ? { kind: "error", text: `Only got ${n}/7 days — try reading again` }
            : { kind: "error", text: source ? `No reply from the ${noun}. They sleep between checks; try again in a minute.` : "No reply. On Zigbee2MQTT, check the receiver's friendly name; on ZHA, check the receiver is online." },
      );
    } catch (e) {
      setStatus({ kind: "error", text: errorText(e) });
    }
    // source is made once per dialog; reading again on every render would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryId, channel, getHass, noun]);

  useEffect(() => {
    read();
  }, [read]);

  // Success messages fade after a few seconds; errors stay until the next action.
  useEffect(() => {
    if (status.kind !== "ok") return;
    const id = setTimeout(() => setStatus({ kind: "idle" }), 4000);
    return () => clearTimeout(id);
  }, [status]);

  const write = async () => {
    // Only the days that changed since the last read/write go to the receiver, so a
    // problem with one day can't touch the rest of the week.
    const changed = Object.fromEntries(
      DAYS.filter((d) => JSON.stringify(schedule[d]) !== JSON.stringify(loaded[d]) && schedule[d]?.length).map((d) => [d, schedule[d]]),
    ) as Schedule;
    if (!Object.keys(changed).length) return;
    setStatus({ kind: "busy", text: `Writing to the ${noun}…` });
    try {
      const r: { schedule: Schedule; note?: string; error?: boolean } = source
        ? await source.write(changed)
        : await getHass().callWS<{ commands: number; schedule: Schedule }>({
            type: "hive_local/set",
            entry_id: entryId,
            channel,
            schedule: changed,
          });
      const merged = { ...schedule, ...r.schedule };
      setSchedule(merged);
      setLoaded(merged);
      const names = Object.keys(r.schedule).map((d) => d[0].toUpperCase() + d.slice(1, 3));
      setStatus({
        kind: r.error ? "error" : "ok",
        text: r.note ?? `Wrote ${names.join(", ")}. Read back to confirm the ${noun} kept it.`,
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
  const [editing, setEditing] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const changedDays = DAYS.filter((d) => JSON.stringify(schedule[d]) !== JSON.stringify(loaded[d]));

  // Each slot runs until the next one; the day's last runs until the next day's first.
  const nextDay = DAYS[(DAYS.indexOf(day) + 1) % 7];
  const nextFirst = (schedule[nextDay] ?? [])[0]?.time;
  const isOff = (t: Transition) => (isWater ? t.setpoint < limits.water_on : t.setpoint <= limits.heat_min);

  let statusLine = "Stored on the receiver, so it keeps running without Home Assistant.";
  if (source?.statusLine) statusLine = source.statusLine;
  else if (mode === "schedule") statusLine = "Your schedule is running.";
  else if (mode === "manual") statusLine = `Your schedule isn't being used: ${isWater ? "hot water is always on" : "heating is on Manual"}.`;
  else if (mode === "off") statusLine = `Your schedule isn't being used: ${isWater ? "hot water" : "heating"} is off.`;
  else if (mode === "boost" && preheatFor) statusLine = `Your schedule is running, starting early so it's warm by ${preheatFor}.`;
  else if (mode === "boost" && demandFor) statusLine = `Your schedule is running, with extra heat for ${demandFor}.`;
  else if (mode === "boost") statusLine = "Boosting now. Your schedule carries on after the boost.";

  return (
    <div className={`sched ${source?.embedded ? "embedded" : ""}`}>
      <p className="sched-status muted">{statusLine}</p>

      <div className="sched-days" role="tablist" aria-label="Day">
        {DAYS.map((d) => (
          <button
            key={d}
            role="tab"
            aria-selected={d === day}
            aria-label={d}
            className={`sched-day ${d === day ? "on" : ""} ${d === today ? "today" : ""}`}
            onClick={() => { setDay(d); setEditing(null); }}
          >
            {d[0].toUpperCase()}
            {changedDays.includes(d) && <i className="sched-dot" aria-label="changed" />}
          </button>
        ))}
      </div>

      {status.text && status.kind !== "idle" && <div className={`status ${status.kind}`}>{status.text}</div>}

      <div className="sched-list">
        {transitions.length === 0 && <p className="muted sched-empty">Nothing scheduled on {day[0].toUpperCase() + day.slice(1)} yet.</p>}
        {transitions.map((t, i) => {
          const end = transitions[i + 1]?.time ?? (nextFirst ? `${nextFirst} (${label(nextDay)})` : "00:00");
          const off = isOff(t);
          return (
            <button key={i} className="slot" onClick={() => setEditing(i)}>
              <span
                className={`slot-badge ${off ? "off" : ""}`}
                style={off ? undefined : { borderColor: isWater ? "var(--hl-brand)" : heatColor(t.setpoint, range, limits) }}
              >
                {off ? <Icon name={isWater ? "power" : "snowflake"} /> : isWater ? "On" : `${t.setpoint}°`}
              </span>
              <span className="slot-time">{t.time} – {end}</span>
              <Icon name="chevron-right" className="slot-chev" />
            </button>
          );
        })}
        <button className="slot slot-add" onClick={() => { addTransition(); setEditing(transitions.length); }} disabled={transitions.length >= max}>
          <span className="slot-badge add"><Icon name="plus" /></span>
          <span className="slot-time">{transitions.length >= max ? `${max} times a day at most` : "Add a time"}</span>
        </button>
      </div>

      {dirty && (
        <div className="sched-save">
          <Icon name="pencil-outline" className="sched-save-icon" />
          <span className="sched-changed" title={`Changed: ${changedDays.map(label).join(", ")}`}>
            Unsaved changes
          </span>
          <button className="sched-undo" onClick={() => { setSchedule(loaded); setEditing(null); }}>Undo</button>
          <button className="sched-write" onClick={write} disabled={status.kind === "busy"}>
            Save
          </button>
        </div>
      )}

      <div className={`fab-wrap ${dirty ? "raised" : ""}`}>
        {menu && (
          <>
            <div className="fab-backdrop" onClick={() => setMenu(false)} />
            <div className="fab-menu" role="menu">
              <button role="menuitem" onClick={() => { setMenu(false); read(); }} disabled={status.kind === "busy"}>
                <Icon name="download" /> Read from the {noun}
              </button>
              <button role="menuitem" onClick={() => { setMenu(false); copyTo(WEEKDAYS); }} disabled={!transitions.length}>
                <Icon name="content-copy" /> Copy {label(day)} to weekdays
              </button>
              <button role="menuitem" onClick={() => { setMenu(false); copyTo(WEEKEND); }} disabled={!transitions.length}>
                <Icon name="content-copy" /> Copy {label(day)} to the weekend
              </button>
              <button role="menuitem" onClick={() => { setMenu(false); copyTo([...DAYS]); }} disabled={!transitions.length}>
                <Icon name="content-copy" /> Copy {label(day)} to every day
              </button>
            </div>
          </>
        )}
        <button className="fab" aria-label="More" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <Icon name={menu ? "close" : "dots-horizontal"} />
        </button>
      </div>

      {editing != null && transitions[editing] && (
        <SlotSheet
          slot={transitions[editing]}
          dayName={day[0].toUpperCase() + day.slice(1)}
          isWater={isWater}
          limits={limits}
          canDelete
          onChange={(next) => updateDay(transitions.map((x, j) => (j === editing ? next : x)))}
          onDelete={() => { updateDay(transitions.filter((_, j) => j !== editing)); setEditing(null); }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function nextFreeTime(ts: Transition[], start: number) {
  const used = new Set(ts.map((t) => toMin(t.time)));
  let m = Math.min(start, 23 * 60 + 30);
  while (used.has(m) && m < 1439) m += 15;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}

/** Soft amber for cooler setpoints through to deep orange-red for warmer; schedule "off" (1°C) is neutral. */
function heatColor(setpoint: number, range: { lo: number; hi: number }, limits: Limits) {
  if (setpoint <= limits.heat_min) return "var(--hl-off-fill)";
  const f = Math.min(1, Math.max(0, (setpoint - range.lo) / Math.max(1, range.hi - range.lo)));
  return `hsl(${Math.round(42 - 34 * f)} ${Math.round(88 + 4 * f)}% ${Math.round(64 - 14 * f)}%)`;
}

/** Edit one time slot: when it starts, and the temperature (or on/off for hot water). Changes apply as you go. */
function SlotSheet({
  slot,
  dayName,
  isWater,
  limits,
  canDelete,
  onChange,
  onDelete,
  onClose,
}: {
  slot: Transition;
  dayName: string;
  isWater: boolean;
  limits: Limits;
  canDelete: boolean;
  onChange: (t: Transition) => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  const off = isWater ? slot.setpoint < limits.water_on : slot.setpoint <= limits.heat_min;
  const clamp = (t: number) => Math.min(limits.heat_max, Math.max(5, Math.round(t * 2) / 2));
  const warm = off ? 20 : slot.setpoint;

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet heat" role="dialog" aria-modal="true" aria-label={`Edit ${dayName} at ${slot.time}`} onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        <div className="sheet-title">
          <h2>{slot.time}</h2>
          <span className="muted">{dayName}</span>
        </div>

        <div className="sheet-field">
          <span className="sheet-label">Starts at</span>
          <input className="sheet-time" type="time" value={slot.time} onChange={(e) => e.target.value && onChange({ ...slot, time: e.target.value })} />
        </div>

        <div className="sheet-field">
          <span className="sheet-label">{isWater ? "Hot water" : "Heating"}</span>
          <div className="sheet-lengths">
            <button className={!off ? "on" : ""} onClick={() => onChange({ ...slot, setpoint: isWater ? limits.water_on : warm })}>
              {isWater ? "On" : "Heat to"}
            </button>
            <button className={off ? "on" : ""} onClick={() => onChange({ ...slot, setpoint: isWater ? limits.water_off : limits.heat_min })}>
              Off
            </button>
          </div>
        </div>

        {!isWater && !off && (
          <div className="sheet-field">
            <span className="sheet-label">Temperature</span>
            <div className="sheet-temp">
              <button className="round sheet-step" onClick={() => onChange({ ...slot, setpoint: clamp(slot.setpoint - 0.5) })} aria-label="Lower"><Icon name="minus" /></button>
              <span className="sheet-temp-value">{slot.setpoint.toFixed(1)}°</span>
              <button className="round sheet-step" onClick={() => onChange({ ...slot, setpoint: clamp(slot.setpoint + 0.5) })} aria-label="Raise"><Icon name="plus" /></button>
            </div>
          </div>
        )}
        {!isWater && off && (
          <p className="muted small sheet-note">
            {limits.heat_min > 1
              ? `Off sets the valves to ${limits.heat_min}°, their lowest.`
              : "Off means the thermostat only keeps the house above its frost protection temperature."}
          </p>
        )}

        <button className="sheet-go" onClick={onClose}>Done</button>
        {canDelete && (
          <button className="ghost sheet-cancel danger-text" onClick={onDelete}>
            <Icon name="delete-outline" /> Remove this time
          </button>
        )}
      </div>
    </div>
  );
}
