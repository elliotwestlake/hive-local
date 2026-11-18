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

export const formatMinutes = (m: number) =>
  m < 60 ? `${m} min` : m % 60 ? `${Math.floor(m / 60)} h ${m % 60} min` : `${m / 60} h`;
