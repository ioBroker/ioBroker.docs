![Logo](admin/octopus-energy-monitor.svg?v=3)
# ioBroker.octopus-energy-monitor

[![NPM version](https://img.shields.io/npm/v/iobroker.octopus-energy-monitor.svg)](https://www.npmjs.com/package/iobroker.octopus-energy-monitor)
[![Downloads](https://img.shields.io/npm/dm/iobroker.octopus-energy-monitor.svg)](https://www.npmjs.com/package/iobroker.octopus-energy-monitor)
![Number of Installations](https://iobroker.live/badges/octopus-energy-monitor-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/octopus-energy-monitor-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.octopus-energy-monitor.png?downloads=true)](https://nodei.co/npm/iobroker.octopus-energy-monitor/)

**Tests:** ![Test and Release](https://github.com/tipp88/ioBroker.octopus-energy-monitor/workflows/Test%20and%20Release/badge.svg)

## ioBroker.octopus-energy-monitor

The **Octopus Energy Monitor** adapter periodically fetches daily electricity consumption data from **[Octopus Energy](https://octopus.energy) (Kraken API)** and **[Inexogy](https://www.inexogy.com) (Discovergy/Statistics API)**, saving it automatically within your ioBroker object tree.

Its key purpose is identifying discrepancies in billing/measurement between your intelligent smart meter (Inexogy) and your energy supplier (Octopus Energy). Every night, the adapter compares both datasets and flags daily discrepancies that exceed a configurable threshold mathematically.

### 🌟 Features
* **Full Kraken GraphQL Support:** Authenticates via your Octopus JWT tokens and dynamically resolves account properties to fetch precise consumption data.
* **Dynamic Tariff & Slot Support:** Automatically detects your active Octopus tariff (e.g., Intelligent Octopus Go) and its specific time-of-use slots. No manual configuration of "Go" hours needed!
* **Automated Cost Calculation:** Automatically calculates daily, monthly, and yearly energy costs in **Euro (€)** based on your actual tariff rates.
* **Hierarchical History:** Structures data in a clean `history.YYYY.MM.DD` tree with automatic aggregation of consumption and costs for months and years.
* **Estimated Meter Reading:** Calculates your current electricity meter reading by combining the latest official Kraken reading with your subsequent daily consumptions.
* **Inexogy (Discovergy) Comparison:** Leverages the Inexogy API to compare consumption data against your provider's data, helping identify billing discrepancies.
* **Master Data Insight:** Provides transparency into your account balance, meter details, and involved network operators (MOP/DNO).
* **Smart Charging Control:** Dynamically fetch Intelligent Octopus devices (EVs/chargers) and toggle Smart Charging (Suspend/Resume) directly from ioBroker.
* **Inexogy Master Data & Live Reading:** Fetch serial numbers, location details, and current meter readings (Bezug/Einspeisung) from Inexogy.
* **Smart Caching:** Minimizes API load by retroactively syncing only missing data points (30-day default).
* **§14a EnWG Price Calculation:** Optional tariff calculation for controllable consumption devices (Steuerbare Verbrauchseinrichtung) with custom time windows (NT/HT) and automatic standard tariff (ST) fallback.
* **Custom Billing Periods:** Aggregates and tracks energy consumption and costs based on your custom billing period start day (e.g., 18th to 17th) under the `octopus.periods` channel, split by standard rate slots (e.g. Go/Standard) with a static `current` folder for easy visualization.
* **Database History Sync:** Native backend integration with InfluxDB, SQL, and History adapters to directly push and backfill raw 15-minute consumption intervals without bloating the ioBroker object tree.

---

### ⚙️ Installation

To install this adapter in your ioBroker environment:

1. Open your ioBroker Admin UI.
2. Navigate to the **"Adapters"** tab.
3. Search for **"Octopus Energy Monitor"** (or `octopus-energy-monitor`).
4. Click the **+** (add) button next to the adapter to create a new instance.

---

### 🔧 Configuration

1. **Octopus Energy (Kraken):** 
   - Enter your standard Octopus login credentials (Email & Password).
   - Input your Account Number (usually starts with `A-`).
   - **Billing Period Start Day:** Day of the month on which your billing cycle starts (default is `1` for normal calendar month). If your cycle is from the 18th of one month to the 17th of the next, select `18` to generate the billing period folders under `octopus.periods.<startDate>` and a static `octopus.periods.current` alias, including slot-split metrics.
   
2. **Inexogy:**
   - Enter your Inexogy portal Email & Password. The adapter automatically manages Basic Auth parsing and translates it into Discovergy API queries.

3. **General Settings:**
   - **Discrepancy Threshold:** Defines how many `kWh` difference must be present between Octopus and Inexogy to trigger the `hasDiscrepancy: true` state flag. Default is `0.1 kWh`.

4. **§14a EnWG Settings (Optional):**
   - **Enable § 14a EnWG Calculation:** If activated, calculates daily energy prices taking into account reduced grid fees for controllable consumption devices.
   - **Applicable From Date (YYYY-MM-DD):** Defines when the EnWG calculation should start. Changing this date (or grid fees/time windows) triggers an automatic retroactive recalculation of all historical data.
   - **Grid Fees:** Input your local NT, HT, and ST grid fees. Use the checkbox to specify whether the input values are gross (including 19% VAT) or net.
   - **Configured Time Windows:** Define your local NT (low tariff) and HT (high tariff) times per month. Times that are not defined automatically fallback to ST (standard tariff). Windows must not overlap within the same month.
6. **History Database Sync (Optional):**
   - **Enable Database Synchronization:** Select your target ioBroker history adapter (e.g., InfluxDB). The adapter will automatically register 15-minute states and push raw interval data points retroactively into the selected database.

Once configured, the adapter handles the rest! It periodically syncs the last 30 days of data according to the configured update interval. Data manifests under the `octopus-energy-monitor.0.history.YYYY.MM.DD` path.

## Changelog
### 0.7.0 (2026-07-13)
* (tipp88) Implemented native historical database synchronization to automatically push 15-minute intervals directly to InfluxDB, SQL, or History instances.
* (tipp88) Massively optimized Inexogy retroactive API polling by switching to the Discovergy `readings` endpoint, fetching 96 data points in a single request.
* (tipp88) Fixed strict ioBroker JSON schema compliance bugs in `admin/jsonConfig.json` regarding dropdown instance filtering.
* (tipp88) Fixed calculated meter reading (`octopus.info.meterReading`) state missing `kWh` unit
* (tipp88) Fixed permissions in Dependabot auto-merge workflow (`issues: write`)

### 0.6.8 (2026-07-06)
* (tipp88) Fixed `rate.name` from external API being used unsanitized in ioBroker object IDs.
* (tipp88) Fixed `setSmartChargeStatus()` sending the sanitized device ID to Octopus API instead of original ID.
* (tipp88) Optimized database interval sync by consolidating all object scans into a single pre-fetch.

### 0.6.7 (2026-07-01)
* (tipp88) Fixed missing UI translations for the `updateInterval` minimum warning.
* (tipp88) Fixed missing external object ID sanitization (ioBroker repo compliance).
* (tipp88) Enforced a 15-minute minimum for `updateInterval` to prevent excessive cloud polling.
* (tipp88) Refactored `fetchInexogy` and optimized object scanning overhead during history aggregation.
* (tipp88) Capped `syncDays` retroactive data fetching to `retentionDays` to avoid fetching data that would immediately be deleted.

### 0.6.6 (2026-06-29)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.6.5 (2026-06-29)
* (tipp88) Fixed ioBroker repository PR compliance issues (added API timeouts, refactored timer logic, removed dead config, implemented data retention, and updated translation keys).
* (tipp88) Upgraded `@iobroker/types` devDependency to 7.2.2.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 tipp88

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