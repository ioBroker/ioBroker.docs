![Logo](admin/philips-air.png)
# ioBroker.philips-air

![Number of Installations](http://iobroker.live/badges/philips-air-installed.svg)
![Number of Installations](http://iobroker.live/badges/philips-air-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.philips-air.svg)](https://www.npmjs.com/package/iobroker.philips-air)

![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.philips-air.svg)](https://www.npmjs.com/package/iobroker.philips-air)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Philips air purifier adapter for ioBroker
Connects Philips air purifier with ioBroker.
**Tested only with AC2729**, but should work with new purifier that communicate via COAP with encryption.
![AC2729](img/device.png)

[Link to philips web site](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Usage
Only IP address of device is required. Find it in your router (e.g. `MiCO`).
It can happen, that some devices have not all variables and they will stay unfilled in object tree.

![Objects](img/objects.png)
## Changelog
### 0.1.4 (2022-03-23)
* (Apollon77) Downgrade coap library to restore functionality for some devices
* (Apollon77) Prevent crash case and make control more flexible
* (Apollon77) correctly handle control.function state

### 0.1.3 (2022-03-12)
* (Apollon77) General updates and optimizations

### 0.1.1 (2020-10-14)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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
