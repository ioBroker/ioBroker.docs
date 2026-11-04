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

The weather forecast from **wetter.com** in your ioBroker: up to 14 days, hour by hour, with weather warnings, sunrise and sunset. A free key from wetter.com (Meteonomiqs) is all you need.

---

## Quick start

1. Get a free API key from [Meteonomiqs](https://www.meteonomiqs.com/de/wetter-api/).
2. Check that your location is set in ioBroker under *Settings → System → Location*.
3. Install the adapter in the admin (*Adapters* tab, search for "meteonomiqs").
4. Open the instance settings, paste the key into **API key** and click *Save and close*.

Done. The adapter fetches the forecast right away and then three times a day. You find the values under `meteonomiqs.0` in the *Objects* tab. You do not need to change any other setting.

---

## What you get

- **Daily forecast** for up to 14 days: temperature, rain, wind, clouds, sunshine hours and more
- **Morning, afternoon, evening and night** for every day
- **Hourly values** for the next days
- **The current hour** in its own folder `current`, updated every hour
- **Weather warnings** with text and level 0–4
- **Sun and moon**: sunrise, sunset, day length, moon phase
- **Weather icons** from wetter.com, ready for your visualisation

---

## Using the values

The most important data points:

| What you want | Data point |
| --- | --- |
| Temperature right now | `meteonomiqs.0.current.temp` |
| Weather right now as text and icon | `current.weather_text`, `current.weather_icon` |
| Today's low and high | `day_0.temp_min`, `day_0.temp_max` |
| Will it rain tomorrow? | `day_1.prec_probability` (in %), `day_1.prec_sum` (in mm) |
| Wind force | `current.wind_bft` (Beaufort 0–12), `current.wind_gusts` (km/h) |
| Is there a weather warning? | `day_0.warn_active` (true/false), `day_0.warn_text` |
| Sunrise and sunset today | `current.sunrise`, `current.sunset` |

`day_0` is today, `day_1` tomorrow, `day_2` the day after tomorrow and so on.

A few ideas for scripts or Blockly:

- **Protect the awning:** retract it when `current.wind_bft` reaches 6 or more.
- **Skip watering:** do not water the garden when `day_0.prec_probability` is above 70.
- **Warn the family:** send a message when `day_0.warn_active` becomes true, with `day_0.warn_text` as the message.

For widgets in VIS, Jarvis or Material there is the whole forecast in one data point: `forecast_json` (days) and `hourly_json` (hours of today).

All values are a **forecast**, not a measurement.

---

## Settings

The defaults fit the free plan. You only have to enter the API key. Everything else is optional.

### Tab "General"

| Setting | What it does |
| --- | --- |
| API key | Your key from Meteonomiqs. **Required.** |
| Use the ioBroker system location | On by default. Switch it off if you want the weather for a different place, then enter latitude and longitude. |
| Language of the weather texts | Language of texts such as "partly cloudy". Empty means the language of your ioBroker. |
| Forecast days | 1 to 14 (default 7). More days do not cost extra calls. |

### Tab "Schedule"

When the adapter fetches the forecast. Default: **01:10, 11:40 and 18:40**. Each row costs one call per day.

The **priority** says how important a fetch is. 1 is the most important. If the calls of the month run short, the row with the highest number stops first. With the default times and the free plan this does not happen in a normal month.

### Tab "Monthly limit"

The free plan allows **100 calls per month**. The adapter spreads them over the month by itself. Only change the number if you have a different plan.

### Tab "Data"

Choose which values are created. Switching on more costs **no extra calls**, only more data points. Everything is on by default.

| Setting | What it does |
| --- | --- |
| Day sections | Morning, afternoon, evening and night per day |
| Hourly values | One value per hour, for 2 days by default. On a Raspberry Pi, 1 day is enough. |
| Current hour | The folder `current` with the values of the hour in progress. Needs hourly values. |
| Forecast as JSON | `forecast_json` and `hourly_json` for widgets |
| Weather warnings, Sun and moon, Pressure / dew point, Snow | Additional data points, switch off what you do not need |

### Expert settings

A few rarely needed settings only appear when the **expert mode** is switched on in the admin: the minimum gap between two fetches (default 5 hours), the waiting time for an answer (20 seconds), retries after an error (1) and reserved calls (5). You normally do not need them.

---

## Questions and problems

**The values do not change after a restart.**
That is intended. After every start the adapter fetches once right away. If the next planned fetch would come less than 5 hours later, it is skipped to save calls. The log says so, e.g. `Fetch "11:40" skipped …`.

**`info.status` shows "no API key".**
Enter the key in the *General* tab and save.

**`info.status` shows "invalid key".**
The key was rejected. Check it in your Meteonomiqs account, enter it again and save.

**`info.status` shows "no location".**
Set your location under *Settings → System → Location*, or switch off *Use the ioBroker system location* and enter the coordinates.

**The log says "Saving mode" or "Emergency mode".**
The calls of this month are running short, so less important fetches pause. From the 1st of next month everything is back to normal.

**`info.requests_month` differs from my Meteonomiqs account.**
The adapter counts its calls itself. Your Meteonomiqs account is always right.

**The folder `current` stays empty.**
It needs hourly values. Switch on *Hourly values* in the *Data* tab.

**The admin gets slow.**
Hourly values create many data points. Reduce them to one day or switch them off in the *Data* tab.

Other questions: [ioBroker forum](https://forum.iobroker.net/topic/85314) or [GitHub issues](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues).

---

## Support

The adapter is free and stays free. If it is useful to you and you want to say thanks, you can support the development:

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Schimi1983)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)](https://paypal.me/Schimi1983)

Bug reports and ideas in the [issues](https://github.com/Schimi1983/ioBroker.meteonomiqs/issues) help just as much.

---

<details>
<summary><b>For advanced users</b></summary>

### All data points

```
meteonomiqs.0
├── info                      connection, status, last_sync, requests_month, requests_left,
│                             force_update (button: fetch now), reset_counter (button)
├── current                   the hour in progress (copied from day_N.hourly.HH every hour)
├── day_0 … day_N             daily values, warn_*, wind_bft, …
│   ├── astro                 sun and moon
│   ├── spaces                morning, afternoon, evening, night
│   └── hourly                00 … 23
├── forecast_json
└── hourly_json
```

- `day_N.spaces.night` is the night *after* that day.
- The API marks strong wind in the icon (`d_w_60.svg`) independently of the official warnings; `wind_significant` shows when that is the case.
- `day_0` carries the official forecast roles and is recognised as a weather forecast by the ioBroker type detector. Add it to a room or function in the *Enums* tab to use it in Material, iot or devices.
- `info.force_update` fetches immediately and ignores the minimum gap and the priorities; only the monthly limit applies.

### How the monthly limit works

Three fetches a day come to 93 calls in a 31-day month. A fetch with priority N only runs while the remaining calls still cover N calls per day until the end of the month. When it gets tight the evening fetch stops first, then midday; priority 1 falls back to every other day instead of stopping.

| Starting point | Calls used | 01:10 | 11:40 | 18:40 |
| --- | --- | --- | --- | --- |
| Normal month | 93 / 100 | 31 | 31 | 31 |
| 20 calls already used up | 98 / 100 | 31 | 31 | 16 |
| 40 calls already used up | 99 / 100 | 31 | 28 | 0 |
| 70 calls already used up | 100 / 100 | 30 | 0 | 0 |

The counter is an estimate kept by the adapter; the API does not report the remaining calls. It starts at 0 again when the instance is created anew.

### Schedule

Every installation shifts all fetch times by the same few minutes (up to 15, derived from the installation ID) so that not all installations call the API in the same minute. The times in use are written to the log on startup. The minimum gap must be smaller than the shortest gap between two fetch times; the adapter checks this on startup.

### Development

```bash
npm install
npm run build
npm run lint
npm test
```

</details>

---

Weather data © [wetter.com GmbH / Meteonomiqs](https://www.meteonomiqs.com). This adapter is not affiliated with wetter.com.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.2.11 (2026-10-30)

- State roles follow the ioBroker role catalogue more closely. The day values carry the official forecast roles (`value.temperature.max.forecast.0` for today, `.forecast.1` for tomorrow, …), so the ioBroker type detector recognises `day_0` as a weather forecast (Material, iot, devices). In `current` the felt temperature is now recognised as well
- Corrected roles: sunrise/sunset as "HH:MM" are `text` (a `date` role needs a full date; the `_iso` states keep `date.sunrise`/`date.sunset`), felt temperature `value.temperature.windchill`, weekday `dayofweek`, snow line `value.snowline`, fresh snow and snow amount `value.snow`, warning level `value.severity`, location `location`, JSON states `weather.json`. The short wind direction is `text`, so it no longer competes with the long one
- Value ranges (`min`/`max`) for percentages, wind force (0–12), wind direction (0–360°) and warning level (0–4)
- Existing installations take over the new roles automatically on the next start. Values and history are kept

### 0.2.10 (2026-10-29)
- Easier to set up for beginners: the settings page starts with a short "Getting started" box, the help texts are written in plain words, and rarely needed options (minimum gap, waiting time, retries, reserve) only show in expert mode. The tab "API budget" is now called "Monthly limit". Nothing changes for an existing installation
- README and German guide rewritten in plain words, with examples for everyday use; technical details moved to a collapsed section
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

## License

The MIT License (MIT)

Copyright (c) 2026 Schimi <github@world-mg.de>

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