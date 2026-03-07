![Logo](admin/autodarts.svg)
## Adapter for Autodarts Integration

![Number of Installations](https://iobroker.live/badges/autodarts-installed.svg) ![Current version in stable repository](https://iobroker.live/badges/autodarts-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.autodarts.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.autodarts)
[![Downloads](https://img.shields.io/npm/dm/iobroker.autodarts.svg)](https://www.npmjs.com/package/iobroker.autodarts)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)


## What this adapter does

Connects to your local Autodarts Board Manager (via IP and port, e.g. `192.168.x.x:3180`) and exposes ioBroker states for home automation:

- Turn on lights when a game starts
- Play a sound on a bullseye
- Announce the next throw via text-to-speech (TTS)
- Control board hardware (lighting, power)
- Trigger any other ioBroker automation based on dart events

## Documentation

- 🇺🇸 [Documentation](./docs/en/README.md)
- 🇩🇪 [Dokumentation](./docs/de/README.md)


## Features

### Game State & Throws
- **`visit.score`**: Total score of the last complete visit (3 darts)
- **`throw.current`**: Numeric score of the last thrown dart
- **`trigger.isTriple`**: Boolean flag for triple hits within configurable segment range (default: 1–20)
- **`trigger.isDouble`**: Boolean flag for double hits only (all segments)
- **`trigger.isBullseye`**: Boolean flag for bullseye hits only
- **`trigger.isMiss`**: Boolean flag that is true when the dart does not hit any valid scoring segment (pure miss, no score)

### Board Status
- **`status.boardStatus`**: Status indicator of board event (e.g. `"Stopped"`, `"Calibration finished"`, `"Started"`).
- **`status.trafficLightColor`**: HEX color of current board status
- **`status.trafficLightState`**: Status indicator
  - `green` = Player may throw
  - `yellow` = Remove darts
  - `red` = Board offline/error

### System Information
- **`system.software.*`**: Autodarts versions (boardVersion, desktopVersion), OS and platform details
- **`system.hardware.*`**: CPU model, kernel architecture, hostname
- **`system.cams.cam0/1/2`**: Camera configuration (width, height, fps) as JSON

### Hardware Control
- **`system.hardware.light`**: Control board lighting (bidirectional with external states)
- **`system.hardware.power`**: Control board power (bidirectional with external states)

### Runtime Configuration
- **`config.tripleMinScore/tripleMaxScore`**: Adjust triple trigger thresholds during runtime
- **`config.triggerResetSec`**: Auto-reset time for triple/double/bullseye/miss flags

### Tools Addon Integration
- **`tools.RAW`**: Input state used to receive events from browser tools (e.g. busted, gameon, gameshot, 180, matchshot, takeout).
- **`trigger.is180/isBusted/isGameon/isGameshot/isMatchshot/isTakeout`**: Read-only trigger flags set when corresponding events received via `tools.RAW`.
- **`tools.config.url*`**: Pre-generated HTTP URLs (simple-api calls) that can be copied into Tools for Autodarts browser extension.

## What this adapter does NOT do

- ❌ No data is sent to the internet or to third-party servers
- ❌ No history, statistics, or personal data is stored or shared
- ❌ No access to other people's boards or remote boards over the internet
- ❌ No cloud features or analytics

All data stays local on your ioBroker system.

## Configuration

![Configuration Screenshot](docs/config-screenshot.png)

### The adapter settings are split into four tabs: **OPTIONS**, **MAPPINGS**, **TOOLS ADDON INTEGRATION** and **HELP & FAQ**.

### Tab: OPTIONS

In **OPTIONS** you configure how the adapter connects to your local Autodarts Board Manager and how often it polls data:

- **Board Manager IP**  
  IP address of your Autodarts Board Manager (e.g. `192.168.178.50` or `127.0.0.1`).

- **Port**  
  TCP port of the Board Manager (usually `3180`).

- **Triple trigger range**  
  Two dropdowns to define the **minimum** and **maximum** field number (1–20) that should be considered for `trigger.isTriple`.  
  Triples outside this range will not trigger the flag.

- **Trigger reset (s)**  
  Time in seconds after which triple, double, bullseye and miss flags are reset.  
  `0` means no automatic reset.

- **Polling interval (s)**  
  How often the adapter polls the Board Manager for new data (e.g. `0.5`, `1`, `2` seconds).

### Tab: MAPPINGS

In **MAPPINGS** you can link existing ioBroker states to the hardware related adapter states:

- **Light Target ID**  
  ioBroker state ID that is synchronized with `system.hardware.light`  
  (e.g. `0_userdata.0.Autodarts.LIGHT` or a state of a smart light/LED ring).

- **Power Target ID**  
  ioBroker state ID that is synchronized with `system.hardware.power`  
  (e.g. `0_userdata.0.Autodarts.POWER` or a state of a smart plug).


When configured, changes on either side (adapter state or external state) are synchronized bidirectionally so you can both control the board from ioBroker and react on board events.

### Tab: TOOLS ADDON INTEGRATION
- Configure IP, port and instance so the adapter can generate HTTP URLs that point to your ioBroker simple-api endpoint.
​
- The final URLs for Busted, Game On and Gameshot are exposed as states under autodarts.X.tools.config.urlBusted/urlGameon/urlGameshot and can be copied into the Tools for Autodarts browser extension.

### Tab: HELP & FAQ

In **HELP & FAQ** you will find general information and help about the adapter and its configuration.


## Privacy & Data Handling

- This adapter only reads data from your **local** Autodarts Board Manager in your own network.
- No personal data is sent to external servers or stored in the cloud.
- All data stays on your own system; no statistics or throw history are collected or shared.
- This adapter is designed to work only with your own dartboard, not with remote or other people’s boards.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.0.7 (2026-03-01)
- (skvarel) CI/CD: Updated GitHub Copilot instructions template to version 0.5.7 with latest ioBroker best practices (fixes #21, #25)

### 1.0.6 (2026-02-28)
- (skvarel) TESTING: Fixed test cleanup issues - added settled flag to httpHelper for proper Promise handling and --exit flag to test script to prevent hanging tests

### 1.0.5 (2026-02-28)
- (skvarel) FIXED: Updated outdated dependencies - release-script packages to v5.1.x and admin globalDependency to v7.6.20 (fixes #23)

### 1.0.4 (2026-01-24)
- (skvarel) FIXED: Reverted to setState() from deprecated setStateAsync()

### 1.0.3 (2026-01-21)
- (copilot) FIXED: Use setStateAsync() instead of setState() for trigger resets in throw.js to ensure database reliability
- (copilot) ENHANCED: Corrected API endpoints in copilot-instructions.md - now documents /api/state, /api/config, /api/host, /api/version correctly
- (copilot) TESTING: Added comprehensive unit tests for core modules (throw, visit, config, trafficLight, httpHelper)

## Older changes
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 skvarel <sk@inventwo.com>

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
