---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.odl.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.odl.svg
BADGE-Number of Installations (latest): https://iobroker.live/badges/odl-installed.svg
BADGE-Number of Installations (stable): https://iobroker.live/badges/odl-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.odl.png?downloads=true
---
# ioBroker.odl

![Logo](../../admin/odl.png)

## The current environmental radioactivity in ioBroker

This adapter integrates the ODL (Ortsdosisleistung / Ambient Dose Rate) values of specified measuring points of the German [Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) into ioBroker.

The ODL measuring network of the Federal Office for Radiation Protection uses around 1,700 measuring probes to monitor radiation levels from natural radioactivity in the environment around the clock. The measuring network has an important early warning function in order to quickly detect increased radiation from radioactive substances in the air in Germany.  
The measurement data obtained are collected and evaluated by the BfS and made publicly available under the _Data License Germany_.

For more details regarding the Ambient Dose Rate see <https://odlinfo.bfs.de/>.

This adapter downloads the current 1 hour mean values of the measurement data using the [official data interface provided by the BfS](https://odlinfo.bfs.de/ODL/EN/service/data-interface/data-interface_node.html). The BfS

Dieser Adapter läd die aktuellen 1-Stunden-Mittelwerte der Messdaten direkt über die [offizielle Datenschnittstelle des BfS](https://odlinfo.bfs.de/ODL/DE/service/datenschnittstelle/datenschnittstelle_node.html). The BfS is the originator of the data used by the adapter.  
All data is provided by the adapter in an unchanged form as delivered by the data interface.

If an enabled history adapter (_history_, _influxdb_ or _sql_) is detected for some value state, the adapter tries to fill missing values in the history by downloading missing values to create a complete history.

By default, the adapter updates the current measurement data every hour. A shorter update interval is usually not useful, since the underlying measurement data on the BfS server (depending on the measuring point) are mostly updated hourly.  
When the adapter is started for the first time, the time for retrieving the data is automatically adjusted so that not all installations retrieve the data at the same time and the BfS data interface is not unnecessarily loaded.

[![Screenshot 1](../ioBroker-odl-01.png)](../ioBroker-odl-01.png)

[![Screenshot 2](../ioBroker-odl-02.png)](../ioBroker-odl-02.png)

## Find the ID of measuring stations

To find the ID required by the adapter, you need to open the [List of measuring stations on ODL-Info](https://odlinfo.bfs.de/ODL/EN/topics/location-of-measuring-stations/list/list_node.html) and search for the measuring station.

If you open the desired measuring station, you can find the ID in URL of the browser as `?id=...`.

Example for the measuring point _Berlin-Karlshorst_:

* URL: `https://odlinfo.bfs.de/ODL/EN/topics/location-of-measuring-stations/map/_documents/Messstelle.html?id=110000006`
* ID: `110000006`

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (crycode-de) Updated dependencies

### 5.1.1 (2025-10-25)

* (crycode-de) Updated Sentry DSN
* (crycode-de) Updated dependencies

### 5.1.0 (2025-10-04)

* (crycode-de) js-controller >= 6.0.11, Admin >= 7.6.17 required
* (crycode-de) Updated dependencies

### 5.0.0 (2025-05-25)

* (crycode-de) Node.js >= 20, Admin >= 7.4.10 required
* (crycode-de) Updated dependencies
* (crycode-de) Added information how to get the required IDs of the measuring stations

### 4.0.2 (2024-11-16)

* (crycode-de) Added missing sizes to jsonConfig

### 4.0.1 (2024-10-23)

* (crycode-de) Added support for tiny screens to jsonConfig
* (crycode-de) Updated dependencies

### 4.0.0 (2024-09-23)

* (crycode-de) Node.js >= 18, Admin >= 6.17, js-contoller >= 5.0.19 are required
* (crycode-de) Migrate to jsonConfig
* (crycode-de) Updated dependencies

### 3.0.1 (2023-09-27)

* (crycode-de) Node.js >= 16 is required
* (crycode-de) Fixed issue with history adapters
* (crycode-de) Updated dependencies

### 2.0.5 (2022-04-24)

* (crycode-de) Fixed spelling issue in german translation
* (crycode-de) Updated dependencies

### 2.0.4 (2022-04-09)

* (crycode-de) Added info message about breaking changes when upgrading from <2.0.0 to >=2.0.0

### 2.0.3 (2022-03-23)

* (crycode-de) Optimized Sentry integration in admin

### 2.0.2 (2022-03-23)

* (crycode-de) Fixed config error (Sentry IOBROKER-ODL-2)
* (crycode-de) Updated dependencies

### 2.0.1 (2022-03-14)

* (crycode-de) Use official data API from BfS
* (crycode-de) **Breaking**: Use 9-digit identifiers instead of locality codes
  * New object will be created for each location
  * Migration from locality codes to identifiers is done on first start after adapter upgrade, but custom object settings (like history) have to be migrated manually
* (crycode-de) **Breaking**: The `.odl` state is now named `.value`
* (crycode-de) Added statistic states
* (crycode-de) Added optional support for cosmic and terrestrial value components (disabled by default)
* (crycode-de) Added `.status` state representing the location status given from BfS
* (crycode-de) If an enabled history (_history_, _influxdb_, _sql_) for `.value`, `.valueCosmic` or `.valueTerrestrial` is found, the adapter tries to load the timeseries data from BfS for past 7 days.
* (crycode-de) If the status of a location is not "in operation", the value states will be `null` with `q` set to `0x81` (general problem by sensor)
* (crycode-de) Complete rebuild of the admin interface using react
* (crycode-de) Randomize adapter schedule between minute 15 and 45 and also using seconds on first start to better spread API calls
* (crycode-de) Replaced `request` with `axios`
* (crycode-de) Updated adapter dev toolchain
* (crycode-de) Updated dependencies
* (crycode-de) Require node >=12
* (crycode-de) Use weblate for translations

### 1.1.4 (2021-01-16)

* (crycode-de) Updated BfS logo
* (crycode-de) Updated dependencies

### 1.1.3 (2020-12-31)

* (crycode-de) Fixed issue when log is not available at startup timeout

### 1.1.2 (2020-12-23)

* (crycode-de) Fix objects parameters for objects created before v1.1.1

### 1.1.1 (2020-12-23)

* (crycode-de) Fixed issue creating odl state object

### 1.1.0 (2020-12-21)

* (crycode-de) Added Sentry error reporting
* (crycode-de) Updated dependencies

### 1.0.7 (2020-10-14)

* (crycode-de) Added timeout to force exit the adapter after 10 minutes in case of any problems
* (crycode-de) Updated dependencies

### 1.0.6 (2020-10-01)

* (crycode-de) Hopefully fixed a bug where adapter did not exit as expected
* (crycode-de) Updated dependencies

### 1.0.5 (2020-02-05)

* (crycode-de) Use of `extendObject` to update names of existing objects.

### 1.0.4 (2020-02-03)

* (crycode-de) Updated connectionType and dataSource in io-package.json.

### 1.0.3 (2020-01-23)

* (crycode-de) Added `connectionType` in `io-package.json` and updated dependencies.

### 1.0.2 (2019-10-22)

* (crycode-de) Minimum required js-conntroller version is now 1.5.7

### 1.0.1 (2019-10-14)

* (crycode-de) initial release

## License

Copyright (c) 2019-2026 Peter Müller <peter@crycode.de>

Data (c) [German Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/), [Data License Germany – attribution – Version 2.0](http://www.govdata.de/dl-de/by-2-0)

### MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.