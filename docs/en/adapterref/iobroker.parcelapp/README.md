# <img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="48" align="top" /> ioBroker.parcelapp

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.parcelapp)](https://www.npmjs.com/package/iobroker.parcelapp) ![stable](https://iobroker.live/badges/parcelapp-stable.svg) ![Installations](https://iobroker.live/badges/parcelapp-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.parcelapp)](https://www.npmjs.com/package/iobroker.parcelapp)

**Build:** [![Test and Release](https://github.com/krobipd/ioBroker.parcelapp/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/krobipd/ioBroker.parcelapp/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

ioBroker adapter for the [parcel.app](https://parcelapp.net) API. Supports all carriers that parcel.app tracks.

---

## Features

- **All parcel.app carriers** — DHL, FedEx, UPS, Amazon, Hermes, GLS, DPD, and everything else parcel.app supports
- **Per-package ioBroker states** — carrier, status, tracking number, delivery window, last event, last location
- **Summary states** — active count, today count, combined delivery window
- **Delivery time estimates** — today, tomorrow, in X days with combined time window
- **Configurable poll interval** (5–60 minutes)
- **Configurable cleanup** — auto-remove delivered packages or keep them until deleted in parcel.app
- **Add deliveries** via sendTo message from scripts or other adapters
- **Admin UI** with connection test and polling settings

---

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

---

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.2.2**
- **ioBroker Admin >= 7.8.23**
- **parcel.app Premium subscription** — required for API access

---

## Configuration

| Option                    | Description                                                                                                | Default |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **API Key**               | Your parcel.app API key (get it at [web.parcelapp.net](https://web.parcelapp.net))                         | —       |
| **Poll Interval**         | How often to fetch updates (minutes). parcel.app serves the list from a ~45–90 min server cache, so shorter intervals mostly reduce the delay until a refresh is noticed. | 10      |
| **Auto-remove delivered** | Remove delivered packages from states automatically. When disabled, they stay until deleted in parcel.app. | Yes     |

Status labels (`Delivered`, `In Transit`, …) and delivery estimates (`today`, `tomorrow`, `in X days`) are rendered in the ioBroker system language.

---

## State Tree

```
parcelapp.0.
├── info.connection              — Connection status (bool)
├── summary.
│   ├── activeCount              — Number of active deliveries
│   ├── todayCount               — Number of deliveries expected today
│   └── deliveryWindow           — Combined delivery window for today
└── deliveries.
    └── {packageId}.             — One device per package
        ├── carrier              — Carrier name (e.g. DHL Express)
        ├── status               — Status text (e.g. In Transit)
        ├── statusCode           — Status code (0-8, -1 = unknown)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Timestamp of the last tracking-data change
```

**Status codes** (`statusCode` — the primary datapoint for automations):

| Code | Meaning         | Code | Meaning                 |
| ---- | --------------- | ---- | ----------------------- |
| 0    | Delivered       | 5    | Not Found               |
| 1    | Frozen          | 6    | Delivery Attempt Failed |
| 2    | In Transit      | 7    | Exception               |
| 3    | Awaiting Pickup | 8    | Info Received           |
| 4    | Out for Delivery | -1  | Unknown (unexpected API value — package stays visible) |

---

## Add Deliveries via Script

You can add new deliveries from JavaScript/Blockly scripts:

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
  // optional:
  language: "de", // tracking language as an ISO 639-1 code, default "en"
  send_push_confirmation: true, // send a push once the delivery is added, default false
});
```

`tracking_number`, `carrier_code` and `description` are required; `language` and `send_push_confirmation` are optional. The delivery is added to your parcel.app account and a poll follows right away (at most one poll per minute) — but freshly added deliveries usually have no tracking data yet (see the note below).

**Notes:**

- **POST rate limit: 20 deliveries per day** — failed attempts (e.g. wrong `carrier_code`) also count against this limit.
- **Each field may be at most 512 characters**, and the adapter accepts at most **20 addDelivery calls per minute** — beyond either limit the call returns `success: false` with an explanatory `error_message` instead of reaching parcel.app.
- Fresh deliveries usually have no tracking events for **45–90 minutes** after they are added. That's a parcel.app-side delay, not an adapter issue.
- **Deleting packages is only possible in the parcel.app app/web UI** — the API has no delete endpoint. With `autoRemoveDelivered` enabled, the adapter still drops delivered packages from ioBroker states automatically.

---

## Troubleshooting

### Connection test fails

- Verify your API key at [web.parcelapp.net](https://web.parcelapp.net)
- Ensure you have an active Premium subscription
- Check if your ioBroker instance has internet access

### No deliveries shown

- The API returns cached data — new deliveries and fresh tracking events can take **45–90 minutes** to appear (parcel.app-side cache)
- Check if you have active deliveries in the parcel.app

### Rate limit

- GET (polling): **20 requests per hour** — the minimum poll interval is 5 minutes to stay within this limit
- POST (adding deliveries): **20 requests per day**, failed attempts count too

---

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-08)

- Fixed: the admin "Test Connection" button now reports real failures — before, it always showed "Ok" even with a wrong API key.
- Fixed: a package's last-updated timestamp no longer jumps to the restart time after an adapter restart — it only changes when tracking data actually changed.
- Fixed: a stalled API response can no longer freeze polling until a manual restart — every request now has a hard 60-second deadline.
- Fixed: a failed adapter start now triggers an automatic restart instead of leaving the adapter idle until restarted by hand.
- Changed: recurring errors such as a wrong API key are logged once instead of every poll cycle, and stopping the adapter no longer leaves a red error line in the log.
- Changed: short ioBroker database hiccups no longer flip the connection indicator — it now reflects only the parcel.app connection.
- Changed: the fallback package name ("Package …") is localized like all other texts, and the adapter is listed under a fitting admin category (misc-data).
- Changed: the automatic poll after adding a delivery now respects the one-minute pacing, so bulk-adds can no longer exhaust the hourly API budget.

### 0.9.0 (2026-06-23) — stable

- Fixed: tracked packages could disappear from the object tree after a temporary update error or an unexpected API response — a package is now kept until parcel.app actually stops returning it.
- Changed: multi-day delivery windows now show the date on each side (e.g. `12-06 14:30 - 12-08 18:30`) instead of looking same-day; out-of-range or reversed dates no longer produce a misleading window.

### 0.8.0 (2026-06-19)

- The delivery window is now also shown for carriers that report it only as a date/time range, not just when the API provides a Unix timestamp.
- When adding a delivery via script, you can now set an optional tracking language and request a push confirmation.

### 0.7.2 (2026-06-12) — stable

- Much quieter state updates: a package's last-updated timestamp now only changes when its tracking data actually changed, and device entries are no longer rewritten on every poll
- Adding a delivery with a malformed request now returns a clear error message instead of failing cryptically

### 0.7.1 (2026-06-09)

- Fixed a timezone edge case in delivery estimates: when the API reports only a calendar date, the estimate could be off by a day in time zones west of UTC — now stable everywhere.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Support

- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/krobipd/ioBroker.parcelapp/issues)

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

---

_Developed with assistance from Claude.ai_
