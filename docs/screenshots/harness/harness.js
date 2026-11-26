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
      // Pre-heat on, with a learned warm-up rate and the next rise planned.
      preheat: { enabled: true, max_lead: 120, rate: 1.6, warmups: 9, warmups_needed: 3, rate_known: true, schedule_known: true, active_for: null,
        next: { at: "16:30", setpoint: 20.5, start: "15:52", skipped: false } },
    },
    water: {
      status: { mode: "boost", boost_remaining: 42, current_temperature: null, setpoint: 22, heating: true },
      boost_minutes: 60,
      boost_temperature: 21,
      frost_temperature: 12,
    },
  },
};

// Rooms call for heat (#4): off by default; ?demand=on turns it on (rooms warm), ?demand=1 heats for the Bedroom.
const DEMAND = params.get("demand");
STATUS.e1.heat.demand = { enabled: !!DEMAND, outside_schedule: false, active: DEMAND === "1", rooms: DEMAND === "1" ? ["Bedroom"] : [],
  calling: DEMAND === "1" ? ["Bedroom"] : [], setpoint: DEMAND === "1" ? 22.5 : null, reason: DEMAND === "1" ? null : DEMAND ? "warm" : "off" };
if (DEMAND === "1") STATUS.e1.heat.status = { ...STATUS.e1.heat.status, mode: "boost", boost_remaining: 24, setpoint: 22.5, heating: true };
if (DEMAND === "1") STATUS.e1.heat.preheat = { ...STATUS.e1.heat.preheat, next: null };

// ?holiday=1: away until four days from now at 14:00 (heating on the holiday's 12° boost, hot water off).
// ?holiday=open: away until you're back (the Away toggle), rooms included.
const HOLIDAY = params.get("holiday");
if (HOLIDAY === "1" || HOLIDAY === "open") {
  const until = new Date(Date.now() + 4 * 86400000);
  until.setHours(14, 0, 0, 0);
  const holiday = { until: HOLIDAY === "open" ? null : until.toISOString(), restore_mode: "schedule" };
  STATUS.e1.heat = { ...STATUS.e1.heat, status: { ...STATUS.e1.heat.status, mode: "boost", boost_remaining: 312, setpoint: 12, heating: false }, holiday: { ...holiday, temperature: 12, holding: true } };
  STATUS.e1.water = { ...STATUS.e1.water, status: { ...STATUS.e1.water.status, mode: "off", boost_remaining: null, heating: false }, holiday: { ...holiday, temperature: null, holding: false } };
}

const valve = (id, name, temp, target, action, battery, available = true) =>
  ({ entity_id: id, name, available, current_temperature: temp, target, hvac_action: action, battery: String(battery) });
// ?receivers=2 shows a house with two heating zones.
const TWO = params.get("receivers") === "2";
const RECEIVERS = TWO
  ? [{ entry_id: "e1", name: "Downstairs" }, { entry_id: "e2", name: "Upstairs" }]
  : [{ entry_id: "e1", name: "Hive Receiver" }];
// ?valvesensor=partly|lost shows the Lounge valves only partly using, or losing, the room sensor (#3).
const VALVE_SENSOR = params.get("valvesensor") || "using";
const ROOMS = [
  {
    id: "a1", name: "Lounge", valves: ["climate.lounge_bay", "climate.lounge_door"], sensor: "sensor.lounge",
    receiver: "e1", receiver_name: RECEIVERS[0].name,
    sensor_name: "Lounge temperature",
    valve_states: [
      { ...valve("climate.lounge_bay", "Bay window valve", 19.2, 21, "heating", 78), external_sensor: "using", external_sensor_sent: 19.8 },
      { ...valve("climate.lounge_door", "Door valve", 20.4, 21, "idle", 14), external_sensor: VALVE_SENSOR === "partly" ? "unsupported" : "using", external_sensor_sent: 19.8 },
    ],
    current_temperature: 19.8, temperature_source: VALVE_SENSOR === "lost" ? "valves" : "sensor", target: 21, target_range: null, heating: true,
    heating_valves: ["climate.lounge_bay"], unavailable: [], lowest_battery: 14, battery_low: true,
    sensor_on_valves: true, external_sensor: VALVE_SENSOR === "lost" ? "waiting" : VALVE_SENSOR,
    mode: params.get("roommode") || "manual",
    // ?roomboost=1: the Lounge is boosted to 22° with 42 min left.
    boost: params.get("roomboost") === "1" ? { until: new Date(Date.now() + 42 * 60000).toISOString(), temperature: 22, remaining: 42 } : null,
  },
  {
    id: "b2", name: "Bedroom", valves: ["climate.bedroom"], sensor: null, sensor_name: null,
    receiver: TWO ? "e2" : "e1", receiver_name: TWO ? "Upstairs" : RECEIVERS[0].name,
    valve_states: [valve("climate.bedroom", "Bedroom valve", 17.6, 17, "idle", 91), valve("climate.ensuite", "En-suite valve", 18.1, 19, "idle", 66)],
    current_temperature: 17.9, temperature_source: "valves", target: null, target_range: [17, 19], heating: false,
    heating_valves: [], unavailable: [], lowest_battery: 66, battery_low: false,
  },
];
if (HOLIDAY === "open") ROOMS.forEach((r) => Object.assign(r, { away: true, mode: "off", frost: 12, heating: false }));

if (TWO)
  ROOMS.splice(1, 0, {
    id: "c3", name: "Kitchen", valves: ["climate.kitchen"], sensor: null, sensor_name: null, receiver: "e1", receiver_name: "Downstairs",
    valve_states: [valve("climate.kitchen", "Kitchen valve", 18.9, 19, "idle", 52)],
    current_temperature: 18.9, temperature_source: "valves", target: 19, target_range: null, heating: false,
    heating_valves: [], unavailable: [], lowest_battery: 52, battery_low: false,
  });
// ?many=1 adds 13 more valves, for a big house.
const MANY = params.has("many") ? [
  ["Bedroom 2", "Front bedroom valve"], ["Bedroom 2", "Window valve"], ["Bedroom 3", "Back bedroom valve"], ["Bathroom", "Towel rail valve"],
  ["Dining room", "Dining valve"], ["Dining room", "Bay valve"], ["Hall", "Hall valve"], ["Utility", "Utility valve"],
  ["Conservatory", "Conservatory valve"], ["Conservatory", "Door valve (conservatory)"], ["Loft", "Loft valve"], ["Playroom", "Playroom valve"], ["Snug", "Snug valve"],
].map(([area, name], i) => ({ entity_id: `climate.extra_${i}`, name, area })) : [];
const CANDIDATES = {
  valves: [
    { entity_id: "climate.bedroom", name: "Bedroom valve", area: "Bedroom" },
    { entity_id: "climate.ensuite", name: "En-suite valve", area: "Bedroom" },
    { entity_id: "climate.kitchen", name: "Kitchen valve", area: "Kitchen" },
    { entity_id: "climate.lounge_bay", name: "Bay window valve", area: "Lounge" },
    { entity_id: "climate.lounge_door", name: "Door valve", area: "Lounge" },
    { entity_id: "climate.landing", name: "Landing valve", area: "Landing" },
    { entity_id: "climate.study", name: "Study valve", area: "Study" },
    ...MANY,
  ],
  sensors: [
    { entity_id: "sensor.lounge", name: "Lounge temperature", area: "Lounge" },
    { entity_id: "sensor.study", name: "Study temperature", area: "Study" },
  ],
  receivers: RECEIVERS,
};

// hive_local/stats: a plausible week of heating, made up but deterministic.
function fakeStats(entry, channel, days, offset = 0) {
  const water = channel === "water";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000 - offset * days * 86400;
  const start = today - (days - 1) * 86400;
  const end = Math.min(now.getTime() / 1000, today + 86400);
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
    if (t >= end) { series.push({ t, current: null, target: null, heating: null, outdoor: null }); continue; }
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
    // Outside: colder overnight, a few degrees' drift from day to day.
    const h = ((t - today) / 3600 + 240) % 24;
    const outdoor = +(6 + 3 * Math.sin(((h - 9) / 24) * 2 * Math.PI) + 2 * Math.sin((t - today) / 86400 * 1.3)).toFixed(1);
    series.push({ t, current: water ? null : +(tempSum / n).toFixed(1), target: water || !tgN ? null : +(tg / tgN).toFixed(1), heating: +(heat / n).toFixed(3), outdoor });
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
      temp_min: temps.length ? Math.min(...temps.map((b) => b.current)) : null,
      temp_max: temps.length ? Math.max(...temps.map((b) => b.current)) : null,
      outdoor_avg: bs.length ? +(bs.reduce((x, b) => x + b.outdoor, 0) / bs.length).toFixed(1) : null,
      outdoor_min: bs.length ? Math.min(...bs.map((b) => b.outdoor)) : null,
      outdoor_max: bs.length ? Math.max(...bs.map((b) => b.outdoor)) : null,
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
    outdoor: { avg: +(known.reduce((a, b) => a + b.outdoor, 0) / known.length).toFixed(1), min: Math.min(...known.map((b) => b.outdoor)), max: Math.max(...known.map((b) => b.outdoor)) },
    outdoor_entity: "weather.home",
    cost: water ? null : { kw: 9.1, basis: "meter", boiler_kw: 24, price: 0.0634, per_hour: 9.1 * 0.0634, currency: "GBP", source: "energy" },
    previous: { has_data: true, heating_minutes: Math.round(heatingMin * 1.14), known_minutes: knownMin, cycles: 30, outdoor_avg: 3.1 },
    days: dayList, series, offset, period_end: today + 86400,
  };
}

// hive_local/settings/set changes, on top of the sample settings.
const SETTINGS_CHANGES = {};

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
      case "hive_local/rooms/valves":
        return {
          valves: [
            ...ROOMS.flatMap((r) => r.valve_states.map((v) => ({ ...v, area: r.name, room: r.name }))),
            { entity_id: "climate.landing", name: "Landing valve", available: true, current_temperature: 18.4, target: 18, hvac_action: "idle", battery: "83", area: "Landing", room: null },
            { entity_id: "climate.study", name: "Study valve", available: true, current_temperature: 19.0, target: 19, hvac_action: "idle", battery: "40", area: "Study", room: null },
            ...(TWO ? [] : [{ entity_id: "climate.kitchen", name: "Kitchen valve", available: true, current_temperature: 18.9, target: 19, hvac_action: "idle", battery: "52", area: "Kitchen", room: null }]),
            ...MANY.map((m, i) => ({ ...m, available: true, current_temperature: 17 + (i % 5) * 0.6, target: 19, hvac_action: "idle", battery: String(35 + i * 4), room: i % 3 ? "Bedroom" : null })),
          ].map((v) => ({ ...v, identify: true })),
        };
      case "hive_local/rooms/stats":
      case "hive_local/stats":
        return fakeStats(msg.entry_id, msg.channel, msg.days, msg.offset || 0);
      case "hive_local/rooms/suggest":
        return {
          receivers: RECEIVERS,
          rooms: [
            ...(TWO ? [] : [{ name: "Kitchen", valves: ["climate.kitchen"], sensor: null }]),
            { name: "Landing", valves: ["climate.landing"], sensor: null },
            { name: "Study", valves: ["climate.study"], sensor: "sensor.study" },
          ],
        };
      case "hive_local/settings/set": {
        // Remember changes, so the settings can be tried out here.
        const { type, ...change } = msg;
        Object.assign(SETTINGS_CHANGES, change);
        if (SETTINGS_CHANGES.price_source === "fixed") SETTINGS_CHANGES.price = SETTINGS_CHANGES.fixed_price;
        return hass.callWS({ type: "hive_local/settings" });
      }
      // ?tidy=done: the duplicate entities have been tidied up.
      case "hive_local/tidy": {
        const done = params.get("tidy") === "done";
        const row = (entity_id, name) => ({ entity_id, name, done, ours: done });
        return { receiver: [row("climate.receiver", "Receiver")], valves: [row("climate.lounge_bay", "Bay window valve"), row("climate.lounge_door", "Door valve"), row("climate.bedroom", "Bedroom valve")],
          pending: done ? 0 : 4, undoable: done ? 4 : 0 };
      }
      case "hive_local/settings":
        return { ...(await hass.callWS({ type: "hive_local/settings/base" })), ...SETTINGS_CHANGES };
      case "hive_local/settings/base":
        return {
          outdoor_entity: params.has("noout") ? null : "weather.home",
          outdoor_candidates: [
            { entity_id: "weather.home", name: "Forecast Home", area: null },
            { entity_id: "sensor.garden_temperature", name: "Garden temperature", area: "Garden" },
          ],
          gas_meter: "sensor.gas_meter_consumption",
          gas_meter_candidates: [{ entity_id: "sensor.gas_meter_consumption", name: "Gas meter consumption", area: null, energy: true }],
          fit: { kw: 9.1, baseline: 6, days: 13, hours: 98.5 },
          learned_at: "2026-11-24T09:00:00+00:00",
          modulation: 0.4,
          output_kw: 9.1,
          output_basis: "meter",
          boiler_kw: 24,
          price_source: params.get("price") ?? "energy",
          fixed_price: params.get("price") === "fixed" ? 0.0634 : null,
          price_candidates: [{ entity_id: "sensor.gas_tariff_unit_rate", name: "Gas tariff unit rate", area: null, unit: "GBP/kWh" }],
          energy_price: 0.0634,
          price: 0.0634,
          currency: "GBP",
        };
      case "hive_local/get":
        return { schedule: SCHEDULES[msg.channel], complete: true };
      case "hive_local/rooms/schedule/get":
        return {
          // The valves' Off is frost protection (12°); ?oldoff=1: days saved before that, at 5°.
          schedule: Object.fromEntries(Object.entries(SCHEDULES.heat).map(([d, slots]) => [d, slots.map((t) => (t.setpoint <= 1 ? { ...t, setpoint: params.get("oldoff") === "1" ? 5 : 12 } : t))])),
          complete: true,
          differs: ["saturday"],
          limits: { max_transitions: 6, heat_min: 5, heat_max: 32, frost: 12 },
          valves: [
            { entity_id: "climate.lounge_bay", name: "Lounge bay valve", transport: "zha", days: 7, complete: true, error: null, clock: { offset: -3600, ok: false, set: false }, schedule_mode: false },
            { entity_id: "climate.lounge_door", name: "Lounge door valve", transport: "zha", days: 7, complete: true, error: null, clock: { offset: 12, ok: true, set: false }, schedule_mode: false },
          ],
        };
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
// ?open=1 opens the first device card's controls on the Overview.
if (params.get("open") === "1") {
  panel.shadowRoot.querySelector(".device-head")?.click();
  await wait(300);
}
// ?room=Lounge opens a room's pop-up from its Overview card.
const room = params.get("room");
if (room) {
  [...panel.shadowRoot.querySelectorAll(".room-device .device-head")].find((e) => e.textContent.includes(room))?.click();
  await wait(400);
}
// ?roomclick=Lounge presses that room card's Boost button.
const roomClick = params.get("roomclick");
if (roomClick) {
  [...panel.shadowRoot.querySelectorAll(".room-device")].find((e) => e.textContent.includes(roomClick))?.querySelector(".device-action")?.click();
  await new Promise((r) => setTimeout(r, 300));
}

// ?click=… (repeatable): exact button text or aria-label, or a button whose text starts with it.
for (const click of params.getAll("click")) {
  const buttons = [...panel.shadowRoot.querySelectorAll("button")];
  (buttons.find((b) => b.textContent.trim() === click || b.getAttribute("aria-label") === click) ??
    buttons.find((b) => b.textContent.trim().startsWith(click)))?.click();
  await wait(500);
}
// ?type=… types into the room editor's valve search; ?scroll=N scrolls its valve list.
const typed = params.get("type");
if (typed) {
  const input = panel.shadowRoot.querySelector(".valve-search input");
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(input, typed);
  input.dispatchEvent(new Event("input", { bubbles: true }));
  await wait(300);
}
const scroll = params.get("scroll");
if (scroll) {
  panel.shadowRoot.querySelector(".valve-list").scrollTop = Number(scroll);
  await wait(200);
}
document.title = "ready";
