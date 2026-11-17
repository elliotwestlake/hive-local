import { useEffect, useState } from "react";
import {
  CHANNEL_LABEL,
  errorText,
  type Channel,
  type ChannelInfo,
  type Device,
  type Hass,
  type Limits,
  type Mode,
} from "./types";

type Status = { kind: "ok" | "error"; text: string } | null;

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
    <>
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
    </>
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
  const [result, setResult] = useState<Status>(null);
  const [busy, setBusy] = useState(false);
  const [manualTemp, setManualTemp] = useState(20);
  const [minutes, setMinutes] = useState(info?.boost_minutes ?? 30);
  const [boostTemp, setBoostTemp] = useState(info?.boost_temperature ?? 21);

  // Follow the defaults from the boost number entities until the user changes them here.
  useEffect(() => { if (info) setMinutes(info.boost_minutes); }, [info?.boost_minutes]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (info) setBoostTemp(info.boost_temperature); }, [info?.boost_temperature]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (s?.mode === "manual" && s.setpoint != null && s.setpoint >= limits.boost_min_temp) setManualTemp(s.setpoint);
  }, [s?.mode, s?.setpoint]); // eslint-disable-line react-hooks/exhaustive-deps

  const send = async (msg: Record<string, unknown>, done: string) => {
    setBusy(true);
    try {
      await getHass().callWS({ entry_id: entryId, channel, ...msg });
      setResult({ kind: "ok", text: done });
    } catch (e) {
      setResult({ kind: "error", text: errorText(e) });
    } finally {
      setBusy(false);
    }
  };

  const setMode = (mode: Exclude<Mode, "boost">) =>
    send(
      { type: "hive_local/mode", mode, ...(mode === "manual" && !water ? { setpoint: manualTemp } : {}) },
      mode === "schedule" ? "Following the schedule" : mode === "off" ? "Turned off" : water ? "Always on" : `Holding ${manualTemp}°`,
    );

  const modes: { id: Exclude<Mode, "boost">; label: string }[] = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: water ? "Always on" : "Manual" },
    { id: "off", label: "Off" },
  ];
  const boosting = s?.mode === "boost";
  const clampTemp = (t: number) => Math.min(limits.heat_max, Math.max(limits.boost_min_temp, Math.round(t * 2) / 2));

  return (
    <section className="card">
      <div className="card-head">
        <h2>{CHANNEL_LABEL[channel]}</h2>
        {!s && <span className="muted">Waiting for the receiver…</span>}
      </div>

      <div className="control-row">
        <span className="label">Mode</span>
        <div className="segmented">
          {modes.map((m) => (
            <button key={m.id} className={s?.mode === m.id ? "on" : ""} disabled={busy} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
        {!water && s?.mode === "manual" && (
          <Stepper value={manualTemp} onChange={(t) => setManualTemp(clampTemp(t))} />
        )}
        {!water && s?.mode === "manual" && s.setpoint !== manualTemp && (
          <button className="primary" disabled={busy} onClick={() => setMode("manual")}>
            Apply
          </button>
        )}
      </div>

      <div className="control-row">
        <span className="label">Boost</span>
        {boosting ? (
          <>
            <span className="pill boost">
              Boosting{s?.boost_remaining != null ? ` · ${s.boost_remaining} min left` : ""}
            </span>
            <button disabled={busy} onClick={() => send({ type: "hive_local/cancel_boost" }, "Boost cancelled")}>
              Cancel boost
            </button>
          </>
        ) : (
          <>
            <select value={minutes} onChange={(e) => setMinutes(Number(e.target.value))}>
              {[...new Set([...BOOST_MINUTES, minutes])]
                .filter((m) => m <= limits.boost_max_minutes)
                .sort((a, b) => a - b)
                .map((m) => (
                  <option key={m} value={m}>
                    {m < 60 || m % 60 ? `${m} min` : `${m / 60} h`}
                  </option>
                ))}
            </select>
            {!water && <Stepper value={boostTemp} onChange={(t) => setBoostTemp(clampTemp(t))} />}
            <button
              className="primary"
              disabled={busy}
              onClick={() =>
                send(
                  { type: "hive_local/boost", minutes, ...(water ? {} : { temperature: boostTemp }) },
                  `Boosting for ${minutes} min`,
                )
              }
            >
              Boost
            </button>
          </>
        )}
      </div>

      {result && <div className={`status ${result.kind}`}>{result.text}</div>}
    </section>
  );
}

function Stepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="setpoint">
      <button className="icon" onClick={() => onChange(value - 0.5)} aria-label="Lower">−</button>
      <span>{value.toFixed(1)}°</span>
      <button className="icon" onClick={() => onChange(value + 0.5)} aria-label="Raise">+</button>
    </div>
  );
}
