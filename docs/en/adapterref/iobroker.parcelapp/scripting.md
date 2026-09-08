---
chapters: {"pages":{"en/adapterref/iobroker.parcelapp/README.md":{"title":{"en":"ioBroker.parcelapp — User documentation"},"content":"en/adapterref/iobroker.parcelapp/README.md"},"en/adapterref/iobroker.parcelapp/scripting.md":{"title":{"en":"Scripting and automation"},"content":"en/adapterref/iobroker.parcelapp/scripting.md"},"en/adapterref/iobroker.parcelapp/faq.md":{"title":{"en":"Frequently asked questions"},"content":"en/adapterref/iobroker.parcelapp/faq.md"}}}
---
# Scripting and automation

Chapters: [Main page](README.md) · **this page** · [Frequently asked questions](faq.md)

---

## Reacting to a package

Use `statusCode`, never `status`. The text changes with the system language; the number does not.

```javascript
// Announce a package that is out for delivery.
on({ id: /^parcelapp\.0\.deliveries\..*\.statusCode$/, change: "ne" }, obj => {
  if (obj.state.val !== 4) {
    return; // 4 = Out for Delivery
  }
  const base = obj.id.replace(/\.statusCode$/, "");
  const what = getState(`${base}.description`).val;
  const when = getState(`${base}.deliveryWindow`).val;
  say(when ? `${what} arrives between ${when}` : `${what} is out for delivery`);
});
```

The codes are listed on the [main page](README.md#status-codes). Two of them deserve a script of
their own: **6** (delivery attempt failed) and **7** (exception) are the states where a shipment
needs you to do something.

## Reacting to the whole day

`summary.todayCount` and `summary.deliveryWindow` describe the day rather than a single shipment —
useful for a morning briefing:

```javascript
schedule("0 7 * * *", () => {
  const count = getState("parcelapp.0.summary.todayCount").val;
  if (count === 0) {
    return;
  }
  const window = getState("parcelapp.0.summary.deliveryWindow").val;
  say(window ? `${count} parcels today, between ${window}` : `${count} parcels expected today`);
});
```

## `lastUpdated` is a change marker

`lastUpdated` is written only when the tracking data actually changed, not on every poll. That makes
it usable as a "something happened" trigger — and it means a stale timestamp is information, not a
fault:

```javascript
// Warn about a shipment that has not moved for four days.
schedule("0 18 * * *", () => {
  $("state[id=parcelapp.0.deliveries.*.lastUpdated]").each(id => {
    const ageDays = (Date.now() - new Date(getState(id).val).getTime()) / 86400000;
    if (ageDays > 4) {
      log(`No movement for ${Math.floor(ageDays)} days: ${id}`);
    }
  });
});
```

---

## Adding a delivery from a script

The adapter accepts an `addDelivery` message and forwards it to your parcel.app account:

```javascript
sendTo(
  "parcelapp.0",
  "addDelivery",
  {
    tracking_number: "1234567890",
    carrier_code: "dhl",
    description: "My package",
    // optional:
    language: "de", // tracking language, ISO 639-1, default "en"
    send_push_confirmation: true, // parcel.app push once the delivery was added, default false
  },
  result => {
    if (result.success) {
      log("Added to parcel.app");
    } else {
      log(`Could not add: ${result.error_message}`, "warn");
    }
  },
);
```

### The reply

The callback always receives an object with `success` and, on failure, `error_message`. This shape
is stable — scripts written against it keep working.

`success: false` can mean several things, and `error_message` says which: an unknown
`carrier_code`, a tracking number the carrier does not recognise, the daily POST limit, or a
validation error from the adapter itself before the request was even sent.

### Rules the adapter enforces before sending

| Rule                                                                                | Reply                                                        |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `tracking_number`, `carrier_code` and `description` are required, non-empty strings | `tracking_number, carrier_code and description are required` |
| Every field is at most 512 characters                                               | `each field must be at most 512 characters`                  |
| At most 20 calls per minute                                                         | `too many addDelivery requests; max 20 per 60s`              |

These guards exist so a runaway script cannot burn your daily POST budget or push a multi-megabyte
request to parcel.app. They are checked before the network call, so a rejected call costs nothing.

### What happens after a successful add

The adapter polls right away, so the package appears in the object tree within seconds. Its tracking
states will usually still be empty — parcel.app itself needs **45 to 90 minutes** before a freshly
added shipment carries events. That is a parcel.app-side delay, not a fault in the adapter.

### Carrier codes

`carrier_code` is the identifier parcel.app uses, not the carrier's own name — `dhl`, `ups`, `fedex`
and so on. The list the adapter resolves names from is
[`supported_carriers.json`](https://api.parcel.app/external/supported_carriers.json); the readable
name of an already-tracked shipment is always available in its `carrier` state.

---

## Testing the connection from a script

The `checkConnection` message performs one real request and answers in the format the admin UI
expects — `{ result: "..." }` on success, `{ error: "..." }` on failure:

```javascript
sendTo("parcelapp.0", "checkConnection", { apiKey: "your-key" }, reply => {
  log(reply.error ? `Failed: ${reply.error}` : `Ok: ${reply.result}`);
});
```

Note the different shape from `addDelivery` — that is deliberate, because the ioBroker admin's
`sendTo` component reads exactly `result`/`error`. Do not use `checkConnection` on a schedule: it
spends one of the 20 hourly requests each time.