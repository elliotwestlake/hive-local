import { useState } from "react";
import { errorText, type Channel, type Hass } from "./types";

export type Result = { kind: "ok" | "error"; text: string } | null;

/** Send a hive_local websocket command for one channel and keep a short result message. */
export function useSender(getHass: () => Hass, entryId: string, channel: Channel) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<Result>(null);

  const send = async (msg: Record<string, unknown>, done: string) => {
    setBusy(true);
    try {
      await getHass().callWS({ entry_id: entryId, channel, ...msg });
      setResult({ kind: "ok", text: done });
    } catch (e) {
      setResult({ kind: "error", text: errorText(e) });
    } finally {
      setBusy(false);
    }
  };

  return { busy, result, send };
}

const WEEKDAY = new Intl.DateTimeFormat(undefined, { weekday: "short" });
const DAY_MONTH = new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" });
const TIME = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" });

/** "Sat 14:00" within the next six days, else "Sat 5 Dec 14:00". */
export function formatUntil(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  if (Number.isNaN(d.getTime())) return "";
  const days = (d.getTime() - Date.now()) / 86_400_000;
  return `${(days < 6 ? WEEKDAY : DAY_MONTH).format(d)} ${TIME.format(d)}`;
}

/** "Bedroom", "Bedroom and Lounge", "3 rooms". */
export const roomsLabel = (rooms: string[]) =>
  rooms.length === 0 ? "rooms" : rooms.length <= 2 ? rooms.join(" and ") : `${rooms.length} rooms`;

export const formatMinutes =(m: number) =>
  m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} h`;

/** "Away until Sat 14:00", or just "Away" for the Away toggle (until you're back). */
export function awayText(until: string | null | undefined): string {
  return until ? `Away until ${formatUntil(until)}` : "Away";
}
