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

### 1.0.0 (2026-09-04)

- Breaking: WebSocket updates no longer create a second object tree. Values from `<appliance>.properties.*` now live under `<appliance>.status.*`, and the old tree is deleted on the first start. Update scripts, aliases, VIS and history settings.
- Breaking: `status.finishTime` is a number in milliseconds since the epoch instead of an ISO 8601 string, and `status.timeToEndMinutes` is gone - `status.properties.reported.timeToEnd` carries the remaining time in seconds with a role and a unit.
- Breaking: removed the `status.properties.metadata` tree and the empty `desired` / `metadataDesired` halves of the cloud shadow. The metadata timestamps froze after the first poll; instead every start now stamps the reported values with the moment the appliance changed them.
- Breaking: the enums of the capability document are one JSON list state instead of an empty channel per value, 140 objects on one oven. The empty channels of an older version are removed on the first start.
- Added the derived states `status.running`, `status.finishTime` and `status.cycleFinished`.
- Added a `control` channel with a writable state for every writable capability, so settings no longer have to be sent as a hand written `remote.CustomCommand` payload.
- Well known reported values now carry a role and a unit, so the type detector, VIS and the history adapters can use them.
- The session is kept in the instance data directory and reused after a restart, so a restart no longer needs a new login. The file holds the tokens only, with owner only permissions.
- WebSocket pushes now update the status tree with every derived and control state, not only the `events` channel, and an upgrade the cloud rejects with a 403 refreshes the access token instead of retrying with the dead one. Connect, close and reconnect moved to `debug`, the cloud drops an idle connection every ten minutes.
- Buttons below `remote` are released after the press, `Refresh` in particular stayed pressed for good. Control states the appliance does not report, such as `targetFoodProbeTemperatureC` without a probe, are initialized as empty.
- The network interface commands never become control states - one of them unregisters the appliance from the account - and a command is logged with a warning when the appliance reports remote control as switched off.
- Failures no longer take credentials or the instance with them: a failed request logs neither the Authorization header nor the password, an answer that does not carry what the next step reads is reported instead of ending in a TypeError, the update interval and the appliance brand are validated, and an error while a WebSocket message or a state change is processed is logged instead of ending the adapter process.
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

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
