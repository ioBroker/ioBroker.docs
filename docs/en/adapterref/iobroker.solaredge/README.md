![Logo](admin/solaredge.png)
# ioBroker.solaredge

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solaredge.svg)](https://www.npmjs.com/package/iobroker.solaredge)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.solaredge.svg)](https://www.npmjs.com/package/iobroker.solaredge)
![Current version in stable repository](https://iobroker.live/badges/solaredge-stable.svg)
![Number of Installations](https://iobroker.live/badges/solaredge-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml)

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Solaredge Adapter for ioBroker 

Get data from solaredge monitoring portal.
Currently, only the /overview data point is used to get the current power and day/month/year/lifetime energy readings.

You can also enable modbus on your solaredge device if it's a newer one and read the data directly. 

You need your site id and api key to use this adapter. To get these, go to https://monitoring.solaredge.com  
- site id: log in, site id is the "ID" on the right, e.g., 12345.  
- api key: log in, go to the admin settings and enable api access there. If you don't see admin settings, send mail to solaredge to enable admin for your account.


## Credits

This adapter would not have been possible without the great work of @92lleo (https://github.com/92lleo), who wrote the code for the initial versions and released it to ioborker-community-adapters.

<!--
	### **WORK IN PROGRESS**
-->
## Changelog
### 1.3.0 (2024-02-15)
* (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
* (mcm1957) Adapter translations have been linked to weblate.
* (mcm1957) Dependencies have been updated.

### 1.2.2 (2023-12-14)
* (bluefox) Added random seconds to the schedule
* (bluefox) Updated packages
* (bluefox) Allowed adapter execution by restart

### 1.2.0 (2023-12-06)
* (mcm1957) Adapter did not terminate in case of an exception. This has been fixed.
* (mcm1957) A response timeout has been added to network calls.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-11-16)
* (bluefox) Added the current power flow data

### 1.0.1 (2023-08-18)
* (bluefox) Added JSON config and replaced `require` module with `axios`

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add a connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

## License
MIT License

Copyright (c) 2023-2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2019-2023 Leonhard Kuenzler <leonhard@kuenzler.io>

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
