import { useEffect, useState } from "react";
import { Controls } from "./Controls";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Overview } from "./Overview";
import { Rooms } from "./Rooms";
import { ScheduleEditor } from "./ScheduleEditor";
import { errorText, type Device, type Hass, type Limits, type StatusMap } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "overview" | "rooms" | "heat" | "water" | "controls";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "heat", label: "Heating", icon: "radiator" },
  { id: "water", label: "Hot water", icon: "water-boiler" },
  { id: "controls", label: "Boost & mode", icon: "tune-variant" },
];

export function App({ getHass, narrow, onToggleMenu }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [status, setStatus] = useState<StatusMap>({});
  const [entryId, setEntryId] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<{ devices: Device[]; limits: Limits }>({ type: "hive_local/devices" })
      .then((r) => {
        setDevices(r.devices);
        setLimits(r.limits);
        if (r.devices[0]) setEntryId(r.devices[0].entry_id);
      })
      .catch((e) => setError(errorText(e)));

    const unsub = getHass().connection.subscribeMessage<{ status: StatusMap }>(
      (msg) => setStatus(msg.status),
      { type: "hive_local/subscribe" },
    );
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass]);

  const device = devices.find((d) => d.entry_id === entryId);
  const hasWater = devices.some((d) => d.channels.includes("water"));
  const tabs = TABS.filter((t) => t.id !== "water" || hasWater);

  return (
    <div className="panel">
      <header>
        <div className="toolbar-row">
          {narrow && (
            <button className="menu" onClick={onToggleMenu} aria-label="Menu">
              <Icon name="menu" />
            </button>
          )}
          <Logo />
          <h1>Hive Local</h1>
          <span className="spacer" />
          {devices.length > 1 && tab !== "overview" && (
            <select className="device-select" value={entryId} onChange={(e) => setEntryId(e.target.value)}>
              {devices.map((d) => (
                <option key={d.entry_id} value={d.entry_id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
          {devices.length === 1 && <span className="device-name">{devices[0].name}</span>}
        </div>
        <nav className="tabs" role="tablist">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? "on" : ""} onClick={() => setTab(t.id)}>
              <Icon name={t.icon} />
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      <main>
        {error && <div className="status error">{error}</div>}
        {!devices.length && !error && (
          <div className="empty-state">
            <Logo size={56} />
            <p>No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local.</p>
          </div>
        )}

        {tab === "overview" && <Overview getHass={getHass} devices={devices} status={status} onOpen={(id) => { setEntryId(id); setTab("controls"); }} />}

        {tab === "rooms" && device && <Rooms key={device.entry_id} getHass={getHass} device={device} />}

        {(tab === "heat" || tab === "water") && device && limits &&
          (device.channels.includes(tab) ? (
            <ScheduleEditor key={`${device.entry_id}-${tab}`} getHass={getHass} device={device} channel={tab} limits={limits} />
          ) : (
            <div className="empty-state">
              <Icon name="water-off" />
              <p>{device.name} is heating-only, so it has no hot water.</p>
            </div>
          ))}

        {tab === "controls" && device && limits && (
          <Controls getHass={getHass} device={device} limits={limits} status={status[device.entry_id] ?? {}} />
        )}
      </main>
    </div>
  );
}
