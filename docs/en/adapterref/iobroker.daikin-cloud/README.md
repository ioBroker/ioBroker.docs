![Logo](admin/daikin-cloud.jpg)
# ioBroker.daikin-cloud

![Number of Installations](http://iobroker.live/badges/daikin-cloud-installed.svg)
![Number of Installations](http://iobroker.live/badges/daikin-cloud-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.daikin-cloud.svg)](https://www.npmjs.com/package/iobroker.daikin-cloud)

![Test and Release](https://github.com/Apollon77/iobroker.daikin-cloud/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/daikin-cloud/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.daikin-cloud.svg)](https://www.npmjs.com/package/iobroker.daikin-cloud)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 5.0.

## daikin-cloud adapter for ioBroker

Control Daikin Devices that are only connected to the Daikin Cloud / the Onecta App. The adapter connects to the Daikin-Cloud and polls the data from there. In order for this to work you need to dign up for a "Daikin Europe Developer Account" and create an application there. The adapter will then use the credentials of this application to connect to the Daikin Cloud.

## Disclaimer
**All product and company names or logos are trademarks™ or registered® trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them or any associated subsidiaries! This personal project is maintained in spare time and has no business goal.**
**Daikin is a trademark of DAIKIN INDUSTRIES, LTD.**

## Compatibility

This adapter should be compatible to devices with the Daikin WLAN-Adapters **BRP069C4x** that can be controlled via the Daikin Onecta App. A local connection to these devices is not possible!

Note: For devices with older WLAN-Adapters like **BRP069A4x** which can only be used by the Daikin Controller App please use the [Daikin](https://github.com/Apollon77/ioBroker.daikin) adapter instead.

## Functionality

The newer Daikin devices sold since 2020 contain a newer Wifi Adapter (e.g. BRP069C4x) which only connects to the Daikin Cloud and is no longer reachable locally. These devices are only controllable with the Daikin Onecta App.

This adapter allows to initially (hopefully once) retrieve tokens by using the personal developer account and a one time Login flow. After that these tokens can be used and refreshed to interact with the devices.

After connecting to the Daikin Cloud account the adapter will automatically create a new device for each device that is connected to the Daikin Cloud. All available data is displayed and several states allow to control the device.
**Please note that the command speed of the Daikin cloud is not mega fast which means that it can take up to 3 minutes before the command is really executed or states are updated!**

Additionally, there is a rate limit of 200 requests per day for the Daikin Cloud API. Because of this please consider the following best practices:

* A default polling interval of 15 minutes should be sufficient for most use cases while leaving some space for controlling the devices too. Consider that each control action requires 2 requests (one to control, one to update the data 1 minute after the control call). Especially with many devices this can really get problematic.
* The adapter also supports "Slow Polling" where you can define an own interval. Use the state `useSlowPolling`to enable or disable the slow polling based on your needs (e.g at night times poll just hourly ...)
* Ideally have at least 10 minutes time between switching the device power status because else thats bad for the moving parts of the devices

The current rate limit details are contained in the adapter i fo states and are updated every time the adapter makes a request to the Daikin Cloud.

## Changelog
### 0.4.12 (2025-05-24)
* (@JeroenVdb) Always send writable entries to the device, irrelevant of status, always update local values
* (@Apollon77) Optimize role detection for some states
* (@Apollon77) Tried to prevent too luch logging of the same error in a short time on Wifi issues

### 0.4.11 (2024-10-04)
* (Apollon77) Increase communication timeout to 10s to prevent refresh issues

### 0.4.10 (2024-07-20)
* (Apollon77) Fixes some error cases reported by Sentry

### 0.4.9 (2024-07-19)
* (Apollon77) Optimized write handling

### 0.4.8 (2024-07-12)
* (Apollon77) Optimized handling of rate limits, block maximum 24h and retry then
* (Apollon77) Added option to prevent sending the same values again (prevented by default!)

### 0.4.7 (2024-07-09)
* (Apollon77) Handles initialization issue where objects could be deleted wrongly
* (Apollon77) Also check for HTTPS usage when returning the redirect URL

### 0.4.6 (2024-07-07)
* (Apollon77) Update dependencies with optimizations and second blocking layer for rate limiting

### 0.4.5 (2024-07-06)
* (Apollon77) Block communication when rate limited according to Daikin response

### 0.4.4 (2024-07-06)
* (Apollon77) Fix initialization retry schedule

### 0.4.3 (2024-07-05)
* IMPORTANT: Minimum Node.js version is 18.2
* (Apollon77) BREAKING: Adjusted to new Daiking Cloud API - You need to reauthenticate!
* (Apollon77) BREAKING: New rate limit of new API is 200 requests per day!! Adjust your usage!
* (Apollon77) Added option to set "slow polling" interval
* (Apollon77) Make electrical data available as states (arrays for now)
* (Apollon77) Restore last data updated timestamp
* (Apollon77) Make sure cloudConnection always contains a boolean
* (Apollon77) Refresh token also when error is "Refresh Token has expired"

### 0.3.0 (2023-08-23)
* (Apollon77) Make compatible with Node.js 18+ too
* (Apollon77) Adjust name fallback

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

Copyright (c) 2022-2025 Apollon77 <iobroker@fischer-ka.de>

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
