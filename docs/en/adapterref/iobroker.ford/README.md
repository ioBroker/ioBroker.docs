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

Adapter for Ford vehicles using Ford's official FordConnect Query API (EU Data Act).

## Usage

### Prerequisites

Create an app in Ford's developer portal at <https://developer.ford.com/developer-eu>.
Use the same email address as your FordPass account, set a Redirect URI (e.g.
`http://localhost:8080/callback`) and note the generated Client ID and Client Secret.

### Login

1. Enter Client ID, Client Secret and Redirect URI in the adapter settings and save.
2. Start the adapter - it prints a login URL in the log.
3. Open the URL in your browser, log in with your FordPass account and authorize the app.
4. You are redirected to your Redirect URI with a `?code=...` parameter.
5. Copy the complete redirect URL from the browser address bar.
6. Paste it into the "Code URL" field in the adapter settings, save and restart the adapter.

The adapter exchanges the code for tokens, stores the session and refreshes it automatically.

### Data

- `{VIN}.general` - vehicle information from the garage endpoint
- `{VIN}.telemetry` - telemetry data (SoC, range, odometer, location, tire pressure, etc.)
- `{VIN}.vehicleHealthAlerts` - vehicle health alerts
- `{VIN}.wallbox` - wallbox data (EV only, if available)
- `{VIN}.departureTimes` - electric departure times (EV only, if available)
- `{VIN}.chargeSchedules` - electric charge schedules (EV only, if available)
- `{VIN}.remote.refresh` - button to fetch data immediately

Endpoints that are not available for a vehicle are skipped silently.
The FordConnect Query API is read-only, so there are no engine/lock/charge commands.

### Configuration Options

- **Client ID / Client Secret**: Credentials from the Ford developer portal
- **Redirect URI**: Must match the URI registered in the developer portal
- **Polling interval**: Time in minutes between automatic telemetry queries (default: 15)

## What is Sentry.io and what is reported to the servers of that company?

Sentry.io is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or another Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a random generated unique id without any additional information) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. All of this helps me to provide error-free adapters that basically never crash.

## Changelog

### 2.0.1 (2026-07-25)

- Switch to Ford's official FordConnect Query API (EU Data Act)
- Remove reverse-engineered FordPass login, Autonomic token and WebSocket to avoid account blocking
- Read-only telemetry: remote commands removed

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

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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
