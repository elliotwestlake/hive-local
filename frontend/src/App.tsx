import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Overview } from "./Overview";
import { ReceiverList } from "./ReceiverList";
import { Rooms } from "./Rooms";
import { ScheduleEditor } from "./ScheduleEditor";
import { Stats } from "./Stats";
import { CHANNEL_LABEL, errorText, type Channel, type Device, type Hass, type Limits, type StatusMap } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "overview" | "rooms" | "schedule" | "stats";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "rooms", label: "Rooms", icon: "home-thermometer-outline" },
  { id: "schedule", label: "Schedule", icon: "calendar-clock" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
];

export function App({ getHass, narrow, onToggleMenu }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [status, setStatus] = useState<StatusMap>({});
  const [tab, setTab] = useState<Tab>("overview");
  // With several receivers, the one opened on Schedule. It stays open across tabs.
  const [opened, setOpened] = useState<string | null>(null);
  // Schedule: heating or hot water, and the editors opened so far. They stay mounted
  // (hidden) so switching channel keeps unwritten changes and doesn't re-read.
  const [schedChannel, setSchedChannel] = useState<Channel>("heat");
  const [visited, setVisited] = useState<Set<string>>(new Set());
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
  const receiverView = (render: (d: Device) => JSX.Element) => {
    if (devices.length <= 1) return devices.map((d) => <section key={d.entry_id} className="receiver-section">{render(d)}</section>);
    const d = devices.find((x) => x.entry_id === opened);
    if (!d) return <ReceiverList devices={devices} status={status} channel="heat" onOpen={setOpened} />;
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

  // Remember each schedule editor once it's been shown.
  const schedDevice = devices.length <= 1 ? devices[0] : devices.find((x) => x.entry_id === opened);
  const schedKey =
    tab === "schedule" && schedDevice
      ? `${schedDevice.entry_id}-${schedDevice.channels.includes(schedChannel) ? schedChannel : schedDevice.channels[0]}`
      : null;
  useEffect(() => {
    if (schedKey) setVisited((v) => (v.has(schedKey) ? v : new Set(v).add(schedKey)));
  }, [schedKey]);

  const openSchedule = (entryId: string, channel: Channel) => {
    setOpened(entryId);
    setSchedChannel(channel);
    setTab("schedule");
  };

  const schedules = (d: Device, limits: Limits) => {
    const channel = d.channels.includes(schedChannel) ? schedChannel : d.channels[0];
    const key = (c: Channel) => `${d.entry_id}-${c}`;
    return (
      <>
        {d.channels.length > 1 && (
          <div className="segmented channel-switch" role="tablist" aria-label="Schedule">
            {d.channels.map((c) => (
              <button key={c} role="tab" aria-selected={c === channel} className={c === channel ? "on" : ""} onClick={() => setSchedChannel(c)}>
                <Icon name={c === "water" ? "water-boiler" : "radiator"} /> {CHANNEL_LABEL[c]}
              </button>
            ))}
          </div>
        )}
        {d.channels
          .filter((c) => c === channel || visited.has(key(c)))
          .map((c) => (
            <div key={key(c)} hidden={c !== channel}>
              <ScheduleEditor getHass={getHass} device={d} channel={c} limits={limits} />
            </div>
          ))}
      </>
    );
  };
  const tabs = TABS;

  return (
    <div className="panel">
      <header>
        <div className="toolbar-row">
          {narrow && (
            <button className="menu" onClick={onToggleMenu} aria-label="Menu">
              <Icon name="menu" />
            </button>
          )}
          <div className="brand">
            <Logo />
            <h1>Hive Local</h1>
          </div>
          <nav className="tabs" role="tablist">
            {tabs.map((t) => (
              <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? "on" : ""} onClick={() => setTab(t.id)}>
                <Icon name={t.icon} />
                <span>{t.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {error && <div className="status error">{error}</div>}
        {!devices.length && !error && (
          <div className="empty-state">
            <Logo size={56} />
            <p>No receivers yet. Add one under Settings → Devices & services → Add integration → Hive Local.</p>
          </div>
        )}

        {tab === "overview" && <Overview getHass={getHass} devices={devices} status={status} limits={limits} onSchedule={openSchedule} />}

        {tab === "rooms" && devices.length > 0 && <Rooms getHass={getHass} />}

        {tab === "schedule" && limits && receiverView((d) => schedules(d, limits))}

        {tab === "stats" && devices.length > 0 && <Stats getHass={getHass} devices={devices} />}
      </main>
    </div>
  );
}
