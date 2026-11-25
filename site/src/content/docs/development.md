---
title: Development
description: Run the tests, build the panel and this site, and how releases work.
section: Help
order: 2
---

Hive Local is open source, at [github.com/elliotwestlake/hive-local](https://github.com/elliotwestlake/hive-local). Issues and pull requests are welcome.

## Layout

- `custom_components/hive_local/`: the integration. Pure helpers with no Home Assistant imports (`schedule.py`, `z2m.py`, `zcl.py`, `stats.py`, `preheat.py`, `holiday.py` and others) hold the logic, so it's easy to test.
- `frontend/`: the Hive panel, in React. `hive-local-panel.js` is built from it and committed.
- `site/`: this site, built with Astro.
- `tests/`: pure tests, and end-to-end tests in `tests/e2e/`.

## Tests

The pure tests need only pytest:

```sh
pytest -q tests
```

The end-to-end tests run Home Assistant itself with Hive Local loaded (mocked MQTT for Zigbee2MQTT, and a fake Zigbee radio behind a real zigpy device for ZHA). They need Python 3.14 and the pinned requirements:

```sh
pip install -r requirements_test.txt
pytest -q tests
```

## The panel

```sh
cd frontend
npm install
npm run build
```

Commit the rebuilt `hive-local-panel.js`. CI rebuilds it and fails if the committed bundle differs.

## Screenshots

Screenshots are the real built panel with sample data, rendered by the harness in `docs/screenshots/harness/` (`shoot.sh`). The README and this site both use them.

## This site

```sh
cd site
npm install
npm run dev
```

Docs pages are Markdown in `site/src/content/docs/`. Search is built by Pagefind after `npm run build`, so try it with `npm run preview`. Merges to main deploy the site to Cloudflare Pages.

## Commits and releases

Commit messages are lower-case [conventional commits](https://www.conventionalcommits.org/), like `fix(schedule): pad every day to six transitions`. Pull requests are squash-merged, so the PR title is checked the same way.

Releases are made by release-please: it keeps a release PR open with the version bump and changelog, and merging it publishes the release, which the Marketplace offers as an update.
