![Logo](admin/foxesscloud-logo.png)

# ioBroker adapter for FoxESS Cloud

![Number of Installations](https://iobroker.live/badges/foxesscloud-installed.svg) ![Current version in stable repository](https://iobroker.live/badges/foxesscloud-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.foxesscloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)](https://www.npmjs.com/package/iobroker.foxesscloud)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/topic/83662/test-adapter-fox-ess-cloud)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-copilot-blue.svg)](https://github.com/inventwo/ioBroker.foxesscloud/blob/main/.github/copilot-instructions.md)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## What this adapter does

Retrieves data from FoxESS Cloud API for solar inverters (e.g., used in Enpal systems) and exposes ioBroker states for home automation:

- Monitor solar power production
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
- `foxesscloud.0.pv1Power` - PV String 1 Power (kW)
- `foxesscloud.0.pv2Power` - PV String 2 Power (kW)
- `foxesscloud.0.generationPower` - Generation Power/Output (kW)
- `foxesscloud.0.soc` - Battery State of Charge (%)
- `foxesscloud.0.load` - Load Power (kW)
- `foxesscloud.0.gridConsumption` - Grid Consumption/Import (kW)
- `foxesscloud.0.feedinPower` - Feed-in/Export Power (kW)
- `foxesscloud.0.batCharge` - Battery Charge Power (kW)
- `foxesscloud.0.batDischarge` - Battery Discharge Power (kW)
- `foxesscloud.0.batTemperature` - Battery Temperature (°C)
- `foxesscloud.0.invTemperature` - Inverter Internal Temperature (°C)
- `foxesscloud.0.runningState` - Inverter Running State
- `foxesscloud.0.info.connection` - Connection status

### PV Power JSON Statistics (if enabled)
- `foxesscloud.0.pvPowerJSON.daily` - Daily energy statistics (JSON format) - current week from Monday to Sunday
- `foxesscloud.0.pvPowerJSON.weekly` - Weekly energy statistics (JSON format) - last 4 weeks including the current week
- `foxesscloud.0.pvPowerJSON.monthly` - Monthly energy statistics (JSON format) - all 12 months including the current month

## Installation

1. Install the adapter from the ioBroker admin interface
2. Create a new instance
3. Configure:
   - **API Token**: Your API key from the FoxESS Cloud portal
   - **Serial Number (SN)**: The serial number of your inverter
   - **Update Interval**: Data refresh interval in seconds (default: 60, minimum: 60)
4. Optionally enable PV Power JSON Statistics:
   - **Enable PV Power JSON generation**: Activate JSON table generation for VIS widgets
   - **Daily statistics**: Generate daily energy data for the current week (Monday-Sunday)
   - **Weekly statistics**: Generate weekly energy data (last 4 weeks including the current week)
   - **Monthly statistics**: Generate monthly energy data (all 12 months including the current month)
   - **Price per kWh**: Optional - enter your electricity price per kWh for cost calculations
   - **Daily / Weekly / Monthly start value**: Optional initial kWh values for the running periods if the adapter is enabled after production already started
5. Save and start the instance

### How to get your API credentials

1. Log in to [FoxESS Cloud](https://www.foxesscloud.com)
2. Go to your profile/settings
3. Generate an API key (token)
4. Find your inverter serial number in the device list

## PV Power JSON Statistics for VIS Dashboards

When enabled in the configuration, the adapter generates JSON tables with energy statistics that can be displayed in ioBroker VIS using widgets like the **inventwo JSON Widget**.

### JSON Format

The JSON tables contain energy data with the following structure:

```json
[
  {"date": "Monday", "value": "1.904", "price": "0.58"},
  {"date": "Tuesday", "value": "4.653", "price": "1.42"},
   {"date": "Wednesday", "value": "0.417", "price": "0.13"},
   {"date": "Thursday", "value": "0", "price": "0"},
   {"date": "Friday", "value": "0", "price": "0"},
   {"date": "Saturday", "value": "0", "price": "0"},
   {"date": "Sunday", "value": "0", "price": "0"},
  {"date": "Total", "value": "6.843", "price": "2.09"}
]
```

- **date**: Day name (localized), week number (KW XX), or month name
- **value**: Energy generated in kWh (3 decimal places)
- **price**: Costs in € (only if price per kWh is configured, 2 decimal places)

### Data Collection

- **Daily**: Shows the current calendar week from Monday to Sunday and updates the current day live
- **Weekly**: Accumulates weekly data (Monday-Sunday), keeps the last 4 weeks, and includes the running week
- **Monthly**: Accumulates monthly data (1st-last day), keeps all 12 months, and includes the running month

If the adapter is enabled while production is already running, you can configure optional start values for the current day, current week, and current month. These values are added once at the beginning of the respective running period.

The language of date labels (day/week/month names) automatically adapts to your ioBroker system language:
- **German** (de): Montag, Dienstag, January, Februar, etc.
- **English** (en): Monday, Tuesday, Januar, Februar, etc.

### Using with VIS

1. Enable PV Power JSON generation in adapter configuration
2. Add a JSON widget to your VIS dashboard
3. Bind the widget to one of these states:
   - `foxesscloud.0.pvPowerJSON.daily` for daily statistics
   - `foxesscloud.0.pvPowerJSON.weekly` for weekly statistics
   - `foxesscloud.0.pvPowerJSON.monthly` for monthly statistics
4. Configure the widget to display the energy/price data in a table format

## Privacy & Data Handling

- This adapter only reads data from **FoxESS Cloud API** using your personal API token
- Your API token is stored encrypted in the ioBroker database

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-05-25)
- (skvarel) Replaced process.env and process.exit usage in tools/api-test.js to fix compatibility issues reported by ioBroker repository checker (E5049, E5050)
- (skvarel) Downgraded @types/node from ^25 to ^22 to match supported Node.js version (W0066)

### 0.5.0 (2026-05-23)
- (skvarel) Added PV Power JSON statistics (daily, weekly, monthly) for VIS widget integration with optional cost calculation per kWh

### 0.4.0 (2026-05-19)
- (skvarel) Added PV string 1 and string 2 power datapoints (pv1Power, pv2Power)
- (skvarel) Added battery temperature datapoint (batTemperature)
- (skvarel) Added inverter running state datapoint (runningState)

### 0.3.1 (2026-05-19)
- (skvarel) Adjusted real-time API parsing to keep the typecheck green without changing runtime behavior

### 0.3.0 (2026-05-19)
- (skvarel) Added inverter internal temperature datapoint in °C

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
