![Logo](admin/ford.png)

# ioBroker.ford

[![NPM version](https://img.shields.io/npm/v/iobroker.ford.svg)](https://www.npmjs.com/package/iobroker.ford)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ford.svg)](https://www.npmjs.com/package/iobroker.ford)
![Number of Installations (latest)](https://iobroker.live/badges/ford-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/ford-stable.svg)
[![Dependency Status](https://img.shields.io/david/TA2k/iobroker.ford.svg)](https://david-dm.org/TA2k/iobroker.ford)

[![NPM](https://nodei.co/npm/iobroker.ford.png?downloads=true)](https://nodei.co/npm/iobroker.ford/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.ford/workflows/Test%20and%20Release/badge.svg)

## ford adapter for ioBroker

Adapter for FordPass

## Usage

### OAuth 2.0 Login

The adapter uses OAuth 2.0 authentication. Follow these steps to authenticate:

1. Start the adapter - it will display an authentication URL in the log
2. **IMPORTANT: Open Developer Tools (F12) BEFORE clicking the login URL**
3. Go to the Network tab in Developer Tools
4. Copy the OAuth URL from the log and paste it into your browser
5. Log in with your Ford account credentials
6. After login, the browser will show "Cannot open page" - this is expected
7. In the Network tab, find the failed request with the red URL starting with `fordapp://userauthorized/?code=`
8. Copy the complete URL from the Network tab
9. Paste it into the "v2 Code URL" field in the adapter settings
10. Save and restart the adapter

### Remote Controls

The adapter creates remote control buttons for each vehicle under `{VIN}.remote.*`:

- **engine/start**: Start or stop the engine (true = start, false = stop)
- **doors/lock**: Lock or unlock doors (true = lock, false = unlock)
- **status**: Request a fresh status update from the vehicle (sends statusRefresh command)
- **refresh**: Refresh the cached data without sending a command to the vehicle

### Configuration Options

- **Update interval**: Time in minutes between automatic data updates (default: 5 minutes)
- **Location Update**: Enable/disable location updates. Disabling this allows for shorter update intervals and reduces battery drain
- **Force Update**: Enable automatic statusRefresh command at each interval (WARNING: May drain 12V battery. Only enable if your vehicle supports this command)
- **Skip 12V Check**: Disable the 12V battery check when using Force Update

### Battery Protection

The adapter queries cached vehicle data in regular intervals by default. To request fresh data from the vehicle, either:

- Enable the "Force Update" option (only if your vehicle supports it)
- Use the `{VIN}.remote.status` button manually

**Note:** Some vehicles may not support the `statusRefresh` command and will return a 404 error - this is normal. In this case, disable "Force Update" and use the `refresh` button instead.

## Changelog

### 1.1.5 (2025-12-29)

- update API headers to match latest FordPass app
- fix checkbox display in adapter configuration UI

### 1.1.4 (2025-12-27)

- fix login flow

### 1.0.5 (2024-07-09)

- Add location update option to reduce update requests

### 1.0.3 (2024-06-22)

- improve help text

### 1.0.2 (2024-05-24)

- improved failed login

### 1.0.0 (2024-05-24)

- added new login flow and public api. All new Datapoints

### 0.2.3 (2024-05-17)

- reverted domain ending setting to fix login

### 0.2.1 (2024-05-10)

- fixed login and added domain ending in settings

### 0.2.0

- Login Fix

### 0.0.14

- Improvements to prevent blocking from Ford

### 0.0.13

- removed not working detail api

### 0.0.12

- fix login

### 0.0.11

- fix login

### 0.0.8

- (TA2k) add remote control for refresh

### 0.0.7

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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
