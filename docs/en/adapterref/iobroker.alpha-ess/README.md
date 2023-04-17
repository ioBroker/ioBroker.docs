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

This adapter is based on the great work of [Charles Gillanders](https://github.com/CharlesGillanders/alphaess), who reverse engineered the Alpha ESS Web API. This is an internal API which may be changed at any time by Alpha ESS.

Currently this adapter creates a state with a hopefully self explaining name for each data point, which I was able to identify.\
All other data points are ignored. During adapter start these data points are logged as info message.

Basically, it is possible to change selected configuration settings using the Alpha ESS Web API. This is not implemented yet.

## Settings:

**Used API:** Choose between the inofficial "Closed" API and the official "Open" API (under development)
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
### 1.0.0-alpha.1 (2023-04-16)

-   (Gaspode) Writing charging and discharging settings implemented (OpenAPI only)

### 1.0.0-alpha.0 (2023-04-11)

-   (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS

### 0.5.0 (2023-03-05)

-   (Gaspode) Remove no more supported states at startup automatically
-   (Gaspode) Prepared data migration for future versions

### 0.4.0 (2023-02-16)

-   (Gaspode) Optimized deletion of group states
-   (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

-   (Gaspode) Rearranged statistical data and added more values. Many thanks to [Thorsten](https://github.com/ThorstenBoettler) for his valuable contribution in testing the early alpha versions of this release and providing informative suggestions and recommendations for new data points.
-   (Gaspode) Added Summary data
-   (Gaspode) Refactored complete implementation
-   (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
-   (Gaspode) Remove disabled states at adapter startup
-   (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
-   (Gaspode) Optimized rounding for selected values

### 0.2.1-beta.0 (2023-01-31)

-   (Gaspode) Read selected statistical data

### 0.2.0 (2023-01-19)

-   (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

-   (Gaspode) First release for Latest repository
-   (Gaspode) Corrected typo in state ID Battery_SOC
-   (Gaspode) Implemented improvements as suggested in code review

### 0.0.6-beta.5 (2023-01-07)

-   (Gaspode) Slow down requests in case of permanent errors

### 0.0.6-beta.4 (2023-01-03)

-   (Gaspode) Changed adapter type from metering to energy

### 0.0.6-beta.3 (2023-01-02)

-   (Gaspode) Correction for NPM

### 0.0.6-beta.2 (2023-01-02)

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
