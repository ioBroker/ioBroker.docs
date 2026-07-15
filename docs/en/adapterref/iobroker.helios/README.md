![Logo](admin/helios.png)
# ioBroker.helios

[![NPM version](https://img.shields.io/npm/v/iobroker.helios.svg)](https://www.npmjs.com/package/iobroker.helios)
[![Downloads](https://img.shields.io/npm/dm/iobroker.helios.svg)](https://www.npmjs.com/package/iobroker.helios)
![Number of Installations (latest)](https://iobroker.live/badges/helios-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/helios-stable.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.helios.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.helios)

[![NPM](https://nodei.co/npm/iobroker.helios.png?downloads=true)](https://nodei.co/npm/iobroker.helios/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.helios/workflows/Test%20and%20Release/badge.svg)

## helios adapter for ioBroker

Helios KWL easyControls

Remote commands are possible by writing values to the writable data points.

Data points to update:

1: Initial commissioning (inbetr.htm)  
2:  
3: Party mode / Quiet mode (party.htm + ruhe.htm)  
4: Current fan speed / Mode (info.htm)  
5: Post-heating profile (nachheiz.htm)  
6: Vacation program (urlaub.htm)  
7: Device data / Serial number etc. (tinfo.htm)  
8: System status (operating mode, fan speed, current temperatures) (anzeig.htm)  
9: Weekly program (woche.htm)  
10: Network settings (IP, DNS, etc.) (web.htm)  
11: Time / Operating hours of pre-heating etc. (syst.htm)  
12: Device configuration / Filter change / Bypass control (gaer.htm)  
13: Voltage of the fans (luft.htm)  
14: Sensor configuration (fueh.htm)  
15: Change password (lost.htm)  
16: Error overview (fehl.htm)  
17:  
931:  

## Discussion and Questions  
https://forum.iobroker.net/topic/47762/test-helios-kwl-v0-0-x

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-05-10)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

### 0.1.0 (2024-04-17)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 0.0.1
* (iobroker-community-adapters) initial release


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2021-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>

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
