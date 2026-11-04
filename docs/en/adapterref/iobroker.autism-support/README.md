# ioBroker.autism-support

Support for people with autism in ioBroker: **Visual Countdown**, **daily schedule with time bar**, and pictograms.

Pictogram source and terms: [ARASAAC](https://arasaac.org). Display is intended for tablet, wall display or similar via **VIS-2**.

## Visual Countdown

Visual countdown as a geometry frame (default: square) with circular progress wipe from the center.

### States (`autism-support.0.timer.*`)

| State | Description |
|-------|-------------|
| `duration` | Total duration in seconds |
| `remaining` | Remaining seconds |
| `elapsed` | Elapsed seconds |
| `running` / `paused` / `finished` | Status |
| `start` / `pause` / `resume` / `stop` | Commands (write `true`) |
| `setDurationHours` / `setDurationMinutes` | Set duration |

### VIS-2 widgets

| Widget | Purpose |
|--------|---------|
| **Visual Countdown (Live)** | Large display for the user |
| **Visual Countdown (Config)** | Control for parents/caregivers |

## Daily schedule with time bar

Flexible list of pictograms with individual time spans. A **colored day-period bar** on the right adapts to **count and duration of pictograms** (time window from first to last entry), plus a **now** marker.

### Admin: day periods

In the admin tab **Day periods** you can configure start/end (HH:MM) and color per period. Night may wrap past midnight (e.g. 21:00–06:00). In the **Daily Schedule (Config)** widget, periods can additionally be enabled or disabled.

### Weekly plan

The **Daily / Weekly Schedule (Config)** widget edits a full week (Mo–Su tabs), can copy a day to other weekdays, and save/load named weekly templates. Admin tab **Weekly plan** sets weekday background colors and lists saved templates (rename/delete; **●** = currently loaded/active). Enable **Load daily plan from weekly plan each day** so `schedule.plan` is filled from today’s weekday slot automatically.

### States (`autism-support.0.schedule.*`)

| State | Description |
|-------|-------------|
| `plan` | JSON daily plan with entries (label, start/end, pictogram source) |
| `weeklyPlan` | Active weekly plan (JSON, Mon–Sun daily plans) |
| `weeklyPlansLibrary` | Saved weekly templates + `activeId` of the loaded plan |
| `loadDailyFromWeekly` | Copy today’s weekly slot into `plan` each day |
| `weekdayColors` | Weekday colors from admin (JSON, read-only) |
| `periods` | Day periods from admin config (JSON, read-only) |
| `periodOverrides` | On/off overrides from config widget (JSON, writable) |
| `clearAfterLast` | Clear plan after last pictogram ends (boolean) |
| `nowMinutes` | Current minutes since midnight (local) |
| `currentPeriod` | ID of current day period |
| `currentItemIndex` | Index of active plan entry (`-1` = none) |

### VIS-2 widgets

| Widget | Purpose |
|--------|---------|
| **Daily Schedule (Live)** | Today’s pictograms + time bar |
| **Weekly Schedule (Live)** | Week overview with Admin weekday colors |
| **Daily / Weekly Schedule (Config)** | Weekday tabs, copy days, save/load templates, daily sync, ARASAAC/custom pictograms |

### Pictogram sources

1. **ARASAAC (external)** – only pictogram ID is stored; image is loaded at runtime from `static.arasaac.org`. No ARASAAC files in the adapter package.
2. **Custom uploads** – via the adapter instance settings in Admin (Pictograms tab). vis-2 widgets cannot upload files reliably.

Custom images are stored in the **vis-2** file store at `vis-2.0/Autism Support/pictograms/` (URL `/vis-2.0/Autism Support/pictograms/...`). The `pictograms` folder is created automatically on adapter start. Upload images via Admin → **Files** (or the link in instance settings).

## Development

Requirements: Node.js ≥ 22, ioBroker with `vis-2`.

```bash
npm install
cd src-widgets-ts && npm install && cd ..
npm run build
npm run dev-server setup
npm run dev-server watch
```

Widget development (parallel):

```bash
cd src-widgets-ts
npm run start
```

## Changelog

See CHANGELOG_OLD.md for older entries.

### 0.2.14

* Fix red instance after 0.2.13 update: migrate pictograms from old German vis-2 folder to 'Autism Support', robust startup without vis-2

### 0.2.13

* Latest-repo review fixes: English vis-2 folder names, widget i18n translations, ARASAAC fetch timeout, modern nogit build setup

### 0.2.12

* Remove leftover Admin sidebar tab that could not be opened

### 0.2.11

* Latest repository review fixes: English package description, translations, remove unused custom config, responsive admin tabs

### 0.2.10
- Repo-check compliance: remove unpublished versions from `common.news`, update README changelog

### 0.2.8
- Fix startup crash/restart loop: no `system.adapter` native write on boot; cancel in-flight ready on unload

### 0.2.7
- Fix restart loop (native config diff) and CI lint formatting

### 0.2.5
- Fix `system.adapter` config path (`extendForeignObject`); trim news for E1032

### 0.2.2
- Fix object structure for latest-repo review: `timer` channel, `value.interval` roles, button `read: false`

### 0.2.1
- Weekly plans: weekday tabs in Config, copy to other days, named templates (save/load)
- Admin: weekday colors + list of saved plans with active/loaded marker
- New Live widget: week overview; optional daily sync from weekly plan

### 0.1.27
- ioBroker compliance: max 7 news entries, jsonConfig schema, admin i18n keys, English title/desc

## Author

Matthias Ulrich ([@MatthiasUlrich1](https://github.com/MatthiasUlrich1))

## License

Copyright (c) 2026 Matthias Ulrich <MatthiasUlrich1@gmail.com>

### This adapter

**MIT** – see [LICENSE](https://github.com/MatthiasUlrich1/ioBroker.autism-support/blob/main/LICENSE).

### ARASAAC pictograms (external content)

This adapter **does not contain or redistribute** ARASAAC image files.

- **Source:** [ARASAAC](https://arasaac.org) / [API](https://api.arasaac.org) / CDN `https://static.arasaac.org`
- **License:** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Author:** Sergio Palao · **Owner:** Government of Aragon

Recommended attribution:

> The pictographic symbols used are the property of the Government of Aragon and have been created by Sergio Palao for ARASAAC (https://arasaac.org), which distributes them under a Creative Commons license (BY-NC-SA).

Live/config widgets show this attribution when the plan contains ARASAAC entries.

Official terms: [ARASAAC Terms of Use](https://aulaabierta.arasaac.org/en/terms-of-use)

### Custom / uploaded pictograms

You are responsible for having the required rights for uploads. Upload and tagging happen in the Admin instance settings. The adapter stores files locally in the instance only; they are not shipped in the npm/GitHub package.