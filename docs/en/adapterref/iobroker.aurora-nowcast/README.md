# ioBroker.aurora-nowcast

![Logo](admin/aurora-nowcast.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.aurora-nowcast.svg)](https://www.npmjs.com/package/iobroker.aurora-nowcast)
[![Downloads](https://img.shields.io/npm/dm/iobroker.aurora-nowcast.svg)](https://www.npmjs.com/package/iobroker.aurora-nowcast)
![Number of Installations](https://iobroker.live/badges/aurora-nowcast-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/aurora-nowcast-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.aurora-nowcast.png?downloads=true)](https://nodei.co/npm/iobroker.aurora-nowcast/)

**Tests:** ![Test and Release](https://github.com/chrmenne/ioBroker.aurora-nowcast/actions/workflows/test-and-release.yml/badge.svg)

---

## Aurora Nowcast adapter for ioBroker

Provides **current (nowcast) data** on aurora activity (northern and southern lights) for a given location, based on publicly available data from the NOAA Space Weather Prediction Center (SWPC).

> **Note:**  
> This adapter provides *current conditions / short-term nowcast data* based on real-time measurements and model outputs.  
> It does **not** provide long-term forecasts.

---

## Features

- Retrieves real-time aurora activity data (NOAA OVATION model) for both northern and southern hemisphere
- Calculates local aurora visibility likelihood for a configured location
- Provides ioBroker states for automation, visualization and alerts
- Optional usage of system location or manual latitude/longitude input
- Suitable for dashboards, notifications and smart home scenarios

---

## Configuration

You can either:

- Use the system location configured in ioBroker, or
- Provide manual coordinates (latitude / longitude in decimal degrees)

Manual coordinates are required if system location is disabled.

Examples:

| Location        | Latitude | Longitude |
|-----------------|----------|-----------|
| Berlin          | 52.5     | 13.4      |
| Buenos Aires    | -34.6    | -58.4     |
| Reykjavik       | 64.1     | -21.9     |

North/East values are positive, South/West values are negative.

---

## States

The adapter creates the following states:

| State               | Type    | Description                                                                        |
|---------------------|---------|------------------------------------------------------------------------------------|
| `probability`       | number  | Estimated aurora visibility probability at the configured location (%)             |
| `observation_time`  | number  | Time of the upstream solar wind observation used as model input (UTC, ms)          |
| `forecast_time`     | number  | Time for which the nowcasted geomagnetic response at Earth is calculated (UTC, ms) |

These states can be used for:

- Notifications (e.g. push messages)
- Dashboard visualizations
- Automation rules (e.g. activate camera when activity is high)

---

## Data Source

This adapter uses publicly available data provided by the:

- NOAA Space Weather Prediction Center (SWPC)  
  <https://www.swpc.noaa.gov/>

In particular, the OVATION aurora nowcast model and related real-time geomagnetic indices are used to estimate auroral activity for the configured location.

---

## Disclaimer

NOAA and SWPC are not affiliated with this project.

The data used by this adapter is provided by NOAA for public use.  
No guarantee is made regarding the accuracy, completeness or timeliness of the provided information.

Aurora visibility depends on multiple external factors (e.g. cloud cover, light pollution, IMF orientation) which are beyond the scope of this adapter.

---

## Changelog
### 2.2.2 (2026-04-17)

- re-added git-type URL because of npm linter

### 2.2.1 (2026-04-17)

- more checks
- fixed Readme link to a more stable direct link instead of an anchor
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/24>)
- fixed issue (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/27>)

### 2.2.0 (2026-03-30)

- fixed review findings (<https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/21>)

### 2.1.4 (2026-03-11)

- disabled Sentry in GitHub workflow

### 2.1.3 (2026-03-11)

- fixed iobroker-Bot warnings: <https://github.com/chrmenne/ioBroker.aurora-nowcast/issues/18>
- slightly retouched the icon

### 2.1.2 (2026-03-09)

- fixed overlooked linter error regarding whitespace

### 2.1.1 (2026-03-09)

- fixed a bug concerning the coordinates validation

### 2.1.0 (2026-03-02)

- added internationalization (i18n)
- further smaller adjustments to meet ioBroker standards

### 2.0.2 (2026-02-27)

- fixed icon size to 512x512 (or less) for ioBroker release

### 2.0.1 (2026-02-27)

- necessary adjustments for ioBroker official release

### 2.0.0 (2026-02-27)

- Renamed adapter. Minor housekeeping.

### 1.0.0 (2026-02-26)

- First stable release

---

## ❤️ Support

If you find **ioBroker.aurora-nowcast** useful and would like to support further development, you can buy me a coffee ☕🙂

[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/donate/?hosted_button_id=G6FRTZ5EAADFJ)

Thank you for your support!

---

## License

GNU General Public License v3.0

Copyright (c) 2026 Christian Menne

See LICENSE file for full license text.
