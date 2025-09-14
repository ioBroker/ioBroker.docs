![Logo](admin/bshb-logo.jpg)

# ioBroker.bshb

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://www.paypal.com/donate?business=holomekc%40googlemail.com&currency_code=EUR)

[![NPM version](http://img.shields.io/npm/v/iobroker.bshb.svg)](https://www.npmjs.com/package/iobroker.bshb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bshb.svg)](https://www.npmjs.com/package/iobroker.bshb)
![Number of Installations (latest)](http://iobroker.live/badges/bshb-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/bshb-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/holomekc/ioBroker.bshb/badge.svg)](https://snyk.io/test/github/holomekc/ioBroker.bshb)
[![Main](https://github.com/holomekc/iobroker.bshb/actions/workflows/test.yml/badge.svg)](https://github.com/holomekc/iobroker.bshb/actions/workflows/test.yml)

[![NPM](https://nodei.co/npm/iobroker.bshb.png)](https://nodei.co/npm/iobroker.bshb/)

## bosch-smart-home-bridge adapter for ioBroker

This adapter allows to communicate with Bosch Smart Home devices.

[Bosch Smart Home Controller](https://www.bosch-smarthome.com/de/de/produkte/smart-system-solutions/smart-home-controller)

To achieve that it uses the [bosch-smart-home-bridge](https://github.com/holomekc/bosch-smart-home-bridge) library
which uses the information from
official [Bosch Smart Home Controller Local REST API](https://github.com/BoschSmartHome/bosch-shc-api-docs).

IoBroker Forum Discussion for the BSHB Adapter:
https://forum.iobroker.net/topic/25370/test-adapter-bshb-bosch-smart-home-v0-0-x/

Examples:
https://github.com/holomekc/ioBroker.bshb/wiki/Examples

Work in progress. Feedback appreciated.

If you want to support the work I would appreciate a small donation. This is 100% voluntary and not necessary for the
use of the adapter. You find a link at the top.

## Changelog

### 0.5.2

* Dependencies updated

### 0.5.1

* Dependencies updated

### 0.5.0

* (holomekc) Minor cleanup

### 0.4.2

* (holomekc) Fixed undefined object issue
* Dependencies updated

### 0.4.1

* Dependencies updated

### 0.4.0

* (holomekc) Minor bug fixes
* (holomekc) Support for backups.
* (holomekc) If you want to use the backup feature make sure that the systempassword is set in the adapter config.
  Furthermore, in the Bosch app set the client permissions to „Operate and manage“. „More“ ➤ „Mobile Devices“ ➤ „OSS
  ioBroker.bshb“

### 0.3.0

* (holomekc) Support for user automations

### Older entries

[here](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2025 Christopher Holomek <holomekc.github@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
