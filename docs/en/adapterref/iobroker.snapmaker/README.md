![Logo](admin/snapmaker-logo.png)

# ioBroker adapter for Snapmaker 2.0

![Number of Installations](https://iobroker.live/badges/snapmaker-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/snapmaker-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.snapmaker.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.snapmaker)
[![Downloads](https://img.shields.io/npm/dm/iobroker.snapmaker.svg)](https://www.npmjs.com/package/iobroker.snapmaker)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/topic/85774/test-adapter-snapmaker-2.0-alpha)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)](https://github.com/inventwo/ioBroker.snapmaker/blob/main/.cursor/iobroker-adapter.mdc)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## What this adapter does

Connects **Snapmaker 2.0** machines (primary target: **A350**, also with laser / CNC toolheads) to ioBroker via the local HTTP API on port `8080`.

Typical values exposed during a job:

- Current / last **file name**
- **Remaining** and elapsed time
- Progress and machine status (`IDLE`, `RUNNING`, `PAUSED`, …)

Connection uses Snapmaker’s token flow (`POST /api/v1/connect` → optional touchscreen confirm → poll `GET /api/v1/status`).

You can paste an existing Luban token (`%APPDATA%\snapmaker-luban\machine.json` → `server.token`, UUID) into the adapter settings to skip a new authorization.

Manufacturer: [Snapmaker](https://snapmaker.com/). Other Snapmaker 2.0 models (A150 / A250) may work best-effort; Artisan / U1 use different protocols and are out of scope.

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| IP address | — | Machine address (required), e.g. `192.168.150.150` |
| Poll interval | `10` s | Status poll interval (min. 2 s) |
| API token | empty | Optional UUID from Luban `server.token` in `machine.json` (`%APPDATA%\snapmaker-luban\machine.json` on Windows; `~/.config/snapmaker-luban/machine.json` on Linux; `~/Library/Application Support/snapmaker-luban/machine.json` on macOS). Leave empty to request a new token |

One machine per adapter instance.

## Data points

Under `snapmaker.<instance>.*`:

| State | Description |
|-------|-------------|
| `info.connection` | Connection indicator |
| `info.series` | Machine series (e.g. Snapmaker 2.0 A350) |
| `info.toolHead` | Tool head from connect `headType` (e.g. `10W Laser` / `1.6W Laser` / `CNC` / `Print`) |
| `info.x` / `info.y` / `info.z` | Machine position (mm) |
| `info.homed` | Axes homed |
| `status` | Machine status (`IDLE`, `RUNNING`, `PAUSED`, …) |
| `printStatus` | Job / print status text |
| `currentJob.fileName` | Current / last job file name (full, e.g. `Weihnachtsbude.nc`) |
| `currentJob.fileBase` | Job file name without extension (e.g. `Weihnachtsbude`) |
| `currentJob.progress` | Progress in % |
| `currentJob.elapsedTime` | Elapsed time (seconds) |
| `currentJob.elapsedText` | Elapsed time (`HH:MM:SS`) |
| `currentJob.remainingTime` | Remaining time (seconds) |
| `currentJob.remainingText` | Remaining time (`HH:MM:SS`) |
| `currentJob.estimatedTime` | Estimated total job time as reported by the machine (seconds) |
| `currentJob.estimatedText` | Estimated total job time (`HH:MM:SS`) |
| `currentJob.finishAt` | Estimated finish time (local `YYYY-MM-DD HH:MM`) |
| `currentJob.currentLine` / `totalLines` | G-code line progress |
| `modules.enclosure` | Enclosure attached |
| `modules.rotary` | Rotary module attached |
| `modules.emergencyStop` | Emergency stop button attached |
| `modules.airPurifier` | Air purifier attached |
| `enclosure.doorOpen` | Enclosure door open |
| `enclosure.ready` | Enclosure reports ready (only with an enclosure) |
| `enclosure.doorDetection` | Door detection enabled (only with an enclosure) |
| `enclosure.light` | Enclosure light brightness in % (only with an enclosure) |
| `enclosure.fan` | Enclosure fan speed in % (only with an enclosure) |
| `laser.modulePower` | Rated laser module power (W) from connect `headType` (3→1.6, 4→10, 6→20, 7→40, 9→2; `0` if not laser) |
| `laser.power` | Laser power (%) — last non-zero value while job is `RUNNING`/`PAUSED` (no 0% flicker between vectors) |
| `laser.powerRaw` | Laser power (%) — live snapshot from the machine (can be `0` between lines) |
| `laser.on` | `true` while live power is greater than 0 |
| `laser.workSpeed` | Work speed (`mm/min`) |
| `laser.focalLength` | Laser focal length as reported by the machine (mm) |
| `laser.errorState` | Laser module error state (`0` = OK) |
| `laser.camera` | Laser camera detected |

Job fields are filled while a job is active; idle machines may leave them empty / zero. For a finer live laser view, lower the poll interval (e.g. 2–3 s) and use `laser.powerRaw` / `laser.on`.

The enclosure endpoint is only polled when an enclosure is detected (`modules.enclosure`), because machines without an enclosure return meaningless default values. The `modules.*` states are filled only if the firmware reports a module list.

## Support

If you like our work and would like to support us, we appreciate any donation.
(This link leads to our PayPal account and is not affiliated with ioBroker.)

[![Donate](https://github.com/inventwo/ioBroker.snapmaker/blob/main/img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-11-18)
- (skvarel) Added `currentJob.fileBase` (job file name without extension)

### 0.5.3 (2026-11-17)
- (skvarel) Bump `@iobroker/testing` to 6.3.2 (`S0064`)

### 0.5.2 (2026-11-15)
- (skvarel) Clamp poll interval in code (min 2 s, max so timeout stays within setTimeout limits)

### 0.5.1 (2026-11-14)
- (skvarel) Fixed state roles: use `value` instead of `level` for read-only laser/enclosure percent states (`E1011`)

### 0.5.0 (2026-11-13)
- (skvarel) Added `laser.focalLength`, `laser.errorState`, `laser.camera`
- (skvarel) Added `currentJob.estimatedTime` / `estimatedText`
- (skvarel) Added `modules.*` (enclosure, rotary, emergency stop, air purifier) and `enclosure.ready` / `doorDetection` / `light` / `fan`
- (skvarel) Set `info.connection` to `false` on adapter stop
- (skvarel) Fixed `laser.modulePower` / `info.toolHead`: use connect `headType` (10W module was shown as 1.6W)

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