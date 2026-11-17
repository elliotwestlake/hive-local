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
  model: string | null; // Z2M model, e.g. "SLR1c"
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
}

/** entry_id -> channel -> info, pushed by hive_local/subscribe. */
export type StatusMap = Record<string, Partial<Record<Channel, ChannelInfo>>>;

/** The bits of HA's `hass` object we use. */
export interface Hass {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  connection: {
    subscribeMessage<T>(callback: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
  };
  themes?: { darkMode?: boolean };
}

export const CHANNEL_LABEL: Record<Channel, string> = { heat: "Heating", water: "Hot water" };

export const errorText = (e: any) => String(e?.message ?? e);
