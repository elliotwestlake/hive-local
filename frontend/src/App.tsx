import { useEffect, useState } from "react";
import { Controls } from "./Controls";
import { Overview } from "./Overview";
import { ScheduleEditor } from "./ScheduleEditor";
import { errorText, type Device, type Hass, type Limits, type StatusMap } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "overview" | "heat" | "water" | "controls";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "heat", label: "Heating" },
  { id: "water", label: "Hot water" },
  { id: "controls", label: "Boost & mode" },
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
        {narrow && (
          <button className="icon" onClick={onToggleMenu} aria-label="Menu">
            ☰
          </button>
        )}
        <h1>Hive</h1>
      </header>

      <nav className="tabs">
        {tabs.map((t) => (
          <button key={t.id} className={t.id === tab ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </nav>

      <main>
        {error && <div className="status error">{error}</div>}
        {!devices.length && !error && (
          <p className="muted">No receivers configured. Add one under Settings → Devices & services.</p>
        )}

        {tab !== "overview" && devices.length > 1 && (
          <div className="toolbar">
            <select value={entryId} onChange={(e) => setEntryId(e.target.value)}>
              {devices.map((d) => (
                <option key={d.entry_id} value={d.entry_id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {tab === "overview" && <Overview devices={devices} status={status} onOpen={(id) => { setEntryId(id); setTab("controls"); }} />}

        {(tab === "heat" || tab === "water") && device && limits &&
          (device.channels.includes(tab) ? (
            <ScheduleEditor key={`${device.entry_id}-${tab}`} getHass={getHass} device={device} channel={tab} limits={limits} />
          ) : (
            <p className="muted">{device.name} has no hot water (it's a heating-only receiver).</p>
          ))}

        {tab === "controls" && device && limits && (
          <Controls getHass={getHass} device={device} limits={limits} status={status[device.entry_id] ?? {}} />
        )}
      </main>
    </div>
  );
}
