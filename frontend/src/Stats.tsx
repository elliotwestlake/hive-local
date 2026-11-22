import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./Icon";
import {
  CHANNEL_LABEL,
  errorText,
  type Channel,
  type Device,
  type Hass,
  type Mode,
  type Stats as StatsData,
  type StatsBucket,
  type StatsPeriod,
} from "./types";

const PERIODS: { id: StatsPeriod; label: string }[] = [
  { id: 1, label: "Today" },
  { id: 7, label: "7 days" },
  { id: 30, label: "30 days" },
];

const PREVIOUS: Record<StatsPeriod, string> = {
  1: "yesterday by this time",
  7: "the 7 days before",
  30: "the 30 days before",
};

const REFRESH_MS = 5 * 60_000;

/** "3h 20m", "45m", "0m". */
export const duration = (minutes: number) => {
  const m = Math.round(minutes);
  if (m < 60) return `${m}m`;
  return m % 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m / 60}h`;
};

const time = (t: number) => new Date(t * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const weekday = (t: number) => new Date(t * 1000).toLocaleDateString([], { weekday: "short" });
const date = (t: number) => new Date(t * 1000).toLocaleDateString([], { day: "numeric", month: "short" });
const longDate = (t: number) =>
  new Date(t * 1000).toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });

export function Stats({ getHass, devices }: { getHass: () => Hass; devices: Device[] }) {
  const [period, setPeriod] = useState<StatsPeriod>(7);
  return (
    <div className="stack">
      <div className="rooms-head">
        <p className="muted">
          How long the boiler ran, how often it fired up and how warm it was, from Home Assistant's history.
        </p>
        <div className="segmented" role="radiogroup" aria-label="Period">
          {PERIODS.map((p) => (
            <button key={p.id} role="radio" aria-checked={p.id === period} className={p.id === period ? "on" : ""} onClick={() => setPeriod(p.id)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      {devices.flatMap((d) =>
        d.channels.map((c) => (
          <ChannelStats key={`${d.entry_id}-${c}`} getHass={getHass} device={d} channel={c} period={period} showDevice={devices.length > 1} />
        )),
      )}
    </div>
  );
}

function ChannelStats({
  getHass,
  device,
  channel,
  period,
  showDevice,
}: {
  getHass: () => Hass;
  device: Device;
  channel: Channel;
  period: StatsPeriod;
  showDevice: boolean;
}) {
  const [data, setData] = useState<StatsData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const water = channel === "water";

  const load = useCallback(() => {
    getHass()
      .callWS<StatsData>({ type: "hive_local/stats", entry_id: device.entry_id, channel, days: period })
      .then((r) => {
        setData(r);
        setError("");
      })
      .catch((e) => setError(errorText(e)))
      .finally(() => setLoading(false));
  }, [getHass, device.entry_id, channel, period]);

  useEffect(() => {
    setLoading(true);
    setData(null);
    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => clearInterval(timer);
  }, [load]);

  const shown = data?.period === period ? data : null;

  return (
    <section className={`card stats ${channel}`}>
      <div className="card-head">
        <div className="title">
          <Icon name={water ? "water-boiler" : "radiator"} className="title-icon" />
          <div>
            <h2>{CHANNEL_LABEL[channel]}</h2>
            {showDevice && <div className="muted small">{device.name}</div>}
          </div>
        </div>
        {loading && <span className="chip">Loading…</span>}
      </div>

      {error && <div className="status error">{error}</div>}
      {shown && !shown.has_data && (
        <div className="status">
          No history for <code>{shown.entity_id}</code> in this period yet. Stats build up as Home Assistant records the
          receiver.
        </div>
      )}
      {shown?.has_data && <StatsBody data={shown} water={water} />}
    </section>
  );
}

function StatsBody({ data, water }: { data: StatsData; water: boolean }) {
  const elapsed = (data.end - data.start) / 60;
  const prev = data.previous;
  const comparable = !!prev?.has_data && prev.known_minutes >= 0.5 * data.known_minutes;
  const diff = comparable ? data.heating_minutes - prev!.heating_minutes : 0;
  const share = data.known_minutes ? data.heating_minutes / data.known_minutes : 0;
  const t = data.temperature;
  const onLabel = water ? "Hot water on" : "Boiler on";

  return (
    <>
      <div className="kpis">
        <Kpi label={onLabel} value={duration(data.heating_minutes)}>
          {comparable ? (
            <span className="delta">
              <Icon name={Math.abs(diff) < 1 ? "approximately-equal" : diff > 0 ? "arrow-up" : "arrow-down"} />
              {Math.abs(diff) < 1 ? "Same as" : `${duration(Math.abs(diff))} ${diff > 0 ? "more" : "less"} than`} {PREVIOUS[data.period]}
            </span>
          ) : (
            `${Math.round(share * 100)}% of the time`
          )}
        </Kpi>
        <Kpi label="Times it fired up" value={String(data.cycles)}>
          {data.cycles ? `About ${duration(data.heating_minutes / data.cycles)} each` : "Not at all"}
        </Kpi>
        {!water && (
          <Kpi label="Average temperature" value={t.avg != null ? `${t.avg.toFixed(1)}°` : "–"}>
            {t.min != null && t.max != null ? `${t.min.toFixed(1)}° to ${t.max.toFixed(1)}°` : "No readings"}
            {data.target_avg != null && ` · target ${data.target_avg.toFixed(1)}°`}
          </Kpi>
        )}
        <Kpi label="Boosts" value={String(data.boosts)}>
          {data.mode_minutes.boost ? `${duration(data.mode_minutes.boost)} boosting` : "None"}
        </Kpi>
      </div>

      {data.known_minutes < 0.9 * elapsed && (
        <div className="status small">
          History covers {duration(data.known_minutes)} of this period. Home Assistant's recorder keeps 10 days unless{" "}
          <code>purge_keep_days</code> is raised, and nothing is recorded while the receiver is unavailable.
        </div>
      )}

      <div className="stats-block">
        <h3>{water ? "When it was on" : "Temperature and heating"}</h3>
        <TimeChart series={data.series} period={data.period} now={data.end} water={water} />
      </div>

      {data.period > 1 && (
        <div className="stats-block">
          <h3>{water ? "On per day" : "Boiler on per day"}</h3>
          <DailyBars days={data.days} period={data.period} water={water} />
        </div>
      )}

      <div className="stats-block">
        <h3>Time in each mode</h3>
        <ModeBreakdown minutes={data.mode_minutes} total={data.known_minutes} water={water} />
      </div>
    </>
  );
}

function Kpi({ label, value, children }: { label: string; value: string; children: ReactNode }) {
  return (
    <div className="kpi">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub">{children}</div>
    </div>
  );
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

const PAD = { left: 34, right: 10, top: 10 };

/** Bucket label for tooltips. */
function bucketLabel(b: StatsBucket, step: number, period: StatsPeriod) {
  if (period === 1) return `${time(b.t)}–${time(b.t + step)}`;
  return `${longDate(b.t)}, ${time(b.t)}–${time(b.t + step)}`;
}

function xTicks(start: number, end: number, period: StatsPeriod): { t: number; label: string }[] {
  const out = [];
  if (period === 1) {
    for (let h = 0; h <= 24; h += 6) out.push({ t: start + h * 3600, label: h === 24 ? "" : time(start + h * 3600) });
    return out;
  }
  const days = Math.round((end - start) / 86400);
  const every = period === 7 ? 1 : 5;
  for (let i = 0; i < days; i += every) {
    const t = start + i * 86400;
    out.push({ t, label: period === 7 ? weekday(t) : date(t) });
  }
  return out;
}

function niceDomain(values: number[]): [number, number, number] {
  if (!values.length) return [15, 25, 2];
  let lo = Math.floor(Math.min(...values) - 0.5);
  let hi = Math.ceil(Math.max(...values) + 0.5);
  if (hi - lo < 4) {
    const mid = (hi + lo) / 2;
    lo = Math.floor(mid - 2);
    hi = Math.ceil(mid + 2);
  }
  const step = hi - lo > 10 ? 4 : hi - lo > 5 ? 2 : 1;
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil(hi / step) * step;
  return [lo, hi, step];
}

/** Room temperature and target over the period, with a heating strip underneath. */
function TimeChart({ series, period, now, water }: { series: StatsBucket[]; period: StatsPeriod; now: number; water: boolean }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  if (!series.length) return null;

  const step = series.length > 1 ? series[1].t - series[0].t : 3600;
  const start = series[0].t;
  const end = series[series.length - 1].t + step;
  const plotH = water ? 0 : 170;
  const stripY = PAD.top + plotH + (water ? 0 : 10);
  const stripH = water ? 36 : 14;
  const height = stripY + stripH + 24;
  const w = Math.max(0, width - PAD.left - PAD.right);
  const x = (t: number) => PAD.left + ((t - start) / (end - start)) * w;

  const temps = water ? [] : series.flatMap((b) => [b.current, b.target]).filter((v): v is number => v != null);
  const [lo, hi, yStep] = niceDomain(temps);
  const y = (v: number) => PAD.top + plotH - ((v - lo) / (hi - lo)) * plotH;
  const yTicks: number[] = [];
  for (let v = lo; v <= hi; v += yStep) yTicks.push(v);

  // Lines break where there's no data. Points sit at each bucket's middle.
  const line = (pick: (b: StatsBucket) => number | null, stepped: boolean) => {
    let d = "";
    let open = false;
    series.forEach((b) => {
      const v = pick(b);
      if (v == null) {
        open = false;
        return;
      }
      if (stepped) {
        d += `${open ? "L" : "M"}${x(b.t)},${y(v)}H${x(b.t + step)}`;
      } else {
        d += `${open ? "L" : "M"}${x(b.t + step / 2)},${y(v)}`;
      }
      open = true;
    });
    return d;
  };

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const t = start + ((e.clientX - r.left - PAD.left) / w) * (end - start);
    const i = Math.floor((t - start) / step);
    setHover(i >= 0 && i < series.length ? i : null);
  };
  const hb = hover != null ? series[hover] : null;
  const accent = water ? "var(--hl-water)" : "var(--hl-heat)";

  return (
    <div className="chart" ref={ref}>
      {!water && (
        <div className="chart-legend" aria-hidden="true">
          <span><i className="key line" /> Temperature</span>
          <span><i className="key dashed" /> Target</span>
          <span><i className="key band" /> Heating</span>
        </div>
      )}
      {width > 0 && (
        <svg width={width} height={height} onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img"
          aria-label={water ? "When hot water was on" : "Temperature, target and heating over time"}>
          {!water &&
            yTicks.map((v) => (
              <g key={v}>
                <line className="grid-line" x1={PAD.left} x2={PAD.left + w} y1={y(v)} y2={y(v)} />
                <text className="axis" x={PAD.left - 6} y={y(v) + 4} textAnchor="end">{v}°</text>
              </g>
            ))}
          {xTicks(start, end, period).map(({ t, label }) => (
            <g key={t}>
              <line className="grid-line" x1={x(t)} x2={x(t)} y1={PAD.top} y2={stripY + stripH} />
              {label && <text className="axis" x={x(t) + 3} y={stripY + stripH + 16}>{label}</text>}
            </g>
          ))}

          {/* Heating strip: each bucket's share of time heating, as opacity. */}
          <rect className="strip-bg" x={PAD.left} y={stripY} width={w} height={stripH} rx={4} />
          {series.map((b) =>
            b.heating ? (
              <rect key={b.t} x={Math.floor(x(b.t))} y={stripY} width={Math.max(1, Math.ceil(x(b.t + step)) - Math.floor(x(b.t)))} height={stripH}
                fill={accent} opacity={0.2 + 0.8 * b.heating} />
            ) : null,
          )}
          {water && <text className="axis" x={PAD.left - 6} y={stripY + stripH / 2 + 4} textAnchor="end">On</text>}

          {!water && <path className="target-line" d={line((b) => b.target, true)} />}
          {!water && <path className="temp-line" d={line((b) => b.current, false)} />}

          {now < end && <line className="now-line" x1={x(now)} x2={x(now)} y1={PAD.top} y2={stripY + stripH} />}

          {hb && (
            <g className="crosshair">
              <line x1={x(hb.t + step / 2)} x2={x(hb.t + step / 2)} y1={PAD.top} y2={stripY + stripH} />
              {!water && hb.current != null && <circle cx={x(hb.t + step / 2)} cy={y(hb.current)} r={4.5} />}
            </g>
          )}
        </svg>
      )}
      {hb && (
        <div className="tooltip" style={{ left: Math.min(Math.max(x(hb.t + step / 2), 90), width - 90) }}>
          <div className="tooltip-title">{bucketLabel(hb, step, period)}</div>
          {hb.heating == null ? (
            <div>No data</div>
          ) : (
            <>
              {!water && <div>Temperature <b>{hb.current != null ? `${hb.current.toFixed(1)}°` : "–"}</b></div>}
              {!water && <div>Target <b>{hb.target != null ? `${hb.target.toFixed(1)}°` : "Off"}</b></div>}
              <div>{water ? "On" : "Heating"} <b>{duration((hb.heating * step) / 60)}</b></div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/** Minutes heating per day, as bars. */
function DailyBars({ days, period, water }: { days: StatsData["days"]; period: StatsPeriod; water: boolean }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const height = 150;
  const plotH = 112;
  const top = 8;
  const w = Math.max(0, width - PAD.left - PAD.right);
  const max = Math.max(60, ...days.map((d) => d.heating_minutes ?? 0));
  const hStep = max > 12 * 60 ? 240 : max > 6 * 60 ? 120 : max > 3 * 60 ? 60 : 30;
  const hi = Math.ceil(max / hStep) * hStep;
  const y = (m: number) => top + plotH - (m / hi) * plotH;
  const slot = w / days.length;
  const gap = Math.min(8, Math.max(2, slot * 0.25));
  const ticks: number[] = [];
  for (let m = 0; m <= hi; m += hStep) ticks.push(m);
  const hd = hover != null ? days[hover] : null;

  return (
    <div className="chart" ref={ref}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={water ? "Hot water on per day" : "Boiler on per day"} onPointerLeave={() => setHover(null)}>
          {ticks.map((m) => (
            <g key={m}>
              <line className={m ? "grid-line" : "baseline"} x1={PAD.left} x2={PAD.left + w} y1={y(m)} y2={y(m)} />
              <text className="axis" x={PAD.left - 6} y={y(m) + 4} textAnchor="end">{m ? `${m / 60}h` : "0"}</text>
            </g>
          ))}
          {days.map((d, i) => {
            const bw = Math.max(1, Math.min(44, slot - gap));
            const bx = PAD.left + i * slot + (slot - bw) / 2;
            const v = d.heating_minutes ?? 0;
            const by = y(v);
            const h = top + plotH - by;
            const r = Math.min(4, bw / 2, h);
            const label = period === 7 || i % 5 === 0;
            return (
              <g key={d.start} onPointerEnter={() => setHover(i)}>
                {/* Hit target: the whole column. */}
                <rect x={PAD.left + i * slot} y={top} width={slot} height={plotH} fill="transparent" />
                {h > 0 && (
                  <path
                    className={`bar ${hover === i ? "hover" : ""}`}
                    style={{ fill: water ? "var(--hl-water)" : "var(--hl-heat)" }}
                    d={`M${bx},${top + plotH}V${by + r}Q${bx},${by} ${bx + r},${by}H${bx + bw - r}Q${bx + bw},${by} ${bx + bw},${by + r}V${top + plotH}Z`}
                  />
                )}
                {label && (
                  <text className="axis" x={bx + bw / 2} y={height - 10} textAnchor="middle">
                    {period === 7 ? weekday(d.start) : date(d.start)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      )}
      {hd && (
        <div className="tooltip" style={{ left: Math.min(Math.max(PAD.left + (hover! + 0.5) * slot, 80), width - 80) }}>
          <div className="tooltip-title">{longDate(hd.start)}</div>
          {hd.heating_minutes == null ? (
            <div>No data</div>
          ) : (
            <>
              <div>{water ? "On" : "Boiler on"} <b>{duration(hd.heating_minutes)}</b></div>
              {!water && hd.temp_avg != null && <div>Average <b>{hd.temp_avg.toFixed(1)}°</b></div>}
              {hd.known_minutes < 1380 && <div className="muted small">History for {duration(hd.known_minutes)}</div>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ModeBreakdown({ minutes, total, water }: { minutes: Record<Mode, number>; total: number; water: boolean }) {
  const rows: { id: Mode; label: string; icon: string }[] = [
    { id: "schedule", label: "Schedule", icon: "calendar-clock" },
    { id: "manual", label: water ? "Always on" : "Manual", icon: "hand-back-right" },
    { id: "boost", label: "Boost", icon: "rocket-launch" },
    { id: "off", label: "Off", icon: "power" },
  ];
  return (
    <div className="modes">
      {rows.map((r) => {
        const share = total ? minutes[r.id] / total : 0;
        return (
          <div key={r.id} className="mode-row">
            <Icon name={r.icon} />
            <span className="mode-name">{r.label}</span>
            <span className="mode-bar"><i style={{ width: `${share * 100}%` }} /></span>
            <span className="mode-time">{duration(minutes[r.id])}</span>
            <span className="mode-share">{Math.round(share * 100)}%</span>
          </div>
        );
      })}
    </div>
  );
}
