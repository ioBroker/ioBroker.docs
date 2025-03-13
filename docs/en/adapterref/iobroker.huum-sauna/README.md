![Logo](admin/huum-sauna.png)
# ioBroker.huum-sauna

![NPM version](https://img.shields.io/npm/v/iobroker.huum-sauna.svg)
![Number of Installations](https://iobroker.live/badges/huum-sauna-stable.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.huum-sauna)
![Number of Installations (latest)](https://iobroker.live/badges/huum-sauna-installed.svg)
![License](https://img.shields.io/npm/l/iobroker.huum-sauna.svg)

![NPM](https://nodei.co/npm/iobroker.huum-sauna.png?downloads=true)

This adapter integrates the HUUM sauna control device into iobroker.
The specification of HUUM Devive for the sauna control can be found [here](https://huum.de/). The API description you can find ([github.com/horemansp/HUUM](https://github.com/horemansp/HUUM))

## Parameters
- 1 + 2 User Credentials for HUUM Webpage "https://api.huum.eu/action/home/"
- 3 refresh     .. Refresh to load HUUM data from the device
- 4 lightpath   .. Optional Lightpath (state) for switching external light. If empty HUUM switch method is used
- 5 AstroLight  .. When set the light is automatically switched on by sunset (for outdoor saunas).

## Usage example
![grafik](https://user-images.githubusercontent.com/56934142/150417838-425261da-a6c7-47b3-bf1b-2af6035ffd59.png)

## Changelog

### 0.5.0 (2025-02-23)
- updated dependencies
- js-controller
- core

### 0.4.5 (2023-10-31)
- Fixed login with no sauna defined
- Steamer Error -> setting humdidity to 0, old version otherwise sauna will be switched off

### 0.4.4 (2023-02-12)
- adapted temp reached when sauna is stopped from the app
- added an offset for temp reached value when use the intelligent sauna mode

### 0.4.3 (2023-01-31)
- Fixed Switchlight when lightpath is empty

### 0.4.2 (2022-09-25)
- Fixes on presets, no more states for the setting

### 0.4.1 (2022-09-25)
-  Added new Preset states for steam or dry saunamode

### 0.4.0 (2022-08-21)
- fixed light external state issue

### 0.3.9 (2022-08-20)
- added steamerError, when error occurs sauna is switched off and a warning is documented
- saftey issue, reduce targettemperatur when in steam mode
- some minor changes

### 0.3.8 (2022-08-04)
- Add Sauna Sleep Refresh Time as parameter, when set to 0 there is no traffic otherwise update in minutes

### 0.3.7 (2022-02-26)
- add Sauna Images -> adapted from icons-mfd-svg Images
- added sleepRefresh when Sauna is switched off to reduce network traffic (30 minutes)

### 0.3.6 (2022-02-20)
- release script
- fixes

### 0.3.1 (2022-02-20)
- included automated switch on light

### 0.3.0 (2022-02-13)
- create stable version

### 0.2.1 (2022-01-30)
- create npm package

### 0.2.0 (2022-01-30)  - 2022 Release
- minor Version created

### 0.1.10 (2022-01-30)
- added Trigger (state targetTempReached) when sauna temperature is reached
- Minor bug fixes and code revisions

### 0.1.7
- starting sauna with target temperature and humidity
- switch on light in sauna (also on separat id)
- subscribe also foreign state id
- minor bugs and code revision

### 0.1.6
- starting sauna with target temperature
- switch on light in sauna (also on separat id)
- get sauna status

### 0.1.0
- initial version

<!--

## [Changelog](CHANGELOG.md)
-->

## License
Copyright (c) 2025 Chris <besterquester@live.at>

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
