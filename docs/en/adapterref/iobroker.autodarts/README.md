![Logo](admin/autodarts.svg)

# ioBroker adapter for AUTODARTS

![Number of Installations](https://iobroker.live/badges/autodarts-installed.svg) ![Current version in stable repository](https://iobroker.live/badges/autodarts-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.autodarts.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.autodarts)
[![Downloads](https://img.shields.io/npm/dm/iobroker.autodarts.svg)](https://www.npmjs.com/package/iobroker.autodarts)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)](https://github.com/inventwo/ioBroker.autodarts/blob/main/.cursor/iobroker-adapter.mdc)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## What this adapter does

Connects to Autodarts and exposes ioBroker states for home automation:

- Turn on lights when a game starts
- Play a sound on a bullseye
- Announce the next throw via text-to-speech (TTS)
- Control board hardware (lighting, power)
- Trigger any other ioBroker automation based on dart events

## Compatibility

| Mode | Autodarts version | How it connects |
|------|-------------------|-----------------|
| **Local** (default) | Board Client / Desktop **before v2** | Polls local `IP:3180` (`/api/state`) |
| **Cloud** | Autodarts **v2.0+** (Desktop / Terminal) | Autodarts cloud WebSocket (login + board ID) |

**Autodarts v2.0+:** The Board Manager web UI is deprecated. The local API on port `3180` may still answer (connection, cameras, board status), but it **no longer provides throw data** (`throws` / `numThrows`). Use **Cloud** connection mode for throw detection on v2.

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

- ❌ No history, statistics, or personal data is stored beyond what ioBroker keeps in states
- ❌ No access to other people's boards
- ❌ No analytics

**Privacy by mode**

- **Local mode:** All board data stays on your network; nothing is sent to Autodarts servers by this adapter.
- **Cloud mode:** The adapter authenticates with your Autodarts account and receives board/match events from Autodarts servers. Credentials stay in the adapter config; do not enable 2FA for that account if password login is used.

## Configuration

![Configuration Screenshot](docs/config-screenshot.png)

### The adapter settings are split into four tabs: **OPTIONS**, **MAPPINGS**, **TOOLS ADDON INTEGRATION** and **HELP & FAQ**.

### Tab: OPTIONS

In **OPTIONS** you configure how the adapter connects to Autodarts:

- **Connection mode**  
  - `local` — poll the board client on your LAN (`IP:port`, default for Autodarts before v2)  
  - `cloud` — Autodarts account + board ID (required for Autodarts v2 throw detection)

- **Board host/IP** (local mode)  
  IP address of your Autodarts PC (e.g. `192.168.178.50` or `127.0.0.1`).

- **Port** (local mode)  
  TCP port of the board client (usually `3180`).

- **Cloud email / password / board ID** (cloud mode)  
  Your Autodarts login and the board ID from **My Boards** on [play.autodarts.io](https://play.autodarts.io).  
  How to find the board ID: sign in → **Boards** / **My Boards** → open your board → copy the UUID board ID.  
  Details: [English FAQ](./docs/en/faq.md) / [German FAQ](./docs/de/faq.md). Disable 2FA if password login fails.

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

- **Local mode:** The adapter only reads data from your Autodarts board client on your own network.
- **Cloud mode:** The adapter connects to Autodarts servers with your account to receive board/match events (needed for Autodarts v2).
- No statistics or throw history are collected or shared by this adapter beyond ioBroker states.
- This adapter is designed to work only with your own dartboard.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.1.0 (2026-09-26)
- (skvarel) Documented Autodarts v2 incompatibility for local throw detection
- (skvarel) Added optional cloud connection mode for Autodarts v2 throw events
- (skvarel) Documented how to find the Autodarts board ID for cloud / v2 setup

### 1.0.12 (2026-06-28)
- (skvarel) Fixed admin i18n labels flagged as untranslated by the repository checker (fixes #67)

### 1.0.11 (2026-06-10)
- (skvarel) Added meta object types for adapter and instance namespace

### 1.0.10 (2026-06-05)
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules
- (skvarel) Updated @alcalzone/release-script to 5.2.1 (fixes #59)
- (skvarel) Replaced plain setInterval() and setTimeout() with adapter-managed this.setInterval(), adapter.setTimeout() and corresponding clear methods (fixes #59)

### 1.0.9 (2026-05-25)
- (skvarel) Adapter requires node.js >= 22 now
- (skvarel) Updated @alcalzone/release-script und Plugins auf 5.2.0 aktualisiert (fixes #56)
- (skvarel) Downgraded @types/node auf ^22.0.0 heruntergestuft (fixes #56)

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