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
- Admin >= 7.8.23
- Node.js >= 22

## Configuration

### Tab 1 — Region

| Setting          | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| Country          | Select from 206 countries                                         |
| State / Province | Dropdown — only shown for countries with states (e.g. DE, CH, US) |
| Region           | Dropdown — only shown when the selected state has regions         |

> If **Country** is left empty, it is auto-detected from your ioBroker system settings (System settings → Country). Selecting it explicitly is recommended.

### Tab 2 — Holidays

| Setting            | Description                                     |
| ------------------ | ----------------------------------------------- |
| Public holidays    | Official public/national holidays (default: on) |
| Bank holidays      | Bank holidays                                   |
| School holidays    | School holidays                                 |
| Optional holidays  | Optional/discretionary holidays                 |
| Observance days    | Observance/memorial days                        |
| Detect bridge days | Adds bridge days between holidays and weekends  |
| Excluded holidays  | Select holidays to exclude from detection       |

## State Tree

```
public-holidays.0.
├── today.
│   ├── name         string    "Karfreitag" / "Good Friday"
│   └── boolean      boolean   true / false
├── yesterday.
│   ├── name         string
│   └── boolean      boolean
├── tomorrow.
│   ├── name         string
│   └── boolean      boolean
├── dayAfterTomorrow.
│   ├── name         string
│   └── boolean      boolean
└── next.
    ├── name         string    next holiday name (localized)
    ├── boolean      boolean   true when an upcoming holiday exists
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
### 0.10.0 (2026-07-02)

- The "next holiday" date and days-until states now show up correctly as a date and a day count in VIS widgets and scripts (they carry the proper ioBroker role and a "days" unit).
- The exclude-holidays list in the settings now also offers holidays that only occur in the coming year, not just the current one.

### 0.9.0 (2026-06-28)

- The holiday exclude list now shows only your selected region's holidays, in your admin language and sorted by date — no longer every region of a country mixed alphabetically.
- The false "excluded holidays no longer match" warning at startup is fixed; it now fires only for a holiday that genuinely no longer exists.

### 0.8.0 (2026-06-25)

- A misconfigured region/state is now reported instead of silently using country-level holidays.
- A holiday exclude that no longer matches after a data update is now reported.
- On a day with two holidays, the more important one is now shown.
- Adds an optional bridge day between two midweek holidays.

### 0.7.1 (2026-06-12)

- Internal refactoring. No user-facing changes.

### 0.7.0 (2026-06-07)

- Added optional Sentry error reporting: crashes are sent to the developer so issues get fixed faster. Active only with ioBroker diagnostics enabled; anonymous.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Credits

npm package originally registered by [Jey Cee](https://github.com/Jey-Cee). This adapter is a complete rewrite with no shared code.

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
