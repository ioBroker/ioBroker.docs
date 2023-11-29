<img src="./admin/coronavirus-statistics.png" width="50" height="50" alt="">

# ioBroker.coronavirus-statistics

[![NPM version](http://img.shields.io/npm/v/iobroker.coronavirus-statistics.svg)](https://www.npmjs.com/package/iobroker.coronavirus-statistics)
[![Downloads](https://img.shields.io/npm/dm/iobroker.coronavirus-statistics.svg)](https://www.npmjs.com/package/iobroker.coronavirus-statistics)
![Number of Installations (latest)](http://iobroker.live/badges/coronavirus-statistics-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/coronavirus-statistics-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics/badge.svg)](https://snyk.io/test/github/DrozmotiX/ioBroker.coronavirus-statistics)

[![NPM](https://nodei.co/npm/iobroker.coronavirus-statistics.png?downloads=true)](https://nodei.co/npm/iobroker.coronavirus-statistics/)

![Test and Release](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)
[![Dependency Status](https://img.shields.io/david/DrozmotiX/ioBroker.coronavirus-statistics.svg)](https://david-dm.org/DrozmotiX/ioBroker.coronavirus-statistics)
## Coronavirus Live Statistics adapter for ioBroker

Adapter to show Global Coronavirus information and current reports

There is no configuration required, after installation it will : 

- Receive global information world-wide and write it to "global_totals"
- Create a folder for each country with all relevant information regarding COVID-19
- Update the information every 15 minutes

The following information is available : 

| Datapoint | Details |
|--|--|
| active | Amount of current infected people |
| cases | Amount of totally known cases |
| casesPerOneMillion | Amount of totally known cases per million citizen |
| critical | Amount of critical situation (Hospitalized) |
| deaths | Amount of current registered deaths |
| deathsPerOneMillion | Amount of current registered deaths per million citizen |
| flag | Country flag, link to github location |
| recovered | Amount of totally known recovered cases |
| todayCases | New Cases by Today |
| todayDeaths | Amount of totally known people died today |
| test | Total number of COVID-19 tests taken globally |
| tests per one  million counties | Total number of COVID-19 tests taken globally per one  million |

Please be aware this adapter uses as much as possible up-to-date information, but there can be a delay of several hours depending on the country's report.  
```German Federal States : https://npgeo-corona-npgeo-de.hub.arcgis.com/  s```
Generic Source : https://coronavirus-19-api.herokuapp.com

## Advanced settings
| Option | Description |
|--|--|
| All Countries | Get data for all countries World-Wide (Default: false) |
| Continents | Group total amounts by a continent in separate state (Default: false) |
| Delete unused States | Delete data when countries are deselected (Default: false) |

## Changelog

<!--
	### __WORK IN PROGRESS__
	* (DutchmanNL) 
-->
### 0.9.0 (2023-11-16) - Remove unsupported APIs
* (DutchmanNL) Remove specific data regarding germany as APIs are not available anymore
* (DutchmanNL) Data source dedicated for https://coronavirus-19-api.herokuapp.com, we are unable to support more APIs due to changes, complexity and available development capacity. But please feel free to provide PR's!

### 0.8.8-0 (2021-11-19)
* (jlssmt) added hospital index for germany and federal states of germany

### 0.8.7 (2021-11-17)
* (DutchmanNL) Bugfix: Added missing definitions
* (jlssmt) Error handling for missing state attribute definitions Optimized

### 0.8.6 (2021-11-15)
* (Simatec) Design Fix for Admin >=5.1.28 Dark/Blue Theme

### 0.8.5 (2021-10-29)
* (jlssmt) Error handling for bundesländer api implemented

## License
MIT License

Copyright (c) 2023 DrozmotiX Holding B.V. <OSS@DrozmotiX.eu>

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
