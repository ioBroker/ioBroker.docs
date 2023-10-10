![Logo](admin/odl.png)

# ioBroker.odl

[![NPM version](https://img.shields.io/npm/v/iobroker.odl.svg)](https://www.npmjs.com/package/iobroker.odl)
[![Downloads](https://img.shields.io/npm/dm/iobroker.odl.svg)](https://www.npmjs.com/package/iobroker.odl)
![Number of Installations (latest)](https://iobroker.live/badges/odl-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/odl-stable.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/odl/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.odl.png?downloads=true)](https://nodei.co/npm/iobroker.odl/)

**Tests:** ![Test and Release](https://github.com/crycode-de/iobroker.odl/workflows/Test%20and%20Release/badge.svg)

## ODL adapter for ioBroker

This adapter integrates the ODL (Ortsdosisleistung / Ambient Dose Rate) values of specified measuring points of the German [Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/) into ioBroker.

For more information about the ambient dose rate in germany visit <https://odlinfo.bfs.de/>.

---

## Die aktuelle Umweltradioaktivität in ioBroker

Dieser Adapter integriert die ODL (Ortsdosisleistung) Messwerte von ausgewählten Messstellen des [Bundesamtes für Strahlenschutz (BfS)](https://www.bfs.de/) in ioBroker.

Das bundesweite Messnetz des BfS umfasst rund 1700 ortsfeste Messstellen, die permanent die vor Ort aktuelle Gamma-Umweltradioaktivität (Ortsdosisleistung) erfassen und aufzeichnen. Die gewonnenen Messdaten werden vom BfS gesammelt, ausgewertet und öffentlich unter der _Datenlizenz Deutschland_ zur Verfügung gestellt.

Für weitere Informationen zur ODL siehe <https://odlinfo.bfs.de/>.

Dieser Adapter läd die aktuellen 1-Stunden-Mittelwerte der Messdaten direkt über die [offizielle Datenschnittstelle des BfS](https://odlinfo.bfs.de/ODL/DE/service/datenschnittstelle/datenschnittstelle_node.html). Das BfS ist Urheber der vom Adapter verwendeten Daten.  
Alle Daten werden in unveränderter Form, so wie sie von der Datenschnittstelle geliefert werden, vom Adapter bereitgestellt.

Wird ein aktivierter History-Adapter (_history_, _influxdb_ oder _sql_) für einen Werte-State erkannt, dann werden gegebenenfalls in der Historie fehlende Datenpunkte durch den Adapter automatisch nachgetragen, sodass sich vollständige Zeitreihen ergeben.

Die aktuellen Messdaten werden von dem Adapter standardmäßig im Stundentakt aktualisiert. Ein geringerer Aktualisierungsintervall ist meist nicht sinnvoll, da die zu Grunde liegenden Messdaten auf dem BfS-Server (abhängig von der Messstelle) größtenteils stündlich aktualisiert werden.  
Beim ersten Start des Adapters wird automatisch der Zeitpunkt für den Abruf der Daten angepasst, sodass nicht alle Installation die Daten zur gleichen Zeit abrufen und die Datenschnittstelle des BfS nicht unnötig belastet wird.

[![Screenshot 1](./docs/ioBroker-odl-01.png)](./docs/ioBroker-odl-01.png)

[![Screenshot 2](./docs/ioBroker-odl-02.png)](./docs/ioBroker-odl-02.png)

---

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

Copyright (c) 2019-2023 Peter Müller <peter@crycode.de>

Data (c) [German Federal Office for Radiation Protection (Bundesamt für Strahlenschutz, BfS)](https://www.bfs.de/), [Data licence Germany – attribution – Version 2.0](http://www.govdata.de/dl-de/by-2-0)

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
