![Logo](admin/openweathermap.svg)

# ioBroker.openweathermap

![Number of Installations](http://iobroker.live/badges/openweathermap-installed.svg)
![Number of Installations](http://iobroker.live/badges/openweathermap-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.openweathermap.svg)](https://www.npmjs.com/package/iobroker.openweathermap)

![Test and Release](https://github.com/ioBroker/ioBroker.openweathermap/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/openweathermap/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openweathermap.svg)](https://www.npmjs.com/package/iobroker.openweathermap)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Fetches 5 days weather forecast from [https://openweathermap.org/](openweathermap.org)

You need an api key to access the data. The api key you can get for free after registration [here](https://home.openweathermap.org/api_keys).

<!--
	### **WORK IN PROGRESS**
-->
## Changelog
### 2.0.0 (2026-08-16)
* (@JDCodes) Added feels_like temperature, visibility and the day name (long and short) as text
* (@JDCodes) Daily rain and snow are now totals and not averages
* (@JDCodes) Fixed NaN for rain and snow
* (@GermanBluefox) Minimal supported Node.js version is now 22
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now

### 1.4.0 (2025-08-03)
* (@tt-tom17) Added wind direction as text

### 1.3.0 (2025-05-21)
* (bluefox) Widget was completely ported to TypeScript
* (bluefox) Backend was completely ported to TypeScript

### 1.2.0 (2024-07-23)
* (bluefox) Widget was partly ported to TypeScript

### 1.1.2 (2024-07-07)
* (bluefox) Removed withStyles package

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2018-2026 bluefox <dogafox@gmail.com>

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
