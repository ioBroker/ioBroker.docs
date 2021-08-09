![Logo](admin/homee.png)
# ioBroker homee Adapter

![Number of Installations](http://iobroker.live/badges/homee-installed.svg)
![Number of Installations](http://iobroker.live/badges/homee-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.homee.svg)](https://www.npmjs.com/package/iobroker.homee)

![Test and Release](https://github.com/Apollon77/iobroker.homee/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/homee/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.homee.svg)](https://www.npmjs.com/package/iobroker.homee)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Description
This adapter connects ioBroker to homee and provides the following features:
* allows connection via IP or homee-ID and username/password
* read all devices(nodes) and states (attributes) and show their values including updates in ioBroker
* allow changing values in ioBroker and send them back to homee to control devices
* acts as a ioBroker History provider for all states devices where history is enabled in homee. This means you can use the history values stored in homee to display in ioBroker using flot, Admin or also JavaScript including all aggregations on data level as known from e.g. History adapter

not (yet) supported:
* groups, because they don't offer any functions like a group-level-state or real writing to all devices at once in homee
* heating-plans

This adapter is based on the outstanding work of [stfnhmplr](http://twitter.com/stfnhmplr) and his [homee-api](https://github.com/stfnhmplr/homee-api).


## Known issues
* On js-controller <1.5.0 it can have strange effects when enabling other history providers on some of the roles (e.g. "switch")

## How to report issues and feature requests

Please use GitHub issues for this.

Best is to set the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then please get the logfile from disk (subdirectory "log" in ioBroker installation directory and not from Admin because Admin cuts the lines). If you do not like providing it in GitHub issue you can also send it to me via email (iobroker@fischer-ka.de). Please add a reference to the relevant GitHub issue AND also describe what I see in the log at which time.

## Changelog
### 1.2.0 (2021-08-01)
* (bluefox) Added admin5 support
* (Apollon77) Update to homee 2.33

### 1.1.1 (2021-04-10)
* (Apollon77) Update to homee 2.32

### 1.1.0 (2020-11-30)
* (Apollon77) Update to homee 2.30

### 1.0.7 (2020-06-12)
* (Apollon77) Fix Admin finally

### 1.0.6 (2020-06-12)
* (Apollon77) Fix Admin

### 1.0.5 (2020.04.12)
* (Apollon77) update homee lib to prevent a crash case

### 1.0.4 (2020.04.12)
* (Apollon77) fixes and optimizations
* (Apollon77) use js-controller 3.0 features if available 

### 1.0.2 (2020.03.22)
* (Apollon77) fixes and optimizations 

### 1.0.1 (2020.03.18)
* (Apollon77) fixes and optimizations 

### 1.0.0 (2020.03.13)
* (Seraphis411) fixed writing of HomeeMode
* (Seraphis411) bumped version of homee-api to 0.12.0 (no new features adopted)
* (Seraphis411) now support for nodejs 10 thanks to newer ws-library (^7.1.2) in homee-api
* (Apollon77) add sentry for error reporting
* (Apollon77) update homee api to 0.15.0

### 0.3.2 (2018.08.07)
* (Apollon77) corrected automatic role determination and added playing state for homeegrams

### 0.3.1 (2018.07.27)
* (Apollon77) Special handling for RGB values (delete objects and restart adapter)
* (Apollon77) Also allow enabling/disabling of Homeegrams (best delete objects unter Homee-0.Homeegrams!)
* (Apollon77) Optimize some roles, more Role feedback via Github issues please!

### 0.2.0 (2018.07.04)
* (Apollon77) Fix History logic (try) and add Homeegram support

### 0.1.1 (2018.07.04)
* (Apollon77) initial version

## License
The MIT License (MIT)

Copyright (c) 2018-2021 Apollon77 <iobroker@fischer-ka.de>

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
