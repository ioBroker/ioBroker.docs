![Logo](admin/openmeteo-notify.png)

# ioBroker.openmeteo-notify

[![NPM version](https://img.shields.io/npm/v/iobroker.openmeteo-notify.svg)](https://www.npmjs.com/package/iobroker.openmeteo-notify)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openmeteo-notify.svg)](https://www.npmjs.com/package/iobroker.openmeteo-notify)
![Number of Installations](https://iobroker.live/badges/openmeteo-notify-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openmeteo-notify-stable.svg)
[![NPM](https://nodei.co/npm/iobroker.openmeteo-notify.png?downloads=true)](https://nodei.co/npm/iobroker.openmeteo-notify/)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.openmeteo-notify/workflows/Test%20and%20Release/badge.svg)

## ioBroker adapter for Open-Meteo weather forecasts

This adapter retrieves weather forecast data from the free [Open-Meteo API](https://open-meteo.com) and makes it available as ioBroker data points. No API key is required.

## Highlights

### Configurable HTML widget
The adapter generates a ready-to-use HTML data point (`widget`) that can be embedded directly in VIS, vis-2 or any ioBroker dashboard — no external tools or manual CSS needed. Theme (light/dark), background transparency, card transparency, font size and card color are all configurable directly in the adapter settings.

### Full-text address search
Locations do not have to be entered as raw coordinates. The settings UI offers a **free-text address search** — just type a city, address or region and the coordinates are resolved automatically. An OpenStreetMap preview is shown for each location. Multiple locations can be configured in parallel.

### Up to 16 days forecast
Depending on the selected weather model, daily forecasts for up to **16 days** are available — significantly more than the typical 5–7 days of most adapters.

### Weather summary texts
The adapter generates natural-language weather summaries (`current.summary`, `dayX.summary_day`, `dayX.summary_night`) in **11 languages**, using DWD-standard thresholds for temperature, wind and precipitation, including CAPE-based thunderstorm risk.

## Features

- **Free & no API key** – Open-Meteo is a free, open-source weather API
- **Multiple locations** – configure as many locations as you like, each with address search and map preview
- **System location fallback** – uses ioBroker system coordinates if no location is configured
- **Configurable forecast range** – up to 16 days daily, up to 16 days hourly
- **Configurable update interval** – 60 min, 120 min, or daily at 01:00
- **Units** – temperature (°C / °F), wind speed (km/h, m/s, mph, kn), precipitation (mm / inch)
- **5 weather icon sets** with live preview in settings:
  - Meteocons by Bas Milius – static PNG (default)
  - Meteocons by Bas Milius – animated SVG
  - amCharts Weather Icons – animated SVG *(rain/snow/thunder: no day/night variant)*
  - amCharts Weather Icons – static SVG *(rain/snow/thunder: no day/night variant)*
  - WMO OGC meteorological symbols – PNG
- **Day/night icons** – Meteocons and amCharts clear/cloudy icons switch to night variants based on `is_day`
- **Wind direction** – degrees, compass text (N/NE/E/…), arrow emoji (⬆️↗️…), SVG arrow icon
- **Wind strength** – Beaufort scale (0–12) with Meteocons Beaufort icons
- **`info.lastUpdate`** – timestamp of last successful update

### Optional data groups (individually switchable, each with "also hourly" option)

| Group | Default | Data points |
|-------|---------|-------------|
| **Air Quality** | on | european_aqi, PM10, PM2.5, NO₂, CO, dust, ozone → `current.air_quality` / `hXX.air_quality` |
| **Astronomy** | on | sunrise, sunset, solar noon, max sun elevation, moon phase, moonrise, moonset → `dayX.astronomy` / `hXX.astronomy` |
| **Agriculture / Solar** | off | solar radiation, CAPE, soil temperature, irradiance → `*.agriculture` |
| **Comfort Indices** | off | heat index, windchill, humidex, UV index → `*.comfort` |
| **Pollen** | off | alder, birch, grass, mugwort, olive, ragweed with level text → `dayX.pollen` / `hXX.pollen` |
| **DWD warnings** | off | Official warnings from Deutscher Wetterdienst (Germany only) → `location.warnings.*` |

When a group is disabled, its data point channels are automatically deleted on the next update.

### Official weather warnings

The adapter integrates official weather warnings from national meteorological services. Enable with the **"Official weather warnings"** toggle. The service is selected automatically based on the location coordinates:

| Country | Service | Coverage |
|---------|---------|----------|
| Germany (DE) | [DWD](https://www.dwd.de) – Deutscher Wetterdienst | All warning types, 4 severity levels |
| EU countries | [MeteoAlarm](https://www.meteoalarm.org) | All warning types, polygon-based matching |
| Other | — | Not available (use calculated Open-Meteo warnings) |

Warnings are stored under `location.warnings.*` regardless of the source. A `warnings.source` data point shows `"DWD"` or `"MeteoAlarm"`.

## Installation

Install via the ioBroker Admin interface (search for "openmeteo-notify").

## Configuration

| Setting | Description | Default |
|---------|-------------|---------|
| Locations | Name + free-text address search or coordinates; OSM map preview | ioBroker system location |
| Forecast days | Daily forecast range (1–16) | 7 |
| Hourly days | Days with hourly data (0–16) | 3 |
| Temperature unit | °C or °F | °C |
| Wind speed unit | km/h, m/s, mph, kn | km/h |
| Precipitation unit | mm or inch | mm |
| Icon set | Weather icon set with live preview | Meteocons static |
| Update interval | 60 min / 120 min / daily at 01:00 | 60 min |
| Widget theme | Light or dark theme for the HTML widget | light |
| Widget bg opacity | Background transparency of the HTML widget | 100% |
| Widget card opacity | Card transparency of the HTML widget | 100% |
| Widget font size | Font size in the HTML widget | 14px |
| Widget card color | Card background color | #ffffff |
| Compact view | Use compact layout in the HTML widget | off |
| Air Quality | Enable AQI + particulate matter | on |
| Air Quality – also hourly | Hourly AQI/PM under `hXX.air_quality` | off |
| Astronomy | Enable sun & moon data | on |
| Astronomy – also hourly | Echo astronomy data per hourly slot | off |
| Agriculture / Solar | Enable radiation, CAPE, soil temp | off |
| Agriculture – also hourly | Hourly agricultural data | off |
| Comfort Indices | Enable heat index, windchill, humidex, UV index | off |
| Comfort – also hourly | Hourly comfort data | off |
| Pollen | Enable pollen data (Europe only) | off |
| Pollen – also hourly | Hourly pollen per type | off |
| DWD weather warnings | Enable DWD data (Germany only) | off |
| Official warnings as notification | Send official warnings (DE: DWD, EU: MeteoAlarm) via ioBroker notification system | off |
| Storm warning | Calculated from Open-Meteo forecast, worldwide | off |
| Thunderstorm warning | Calculated from Open-Meteo forecast, worldwide | off |
| Lead time (hours) | How many hours in advance to send storm/thunderstorm warnings | 2 |

## Data points

The adapter creates data points under `openmeteo-notify.<instance>.<location>`.

### Current weather (`current`)

| Data point | Description | Unit |
|-----------|-------------|------|
| `temperature` | Current temperature | °C/°F |
| `feels_like` | Apparent temperature – combines heat, humidity, wind | °C/°F |
| `weathercode` | WMO weather code (0 = clear sky, 95/99 = thunderstorm) – full table: [WMO 4677](https://open-meteo.com/en/docs#weathercode) | |
| `description` | Human-readable weather description (11 languages) | |
| `icon` | Weather emoji | |
| `icon_url` | Weather icon URL (icon set selectable in settings) | |
| `precipitation` | Total precipitation last hour | mm/inch |
| `rain` | Rain amount last hour | mm/inch |
| `snowfall` | Snowfall last hour | cm |
| `snow_depth` | Current snow depth on the ground | cm |
| `cloudcover` | Cloud cover | % |
| `humidity` | Relative humidity | % |
| `dew_point` | Dew point – temperature at which air becomes saturated; close to air temp = high humidity | °C/°F |
| `pressure` | Atmospheric pressure reduced to mean sea level (MSL) | hPa |
| `visibility` | Horizontal visibility | m |
| `is_day` | `true` between sunrise and sunset | boolean |
| `windspeed` | Wind speed (unit selectable: km/h, m/s, mph, kn) | km/h … |
| `windgusts` | Maximum wind gust speed | km/h … |
| `winddirection` | Wind direction (meteorological: direction the wind comes from) | ° |
| `winddirection_text` | Cardinal direction text | N/NE/… |
| `winddirection_icon` | Cardinal direction emoji | ⬆️↗️… |
| `winddirection_icon_url` | Wind direction arrow icon URL | |
| `windbeaufort` | Wind strength on Beaufort scale (0 = calm, 8 = gale, 12 = hurricane) | 0–12 |
| `windbeaufort_icon_url` | Beaufort icon URL | |
| `air_quality.*` | AQI, PM10, PM2.5, NO₂, CO, dust, ozone *(if enabled)* | |
| `pollen.*` | Current pollen per type *(if enabled)* | Grains/m³ |
| `agriculture.solar_radiation` | Shortwave solar radiation at ground level *(if enabled)* | W/m² |
| `agriculture.cape` | CAPE – Convective Available Potential Energy: energy available for thunderstorm development; > 500 J/kg = notable risk, > 2000 J/kg = severe *(if enabled)* | J/kg |
| `agriculture.soil_temp` | Soil temperature at 0 cm depth *(if enabled)* | °C/°F |
| `comfort.heat_index` | Heat index (Rothfusz) – how hot it feels combining temperature and humidity; only meaningful ≥ 27 °C and ≥ 40 % RH, `null` otherwise *(if enabled)* | °C/°F |
| `comfort.windchill` | Wind chill (NWS) – how cold it feels due to wind; only meaningful ≤ 10 °C and wind > 4.8 km/h, `null` otherwise *(if enabled)* | °C/°F |
| `comfort.humidex` | Humidex (Canadian formula) – combined heat+humidity discomfort index; values above 40 are uncomfortable, above 46 dangerous *(if enabled)* | °C/°F |
| `comfort.humidex_level` | Humidex discomfort level: 1 = none (<29) · 2 = slight (29–34) · 3 = noticeable (35–39) · 4 = intense (40–45) · 5 = dangerous (≥46) *(if enabled)* | 1–5 |
| `comfort.uv_index` | UV index (0–11+) – intensity of UV radiation at ground level *(if enabled)* | |
| `comfort.uv_level` | UV protection level (WHO scale): `low` (0–2, no protection) · `moderate` (3–5, sunscreen) · `high` (6–7) · `very_high` (8–10) · `extreme` (≥11) *(if enabled)* | |

### Daily forecast (`day1` … `day16`)

| Data point | Description |
|-----------|-------------|
| `date` / `weekday` | Date / day of week |
| `icon` / `icon_url` | Weather icon (day/night variant) |
| `description` | Weather description |
| `temp_max` / `temp_min` | Temperature max/min |
| `feels_like_max` / `feels_like_min` | Feels-like max/min |
| `weathercode` | WMO weather code |
| `precipitation` | Precipitation sum |
| `rain` / `snowfall` | Rain / snowfall sum |
| `rain_probability` | Precipitation probability |
| `windspeed` / `windgusts` | Wind speed / gusts max |
| `winddirection` / `_text` / `_icon` / `_icon_url` | Wind direction |
| `windbeaufort` / `windbeaufort_icon_url` | Beaufort scale |
| `uv_index` | Daily max UV index *(accounting for cloud cover)* | |
| `uv_index_clear_sky` | Daily max UV index assuming completely clear sky – useful to see potential UV regardless of clouds | |
| `sunshine_hours` | Hours of actual sunshine (direct radiation) | h |
| `daylight_hours` | Total hours between sunrise and sunset | h |
| `cloud_cover_max` | Maximum cloud cover during the day | % |
| `temp_mean` / `feels_like_mean` | Daily mean temperature / feels-like | °C/°F |
| `precipitation_hours` | Number of hours with measurable precipitation | h |
| `showers` | Convective (shower-type) precipitation – short, intense; distinct from continuous `rain` | mm/inch |
| `snowfall_height_min` | Lowest altitude during the day at which snow falls (0 m = snow to valley floor) | m a.s.l. |
| `freezing_level_height_min` | Lowest altitude of the 0 °C isotherm during the day | m a.s.l. |
| `dew_point_mean` / `humidity_mean` / `pressure_mean` | Daily mean values | |
| `air_quality.european_aqi_max` … `ozone_max` | Daily max AQI, PM10, PM2.5, NO₂, CO, dust, ozone *(if enabled)* | |
| `astronomy.sunrise` / `astronomy.sunset` | Sunrise / sunset *(if enabled)* | |
| `astronomy.solar_noon` | Time of highest sun position *(if enabled)* | |
| `astronomy.solar_elevation_max` | Sun angle above the horizon at solar noon – 90° = directly overhead, 0° = horizon *(if enabled)* | ° |
| `astronomy.moon_phase_val` | Moon phase as number: 0 = new moon · 0.25 = first quarter · 0.5 = full moon · 0.75 = last quarter *(if enabled)* | 0–1 |
| `astronomy.moon_phase_text` / `_icon_url` | Moon phase as text / icon *(if enabled)* | |
| `astronomy.moonrise` / `astronomy.moonset` | Moon rise / set *(if enabled)* | |
| `agriculture.solar_radiation_sum` | Total solar radiation received during the day | MJ/m² |
| `agriculture.evapotranspiration` | FAO-56 reference evapotranspiration (ET₀) – how much water plants and soil release; used for irrigation planning | mm |
| `agriculture.lifted_index_min` | Daily minimum Lifted Index – atmospheric stability: negative = unstable/storm risk, strongly negative (< −6) = severe thunderstorm risk *(if enabled)* | K |
| `comfort.heat_index_max` | Max heat index of the day *(if enabled)* | °C/°F |
| `comfort.windchill_min` | Min wind chill of the day *(if enabled)* | °C/°F |
| `comfort.humidex_max` / `.humidex_level` | Max humidex / discomfort level (1–5, see current section) *(if enabled)* | |
| `comfort.uv_index_max` / `.uv_level` | Max UV index / level (see current section) *(if enabled)* | |
| `pollen.alder` … `pollen.ragweed` | Daily max pollen concentration + level text (None/Low/Medium/High) *(if enabled, day1–4 only)* | Grains/m³ |

### Hourly values (`day1.hourly.h00` … `h23`)

Temperature, feels-like, precipitation, rain, snowfall, snow depth, snowfall height, rain probability, cloud cover, humidity, dew point, pressure, visibility, is_day, wind speed, wind direction (text/emoji/icon), Beaufort, UV index, freezing level height, weather code, icon/icon_url, description.

Optional per hour (if enabled + "also hourly"):

| Channel | Data points |
|---------|-------------|
| `hXX.air_quality` | european_aqi, PM10, PM2.5, NO₂, CO, dust, ozone |
| `hXX.astronomy` | sunrise, sunset, moon_phase_val/text/icon_url, moonrise, moonset |
| `hXX.agriculture` | solar_radiation (W/m²), CAPE (J/kg), soil_temp (°C/°F), irradiance = global tilted irradiance on a flat surface (W/m²), lifted_index (K) |
| `hXX.comfort` | heat_index, windchill, humidex, humidex_level, uv_index, uv_level |
| `hXX.pollen` | alder … ragweed + level text (Keine/Niedrig/Mittel/Hoch) |

### Official warnings (`warnings`)

| Data point | Description |
|-----------|-------------|
| `warnings.source` | Warning service: `"DWD"` or `"MeteoAlarm"` |
| `warnings.active` | At least one active warning |
| `warnings.count` | Number of active warnings |
| `warnings.max_level` | Highest severity level: 1 = Minor · 2 = Moderate · 3 = Severe · 4 = Extreme |
| `warnings.max_level_text` | Severity text |
| `warnings.warning_N.active` | Warning slot N active |
| `warnings.warning_N.event` | Event type |
| `warnings.warning_N.level` / `.level_text` | Severity |
| `warnings.warning_N.headline` | Warning headline |
| `warnings.warning_N.description` | Warning description |
| `warnings.warning_N.start` / `.end` | Validity period |

*(Only created when "Official weather warnings" is enabled and a supported country is detected.)*

### Summary & widget

| Data point | Description |
|-----------|-------------|
| `current.summary` | Natural-language weather summary for current conditions (11 languages) |
| `dayX.summary_day` | Daytime weather summary for the forecast day (11 languages) |
| `dayX.summary_night` | Night-time weather summary for the forecast day (11 languages) |
| `weather_short` | Short text overview of all forecast days |
| `widget` | Ready-to-use HTML snippet for VIS / vis-2 / dashboards (configurable appearance) |
| `info.lastUpdate` | Timestamp of last successful update |

## Icon credits

- **Meteocons** by [Bas Milius](https://github.com/basmilius/weather-icons) – MIT License
- **amCharts Weather Icons** by [amCharts](https://www.amcharts.com/free-animated-svg-weather-icons/) – [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **WMO meteorological symbols** by [OGC MetOcean DWG](https://github.com/OGCMetOceanDWG/WorldWeatherSymbols) – CC BY 4.0

## Disclaimer

This adapter uses data from the following third-party services:

- **[Open-Meteo](https://open-meteo.com)** – weather forecast data. Open-Meteo name and logo are property of their respective owners.
- **[DWD](https://www.dwd.de)** (Deutscher Wetterdienst) – official weather warnings for Germany. DWD name and data are property of the Deutscher Wetterdienst.
- **[MeteoAlarm](https://www.meteoalarm.org)** – official weather warnings for European countries. MeteoAlarm name and data are property of their respective owners.

This adapter is an independent community project and is not affiliated with or endorsed by any of the above services.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.12 (2026-07-01)
* (ipod86) fix: translate 84 missing admin i18n keys into all 10 languages (W5606)

### 0.1.11 (2026-06-24)
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (ipod86) fix: skip hourly slots without icon data in detailed widget (missing icons at 00h/02h/04h)
* (ipod86) feat: grey out hourlyRange options that exceed configured hourly days; add explanatory hint
* (ipod86) fix: reposition moon badge in simple and detailed widget header
* (ipod86) feat: add moon phase overlay to simple widget (showMoon option)
* (ipod86) fix: complete and correct i18n translations in all 11 languages (50+ missing keys)
* (ipod86) ci: remove broken build-admin GitHub Actions workflow

### 0.1.10 (2026-06-23)
* (ipod86) fix: improve air quality/pollen error log message – distinguish timeout from unsupported region

### 0.1.9 (2026-06-22)
* (ipod86) fix: increase HTTP request timeout from 10s to 30s
* (ipod86) fix: remove spurious enableWarnOfficialFetch from native defaults
* (ipod86) chore: bump @iobroker/adapter-core from 3.3.2 to 3.4.1
* (ipod86) chore: bump @iobroker/adapter-react-v5, react, @vitejs/plugin-react, vite in src-admin
* (ipod86) chore: bump ioBroker/testing-action-check from 1 to 2

### 0.1.8 (2026-06-09)
* (ipod86) fix: add 10s timeout to all HTTP requests (fetchWeather, fetchAirQuality, fetchLocationInfo, fetchMeteoAlarmWarnings, fetchDwdWarnings)
* (ipod86) fix: translate all remaining German common.name values in processData, processDwdWarnings, processMeteoAlarmWarnings
* (ipod86) fix: warning time format no longer hardcoded to de-DE locale; uses system locale
* (ipod86) fix: add interval bounds validation (1–35791 min) for updateInterval and warnIntervalMinutes
* (ipod86) fix: add missing native defaults (warnOfficialFetch, enableWarnOfficialFetch, widgets) to io-package.json
* (ipod86) fix: move _locationInfo initialization to constructor

Older changelogs are available in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2026 ipod86

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
