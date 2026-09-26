---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"}}}
---
![Logo](admin/skoda-public-api.png)
# ioBroker.skoda-public-api

[![NPM version](https://img.shields.io/npm/v/iobroker.skoda-public-api.svg)](https://www.npmjs.com/package/iobroker.skoda-public-api)
[![Downloads](https://img.shields.io/npm/dm/iobroker.skoda-public-api.svg)](https://www.npmjs.com/package/iobroker.skoda-public-api)
![Number of Installations](https://iobroker.live/badges/skoda-public-api-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/skoda-public-api-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.skoda-public-api.png?downloads=true)](https://nodei.co/npm/iobroker.skoda-public-api/)

**Tests:** ![Test and Release](https://github.com/tmarthy/ioBroker.skoda-public-api/workflows/Test%20and%20Release/badge.svg)

## skoda-public-api adapter for ioBroker

Read and control Škoda vehicles via the official
[MyŠkoda Public API](https://public.api.connect.skoda-auto.cz/docs).

The adapter is published on npm. Inclusion in the ioBroker `latest` repository is
tracked in [ioBroker.repositories#6592](https://github.com/ioBroker/ioBroker.repositories/pull/6592).
Development status and open work are documented in [HANDOFF.md](/#/docs/adapterref/iobroker.skoda-public-api/HANDOFF.md).

### The one constraint that shapes everything

The API allows **20 requests per hour per VIN**. There is a single read endpoint,
several command endpoints, no push, no webhooks, and no operation-status endpoint — a
command returns `202 Accepted` and you learn the outcome only from a later poll, which
costs quota again. Near-real-time monitoring is not possible with this API, and neither
is PV surplus charging with current modulation. Plan accordingly.

## Getting the API key

The adapter uses the **official** MyŠkoda Public API — not the reverse-engineered app
interface that `iobroker.vw-connect` talks to.

1. Open the MyŠkoda app (version 8.16 or newer) and go to **API key**.
2. Select the vehicles the key may access. The key is bound to that selection: a VIN
   that was not selected answers with `403`, no matter how correct it looks.
3. Copy the key into the adapter instance. It **expires** after a while — the adapter
   watches the expiry date and warns you (see [Key expiry](#key-expiry)).

The key is stored encrypted (`encryptedNative`). Enter it in the admin UI, **not** in
the object browser: a plain value there is treated as encrypted on startup and turns
into garbage.

## Configuration

| Field | Default | What it does |
|---|---|---|
| API key | — | The key from the app. Required. |
| Vehicles | — | One row per VIN. **The API has no vehicle list**, so every VIN is entered by hand. |
| Base interval | 15 min | Cadence when nothing is happening. Minimum 5. |
| Interval while charging or climatising | 5 min | Cadence while the vehicle is doing something. Minimum 3. |
| Maximum interval for a sleeping vehicle | 60 min | Ceiling for the freshness backoff, see below. |
| Requests reserved for commands | 6 | Polling stops once only this many requests are left. |
| Command lifetime | 10 min | A queued command that could not be sent within this time is discarded. |
| S-PIN | — | Only needed for auxiliary heating. Never put it into a state. |
| Read parking position | on | When off, the position is **not even requested** from the API. |

There is a **Test connection** button. It sends exactly one request (out of the 20) and
tells you what is wrong in plain words — a typo in the VIN and a key that does not cover
the vehicle both produce the same `403`, and nobody guesses that from the raw error.

There is deliberately **no field for the API server**. A visible "API server" field
invites pointing the adapter — and its key — at a foreign host. For development the base
URL comes from the environment variable `SKODA_API_BASE_URL`.

## What you get

The object tree under `<vin>` mirrors the API response 1:1. Objects are created **only
for parts the vehicle actually delivers** — a battery-electric Enyaq has no
`fuelStatus`, so no such states appear. Nothing is ever deleted automatically.

Adapter-specific representations:

- `<vin>.parkingPosition.position` — `lat;lon` in one state, for VIS maps and geofence
  adapters.
- `<vin>.chargingProfiles.profiles.<id>.*` — charging profiles by **profile id**, not by
  index. Deleting a profile in the app would otherwise silently shift all the others.
  `configurationJson` exposes the full profile for atomic read/write updates.

### Refresh button

Each configured vehicle has a `<vin>.refresh` button. Write `true` with `ack: false`
to request an early poll, for example when your wallbox detects a connected cable:

```javascript
setState('skoda-public-api.0.<VIN>.refresh', true);
```

The button resets to `false` with `ack: true` when the trigger is handled; this does
not confirm that fresh vehicle data has arrived. Requests before or during the same
poll are combined. The poll includes parking position when enabled and supported.
The usual quota, command reserve and error delays still apply. Afterwards, automatic
polling continues with the interval for the reported vehicle state and freshness.
The shorter active interval applies while charging or climatising, not merely when
plugged in. This button cannot force Škoda to provide a newer position, and it does
not schedule an additional verification poll if the position is still old.

### The `info` states

| State | Meaning |
|---|---|
| `info.connection` | `false` when the key is rejected (401/403). **Stays `true` when the quota is exhausted** — an empty budget is normal operation, not a fault. |
| `<vin>.rateLimit.*` | `limit`, `remaining`, `resetAt`, `lastRequestAt` — the separate budget for this VIN, from the `RateLimit-*` headers and the adapter's memory across restarts. |
| `info.apiKey.expiresAt`, `.daysRemaining` | From the `X-API-Key-Expires-At` header of every response. |
| `<vin>.info.dataAge` | Seconds since the newest `carCapturedTimestamp` in the response. |
| `<vin>.info.lastErrors` | The `errors[]` of the last response as JSON. |
| `<vin>.info.lastCommand.*` | `name`, `result`, `timestamp`, `problemType` of the last command. |
| `<vin>.info.commandConfirmation.<group>.*` | Acceptance, target, deadline and observed confirmation of the latest accepted command in each control group. |
| `<vin>.info.polling.nextPollAt` | Scheduled due time of the next poll attempt, in Unix milliseconds; `0` while polling, suspended, or retrying local state writes. |
| `<vin>.info.polling.lastSuccessfulPollAt` | Time of the last successful vehicle API response, in Unix milliseconds; preserved across restarts, `0` if none is recorded. |
| `<vin>.info.polling.reason` | Current scheduler state or reason for waiting, with readable labels in the object browser. |

**Incomplete responses are normal.** When the API reports a failed part, or a field
disappears from a returned part, its states keep their last value with quality "not
good". This also applies to states retained across a restart and removed charging
profiles. Returning values regain good quality, even if their value has not changed.
Parts intentionally excluded from the request are left alone. `dataAge` measures the
age of the newest vehicle timestamp at the last successful poll; it is not a live clock
or a freshness guarantee for every individual state.

### Polling diagnostics

The three `info.polling` states are maintained separately for each configured vehicle,
including before its first successful response. They update when the scheduler changes
its plan and do not consume additional API requests.

| `reason` | Meaning |
|---|---|
| `STARTUP` | Initial poll is due. |
| `POLLING` | A vehicle request is in progress. |
| `IDLE_INTERVAL` | Waiting for the normal interval. |
| `ACTIVE_INTERVAL` | Waiting for the charging/climatisation interval. |
| `COMMAND_INTERVAL` | Using the shorter interval following a command. |
| `UNCHANGED_DATA` | Vehicle timestamps have not changed, so the interval was extended. This is not proof that the vehicle is asleep. |
| `MANUAL_REFRESH` | A manual refresh has brought the next poll forward. |
| `VERIFICATION` | A verification poll has been scheduled following an accepted command. |
| `COMMAND_RESERVE` | Polling has reached the command reserve; requests are held for commands until quota resets. |
| `QUOTA` | Waiting for quota, including API rate-limit responses. |
| `STARTUP_GUARD` | Waiting to protect the persisted quota after a restart. |
| `AUTH_ERROR` | The API key was rejected; polling is reduced to the error interval. |
| `ERROR_RETRY` | Waiting before retrying a failed request. |
| `ERROR_INTERVAL` | Waiting for the regular interval after a failed request or exhausted retries. |
| `WRITE_RETRY` | An API response was received, but its local state writes must be retried; no new API request is scheduled yet. |
| `SUSPENDED` | The API returned 404; polling for this VIN is suspended until the adapter restarts. |

`nextPollAt` is a scheduled due time, not a promise of fresh data at that instant.
Quota is checked again before sending, and another vehicle's request can delay it.
A successful poll may contain unchanged or partial vehicle data: compare `info.dataAge`,
the individual `carCapturedTimestamp` values and quality flags for freshness.
Commands and the admin connection test do not advance `lastSuccessfulPollAt`.
Local write retries also keep the time of the original successful response.
When the adapter is stopped, these states retain their last values; the schedule is
valid only while the instance is running and is replaced at the next start.

### Display units

The following numeric values use more readable display units. Their state IDs keep
the API field names, including the original unit suffixes:

| State below `<vin>` | Display unit | Example |
|---|---|---|
| `charging.status.battery.remainingCruisingRangeInMeters` | km | API `352000` → state `352` |
| `activeVentilation.durationInSeconds` | min | API `600` → state `10` |
| `auxiliaryHeating.durationInSeconds` | min | API `90` → state `1.5` |

Other ranges and the odometer already use km; charging time already uses minutes.
Values are divided without rounding. Existing object units and default descriptions
are updated when the corresponding value is next received; custom names are retained.
Scripts reading these three states must use km/min. Existing recorded time series are
not rewritten. API responses and command payloads retain the API units.

## Controlling the vehicle

Each domain the vehicle supports gets three states, for example under `<vin>.charging`:

- `enabled` (switch) carries the **target state**. Writing it sends a command — unless
  the target already matches what the last poll saw, in which case nothing is sent and
  `info.lastCommand.result` reads `COALESCED`.
- `start` and `stop` (buttons) **force** the call. They are the way out when the polled
  data is ten minutes old and no longer true.

The `enabled` switches accept only Boolean `true` and `false`. Other values, including
strings such as `"true"`, numbers and `null`, are ignored without an API request or
acknowledgement. They do not replace pending commands or update `info.lastCommand`.

**`ack = true` means "handed over to the API", not "the car did it".** The API answers a
command with `202 Accepted` and offers no endpoint that reports the outcome; the adapter
schedules a verification poll 60 seconds later, and only that poll shows what actually
happened. Anyone building automation on top of this needs to know that.

While a command is awaiting confirmation, repeating the same switch value is also
`COALESCED`; an opposite value can still send a command. A matching vehicle timestamp
newer than the accepted command ends this waiting phase. Without confirmation it lasts
at most the configured command lifetime (10 minutes by default), after which a new
switch write can retry. Expiry does not automatically resend the command.

### Visible command confirmation

Confirmation uses **only the existing vehicle polls**. This feature adds no API calls,
no faster polling and no additional verification requests. The existing verification
poll after an accepted command remains subject to quota. A separate local timer records
timeouts without querying the vehicle or resending the command.

After an API-accepted command, inspect
`<vin>.info.commandConfirmation.<group>.status`:

| Status | Meaning |
|---|---|
| `WAITING` | The API accepted the command; matching newer vehicle data has not yet been observed. |
| `CONFIRMED` | A later existing poll reported the requested value with a timestamp newer than API acceptance. |
| `TIMED_OUT` | No confirmation was observed within the configured command lifetime, measured from API acceptance. This does **not** prove the vehicle failed to execute the command. |
| `INTERRUPTED` | A configured adapter restart ended an unfinished observation from the previous process. No command is automatically resent. |

Groups are `charging`, `airConditioning`, `auxiliaryHeating`, `activeVentilation`,
`chargingLimit`, `chargingMode` and `chargingProfiles.<id>`. Each holds the latest
**accepted** command for that control; this is not a command history. A newly accepted
command replaces the previous observation in the same group. Other groups and vehicles
remain independent. Repeated coalesced writes do not extend the confirmation deadline.
Queued, invalid or rejected commands do not create or replace confirmation records;
their outcome remains available in `info.lastCommand`.

Each group also provides:

- `name`: the accepted command, for example `charging.start`.
- `target`: the requested value as JSON (`true`, `90`, `"TIMER"`, or a full profile).
- `sentAt`: API acceptance time, in Unix milliseconds.
- `expiresAt`: confirmation deadline, in Unix milliseconds.
- `confirmedAt`: time the matching data was observed, in Unix milliseconds; `0` otherwise.

For example, an ioBroker JavaScript script can observe confirmation without polling:

```js
on({ id: 'skoda-public-api.0.<VIN>.info.commandConfirmation.charging.status', change: 'any' }, obj => {
    if (obj.state.ack && obj.state.val === 'CONFIRMED') {
        log('The requested charging state was observed in newer vehicle data.');
    }
});
```

Status is written after the record's other fields, including when a new accepted
command replaces one that was already `WAITING`. Read `name`, `target` and `sentAt`
to identify the observation. Confirmation does not change `info.lastCommand.result`
or write the control value again: `SENT` and `ack: true` continue to mean API acceptance.

The relevant response block must have its own newer `carCapturedTimestamp`. Missing
or failed parts, unrelated timestamps and unknown vehicle states cannot confirm a
command. A newer matching state is an observation, not a server-side operation receipt;
another client could have requested the same setting. Data first observed after the
deadline leaves the record at `TIMED_OUT`. On a configured restart, only unfinished
`WAITING` records become `INTERRUPTED`; completed records remain available. While the
adapter is stopped, no local confirmation timers run and stored values remain unchanged.

### Charging limit

Write a number with `ack = false` to
`skoda-public-api.0.<vin>.charging.settings.targetStateOfChargeInPercent` to set the maximum
charge level, for example 80, 90 or 100. The state appears when the vehicle reports a
charging target. In the ioBroker JavaScript adapter:

```js
setState('skoda-public-api.0.<vin>.charging.settings.targetStateOfChargeInPercent', 90, false);
```

The adapter accepts only **50, 60, 70, 80, 90 and 100 percent**, matching the
10-percent steps in the app. Other values are rejected locally without an API call.
The same state shows the requested value after writing and is refreshed from vehicle
polls. Existing objects are automatically updated to be writable with a minimum of 50,
a maximum of 100 and a step of 10 on the first poll after adapter restart.
`ack = true` after sending means API acceptance; check this state after the verification poll to confirm
that the car applied the limit. Repeating an already reported or pending accepted target
is coalesced. Pending limit changes replace each other independently of charging on/off.
Invalid inputs fail locally without consuming API quota; outcomes are recorded in
`info.lastCommand`. A rejected value is not retried automatically.

### Charging mode

Write a string with `ack: false` to `<vin>.charging.settings.preferredChargeMode`:

```js
setState('skoda-public-api.0.<VIN>.charging.settings.preferredChargeMode', 'TIMER', false);
```

The adapter accepts `MANUAL`, `TIMER`, `TIMER_CHARGING_WITH_CLIMATISATION`,
`PREFERRED_CHARGING_TIMES`, `ONLY_OWN_CURRENT`, `IMMEDIATE_DISCHARGING` and
`HOME_STORAGE_CHARGING` **only when the vehicle lists that mode in
`charging.settings.availableChargeModes`**. A successful poll is required after
startup. Unknown, unavailable or non-string values fail locally without spending
quota. The existing mode state becomes writable on the first poll after the upgrade.

### Charging profiles

#### Edit individual fields and apply together

After a successful poll, each complete profile has a local editor at
`<vin>.chargingProfiles.profiles.<id>.edit`:

1. Change `name` or available fields under `settings`, such as
   `settings.targetStateOfChargeInPercent` and `settings.maxChargingCurrent`.
2. Adjust existing timers under `timers.<timerId>` (`enabled`, `type`, `time`,
   `oneOffDay`, and individual `recurringOn.MONDAY` … `SUNDAY` switches), or existing
   windows under `preferredChargingTimes.<windowId>` (`enabled`, `startTime`, `endTime`).
3. Write Boolean `true` with `ack: false` to `edit.apply` (**Apply profile changes**).
   The adapter validates and submits the complete profile through the existing queue.

Several edits produce **one profile update**, not one request per field. Staging,
resetting and validating use no vehicle API requests. There is no additional read
before applying, no new polling and no automatic apply or resend. Existing quota,
retry and verification rules still apply to the submitted command. An unchanged
apply sends nothing; repeating the same accepted target is coalesced by the queue.

For example, in the ioBroker JavaScript adapter:

```js
const edit = 'skoda-public-api.0.<VIN>.chargingProfiles.profiles.1.edit';
await setStateAsync(`${edit}.name`, 'Home', false);
await setStateAsync(`${edit}.settings.targetStateOfChargeInPercent`, 90, false);
await setStateAsync(`${edit}.apply`, true, false);
```

`edit.reset` (**Reset profile draft**) discards local changes and uses the latest
already-polled profile. `edit.dirty` indicates changes relative to the draft's base;
it stays true after submission until a poll reports the target or you reset it.
`edit.conflict` indicates a changed or unavailable base profile; `edit.message`
explains validation and submission. A field's `ack: true` means **stored locally**,
not sent or executed. Command outcomes remain in `info.lastCommand` and
`info.commandConfirmation.chargingProfiles.<id>`.

Polls preserve edited drafts. If the profile changes while you edit, apply is blocked:
reset and reapply your changes to the new base. A different pending/in-flight profile
update also blocks an editor submission until resolved or expired. Drafts are not
restored after an adapter restart: the first valid poll initializes them again, and
stored editor values cannot be submitted before that poll. Missing/failed profiles
cannot be applied. Optional settings appear only when supplied by the vehicle;
timer/window IDs and unknown API fields are preserved, and entries cannot be created
or deleted here.

Boolean and numeric editor fields use configuration roles where they are unique within a channel
(`switch.setting`, `level.setting.battery`, `level.setting.battery.min`).
Text fields use the generic `text` role and weekday switches use `switch`,
so detailed roles never occur twice in the same channel. These are still local drafts;
only Apply submits them. Field names and help texts support all ioBroker languages;
selection labels, editor messages and polling/confirmation status labels use the
ioBroker system language (restart the adapter after changing that language). API values
such as `ONE_OFF` and diagnostic codes such as `WAITING` or `QUOTA` remain unchanged.
Existing diagnostic label maps are migrated, including completed confirmations.
Backend logs remain English.

`edit.available` indicates whether the latest poll contains a valid profile. Removed
fields, timers or profiles retain their last values, but their controls become
read-only (`common.read: true`, `common.write: false`) with quality `q: 1` and an
explanatory description. Their roles become `indicator` for Booleans (including disabled
buttons), `value` for numbers, and `text` for strings. Returning fields regain their
original control roles; active buttons remain write-only (`read: false`, `write: true`).
Direct writes to unavailable fields are ignored and their retained values restored.
When a field returns, its controls and quality `q: 0` are restored automatically.
Persisted editor controls are also disabled at startup until the first valid poll.
These availability checks use existing polls and local ioBroker data only.

Existing objects receive updated adapter-owned metadata without deleting them;
custom names and unrelated settings such as history configuration are preserved.

#### Update complete JSON directly

Each complete profile with a safe integer ID gets a writable JSON string state:
`<vin>.chargingProfiles.profiles.<id>.configurationJson`. It contains the full profile,
including `id`, `name`, `settings`, `timers` and `preferredChargingTimes`.
Read this state, change the desired fields, and write the complete JSON back:

```js
const id = 'skoda-public-api.0.<VIN>.chargingProfiles.profiles.1.configurationJson';
const state = getState(id);
if (state && state.ack && state.q === 0) {
    const profile = JSON.parse(state.val);
    profile.settings.maxChargingCurrent = 'REDUCED';
    setState(id, JSON.stringify(profile), false);
}
```

The API replaces the **whole profile**. Preserve every field you are not changing,
including additional fields supplied by the API; do not send a partial settings object.
The adapter validates required fields, numeric IDs, percentages (0–100), supported
setting values, Boolean flags, unique timer IDs, weekdays and times (`HH:mm`).
Enabled timers also need a time and the applicable weekday selection. Times use the
vehicle's local time. The profile ID must match the state path and a complete profile
from the latest poll. This control updates existing profiles; it does not create or
delete them. The existing profile detail states remain read-only views; use the
separate `edit` area below for staged changes.

If a subsequent poll changes, removes or omits the profile before a queued update is
sent, the update fails locally. Read the latest profile and submit your changes again.
Changes made in the app after the last poll can still race with a write: the API has
no conditional-update mechanism, so avoid editing the same profile concurrently.

Mode, charging limit, start/stop and each profile have independent queue entries.
New writes replace pending updates for the same setting or profile; identical reported
or pending accepted values are coalesced. Invalid input leaves pending valid commands
untouched and reports `FAILED` without an acknowledgement. `ack: true` means API
acceptance; the verification poll checks the reported mode/profile afterwards, subject
to the usual quota. A confirmation timeout does not automatically resend an update.
The Public API also advertises supported operations in `<vin>.operations`.

`info.lastCommand.result` is one of:

| Result | Meaning |
|---|---|
| `SENT` | Handed over to the API. |
| `QUEUED` | Waiting for quota; it will go out on its own. |
| `COALESCED` | No request: the target matches the known state or a command still awaiting confirmation. |
| `EXPIRED` | Dropped, could not be sent within its lifetime. |
| `REJECTED_BY_VEHICLE` | The vehicle refused it (not supported, disabled, or busy). |
| `FAILED` | Anything else — see the log. |

## Cadence, or why your data can be an hour old

A parked vehicle reports the **same** `carCapturedTimestamp` at every poll. Asking
faster costs the full quota and yields exactly nothing, so the adapter doubles its
interval every time the timestamp has not moved, up to the configured ceiling. As soon
as the vehicle reports something new — or you send a command — it falls back to the base
cadence immediately.

What this API cannot give you, no matter how it is configured:

- **No second-by-second monitoring.** 20 requests per hour is one every three minutes,
  and that is the whole budget.
- **No immediate notification when charging ends.** You learn about it at the next poll.
- **No current modulation in amperes.** The API can set a target state of charge,
  a charging mode and a profile's `REDUCED`/`MAXIMUM` preset. It cannot continuously
  adjust amperage, so the surplus-charging example uses on/off control.

## PV surplus charging

`examples/pv-surplus-charging.js` is a commented template for the ioBroker JavaScript
adapter: switch-on threshold, switch-off threshold with a delay, minimum on and off
times, a cap on switching operations per hour, and evaluation of
`info.lastCommand.result`. The control logic deliberately lives **outside** the adapter —
every PV setup has different state IDs and meter semantics.

Two things decide whether this works for you:

- **Set the AC charging current to `REDUCED` in the MyŠkoda app or in the applicable
  charging profile.** Profile updates support `settings.maxChargingCurrent`; there is
  no dedicated command for the global current setting or arbitrary amperage. At
  `MAXIMUM` the vehicle pulls whatever the wallbox offers, and a small surplus cannot cover it.
- **Measure what your vehicle actually draws** (`charging.status.chargePowerInKw`) and
  set your thresholds from that number, not from the label on the wallbox.

## Key expiry

The key cannot be renewed automatically — the API does not offer it, and creating a new
one needs a human with the phone in hand. Since values in the tree keep their last state
when polling fails, an expired key would otherwise go unnoticed for weeks. The adapter
therefore escalates once per day: an `info` message at 14 days, a warning at 7, an error
at 2, plus an ioBroker notification from 7 days on and an alert once the key is gone.

## Troubleshooting

| Symptom | Cause |
|---|---|
| `403 api-key-not-authorized` | Either the VIN has a typo, or the vehicle was not selected when the key was created. The **Test connection** button says which. |
| `401 api-key-expired` | New key needed. `info.connection` goes to `false` and polling drops to once per hour. |
| `429 rate-limit-exceeded` | Budget spent. Normal operation; the adapter waits for the window and keeps `info.connection` at `true`. |
| Commands do nothing | Check `info.lastCommand.result`. `COALESCED` means the target already matched the last known state — use the `start`/`stop` buttons to force the call. |
| States stop updating | Look at `<vin>.info.dataAge`. A sleeping vehicle is polled less and less often, on purpose. |
| Unclear when the next poll will happen | Check `<vin>.info.polling.nextPollAt` and `.reason`; `.lastSuccessfulPollAt` shows the last successful API response. |

## Compact Mode

The adapter supports ioBroker Compact Mode with independent instances in a shared
process. Compact group assignment is controlled by your
ioBroker installation. See [verification and shutdown behavior](/#/docs/adapterref/iobroker.skoda-public-api/docs/compact-mode.md).

## Languages

The adapter configuration and object tree are translated. Backend logs, notifications
and connection-test results are always in English so they remain useful in support
requests regardless of the ioBroker system language.

## Disclaimer

Škoda and MyŠkoda are trademarks of Škoda Auto a.s. This project is an independent
open-source adapter and is neither affiliated with nor endorsed by Škoda Auto. It uses
the publicly documented MyŠkoda Public API with a key that the vehicle owner creates
themselves. The adapter icon is original, brand-neutral project artwork and does not
reproduce the official Škoda logo; it is distributed under this project's MIT license.

## Changelog

### 0.1.11 (2026-09-20)

- Use a catalogued ioBroker role for editable profile names, complete the instance-object name translations, and fill missing translations on existing `info.connection` objects at startup.

### 0.1.10 (2026-09-20)

- Add a writable charging limit with input validation, quota handling and verification polling.
- Ignore non-boolean on/off switch writes instead of interpreting them as stop commands.
- Add writable charging mode and complete charging-profile JSON controls with validation, independent queues and verification polling.
- Expose per-vehicle polling diagnostics: next due time, persistent last successful poll and the current waiting reason.
- Expose per-control command confirmation and local timeouts using existing polls only, without additional API requests.
- Add local charging-profile editors with individual fields, weekday switches, apply/reset buttons and conflict detection; batch changes into one profile update.
- Refine editor setting roles and translated help/choices; migrate existing metadata and mark unavailable controls read-only until their data returns.
- Keep unavailable roles consistent with access rights, avoid repeated detailed roles per channel, and localize editor messages and polling/confirmation labels without changing state codes.

### 0.1.9 (2026-09-06)
- Used ioBroker-managed request timers and removed news for the skipped npm version 0.1.7.

### 0.1.8 (2026-09-06)
- Kept Windows CI stable while retaining Compact Mode controller coverage on Unix hosts.

### 0.1.7 (2026-09-06)
- Added and verified ioBroker Compact Mode support.

### 0.1.6 (2026-09-06)
* (Thomas Marthy) limited adapter news to the seven entries supported by the repository builder

### 0.1.5 (2026-09-06)
* (Thomas Marthy) aligned the test workflow and changelog archive with repository checker requirements

### 0.1.4 (2026-09-06)
* (Thomas Marthy) added complete backend translations for all supported ioBroker languages

### 0.1.3 (2026-09-06)
* (Thomas Marthy) completed missing admin UI translations for all supported languages

### 0.1.2 (2026-09-06)
* (Thomas Marthy) resolved repository checker warnings for CI test discovery, environment access, changelog archiving and npm packaging

### 0.1.1 (2026-09-06)
* (Thomas Marthy) completed ioBroker object name translations for all supported languages

### 0.1.0 (2026-09-05)
* (Thomas Marthy) fixed ioBroker state roles reported by object structure validation
* (Thomas Marthy) added German and English backend messages, notifications, connection-test results and object names
* (Thomas Marthy) ensured compiled code and backend translations are included in the npm package

### 0.0.2 (2026-09-05)
* (Thomas Marthy) enabled npm Trusted Publishing for automated releases

### 0.0.1 (2026-09-05)
* (Thomas Marthy) initial release

## License
MIT License

Copyright (c) 2026 Thomas Marthy <iobroker@marthy.ch>

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