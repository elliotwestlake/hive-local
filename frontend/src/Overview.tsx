import { formatMinutes, useSender } from "./api";
import { Dial } from "./Dial";
import { Icon } from "./Icon";
import {
  CHANNEL_LABEL,
  type Channel,
  type ChannelInfo,
  type Device,
  type Hass,
  type Mode,
  type StatusMap,
} from "./types";

export function Overview({
  getHass,
  devices,
  status,
  onOpen,
}: {
  getHass: () => Hass;
  devices: Device[];
  status: StatusMap;
  onOpen: (entryId: string) => void;
}) {
  return (
    <div className="grid">
      {devices.flatMap((d) =>
        d.channels.map((c) => (
          <ChannelCard
            key={`${d.entry_id}-${c}`}
            getHass={getHass}
            device={d}
            channel={c}
            info={status[d.entry_id]?.[c]}
            showDevice={devices.length > 1}
            onOpen={() => onOpen(d.entry_id)}
          />
        )),
      )}
    </div>
  );
}

const MODE_ICON: Record<Mode, string> = {
  schedule: "calendar-clock",
  manual: "hand-back-right",
  off: "power",
  boost: "rocket-launch",
};

function ChannelCard({
  getHass,
  device,
  channel,
  info,
  showDevice,
  onOpen,
}: {
  getHass: () => Hass;
  device: Device;
  channel: Channel;
  info?: ChannelInfo;
  showDevice: boolean;
  onOpen: () => void;
}) {
  const water = channel === "water";
  const s = info?.status ?? null;
  const { busy, result, send } = useSender(getHass, device.entry_id, channel);

  // Hot water has no temperature sensor (Z2M always reports 21°C), so it's just on/off.
  const active = !!s && s.mode !== "off" && s.heating;
  const state = !s || s.mode === "off" ? "off" : active ? "heating" : "idle";
  // Hive uses 1°C as "off" inside a schedule.
  const target = !water && s?.setpoint != null && s.setpoint > 1 ? s.setpoint : null;

  const modes: { id: Exclude<Mode, "boost">; label: string }[] = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: water ? "Always on" : "Manual" },
    { id: "off", label: "Off" },
  ];
  const minutes = info?.boost_minutes ?? 30;

  let caption = "Waiting for the receiver…";
  if (s) {
    if (s.mode === "off") caption = "Off";
    else if (water) caption = active ? "Heating water" : "Not heating";
    else caption = `${active ? "Heating" : "Idle"}${target != null ? ` · target ${target}°` : ""}`;
  }

  return (
    <section className={`card channel ${channel} ${state}`}>
      <div className="card-head">
        <div className="title">
          <Icon name={water ? "water-boiler" : "radiator"} className="title-icon" />
          <div>
            <h2>{CHANNEL_LABEL[channel]}</h2>
            {showDevice && <div className="muted small">{device.name}</div>}
          </div>
        </div>
        {s && (
          <span className={`chip mode-${s.mode}`}>
            <Icon name={MODE_ICON[s.mode]} />
            {s.mode === "boost"
              ? s.boost_remaining != null
                ? `Boost · ${formatMinutes(s.boost_remaining)} left`
                : "Boost"
              : modes.find((m) => m.id === s.mode)?.label}
          </span>
        )}
      </div>

      {water ? (
        <div className={`water-state ${state}`}>
          <div className="water-orb">
            <Icon name={state === "off" ? "water-boiler-off" : "water-boiler"} />
          </div>
          <div className="dial-caption">{caption}</div>
        </div>
      ) : (
        <Dial current={s?.current_temperature ?? null} target={target} state={state} caption={caption} />
      )}

      <div className="segmented full">
        {modes.map((m) => (
          <button
            key={m.id}
            className={s?.mode === m.id ? "on" : ""}
            disabled={busy || !s}
            onClick={() =>
              send({ type: "hive_local/mode", mode: m.id }, m.id === "schedule" ? "Following the schedule" : m.label)
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="card-actions">
        {s?.mode === "boost" ? (
          <button className="boost-btn cancel" disabled={busy} onClick={() => send({ type: "hive_local/cancel_boost" }, "Boost cancelled")}>
            <Icon name="close" /> Cancel boost
          </button>
        ) : (
          <button
            className="boost-btn"
            disabled={busy || !s}
            onClick={() => send({ type: "hive_local/boost" }, `Boosting for ${formatMinutes(minutes)}`)}
          >
            <Icon name="rocket-launch" /> Boost {formatMinutes(minutes)}
            {!water && info ? ` · ${info.boost_temperature}°` : ""}
          </button>
        )}
        <button className="ghost" onClick={onOpen}>
          More <Icon name="chevron-right" />
        </button>
      </div>

      {result?.kind === "error" && <div className="status error">{result.text}</div>}
    </section>
  );
}
