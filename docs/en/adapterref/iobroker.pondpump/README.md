---
chapters: {"pages":{"en/adapterref/iobroker.pondpump/README.md":{"title":{"en":"ioBroker.pondpump"},"content":"en/adapterref/iobroker.pondpump/README.md"},"en/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md":{"title":{"en":"Wassertemperaturen im Koiteich"},"content":"en/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md"},"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md":{"title":{"en":"ioBroker.pondpump — User Manual"},"content":"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md"}}}
---
![Logo](admin/pondpump.png)
# ioBroker.pondpump

[![NPM version](https://img.shields.io/npm/v/iobroker.pondpump.svg)](https://www.npmjs.com/package/iobroker.pondpump)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pondpump.svg)](https://www.npmjs.com/package/iobroker.pondpump)
![Number of Installations](https://iobroker.live/badges/pondpump-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/pondpump-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.pondpump.png?downloads=true)](https://nodei.co/npm/iobroker.pondpump/)

**Tests:** ![Test and Release](https://github.com/ssbingo/ioBroker.pondpump/workflows/Test%20and%20Release/badge.svg)

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

## pondpump adapter for ioBroker

Control and monitor **OASE AquaMax Eco Titanium** pond pumps via the **OASE Garden Controller Cloud (EGC)** — locally and via cloud.

Manufacturer product pages:

- [OASE AquaMax Eco Titanium](https://www.oase.com/) (pond pump, item 73656)
- [OASE Garden Controller Cloud](https://www.oase.com/) (EGC gateway, item 55317)

### Disclaimer

This is an **unofficial community project**. It is **not affiliated with, endorsed by, or supported by OASE GmbH** in any way.
"OASE", "AquaMax" and related product names are trademarks of OASE GmbH and are used here solely to describe device compatibility.
The communication protocol was analyzed independently — use this adapter at your own risk.

Credits: [mr-suw/ioBroker.oasecontrol](https://github.com/mr-suw/ioBroker.oasecontrol) (adapter for the EGC socket
controllers, FM-Master EGC) served as a valuable protocol reference. No code was copied; this adapter targets the
smart pond pumps and was written from scratch.

### Supported hardware

| Device | Item no. | Role |
| --- | --- | --- |
| OASE Garden Controller Cloud (EGC) | 55317 | Gateway (`GatewayCloud`) |
| OASE AquaMax Eco Titanium | 73656 | Pond pump (`GardenPump`) |

### Project status

- **Phase 1 — cloud read-only** ✓ polls the OASE cloud inventory; gateway plus both pumps with live status
- **Phase 2 — cloud control** ✓ pump on/off and speed are writable via the cloud tunnel
- **Phase 4 — live telemetry** ✓ power, motor speed, temperature and mains voltage read live each poll
- **Phase 3 — local (LAN) transport** ✓ connection mode `local` runs the whole adapter over the local network
  without the cloud: inventory, live telemetry and on/off + speed control, all over the LAN

**Cloud authentication:** the OASE cloud uses **Azure AD B2C** (`account.oase.com`). The adapter authenticates with the
headless-friendly **refresh-token grant**: capture a refresh token once from an OASE app login and paste it into the
adapter settings (encrypted). The adapter exchanges it for short-lived access tokens and transparently rotates the
refresh token. **Your account password is never entered into or stored by the adapter.** Without a refresh token the
adapter starts but reports `info.connection = false` with a clear warning.

### Configuration

All settings are available in the Admin UI (JSON config):

| Setting | Description |
| --- | --- |
| Connection mode | `cloud` or `local` (mutually exclusive) |
| Poll interval | Polling interval in seconds (default 30) |
| Cloud user / password | OASE cloud account credentials (password stored encrypted) |
| Controller IP | IP address of the EGC gateway (local mode) |
| Device password | Device password for local authentication (stored encrypted) |
| Bind address / port | Local TLS server the controller connects back to |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.4 (2026-09-11)

- (ssbingo) **Actuator value fields are now a dropdown (bugfix).** The **on-value** and **off-value** of an actuator schedule window — and the value of the **"Set actuator"** weather rule — are no longer a free-text field. That field re-parsed on every keystroke and fell back to `true` for any partial input, so **typing `false` snapped back to `true`**. They are now a clear **dropdown**: `true` / `false` / `number` (with an inline number field), and the off-value additionally offers **"leave untouched"**. The handbook (10.2) now also clarifies that the `on` field in the `schedule.actuators` status datapoint is the **live window status**, not the on/off value

### 0.12.3 (2026-09-10)

- (ssbingo) **Koi-biology water-temperature colour scale.** The thermometer (PumpVisual) and the temperature readout (PumpScheduler) are no longer a neutral cold→warm gradient. They now follow the koi temperature bands from the research: strong **green at the growth optimum 23–26 °C**, teal/blue when colder, amber/red when hotter — and the cold **8–13 °C "Aeromonas window"** is deliberately **amber (caution)**, because pathogens are active there while the koi immune system is not. Both extremes go red
- (ssbingo) **Per-actuator wheel colours.** The Scheduler widget's "Actuators" settings now offer an **on** and **off** colour picker **for each actuator individually** (stored per actuator), replacing the single global pair
- (ssbingo) **Research + handbook appendices.** Added the full koi-temperature research as [doc/research/wassertemperaturen-im-koiteich.md](/#/docs/adapterref/iobroker.pondpump/doc/research/wassertemperaturen-im-koiteich.md); the German handbook now carries both research papers as **Anhang 1 & Anhang 2** (appended at build time — single source of truth in `doc/research/`)

### 0.12.2 (2026-09-10)

- (ssbingo) **Configurable actuator wheel colours.** The Scheduler widget's actuator status impeller now has two colour pickers in the widget settings — one for the **on** state and one for **off** — each with its darker gradient shade derived automatically. Defaults reproduce the previous look (light green on, muted green-grey off)

### 0.12.1 (2026-09-10)

- (ssbingo) **Per-actuator visibility in the Scheduler widget.** A new **"Actuators"** section in the widget settings lists the selected pump's actuators (read from its schedule) with a checkbox each, so you can **show or hide every actuator individually** in that widget. Hidden actuators are stored per widget (`hiddenActuators`); all are shown by default

### 0.12.0 (2026-09-10)

- (ssbingo) **Named actuators with icons.** An **"Actuator"** schedule window can now be given a **name** (default "Actuator N") and a **selectable icon** (waterfall, stream/creek, aerator/oxygen pump, air, spray, UV, light, feeder, plant filter, heater, chiller, …) in the per-pump scheduler editor. The **Scheduler status** widget now lists every actuator **above the telemetry**, one row each in the order **icon — name — status wheel**: a small **light-green impeller** that **spins while the actuator is on** and stands still (dimmed) while off. Backed by a new read-only `pumps.<n>.schedule.actuators` JSON state (`[{name, icon, target, on}]`) the scheduler keeps up to date; the pure core gained `describeActuators()` (unit-tested). Fixed a latent SVG gradient-id collision so multiple impellers on one card keep their own colour

### 0.11.1 (2026-09-10)

- (ssbingo) **Widget refinements (feedback).** PumpVisual's water thermometer is now **smaller and more modern** (a slim, colour-coded design instead of the oversized one). The **Scheduler status** widget now always shows the **water temperature** next to power/speed and a **small, optionally-animated impeller** in the hero, and — importantly — reads its live values **robustly**: it fetches each state's current value first and subscribes per state, so a pump whose newer `schedule.*` states don't exist yet (older backend) no longer leaves the whole widget blank. Shared the impeller/thermometer graphics between both widgets (`graphics.tsx`)

### 0.11.0 (2026-09-10)

- (ssbingo) **New "Scheduler status" vis-2 widget (`PumpScheduler`).** Select a pump and the widget shows, at a glance, what the built-in scheduler is doing with it: the current output and **target power**, a status badge (active / manual / fail-safe), **reason chips** (temperature curve, time window, base power, night protection, weather boost, frost hold, fail-safe), the **active window**, the **next change** time and the pump's **sunrise/sunset** and **water temperature** — plus live power/rpm and a control bar with on/off, quick power and SFC. Fed by new read-only `pumps.<n>.schedule.*` status states the scheduler publishes each tick (`controlled`, `targetPower`, `sfc`, `source`, `raised`, `nightProtection`, `hold`, `failSafe`, `window`, `nextChangeTs`)
- (ssbingo) **PumpVisual now shows the water temperature.** When `telemetry.waterTemperature` has a value, the animated impeller shifts left and a **filled, colour-coded thermometer** (cold blue → warm amber) with the reading appears on the right; without a value the widget is unchanged
- (ssbingo) The pure decision core now also reports its base **source** and the **raised / nightProtected / hold** flags (covered by unit tests), used both by the status states and the widget

### 0.10.1 (2026-09-10)

- (ssbingo) **Fix: `telemetry.waterTemperature` reflects the effective curve source.** When the temperature curve reads an **external** object (e.g. a Homematic water sensor picked via the magnifying glass), that value is now mirrored into `telemetry.waterTemperature` — previously the state stayed empty because only the pump's on-device sensor was mirrored. The scheduler now writes the state from the actual curve source (external OIDs included); the on-device sensor picker remains the fallback when no curve source is configured. A debug line is logged when the source has no finite value

### 0.10.0 (2026-09-10)

- (ssbingo) **Most detailed scheduler debug logging.** With the instance log level on `debug`, every scheduler evaluation now logs the **complete decision chain per pump** — the inputs (raw/smoothed/mapped water temperature, all source states, sunrise/sunset, day/night), each decision step (base from curve/window, the Q_min floor, night protection, every matching weather rule, the actuator windows and the Q_max ceiling) down to the final power/SFC, plus the ramp/hold state and the next re-evaluation time. Location resolution and address geocoding are logged as well. Secrets (passwords/tokens) are never logged. The pure decision core gained an optional decision-trace output for this (covered by unit tests)

### 0.9.1 (2026-09-10)

- (ssbingo) UI robustness: the location map now shows a **clear hint when its map tiles fail to load** (e.g. the admin CSP blocking the external tile host) — the location stays fully settable by clicking/dragging the marker or via the coordinate fields and address search

### 0.9.0 (2026-09-09)

- (ssbingo) **Phase 13 — actuator schedule windows.** A window's mode can now be **"Actuator"**: it drives an external state (waterfall, UVC, aerator, …) to an **on-value** while active and an **off-value** while outside (blank off-value → left untouched). Combine it with the **astro** (sunrise/sunset) bounds for e.g. a waterfall from 09:00 to sunset. Actuator windows may overlap and don't affect the pump's power/SFC. This completes the four astro building blocks (astro windows, night protection, PV-boost via the raise-only weather rules, and now actuator windows)

### 0.8.0 (2026-09-09)

- (ssbingo) **Phase 13 — night protection.** New per-pump option: during the **astronomical night**, if the curve's water temperature is at/above a threshold, the flow is **not reduced below a floor** (default 100 %). Implements the research finding that the oxygen minimum is at night, so a warm-night flow reduction is harmful. Needs a location (for sunrise/sunset); with no curve source it protects unconditionally. Applied before the weather rules and still capped by `maxPower`

### 0.7.1 (2026-09-09)

- (ssbingo) UI: the **location map** is now capped at **50 % of the panel width** (with a sensible minimum) instead of spanning the full width

### 0.7.0 (2026-09-09)

- (ssbingo) **Phase 13 — astronomical schedule windows + location.** A schedule window's start and end can now be a fixed clock time **or** **sunrise/sunset ± an offset** in minutes; a `sunset → sunrise` night window correctly wraps past midnight. New per-pump **astro states** (`astro.sunrise/sunset/sunriseTs/sunsetTs/isDay`), recomputed daily
- (ssbingo) **Location is configurable** (`suncalc`): use the **ioBroker system location** (default), **one shared location**, or **one per pump** — set it on an **interactive map** (Leaflet/OpenStreetMap, click or drag the marker), by **address search** (geocoded in the backend), or by latitude/longitude. Backend `messagebox` enabled for the geocoder
- (ssbingo) Based on the extended research (`doc/research/…`, now with chapter 7): a **summer night-time flow reduction is counter-productive** (the oxygen minimum is at night) — astro fits best as a protection window and for side actuators. Handbook chapter 10.4 (DE + EN) added; PDFs regenerated

### 0.6.0 (2026-09-09)

- (ssbingo) **Maximum power % per pump.** A new hard ceiling in the scheduler's fine-tuning: the applied power never exceeds it — it is capped **last**, so it also limits the temperature curve, weather-rule raises/`boostMax` and the missing-source fail-safe. For pumps that only run up to e.g. 90 %

### 0.5.1 (2026-09-09)

- (ssbingo) Fix: the new **water temperature sensor** dropdown rendered as an empty, flat field (empty value, no visible control) — rebuilt as a proper labelled `Select` (with `displayEmpty`/notched label) so the field, its value and the dropdown show correctly
- (ssbingo) Fix: on startup the scheduler evaluated the temperature curve **before** subscribing to its source states, so the curve briefly hit the missing-source **fail-safe (100 %)** even though the water sensor had a value — it now subscribes to the sources first, then evaluates

### 0.5.0 (2026-09-09)

- (ssbingo) **Water-temperature sensor picker + clearer scheduler UI.** Each pump's temperature/weather section gains a **"Water temperature sensor"** dropdown: it lists the pump's own device temperature sensors **with their live value**, so you pick which one actually reads the water. The choice feeds a new read-only state **`telemetry.waterTemperature`** and **pre-fills the curve source** (external sensors are still selectable via the object picker)
- (ssbingo) **Every scheduler field is now self-explanatory** — full labels, a **suggested value** (placeholder) and a **help text** on each: minimum power (Q_min), temperature smoothing, hysteresis, max change per hour, the curve-vs-windows priority and the curve source
- (ssbingo) Handbook chapter 11 (DE + EN) updated for the sensor picker and the fine-tuning suggestions; PDFs regenerated

### 0.4.0 (2026-09-09)

- (ssbingo) **Phase 12 — water-temperature control model.** Reworked the temperature/weather scheduler around the pond-flow research (`doc/research/teichpumpe-durchfluss-temperatur-wetter.md`): the **water-temperature curve** now sets the base flow — with a **default Q10 curve** preset — and **weather rules only ever raise** it. New effect set: **Raise to power %**, **Boost to 100 %**, **Hold (frost)**, **SFC on/off**, and a generic **Set actuator** effect that writes any external state (aeration, waterfall, …). New per-pump limits: **minimum power (Q_min)**, temperature **smoothing** (EMA, hours), **hysteresis (K)** and a **max ramp (% per hour)**. If the temperature source is lost the pump **fails safe to 100 %**, and a warning fires when the curve regulates power while the pump's **native SFC** is on
- (ssbingo) The curve/rule **source is no longer defaulted to the pump's telemetry** — that value is the pump's *device* temperature, not the water. Pick a real water sensor via the new **object picker**
- (ssbingo) ⚠️ The weather-rule model changed: rules configured under 0.3.0 (effects *Power %/SFC/Off*) become inert — reconfigure them with the new effects

### 0.3.0 (2026-09-09)

- (ssbingo) **Phase 11 — temperature-/weather-dependent scheduler parameters.** Each pump's scheduler tab gains a **Conditions** section: a **temperature→power curve** (interpolation points; the source defaults to the pump's own water temperature) plus **threshold rules** — any state OID (the pump's temperature or an external weather adapter) compared to a threshold, applying a **power %**, **SFC on/off** or **Off**. A per-pump toggle decides whether conditions **override** the active time window or apply **only outside** the windows. The backend subscribes to the source states and re-evaluates the moment they change

### 0.2.2 (2026-09-09)

- (ssbingo) Set the minimum ioBroker **admin to 8.0.11** — the per-pump scheduler is a React 19 / MUI 9 (admin 8) component, so admin 8.0.11+ keeps it loading reliably
- (ssbingo) Maintenance: processed the open Dependabot updates — `@iobroker/gui-components` 10.2.3, `@iobroker/json-config` 9.1.2, `@mui/material` + `@mui/icons-material` 9.4.0, `@module-federation/vite` 1.21.x, `@iobroker/types-vis-2` 2.20.1, `@tsconfig/node22` 22.0.6 (admin and widget bundles rebuilt to match)
- (ssbingo) Fixed the CI type-check: `@tsconfig/node22` 22.0.6 pins `types` to `["node"]`, which dropped the mocha globals in the test files — restored via `types: ["node", "mocha"]` + a declared `@types/mocha`

### 0.2.1 (2026-08-14)

- (ssbingo) Maintenance: synced the auto-merged repository updates — Dependabot bumps (`@iobroker/json-config` 9.0.18, `@iobroker/gui-components` 10.1.0, `@module-federation/vite` 1.20.4) with the admin and widget bundles rebuilt to match, plus ioBroker template updates (`node:` import prefixes, `CHANGELOG_OLD.md`, Dependabot/CI tuning)

### 0.2.0 (2026-08-05)

- (ssbingo) **Requires ioBroker admin ≥ 8.0.0.** The admin scheduler component is migrated to the admin-8 UI stack — **React 19 + MUI 9** via `@iobroker/gui-components` and `@iobroker/json-config` 9 (replacing `@iobroker/adapter-react-v5`, which has no React 19 release). The vis-2 widgets stay on the vis-2 host stack (React 18 / MUI 6)
- (ssbingo) Minimum requirements raised: **js-controller ≥ 6.0.11, admin ≥ 8.0.0, Node.js ≥ 22**

### 0.1.0 (2026-07-26)

- (ssbingo) **Milestone release.** Consolidates the full feature set — cloud & local control with live telemetry, **SFC** (Seasonal Flow Control), two **vis-2 widgets**, and **per-pump time schedules** — into the first **0.1.x** milestone
- (ssbingo) Maintenance: the ioBroker adapter checker is clean (no errors, no suggestions) — Dependabot now uses randomised cron schedules and the deploy action is pinned to its major version (`@v1`)

### 0.0.9 (2026-07-26)

- (ssbingo) **Phase 9 — per-pump time schedules.** The adapter settings gain a **Schedules** section (bottom of the Connection tab) that lists the detected pumps; enable a pump and it gets its own **“Scheduler – &lt;pump&gt;” tab** where you set a **base power** (applied outside all windows) and a sorted list of **time windows**, each setting a power % or switching **SFC** on/off. The adapter runs the schedule and applies the target at the window boundaries. **Overlapping windows are rejected** — the editor validates live and the backend re-checks before applying

### 0.0.8 (2026-07-25)

- (ssbingo) Control widget: a dropdown next to the power slider lets you set the power in precise **5 % steps** (0–100 %). It writes the same setpoint as the quick buttons and is disabled while SFC controls the flow; it can be hidden via the new “Show 5 % dropdown” option

### 0.0.7 (2026-07-24)

- (ssbingo) Widgets: during Seasonal Flow Control (SFC) the pump visualization now reflects the **real** pump speed — the ice crystal spins by the actual (SFC-driven) speed like the impeller, the “Power” value shows the real output, and the control widget’s power slider shows the actual output (disabled while SFC controls the flow). Uses a live rpm-per-percent calibration learned during normal operation
- (ssbingo) Dependencies: processed the pending Dependabot updates — `@iobroker/adapter-react-v5` → 8.3.2 and `@module-federation/vite` → 1.19.1 (a leaner widget bundle), plus CI action bumps. Major bumps that would break vis-2 host compatibility (React 19, MUI 9, Vite 8, plugin-react 6, TypeScript 7) are pinned via Dependabot ignore rules, because the vis-2 host shares React 18 + MUI 6 as module-federation singletons

### 0.0.6 (2026-07-24)

- (ssbingo) Maintenance: updated the CI deploy action (`testing-action-deploy` 1.5.1 → 1.5.2) and tidied up the repository (removed stale/merged and open Dependabot branches). No functional changes to the adapter

### 0.0.5 (2026-07-24)

- (ssbingo) Phase 6 — the adapter now ships two **vis-2 widgets**. *Pump visualization* shows an impeller that spins with the pump speed (in 10 % steps), a rotating ice crystal while frost-protection (SFC) mode is active, and a red cross with a still impeller when the pump is off, plus live power (W), motor speed (rpm) and the “Power” setpoint (%). *Pump control* offers on/off, a speed slider and quick presets. Both widgets have an instance and pump selector and derive their state IDs themselves; vis-2 is restarted automatically on install so the widgets appear immediately
- (ssbingo) Seasonal Flow Control (SFC) can now be switched from the adapter: the SFC on/off command (ONet `0x5000`) was reverse-engineered, exposed as a new writable `control.sfc` state, and wired into the control widget's SFC button; the pump visualization reflects the active SFC state. SFC is OASE's temperature-dependent seasonal throughput reduction (up to −50 %), not frost protection
- (ssbingo) Hardening: all transport timers are now adapter-managed (auto-cancelled on unload — compact-mode safe), and a batch of ioBroker adapter-checker findings were resolved (CI/deploy on Node 24, dependabot cooldown + auto-merge migration, `io-package.json` metadata)

### 0.0.4 (2026-07-24)

- (ssbingo) Phase 7 — cloud and local are now mutually exclusive: the `both` connection mode was removed (a saved `both` is migrated to `cloud`). When you switch between `cloud` and `local`, the device objects are rebuilt cleanly so the two never mix, and the new `info.connectionType` state shows which data source is active

### 0.0.3 (2026-07-23)

- (ssbingo) Phase 3 — local (LAN) transport is complete: connection mode `local` runs the whole adapter over the local network without the cloud. The adapter wakes the controller over UDP, the controller connects back over TLS (legacy cipher, self-signed certificate), authenticates with the device password, then reads the gateway and pumps, polls live telemetry (power, speed, temperature, voltage) and controls on/off and speed — all over the LAN. The poll and command path is transport-agnostic (local preferred, cloud fallback), and on/off is derived from live telemetry. Note: the speed setpoint value is not read back over the local channel yet
- (ssbingo) Documentation: multilingual README docs in 11 languages (under `doc/<lang>/`), beginner handbooks in English and German with a step-by-step mitmproxy guide (available as PDF), a Documentation section and CHANGELOG_OLD.md

### 0.0.2 (2026-07-23)

- (ssbingo) Phase 1 – cloud read-only: connects to the OASE Garden Controller Cloud (Azure AD B2C refresh-token auth), discovers the gateway and pumps, and polls live speed and status
- (ssbingo) Phase 2 – cloud control: pump on/off and speed (0–100 %) are writable and sent through the cloud SendONetPacket tunnel, verified byte-for-byte against the app
- (ssbingo) Phase 4 – live telemetry: power (W), motor speed (rpm), temperature (°C) and mains voltage (V) are read live each poll; still-unmapped sensors are exposed as raw values for classification
- (ssbingo) Pumps are named after their controller name; new stylized adapter icon (own illustration, not the product photo)
- (ssbingo) Extensive, component-tagged logging so any failure can be pinpointed from the logs, with secrets never logged

## Documentation

📖 **Beginner's handbook:** [English](/#/docs/adapterref/iobroker.pondpump/doc/handbook/en/manual.md) ([PDF](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/handbook/en/manual.pdf)) ·
[Deutsch](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/handbook/de/manual.md) ([PDF](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/handbook/de/manual.pdf))

Translated documentation:

- 🇩🇪 [Deutsche Dokumentation](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/de/README.md)
- 🇷🇺 [Документация на русском](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/ru/README.md)
- 🇳🇱 [Nederlandse documentatie](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/nl/README.md)
- 🇫🇷 [Documentation française](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/fr/README.md)
- 🇮🇹 [Documentazione italiana](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/it/README.md)
- 🇪🇸 [Documentación en español](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/es/README.md)
- 🇵🇱 [Dokumentacja polska](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/pl/README.md)
- 🇵🇹 [Documentação portuguesa](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/pt/README.md)
- 🇺🇦 [Документація українською](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/uk/README.md)
- 🇨🇳 [简体中文文档](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/zh-cn/README.md)

Older changelogs can be found in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.