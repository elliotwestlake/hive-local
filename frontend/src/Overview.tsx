import { useEffect, useState } from "react";
import { formatMinutes, useSender } from "./api";
import { Dial } from "./Dial";
import { Icon } from "./Icon";
import { Stepper } from "./Stepper";
import {
  CHANNEL_LABEL,
  type Channel,
  type ChannelInfo,
  type Device,
  type Hass,
  type Limits,
  type Mode,
  type StatusMap,
} from "./types";

const BOOST_MINUTES = [15, 30, 45, 60, 90, 120, 180, 240, 360];

export function Overview({
  getHass,
  devices,
  status,
  limits,
  onSchedule,
}: {
  getHass: () => Hass;
  devices: Device[];
  status: StatusMap;
  limits: Limits | null;
  onSchedule: (entryId: string, channel: Channel) => void;
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
            limits={limits}
            onSchedule={() => onSchedule(d.entry_id, c)}
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
  limits,
  onSchedule,
}: {
  getHass: () => Hass;
  device: Device;
  channel: Channel;
  info?: ChannelInfo;
  showDevice: boolean;
  limits: Limits | null;
  onSchedule: () => void;
}) {
  const water = channel === "water";
  const s = info?.status ?? null;
  const { busy, result, send } = useSender(getHass, device.entry_id, channel);

  // Hot water has no temperature sensor (Z2M always reports 21°C), so it's just on/off.
  const active = !!s && s.mode !== "off" && s.heating;
  const state = !s || s.mode === "off" ? "off" : active ? "heating" : "idle";
  // Hive reports 1°C during a schedule "off" period, when the thermostat holds its
  // frost-protection temperature (set in HA to match), so show that instead.
  const frostPeriod = !water && s?.setpoint != null && s.setpoint <= 1;
  const target = water || s?.setpoint == null ? null : frostPeriod ? info?.frost_temperature ?? null : s.setpoint;

  const modes: { id: Exclude<Mode, "boost">; label: string }[] = [
    { id: "schedule", label: "Schedule" },
    { id: "manual", label: water ? "Always on" : "Manual" },
    { id: "off", label: "Off" },
  ];
  const defaultMinutes = info?.boost_minutes ?? 30;
  const defaultTemp = info?.boost_temperature ?? 21;

  // Boost options (length and temperature), opened from the arrow beside Boost.
  const [options, setOptions] = useState(false);
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [boostTemp, setBoostTemp] = useState(defaultTemp);
  // Follow the defaults from the boost number entities until changed here.
  useEffect(() => setMinutes(defaultMinutes), [defaultMinutes]);
  useEffect(() => setBoostTemp(defaultTemp), [defaultTemp]);

  // Manual: the temperature it holds, applied with a button once changed.
  const [holdTemp, setHoldTemp] = useState(20);
  const held = s?.mode === "manual" && s.setpoint != null ? s.setpoint : null;
  useEffect(() => {
    if (held != null) setHoldTemp(held);
  }, [held]);

  const minTemp = limits?.boost_min_temp ?? 5;
  const maxTemp = limits?.heat_max ?? 32;
  const clampTemp = (t: number) => Math.min(maxTemp, Math.max(minTemp, Math.round(t * 2) / 2));
  const durations = [...new Set([...BOOST_MINUTES, minutes])]
    .filter((m) => m <= (limits?.boost_max_minutes ?? 360))
    .sort((a, b) => a - b);
  const boost = (m: number, t: number) =>
    send({ type: "hive_local/boost", minutes: m, ...(water ? {} : { temperature: t }) }, `Boosting for ${formatMinutes(m)}`).then(
      () => setOptions(false),
    );

  let caption = "Waiting for the receiver…";
  if (s) {
    if (s.mode === "off") caption = "Off";
    else if (water) caption = active ? "Heating water" : "Not heating";
    else caption = `${active ? "Heating" : "Idle"}${target != null ? ` · ${frostPeriod ? "frost" : "target"} ${target}°` : ""}`;
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
          s.mode === "schedule" ? (
            <button className="chip chip-link" onClick={onSchedule} title="Open the schedule">
              <Icon name={MODE_ICON.schedule} /> Schedule <Icon name="chevron-right" />
            </button>
          ) : (
            <span className={`chip mode-${s.mode}`}>
              <Icon name={MODE_ICON[s.mode]} />
              {s.mode === "boost"
                ? s.boost_remaining != null
                  ? `Boost · ${formatMinutes(s.boost_remaining)} left`
                  : "Boost"
                : modes.find((m) => m.id === s.mode)?.label}
            </span>
          )
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

      {!water && s?.mode === "manual" && (
        <div className="inline-row hold-row">
          <span className="muted">Hold at</span>
          <Stepper value={holdTemp} onChange={(t) => setHoldTemp(clampTemp(t))} />
          <span className="spacer" />
          {held !== holdTemp && (
            <button
              className="primary"
              disabled={busy}
              onClick={() => send({ type: "hive_local/mode", mode: "manual", setpoint: holdTemp }, `Holding ${holdTemp}°`)}
            >
              Apply
            </button>
          )}
        </div>
      )}

      <div className="card-actions">
        {s?.mode === "boost" ? (
          <button className="boost-btn cancel" disabled={busy} onClick={() => send({ type: "hive_local/cancel_boost" }, "Boost cancelled")}>
            <Icon name="close" /> Cancel boost
          </button>
        ) : (
          <div className="split">
            <button className="boost-btn" disabled={busy || !s} onClick={() => boost(defaultMinutes, defaultTemp)}>
              <Icon name="rocket-launch" /> Boost {formatMinutes(defaultMinutes)}
              {!water ? ` · ${defaultTemp}°` : ""}
            </button>
            <button
              className={`boost-btn boost-more ${options ? "on" : ""}`}
              disabled={!s}
              aria-label="Boost options"
              aria-expanded={options}
              onClick={() => setOptions(!options)}
            >
              <Icon name={options ? "chevron-up" : "chevron-down"} />
            </button>
          </div>
        )}
      </div>

      {options && s?.mode !== "boost" && (
        <div className="boost-options">
          <div className="chips" role="radiogroup" aria-label="Boost length">
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
            <button className="primary" disabled={busy} onClick={() => boost(minutes, boostTemp)}>
              <Icon name="rocket-launch" /> Boost {formatMinutes(minutes)}
            </button>
          </div>
        </div>
      )}

      {result?.kind === "error" && <div className="status error">{result.text}</div>}
    </section>
  );
}
