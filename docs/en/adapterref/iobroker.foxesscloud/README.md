![Logo](admin/foxesscloud-logo.png)

# ioBroker adapter for FoxESS Cloud

![Number of Installations](https://iobroker.live/badges/foxesscloud-installed.svg) ![Current version in stable repository](https://iobroker.live/badges/foxesscloud-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.foxesscloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)](https://www.npmjs.com/package/iobroker.foxesscloud)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/topic/83662/test-adapter-fox-ess-cloud)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)](https://github.com/inventwo/ioBroker.foxesscloud/tree/main/.cursor/iobroker-adapter.mdc)

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
- **`pv1Power` … `pv24Power`**: Individual PV string powers (kW) — only strings present on the device are created automatically
- **`generationPower`**: Total generation/output power (kW)
- **`load`**: Current load/consumption power (kW)
- **`gridConsumption`**: Power imported from grid (kW)
- **`feedinPower`**: Power exported to grid (kW)

### Battery
- **`soc`**: Battery state of charge (%)
- **`batCharge`**: Battery charging power (kW)
- **`batDischarge`**: Battery discharging power (kW)
- **`batTemperature`**: Battery temperature (°C) — created automatically when the device reports a value

### Temperature & Status
- **`invTemperature`**: Inverter internal temperature (°C) — created automatically when the device reports a value; warns in the log at ≥ 65 °C and ≥ 80 °C
- **`runningState`**: Current inverter running state (string)

### Connection Status
- **`info.connection`**: Connection status

### Energy Reporting (optional)
When enabled in the *Reporting* tab, the adapter derives period totals from the lifetime cumulative values returned by the API:
- **`report.day.*`**: Today's generation, feed-in and grid consumption (kWh)
- **`report.week.*`**: This week's totals (kWh)
- **`report.month.*`**: This month's totals (kWh)
- **`report.year.*`**: This year's totals (kWh)

### PV Power JSON Statistics (optional)
When enabled in the *Statistics* tab, the adapter tracks accumulated PV energy and publishes JSON tables for use in VIS dashboards — see [PV Power JSON Statistics for VIS Dashboards](#pv-power-json-statistics-for-vis-dashboards) below.

### API rate limit (Open API)

The [FoxESS Open API](https://www.foxesscloud.com/public/i18n/en/OpenApiDocument.html) allows **1440 calls per day per API key** (not per adapter instance). Usage in the FoxESS **app** or **web portal** does not count toward this Open API quota.

| Setup | API calls per day (24 h) |
|-------|--------------------------|
| 1 instance @ 60 s interval | 1440 (full quota) |
| 2 instances @ 60 s (same API key) | ~2880 → limit often exceeded after ~12 h |
| 1 instance @ 120 s interval | 720 |

With the recommended **60 s** interval, a single instance uses the full daily quota (1440 minutes = 24 hours).

**Important:** All Open API clients sharing the same API key share one quota — for example multiple ioBroker instances, Home Assistant integrations, or scripts. Exceeding the limit can cause intermittent API errors (e.g. `40400`, `40402`). Check remaining calls in the FoxESS portal under **Profile → API Management**.

For additional inverters, create one adapter instance per device (one serial number per instance) and plan the poll interval accordingly, or use separate API keys if your account allows it.

## Data Points

The adapter creates the following data points:

### Real-time Power (always created)
- `foxesscloud.0.pvPower` - PV Power (kW)
- `foxesscloud.0.generationPower` - Generation Power/Output (kW)
- `foxesscloud.0.soc` - Battery State of Charge (%)
- `foxesscloud.0.load` - Load Power (kW)
- `foxesscloud.0.gridConsumption` - Grid Consumption/Import (kW)
- `foxesscloud.0.feedinPower` - Feed-in/Export Power (kW)
- `foxesscloud.0.batCharge` - Battery Charge Power (kW)
- `foxesscloud.0.batDischarge` - Battery Discharge Power (kW)
- `foxesscloud.0.runningState` - Inverter Running State
- `foxesscloud.0.info.connection` - Connection status

### Dynamic (lazy-created on first non-null value)
- `foxesscloud.0.pv1Power` … `foxesscloud.0.pv24Power` - PV String 1–24 Power (kW)
- `foxesscloud.0.invTemperature` - Inverter Internal Temperature (°C)
- `foxesscloud.0.batTemperature` - Battery Temperature (°C)

### Energy Reporting (if enabled in the *Reporting* tab)
- `foxesscloud.0.report.day.generation` - Today's PV Generation (kWh)
- `foxesscloud.0.report.day.feedin` - Today's Feed-in Energy (kWh)
- `foxesscloud.0.report.day.gridConsumption` - Today's Grid Consumption (kWh)
- `foxesscloud.0.report.week.generation` - This Week's PV Generation (kWh)
- `foxesscloud.0.report.week.feedin` - This Week's Feed-in Energy (kWh)
- `foxesscloud.0.report.week.gridConsumption` - This Week's Grid Consumption (kWh)
- `foxesscloud.0.report.month.generation` - This Month's PV Generation (kWh)
- `foxesscloud.0.report.month.feedin` - This Month's Feed-in Energy (kWh)
- `foxesscloud.0.report.month.gridConsumption` - This Month's Grid Consumption (kWh)
- `foxesscloud.0.report.year.generation` - This Year's PV Generation (kWh)
- `foxesscloud.0.report.year.feedin` - This Year's Feed-in Energy (kWh)
- `foxesscloud.0.report.year.gridConsumption` - This Year's Grid Consumption (kWh)

### PV Power JSON Statistics (if enabled in the *Statistics* tab)
- `foxesscloud.0.pvPowerJSON.daily` - Daily energy statistics (JSON format) - current week from Monday to Sunday
- `foxesscloud.0.pvPowerJSON.weekly` - Weekly energy statistics (JSON format) - all weeks of the current month
- `foxesscloud.0.pvPowerJSON.monthly` - Monthly energy statistics (JSON format) - all 12 months of the current year

## Installation

1. Install the adapter from the ioBroker admin interface
2. Create a new instance
3. Configure the **General** tab:
   - **API Token**: Your API key from the FoxESS Cloud portal
   - **Serial Number (SN)**: The serial number of your inverter
   - **Update Interval**: Data refresh interval in seconds (default: 60, minimum: 60)
4. Optionally configure the **Statistics** tab:
   - **Enable PV Power JSON generation**: Activate JSON table generation for VIS widgets
   - **Daily statistics**: Generate daily energy data for the current week (Monday-Sunday)
   - **Weekly statistics**: Generate weekly energy data for all weeks of the current month
   - **Monthly statistics**: Generate monthly energy data for all 12 months of the current year
   - **Price per kWh**: Optional — enter your electricity price per kWh for cost calculations in the JSON tables
   - **Daily / Weekly / Monthly start value**: Optional initial kWh values for the running periods if the adapter is enabled after production already started
5. Optionally configure the **Reporting** tab:
   - **Enable energy reporting**: Activate period-based energy reporting (day / week / month / year)
6. Save and start the instance

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
- **Weekly**: Accumulates weekly data (Monday-Sunday), shows all weeks of the current month, and includes the running week
- **Monthly**: Accumulates monthly data (1st–last day), shows all 12 months of the current year, and includes the running month

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

## Energy Reporting

When *Enable energy reporting* is activated in the **Reporting** tab, the adapter derives period totals (day / week / month / year) from the lifetime cumulative values returned by the FoxESS Cloud API. No additional API calls are required — the values are piggy-backed on the regular real-time query.

### How it works

On each poll the adapter reads three lifetime values from the API:
- `generation` — total energy generated since installation (kWh)
- `feedin` — total energy fed into the grid since installation (kWh)
- `gridConsumption` — total energy consumed from the grid since installation (kWh)

At the start of each period (new day / new ISO week / new calendar month / new year) the current lifetime values are stored as a baseline. The reported state value is always `current lifetime value − baseline`.

Baselines are persisted in `report._baselines` so they survive adapter restarts.

### Report States

| State | Description |
|-------|-------------|
| `foxesscloud.0.report.day.generation` | PV generation today (kWh) |
| `foxesscloud.0.report.day.feedin` | Energy fed into the grid today (kWh) |
| `foxesscloud.0.report.day.gridConsumption` | Energy consumed from the grid today (kWh) |
| `foxesscloud.0.report.week.generation` | PV generation this ISO week (kWh) |
| `foxesscloud.0.report.week.feedin` | Feed-in this ISO week (kWh) |
| `foxesscloud.0.report.week.gridConsumption` | Grid consumption this ISO week (kWh) |
| `foxesscloud.0.report.month.generation` | PV generation this month (kWh) |
| `foxesscloud.0.report.month.feedin` | Feed-in this month (kWh) |
| `foxesscloud.0.report.month.gridConsumption` | Grid consumption this month (kWh) |
| `foxesscloud.0.report.year.generation` | PV generation this year (kWh) |
| `foxesscloud.0.report.year.feedin` | Feed-in this year (kWh) |
| `foxesscloud.0.report.year.gridConsumption` | Grid consumption this year (kWh) |

## Privacy & Data Handling

- This adapter only reads data from **FoxESS Cloud API** using your personal API token
- Your API token is stored encrypted in the ioBroker database

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.6.4 (2026-06-10)
- (skvarel) Added meta object types for adapter and instance namespace

### 0.6.3 (2026-06-05)
- (skvarel) Fixed repository checker error E0036

### 0.6.2 (2026-06-02)
- (skvarel) Documented Open API rate limit (per API key, multiple instances) in README and admin General tab
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules

### 0.6.1 (2026-05-29)
- (skvarel) Revised config and i18n

### 0.6.0 (2026-05-27)
- (StephanBeutel) Added support for up to 24 PV strings with dynamic state creation on first occurrence
- (StephanBeutel) Added report states for daily, weekly, monthly, and yearly energy totals derived from lifetime API values
- (StephanBeutel) Fixed null value handling for inverter and battery temperature states
- (StephanBeutel) Extracted reusable makeApiRequest() method for cleaner API communication
- (StephanBeutel) Centralized all state name translations into a single STATE_NAMES constant
- (skvarel) Fixed report states not updating during current period (values were only written at period rollover)
- (skvarel) Made energy reporting configurable via a new Reporting tab in the admin UI

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
