![Logo](admin/daikin-cloud.jpg)
# ioBroker.daikin-cloud

![Number of Installations](http://iobroker.live/badges/daikin-cloud-installed.svg)
![Number of Installations](http://iobroker.live/badges/daikin-cloud-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)](https://www.npmjs.com/package/iobroker.daikin-cloud)

![Test and Release](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)](https://www.npmjs.com/package/iobroker.daikin-cloud)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## daikin-cloud adapter for ioBroker

Control Daikin Devices that are only connected to the Daikin Cloud / the Onecta App. The adapter connects to the Daikin-Cloud and polls the data from there. 

**This adapter can be installed with the following Node.js versions:**
* 12.19.0+
* 14.15.0+
* 16.13.0+
* Node.js 18 is currently NOT supported because the used OAuth library does not support it!

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**
**Daikin is a trademark of DAIKIN INDUSTRIES, LTD.**

## Compatibility

This adapter should be compatible to devices with the Daikin WLAN-Adapters **BRP069C4x** that can be controlled via the Daikin Onecta App. A local connection to these devices is not possible!

Note: For devices with older WLAN-Adapters like **BRP069A4x** which can only be used by the Daikin Controller App please use the [Daikin](https://github.com/Apollon77/ioBroker.daikin) adapter instead.

## Functionality

The newer Daikin devices sold since 2020 contain a newer Wifi Adapter (e.g. BRP069C4x) which only connects to the Daikin Cloud and is no longer reachable locally. These devices are only controllable with the Daikin Onecta App.

This adapter allows to initially (hopefully once) retrieve tokens by using a proxy to login to the Daikin Cloud. After that these tokens can be used and refreshed to interact with the devices.

After connecting to the Daikin Cloud account the adapter will automatically create a new device for each device that is connected to the Daikin Cloud. All available data is displayed and several states allow to control the device.
**Please note that the command speed of the Daikin cloud is not mega fast which means that it can take up to 3 minutes before the command is really executed or states are updated!**

### Login via E-mail/Password

If you want to provide the Daikin Cloud Credentials then the adapter can try to automatically login to the Cloud. The E-Mail and Password are stored encrypted in the configuration.

It can happen that this process does not work because the Daikin Website requires you to solve a captcha. In this can you can use the following trick:
* Start the proxy via Adapter-Configuration in Admin
* Click on the QR-Code in the Proxy popup
* You **do not** need to import the certificate!
* Just click on the `Login into the Daikin Cloud to retrieve the tokens` link at the end of the instructions page and login there once and solve the captcha.
* Close the browser window and restart the adapter

### Login via Proxy

**For more information on the Proxy progress for end users - because you need to trust and whitelist certificates and such - can be found in [PROXY.md](PROXY.md)!**
Info: This project is not grabbing any username or password, just the created tokens after you logged in. This also means that, if Daikin resets tokens or they expire that you need to do this process again!

## Changelog
### 0.2.3 (2022-09-12)
* (Apollon77) Clear the tokenset when email or password is changed in config

### 0.2.2 (2022-08-13)
* (Apollon77) Add naming support for devices using old WLAN adapters but updated for Onecta

### 0.2.1 (2022-07-03)
* (Apollon77) Fix the device info and count for connected devices in Admin UI

### 0.2.0 (2022-06-30)
* (Apollon77) Add name lookup for Altherma devices
* (Apollon77) Send data to Sentry on unknown device types

### 0.1.4 (2022-06-28)
* (Apollon77) Adjust logging on Login to be more clear

### 0.1.3 (2022-06-03)
* (Apollon77/Garfonso) Optimizations and fixes

### 0.1.2 (2022-05-27)
* (Apollon77) Prevent crash reported by Sentry

### 0.1.1 (2022-05-23)
* (Apollon77) Add Sentry for crash reporting

### 0.1.0 (2022-05-23)
* (Apollon77) initial release

## Disclaimer
**Daikin is a trademark of DAIKIN INDUSTRIES, LTD. I am in no way endorsed by or affiliated with DAIKIN INDUSTRIES, LTD., or any associated subsidiaries, logos or trademarks. This personal project is maintained in spare time.**

## License
MIT License

Copyright (c) 2022 Apollon77 <iobroker@fischer-ka.de>

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
