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
### 2.6.2 (2026-08-23)
* (bolliy) update devDependencies to latest versions
* (bolliy) fix: update day-start baseline handling of consumption breakdown

### 2.6.1 (2026-08-16)
* (bolliy/claude) Fix: consumption breakdown entries (`statistics.dataDef.consumptionBreakdown`) the correct **daily** value in statistics.jsonToday` 
* (bolliy) fix: enhance error handling and validation in device initialization
* (bolliy) Added: `consumption.baseValue` field in `statistics.json*` — holds the unreduced total house consumption before breakdown entries are subtracted.

### 2.6.0 (2026-07-22)
* (booliy/claude) Optimization of memory usage
* (bolliy/claude) Added six new EMMA control registers ([#285](https://github.com/bolliy/ioBroker.sun2000/issues/285))
* (bolliy/claude) Implemented Time-of-Use (TOU)
* (booliy/claude) modbus-proxy: Direct register reading on cache mismatch

### 2.5.1 (2026-06-29)
- (bolliy) fix: update service queue logic ([#283](https://github.com/bolliy/ioBroker.sun2000/discussions/283))
- (bolliy) statistics fix: adjust reset handling logic to treat significant drops in value as potential resets

### 2.5.0 (2026-06-09)
* (bolliy) statistics: added live power chart (statistics.jsonLive)
* (bolliy) statistics: consumption breakdown — breakdown values are now subtracted from the total `consumption` entry so the lower chart panel shows the remainder separately from the breakdown series
* (bolliy) statistics: `xAxisFormatter` for the live chart only labels full-hour ticks to avoid clutter
* (bolliy) statistics: tooltip formatter refactored — `formatTooltipValue(unit, negative, decimals)` helper used consistently across all series
* (bolliy) statistics: if no battery is present, the charts are generated without battery information (SOC, charge, discharge).
* (bolliy) fix emma: update register addresses of meter.activePowerL1-L3 ([#282](https://github.com/bolliy/ioBroker.sun2000/issues/282))
* (bolliy) requires node.js >= 22

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