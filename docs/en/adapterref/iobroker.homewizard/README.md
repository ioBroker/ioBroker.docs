# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.homewizard@main/admin/homewizard.svg" width="48" align="top" /> ioBroker.homewizard

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.homewizard)](https://www.npmjs.com/package/iobroker.homewizard) ![stable](https://iobroker.live/badges/homewizard-stable.svg) ![Installations](https://iobroker.live/badges/homewizard-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.homewizard)](https://www.npmjs.com/package/iobroker.homewizard)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.homewizard/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.homewizard/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Real-time energy monitoring for [HomeWizard](https://www.homewizard.com) Energy devices with API v2.

---

## Features

- **HomeWizard API v2** — HTTPS + WebSocket, bearer-token authentication
- **mDNS pairing** — `_homewizard._tcp` discovery, press the device button to pair
- **WebSocket push** — measurements arrive ~1/s, with system and battery changes pushed in real time; REST polling takes over while the WebSocket reconnects
- **Plug-In Battery control** — charge/discharge mode (including forecast-based `predictive` and a one-shot charge-to-full) and grid-feed permissions through the paired P1/kWh meter
- **Adaptive reconnect** — devices with weak WiFi switch to a faster reconnect interval and keep REST polling running so data keeps flowing
- **Encrypted device tokens** — stored per device object, no adapter restart on pairing or removal

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 8.0.11**
- **HomeWizard device with API v2 support** (firmware 4.x+ with local API enabled)

---

## Supported Devices

| Device            | Product Type                   |
| ----------------- | ------------------------------ |
| P1 Meter          | HWE-P1                         |
| kWh Meter 1-Phase | HWE-KWH1 (also sold as SDM230) |
| kWh Meter 3-Phase | HWE-KWH3 (also sold as SDM630) |
| Plug-In Battery   | HWE-BAT                        |

The Plug-In Battery is paired separately and shows up as its own device. To control charge/discharge mode and grid-feed permissions, you write to the `battery.*` data points of the P1 or kWh meter — that's where HomeWizard exposes the battery commands. The `predictive` mode and the `charge_to_full` switch require recent device firmware (battery API 2.3.0+); older firmware rejects them and the value is simply not applied.

---

## Configuration

### Prerequisites

The **local API** must be enabled on your HomeWizard device:

1. Open the **HomeWizard app** on your phone
2. Go to **Settings** > **Meters** > select your device > **Local API** > **Enable**

### Adding a device (automatic via mDNS)

1. Go to the **Objects** tab in ioBroker Admin
2. Set `homewizard.0.startPairing` to `true`
3. **Press the physical button** on your HomeWizard device within 60 seconds
4. The device is discovered automatically and appears under `homewizard.0`

### Adding a device (manual IP)

If mDNS is not available (e.g. different VLAN, Docker, or firewall blocking multicast):

1. Set `homewizard.0.pairingIp` to the IP address of your device
2. Set `homewizard.0.startPairing` to `true`
3. **Press the physical button** on the device within 60 seconds

### Managing devices

All paired devices are listed in the **Objects** tab under `homewizard.0`. Each device has its own folder (e.g. `hwe-p1_5c2fafaabbcc`) with measurement data, system settings, and device info.

- **Remove a device:** Set its `remove` data point to `true` — the device and all data points are deleted immediately
- **IP changes:** Detected automatically — after 3 failed reconnects, mDNS searches for the new IP. If not found, the device is marked offline

---

## State Tree

```
homewizard.0.
├── info.connection              — Overall connection status (bool)
├── info.devicesTotal            — How many devices are set up (number)
├── info.devicesOnline           — How many of them are answering right now (number)
├── info.devicesAllOnline        — True only while every device answers (bool)
├── startPairing                 — Activate pairing mode (button)
├── pairingIp                    — Device IP for manual pairing (string)
└── {productType}_{serial}/      — e.g. hwe-p1_5c2fafaabbcc
    ├── info/
    │   ├── productName          — Device name (string)
    │   ├── productType          — Product type (string)
    │   ├── firmware             — Firmware version (string)
    │   ├── connected            — Device reachable (bool) — drives the green/grey icon on the device
    │   ├── wifi_ssid            — WiFi network name / SSID (string)
    │   ├── wifi_rssi_db         — WiFi signal strength (number, dBm)
    │   └── uptime_s             — Device uptime (number, s)
    ├── measurement/             — Measurement data
    │   ├── power_w              — Total power (number, W)
    │   ├── power_l1_w .. l3_w   — Power per phase (number, W)
    │   ├── voltage_v            — Voltage single-phase (number, V)
    │   ├── voltage_l1_v .. l3_v — Voltage per phase (number, V)
    │   ├── current_a            — Current single-phase (number, A)
    │   ├── current_l1_a .. l3_a — Current per phase (number, A)
    │   ├── frequency_hz         — Grid frequency (number, Hz)
    │   ├── energy_import_kwh    — Total import (number, kWh)
    │   ├── energy_import_t1..t4_kwh — Import per tariff (number, kWh)
    │   ├── energy_export_kwh    — Total export (number, kWh)
    │   ├── energy_export_t1..t4_kwh — Export per tariff (number, kWh)
    │   ├── tariff               — Active tariff (number)
    │   ├── state_of_charge_pct  — Battery charge level (number, %)
    │   ├── cycles               — Battery charge cycles (number)
    │   ├── average_power_15m_w  — 15-min average power (number, W, Belgium)
    │   ├── monthly_power_peak_w — Monthly power peak (number, W, Belgium)
    │   ├── monthly_power_peak_timestamp — Monthly peak timestamp (string)
    │   ├── meter_model          — Meter model identifier (string)
    │   ├── timestamp            — Measurement timestamp (string)
    │   ├── quality/             — Power quality counters
    │   │   ├── voltage_sag_l1..l3_count
    │   │   ├── voltage_swell_l1..l3_count
    │   │   ├── power_fail_count
    │   │   └── long_power_fail_count
    │   └── external/            — External meters (gas, water, heat)
    │       └── {type}_{id}/
    │           ├── value        — Meter reading (number)
    │           ├── unit         — Unit (string)
    │           └── timestamp    — Last update (string)
    ├── battery/                 — Battery control (if batteries connected)
    │   ├── mode                 — zero / to_full / standby / predictive (string, R/W)
    │   ├── charge_to_full       — One-shot charge to 100% (bool, R/W)
    │   ├── permissions          — JSON array (string, R/W)
    │   ├── battery_count        — Connected batteries (number)
    │   ├── power_w              — Battery power (number, W)
    │   ├── target_power_w       — Target power (number, W)
    │   ├── max_consumption_w    — Max consumption (number, W)
    │   └── max_production_w     — Max production (number, W)
    ├── remove                   — Remove device (button)
    └── system/                  — System settings
        ├── cloud_enabled        — Cloud communication (bool; R/W on meters, read-only on the Plug-In Battery)
        ├── status_led_brightness_pct — LED brightness 0-100 (number, R/W)
        ├── api_v1_enabled       — Toggle the device's deprecated v1 API (bool, R/W — leave off)
        ├── reboot               — Reboot device (button)
        └── identify             — Blink LED (button)
```

> States are created dynamically based on what the device reports. Not all devices have all states. kWh meters additionally provide apparent/reactive current, apparent/reactive power, and power factor states.

---

### Knowing when something dropped out

`info.devicesOnline` and `info.devicesAllOnline` save you from opening every device
folder to see whether one has dropped out, and give an automation a single datapoint
to watch. They are recalculated at the same moment a device connects or disconnects,
so the summary can never disagree with the individual `connected` markers.

`info.devicesTotal` deliberately keeps its value when the adapter is stopped — how
many devices you have set up does not change because the adapter is off. Only
`devicesOnline` drops to `0` and `devicesAllOnline` to false, together with every
device's own `connected`, so a stopped adapter no longer leaves the tree looking green.

## Troubleshooting

### Device not found during pairing

- Make sure the device is on the same network/VLAN as the ioBroker server
- Verify that **local API** is enabled in the HomeWizard app (Settings > Meters > your device > Local API)
- Check that multicast/mDNS traffic is not blocked by your router/firewall

### WebSocket keeps disconnecting

- Check `info.wifi_rssi_db` — above -75 dBm is comfortable, weaker than -85 dBm explains frequent drops
- For devices with weak WiFi the adapter switches to a faster reconnect interval (60 s instead of 5 min) and keeps REST polling in the background so you don't lose data
- A WebSocket-layer ping/pong heartbeat (~30 s ping, 10 s pong window) catches half-dead links where the TCP stream is buffered but the device has stopped responding. Such links are torn down and reconnected automatically — you no longer end up with a stale "connected" status while measurement values stop updating.
- IP changes are picked up via mDNS — no manual reconfiguration needed

### Token invalid after factory reset

- Set the device's `remove` data point to `true`, then pair again

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.17.0 (2026-09-02)

- Fixed: the connection status is now reset on every stop, even when the adapter is stopped right after it started — before, such a stop could leave it showing as connected.
- Fixed: a device that repeats the same error after reconnecting is warned about again, instead of staying silent for the rest of the adapter's run.
- Fixed: switching cloud access, the legacy v1 API or charge-to-full from a script now confirms the actual on or off value, not the raw text that was written.
- Fixed: two rare cases where a log line could show undefined or an object instead of the error now show the real text, and a malformed device error keeps a readable code.
- Fixed: an external gas or water meter whose reported type contains unusual characters now gets a clean name in the object tree instead of a broken one.
- Changed: ioBroker Admin 8.0.11 or newer is now required — the same minimum version that the current ioBroker stable repository ships with.

### 0.16.0 (2026-08-27) — stable

- Fixed: stopping the adapter no longer leaves every device showing as connected — the device markers and the connection status are now reset before the adapter goes down.
- Fixed: after a crash, a power cut or a restart, a device that was reachable before no longer stays green until it reconnects — every device starts out as not connected.
- New: three data points show at a glance how many devices are set up, how many are answering right now, and whether all of them are.

### 0.15.1 (2026-08-22)

- Improved: The adapter needs noticeably less processing power on installations whose devices send a new reading every second.

### 0.15.0 (2026-07-13) — stable

- A device that rejects the adapter's token now stops retrying and warns you to re-pair it, instead of quietly retrying in the background
- When pairing a device that connects but cannot be added, the adapter now tells you once so you can try again, instead of silently retrying

### 0.14.0 (2026-07-07)

- A brief WiFi dropout no longer makes the adapter wrongly treat a device as having a permanently unstable connection after a single outage
- Power-quality values (voltage sag/swell and power-fail counts) now sit in a named "quality" sub-folder under measurement instead of loose
- The Plug-In Battery's cloud-connection state is now a read-only indicator instead of a switch that could never be toggled
- Corrected state roles (grid frequency, reactive power) and 0–100 bounds (LED brightness, charge level); existing devices pick these up automatically on the next start and keep any names you changed
- Security: after an update, an older device is verified by its serial from the very first connection — its access token no longer briefly crosses a not-fully-verified connection
- Security: device and network-discovery names are cleaned before they reach the log, and pairing now cross-checks the device's serial against its certificate

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Support Development

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
