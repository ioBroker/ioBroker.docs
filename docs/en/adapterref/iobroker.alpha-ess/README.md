![Logo](admin/alpha-ess.png)

# ioBroker.alpha-ess

![Number of Installations (latest)](https://iobroker.live/badges/alpha-ess-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/alpha-ess-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.alpha-ess.svg)](https://www.npmjs.com/package/iobroker.alpha-ess)

[![Downloads](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)](https://www.npmjs.com/package/iobroker.alpha-ess)
[![Known Vulnerabilities](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess)

## Alpha ESS adapter for ioBroker

This adapter connects ioBroker to the official [Alpha ESS Open API](https://open.alphaess.com/). It reads power, energy, system, battery configuration, and wallbox data. Supported battery and wallbox settings can also be changed from ioBroker.

The available values depend on the system model and on the functions exposed by Alpha ESS for that system.

## Features

- Realtime power data for PV, grid, load, battery, and connected charging equipment
- Daily energy totals and system information
- Charging and discharging schedules and SOC limits
- Summary values, including monthly and yearly statistics
- Fallback power data for systems without realtime API support
- Wallbox status, start/stop control, and current setting
- State quality information for connection and API errors

## Requirements

- ioBroker with js-controller 6.0.11 or newer and Admin 7.6.20 or newer
- Node.js 22 or newer
- An Alpha ESS account and a system registered in the Open API developer portal
- A personal application ID, application secret, and the serial number of the Alpha ESS system

The adapter uses the cloud API and therefore requires internet access. It does not connect directly to the inverter or provide a Modbus connection.

## Setup

1. Sign in to the [Alpha ESS Open API portal](https://open.alphaess.com/) and register the system.
2. Create or select a personal application to obtain its application ID and secret.
3. Find the system serial number (SN) and check code. Alpha ESS documents the registration process in the [Open API repository](https://github.com/alphaess-developer/alphacloud_open_api).
4. Install the adapter from the ioBroker adapter page and create an instance.
5. Enter the application ID, application secret, and system serial number in the instance settings.
6. Enable only the data groups required for the system and save the configuration.

The application secret is stored as an encrypted and protected native setting by ioBroker. Do not publish it in issue reports or log excerpts.

## Configuration

| Option | Unit | Description |
| --- | --- | --- |
| Personal application ID | — | Application ID from the Alpha ESS Open API portal |
| Personal application secret | — | Secret belonging to the application ID |
| Alpha ESS system ID | — | System serial number (SN) |
| Realtime data | seconds | Power and SOC values; minimum interval: 10 seconds |
| System information | seconds | Model and system metadata; minimum interval: 10 seconds |
| Recent power data | fixed | Fetches fallback power data every 5 minutes for systems without realtime support |
| Energy data | minutes | Daily energy totals; minimum interval: 5 minutes |
| Charging settings | minutes | Charging schedule and SOC limit; minimum interval: 1 minute |
| Discharging settings | minutes | Discharging schedule and cutoff SOC; minimum interval: 1 minute |
| Summary data | minutes | Statistical summaries; minimum interval: 5 minutes |
| Wallbox data | minutes | Wallbox status and start/stop control; minimum interval: 1 minute |
| Wallbox current | seconds | Wallbox current setting; minimum interval: 10 seconds |
| Update unchanged states | — | Writes a new state update even when the value did not change |

Short intervals create more cloud requests. Use the longest interval that is suitable for the automation and observe the limits of the Alpha ESS Open API.

## Data points

Enabled and supported data groups appear below `alpha-ess.<instance>`:

| Folder | Contents | Writable values |
| --- | --- | --- |
| `Realtime` | Current PV, grid, load, battery, and charging power | — |
| `Recent` | Five-minute fallback power data | — |
| `System` | System identification and metadata | — |
| `Energy` | Daily energy totals | — |
| `Settings_Charge` | Charging periods and charging SOC limit | All settings in this folder |
| `Settings_Discharge` | Discharging periods and cutoff SOC | All settings in this folder |
| `Summary` | Daily, monthly, yearly, and total statistics | — |
| `Wallbox` | Serial number, model, status, and charging control | `Charging_Start`, `Charging_Stop` |
| `Wallbox_Current` | Household current setting for the wallbox | Current setting |

Folders and states are created only when the corresponding endpoint is enabled and the API returns the attribute. Unsupported or disabled states may therefore be absent.

### Writing settings

Write to a writable state with acknowledgement (`ack`) set to `false`, as ioBroker does for changes made in the Objects view or by `setState(id, value, false)`. The adapter sends the complete settings group to Alpha ESS and reads the values back after the request. Avoid several concurrent writes to values in the same group.

Wallbox support currently handles one wallbox per Alpha ESS system. Before automating charging or current changes, verify the accepted range and behavior for the installed wallbox model.

## State quality

The `q` attribute shows whether a value is current:

| Quality | Meaning |
| --- | --- |
| `0x00` | Value is current |
| `0x01` | Value was not updated in the expected interval; see the debug log |
| `0x02` | Network or cloud connection problem |
| `0x12` | Adapter is stopped or disconnected |
| `0x44` | The API returned an error or the adapter detected an internal error |

`info.connection` is `true` after a successful API response and `false` when communication fails.

## Troubleshooting

- **No states are created:** Confirm that the data group is enabled and check the debug log. Some Alpha ESS systems do not support every endpoint.
- **Authentication fails:** Verify the application ID and secret, then confirm that the system SN is registered for that application in the Open API portal.
- **Timestamp error (`6006`):** Synchronize the ioBroker host clock and timezone using NTP.
- **Values remain stale:** Inspect the state quality and debug log, increase the polling interval, and check whether the Alpha ESS cloud is reachable.
- **A written value changes back:** The API response is authoritative. Check the value range and format accepted by the system and avoid writing the same settings group concurrently.

When reporting a problem, include the adapter version, Node.js and js-controller versions, system model, affected state ID, and a debug log covering one failed request. Remove the application secret and other credentials first.

## Support

- [GitHub issues](https://github.com/Gaspode69/ioBroker.alpha-ess/issues)
- [ioBroker forum thread](https://forum.iobroker.net/topic/60009/)
- [Storion4you community thread](https://www.storion4you.de/thread/683)

## Disclaimer

**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

## Changelog
### **WORK IN PROGRESS**
- (Gaspode) Adapter requires Node.js 22 or newer
- (Gaspode) Added Node.js 26 tests and updated development tooling
- (Gaspode) Improved setup, configuration, data point, and troubleshooting documentation
- (Gaspode) Improved the configuration layout on small screens

### 4.1.0 (2026-02-14)

- (Gaspode) Read and write wallbox current

### 4.0.0 (2025-11-01)

- (Gaspode) Update dependencies, Node.js version 20 or later is now required

### 3.0.1 (2024-12-22)

- (Gaspode) Optimizations of reading pseudo-realtime power data for slow systems

### 3.0.0 (2024-12-21)

- (Gaspode) **Breaking Change:** Renamed state "Charging_period 1_end" to "Charging_period_1_end"
- (Gaspode) Optimizations in configuration dialog

### 2.3.0 (2024-12-20)

- (Gaspode) Provides the ability to read pseudo-realtime power data using the API function getTodayPowerBySn. This feature is useful for systems that lack "realtime data support." When activated, data is fetched every 5 minutes and stored in the "Recent" folder.

### 2.2.0 (2024-12-16)

- (Gaspode) Provide system information data (getEssList)

### 2.1.6 (2024-12-01)

- (Gaspode) Migrated to ESLint 9

### 2.1.5 (2024-11-14)

- (Gaspode) Optimized GUI for all screen resolutions (responsive design)

### 2.1.4 (2024-08-13)

- (Gaspode) Updated some formal stuff

### 2.1.3 (2024-08-07)

- (Gaspode) Increased read timeout from 10 to 20 s

### 2.1.2 (2024-08-07)

- (Gaspode) Quality of states optimized

### 2.1.1 (2024-08-07)

- (Gaspode) Do not longer report read timeouts as error. It should be enough to set the quality of concerned states to values according the table above and to display warnings, if values were not updated for a long time. To see details, debug log level must be enabled by the user.

### 2.1.0 (2024-08-01)

- (Gaspode) Adapter requires node.js >= 18 and js-controller >= 5 now
- (Gaspode) Dependencies updated
- (Gaspode) Adapter logo updated. Alpha-ESS has kindly permitted to use the Alpha-ESS logo. This does not imply any affiliation with Alpha-ESS! Alpha-ESS is not the developer or provider of this adapter!

### 2.0.2 (2024-01-12)

- (Gaspode) Updated Copyright year

### 2.0.1 (2024-01-03)

- (Gaspode) Adapted timeout to new API restrictions

### 2.0.0 (2023-12-02)

- (Gaspode) Breaking Change: Removed support of Closed API

### 1.3.0 (2023-11-22)

- (Gaspode) Support wallbox with Open API
- (Gaspode) Start and stop charging of wallbox with Open API

### 1.2.1 (2023-11-11)

- (Gaspode) Fixed severe error in ClosedAPI

### 1.2.0 (2023-11-10)

- (Gaspode) Added additional realtime attributes for OpenAPI

### 1.1.1 (2023-11-04)

- (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

- (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
- (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

- (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

- (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

- (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
- (Gaspode) Set state quality accordingly to status of data
- (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
- (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

- (Gaspode) Optimized deletion of group states
- (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

- (Gaspode) Read selected statistical data
- (Gaspode) Added Summary data
- (Gaspode) Refactored complete implementation
- (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
- (Gaspode) Remove disabled states at adapter startup
- (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
- (Gaspode) Optimized rounding for selected values
- (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

- (Gaspode) First release for Latest repository
- (Gaspode) Corrected typo in state ID Battery_SOC
- (Gaspode) Implemented improvements as suggested in code review
- (Gaspode) Slow down requests in case of permanent errors
- (Gaspode) Changed adapter type from metering to energy
- (Gaspode) Correction for NPM
- (Gaspode) Enable NPM

### 0.0.5

- (Gaspode) Use meaningful state names
- (Gaspode) Use suitable state roles
- (Gaspode) Added new state for Alpha-ESS settings parameter 'upsReserve'

### 0.0.4

- (Gaspode) use axios to perform Alpha-ESS API calls instead of deprecated request
- (Gaspode) New option "Update unchanged states" added

### 0.0.3

- (Gaspode) refactored API calls, added daily energy values

### 0.0.2

- (Gaspode) corrected api call for realtime data

### 0.0.1

- (Gaspode) initial release

## License

MIT License

Copyright (c) 2025-2026 Gaspode <gaspode69@online.de> (**NO SUPPORT VIA EMAIL**)

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