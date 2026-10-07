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
BADGE-Test and Release: https://github.com/bolliy/ioBroker.sun2000/workflows/Test%20and%20Release/badge.svg
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
	Add draft entries here while the next release is still being finalized.
-->
### 2.7.3 (2026-10-06)
* (bolliy) An incorrect bracket was used when converting the number to an array

### 2.7.2 (2026-10-04)
* (bolliy) fix: disabled the adapter install/update pop-up message
* (bolliy) fix control.externalPower: prevent negative values

### 2.7.1 (2026-10-03)
* (bolliy) update devDependencies to latest versions
* (bolliy) Allow decimal values for ​​`battery.tou.maximumPowerForChargingFromGrid` and `grid.maximumFeedGridPower`. ([#300](https://github.com/bolliy/ioBroker.sun2000/discussions/300))

### 2.7.0 (2026-08-23)
* (bolliy) fix: Ensure that unacknowledged control states occurring during startup are correctly processed in the service queues.

### 2.6.2 (2026-08-23)
* (bolliy) update devDependencies to latest versions
* (bolliy) fix: update day-start baseline handling of consumption breakdown

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