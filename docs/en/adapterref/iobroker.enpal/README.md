![Logo](admin/enpal_logo.svg)

# ioBroker adapter for Enpal Solar

![Number of Installations](https://iobroker.live/badges/enpal-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/enpal-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.enpal)
[![Downloads](https://img.shields.io/npm/dm/iobroker.enpal.svg)](https://www.npmjs.com/package/iobroker.enpal)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/topic/84188/enpal-influxdb-integration)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)](https://github.com/inventwo/ioBroker.enpal/tree/main/.cursor/iobroker-adapter.mdc)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## What this adapter does

Reads energy data from the local InfluxDB 2.x instance provided by Enpal solar systems and exposes ioBroker states for home automation:

- Monitor solar power production
- Track battery state of charge (SoC)
- Analyze grid consumption and feed-in power
- Automate based on power generation
- Visualize energy flows in ioBroker dashboard
- Optionally control the Enpal wallbox (charge mode, start/stop) via the local Enpal Box web interface

## Features

The adapter connects directly to the **local InfluxDB** that the Enpal box writes to — no cloud account or internet access required.

- Automatic discovery of all measurements, devices, and fields stored in your InfluxDB bucket
- Dynamic state creation under `enpal.0.<measurement>.<device>.<field>`
- Configurable polling interval (default: 60 seconds)
- Connection status via `info.connection` — the adapter instance turns red when the database is unreachable
- Optional **wallbox control** (charge mode, start/stop) via the Enpal Box Blazor web interface — uses the same host as the InfluxDB URL (port 80)

## Data Points

Data points are created dynamically based on the content of your InfluxDB bucket. The structure follows the pattern:

```
enpal.0.<measurement>.<device>.<field>
```

Typical examples (depending on your inverter and Enpal configuration):

- `enpal.0.solar.inverter.power` — Current PV power (W)
- `enpal.0.solar.inverter.energy` — Energy produced today (Wh)
- `enpal.0.battery.storage.soc` — Battery state of charge (%)
- `enpal.0.grid.meter.power` — Grid import/export power (W)
- `enpal.0.info.connection` — Connection status to InfluxDB

> The actual field names depend on your Enpal system version and hardware configuration.

### Wallbox control (`wallbox_control`)

When **Wallbox control** is enabled in the adapter configuration, a fixed channel is created (independent of InfluxDB auto-discovery):

```
enpal.0.wallbox_control.<state>
```

| State | Type | Read | Write | Description |
|-------|------|------|-------|-------------|
| `start` | button | no | yes | Start charging (set to `true` to trigger) |
| `stop` | button | no | yes | Stop charging (set to `true` to trigger) |
| `mode` | value | yes | yes | Set charge mode: `eco`, `solar`, `full`, or `smart` |
| `currentMode` | text | yes | no | Current charge mode reported by the wallbox (e.g. `Eco`, `Solar`, `Full`) |
| `connectorStatus` | text | yes | no | OCPP connector status from the wallbox (see [Connector status values](#connector-status-values)) |
| `automaticChargeStatus` | text | yes | no | Automatic charge on plug-in (`On` / `Off`; read-only, change via Enpal app) |

**How it works**

- **Control** (mode, start, stop): The adapter connects to `http://<enpal-box>/wallbox` via Blazor SignalR (same approach as the [Home Assistant Enpal integration](https://github.com/derolli1976/enpal)) and simulates button clicks.
- **Status** (`currentMode`, `connectorStatus`, `automaticChargeStatus`): Read from the Enpal Box page `http://<enpal-box>/deviceMessages` (`Mode.Charge.Connector.1`, `Status.Wallbox.Connector.1`, `Wallbox.Settings.AutomaticChargeStatus.Connector.1`). Updated on each sync interval and after control actions.

#### Connector status values

`connectorStatus` reports the [OCPP](https://www.openchargealliance.org/) connector status from the Enpal/StarCharge wallbox. Values are normalized to canonical spelling (e.g. `SuspendedEV`, not `Suspendedev`).

| Value | Meaning |
|-------|---------|
| `Available` | Connector free, no vehicle plugged in |
| `Preparing` | Vehicle connected, session not started yet (no power flowing) |
| `Charging` | Active charging — power is being delivered |
| `SuspendedEV` | Vehicle paused charging (e.g. battery full, BMS limit); still plugged in |
| `SuspendedEVSE` | Wallbox paused power delivery (e.g. load management); vehicle still connected |
| `Finishing` | Session ended, cable still connected or vehicle not yet moved |
| `Reserved` | Connector reserved for a future session |
| `Unavailable` | Temporarily not usable (maintenance, disabled) |
| `Faulted` | Error reported by the wallbox |
| `Connected` | Vehicle connected (Enpal-specific; may appear instead of or before other states) |

> **Note:** After a full charge you will often see `SuspendedEV` — this is normal. The car stopped drawing power; unplug or restart charging if needed.

**Requirements**

- Enpal Box firmware **8.50+** (Blazor wallbox page)
- Wallbox control checkbox enabled in adapter config
- ioBroker host must reach the Enpal Box on the local network (same IP as InfluxDB, HTTP port 80)

**Not supported**

- Changing automatic charge on plug-in from ioBroker (setting remains read-only; use the Enpal app to toggle)

## Installation

1. Install the adapter from the ioBroker admin interface
2. Create a new instance
3. Configure the following settings (tab **Settings**):
   - **InfluxDB URL**: Address of your local InfluxDB (e.g. `http://192.168.1.100:8086`)
   - **API Token**: Your InfluxDB API token (read access is sufficient)
   - **Organisation ID**: Your InfluxDB organisation
   - **Bucket**: The bucket Enpal writes to (typically `enpal` or similar)
   - **Update Interval**: Data refresh interval in seconds (default: `60`)
   - **Wallbox control** (optional): Enable to create `wallbox_control` states and allow charge mode / start / stop via the Enpal Box web UI (no extra URL — host is taken from the InfluxDB URL). When enabled, the **Wallbox help** tab explains data points, charge modes, and connector status values.
4. Save and start the instance

### How to find your InfluxDB credentials

1. Log in to your Enpal box web interface or connect to it via SSH
2. Open the InfluxDB UI at `http://<enpal-box-ip>:8086`
3. Go to **Data → API Tokens** and create a read-only token
4. Note the organisation name and bucket under **Data → Buckets**

## Privacy & Data Handling

- This adapter only connects to your **local InfluxDB** — no data is sent to any cloud service
- With wallbox control enabled, the adapter also connects to your **local Enpal Box** (HTTP and WebSocket on the same host as InfluxDB) — still no cloud access
- Your API token is stored encrypted in the ioBroker database
- No external servers are contacted

## Changelog
<!--
	### **WORK IN PROGRESS**
-->

### 0.4.2 (2026-06-12)
- (skvarel) Fixed missing wallbox_help_readme translation in English and German admin UI
- (skvarel) Replaced plain timers in wallbox client with adapter-core setInterval, setTimeout and delay helpers
- (skvarel) Updated iobroker/types for js-controller 7.1 compatibility

### 0.4.1 (2026-06-10)
- (skvarel) Typed adapter and instance root namespaces as meta folders for a cleaner object tree

### 0.4.0 (2026-06-07)
- (skvarel) Added read-only wallbox state automaticChargeStatus (automatic charge on plug-in, from /deviceMessages)
- (skvarel) Fixed connectorStatus normalization for OCPP values (e.g. SuspendedEV instead of Suspendedev)
- (skvarel) Documented wallbox connector status values in README
- (skvarel) Added conditional wallbox help tab with data point and status documentation

### 0.3.0 (2026-06-07)
- (skvarel) Added optional wallbox control via Enpal Box web interface (Blazor SignalR)
- (skvarel) New config option: wallbox_enabled (checkbox); Enpal Box URL is derived automatically from InfluxDB URL
- (skvarel) New states under wallbox_control: start, stop, mode, currentMode, connectorStatus

### 0.2.2 (2026-06-05)
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules
- (skvarel) Updated @alcalzone/release-script to 5.2.1 to fix repository checker error E0036
- (skvarel) Updated @tsconfig/node22 to 22.0.5
- (skvarel) Fixed mixed indentation in admin/jsonConfig.json

## Older changes
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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