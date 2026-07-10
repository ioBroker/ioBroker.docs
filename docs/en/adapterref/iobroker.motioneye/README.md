![Logo](admin/motioneye.png)

# ioBroker adapter for MotionEye

![Number of Installations](https://iobroker.live/badges/motioneye-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/motioneye-stable.svg)
[![NPM Version](https://nodei.co/npm/iobroker.motioneye.svg?style=shields&data=v,u,d&color=orange)](https://www.npmjs.com/package/iobroker.motioneye)
[![Downloads](https://img.shields.io/npm/dm/iobroker.motioneye.svg)](https://www.npmjs.com/package/iobroker.motioneye)

[![COMMUNITY](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)](https://forum.iobroker.net/topic/84904/motioneye-integration-latest)
[![MAINTAINER](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)](https://github.com/skvarel)
[![AI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)](https://github.com/inventwo/ioBroker.motioneye/blob/main/.cursor/iobroker-adapter.mdc)

[![Paypal Donation](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)](https://www.paypal.com/donate/?hosted_button_id=7W6M3TFZ4W9LW)

---

## What this adapter does

Connect MotionEye cameras to ioBroker for motion detection, snapshots, and live streams. Control detection modes (`off` / `still` / `sharp`) from ioBroker or VIS and provide `streamUrl` HTML for any HTML-capable widget — no simple-api required for webhooks.

## Documentation

- 🇺🇸 [Documentation](docs/en/README.md)
- 🇩🇪 [Dokumentation](docs/de/README.md)

FAQ and troubleshooting (Docker/Unraid, `unauthorized`, VIS stream): [EN](docs/en/faq.md) · [DE](docs/de/faq.md)

## Features

- User-defined camera names in ioBroker (independent of MotionEye labels)
- Dynamic channels under `motioneye.0.<name>.*` (lowercase folder names)
- Built-in webhook server — no simple-api dependency
- MotionEye Config API sync for modes and webhook URLs
- `_info.connection` — instance shows when MotionEye is unreachable
- Stream sibling relink after VIS re-render (multi-camera dashboards)

## Data Points

### Per camera (`motioneye.0.<name>.*`)

Channel folder names are lowercase (e.g. `innenhof_ii`, `auffahrt`).

| State | Type | Read | Write | Description |
|-------|------|------|-------|-------------|
| `mode` | value | yes | yes | `off` / `still` / `sharp` |
| `motion` | indicator | yes | no | Motion detected (auto-reset) |
| `snapshot` | button | no | yes | Trigger snapshot |
| `stream` | switch | yes | yes | Live MJPEG stream on/off |
| `streamPulse` | button | no | yes | Stream on briefly (auto-off) |
| `streamUrl` | text | yes | no | HTML `<img>` for html widget |
| `status` | text | yes | no | Last sync status |
| `lastAction` | text | yes | no | Last API action |
| `webhookUrl` | url | yes | no | URL written to MotionEye |
| `motionEyeId` | value | yes | no | MotionEye camera ID |
| `motionEyeName` | text | yes | no | Original name in MotionEye |

### Per camera device settings (`motioneye.0.<name>.settings.*`)

| State | Type | Read | Write | Description |
|-------|------|------|-------|-------------|
| `framerate` | level | yes | yes | Capture framerate in fps |
| `resolution` | text | yes | yes | Resolution `WxH` (e.g. `640x480`) |
| `availableResolutions` | text | yes | no | Supported resolutions (comma-separated) |
| `rotation` | level | yes | yes | Video rotation `0` / `90` / `180` / `270` |
| `autoBrightness` | switch | yes | yes | Automatic brightness on/off |
| `privacyMask` | switch | yes | yes | Privacy mask on/off (mask regions are drawn in the MotionEye UI; see [FAQ](docs/en/faq.md#device-settings-settings)) |

> Brightness / contrast / saturation / hue are only available for local v4l2/USB cameras in MotionEye, not for network (RTSP/MJPEG) cameras, so they are not exposed as datapoints.

### Per camera text overlay (`motioneye.0.<name>.overlay.*`)

| State | Type | Read | Write | Description |
|-------|------|------|-------|-------------|
| `enabled` | switch | yes | yes | Text overlay on/off |
| `leftText` | text (dropdown) | yes | yes | `camera-name` / `timestamp` / `custom-text` / `disabled` |
| `rightText` | text (dropdown) | yes | yes | Same options as `leftText` |
| `customLeftText` | text | yes | yes | Used when `leftText = custom-text` |
| `customRightText` | text | yes | yes | Used when `rightText = custom-text` |
| `textScale` | level | yes | yes | Text size, `1`–`10` |

> When setting `leftText`/`rightText` to `custom-text`, also set `customLeftText`/`customRightText` — otherwise MotionEye shows empty text. See [FAQ](docs/en/faq.md#text-overlay-overlay).

> These datapoints can also be preset per camera on the **Overlay** config tab (handy when configuring many cameras at once). See [Configuration](#configuration) and [FAQ](docs/en/faq.md#text-overlay-overlay).

### Per camera storage (`motioneye.0.<name>.storage.*`)

| State | Type | Read | Write | Description |
|-------|------|------|-------|-------------|
| `snapshotCount` | value | yes | no | Number of stored snapshots |
| `videoCount` | value | yes | no | Number of stored video clips |
| `usedSpaceMb` | value | yes | no | Occupied space (snapshots + videos), in MB |
| `lastRefresh` | text | yes | no | Timestamp of the last successful refresh |
| `refresh` | button | no | yes | Trigger a refresh now |

> Refreshing requires MotionEye to recursively scan and check every stored file, which can be slow for cameras with large media libraries. Not part of the regular status poll — refresh manually via `refresh`, or enable a slow auto-refresh on the **Storage** config tab (`storagePollEnabled` + `storagePollIntervalSec`, default: disabled), where you can also exclude individual cameras from that auto-refresh while keeping the manual `refresh` datapoint available. See [FAQ](docs/en/faq.md#storage-storage).

### Instance (`motioneye.0._info.*`)

| State | Type | Description |
|-------|------|-------------|
| `_info.connection` | boolean | MotionEye reachable |
| `_info.camerasOnline` | number | Enabled cameras found in MotionEye |
| `_info.lastSync` | text | Last status poll timestamp |
| `_info.motionEyeVersion` | text | MotionEye server version |
| `_info.motionVersion` | text | Motion daemon version |

## Installation

1. Install the adapter from the ioBroker admin interface
2. Create a new instance
3. Configure **Settings**: MotionEye host, ports, credentials (optional), webhook host
4. Add cameras on the **Cameras** tab (display name, MotionEye ID, optional media folder)
5. Save and restart the instance — datapoints are created and webhook URLs are written to MotionEye

### MotionEye version compatibility

| MotionEye | Adapter | Notes |
|-----------|---------|-------|
| **0.43.x** | 0.4.x or **0.5.0+** | URL signature auth |
| **0.44+** | **0.5.0+** required | Session login (`POST /login`); adapter 0.4.x shows `unauthorized` even when web login works |
| **0.43.x** | **0.5.0+** | Safe upgrade — backward compatible |

Details: [FAQ EN](docs/en/faq.md#motioneye-044-adapter-050) · [FAQ DE](docs/de/faq.md#motioneye-044-adapter-050)

### Camera modes

| Mode | Motion detection | Video recording | Webhook |
|------|------------------|-----------------|---------|
| `off` | no | no | no |
| `still` | yes | no | yes |
| `sharp` | yes | motion-triggered MP4 | yes |


## Configuration

| Option | Default | Description |
|--------|---------|-------------|
| `motionHost` | *(empty)* | MotionEye server hostname or IP (required) |
| `motionEyePort` | `8765` | MotionEye config API (also used for snapshot actions) |
| `motionEyeUser` | `admin` | MotionEye login user |
| `motionEyePassword` | *(empty)* | MotionEye password (plain text, stored encrypted) |
| `webhookHost` | *(required)* | ioBroker host IP or hostname reachable from MotionEye (used in webhook URLs) |
| `webhookPort` | `8090` | Built-in webhook listener port |
| `motionResetMs` | `15000` | Auto-reset for `.motion` after webhook |
| `statusPollIntervalSec` | `300` | MotionEye status poll interval |
| `useMotionEyeConfig` | `true` | Write mode, webhook URLs, and stream on/off to MotionEye (leave enabled for normal use) |

Per camera (Cameras tab): optional **Media folder** name under `/var/lib/motioneye` (e.g. `Bambu` instead of default `Camera8`). Applied on adapter start when config sync is enabled. Does not rename existing folders on disk.

`storagePollEnabled` (default `false`) and `storagePollIntervalSec` (default `3600`) live on the **Storage** tab, not here — see below.

### Overlay tab

A dedicated **Overlay** tab presets the `overlay.*` datapoints (enable, left/right text, custom text, text size) per camera, in a table with one row per camera from the Cameras tab. This is one-way and never reads live datapoint changes back into the table:

- **New camera**: filled-in fields become the initial datapoint value the first time it's created.
- **Existing camera**: filled-in fields only take effect after clicking **Apply overlay settings now** — no save/restart required.
- Empty fields always mean "leave unchanged".

See [FAQ](docs/en/faq.md#text-overlay-overlay) for details.

### Storage tab

A dedicated **Storage** tab bundles everything for `storage.*`: the global auto-refresh switch/interval, a table with one row per camera with an **Exclude from auto-refresh** checkbox (off by default), and a **Refresh storage stats now** button:

- **Enable storage stats auto-refresh** (`storagePollEnabled`, default off) + **interval in seconds** (`storagePollIntervalSec`, default `3600`): global switch and cadence for the automatic refresh.
- **Exclude from auto-refresh checkbox** (per camera, default unchecked): check it for unimportant cameras with large media libraries to skip them when the auto-refresh interval runs — their `storage.*` datapoints still update any time via the `storage.refresh` trigger.
- **Refresh storage stats now**: immediately refreshes every camera in the table — no save/restart required, and ignores the Exclude checkbox (a manual click always refreshes all listed cameras).

See [FAQ](docs/en/faq.md#storage-storage) for details.

## Support

If you like our work and would like to support us, we appreciate any donation.
(This link leads to our PayPal account and is not affiliated with ioBroker.)

[![Donate](img/support.png)](https://www.paypal.com/donate?hosted_button_id=7W6M3TFZ4W9LW)

## Changelog

<!--
  ### **WORK IN PROGRESS**
-->
### 0.10.0 (2026-07-10)
- (skvarel) Fixed `snapshot` action failing with `404 not found` on some MotionEye/Motion combinations: snapshots are now triggered via MotionEye's own authenticated `/action/{id}/snapshot` endpoint (same connection as everything else) instead of a direct, unauthenticated call to Motion's raw webcontrol port. The `motionPort` setting is no longer needed and has been removed.

### 0.9.0 (2026-07-05)
- (skvarel) Per-camera storage stats under `storage.*`: snapshot count, video count, and occupied space in MB (`storage.snapshotCount`, `storage.videoCount`, `storage.usedSpaceMb`, `storage.lastRefresh`), refreshed on demand via `storage.refresh`
- (skvarel) New **Storage** config tab: global auto-refresh on/off switch + interval (`storagePollEnabled`, `storagePollIntervalSec`, off by default), a per-camera "Exclude from auto-refresh" checkbox to skip unimportant cameras, and a button to refresh all listed cameras immediately

### 0.8.0 (2026-07-04)
- (skvarel) New **Overlay** config tab: preset `overlay.*` (enabled/leftText/rightText/customLeftText/customRightText/textScale) per camera in a table, with a button to apply the table to already-running cameras immediately; values only ever flow from the config table to the datapoints, never back, so live datapoint changes are never overwritten on a restart

### 0.7.0 (2026-07-03)
- (skvarel) Per-camera text overlay under `overlay.*`: read and control overlay on/off, left/right text mode (camera name / timestamp / custom text / disabled), custom text strings, and text size (`overlay.enabled`, `overlay.leftText`, `overlay.rightText`, `overlay.customLeftText`, `overlay.customRightText`, `overlay.textScale`); `leftText`/`rightText` and their custom text are always saved together, in any order
- (skvarel) Fixed a race condition where setting two `settings.*` datapoints for the same camera at nearly the same time could silently drop one of the changes ("lost update"); config writes per camera are now serialized

### 0.6.1 (2026-07-03)
- (skvarel) Fixed privacy mask regions not surviving adapter restarts/updates: mask lines are now persisted to the settings channel's native config instead of only in memory

## Older changes
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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
