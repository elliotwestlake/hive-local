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

const hass = {
  async callWS(msg) {
    switch (msg.type) {
      case "hive_local/devices":
        return {
          devices: [{ entry_id: "e1", name: "Hive Receiver", model: "SLR2b", channels: ["heat", "water"] }],
          limits: { max_transitions: 6, heat_min: 1, heat_max: 32, boost_min_temp: 5, boost_max_minutes: 360, water_on: 22, water_off: 1 },
        };
      case "hive_local/get":
        return { schedule: SCHEDULES[msg.channel], complete: true };
      default:
        return { ok: true };
    }
  },
  connection: {
    subscribeMessage(cb) {
      setTimeout(() => cb({ status: STATUS }), 0);
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
document.title = "ready";
