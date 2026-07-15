![Logo](admin/parcel.png)

# ioBroker.parcel

[![NPM version](https://img.shields.io/npm/v/iobroker.parcel.svg)](https://www.npmjs.com/package/iobroker.parcel)
[![Downloads](https://img.shields.io/npm/dm/iobroker.parcel.svg)](https://www.npmjs.com/package/iobroker.parcel)
![Number of Installations](https://iobroker.live/badges/parcel-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/parcel-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.parcel.svg)](https://david-dm.org/TA2k/iobroker.parcel)

[![NPM](https://nodei.co/npm/iobroker.parcel.png?downloads=true)](https://nodei.co/npm/iobroker.parcel/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.parcel/workflows/Test%20and%20Release/badge.svg)

## Parcel tracking adapter for ioBroker

Track parcels from Amazon, DHL, DPD, Hermes, UPS and GLS with your ioBroker smart home. Letter tracking of Deutsche Post is also supported. Notifications can be sent directly via Telegram, Pushover or Signal.

This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers. For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Login flow

**DHL:**

- Enter DHL app login
- Receive SMS/email code
- Enter code in instance settings and save

**Amazon:**

- Enter login credentials
- If required, enter an OTP token from your 2FA app before first login

**DPD, GLS, UPS, 17Track User:**

Enter username and password

**Telegram notification for parcels and letters**

Enable in instance settings and enter e.g. `telegram.0`

## Vis

**Show parcels in a Vis table**

Datapoint for all parcels:
`parcel.0.allProviderJson`

Datapoint for parcels in delivery:
`parcel.0.inDelivery`

**Widget: json table**

Instructions:
https://www.smarthome-tricks.de/software-iobroker/iobroker-vis-json-table-widget-teil-1-basics/

**Display DHL letter tracking in Vis**

Assign the datapoint `parcel.0.dhl.briefe....image` to a "String img src" element as object ID.

## Discussion and questions

<https://forum.iobroker.net/topic/51795/test-adapter-parcel-paketverfolgung-dhl-v0-0-1>

## Changelog
### 0.3.2 (2026-07-08)
- Fix for DPD
- Fix for GLS

### 0.3.1 (2026-07-07)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.3.0 (2026-04-05)

- DHL: New login via browser code (dhllogin://)
- Amazon: Login fix and captcha detection with note

### 0.2.10 (2025-01-15)

- add alternative way for dhl login
- move dhl connections error to info level

### 0.2.8 (2024-10-18)

- fix amazon login

### 0.0.30

- Fix hermes login

### 0.0.25

- Fix amazon UI parsing

### 0.0.19

- Fix GLS Parcel

### 0.0.18

- Fix UPS/GLS Login

### 0.0.1

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022-2026 TA2k <tombox2020@gmail.com>

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
