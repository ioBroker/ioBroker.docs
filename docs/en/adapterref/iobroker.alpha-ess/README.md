![Logo](admin/alpha-ess.png)

# ioBroker.alpha-ess

![Number of Installations (latest)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/alpha-ess-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)](https://www.npmjs.com/package/iobroker.alpha-ess)

[![Downloads](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)](https://www.npmjs.com/package/iobroker.alpha-ess)
[![Known Vulnerabilities](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess)

## alpha-ess adapter for ioBroker

This adapter logs into the web API of [Alpha ESS](https://www.alphaess.com/) and retrieves information for your Alpha ESS equipment.\
Depending on your Alpha ESS product, it is possible to get realtime data and configuration data for your equipment. Which data points are returned by the API depends on your Alpha ESS equipment.

This adapter supports two APIs, the internal Alpha ESS Web API, which may be changed at any time by Alpha ESS, and the Alpha ESS Open API, which provides less functionality but is an official and documented API for Alpha ESS devices.

Staring with version 1.0.0-alpha.5, the quality attribute of each state is set accordingly to its status:
| Quality | meaning |
|:--------|:--------------------------------------------------|
|0x00 |OK and up to date |
|0x01 |value not updated due to unknown reason, see log |
|0x02 |problem with online connection for this data point |
|0x12 |adapter disconnected or stopped |
|0x44 |API returned error or internal error, see log |

## Settings:

**Used API:** Choose between the inofficial "Closed" API and the official "Open" API
Depending on the selected API there are different settings available.

**Closed API Settings:**

-   **Username:** The username of your Alpha ESS Account
-   **Password:** The password of your Alpha ESS Account
-   **Alpha ESS System ID:** The system Identifier of your Alpha ESS equipment
-   **Interval to read realtime data:** Unit: seconds.
-   **Interval to read energy data:** Unit: minutes.
-   **Interval to read settings data:** Unit: minutes.
-   **Interval to read statistical data for the current day:** Unit: minutes.
-   **Interval to read summary data:** Unit: minutes.

It is possible to use a demo account provided by Alpha ESS. The credentials (user name, system id) are set as default values within the adapter.
The password is stored encrypted and must therefore be entered manually: demo

**Open API Settings:**

To be able to use the new Open API you have to register your Alpha-ESS device unter https://open.alphaess.com. Once registered, you get a developer ID and a developer key (called "Secret"). You will need these to have access to the Open API. Currently I have no information if this will be changed in the future.
How to find SN and Check code for registration is described here: https://github.com/alphaess-developer/alphacloud_open_api

-   **Personal application ID:** The application ID (see above)
-   **Personal application Secret:** The application Secret (see above)
-   **Alpha ESS System ID:** The system Identifier of your Alpha ESS equipment
-   **Interval to read realtime data:** Unit: seconds.
-   **Interval to read energy data:** Unit: minutes.
-   **Interval to read charging settings:** Unit: minutes.
-   **Interval to read discharging settings:** Unit: minutes.
-   **Interval to read summary data:** Unit: minutes.

## Disclaimer

**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**

## Changelog

### 1.1.1 (2023-11-04)

-   (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

-   (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
-   (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

-   (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

-   (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

-   (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
-   (Gaspode) Set state quality accordingly to status of data
-   (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
-   (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

-   (Gaspode) Optimized deletion of group states
-   (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

-   (Gaspode) Read selected statistical data
-   (Gaspode) Added Summary data
-   (Gaspode) Refactored complete implementation
-   (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
-   (Gaspode) Remove disabled states at adapter startup
-   (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
-   (Gaspode) Optimized rounding for selected values
-   (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

-   (Gaspode) First release for Latest repository
-   (Gaspode) Corrected typo in state ID Battery_SOC
-   (Gaspode) Implemented improvements as suggested in code review
-   (Gaspode) Slow down requests in case of permanent errors
-   (Gaspode) Changed adapter type from metering to energy
-   (Gaspode) Correction for NPM
-   (Gaspode) Enable NPM

### 0.0.5

-   (Gaspode) Use meaningful state names
-   (Gaspode) Use suitable state roles
-   (Gaspode) Added new state for Alpha ESS settings parameter 'upsReserve'

### 0.0.4

-   (Gaspode) use axios to perform Alpha ESS API calls instead of deprecated request
-   (Gaspode) New option "Update unchanged states" added

### 0.0.3

-   (Gaspode) refactored API calls, added daily energy values

### 0.0.2

-   (Gaspode) corrected api call for realtime data

### 0.0.1

-   (Gaspode) initial release

## License

MIT License

Copyright (c) 2023 Gaspode <gaspode69@online.de>

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
