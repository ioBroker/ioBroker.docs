---
chapters: {"pages":{"en/adapterref/iobroker.parcelapp/README.md":{"title":{"en":"ioBroker.parcelapp — User documentation"},"content":"en/adapterref/iobroker.parcelapp/README.md"},"en/adapterref/iobroker.parcelapp/scripting.md":{"title":{"en":"Scripting and automation"},"content":"en/adapterref/iobroker.parcelapp/scripting.md"},"en/adapterref/iobroker.parcelapp/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.parcelapp/faq.md"}}}
---
# Frequently asked questions

Chapters: [Main page](/#/adapters/parcelapp) · [Scripting and automation](/#/docs/adapterref/iobroker.parcelapp/scripting.md) · **this page**

---

## Rate limits

parcel.app enforces two limits per API key:

| Operation                | Limit           | Who spends it                                                                       |
| ------------------------ | --------------- | ----------------------------------------------------------------------------------- |
| GET (reading deliveries) | **20 per hour** | every poll, the extra poll after an `addDelivery`, every press of _Test Connection_ |
| POST (adding deliveries) | **20 per day**  | every `addDelivery` — including failed attempts                                     |

The adapter keeps both budgets itself, so it never asks for the 21st request:

- It counts every GET of the last hour. A regular poll needs one free request; a press of
  _Test Connection_ with the configured key needs one too, otherwise the button answers
  "The hourly request budget of parcel.app is used up" without asking parcel.app.
- After an `addDelivery` it polls once more so the new package shows up early — at most once per
  poll interval, and only as long as that leaves every regular poll its request.
- It accepts at most **20 `addDelivery` calls in any 24 hours**, the same limit parcel.app applies.
  The 21st call is refused locally with the time when the next one is possible. A failed
  `addDelivery` counts too, so a script that retries a wrong `carrier_code` in a loop ends up there.

That is also why the poll interval cannot go below 5 minutes: 12 polls per hour leave room for the
extra polls and a few connection tests.

When parcel.app answers with a rate-limit error anyway (another client with the same key, or a few
restarts in one hour), the adapter pauses its requests for the cooldown the server asks for (at
least a minute, at most a day) and logs one warning. It does not keep knocking.

## The connection test says my key is fine, but nothing appears

Most likely there is nothing to show: with _Automatically remove delivered packages_ enabled, the
adapter only lists shipments that are **not** delivered. If everything in your account has arrived,
zero packages is the correct result and `info.connection` stays green.

Otherwise, check the log at debug level — the adapter traces every request, its status code and the
number of deliveries it received.

## I added a package and it has no tracking data

Give it 45 to 90 minutes. parcel.app fetches the tracking from the carrier itself and is, by its own
FAQ, on average 45 and at most about 90 minutes behind the carrier's website — a freshly added
shipment carries no events before that. The adapter cannot shorten that; polling more often only
wastes the request budget.

## My Amazon packages do not update

parcel.app updates Amazon shipments only on an iPhone with the parcel.app app — while the app is open
or through its background refresh (parcel.app FAQ). The API, and with it this adapter, sees what that
device last delivered. If no iPhone with the app is involved, Amazon packages keep their first state.

## `deliveryWindow` and `deliveryEstimate` stay empty

Three different reasons, and the debug log tells them apart:

- **The package is not in status 2, 4 or 8.** Only _In Transit_, _Out for Delivery_ and
  _Info Received_ can carry an expected delivery date. Nothing is wrong.
- **The carrier reports no date at all.** Common — many carriers only give one shortly before
  delivery. Nothing is logged, because nothing went wrong.
- **The carrier reports a date the adapter does not read.** parcel.app passes the carrier's own
  wording through, and the formats vary. For the expected date the adapter reads
  `2026-09-06 14:30:00` (the documented default, with or without a time — the only form seen in
  real answers) and `September 6, 2026 14:30`. It deliberately refuses ambiguous forms such as
  `06.09.2026` — that could be the 6th of September or the 9th of June, and a wrong date is worse
  than none. Set the instance log level to `debug` and look for `expected-date drift`: the line
  names the exact value that was rejected. Please report it, with that line, and the format can be
  added.

A bare date without a time (or midnight) is a delivery _day_, not an hour window, so
`deliveryWindow` stays empty while `deliveryEstimate` still says _today_ or _tomorrow_. When
parcel.app reports a **range** of days — from Monday to Wednesday, often as midnight to midnight —
every day of the range counts as _today_; the package is _overdue_ only after the last one.

A package **out for delivery** counts as _today_ when the carrier scanned it today, even without an
expected date or with one that already lies in the past. The day of that scan comes from the newest
tracking event, whose date parcel.app sends in the language of the shipment and in more shapes than
the expected date: with a year (`2026-09-25 07:12:00`, `September 25, 2026 7:12`), the dotted UPS
form with the month first (`09.25.2026 07:12`, read only where day and month can be told apart), and
a weekday form without a year in all app languages (`Friday, 25 September 7:12 am`,
`Freitag, 25. September 5:50`, `domingo 24 agosto 11:23 PM`). A form it cannot read leaves one
`event-date drift` line at debug level.

Everything that depends on the date — the estimate, `todayCount` and the combined window — moves on
right after midnight, without asking parcel.app: _tomorrow_ becomes _today_ at the start of the day,
not with the first poll after it.

## A package shows "Unknown (-1)"

parcel.app sent a status value the adapter could not interpret — most likely a new status code
introduced on their side. The package deliberately stays visible instead of being treated as
delivered and removed. It will render correctly again once the adapter learns the new code; the
tracking data itself is unaffected. An unreadable value is never taken for a number it merely starts
with: `"0abc"` is _unknown_, not _delivered_ (in the auto-remove mode that would have deleted the
package). The admin shows the meaning of every code next to `statusCode`.

## A package disappeared from the object tree

Three possible reasons, in order of likelihood:

1. It was delivered and _Automatically remove delivered packages_ is on. That is the setting doing
   its job.
2. You deleted the shipment in parcel.app. The adapter mirrors your account, so it follows.
3. parcel.app stopped returning it. The adapter only removes a package when the API no longer lists
   it — a temporary error or a malformed response never deletes anything.

A package is **never** removed because a single write failed. That was a real defect once and is
guarded against since v0.9.0.

## Can I delete a package from ioBroker?

No. The parcel.app API has no delete endpoint — deleting is only possible in the parcel.app app or
on the web. Removing the ioBroker states by hand does not help either: the next poll recreates them
as long as parcel.app still returns the shipment.

## I have the same tracking number twice, under two carriers

Both are tracked, each with its own device — also three or more carriers, and also entries without
any tracking number. That happens when a number was first added with the wrong carrier: the API has
no delete endpoint, so the entry stays and you add the number again with the right carrier. The
second package gets a suffix on its object id so the two never overwrite each other. Once the wrong
entry is gone from parcel.app, the poll that notices removes its objects, and the remaining package
moves up to the plain id on the poll after that.

If you instead **correct the carrier of the existing entry** in parcel.app, the package keeps its
device and all its datapoints — the adapter recognises the same shipment by tracking number and
extra information. The same holds for a number re-typed in other letter case. `lastUpdated` moves,
because the carrier changed.

Which package owns which id is stored in the device object (`native.identity`), so a restart of the
adapter never swaps the ids of two packages, whatever order parcel.app sends them in.

## Why is `lastUpdated` old even though the adapter is polling?

Because it means "the tracking data last changed", not "the adapter last polled". A shipment that
sits in a depot over the weekend keeps a weekend-old timestamp — that is the useful reading. If you
want to know whether the adapter is alive, look at `info.connection`.

What does **not** move it: the estimate turning from _in 2 days_ to _tomorrow_, a new display name
parcel.app gives a carrier, and the status text changing with the system language. A new carrier
**code** does move it — the shipment is now tracked somewhere else.

## The connection indicator went red for a moment

Only a real failure of the parcel.app API turns `info.connection` false. A hiccup in the ioBroker
database while the adapter was writing states does not — it is logged as
`Removing stale packages failed …` or `Updating the summary failed …` at warning level — both with
`(API connection is fine, retrying next poll)` — and the indicator stays green.

A network failure or a timeout is a **state**, not a log event: `info.connection` shows it, and the
log carries it at debug level only — a line per outage would just repeat the datapoint. Everything
you have to act on is logged once as a warning: an invalid key (HTTP 401), a subscription problem
(HTTP 403), a rate limit (HTTP 429) or an unexpected answer. Repeated identical failures are then
only logged at debug level, so a long outage does not flood the log.

After an invalid key or a subscription problem the adapter backs off: after the n-th rejection in a
row it skips the next 2^(n-1) - 1 polls (never more than six hours), so a wrong key does not spend
the hourly budget of a key that works elsewhere. A successful answer, or a new key in the settings
(the instance restarts), ends the back-off. _Test Connection_ always asks.

## I renamed a package in the admin and the adapter overwrote it

It does, and since v0.13.0 that is deliberate. The device name is the description from parcel.app,
and the adapter keeps it in sync: rename the shipment there and the device follows on the next poll.
Before v0.13.0 the name was frozen at its first value, so your own change in parcel.app never
arrived either.

For a label of your own, use an alias or a datapoint in `0_userdata` — that is yours and the adapter
never touches it. The object **names of the states** below a package belong to the adapter in the
same way and are refreshed on every start, so a translation fix reaches your installation too.

## Which carriers are supported?

All of them — the adapter supports whatever parcel.app supports, because parcel.app does the
tracking. The current list is
[`supported_carriers.json`](https://api.parcel.app/external/supported_carriers.json).

## Does the adapter send my data anywhere?

The adapter talks to `api.parcel.app` — and, for error reports, to Sentry (`ingest.de.sentry.io`).
Your API key is stored encrypted in the instance object and is never written to the log.

Error reporting via Sentry is **on** unless it is switched off: the ioBroker plugin reports as long as
the diagnostics setting of the system (_System settings → Statistics_) is not set to _none_ — the
js-controller default is _extended_ — and data reporting is not disabled for the host or this
instance, and never on CI systems. A report contains the error with its stack trace and technical
context such as versions and platform, plus an anonymous installation ID. See the
[plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) for every way to
turn it off.

## Where do I report a problem?

On [GitHub](https://github.com/krobipd/ioBroker.parcelapp/issues). A log at debug level covering the
minutes around the problem helps most — the adapter traces every request and every state decision at
that level.