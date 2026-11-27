---
chapters: {"pages":{"en/adapterref/iobroker.bambulab/README.md":{"title":{"en":"ioBroker.bambulab"},"content":"en/adapterref/iobroker.bambulab/README.md"},"en/adapterref/iobroker.bambulab/docs/CLOUD.md":{"title":{"en":"Cloud-Verbindung (Fork / geplanter Upstream)"},"content":"en/adapterref/iobroker.bambulab/docs/CLOUD.md"},"en/adapterref/iobroker.bambulab/DEV.md":{"title":{"en":"Entwicklung (Fork Cloud)"},"content":"en/adapterref/iobroker.bambulab/DEV.md"},"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md":{"title":{"en":"Nachricht an Maintainer (Issue #186) – zum Kopieren"},"content":"en/adapterref/iobroker.bambulab/MAINTAINER_HANDOFF.md"}}}
---
<img src="admin/bambulab.png" alt="Logo" width="200"/>

# ioBroker.bambulab

[![NPM version](https://img.shields.io/npm/v/iobroker.bambulab.svg)](https://www.npmjs.com/package/iobroker.bambulab)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bambulab.svg)](https://www.npmjs.com/package/iobroker.bambulab)
![Number of Installations](https://iobroker.live/badges/bambulab-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bambulab-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)](https://nodei.co/npm/iobroker.bambulab/)

**Tests:** ![Test and Release](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Bambulab 3D-Printing adapter for ioBroker

## Getting started

With credits to [kmxak](https://forum.iobroker.net/user/kmxak), [djalexz](https://forum.iobroker.net/user/djalexz), all other involved and inspired by [this forum thread](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration)
this adapter integrates Bambulab 3D-Printers into ioBroker.

Choose **connection mode** in the adapter admin:

### LAN (default)

Provide printer **IP address**, **LAN access code** (API token), **serial number**, and **model**.  
Required for **full control** (fans, temperatures, G-code). On **H2D**, enable **developer mode (3D print)** on the printer when using third-party control over LAN.

Credentials are stored locally and not shared with third parties.

### Cloud (optional, Bambu account)

Uses the same cloud MQTT broker as the Bambu app / Home Assistant ([issue #186](https://github.com/DrozmotiX/ioBroker.bambulab/issues/186)):

- **Email code login** (Google/OAuth-friendly); token stored under the adapter instance data directory.
- **Default remains LAN** for new instances.
- **Cloud** = mainly **monitoring** and **limited control** (e.g. chamber LED). On **H2D**, firmware often **rejects** remote `print.*` (fans, pause, G-code); see state `info.cloudPrintControlBlocked`.
- Details: [`docs/CLOUD.md`](/#/docs/adapterref/iobroker.bambulab/docs/CLOUD.md) (German/English).

## Finding the API Token and Serial Number

The location of the API token and serial number depends on your printer model:

### A1/A1 mini Series
1. Navigate to **Settings** → **Network** on your printer display
2. Enable **"LAN Mode Only"** (nur Lan-Modus)
3. Once enabled, IP address, access token, and serial number will be displayed

### P1S Series  
1. Navigate to **Settings** → **Network** on your printer display
2. The access token is directly visible in network settings (no LAN mode required)
3. Serial number can be found in the same menu or in device information

### X1/X1C Series
1. Navigate to **Settings** → **Network** on your printer display  
2. The access token is directly visible in network settings
3. Serial number can be found in the same menu or in device information

**Note:** You must select your Printer model correctly in the adapter settings. X1 and H2 series push messages after the initial request, while P1x series needs to request by interval setting (default every 5 seconds).

## Supported models
| Printer-Model | Status                  |
|---------------|-------------------------|
| AMS           | :white_check_mark:      |
| A1            | :white_check_mark:      |
| H2C           | :white_check_mark:      |
| P1p           | :white_check_mark:      |
| P1s           | :white_check_mark:      |
| X1            | :white_check_mark:      |

## Supported commands
| Command            | X1C                 | X1                  | P1P                      | P1S                      | A1                       |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
| Custom g-code      | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |
| Pause              | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |
| Resume             | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |
| Stop               | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |
| Fan-Aux            | :white_check_mark:  | :white_check_mark:  | :interrobang: if present | :white_check_mark:       | :x: No hardware support  |
| Fan-Chamber        | :white_check_mark:  | :white_check_mark:  | :interrobang: if present | :white_check_mark:       | :x: No hardware support  |
| Fan-ToolHead       | :white_check_mark:  | :white_check_mark:  | :interrobang: if present | :white_check_mark:       | :white_check_mark:       |
| Light-Chamber      | :white_check_mark:  | :white_check_mark:  | :interrobang: if present | :white_check_mark:       | :white_check_mark:       |
| Light-Logo         | :white_check_mark:  | :white_check_mark:  | :x: No hardware support  | :x: No hardware support  | :x: No hardware support  |
| Temperature-Bed    | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |
| Temperature-Nozzle | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |
| Speed Level        | :white_check_mark:  | :white_check_mark:  | :white_check_mark:       | :white_check_mark:       | :white_check_mark:       |

## To-Do
[ ] Restructure/complete current control states in control folder
[ ] Optimize state attributes definitions  

## Support me
If you like my work, please consider a personal donation  
(this is a personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or any other Code error happens,
this error message that also appears in the ioBroker log is submitted to Sentry.
When you allow iobroker GmbH to collect diagnostic data, then also your installation ID
(this is just a unique ID **without** any additional infos about you, email, name or such) is included.
This allows Sentry to group errors and show how many unique users are affected by such an error.
All of this helps me to provide error-free adapters that basically never crash.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 0.5.0 (2026-11-25)
* (crunchip77) Optional Bambu Cloud MQTT connection: email code login, credentials stored per adapter instance, LAN (printer IP + access code) stays the default. See `docs/CLOUD.md` for limits (#186, #294)
* (crunchip77) H2D: cloud vs. LAN behaviour tested and documented, new state `info.cloudPrintControlBlocked` when the firmware rejects remote print commands (#294)
* (FiraSenax) Add H2C printer support: local MQTT, firmware and module discovery, dual-nozzle current and target temperatures (#272)
* (mono1982-runner1) Add state attribute for extruder `z_bias` (X2D/H2D dual nozzle) (#317)
* (crunchip77) AMS empty slots: stale filament data (type, colour, weight, `remain_g`, H2D extras) is reset, also via `tray_exist_bits` when the firmware keeps old tray JSON (#204, #296)
* (crunchip77) AMS/filament state names: `remain` in % instead of print time, drying profile vs. `dry_time`, clearer `tray_weight`/`total_len`, `remain_g` estimate (#295)
* (crunchip77) Second AMS unit (`ams_exist_bits` 3) is processed again; MQTT type normalisation for `err2.err_code` and nozzle `tar_id` stops the log spam on H2D (#292, #295)
* (FiraSenax) Restore JavaScript type checking and refresh the runtime dependency lock (#273, #274)
* (DutchmanNL & Copilot) Update all dependencies to latest versions, consolidating 17 Dependabot PRs (#246)
* (DutchmanNL & Copilot) Synchronize admin translations with jsonConfig.json, add missing translations and remove orphaned keys (#202, #248)
* (DutchmanNL & Copilot) Fix ESLint errors and establish a lint-first validation workflow (#244)
* (DutchmanNL) Raise minimum Node.js to 22, modernise CI (Node 24, testing-action-check v2) and release tooling, resolve repository checker findings (#277, #278)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (ioBroker-Bot) Template updates: tests on Node.js 22 to 26, Dependabot automerge and settings, `CHANGELOG_OLD.md` (#279, #280, #281, #282, #285, #293)

### 0.4.3 (2025-09-16)
* (DutchmanNL) Improve error messages if printer is offline or not reachable.
* (DutchmanNL) Added HD2 printer to the selection menu for easier access (#142)
* (DutchmanNL) Solve several type definition issues. #203, #202, #201, #200, #199, #198
* (DutchmanNL) Implemented a buffer system to reduce CPU usage and improve performance (#145)
* (DutchmanNL & Copilot) Fix type conversion errors by replacing deprecated `tonumber` with proper `TOINTEGER`/`TOFLOAT` modifiers. #197
* (DutchmanNL & Copilot) Add missing state attribute definitions for HD2 printer during printing (height, platform, tool, mapping). Fixes #194
* (DutchmanNL & Copilot) Fix repository checker issues: update devDependencies to latest versions and correct news entries

### 0.4.1 (2025-09-13)
* (DutchmanNL & Copilot) Fix HMS error code translations timeout error handling (#183)
* (DutchmanNL & Copilot) Block dangerous G-code commands during printing for safety (#185)
* (DutchmanNL & Copilot) Fix P1S fan speed display issues - double conversion and incorrect mapping (#184)
* (DutchmanNL & Copilot) Add comprehensive API token location documentation for all Bambulab printer models (#182)

### 0.4.0 (2025-09-13)
* (DutchmanNL) Add missing state definitions to resolve adapter warnings (#181)
* (DutchmanNL) Empty finishTime and avoid time calculation when not printing (#179)
* (DutchmanNL) Fix MQTT reconnection to prevent maximum call stack size exceeded error (#177)

### 0.3.5 (2025-09-13)
* (DutchmanNL & Copilot) Fix several type mismatches #143 #139 #130
* (DutchmanNL) Updated missing definitions for full MQTT API incl H2D
* (DutchmanNL & Copilot) Fix repository checker issues and improve admin UI compatibility

Older changes can be found at CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2025-2026 DutchmanNL <oss@drozmotix.eu>

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