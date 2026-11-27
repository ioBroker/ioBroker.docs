![Logo](admin/pvnode.png)

# ioBroker.pvnode

[![NPM version](https://img.shields.io/npm/v/iobroker.pvnode.svg)](https://www.npmjs.com/package/iobroker.pvnode)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pvnode.svg)](https://www.npmjs.com/package/iobroker.pvnode)
![Number of Installations](https://iobroker.live/badges/pvnode-installed.svg)
[![Test and Release](https://github.com/AlPi-BRV/ioBroker.pvnode/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/AlPi-BRV/ioBroker.pvnode/actions/workflows/test-and-release.yml)
[![License](https://img.shields.io/github/license/AlPi-BRV/ioBroker.pvnode)](LICENSE)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-yellow)](https://buymeacoffee.com/alpi_brv)

[![NPM](https://nodei.co/npm/iobroker.pvnode.png?downloads=true)](https://nodei.co/npm/iobroker.pvnode/)

<a href="https://buymeacoffee.com/alpi_brv"><img src="admin/coffee.png" alt="Buy me a coffee" width="200"></a>

**PV production forecast from [pvnode.com](https://pvnode.com) (API v2) for ioBroker.**

🇩🇪 [Deutsche Anleitung](https://github.com/AlPi-BRV/ioBroker.pvnode/blob/main/docs/de/README.md)

## Features

- pvnode **API v2** with saved sites (Site ID) – the v1 API is switched off by pvnode on 31.12.2026
- **All plans** (Free, Light, Plus): features are detected automatically from the API response, no plan setting needed
- **Quota-friendly polling**: the adapter only asks for data when pvnode has computed a new forecast (`next_poll_at`), keeps the last forecast over restarts and shows the remaining monthly requests
- Values **per string** (module area), e.g. east/west roofs
- Locally computed every 5 minutes, without API requests: current power, energy of the next hour, **remaining energy today**, expected energy so far, peak power and time
- Daily forecast for up to 7 days (depending on plan)
- Optional: weather, irradiance, clear-sky power and – on paid plans – the **variability band** (min/max)
- JSON series for charts in VIS

## Setup

1. Create a site with your strings at [pvnode.com](https://pvnode.com/sites/new) and copy your API key.
2. Install the adapter and enter the API key.
3. Select the site (with only one site you can leave it empty).

## States

| State | Description |
| --- | --- |
| `now.power` | Forecast power of the current 15-minute slot (W) |
| `now.energy_next_hour` | Expected energy in the next hour (kWh) |
| `today.energy` / `tomorrow.energy` | Daily forecast (kWh) |
| `today.remaining` | Remaining energy today from now on (kWh) |
| `today.expected_so_far` | Energy expected until now (kWh) – compare with your real production |
| `today.peak_power` / `today.peak_time` | Peak of the day |
| `days.N.*` | Daily forecast, N = 0 today … 6 |
| `strings.N.*` | Per string: current power, today / tomorrow / remaining energy, orientation, tilt, kWp |
| `weather.*` | Weather and irradiance of the current slot (optional) |
| `*_min` / `*_max` | Variability band (paid plans only) |
| `json.today` / `json.forecast` | Series `[{t, pv, s0, s1, …}]`, t = epoch ms, power in W |
| `json.daily` | Daily values as returned by pvnode |
| `html.today` / `html.tomorrow` | Ready-made SVG power curve (dark theme) – show it in VIS with the basic widget "String (unescaped)" |
| `html.days` | Ready-made SVG bar chart of the daily energy |
| `info.requestsRemaining` | Remaining requests this month (`-1` = unlimited plan) |
| `info.nextPoll` | Time of the next API request |
| `control.refresh` | Request a new forecast now (costs one request) |

## Plans and requests

| Plan | Forecast | New forecast | Requests / month |
| --- | --- | --- | --- |
| Free | today + tomorrow | 1× per day | 250 |
| Light | 7 days | 24× per day | 3,000 |
| Plus | 7 days, variability band | up to 144× per day | 3,000 |

The adapter follows `next_poll_at`, so on the Free plan it needs about one request per day.

## Why this adapter?

We had trouble getting pvnode forecasts into ioBroker reliably with existing solutions – in our setup we only got empty values. So we decided to build a simple, uncomplicated adapter that does exactly one thing: bring the pvnode forecast into ioBroker, with as few settings and requests as possible.

## Disclaimer and thanks

This adapter is an independent community project. We are **not affiliated with pvnode** in any way, and pvnode does not provide support for this adapter. pvnode is a trademark of its owner.

Many thanks to the pvnode team for providing their service and the public API that makes this adapter possible.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.2.5 (2026-11-26)

- Numbers in the SVG charts use the decimal separator from the ioBroker system settings instead of a fixed German format (review by mcm1957)
- Local 5-minute computation uses a setTimeout chain instead of setInterval, so runs can never overlap

### 0.2.4 (2026-11-22)

- States with custom settings (e.g. history, InfluxDB, SQL) are no longer deleted when they are not needed anymore; a warning is logged instead
- Random delay of up to 90 seconds per installation before each forecast request, so not all installations ask pvnode at the same second
- Chart texts fall back to English if the system language cannot be read
- Small code cleanups (English compass abbreviations, handled promise for `info.nextPoll`)

### 0.2.3 (2026-11-22)

- All object names (states and channels) translated into the 11 ioBroker languages (repository checker E6001)
- `info.requestsLimit` and `info.requestsRemaining` are now numbers; `-1` means unlimited ("unmetered") plan (E3005/E1009)
- Units and roles refined: wind speed in m/s, snow water equivalent in mm, irradiance with role `value.radiation`, `now.slot_start` with role `date`
- String channel names no longer fixed in German
- Existing objects are updated on adapter start
- Dependabot: open pull request limit raised to 15

### 0.2.2 (2026-11-17)

- Settings page: layout for extra-wide screens added (repository checker)

### 0.2.1 (2026-11-15)

- Settings translated into all ioBroker languages
- Publishing via npm trusted publishing (with provenance)
- Tested with Node.js 22, 24 and 26

### 0.2.0 (2026-11-15)

- First public release
- Requires Node.js 22 or newer

### 0.1.4 (2026-11-12)

- Ready-made SVG charts for VIS (`html.today`, `html.tomorrow`, `html.days`)

### 0.1.3 (2026-11-12)

- Much lower memory and CPU usage (date formatters are cached)

### 0.1.2 (2026-11-12)

- Coffee cup button in the settings

### 0.1.1 (2026-11-12)

- Smaller donation link in the settings
- Buy me a coffee link added

### 0.1.0 (2026-11-12)

- Initial release

## License

MIT License

Copyright (c) 2026 AlPi-BRV <alex@1-5worlds.de>

See [LICENSE](https://github.com/AlPi-BRV/ioBroker.pvnode/blob/main/LICENSE).