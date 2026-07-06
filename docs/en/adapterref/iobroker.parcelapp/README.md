# ioBroker.parcelapp

[![npm version](https://img.shields.io/npm/v/iobroker.parcelapp)](https://www.npmjs.com/package/iobroker.parcelapp)
![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/iobroker.parcelapp)](https://www.npmjs.com/package/iobroker.parcelapp)
![Installations](https://iobroker.live/badges/parcelapp-installed.svg)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd)
[![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

<img src="https://cdn.jsdelivr.net/gh/krobipd/ioBroker.parcelapp@main/admin/parcelapp.svg" width="100" />

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

## Requirements

- **Node.js >= 22**
- **ioBroker js-controller >= 7.0.7**
- **ioBroker Admin >= 7.8.23**
- **parcel.app Premium subscription** — required for API access

---

## Configuration

| Option                    | Description                                                                                                | Default |
| ------------------------- | ---------------------------------------------------------------------------------------------------------- | ------- |
| **API Key**               | Your parcel.app API key (get it at [web.parcelapp.net](https://web.parcelapp.net))                         | —       |
| **Poll Interval**         | How often to fetch updates (minutes)                                                                       | 10      |
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
        ├── statusCode           — Status code (0-8)
        ├── description          — Package description
        ├── trackingNumber       — Tracking number
        ├── extraInfo            — Extra information (postal code, email)
        ├── deliveryWindow       — Expected delivery time window
        ├── deliveryEstimate     — Human-readable estimate (today, tomorrow)
        ├── lastEvent            — Latest tracking event
        ├── lastLocation         — Last known location
        └── lastUpdated          — Last update timestamp
```

---

## Add Deliveries via Script

You can add new deliveries from JavaScript/Blockly scripts:

```javascript
sendTo("parcelapp.0", "addDelivery", {
  tracking_number: "1234567890",
  carrier_code: "dhl",
  description: "My package",
});
```

The delivery is added to your parcel.app account and immediately appears in ioBroker after an automatic poll.

**Notes:**

- **POST rate limit: 20 deliveries per day** — failed attempts (e.g. wrong `carrier_code`) also count against this limit.
- Fresh deliveries usually have no tracking events for **45–90 minutes** after they are added. That's a parcel.app-side delay, not an adapter issue.
- **Deleting packages is only possible in the parcel.app app/web UI** — the API has no delete endpoint. With `autoRemoveDelivered` enabled, the adapter still drops delivered packages from ioBroker states automatically.

---

## Troubleshooting

### Connection test fails

- Verify your API key at [web.parcelapp.net](https://web.parcelapp.net)
- Ensure you have an active Premium subscription
- Check if your ioBroker instance has internet access

### No deliveries shown

- The API returns cached data — new deliveries may take a few minutes to appear
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
### 0.5.3 (2026-05-23)

- Reduced unnecessary state-change events by skipping writes when the value has not changed.

### 0.5.2 (2026-05-23)

- Changelog rewritten in user-centric style across all versions.

### 0.5.1 (2026-05-23)

- Internal cleanup. No user-facing changes.

### 0.5.0 (2026-05-22)

- User-modified state names are no longer overwritten on adapter restart

### 0.4.9 (2026-05-21)

- Improved error handling and stability.

Older entries are in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

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

*Developed with assistance from Claude.ai*
