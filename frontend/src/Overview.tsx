import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatMinutes, useSender } from "./api";
import { Icon } from "./Icon";
import { errorText, type Room } from "./types";
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

// "How long" in the boost sheet (plus the default boost length, if it isn't one of these).
const BOOST_MINUTES = [30, 60, 120, 180];

type Filter = "all" | Channel | "rooms";

export function Overview({
  getHass,
  devices,
  status,
  limits,
  onOpenDevice,
  onOpenRoom,
}: {
  getHass: () => Hass;
  devices: Device[];
  status: StatusMap;
  limits: Limits | null;
  onOpenDevice: (entryId: string, channel: Channel) => void;
  onOpenRoom: (id: string) => void;
}) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  useEffect(() => {
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[] }>((msg) => setRooms(msg.rooms), {
      type: "hive_local/rooms/subscribe",
    });
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass]);

  const channels = devices.flatMap((d) => d.channels.map((c) => ({ d, c, s: status[d.entry_id]?.[c]?.status ?? null })));
  const several = devices.length > 1;

  const filters: { id: Filter; label: string; icon: string }[] = [
    { id: "all", label: "All", icon: "" },
    { id: "heat", label: "Heating", icon: "radiator" },
    ...(channels.some(({ c }) => c === "water") ? [{ id: "water" as Filter, label: "Hot water", icon: "water-boiler" }] : []),
    ...(rooms.length ? [{ id: "rooms" as Filter, label: "Rooms", icon: "home-thermometer-outline" }] : []),
  ];

  return (
    <div className="home">

      {devices.length > 0 && (
        <>
          <h3 className="home-section">Quick actions</h3>
          <QuickActions getHass={getHass} devices={devices} status={status} />

          <h3 className="home-section">Your devices</h3>
          {filters.length > 2 && (
            <div className="pills" role="tablist" aria-label="Show">
              {filters.map((f) => (
                <button key={f.id} role="tab" aria-selected={filter === f.id} className={`pill ${filter === f.id ? "on" : ""}`} onClick={() => setFilter(f.id)}>
                  {f.icon && <Icon name={f.icon} />} {f.label}
                </button>
              ))}
            </div>
          )}
          <div className="device-grid">
            {channels
              .filter(({ c }) => filter === "all" || filter === c)
              .map(({ d, c }) => (
                <ChannelCard
                  key={`${d.entry_id}-${c}`}
                  getHass={getHass}
                  device={d}
                  channel={c}
                  info={status[d.entry_id]?.[c]}
                  showDevice={several}
                  limits={limits}
                  onOpen={() => onOpenDevice(d.entry_id, c)}
                />
              ))}
            {(filter === "all" || filter === "rooms") &&
              rooms.map((r) => <RoomCard key={r.id} room={r} showReceiver={several} onOpen={() => onOpenRoom(r.id)} />)}
          </div>
        </>
      )}
    </div>
  );
}

/** One-tap actions: boost with the defaults, or put everything back on its schedule. */
function QuickActions({ getHass, devices, status }: { getHass: () => Hass; devices: Device[]; status: StatusMap }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const several = devices.length > 1;
  const run = async (id: string, msgs: Record<string, unknown>[], done: string) => {
    setBusy(id);
    try {
      for (const m of msgs) await getHass().callWS(m);
      setNote({ ok: true, text: done });
    } catch (e) {
      setNote({ ok: false, text: errorText(e) });
    } finally {
      setBusy(null);
    }
  };
  const actions: { id: string; label: string; icon: string; kind: string; msgs: Record<string, unknown>[]; done: string }[] = [];
  for (const d of devices)
    for (const c of d.channels) {
      const info = status[d.entry_id]?.[c];
      if (info?.status?.mode === "boost") continue;
      const mins = formatMinutes(info?.boost_minutes ?? 30);
      const what = c === "water" ? "hot water" : "heating";
      actions.push({
        id: `boost-${d.entry_id}-${c}`,
        label: `Boost ${what} · ${mins}${several ? ` (${d.name})` : ""}`,
        icon: "rocket-launch",
        kind: c,
        msgs: [{ type: "hive_local/boost", entry_id: d.entry_id, channel: c }],
        done: `Boosting ${what} for ${mins}`,
      });
    }
  const offSchedule = devices.flatMap((d) =>
    d.channels.filter((c) => { const m = status[d.entry_id]?.[c]?.status?.mode; return m && m !== "schedule"; }).map((c) => ({ d, c })),
  );
  if (offSchedule.length)
    actions.push({
      id: "schedule",
      label: "Everything back to schedule",
      icon: "calendar-clock",
      kind: "neutral",
      msgs: offSchedule.map(({ d, c }) =>
        status[d.entry_id]?.[c]?.status?.mode === "boost"
          ? { type: "hive_local/cancel_boost", entry_id: d.entry_id, channel: c }
          : { type: "hive_local/mode", entry_id: d.entry_id, channel: c, mode: "schedule" },
      ),
      done: "Back on the schedule",
    });

  return (
    <>
      <div className="quick">
        {actions.map((a) => (
          <button key={a.id} className={`quick-action ${a.kind}`} disabled={busy != null} onClick={() => run(a.id, a.msgs, a.done)}>
            <span className="quick-icon"><Icon name={busy === a.id ? "timer-sand" : a.icon} /></span>
            <span className="quick-label">{a.label}</span>
          </button>
        ))}
      </div>
      {note && <div className={`status ${note.ok ? "ok" : "error"}`}>{note.text}</div>}
    </>
  );
}

function RoomCard({ room, showReceiver, onOpen }: { room: Room; showReceiver: boolean; onOpen: () => void }) {
  const target = room.target != null ? `${room.target}°` : room.target_range ? `${room.target_range[0]}–${room.target_range[1]}°` : null;
  const valves = `${room.valves.length} valve${room.valves.length === 1 ? "" : "s"}`;
  return (
    <section className={`card device room-device ${room.heating ? "heating" : "idle"}`}>
      <div className="device-head" role="button" tabIndex={0} onClick={onOpen} onKeyDown={(e) => e.key === "Enter" && onOpen()}>
        <div className="device-row">
          <span className="device-icon room"><Icon name="home-thermometer-outline" /></span>
          <div className="device-name">
            <span>{room.name}</span>
            <span className="muted small">
              {showReceiver && room.receiver_name ? `${room.receiver_name} · ${valves}` : valves}
              {room.battery_low ? <span className="warn"> · battery {room.lowest_battery}%</span> : room.unavailable.length ? <span className="warn"> · {room.unavailable.length} not responding</span> : null}
            </span>
          </div>
          <span className="device-status">
            {room.heating ? <>Heating to <b>{target}</b> <Icon name="fire" className="status-icon heat" /></> : target ? <>Target <b>{target}</b></> : "No target"}
          </span>
        </div>
        <div className="device-row">
          <div className="device-big">
            {room.current_temperature != null ? room.current_temperature.toFixed(1) : "–"}<span>°</span>
            <small>{room.temperature_source === "sensor" ? "Actual" : "Valves"}</small>
          </div>
        </div>
      </div>
    </section>
  );
}


export function ChannelCard({
  getHass,
  device,
  channel,
  info,
  showDevice,
  limits,
  onOpen,
  page = false,
}: {
  getHass: () => Hass;
  device: Device;
  channel: Channel;
  info?: ChannelInfo;
  showDevice: boolean;
  limits: Limits | null;
  /** On the Overview, tapping the card opens the device's page. */
  onOpen?: () => void;
  /** On the device's page (Control tab): the same card, with its controls below. */
  page?: boolean;
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

  // The boost sheet (length and temperature), opened from the card's Boost button.
  const [sheet, setSheet] = useState(false);

  const minTemp = limits?.boost_min_temp ?? 5;
  const maxTemp = limits?.heat_max ?? 32;
  const clampTemp = (t: number) => Math.min(maxTemp, Math.max(minTemp, Math.round(t * 2) / 2));
  const durations = [...new Set([...BOOST_MINUTES, defaultMinutes])]
    .filter((m) => m <= (limits?.boost_max_minutes ?? 360))
    .sort((a, b) => a - b);
  // − / + on the dial: like turning the thermostat. Taps are gathered for a moment,
  // then sent once (schedule: until the next change; manual: the hold; boost: keeps the time left).
  const [pending, setPending] = useState<number | null>(null);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => setPending(null), [s?.setpoint, s?.mode]);
  const canAdjust = !water && !!s && s.mode !== "off";
  const step = (delta: number) => {
    const from = pending ?? target ?? 20;
    const next = clampTemp(from + delta);
    setPending(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      // If the receiver doesn't report the change, fall back to what it says after a while.
      send({ type: "hive_local/target", temperature: next }, `Set to ${next}°`).then(() =>
        window.setTimeout(() => setPending(null), 8000),
      );
    }, 1200);
  };
  const shownTarget = pending ?? target;

  const boost = (m: number, t: number) =>
    send({ type: "hive_local/boost", minutes: m, ...(water ? {} : { temperature: t }) }, `Boosting for ${formatMinutes(m)}`).then(
      () => setSheet(false),
    );

  const targetLabel = !s ? "" : s.mode === "boost" ? "Boost to" : frostPeriod && pending == null ? "Frost" : s.mode === "manual" ? "Hold at" : "Target";

  const boosting = s?.mode === "boost";
  // A pre-heat is a boost underneath (it ends at the scheduled time), but it's the schedule starting early.
  const preheatFor = boosting ? info?.preheat?.active_for ?? null : null;
  const preheating = preheatFor != null;
  let status: ReactNode = "Waiting for the receiver…";
  if (s) {
    if (s.mode === "off") status = "Off";
    else if (boosting)
      status = water ? <>Boosting <Icon name="rocket-launch" className="status-icon" /></> : <>Boosting to <b>{s.setpoint}°</b> <Icon name="rocket-launch" className="status-icon" /></>;
    else if (water) status = active ? <>Heating water <Icon name="water" className="status-icon" /></> : "Not heating now";
    else if (active) status = <>Heating to <b>{target}°</b> <Icon name="fire" className="status-icon" /></>;
    else if (frostPeriod) status = <>Frost protection <b>{target}°</b></>;
    else status = target != null ? <>Target <b>{target}°</b> <Icon name="check-circle-outline" className="status-icon done" /></> : "Idle";
  }
  if (s && preheating) status = <>Pre-heating to <b>{s.setpoint}°</b> <Icon name="sun-clock" className="status-icon" /></>;
  const modeName = !s ? "" : preheating ? `Pre-heating for ${info?.preheat?.active_for}` : s.mode === "boost" ? (s.boost_remaining != null ? `Boost · ${formatMinutes(s.boost_remaining)} left` : "Boost") : s.mode === "schedule" ? "On schedule" : modes.find((m) => m.id === s.mode)?.label;
  const open = page;

  return (
    <section className={`card device ${channel} ${state} ${page ? "page" : ""}`}>
      <div
        className="device-head"
        {...(page ? {} : { role: "button", tabIndex: 0, onClick: onOpen, onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && e.target === e.currentTarget && onOpen?.() })}
      >
        <div className="device-row">
          <span className={`device-icon ${channel}`}><Icon name={water ? "water-boiler" : "radiator"} /></span>
          <div className="device-name">
            <span>{CHANNEL_LABEL[channel]}</span>
            <span className="muted small">{showDevice ? `${device.name} · ${modeName}` : modeName}</span>
          </div>
          <span className="device-status">{status}</span>
        </div>
        <div className="device-row">
          <div className="device-big">
            {water ? (!s ? "–" : s.mode === "off" ? "Off" : active ? "On" : "Idle") : s?.current_temperature != null ? s.current_temperature.toFixed(1) : "–"}
            {!water && <span>°</span>}
            <small>{water ? "Now" : "Actual"}</small>
          </div>
          <button
            className={`device-action ${boosting ? "boosting" : ""}`}
            disabled={busy || !s}
            onClick={(e) => { e.stopPropagation(); setSheet(true); }}
          >
            <Icon name={preheating ? "sun-clock" : "rocket-launch"} /> {preheating ? "Pre-heating" : boosting ? "Boosting" : "Boost"}
          </button>
        </div>
      </div>

      {open && (
      <div className="device-body">
      {/* Heating: the target, up and down (water has no temperature). */}
      {!water && (
        <div className="target-row">
          <div className="target-text">
            <span className="target-label">{targetLabel || "Target"}</span>
            <span className="muted small">
              {!s ? "" : s.mode === "off" ? "Turn the heating on to set a target" : s.mode === "schedule" ? "Until the next scheduled change" : s.mode === "boost" ? "Keeps the boost time left" : "Held until you change it"}
            </span>
          </div>
          <div className="target-control">
            <button className="round target-btn" disabled={!canAdjust} onClick={() => step(-0.5)} aria-label="Lower the target">
              <Icon name="minus" />
            </button>
            <span className={`target-value ${pending != null ? "pending" : ""}`}>
              {shownTarget != null && s?.mode !== "off" ? `${shownTarget.toFixed(1)}°` : "–"}
            </span>
            <button className="round target-btn" disabled={!canAdjust} onClick={() => step(0.5)} aria-label="Raise the target">
              <Icon name="plus" />
            </button>
          </div>
        </div>
      )}

      <div className="segmented full">
        {modes.map((m) => (
          <button
            key={m.id}
            className={s?.mode === m.id || (preheating && m.id === "schedule") ? "on" : ""}
            disabled={busy || !s}
            onClick={() =>
              send({ type: "hive_local/mode", mode: m.id }, m.id === "schedule" ? "Following the schedule" : m.label)
            }
          >
            {m.label}
          </button>
        ))}
      </div>

      </div>
      )}

      {result?.kind === "error" && <div className="status error">{result.text}</div>}

      {sheet && (
        <BoostSheet
          title={preheating ? "Pre-heating" : boosting ? "Boosting" : "Boost"}
          subtitle={showDevice ? `${device.name} · ${CHANNEL_LABEL[channel]}` : CHANNEL_LABEL[channel]}
          water={water}
          boosting={boosting}
          preheatFor={preheatFor}
          remaining={s?.boost_remaining ?? null}
          boostTarget={boosting ? s?.setpoint ?? null : null}
          defaultMinutes={defaultMinutes}
          defaultTemp={defaultTemp}
          durations={durations}
          clampTemp={clampTemp}
          busy={busy}
          onBoost={boost}
          onStop={() => send({ type: "hive_local/cancel_boost" }, "Boost cancelled").then(() => setSheet(false))}
          onClose={() => setSheet(false)}
        />
      )}
    </section>
  );
}

/** A sheet from the bottom (a dialog on wide screens): pick temperature and length, then boost. */
function BoostSheet({
  title,
  subtitle,
  water,
  boosting,
  preheatFor,
  remaining,
  boostTarget,
  defaultMinutes,
  defaultTemp,
  durations,
  clampTemp,
  busy,
  onBoost,
  onStop,
  onClose,
}: {
  title: string;
  subtitle: string;
  water: boolean;
  boosting: boolean;
  /** "06:30" while this boost is a pre-heat. */
  preheatFor: string | null;
  remaining: number | null;
  boostTarget: number | null;
  defaultMinutes: number;
  defaultTemp: number;
  durations: number[];
  clampTemp: (t: number) => number;
  busy: boolean;
  onBoost: (minutes: number, temperature: number) => void;
  onStop: () => void;
  onClose: () => void;
}) {
  const [minutes, setMinutes] = useState(defaultMinutes);
  const [temp, setTemp] = useState(defaultTemp);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className={`sheet ${water ? "water" : "heat"}`} role="dialog" aria-modal="true" aria-label={`${title} ${subtitle}`} onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        <div className="sheet-title">
          <h2>{title}</h2>
          <span className="muted">{subtitle}</span>
        </div>

        {boosting ? (
          <div className="sheet-live">
            <Icon name="clock-outline" />
            <span>
              {preheatFor
                ? `Warming up${boostTarget != null ? ` to ${boostTarget}°` : ""} for ${preheatFor}, when your schedule changes`
                : <>
                    {remaining != null ? `${formatMinutes(remaining)} left` : "Boosting"}
                    {!water && boostTarget != null ? ` · to ${boostTarget}°` : ""}
                  </>}
            </span>
          </div>
        ) : (
          <>
            {!water && (
              <div className="sheet-field">
                <span className="sheet-label">Temperature</span>
                <div className="sheet-temp">
                  <button className="round sheet-step" onClick={() => setTemp(clampTemp(temp - 0.5))} aria-label="Lower"><Icon name="minus" /></button>
                  <span className="sheet-temp-value">{temp.toFixed(1)}°</span>
                  <button className="round sheet-step" onClick={() => setTemp(clampTemp(temp + 0.5))} aria-label="Raise"><Icon name="plus" /></button>
                </div>
              </div>
            )}
            <div className="sheet-field">
              <span className="sheet-label">How long</span>
              <div className="sheet-lengths" role="radiogroup" aria-label="How long">
                {durations.map((m) => (
                  <button key={m} role="radio" aria-checked={m === minutes} className={m === minutes ? "on" : ""} onClick={() => setMinutes(m)}>
                    {formatMinutes(m)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {boosting ? (
          <button className="sheet-go stop" disabled={busy} onClick={onStop}>
            <span className="stop-square" /> {preheatFor ? "Stop pre-heating" : "Stop boost"}
          </button>
        ) : (
          <button className="sheet-go" disabled={busy} onClick={() => onBoost(minutes, temp)}>
            {water ? `Boost hot water for ${formatMinutes(minutes)}` : `Boost to ${temp.toFixed(1)}° for ${formatMinutes(minutes)}`}
          </button>
        )}
        <button className="ghost sheet-cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
