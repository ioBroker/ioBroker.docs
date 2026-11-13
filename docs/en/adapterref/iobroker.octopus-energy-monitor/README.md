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

### Historical pricing

Newly fetched days use the agreement and dated gross prices applicable to each interval. Missing or ambiguous prices do not discard consumption: costs become `null`, with `totalCostAvailable=false` and daily `costStatus=missing_historical_price`. Dynamic tariffs identified by forecasts or product names remain unpriced until actual historical interval prices are supported; forecasts and current prices are not substituted.

Gross monthly standing charges are prorated by calendar day using each month's length and the applicable agreement/price period. `totalCostWithStandingChargeAvailable` indicates whether the combined amount is available. This is an estimate, not a supplier invoice.

Existing positive days remain cached. Enable **Recalculate legacy days with historical prices** to correct them once within the configured sync/retention range, only when complete historical consumption prices and standing charges are available. Per-source version markers resume unfinished work after API limits or restarts. Existing database intervals are not exported again. Uncorrected JSON entries carry `costStatus=legacy_unverified`; their previous amounts are preserved. Disabling the option stops further legacy corrections.

### Sync diagnostics

`info.sync` exposes `running`, `currentDay` (last processed day) and the estimated `nextRun` timestamp. `info.api.octopus` and `info.api.inexogy` expose the last successful response timestamp, a sanitized error code, and rate-limit/cooldown status. Octopus cooldowns honor Retry-After; no automatic Inexogy retry policy is applied. These describe API responses, not guaranteed complete days.

Newly fetched interval days expose `quality` below each daily source: expected/received distinct quarter hours, missing intervals, duplicates, conflicts, invalid intervals and `complete`. Berlin daylight-saving days expect 92 or 100 intervals instead of 96. Daily-only responses have no interval-quality assessment. Missing intervals are diagnostic only: positive cached days are not fetched again because of this flag. Zero-consumption days continue to be retried.

### Automatic §14a grid fees

Enable **Automatic Octopus Module 3 grid fees** only alongside the existing §14a calculation. It requires Octopus credentials, an account and a grid-operator code from the selected meter location. Inexogy-only operation continues to use manual settings. Keep valid manual fees and time windows configured: they remain the fallback and are never overwritten.

The adapter requests the German OE backend's `variableGridFees` for each required Berlin calendar date. Only Module 3 responses with a complete, unambiguous quarter-hour schedule, matching operator, explicit timestamp validity and a unique standard-fee baseline are used. API amounts are treated as **net cents/kWh**, consistent with the Germany Home Assistant integration; automatic gross adjustments use the historical agreement's VAT. Overnight windows and daylight-saving days are supported. Unsupported schedules or failed requests fall back to manual settings with a warning.

The in-memory cache is scoped by account, operator and date (24 hours for valid responses, 15 minutes for fallback results; at most 400 entries). The backend has its own retry/cooldown diagnostics under `info.api.gridFees`. Daily source objects record `gridFeeSource` (`api`, `manual`, `manual_fallback`), `gridFeeFallbackReason` and the applied `gridFeeSchedule`. These fields describe that day's calculation, not live tariffs.

Changing §14a settings recalculates days within the configured sync/retention range. Per-source configuration markers resume unfinished recalculations after restarts or API limits without re-exporting cached database intervals. Positive days calculated with manual fallback remain cached; a later API recovery alone does not trigger another consumption download. Automatic fees are covered by simulated API tests but still require validation against a real Module 3 account and bill before release. Calculated costs remain estimates.

The latest grid-fee lookup is inspectable under `info.api.gridFees`: `rawResponse` contains the API's `module` and `gridFees` fields before validation, `responseDate` is the requested Berlin day, `httpStatus` is the returned status (0 if no response), and `responseTimestamp` dates the diagnostic attempt. `rejectionReason` distinguishes missing data/module, a module other than Module 3, empty fees, invalid entries, validity errors, gaps and overlaps; entry indexes are zero-based. An empty reason means validation succeeded. Cache hits do not update these fields, and no additional requests are triggered for diagnostics. Failed attempts clear the response to JSON `null`. Authentication headers, tokens and account details are not included. These diagnostics report what the API says, not an independent confirmation of module enrollment.

## Changelog
### 1.2.0 (2026-11-09)
* (tipp88) Expose raw Module 3 response fields, request date, HTTP status and precise grid-fee rejection reasons.
* (tipp88) Add opt-in, date-specific Module 3 grid fees with validated schedules, scoped caching and manual fallback.
* (tipp88) Record applied grid-fee sources and resume interrupted EnWG recalculations per source without duplicate interval exports.
* (tipp88) Expose sync/API diagnostics and DST-aware daily interval completeness without refetching positive cached days.
* (tipp88) Add bounded API retries, Retry-After cooldowns, expiry-aware JWT refresh and cancellable requests.
* (tipp88) Paginate bounded, meter-scoped Octopus measurements with duplicate and cursor checks.
* (tipp88) Resolve historical consumption prices and monthly standing charges by agreement and gross-price validity.
* (tipp88) Preserve consumption when historical prices are missing; expose unavailable costs as null with availability indicators.
* (tipp88) Add opt-in, versioned historical repricing within sync/retention limits without repeated interval exports.
* (tipp88) Use Europe/Berlin calendar-day boundaries and tariff times, including 23/25-hour daylight-saving days.
* (tipp88) Exclude out-of-day intervals while retaining the final Inexogy interval ending at midnight.
* (tipp88) Updated axios from 1.20.0 to 1.21.0.
* (tipp88) Updated development dependencies: @iobroker/testing 6.1.0 → 6.3.1, @iobroker/types 7.2.2 → 7.2.5, and @types/node 22.20.1 → 22.20.5.
* (tipp88) Handle all Octopus tariff windows for consumption and cost calculations, including Inexogy comparisons.
* (tipp88) Reject unmatched tariff intervals instead of assigning them to the first tariff.
* (tipp88) Recalculate affected multi-window tariff days once within the sync/retention range, resuming after API limits without re-exporting cached intervals.
* (tipp88) Compare only finite, positive daily consumption values while continuing to refetch zero-consumption days.
* (tipp88) Log discrepancies only when a day's stored comparison changes to a discrepancy.
* (tipp88) Mark unavailable comparisons explicitly and clear outdated daily and tariff-slot differences.

### 1.1.0 (2026-09-24)
* (tipp88) Added standalone Inexogy and Octopus operation with independent data retrieval and history export.
* (tipp88) Restricted comparisons to days with data from both providers.
* (tipp88) Added Inexogy monthly, yearly and current billing-period consumption totals.
* (tipp88) Fixed current billing-period aggregation on the first synchronization by prioritizing recent history.
* (tipp88) Added diagnostics for Octopus usage API HTTP and GraphQL errors.
* (tipp88) Stopped repeated Octopus requests within a synchronization after an API rate-limit response.
* (tipp88) Added EnWG NT, ST and HT consumption and cost totals to Octopus billing periods.

### 1.0.1 (2026-09-14)
* (tipp88) Fixed consumption data for previous days not updating automatically when initially retrieved with 0 kWh (Issue #31).
* (tipp88) Upgraded axios dependency to 1.20.0.
* (tipp88) Upgraded `@iobroker/testing` devDependency to 6.1.0.

### 1.0.0 (2026-08-27)
* (tipp88) Fixed the three missing history database synchronization translations reported in issue #18.

### 0.7.0 (2026-07-13)
* (tipp88) Implemented native historical database synchronization to automatically push 15-minute intervals directly to InfluxDB, SQL, or History instances.
* (tipp88) Massively optimized Inexogy retroactive API polling by switching to the Discovergy `readings` endpoint, fetching 96 data points in a single request.
* (tipp88) Fixed strict ioBroker JSON schema compliance bugs in `admin/jsonConfig.json` regarding dropdown instance filtering.
* (tipp88) Fixed calculated meter reading (`octopus.info.meterReading`) state missing `kWh` unit
* (tipp88) Fixed permissions in Dependabot auto-merge workflow (`issues: write`)

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