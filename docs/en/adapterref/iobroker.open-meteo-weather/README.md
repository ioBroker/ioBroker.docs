![Logo](admin/open-meteo.png)
# ioBroker.open-meteo-weather

[![NPM version](https://img.shields.io/npm/v/iobroker.open-meteo-weather.svg)](https://www.npmjs.com/package/iobroker.open-meteo-weather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.open-meteo-weather.svg)](https://www.npmjs.com/package/iobroker.open-meteo-weather)
![Number of Installations](https://iobroker.live/badges/open-meteo-weather-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/open-meteo-weather-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.open-meteo-weather.svg?data=d)](https://www.npmjs.com/package/iobroker.open-meteo-weather)

![Test and Release](https://github.com/H5N1v2/iobroker.open-meteo-weather/workflows/Test%20and%20Release/badge.svg) 
![node-lts](https://img.shields.io/node/v-lts/iobroker.open-meteo-weather?style=flat-square)

## Important information:

Open Meteo Weather and Open Meteo PV Forecast have now been merged into this adapter. Open Meteo PV Forecast is no longer maintained.

---

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and instructions on disabling error reporting, please refer to the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Use of Sentry reporting starts with js-controller 3.0.

I use my own Sentry server based on Glitchtip.

**The Open-Meteo Weather & PV Forecast Service Adapter for ioBroker.**


This adapter provides precise weather data, forecasts, air quality, pollen & Photovoltaic Forecast information powered by [Open-Meteo.com](https://open-meteo.com/). It is free for non-commercial use (under 10,000 daily API calls) and requires no API key registration, making the setup process extremely simple.

---

# Features Weather

* **Current Weather Data:** Real-time retrieval of temperature, humidity, air pressure, and wind data.
* **Flexible Forecasts:** Configurable number of forecast days and hourly resolution.
* **Air Quality & Pollen:** Optional data for particulate matter (PM2.5, PM10) as well as various pollen types (alder, birch, grass, etc.).
* **Automatic Cleanup:** The adapter automatically cleans up the object structure if forecast periods are shortened or changed in the configuration.
* **Multi-Language Support:** Supports 11 languages (including English, German, Polish, Russian, French, Chinese, etc.).
* **Unit System:** Seamless switching between Metric (°C, km/h) and Imperial (°F, mph) systems.
* **Multi Location:** Add multible Locations.
* **Night Icons:** You can choose between two night icon sets, "Bright" and "Dark". This makes it easier to match the icon to your background.
### Wind Direction Icons

In the adapter settings, you can choose between two different visualization styles for the wind direction:

* Wind direction (where the wind is blowing to): This is the standard setting. The arrow points in the direction the wind is moving. (Example: A north wind shows an arrow pointing South).

* Wind origin (where the wind is coming from): This style uses icons from the direct_2 subfolder. The arrow indicates the source of the wind. (Example: A north wind shows an arrow pointing North or a specific "origin" icon).

|Setting | Icon Path | Behavior |
|:---|:---|:---|
|Wind direction (where the wind is blowing to) | /icons/wind_direction_icons/*.png | Points to destination |
|Wind origin (where the wind is coming from) |/icons/wind_direction_icons/direct_2/*.png |	Points to origin |


### Air Quality Data
The adapter provides current air quality data and a daily forecast for the upcoming days (configurable for 1, 3, or 6 days).

Efficient Data Processing: While the Open-Meteo API only provides raw hourly data, this adapter intelligently aggregates these values. It automatically calculates the daily maximum for all pollutants and pollen levels. This gives you the most relevant data (peak exposure levels) without bloating your database with hundreds of hourly data points.

Features:

* Daily Peaks: Get the highest expected value for PM2.5, PM10, Ozone, and various pollen types.

* Human Readable: Pollen levels are automatically mapped to descriptive categories (e.g., "None", "Low", "Moderate", "High").

* Smart Cleanup: Objects for forecast days are automatically created or removed based on your settings to keep your object tree clean.

---

## Configuration

After installation, configure the following fields in the instance settings:

1.  **Location:** Add your Location or a name you want.
2.  **Coordinates (Latitude & Longitude):** Add your coordinates. You can find them by clicking the 'Find coordinates with OpenStreetMap' button, or leave the fields empty to use the system coordinates.
3.  **Time Zone:** Set the timezone in the dropdown menu, the default is 'Auto', which automatically adjusts based on your coordinates.
4.  **Update Interval:** Time interval in minutes (Default: 30 min).
5.  **Forecast Days:** Number of days for the daily overview (0–16 days).
6.  **Hourly Forecast:** Enable or disable this option and set the number of hours (e.g., the next 24 hours). For example, hour0 is the current hour, hour1 is the next hour, and so on.
7.  **Optional Data:** Checkboxes for pollen and air quality data.
8.  **Units:** Choose between Metric and Imperial.

---

## Weather Widget

This adapter offers two ways to display weather data in your visualization:

### 1. Built-in Widget (Standard)
Since version **3.1.0**, the adapter can automatically generate a pre-configured HTML widget for each location. 

**How to use:** 
1. **Enable:** Check the "Create Widget" checkbox in the instance settings for your location.
2. **Find State:** The adapter will create a state called `htmlWidget` (under `open-meteo-weather.0.yourLocation.htmlWidget`).
3. **In VIS/VIS2:** * Drag a standard **"HTML" widget** onto your view.
   * Set the "HTML" property of that widget to the binding of your state: `{open-meteo-weather.0.yourLocation.htmlWidget}`.
   * Adjust the width and height of the widget container to fit the content.

**Customization:** You can only adjust basic settings like font sizes, forecast hours and days directly in the adapter configuration.

**Best for:** Users who want a quick, beautiful, and maintenance-free display.

**Note:** For optimal display on desktop browsers, do not use additional CSS borders or shadows in the VIS editor settings. The widget comes with its own optimized styling.

### 2. Advanced Widget Script (Full Customization)
If you want to make deep changes to the design, add your own CSS, or extend the logic:
* **Link:** Use the [VIS2-widget-script-om-weather](https://github.com/H5N1v2/VIS2-widget-script-om-weather).
* **Best for:** Power users who want full control over every HTML tag and CSS property.

---

## Icons & Visualization

The adapter provides dynamic icon paths that can be used directly in visualizations such as **vis, iQontrol, or Jarvis**.

* **Weather Icons:** Found under `weather.current.icon_url`. The adapter automatically distinguishes between day and night (e.g., Sun vs. Moon).
* **Wind Direction:** Static paths under `wind_direction_icon` display a compass arrow corresponding to the degree value (Display direction selectable).
* **Wind Gust Warning:** A warning icon is displayed under `wind_gust_icon` for wind speeds above approx. 39 km/h (Bft 6), featuring levels 0–4.
* **Moon Phases Icons:** Moon icons can be found under `moon_phase_icon` they display the moon phases.
* **Multible Icons:** You can choose between static and animated (by [basmilius](https://github.com/basmilius/meteocons)) icons.

---

## Data Points (Excerpt)

| Folder | Description |
|:---|:---|
| `air.current` | Air quality and pollen levels as text and value |
| `air.forecast.dayX` |  Daily air quality forecast for Day X |
| `weather.current` | Current measurements (Temp, Dew point, Wind, etc.) |
| `weather.forecast.dayX` | Daily forecast for Day X |
| `weather.forecast.hourly.hourX` | Hourly details per full hour |
| `info.lastUpdate_weather` | Shows Date and Time from last Weather Update |

---
#### If you do not need the weather forecasts, leave the location field blank, no states will be entered.
---
---

# Features PV Forecast (if enabled)

* **Multiple Locations:** Support for multiple PV systems/locations, e.g., for East/West orientations.
* **Hourly Forecast:** Detailed prediction of power output, temperature, cloud cover, and sunshine duration.
* **Daily Forecast:** Summary of expected energy (Wh) for up to 14 days.
* **15-Minutes Forecast:** 15-Minutely forecast for current day, 24 hours.
* **Physical Simulation:**
    * **Tilt & Azimuth:** Irradiance calculation based on panel orientation.
    * **PV Module Temperature:** Estimation of cell temperature considering ambient temperature, radiation intensity, and wind speed (Faiman model).
    * **Sunshine Duration:** Conversion of sunshine duration into minutes per hour.
* **Aggregation:** Automatic summing of all locations (total forecast) on both a daily, hourly and 15-minutely basis.
* **System Integration:** Automatic acquisition of location coordinates from the ioBroker system configuration if not manually set.
* **PV Module Temperature:** Estimated PV Module Temperature, based on Faiman model.

---

## Data Points (Objects)

For each configured location, a channel is created with the following data points in:
| Folder | Description |
|:---|:---|
| `pv-forecast` | Folder for PV-Forecast Data |

### 15 Minutely Forecast (`15-min-forecast.0 - 95`), (24 Hours of current day), if enebled
| Data Point | Unit | Description |
|:---|:---|:---|
| `global_tilted_irradiance` | Wh | Expected energy based on installed capacity (kWp). |
| `pv_temperature` | °C | Estimated PV module temperature (Faiman calculation). |
| `temperature_2m` | °C | Air temperature at 2 meters height. |
| `time` | - | Forecast time (HH:mm). |
| `wind_speed_10m` | km/h | Wind speed at 10 meters height. |

Info: temperature_2m and wind_spread_10m are needed to calculate the PV module temperature.

Optionally selectable if needed, otherwise the DP are included in the weather.
| Data Point | Unit | Description |
|:---|:---|:---|
| `cloud_cover` | % | Total cloud cover in percent. |
| `sunshine_duration` | min | Actual sunshine minutes within this hour. |

### Daily Forecast (`daily-forecast.dayX`)
| Data Point | Unit | Description |
|:---|:---|:---|
| `Date` | - | Forecast date (DD.MM.YYYY). |
| `Peak_day` | Wh | Expected total daily yield. |

### Forecast JSON (`location_folder`) if enebled
| Data Point | Unit | Description |
|:---|:---|:---|
| `15-min-json_chart` | - | JSON 15-min |
| `hourly-json_chart` | - | JSON hourly |

### Hourly Forecast (`hourly-forecast.hourX`)
| Data Point | Unit | Description |
|:---|:---|:---|
| `time` | - | Forecast time (HH:mm). |
| `global_tilted_irradiance` | Wh | Expected energy based on installed capacity (kWp). |
| `pv_temperature` | °C | Estimated PV module temperature (Faiman calculation). |
| `temperature_2m` | °C | Air temperature at 2 meters height. |
| `wind_speed_10m` | km/h | Wind speed at 10 meters height. |

Info: temperature_2m and wind_spread_10m are needed to calculate the PV module temperature.

Optionally selectable if needed, otherwise the DP are included in the weather.
| Data Point | Unit | Description |
|:---|:---|:---|
| `cloud_cover` | % | Total cloud cover in percent. |
| `sunshine_duration` | min | Actual sunshine minutes within this hour. |

### sum_peak_locations_15_Minutly (`0-95`) if enebled
| Data Point | Unit | Description |
|:---|:---|:---|
| `sum_locations` | Wh | Sum of Locations 15 Minutely |
| `time` | - | Forecast time (HH:mm). |

### sum_peak_locations_Daily (`dayX`) if enebled
| Data Point | Unit | Description |
|:---|:---|:---|
| `sum_locations` | Wh | Sum of Locations Daily |

### sum_peak_locations_Hourly (`HourX`) if enebled
| Data Point | Unit | Description |
|:---|:---|:---|
| `sum_locations` | Wh | Sum of Locations Hourly |
| `time` | - | Forecast time (HH:mm). |

### JSON Datapoints if enebled
| Data Point | Unit | Description |
|:---|:---|:---|
| `sum_peak_15-min-json_chart` | - | Sum of Locations 15 min in JSON |
| `sum_peak_hourly-json_chart` | - | Sum of Locations hourly in JSON |


---

## Configuration

### Basic Settings
* **Forecast Hours:** Timeframe for the hourly view (3 to 48 hours).
* **Forecast Days:** Duration of the daily forecast (3 to 14 days).
* **Update Interval:** Frequency of data updates (15, 30, 60 minutes or once before Sunrise).

### Datapoints Settings
* **Rolling Hours or Fixed Hours:** If 'Rolling Hours' is selected, the hourly forecast will always show the next hours starting from the current hour. If 'Fixed Hours' is selected, the hourly forecast will show fixed time intervals (e.g., 00:00-23:00) regardless of the current time.
* **15-minutes Forecast:** If enabled, additional states will be created for a 15-minute forecast (up to 24 hours for the current day). Please note that 15-minute data availability depends on the Open-Meteo API and may vary by location or time.

### Locations (Table)
The following values must be defined for each location:
1.  **Name:** Unique identifier (sanitized for the object ID).
2.  **Latitude/Longitude:** GPS position (optional: uses system values otherwise).
3.  **Tilt:** Angle of the modules (0° = flat, 90° = vertical).
4.  **Azimuth:** Orientation (-180° to 180°, 0° = South, -90° = East, 90° = West).
5.  **Power (kWp):** Installed peak capacity of the system.
6.  **Timezone:** Selection of the local timezone (Default: Auto).

![Logo](admin/img/doc.png)

### Global Options, only adjustable if you have multible Locations!
* **Total Sum (Daily):** Creates the channel `sum_peak_locations_Daily`, summing the yields of all systems.
* **Total Sum (Hourly):** Creates the channel `sum_peak_locations_Hourly` for the total hourly performance.
* **Total Sum (15-Minutely):** Creates the channel `sum_peak_locations_15_Minutely` for the total 15 Minutes forecast.

---

## Technical Details & Calculation

### PV Temperature Model
The adapter uses the **Faiman model** to estimate the module temperature. This model accounts for wind cooling, which directly impacts efficiency:
`pvTemp = Ambient Temperature + Irradiance / (25 + 6.84 * Wind Speed)`.

---

## Update note

After a new adapter update, it is recommended to delete the entire directory tree and let it be recreated.

## Changelog
### 3.1.0 (2026-05-03)
* (H5N1v2) Changed update routine for weather and PV forecast to fixed fetch times.
* (H5N1v2) Added a customizable HTML weather widget in the admin area.
* (H5N1v2) Adaptation for version jumps from older configurations.
* (H5N1v2) Description added to the admin area.
* (H5N1v2) Readme updated in widget section.
* (H5N1v2) Adapter internal widget adapted, hazards are highlighted in color (currently only in the internal adapter widget).
* (copilot) Adapter requires node.js >= 22 now.
* (H5N1v2) Update axios to v.1.16.0.

### 3.0.1 (2026-04-25)
* (H5N1) update dependencies
* (H5N1) improve error handling in API calls with detailed messages
* (H5N1) fix: attribute in jsonConfig.
* (Negalein) fix: yellow help text in admin for pv-forecast extra dp's, poor recognition on white background
* (H5N1v2) fix: update interval for pv-forecast "once before sunrise" time incorrectly calculated

### 3.0.0 (2026-04-18)
* (H5N1v2) merged open-meteo-weather and open-meteo-pv-forecast
* (H5N1v2) adding icon selection tab and animated icons for weather by Bas Milius
* (H5N1v2) adding solar_noon in daily, freezing_level_height and snowfall_height in hourly
* (H5N1v2) remove global_tilted_irradiance datapoint from weather.hourly

### 2.6.4 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.6.3 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Older Changelog
[OLDER CHANGELOG](CHANGELOG_OLD.md)

## Legal & Copyright

### Icons & Images
Animatetd weather icons by [Bas Milius](https://github.com/basmilius/meteocons)

The static weather and wind direction icons included in this adapter are subject to the creator's copyright.
* **Usage:** These icons are licensed for use within ioBroker. Commercial redistribution or use outside of this adapter requires the explicit consent of the author: h5n1@iknox.de.
* **Weather Data:** All weather data is provided by [Open-Meteo.com](https://open-meteo.com/). Please review their terms of use for commercial purposes.

### License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>