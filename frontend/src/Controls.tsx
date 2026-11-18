import { useEffect, useState } from "react";
import { formatMinutes, useSender } from "./api";
import { Icon } from "./Icon";
import {
  CHANNEL_LABEL,
  type Channel,
  type ChannelInfo,
  type Device,
  type Hass,
  type Limits,
  type Mode,
} from "./types";

const BOOST_MINUTES = [15, 30, 45, 60, 90, 120, 180, 240, 360];

export function Controls({
  getHass,
  device,
  limits,
  status,
}: {
  getHass: () => Hass;
  device: Device;
  limits: Limits;
  status: Partial<Record<Channel, ChannelInfo>>;
}) {
  return (
    <div className="stack">
      {device.channels.map((c) => (
        <ChannelControls
          key={`${device.entry_id}-${c}`}
          getHass={getHass}
          entryId={device.entry_id}
          channel={c}
          limits={limits}
          info={status[c]}
        />
      ))}
    </div>
  );
}

function ChannelControls({
  getHass,
  entryId,
  channel,
  limits,
  info,
}: {
  getHass: () => Hass;
  entryId: string;
  channel: Channel;
  limits: Limits;
  info?: ChannelInfo;
}) {
  const water = channel === "water";
  const s = info?.status ?? null;
  const { busy, result, send } = useSender(getHass, entryId, channel);
  const [manualTemp, setManualTemp] = useState(20);
  const [minutes, setMinutes] = useState(info?.boost_minutes ?? 30);
  const [boostTemp, setBoostTemp] = useState(info?.boost_temperature ?? 21);

  // Follow the defaults from the boost number entities until the user changes them here.
  useEffect(() => { if (info) setMinutes(info.boost_minutes); }, [info?.boost_minutes]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (info) setBoostTemp(info.boost_temperature); }, [info?.boost_temperature]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (s?.mode === "manual" && s.setpoint != null && s.setpoint >= limits.boost_min_temp) setManualTemp(s.setpoint);
  }, [s?.mode, s?.setpoint]); // eslint-disable-line react-hooks/exhaustive-deps

  const setMode = (mode: Exclude<Mode, "boost">) =>
    send(
      { type: "hive_local/mode", mode, ...(mode === "manual" && !water ? { setpoint: manualTemp } : {}) },
      mode === "schedule" ? "Following the schedule" : mode === "off" ? "Turned off" : water ? "Always on" : `Holding ${manualTemp}°`,
    );

  const modes: { id: Exclude<Mode, "boost">; label: string; icon: string; hint: string }[] = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock", hint: "Follow the schedule on the receiver" },
    water
      ? { id: "manual", label: "Always on", icon: "water-boiler", hint: "Keep the hot water on" }
      : { id: "manual", label: "Manual", icon: "hand-back-right", hint: "Hold one temperature" },
    { id: "off", label: "Off", icon: "power", hint: water ? "No hot water" : "Frost protection only" },
  ];
  const boosting = s?.mode === "boost";
  const clampTemp = (t: number) => Math.min(limits.heat_max, Math.max(limits.boost_min_temp, Math.round(t * 2) / 2));
  const durations = [...new Set([...BOOST_MINUTES, minutes])]
    .filter((m) => m <= limits.boost_max_minutes)
    .sort((a, b) => a - b);

  return (
    <section className={`card ${channel}`}>
      <div className="card-head">
        <div className="title">
          <Icon name={water ? "water-boiler" : "radiator"} className="title-icon" />
          <h2>{CHANNEL_LABEL[channel]}</h2>
        </div>
        {!s && <span className="muted">Waiting for the receiver…</span>}
      </div>

      <h3>Mode</h3>
      <div className="mode-grid">
        {modes.map((m) => (
          <button
            key={m.id}
            className={`mode-tile ${s?.mode === m.id ? "on" : ""}`}
            disabled={busy}
            onClick={() => setMode(m.id)}
          >
            <Icon name={m.icon} />
            <span className="mode-label">{m.label}</span>
            <span className="muted small">{m.hint}</span>
          </button>
        ))}
      </div>
      {!water && s?.mode === "manual" && (
        <div className="inline-row">
          <span className="muted">Hold at</span>
          <Stepper value={manualTemp} onChange={(t) => setManualTemp(clampTemp(t))} />
          {s.setpoint !== manualTemp && (
            <button className="primary" disabled={busy} onClick={() => setMode("manual")}>
              Apply
            </button>
          )}
        </div>
      )}

      <h3>Boost</h3>
      {boosting ? (
        <div className="boost-live">
          <Icon name="rocket-launch" className="boost-icon" />
          <div>
            <div className="boost-title">Boosting{!water && s?.setpoint != null ? ` to ${s.setpoint}°` : ""}</div>
            <div className="muted">
              {s?.boost_remaining != null ? `${formatMinutes(s.boost_remaining)} left` : "Time left unknown"}
            </div>
          </div>
          <span className="spacer" />
          <button disabled={busy} onClick={() => send({ type: "hive_local/cancel_boost" }, "Boost cancelled")}>
            Cancel boost
          </button>
        </div>
      ) : (
        <>
          <div className="chips" role="radiogroup" aria-label="Boost duration">
            {durations.map((m) => (
              <button key={m} role="radio" aria-checked={m === minutes} className={`chip-btn ${m === minutes ? "on" : ""}`} onClick={() => setMinutes(m)}>
                {formatMinutes(m)}
              </button>
            ))}
          </div>
          <div className="inline-row">
            {!water && (
              <>
                <span className="muted">Temperature</span>
                <Stepper value={boostTemp} onChange={(t) => setBoostTemp(clampTemp(t))} />
              </>
            )}
            <span className="spacer" />
            <button
              className="primary"
              disabled={busy}
              onClick={() =>
                send(
                  { type: "hive_local/boost", minutes, ...(water ? {} : { temperature: boostTemp }) },
                  `Boosting for ${formatMinutes(minutes)}`,
                )
              }
            >
              <Icon name="rocket-launch" /> Boost {formatMinutes(minutes)}
            </button>
          </div>
        </>
      )}

      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="stepper">
      <button className="round" onClick={() => onChange(value - 0.5)} aria-label="Lower">
        <Icon name="minus" />
      </button>
      <span className="stepper-value">{value.toFixed(1)}°</span>
      <button className="round" onClick={() => onChange(value + 0.5)} aria-label="Raise">
        <Icon name="plus" />
      </button>
    </div>
  );
}
