![Logo](admin/open-meteo.png)
# ioBroker.open-meteo-weather

[![NPM version](https://img.shields.io/npm/v/iobroker.open-meteo-weather.svg)](https://www.npmjs.com/package/iobroker.open-meteo-weather)
[![Downloads](https://img.shields.io/npm/dm/iobroker.open-meteo-weather.svg)](https://www.npmjs.com/package/iobroker.open-meteo-weather)
![Number of Installations](https://iobroker.live/badges/open-meteo-weather-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/open-meteo-weather-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.open-meteo-weather.svg?data=d)](https://www.npmjs.com/package/iobroker.open-meteo-weather)

![Test and Release](https://github.com/H5N1v2/iobroker.open-meteo-weather/workflows/Test%20and%20Release/badge.svg) 
![node-lts](https://img.shields.io/node/v-lts/iobroker.open-meteo-weather?style=flat-square)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and instructions on disabling error reporting, please refer to the [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Use of Sentry reporting starts with js-controller 3.0.

I use my own Sentry server based on Glitchtip.

**The Open-Meteo Weather Service Adapter for ioBroker.**

## First: If you are looking for a widget specifically for this adapter, then create it using [VIS2-widget-script-om-weather](https://github.com/H5N1v2/VIS2-widget-script-om-weather).

This adapter provides precise weather data, forecasts, air quality, and pollen information powered by [Open-Meteo.com](https://open-meteo.com/). It is free for non-commercial use (under 10,000 daily API calls) and requires no API key registration, making the setup process extremely simple.

---

## Features

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

## Icons & Visualization

The adapter provides dynamic icon paths that can be used directly in visualizations such as **vis, iQontrol, or Jarvis**.

* **Weather Icons:** Found under `weather.current.icon_url`. The adapter automatically distinguishes between day and night (e.g., Sun vs. Moon).
* **Wind Direction:** Static paths under `wind_direction_icon` display a compass arrow corresponding to the degree value.
* **Wind Gust Warning:** A warning icon is displayed under `wind_gust_icon` for wind speeds above approx. 39 km/h (Bft 6), featuring levels 0–4.
* **Moon Phases Icons:** Moon icons can be found under `moon_phase_icon` they display the moon phases.

---

## Data Points (Excerpt)

| Folder | Description |
|:---|:---|
| `air.current` | Air quality and pollen levels as text and value |
| `air.forecast.dayX` |  Daily air quality forecast for Day X |
| `weather.current` | Current measurements (Temp, Dew point, Wind, etc.) |
| `weather.forecast.dayX` | Daily forecast for Day X |
| `weather.forecast.hourly.hourX` | Hourly details per full hour |
| `info.lastUpdate` | Shows Date and Time from last Update |

---

## Update note

After a new adapter update, it is recommended to delete the entire directory tree and let it be recreated.

## Changelog
### 2.6.4 (2026-03-30)
* (H5N1v2) Update axios dependency to version 1.14.0

### 2.6.3 (2026-03-26)
* (H5N1v2) add sentry plugin to automatically report errors to developer

### 2.6.2 (2026-03-25)
* (H5N1v2) update @types/node dependency to version 22.19.15

### 2.6.1 (2026-03-04)
* (H5N1v2) chore: update dependencies to latest versions
* (mcm1957) fix: axios seems to be missing in dependencies
* (mcm1957) fix: language used for stateIds and names
* (mcm1957) fix: creation of intermediate objects missing

### 2.6.0 (2026-02-19)
* (H5N1v2) feat: Leave latitude and longitude empty to use system coordinates in settings. 
* (H5N1v2) feat: Added dropdown menu for timezones in settings.

[OLDER CHANGELOG](CHANGELOG_OLD.md)

## Legal & Copyright

### Icons & Images
The weather and wind direction icons included in this adapter are subject to the creator's copyright.
* **Usage:** These icons are licensed for use within ioBroker. Commercial redistribution or use outside of this adapter requires the explicit consent of the author: h5n1@iknox.de.
* **Weather Data:** All weather data is provided by [Open-Meteo.com](https://open-meteo.com/). Please review their terms of use for commercial purposes.

### License
This project is licensed under the **MIT License** - see the `LICENSE` file for details.

Copyright (c) 2026 H5N1v2 <h5n1@iknox.de>