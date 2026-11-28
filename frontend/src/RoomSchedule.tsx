import { useEffect, useMemo, useState } from "react";
import { Icon } from "./Icon";
import { ScheduleEditor, type ScheduleSource } from "./ScheduleEditor";
import { DAYS, type Hass, type Limits, type Room, type Schedule } from "./types";

/** What hive_local/rooms/schedule/get says about each valve. */
interface ValveRead {
  entity_id: string;
  name: string;
  transport: "zha" | "z2m" | null;
  days: number;
  complete: boolean;
  error: string | null;
  clock?: { offset: number | null; ok: boolean; set: boolean; managed?: string; error?: string };
  schedule_mode?: boolean | null;
}

interface ValveWrite {
  entity_id: string;
  name: string;
  commands: number;
  error: string | null;
  clock?: { offset: number | null; ok: boolean; set: boolean; was?: number | null };
}

interface ScheduleRead {
  schedule: Schedule;
  complete: boolean;
  differs: string[];
  valves: ValveRead[];
  limits: Partial<Limits>;
}

const LIMITS: Limits = { max_transitions: 6, heat_min: 5, heat_max: 32, boost_min_temp: 5, boost_max_minutes: 360, water_on: 22, water_off: 1 };
const short = (d: string) => d[0].toUpperCase() + d.slice(1, 3);

function clockText(offset: number | null) {
  if (offset == null) return "its clock isn't set";
  const minutes = Math.round(Math.abs(offset) / 60);
  return `its clock is ${minutes} min ${offset < 0 ? "behind" : "ahead"}`;
}

/**
 * Off used to be written as 5° (the valve's lowest); now it's frost protection. Show those
 * slots at the frost temperature, as unsaved changes, so one Save moves the valves to it.
 */
function withFrost<T extends { schedule: Schedule }>(r: T, frost: number | undefined): T & { edited?: Schedule; note?: string } {
  if (frost == null) return r;
  let changed = 0;
  const edited = Object.fromEntries(
    Object.entries(r.schedule).map(([day, slots]) => [
      day,
      (slots ?? []).map((t) => (t.setpoint <= LIMITS.heat_min && t.setpoint !== frost ? (changed++, { ...t, setpoint: frost }) : t)),
    ]),
  ) as Schedule;
  return changed
    ? { ...r, edited, note: `Off used to keep the valves at ${LIMITS.heat_min}°; it's now frost protection, ${frost}°. Save to write the change to the valves.` }
    : r;
}

/** "today 14:02", "yesterday 09:15", "Tue 24 Nov 18:40". */
function whenText(iso: string) {
  const d = new Date(iso);
  const time = d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(d).setHours(0, 0, 0, 0)) / 86400000);
  if (days === 0) return `today ${time}`;
  if (days === 1) return `yesterday ${time}`;
  return `${d.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" })} ${time}`;
}

/**
 * A room's schedule, kept on each of its Hive valves (issue #5): the
 * receiver's schedule editor, reading from the valves and writing the changed days to
 * every one of them.
 */
export function RoomScheduleDialog({ getHass, room, onClose, page }: { getHass: () => Hass; room: Room; onClose?: () => void; page?: boolean }) {
  const [valves, setValves] = useState<ValveRead[]>([]);
  const [differs, setDiffers] = useState<string[]>([]);
  const [limits, setLimits] = useState<Limits>(LIMITS);
  // Set while showing the last read or write rather than a fresh read.
  const [knownAt, setKnownAt] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => !page && e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, page]);

  const source = useMemo<ScheduleSource>(
    () => ({
      noun: "valves",
      embedded: !page,
      // Like the heating's Schedule tab: whether it's in use, from the room's mode (its Control tab).
      statusLine:
        room.mode === "schedule"
          ? "Your schedule is running. It's kept on each valve, so it runs without Home Assistant; saving writes the changed days to every valve."
          : `Your schedule isn't being used: the room is ${room.mode === "off" ? "off" : "on Manual"}. Choose Schedule on the Control tab to use it.`,
      cached: async () => {
        const r = await getHass().callWS<ScheduleRead & { at: string | null }>({
          type: "hive_local/rooms/schedule/get",
          room_id: room.id,
          cached: true,
        });
        if (!r.schedule || !Object.keys(r.schedule).length) return null;
        setKnownAt(r.at);
        setLimits({ ...LIMITS, ...r.limits });
        return withFrost(r, r.limits.frost);
      },
      read: async () => {
        const r = await getHass().callWS<ScheduleRead>({
          type: "hive_local/rooms/schedule/get",
          room_id: room.id,
        });
        setKnownAt(null);
        setValves(r.valves);
        setDiffers(r.differs);
        setLimits({ ...LIMITS, ...r.limits });
        return withFrost(r, r.limits.frost);
      },
      write: async (changed) => {
        const r = await getHass().callWS<{ schedule: Schedule; failed: string[]; valves: ValveWrite[] }>({
          type: "hive_local/rooms/schedule/set",
          room_id: room.id,
          schedule: changed,
        });
        setKnownAt((at) => (at ? new Date().toISOString() : at));
        const days = DAYS.filter((d) => d in r.schedule).map(short).join(", ");
        const clocks = r.valves.filter((v) => v.clock?.set).map((v) => v.name);
        const failed = r.valves.filter((v) => v.error);
        const parts = [
          failed.length
            ? `Wrote ${days} to ${r.valves.length - failed.length} of ${r.valves.length} valves. ${failed.map((v) => `${v.name}: ${v.error}`).join(" ")}`
            : `Wrote ${days} to ${r.valves.length === 1 ? "the valve" : `all ${r.valves.length} valves`}. Read back to confirm they kept it.`,
          clocks.length ? `Set the clock on ${clocks.join(", ")}.` : "",
        ];
        return { schedule: r.schedule, note: parts.filter(Boolean).join(" "), error: failed.length > 0 };
      },
    }),
    [getHass, room.id, room.mode],
  );

  // Anything worth knowing about the valves, from the last read.
  const notes: string[] = [];
  if (knownAt) {
    notes.push(`Last saved to or read from the valves ${whenText(knownAt)}. Only Hive Local changes it, so the valves aren't asked again; ⋯ → Read from the valves checks them, for example after a valve's been reset or swapped.`);
  }
  for (const v of valves) {
    if (v.error) notes.push(`${v.name} didn't answer: ${v.error}`);
    else if (!v.complete) notes.push(`${v.name} sent ${v.days} of 7 days.`);
    if (v.clock && !v.clock.ok && !v.error) notes.push(`${v.name}: ${clockText(v.clock.offset)}. It's set when you save.`);
  }
  // On Schedule, a valve that didn't take the mode (asleep at the time) still holds its target.
  const notFollowing = room.mode === "schedule" ? valves.filter((v) => v.schedule_mode === false) : [];
  if (notFollowing.length) {
    notes.push(`${notFollowing.map((v) => v.name).join(", ")} ${notFollowing.length === 1 ? "isn't" : "aren't"} following the schedule yet: choose Manual and then Schedule again on the Control tab.`);
  }
  if (differs.length && valves.length > 1) {
    notes.push(`The valves have different times on ${differs.map(short).join(", ")}. This shows ${valves.find((v) => v.days)?.name ?? "the first valve"}'s; saving a day writes it to them all.`);
  }

  const body = (
    <>
        {page ? null : (
        <div className="room-schedule-head">
          <button className="round ghost" onClick={() => onClose?.()} aria-label="Back to the room">
            <Icon name="chevron-left" />
          </button>
          <div className="page-title">
            <h2>Schedule</h2>
            <span className="muted small">{room.name} · {room.valves.length} valve{room.valves.length === 1 ? "" : "s"}</span>
          </div>
        </div>
        )}

        {notes.length > 0 && (
          <ul className="room-schedule-notes small">
            {notes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        )}

        <ScheduleEditor getHass={getHass} limits={limits} source={source} />
        <p className="muted small room-schedule-note">
          The valves sleep between check-ins, so reading or saving can take up to a couple of minutes; pressing a valve's dial wakes it. On ZHA, each valve's clock is checked first and set if it's wrong, or the schedule would run at the wrong times.
        </p>
    </>
  );
  // On the room's page (its Schedule tab), or as a dialog over something else.
  if (page) return <div className="room-schedule room-schedule-page">{body}</div>;
  return (
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); onClose?.(); }}>
      <div className="sheet heat room-sheet room-schedule" role="dialog" aria-modal="true" aria-label={`${room.name} schedule`} onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        {body}
      </div>
    </div>
  );
}
