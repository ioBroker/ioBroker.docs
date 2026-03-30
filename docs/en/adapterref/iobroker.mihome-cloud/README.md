![Logo](admin/mihome-cloud.png)

# ioBroker.mihome-cloud

[![NPM version](https://img.shields.io/npm/v/iobroker.mihome-cloud.svg)](https://www.npmjs.com/package/iobroker.mihome-cloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mihome-cloud.svg)](https://www.npmjs.com/package/iobroker.mihome-cloud)
![Number of Installations](https://iobroker.live/badges/mihome-cloud-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/mihome-cloud-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.mihome-cloud.png?downloads=true)](https://nodei.co/npm/iobroker.mihome-cloud/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.mihome-cloud/workflows/Test%20and%20Release/badge.svg)

## mihome-cloud adapter for ioBroker

Adapter for all Mi Home Cloud devices. Connects to the Xiaomi Cloud API and provides status, control and scene execution for all devices registered in your Mi Home account.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 5.0.

## Requirements

- Node.js >= 20
- js-controller >= 6.0.11
- Admin >= 7.6.20

## Configuration

In the adapter settings you can configure:

| Setting             | Description                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| **Region**          | Select the Xiaomi Cloud region matching your Mi Home app (Germany, China, Russia, Taiwan, Singapore, USA) |
| **Update interval** | Polling interval in minutes (minimum 1 minute)                                                            |

## Login

The adapter uses a **URL-based login** (no username/password needed in the adapter settings).

1. Configure the **Region** and **Interval** in the adapter settings and save.
2. Start the adapter.
3. Check the adapter log – a **login URL** will appear:
   ```
   XIAOMI CLOUD LOGIN REQUIRED
   Please visit this URL in your browser and log in: https://account.xiaomi.com/...
   ```
4. Open the URL in your browser and log in with your Xiaomi account.
5. The adapter detects the successful login automatically and connects.

The session is persisted and survives adapter restarts. A fresh login is only required if the session expires server-side.

## Object tree

After a successful login, the adapter creates the following object structure for each device:

### `mihome-cloud.0.<device-id>.general`

General device information (model, name, firmware version, etc.).

### `mihome-cloud.0.<device-id>.status`

Read-only status values from the MIoT Spec (e.g. power state, brightness, temperature). These are polled at the configured interval.

### `mihome-cloud.0.<device-id>.remote`

Writable control commands from the MIoT Spec. To send a command, set the state (unconfirmed) to `true` or to the required value.

If a command expects input parameters, they are listed in the state name and the expected IDs are shown as the default value.

### `mihome-cloud.0.<device-id>.custom`

Device-specific properties from the internal `configDes` database (e.g. for vacuum cleaners: `clean_area`, `clean_time`, `battery`). These are polled via `get_prop` / `get_status`.

### `mihome-cloud.0.<device-id>.remotePlugins`

Additional commands extracted from the Xiaomi cloud plugins. These are discovered automatically during startup by analysing the plugin bundles for each device model.

### `mihome-cloud.0.scenes`

Smart scenes / automations from your Mi Home account. Set a scene to `true` to execute it.

## Example: Robot vacuum room cleaning

1. Find room IDs:

   `mihome-cloud.0.<id>.remote.get-map-room-list` – requires `[cur-map-id]` as input.

   You can get the current map ID from `mihome-cloud.0.<id>.status.cur-map-id`, or query the map list via:

   `mihome-cloud.0.<id>.remote.get-map-list` (no input needed) → result appears under `mihome-cloud.0.<id>.status.map-list`

2. Set the map ID and query rooms:

   `mihome-cloud.0.<id>.remote.get-map-room-list` with input `[<map-id>]`

   → Result: `mihome-cloud.0.<id>.status.room-id-name-list`: `[{"name":"room1","id":10}]`

3. Start room cleaning:

   `mihome-cloud.0.<id>.remote.start-room-sweep` with format `["10", "11", "12", "13"]`

   or

   `mihome-cloud.0.<id>.remote.set-room-clean` with format `["10",0,1]`

## Troubleshooting

- **"DB closed" errors**: Harmless – occurs when the adapter is stopping while a request is still pending. These are suppressed automatically.
- **"ECONNRESET" errors**: Temporary network interruptions to the Xiaomi Cloud. The adapter retries automatically at the next polling interval.
- **"-106 device network unreachable"**: The device (e.g., a vacuum cleaner) is currently offline, disconnected from Wi-Fi, or powered off. The adapter will log this as debug and keep trying.
- **401 errors**: The session has expired server-side. Restart the adapter to trigger a fresh QR-code login.
- **No properties for device**: Some pure Zigbee/Bluetooth sensor devices (e.g. `lumi.sensor_switch.v2`) do not expose their status via the Cloud API. Consider using a local Zigbee adapter instead.

## Discussion and questions

<https://forum.iobroker.net/topic/59636/test-adapter-mihome-cloud>

## Changelog
### 1.0.4 (2026-03-14)
- Maintenance update: Consolidated changelog and fixed repository metadata for better standards compliance

### 1.0.3 (2026-03-14)
- **Major update with complete rewrite:**
  - New QR-code based login flow
  - Support for many new Xiaomi device models (Air Purifiers 4 series, newer fans/heaters, robot vacuums)
  - Added environment properties (Temperature, Humidity) to many device configurations
  - Improved error handling for network interruptions
  - Migration to external i18n files and Node.js 20+ requirement
  - Updated dependencies and fixed known vulnerabilities
  - Added missing translations (uk, ru, pt, nl, fr, it, es, pl, zh-cn)
  - Migration to ESLint flat config and release-script support

### 0.2.2

- Minor improvements with device handling

### 0.2.1

- Fix login. Check Log after starting Adapter

### 0.2.0

- (lubepi) Fix login

### 0.0.5

- (TA2k) Bugfixes

### 0.0.4

- (TA2k) initial release

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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
