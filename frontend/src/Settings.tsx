import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { RoomEditorDialog } from "./Rooms";
import { errorText, type Candidate, type Channel, type Device, type Hass, type Receiver, type Room, type StatusMap } from "./types";

/**
 * Settings: the outside temperature (house-wide), rooms (setting them up; using them is on
 * the Overview), and each receiver's boost defaults and frost protection.
 */

interface SettingsData {
  outdoor_entity: string | null;
  outdoor_candidates: Candidate[];
}

export function Settings({ getHass, devices, status }: { getHass: () => Hass; devices: Device[]; status: StatusMap }) {
  const [data, setData] = useState<SettingsData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<SettingsData>({ type: "hive_local/settings" })
      .then(setData)
      .catch((e) => setError(errorText(e)));
  }, [getHass]);

  const setOutdoor = (entity: string) => {
    setData((d) => d && { ...d, outdoor_entity: entity || null });
    getHass()
      .callWS({ type: "hive_local/settings/set", outdoor_entity: entity || null })
      .catch((e) => setError(errorText(e)));
  };

  return (
    <div className="settings">
      <h2 className="history-title">Settings</h2>
      {error && <div className="status error">{error}</div>}

      <section className="settings-section">
        <h3>Outside temperature</h3>
        <div className="settings-group">
          <div className="settings-row">
            <span className="device-icon"><Icon name="weather-partly-cloudy" /></span>
            <div className="settings-text">
              <span>Weather or outdoor sensor</span>
              <span className="muted small">Shown in the heating history, next to the boiler's time on.</span>
            </div>
            <select aria-label="Outside temperature" value={data?.outdoor_entity ?? ""} onChange={(e) => setOutdoor(e.target.value)} disabled={!data}>
              <option value="">None</option>
              {(data?.outdoor_candidates ?? []).map((c) => (
                <option key={c.entity_id} value={c.entity_id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <RoomSettings getHass={getHass} />

      {devices.map((d) => (
        <section key={d.entry_id} className="settings-section">
          <h3>{devices.length > 1 ? d.name : "Receiver"}</h3>
          <div className="settings-group">
            {d.channels.map((ch) => (
              <BoostRows key={ch} getHass={getHass} device={d} channel={ch} info={status[d.entry_id]?.[ch]} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function RoomSettings({ getHass }: { getHass: () => Hass }) {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  // The room being edited (or "new"), in a dialog.
  const [editing, setEditing] = useState<string | "new" | null>(null);

  useEffect(() => {
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[]; receivers: Receiver[] }>(
      (msg) => {
        setRooms(msg.rooms);
        setReceivers(msg.receivers);
      },
      { type: "hive_local/rooms/subscribe" },
    );
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass]);

  const several = receivers.length > 1;
  return (
    <section className="settings-section">
      <h3>Rooms</h3>
      <p className="muted small settings-help">Group your Hive radiator valves into rooms. Each room then has a card on the Overview.</p>
      <div className="settings-group">
        {(rooms ?? []).map((r) => (
            <button key={r.id} className="settings-row link" onClick={() => setEditing(r.id)}>
              <span className="device-icon"><Icon name="home-thermometer-outline" /></span>
              <div className="settings-text">
                <span>{r.name}</span>
                <span className="muted small">
                  {[
                    `${r.valves.length} valve${r.valves.length === 1 ? "" : "s"}`,
                    r.sensor_name ?? "temperature from the valves",
                    several ? `heated by ${r.receiver_name}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
              <Icon name="chevron-right" className="settings-chevron" />
            </button>
        ))}
        <button className="settings-row link add" onClick={() => setEditing("new")}>
          <span className="device-icon"><Icon name="plus" /></span>
          <div className="settings-text">
            <span>Add a room</span>
          </div>
        </button>
      </div>
      {editing && (
        <RoomEditorDialog
          getHass={getHass}
          room={editing === "new" ? undefined : rooms?.find((r) => r.id === editing)}
          onDone={() => setEditing(null)}
        />
      )}
    </section>
  );
}

const hours = (m: number) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} h`);
const BOOST_STEPS = [15, 30, 45, 60, 90, 120, 180, 240, 360];

function BoostRows({ getHass, device, channel, info }: { getHass: () => Hass; device: Device; channel: Channel; info?: { boost_minutes: number; boost_temperature: number; frost_temperature: number } }) {
  const [values, setValues] = useState<{ boost_minutes: number; boost_temperature: number; frost_temperature: number } | null>(null);
  const timer = useRef<number>();
  const shown = values ?? info;
  if (!shown) return null;

  const change = (key: "boost_minutes" | "boost_temperature" | "frost_temperature", value: number) => {
    const next = { ...shown, [key]: value };
    setValues(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      getHass()
        .callWS({ type: "hive_local/defaults", entry_id: device.entry_id, channel, [key]: value })
        .finally(() => setValues(null));
    }, 800);
  };
  const step = (dir: 1 | -1) => {
    const i = BOOST_STEPS.findIndex((m) => m >= shown.boost_minutes);
    const at = i < 0 ? BOOST_STEPS.length - 1 : i;
    return BOOST_STEPS[Math.min(BOOST_STEPS.length - 1, Math.max(0, at + dir))];
  };
  const water = channel === "water";

  return (
    <>
      <div className="settings-row">
        <span className="device-icon"><Icon name={water ? "water-boiler" : "radiator"} /></span>
        <div className="settings-text">
          <span>{water ? "Hot water boost" : "Heating boost"}</span>
          <span className="muted small">What Boost does unless you choose otherwise.</span>
        </div>
        <div className="settings-controls">
          <Adjust label="How long" value={hours(shown.boost_minutes)} onLower={() => change("boost_minutes", step(-1))} onRaise={() => change("boost_minutes", step(1))} />
          {!water && (
            <Adjust label="Temperature" value={`${shown.boost_temperature.toFixed(1)}°`} onLower={() => change("boost_temperature", Math.max(5, shown.boost_temperature - 0.5))} onRaise={() => change("boost_temperature", Math.min(32, shown.boost_temperature + 0.5))} />
          )}
        </div>
      </div>
      {!water && (
        <div className="settings-row">
          <span className="device-icon"><Icon name="snowflake" /></span>
          <div className="settings-text">
            <span>Frost protection</span>
            <span className="muted small">The target shown while the schedule has the heating off. Only for display: the receiver isn't changed.</span>
          </div>
          <div className="settings-controls">
            <Adjust value={`${shown.frost_temperature.toFixed(1)}°`} onLower={() => change("frost_temperature", Math.max(5, shown.frost_temperature - 0.5))} onRaise={() => change("frost_temperature", Math.min(16, shown.frost_temperature + 0.5))} />
          </div>
        </div>
      )}
    </>
  );
}

function Adjust({ label, value, onLower, onRaise }: { label?: string; value: string; onLower: () => void; onRaise: () => void }) {
  return (
    <div className="adjust">
      {label && <span className="muted small">{label}</span>}
      <div className="stepper">
        <button className="round" onClick={onLower} aria-label={`Lower ${label ?? ""}`.trim()}>
          <Icon name="minus" />
        </button>
        <span className="stepper-value">{value}</span>
        <button className="round" onClick={onRaise} aria-label={`Raise ${label ?? ""}`.trim()}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}
