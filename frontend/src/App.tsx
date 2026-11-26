import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Overview } from "./Overview";
import { DevicePage, type DeviceTab } from "./DevicePage";
import { Devices } from "./Devices";
import { RoomSheet } from "./Rooms";
import { Onboarding } from "./Onboarding";
import { Settings } from "./Settings";
import { Stats } from "./Stats";
import { errorText, type Channel, type Device, type Hass, type Limits, type StatusMap } from "./types";

interface Props {
  getHass: () => Hass;
  narrow: boolean;
  onToggleMenu: () => void;
}

type Tab = "overview" | "devices" | "stats" | "settings";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "overview", label: "Overview", icon: "view-dashboard-outline" },
  { id: "devices", label: "Devices", icon: "devices" },
  { id: "stats", label: "Stats", icon: "chart-box-outline" },
  { id: "settings", label: "Settings", icon: "tune-variant" },
];

export function App({ getHass, narrow, onToggleMenu }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [limits, setLimits] = useState<Limits | null>(null);
  const [status, setStatus] = useState<StatusMap>({});
  const [tab, setTab] = useState<Tab>("overview");
  // Heating or hot water opened from its Overview card, and which of its tabs is showing.
  const [opened, setOpened] = useState<{ entry: string; channel: Channel } | null>(null);
  const [deviceTab, setDeviceTab] = useState<DeviceTab>("control");
  // A room opened (as a sheet) from its Overview card.
  const [openedRoom, setOpenedRoom] = useState<string | null>(null);
  const [error, setError] = useState("");
  // The first-run walkthrough: shown until it's finished or skipped (stored house-wide).
  const [onboarding, setOnboarding] = useState(false);

  useEffect(() => {
    getHass()
      .callWS<{ devices: Device[]; limits: Limits }>({ type: "hive_local/devices" })
      .then((r) => {
        setDevices(r.devices);
        setLimits(r.limits);
      })
      .catch((e) => setError(errorText(e)));

    getHass()
      .callWS<{ onboarded?: boolean }>({ type: "hive_local/settings" })
      .then((r) => setOnboarding(r.onboarded === false))
      .catch(() => {});

    const unsub = getHass().connection.subscribeMessage<{ status: StatusMap }>(
      (msg) => setStatus(msg.status),
      { type: "hive_local/subscribe" },
    );
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass]);

  const openDevice = (entry: string, channel: Channel) => {
    setOpened({ entry, channel });
    setDeviceTab("control");
  };
  const goTo = (t: Tab) => {
    setTab(t);
    setOpened(null);
    setOpenedRoom(null);
  };
  const openedDevice = opened && devices.find((d) => d.entry_id === opened.entry);
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
              <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? "on" : ""} onClick={() => goTo(t.id)}>
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

        {/* A device's page opens over whichever tab it was opened from; back returns there. */}
        {openedDevice && limits ? (
          <DevicePage
            key={`${opened!.entry}-${opened!.channel}`}
            getHass={getHass}
            device={openedDevice}
            channel={opened!.channel}
            info={status[openedDevice.entry_id]?.[opened!.channel]}
            limits={limits}
            showDevice={devices.length > 1}
            tab={deviceTab}
            onTab={setDeviceTab}
            onBack={() => setOpened(null)}
          />
        ) : (
          <>
            {tab === "overview" && (
              <Overview getHass={getHass} devices={devices} status={status} limits={limits} onOpenDevice={openDevice} onOpenRoom={setOpenedRoom} />
            )}
            {tab === "devices" && devices.length > 0 && <Devices getHass={getHass} devices={devices} status={status} limits={limits} onOpenDevice={openDevice} />}
            {tab === "stats" && devices.length > 0 && <Stats getHass={getHass} devices={devices} />}
            {tab === "settings" && devices.length > 0 && <Settings getHass={getHass} devices={devices} status={status} onSetup={() => setOnboarding(true)} />}
          </>
        )}
        {openedRoom && (
          <RoomSheet
            getHass={getHass}
            roomId={openedRoom}
            several={devices.length > 1}
            onClose={() => setOpenedRoom(null)}
          />
        )}
      </main>

      {onboarding && devices.length > 0 && (
        <Onboarding
          getHass={getHass}
          devices={devices}
          status={status}
          onDone={() => {
            setOnboarding(false);
            setTab("overview");
            getHass().callWS({ type: "hive_local/settings/set", onboarded: true }).catch(() => {});
          }}
        />
      )}
    </div>
  );
}
