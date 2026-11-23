import { useCallback, useEffect, useState } from "react";
import { Icon } from "./Icon";
import {
  connectionLost,
  errorText,
  type Channel,
  type Device,
  type Hass,
  type Stats as StatsData,
  type StatsPeriod,
} from "./types";

/**
 * Heating history, laid out after the Hive app's: receiver tabs, D / W / M and time or
 * temperature, a date you can step back through, a summary box, then a row per day
 * (per hour on D) with a bar, its value and that day's lowest and highest temperature.
 */

const PERIODS: { id: StatsPeriod; label: string; name: string }[] = [
  { id: 1, label: "D", name: "Day" },
  { id: 7, label: "W", name: "Week" },
  { id: 30, label: "M", name: "Month" },
];
type Metric = "time" | "temp";
const REFRESH_MS = 5 * 60_000;

/** "3h 20m", "45m", "0m". */
export const duration = (minutes: number) => {
  const m = Math.round(minutes);
  if (m < 60) return `${m}m`;
  return m % 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m / 60}h`;
};

const fmt = (t: number, o: Intl.DateTimeFormatOptions) => new Date(t * 1000).toLocaleDateString([], o);
const hour = (t: number) => new Date(t * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function rangeLabel(start: number, end: number, period: StatsPeriod) {
  if (period === 1) return fmt(start, { weekday: "short", day: "numeric", month: "short" });
  const last = end - 86400;
  const a = new Date(start * 1000);
  const b = new Date(last * 1000);
  const month = (d: Date) => d.toLocaleDateString([], { month: "short" });
  return a.getMonth() === b.getMonth()
    ? `${a.getDate()}–${b.getDate()} ${month(b)}`
    : `${a.getDate()} ${month(a)} – ${b.getDate()} ${month(b)}`;
}

interface Row {
  key: number;
  label: [string, string];
  minutes: number | null;
  avg: number | null;
  min: number | null;
  max: number | null;
}

/** Rows newest first: days for W / M, hours for D. */
function rows(data: StatsData): Row[] {
  if (data.period === 1) {
    const out: Row[] = [];
    for (let i = 0; i < data.series.length; i += 4) {
      const hourBuckets = data.series.slice(i, i + 4).filter((b) => b.heating != null);
      if (!hourBuckets.length) continue;
      const temps = hourBuckets.map((b) => b.current).filter((v): v is number => v != null);
      out.push({
        key: data.series[i].t,
        label: [hour(data.series[i].t), ""],
        minutes: hourBuckets.reduce((a, b) => a + (b.heating ?? 0) * 15, 0),
        avg: temps.length ? temps.reduce((a, b) => a + b, 0) / temps.length : null,
        min: temps.length ? Math.min(...temps) : null,
        max: temps.length ? Math.max(...temps) : null,
      });
    }
    return out.reverse();
  }
  return data.days
    .filter((d) => d.heating_minutes != null)
    .map((d) => ({
      key: d.start,
      label: [fmt(d.start, { weekday: "short" }), fmt(d.start, { day: "numeric" })] as [string, string],
      minutes: d.heating_minutes,
      avg: d.temp_avg,
      min: d.temp_min,
      max: d.temp_max,
    }))
    .reverse();
}

/**
 * The Stats tab is heating history, with a tab per receiver (like Hive's zones). A device's
 * page passes `channel` to show just that receiver's heating or hot water.
 */
export function Stats({ getHass, devices, channel: fixed }: { getHass: () => Hass; devices: Device[]; channel?: Channel }) {
  const [entryId, setEntryId] = useState(devices[0]?.entry_id);
  const device = devices.find((d) => d.entry_id === entryId) ?? devices[0];
  const ch: Channel = fixed ?? "heat";
  const [period, setPeriod] = useState<StatsPeriod>(7);
  const [metric, setMetric] = useState<Metric>("time");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<StatsData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const water = ch === "water";
  const shownMetric: Metric = water ? "time" : metric;

  const load = useCallback(() => {
    if (!device) return;
    getHass()
      .callWS<StatsData>({ type: "hive_local/stats", entry_id: device.entry_id, channel: ch, days: period, offset })
      .then((r) => {
        setData(r);
        setError("");
      })
      // A dropped connection isn't worth a banner: the next refresh (or reopening the tab) retries.
      .catch((e) => {
        if (!connectionLost(e)) setError(errorText(e));
      })
      .finally(() => setLoading(false));
  }, [getHass, device, ch, period, offset]);

  // Reload once the websocket reconnects (e.g. the phone app comes back from the background).
  useEffect(() => {
    const conn = getHass().connection;
    conn.addEventListener?.("ready", load);
    return () => conn.removeEventListener?.("ready", load);
  }, [getHass, load]);

  useEffect(() => {
    setLoading(true);
    load();
    if (offset) return;
    const timer = setInterval(load, REFRESH_MS);
    return () => clearInterval(timer);
  }, [load, offset]);

  if (!device) return null;
  const shown = data && data.period === period && data.offset === offset ? data : null;
  const list = shown ? rows(shown) : [];
  const units = period === 1 ? "hour" : "day";

  return (
    <div className="history">
      {!fixed && <h2 className="history-title">Heating history</h2>}
      {!fixed && devices.length > 1 && (
        <div className="history-tabs" role="tablist">
          {devices.map((d) => (
            <button key={d.entry_id} role="tab" aria-selected={d.entry_id === device.entry_id} className={d.entry_id === device.entry_id ? "on" : ""} onClick={() => { setEntryId(d.entry_id); setOffset(0); }}>
              {d.name}
            </button>
          ))}
        </div>
      )}

      <div className="history-controls">
        <div className="history-toggle" role="radiogroup" aria-label="Period">
          {PERIODS.map((p) => (
            <button key={p.id} role="radio" aria-checked={p.id === period} aria-label={p.name} title={p.name} className={p.id === period ? "on" : ""} onClick={() => { setPeriod(p.id); setOffset(0); }}>
              {p.label}
            </button>
          ))}
        </div>
        {!water && (
          <div className="history-toggle" role="radiogroup" aria-label="Show">
            <button role="radio" aria-checked={metric === "time"} title="Time on" aria-label="Time on" className={`wide ${metric === "time" ? "on" : ""}`} onClick={() => setMetric("time")}>
              <Icon name="clock-outline" />
            </button>
            <button role="radio" aria-checked={metric === "temp"} title="Temperature" aria-label="Temperature" className={`wide ${metric === "temp" ? "on" : ""}`} onClick={() => setMetric("temp")}>
              <Icon name="thermometer" />
            </button>
          </div>
        )}
      </div>

      <div className="history-date">
        <button className="round ghost" onClick={() => setOffset(offset + 1)} aria-label="Earlier">
          <Icon name="chevron-left" />
        </button>
        <span className="history-range">
          <Icon name="calendar-blank-outline" /> {shown ? rangeLabel(shown.start, shown.period_end, period) : "…"}
        </span>
        <button className="round ghost" onClick={() => setOffset(Math.max(0, offset - 1))} disabled={offset === 0} aria-label="Later">
          <Icon name="chevron-right" />
        </button>
      </div>

      {error && <div className="status error">{error}</div>}
      {loading && !shown && <p className="muted history-empty">Loading…</p>}

      {shown && !shown.has_data && (
        <p className="muted history-empty">
          No history for this {PERIODS.find((p) => p.id === period)!.name.toLowerCase()}. Home Assistant keeps 10 days unless{" "}
          <code>purge_keep_days</code> is raised.
        </p>
      )}

      {shown?.has_data && (
        <>
          <Summary data={shown} metric={shownMetric} water={water} units={units} rows={list} />
          <div className="history-rows">
            {list.length > 0 && !water && (
              <div className="history-key muted small" title="Lowest and highest room temperature">
                <Icon name="thermometer" /> Low · high
              </div>
            )}
            {list.map((r) => (
              <HistoryRow key={r.key} row={r} metric={shownMetric} water={water} scale={scaleOf(list, shownMetric, period)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function scaleOf(list: Row[], metric: Metric, period: StatsPeriod) {
  if (metric === "time") return { lo: 0, hi: Math.max(period === 1 ? 60 : 60, ...list.map((r) => r.minutes ?? 0)) };
  const temps = list.map((r) => r.avg).filter((v): v is number => v != null);
  const lo = temps.length ? Math.floor(Math.min(...temps)) - 2 : 10;
  const hi = temps.length ? Math.ceil(Math.max(...temps)) : 25;
  return { lo, hi: Math.max(hi, lo + 4) };
}

function Summary({ data, metric, water, units, rows: list }: { data: StatsData; metric: Metric; water: boolean; units: string; rows: Row[] }) {
  const counted = Math.max(1, list.filter((r) => r.minutes != null).length);
  const prev = data.previous;
  const comparable = !!prev?.has_data && prev.known_minutes >= 0.5 * data.known_minutes;
  const diff = comparable ? data.heating_minutes - prev!.heating_minutes : 0;
  const t = data.temperature;
  const [aLabel, aValue, bLabel, bValue] =
    metric === "time"
      ? [water ? "Hot water on" : "Boiler on", duration(data.heating_minutes), `Average per ${units}`, duration(data.heating_minutes / counted)]
      : ["Average", t.avg != null ? `${t.avg.toFixed(1)}°` : "–", "Lowest – highest", t.min != null && t.max != null ? `${t.min.toFixed(1)}–${t.max.toFixed(1)}°` : "–"];
  return (
    <>
      <div className="history-summary">
        <div>
          <span className="muted">{aLabel}</span>
          <b>{aValue}</b>
        </div>
        <i />
        <div>
          <span className="muted">{bLabel}</span>
          <b>{bValue}</b>
        </div>
      </div>
      <p className="history-note muted small">
        {metric === "time" && comparable && (Math.abs(diff) < 1 ? "Same as the period before · " : `${duration(Math.abs(diff))} ${diff > 0 ? "more" : "less"} than the period before · `)}
        Fired up {data.cycles} time{data.cycles === 1 ? "" : "s"}
        {data.boosts ? ` · ${data.boosts} boost${data.boosts === 1 ? "" : "s"}` : ""}
        {metric === "temp" && data.target_avg != null ? ` · average target ${data.target_avg.toFixed(1)}°` : ""}
      </p>
    </>
  );
}

function HistoryRow({ row, metric, water, scale }: { row: Row; metric: Metric; water: boolean; scale: { lo: number; hi: number } }) {
  const v = metric === "time" ? row.minutes : row.avg;
  const f = v == null ? 0 : Math.max(0.02, Math.min(1, (v - scale.lo) / (scale.hi - scale.lo || 1)));
  return (
    <div className="history-row">
      <span className="history-day">
        {row.label[0]} <span>{row.label[1]}</span>
      </span>
      <span className="history-bar">
        {v != null && v > 0 && <i style={{ width: `${f * 100}%` }} />}
        <span className="history-value">{v == null ? "–" : metric === "time" ? duration(v) : `${v.toFixed(1)}°`}</span>
      </span>
      {!water && (
        <span className="history-temps" title="Lowest and highest room temperature">
          {row.min != null ? `${row.min.toFixed(0)}°` : "–"}
          <span>{row.max != null ? `${row.max.toFixed(0)}°` : "–"}</span>
        </span>
      )}
    </div>
  );
}
