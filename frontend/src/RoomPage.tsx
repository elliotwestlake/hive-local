import { useEffect, useState } from "react";
import type { DeviceTab } from "./DevicePage";
import { Icon } from "./Icon";
import { RoomCard } from "./Overview";
import { RoomControl, roomModeText } from "./Rooms";
import { RoomScheduleDialog } from "./RoomSchedule";
import { Stats } from "./Stats";
import type { Device, Hass, Limits, Room, StatusMap } from "./types";

const TABS: { id: DeviceTab; label: string }[] = [
  { id: "control", label: "Control" },
  { id: "schedule", label: "Schedule" },
  { id: "history", label: "History" },
];

/**
 * A room on its own page, the same as heating's (Elliot: "an identical idea"): a back arrow
 * and its name, then Control (temperature and Boost, the target, Schedule / Manual / Off,
 * the valves), Schedule (the one kept on its valves) and History (its climate entity).
 */
export function RoomPage({
  getHass,
  roomId,
  devices,
  status,
  limits,
  tab,
  onTab,
  onBack,
}: {
  getHass: () => Hass;
  roomId: string;
  devices: Device[];
  status: StatusMap;
  limits: Limits | null;
  tab: DeviceTab;
  onTab: (t: DeviceTab) => void;
  onBack: () => void;
}) {
  const [room, setRoom] = useState<Room | null>(null);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[] }>(
      (msg) => {
        const found = msg.rooms.find((r) => r.id === roomId) ?? null;
        setRoom(found);
        setGone(!found);
      },
      { type: "hive_local/rooms/subscribe" },
    );
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass, roomId]);
  // Deleted from its own page (Edit room → Delete): back to the overview.
  useEffect(() => {
    if (gone) onBack();
  }, [gone, onBack]);
  // The schedule stays mounted (hidden) once opened, so moving between tabs keeps unsaved
  // changes and doesn't wake the valves again.
  const [scheduleOpened, setScheduleOpened] = useState(tab === "schedule");
  useEffect(() => {
    if (tab === "schedule") setScheduleOpened(true);
  }, [tab]);

  if (!room) return null;
  const several = devices.length > 1;
  const heat = status[room.receiver ?? devices[0]?.entry_id ?? ""]?.heat;
  const subtitle = [several ? room.receiver_name : null, roomModeText(room)].filter(Boolean).join(" · ");

  return (
    <div className="device-page room-page">
      <div className="page-head">
        <button className="round ghost" onClick={onBack} aria-label="Back to the overview">
          <Icon name="chevron-left" />
        </button>
        <div className="page-title">
          <h2>{room.name}</h2>
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
        <>
          <RoomCard
            getHass={getHass}
            room={room}
            showReceiver={false}
            limits={limits}
            defaultMinutes={heat?.boost_minutes ?? 60}
            defaultTemp={heat?.boost_temperature ?? 21}
            page
          />
          <RoomControl getHass={getHass} room={room} />
        </>
      )}
      {scheduleOpened && (
        <div hidden={tab !== "schedule"}>
          <RoomScheduleDialog getHass={getHass} room={room} page />
        </div>
      )}
      {tab === "history" && <Stats getHass={getHass} devices={devices} roomId={room.id} />}
    </div>
  );
}
