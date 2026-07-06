![Logo](admin/heizoel24-mex.png)
# ioBroker.heizoel24-mex

[![NPM version](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)](https://www.npmjs.com/package/iobroker.heizoel24-mex)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)](https://www.npmjs.com/package/iobroker.heizoel24-mex)
![Number of Installations](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/heizoel24-mex-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)](https://nodei.co/npm/iobroker.heizoel24-mex/)

**Tests:** ![Test and Release](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## heizoel24-mex adapter for ioBroker

The MEX is a heating oil level measuring device. This adapter reads the MEX data from the Heizoel24 server.

See: https://www.heizoel24.de/mex


## Use:
Simply enter the login data from your Heizoel24 account (e-mail and password).<br>
The MEX data is stored in the data point heizoel24-mex.<br>
The adapter starts by default every 3 hours. This is completely sufficient, as the MEX only sends data once a day.<br>
The data points CalculatedRemaining/JsonForEcharts (calculated remaining quantity) and OilUsage/JsonForEcharts can used directly with eCharts.<br>
The adapter can send data via MQTT.<br>
The original app always calculates annual usage as of December 31.<br>
This is impractical, since that is in the middle of the heating season.<br>
This adapter can calculate annual usage based on a specific month.<br>

## Changelog
### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

### 1.9.0 (2026-05-03)
- (copilot) Adapter requires node.js >= 22 now

### 1.8.1 (2026-04-06)

- "Reference month for annual consumption (1–12)" edited

### 1.8.0 (2026-04-05)

- Yearly Oil usage by reference month added
