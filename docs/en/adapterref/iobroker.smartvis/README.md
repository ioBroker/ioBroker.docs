---
chapters: {"pages":{"en/adapterref/iobroker.smartvis/README.md":{"title":{"en":"ioBroker.smartvis"},"content":"en/adapterref/iobroker.smartvis/README.md"},"en/adapterref/iobroker.smartvis/DEVELOPMENT.md":{"title":{"en":"Development"},"content":"en/adapterref/iobroker.smartvis/DEVELOPMENT.md"}}}
---
![Logo](admin/smartvis.svg)

# ioBroker.smartvis

[![Test and Release](https://github.com/Exc3pt10n/ioBroker.SmartVis/actions/workflows/test-and-release.yml/badge.svg?branch=main)](https://github.com/Exc3pt10n/ioBroker.SmartVis/actions/workflows/test-and-release.yml)

Self-configuring, **mobile-first** visualization for ioBroker.
SmartVis detects devices and rooms automatically and shows them as an installable web app (PWA) – on the phone as well as in the browser – without building widgets by hand.

> **Status:** version 0.x – in daily use and fully usable. Until 1.0, settings and the storage format may still change; such changes are marked **Breaking** in the [changelog](#changelog) and are migrated automatically where possible.
> Detection is tuned on an installation with Homematic (IP), Philips Hue (`hue`, `hue-v2` and `philips-hue`), QCells Q.HOME, KEBA, Toshiba air conditioners and Echo. Shelly, Sonoff (Tasmota), Tuya, FRITZ!DECT, Zigbee, zigbee2mqtt and deCONZ have their own rules, developed and tested against the object structures from the source code of these adapters (no feedback from real installations yet). On other systems devices may be missing or superfluous – they can be hidden in edit mode. **More → Detection** shows which channels got no tile and saves an anonymous report (adapter, data point keys and roles only); attached to an issue it helps to improve detection.
>
> The user interface is available in **English and German** and follows the ioBroker system language (can be changed in the instance settings). A detailed German description is in [docs/de/README.md](https://github.com/Exc3pt10n/ioBroker.smartvis/blob/main/docs/de/README.md).

> **Development note:** SmartVis was built with the help of **Claude** (AI by Anthropic, via Claude Code). Most of the code was written by Claude; requirements, testing on a real installation and review of every change are done by the maintainer. Every change runs through automated tests (unit, integration and installation tests on Node 22/24) before a release is created.

## Features

- **Automatic device detection** via [`@iobroker/type-detector`](https://github.com/ioBroker/ioBroker.type-detector), plus adapter-specific rules against tile noise (maintenance channels, buttons, helper data points …)
- **Rooms** from several sources, rooms with the same name are merged: `enum.rooms` (e.g. synchronized from the Homematic CCU), Hue rooms (`hue` / `hue-v2` / `philips-hue`) and device names ("Wohnzimmer Deckenlicht" → room *Wohnzimmer*, device *Deckenlicht*); rediscovery after object changes
- **Home page**: key figures (PV, battery, consumption, lights on, open windows, security mode …, warnings first), weather with forecast and official DWD warnings, favourites, and status cards per topic (lights on per room with "off", climate, open windows & doors, playing media, faults, weak batteries); on the desktop a dashboard with columns
- **Rooms** with live status (temperature, lights, open windows …) and devices grouped by type; Hue zones
- **Detail view** per device: light (on/off, brightness, colour temperature, colour with "white | colour", swatches, hue and saturation), blind (position, up/stop/down, shuttercontrol automation), thermostat, air conditioner, media, sensors with their current value, all other values; Hue scenes and smart scenes; undo restores an active Hue scene
- **History** from `sql`, `history` or `influxdb` for all recorded values (6 h / 24 h / 7 days, min/avg/max, table)
- **Energy**: energy flow (PV, house, battery, grid, car), daily values and energy counters via adapter profiles – [qhome-ess-hyb-g2](https://github.com/Exc3pt10n/ioBroker.qhome-ess-hyb-g2) (QCells Q.HOME+ ESS HYB-G2), `kecontact` (KEBA wallbox with PV surplus charging), PV forecast from `pvforecast`
- **Climate**: `toshiba-ac` air conditioners; fans from the function "ventilation"
- **Shading** via [shuttercontrol](https://github.com/simatec/ioBroker.shuttercontrol): all blinds, areas, automation, sun protection, holiday
- **Weather**: local weather station (HmIP-SWO-*, HM-WDS100, HmIP-SLO light sensors) or `openweathermap`, `weatherunderground`, `daswetter`; official warnings from `dwd`
- **Security**: security mode of all stations, alarm, smoke/water/CO detectors, windows & doors, motion sensors; eufy cameras via [`eufy-next`](https://github.com/Exc3pt10n/ioBroker.eufy-next) (recommended) or `eusec` with event picture, detection (person, motion, pet, sound, crying, vehicle, doorbell), **livestream with sound** (go2rtc), light, pan/tilt and camera settings
- **More**: ioBroker status (hosts with CPU, memory, disk; adapter instances with problems first), battery overview with battery type from the device model (e.g. "2× AAA", "CR2450"; table from the [Battery Notes](https://github.com/andrew-codechimp/HA-Battery-Notes) library, MIT), detection diagnosis with anonymous report
- **Further device adapters** with corrected roles and readable names: `shelly`, `sonoff` (Tasmota), `tuya`, `fritzdect`, `zigbee`, `zigbee2mqtt`, `deconz`, `alexa2`, `hue`, `hue-v2`, `philips-hue` (lights, rooms, zones, scenes, smart scenes and motion sensors)
- **Edit mode** (✎): rename, move to another or a new room, hide, mark as favourite, arrange tiles, rooms and sections by drag & drop; customisations **per end device** (phone and tablet can look different), stored in the ioBroker file storage (`smartvis.0/overrides.json`, part of backups); can be disabled in the instance settings
- Own web server with WebSocket API; the app only receives detected states and may only write to released states
- Responsive: bottom navigation on phones, sidebar from tablet size, light/dark mode automatically

## Installation

Install SmartVis like any other adapter from the ioBroker Admin interface (*Adapters*), then create an instance and open `http://<iobroker>:8099`. On the phone, use "Add to home screen" to install the app.

Requirements: js-controller ≥ 6.0.11, Admin ≥ 7.6.20, Node.js ≥ 22.

There is **no login** yet: use SmartVis only in your home network or via VPN. Edit mode can be disabled in the instance settings.

## Configuration

| Setting | Default | Description |
|---|---|---|
| IP address | `0.0.0.0` | Network interface of the web server |
| Port | `8099` | Open `http://<iobroker>:8099` |
| Language | system language | User interface and generated device names (German or English; also used for multilingual object names) |
| Rediscovery after object change | `10` s | Delay after object changes |
| Ignored adapters | `system,admin,…,iot` | Skipped during discovery |
| Allow edit mode | on | Save customisations from the app |

## Development

See [DEVELOPMENT.md](/#/docs/adapterref/iobroker.smartvis/DEVELOPMENT.md).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.18.0 (2026-11-26)

- (Exc3pt10n) Support for the `philips-hue` adapter (Hue Bridge API v2): lights, rooms and zones from the bridge, "All lights" per room, scenes and smart scenes with the active scene, and motion sensors as one device with brightness and battery; dimmer switches, automations and the group "all" are hidden

### 0.17.1 (2026-11-25)

- (Exc3pt10n) Toshiba air conditioners: operating mode, its icons, the fireplace mode and the climate icons on the home page and room cards also work with toshiba-ac 0.2.0 and later, which reports the mode as a number (`1`–`5`, `FAN_ONLY`); older versions keep working
- (Exc3pt10n) Missing translation of the heading "Functions" in the climate view

### 0.17.0 (2026-11-24)

- (Exc3pt10n) User interface in English and German: texts in the app, generated device names, camera, wallbox and climate settings follow the ioBroker system language (setting "Language" in the instance, German or otherwise English); numbers and dates are formatted accordingly
- (Exc3pt10n) Log messages, object names (`info.*`) and the package description in English; the anonymous detection report is saved as `smartvis-diagnosis-<date>.json`
- (Exc3pt10n) Security: the WebSocket only accepts connections from pages served by SmartVis itself (`Origin` check), so other web pages cannot switch devices
- (Exc3pt10n) The delay for rediscovery is checked in the adapter as well (1–3600 s); a failed update of `info.clients` no longer causes an unhandled rejection
- (Exc3pt10n) Documentation: developer notes moved to `DEVELOPMENT.md`, outdated concept document removed

### 0.16.1 (2026-11-24)

- (Exc3pt10n) Release notes in the instance only list versions that are available on npm
- (Exc3pt10n) Version tags now start their own workflow run, as required by the ioBroker repository checker

### 0.16.0 (2026-11-24)

- (Exc3pt10n) Prepared for distribution via npm and the ioBroker repository: the adapter is now shipped pre-built (no build on the ioBroker host anymore). **Breaking** for testers who installed from GitHub source: installing from `…/tarball/main` or `…/tarball/release` is no longer possible; use the `.tgz` attached to each GitHub release until SmartVis is available in the repository
- (Exc3pt10n) Instance settings translated into all ioBroker languages
- (Exc3pt10n) Timers use the adapter's timer functions, so nothing keeps running after the instance stops
- (Exc3pt10n) README in English; German description moved to `docs/de/README.md`, older changelog entries to `CHANGELOG_OLD.md`

### 0.15.1 (2026-11-23)

- (Exc3pt10n) Lights counted correctly: a Hue room group with a smart scene (hue-v2, e.g. "Natural light") was split into "All lights" and an extra switch; "All lights" lost the link to its lamps and counted as one more lamp. Scene buttons and switches of a group are no longer detected as separate devices
- (Exc3pt10n) Room list: "All lights" no longer counts as an extra lamp when lamps of the group are in another room (e.g. after moving them in the app)
- (Exc3pt10n) eufy-next, checked against a real object tree: settings only when the camera reports their value (no write-only "set…" commands, no working mode as a bare number); missing German labels added; vehicle detection; all cameras uniformly "fixed battery"; battery health (`battery.health`) is no longer taken as battery level

### 0.15.0 (2026-11-15)

- (Exc3pt10n) eufy-next: livestream with sound in the camera view (from eufy-next 0.2.0, go2rtc page from `livestream.url`, start/stop via `livestream.start/stop`); the stream is stopped when the view is closed, after the adapter's maximum duration "continue watching" is offered. SmartVis only takes its own stills from the livestream for eusec – eufy-next stores them as event picture itself

### 0.14.0 (2026-11-15)

- (Exc3pt10n) Support for [`eufy-next`](https://github.com/Exc3pt10n/ioBroker.eufy-next) (eufy v6 cloud): cameras with event picture, detection (motion, person, pet, sound, crying, doorbell), reachability, battery, light, pan/tilt and settings; stations (HomeBase, indoor cameras with their own station) with security mode and alarm; battery overview with "fixed battery" for the cameras
- (Exc3pt10n) Camera view: "current picture" button for cameras that can take a fresh picture (eufy-next), with a hint for battery cameras

### 0.13.0 (2026-11-15)

- (Exc3pt10n) Battery type in the battery overview (e.g. "2× AAA", "CR2450"), determined from the device model using the device library of [Battery Notes](https://github.com/andrew-codechimp/HA-Battery-Notes) (MIT)
- (Exc3pt10n) Fans: switch channels in the function "ventilation" (or with "Lüfter"/"Ventilator" in the name) appear as fans under "heating & climate" instead of switches
- (Exc3pt10n) Camera tiles show a still from the last livestream instead of the striped eufy event picture (eusec)
- (Exc3pt10n) Home page: status cards per topic instead of rows of tiles (lights on per room, climate, open windows & doors, playing media, faults, weak batteries) with quick actions such as "off" and "pause"; undo after switching lights off restores an active Hue scene
- (Exc3pt10n) Camera event log removed; stored event pictures under `smartvis.0/events` are deleted on start
- (Exc3pt10n) Smaller fixes: energy cards collapsible again on phones, sensors show their current value in the detail view, yes/no values shown as state, aligned reset buttons

Older changes: CHANGELOG_OLD.md (in German).

## License

MIT License – see [LICENSE](https://github.com/Exc3pt10n/ioBroker.smartvis/blob/main/LICENSE).

Copyright (c) 2026 Exc3pt10n <kontakt@jansesoft.de>