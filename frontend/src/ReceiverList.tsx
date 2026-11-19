import { formatMinutes } from "./api";
import { Icon } from "./Icon";
import type { Channel, ChannelStatus, Device, StatusMap } from "./types";

interface Props {
  devices: Device[];
  status: StatusMap;
  channel: Channel;
  onOpen: (entryId: string) => void;
}

const MODE: Record<Channel, Record<string, string>> = {
  heat: { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" },
  water: { schedule: "Schedule", manual: "Always on", off: "Off", boost: "Boost" },
};

function summary(channel: Channel, s: ChannelStatus | null | undefined): string {
  if (!s) return "Waiting for the receiver…";
  const mode =
    s.mode === "boost" && s.boost_remaining != null
      ? `Boost · ${formatMinutes(s.boost_remaining)} left`
      : MODE[channel][s.mode] ?? s.mode;
  if (channel === "water") return `${mode} · ${s.heating ? "heating water" : "idle"}`;
  const temp = s.current_temperature == null ? "–" : `${s.current_temperature.toFixed(1)}°`;
  return `${temp} · ${mode}${s.heating ? " · heating" : ""}`;
}

/** With more than one receiver: a card per receiver; clicking one opens it. */
export function ReceiverList({ devices, status, channel, onOpen }: Props) {
  return (
    <div className="grid">
      {devices.map((d) => {
        const s = status[d.entry_id]?.[channel]?.status;
        return (
          <button key={d.entry_id} className={`card receiver-card ${channel}`} onClick={() => onOpen(d.entry_id)}>
            <Icon name={channel === "water" ? "water-boiler" : "radiator"} className="title-icon" />
            <span className="receiver-text">
              <span className="receiver-name">{d.name}</span>
              <span className="muted small">{summary(channel, s)}</span>
            </span>
            {s?.heating && <span className="dot-heating" aria-label="Heating" />}
            <Icon name="chevron-right" />
          </button>
        );
      })}
    </div>
  );
}
