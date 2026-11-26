import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { errorText, type Hass, type Room } from "./types";

type Key = "response" | "adaptation" | "adaptation_run" | "adaptation_status";

interface Setting {
  value: number | boolean | string | null;
  mixed: boolean;
  supported: number; // how many of the room's valves have it
}

interface ValveSettingsData {
  settings: Record<Key, Setting>;
  count: number;
  response_minutes: number[];
}

const STATUS_TEXT: Record<string, string> = {
  in_progress: "Running now",
  found: "Done: the valve knows its radiator",
  lost: "Needs running again",
  none: "Not run yet",
};

/** "Usually goes 0.6° past its target", from what Rooms call for heat recorded. */
export function overshootText(room: Room): string | null {
  const o = room.overshoot;
  if (!o || !o.runs) return null;
  if (o.median == null) return `Learning how far it warms past its target after the boiler stops (${o.runs} of 3 runs so far).`;
  if (o.median <= 0.1) return "Stops close to its target after the boiler stops.";
  return `After the boiler stops it usually goes ${o.median.toFixed(1)}° past its target.`;
}

/** The Hive valves' own settings for a room, set on every valve in it at once. */
export function ValveSettingsDialog({ getHass, room, onClose }: { getHass: () => Hass; room: Room; onClose: () => void }) {
  const [data, setData] = useState<ValveSettingsData | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setData(await getHass().callWS<ValveSettingsData>({ type: "hive_local/rooms/valve_settings", room_id: room.id }));
    } catch (e) {
      setError(errorText(e));
    }
  };
  useEffect(() => {
    load();
  }, [room.id]);

  const set = async (key: Key, value?: number | boolean, done?: string) => {
    setBusy(true);
    setMessage("");
    setError("");
    try {
      const r = await getHass().callWS<{ failed: string[] }>({ type: "hive_local/rooms/valve_settings/set", room_id: room.id, key, ...(value === undefined ? {} : { value }) });
      if (r.failed.length) {
        const names = room.valve_states.filter((v) => r.failed.includes(v.entity_id)).map((v) => v.name);
        setError(`Didn't take on ${names.join(", ")}. It may be asleep: press its dial to wake it and try again.`);
      } else if (done) {
        setMessage(done);
      }
      await load();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  const s = data?.settings;
  const partly = (setting: Setting | undefined) =>
    setting && data && setting.supported < data.count ? ` Only ${setting.supported} of the ${data.count} valves have this in Home Assistant.` : "";
  const mixed = (setting: Setting | undefined) => (setting?.mixed ? " The valves differ: choosing sets them all." : "");
  const onOff = (key: Key, setting: Setting, label: string) => (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {[true, false].map((on) => (
        <button key={String(on)} role="radio" aria-checked={setting.value === on} className={setting.value === on ? "on" : ""} disabled={busy} onClick={() => setting.value !== on && set(key, on)}>
          {on ? "On" : "Off"}
        </button>
      ))}
    </div>
  );
  const none = s && !s.response.supported && !s.adaptation.supported && !s.adaptation_run.supported;

  return (
    <div className="sheet-backdrop" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <div className="sheet room-sheet room-editor valve-settings" role="dialog" aria-modal="true" aria-label="Valve settings" onClick={(e) => e.stopPropagation()}>
        <span className="sheet-handle" />
        <h2>Valve settings</h2>
        <p className="muted small">{room.name}: set on every valve in the room. Changes reach a sleeping valve when it next wakes; pressing its dial wakes it.</p>
        {error && <div className="status error">{error}</div>}
        {message && <div className="status">{message}</div>}
        {!data && !error && <p className="muted">Loading…</p>}
        {none && <p className="muted">None of these valves have their settings in Home Assistant. On ZHA they come with the Danfoss Ally quirk; on Zigbee2MQTT they're among the valve's exposes.</p>}
        {s && !none && (
          <div className="settings-group">
            {s.response.supported > 0 && (
              <div className="settings-row">
                <span className="device-icon"><Icon name="timer-sand" /></span>
                <div className="settings-text">
                  <span>Response time</span>
                  <span className="muted small">How gently the valve opens when the room needs heat. Slower can stop a room overshooting, but it warms up later.{mixed(s.response)}{partly(s.response)}</span>
                </div>
                <select aria-label="Response time" value={s.response.value == null ? "" : String(s.response.value)} disabled={busy} onChange={(e) => e.target.value && set("response", Number(e.target.value))}>
                  {s.response.value == null && <option value="">Unknown</option>}
                  {data.response_minutes.map((m) => (
                    <option key={m} value={m}>
                      {m} min{m === 30 ? " (usual)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {(s.adaptation.supported > 0 || s.adaptation_run.supported > 0) && (
              <div className="settings-row">
                <span className="device-icon"><Icon name="tune-variant" /></span>
                <div className="settings-text">
                  <span>Adaptation run</span>
                  <span className="muted small">
                    The valve learns how its radiator's valve opens, so it doesn't open further than it needs to. On: it checks each night.
                    {s.adaptation_status.value != null ? ` ${STATUS_TEXT[String(s.adaptation_status.value)] ?? ""}${s.adaptation_status.mixed ? " on some valves" : ""}.` : ""}
                    {mixed(s.adaptation)}{partly(s.adaptation)}
                  </span>
                </div>
                <div className="settings-controls">
                  {s.adaptation.supported > 0 && onOff("adaptation", s.adaptation, "Adaptation run")}
                  {s.adaptation_run.supported > 0 && (
                    <button className="ghost" disabled={busy} onClick={() => set("adaptation_run", undefined, "Asked the valves to run it. It takes a few minutes, once each valve wakes.")}>
                      Run now
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <button className="ghost sheet-cancel" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
