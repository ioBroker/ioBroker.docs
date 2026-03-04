![Logo](admin/epson_ecotank_et_2750.png)

# ioBroker.epson_ecotank_et_2750

![Number of Installations](https://iobroker.live/badges/epson_ecotank_et_2750-installed.svg?dummy=unused) ![Number of Installations](https://iobroker.live/badges/epson_ecotank_et_2750-stable.svg?dummy=unused) [![NPM version](https://img.shields.io/npm/v/iobroker.epson_ecotank_et_2750.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.epson_ecotank_et_2750)
[![Downloads](https://img.shields.io/npm/dm/iobroker.epson_ecotank_et_2750.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.epson_ecotank_et_2750)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/epson_ecotank_et_2750/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)  
[![NPM](https://nodei.co/npm/iobroker.epson_ecotank_et_2750.png?downloads=true)](https://nodei.co/npm/iobroker.epson_ecotank_et_2750/)

## EPSON EcoTank ET-2750 adapter for ioBroker

This adapter read tank level and other information from [EPSON EcoTank ET-2750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2750) and store in ioBroker.

[EPSON EcoTank ET-4750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-4750) is also supported (tested by [Homoran](https://forum.iobroker.net/user/homoran))  
[EPSON EcoTank ET-3750](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-3750) is also supported (tested by [christofkac](https://github.com/christofkac))  
[EPSON EcoTank ET-2721](https://www.epson.de/products/printers/inkjet-printers/for-home/ecotank-et-2721) is also supported (tested by [mikepiko](https://github.com/mikepiko))  
[EPSON WORKFORCE WF-3620DWF](https://www.epson.de/products/printers/inkjet-printers/for-home/workforce-wf-3620dwf) is also supported (tested by [HReimann](https://github.com/HReimann))

## Credits

This adapter would not have been possible without the great work of @o0Shojo0o (https://github.com/o0Shojo0o), who developed former releases of this adapter.

## How to report issues and feature requests

Ideally, please use GitHub issues for this, with the best method achieved by setting the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then retrieve the logfile from disk via the  'log' ioBroker subdirectory, **not** from Admin, which will cut lines. 

## Configuration

1. Create a new instance of the adapter
2. Fill the URL/IP and port of the EPSON EcoTank ET-2750
3. Configur ther Synctime (default 10 minutes)
4. Save the settings

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 1.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 0.0.12 (2022-06-09)

-   (o0Shojo0o) fix ETIMEDOUT error

### 0.0.11 (2021-08-24)

-   (o0Shojo0o) fix name for Workforce 3620
-   (o0Shojo0o) fix firmware for Workforce 3620

### 0.0.10 (2021-08-19)

-   (o0Shojo0o) fix translation

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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

---

_Dank an die Erfinder des Basisskripts zum Parsen der Daten, Idittmar und MistyReblaus aus dem [Homematic-Forum](http://homematic-forum.de/forum/viewtopic.php?f=31&t=25140)._ :+1:

\*Dank an pix und rr0v1 für die Vorlage
