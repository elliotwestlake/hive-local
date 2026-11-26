import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { RoomSetupDialog } from "./Rooms";
import { DemandRows, TidySettings } from "./Settings";
import { errorText, type Candidate, type Device, type Hass, type StatusMap } from "./types";

/**
 * The first-run walkthrough, shown once when the panel opens (and again from Settings):
 * rooms from your areas, rooms calling for heat, tidying up ZHA / Z2M duplicates, and the
 * outside temperature. Every step can be skipped; all of it is in Settings afterwards.
 */

type Step = "rooms" | "demand" | "tidy" | "outside" | "done";

const TITLES: Record<Step, string> = {
  rooms: "Your rooms",
  demand: "Rooms call for heat",
  tidy: "Tidy up duplicate entities",
  outside: "Outside temperature",
  done: "You're all set",
};

export function Onboarding({
  getHass,
  devices,
  status,
  onDone,
}: {
  getHass: () => Hass;
  devices: Device[];
  status: StatusMap;
  onDone: () => void;
}) {
  const heated = devices.filter((d) => d.channels.includes("heat"));
  const steps: Step[] = ["rooms", ...(heated.length ? (["demand"] as Step[]) : []), "tidy", "outside", "done"];
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const last = index === steps.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onDone();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDone]);

  return (
    <div className="sheet-backdrop" onClick={(e) => e.stopPropagation()}>
      <div className="sheet room-sheet onboarding" role="dialog" aria-modal="true" aria-label="Set up Hive Local">
        <span className="sheet-handle" />
        <div className="onboarding-dots" aria-hidden="true">
          {steps.map((s, i) => <i key={s} className={i === index ? "on" : i < index ? "past" : ""} />)}
        </div>
        <h2>{TITLES[step]}</h2>

        <div className="onboarding-body">
          {step === "rooms" && <RoomsStep getHass={getHass} />}
          {step === "demand" && (
            <>
              <p className="muted">
                Lets a cold room bring the heating on even when the receiver's own thermostat is warm enough. Off unless you turn it on.
              </p>
              <div className="settings-group">
                {heated.map((d) =>
                  status[d.entry_id]?.heat?.demand ? (
                    <DemandRows key={d.entry_id} getHass={getHass} device={d} info={status[d.entry_id]!.heat!.demand!} />
                  ) : null,
                )}
              </div>
            </>
          )}
          {step === "tidy" && (
            <>
              <p className="muted">ZHA or Zigbee2MQTT makes its own thermostat for the receiver and for each valve.</p>
              <TidySettings getHass={getHass} bare empty="Nothing to tidy up: no duplicates found." />
            </>
          )}
          {step === "outside" && <OutsideStep getHass={getHass} />}
          {step === "done" && (
            <p className="muted">
              Everything here is in <b>Settings</b>, along with boost defaults, frost protection and the gas price for cost estimates.
              Tap a room on the Overview to set its temperature, boost it or give its valves a schedule.
            </p>
          )}
        </div>

        <div className="onboarding-actions">
          {index > 0 && !last && (
            <button className="ghost" onClick={() => setIndex(index - 1)}>Back</button>
          )}
          <button className="sheet-go" style={{ ["--hl-accent" as string]: "var(--hl-brand)" }} onClick={() => (last ? onDone() : setIndex(index + 1))}>
            {last ? "Go to the Overview" : "Next"}
          </button>
        </div>
        {!last && (
          <button className="ghost sheet-cancel" onClick={onDone}>Skip setup</button>
        )}
      </div>
    </div>
  );
}

/** Rooms from your areas: how many are waiting, and the setup dialog. */
function RoomsStep({ getHass }: { getHass: () => Hass }) {
  const [waiting, setWaiting] = useState<number | null>(null);
  const [made, setMade] = useState(0);
  const [setup, setSetup] = useState(false);
  const [error, setError] = useState("");
  const look = () =>
    getHass()
      .callWS<{ rooms: unknown[] }>({ type: "hive_local/rooms/suggest" })
      .then((r) => setWaiting(r.rooms.length))
      .catch((e) => setError(errorText(e)));
  useEffect(() => {
    look();
    getHass()
      .callWS<{ valves: { room: string | null }[] }>({ type: "hive_local/rooms/valves" })
      .then((r) => setMade(new Set(r.valves.map((v) => v.room).filter(Boolean)).size))
      .catch(() => {});
  }, [getHass]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <p className="muted">
        A room groups its Hive radiator valves, so you can set, boost and schedule them together. Give a room a temperature sensor
        and the valves heat to its reading instead of their own, taken beside the radiator.
      </p>
      {error && <div className="status error">{error}</div>}
      <div className="settings-group">
        <div className="settings-row">
          <span className="device-icon"><Icon name="home-thermometer-outline" /></span>
          <div className="settings-text">
            <span>
              {waiting == null ? "Looking for your valves…" : waiting ? `${waiting} ${waiting === 1 ? "area has" : "areas have"} Hive valves that aren't in a room yet` : made ? "Every Hive valve with an area is in a room" : "No Hive radiator valves found"}
            </span>
            <span className="muted small">
              {made ? `${made} ${made === 1 ? "room" : "rooms"} so far. ` : ""}
              {waiting === 0 && !made ? "Pair them with ZHA or Zigbee2MQTT and give them an area; you can add rooms later in Settings." : "You can add or change rooms later in Settings."}
            </span>
          </div>
          {!!waiting && (
            <button className="device-action tidy-action" onClick={() => setSetup(true)}>Set up rooms</button>
          )}
        </div>
      </div>
      {setup && (
        <RoomSetupDialog
          getHass={getHass}
          onDone={() => {
            setSetup(false);
            look();
            getHass()
              .callWS<{ valves: { room: string | null }[] }>({ type: "hive_local/rooms/valves" })
              .then((r) => setMade(new Set(r.valves.map((v) => v.room).filter(Boolean)).size))
              .catch(() => {});
          }}
        />
      )}
    </>
  );
}

/** The house-wide outside temperature, for the heating history. */
function OutsideStep({ getHass }: { getHass: () => Hass }) {
  const [data, setData] = useState<{ outdoor_entity: string | null; outdoor_candidates: Candidate[] } | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    getHass()
      .callWS<{ outdoor_entity: string | null; outdoor_candidates: Candidate[] }>({ type: "hive_local/settings" })
      .then(setData)
      .catch((e) => setError(errorText(e)));
  }, [getHass]);
  const choose = (entity: string) => {
    setData((d) => d && { ...d, outdoor_entity: entity || null });
    getHass()
      .callWS({ type: "hive_local/settings/set", outdoor_entity: entity || null })
      .catch((e) => setError(errorText(e)));
  };
  return (
    <>
      <p className="muted">Shown in the heating history next to how long the boiler was on, so a cold week makes sense.</p>
      {error && <div className="status error">{error}</div>}
      <div className="settings-group">
        <div className="settings-row">
          <span className="device-icon"><Icon name="weather-partly-cloudy" /></span>
          <div className="settings-text">
            <span>Weather or outdoor sensor</span>
          </div>
          <select aria-label="Outside temperature" value={data?.outdoor_entity ?? ""} onChange={(e) => choose(e.target.value)} disabled={!data}>
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
    </>
  );
}
