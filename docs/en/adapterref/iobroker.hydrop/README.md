![Logo](admin/hydrop_Readme_Logo.png)
# ioBroker.hydrop

![Number of Installations](http://iobroker.live/badges/hydrop-installed.svg)
![Number of Installations](http://iobroker.live/badges/hydrop-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.hydrop.svg)](https://www.npmjs.com/package/iobroker.hydrop)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hydrop.svg)](https://www.npmjs.com/package/iobroker.hydrop)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.hydrop/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.hydrop)
![Test and Release](https://github.com/simatec/ioBroker.hydrop/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.hydrop?style=flat)](https://github.com/simatec/ioBroker.hydrop/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)

[![NPM](https://nodei.co/npm/iobroker.hydrop.png?downloads=true)](https://nodei.co/npm/iobroker.hydrop/)

This adapter uses the service `Sentry.io` to automatically report exceptions and code errors and new device schemas to me as the developer. More details see below!

*****

## Support adapter development
**If you like `ioBroker.hydrop`, please consider making a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)


*****

### What is Sentry.io and what is reported to the servers of that company?
Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or an other Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error free adapters that basically never crashs.


*****

## The hydrop adapter for ioBroker

This adapter allows you to seamlessly integrate your hydropmeter into ioBroker, bringing your water usage into your smart home. To learn more about the hydropmeter and hydrop systems, visit their website: https://hydrop-systems.com

To integrate your hydropmeter into ioBroker, you will need the following: 

* An account in the hydrop app (available for [Android](https://play.google.com/store/apps/details?id=com.hydropsystems.monitoring&pcampaignid=web_share) and [iOS](https://apps.apple.com/de/app/hydrop/id6740268955))
* The name you gave your hydropmeter in the app
* Your personal API key for the hydrop REST API

You can generate an API key in the hydrop app. Navigate to `Settings`, expand the `Account` section and tap on `API key`. The API key will only be shown once, please make sure to store it in a safe location.

Once you have all the information ready, you can get started. Enter the information in the settings page of your hydrop adapter instance and hit `Save`. The corresponding objects will be created automatically in the object tree.
Data is queried in ioBroker every 5 minutes.

*****

### How does the hydropmeter work?

The hydropmeter is a smart add-on for your water meter. Using advanced AI-based computer vision, it detects each change in the meter reading and thus creates a detailed, high resolution time series of your water consumption. By monitoring the flow rate, you can spot anomalies and find small leakages. Of course you can also receive alerts if the flow rate exceeds a certain maximum. Using ioBroker, the possibilities are near limitless.

If you want to check whether the hydropmeter is compatible with your type of water meter, please use this tool: https://shop.hydrop-systems.com/zaehlercheck/

*****

## Changelog
<!-- ### **WORK IN PROGRESS** -->
### **WORK IN PROGRESS**
* (simatec) Fix dependabot
* (simatec) Update dependencies

### 0.1.3 (2025-11-05)
* (Goriatch) Minified Adapter Logo
* (Goriatch) Localization, description and branding updates
* (simatec) Update dependencies

### 0.1.2 (2025-11-02)
* (simatec) Fix for Beta Release

### 0.1.1 (2025-11-02)
* (simatec) Fix for Beta Release

### 0.1.0 (2025-10-31)
* (simatec) Fix daily Consumption
* (simatec) Update dependencies

### 0.0.5 (2025-10-26)
* (simatec) Fix daily Consumption
* (simatec) get current states added
* (simatec) Fix output

### 0.0.4 (2025-10-23)
* (simatec) many small fixes

### 0.0.3 (2025-10-21)
* (simatec) Trusted Publisher added
* (simatec) Source code improved
* (simatec) Readme added

### 0.0.2 (2025-10-19)
* (simatec) initial release

*****

## License
MIT License

Copyright (c) 2025 simatec

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
