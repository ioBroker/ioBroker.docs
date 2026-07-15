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
Connects Philips air purifiers and selected Philips/Versuni fans with ioBroker.
**Tested with AC2729 and Philips/Versuni CX3550/01**, but should work with newer purifiers that communicate via local CoAP with encryption.
![AC2729](img/device.png)

[Link to philips website](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

## Usage
Only IP address of device is required. Find it in your router (e.g. `MiCO`).
It can happen, that some devices have not all variables, and they will stay unfilled in object tree.

![Objects](img/objects.png)

## Philips/Versuni CX3550/01 fan
The CX3550/01 is supported through the local encrypted CoAP connection. No Philips, Versuni or HomeID cloud API is used.

Tested CX3550/01 functions:

- Power on/off
- Fan speed 1, 2 and 3
- Sleep mode
- Natural breeze
- Oscillation on/off
- Beep on/off
- Status reading via local CoAP
- Timer status reading

Timer control is intentionally not supported for the CX3550/01. Local timer write payloads can make the firmware set `D03102` to `0`, which switches the fan off. The adapter therefore exposes CX3550/01 timer information only as read-only status.

More details are documented in [docs/CX3550.md](docs/CX3550.md).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.6.1 (2026-07-03)
- (Holly86) Added support for Philips/Versuni CX3550/01 pedestal fan.
- (Holly86) Added CX fan modes, oscillation, beep and read-only timer state.
- (Holly86) Timer control is intentionally not exposed because local timer writes can switch the fan off.

### 1.5.0 (2026-06-24)
- (tt-tom17) CoAP connection now stays stable instead of disconnecting every few minutes
- (tt-tom17) Fixed adapter checker warnings

### 1.4.0 (2026-06-17)
- (tt-tom17) Connection to CoAP and HTTP devices is much more reliable now: several cases that could crash the adapter, freeze the connection or stop it from reconnecting have been fixed
- (tt-tom17) Air quality, filter and on/off values are now shown with the correct type and update reliably
- (tt-tom17) Clearer log messages, including a hint to switch to CoAP when a device does not answer on HTTP
- (tt-tom17) HTTP mode no longer needs the extra "philips-air" package and its outdated dependencies
- (tt-tom17) The device address field now accepts an IP address or a hostname and warns about invalid input
- (tt-tom17) Dependencies updated

### 1.3.0 (2026-06-15)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (mcm1957) Dependencies have been updated

### 1.2.0 (2025-02-10)
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now.
* (mcm1957) Adapter migrated to eslint 9 / @iobroker/eslint-config
* (mcm1957) Materialize UI support has been removed
* (mcm1957) jsonConfig responsive design size attributes have been added
* (mcm1957) Dependencies have been updated


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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
