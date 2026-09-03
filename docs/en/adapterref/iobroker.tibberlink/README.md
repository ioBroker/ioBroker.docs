![Logo](admin/tibberlink.png)

# ioBroker.tibberlink

[![NPM version](https://img.shields.io/npm/v/iobroker.tibberlink?style=flat-square)](https://www.npmjs.com/package/iobroker.tibberlink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.tibberlink?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.tibberlink)
![node-lts](https://img.shields.io/node/v-lts/iobroker.tibberlink?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.tibberlink?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/hombach/iobroker.tibberlink?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/hombach/iobroker.tibberlink?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/hombach/iobroker.tibberlink?logo=github&style=flat-square)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/hombach/iobroker.tibberlink/test-and-release.yml?branch=master&logo=github&style=flat-square)
[![CodeQL](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hombach/ioBroker.tibberlink/actions/workflows/codeql-analysis.yml)
[![Appveyor-CI](https://ci.appveyor.com/api/projects/status/github/hombach/ioBroker.tibberlink?branch=master&svg=true)](https://ci.appveyor.com/project/hombach/iobroker-tibberlink)
[![SNYK Known Vulnerabilities](https://snyk.io/test/github/hombach/ioBroker.tibberlink/badge.svg)](https://snyk.io/test/github/hombach/ioBroker.tibberlink)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.tibberlink.svg?color=red&label=beta)
![Stable](https://iobroker.live/badges/tibberlink-stable.svg)
![Installed](https://iobroker.live/badges/tibberlink-installed.svg)

[![NPM](https://nodei.co/npm/iobroker.tibberlink.png?downloads=true)](https://nodei.co/npm/iobroker.tibberlink/)

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable error reporting, see <a href="https://github.com/ioBroker/plugin-sentry#plugin-sentry">Sentry-Plugin Documentation</a>!

## Adapter for Utilizing Tibber Energy Data in ioBroker

This adapter connects your Tibber account's API data to ioBroker, whether for a single home or multiple residences.
It also supports direct local reading of the Tibber Pulse sensor via your home network, enabling real-time monitoring and data collection without relying solely on the cloud API.

If you're not currently a Tibber user, I would greatly appreciate it if you could use my referral link: [Tibber Referral Link](https://invite.tibber.com/mu8c82n5).

## Documentation

- [Standard Configuration](#standard-configuration) — first setup, API token, homes, historical data
- [Calculator Configuration](docu/CalculatorConfiguration.md) — price-based automation channels & Smart Battery Buffer
- [Graph Output Configuration](docu/GraphOutput.md) — visualizing prices with E-Charts / FlexCharts
- [Vehicles & Chargers Configuration](docu/VehiclesAndChargers.md) — Tibber Data API setup for cars & wallboxes
- [Direct local poll of Pulse data](docu/LocalPulse.md) — reading the Pulse locally, supported meter modes

## Standard Configuration

- Begin by creating a new instance of the adapter.
- You'll also require an API token from Tibber, which you can obtain here: [Tibber Developer API](https://developer.tibber.com).
- Enter your Tibber API token in the standard settings and configure at least one line for live feed settings (select "None available").
- Save the settings and exit the configuration to restart the adapter; this step allows your home(s) to be queried for the first time from the Tibber server.
- Return to the configuration screen and select the homes from which you wish to fetch real-time data using your Tibber Pulse. You can also select homes and disable the feed (Note: This works only if the hardware is installed and the Tibber server has verified the connection to Pulse).
- Note: If you have more than one home in your Tibber account, you must add all of them to avoid error messages caused by homes that may not be needed. Add them all and disable the unwanted ones.
- You have the option to deactivate the retrieval of price data for today and tomorrow, for instance, if you only intend to use the Pulse live feed.
- Optionally, you can enable the retrieval of historical consumption data. Please specify the number of datasets for hours, days, weeks, months, and years. You can use "0" to disable one or more of these intervals based on your preferences.
- Note: It's essential to be mindful of the dataset size, as excessively large requests may result in no response from the Tibber Server. We recommend experimenting with the dataset size to ensure optimal functionality. Adjusting the intervals and dataset numbers can help strike the right balance between obtaining insightful data and maintaining server responsiveness. For example, 48 is a recommended value for hours.
- Save the settings.

## Consumption Data Documentation

When daily historical consumption is enabled, the adapter provides an aggregated state for the current month:

- `Homes.<HOME-ID>.Consumption.currentMonthConsumption`

This state is the total consumption for the current calendar month in `kWh`, calculated from the daily consumption data returned by Tibber. If too few days are configured, the value will only reflect that number of days — not a complete month.

## Calculator Configuration

The Calculator adds price-based automation on top of the Tibber connection: per-home channels that switch external states based on the cheapest/most expensive hours, price thresholds, best-hour blocks, percentage ranges, Limited Time Frames (LTF), and a Smart Battery Buffer mode.

📖 **Full guide: [docu/CalculatorConfiguration.md](docu/CalculatorConfiguration.md)**

## Graph Output Configuration

The adapter helps visualize price trends and calculator results — from a simple JSON-based approach via the "E-Charts" / "FlexCharts" adapters to a fully customized JavaScript solution.

📖 **Full guide: [docu/GraphOutput.md](docu/GraphOutput.md)**

## Direct local poll of Pulse data

The adapter can read the Tibber Pulse locally over your home network (via the Tibber Bridge) instead of relying solely on the cloud feed, writing meter data to ioBroker states every 2 seconds. Both binary SML and plain OBIS text meters are supported.

📖 **Full guide (bridge setup, supported meter modes): [docu/LocalPulse.md](docu/LocalPulse.md)**

## Vehicles & Chargers Configuration

In addition to the main API token, the adapter can read IoT device data (vehicles, chargers) from the separate **Tibber Data API** (`data-api.tibber.com`), which needs its own OAuth2 client registration and one-time authorization. Vehicle data is written to `Vehicles.<VIN>.*`, charger data to `Chargers.<id>.*`.

📖 **Full setup guide (client registration, authorization, available states): [docu/VehiclesAndChargers.md](docu/VehiclesAndChargers.md)**

## Donate

<a href="https://www.paypal.com/donate/?hosted_button_id=F7NM9R2E2DUYS"><img src="https://raw.githubusercontent.com/Hombach/ioBroker.tibberlink/master/docu/bluePayPal.svg" height="40"></a>  
If you enjoyed this project — or just feeling generous, consider buying me a beer. Cheers! :beers:

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 7.2.3 (2026-08-29)

- (HombachC) fixed local Pulse boolean states (e.g. usb_power, autolevel_enable) being created as type number, causing recurring log errors (#935)
- (HombachC) SmartBatteryBuffer: EfficiencyLoss is now validated to the range 0…1; out-of-range values (e.g. 25 instead of 0.25) are clamped with a warning instead of corrupting the calculation, and the state now carries min/max/step (#934)
- (HombachC) updated dependencies

### 7.2.2 (2026-08-22)

- (HombachC) fixed local Pulse meter mode 5 (plain OBIS text, e.g. eBZ meters) not being parsed, leaving states frozen (#931)
- (HombachC) documented the supported Pulse meter modes (README + Info/PulseMeterModes.md)
- (HombachC) restructured the README: moved the Calculator, Graph Output, Local Pulse and Vehicles & Chargers guides into separate files under docu/
- (HombachC) updated dependencies

### 7.2.1 (2026-08-10)

- (HombachC) fixed charger devices with an empty externalId (e.g. Wallbox Pulsar Plus) producing an invalid state id; a single bad device no longer aborts the whole Data API poll (#925)
- (HombachC) projectUtils: use extendObject instead of setObject in forceMode so user customizations survive restarts (#927)
- (HombachC) projectUtils: fixed min/max/step value of 0 being dropped from number state definitions
- (HombachC) updated tibber-api to 5.6.0
- (HombachC) updated dependencies

### 7.2.0 (2026-07-30)

- (HombachC) added polling of charger/wallbox devices from the Tibber Data API, written to `Chargers.<id>.*` (#925)
- (HombachC) added a `LastSeen` state (device-reported last-seen timestamp) for vehicles and chargers

### 7.1.5 (2026-07-12)

- (HombachC) added a regression test confirming best single hours LTF no longer switches on the wrong day (#631)
- (HombachC) worked around a Tibber server bug that returns `to` equal to `from` in weekly historical consumption data (#890)
- (HombachC) removed redundant test devDependencies (chai, chai-as-promised, sinon-chai, proxyquire) and switched unit tests to Node's built-in assert

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

## License

GNU General Public License v3.0 only

Copyright (c) 2023-2026 C.Hombach <TibberLink@homba.ch>
