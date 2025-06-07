<img src="admin/bmw.png" alt="Logo" width="200">

# ioBroker.bmw

[![NPM version](https://img.shields.io/npm/v/iobroker.bmw.svg)](https://www.npmjs.com/package/iobroker.bmw)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bmw.svg)](https://www.npmjs.com/package/iobroker.bmw)
![node-lts](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)](https://snyk.io/test/github/TA2k/ioBroker.bmw)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/bmw-stable.svg)
![Installed](https://iobroker.live/badges/bmw-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)](https://nodei.co/npm/iobroker.bmw/)

# BMW Adapter for ioBroker

This adapter seamlessly integrates BMW vehicles into ioBroker, enabling you to monitor and control your BMW directly within the ioBroker platform. It fetches and updates data for all BMW models linked to your BMW account through the official BMW app, providing vehicle properties and supporting remote commands.

## Features
- Retrieves and updates BMW vehicle data from the BMW ConnectedDrive service.
- Enables remote commands for your BMW under `bmw.0.VIN.remotev2`.

## Login Process
1. In the instance options, input your BMW account login credentials and complete the CAPTCHA/reCAPTCHA verification if prompted.
2. Select your vehicle type.
3. As the API quota is limited, you may disable certain statistics fetching to optimize usage.
4. Set an update interval that aligns with your data needs—some trial and error may be required to stay within the maximum quota.
5. To increase the quota, you can optionally add a second user account.
6. Initial data may appear after a brief delay or following the vehicle’s first activity (e.g., a drive).

## Data Structure
Vehicle-specific data is accessible under `bmw.0.VIN.properties`, where `VIN` represents the Vehicle Identification Number of your BMW.

## Remote Commands
Remote control of your BMW is available under `bmw.0.VIN.remotev2`. Supported actions may include locking/unlocking doors, activating climate control, or triggering other vehicle functions, depending on your BMW model and ConnectedDrive features.

*Note: The available fields and remote capabilities vary based on your BMW model and the ConnectedDrive API.*

## Source
This adapter is available at: [https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

### **WORK IN PROGRESS**

- BREAKING: Dropped support for Node.js 18 (#88)
- (hombach) BREAKING: Dropped support for js-controller 5 (#111)
- (hombach) BREAKING: change to admin 7.4.10 as recommended by ioBroker (#111)
- (hombach) encrypt and protect second user password - has to be reentered (#111)
- (hombach) bump dependencies

### 2.9.5 (2025-05-18)

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix remote controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logic for remotes

### 2.8.4 (2024-11-21)

- improved charging session parsing
- added remote to fetch charging session from a specific month
- added raw JSON of charging session for export

### 2.8.3 (2024-11-18)

- login fixed

### 2.8.2 (2024-10-05)

- fix error getvehicles v2 failed

### 2.8.1 (2024-09-30)

- fix remote commands

### 2.7.1

- Bugfixes

### 2.5.5

- Fix login

### 2.5.0

- Fix login

### 2.4.1

- Add support for MINI and force refresh remote

### 2.3.0

- Disable v1 Endpoints

### 2.1.1

- Upgrade to statusV2 and remoteV2

### 2.0.0

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2025 TA2k <tombox2020@gmail.com>

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
