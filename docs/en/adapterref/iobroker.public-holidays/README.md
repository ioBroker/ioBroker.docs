# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.public-holidays@main/admin/public-holidays.svg" width="48" align="top" /> ioBroker.public-holidays

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.public-holidays)](https://www.npmjs.com/package/iobroker.public-holidays) ![stable](https://iobroker.live/badges/public-holidays-stable.svg) ![Installations](https://iobroker.live/badges/public-holidays-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.public-holidays)](https://www.npmjs.com/package/iobroker.public-holidays)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.public-holidays/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.public-holidays/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Detects public holidays for 206 countries. Runs completely offline — no cloud, no API calls. Updates daily at midnight.

Holiday data provided by [date-holidays](https://github.com/commenthol/date-holidays) (ISC + CC-BY-SA-3.0).

---

## Features

- **206 countries** with state/province and region support
- **Fully offline** — all holiday data is bundled, no internet required
- **5 holiday types** — public, bank, school, optional, observance (configurable)
- **Bridge day detection** — detects working days between holidays and weekends
- **Exclude individual holidays** — select holidays to exclude via dropdown
- **Localized holiday names** — follows system language with English fallback
- **Schedule mode** — computes once at startup and daily at midnight, no memory usage between runs

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- ioBroker js-controller >= 7.2.2
- ioBroker Admin >= 8.0.1
- Node.js >= 22

## Configuration

All settings live on a single guided card. Work through it from top to bottom:

| Step              | Description                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Location          | Country (206 available); state/province and region appear only for countries that have them. If country is left empty it is auto-detected from your ioBroker system settings. |
| Holiday types     | Public (default on), bank, school, optional and observance days.                                                                                        |
| Bridge days       | Adds bridge days between a holiday and the weekend.                                                                                                      |
| Excluded holidays | Pick individual holidays to exclude from detection.                                                                                                      |
| Detected holidays | A live preview of the holidays the adapter will detect for the current selection.                                                                        |

> The settings card is an Admin-8 component, so this adapter requires Admin 8.

## State Tree

```
public-holidays.0.
├── today.
│   ├── name         string    "Karfreitag" / "Good Friday"
│   └── isHoliday    boolean   true / false
├── yesterday.
│   ├── name         string
│   └── isHoliday    boolean
├── tomorrow.
│   ├── name         string
│   └── isHoliday    boolean
├── dayAfterTomorrow.
│   ├── name         string
│   └── isHoliday    boolean
└── next.
    ├── name         string    next holiday name (localized)
    ├── isHoliday    boolean   true when an upcoming holiday exists
    ├── date         string    "2026-12-25" (ISO date)
    └── daysUntil    number    days until holiday
```

When no holiday applies (e.g. today is not a holiday), the channel states are empty strings / false / 0.

## Bridge Day Algorithm

A bridge day is a working day (Monday–Friday) between a holiday and a weekend:

- Holiday on **Thursday** → Friday is a bridge day
- Holiday on **Tuesday** → Monday is a bridge day
- Holiday on **Wednesday** → no bridge day (two days missing)

Bridge days appear in the state tree with the localized name matching the system language.

## Troubleshooting

**No states after first start** — Open adapter settings and select a country.

**Wrong holidays / missing regional holidays** — Check that the correct state/province is selected. Set log level to debug to see all detected holidays.

**Holiday not detected** — Some holidays are classified as `observance` rather than `public`. Enable the observance type in the holiday settings if needed.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.14.0 (2026-09-01)

- New: the next-holiday log line now shows the date in your system's date format — for example 26.10.2026 instead of 2026-10-26. The date data point itself stays machine-readable for scripts.

### 0.13.2 (2026-08-27) — stable

- Fixed: Stopping or restarting the instance while the holidays were being worked out cut that run short, which could leave half-written values and errors in the log.
- Changed: Heads-up for Austria — St. Martin's, Rupert's and Referendum Day count as observances now and disappear unless that type is enabled. Plus data fixes for Ireland, Russia and others.

### 0.13.1 (2026-08-22)

- Fixed: The support links were missing from the settings page since the new card was introduced; they are back below it.

### 0.13.0 (2026-08-13)

- The adapter settings are now a single guided card — country, region, holiday types and exclusions on one page, with a live preview of the holidays that will be detected.

### 0.12.0 (2026-08-10)

- The holiday exclusion selector in the settings now works on Admin 8 — it was blank there since Admin 8.0.1, so this version requires Admin 8.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Credits

The idea goes back to the `feiertage` adapter by pix, which brought holiday data to ioBroker in the first place. Thanks to [Jey Cee](https://github.com/Jey-Cee) for handing over the `public-holidays` package name. This adapter is an independent implementation and shares no code with either.

## Support

- [GitHub Issues](https://github.com/krobipd/ioBroker.public-holidays/issues) — bug reports, feature requests
- [ioBroker Forum](https://forum.iobroker.net/) — general questions

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge)](https://paypal.me/krobipd)

---

## License

MIT License

Copyright (c) 2026 krobi <krobi@power-dreams.com>

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

_Developed with assistance from Claude.ai_
