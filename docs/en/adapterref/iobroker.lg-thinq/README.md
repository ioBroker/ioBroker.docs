![Logo](admin/lg-thinq.png)

# ioBroker.lg-thinq

[![NPM version](https://img.shields.io/npm/v/iobroker.lg-thinq.svg)](https://www.npmjs.com/package/iobroker.lg-thinq)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lg-thinq.svg)](https://www.npmjs.com/package/iobroker.lg-thinq)
![Number of Installations (latest)](https://iobroker.live/badges/lg-thinq-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/lg-thinq-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.lg-thinq.svg)](https://david-dm.org/TA2k/iobroker.lg-thinq)

[![NPM](https://nodei.co/npm/iobroker.lg-thinq.png?downloads=true)](https://nodei.co/npm/iobroker.lg-thinq/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.lg-thinq/workflows/Test%20and%20Release/badge.svg)

## lg-thinq adapter for ioBroker

Adapter for LG ThinQ

## Supported devices

**DEVICE**: lg-thinq.0.xxx.deviceType -> e. g. 101</br>
**PLATFORM**: lg-thinq.0.xxx.platformType -> e. g. thinq2

* Device -> 101 Refrigerator -> thinq2 + thinq1
* Device -> 201 Washer + signature -> thinq2 + thinq1
* Device -> 202 Dryer -> thinq2 + thinq1
* Device -> 401 AC -> thinq2 + thinq1
* Device -> 406 Heatpump -> thinq2

## Description

🇬🇧 [Description](/docs/en/README.md)</br>
🇩🇪 [Beschreibung](/docs/de/README.md)

## Questions

🇩🇪 [Fragen](https://forum.iobroker.net/topic/46498/test-adapter-lg-thinq-v0-0-1)

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### **WORK IN PROGRESS**

-   (Lucky-ESA) Added device 406 (heat pump)
-   (Lucky-ESA) Added description
-   (Lucky-ESA) Bugfixe

### 0.2.0

-   (Lucky-ESA) Added automatic terms acceptance
-   (Lucky-ESA) Added 401 Thinq1 device
-   (Lucky-ESA) Added 101 Thinq1 device
-   (TA2k) Bugfix

### 0.1.4

-   (TA2k) Added warning for not supported devices

### 0.1.1

-   (TA2k) Added AC Device 401 thinq2
-   (TA2k) Bugfix

### 0.1.0

-   (TA2k) Added MQTT connection for live status updates

### 0.0.3

-   (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2023 TA2k <tombox2020@gmail.com>

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
