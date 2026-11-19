import { useEffect, useRef, useState } from "react";
import { Stepper } from "./Controls";
import { Icon } from "./Icon";
import { errorText, type Candidate, type Device, type Hass, type Room, type ValveState } from "./types";

interface Props {
  getHass: () => Hass;
  device: Device;
}

const LOW_BATTERY = 20;
const fmt = (t: number | null) => (t == null ? "–" : `${t.toFixed(1)}°`);

/** Rooms: radiator valves (any HA climate entity) grouped by room, for this receiver. */
export function Rooms({ getHass, device }: Props) {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [editing, setEditing] = useState<Room | "new" | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setRooms(null);
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[] }>(
      (msg) => setRooms(msg.rooms),
      { type: "hive_local/rooms/subscribe", entry_id: device.entry_id },
    );
    unsub.catch((e) => setError(errorText(e)));
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass, device.entry_id]);

  if (error) return <div className="status error">{error}</div>;
  if (!rooms) return null;

  return (
    <div className="stack">
      <div className="rooms-head">
        <p className="muted">
          Group your radiator valves into rooms. Any valve Home Assistant knows about works, from any integration. Add a
          temperature sensor to a room for a better reading than the valves' own.
        </p>
        {editing !== "new" && (
          <button className="primary" onClick={() => setEditing("new")}>
            <Icon name="plus" /> Add room
          </button>
        )}
      </div>

      {editing === "new" && (
        <RoomEditor getHass={getHass} device={device} onDone={() => setEditing(null)} />
      )}

      {!rooms.length && editing !== "new" && (
        <div className="empty-state">
          <Icon name="home-thermometer-outline" />
          <p>No rooms yet. Add a room and pick its radiator valves.</p>
        </div>
      )}

      <div className="grid">
        {rooms.map((room) =>
          editing !== "new" && editing?.id === room.id ? (
            <RoomEditor key={room.id} getHass={getHass} device={device} room={room} onDone={() => setEditing(null)} />
          ) : (
            <RoomCard key={room.id} getHass={getHass} device={device} room={room} onEdit={() => setEditing(room)} />
          ),
        )}
      </div>
    </div>
  );
}

function RoomCard({ getHass, device, room, onEdit }: { getHass: () => Hass; device: Device; room: Room; onEdit: () => void }) {
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
          entry_id: device.entry_id,
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
        ? `Average of ${room.valve_states.filter((v) => v.available).length === 1 ? "the valve" : "the valves"}`
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
          <button className="ghost round" onClick={onEdit} aria-label={`Edit ${room.name}`}>
            <Icon name="pencil-outline" />
          </button>
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
  device: Device;
  room?: Room;
  onDone: () => void;
}

function RoomEditor({ getHass, device, room, onDone }: EditorProps) {
  const [candidates, setCandidates] = useState<{ valves: Candidate[]; sensors: Candidate[] } | null>(null);
  const [name, setName] = useState(room?.name ?? "");
  const [valves, setValves] = useState<Set<string>>(new Set(room?.valves ?? []));
  const [sensor, setSensor] = useState(room?.sensor ?? "");
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<{ valves: Candidate[]; sensors: Candidate[] }>({ type: "hive_local/rooms/candidates", entry_id: device.entry_id })
      .then(setCandidates)
      .catch((e) => setError(errorText(e)));
  }, [getHass, device.entry_id]);

  const run = async (msg: Record<string, unknown>) => {
    setBusy(true);
    setError("");
    try {
      await getHass().callWS({ entry_id: device.entry_id, ...msg });
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
          run({ type: "hive_local/rooms/save", ...(room ? { room_id: room.id } : {}), name, valves: [...valves], sensor: sensor || null });
        }}
      >
        <label className="field">
          <span>Name</span>
          <input id={`room-name-${room?.id ?? "new"}`} type="text" value={name} maxLength={40} placeholder="Lounge" onChange={(e) => setName(e.target.value)} />
        </label>

        <fieldset className="field">
          <legend>Radiator valves</legend>
          {!candidates && !error && <span className="muted small">Loading…</span>}
          {candidates && !candidates.valves.length && (
            <span className="muted small">Home Assistant has no radiator valves yet. Pair them with ZHA or Zigbee2MQTT first.</span>
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

        {error && <div className="status error">{error}</div>}

        <div className="actions">
          <button className="primary" type="submit" disabled={busy || !name.trim() || !valves.size}>
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
