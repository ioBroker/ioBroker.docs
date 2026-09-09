---
chapters: {"pages":{"en/adapterref/iobroker.parcelapp/README.md":{"title":{"en":"ioBroker.parcelapp — User documentation"},"content":"en/adapterref/iobroker.parcelapp/README.md"},"en/adapterref/iobroker.parcelapp/scripting.md":{"title":{"en":"Scripting and automation"},"content":"en/adapterref/iobroker.parcelapp/scripting.md"},"en/adapterref/iobroker.parcelapp/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.parcelapp/faq.md"}}}
---
# Frequently asked questions

Chapters: [Main page](/#/adapters/parcelapp) · [Scripting and automation](/#/docs/adapterref/iobroker.parcelapp/scripting.md) · **this page**

---

## Rate limits

parcel.app enforces two limits per API key:

| Operation                | Limit           | Who spends it                                     |
| ------------------------ | --------------- | ------------------------------------------------- |
| GET (reading deliveries) | **20 per hour** | every poll, plus every press of _Test Connection_ |
| POST (adding deliveries) | **20 per day**  | every `addDelivery` — including failed attempts   |

That is why the poll interval cannot go below 5 minutes: 12 polls per hour leaves room for a few
connection tests. A failed `addDelivery` still counts against the daily budget, so a script that
retries a wrong `carrier_code` in a loop will exhaust the day.

When parcel.app answers with a rate-limit error, the adapter pauses its requests for the cooldown
the server asks for (at least a minute, at most a day) and logs one warning. It does not keep
knocking.

## The connection test says my key is fine, but nothing appears

Most likely there is nothing to show: with _Automatically remove delivered packages_ enabled, the
adapter only lists shipments that are **not** delivered. If everything in your account has arrived,
zero packages is the correct result and `info.connection` stays green.

Otherwise, check the log at debug level — the adapter traces every request, its status code and the
number of deliveries it received.

## I added a package and it has no tracking data

Give it 45 to 90 minutes. parcel.app serves the delivery list from a server-side cache and needs
that long before a freshly added shipment carries events. The adapter cannot shorten that; polling
more often only wastes the request budget.

## `deliveryWindow` and `deliveryEstimate` stay empty

Three different reasons, and the debug log tells them apart:

- **The package is not in status 2, 4 or 8.** Only _In Transit_, _Out for Delivery_ and
  _Info Received_ can carry an expected delivery date. Nothing is wrong.
- **The carrier reports no date at all.** Common — many carriers only give one shortly before
  delivery. Nothing is logged, because nothing went wrong.
- **The carrier reports a date the adapter does not read.** parcel.app passes the carrier's own
  wording through, and the formats vary. The adapter reads `2026-09-06 14:30:00` (the documented
  default, with or without a time) and `September 6, 2026 14:30`. It deliberately refuses
  ambiguous forms such as `06.09.2026` — that could be the 6th of September or the 9th of June,
  and a wrong date is worse than none. Set the instance log level to `debug` and look for
  `expected-date drift`: the line names the exact value that was rejected. Please report it,
  with that line, and the format can be added.

A bare date without a time (or midnight) is a delivery _day_, not an hour window, so
`deliveryWindow` stays empty while `deliveryEstimate` still says _today_ or _tomorrow_.

## A package shows "Unknown (-1)"

parcel.app sent a status value the adapter could not interpret — most likely a new status code
introduced on their side. The package deliberately stays visible instead of being treated as
delivered and removed. It will render correctly again once the adapter learns the new code; the
tracking data itself is unaffected.

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

## Why is `lastUpdated` old even though the adapter is polling?

Because it means "the tracking data last changed", not "the adapter last polled". A shipment that
sits in a depot over the weekend keeps a weekend-old timestamp — that is the useful reading. If you
want to know whether the adapter is alive, look at `info.connection`.

## The connection indicator went red for a moment

Only a real failure of the parcel.app API turns `info.connection` false. A hiccup in the ioBroker
database while the adapter was writing states does not — it is logged as
`State maintenance failed (API connection is fine, retrying next poll)` at warning level and the
indicator stays green.

If the indicator really did go red, the log line right before it names the reason: an invalid key
(HTTP 401), a subscription problem (HTTP 403), a rate limit (HTTP 429), a timeout or a network
error. Repeated identical failures are logged once and then only at debug level, so a long outage
does not flood the log.

## I renamed a package in the admin and the adapter overwrote it

It does not. The device name is protected — your rename wins over the description from parcel.app
and survives every update. The current description from parcel.app is always available in the
`description` state.

Object **names of the states** below a package are a different matter: those belong to the adapter
and are refreshed on every start, so a translation fix reaches your installation too.

## Which carriers are supported?

All of them — the adapter supports whatever parcel.app supports, because parcel.app does the
tracking. The current list is
[`supported_carriers.json`](https://api.parcel.app/external/supported_carriers.json).

## Does the adapter send my data anywhere?

The adapter talks to `api.parcel.app` and to nothing else. Your API key is stored encrypted in the
instance object and is never written to the log.

Error reporting via Sentry is a separate matter and is **off** unless you enabled it in
_System settings → Diagnostics and error reporting_. When it is on, only an anonymous installation
ID is transmitted along with the crash — no name, e-mail address, IP address or tracking data.

## Where do I report a problem?

On [GitHub](https://github.com/krobipd/ioBroker.parcelapp/issues). A log at debug level covering the
minutes around the problem helps most — the adapter traces every request and every state decision at
that level.