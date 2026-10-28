![Logo](admin/meteonomiqs.png)

# ioBroker.meteonomiqs

[![NPM version](https://img.shields.io/npm/v/iobroker.meteonomiqs.svg)](https://www.npmjs.com/package/iobroker.meteonomiqs)
[![Downloads](https://img.shields.io/npm/dm/iobroker.meteonomiqs.svg)](https://www.npmjs.com/package/iobroker.meteonomiqs)
![Number of Installations](https://iobroker.live/badges/meteonomiqs-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/meteonomiqs-stable.svg)
[![License](https://img.shields.io/github/license/Schimi1983/ioBroker.meteonomiqs)](LICENSE)
[![Test and Release](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Schimi1983/ioBroker.meteonomiqs/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/iobroker.meteonomiqs.png?downloads=true)](https://nodei.co/npm/iobroker.meteonomiqs/)

**Deutsche Anleitung:** [docs/de/README.md](https://github.com/Schimi1983/ioBroker.meteonomiqs/blob/main/docs/de/README.md)

Weather forecast from **wetter.com** via the [Meteonomiqs Public Weather API v4.0](https://doc.meteonomiqs.com/doc/forecast_v4_0.html).

Up to 14 days of forecast, day sections, hourly values, the hour currently in progress, weather warnings, sun and moon data. Everything comes from a **single** API call per fetch, and the adapter is built so that the free plan (100 calls per month) is enough.

---

## Quick start

1. Get a free API key from [Meteonomiqs](https://www.meteonomiqs.com/de/wetter-api/).
2. Make sure your location is set in ioBroker under *Settings → System → Location*.
3. Install the adapter in the admin (*Adapters* tab, search for "meteonomiqs").
4. Open the instance settings, paste the key into **API key** and click *Save and close*.
5. Done. The adapter fetches the forecast right away and then three times a day. You find the values in the object tree under `meteonomiqs.0`.

The defaults are chosen so that you do not need to change anything else. The sections below explain what each setting does if you want to adjust it.

---

## Features

| | |
|---|---|
| **Daily forecast** | 1–14 days: temperature, precipitation, wind (km/h and Beaufort), clouds, humidity, sunshine hours, pressure |
| **Day sections** | Morning, afternoon, evening and night per day |
| **Hourly values** | For one or more days, in the time zone of the forecast location |
| **`current` folder** | The hour in progress, refreshed **every hour without an API call** |
| **Weather warnings** | Group, text and numeric severity (0–4), no text comparison needed in scripts |
| **Sun and moon** | Sunrise, sunset, twilight, day length, moonrise, moon phase, zodiac |
| **Snow** | Snow line, fresh snow, snow water equivalent |
| **JSON aggregates** | `forecast_json` and `hourly_json` for VIS, jarvis and Material widgets |
| **Budget management** | When calls run short, less important fetches stop first instead of the forecast stopping altogether |
| **Correct icons** | Uses the icon the API delivers, including night, storm and wind variants |

---

## Configuration

The instance settings have four tabs. Each section below matches one tab.

### Tab "General"

| Setting | Default | What it does |
|---|---|---|
| API key | empty | Your Meteonomiqs key. **Required.** Stored encrypted. |
| Use the ioBroker system location | on | Takes latitude and longitude from *Settings → System → Location*. Switch it off to enter coordinates by hand. |
| Latitude / Longitude | – | Only when the option above is off. Decimal degrees, e.g. `51.257` / `6.403`. |
| Language of the weather texts | system language | Language of the descriptions such as "partly cloudy". Unsupported languages fall back to German. |
| Forecast days | 7 | 1 to 14. More days means more objects, not more API calls. Lowering the value deletes the day folders that are no longer needed. |

### Tab "Schedule"

**Update times** is a table: one row per fetch, with a time and a priority. Every row costs one API call per day.

| Time | Priority | Why this time |
|---|---|---|
| 01:10 | 1 | The full forecast for the day is ready before anyone gets up |
| 11:40 | 2 | Correction before the afternoon: thunderstorms, gusts, heat |
| 18:40 | 3 | Night and next day: frost, storms, next morning |

**What the priority means:** 1 is the most important fetch. If the month's calls start running short (for example because you pressed *fetch now* a lot), the fetch with the highest number stops first, then the next one. Priority 1 keeps running the longest. With the default three fetches and the free plan this never happens in a normal month.

**Minimum hours between updates** (default 5): Two automatic fetches are never closer together than this. It protects your budget when ioBroker restarts several times in a row. The value must be **smaller** than the shortest gap between two of your update times, otherwise one fetch is skipped every day. The adapter checks this on startup and writes an error to the log if it does not fit.

> **Good to know:** Every start of the instance (adapter update, host restart, saving the settings) fetches once right away. If the next planned fetch is less than 5 hours later, that one is skipped and the log says so, e.g. `Fetch "11:40" skipped: last fetch 3.0 h ago, minimum gap is 5 h`. That is intended.

Each installation shifts all times by the same few minutes (up to 15), so that not every installation calls the API in the same minute. The times actually used are written to the log on startup.

### Tab "API budget"

| Setting | Default | What it does |
|---|---|---|
| Monthly API calls | 100 | The allowance of your plan. The free plan has 100. `0` switches the check off (only for paid plans without a limit). |
| Reserved calls | 5 | Retries after an error stop when only this many calls are left, so they cannot use up the rest of the month. |
| HTTP timeout (seconds) | 20 | How long to wait for the answer. The response is large; on a slow Raspberry Pi do not go below 20. |
| Retries on error | 1 | How often to try again after a network error or a server error (HTTP 5xx). Each retry costs one call. |

The adapter counts its calls itself, because the API does not report how many are left. The count is therefore an **estimate**. It starts at zero again when you delete and recreate the instance, or when you press `info.reset_counter`.

### Tab "Data"

All data comes from the same API response. Switching on more groups costs **no extra calls**, only more objects.

| Setting | Default | What it does |
|---|---|---|
| Day sections | on | Morning, afternoon, evening and night per day |
| Hourly values | on | One folder per hour. Creates many objects. |
| Hourly values for … days | 2 | Each day adds about 620 objects |
| "current" folder | on | The values of the hour in progress. Needs hourly values. |
| JSON aggregates | on | `forecast_json` and `hourly_json` for widgets |
| Weather warnings | on | Group, text and severity 0–4 |
| Sun and moon | on | Sunrise, sunset, twilight, moon phase, … |
| Pressure, dew point, wind chill | on | For comparison with your own weather station or for ventilation logic |
| Snow | on | Snow line and fresh snow |

Rough number of objects at 7 forecast days:

| Configuration | Objects |
|---|---|
| Everything on, hourly for 2 days (default) | ~2430 |
| Hourly for 1 day | ~1780 |
| Hourly off | ~1130 |
| Daily values only | ~380 |

On a Raspberry Pi, hourly values for one day are a sensible compromise.

---

## Where to find the values

```
meteonomiqs.0
├── info
│   ├── connection            Connected to the API
│   ├── status                ok / no API key / HTTP 429 / …
│   ├── last_sync             Last successful fetch
│   ├── requests_month        Calls used this month (estimate)
│   ├── requests_left         Calls left this month
│   ├── force_update          Button: fetch now (ignores the minimum gap)
│   └── reset_counter         Button: set the monthly counter to 0
├── current                   The hour in progress, refreshed hourly
│   ├── temp, weather_text, weather_icon, is_night, …
│   ├── temp_min_today, temp_max_today, sunrise, sunset
│   ├── valid                 false when no data covers this hour
│   └── source                Which state the values were copied from
├── day_0 … day_N             day_0 = today, day_1 = tomorrow, …
│   ├── date, day_name, temp_min, temp_max, weather_icon, wind_bft, …
│   ├── warn_active, warn_severity_int
│   ├── astro                 sunrise, sunset, moon phase, day length …
│   ├── spaces                morning, afternoon, evening, night
│   └── hourly                00 … 23
├── forecast_json
└── hourly_json
```

For most visualisations `current` and `day_0` … `day_2` are all you need.

Two things that surprise people:

- **`day_N.spaces.night` is the night *after* that day.** `day_0.spaces.night.temp_min` is tonight's low, not last night's.
- **The wind icon can appear without a warning.** The API marks strong wind in the icon (`d_w_60.svg` instead of `d_60.svg`) independently of the official warnings. `wind_significant` tells you when that is the case.

`current` is the **forecast** for the current hour, not a measurement.

---

## Troubleshooting

| You see | Meaning and what to do |
|---|---|
| `info.status` = `no API key` | No key entered, or it is too short. Paste the key in the *General* tab. |
| `info.status` = `HTTP 401 — invalid key` or `HTTP 403 — invalid key` | The API rejected the key. Automatic fetches pause until you correct it. Check the key in the Meteonomiqs portal and save the settings again. |
| `info.status` = `no location` | The system location is not set. Set it under *Settings → System → Location*, or enter coordinates by hand. |
| `info.last_sync` does not change after a restart | Usually the minimum gap (see *Schedule*). The log shows `… skipped: last fetch … h ago`. The next fetch runs normally. |
| Log: `Configuration problem: the cooldown … is greater than or equal to the smallest gap …` | *Minimum hours between updates* is too large for your update times. Lower it. |
| Log: `Budget warning: … fetches per day add up to …` | Your update times need more calls than your plan has. Fetches with a high priority number will stop towards the end of the month. Remove a time or accept it. |
| Log: `Saving mode: … skipped` or `Emergency mode: … skipped` | The month's calls are running short, so less important fetches pause. Back to normal on the 1st of the next month. |
| `info.status` = `HTTP 429 — quota exhausted` | The API says your calls for this month are used up. The adapter pauses until the 1st. |
| `info.requests_month` differs from the Meteonomiqs portal | The counter is an estimate (see *API budget*). The portal is right. |
| `current` stays empty | `current` needs hourly values. Switch on *Hourly values* in the *Data* tab. |
| Admin gets slow, many objects | Switch off hourly values or reduce them to one day (see *Data*). |

Questions and feedback: [ioBroker forum thread](https://forum.iobroker.net/topic/85314) or [GitHub issues](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues).

---

## How it works in detail

### Budget tiers

Three fetches a day come to 93 calls in a 31-day month, 7 short of the free plan's 100. Every fetch carries its priority as a tier:

> A tier-N fetch only runs while the remaining budget still carries **N calls per day** until the end of the month.

When it gets tight, the evening fetch drops out first, then midday. The night fetch survives longest and, in an emergency, falls back to every other day instead of stopping. Verified over a full simulated month:

| Starting point | Calls used | 01:10 | 11:40 | 18:40 |
|---|---|---|---|---|
| Clean month (31 days) | 93 / 100 | 31 | 31 | 31 |
| 20 calls already wasted | 98 / 100 | 31 | 31 | 16 |
| 40 calls already wasted | 99 / 100 | 31 | 28 | 0 |
| 70 calls already wasted | 100 / 100 | 30 | 0 | 0 |

A manual fetch (`info.force_update`) ignores the tiers and the minimum gap; only the monthly limit applies.

### Schedule offset

The offset of up to 15 minutes is derived from the ioBroker installation UUID, so it stays the same across restarts. It is applied to all times equally, so the gaps between them, and with them the minimum-gap check, stay exactly as configured.

### `current`

`current` follows the pattern of the `daswetter` and `open-meteo-weather` adapters, with two deliberate choices:

**Refreshed hourly, not only on fetch.** A `current` folder that only updates when the API is polled would be seven hours stale by evening. A separate hourly timer copies the values across at every full hour, which costs nothing because the hourly data is already in the object tree.

**Read from the states, not from a cache.** Reading from the cached payload would leave `current` empty after every adapter restart until the next scheduled fetch. Reading from `day_N.hourly.HH.*` always works.

The day is found through `date_iso` rather than a fixed index. Between midnight and the first fetch of the day, "today" still lives in `day_1`; a hard-coded `day_0` would serve the wrong values in that window every night.

Real-time measurements would need the `/nowcast` or `/stations` endpoints, which cost one call per query and do not fit into a 100-call plan.

---

## Development

```bash
npm install          # install dependencies
npm run build        # compile TypeScript to build/
npm run watch        # rebuild on change
npm run check        # type check without emitting
npm run lint         # ESLint
npm run test:ts      # unit tests
npm run test:package # validate package.json / io-package.json
npm run test:integration  # boots a real js-controller
npm run translate    # @iobroker/adapter-dev translation helper
```

Local test instance with [dev-server](https://github.com/ioBroker/dev-server):

```bash
npm install --global @iobroker/dev-server
dev-server setup
dev-server watch
```

---

Weather data © [wetter.com GmbH / Meteonomiqs](https://www.meteonomiqs.com). This adapter is not affiliated with wetter.com.

---

## Support

The adapter is free and stays free. If it is useful to you and you want to say thanks, you can support the development:

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Schimi1983)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)](https://paypal.me/Schimi1983)

Bug reports and ideas in the [issues](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues) help just as much.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Support links (GitHub Sponsors, PayPal) in the README, in `package.json` (`npm fund`) and as an optional section at the bottom of the *General* tab. Nothing changes for an installation

### 0.2.9 (2026-10-15)

- A fetch skipped because of the cooldown ("Minimum hours between updates") is now logged at info level, e.g. `Fetch "11:40" skipped: last fetch 3.0 h ago, minimum gap is 5 h`. The typical case is the first scheduled fetch after an adapter update or a host restart, because both trigger a startup fetch. Until now such a skip only showed as an `info.last_sync` that did not move
- One info line per fetch instead of two: `Forecast updated (11:40): 14 days.` The line announcing the request moved to debug
- README reworked for beginners: quick start, every setting with its default per admin tab, a troubleshooting table. New German guide in `docs/de/README.md`

### 0.2.8 (2026-09-30)

- New state `wind_bft` in the day, day-section and hourly values, and with that in `current`: the wind force on the Beaufort scale (0-12), derived from the average wind speed. Handy for scripts that react to wind strength without converting km/h themselves, e.g. retracting an awning from force 6
- Objects deleted in the object browser while the adapter is running are created again on the next fetch. Until now they only came back after a restart of the instance, and every write in between was logged as "has no existing object"

### 0.2.7 (2026-09-06)

- Raised the required `@iobroker/adapter-core` to `^3.4.3` (`[W0034]`) and the release-script license plugin to `^5.2.2` (`[S0064]`). Both caret ranges already resolved to those versions; only the declared minimums lagged behind, so nothing changes at runtime

### 0.2.6 (2026-08-16)

- The buttons `info.force_update` and `info.reset_counter` are write-only now. A state with role `button` carries no value to read, and `read: true` made the admin offer it as a readable one (repository review)
- The `warn_severity_int` states in the day, day-section and hourly subtrees carry the generic `value` role. `value.severity` is not part of the ioBroker role catalogue (repository review)
- Both corrections reach existing installations on the next adapter start — the object metadata is compared and rewritten on drift

### 0.2.5 (2026-08-16)

- The field tables are covered by tests now: 138 of them, running every getter against a hand-built API response, plus the structural rules — unique ids, both label languages, roles from the ioBroker catalogue, unit and precision only on numbers. Every leaf of the fixture carries a value that appears nowhere else, so a getter reading `min` where it should read `max` cannot pass
- The admin translations moved to the short i18n form, `admin/i18n/<lang>.json` instead of `admin/i18n/<lang>/translations.json` (`[S5601]`)
- Added `.vscode/settings.json` with the ioBroker JSON schemas for `io-package.json` and `jsonConfig.json` (`[S4036]`)
- Nothing changes for an installation: no state, no role, no unit and no configuration option is affected

## License

The MIT License (MIT)

Copyright (c) 2026 Schimi <szymon.haiduk@world-mg.de>

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