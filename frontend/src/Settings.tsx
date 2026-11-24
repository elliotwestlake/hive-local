import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { RoomEditorDialog, RoomSetupDialog } from "./Rooms";
import { unitPrice } from "./Stats";
import { errorText, type Candidate, type Channel, type Device, type Hass, type Receiver, type Room, type StatusMap } from "./types";

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

export function Settings({ getHass, devices, status }: { getHass: () => Hass; devices: Device[]; status: StatusMap }) {
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
          </div>
        </section>
      ))}
    </div>
  );
}

const KW_STEPS = [6, 9, 12, 15, 18, 20, 24, 25, 28, 30, 32, 35, 40, 45, 50];

/** Boiler output and gas price, for the estimated cost in the heating history. */
function CostSettings({ data, save }: { data: SettingsData; save: (change: Partial<SettingsData>) => void }) {
  const [priceText, setPriceText] = useState(data.fixed_price != null ? String(data.fixed_price) : "");
  const timer = useRef<number>();
  const kw = data.boiler_kw;
  const stepKw = (dir: 1 | -1) => {
    if (kw == null) return save({ boiler_kw: 24 });
    const next = dir > 0 ? KW_STEPS.find((k) => k > kw) : [...KW_STEPS].reverse().find((k) => k < kw);
    save({ boiler_kw: next ?? kw });
  };
  const typePrice = (text: string) => {
    setPriceText(text);
    const value = Number(text);
    window.clearTimeout(timer.current);
    if (text.trim() === "" || !Number.isFinite(value) || value < 0) return;
    timer.current = window.setTimeout(() => save({ price_source: "fixed", fixed_price: value }), 800);
  };
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
    data.price_source === "energy" && data.energy_price == null
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
            <select aria-label="Gas price" value={data.price_source ?? ""} onChange={(e) => save({ price_source: e.target.value || null })}>
              <option value="">None</option>
              <option value="energy">Energy dashboard</option>
              <option value="fixed">Fixed price</option>
              {data.price_candidates.map((c) => (
                <option key={c.entity_id} value={c.entity_id}>
                  {c.name} ({c.unit})
                </option>
              ))}
            </select>
            {data.price_source === "fixed" && (
              <label className="settings-price">
                <input type="number" inputMode="decimal" min="0" step="0.001" value={priceText} placeholder="0.07" onChange={(e) => typePrice(e.target.value)} aria-label={`Gas price in ${data.currency} per kWh`} />
                <span className="muted small">{data.currency}/kWh</span>
              </label>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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

function Adjust({ label, value, onLower, onRaise }: { label?: string; value: string; onLower: () => void; onRaise: () => void }) {
  return (
    <div className="adjust">
      {label && <span className="muted small">{label}</span>}
      <div className="stepper">
        <button className="round" onClick={onLower} aria-label={`Lower ${label ?? ""}`.trim()}>
          <Icon name="minus" />
        </button>
        <span className="stepper-value">{value}</span>
        <button className="round" onClick={onRaise} aria-label={`Raise ${label ?? ""}`.trim()}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  );
}
