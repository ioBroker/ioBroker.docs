![Logo](admin/wu.png)
# ioBroker.weatherunderground

![Number of Installations](https://iobroker.live/badges/weatherunderground-installed.svg)
![Number of Installations](https://iobroker.live/badges/weatherunderground-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.weatherunderground.svg)](https://www.npmjs.com/package/iobroker.weatherunderground)
![Test and Release](https://github.com/iobroker-community-adapters/iobroker.weatherunderground/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/weatherunderground/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.weatherunderground.svg)](https://www.npmjs.com/package/iobroker.weatherunderground)

> [!IMPORTANT]
> This adapter cannot be installed from github

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Functionality

Current station measurements, up to 36 hourly forecasts and six daily forecasts from [Weather Underground](https://www.wunderground.com/), with optional regional weather and air-quality data from Weather Company.

Data is retrieved once per hour by default. Change the instance schedule to adjust the frequency.

## Requirements

The current development version requires Node.js **22+**, js-controller **6.0.11+** and Admin **8.2.0+**.

## Configuration

PWS means **Personal Weather Station**, a private weather station. Station measurements describe observed weather; forecasts describe expected weather.

### Data switches

| Key | Default | Data and state IDs |
| --- | --- | --- |
| `current` | `true` | Station temperature, humidity, wind, pressure, precipitation, UV, solar radiation and quality control under `forecast.current.*`. |
| `regionalCurrent` | `false` | **Additional weather and air-quality data** from Weather Company: weather description, icon, visibility and air quality for the surrounding area. Requires `current: true`, valid station coordinates and the website key. Uses `forecast.current.*` and adds up to three requests per run. |
| `forecast_hourly` | `true` | Up to 36 hourly entries under `forecastHourly.0h`–`forecastHourly.35h`, plus summary states. |
| `forecast_periods` | `true` | Six calendar dates under `forecast.0d`–`forecast.5d`, starting with today. |
| `forecast_periods_txt` | `true` | Up to 12 successive day/night text and icon periods under `forecastPeriod.0p`–`forecastPeriod.11p`. Shares the daily response with `forecast_periods`. |

### Location and display

| Key | Meaning |
| --- | --- |
| `country` | Two-letter country code for location lookup; default `DE`. |
| `language` | Weather-text language: `DL` German, `EN` English, `RU` Russian or `NL` Dutch. Independent of the Admin interface language. |
| `location` | Location name, airport code or coordinates. A blank initial location is filled from ioBroker system coordinates where available. |
| `station` | Optional preferred station ID. If empty, the provider selects a station for the location. The field is shown when `current` is enabled. |
| `nonMetric` | `false` for metric values; `true` for imperial values such as °F and miles. When initializing a blank location, the dialog also follows the system temperature unit. Air-quality concentrations always use µg/m³. |
| `iconSet` | Hidden compatibility setting. A–K use the same v4 SVG icons when no custom URL is configured. |
| `custom_icon_base_url` | Optional base URL for numeric icon files. A nonempty URL enables custom icons; leave empty for standard icons. |
| `custom_icon_format` | Custom extension: GIF, PNG, SVG or JPG; defaults to GIF when absent. |

Hidden settings retain their saved values. The dialog groups Country/Language and Location/Station.

### API keys

`apiKey` is an optional PWS owner key, encrypted in storage and protected from ordinary foreign-adapter access. Existing keys migrate automatically; see [API-key upgrades](#api-key-upgrades).

The adapter also reads the key used by the Weather Underground website:

- Station observations use the owner key when a station and `current` are configured; otherwise they use the website key.
- Daily forecasts use station coordinates with the owner key when available, or the website key otherwise. Without station coordinates, they use the extracted website URL/key.
- Hourly forecasts and regional products use the website key, even with an owner key configured.

Key and product availability are controlled by the provider. The retained `useLegacyApi` key has no effect: the runtime always disables the former API.

## Data sources and requests

The direct product endpoints use `https://api.weather.com`:

| Endpoint | Requested when | Provides |
| --- | --- | --- |
| `/v2/pws/observations/current` | Each acquisition run, including when `current` is off | Station observations and coordinates needed for forecasts. `current` controls publication of the measurements. |
| `/v3/wx/forecast/daily/5day` | `forecast_periods` or `forecast_periods_txt` is on | Six calendar dates and their day/night periods. |
| `/v3/wx/forecast/hourly/2day` | `forecast_hourly` is on | Hourly data; the adapter publishes the first 36 entries. |
| `/v3/wx/observations/current` | `current` and `regionalCurrent` are on, with valid coordinates and a website key | Regional weather description, icon and visibility. |
| `/v3/location/point` | Same regional prerequisites | A `placeId` for the station coordinates, used by the air-quality request. |
| `/v3/wx/globalAirQuality` | Location resolution returned a valid `placeId` | EPA air-quality index, advice and six pollutant details. |

If the direct station/coordinate path is unavailable, the adapter uses provider URLs extracted from the Weather Underground page. Regional products use the coordinates from the station response and can represent a different source and observation time from the station measurements.

### Reducing requests

- Keep `regionalCurrent` off to avoid all three regional requests.
- Turn `forecast_hourly` off to avoid the hourly request.
- Turn **both** `forecast_periods` and `forecast_periods_txt` off to avoid the shared daily request.
- Turning `current` off stops station state updates and prevents regional requests, but the station request still runs to obtain forecast coordinates.

A successful direct run with forecasts enabled uses three product requests: station, daily and hourly. Regional data adds up to three more; location failure prevents the subsequent air-quality request. Website/key discovery, retries and recovery can cause additional HTTP requests.

## State reference

| States | Meaning |
| --- | --- |
| `forecast.current.*` | Current observations despite the historical `forecast` prefix. Temperature, humidity, wind and precipitation come from the station. `qualityControl` is its raw quality-control code. |
| `forecast.current.weather`, `.iconURL`, `.visibility` | Optional regional weather description, numeric-code icon URL and visibility. |
| `forecast.current.airQualityIndex` | Optional numeric EPA index, without a physical unit. Category, primary pollutant, source and general/sensitive-group advice are separate states. |
| `forecast.current.airQuality.CO`, `.NO2`, `.O3`, `.PM10`, `.PM2_5`, `.SO2` | Each pollutant has `amount` in µg/m³, its EPA `index` and `category`. These are regional products, not station measurements. |
| `forecastHourly.0h`–`forecastHourly.35h` | Hourly values including `windGust`, `dewPoint`, `windChill`, `stateShort` and `precipitationType` (for example `rain` or `snow`). `0h` means **Next hourly forecast**, the first API entry; check `.time` for its timestamp. |
| `forecast.0d`–`forecast.5d` | Daily values including complete narrative `.state`, short description `.stateShort`, `sunrise`, `sunset`, `moonrise`, `moonset` and `moonPhase`. Sun/moon times preserve the provider UTC offset. |

Daily short text, narrative and icon use the same daytime or remaining nighttime period. Descriptions follow `language`. Regional descriptions do not replace station measurements, and forecasts are not substituted for current observations. Existing IDs and custom object names are preserved.

### Missing data and disabled options

- Missing or `null` station UV and solar radiation produce `0`.
- Missing or invalid regional values produce `null`. Regional fields also clear to `null` when station observations are processed with `regionalCurrent` off. Optional regional failures do not discard station measurements or forecasts.
- Without a processable station observation, existing current values can remain unchanged.
- Disabled switches retain their objects and previously stored values; they do not delete historical data. Regional clearing follows the rule above.

## Icons

The current API returns numeric codes. Saved built-in A–K settings all use the same v4 SVG icons, such as [32.svg](https://www.wunderground.com/static/i/c/v4/32.svg). The redundant selector is hidden. Enter a custom base URL to use your own icons, or clear it to use standard icons.

The custom URL and format fields are always editable, independent of the saved `iconSet` value. Existing nonempty custom URLs take precedence over A–K settings. For example, base URL `https://example.com/weather-icons/` and PNG format resolve code `32` to `https://example.com/weather-icons/32.png`. The host must provide files for every code returned by the provider; preview codes `0`, `12`, `26` and `32` are only samples.

Legacy named icons such as `clear.gif` and `nt_clear.gif` do not match numeric codes. The adapter does not translate codes into those filenames; old A–K directories are unsuitable as Custom bases for the current API.

## API-key upgrades

Older releases stored the key in plaintext `apikey`. The adapter now uses encrypted/protected `apiKey`. On first start or settings save, the old value is transferred and `apikey` is cleared; weather requests wait for a startup migration to finish. Existing nonempty `apiKey` values are preserved. If both fields contain different nonempty keys, neither is discarded automatically; migration failures stop requests and log a message without key values.

Until first start/save, the legacy field retains its old plaintext storage and access behavior. Disabled instances migrate only when started or saved. Reopen settings after an adapter upgrade rather than saving an old dialog.

Keep an ioBroker backup before upgrading. To roll back to a version that reads only `apikey`, restore its corresponding configuration backup too. Manually encrypted keys from modified/unreleased versions require their original encryption metadata and cannot be identified reliably after that metadata has been overwritten.

## Development build

Source builds require Node.js **22.12+** within the supported runtime range; Vite has a higher minimum than the adapter runtime. CI checks/builds on Node.js 24 and tests on 22/24/26.

```sh
npm ci
npm run build
npm test
npm pack
```

Admin sources live in `admin/src/`. Generated `admin/custom/` files are ignored by Git and must not be committed. Build before testing, packing or uploading; ordinary `npm pack` does not build automatically. The published npm package contains the UI assets, and `prepublishOnly` rebuilds them for publication. For a source/Git installation, install the built tarball through ioBroker; an unbuilt checkout has no generated configuration UI.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 4.0.1 (2026-10-26)
- (reloxx13) Use the controller-managed startup delay instead of a custom wait function

### 4.0.0 (2026-10-26)
- (reloxx13) Use adapter-managed timers and termination while preserving cancellation during shutdown
- (mcm1957) Adapter requires Node.js >= 22, Admin >= 8.2.0 and js-controller >= 6.0.11 now
- (reloxx13) Read the website API key from the current Weather Underground page configuration (#509)
- (reloxx13) Request daily forecasts using station coordinates and the website key when no owner key is configured (#509)
- (reloxx13) Add opt-in regional weather descriptions, icons, visibility and detailed EPA air quality without replacing station measurements (#220, #388)
- (reloxx13) Add hourly gust, dew point, wind chill, weather text and precipitation type; daily sun/moon events and PWS quality status
- (reloxx13) Add short daily descriptions while preserving full narratives and consistent day/night selection (#388)
- (reloxx13) Match maximum-wind direction to the highest wind speed and preserve its numeric type
- (reloxx13) Show zero UV index and solar radiation when station fields are missing or null
- (reloxx13) Fix numeric icon URLs and previews; select custom icons by URL and correct existing icon URL object types without replacing user metadata (#216)
- (reloxx13) Rename the first hourly forecast to "Next hourly forecast" while preserving its 0h ID and custom names
- (reloxx13) Correct weather state roles without changing IDs, types, units or user metadata (#328)
- (reloxx13) End failed initialization reliably and cancel startup delays and provider requests during shutdown (#224)
- (reloxx13) Automatically migrate API keys to encrypted and protected storage
- (reloxx13) Replace the legacy settings dialog with JSON Config; clarify translated labels, help texts and field grouping
- (reloxx13) Document configuration switches, data sources, endpoints, request savings, API keys and source builds; correct the default refresh interval to once per hour (#501)
- (reloxx13) Fix hourly forecast requests, station coordinates and metric/non-metric provider paths (#497)
- (reloxx13) Skip the unused PWS dashboard request (#498)
- (reloxx13) Populate hourly weather codes, including zero (#499)
- (reloxx13) Use calendar-day minimum and maximum forecast temperatures (#500)
- (reloxx13) Limit the npm package to runtime and configuration assets and enable shared ESLint checks in CI

### 3.7.0 (2024-04-13)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 3.6.0 (2023-09-09)
* (mcm1957) Icon urls at admin ui have been adapted to weatherunderground website changes (#158)
* (mcm1957) Forecast periods have been extended

### 3.5.0 (2023-09-08)
* (mcm1957) Adapter now requires node 16 or newer
* (mcm1957) Dependencies have been updated
* (waldmensch1) Cloudcover states have been added (PR #178)
* (mcm1957) Date format has been fixed to avoid incorrect display with newer admin versions (#191)
* (mcm1957) Forecast urls have been adapted to weatherunderground website changes (#158)

## License

The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2023 dschaedl <daniel.schaedler@gmail.com>, iobroker-community-adapters

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