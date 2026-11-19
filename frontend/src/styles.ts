// HA theme variables pierce the shadow root, so the panel follows light/dark themes.
export const styles = /* css */ `
:host {
  --hl-heat: var(--state-climate-heat-color, #ff8100);
  --hl-water: var(--state-water_heater-color, #2196f3);
  --hl-idle: var(--secondary-text-color, #727272);
  --hl-off: var(--disabled-text-color, #9e9e9e);
  --hl-off-fill: color-mix(in srgb, var(--secondary-text-color, #888) 18%, transparent);
  --hl-radius: var(--ha-card-border-radius, 16px);
  --hl-soft: color-mix(in srgb, var(--primary-text-color, #000) 6%, transparent);
  display: block; height: 100%;
  background: var(--primary-background-color);
  color: var(--primary-text-color);
  font-family: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, Roboto, sans-serif));
  -webkit-font-smoothing: antialiased;
}
* { box-sizing: border-box; }
.panel { min-height: 100%; background: var(--primary-background-color); }
.icon-wrap { display: inline-flex; align-items: center; justify-content: center; line-height: 0; --mdc-icon-size: 20px; }
.spacer { flex: 1; }
.muted { color: var(--secondary-text-color); font-size: 14px; }
.small { font-size: 12px; }

/* Header: toolbar + tabs, like HA's own panels */
header { position: sticky; top: 0; z-index: 2; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); border-bottom: var(--app-header-border-bottom, none); }
.toolbar-row { display: flex; align-items: center; gap: 10px; height: 56px; padding: 0 16px; }
.toolbar-row h1 { font-size: 20px; font-weight: 400; margin: 0; }
.toolbar-row .brand { --mdc-icon-size: 24px; opacity: .9; }
.logo-mark { display: block; flex: none; }
.empty-state .logo-mark { opacity: .9; }
.toolbar-row .menu { background: transparent; border: 0; color: inherit; padding: 8px; margin-left: -8px; border-radius: 50%; }
.toolbar-row .menu:hover { background: rgba(255,255,255,.12); }
.tabs { display: flex; gap: 2px; padding: 0 8px; overflow-x: auto; scrollbar-width: none; }
.tabs button { flex: none; display: inline-flex; align-items: center; gap: 8px; border: 0; border-radius: 0; background: transparent; color: inherit; opacity: .72; padding: 12px 14px 10px; border-bottom: 2px solid transparent; font-weight: 500; letter-spacing: .01em; }
.tabs button:hover { opacity: .95; background: rgba(255,255,255,.06); }
.tabs button.on { opacity: 1; border-bottom-color: currentColor; }
.tabs .icon-wrap { --mdc-icon-size: 18px; }

main { max-width: 1040px; margin: 0 auto; padding: 20px 16px 32px; display: flex; flex-direction: column; gap: 16px; }
.stack { display: flex; flex-direction: column; gap: 16px; }

/* Cards */
.card { background: var(--card-background-color); border-radius: var(--hl-radius); box-shadow: var(--ha-card-box-shadow, 0 1px 3px rgba(0,0,0,.08)); border: 1px solid var(--divider-color); padding: 18px; display: flex; flex-direction: column; gap: 14px; }
.card-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.title { display: flex; align-items: center; gap: 12px; }
.title-icon { width: 40px; height: 40px; border-radius: 12px; --mdc-icon-size: 22px; background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 14%, transparent); color: var(--hl-accent, var(--primary-color)); }
.card.heat { --hl-accent: var(--hl-heat); }
.card.water { --hl-accent: var(--hl-water); }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
h3 { font-size: 13px; font-weight: 500; text-transform: uppercase; letter-spacing: .06em; color: var(--secondary-text-color); margin: 6px 0 -4px; }

/* Controls */
button { font: inherit; font-size: 14px; display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 14px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; transition: background .15s, border-color .15s, opacity .15s, transform .1s; }
button:hover:not(:disabled) { background: var(--hl-soft); }
button:active:not(:disabled) { transform: scale(.98); }
button:disabled { opacity: .45; cursor: default; }
button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
button.primary { background: var(--hl-accent, var(--primary-color)); color: var(--text-primary-color, #fff); border-color: transparent; }
button.primary:hover:not(:disabled) { background: var(--hl-accent, var(--primary-color)); filter: brightness(1.08); }
button.ghost { border-color: transparent; background: transparent; color: var(--secondary-text-color); padding-right: 6px; }
button.round { width: 36px; height: 36px; padding: 0; border-radius: 50%; }
button.danger { color: var(--error-color); border-color: transparent; background: transparent; }
select, input[type=time], input[type=text] { font: inherit; font-size: 14px; padding: 8px 10px; border-radius: 10px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }
.toolbar, .actions, .inline-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.inline-row { gap: 12px; }

.segmented { display: inline-flex; padding: 3px; gap: 3px; border-radius: 12px; background: var(--hl-soft); }
.segmented.full { display: flex; }
.segmented.full button { flex: 1; }
.segmented button { border: 0; border-radius: 9px; background: transparent; padding: 7px 12px; color: var(--secondary-text-color); }
.segmented button.on { background: var(--card-background-color); color: var(--primary-text-color); box-shadow: 0 1px 3px rgba(0,0,0,.15); font-weight: 500; }
.segmented .raw { padding: 7px 10px; }

.chip { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 500; padding: 4px 10px; border-radius: 999px; background: var(--hl-soft); color: var(--secondary-text-color); white-space: nowrap; }
.chip .icon-wrap { --mdc-icon-size: 14px; }
.chip.mode-boost { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }
.water .chip.mode-boost { background: color-mix(in srgb, var(--hl-water) 16%, transparent); color: var(--hl-water); }
.chip.unsaved { background: color-mix(in srgb, var(--warning-color, #ffa600) 18%, transparent); color: var(--warning-color, #ffa600); }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip-btn { border-radius: 999px; padding: 6px 14px; }
.chip-btn.on { background: color-mix(in srgb, var(--hl-accent, var(--primary-color)) 16%, transparent); border-color: var(--hl-accent, var(--primary-color)); color: var(--hl-accent, var(--primary-color)); font-weight: 500; }

.status { padding: 10px 14px; border-radius: 10px; font-size: 14px; background: var(--hl-soft); }
.status.ok { background: color-mix(in srgb, var(--success-color, #43a047) 14%, transparent); }
.status.error { background: color-mix(in srgb, var(--error-color, #db4437) 14%, transparent); color: var(--error-color); }
.status.busy { opacity: .8; }

.empty-state { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; padding: 48px 16px; color: var(--secondary-text-color); }
.empty-state .icon-wrap { --mdc-icon-size: 48px; opacity: .5; }

/* Overview */
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; }
.channel { gap: 16px; }
.dial { position: relative; width: 100%; max-width: 240px; margin: 0 auto -28px; aspect-ratio: 1; }
.dial svg { width: 100%; height: 100%; display: block; }
.dial path { fill: none; stroke-width: 12; stroke-linecap: round; }
.dial .track { stroke: var(--hl-soft); }
.dial .value { stroke: var(--hl-heat); transition: d .4s; }
.dial.idle .value { stroke: color-mix(in srgb, var(--hl-heat) 45%, var(--card-background-color)); }
.dial .dot { fill: var(--card-background-color); stroke: var(--primary-text-color); stroke-width: 3; }
.dial-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; }
.dial-temp { font-size: 44px; font-weight: 300; font-variant-numeric: tabular-nums; line-height: 1; }
.dial-temp .unit { font-size: 18px; margin-left: 2px; color: var(--secondary-text-color); vertical-align: top; }
.dial-caption { font-size: 14px; color: var(--secondary-text-color); text-align: center; }
.dial.heating .dial-caption { color: var(--hl-heat); font-weight: 500; }
.water-state { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; min-height: 200px; }
.water-orb { width: 120px; height: 120px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--hl-soft); color: var(--hl-off); --mdc-icon-size: 52px; transition: background .3s, color .3s, box-shadow .3s; }
/* The icon's own wrapper sets 20px, so size it there. */
.water-orb .icon-wrap { --mdc-icon-size: 52px; }
.water-state.idle .water-orb { background: color-mix(in srgb, var(--hl-water) 12%, transparent); color: var(--hl-water); }
.water-state.heating .water-orb { background: var(--hl-water); color: #fff; box-shadow: 0 0 0 10px color-mix(in srgb, var(--hl-water) 15%, transparent); }
.water-state.heating .dial-caption { color: var(--hl-water); font-weight: 500; }
.card-actions { display: flex; align-items: center; gap: 8px; }
.boost-btn { flex: 1; border-color: transparent; background: color-mix(in srgb, var(--hl-accent) 14%, transparent); color: var(--hl-accent); font-weight: 500; }
.boost-btn:hover:not(:disabled) { background: color-mix(in srgb, var(--hl-accent) 22%, transparent); }
.boost-btn.cancel { background: var(--hl-soft); color: var(--primary-text-color); }

/* Boost & mode */
.mode-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.mode-tile { flex-direction: column; align-items: flex-start; gap: 4px; padding: 14px; border-radius: 14px; text-align: left; height: 100%; }
.mode-tile .icon-wrap { --mdc-icon-size: 22px; color: var(--secondary-text-color); margin-bottom: 4px; }
.mode-tile .mode-label { font-weight: 500; }
.mode-tile.on { border-color: var(--hl-accent); background: color-mix(in srgb, var(--hl-accent) 10%, transparent); }
.mode-tile.on .icon-wrap { color: var(--hl-accent); }
.boost-live { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; padding: 14px; border-radius: 14px; background: color-mix(in srgb, var(--hl-accent) 10%, transparent); }
.boost-icon { width: 44px; height: 44px; border-radius: 50%; background: var(--hl-accent); color: #fff; --mdc-icon-size: 22px; }
.boost-title { font-weight: 500; }
.stepper { display: inline-flex; align-items: center; gap: 4px; padding: 2px; border-radius: 999px; background: var(--hl-soft); }
.stepper button.round { border-color: transparent; background: transparent; width: 32px; height: 32px; }
.stepper button.round:hover { background: var(--card-background-color); }
.stepper-value { min-width: 56px; text-align: center; font-variant-numeric: tabular-nums; font-weight: 500; }

/* Schedule */
.week { display: flex; flex-direction: column; gap: 4px; }
.row { display: grid; grid-template-columns: 44px 1fr; align-items: center; gap: 10px; padding: 4px 6px; border: 1px solid transparent; border-radius: 10px; background: transparent; text-align: left; }
.row.selected { border-color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 6%, transparent); }
.hours-row, .hours-row:hover { cursor: default; background: transparent !important; padding-top: 0; }
.day { font-size: 13px; color: var(--secondary-text-color); font-weight: 500; }
.day.today { color: var(--primary-color); }
.timeline { position: relative; height: 30px; border-radius: 8px; overflow: hidden; background: var(--hl-off-fill);
  background-image: repeating-linear-gradient(to right, transparent 0 calc(12.5% - 1px), color-mix(in srgb, var(--divider-color) 70%, transparent) calc(12.5% - 1px) 12.5%); }
.timeline span { position: absolute; top: 0; bottom: 0; color: #fff; font-size: 11px; font-weight: 500; display: flex; align-items: center; padding-left: 6px; border-right: 2px solid var(--card-background-color); white-space: nowrap; overflow: hidden; text-shadow: 0 1px 2px rgba(0,0,0,.25); }
.timeline span.off { background: transparent; border-right-color: transparent; }
.timeline .now { position: absolute; top: -2px; bottom: -2px; width: 2px; margin-left: -1px; background: var(--primary-text-color); box-shadow: 0 0 0 1px var(--card-background-color); z-index: 1; }
.hours { position: relative; height: 14px; font-size: 11px; color: var(--secondary-text-color); }
.hours span { position: absolute; transform: translateX(-50%); }
.hours span:first-child { transform: none; }
.hours span:last-child { transform: translateX(-100%); }
.legend { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.legend-bar { width: 120px; height: 8px; border-radius: 4px; background: linear-gradient(to right, hsl(42 88% 64%), hsl(8 92% 50%)); }
.legend-off { width: 16px; height: 8px; border-radius: 4px; background: var(--hl-off-fill); margin-left: 12px; }
.events { display: flex; flex-direction: column; }
.transition { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-bottom: 1px solid var(--divider-color); }
.transition:last-child { border-bottom: 0; }
.transition .danger { margin-left: auto; }
.swatch { width: 10px; height: 32px; border-radius: 5px; flex: none; }

/* Rooms */
.receiver-section { display: flex; flex-direction: column; gap: 12px; }
.receiver-crumb { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.receiver-crumb h2 { margin: 0; }
.receiver-crumb button { padding-left: 4px; }
.receiver-card { flex-direction: row; align-items: center; gap: 14px; text-align: left; font: inherit; color: inherit; cursor: pointer; }
.receiver-card.heat { --hl-accent: var(--hl-heat); }
.receiver-card.water { --hl-accent: var(--hl-water); }
.receiver-card:hover { border-color: var(--hl-accent); }
.receiver-text { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
.receiver-name { font-size: 17px; font-weight: 500; }
.dot-heating { width: 10px; height: 10px; border-radius: 50%; background: var(--hl-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--hl-accent) 20%, transparent); flex: none; }
.zone { display: flex; flex-direction: column; gap: 10px; }
.zone h3 { margin: 4px 0 0; }
.rooms-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.rooms-head p { margin: 0; max-width: 65ch; }
.room.heating { --hl-accent: var(--hl-heat); }
.chip.heating { background: color-mix(in srgb, var(--hl-heat) 16%, transparent); color: var(--hl-heat); }
.room-now { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.room-temp { font-size: 44px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
.room-temp .unit { font-size: 18px; margin-left: 2px; color: var(--secondary-text-color); vertical-align: top; }
.room-target { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
.valves { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.valve { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-top: 1px solid var(--divider-color); font-size: 14px; }
.valve.off { opacity: .6; }
.valve-icon { color: var(--secondary-text-color); --mdc-icon-size: 18px; }
.valve-icon.heating { color: var(--hl-heat); }
.valve-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.valve-temps { font-variant-numeric: tabular-nums; white-space: nowrap; }
.battery { display: inline-flex; align-items: center; gap: 3px; font-size: 12px; color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
.battery .icon-wrap { --mdc-icon-size: 16px; }
.battery.low { color: var(--warning-color, #ffa600); font-weight: 500; }
.room-editor h2 { margin: 0; }
.field { display: flex; flex-direction: column; gap: 6px; border: 0; padding: 0; margin: 0; min-width: 0; }
.field > span, .field legend { font-size: 13px; font-weight: 500; color: var(--secondary-text-color); padding: 0; margin-bottom: 6px; }
.field input[type=text], .field select { width: 100%; max-width: 420px; }
.checklist { display: flex; flex-wrap: wrap; align-items: center; gap: 6px 16px; padding: 6px 0; }
.checklist > .muted { width: 100%; }
.pick { display: inline-flex; align-items: center; gap: 6px; font-size: 14px; cursor: pointer; }

@media (max-width: 600px) {
  main { padding: 12px 8px 24px; gap: 12px; }
  .card { padding: 14px; }
  .grid { grid-template-columns: 1fr; }
  .mode-grid { grid-template-columns: 1fr; }
  .mode-tile { flex-direction: row; align-items: center; gap: 10px; }
  .mode-tile .icon-wrap { margin: 0; }
  .mode-tile .small { margin-left: auto; text-align: right; }
  /* Labels always visible on phones; drop the icons to make room. */
  .tabs { padding: 0 4px; }
  .tabs { gap: 0; }
  .tabs button { padding: 12px 7px 10px; font-size: 12.5px; letter-spacing: 0; }
  .tabs .icon-wrap { display: none; }
}
`;
