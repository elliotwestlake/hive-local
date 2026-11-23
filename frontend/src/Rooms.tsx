import { useEffect, useRef, useState } from "react";
import { Stepper } from "./Stepper";
import { Icon } from "./Icon";
import { errorText, type Candidate, type Hass, type Receiver, type Room, type ValveState } from "./types";

interface Props {
  getHass: () => Hass;
}

const LOW_BATTERY = 20;
const fmt = (t: number | null) => (t == null ? "–" : `${t.toFixed(1)}°`);

/** House-wide rooms of Hive radiator valves, grouped by the receiver (zone) that heats them. */
export function Rooms({ getHass }: Props) {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [editing, setEditing] = useState<Room | "new" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[]; receivers: Receiver[] }>(
      (msg) => {
        setRooms(msg.rooms);
        setReceivers(msg.receivers);
      },
      { type: "hive_local/rooms/subscribe" },
    );
    unsub.catch((e) => setError(errorText(e)));
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass]);

  if (error) return <div className="status error">{error}</div>;
  if (!rooms) return null;

  return (
    <div className="stack rooms-page">
      <h2 className="history-title">Rooms</h2>

      {editing === "new" && <RoomEditor getHass={getHass} onDone={() => setEditing(null)} />}

      {!rooms.length && editing !== "new" && (
        <div className="empty-state">
          <Icon name="home-thermometer-outline" />
          <p>No rooms yet. Tap + to add a room and pick its Hive radiator valves (on ZHA or Zigbee2MQTT).</p>
        </div>
      )}

      {groups(rooms, receivers).map(([title, list]) => (
        <section key={title ?? "all"} className="zone">
          {title && <h3>{title}</h3>}
          <div className="grid">
            {list.map((room) =>
              editing !== "new" && editing?.id === room.id ? (
                <RoomEditor key={room.id} getHass={getHass} room={room} onDone={() => setEditing(null)} />
              ) : (
                <RoomCard key={room.id} getHass={getHass} room={room} onEdit={() => setEditing(room)} />
              ),
            )}
          </div>
        </section>
      ))}

      <div className="fab-wrap">
        <button className="fab" aria-label="Add a room" onClick={() => { setEditing("new"); window.scrollTo({ top: 0 }); }}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}

/** One untitled group with a single receiver; otherwise a group per receiver (zone), in setup order. */
function groups(rooms: Room[], receivers: Receiver[]): [string | null, Room[]][] {
  if (receivers.length <= 1) return rooms.length ? [[null, rooms]] : [];
  const out: [string | null, Room[]][] = receivers
    .map((r) => [`Heated by ${r.name}`, rooms.filter((room) => room.receiver === r.entry_id)] as [string, Room[]])
    .filter(([, list]) => list.length);
  const orphans = rooms.filter((room) => !receivers.some((r) => r.entry_id === room.receiver));
  if (orphans.length) out.push(["Receiver not set", orphans]);
  return out;
}

export function RoomCard({ getHass, room, onEdit }: { getHass: () => Hass; room: Room; onEdit?: () => void }) {
  // The stepper moves straight away; the valves are told after a short pause.
  const [pending, setPending] = useState<number | null>(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const timer = useRef<number>();
  const shown = pending ?? room.target ?? room.target_range?.[1] ?? 20;

  const change = (value: number) => {
    const next = Math.min(35, Math.max(5, value));
    setPending(next);
    setMessage(null);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(async () => {
      try {
        const r = await getHass().callWS<{ failed: string[] }>({
          type: "hive_local/rooms/set_target",
          room_id: room.id,
          temperature: next,
        });
        if (r.failed.length) {
          const names = room.valve_states.filter((v) => r.failed.includes(v.entity_id)).map((v) => v.name);
          setMessage({ kind: "error", text: `Didn't take on ${names.join(", ")}. It may be asleep; try again shortly.` });
        }
      } catch (e) {
        setMessage({ kind: "error", text: errorText(e) });
      } finally {
        setPending(null);
      }
    }, 700);
  };

  const source =
    room.temperature_source === "sensor"
      ? room.sensor_name
      : room.temperature_source === "valves"
        ? room.valve_states.filter((v) => v.available).length === 1
          ? "From the valve"
          : "Average of the valves"
        : "No reading";

  return (
    <section className={`card room ${room.heating ? "heating" : ""}`}>
      <div className="card-head">
        <div className="title">
          <Icon name="home-thermometer-outline" className="title-icon" />
          <h2>{room.name}</h2>
        </div>
        <div className="chips">
          {room.heating ? (
            <span className="chip heating">
              <Icon name="fire" /> Heating
            </span>
          ) : (
            <span className="chip">Idle</span>
          )}
          {onEdit && (
            <button className="ghost round" onClick={onEdit} aria-label={`Edit ${room.name}`}>
              <Icon name="pencil-outline" />
            </button>
          )}
        </div>
      </div>

      <div className="room-now">
        <div>
          <div className="room-temp">
            {room.current_temperature == null ? "–" : room.current_temperature.toFixed(1)}
            <span className="unit">°C</span>
          </div>
          <div className="muted small">{source}</div>
        </div>
        <div className="room-target">
          <span className="muted small">
            {room.target_range && pending == null ? `Valves set to ${fmt(room.target_range[0])}–${fmt(room.target_range[1])}` : "Target"}
          </span>
          <Stepper value={shown} onChange={change} />
        </div>
      </div>

      <ul className="valves">
        {room.valve_states.map((v) => (
          <ValveRow key={v.entity_id} valve={v} heating={room.heating_valves.includes(v.entity_id)} />
        ))}
      </ul>

      {message && <div className={`status ${message.kind}`}>{message.text}</div>}
    </section>
  );
}

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
}

export function RoomEditor({ getHass, room, onDone }: EditorProps) {
  const [candidates, setCandidates] = useState<{ valves: Candidate[]; sensors: Candidate[]; receivers: Receiver[] } | null>(null);
  const [receiver, setReceiver] = useState(room?.receiver ?? "");
  const [name, setName] = useState(room?.name ?? "");
  const [valves, setValves] = useState<Set<string>>(new Set(room?.valves ?? []));
  const [sensor, setSensor] = useState(room?.sensor ?? "");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<{ valves: Candidate[]; sensors: Candidate[]; receivers: Receiver[] }>({ type: "hive_local/rooms/candidates" })
      .then(setCandidates)
      .catch((e) => setError(errorText(e)));
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

  // Group valves by area, the way people think about them.
  const byArea = new Map<string, Candidate[]>();
  for (const c of candidates?.valves ?? []) byArea.set(c.area ?? "No area", [...(byArea.get(c.area ?? "No area") ?? []), c]);

  return (
    <section className="card room-editor">
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
          <legend>Hive radiator valves</legend>
          {!candidates && !error && <span className="muted small">Loading…</span>}
          {candidates && !candidates.valves.length && (
            <span className="muted small">No Hive radiator valves found. Pair them with ZHA or Zigbee2MQTT first.</span>
          )}
          {[...byArea].map(([area, list]) => (
            <div key={area} className="checklist">
              <span className="muted small">{area}</span>
              {list.map((c) => (
                <label key={c.entity_id} className="pick">
                  <input type="checkbox" checked={valves.has(c.entity_id)} onChange={() => toggle(c.entity_id)} /> {c.name}
                </label>
              ))}
            </div>
          ))}
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
    </section>
  );
}

/**
 * A room in a sheet over the Overview (from the bottom on phones, a dialog on wide screens),
 * like the boost sheet: its temperature, target and valves.
 */
export function RoomSheet({ getHass, roomId, several, onEdit, onClose }: { getHass: () => Hass; roomId: string; several: boolean; onEdit: () => void; onClose: () => void }) {
  const [room, setRoom] = useState<Room | null>(null);
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
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!room) return null;

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
        <div className="room-sheet-actions">
          <button className="ghost" onClick={onEdit}><Icon name="pencil-outline" /> Edit room</button>
          <button className="ghost sheet-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
