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
  model: "slr1" | "slr2";
  channels: Channel[];
}

export interface Limits {
  max_transitions: number;
  heat_min: number;
  heat_max: number;
  water_on: number;
  water_off: number;
}

/** The bits of HA's `hass` object we use. */
export interface Hass {
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
  themes?: { darkMode?: boolean };
}
