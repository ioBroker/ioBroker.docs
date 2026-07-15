---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.pvforecast?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.pvforecast?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.pvforecast?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.pvforecast?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.pvforecast?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.pvforecast/test-and-release.yml?branch=main&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.pvforecast.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-Installed: http://iobroker.live/badges/pvforecast-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.pvforecast/README.md":{"title":{"en":"ioBroker.pvforecast"},"content":"en/adapterref/iobroker.pvforecast/README.md"},"en/adapterref/iobroker.pvforecast/vis.md":{"title":{"en":"ioBroker.pvforecast - VIS"},"content":"en/adapterref/iobroker.pvforecast/vis.md"}}}
---
![Logo](../../admin/pvforecast.png)

# ioBroker.pvforecast

This Adapter replaced the javascript from the [ioBroker forum](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter)

The adapter fetches forecast data from various solar forecast services and provides it as ioBroker states.

## Supported Forecast Services

- **Forecast.solar** - https://forecast.solar
- **Solcast** - https://solcast.com
- **SolarPredictionAPI** - via RapidAPI
- **pvnode** - https://pvnode.com

## Settings

1. longitude (-180 (west) … 180 (east))
2. latitude (-90 (south) … 90 (north))
4. link to homepage
5. Api key
6. graph y-axis step

![pvforecast options](https://user-images.githubusercontent.com/76852173/155196821-61d26563-48cc-4ddd-a37f-417088c60951.JPG)

## With an api-key, you can receive optional the weather data with following points (Forecast.solar only)

higher time resolution
datetime -  date and time
sky - A numerical value between 0 and 1 percentage of clear sky [1 = clear sky].
temperature [°C]
condition - text
icon - text + number
wind_speed -  [km/h]
wind_degrees - north at 0°[clockwise]. (windSpeed is zero, value will not be defined)
wind_direction - Short name

## For the equipment you can make the following settings

1. tilt (0°-90°)
2. azimuth (-180 = north, -90 = east, 0 = south, 90 = west, 180 = north)
3. plant power (kWp)
4. plant name
5. graph legend name
9. graph color
10. graph label color

![pvforecast pvsystem](https://user-images.githubusercontent.com/76852173/155196852-62b928ca-4c8b-407e-8947-a45c7b31972a.JPG)

All this information is needed, that the adapter runs perfect.

If longitude and latitude in the iobroker main settings, the adapter will fill out the fields automatic.

## pvnode

[pvnode](https://pvnode.com) is a German service providing high-resolution PV forecasts in 15-minute intervals. The adapter supports both **API v1** (plant configuration in the adapter) and **API v2** (plant configuration in the pvnode portal via Site ID).

> **Warning**: pvnode API v1 will be shut down on **2026-12-31**. From **2027-01-01** onwards the adapter will log an error and stop polling when v1 is configured. Migration to API v2 is required — see [pvnode API v2](#pvnode-api-v2-recommended) below.

### pvnode Subscription Tiers

| Feature | Free | Light | Plus |
|---------|------|-------|------|
| API requests/month | 250 | 3,000 | 3,000 |
| Updates per day | 1 | 24 (hourly) | 144 (every 10 min) |
| Forecast days | 1-2 (today + tomorrow) | 1-7 | 1-7 |
| Solar arrays | up to 4 | up to 4 | up to 8 |
| Historical data | no | no | 30 days |

The **poll interval** is set automatically by the adapter based on the selected tier — no manual configuration required:

| Tier | Automatic interval |
|------|--------------------|
| Free | 24 hours |
| Light | 60 minutes |
| Plus | 10 minutes (nowcasting) |

### pvnode API v2 (recommended)

In API v2, all plant configuration (orientation, tilt, power) is managed directly in the pvnode portal via a **Site ID**. The adapter only needs the Site ID — no azimuth/tilt/power values are required in the adapter.

**Prerequisites:** Before configuring the adapter, create a site in the pvnode portal at https://pvnode.com/sites/new. Add all solar arrays (strings) there with their orientation, tilt, and peak power. The portal will provide the Site ID after saving.

**Configuration:**

1. **API Key**: Create at https://pvnode.com/api-keys
2. **Use pvnode API v2**: Enable checkbox
3. **pvnode Site ID**: Site ID from the pvnode portal (e.g. `site_xxxx…`)
4. **Subscription tier**: Free / Light / Plus (determines poll interval automatically)
5. **Forecast days**: Number of forecast days (Free: max 2 – today and tomorrow; Light/Plus: max 7)

**Plant table (v2):** At least one entry is required. The name is used for display; the optional peak power is used for the "Installed power" state. The adapter requests per-string data from the v2 API and maps each string to the configured plant by position (plant 1 → string 0, plant 2 → string 1, etc.). This allows individual per-plant forecasts. If no string data is available, the site total is stored under the first plant.

### pvnode API v1

In API v1, azimuth, tilt, and power are configured per plant directly in the adapter. Each plant gets its own API call.

**Configuration:**

1. **API Key**: Create at https://pvnode.com/api-keys
2. **Use pvnode API v2**: Leave checkbox disabled
3. **Subscription tier**: Free / Light / Plus
4. **Forecast days**: Number of forecast days (Free: max 2 – today and tomorrow; Light/Plus: max 7)
5. **Extra parameters**: Optional API parameters (v1 only), e.g. `diffuse_radiation_model=perez&snow_slide_coefficient=0.5`

**Rotating fetch (v1):** With multiple plants, all plants are fetched once on startup. Afterwards, only one plant is fetched per cycle (round-robin). With N plants and interval T, each plant is refreshed every N×T. Example: 3 plants, Light tier (60 min) → each plant every 3 hours, 1 API call per hour.

### pvnode Extra Parameters (v1 only)

| Parameter | Description | Example |
|-----------|-------------|---------|
| `diffuse_radiation_model` | Radiation model | `perez` |
| `snow_slide_coefficient` | Snow sliding coefficient (0.0–0.8) | `0.5` |
| `shading_config` | Shading configuration | `7:2:3:1_1:1:0:0_0:0:0:0` |

Format: `key1=value1&key2=value2`

### pvnode Notes

- **15-minute resolution**: pvnode delivers forecast data in 15-minute intervals (v1 and v2)
- **Azimuth conversion**: The adapter automatically converts the azimuth (adapter: 0=south) to pvnode format (180=south)
- **Poll interval**: Set automatically based on subscription tier — no manual configuration needed
- **Per-plant forecasts (v2)**: When the pvnode account returns string data, each configured plant receives its own forecast. Clearsky values, temperature, and weather code come from the site-wide data.
- **Summary data**: The summary JSON includes clearsky values as well as temperature and weather code
- The "damping morning" and "damping evening" fields are not used for pvnode

# VIS example

Please install: [Material Design](https://github.com/Scrounger/ioBroker.vis-materialdesign) before you use the example.
If you want to take the json graph and table you can use this [example](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@patricknitsch) Change Free Tier Forecast from only today to today and tomorrow

### 6.2.0 (2026-07-06)
- (@patricknitsch) pvnode API v2 support: plant configuration via Site ID in the pvnode portal — create a site at https://pvnode.com/sites/new
- (@patricknitsch) pvnode v2: per-string forecasts — each configured plant receives its own forecast matched by index (plant 1 → string 0, etc.)
- (@patricknitsch) pvnode subscription tiers (Free / Light / Plus) replace the old paid-account checkbox; poll interval is set automatically per tier
- (@patricknitsch) pvnode v1: rotating round-robin fetch — one plant per poll cycle instead of one combined request; each plant receives an individual API call
- (@patricknitsch) Poll interval field hidden for pvnode (auto-managed)
- (@patricknitsch) Update Documentation of pvnode
- (@patricknitsch) Include warning for v1 and error after 31.12.26. The adapter cannot use v1 after this date anymore

### 6.1.0 (2026-04-26)
- (@mcm1957) Adapter requires node.js >= 22, js-controller >= 6.0.11 and admin >= 7.7.22 now
- (@mcm1957) Dependencies have been updated

### 6.0.0 (2026-04-10)

- (@patricknitsch) Added pvnode als alternative Provider
- (copilot) Adapter requires admin >= 7.7.22 now

### 5.1.0 (2026-02-03)

* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required
* (@Scrounger) solcast user agent bug fix
* (@klein0r) Updated dependencies

### 5.0.0 (2025-04-23)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Minimum peak power is 0.1 kWp

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2021-2025 Patrick-Walther
                        Matthias Kleine <info@haus-automatisierung.com>

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