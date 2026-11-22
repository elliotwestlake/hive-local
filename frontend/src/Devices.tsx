import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";
import { CHANNEL_LABEL, errorText, type Channel, type Device, type Hass, type Limits, type StatusMap, type ValveInfo } from "./types";

const LOW_BATTERY = 20;
const REFRESH_MS = 60_000;

/** The hardware: receivers (each channel opens its page) and every Hive radiator valve. */
export function Devices({
  getHass,
  devices,
  status,
  limits,
  onOpenDevice,
}: {
  getHass: () => Hass;
  devices: Device[];
  status: StatusMap;
  limits: Limits | null;
  onOpenDevice: (entryId: string, channel: Channel) => void;
}) {
  const [valves, setValves] = useState<ValveInfo[] | null>(null);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const load = useCallback(() => {
    getHass()
      .callWS<{ valves: ValveInfo[] }>({ type: "hive_local/rooms/valves" })
      .then((r) => setValves(r.valves))
      .catch((e) => setError(errorText(e)));
  }, [getHass]);
  useEffect(() => {
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => clearInterval(id);
  }, [load]);

  const several = devices.length > 1;
  return (
    <div className="stack devices-page">
      <h2 className="history-title">Devices</h2>
      {error && <div className="status error">{error}</div>}
      <div className="device-grid">
        {devices.map((d) => (
          <ReceiverCard key={d.entry_id} device={d} status={status} onOpen={(c) => onOpenDevice(d.entry_id, c)} />
        ))}
        {valves?.map((v) => <ValveCard key={v.entity_id} valve={v} />)}
      </div>
      {valves && !valves.length && (
        <p className="muted">No Hive radiator valves yet. Pair them with ZHA or Zigbee2MQTT and they'll show up here.</p>
      )}
      {several && <p className="muted small">Each receiver is a heating zone.</p>}

      <div className="fab-wrap">
        <button className="fab" aria-label="Add a device" onClick={() => setAdding(true)}>
          <Icon name="plus" />
        </button>
      </div>
      {adding && <AddDeviceSheet onClose={() => setAdding(false)} />}
    </div>
  );
}

const CONNECTION: Record<string, string> = { z2m: "Zigbee2MQTT", zha: "ZHA" };

/** About the device itself: what it is, how it's connected, and whether it's online. */
function Facts({ items }: { items: { icon: string; text: string; warn?: boolean }[] }) {
  return (
    <div className="facts">
      {items.map((f) => (
        <span key={f.text} className={`fact ${f.warn ? "warn" : ""}`}>
          <Icon name={f.icon} /> {f.text}
        </span>
      ))}
    </div>
  );
}

function Online({ online, text }: { online: boolean; text?: string }) {
  return <span className={`online ${online ? "" : "no"}`}><i />{text ?? (online ? "Online" : "Not responding")}</span>;
}

function ReceiverCard({ device: d, status, onOpen }: { device: Device; status: StatusMap; onOpen: (c: Channel) => void }) {
  const reported = d.channels.some((c) => status[d.entry_id]?.[c]?.status);
  return (
    <section className="card hw">
      <div className="hw-head">
        <span className="device-icon"><Icon name="radiator" /></span>
        <div className="device-name">
          <span>{d.name}</span>
          <span className="muted small">Hive receiver{d.model ? ` · ${d.model}` : ""}</span>
        </div>
        <Online online={reported} text={reported ? "Online" : "Waiting"} />
      </div>
      <Facts
        items={[
          { icon: "zigbee", text: CONNECTION[d.transport ?? "z2m"] },
          { icon: "fire", text: d.channels.includes("water") ? "Heating and hot water" : "Heating only" },
        ]}
      />
      <div className="hw-links">
        {d.channels.map((c) => (
          <button key={c} className="hw-link" onClick={() => onOpen(c)}>
            {CHANNEL_LABEL[c]} <Icon name="chevron-right" />
          </button>
        ))}
      </div>
    </section>
  );
}

/** A Hive radiator valve: where it is, its battery, and whether it's responding. */
function ValveCard({ valve: v }: { valve: ValveInfo }) {
  const battery = v.battery != null && !Number.isNaN(Number(v.battery)) ? Number(v.battery) : null;
  const low = battery != null && battery < LOW_BATTERY;
  return (
    <section className={`card hw ${v.available ? "" : "off"}`}>
      <div className="hw-head">
        <span className="device-icon"><Icon name="thermostat" /></span>
        <div className="device-name">
          <span>{v.name}</span>
          <span className="muted small">Hive radiator valve</span>
        </div>
        <Online online={v.available} />
      </div>
      <Facts
        items={[
          { icon: "home-outline", text: v.room ?? "Not in a room" },
          ...(battery != null ? [{ icon: low ? "battery-alert-variant-outline" : "battery-high", text: `Battery ${battery}%`, warn: low }] : []),
          ...(v.available && v.current_temperature != null ? [{ icon: "thermometer", text: `${Number(v.current_temperature).toFixed(1)}° now` }] : []),
        ]}
      />
    </section>
  );
}

/** "+" on the Devices tab: a receiver through Home Assistant, or how to add a valve. */
function AddDeviceSheet({ onClose }: { onClose: () => void }) {
  const [valveHelp, setValveHelp] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  // Receivers are added with Home Assistant's own config flow.
  const addReceiver = () => {
    history.pushState(null, "", "/config/integrations/dashboard/add?domain=hive_local");
    window.dispatchEvent(new CustomEvent("location-changed"));
    onClose();
  };
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet heat" role="dialog" aria-modal="true" aria-label="Add a device" onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        <div className="sheet-title">
          <h2>Add a device</h2>
        </div>
        <div className="add-options">
          <button className="add-option" onClick={addReceiver}>
            <span className="device-icon"><Icon name="radiator" /></span>
            <span className="add-text">
              <b>Hive receiver</b>
              <span className="muted small">A boiler receiver (another heating zone). Opens Home Assistant's setup for Hive Local.</span>
            </span>
            <Icon name="chevron-right" />
          </button>
          <button className="add-option" onClick={() => setValveHelp(!valveHelp)}>
            <span className="device-icon"><Icon name="thermostat" /></span>
            <span className="add-text">
              <b>Radiator valve</b>
              <span className="muted small">
                {valveHelp
                  ? "Pair it with ZHA or Zigbee2MQTT first (Settings → Devices & services). It then appears here, and you can put it in a room on the Rooms tab."
                  : "A Hive radiator valve (UK7004240)."}
              </span>
            </span>
            <Icon name={valveHelp ? "chevron-up" : "chevron-down"} />
          </button>
        </div>
        <button className="ghost sheet-cancel" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
