import { useSender } from "./api";
import { Icon } from "./Icon";
import type { Device, Hass, PreheatInfo } from "./types";

const LEADS = [60, 90, 120, 180];

/**
 * Pre-heat on the heating Control tab: start early so it's warm at the scheduled time.
 * Learns how fast the house warms up from the recorder; off by default.
 */
export function PreheatCard({ getHass, device, info }: { getHass: () => Hass; device: Device; info: PreheatInfo }) {
  const { busy, result, send } = useSender(getHass, device.entry_id, "heat");
  const leads = [...new Set([...LEADS, info.max_lead])].sort((a, b) => a - b);

  let line: string;
  if (!info.enabled) line = "Start heating early, so it's warm by the time the schedule says.";
  else if (info.active_for) line = `Pre-heating now, for ${info.active_for}.`;
  else if (info.rate == null)
    line = `Still learning how fast your home warms up (${info.warmups} of ${info.warmups_needed} warm-ups seen).`;
  else if (!info.schedule_known) line = "Reading the heating schedule…";
  else if (info.next) line = `Next: starts ${info.next.start} to reach ${info.next.setpoint}° by ${info.next.at}.`;
  else line = "Nothing to pre-heat for yet.";

  return (
    <section className="card preheat">
      <div className="target-row">
        <div className="device-row">
          <span className="device-icon"><Icon name="sun-clock" /></span>
          <div className="target-text">
            <span className="target-label">Pre-heat</span>
            <span className="muted small">{line}</span>
          </div>
        </div>
        <div className="segmented" role="radiogroup" aria-label="Pre-heat">
          {[true, false].map((on) => (
            <button
              key={String(on)}
              role="radio"
              aria-checked={info.enabled === on}
              className={info.enabled === on ? "on" : ""}
              disabled={busy}
              onClick={() => send({ type: "hive_local/preheat", enabled: on }, on ? "Pre-heat on" : "Pre-heat off")}
            >
              {on ? "On" : "Off"}
            </button>
          ))}
        </div>
      </div>
      {info.enabled && (
        <div className="target-row">
          <div className="target-text">
            <span>Start at most</span>
            <span className="muted small">
              {info.rate != null ? `Your home warms about ${info.rate.toFixed(1)}° an hour` : "Before the scheduled time"}
            </span>
          </div>
          <div className="segmented" role="radiogroup" aria-label="Start at most">
            {leads.map((m) => (
              <button
                key={m}
                role="radio"
                aria-checked={info.max_lead === m}
                className={info.max_lead === m ? "on" : ""}
                disabled={busy}
                onClick={() => send({ type: "hive_local/preheat", max_lead: m }, "Saved")}
              >
                {m % 60 ? `${m / 60} h`.replace(".5 h", "½ h") : `${m / 60} h`}
              </button>
            ))}
          </div>
        </div>
      )}
      {result?.kind === "error" && <div className="status error">{result.text}</div>}
    </section>
  );
}
