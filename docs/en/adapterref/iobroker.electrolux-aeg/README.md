![Logo](admin/electrolux-aeg.png)

# ioBroker.electrolux-aeg

[![NPM version](https://img.shields.io/npm/v/iobroker.electrolux-aeg.svg)](https://www.npmjs.com/package/iobroker.electrolux-aeg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.electrolux-aeg.svg)](https://www.npmjs.com/package/iobroker.electrolux-aeg)
![Number of Installations](https://iobroker.live/badges/electrolux-aeg-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/electrolux-aeg-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.electrolux-aeg.png?downloads=true)](https://nodei.co/npm/iobroker.electrolux-aeg/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.electrolux-aeg/workflows/Test%20and%20Release/badge.svg)

## electrolux-aeg adapter for ioBroker

Adapter for Electrolux and AEG

Supported appliances are managed through the official [Electrolux](https://www.electrolux.com/) and [AEG](https://www.aeg.com/) connected appliance services.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Control

electrolux-aeg.0.XXXX.remote

## Settings

electrolux-aeg.0.XXXX.control

Every writable capability the appliance reports becomes a state in this channel: dropdowns for capabilities with a fixed list of values, switches for ON/OFF capabilities, numbers with their allowed range, and buttons for write-only triggers. Capabilities nested in a container are named `container_capability`, for example `userSelections_analogTemperature`. Writing a state sends the change to the appliance and the value is mirrored back from the appliance on the next update.

Most appliances only accept commands, including `remote.START`, after remote start was armed on the appliance itself. The adapter cannot switch that on; it logs a warning when the appliance reports remote control as switched off.

Some settings are rejected by the cloud for some models. The write is then logged as a warning and the state falls back to the reported value; use `remote.CustomCommand` to send a raw payload in that case.

## Status

electrolux-aeg.0.XXXX.status

## Live Events

electrolux-aeg.0.XXXX.events

## Derived states

The adapter computes a few convenience states from the raw payload, so scripts do not have to. They live next to the raw values under `electrolux-aeg.0.XXXX.status`:

| State | Meaning |
| --- | --- |
| `running` | A program is in progress. `PAUSED` and `DELAYED_START` count as running. |
| `finishTime` | Estimated end of the running program, in milliseconds since the epoch. Empty when no program is running. Only rewritten when the estimate moves by more than a minute. |
| `cycleFinished` | `true` for the single update in which a program finished. Trigger on the change to `true`. |

## Changelog

### **WORK IN PROGRESS**

- Breaking: WebSocket updates no longer create a second object tree. Values that used to appear under `<appliance>.properties.*` are now written to `<appliance>.status.*` like the polled values, and the old tree is deleted on the first start. Update scripts, aliases, VIS and history settings that reference the old ids.
- Added derived states `status.running`, `status.finishTime` and `status.cycleFinished`. The remaining time is not among them: `status.properties.reported.timeToEnd` already carries it in seconds, with a role and a unit.
- Added a `control` channel with a writable state for every writable capability of an appliance, so settings no longer have to be sent as a hand written `remote.CustomCommand` payload.
- Appliances without an `executeCommand` capability no longer lose their whole capability parsing.
- The session is now kept in the instance data directory and reused after a restart, so a restart no longer needs a new login. The stored file holds the tokens only, with owner only permissions, never the user name or the password, and it is dropped as soon as the cloud rejects it.
- The network interface commands of an appliance are no longer turned into control states. One of them unregisters the appliance from the account.
- Commands are now logged with a warning when the appliance reports that remote control is switched off, instead of being swallowed silently.
- The adapter now asks the cloud which region an account belongs to and uses the endpoints of that region. Accounts outside Europe are no longer forced onto the European servers. If the lookup fails, the European endpoints are used as before.
- Well known reported values now carry a role and a unit (times in seconds, temperatures in °C, humidity and air quality readings), so the ioBroker type detector, VIS and the history adapters can use them.
- Partial WebSocket updates no longer clear the active alert states.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
- Breaking: `status.finishTime` is now a number, in milliseconds since the epoch, instead of an ISO 8601 string. History and VIS can work with it directly.
- Breaking: removed `status.timeToEndMinutes`. `status.properties.reported.timeToEnd` already carries the remaining time in seconds with a role and a unit, and `status.finishTime` answers the same question as an absolute instant.
- Removed the `status.properties.metadata` tree. It carries one cloud timestamp per reported value, but only the device list fills it while the per appliance poll sends an empty object, so its timestamps froze after the first poll while still reading as current.
- The timestamps are not lost: at every start the reported values are written with the moment the appliance changed them, so a change during a restart lands in the history at the time it happened instead of at the start of the adapter. States the previous run never wrote are left to the poll.
- The enums of the capability document are one state each instead of an empty channel per value. `capabilities.applianceState.values` now holds `["ALARM","DELAYED_START",…]` as JSON; before, every value was a channel without content, 140 of them on an oven. A value that carries its own settings, such as a program with its temperature range, stays a channel. The empty channels of an older version are removed on the first start.
- The empty `desired` and `metadataDesired` halves of the cloud shadow no longer create empty channels. An appliance that does fill them keeps its values.
- The WebSocket connect, close and reconnect messages moved from `info` to `debug`. The cloud drops an idle connection after ten minutes, so the cycle repeats all day; `info.connection` carries the state worth watching.
- A button below `remote` is released after the press. `Refresh` in particular stayed at `true` and unacknowledged for good, because it returned before anything wrote the state back. A switch such as `control.cavityLight` keeps the value that was written, it is a setting and not a press.
- Control states of a capability the appliance does not report, such as `targetFoodProbeTemperatureC` without a food probe, are written once as empty instead of staying untouched.
- An answer that arrives but does not carry what the next step reads is reported instead of ending in a TypeError. The cloud answers a wrong user name or password with a body rather than a rejection; the login now stops with the message the cloud sent. An appliance list that cannot be read leaves the appliances of the last run alone and is fetched again on the next poll, instead of leaving the adapter without devices until it is restarted by hand. A single appliance without an id is skipped instead of costing the others their tree.
- A failed request no longer writes the request itself into the log. An axios error carries the Authorization header in `config`, and the password in the body of the login call; only the message, the status and the redacted response body are logged now. The redaction covers the account data next to the tokens as well: `UID` with `UIDSignature` and `signatureTimestamp` is a valid identity proof, and `profile` carries the mail address and the name.
- The update interval is validated as a number. A value that was not one passed both bounds and ended up in a timer that fired at once and rescheduled itself without pause. The lower bound of the runtime is the `1` of the admin page instead of `0.5`.
- An unknown appliance brand stops the adapter with a clear message instead of throwing on the first request.
- A token refresh that was still in flight when the adapter stopped no longer starts a WebSocket and a timer that nothing will clean up.
- The adapter subscribes to its control and remote states instead of to everything it writes itself.

### 0.0.14 (2026-08-06)

- Button states (`remote.Refresh`, `remote.START`, `remote.STOPRESET`) are now write-only (`read: false`) as required by the ioBroker state role specification.
- Sanitize remote command names coming from the cloud API before using them as object IDs; the raw command name is still sent to the API.
- Redact WebSocket debug logs instead of logging the raw payload.
- Await the logout request during unload and give it a shorter timeout than regular requests.
- Update axios to 1.19.0.

### 0.0.13 (2026-07-04)

- Trim old `common.news` entries for repository review.

### 0.0.12 (2026-07-04)

- Exclude `CHANGELOG_OLD.md` and test files from npm publishing.
- Tighten object ID sanitization to replace commas.
- Remove stale commented-out logout code and document raw/sanitized appliance ID mapping.

### 0.0.11 (2026-07-03)

- Republish the latest repository review fixes with npm provenance.
- Remove obsolete ESLint and Prettier dependencies after migrating to `@iobroker/eslint-config`.

### 0.0.10 (2026-07-03)

- Republish the 0.0.9 migration fixes with npm provenance.

### 0.0.9 (2026-07-03)

- Breaking: sanitize appliance object IDs. Characters like `:` are replaced with `_`; update scripts, aliases, VIS and history settings that reference old IDs.
- Remove old unsanitized appliance object trees after creating the new sanitized objects.
- Handle temporary Electrolux API gateway timeouts without error log spam

### 0.0.8 (2026-06-29)

- Hardened login, token refresh and WebSocket reconnect
- Added active alert summary states under `.status.activeAlert*`
- Fixed brand parameter for AEG accounts

### 0.0.6 (2025-12-09)

- fix refresh token

Older changes are documented in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License

Copyright (c) 2023-2026 TA2k <tombox2020@gmail.com>

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
