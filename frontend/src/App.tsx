import { useEffect, useState } from "react";
import { Controls } from "./Controls";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Overview } from "./Overview";
import { ReceiverList } from "./ReceiverList";
import { Rooms } from "./Rooms";
import { ScheduleEditor } from "./ScheduleEditor";
import { errorText, type Channel, type Device, type Hass, type Limits, type StatusMap } from "./types";

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
  const [tab, setTab] = useState<Tab>("overview");
  // With several receivers, the one opened on Heating / Hot water / Boost & mode.
  // It stays open while moving between those tabs.
  const [opened, setOpened] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<{ devices: Device[]; limits: Limits }>({ type: "hive_local/devices" })
      .then((r) => {
        setDevices(r.devices);
        setLimits(r.limits);
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

  // One receiver: straight in. Several: a card per receiver to click into, and a way back.
  const receiverView = (list: Device[], channel: Channel, render: (d: Device) => JSX.Element) => {
    if (list.length <= 1)
      return list.map((d) => (
        <section key={d.entry_id} className="receiver-section">
          {/* Several receivers but only one fits this tab (e.g. hot water): still say which. */}
          {devices.length > 1 && (
            <div className="receiver-crumb">
              <h2>{d.name}</h2>
            </div>
          )}
          {render(d)}
        </section>
      ));
    const d = list.find((x) => x.entry_id === opened);
    if (!d) return <ReceiverList devices={list} status={status} channel={channel} onOpen={setOpened} />;
    return (
      <section className="receiver-section">
        <div className="receiver-crumb">
          <button className="ghost" onClick={() => setOpened(null)}>
            <Icon name="chevron-left" /> All receivers
          </button>
          <h2>{d.name}</h2>
        </div>
        {render(d)}
      </section>
    );
  };
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

        {tab === "overview" && <Overview getHass={getHass} devices={devices} status={status} onOpen={(id) => { setTab("controls"); setOpened(id); }} />}

        {tab === "rooms" && devices.length > 0 && limits && <Rooms getHass={getHass} limits={limits} />}

        {(tab === "heat" || tab === "water") &&
          limits &&
          receiverView(
            devices.filter((d) => d.channels.includes(tab)),
            tab,
            (d) => <ScheduleEditor key={`${d.entry_id}-${tab}`} getHass={getHass} target={{ kind: "receiver", device: d, channel: tab }} limits={limits} />,
          )}

        {tab === "controls" &&
          limits &&
          receiverView(devices, "heat", (d) => (
            <Controls getHass={getHass} device={d} limits={limits} status={status[d.entry_id] ?? {}} />
          ))}
      </main>
    </div>
  );
}
