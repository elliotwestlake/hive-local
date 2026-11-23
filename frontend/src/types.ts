export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;
export type Day = (typeof DAYS)[number];

export type Channel = "heat" | "water";

export interface Transition {
  time: string; // HH:MM
  setpoint: number;
}

export type Schedule = Partial<Record<Day, Transition[]>>;

export interface Device {
  entry_id: string;
  name: string;
  model: string | null; // receiver model from Z2M or ZHA, e.g. "SLR1c"
  transport?: "z2m" | "zha";
  channels: Channel[];
}

export interface Limits {
  max_transitions: number;
  heat_min: number;
  heat_max: number;
  boost_min_temp: number;
  boost_max_minutes: number;
  water_on: number;
  water_off: number;
}

export type Mode = "schedule" | "manual" | "off" | "boost";

export interface ChannelStatus {
  mode: Mode;
  boost_remaining: number | null;
  current_temperature: number | null;
  setpoint: number | null;
  heating: boolean;
}

export interface ChannelInfo {
  status: ChannelStatus | null; // null until the receiver has reported
  boost_minutes: number;
  boost_temperature: number;
  frost_temperature: number; // HA-side setting, shown during schedule "off" periods
  preheat?: PreheatInfo; // heating only
}

/** Pre-heat (heating): start early so it's warm at the scheduled time. */
export interface PreheatInfo {
  enabled: boolean;
  max_lead: number; // minutes
  rate: number | null; // learned °C per hour, null until enough warm-ups
  warmups: number;
  warmups_needed: number;
  schedule_known: boolean;
  active_for: string | null; // "07:00" while pre-heating
  next: { at: string; setpoint: number; start: string } | null;
}

/** entry_id -> channel -> info, pushed by hive_local/subscribe. */
export type StatusMap = Record<string, Partial<Record<Channel, ChannelInfo>>>;

/** The bits of HA's `hass` object we use. */
export interface Hass {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
    addEventListener?(event: "ready", listener: () => void): void;
    removeEventListener?(event: "ready", listener: () => void): void;
  };
  themes?: { darkMode?: boolean };
}

export const CHANNEL_LABEL: Record<Channel, string> = { heat: "Heating", water: "Hot water" };

/** home-assistant-js-websocket's code for a command cut off by a dropped connection. */
export const ERR_CONNECTION_LOST = 3;

/** The {code, message} inside a websocket rejection: HA sends it bare, but a dropped
 * connection rejects with the whole result message ({type, success, error}). */
const wsError = (e: any) => (e && typeof e === "object" && e.error && typeof e.error === "object" ? e.error : e);

/** True when a command failed only because the connection dropped (the app was backgrounded, HA restarted). */
export const connectionLost = (e: any) => wsError(e)?.code === ERR_CONNECTION_LOST;

export const errorText = (e: any) => {
  const err = wsError(e);
  if (typeof err === "string") return err;
  if (typeof err?.message === "string" && err.message) return err.message;
  if (err?.code !== undefined) return `Error: ${err.code}`;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};

/** A radiator valve's live state, as the backend reads it from its HA entity. */
export interface ValveState {
  entity_id: string;
  name: string;
  available: boolean;
  current_temperature: number | null;
  target: number | null;
  hvac_action: string | null;
  battery: string | null; // the battery sensor's state, e.g. "85"
}

/** hive_local/rooms/valves: any Hive valve, for the Devices tab. */
export interface ValveInfo extends ValveState {
  area: string | null;
  room: string | null; // the room it's in, if any
}

export interface Room {
  id: string;
  name: string;
  valves: string[];
  sensor: string | null;
  receiver: string | null; // entry_id of the receiver (heating zone) that heats it
  receiver_name: string | null;
  sensor_name: string | null;
  valve_states: ValveState[];
  current_temperature: number | null;
  temperature_source: "sensor" | "valves" | null;
  target: number | null; // when all valves agree
  target_range: [number, number] | null; // when they don't
  heating: boolean;
  heating_valves: string[];
  unavailable: string[];
  lowest_battery: number | null;
  battery_low: boolean;
}

export interface Candidate {
  entity_id: string;
  name: string;
  area: string | null;
}

export interface Receiver {
  entry_id: string;
  name: string;
}

export type StatsPeriod = 1 | 7 | 30;

export interface StatsBucket {
  t: number; // epoch seconds
  current: number | null;
  target: number | null;
  heating: number | null; // fraction of the bucket spent heating; null = no data
}

/** hive_local/stats: one channel over a period, from HA's recorder. */
export interface Stats {
  start: number;
  end: number;
  period: StatsPeriod;
  entity_id: string;
  has_data: boolean;
  heating_minutes: number;
  known_minutes: number;
  unknown_minutes: number;
  cycles: number;
  boosts: number;
  mode_minutes: Record<Mode, number>;
  temperature: { avg: number | null; min: number | null; max: number | null };
  target_avg: number | null;
  previous: { has_data: boolean; heating_minutes: number; known_minutes: number; cycles: number } | null;
  days: {
    start: number;
    heating_minutes: number | null;
    known_minutes: number;
    temp_avg: number | null;
    temp_min: number | null;
    temp_max: number | null;
  }[];
  offset: number;
  period_end: number;
  series: StatsBucket[];
}
