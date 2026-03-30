![Logo](admin/envertech-pv.png)

# ioBroker.envertech-pv

**General Info:**<br>
[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.envertech-pv)](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.envertech-pv.svg)](https://www.npmjs.com/package/iobroker.envertech-pv)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.envertech-pv)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/envertech-pv/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.envertech-pv/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.envertech-pv)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.envertech-pv)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.envertech-pv.svg)](https://www.npmjs.com/package/iobroker.envertech-pv)
![Current version in stable repository](https://iobroker.live/badges/envertech-pv-stable.svg)
![Number of Installations](https://iobroker.live/badges/envertech-pv-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.envertech-pv/actions/workflows/codeql.yml)
<br>
**Donation:** </br>
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mcm1957atIoBroker)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/mcm1957)

**************************************************************************************************************
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

**************************************************************************************************************

## envertech-pv Adapter for ioBroker

The ioBroker.envertech-pv adapter empowers you to access and gather data from the [envertech cloud service](www.envertecportal.com) easily. By regularly polling the web service, this adapter ensures that all valuable information is promptly retrieved and stored in easily accessible states.

**************************************************************************************************************

## Disclaimer

**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**
**Envertech® is a registered trademark of Zhejiang Envertech Corporation Limited**

**************************************************************************************************************

## Documentation

[**English** documentation](docs/en/envertech.md)    
[**German** documentation](docs/de/envertech.md)

## Credits

This adapter would not have been possible without the great work of @adcrafter27 (https://github.com/adcrafter27), who analyzed and documented the REST API used to access the envertech cloud service.

## How to report issues and feature requests

Ideally, please use GitHub issues for this, with the best method achieved by setting the adapter to Debug log mode (Instances -> Expert mode -> Column Log level). Then retrieve the logfile from disk via the  'log' ioBroker subdirectory, **not** from Admin, which will cut lines. If you prefer to avoid providing it in a GitHub issue, email me (mcm57@gmx.at). Please reference the relevant **GitHub issue**, provide corresponding **descriptive commentary** and add **log timestamp(s)** where appropriate.

**************************************************************************************************************

**If you like this adapter, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mcm1957atIoBroker)

**************************************************************************************************************

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now

### 1.5.1 (2026-02-14)
-   (mcm1957) Dependencies have been updated.

### 1.5.0 (2025-08-16)
-   (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.6.17 now.
-   (mcm1957) Dependencies have been updated.

### 1.4.0 (2024-11-14)
-   (mcm1957) Adapter has been changes to meet Responsive Design Rules.
-   (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
-   (mcm1957) Dependencies have been updated.

### 1.3.2 (2024-03-28)
-   (mcm1957) Adapter supports multiple pages returned from Envertech now. This will allow more than 20 inverters per station.
-   (mcm1957) Adapter requires js-controller >= 5 now.
-   (mcm1957) Dependencies have been updated.

### 1.2.0 (2024-03-21)
-   (mcm1957) New states GridPower and LoadPower have been added [#147].
-   (mcm1957) Processing of strIncome has been fixed [#46].
-   (mcm1957) Incorrect description has been corrected [#50].
-   (mcm1957) State roles have been checked and adapter [#75].
-   (mcm1957) Dependencies have been updated.

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023-2025 mcm1957 <mcm57@gmx.at>, adcrafter27 <adcrafter27@gmail.com>

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
