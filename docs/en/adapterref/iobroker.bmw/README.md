<img src="admin/bmw.png" alt="Logo" width="200">

# ioBroker.bmw

[![NPM version](https://img.shields.io/npm/v/iobroker.bmw.svg)](https://www.npmjs.com/package/iobroker.bmw)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bmw.svg)](https://www.npmjs.com/package/iobroker.bmw)
![Number of Installations (latest)](https://iobroker.live/badges/bmw-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/bmw-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.bmw.svg)](https://david-dm.org/TA2k/iobroker.bmw)

[![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)](https://nodei.co/npm/iobroker.bmw/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.bmw/workflows/Test%20and%20Release/badge.svg)

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

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix Remote Controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logice for remotes

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
