![Logo](admin/goodwe.png)
# ioBroker.goodwe

[![NPM version](https://img.shields.io/npm/v/iobroker.goodwe.svg)](https://www.npmjs.com/package/iobroker.goodwe)
[![Downloads](https://img.shields.io/npm/dm/iobroker.goodwe.svg)](https://www.npmjs.com/package/iobroker.goodwe)
![Number of Installations](https://iobroker.live/badges/goodwe-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/goodwe-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.goodwe.png?downloads=true)](https://nodei.co/npm/iobroker.goodwe/)

**Tests:** ![Test and Release](https://github.com/typhosj/ioBroker.goodwe/workflows/Test%20and%20Release/badge.svg)

## goodwe adapter for ioBroker

Communication with GoodWe Inverter ET/EH/BH/BT Series

Manufacturer: [GoodWe](https://www.goodwe.com/)

This adapter is based on the original work by Thomas Schönberger.

## Requirements

* Node.js 22 or newer
* js-controller 6.0.11 or newer
* admin 7.8.23 or newer

## Supported data

The adapter reads the GoodWe EMS Modbus protocol v1.7 register blocks for ET/EH/BH/BT devices:

* Device information, including optional SIMCCID
* Running data
* External communication and extended meter data
* Flash information
* BMS information and BMS detailed information
* CEI auto test information
* Power limit information

Raw register values are kept as ioBroker states. Mode values are numeric states with ioBroker enum labels. Important bitfields are also exposed as decoded text states, for example active inverter errors, diagnostic status, BMS alarms and DRM status.

## Important states

| State area | Description |
| --- | --- |
| `DeviceInfo.*` | Inverter protocol, rated power, serial number, device type and firmware data |
| `RunningData.PV1.*` ... `RunningData.PV4.*` | PV voltage, current, power and mode |
| `RunningData.GridL1.*` ... `RunningData.GridL3.*` | Grid voltage, current, frequency and power |
| `RunningData.BackUpL1.*` ... `RunningData.BackUpL3.*` | Back-up output voltage, current, frequency, power and mode |
| `RunningData.Battery1.*` | Battery voltage, current, power and mode |
| `RunningData.*Energy*` | Daily and total energy counters |
| `RunningData.*Mode`, `RunningData.GridMode`, `RunningData.WorkMode`, `RunningData.OperationMode` | Numeric mode states with ioBroker enum labels |
| `RunningData.ErrorMessageActive` | Active inverter error bits as text |
| `RunningData.DiagStatusActive` | Active diagnostic bits as text, decoded from `RunningData.DiagStatusL` |
| `RunningData.DiagStatusH` | High word of the diagnostic status, kept as a raw number because the GoodWe protocol defines no bits for it |
| `ExtComData.*` | Smart meter and communication data |
| `BMSInfo.*` | BMS status, SOC, SOH, error and warning data |
| `BMSInfo.ErrorCodeActive` | Decoded BMS alarm bitfield |
| `BMSInfo.WarningCodeActive`, `BMSInfo.DRMStatusActive` | Decoded BMS warning and DRM bitfields when extended BMS polling is enabled |
| `FlashInfo.*` | Flash version and write-count information if enabled and supported by the inverter |
| `BMSDetail.*` | Detailed BMS values if enabled and supported by the inverter |
| `CEIAutoTest.*` | CEI auto test values if supported by the inverter |
| `PowerLimit.*` | Power limit and dispatch values if enabled and supported by the inverter |

## Configuration

* `ipAddr`: IP address of the inverter.
  Empty on fresh installations. The adapter validates this as a usable IPv4 host address on startup.
* `discoverySubnet`: Optional `/24` subnet for network discovery, for example `192.168.178.0/24`.
* `pollCycle`: Base poll cycle in seconds.
* `timeoutMs`: UDP request timeout in milliseconds, from 1000 to 30000.
* `retries`: Retry count per UDP request, from 0 to 5.
* `pollExtended`: Master switch for optional register groups.
* `pollSimccid`: Enables optional SIMCCID polling.
* `pollExtendedMeter`: Enables extended meter registers.
* `pollFlashInfo`: Enables flash information registers.
* `pollBmsExtended`: Enables extended BMS information registers.
* `pollBmsDetail`: Enables BMS detail registers, if supported by the inverter.
* `pollCeiAutoTest`: Enables CEI auto test registers.
* `pollPowerLimit`: Enables power limit registers, if supported by the inverter.

The basic settings page also provides discovery helpers:

* `Inverter IP`: Stores only the inverter IPv4 address.
* `Validate inverter IP`: Checks the configured address and sends the GoodWe ID request to UDP port 8899.
* `Discover inverters`: Scans the configured `/24` subnet for GoodWe devices on UDP port 8899 and displays found inverters with IP address, model name, serial number and version information when provided by the inverter.

## Troubleshooting

Optional register groups depend on inverter model, firmware and connected hardware. If a group is not supported, the adapter skips it after a timeout backoff and keeps the main connection online.

Known model-dependent groups:

* `pollBmsDetail`: often unsupported unless the BMS exposes detail registers.
* `pollPowerLimit`: often unsupported on devices that do not expose power-limit telemetry.
* `pollCeiAutoTest`: can provide values on devices/firmware that support CEI auto test data.

If logs show optional register timeouts, disable the matching group in the advanced settings. Disabled optional register states are removed on adapter start.

For unstable network connections, increase `timeoutMs` first. Increase `retries` only when the inverter occasionally misses packets, because retries also lengthen one poll cycle.


## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.1.3 (2026-08-28)
- Fixed the adapter crashing with `Cannot read properties of undefined (reading 'debug')`: the logger is now read when it is used instead of being captured before the adapter assigned it.
- Fixed the adapter staying offline after a single lost UDP answer. The socket is rebound after a timeout, so a late answer can no longer be mistaken for the answer of the next register group.
- The first failed reconnect is logged as a warning again, so an adapter that turned yellow no longer stays silent.

### 1.1.2 (2026-08-27)
- Fixed unsigned 32 bit registers being reported as negative values (for example `RunningData.DiagStatusL` and `RunningData.ErrorMessage`).
- Boolean options are normalized at adapter start, so a string typed switch no longer disables an optional register group and deletes its states.
- Discarded late UDP answers after a timeout; they could be parsed as the answer of the next register group with the same length.
- Blocked state writes after `onUnload()` and moved the last direct state write out of the scheduler.
- Added an exponential backoff for reconnect attempts while the inverter is offline and reduced the repeated warnings to debug.
- Clamped probe timeouts coming from admin messages.
- Enabled TypeScript `strict` mode.

### 1.1.1 (2026-07-16)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- Migrated the admin configuration page to a React based UI and removed the legacy Materialize UI files.
- Added translations for the admin configuration page and documented numeric setting limits.
- Avoided rebuilding the admin bundle during GitHub installs.
- Excluded `CHANGELOG_OLD.md` from the npm package.

### 1.1.0 (2026-06-24)
* Migrated the adapter runtime to TypeScript
* Raised the minimum Node.js version to 22
* Switched the packaged adapter entry point to the compiled `build/main.js`
* Updated CI to run on Node.js 22 and 24 and verify the npm package contents
* Replaced additional mode `*Text` states with enum labels on the numeric mode states

### 1.0.9 (2026-06-23)
* Added validation for usable IPv4 inverter addresses
* Added GoodWe UDP reachability check from the admin configuration
* Added `/24` network discovery for GoodWe inverters via UDP port 8899
* Added discovered inverter selection in the IP address field with model and serial information

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023 Thomas Schönberger <SchoenbergerThomas@freenet.de>  
Copyright (c) 2025-2026 typhosj <typhosj@gmx.de>

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
