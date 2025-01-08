![Logo](admin/boschindego.png)

# ioBroker.boschindego

[![NPM version](https://img.shields.io/npm/v/iobroker.boschindego.svg)](https://www.npmjs.com/package/iobroker.boschindego)
[![Downloads](https://img.shields.io/npm/dm/iobroker.boschindego.svg)](https://www.npmjs.com/package/iobroker.boschindego)
![Number of Installations](https://iobroker.live/badges/boschindego-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/boschindego-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.boschindego.png?downloads=true)](https://nodei.co/npm/iobroker.boschindego/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.boschindego/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## boschindego adapter for ioBroker

Adapter for Bosch Indego Mower to show the state of the mower and control the mower.

## Usage

Use id.remote.\* to control the mower

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (simatec) Fix Responsive Design

### 1.3.8 (2025-01-04)

- (mcm1957) jsonConfig has been reverted due to captcha requirements.

### 1.3.6 (2025-01-03)

- (TA2k) Fix for login. If settings are not loading, delete the instance and create a new instance.

### 1.3.2 (2024-11-28)

- (TA2k) Fix for Login
- (mcm1957) Incorrect versioning (1.2.3 instead of 1.3.2) has been corrected

### 1.3.0 (2024-11-12)

- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Adapter requires js-controller 5.0.19 and admin 6.17.14 now.
- (mcm1957) Issues reported by adapter checker have been fixed.
- (mcm1957) Dependencies have been updated.

### 1.2.2 (2024-10-18)

- (TA2k) fix login

### 1.2.0 (2024-04-03)

- (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.1.2 (2024-03-14)

- (TA2k) Map location has been fixed

### 1.1.1 (2024-03-03)

- (TA2k) Login has been fixed

### 1.1.0 (2023-12-01)

- (TA2k) fixed login flow

### 1.0.2 (2023-11-23)

- (TA2k) added client timeout

### 1.0.1 (2023-11-19)

- (TA2k) bump version. New Object structure please delete old objects and restart

### 1.0.0 (2023-11-18)

- (mcm1957) Version number has been bumped to 1.0.0 as lower numbers have been already used in the past.

### 0.1.1 (2023-11-11)

- (TA2k) initial release

## License

MIT License

Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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
