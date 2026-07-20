# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.govee-smart@main/admin/govee-smart.svg" width="48" align="top" /> ioBroker.govee-smart

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.govee-smart)](https://www.npmjs.com/package/iobroker.govee-smart) ![stable](https://iobroker.live/badges/govee-smart-stable.svg) ![Installations](https://iobroker.live/badges/govee-smart-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.govee-smart)](https://www.npmjs.com/package/iobroker.govee-smart)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.govee-smart/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.govee-smart/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Control all [Govee](https://www.govee.com/) WiFi products from ioBroker — lights, sensors and appliances. Bluetooth-only devices are not supported.

The adapter uses every available Govee channel (LAN, Cloud REST, AWS IoT MQTT, OpenAPI MQTT, App API) and picks whichever delivers the fastest answer for each device. Details in the **[Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

---

## Documentation

Full user documentation lives in the **[Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki)**.

| Topic                                                                       | English                                                                                               | Deutsch                                                                                                 |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Landing page                                                                | [Home](https://github.com/krobipd/ioBroker.govee-smart/wiki/Home)                                     | [Startseite](https://github.com/krobipd/ioBroker.govee-smart/wiki/Startseite)                           |
| Channels, credentials, API key, experimental devices                        | [Setup](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup)                                   | [Einrichtung](https://github.com/krobipd/ioBroker.govee-smart/wiki/Einrichtung)                         |
| Supported models, status meanings, contributing yours                       | [Devices](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices)                               | [Geräte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Geraete)                                  |
| Every datapoint, where it lands, what it does                               | [State tree](https://github.com/krobipd/ioBroker.govee-smart/wiki/State-Tree)                         | [Datenpunkte](https://github.com/krobipd/ioBroker.govee-smart/wiki/Datenpunkte)                         |
| Thermometers, heaters, kettles, etc. — state tree, updates, troubleshooting | [Sensors and Appliances](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensors-and-Appliances) | [Sensoren und Appliances](https://github.com/krobipd/ioBroker.govee-smart/wiki/Sensoren-und-Appliances) |
| Lights — segment count, wizard, cut strips, batch commands                  | [Segments](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segments)                             | [Segmente](https://github.com/krobipd/ioBroker.govee-smart/wiki/Segmente)                               |
| Lights — scene library, speed slider, Cloud vs local snapshots              | [Scenes and Snapshots](https://github.com/krobipd/ioBroker.govee-smart/wiki/Scenes-and-Snapshots)     | [Szenen und Snapshots](https://github.com/krobipd/ioBroker.govee-smart/wiki/Szenen-und-Snapshots)       |
| Lights — group fan-out, capability intersection                             | [Groups](https://github.com/krobipd/ioBroker.govee-smart/wiki/Groups)                                 | [Gruppen](https://github.com/krobipd/ioBroker.govee-smart/wiki/Gruppen)                                 |
| Folder naming, startup, diagnostics, troubleshooting                        | [Behavior](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior)                             | [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten)                             |

---

## Features

- **Capability-driven** — states are generated from what the Govee API reports for each device. No SKU hardcoding, no hand-maintained device list to fall behind.
- **LAN-first for lights** — UDP multicast discovery, sub-50 ms commands, status updates via AWS IoT MQTT
- **Cloud + MQTT push for sensors and appliances** — readings via the App API, events via the OpenAPI MQTT broker
- **Per-segment color and brightness** for LED strips with the right capability, including batch commands and an interactive segment detection wizard for cut strips
- **Scenes, DIY scenes, music mode, gradient toggle** — activated locally via BLE-over-LAN where possible, Cloud fallback otherwise
- **Cloud and local snapshots** — Govee-app snapshots and ioBroker-side snapshots side by side
- **Groups** — bridge Govee groups into ioBroker with capability intersection across members
- **Diagnostics export button per device** — one-click JSON dump for bug reports
- **Works without credentials** — LAN-only out of the box, each credential tier unlocks more
- **Rate-limited Cloud usage** — daily and per-minute budgets aligned to Govee's quota

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- Node.js >= 22
- ioBroker js-controller >= 7.2.2
- ioBroker Admin >= 7.8.23
- A Govee account and at least one Govee WiFi device. LAN control needs a light with LAN mode enabled in the Govee Home app — see Govee's [LAN-supported device list](https://app-h5.govee.com/user-manual/wlan-guide).

---

## Getting started

The adapter works LAN-only without any credentials. Adding an API key unlocks scenes, segments and appliance control. Adding your Govee email and password adds sensor readings (temperature/humidity via the App API), real-time status push and full group control. See the [Setup page](https://github.com/krobipd/ioBroker.govee-smart/wiki/Setup) for credential levels, how to get an API key, and network requirements.

---

## Device support

Each device shows its test status under `diag.tier`. The [Devices page](https://github.com/krobipd/ioBroker.govee-smart/wiki/Devices) lists every supported model and what the status means.

---

## Troubleshooting

Common issues (no devices discovered, empty scenes dropdown, segment colors not changing, limited group commands, delayed status updates) are covered on the Wiki [Behavior](https://github.com/krobipd/ioBroker.govee-smart/wiki/Behavior) / [Verhalten](https://github.com/krobipd/ioBroker.govee-smart/wiki/Verhalten) page.

For anything else, set **`diag.export`** to `true` on the affected device, copy the JSON from `diag.result`, and open a [GitHub Issue](https://github.com/krobipd/ioBroker.govee-smart/issues).

---

## Acknowledgments

This adapter's MQTT authentication and BLE-over-LAN (ptReal) protocol implementation was informed by research from [govee2mqtt](https://github.com/wez/govee2mqtt) by Wez Furlong. Their reverse-engineering of the Govee AWS IoT MQTT protocol and undocumented API endpoints was invaluable.

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.19.0 (2026-07-04)

- Device log lines now consistently name devices as "name (model)" — cache maintenance, command errors and wizard messages included, no more bare model/address labels
- The credentials entry disappears from the object tree — login tokens stay saved in encrypted form, just no longer visible as an object

### 2.18.2 (2026-07-03)

- Internal refactoring. No user-facing changes.

### 2.18.1 (2026-07-03)

- Added several new Govee devices to the catalog — 4 more lamps and 3 sensors (including a CO2 monitor). They start as experimental; enable them in the adapter settings to try them.

### 2.18.0 (2026-07-03)

- Devices you removed from your Govee account (and not reachable on your local network) now disappear from the adapter after a safety delay, instead of lingering forever — deleted groups too.
- Restored colour control in groups that contain a cloud-only member — `control.color_rgb` and `control.color_temperature` had gone missing from those groups.
- The persisted MQTT credentials are no longer a visible datapoint (`info.mqttCredentials` is gone) — they moved to an internal, non-loggable store, still encrypted.
- `info.appVersionDrift` is gone — the adapter now keeps its Govee-app version current on its own, so it keeps working when Govee updates their app (no adapter update needed).

### 2.17.0 (2026-07-01)

- **Breaking:** colour datapoints renamed to snake_case — e.g. `control.colorRgb` → `control.color_rgb`, and the colour-temperature one likewise (devices + groups). Update your scripts.
- Security: the Govee Cloud API key can no longer leak into the ioBroker log — it was written in plaintext on the cloud-events connection and is now masked.
- Security: the diagnostics export (the JSON you paste into a GitHub issue) no longer contains device or gateway secrets — a gateway's secret key and push topic are now masked.
- Security: a spoofed LAN discovery reply can no longer redirect a device's commands to another IP — the device address is taken from the real network source, not the packet.
- Robustness: the Admin "Test login" button is now rate-limited, so repeated clicks can no longer trigger a burst of Govee logins that could get your account temporarily locked.
- Security: a hostile or misbehaving device on your network can no longer flood the adapter with fake device announcements and slow it down — new devices are now bounded.
- Fixed: a device you delete from your Govee account is now removed from the adapter on the next cloud refresh (e.g. after a restart), instead of lingering as a phantom device for up to two weeks.
- New: a "Manually sync devices" button (`info.manual_sync_devices`) — set it to true to sync the device list with your Govee account on demand (add new, drop deleted) without a restart.
- Fixed: multi-colour DIY scenes activated over the local network now load correctly — longer scenes could previously be corrupted and silently fail to apply.
- Fixed: after you remove a device and add it again, its info states (name, model, …) are recreated correctly instead of leaving "has no existing object" warnings until the next restart.
- Fixed: if a Govee push/cloud-events connection connects but can't subscribe (a rare server hiccup), the adapter no longer reconnects every few seconds — the retry now backs off normally.
- Fixed: the admin "Test login" button now waits for the real MQTT connection before reporting — valid Govee account credentials no longer show a false "MQTT not up, restart the adapter" message.
- Fixed: on lamps whose music modes start at zero, the first mode was unreachable and "off" was missing — the music-mode selector is fixed. **Breaking:** its numbers shift by one, adjust scripts.
- Fixed: cloud snapshots whose value is a plain number are no longer dropped from the snapshot dropdown, and an entry with an empty value no longer shows up as a phantom option.
- Fixed: clearing the preset-scene selector no longer fires a spurious empty scene command.
- Fixed: DIY scenes you create in the Govee app now show up in the DIY dropdown after a reload, instead of only on the very first load.
- Fixed: a malformed `segments.command` (e.g. `;` instead of `:`) now logs a clear warning with the expected syntax instead of being silently ignored.
- Fixed: a command to a group with no reachable members (or where every member fails) is no longer reported as successful — it warns and leaves the state un-acknowledged, like a single device.
- Fixed: setting music sensitivity or auto-color on a LAN-controlled light no longer silently appears to succeed — the adapter now makes clear only the music mode applies locally.
- Fixed: an out-of-range segment range in `segments.command` (e.g. `0-2000000000`) is now clamped to the protocol limit instead of briefly freezing the adapter while it expands the range.
- Fixed: the segment-detection wizard now leaves your light off after it finishes or is cancelled if it was off before — it no longer leaves a light on that you had switched off.
- Fixed: the segment-detection wizard now restores your strip's original per-segment gradient on finish/abort instead of flattening it to a single colour — a uniformly-coloured strip is unaffected.
- Fixed: starting the segment-detection wizard twice in quick succession can no longer open two overlapping sessions.
- Fixed: the Govee account email field no longer shows a "valid email" error when you leave it empty — LAN-only and API-key-only setups no longer see a false validation error.
- Fixed: per-segment colour and brightness now show a default value instead of reading as null in visualizations before the first change.
- Fixed: sensor readings (temperature/humidity/battery/CO₂) now default to 0 instead of null in visualizations before the first reading arrives.
- Fixed: device groups no longer expose a meaningless "verified" trust-tier datapoint (the trust tier only applies to real devices, not groups).
- Fixed: cleaner shutdown/restart — the adapter no longer opens a cloud connection or reports a stray error after it has been told to stop.
- Fixed: a broken rate-limit reply from Govee no longer causes rapid repeated retries — the adapter now waits at least 5 seconds before trying again.
- Fixed: under heavy cloud load a fresh control command (power/brightness) is no longer dropped in favour of queued scene activations.
- Fixed: a LAN light no longer loses its power and colour controls after a cloud data refresh.
- Added: device catalog entries for the H5109 Pool Thermometer and H1630 Lantern Floor Lamp (user-reported) — they are now recognised instead of logging a "not supported" warning.
- Fixed: a sensor sending fresh readings now shows `info.online = true` even when Govee's cloud wrongly reports it offline (e.g. gateway thermometers) — online is derived from data freshness.
- Fixed: temperature-only sensors no longer keep a phantom humidity datapoint stuck at 0 — a device with no humidity sensor drops it, while a real thermo-hygrometer keeps its humidity.
- Fixed: a rejected Govee API key is now always reported as "API key rejected — check Govee API key" and stops the retry loop, instead of a generic error and retrying a bad key forever.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Support

- [Wiki](https://github.com/krobipd/ioBroker.govee-smart/wiki) — user documentation (EN / DE)
- [GitHub Issues](https://github.com/krobipd/ioBroker.govee-smart/issues) — bug reports, feature requests
- [ioBroker Forum](https://forum.iobroker.net/) — general questions

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

---

_Developed with assistance from Claude.ai_
