![Logo](admin/wolf-smartset.png)
# ioBroker.wolf-smartset
[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://www.paypal.com/paypalme/MeisterTR)

[![NPM version](http://img.shields.io/npm/v/iobroker.wolf-smartset.svg)](https://www.npmjs.com/package/iobroker.wolf-smartset)
[![Downloads](https://img.shields.io/npm/dm/iobroker.wolf-smartset.svg)](https://www.npmjs.com/package/iobroker.wolf-smartset)
![Number of Installations (latest)](http://iobroker.live/badges/wolf-smartset-installed.svg)
[![Dependency Status](https://img.shields.io/david/iobroker-community-adapters/iobroker.wolf-smartset.svg)](https://david-dm.org/iobroker-community-adapters/iobroker.wolf-smartset)
[![Known Vulnerabilities](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset/badge.svg)](https://snyk.io/test/github/iobroker-community-adapters/ioBroker.wolf-smartset)
![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.wolf-smartset/workflows/Test%20and%20Release/badge.svg)
<!-- ![Number of Installations (stable)](http://iobroker.live/badges/wolf-smartset-stable.svg) -->
[![NPM](https://nodei.co/npm/iobroker.wolf-smartset.png?downloads=true)](https://nodei.co/npm/iobroker.wolf-smartset/)

## wolf-smartset adapter for ioBroker
Connect your Wolf Heating to iobroker. This adapter connected to to the wolf-smartset cloud. This is not a local connection. The benefit is that you can use the Wolf-smartset app and also the data in iobroker.

## Hardware
You need a ISM7I Module or others which are compatible with the wolf-smartset app.

## Login
To login you only need your username and password from your smartset-app. After you click on "get devices" you can select your heating. Thats it.

## Changelog
### 1.0.0 (2021-07-31)
* (MeisterTR) fix Sentry: IOBROKER-WOLF-SMARTSET-6,IOBROKER-WOLF-SMARTSET-5, IOBROKER-WOLF-SMARTSET-7,IOBROKER-WOLF-SMARTSET-8,IOBROKER-WOLF-SMARTSET-1,IOBROKER-WOLF-SMARTSET-3,IOBROKER-WOLF-SMARTSET-4
* (MeisterTR) Change api from app data to Web PEASE DELETE ADAPTER AND REINSTALL OR DELETE ALL OBJECTS
* (MEISTERTR) added "FACHMANN" states
### 0.2.2 (26.03.2021)
* (MeisterTR) fix timeouts, fix conection
### 0.2.1
* (MeisterTR) Rebuild api and objects, breaking change
### 0.1.2
* (MeisterTR) Poll and set Values
* (MeisterTR) Fix error at start

### 0.1.0
* (MeisterTR) First running Version, Poll Param Only

## License
MIT License

Copyright (c) 2021 MeisterTR <meistertr.smarthome@gmail.com>

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
