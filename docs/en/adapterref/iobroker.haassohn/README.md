# ioBroker.haassohn
[![Number of Installations](http://iobroker.live/badges/haassohn-installed.svg)](http://iobroker.live/badges/haassohn-stable.svg) [![CodeQL](https://github.com/marvingrieger/ioBroker.haassohn/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/marvingrieger/ioBroker.haassohn/actions/workflows/codeql-analysis.yml) [![Test and Release](https://github.com/marvingrieger/ioBroker.haassohn/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/marvingrieger/ioBroker.haassohn/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/iobroker.haassohn.png)](https://npmjs.org/package/iobroker.haassohn)

This adapter has been tested on the following [Haas+Sohn](https://haassohn.com) devices:
* HSP 2.17 PREMIUM (V5.13)
* HSP 2.17 PREMIUM (V7.01)
* HSP 2.17 PREMIUM III (V7.02)
* HSP 6 PALLAZZA III (VV5.07)
* HSP 6 PALLAZZA III 519.08 (V5.12)
* HSP 6 PALLAZZA III 534.08 (V6.02)
* HSP 6 HELENA RLU (V7.07)
* HSP 6 PELLETTO IV Grande 434.08 (V7.08 & V7.11)
* HSP 6 PELLETTO IV 419.08 (V7.08 & V7.13)
* HSP 6 WT RLU
* HSP 7 DIANA Plus RLU (V7.06)
* HSP 7 DIANA (V7.04)
* HSP 7 (V6.07)
* HSP 8 CATANIA II 444.08-ST (V5.10)

This adapter has been tested on the following [Hark](https://www.hark.de) devices:
* Hark Ecomat 6

## Features
* All states of the device are read regularly (by polling) and represented in ioBroker
* The polling interval, the IP address of the device as well as the device PIN can be configured
* The adapter contains a predefined data model of the states of the device (defined in *io-package.json*). If the adapter senses that the data model is missing some states, the state of the adapter *missing_states* is set to true. This situation might occur, as the data model is not fully known (since the source code of the device is not available). The predefined data model was learned by observing the device
* The adapter gets disabled, if an error occurs (i.e., if the hardware / software version is not supported). In this case, the adapter is shut down internally (no further polling of the device). This is implied by the state *terminated* which then changes to *true*.
* The device can be controlled: it can be turned on and off (*prg*) and the desired temperature (*sp_temp*) can be set

## Changelog
### 1.0.11
* Added support for KS01_V7.01 (HSP 2 Premium)
* Updated dependencies

### 1.0.10
* Added support for KS01_V7.08 (HSP 6 PELLETTO IV 419.08) and HSP 6 WT RLU
* Updated dependencies
* Added new states (tvl_temp & room_mode)

### 1.0.9
* Added support for KS01_V6.07 (HSP 7)
* Updated dependencies

### 1.0.8
* Added support for KS01_V6.01 (Hark Ecomat 6)
* Removed gulp, added adapter-dev and updated dependencies

### 1.0.7
* Added support for KS01_V7.13 (HSP 6 PELLETTO IV 419.08)
* Updated dependencies

### 1.0.6
* Added support for KS01_V5.07 (HSP 6 PALLAZZA III)

### 1.0.5
* Added support for KS01_V7.11 (HSP 6 PELLETTO IV Grande 434.08)

### 1.0.4
* Updated dependencies

### 1.0.3
* Added support for KS01_V7.02 (HSP 2.17 PREMIUM III)

### 1.0.2
* Fixed findings from code review

### 1.0.1
* Support of compact mode

### 1.0.0
* Published adapter in ioBroker repository

### 0.3.0
* Renamed adapter to iobroker.haassohn

### 0.2.8
* Added support for KS01_V5.10 (HSP 8 CATANIA II 444.08-ST)

### 0.2.7
* Added support for KS01_V7.04-oKV (HSP 7 DIANA)

### 0.2.6
* Added support for KS01_V5.12 (HSP 6 PALLAZZA III 519.0)

### 0.2.5
* Added support for KS01_V7.08 (HSP 6 Pelletto-IV Grande 434.08)
* Refined some states

### 0.2.4
* Added support for KS01_V7.07 (Haas+Sohn Haas+Sohn HSP 6 HELENA RLU)
* Refined some states

### 0.2.3
* Added support for KS01_V7.06 (Haas+Sohn HSP 7 DIANA Plus RLU)

### 0.2.2
* Added support for KS01_V5.13 (Haas+Sohn HSP 2.17 PREMIUM)

### 0.2.1
* Added missing state

### 0.2.0
* The device can now be controlled. Currently, turning the device on and off (*prg*) and setting the desired temperature (*sp_temp*) is supported.

### 0.1.0
* First functional release. States of the device are read and represented in ioBroker. However, the device cannot be controled yet (e.g., setting the temperature).

### 0.0.1
* Initial release. The adapter is not functional yet.

## License
The MIT License (MIT)

Copyright (c) 2024 Marvin Grieger <github@marvingrieger.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.