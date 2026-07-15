![Logo](admin/brightsky.png)
# ioBroker.brightsky

[![NPM version](https://img.shields.io/npm/v/iobroker.brightsky.svg)](https://www.npmjs.com/package/iobroker.brightsky)
[![Downloads](https://img.shields.io/npm/dm/iobroker.brightsky.svg)](https://www.npmjs.com/package/iobroker.brightsky)
![Number of Installations](https://iobroker.live/badges/brightsky-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/brightsky-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)](https://nodei.co/npm/iobroker.brightsky/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

## brightsky adapter for ioBroker

## What is the Bright Sky API:
The Bright Sky API is a free, public API that provides weather data from the German Weather Service (DWD). It was developed to simplify access to this data, as the original DWD data is often in difficult-to-interpret formats. Bright Sky converts this data into an easy-to-use JSON format and makes it accessible via an API.

Here is a more detailed explanation:

**Goal:**
The Bright Sky API aims to make weather data from the German Weather Service (DWD) easily accessible to developers and other interested parties.

**Data source:**
The data comes from the DWD and includes weather observations from stations and weather forecasts, such as the MOSMIX models.

**Format:**
The Bright Sky API provides the data in JSON format, which facilitates integration into applications and websites.

**Access:**
The API is public and can be used without an API key, keeping the barrier to entry low.

**Open source:**
The project is open source, meaning the source code is publicly available and can be further developed by the community.

**Advantages:**
The Bright Sky API offers an easy way to access weather data that would otherwise be difficult to handle and is free of charge, making it an attractive option for many projects.

---

## Which data can be used compared to other adapters?

The current weather data is updated cyclically twice an hour by the DWD. The weather data from the nearest DWD (German Weather Service) weather station is taken into account. If weather values ​​are not available, they are automatically filled in using the second-most distant, third-most distant, etc. weather station as a fallback. The fallback data for the corresponding weather data can be found in the adapter.

In addition to the high quality of the data, the solar and solar data are particularly interesting:

<img width="1200" height="444" alt="image" src="https://github.com/user-attachments/assets/fc63120a-3dff-4651-841d-ff55bd8482d7" />  
  

Since the values ​​from the data point `brightsky.0.current.solar_60`, for example, are given in kWh/m² and are already expressed as energy per 1h, the value `multiplied by 1000` can also be expressed in W/m².


Example of global radiation (W/m²)
<img width="1200" height="224" alt="image" src="https://github.com/user-attachments/assets/a83fdbdc-c56f-499e-b2ad-a58c9b24d5de" />  

---

## Adapter:

### Installation:

Unlike many other adapters, no account is required.

The geocoordinates for the position can be imported either directly from the browser or from ioBroker. are
<img width="108" height="59" alt="image" src="https://github.com/user-attachments/assets/1f95df93-a5c7-460a-9eb9-b1565df29a12" />  

<img width="1096" height="803" alt="image" src="https://github.com/user-attachments/assets/4cfc2f81-465d-46b7-a6c1-927ea4e6680b" />  


### The object structure:

The data is as follows Provided:
<img width="183" height="156" alt="image" src="https://github.com/user-attachments/assets/fcb85df5-ff25-4d22-be54-0b04ea36f6ef" />  


* current - the current weather (see also: https://brightsky.dev/docs/#/operations/getCurrentWeather )
* daily - the current weather forecast for the next configurable number of days (see `forecastDays` config, default 7 days)
  * `daily.XX.hourly` - optional nested hourly data under the respective day (controlled by `hourlyForecastDays`; only present for the first N days; 0 = disabled)
  * `daily.XX.day` / `daily.XX.night` - aggregated day/night summaries per day
* hourly - flat list of hourly forecasts for the next N hours (see `hours` config; independent of the nested `daily.XX.hourly` feature; see also: https://brightsky.dev/docs/#/operations/getWeather )
* radar - precipitation radar forecast for the next 2 hours in 5-minute intervals with values in mm per 5 minutes. Includes maximum values across grid cells and cumulative sums across all grid areas (see also: https://brightsky.dev/docs/#/operations/getRadar )

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (ticaki) Fixed: radar `max_precipitation_forecast.*_sum` cumulative values were inflated because precipitation was summed across whole grid columns and scaled with `radarDistance`; the cumulative forecast now accumulates each grid cell over time and reports the maximum single location
- (ticaki) Changed: radar precipitation forecasts now report `null` instead of `-1` when no radar data is available

### 1.2.0 (2026-06-02)
- (ticaki) Added `conditionUI` (translated condition text) to `current` and `hourly.NN`, matching the existing `daily.NN.conditionUI` [#110](https://github.com/ticaki/ioBroker.brightsky/issues/110)
- (ticaki) Added a config option to choose the language for weather texts independent of the ioBroker system language [#110](https://github.com/ticaki/ioBroker.brightsky/issues/110)
- (ticaki) Requires Node.js >= 22 now; repository checker fixes (i18n, docs, tooling)
- (ticaki) Fixed: `daily.NN.day` aggregations stayed null/zero when `position` was not a valid `latitude,longitude`; the adapter now logs a clear error instead of producing empty data

### 1.1.0 (2026-03-23)
- (ticaki) Fixed: DWD station ID was incorrectly logged as WMO station ID fixes [#91](https://github.com/ticaki/ioBroker.brightsky/issues/91)
- (cavernerg) Added nested hourly forecast data under `daily.XX.hourly.YY` (0 = disabled)
- (cavernerg) Added configurable number of forecast days (`forecastDays`, default 7)
- (cavernerg) Admin UI restructured into labeled sections (Location, Forecast, Current Weather, Radar)

### 1.0.1 (2026-02-20)
- (ticaki) sunrise and sunset fixed

### 1.0.0 (2026-01-10)
- (ticaki) fixed: states/timezone/translation
- (ticaki) Customisable update interval for Daily (expert)
- (ticaki) BREAKING: remove forHomoran states

### 0.6.7 (2025-10-26)
- (ticaki) Corrected some roles for Lovelance
- (ticaki) Added conditionUI
- (ticaki) Air pressure and humidity are now integers
- (ticaki) Added air pressure to daily data
- (ticaki) Improved error logging

[Older changelogs can be found there](CHANGELOG_OLD.md)## License
MIT License

Copyright (c) 2025-2026 ticaki <github@renopoint.de>

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
