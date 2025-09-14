![Logo](admin/airquality.png)

# ioBroker.airquality

[![NPM version](https://img.shields.io/npm/v/iobroker.airquality.svg)](https://www.npmjs.com/package/iobroker.airquality)
[![Downloads](https://img.shields.io/npm/dm/iobroker.airquality.svg)](https://www.npmjs.com/package/iobroker.airquality)
![Number of Installations](https://iobroker.live/badges/airquality-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/airquality-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.airquality.png?downloads=true)](https://nodei.co/npm/iobroker.airquality/)

**Tests:** ![Test and Release](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## airquality adapter for ioBroker

Fetch data from German UBA

### Getting started

In this adapter, at least one environmental station from which measured values are to be collected must be entered in the configuration. The station names can be selected on the website of the Federal Environment Agency at https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten (then click on 'Nearest station') using the map displayed.
The stations always begin with 'DE', followed by the federal state 'BW' and a three-digit serial number. This identifier, e.g. 'DEBW052', must then be entered in the configuration page of the adapter (confirm with Enter). Further stations can also be added here.

If the coordinates are maintained in the main configuration of the ioBroker, the adapter attempts to find the nearest station itself when it is first started.

## Hint

It occasionally happens that measured values cannot be retrieved. This often happens at the top of the hour because data is presumably compressed and processed internally. But even at night (around midnight) it is often not possible to retrieve the data. A log entry 'No data received' is then written as a warning. This is not a defect in the adapter but is system-related.

### DISCLAIMER

Please make sure that you consider copyrights and trademarks when you use names or logos of a company and add a disclaimer to your README.
You can check other adapters for examples or ask in the developer community. Using a name or logo of a company without permission may cause legal problems for you.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.7 (2025-08-22)

- (raschy) Station names visible again

### 0.1.6 (2025-08-22)

- (raschy) Removal of an unused state
- (raschy) improved error messages
- (raschy) improved retrieval logic

### 0.1.5 (2025-05-03)

- (raschy) Supplementary data points i18n
- (raschy) Data point type corrected 
- (raschy) @iobroker/adapter-core 3.2.3 is recommended

### 0.1.4 (2024-12-16)

- (raschy) Instructions for use in GUI added

### 0.1.3 (2024-12-12)

- (raschy) inclusive deploy

### 0.1.2 (2024-12-12)

- (raschy) Ready for latest and tests

### 0.1.1 (2024-12-11)

- (raschy) Migration to ESLint 9 and @iobroker/eslint-config

### 0.1.0 (2024-12-03)

- (raschy) CO data retrieval added
- (raschy) Conversion as scheduled adapter

### 0.0.4 (2024-10-31)

- (raschy) Readme text expanded
- (raschy) Issue 1 [E254] and [W040] corrected

### 0.0.3 (2024-10-28)

- (raschy) Auto detection for location activated

### 0.0.2 (2024-10-28)

- (raschy) initial release

## License

MIT License

Copyright (c) 2024-2025 raschy <raschy@gmx.de>

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
SOFTWARE.# ioBroker.airquality
