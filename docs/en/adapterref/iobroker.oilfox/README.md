![Logo](img/oilfox.png)
# ioBroker.oilfox

![Number of Installations](http://iobroker.live/badges/oilfox-installed.svg)
![Number of Installations](http://iobroker.live/badges/oilfox-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.oilfox.svg)](https://www.npmjs.com/package/iobroker.oilfox)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.oilfox/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/oilfox/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.oilfox.svg)](https://www.npmjs.com/package/iobroker.oilfox)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Description
This adapter allows getting data from the Oilfox sensor via the Oilfox Website.

## Settings
* specify your e-mail and password in the configuration page
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 4.1.1 (2022-04-03)
* (inidona) Usage of new oilfox api
* (bluefox) Added usage JSON configuration

### 4.0.2 (2022-03-27)
* IMPORTANT: All datastructures change with this update!
* IMPORTANT: Password needs to be re-entered after update!
* (inidona) update to new Oilfox API
* (Apollon77) General updates
* (Apollon77) Add Sentry for crash reporting

### 3.1.0 (2021.06.06)
* (jogibear9988) fix multiple oilfox

### 3.0.0 (2020.09.10)
* (bazidibavaria) fixes after api changes

### 2.1.0 (2019.11.26)
* (jogibear9988) fix first run

### 2.0.1 (2019.11.23)
* (jogibear9988) update to new api

### 1.0.0 (2019.11.09)
* (jogibear9988) support multiple oilfox

### 0.0.7 (2019.07.03)
* (jogibear9988) update node modules

### 0.0.6 (2019.01.11)
* (jogibear9988) gulp-task for translation

### 0.0.5
* (jk) bugfix release

### 0.0.4
* (jk) updated infos

### 0.0.3
* (jk) support compact mode
* (jk) input type password

### 0.0.2
* (jk) change to scheduled adapter

### 0.0.1
* (jk) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2022 jogibear9988 <jochen.kuehner@gmx.de>, ioBroker Community Developers

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
