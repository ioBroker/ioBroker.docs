---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.parcelapp
BADGE-stable: https://iobroker.live/badges/parcelapp-stable.svg
BADGE-Installations: https://iobroker.live/badges/parcelapp-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.parcelapp
BADGE-Test and Release: https://github.com/krobipd/ioBroker.parcelapp/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support-ff5e5b?style=for-the-badge&logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg?style=for-the-badge
chapters: {"pages":{"en/adapterref/iobroker.parcelapp/README.md":{"title":{"en":"ioBroker.parcelapp — User documentation"},"content":"en/adapterref/iobroker.parcelapp/README.md"},"en/adapterref/iobroker.parcelapp/scripting.md":{"title":{"en":"Scripting and automation"},"content":"en/adapterref/iobroker.parcelapp/scripting.md"},"en/adapterref/iobroker.parcelapp/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.parcelapp/faq.md"}}}
---
# ioBroker.parcelapp — User documentation

Track parcels from every carrier [parcel.app](https://parcelapp.net) supports, with one API key.
The adapter polls your parcel.app account and mirrors every shipment into the ioBroker object tree.

Chapters: **this page** · [Scripting and automation](/#/docs/adapterref/iobroker.parcelapp/scripting.md) · [Frequently asked questions](/#/docs/adapterref/iobroker.parcelapp/faq.md)

---

## Before you start

You need a **parcel.app Premium subscription**. The API is a Premium feature — without it every
request comes back as HTTP 403 and the adapter cannot read anything. The adapter never creates or
manages your parcel.app account; it only reads (and, on request, adds) deliveries.

The adapter does not talk to carriers directly. Everything you see in ioBroker is what parcel.app
itself knows about a shipment, so a carrier parcel.app cannot reach will stay empty here too.

---

## Setting it up

### 1. Get your API key

1. Open [web.parcelapp.net](https://web.parcelapp.net) and sign in with your parcel.app account.
2. Open the **API** panel.
3. Copy the key. It is a long string — copy it whole, without surrounding spaces.

### 2. Create the instance

In ioBroker, go to **Adapters**, search for `parcelapp` and add an instance. The configuration
dialog opens by itself.

### 3. Fill in the settings

| Setting                                     | What it does                                                                                                                      |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **API Key**                                 | The key from step 1. It is stored encrypted in the instance object and is never written to the log.                               |
| **Poll Interval**                           | How often the adapter asks parcel.app for an update, in minutes (5–60, default 10).                                               |
| **Automatically remove delivered packages** | On: a delivered package disappears from the object tree. Off: it stays with status _Delivered_ until you delete it in parcel.app. |

### 4. Test the connection

Press **Test Connection**. The button performs one real request against the API and reports the
actual result — a wrong key, an expired subscription or a network problem is named, not hidden
behind a green "Ok". Save afterwards; the instance starts and the first poll follows immediately.

> Note: the test uses the same request budget as polling (20 requests per hour). Pressing it a few
> times while setting up is fine; hammering it is not.

### Choosing a poll interval

parcel.app serves the delivery list from a server-side cache that is roughly **45 to 90 minutes**
old. A shorter interval therefore does not make tracking data fresher — it only shortens the delay
between parcel.app refreshing its cache and ioBroker noticing. The default of 10 minutes is a good
compromise; anything below 5 minutes would break the hourly request budget and is refused.

---

## What appears in the object tree

```
parcelapp.0.
├── info.connection              Connection to the parcel.app API
├── summary.
│   ├── activeCount              Packages not yet delivered
│   ├── todayCount               Packages expected today
│   └── deliveryWindow           Combined window of today's packages
└── deliveries.
    └── <packageId>.             One device per package
        ├── carrier
        ├── status
        ├── statusCode
        ├── description
        ├── trackingNumber
        ├── extraInfo
        ├── deliveryWindow
        ├── deliveryEstimate
        ├── lastEvent
        ├── lastLocation
        └── lastUpdated
```

### Connection

| Datapoint         | Type    | Meaning                                                                                                                                                      |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info.connection` | boolean | True while the adapter can reach the parcel.app API. A short database hiccup on the ioBroker side does **not** turn it false — only a real API failure does. |

### Summary

| Datapoint                | Type   | Meaning                                                                                                                                                |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `summary.activeCount`    | number | Packages that have not been delivered yet.                                                                                                             |
| `summary.todayCount`     | number | Packages whose expected delivery date is today.                                                                                                        |
| `summary.deliveryWindow` | string | The combined window of all packages expected today: earliest start to latest end, e.g. `09:15 - 18:30`. Empty when no package reports a usable window. |

The summary values are **not** reset when the instance is stopped. The number of packages on their
way does not change just because nobody is looking.

### Per package

Each package becomes a **device** under `deliveries.`. The device name is the description you gave
the shipment in parcel.app — and if you rename the device in the ioBroker admin, your name wins and
is never overwritten by an update.

| Datapoint          | Type   | Meaning                                                                                                                                                                                                                                                                                                                   |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `carrier`          | string | Display name of the carrier (e.g. `DHL Express`). Falls back to the uppercase carrier code when parcel.app has no name for it.                                                                                                                                                                                            |
| `status`           | string | The status as readable text, in your ioBroker system language.                                                                                                                                                                                                                                                            |
| `statusCode`       | number | The status as a number — **this is the datapoint to use in scripts**, because it does not change with the language. See the table below.                                                                                                                                                                                  |
| `description`      | string | The description from parcel.app. Unlike the device name, this always shows the current value.                                                                                                                                                                                                                             |
| `trackingNumber`   | string | The tracking number.                                                                                                                                                                                                                                                                                                      |
| `extraInfo`        | string | Additional detail the carrier needs, such as a postal code or e-mail address. Empty for most shipments.                                                                                                                                                                                                                   |
| `deliveryWindow`   | string | Expected delivery time window, e.g. `14:00 - 16:00`. A window spanning several days carries the date on both sides (`12-06 14:30 - 12-08 18:30`). Empty when there is no usable window — either the carrier reports none, or it reports a date in a format the adapter does not read (a debug line then names the value). |
| `deliveryEstimate` | string | The same information in words: _today_, _tomorrow_, _in 3 days_, _overdue_. Rendered in the system language.                                                                                                                                                                                                              |
| `lastEvent`        | string | The most recent tracking event with its date, e.g. `Arrived at delivery depot - 2026-09-02`.                                                                                                                                                                                                                              |
| `lastLocation`     | string | Where that event happened, when the carrier reports a location.                                                                                                                                                                                                                                                           |
| `lastUpdated`      | string | When the tracking data last **changed** — not when the adapter last polled. A package that sits still for two days keeps a two-day-old timestamp; that is intentional.                                                                                                                                                    |

### Status codes

| Code | Meaning          | Code | Meaning                 |
| ---- | ---------------- | ---- | ----------------------- |
| 0    | Delivered        | 5    | Not Found               |
| 1    | Frozen           | 6    | Delivery Attempt Failed |
| 2    | In Transit       | 7    | Exception               |
| 3    | Awaiting Pickup  | 8    | Info Received           |
| 4    | Out for Delivery | -1   | Unknown                 |

`-1` is not a parcel.app status. The adapter uses it when parcel.app sends a status value it cannot
interpret — for example because a future app version introduced a new code. Such a package stays
**visible** instead of being mistaken for "delivered" and silently removed.

Only packages in status 2, 4 and 8 can have an expected delivery date, so `deliveryWindow` and
`deliveryEstimate` are empty for all other statuses.

---

## Language

Every text the adapter writes — status labels, delivery estimates, object names and descriptions —
follows the **ioBroker system language** (_System settings → Language_). There is no per-instance
language setting. Changing the system language takes effect for the object names right away and for
the state values after the next adapter restart.

---

## Removing packages

There is no delete endpoint in the parcel.app API, so the adapter **cannot** remove a shipment from
your parcel.app account. Delete it in the parcel.app app or on the web, and it disappears from
ioBroker with the next poll.

What the adapter does do: with _Automatically remove delivered packages_ enabled, a delivered
package and all of its states are removed from the object tree — the shipment itself stays in your
parcel.app account.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.12.1 (2026-09-07)

- New: Carrier, status and description of a package now carry a short explanation in the object tree, in all eleven languages — including why scripts should read the status code, not the text.

### 0.12.0 (2026-09-06)

- Fixed: A package that reappeared after a database hiccup kept datapoints without a name or description until the adapter was restarted.
- Fixed: A delivery window written as "September 6, 2026 14:30" was ignored, so window, estimate and the count of packages expected today stayed empty for those carriers.
- New: The documentation explains why a delivery window can stay empty, and an unreadable date from the carrier can now be reported so the format gets added.
- New: The last known location of a package explains itself in the object tree: it is where the carrier last scanned it, not a live position.

### 0.11.1 (2026-09-04)

- Fixed: The last-changed timestamp of a package kept its old label and had no description as long as the package did not move.

### 0.11.0 (2026-09-04)

- Fixed: Since version 0.10.3 the Test Connection button gave no response at all, and packages added from a script never showed up — both work again.
- Fixed: On installations that already existed, the summary datapoints and the connection state kept their old English names — an update now reaches every datapoint.
- New: Datapoints whose name alone does not explain them now carry a short description in the object tree, in all eleven languages.
- New: Detailed user documentation in English and German, shown in the ioBroker documentation portal.
- Fixed: Two settings from much older versions were still listed in the instance configuration although nothing used them any more.

### 0.10.4 (2026-09-02)

- Fixed: A malformed reply from parcel.app (empty body or a broken delivery entry) no longer aborts the poll with a cryptic internal message — it is reported as an API problem and retried next poll.
- Fixed: A brief ioBroker database hiccup while marking the connection as online was mistaken for a parcel.app failure and switched the connection indicator to red.
- Fixed: Scripts that call checkConnection with a non-text API key now receive the regular "API key is too short" reply instead of an internal failure.
- Improved: Control characters in texts coming from parcel.app (carrier names, status notes) are now stripped completely before they reach the states.

[Older changelogs can be found there](CHANGELOG_OLD.md)

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