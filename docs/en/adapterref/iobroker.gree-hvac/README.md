![Logo](admin/air-conditioner.png)
# iobroker.gree-hvac

[![NPM version](https://img.shields.io/npm/v/iobroker.gree-hvac.svg)](https://www.npmjs.com/package/iobroker.gree-hvac)
[![Downloads](https://img.shields.io/npm/dm/iobroker.gree-hvac.svg)](https://www.npmjs.com/package/iobroker.gree-hvac)
![Number of Installations](https://iobroker.live/badges/template-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/gree-hvac-stable.svg)

**Tests:** [![Test and Release](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/xhunter74/ioBroker.gree-hvac/actions/workflows/test-and-release.yml)

Adapter for Gree and C&amp;H conditioners

## Supported devices
All devices which can be controlled via EWPE Smart app should be supported, including:

- Gree Smart series
- Cooper&Hunter: Supreme, Vip Inverter, ICY II, Arctic, Alpha, Alpha NG, Veritas, Veritas NG series
- EcoAir X series
- ProKlima

**Please note that new air conditioners, and possibly old ones, will not work without internet access. They simply stop responding to adapter requests.**

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Changelog
### 2.0.4 (2025-10-16)
 - Migration to Trusted Publishing
### 2.0.3 (2025-10-10)
 - Updated dependencies
### 2.0.0 (2025-05-01)
 - BREAKING! Changed the minimal version of nodejs to 20. Updated dependencies.
### 1.1.5 (2025-03-01)
 - Updated dependencies
### 1.1.2 (2024-10-16)
 - Updated dependencies
 - Adjusted admin layout
### 1.1.0 (2024-08-13)
 - Added the AES-GCM encryption which is needed for some devices with newer firmware versions (e.g. gree model 32776, v1.23)
### 1.0.7 (2024-07-03)
 - Host Google icons locally. Updated dependencies.

## License
MIT License

Copyright (c) 2025 Serhiy Krasovskyy xhunter74@gmail.com

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

## Acknowledgments
- [tomikaa87](https://github.com/tomikaa87) for reverse-engineering the Gree protocol
- [stas-demydiuk](https://github.com/stas-demydiuk) for code of DeviceManager
- Sizenko Alexander for Digital-7 fonts
- [cont1nuity] for adding AES-GCM encryption
