---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.maxxi-charge.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.maxxi-charge.svg
BADGE-Number of Installations: https://iobroker.live/badges/maxxi-charge-installed.svg
BADGE-GitHub: https://img.shields.io/github/license/blabond/iobroker.maxxi-charge?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/blabond/iobroker.maxxi-charge?logo=github&style=flat-square
BADGE-Donation: https://img.shields.io/badge/Paypal-Donate-blue?style=flat
---
![Logo](admin/ms_logo_black_green.webp)

# ioBroker.Maxxi-Charge

[![NPM version](https://img.shields.io/npm/v/iobroker.maxxi-charge.svg)](https://www.npmjs.com/package/iobroker.maxxi-charge)
[![Downloads](https://img.shields.io/npm/dm/iobroker.maxxi-charge.svg)](https://www.npmjs.com/package/iobroker.maxxi-charge)
![Number of Installations](https://iobroker.live/badges/maxxi-charge-installed.svg)

![GitHub](https://img.shields.io/github/license/blabond/iobroker.maxxi-charge?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/blabond/iobroker.maxxi-charge?logo=github&style=flat-square)
![Test and Release](https://github.com/blabond/ioBroker.maxxi-charge/actions/workflows/test-and-release.yml/badge.svg)

[![Donation](https://img.shields.io/badge/Paypal-Donate-blue?style=flat)](https://paypal.me/boehrs)

**ioBroker.MaxxiCharge** is an adapter for the ioBroker system that enables the integration and control of MaxxiCharge CCU devices. The adapter provides a range of features, including reading device data, adjusting configurations, and sending control commands.

http://www.maxxisun.de


## Documentation

[🇺🇸 Documentation](https://github.com/blabond/ioBroker.maxxi-charge/blob/main/docs/en/README.md)

[🇩🇪 Dokumentation](https://github.com/blabond/ioBroker.maxxi-charge/blob/main/docs/de/README.md)

## Version Compatibility

|    Version    | CCU V1 Local | CCU V2 Local | CCU V1 Cloud | CCU V2 Cloud |
|:-------------:|:------------:|:------------:|:------------:|:------------:|
|  0.36 - 0.40  |      ❌       |      ❌       |      ✅       |      ❌       |
| 0.41 or newer |      ✅       |      ❓       |      ✅       |      ❓       |


🔹 **Legend**:  
✅ - Compatible  
❌ - Not compatible  
❓ - Unknown

## Changelog

### 1.4.40 (2025-05-13)
- New Option Mode "BKW"
> At a battery level of ≥ 97%, the script enables BKW mode to feed a constant 600–800 W into the grid alongside household use, potentially receiving compensation if registered as a balcony power system (BKW).

### 1.4.32 (2025-04-06)
- New cloud method – Backup mode Server 2 (check config)
  > Note: Cloud Server 1 provides more datapoints but may be less stable.  
  > Cloud Server 2 (Backup mode) is more stable but delivers fewer datapoints.
- Adds dynamic firmware version management with categorized release listings.

### 1.4.11 (2025-03-17)
- CloudApi: Request times no longer aligned to second 0 on all adapters, improving load distribution.
- Updated dependencies.

### 1.4.9 (2025-02-08)

- Bugfix on Battery Calibration.
- Fixes for stable release on ioBroker adapter.
- Feedback update

### 1.4.1 (2025-01-12)

- ### Please delete the `.sendcommand` folder and restart the adapter when updating from a previous version to this one.
- New: Added support for battery calibration (Expert Settings)
- Improved: Redesigned adapter settings for a better user experience

### 1.3.13 (2025-01-07)
- Fixed: Issue with the dcAlgorithm datapoint where the UI could crash due to an incorrect states definition
- Removed the info.localip datapoint. The local IP address is now directly included in the jsonConfig.
- Adjusted code to use modern methods, replacing deprecated ones like setObjectAsync.

### 1.3.0 (2024-12-15)
- **Summer/Winter mode** added:
  - Dynamic adjustment of charging parameters based on seasons.
  - Configurable with start and end dates.
- **Cloud API query interval**: Interval for CCU queries in cloud mode is now configurable via a slider between 10 and 60 seconds.

## License
MIT License

Copyright (c) 2024-2025

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