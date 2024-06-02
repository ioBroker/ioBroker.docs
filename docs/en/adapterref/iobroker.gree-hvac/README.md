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
### 1.0.0 (2024-05-31)
 - Small fixes. Ready to production.
### 0.0.14 (2024-04-15)
 - First version of the adapter

## License
MIT License

Copyright (c) 2024 Serhiy Krasovskyy xhunter74@gmail.com

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
