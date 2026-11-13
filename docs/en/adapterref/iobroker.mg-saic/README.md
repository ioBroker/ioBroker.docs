# ioBroker MG/SAIC

[![NPM version](https://img.shields.io/npm/v/iobroker.mg-saic.svg)](https://www.npmjs.com/package/iobroker.mg-saic)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mg-saic.svg)](https://www.npmjs.com/package/iobroker.mg-saic)

<img src="admin/MG.png" alt="MG" width="314">

The adapter is intended for connecting MG and SAIC vehicles to ioBroker through the iSmart cloud service. It is not affiliated with or endorsed by MG, SAIC, or iSmart.

For manufacturer information, see [MG Motor](https://www.mgmotor.eu/) and [SAIC Motor](https://www.saicmotor.com/).

## Setup

### Before you start

- Node.js 22.22.2 or later is required.
- ioBroker js-controller 7.2.2 or later is required.
- ioBroker Admin 8.2.0 or later is required.
- Use an iSmart account that has access to the vehicle. A separate account shared with the vehicle is recommended to avoid interfering with the mobile app session.
- Have the account password ready. The adapter stores it as a protected setting.
- Select the region for the account. Available regions are European Union, China, Australia, Brazil, Israel, Turkey, Thailand, and Rest of World. India is not supported.

### Configure the adapter

1. Install the adapter and create an instance in ioBroker Admin.
2. Select the account region and login type (email or phone number).
3. Enter the account's email address or phone number and password. For phone login, also enter the phone country calling code.
4. Set the status polling interval to 60 seconds or more. The default is 1800 seconds.
5. Save the settings and start the instance. Vehicles available to the account appear under `vehicles.<VIN>`.
   Existing vehicle object IDs are reused if the cloud API changes the VIN casing. Device labels use the localized generic vehicle name; the VIN, brand, model, and other available vehicle metadata are provided as read-only states.

## Features

- Connects ioBroker to the iSmart cloud service and retrieves vehicle status.
- Provides remote controls for supported vehicle functions.
- Supports climate, heating, and charging features where available for the vehicle.
- Omits unrecognized free-form charging text while retaining numeric measurements and validated charging-point identifiers.

## Installation

The adapter is published on npm and available from ioBroker's Latest adapter repository.

## Support

[![Donate](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
### 0.1.4 (2026-11-11)

- (Voodoo2man) Corrected command-response validation, status values, charging-field handling, vehicle ID reuse, and cloud polling intervals; removed the non-informative vehicle name state.

### 0.1.3 (2026-11-08)

- (Voodoo2man) Retry startup initialization after temporary cloud login and vehicle-list outages with bounded backoff, prevent false setting writes from triggering remote setting actions, and add the missing region labels in the Admin UI.

### 0.1.2 (2026-11-08)

- (Voodoo2man) Prevented unsafe or case-colliding API fields and vehicle IDs from creating duplicate datapoints, kept status IDs stable across field-casing changes, scheduled polling after each completed cycle while honoring queued manual refreshes, and removed an unused cloud-backend translation.
- (Voodoo2man) Replaced untrusted cloud error text with English code-based diagnostics and standardized the product title as MG/SAIC across locales.
- (Voodoo2man) Reused dynamic charging datapoints across field-name casing changes and normalized known status fields.

### 0.1.1 (2026-11-07)

- (Voodoo2man) Lowered the minimum Node.js requirement to 22.22.2.
- (Voodoo2man) Improved charging datapoint labels and units, enforced safe polling interval limits, and added manufacturer references.

### 0.1.0 (2026-11-01)

- (Voodoo2man) Reported real-time charging power in kW using the pack current and voltage.
- (Voodoo2man) Applied confirmed profile-specific charging conversions.
- (Voodoo2man) Calculated available battery energy from battery level and usable capacity.

Older changelog entries are available in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Voodoo2man Voodoo2man@outlook.de

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