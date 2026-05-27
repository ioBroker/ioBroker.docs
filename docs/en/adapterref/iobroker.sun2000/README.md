---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.sun2000.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sun2000.svg
BADGE-Number of Installations: https://iobroker.live/badges/sun2000-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/sun2000-stable.svg
BADGE-Documentation: https://img.shields.io/badge/Documentation-2D963D?logo=read-the-docs&logoColor=white
BADGE-Wiki: https://img.shields.io/badge/wiki-documentation-forestgreen
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
BADGE-NPM: https://nodei.co/npm/iobroker.sun2000.png?downloads=true
---
# ioBroker adapter SUN2000 Documentation

* [Setup Inverters](https://github.com/bolliy/ioBroker.sun2000/tree/main/docs/inverter.md)
* [Adapter configuration](https://github.com/bolliy/ioBroker.sun2000/tree/main/docs/configuration.md)
* [Calculation](https://github.com/bolliy/ioBroker.sun2000/tree/main/docs/calculation.md)
* [VIS Exsample](https://github.com/bolliy/ioBroker.sun2000/tree/main/docs/vis.md)
* [Interface definitions](https://github.com/bolliy/ioBroker.sun2000/tree/main/docs/definitions.md)

## Wiki
Some interesting things are explained in the [wiki](https://github.com/bolliy/ioBroker.sun2000/wiki)

## Forum
Feel free to follow the discussions in the [german iobroker forum](https://forum.iobroker.net/topic/71768/test-adapter-sun2000-v0-1-x-huawei-wechselrichter)

## Inspiration
The development of this adapter was inspired by discussions from the forum thread https://forum.iobroker.net/topic/53005/huawei-sun2000-iobroker-via-js-script-funktioniert and the iobroker javascript https://github.com/ChrisBCH/SunLuna2000_iobroker.

Work in progress

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.4.5 (2026-05-14)
* statistics fix: return weekly range up to current Monday
* statistics: added support for generating statistics templates directly from built-in charts
* statistics: improved tooltip formatter - tooltip units are now provided explicitly via tooltip.valueFormatter

### 2.4.4 (2026-05-04)
* statistics fix: add error handling for waitForValue function

### 2.4.3 (2026-04-19)
* statistics: new state `statistics.jsonToday` — live summary of today's energy values
* statistics: default chart shows energy flows above/below zero line, SOC (hourly only), self-sufficiency and self-consumption on second Y-axis
* statistics: computed values `selfSufficiency` and `selfConsumption` calculated automatically in all time-series states
* statistics: data placeholders (`%%solarYield%%`, `%%selfSufficiency%%` etc.) and negated variants (`%%gridExportNeg%%` etc.) for mirrored chart layouts

### 2.4.2 (2026-04-04)
* fix test-and-release: deploy with 24.x
* statistics: flexcharts integration — built-in Apache ECharts configuration with bar and line chart support
* statistics: day-break visualization with alternating shaded areas for hourly charts
* statistics: per chart-type templates (`statistics.flexCharts.template.hourly` etc.) for full ECharts customization including functions
* statistics: data placeholders (`%%solarYield%%`, `%%gridExport%%` etc.) allow complete chart layout control via template states
* statistics: chart output states (`statistics.flexCharts.jsonOutput.hourly` etc.) updated automatically each hour

### 2.4.0 (2026-03-14)
* fix: the order of bit assignment corrected of alarmsJSON
* new state `inverter.x.emma.activeAlarmSN` and `inverter.x.emma.HistoricalAlarmSN` : emma alarms  [#226](https://github.com/bolliy/ioBroker.sun2000/issues/226)
* statistics: Aggregates historical collected datapoints into time-based summaries (e.g. hourly, daily, monthly, yearly). The data is stored in the path `statistics` as JSON.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 bolliy <stephan@mante.info>

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

[def]: https://github.com/bolliy/ioBroker.sun2000/wiki