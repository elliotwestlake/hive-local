import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { ChannelCard } from "./Overview";
import { PreheatCard } from "./Preheat";
import { ScheduleEditor } from "./ScheduleEditor";
import { Stats } from "./Stats";
import { CHANNEL_LABEL, type Channel, type ChannelInfo, type Device, type Hass, type Limits } from "./types";

export type DeviceTab = "control" | "schedule" | "history";

const TABS: { id: DeviceTab; label: string }[] = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" },
];

/**
 * Heating or hot water on its own page, opened from its Overview card (as in the Hive app):
 * a back arrow and its name, then Control · Schedule · History.
 */
export function DevicePage({
  getHass,
  device,
  channel,
  info,
  limits,
  showDevice,
  tab,
  onTab,
  onBack,
}: {
  getHass: () => Hass;
  device: Device;
  channel: Channel;
  info?: ChannelInfo;
  limits: Limits;
  showDevice: boolean;
  tab: DeviceTab;
  onTab: (t: DeviceTab) => void;
  onBack: () => void;
}) {
  // The schedule editor stays mounted (hidden) once opened, so moving between tabs keeps
  // unwritten changes and doesn't read the receiver again.
  const [scheduleOpened, setScheduleOpened] = useState(tab === "schedule");
  useEffect(() => {
    if (tab === "schedule") setScheduleOpened(true);
  }, [tab]);
  const s = info?.status;
  const subtitle = [
    showDevice ? device.name : null,
    !s ? "Waiting for the receiver" : s.mode === "schedule" ? "On schedule" : s.mode === "boost" ? (info?.preheat?.active_for ? `Pre-heating for ${info.preheat.active_for}` : "Boosting") : s.mode === "off" ? "Off" : channel === "water" ? "Always on" : "Manual",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="device-page">
      <div className="page-head">
        <button className="round ghost" onClick={onBack} aria-label="Back to the overview">
          <Icon name="chevron-left" />
        </button>
        <div className="page-title">
          <h2>{CHANNEL_LABEL[channel]}</h2>
          <span className="muted small">{subtitle}</span>
        </div>
      </div>
      <div className="page-tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === tab} className={t.id === tab ? "on" : ""} onClick={() => onTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "control" && (
        <ChannelCard getHass={getHass} device={device} channel={channel} info={info} showDevice={false} limits={limits} page />
      )}
      {tab === "control" && channel === "heat" && info?.preheat && <PreheatCard getHass={getHass} device={device} info={info.preheat} />}
      {scheduleOpened && (
        <div hidden={tab !== "schedule"}>
          <ScheduleEditor getHass={getHass} device={device} channel={channel} limits={limits} mode={s?.mode ?? null} preheatFor={s?.mode === "boost" ? info?.preheat?.active_for ?? null : null} />
        </div>
      )}
      {tab === "history" && <Stats getHass={getHass} devices={[device]} channel={channel} />}
    </div>
  );
}
