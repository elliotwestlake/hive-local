// Mounts the real Hive Local panel bundle with a fake `hass` and sample data,
// then switches to the tab named in ?tab= so headless Chrome can screenshot it.
const params = new URLSearchParams(location.search);
if (params.get("theme") === "dark") document.documentElement.classList.add("dark");

const ICONS = await (await fetch("icons.json")).json();
customElements.define(
  "ha-icon",
  class extends HTMLElement {
    static observedAttributes = ["icon"];
    set icon(value) { this.setAttribute("icon", value); }
    get icon() { return this.getAttribute("icon"); }
    attributeChangedCallback() {
      const name = (this.getAttribute("icon") || "").replace("mdi:", "");
      const d = ICONS[name];
      if (!d) console.warn("missing icon", name);
      // Inline sizing: the panel's shadow DOM keeps document CSS out.
      this.style.display = "inline-flex";
      this.innerHTML = d
        ? `<svg viewBox="0 0 24 24" style="width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor"><path d="${d}"/></svg>`
        : "";
    }
  },
);

const weekday = [
  { time: "06:30", setpoint: 20.5 },
  { time: "08:30", setpoint: 16 },
  { time: "17:00", setpoint: 21 },
  { time: "22:30", setpoint: 1 },
];
const weekend = [
  { time: "07:30", setpoint: 21 },
  { time: "10:00", setpoint: 19.5 },
  { time: "16:30", setpoint: 21.5 },
  { time: "23:00", setpoint: 1 },
];
const SCHEDULES = {
  heat: {
    monday: weekday, tuesday: weekday, wednesday: weekday, thursday: weekday,
    friday: [...weekday.slice(0, 3), { time: "23:30", setpoint: 1 }],
    saturday: weekend, sunday: weekend,
  },
  water: Object.fromEntries(
    ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((d) => [
      d,
      [
        { time: "06:00", setpoint: 22 },
        { time: "08:00", setpoint: 1 },
        { time: "17:30", setpoint: 22 },
        { time: "20:00", setpoint: 1 },
      ],
    ]),
  ),
};

const STATUS = {
  e1: {
    heat: {
      status: { mode: params.get("mode") || "schedule", boost_remaining: 0, current_temperature: 19.6, setpoint: 20.5, heating: true },
      boost_minutes: 30,
      boost_temperature: 21,
      frost_temperature: 12,
    },
    water: {
      status: { mode: "boost", boost_remaining: 42, current_temperature: null, setpoint: 22, heating: true },
      boost_minutes: 60,
      boost_temperature: 21,
      frost_temperature: 12,
    },
  },
};

const valve = (id, name, temp, target, action, battery, available = true) =>
  ({ entity_id: id, name, available, current_temperature: temp, target, hvac_action: action, battery: String(battery) });
// ?receivers=2 shows a house with two heating zones.
const TWO = params.get("receivers") === "2";
const RECEIVERS = TWO
  ? [{ entry_id: "e1", name: "Downstairs" }, { entry_id: "e2", name: "Upstairs" }]
  : [{ entry_id: "e1", name: "Hive Receiver" }];
const ROOMS = [
  {
    id: "a1", name: "Lounge", valves: ["climate.lounge_bay", "climate.lounge_door"], sensor: "sensor.lounge",
    receiver: "e1", receiver_name: RECEIVERS[0].name,
    sensor_name: "Lounge temperature",
    valve_states: [valve("climate.lounge_bay", "Bay window valve", 19.2, 21, "heating", 78), valve("climate.lounge_door", "Door valve", 20.4, 21, "idle", 14)],
    current_temperature: 19.8, temperature_source: "sensor", target: 21, target_range: null, heating: true,
    heating_valves: ["climate.lounge_bay"], unavailable: [], lowest_battery: 14, battery_low: true,
  },
  {
    id: "b2", name: "Bedroom", valves: ["climate.bedroom"], sensor: null, sensor_name: null,
    receiver: TWO ? "e2" : "e1", receiver_name: TWO ? "Upstairs" : RECEIVERS[0].name,
    valve_states: [valve("climate.bedroom", "Bedroom valve", 17.6, 17, "idle", 91), valve("climate.ensuite", "En-suite valve", 18.1, 19, "idle", 66)],
    current_temperature: 17.9, temperature_source: "valves", target: null, target_range: [17, 19], heating: false,
    heating_valves: [], unavailable: [], lowest_battery: 66, battery_low: false,
  },
];
if (TWO)
  ROOMS.splice(1, 0, {
    id: "c3", name: "Kitchen", valves: ["climate.kitchen"], sensor: null, sensor_name: null, receiver: "e1", receiver_name: "Downstairs",
    valve_states: [valve("climate.kitchen", "Kitchen valve", 18.9, 19, "idle", 52)],
    current_temperature: 18.9, temperature_source: "valves", target: 19, target_range: null, heating: false,
    heating_valves: [], unavailable: [], lowest_battery: 52, battery_low: false,
  });
const CANDIDATES = {
  valves: [
    { entity_id: "climate.bedroom", name: "Bedroom valve", area: "Bedroom" },
    { entity_id: "climate.ensuite", name: "En-suite valve", area: "Bedroom" },
    { entity_id: "climate.kitchen", name: "Kitchen valve", area: "Kitchen" },
    { entity_id: "climate.lounge_bay", name: "Bay window valve", area: "Lounge" },
    { entity_id: "climate.lounge_door", name: "Door valve", area: "Lounge" },
  ],
  sensors: [{ entity_id: "sensor.lounge", name: "Lounge temperature", area: "Lounge" }],
  receivers: RECEIVERS,
};

// hive_local/stats: a plausible week of heating, made up but deterministic.
function fakeStats(entry, channel, days) {
  const water = channel === "water";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;
  const start = today - (days - 1) * 86400;
  const end = now.getTime() / 1000;
  const step = { 1: 900, 7: 3600, 30: 21600 }[days];
  const rnd = (i) => (Math.sin(i * 12.9898 + (entry === "e2" ? 3 : 0)) * 43758.5453) % 1;
  // Schedule shape: warm 06:30–08:30 and 17:00–22:30.
  const want = (t) => {
    const h = ((t - today) / 3600 + 240) % 24;
    if (water) return (h >= 6 && h < 8) || (h >= 17.5 && h < 20);
    return (h >= 6.5 && h < 8.5) ? 20.5 : (h >= 17 && h < 22.5) ? 21 : null;
  };
  const series = [];
  let temp = 16.5;
  for (let t = start; t < today + 86400; t += step) {
    if (t >= end) { series.push({ t, current: null, target: null, heating: null }); continue; }
    // Average the 15-minute shape over the bucket.
    let heat = 0, tg = 0, tgN = 0, n = 0, tempSum = 0;
    for (let u = t; u < t + step; u += 900, n++) {
      const w = want(u);
      if (water) { heat += w ? 1 : 0; continue; }
      if (w != null) { tg += w; tgN++; }
      const goal = w ?? 15.5;
      const on = w != null && temp < goal - 0.2;
      heat += on ? 0.55 + 0.4 * Math.abs(rnd(u / 900)) : 0;
      temp += on ? 0.22 : (goal > temp ? 0.05 : -0.06);
      temp = Math.max(15, temp);
      tempSum += temp;
    }
    series.push({ t, current: water ? null : +(tempSum / n).toFixed(1), target: water || !tgN ? null : +(tg / tgN).toFixed(1), heating: +(heat / n).toFixed(3) });
  }
  const known = series.filter((b) => b.heating != null);
  const heatingMin = known.reduce((a, b) => a + (b.heating * step) / 60, 0);
  const dayList = [];
  for (let i = 0; i < days; i++) {
    const a = start + i * 86400;
    const bs = known.filter((b) => b.t >= a && b.t < a + 86400);
    const temps = bs.filter((b) => b.current != null);
    dayList.push({
      start: a,
      heating_minutes: bs.length ? Math.round(bs.reduce((x, b) => x + (b.heating * step) / 60, 0)) : null,
      known_minutes: (bs.length * step) / 60,
      temp_avg: temps.length ? +(temps.reduce((x, b) => x + b.current, 0) / temps.length).toFixed(1) : null,
    });
  }
  const knownMin = (end - start) / 60;
  const temps = known.map((b) => b.current).filter((v) => v != null);
  return {
    start, end, period: days, entity_id: water ? "water_heater.hive_receiver_hot_water" : "climate.hive_receiver_heating",
    has_data: true, heating_minutes: Math.round(heatingMin), known_minutes: knownMin, unknown_minutes: 0,
    cycles: Math.round(days * (water ? 2 : 4.4)), boosts: days === 1 ? 1 : Math.round(days / 2.5),
    mode_minutes: { schedule: knownMin * 0.86, manual: knownMin * 0.05, off: knownMin * 0.06, boost: knownMin * 0.03 },
    temperature: water ? { avg: null, min: null, max: null } : {
      avg: +(temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1), min: Math.min(...temps), max: Math.max(...temps) },
    target_avg: water ? null : 20.7,
    previous: { has_data: true, heating_minutes: Math.round(heatingMin * 1.14), known_minutes: knownMin, cycles: 30 },
    days: dayList, series,
  };
}

const hass = {
  async callWS(msg) {
    switch (msg.type) {
      case "hive_local/devices":
        return {
          devices: TWO
            ? [
                { entry_id: "e1", name: "Downstairs", model: "SLR2b", channels: ["heat", "water"] },
                { entry_id: "e2", name: "Upstairs", model: "SLR1c", channels: ["heat"] },
              ]
            : [{ entry_id: "e1", name: "Hive Receiver", model: "SLR2b", channels: ["heat", "water"] }],
          limits: { max_transitions: 6, heat_min: 1, heat_max: 32, boost_min_temp: 5, boost_max_minutes: 360, water_on: 22, water_off: 1 },
        };
      case "hive_local/rooms/candidates":
        return CANDIDATES;
      case "hive_local/stats":
        return fakeStats(msg.entry_id, msg.channel, msg.days);
      case "hive_local/get":
        return { schedule: SCHEDULES[msg.channel], complete: true };
      default:
        return { ok: true };
    }
  },
  connection: {
    subscribeMessage(cb, msg) {
      const upstairs = { ...STATUS.e1.heat, status: { ...STATUS.e1.heat.status, current_temperature: 18.2, setpoint: 18, heating: false } };
      const status = TWO ? { ...STATUS, e2: { heat: upstairs } } : STATUS;
      setTimeout(() => cb(msg.type === "hive_local/rooms/subscribe" ? { rooms: ROOMS, receivers: RECEIVERS } : { status }), 0);
      return Promise.resolve(() => Promise.resolve());
    },
  },
};

await import("./hive-local-panel.js");
const panel = document.createElement("hive-local-panel");
panel.narrow = params.get("narrow") === "1";
document.body.append(panel);
panel.hass = hass;

// Pick the tab, then (optionally) click into something.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
await wait(300);
const tab = params.get("tab");
if (tab) {
  const button = [...panel.shadowRoot.querySelectorAll('[role="tab"]')].find((b) => b.textContent.trim() === tab);
  button?.click();
}
await wait(500);
const click = params.get("click");
if (click) {
  // Exact button text, or a card whose text starts with it (e.g. a receiver's name).
  const buttons = [...panel.shadowRoot.querySelectorAll("button")];
  (buttons.find((b) => b.textContent.trim() === click) ?? buttons.find((b) => b.textContent.trim().startsWith(click)))?.click();
  await wait(400);
}
document.title = "ready";
