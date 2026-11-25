import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { RoomScheduleDialog } from "./RoomSchedule";
import { errorText, type Candidate, type Hass, type Receiver, type Room, type ValveInfo, type ValveState } from "./types";

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
export function RoomSheet({ getHass, roomId, several, onClose }: { getHass: () => Hass; roomId: string; several: boolean; onClose: () => void }) {
  const [room, setRoom] = useState<Room | null>(null);
  const [editing, setEditing] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [pending, setPending] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const timer = useRef<number>();
  useEffect(() => {
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[] }>(
      (msg) => setRoom(msg.rooms.find((r) => r.id === roomId) ?? null),
      { type: "hive_local/rooms/subscribe" },
    );
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass, roomId]);
  useEffect(() => {
    if (editing || scheduling) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, editing, scheduling]);
  if (!room) return null;
  // Editing replaces this sheet with the editor's; done returns here.
  if (editing) return <RoomEditor getHass={getHass} room={room} onDone={() => setEditing(false)} dialog />;
  // The valves' own schedule (experimental, #5), in place of this sheet; back returns here.
  if (scheduling) return <RoomScheduleDialog getHass={getHass} room={room} onClose={() => setScheduling(false)} />;

  const shown = pending ?? room.target ?? room.target_range?.[1] ?? 20;
  const change = (value: number) => {
    const next = Math.min(35, Math.max(5, value));
    setPending(next);
    setMessage("");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        const r = await getHass().callWS<{ failed: string[] }>({ type: "hive_local/rooms/set_target", room_id: room.id, temperature: next });
        if (r.failed.length) {
          const names = room.valve_states.filter((v) => r.failed.includes(v.entity_id)).map((v) => v.name);
          setMessage(`Didn't take on ${names.join(", ")}. It may be asleep; try again shortly.`);
        }
      } catch (e) {
        setMessage(errorText(e));
      } finally {
        setPending(null);
      }
    }, 700);
  };
  const valves = `${room.valves.length} valve${room.valves.length === 1 ? "" : "s"}`;
  const source = room.temperature_source === "sensor" ? room.sensor_name : room.temperature_source === "valves" ? "Average of the valves" : "No reading";

  return (
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="sheet heat room-sheet" role="dialog" aria-modal="true" aria-label={room.name} onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        <div className="sheet-title">
          <h2>{room.name}</h2>
          <span className="muted">{[room.heating ? "Heating" : "Idle", several ? room.receiver_name : null, valves].filter(Boolean).join(" · ")}</span>
        </div>
        <div className="sheet-live">
          <Icon name={room.heating ? "fire" : "thermometer"} className={room.heating ? "heating" : ""} />
          <span>
            <b>{room.current_temperature == null ? "–" : `${room.current_temperature.toFixed(1)}°`}</b> <span className="muted">{source}</span>
          </span>
        </div>
        <div className="sheet-field">
          <span className="sheet-label">
            {room.target_range && pending == null ? `Target (valves set to ${fmt(room.target_range[0])}–${fmt(room.target_range[1])})` : "Target"}
          </span>
          <div className="sheet-temp">
            <button className="round sheet-step" onClick={() => change(shown - 0.5)} aria-label="Lower"><Icon name="minus" /></button>
            <span className="sheet-temp-value">{shown.toFixed(1)}°</span>
            <button className="round sheet-step" onClick={() => change(shown + 0.5)} aria-label="Raise"><Icon name="plus" /></button>
          </div>
        </div>
        <div className="sheet-field">
          <span className="sheet-label">Valves</span>
          <ul className="valves">
            {room.valve_states.map((v) => (
              <ValveRow key={v.entity_id} valve={v} heating={room.heating_valves.includes(v.entity_id)} />
            ))}
          </ul>
        </div>
        {message && <div className="status error">{message}</div>}
        <button className="room-sheet-row" onClick={() => setScheduling(true)}>
          <Icon name="calendar-clock-outline" />
          <span>Schedule on the valves</span>
          <span className="chip unsaved">Experimental</span>
          <Icon name="chevron-right" className="slot-chev" />
        </button>
        <div className="room-sheet-actions">
          <button className="ghost" onClick={() => setEditing(true)}><Icon name="pencil-outline" /> Edit room</button>
          <button className="ghost sheet-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
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
