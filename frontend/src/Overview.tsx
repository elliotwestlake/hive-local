import { CHANNEL_LABEL, type ChannelStatus, type Device, type StatusMap } from "./types";

const MODE_LABEL = { schedule: "Schedule", manual: "Manual", off: "Off", boost: "Boost" } as const;

export function Overview({
  devices,
  status,
  onOpen,
}: {
  devices: Device[];
  status: StatusMap;
  onOpen: (entryId: string) => void;
}) {
  return (
    <div className="grid">
      {devices.flatMap((d) =>
        d.channels.map((c) => {
          const s = status[d.entry_id]?.[c]?.status ?? null;
          return (
            <button key={`${d.entry_id}-${c}`} className="card tile" onClick={() => onOpen(d.entry_id)}>
              <div className="card-head">
                <h2>{CHANNEL_LABEL[c]}</h2>
                {devices.length > 1 && <span className="muted">{d.name}</span>}
              </div>
              {s ? <Summary water={c === "water"} s={s} /> : <p className="muted">Waiting for the receiver…</p>}
            </button>
          );
        }),
      )}
    </div>
  );
}

function Summary({ s, water }: { s: ChannelStatus; water: boolean }) {
  // Hot water has no temperature sensor (Z2M always reports 21°C), so only show on/off.
  const active = water ? s.mode !== "off" && s.heating : s.heating;
  // Hive uses 1°C as "off" inside a schedule.
  const target = !water && s.setpoint != null && s.setpoint > 1 ? `${s.setpoint}°` : null;
  return (
    <>
      {!water && (
        <div className="big">{s.current_temperature != null ? `${s.current_temperature.toFixed(1)}°` : "–"}</div>
      )}
      <div className="facts">
        <span className={`pill ${s.mode}`}>{MODE_LABEL[s.mode]}</span>
        <span className={active ? "on-text" : "muted"}>{water ? (active ? "On" : "Off") : active ? "Heating" : "Idle"}</span>
        {target && <span className="muted">Target {target}</span>}
        {s.mode === "boost" && (
          <span className="muted">{s.boost_remaining != null ? `${s.boost_remaining} min left` : "Boosting"}</span>
        )}
      </div>
    </>
  );
}
