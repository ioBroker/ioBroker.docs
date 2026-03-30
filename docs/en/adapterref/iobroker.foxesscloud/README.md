![Logo](admin/foxesscloud-logo.png)

## ioBroker adapter for FoxESS Cloud

![Number of Installations](https://iobroker.live/badges/foxesscloud-installed.svg) ![Current version in stable repository](https://iobroker.live/badges/foxesscloud-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.foxesscloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)](https://www.npmjs.com/package/iobroker.foxesscloud)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

## What this adapter does

Retrieves real-time data from FoxESS Cloud API for solar inverters (e.g., used in Enpal systems) and exposes ioBroker states for home automation:

- Monitor solar power production in real-time
- Track battery state of charge (SoC)
- Analyze grid consumption and feed-in power
- Automate based on power generation
- Visualize energy flows in ioBroker dashboards

## Features

### Power Values
- **`pvPower`**: Current PV power generation (kW)
- **`generationPower`**: Total generation/output power (kW)
- **`load`**: Current load/consumption power (kW)
- **`gridConsumption`**: Power imported from grid (kW)
- **`feedinPower`**: Power exported to grid (kW)

### Battery
- **`soc`**: Battery state of charge (%)
- **`batCharge`**: Battery charging power (kW)
- **`batDischarge`**: Battery discharging power (kW)

### Connection Status
- **`info.connection`**: Connection status in**1440 calls per day**. With an interval of 60 seconds, this limit is perfectly utilized (1440 minutes = 24 hours).

## Data Points

The adapter creates the following data points:

- `foxesscloud.0.pvPower` - PV Power (kW)
- `foxesscloud.0.generationPower` - Generation Power/Output (kW)
- `foxesscloud.0.soc` - Battery State of Charge (%)
- `foxesscloud.0.load` - Load Power (kW)
- `foxesscloud.0.gridConsumption` - Grid Consumption/Import (kW)
- `foxesscloud.0.feedinPower` - Feed-in/Export Power (kW)
- `foxesscloud.0.batCharge` - Battery Charge Power (kW)
- `foxesscloud.0.batDischarge` - Battery Discharge Power (kW)
- `foxesscloud.0.info.connection` - Connection status

## Installation

1. Install the adapter from the ioBroker admin interface
2. Create a new instance
3. Configure:
   - **API Token**: Your API key from the FoxESS Cloud portal
   - **Serial Number (SN)**: The serial number of your inverter
   - **Update Interval**: Data refresh interval in seconds (default: 60, minimum: 60)
4. Save and start the instance

### How to get your API credentials

1. Log in to [FoxESS Cloud](https://www.foxesscloud.com)
2. Go to your profile/settings
3. Generate an API key (token)
4. Find your inverter serial number in the device list

## Privacy & Data Handling

- This adapter only reads data from **FoxESS Cloud API** using your personal API token
- Your API token is stored encrypted in the ioBroker database

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.1.9 (2026-03-13)
- (skvarel) Improved: Enabled Node.js 24 support in GitHub Actions workflows.
- (skvarel) Fixed: Issue detected by repository checker.

### 0.1.8 (2026-03-12)
- (skvarel) Fixed: Issue detected by repository checker.

### 0.1.7 (2026-02-28)
- (skvarel) Fixed: Issue detected by repository checker.

### 0.1.6 (2026-02-01)
- (skvarel) Improved: Use node: prefix for core modules and adapter timer wrappers for better compatibility
- (skvarel) Fixed: Added .env.example to .gitignore

### 0.1.5 (2026-01-31)
- (skvarel) Improved: Removed unnecessary devDependencies (eslint, should, dotenv) to follow ioBroker best practices.
- (skvarel) Improved: Updated test scripts to use standard mocha command instead of hardcoded paths.
- (skvarel) Improved: Switched Node.js core module imports to node:xxx format where applicable.
- (skvarel) Improved: Enforced minimum and maximum interval limits for data polling to comply with Node.js timer restrictions.
- (skvarel) Improved: Code formatting and configuration files updated for consistency with ioBroker standards.
- (skvarel) Fixed: Addressed review feedback for ioBroker latest repository inclusion.
- (skvarel) Added: Full multi-language support for all state names (EN, DE, RU, PT, NL, FR, IT, ES, PL, UK, ZH-CN).

## Older changes
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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
