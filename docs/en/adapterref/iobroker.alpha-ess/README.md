![Logo](admin/alpha-ess.png)

# ioBroker.alpha-ess

![Number of Installations (latest)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/alpha-ess-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)](https://www.npmjs.com/package/iobroker.alpha-ess)

[![Downloads](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)](https://www.npmjs.com/package/iobroker.alpha-ess)
[![Known Vulnerabilities](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess)

## alpha-ess adapter for ioBroker

---

### For support please open a GitHub issue or visit

https://forum.iobroker.net/post/892023
https://www.storion4you.de/thread/683

---

This adapter logs into the web API of [Alpha-ESS](https://www.alphaess.com/) and retrieves information for your Alpha-ESS equipment.\
Depending on your Alpha-ESS product, it is possible to get realtime data and configuration data for your equipment. Which data points are returned by the API depends on your Alpha-ESS equipment.

This adapter uses the Alpha-ESS Open API, which is an official and documented API for Alpha-ESS devices.

The quality attribute of each state is set accordingly to its status:
| Quality | meaning |
|:--------|:--------------------------------------------------|
|0x00 |OK and up to date |
|0x01 |value not updated due to unknown reason, see debug log |
|0x02 |problem with online connection for this data point |
|0x12 |adapter disconnected or stopped |
|0x44 |API returned error or internal error, see debug log |

## Settings:

To be able to use the Alpha-ESS Open API, you have to register your Alpha-ESS device unter https://open.alphaess.com. Once registered, you get a developer ID and a developer key (called "Secret"). You will need these to have access to the Open API.
How to find SN and Check code for registration is described here: https://github.com/alphaess-developer/alphacloud_open_api

- **Personal application ID:** The application ID (see above)
- **Personal application Secret:** The application Secret (see above)
- **Alpha-ESS System ID:** The S/N (serial number) of your Alpha-ESS equipment
- **Interval to read realtime data:** Unit: seconds.
- **Interval to read energy data:** Unit: minutes.
- **Interval to read charging settings:** Unit: minutes.
- **Interval to read discharging settings:** Unit: minutes.
- **Interval to read summary data:** Unit: minutes.
- **Interval to read wallbox data:** Unit: minutes. Caution: Currently only one Wallbox is supported.
- **Update unchanged states:** If this option is checked, states are changed even if the corresponding value is unchanged.

## Disclaimer

**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

## Changelog

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
