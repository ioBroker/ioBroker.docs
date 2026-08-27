![Logo](admin/creality.png)

# ioBroker adapter for CREALITY 3D printer

![Number of Installations](https://iobroker.live/badges/creality-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/creality-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.creality.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.creality)
[![Downloads](https://img.shields.io/npm/dm/iobroker.creality.svg)](https://www.npmjs.com/package/iobroker.creality)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/topic/85199/test-adapter-creality-latest)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)](https://github.com/inventwo/ioBroker.creality/blob/main/.cursor/iobroker-adapter.mdc)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## What this adapter does

Connects Creality Klipper printers (primary target: **[SPARKX i7](https://store.creality.com/products/sparkx-i7-3d-printer)** with CFS lite) to ioBroker via two local APIs:

1. **Moonraker HTTP** (default port `7125`) — print stats, temperatures, fans, CFS filament box, G-code
2. **Creality WebSocket** (default port `9999`) — toolhead LED, pause / resume / stop, leveling / self-test UI state, remaining time (`printLeftTime`)

Moonraker alone is not enough for Creality UI states (e.g. leveling while Klipper still reports `standby`) or the toolhead light.

Manufacturer: [Creality](https://www.creality.com/). Other Creality Klipper models may work best-effort; only SPARKX i7 has been tested so far.

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| Host / IP | — | Printer address (required) |
| Moonraker HTTP port | `7125` | Fluidd reverse proxy often uses `4408` |
| Creality WebSocket port | `9999` | Toolhead LED & print controls |
| Poll interval | `5` s | Moonraker poll (min. 2 s) |
| API key | empty | Optional Moonraker auth |
| Print controls / CFS / Fans | on | Feature toggles for state tree |

One printer per adapter instance.

## Data points

Under `creality.<instance>.*` (examples):

| State | Description |
|-------|-------------|
| `state` / `stateKlipper` / `selfTestStep` | UI / Klipper status |
| `currentJob.*` | Progress, file, times, layers, feed/flow, active filament |
| `info.*` | Model, firmware, hostname, SN, disk, print hours/jobs, errors |
| `temp.*` | Nozzle, bed, box/chamber |
| `fans.partCooling` | Part cooling **UI %** (matches slicer / printer display; Creality `fan0_min` remapping) |
| `fans.partCoolingPwm` | Part cooling **PWM %** (raw hardware duty cycle from Moonraker) |
| `fans.*` / `cfs.*` | Other fans / CFS (optional) |
| `control.light` / `sleepMode` / `pause` / `resume` / `stop` | Controls |
| `webcam.available` | Camera present (read-only; local API cannot power it off on SPARKX i7) |
| `webcam.streamUrl` | URL for VIS iframe (Creality WebRTC page, default `http://<host>:8000`) |
| `webcam.webrtcUrl` | WebRTC signaling endpoint |

**Webcam note:** SPARKX uses WebRTC on port `8000`, not classic MJPEG. `webcam.streamUrl` points at the Creality viewer page — usable in a VIS iframe if the browser can reach the printer IP. For Home Assistant / go2rtc use `webcam.webrtcUrl`.

## Support


If you like our work and would like to support us, we appreciate any donation.
(This link leads to our PayPal account and is not affiliated with ioBroker.)

[![Donate](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Changelog

<!--
	### **WORK IN PROGRESS**
-->
### 0.4.1 (2026-08-25)
- (skvarel) Fixed `currentJob.filament*` for external spool holder (`filament_rack`) when CFS is not active

### 0.4.0 (2026-08-20)
- (skvarel) Adapter requires admin >= 7.8.23 now.

### 0.3.0 (2026-08-14)
- (skvarel) Fixed button states `control.pause|resume|stop` to use `read: false`
- (skvarel) Added manufacturer / SPARKX i7 product links to README
- (skvarel) Modified CFS temperature/humidity roles to `value.temperature` / `value.humidity`
- (skvarel) Modified Moonraker poll loop to use `setTimeout` chain instead of `setInterval`
- (skvarel) Modified `currentJob.finishAt` to include local date (`YYYY-MM-DD HH:MM`)

### 0.2.0 (2026-08-08)
- (skvarel) Fixed part cooling fan % to match slicer/display (Creality fan0_min remapping)
- (skvarel) Added `fans.partCoolingPwm` for raw PWM duty cycle

### 0.1.4 (2026-08-02)
- (skvarel) Fixed string state roles for repository object check

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