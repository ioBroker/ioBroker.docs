![Logo](admin/deyeidc.png)

# ioBroker.deyeidc

[![NPM version](https://img.shields.io/npm/v/iobroker.deyeidc.svg)](https://www.npmjs.com/package/iobroker.deyeidc)
[![Downloads](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)](https://www.npmjs.com/package/iobroker.deyeidc)
![Number of Installations](https://iobroker.live/badges/deyeidc-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/deyeidc-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)](https://nodei.co/npm/iobroker.deyeidc/)

**Tests:** ![Test and Release](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## deyeidc adapter for ioBroker

Data Collector vor Deye-compatible Inverter

## Usage

To commission the adapter, the register ranges and coils must be entered in the GUI in addition to the IP address and the logger serial number in the following pages. There is already an example entry for this.
Certain values are not supplied by the inverter and must be calculated independently. For this purpose, two values per line can be entered in the 'compute' table, which are then multiplied.

### DISCLAIMER

All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal. DEYE is a trademark of Copyright © 2023 Ningbo Deye Technology Co., Ltd., No.26 South Yongjiang Road, Beilun, Ningbo, Zhejiang, 315806 VR China.

### Getting started

This adapter makes it possible to read out data from an inverter in the local network. This data is retrieved via the known Modbus ports and stored in the data points. This was developed and tested on a "Deye-compatible" inverter. The registers to be queried may therefore differ on other models.
For this, only the IP of the inverter and the serial number of the logger must be entered. If the port differs from the default value, it can also be adjusted. 60 seconds has been preset as a practicable value for the sampling rate.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.0.9 (2023-07-10)

-   (raschy) minor bugs fixed

### 0.0.8 (2023-07-10)

-   (raschy) Day reset for offline operation

### 0.0.7 (2023-05-27)

-   (raschy) release for npm and ioBroker latest

### 0.0.6 (2023-05-27)

-   (raschy) Some processes optimized

### 0.0.5 (2023-04-27)

-   (raschy) Calculations modified with formulas
-   (raschy) Error messages in English

### 0.0.4 (2023-03-21)

-   (raschy) release for npm

### 0.0.3 (2023-03-21)

-   (raschy) release

### 0.0.2 (2023-03-21)

-   (raschy) initial release

## License

MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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
