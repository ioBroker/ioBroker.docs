# ioBroker.tractive-next

Unofficial Tractive GPS adapter for ioBroker.

## Features

- Tractive account login with automatic token renewal
- One automatic retry after HTTP 401 or 403
- Tracker list / details / hardware / position
- Activity and health overview (`…health.*`)
- 24h position history (`…history.*`)
- Alert states for automation (`…alerts.*`)
- Geofence JSON plus structured geofence states (`…geofences.*`)
- Optional commands for live tracking, LED and buzzer (`…controls.*`, gated by `enableCommands`)
- Geofence payload as JSON when the API provides it
- OpenStreetMap link and admin map overview tab with live-tracking / LED / buzzer buttons
- Admin day track: path, heatmap toggle, from–to range slider and playback
- Optional Vis-2 Material overview project (`docs/vis-2/`)
- Automatic ioBroker object creation and datatype inference
- Encrypted password, ESLint, package/unit tests, GitHub Actions CI

## Important

Manufacturer website: [https://tractive.com/](https://tractive.com/)

Tractive does not provide a documented public consumer API for these trackers. This adapter uses the unofficial endpoint used by existing open-source integrations. Tractive can change it at any time.

## Installation

Install and update the adapter via the **ioBroker Admin** adapter list once it is available in the official **Latest** repository.

After adding an instance, open the configuration and enter the Tractive email address and password. After the first setup (and after password-encryption changes), save the password once so it is stored encrypted.

## Configuration

To send live-tracking / LED / buzzer commands, enable **Enable tracker commands** in the instance settings. The writable states are under each tracker at `…controls.liveTrackingActive`, `…controls.ledActive` and `…controls.buzzerActive`.

Commands go through the Tractive cloud API. Inside a **Power Saving / home zone** the cloud often accepts the request as `pending` but does not activate LED, buzzer or live tracking on the device (the official app can still use Bluetooth Radar locally). Outside that zone, commands work; the adapter keeps an optimistic control value while the API reports `pending`, so the UI does not flip back to `false` before you can turn the feature off again.

## Development

Contributor notes and publishing checklist: [`docs/PUBLISHING.md`](docs/PUBLISHING.md).

On a development host you can sync a local clone with `UPDATE_ON_PI.sh` (for maintainers only, not for end-user installation).

## Changelog

### 0.5.5
* (Fraese73) Add alert states per tracker (`alerts.trackerOffline`, `alerts.lowBattery`, `alerts.noRecentPosition`, `alerts.minutesSinceLastSeen`)
* (Fraese73) Add structured geofence states per tracker (`geofences.<id>.id|name|active|enteredAt|leftAt`, plus `count`/`idsJson`)

### 0.5.4
* (Fraese73) Latest review fixes: English admin tab UI, valid state roles (`text` / `value.battery`), poll interval upper bound, full jsonConfig translations
* (Fraese73) Admin day track: from–to range slider to limit visible track points

### 0.5.3
* (Fraese73) Fix day-track / history parser for nested `json_segments` (`[[points]]`)

### 0.5.2
* (Fraese73) E6013/W6018: README install via Admin only; remove root CHANGELOG.md (changelog in README)

### 0.5.1
* (Fraese73) Repository checker fixes: news only for published npm versions

### 0.5.0
* (Fraese73) Admin day track with heatmap toggle and time-slider playback; history.distanceKm

### 0.4.0
* (Fraese73) Optional live-tracking / LED / buzzer commands with enableCommands safety switch
* (Fraese73) Fixed overview.charging for NOT_CHARGING string values
* (Fraese73) Optimistic pending control state, admin control buttons, Vis-2 overview (shipped in 0.5.0)

### 0.3.0
* (Fraese73) Activity/health overview, 24h history, live-tracking status, geofence JSON (read-only)

### 0.2.11
* (Fraese73) Stabilization: null type hints, tolerant API sections, unit tests, redacted logs

### 0.2.10
* (Fraese73) Trusted Publishing release with provenance; news limited to npm versions

Older entries: [`docs/CHANGELOG_OLD.md`](docs/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Fraese73

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
