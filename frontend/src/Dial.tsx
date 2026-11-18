/** A thermostat-style ring: the arc shows the target, the dot the room temperature. */

const MIN = 5;
const MAX = 30;
const START = 135; // degrees, measured clockwise from 3 o'clock
const SWEEP = 270;
const R = 80;

const frac = (t: number) => Math.min(1, Math.max(0, (t - MIN) / (MAX - MIN)));

function point(f: number) {
  const a = ((START + SWEEP * f) * Math.PI) / 180;
  return { x: 100 + R * Math.cos(a), y: 100 + R * Math.sin(a) };
}

function arc(from: number, to: number) {
  const a = point(from);
  const b = point(to);
  const large = SWEEP * (to - from) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${R} ${R} 0 ${large} 1 ${b.x} ${b.y}`;
}

export function Dial({
  current,
  target,
  state,
  caption,
}: {
  current: number | null;
  target: number | null;
  state: "heating" | "idle" | "off";
  caption: string;
}) {
  const dot = current != null ? point(frac(current)) : null;
  return (
    <div className={`dial ${state}`}>
      <svg viewBox="0 0 200 200" role="img" aria-label={caption}>
        <path className="track" d={arc(0, 1)} />
        {target != null && state !== "off" && <path className="value" d={arc(0, Math.max(0.005, frac(target)))} />}
        {dot && <circle className="dot" cx={dot.x} cy={dot.y} r="7" />}
      </svg>
      <div className="dial-center">
        <div className="dial-temp">
          {current != null ? current.toFixed(1) : "–"}
          <span className="unit">°C</span>
        </div>
        <div className="dial-caption">{caption}</div>
      </div>
    </div>
  );
}
