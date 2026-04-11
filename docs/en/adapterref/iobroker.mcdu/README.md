![Logo](admin/mcdu.png)
# ioBroker.mcdu

[![NPM version](https://img.shields.io/npm/v/iobroker.mcdu.svg)](https://www.npmjs.com/package/iobroker.mcdu)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mcdu.svg)](https://www.npmjs.com/package/iobroker.mcdu)
![Number of Installations](https://iobroker.live/badges/mcdu-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/mcdu-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.mcdu.png?downloads=true)](https://nodei.co/npm/iobroker.mcdu/)

**Tests:** ![Test and Release](https://github.com/Flixhummel/ioBroker.mcdu/workflows/Test%20and%20Release/badge.svg)

## MCDU Smart Home Adapter for ioBroker

Control your smart home through a WINWING MCDU-32-CAPTAIN aviation cockpit display via MQTT. This project levels up your smarthome with an authentic airline-style interface with scratchpad input, page navigation, confirmation dialogs, and a 14x24 character display with 8 colors.

We all were there before: Mounting tablets on walls for smarthome control, messing with cumbersome visualizations, taking ages to get to the right switch to control a lightbulb.
Having a pilot in my family I had an immediate incling when I saw the cockpit MCDU: Easy concept for data entry, quick selection of the right data point. And then I found a fantastic product from Winwing https://eu.winctrl.com/view/goods-details.html?id=945 and started with the reverse engineering. shout out to https://github.com/alha847 for the information provided on the device.

As I am not a developer but a tech geek, I used claude code in a structured way. first for gathering information on the device and reverse engineering it, then for structuring the right architecture for the smart home context and then developing the adapter for iobroker and the client for the raspberry.
Thanks and shout outs to the great open source community, especially https://github.com/klein0r and his great videos on adapter development and iobroker smarthome applications of all sorts.

this is the first version of the adapter and client. I still have to test it properly and make some improvements. Feel free to contribute to it.

### Architecture

```
ioBroker Adapter (main.js)  <-->  MQTT Broker  <-->  RasPi Client (mcdu-client/)  <-->  USB HID Hardware
```

The ioBroker adapter runs all business logic (page rendering, input handling, validation). The Raspberry Pi client is a "dumb terminal" that bridges MQTT messages to the USB HID hardware -- it contains no business logic.

### Features

- **14x24 character display** with 8 colors (white, amber, cyan, green, magenta, red, yellow, grey)
- **73 buttons** including 12 Line Select Keys, 12 function keys, full alphanumeric keypad
- **11 LEDs** (9 indicators + 2 backlights with BRT/DIM brightness control)
- **Per-line color control**: independent colLabel and colData colors, per-page status bar color
- **Aviation-style input**: scratchpad on line 14, LSK-based field selection, OVFY confirmation
- **Page system**: configurable pages with sub-labels, automatic pagination, layout types (menu/data/list)
- **Function keys**: 11 configurable keys (MENU, INIT, DIR, FPLN, PERF, etc.) with per-device mapping
- **Navigation**: parent hierarchy, breadcrumb status bar, circular SLEW, CLR-to-parent
- **Validation engine**: keystroke, format, range, and business logic validation levels
- **Confirmation dialogs**: soft (LSK or OVFY) and hard (OVFY only) for critical actions
- **Multi-device support**: multiple MCDUs via per-device MQTT topic namespaces
- **32 automation states**: LED control, scratchpad, notifications, button triggers from ioBroker scripts

### Development Status

| Phase | Status |
|-------|--------|
| Adapter Foundation (MQTT, state tree, display) | Done |
| Input System (scratchpad, validation, confirmation) | Done |
| Business Logic (rendering, pagination, function keys) | Done |
| Admin UI Redesign + Left/Right Line Model | Done |
| UX Phase A: Function Key Configuration | Done |
| UX Phase B: Navigation Hierarchy & Breadcrumbs | Done |
| UX Phase C: Page Layout Types (menu/data/list) | Done |
| Display Enhancement (color split, brightness, device states) | Done |
| UX Phase D: Quick Access Page | Not started |
| UX Phase E: LED Assignment Configuration | Not started |
| UX Phase F: Configuration Profiles | Not started |
| UX Phase G: Admin UI Polish & Integration | Not started |
| Hardware Deployment Testing | Not started |

199 tests passing (188 unit + 11 integration).

### Recommended Hardware (mcdu-client)

The mcdu-client is a lightweight Node.js process (~50-100MB RAM) that bridges MQTT to USB HID. It needs WiFi, a USB Host port, and enough USB power for the MCDU (~500mA).

| Board | Price | WiFi | USB Host | Verdict |
|-------|-------|------|----------|---------|
| **Raspberry Pi 4 (1-2GB)** | $35-45 | Dual-band | 4x USB-A | **Recommended** -- best balance of price, power, and simplicity |
| Raspberry Pi 3B+ | ~$35 | Dual-band | 4x USB-A | Proven (current dev setup), slightly slower |
| Raspberry Pi 5 | $50-80 | Dual-band | 4x USB-A | Good, but needs official 27W PSU for full USB power output |
| Raspberry Pi Zero 2 W | ~$15 | 2.4GHz | OTG adapter needed | Cheap but fiddly single-port OTG setup |
| ESP32-S3 | $5-15 | Yes | USB OTG | Cannot run Node.js -- would require full C++ rewrite |

**Key constraint**: The WinWing MCDU firmware requires SET_REPORT control transfers (not interrupt OUT). The mcdu-client uses `node-hid` which handles this automatically on all platforms (IOHIDManager on macOS, hidraw on Linux).

### Quick Start (Development)

```bash
npm install
npm test          # Run all tests
npm run lint      # ESLint
npm run check     # Lint + test combined
```

For detailed documentation, see [docs/](docs/README.md).

### Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests |
| `npm run test:unit` | Unit tests only |
| `npm run test:integration` | Integration tests only |
| `npm run test:watch` | Watch mode for unit tests |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm run check` | Lint + test combined |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (Flixhummel) Address ioBroker adapter review feedback (reviewer McM1957)
* (Flixhummel) Migrate to ESLint 9 flat config with @iobroker/eslint-config v2.2.0
* (Flixhummel) MQTT password now stored encrypted -- users must re-enter password once after updating
* (Flixhummel) Fix object hierarchy: `devices` container changed from channel to folder
* (Flixhummel) Fix 12+ state roles to match ioBroker standards
* (Flixhummel) Replace native setTimeout/setInterval with adapter equivalents
* (Flixhummel) Consolidate i18n translations to flat JSON files, move i18n.js to scripts/
* (Flixhummel) Remove unused admin/jsonConfig-complexversion.json

### 0.2.0 (2026-02-28)
* (Flixhummel) Fix error display for read-only datapoints, improve save config handling

### 0.1.9 (2026-02-27)
* (Flixhummel) Unify MCDU driver to node-hid on all platforms, clean up mcdu-client setup

### 0.1.8 (2026-02-26)
* (Flixhummel) Remove unpublished news entries and add missing jsonConfig size attributes

### 0.1.7 (2026-02-25)
* (Flixhummel) Fix ioBroker repository checker errors and warnings

### 0.1.4 (2026-02-25)
* (Flixhummel) Switch to npm trusted publishing (OIDC) for automated releases

### 0.1.3 (2026-02-25)
* (Flixhummel) Initial npm release with MQTT bridge, page system, admin UI, and automation states

For detailed changelog see [CHANGELOG.md](CHANGELOG.md).

## License
MIT License

Copyright (c) 2026 Flixhummel <hummelimages@googlemail.com>

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