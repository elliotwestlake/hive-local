// HA theme variables pierce the shadow root, so the panel follows light/dark themes.
export const styles = /* css */ `
:host { display: block; height: 100%; background: var(--primary-background-color); color: var(--primary-text-color); font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif); }
.panel { min-height: 100%; }
header { display: flex; align-items: center; gap: 8px; height: 56px; padding: 0 16px; background: var(--app-header-background-color, var(--primary-color)); color: var(--app-header-text-color, #fff); }
header h1 { font-size: 20px; font-weight: 400; margin: 0; }
main { max-width: 900px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
.card { background: var(--card-background-color); border-radius: var(--ha-card-border-radius, 12px); box-shadow: var(--ha-card-box-shadow, none); border: 1px solid var(--divider-color); padding: 16px; }
.card-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 8px; }
h2 { font-size: 18px; font-weight: 500; margin: 0; }
.muted { color: var(--secondary-text-color); font-size: 14px; }
.toolbar, .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.actions { margin-top: 12px; }
.spacer { flex: 1; }
button { font: inherit; font-size: 14px; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); cursor: pointer; }
button:disabled { opacity: .45; cursor: default; }
button.primary { background: var(--primary-color); color: var(--text-primary-color, #fff); border-color: transparent; }
button.icon { padding: 4px 10px; background: transparent; border-color: transparent; color: inherit; font-size: 18px; }
button.danger { color: var(--error-color); font-size: 14px; }
select, input[type=time] { font: inherit; padding: 6px 8px; border-radius: 8px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); color-scheme: light dark; }
.segmented { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; }
.segmented button { border: 0; border-radius: 0; }
.segmented .raw { padding: 6px 10px; }
.segmented button.on { background: var(--primary-color); color: var(--text-primary-color, #fff); }
.status { padding: 10px 14px; border-radius: 8px; font-size: 14px; border: 1px solid var(--divider-color); }
.status.ok { border-color: var(--success-color, #43a047); }
.status.error { border-color: var(--error-color); color: var(--error-color); }
.status.busy { opacity: .8; }
.week { display: flex; flex-direction: column; gap: 6px; position: relative; padding-bottom: 18px; }
.row { display: flex; align-items: center; gap: 12px; padding: 4px 6px; border: 1px solid transparent; background: transparent; text-align: left; }
.row.selected { border-color: var(--primary-color); }
.day { width: 36px; font-size: 13px; color: var(--secondary-text-color); }
.timeline { position: relative; flex: 1; height: 28px; border-radius: 6px; background: var(--secondary-background-color, rgba(127,127,127,.1)); overflow: hidden; }
.timeline span { position: absolute; top: 0; bottom: 0; background: var(--state-climate-heat-color, #ff8100); color: #fff; font-size: 11px; display: flex; align-items: center; padding-left: 4px; border-right: 1px solid var(--card-background-color); box-sizing: border-box; white-space: nowrap; overflow: hidden; }
.hours { position: absolute; left: 60px; right: 6px; bottom: 0; height: 14px; font-size: 11px; color: var(--secondary-text-color); }
.hours span { position: absolute; transform: translateX(-50%); }
.transition { display: flex; align-items: center; gap: 12px; padding: 6px 0; border-bottom: 1px solid var(--divider-color); }
.setpoint { display: flex; align-items: center; gap: 4px; min-width: 120px; }
.setpoint span { min-width: 48px; text-align: center; font-variant-numeric: tabular-nums; }
.transition .danger { margin-left: auto; }
.tabs { display: flex; gap: 4px; padding: 0 16px; overflow-x: auto; background: var(--app-header-background-color, var(--primary-color)); }
.tabs button { flex: none; border: 0; border-radius: 0; background: transparent; color: var(--app-header-text-color, #fff); opacity: .75; padding: 10px 14px; border-bottom: 2px solid transparent; }
.tabs button.on { opacity: 1; border-bottom-color: var(--app-header-text-color, #fff); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.tile { text-align: left; display: flex; flex-direction: column; gap: 8px; font: inherit; color: inherit; }
.big { font-size: 40px; font-weight: 300; font-variant-numeric: tabular-nums; }
.facts { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 14px; }
.pill { font-size: 12px; padding: 2px 8px; border-radius: 999px; border: 1px solid var(--divider-color); }
.pill.boost { border-color: var(--state-climate-heat-color, #ff8100); color: var(--state-climate-heat-color, #ff8100); }
.pill.off { opacity: .6; }
.on-text { color: var(--state-climate-heat-color, #ff8100); }
.control-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--divider-color); }
.control-row:last-of-type { border-bottom: 0; }
.control-row .label { width: 56px; font-size: 14px; color: var(--secondary-text-color); }
.card > .status { margin-top: 12px; }
`;
