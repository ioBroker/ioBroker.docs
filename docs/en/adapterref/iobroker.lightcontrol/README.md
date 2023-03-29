![Logo](admin/lightcontrol.png)

# ioBroker.lightcontrol

[![NPM version](https://img.shields.io/npm/v/iobroker.lightcontrol.svg)](https://www.npmjs.com/package/iobroker.lightcontrol)
[![Downloads](https://img.shields.io/npm/dm/iobroker.lightcontrol.svg)](https://www.npmjs.com/package/iobroker.lightcontrol)
![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/iobroker.lightcontrol?label=npm%20vulnerabilities&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.lightcontrol?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.lightcontrol?label=npm%20dependencies&style=flat-square)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/lightcontrol/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![GitHub](https://img.shields.io/github/license/schmakus/iobroker.lightcontrol?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/schmakus/iobroker.lightcontrol?logo=github&style=flat-square)

![Test and Release](https://github.com/Schmakus/ioBroker.lightcontrol/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.lightcontrol.png?downloads=true)](https://nodei.co/npm/iobroker.lightcontrol/)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.lightcontrol.svg?color=red&label=beta)
![Stable](http://iobroker.live/badges/lightcontrol-stable.svg)
![Installed](http://iobroker.live/badges/lightcontrol-installed.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## If you like my work:

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PK89K4V2RBU78&source=url)

## Installation

Please use the "adapter list" & Beta Repository in ioBroker to install a beta version of this adapter. You can also use the CLI to install this adapter:

```
iobroker add lightcontrol
```

## Documentation

[🇺🇸 Documentation](./en/lightcontrol.md)

[🇩🇪 Dokumentation](./docs/de/lightcontrol.md)

## ToDo

-   Select more than one LightGroup for one Object-ID (Bug with jsonCustom Select multible)
-   Availability for notice with lower brighness and defined seconds before AutoOff

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.1 (2023-03-21)

-   (Schmakus) Fix calculation of color-temperature and added ct-reverse mode ([#96] [#89])
-   (Schmakus) Added brightness converting. Now you can use brighness states with 0-254 or 0-100
-   (Schmakus) some little bugfixes

### 0.2.0 (2023-02-20)

-   (Schmakus) Availability to switch on/off lights only with level/brightness state and without switch state
-   (Schmakus) Availability to set Ct, Sat and Color directly to the lamp, also if it's switched off.
-   (Schmakus) Added new Modus for AdaptiveCt: StartYourDay interplated. It's a sinus half curve from morning time to sunset.
-   (Schmakus) Update adaptername translations in io-package.json
-   (Schmakus) Some little bugfixes and corrections for logging
-   (Schmakus) Fix AdaptiveCt, because there was a problem with date object.

### 0.1.3 (2023-01-17)

-   (Schmakus) Added AdaptiveCt functionality. Was not implemented in older versions.

### 0.1.2 (2023-01-14)

-   (Schmakus) Some different small bugfixes and code cleaning
-   (Schmakus) Fix: Update for ioBroker Beta-Repo
-   (Schmakus) Fix: Adaptive Color-Temperature (failure by reading settings minCt and maxCt)

### 0.1.1 (2023-01-04)

-   (Schmakus) Availability to switch on/off lights only with level/brightness state and without switch state
-   (Schmakus) Add Sentry Plugin
-   (Schmakus) Fix issue [#80](https://github.com/Schmakus/ioBroker.lightcontrol/issues/80)
-   (Schmakus) general translation updates and translation of states

### 0.1.0 (2023-01-02)

-   (Schmakus) Latest Release

### 0.0.8 (2023-01-02)

-   (Schmakus) Ability to remove unused lights and sensors when deleting the light group
-   (Schmakus) Some code cleaning and update debug logs
-   (Schmakus) Update dependencies
-   (Schmakus) Update translations

### 0.0.6 (2022-12-29)

-   (Schmakus) New: [#61](https://github.com/Schmakus/ioBroker.lightcontrol/issues/61) Added infinite blinking. Please read the documentation.
-   (Schmakus) Fix: some little things.

### 0.0.5 (2022-12-27)

-   (Schmakus) Fix: [#66](https://github.com/Schmakus/ioBroker.lightcontrol/issues/66) Adding more than one lamp to group
-   (Schmakus) Fix: CustomConfig Color definitions
-   (Schmakus) Deleting hole light from group if it contains no states
-   (Schmakus) Updating CreateState Function for extended debugging

### 0.0.4 (2022-12-23)

-   (Schmakus) Fix: Warning by adding motion sensor to group
-   (Schmakus) New: Add Default Values for WarmWhite and DayLight at Color-State
-   (Schmakus) updating translations

### 0.0.3 (2022-12-22)

-   (Schmakus) Fix: Moving sensors and lights to other group
-   (Schmakus) Fix: Adding sensor to groups
-   (Schmakus) Update German Docu

### 0.0.2 (2022-12-20)

-   (Schmakus) first Alpha Release

### 0.0.1 (2022-12-01)

-   (Schmakus) Initial Release

## License

MIT License

Copyright (c) 2023 Schmakus <schmakus@gmail.com>

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
