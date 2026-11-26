import { useEffect, useState } from "react";
import { formatUntil } from "./api";
import { Icon } from "./Icon";
import type { Limits } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");
/** A Date as a datetime-local input value (the browser's local time). */
const toInput = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

/** Away until…: pick when you're back and what the heating holds meanwhile (every receiver). */
export function HolidaySheet({
  hasHeat,
  hasWater,
  frost,
  limits,
  busy,
  onGo,
  onClose,
}: {
  hasHeat: boolean;
  hasWater: boolean;
  /** The frost protection setting: the default holiday temperature. */
  frost: number;
  limits: Limits | null;
  busy: boolean;
  /** null: until you're back (the Away toggle). */
  onGo: (until: Date | null, temperature: number) => void;
  onClose: () => void;
}) {
  // A week from now, at 14:00.
  const [until, setUntil] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(14, 0, 0, 0);
    return toInput(d);
  });
  const [temp, setTemp] = useState(frost);
  // Until you're back (open-ended, the default) or until a date.
  const [dated, setDated] = useState(false);
  const minTemp = limits?.boost_min_temp ?? 5;
  const maxTemp = limits?.heat_max ?? 32;
  const clamp = (t: number) => Math.min(maxTemp, Math.max(minTemp, Math.round(t * 2) / 2));
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const when = new Date(until);
  const valid = !dated || (!Number.isNaN(when.getTime()) && when.getTime() > Date.now() + 60_000);
  const what = [hasHeat && `heating holds ${temp.toFixed(1)}°`, hasWater && "hot water is off", hasHeat && "the rooms hold frost protection"]
    .filter(Boolean)
    .join(", ")
    .replace(/, ([^,]*)$/, " and $1");

  return (
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="sheet heat" role="dialog" aria-modal="true" aria-label="Away" onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        <div className="sheet-title">
          <h2>Away</h2>
          <span className="muted">While you're away, {what}. Then everything goes back to what it was doing.</span>
        </div>

        <div className="sheet-field">
          <span className="sheet-label">How long</span>
          <div className="sheet-lengths">
            <button className={!dated ? "on" : ""} onClick={() => setDated(false)}>Until I'm back</button>
            <button className={dated ? "on" : ""} onClick={() => setDated(true)}>Until a date</button>
          </div>
        </div>

        {dated && (
          <div className="sheet-field">
            <span className="sheet-label">Back on</span>
            <input
              className="sheet-time"
              type="datetime-local"
              value={until}
              min={toInput(new Date())}
              onChange={(e) => setUntil(e.target.value)}
            />
          </div>
        )}

        {hasHeat && (
          <div className="sheet-field">
            <span className="sheet-label">Heating while away</span>
            <div className="sheet-temp">
              <button className="round sheet-step" onClick={() => setTemp(clamp(temp - 0.5))} aria-label="Lower"><Icon name="minus" /></button>
              <span className="sheet-temp-value">{temp.toFixed(1)}°</span>
              <button className="round sheet-step" onClick={() => setTemp(clamp(temp + 0.5))} aria-label="Raise"><Icon name="plus" /></button>
            </div>
          </div>
        )}

        <button className="sheet-go" disabled={busy || !valid} onClick={() => onGo(dated ? when : null, temp)}>
          {!dated ? "Away until I'm back" : valid ? `Away until ${formatUntil(when)}` : "Pick a time in the future"}
        </button>
        <button className="ghost sheet-cancel" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
