![Logo](admin/openweathermap.png)

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
### 0.3.9 (2023-06-07)
* (bluefox) updated build process

### 0.3.8 (2023-03-09)
* (bluefox) update packages

### 0.3.6 (2023-02-27)
* (Bluefox) Installation from GitHub does not possible anymore

### 0.3.4 (2023-02-22)
* (Bluefox) Updated packages

### 0.3.3 (2022-10-24)
* (Bluefox) Updated widget for vis 2.0

### 0.3.0 (2022-07-12)
* (Bluefox) Added new widget for vis 2.0

### 0.2.5 (2022-06-12)
* (Apollon77) Make sure all forecast data are processed correctly

### 0.2.4 (2022-04-19)
* (Apollon77) Fix crash case when states have invalid metadata

### 0.2.3 (2022-03-15)
* (Apollon77) Increase timeout to read data to 10s

### 0.2.2 (2022-03-11)
* (Apollon77) Fix crash case (Sentry IOBROKER-OPENWEATHERMAP-1)

### 0.2.1 (2022-03-10)
* (Apollon77) Move schedule if default is used and adjust to once an hour to better spread the requests over time to prevent peaks; Additionally add a random delay in the start minute
* (klein0r) updated everything
* (Apollon77) updated unload/stop handling

### 0.1.0
* (bluefox) first release

## License

The MIT License (MIT)

Copyright (c) 2018-2023 bluefox <dogafox@gmail.com>

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
