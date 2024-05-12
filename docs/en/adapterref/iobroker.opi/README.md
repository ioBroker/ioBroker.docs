![Logo](admin/opi.png)
# ioBroker.opi
===================

[![NPM version](http://img.shields.io/npm/v/iobroker.opi.svg)](https://www.npmjs.com/package/iobroker.opi)
[![Downloads](https://img.shields.io/npm/dm/iobroker.opi.svg)](https://www.npmjs.com/package/iobroker.opi)

[![NPM](https://nodei.co/npm/iobroker.opi.png?downloads=true)](https://nodei.co/npm/iobroker.opi/)

OPI-Monitor implementation for integration into ioBroker.

### Important Information

tested Hardware: OrangePi plus2 H3


### Following Objects are available after selection:

## *CPU*
- cpu_frequency
- load1
- load5
- load15

## *Memory*
- memory_available
- memory_free
- memory_total

## *Network (eth0)*
- net_received
- net_send

## *eMMC*
- emmc_root_total
- emmc_root_used

## *Swap*
- swap_total
- swap_used

## *Temperature*
- soc_temp

## *Uptime*
- uptime

## *WLAN*
- wifi_received
- wifi_send

### Configuration
On configuration page you can select following modules:

- CPU
- Memory
- Network
- eMMC
- Swap
- Temperature
- Uptime
- WLAN

### Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

## 0.1.2 (2021-11-06)
* (foxriver76) we no longer use deprecated adapter.objects

## 0.1.1 (2018-01-27)
- update index_m.html.
- update index.html.
- update codes.

## 0.1.0 (2018-01-24)
- Admin3 support.

## 0.0.6 (2017-08-01)
- stable release.

## 0.0.2 (2017-06-01)
- Initial release. Beta Version.


## License
Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Modified for OrangePi by Johnny Schneider <johann.schneider1@googlemail.com>
Copyright (c) 2015-2016 husky-koglhof <husky.koglhof@icloud.com>

MIT License

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

