import { useEffect, useRef, useState } from "react";
import { formatMinutes } from "./api";
import { Icon } from "./Icon";
import { errorText, type Candidate, type Hass, type Receiver, type Room, type RoomMode, type ValveInfo, type ValveState } from "./types";

const LOW_BATTERY = 20;
const fmt = (t: number | null) => (t == null ? "–" : `${t.toFixed(1)}°`);

function ValveRow({ valve, heating }: { valve: ValveState; heating: boolean }) {
  const battery = valve.battery == null ? null : Number(valve.battery);
  const low = battery != null && !Number.isNaN(battery) && battery <= LOW_BATTERY;
  return (
    <li className={`valve ${valve.available ? "" : "off"}`}>
      <Icon name={heating ? "fire" : "radiator"} className={heating ? "valve-icon heating" : "valve-icon"} />
      <span className="valve-name">{valve.name}</span>
      {valve.available ? (
        <span className="valve-temps">
          {fmt(valve.current_temperature)} <span className="muted">→ {fmt(valve.target)}</span>
        </span>
      ) : (
        <span className="chip">Unavailable</span>
      )}
      {battery != null && !Number.isNaN(battery) && (
        <span className={`battery ${low ? "low" : ""}`} title={low ? "Battery low" : "Battery"}>
          <Icon name={low ? "battery-alert-variant-outline" : "battery-outline"} /> {Math.round(battery)}%
        </span>
      )}
    </li>
  );
}

/** Whether the room's valves heat to its sensor's reading (null when it has no sensor). */
function sensorNote(room: Room): { text: string; warn: boolean } | null {
  if (!room.sensor || !room.external_sensor) return null;
  const n = room.valve_states.length;
  const names = (s: string) => room.valve_states.filter((v) => v.external_sensor === s).map((v) => v.name);
  if (room.external_sensor === "off") return { text: n === 1 ? "The valve uses its own sensor" : "The valves use their own sensors", warn: false };
  if (room.external_sensor === "using") return { text: n === 1 ? "The valve uses the room sensor" : "The valves use the room sensor", warn: false };
  if (room.external_sensor === "unsupported") return { text: n === 1 ? "This valve can't use the room sensor" : "These valves can't use the room sensor", warn: false };
  if (room.temperature_source !== "sensor") return { text: "Room sensor not responding: the valves use their own", warn: true };
  if (room.external_sensor === "partly") {
    const cant = names("unsupported");
    const using = names("using").length;
    return { text: `${using} of ${n} valves ${using === 1 ? "uses" : "use"} the room sensor${cant.length ? `; ${cant.join(", ")} can't` : ""}`, warn: false };
  }
  return { text: "Giving the valves the room temperature…", warn: false };
}

interface EditorProps {
  getHass: () => Hass;
  room?: Room;
  onDone: () => void;
  /** In a dialog (a sheet from the bottom on phones) rather than a card. */
  dialog?: boolean;
}

/**
 * Valves as a compact list, the area matching the room's name first: a tick, the name with
 * its area (and the room it's already in), the reading and battery, and Find, which makes
 * the valve flash its light (when HA has an Identify button for it).
 */
/** Show a search box above the valves once there are more than this many. */
const SEARCH_FROM = 8;


function ValvePicker({ getHass, valves, info, roomName, thisRoom, chosen, onToggle }: { getHass: () => Hass; valves: Candidate[]; info: Map<string, ValveInfo>; roomName: string; thisRoom: string | null; chosen: Set<string>; onToggle: (id: string) => void }) {
  const [flashing, setFlashing] = useState<string | null>(null);
  const [note, setNote] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  // With a lot of valves, a search box filters by valve name or area.
  const [query, setQuery] = useState("");
  const searchable = valves.length > SEARCH_FROM;
  const q = query.trim().toLowerCase();
  const wanted = roomName.trim().toLowerCase();
  const inArea = (c: Candidate) => !!wanted && (c.area ?? "").toLowerCase() === wanted;
  const elsewhereOf = (c: Candidate) => {
    const room = info.get(c.entity_id)?.room;
    return room && room !== thisRoom ? room : null;
  };
  // Most likely first: chosen, this room's area, not in a room yet, then valves in other rooms. Ordered by
  // what was chosen when the editor opened, so ticking doesn't move rows about.
  const [initial] = useState(() => new Set(chosen));
  const rank = (c: Candidate) => (initial.has(c.entity_id) ? 0 : inArea(c) ? 1 : !elsewhereOf(c) ? 2 : 3);
  const sorted = [...valves].sort((a, b) => rank(a) - rank(b));
  // Every valve, likely ones first; the list scrolls inside itself after about 5 rows.
  const list = q ? sorted.filter((c) => c.name.toLowerCase().includes(q) || (c.area ?? "").toLowerCase().includes(q)) : sorted;

  const find = async (c: Candidate) => {
    setNote(null);
    setFlashing(c.entity_id);
    try {
      await getHass().callWS({ type: "hive_local/rooms/identify", entity_id: c.entity_id });
      setNote({ kind: "ok", text: `${c.name} is flashing its light.` });
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        setFlashing(null);
        setNote(null);
      }, 10_000);
    } catch (e) {
      setFlashing(null);
      setNote({ kind: "error", text: errorText(e) });
    }
  };

  if (!valves.length) return null;
  return (
    <div className="valve-picker">
      {searchable && (
        <label className="valve-search">
          <Icon name="magnify" />
          <input type="search" value={query} placeholder="Search valves or areas" aria-label="Search valves or areas" onChange={(e) => setQuery(e.target.value)} />
          {query && (
            <button type="button" className="ghost round" aria-label="Clear the search" onClick={() => setQuery("")}>
              <Icon name="close" />
            </button>
          )}
        </label>
      )}
      {!list.length && q && <span className="muted small">No valves match "{query.trim()}".</span>}
      {list.length > 0 && <div className="valve-list">
        {list.map((c) => {
          const v = info.get(c.entity_id);
          const on = chosen.has(c.entity_id);
          const battery = v?.battery == null ? null : Number(v.battery);
          const hasBattery = battery != null && !Number.isNaN(battery);
          const low = hasBattery && battery <= LOW_BATTERY;
          const elsewhere = elsewhereOf(c);
          return (
            <div key={c.entity_id} className={`valve-pick ${on ? "on" : ""}`}>
              <button type="button" role="checkbox" aria-checked={on} className="valve-pick-main" onClick={() => onToggle(c.entity_id)}>
                <span className={`valve-check ${on ? "on" : ""}`} aria-hidden="true">{on && <Icon name="check" />}</span>
                <span className="valve-pick-text">
                  <span>{c.name}</span>
                  <span className="muted small">{[c.area ?? "No area", elsewhere ? `in ${elsewhere}` : null].filter(Boolean).join(" · ")}</span>
                </span>
                <span className="valve-pick-read small">
                  {v && !v.available ? (
                    "Not responding"
                  ) : (
                    <>
                      {v?.current_temperature != null ? `${v.current_temperature.toFixed(1)}°` : ""}
                      {hasBattery && <span className={low ? "warn" : ""}>{v?.current_temperature != null ? " · " : ""}{Math.round(battery)}%</span>}
                    </>
                  )}
                </span>
              </button>
              {v?.identify && (
                <button type="button" className={`valve-find ${flashing === c.entity_id ? "on" : ""}`} onClick={() => find(c)} disabled={flashing === c.entity_id} aria-label={`Find ${c.name}: flash its light`}>
                  <Icon name="lightbulb-on-outline" /> <span className="valve-find-label">{flashing === c.entity_id ? "Flashing" : "Find"}</span>
                </button>
              )}
            </div>
          );
        })}
      </div>}
      {note && <div className={`status ${note.kind} small`}>{note.text}</div>}
    </div>
  );
}

/** A card, or a dialog (a sheet from the bottom on phones). Top level, so typing doesn't remount the form. */
function EditorFrame({ dialog, label, onClose, children }: { dialog: boolean; label: string; onClose: () => void; children: React.ReactNode }) {
  if (!dialog) return <section className="card room-editor">{children}</section>;
  return (
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="sheet room-sheet room-editor" role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        {children}
      </div>
    </div>
  );
}

/** The room editor as a dialog: a sheet from the bottom on phones, centred on wide screens. */
export function RoomEditorDialog(props: Omit<EditorProps, "dialog">) {
  return <RoomEditor {...props} dialog />;
}

export function RoomEditor({ getHass, room, onDone, dialog }: EditorProps) {
  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDone();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, onDone]);

  const [candidates, setCandidates] = useState<{ valves: Candidate[]; sensors: Candidate[]; receivers: Receiver[] } | null>(null);
  const [receiver, setReceiver] = useState(room?.receiver ?? "");
  const [name, setName] = useState(room?.name ?? "");
  const [valves, setValves] = useState<Set<string>>(new Set(room?.valves ?? []));
  const [sensor, setSensor] = useState(room?.sensor ?? "");
  const [onValves, setOnValves] = useState(room?.sensor_on_valves ?? true);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  // Each valve's reading, battery and room, for the picker.
  const [info, setInfo] = useState<Map<string, ValveInfo>>(new Map());
  useEffect(() => {
    getHass()
      .callWS<{ valves: Candidate[]; sensors: Candidate[]; receivers: Receiver[] }>({ type: "hive_local/rooms/candidates" })
      .then(setCandidates)
      .catch((e) => setError(errorText(e)));
    getHass()
      .callWS<{ valves: ValveInfo[] }>({ type: "hive_local/rooms/valves" })
      .then((r) => setInfo(new Map(r.valves.map((v) => [v.entity_id, v]))))
      .catch(() => {});
  }, [getHass]);
  const manyReceivers = (candidates?.receivers.length ?? 0) > 1;
  // How the valves are doing with the saved sensor (not shown for unsaved changes).
  const editorNote = room && room.sensor === sensor && onValves && (room.sensor_on_valves ?? true) ? sensorNote(room) : null;

  const run = async (msg: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    try {
      await getHass().callWS(msg);
      onDone();
    } catch (e) {
      setError(errorText(e));
      setBusy(false);
    }
  };

  const toggle = (id: string) =>
    setValves((v) => {
      const next = new Set(v);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });


  return (
    <EditorFrame dialog={!!dialog} label={room ? `Edit ${room.name}` : "New room"} onClose={onDone}>
      <h2>{room ? `Edit ${room.name}` : "New room"}</h2>
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          run({
            type: "hive_local/rooms/save",
            ...(room ? { room_id: room.id } : {}),
            name,
            valves: [...valves],
            sensor: sensor || null,
            receiver: receiver || null,
            sensor_on_valves: onValves,
          });
        }}
      >
        <label className="field">
          <span>Name</span>
          <input id={`room-name-${room?.id ?? "new"}`} type="text" value={name} maxLength={40} placeholder="Lounge" onChange={(e) => setName(e.target.value)} />
        </label>

        <fieldset className="field">
          <legend>
            Hive radiator valves
            {valves.size > 0 && <span className="valve-count">{valves.size} chosen</span>}
          </legend>
          {!candidates && !error && <span className="muted small">Loading…</span>}
          {candidates && !candidates.valves.length && (
            <span className="muted small">No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first.</span>
          )}
          <ValvePicker getHass={getHass} valves={candidates?.valves ?? []} info={info} roomName={name} thisRoom={room?.name ?? null} chosen={valves} onToggle={toggle} />
        </fieldset>

        <label className="field">
          <span>Room temperature from</span>
          <select id={`room-sensor-${room?.id ?? "new"}`} value={sensor} onChange={(e) => setSensor(e.target.value)}>
            <option value="">The valves (their average)</option>
            {(candidates?.sensors ?? []).map((s) => (
              <option key={s.entity_id} value={s.entity_id}>
                {s.name}
                {s.area ? ` · ${s.area}` : ""}
              </option>
            ))}
          </select>
        </label>

        {sensor && (
          <div className="sensor-toggle">
            <button type="button" role="checkbox" aria-checked={onValves} className="sensor-toggle-main" onClick={() => setOnValves((v) => !v)}>
              <span className={`valve-check ${onValves ? "on" : ""}`} aria-hidden="true">{onValves && <Icon name="check" />}</span>
              <span className="valve-pick-text">
                <span>Use the room sensor on the valves</span>
                <span className="muted small">The valves heat to this reading instead of their own, taken beside the radiator.</span>
              </span>
            </button>
            {editorNote && <span className={`small ${editorNote.warn ? "warn" : "muted"}`}>{editorNote.text}.</span>}
          </div>
        )}

        {manyReceivers && (
          <label className="field">
            <span>Heated by</span>
            <select id={`room-receiver-${room?.id ?? "new"}`} value={receiver} onChange={(e) => setReceiver(e.target.value)}>
              <option value="" disabled>
                Choose the receiver for this room's radiators
              </option>
              {candidates!.receivers.map((r) => (
                <option key={r.entry_id} value={r.entry_id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        )}

        {error && <div className="status error">{error}</div>}

        <div className="actions">
          <button className="primary" type="submit" disabled={busy || !name.trim() || !valves.size || (manyReceivers && !receiver)}>
            {room ? "Save" : "Add room"}
          </button>
          <button type="button" className="ghost" onClick={onDone} disabled={busy}>
            Cancel
          </button>
          <span className="spacer" />
          {room &&
            (confirmDelete ? (
              <>
                <span className="muted small">Delete {room.name}? The valves aren't changed.</span>
                <button type="button" className="danger" disabled={busy} onClick={() => run({ type: "hive_local/rooms/delete", room_id: room.id })}>
                  Delete
                </button>
                <button type="button" className="ghost" onClick={() => setConfirmDelete(false)}>
                  Keep
                </button>
              </>
            ) : (
              <button type="button" className="danger" onClick={() => setConfirmDelete(true)} disabled={busy}>
                <Icon name="delete-outline" /> Delete room
              </button>
            ))}
        </div>
      </form>
    </EditorFrame>
  );
}

/**
 * A room in a sheet over the Overview (from the bottom on phones, a dialog on wide screens),
 * like the boost sheet: its temperature, target and valves.
 */
const ROOM_MODES: { id: RoomMode; label: string }[] = [
  { id: "schedule", label: "Schedule" },
  { id: "manual", label: "Manual" },
  { id: "off", label: "Off" },
];

/** What a room's mode means, for its page's subtitle. */
export function roomModeText(room: Room): string {
  if (room.boost) return `Boost · ${formatMinutes(room.boost.remaining)} left`;
  return room.mode === "schedule" ? "On the valves' schedule" : room.mode === "off" ? "Off" : "Manual";
}

/**
 * A room's Control tab (its page, like the heating's): the target, Schedule / Manual / Off,
 * whether the valves use the room sensor, the valves, and Edit room.
 */
export function RoomControl({ getHass, room }: { getHass: () => Hass; room: Room }) {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const mode: RoomMode = room.mode ?? "manual";
  const failedText = (failed: string[]) => {
    const names = room.valve_states.filter((v) => failed.includes(v.entity_id)).map((v) => v.name);
    return `Didn't take on ${names.join(", ")}. It may be asleep: press its dial to wake it and try again.`;
  };

  const shown = pending ?? room.boost?.temperature ?? room.target ?? room.target_range?.[1] ?? 20;
  const canAdjust = mode !== "off" || !!room.boost;
  const change = (value: number) => {
    const next = Math.min(32, Math.max(5, value));
    setPending(next);
    setMessage("");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        const r = await getHass().callWS<{ failed: string[] }>({ type: "hive_local/rooms/set_target", room_id: room.id, temperature: next });
        if (r.failed.length) setMessage(failedText(r.failed));
      } catch (e) {
        setMessage(errorText(e));
      } finally {
        setPending(null);
      }
    }, 1200);
  };
  const setMode = async (next: RoomMode) => {
    setBusy(true);
    setMessage("");
    try {
      const r = await getHass().callWS<{ failed: string[] }>({ type: "hive_local/rooms/mode", room_id: room.id, mode: next });
      if (r.failed.length) setMessage(failedText(r.failed));
    } catch (e) {
      setMessage(errorText(e));
    } finally {
      setBusy(false);
    }
  };
  const note = sensorNote(room);
  const targetHint = room.boost
    ? "Keeps the boost's time left"
    : mode === "off"
      ? "Turn the room on to set a target"
      : mode === "schedule"
        ? "Until the valves' next scheduled change"
        : room.target_range && pending == null
          ? `The valves are set to ${fmt(room.target_range[0])}–${fmt(room.target_range[1])}`
          : "Held until you change it";

  return (
    <section className="card room-control">
      {note && (
        <div className={`room-sensor-note small ${note.warn ? "warn" : "muted"}`}>
          <Icon name={note.warn ? "thermometer-alert" : "thermometer-check"} /> {note.text}
        </div>
      )}
      <div className="target-row">
        <div className="target-text">
          <span className="target-label">{room.boost ? "Boost to" : mode === "off" ? "Off" : "Target"}</span>
          <span className="muted small">{targetHint}</span>
        </div>
        <div className="target-control">
          <button className="round target-btn" disabled={!canAdjust} onClick={() => change(shown - 0.5)} aria-label="Lower the target">
            <Icon name="minus" />
          </button>
          <span className={`target-value ${pending != null ? "pending" : ""}`}>{canAdjust ? `${shown.toFixed(1)}°` : "–"}</span>
          <button className="round target-btn" disabled={!canAdjust} onClick={() => change(shown + 0.5)} aria-label="Raise the target">
            <Icon name="plus" />
          </button>
        </div>
      </div>
      <div className="segmented full" role="radiogroup" aria-label="Mode">
        {ROOM_MODES.map((m) => (
          <button key={m.id} role="radio" aria-checked={mode === m.id} className={mode === m.id ? "on" : ""} disabled={busy} onClick={() => mode !== m.id && setMode(m.id)}>
            {m.label}
          </button>
        ))}
      </div>
      {mode === "schedule" && <p className="muted small room-mode-note">The valves follow the schedule kept on them (the Schedule tab). Experimental.</p>}
      {mode === "off" && <p className="muted small room-mode-note">A Hive valve can't switch off, so they're at their lowest, 5°. Their targets come back when you turn the room on.</p>}
      {message && <div className="status error">{message}</div>}
      <div className="sheet-field">
        <span className="sheet-label">Valves</span>
        <ul className="valves">
          {room.valve_states.map((v) => (
            <ValveRow key={v.entity_id} valve={v} heating={room.heating_valves.includes(v.entity_id)} />
          ))}
        </ul>
      </div>
      <div className="room-sheet-actions">
        <button className="ghost" onClick={() => setEditing(true)}><Icon name="pencil-outline" /> Edit room</button>
      </div>
      {editing && <RoomEditor getHass={getHass} room={room} onDone={() => setEditing(false)} dialog />}
    </section>
  );
}

interface Suggestion {
  name: string;
  valves: string[];
  sensor: string | null;
}

/** A rough icon for a room, from its name. */
function roomIcon(name: string) {
  const n = name.toLowerCase();
  if (/lounge|living|sitting|family|snug/.test(n)) return "sofa-outline";
  if (/bed|nursery|guest/.test(n)) return "bed-outline";
  if (/kitchen|dining/.test(n)) return "silverware-fork-knife";
  if (/landing|hall|stair/.test(n)) return "stairs";
  if (/study|office/.test(n)) return "desk";
  if (/bath|shower|en-?suite|wc|toilet/.test(n)) return "shower";
  return "home-thermometer-outline";
}

/**
 * First-time setup: a room per HA area that has Hive valves not in a room yet, with the
 * area's temperature sensor if it has one. Untick any to leave out, then create them.
 */
export function RoomSetupDialog({ getHass, onDone }: { getHass: () => Hass; onDone: () => void }) {
  const [found, setFound] = useState<{ rooms: Suggestion[]; receivers: Receiver[] } | null>(null);
  const [names, setNames] = useState<Map<string, string>>(new Map());
  const [picked, setPicked] = useState<Set<number>>(new Set());
  const [receiver, setReceiver] = useState<Record<number, string>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<{ rooms: Suggestion[]; receivers: Receiver[] }>({ type: "hive_local/rooms/suggest" })
      .then((r) => {
        setFound(r);
        setPicked(new Set(r.rooms.map((_, i) => i)));
      })
      .catch((e) => setError(errorText(e)));
    getHass()
      .callWS<{ valves: Candidate[]; sensors: Candidate[] }>({ type: "hive_local/rooms/candidates" })
      .then((r) => setNames(new Map([...r.valves, ...r.sensors].map((c) => [c.entity_id, c.name]))))
      .catch(() => {});
  }, [getHass]);

  const several = (found?.receivers.length ?? 0) > 1;
  const chosen = (found?.rooms ?? []).map((s, i) => [s, i] as const).filter(([, i]) => picked.has(i));
  const ready = chosen.length > 0 && (!several || chosen.every(([, i]) => receiver[i]));
  const valveCount = (found?.rooms ?? []).reduce((n, s) => n + s.valves.length, 0);

  const create = async () => {
    setBusy(true);
    setError("");
    try {
      for (const [s, i] of chosen) {
        await getHass().callWS({ type: "hive_local/rooms/save", name: s.name, valves: s.valves, sensor: s.sensor, receiver: receiver[i] ?? null });
      }
      onDone();
    } catch (e) {
      setError(errorText(e));
      setBusy(false);
    }
  };
  const toggle = (i: number) =>
    setPicked((p) => {
      const next = new Set(p);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  return (
    <EditorFrame dialog label="Set up your rooms" onClose={onDone}>
      <h2>Set up your rooms</h2>
      {!found && !error && <p className="muted setup-intro">Looking for your valves…</p>}
      {found && !found.rooms.length && (
        <p className="muted setup-intro">Every Hive radiator valve with an area is already in a room. Give the others an area in Home Assistant, or add rooms by hand.</p>
      )}
      {found && found.rooms.length > 0 && (
        <>
          <p className="muted setup-intro">
            Found {valveCount} Hive radiator valve{valveCount === 1 ? "" : "s"} in {found.rooms.length} area{found.rooms.length === 1 ? "" : "s"}. Pick the rooms to create. You can rename or change any of them later.
          </p>
          <div className="setup-list">
            {found.rooms.map((s, i) => {
              const on = picked.has(i);
              const valveNames = s.valves.map((v) => names.get(v) ?? v).join(", ");
              const source = s.sensor ? `Temperature: ${names.get(s.sensor) ?? s.sensor}` : s.valves.length === 1 ? "Temperature: from the valve" : "Temperature: average of the valves";
              return (
                <div key={s.name} className={`setup-room ${on ? "on" : ""}`}>
                  <button type="button" role="checkbox" aria-checked={on} className="setup-room-main" onClick={() => toggle(i)}>
                    <span className={`valve-check ${on ? "on" : ""}`} aria-hidden="true">{on && <Icon name="check" />}</span>
                    <span className="setup-room-text">
                      <span>{s.name}</span>
                      <span className="muted small">{valveNames}</span>
                      <span className="muted small">{source}</span>
                    </span>
                    <span className="device-icon"><Icon name={roomIcon(s.name)} /></span>
                  </button>
                  {several && on && (
                    <select aria-label={`Which receiver heats ${s.name}`} value={receiver[i] ?? ""} onChange={(e) => setReceiver((r) => ({ ...r, [i]: e.target.value }))}>
                      <option value="" disabled>Heated by…</option>
                      {found.receivers.map((r) => (
                        <option key={r.entry_id} value={r.entry_id}>{r.name}</option>
                      ))}
                    </select>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
      {error && <div className="status error">{error}</div>}
      {found && found.rooms.length > 0 && (
        <button className="sheet-go" style={{ ["--hl-accent" as string]: "var(--hl-brand)" }} disabled={busy || !ready} onClick={create}>
          {busy ? "Creating…" : `Create ${chosen.length} room${chosen.length === 1 ? "" : "s"}`}
        </button>
      )}
      <button className="ghost sheet-cancel" onClick={onDone} disabled={busy}>
        {found?.rooms.length ? "I'll set them up myself" : "Close"}
      </button>
    </EditorFrame>
  );
}
