import { useEffect, useRef, useState, type MouseEvent, type PointerEvent } from "react";
import { Icon } from "./Icon";
import { RoomEditorDialog, RoomSetupDialog } from "./Rooms";
import { unitPrice } from "./Stats";
import { roomsLabel, useSender } from "./api";
import { errorText, type Candidate, type Channel, type DemandInfo, type Device, type Hass, type Receiver, type Room, type StatusMap } from "./types";

/**
 * Settings: the outside temperature and heating cost (house-wide), rooms (setting them up; using them is on
 * the Overview), and each receiver's boost defaults and frost protection.
 */

interface SettingsData {
  outdoor_entity: string | null;
  outdoor_candidates: Candidate[];
  gas_meter: string | null;
  gas_meter_candidates: (Candidate & { energy: boolean })[];
  /** What was learned from the gas meter: average kW while on, kWh a day without heating. */
  fit: { kw: number; baseline: number; days: number; hours: number } | null;
  learned_at: string | null;
  modulation: number;
  /** The output the cost uses, and where it came from. */
  output_kw: number | null;
  output_basis: "meter" | "rated" | null;
  boiler_kw: number | null;
  /** "energy", "fixed", a price entity's id, or null. */
  price_source: string | null;
  fixed_price: number | null;
  price_candidates: (Candidate & { unit: string })[];
  /** The gas price HA's energy settings give, per kWh, or null if there isn't one. */
  energy_price: number | null;
  /** The price in use, per kWh. */
  price: number | null;
  currency: string;
}

export function Settings({ getHass, devices, status, onSetup }: { getHass: () => Hass; devices: Device[]; status: StatusMap; onSetup?: () => void }) {
  const [data, setData] = useState<SettingsData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getHass()
      .callWS<SettingsData>({ type: "hive_local/settings" })
      .then(setData)
      .catch((e) => setError(errorText(e)));
  }, [getHass]);

  const save = (change: Partial<SettingsData>) => {
    setData((d) => d && { ...d, ...change });
    getHass()
      .callWS<SettingsData>({ type: "hive_local/settings/set", ...change })
      .then((r) => {
        setData(r);
        setError("");
      })
      .catch((e) => setError(errorText(e)));
  };
  const setOutdoor = (entity: string) => save({ outdoor_entity: entity || null });

  return (
    <div className="settings">
      <h2 className="history-title">Settings</h2>
      {error && <div className="status error">{error}</div>}

      <section className="settings-section">
        <h3>Outside temperature</h3>
        <div className="settings-group">
          <div className="settings-row">
            <span className="device-icon"><Icon name="weather-partly-cloudy" /></span>
            <div className="settings-text">
              <span>Weather or outdoor sensor</span>
              <span className="muted small">Shown in the heating history, next to the boiler's time on.</span>
            </div>
            <select aria-label="Outside temperature" value={data?.outdoor_entity ?? ""} onChange={(e) => setOutdoor(e.target.value)} disabled={!data}>
              <option value="">None</option>
              {(data?.outdoor_candidates ?? []).map((c) => (
                <option key={c.entity_id} value={c.entity_id}>
                  {c.name}
                  {c.area ? ` · ${c.area}` : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {data && <CostSettings data={data} save={save} />}

      <RoomSettings getHass={getHass} />

      {devices.map((d) => (
        <section key={d.entry_id} className="settings-section">
          <h3>{devices.length > 1 ? d.name : "Receiver"}</h3>
          <div className="settings-group">
            {d.channels.map((ch) => (
              <BoostRows key={ch} getHass={getHass} device={d} channel={ch} info={status[d.entry_id]?.[ch]} />
            ))}
            {status[d.entry_id]?.heat?.demand && <DemandRows getHass={getHass} device={d} info={status[d.entry_id]!.heat!.demand!} />}
          </div>
        </section>
      ))}

      <TidySettings getHass={getHass} />

      {onSetup && (
        <section className="settings-section">
          <h3>Setup</h3>
          <div className="settings-group">
            <button className="settings-row link" onClick={onSetup}>
              <span className="device-icon"><Icon name="map-marker-path" /></span>
              <div className="settings-text">
                <span>Run setup again</span>
                <span className="muted small">Rooms, rooms calling for heat, duplicate entities and the outside temperature, one step at a time.</span>
              </div>
              <Icon name="chevron-right" className="slot-chev" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

interface TidyRow {
  entity_id: string;
  name: string;
  done: boolean;
  ours: boolean;
}
interface TidyData {
  receiver: TidyRow[];
  valves: TidyRow[];
  pending: number;
  undoable: number;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/** Disable the receiver's own ZHA / Z2M thermostat and hide the room valves' entities (Hive Local's replace them). */
export function TidySettings({ getHass, bare, empty }: { getHass: () => Hass; bare?: boolean; empty?: string }) {
  const [data, setData] = useState<TidyData | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const run = (type: string) => {
    setBusy(true);
    getHass()
      .callWS<TidyData>({ type })
      .then((r) => {
        setData(r);
        setError("");
      })
      .catch((e) => setError(errorText(e)))
      .finally(() => setBusy(false));
  };
  useEffect(() => run("hive_local/tidy"), [getHass]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!data || (!data.receiver.length && !data.valves.length)) return empty && data ? <p className="muted">{empty}</p> : null;

  const what = [
    data.receiver.length ? `${plural(data.receiver.length, "receiver thermostat")} from ZHA or Zigbee2MQTT ${data.receiver.length === 1 ? "is" : "are"} disabled` : null,
    data.valves.length ? `${plural(data.valves.length, "room valve")} ${data.valves.length === 1 ? "is" : "are"} hidden` : null,
  ].filter(Boolean);
  const note = data.pending
    ? "Hive Local's heating and room entities replace them. Valves are only hidden: rooms still use them."
    : `Done: ${what.join(", and ")}. Switch any back in their entity settings, or Undo.`;
  const row = (
    <div className="settings-group">
      <div className="settings-row">
          <span className="device-icon"><Icon name="broom" /></span>
          <div className="settings-text">
            <span>{data.pending ? "Tidy up duplicate entities" : "Duplicate entities tidied up"}</span>
            <span className="muted small">{note}</span>
          </div>
          <div className="settings-controls">
            {data.undoable > 0 && (
              <button className="ghost" disabled={busy} onClick={() => run("hive_local/tidy/undo")}>Undo</button>
            )}
            {data.pending > 0 && (
              <button className="device-action tidy-action" disabled={busy} onClick={() => run("hive_local/tidy/apply")}>
                Tidy up {data.pending}
              </button>
            )}
          </div>
      </div>
    </div>
  );
  if (bare) return <>{error && <div className="status error">{error}</div>}{row}</>;
  return (
    <section className="settings-section">
      <h3>Entities</h3>
      {error && <div className="status error">{error}</div>}
      {row}
    </section>
  );
}

const KW_STEPS = [6, 9, 12, 15, 18, 20, 24, 25, 28, 30, 32, 35, 40, 45, 50];

/** Boiler output and gas price, for the estimated cost in the heating history. */
function CostSettings({ data, save }: { data: SettingsData; save: (change: Partial<SettingsData>) => void }) {
  // The fixed unit rate while it's being stepped (saved 0.8 s after the last step).
  const [rate, setRate] = useState<number | null>(null);
  const rateRef = useRef<number | null>(null);
  const timer = useRef<number>();
  const kw = data.boiler_kw;
  const stepKw = (dir: 1 | -1) => {
    if (kw == null) return save({ boiler_kw: 24 });
    const next = dir > 0 ? KW_STEPS.find((k) => k > kw) : [...KW_STEPS].reverse().find((k) => k < kw);
    save({ boiler_kw: next ?? kw });
  };
  const minor = MINOR_UNITS[data.currency];
  const shownRate = rate ?? data.fixed_price;
  const stepRate = (dir: 1 | -1, held = 0) => {
    // 0.01p (or cent) a tap; held, the buttons repeat and speed up, then move 0.1p at a time.
    const now = rateRef.current ?? data.fixed_price ?? 0.06;
    const size = held > 15 ? 0.001 : 0.0001;
    const next = Math.max(0, Math.round((dir > 0 ? Math.floor(now / size + 1e-6) + 1 : Math.ceil(now / size - 1e-6) - 1) * size * 10000) / 10000);
    rateRef.current = next;
    setRate(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      save({ price_source: "fixed", fixed_price: next });
      rateRef.current = null;
      setRate(null);
    }, 800);
  };
  const choosePrice = (source: string) =>
    // A fixed price starts from whatever price was in use, so it's a few taps from right.
    save(source === "fixed" && data.fixed_price == null ? { price_source: source, fixed_price: data.price ?? 0.06 } : { price_source: source || null });
  const fit = data.fit;
  const meterNote = !data.gas_meter
    ? "Learns the boiler's real average output from your gas use. Hot water and cooking on the same meter are allowed for."
    : fit
      ? `Learned ${fit.kw.toFixed(1)} kW while heating from ${fit.days} days${fit.baseline >= 0.5 ? ` (plus ${fit.baseline.toFixed(0)} kWh a day for hot water and cooking)` : ""}.`
      : data.learned_at
        ? "Not enough yet: it needs at least 4 days of readings with the heating on. Checked every 6 hours."
        : "Learning from the last 14 days…";
  const perKwh = (v: number | null) => (v != null ? `${unitPrice(v, data.currency)} per kWh` : null);
  const priceNote =
    data.price_source === "fixed"
      ? "Your unit rate, below."
      : data.price_source === "energy" && data.energy_price == null
      ? "The Energy dashboard has no gas price (or it can't be read)."
      : data.price_source && data.price_source !== "fixed" && data.price == null
        ? "That entity has no price right now."
        : perKwh(data.price) ?? "Pick where the price comes from.";
  return (
    <section className="settings-section">
      <h3>Heating cost</h3>
      <p className="muted small settings-help">
        An estimated cost in the heating history: the boiler's time on × its average output while on × the gas price. A modern boiler turns its
        flame down, so it averages well below its rating: a gas meter gives the real figure.
      </p>
      <div className="settings-group">
        <div className="settings-row">
          <span className="device-icon"><Icon name="meter-gas-outline" /></span>
          <div className="settings-text">
            <span>Gas meter</span>
            <span className="muted small">{meterNote}</span>
          </div>
          <select aria-label="Gas meter" value={data.gas_meter ?? ""} onChange={(e) => save({ gas_meter: e.target.value || null })}>
            <option value="">None</option>
            {data.gas_meter_candidates.map((c) => (
              <option key={c.entity_id} value={c.entity_id}>
                {c.name}
                {c.area ? ` · ${c.area}` : ""}
              </option>
            ))}
          </select>
        </div>
        <div className="settings-row">
          <span className="device-icon"><Icon name="fire" /></span>
          <div className="settings-text">
            <span>Boiler rating</span>
            <span className="muted small">
              {data.output_basis === "meter"
                ? "Not needed while the gas meter gives the output."
                : `Its heating output in kW, from the manual or label (often 24–35 kW for a combi). Counted at ${Math.round(data.modulation * 100)}% without a gas meter.`}
            </span>
          </div>
          <div className="settings-controls">
            <Adjust value={kw != null ? `${kw.toLocaleString()} kW` : "Not set"} onLower={() => stepKw(-1)} onRaise={() => stepKw(1)} />
            {kw != null && (
              <button className="ghost small" onClick={() => save({ boiler_kw: null })}>
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="settings-row">
          <span className="device-icon"><Icon name="cash" /></span>
          <div className="settings-text">
            <span>Gas price</span>
            <span className="muted small">{priceNote}</span>
          </div>
          <div className="settings-controls">
            <select aria-label="Gas price" value={data.price_source ?? ""} onChange={(e) => choosePrice(e.target.value)}>
              <option value="">None</option>
              <option value="energy">Energy dashboard</option>
              <option value="fixed">Unit rate</option>
              {data.price_candidates.map((c) => (
                <option key={c.entity_id} value={c.entity_id}>
                  {c.name} ({c.unit})
                </option>
              ))}
            </select>
          </div>
        </div>
        {data.price_source === "fixed" && (
          <div className="settings-row">
            <span className="device-icon"><Icon name="tag-outline" /></span>
            <div className="settings-text">
              <span>Unit rate</span>
              <span className="muted small">From your bill or tariff: the gas price per kWh, without the standing charge.</span>
            </div>
            <div className="settings-controls">
              <Adjust
                value={shownRate == null ? "–" : minor ? `${(shownRate * 100).toFixed(2)}${minor}` : unitPrice(shownRate, data.currency)}
                onLower={(held) => stepRate(-1, held)}
                onRaise={(held) => stepRate(1, held)}
                hold
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Currencies whose unit rates are quoted in hundredths: the symbol shown after the number. */
const MINOR_UNITS: Record<string, string> = { GBP: "p", EUR: "c", USD: "¢", CAD: "¢", AUD: "c", NZD: "c", IEP: "p" };

function RoomSettings({ getHass }: { getHass: () => Hass }) {
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  // The room being edited (or "new"), in a dialog; and the set-up-from-areas dialog.
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [setup, setSetup] = useState(false);
  // How many rooms the areas suggest (valves with an area that aren't in a room).
  const [suggested, setSuggested] = useState(0);
  useEffect(() => {
    getHass()
      .callWS<{ rooms: unknown[] }>({ type: "hive_local/rooms/suggest" })
      .then((r) => setSuggested(r.rooms.length))
      .catch(() => {});
  }, [getHass, rooms]);

  useEffect(() => {
    const unsub = getHass().connection.subscribeMessage<{ rooms: Room[]; receivers: Receiver[] }>(
      (msg) => {
        setRooms(msg.rooms);
        setReceivers(msg.receivers);
      },
      { type: "hive_local/rooms/subscribe" },
    );
    return () => {
      unsub.then((u) => u()).catch(() => {});
    };
  }, [getHass]);

  const several = receivers.length > 1;
  return (
    <section className="settings-section">
      <h3>Rooms</h3>
      <p className="muted small settings-help">Group your Hive radiator valves into rooms. Each room then has a card on the Overview.</p>
      <div className="settings-group">
        {(rooms ?? []).map((r) => (
            <button key={r.id} className="settings-row link" onClick={() => setEditing(r.id)}>
              <span className="device-icon"><Icon name="home-thermometer-outline" /></span>
              <div className="settings-text">
                <span>{r.name}</span>
                <span className="muted small">
                  {[
                    `${r.valves.length} valve${r.valves.length === 1 ? "" : "s"}`,
                    r.sensor_name ?? "temperature from the valves",
                    several ? `heated by ${r.receiver_name}` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </span>
              </div>
              <Icon name="chevron-right" className="settings-chevron" />
            </button>
        ))}
        {suggested > 0 && (
          <button className="settings-row link add" onClick={() => setSetup(true)}>
            <span className="device-icon"><Icon name="auto-fix" /></span>
            <div className="settings-text">
              <span>{rooms?.length ? "Add rooms from your areas" : "Set up rooms from your areas"}</span>
              <span className="muted small">
                {suggested} area{suggested === 1 ? " has" : "s have"} Hive valves that aren't in a room yet
              </span>
            </div>
          </button>
        )}
        <button className="settings-row link add" onClick={() => setEditing("new")}>
          <span className="device-icon"><Icon name="plus" /></span>
          <div className="settings-text">
            <span>Add a room</span>
          </div>
        </button>
      </div>
      {setup && <RoomSetupDialog getHass={getHass} onDone={() => setSetup(false)} />}
      {editing && (
        <RoomEditorDialog
          getHass={getHass}
          room={editing === "new" ? undefined : rooms?.find((r) => r.id === editing)}
          onDone={() => setEditing(null)}
        />
      )}
    </section>
  );
}

const hours = (m: number) => (m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} h`);
const BOOST_STEPS = [15, 30, 45, 60, 90, 120, 180, 240, 360];

function BoostRows({ getHass, device, channel, info }: { getHass: () => Hass; device: Device; channel: Channel; info?: { boost_minutes: number; boost_temperature: number; frost_temperature: number } }) {
  const [values, setValues] = useState<{ boost_minutes: number; boost_temperature: number; frost_temperature: number } | null>(null);
  const timer = useRef<number>();
  const shown = values ?? info;
  if (!shown) return null;

  const change = (key: "boost_minutes" | "boost_temperature" | "frost_temperature", value: number) => {
    const next = { ...shown, [key]: value };
    setValues(next);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      getHass()
        .callWS({ type: "hive_local/defaults", entry_id: device.entry_id, channel, [key]: value })
        .finally(() => setValues(null));
    }, 800);
  };
  const step = (dir: 1 | -1) => {
    const i = BOOST_STEPS.findIndex((m) => m >= shown.boost_minutes);
    const at = i < 0 ? BOOST_STEPS.length - 1 : i;
    return BOOST_STEPS[Math.min(BOOST_STEPS.length - 1, Math.max(0, at + dir))];
  };
  const water = channel === "water";

  return (
    <>
      <div className="settings-row">
        <span className="device-icon"><Icon name={water ? "water-boiler" : "radiator"} /></span>
        <div className="settings-text">
          <span>{water ? "Hot water boost" : "Heating boost"}</span>
          <span className="muted small">What Boost does unless you choose otherwise.</span>
        </div>
        <div className="settings-controls">
          <Adjust label="How long" value={hours(shown.boost_minutes)} onLower={() => change("boost_minutes", step(-1))} onRaise={() => change("boost_minutes", step(1))} />
          {!water && (
            <Adjust label="Temperature" value={`${shown.boost_temperature.toFixed(1)}°`} onLower={() => change("boost_temperature", Math.max(5, shown.boost_temperature - 0.5))} onRaise={() => change("boost_temperature", Math.min(32, shown.boost_temperature + 0.5))} />
          )}
        </div>
      </div>
      {!water && (
        <div className="settings-row">
          <span className="device-icon"><Icon name="snowflake" /></span>
          <div className="settings-text">
            <span>Frost protection</span>
            <span className="muted small">The target shown while the schedule has the heating off. Only for display: the receiver isn't changed.</span>
          </div>
          <div className="settings-controls">
            <Adjust value={`${shown.frost_temperature.toFixed(1)}°`} onLower={() => change("frost_temperature", Math.max(5, shown.frost_temperature - 0.5))} onRaise={() => change("frost_temperature", Math.min(16, shown.frost_temperature + 0.5))} />
          </div>
        </div>
      )}
    </>
  );
}

const DEMAND_REASON: Record<string, string> = {
  warm: "On. The rooms are warm.",
  no_rooms: "On, but no room has recent valve readings.",
  stopped: "Stopped for now: it starts again once the rooms are warm.",
  mode: "On. It only acts while the heating is on Schedule.",
  schedule_off: "On. The schedule has the heating off now.",
  heating: "On. The receiver is already heating.",
  holiday: "On, but not while you're away.",
  preheat: "On. Pre-heating comes first.",
  waiting: "On. The boiler rests a few minutes between requests.",
};

/** Rooms call for heat (per receiver): when a room is cold or a valve is heating, the heating comes on for it. */
export function DemandRows({ getHass, device, info }: { getHass: () => Hass; device: Device; info: DemandInfo }) {
  const { busy, result, send } = useSender(getHass, device.entry_id, "heat");
  const note = !info.enabled
    ? "When a room this receiver heats is cold, or one of its valves is heating, the heating comes on for it. Each request lasts 30 min at a time, so it stops by itself if Home Assistant does."
    : info.active
      ? `On. Heating for ${roomsLabel(info.rooms)} now.`
      : DEMAND_REASON[info.reason ?? ""] ?? "On.";
  const onOff = (value: boolean, field: "enabled" | "outside_schedule", label: string) => (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {[true, false].map((on) => (
        <button
          key={String(on)}
          role="radio"
          aria-checked={value === on}
          className={value === on ? "on" : ""}
          disabled={busy}
          onClick={() => send({ type: "hive_local/demand", [field]: on }, on ? `${label}: on` : `${label}: off`)}
        >
          {on ? "On" : "Off"}
        </button>
      ))}
    </div>
  );
  return (
    <>
      <div className="settings-row">
        <span className="device-icon"><Icon name="home-thermometer-outline" /></span>
        <div className="settings-text">
          <span>Rooms call for heat</span>
          <span className="muted small">{note}</span>
        </div>
        <div className="settings-controls">{onOff(info.enabled, "enabled", "Rooms call for heat")}</div>
      </div>
      {info.enabled && (
        <div className="settings-row">
          <span className="device-icon"><Icon name="calendar-remove-outline" /></span>
          <div className="settings-text">
            <span>Outside the schedule</span>
            <span className="muted small">Rooms can heat while the schedule has the heating off. Never while the heating is Off.</span>
          </div>
          <div className="settings-controls">{onOff(info.outside_schedule, "outside_schedule", "Outside the schedule")}</div>
        </div>
      )}
      {result?.kind === "error" && <div className="status error">{result.text}</div>}
    </>
  );
}

function Adjust({ label, value, onLower, onRaise, hold }: { label?: string; value: string; onLower: (held: number) => void; onRaise: (held: number) => void; hold?: boolean }) {
  const lower = useHold(onLower, hold);
  const raise = useHold(onRaise, hold);
  return (
    <div className="adjust">
      {label && <span className="muted small">{label}</span>}
      <div className="stepper">
        <button className="round" {...lower} aria-label={`Lower ${label ?? ""}`.trim()}>
          <Icon name="minus" />
        </button>
        <span className="stepper-value">{value}</span>
        <button className="round" {...raise} aria-label={`Raise ${label ?? ""}`.trim()}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}

/**
 * A button's handlers: a click steps once; with `hold`, pressing and holding repeats,
 * faster the longer it's held (`step` gets how many repeats so far, to take bigger steps).
 * Keyboard clicks (detail 0) still step once.
 */
function useHold(step: (held: number) => void, hold?: boolean) {
  const stepRef = useRef(step);
  stepRef.current = step;
  const timer = useRef<number>();
  const stop = () => window.clearTimeout(timer.current);
  useEffect(() => stop, []);
  if (!hold) return { onClick: () => step(0) };
  const start = (e: PointerEvent) => {
    if (e.button !== 0) return;
    stepRef.current(0);
    let delay = 400;
    let n = 0;
    const again = () => {
      n += 1;
      stepRef.current(n);
      delay = n < 5 ? 150 : n < 20 ? 70 : 30;
      timer.current = window.setTimeout(again, delay);
    };
    timer.current = window.setTimeout(again, delay);
  };
  return {
    onPointerDown: start,
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onContextMenu: (e: MouseEvent) => e.preventDefault(),
    onClick: (e: MouseEvent) => {
      if (e.detail === 0) step(0);
    },
  };
}
