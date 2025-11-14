![Logo](admin/brightsky.png)
# ioBroker.brightsky

[![NPM version](https://img.shields.io/npm/v/iobroker.brightsky.svg)](https://www.npmjs.com/package/iobroker.brightsky)
[![Downloads](https://img.shields.io/npm/dm/iobroker.brightsky.svg)](https://www.npmjs.com/package/iobroker.brightsky)
![Number of Installations](https://iobroker.live/badges/brightsky-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/brightsky-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.brightsky.png?downloads=true)](https://nodei.co/npm/iobroker.brightsky/)

**Tests:** ![Test and Release](https://github.com/ticaki/ioBroker.brightsky/workflows/Test%20and%20Release/badge.svg)

# brightsky adapter for ioBroker

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
* daily - the current weather forecast for the next 8 days (created by the adapter and is not part of the API)
* hourly - the current weather forecast for the next defined n hours (see also: https://brightsky.dev/docs/#/operations/getWeather )
* radar - precipitation radar forecast for the next 2 hours in 5-minute intervals with values in mm per 5 minutes. Includes maximum values across grid cells and cumulative sums across all grid areas (see also: https://brightsky.dev/docs/#/operations/getRadar )

---

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (ticaki) Customisable update interval for Daily (expert)
- (ticaki) BREAKING: remove forHomoran states

### 0.6.7 (2025-10-26)
- (ticaki) Corrected some roles for Lovelance
- (ticaki) Added conditionUI
- (ticaki) Air pressure and humidity are now integers
- (ticaki) Added air pressure to daily data
- (ticaki) Improved error logging

### 0.6.6 (2025-10-11)
- (ticaki) Added apparent temperature datapoints for current, hourly, and daily weather data

### 0.6.5 (2025-10-04)
- (ticaki) Added leading zero to 5-minute radar datapoint folders for correct sorting in UI

### 0.6.3 (2025-10-04)
- (ticaki) Added Beaufort wind force scale datapoints (wind_force and wind_force_desc) based on wind_speed_10
- (ticaki) Fixed radar precipitation unit conversion - API values are in 0.01mm per 5 minutes, now correctly converted to mm
- (ticaki) Added cumulative precipitation states (next_Xmin_sum) showing maximum precipitation sum across all grid areas
- (ticaki) Added descriptions to max_precipitation_forecast states indicating "mm per 5 minutes"

### 0.6.2 (2025-10-02)
- (ticaki) Flag set to activate language

### 0.6.1 (2025-10-02)
- (ticaki) Added optional createRadarData configuration to make detailed radar.data folder optional fixes [#45](https://github.com/ticaki/ioBroker.brightsky/issues/45)
- (ticaki) Added weekday name datapoints (short and long) to daily weather data fixes [#41](https://github.com/ticaki/ioBroker.brightsky/issues/41)

### 0.6.0 (2025-09-30)
- (ticaki) Added weather radar feature with 2-hour precipitation forecast
- (ticaki) Radar data shows precipitation in mm with average, min, max, and median values
- (ticaki) Configurable radar polling interval (5+ minutes, auto-rotates data every 5 min)
- (ticaki) Added max precipitation forecast states for next 5, 10, 15, 30, 45, 60, 90 minutes

### 0.5.2 (2025-09-28)
- (ticaki) New data point wind_gust_speed_max for role value.speed.max.wind
- (ticaki) role checked

### 0.5.1 (2025-09-27)
- (ticaki) more robust fetch usage

### 0.5.0 (2025-09-26)
- (ticaki) Icons provided by icebear added fixes #31

### 0.4.0 (2025-09-24)
- (ticaki) Code migration from axios to node:fetch

### 0.3.5 (2025-09-20)
- (ticaki) Corrected roles for visualisation (lovelance) fixes #28

### 0.3.4 (2025-09-19)
- (ticaki) fixed too low limit for currently updates

### 0.3.3 (2025-09-19)
- (ticaki) update current at sunrise and sunset (unless custom interval is too large)
- (ticaki) added inverter limiting

### 0.3.2 (2025-09-17)
- (ticaki) Solar estimation calculation revised

### 0.3.1 (2025-09-15)
- (ticaki) Fixed data evaluation crash when no panels are defined  
- (ticaki) state name fixed

### 0.3.0 (2025-09-15)
- (ticaki) Added experimental datapoint for solar energy estimation (daily and hourly)  
- (ticaki) Wind bearing text is now translated into ioBroker system language  
- (ticaki) Added new datapoint for MDI icons support  
- (ticaki) Add day and night objects in addition to daily objects fixes [#11](https://github.com/ticaki/ioBroker.brightsky/issues/11)
- (ticaki) Enhanced day and night support with dedicated day/night icons

### 0.2.4 (2025-08-28)
* (ticaki) Create all folders

### 0.2.3 (2025-08-27)
* (ticaki) wind bearing text added
* (ticaki) update deps

### 0.2.2 (2025-08-22)
* (ticaki) Sunrise and sunset times added to the daily overview.

### 0.2.1 (2025-08-20)
* (ticaki) Startup log entry fixed.

### 0.2.0 (2025-08-20)
* (ticaki) DWD station ID added
* (ticaki) WMO station ID added
* (ticaki) Deactivation of data options added

### 0.1.1 (2025-08-19)
* (ticaki) Reduce required Nodej's version to 20

### 0.1.0 (2025-08-19)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2025 ticaki <github@renopoint.de>

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
