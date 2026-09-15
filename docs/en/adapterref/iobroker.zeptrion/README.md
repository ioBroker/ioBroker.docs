---
chapters: {"pages":{"en/adapterref/iobroker.zeptrion/README.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README.md"},"en/adapterref/iobroker.zeptrion/README_de.md":{"title":{"en":"ioBroker.zeptrion"},"content":"en/adapterref/iobroker.zeptrion/README_de.md"}}}
---
# ioBroker.zeptrion

![Logo](admin/zeptrion.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.zeptrion.svg)](https://www.npmjs.com/package/iobroker.zeptrion)
[![Downloads](https://img.shields.io/npm/dm/iobroker.zeptrion.svg)](https://www.npmjs.com/package/iobroker.zeptrion)
[![Tests](https://github.com/bueste/ioBroker.zeptrion/workflows/Test%20and%20Release/badge.svg)](https://github.com/bueste/ioBroker.zeptrion/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://www.paypal.com/ncp/payment/TT6MTBLXX9L9U)
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-FFDD00?style=flat&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/stefanbuehler)

Adapter for [Feller](https://www.feller.ch/) **[zeptrion / zApp](https://www.feller.ch/de/connected-buildings/zeptrion)** WLAN actuators (WLAN Nebenstelle 4K = zApp gateway,
WLAN Zwischenmodul 2K = zApp booster) for light and shutter/blind control, based on the
zrap web service API (Feller document 10.ZEPAPI-E.1612 / version 1.0, firmware from 01.08.18).

_(Eine deutsche Version dieser README ist verfügbar unter [README_de.md](/#/docs/adapterref/iobroker.zeptrion/README_de.md).)_

## Feature overview

- **Channel control** (`zrap/chctrl`): on/off/stop/toggle, open/close, move_open/move_close,
  dim_up/dim_down including timed variants (`_t` in ms), as well as scenes
  recall_s1-4 / store_s1-4 / delete_s1-4 - both as individual buttons AND as a free-text
  `command` field.
- **Channel state** (`zrap/chscan` as a periodic resync + `zrap/chnotify` as a long-poll
  push for near real-time updates) and **channel description** (`zrap/chdes`,
  read/write: name, group, icon, type, category).
- **Device information** (`zrap/id`): hardware/software/bootloader version, serial number,
  system name, device type.
- **Signal strength** (`zrap/rssi`, polled).
- **Network status** (`zrap/net`, read-only): SSID, IP, MAC, mode, encryption,
  mask, gateway.
- **System commands** (`zrap/sys`): reboot, factory reset, reset to access-point mode.
- **Location** (`zrap/loc`), **NTP configuration** (`zrap/ntp`) and **date/time**
  (`zrap/date`) including one-click synchronization of the device clock with the ioBroker host.
- **mDNS discovery** (chapter 4 of the API documentation): scans the local network for
  zeptrion devices and adds finds to the configuration table in a disabled state
  (discovery combined with manual review/activation).
- **Bulk commands for hail alerts**: `control.closeAllShutters` / `openAllShutters` /
  `stopAllShutters` control all configured channels across all active devices at once
  - thanks to multicast bundling (see below), as a single request per device, not per channel.
- **Multicast command bundling**: channel commands for the same device that arrive within
  50ms of each other are automatically bundled into a single `zrap/chctrl` multicast POST
  (chapter 3.6.5 of the API documentation) instead of several sequential individual requests.
- **Shutter position estimation** (optional, `posEstimate`): since the hardware, per the
  documentation, practically always reports `-1` (unknown) for shutter channels, a motor
  travel time can be configured per device; the adapter estimates the position from this
  based on direction of movement and elapsed time (best effort, no hardware feedback,
  manually calibratable).
- **Smartfront support** (optional, `zapi/smartfront/*`): read temperature/brightness/
  humidity, set LED background color (only for devices with a connected Feller Smartfront
  switch, checkbox in the configuration).
- Robust error handling: distinguishes ECONNREFUSED/timeout/DNS errors, backoff on
  repeated failures, per-device and global connection status. mDNS discovery is
  additionally hardened against exceptions caused by malformed/unrelated network packets.

Not implemented (see "Known limitations"): write access to `zrap/net`
(changing WLAN credentials), `zrap/scheduler`, Smartbutton webhook programming
(`zapi/smartbt/*`).

## Installation

Admin UI -> Adapters -> search for "zeptrion" -> Install.

## Configuration

- **HTTP Timeout**: timeout per request to a device (default 4000 ms).
- **Discovery button**: scans the local network via mDNS (service type `_zapp._tcp`,
  fallback `_http._tcp` for firmware < 01.08.xx based on the hostname pattern
  `zapp-YYWWNNNN`). Newly found devices are added to the table in a **disabled** state
  - review the row afterwards, assign an ID/name, verify the channel count
  (3340-4-x = 4 channels, 3340-2-x = 2 channels) and enable it. mDNS only works
  within the same network segment/VLAN.
- **Device table** (can also be filled in entirely manually, without discovery):
  - `Active`, `ID` (a-z 0-9 _ -), `Name`, `IP address/hostname`,
    `Channels` (1-4), `Kind` (Shutter/Light/unknown - controls the ioBroker object roles,
    see below), `Shutter motor travel time` (seconds, 0=disabled - enables
    `posEstimate`, see below, acts as the default for all channels),
    `Travel time/channel` (optional, comma-separated, e.g. `22,28` - overrides the
    default travel time individually per channel; useful for 2K devices where the two
    channels have different motor travel times; empty entries fall back to
    the default travel time), `Smartfront` (checkbox, only enable if a
    Feller Smartfront switch is connected), `Poll (s)` (default 30, for RSSI +
    periodic chscan resync; the actual channel updates run independently
    via the chnotify long-poll).

## Object tree per device (`zeptrion.0.<id>`)

```
<id>.info.connection / lastError / hw / sw / boot / sn / sys / type / oen / rssi / refresh
<id>.network.ssid / ip / mac / mode / enc / mask / gw / bssid        (read-only)
<id>.system.reboot / unlock / factoryDefault / networkDefault      (buttons; factoryDefault requires unlock within 30s)
<id>.location.name                                                  (read/write)
<id>.ntp.url / per                                                   (read/write)
<id>.date.rfc1123 / tz / dst / syncNow                               (read/write + button)

<id>.channels.chN.val                                    channel state 0-100 / -1 (raw hardware value)
<id>.channels.chN.posEstimate                             only for kind=Shutter: software position estimate
                                                           0=closed/100=open, also manually writable (calibration)
<id>.channels.chN.name / group / icon / type / cat        channel description (read/write)
<id>.channels.chN.command                                 free-text command (string)
<id>.channels.chN.stop / on / off / toggle / open / close /
                  move_open / move_close / dim_up / dim_down        (buttons)
<id>.channels.chN.recall_s1..4 / store_s1..4 / delete_s1..4          (buttons)

<id>.smartfront.temp / lux / hum       only if "Smartfront" is enabled (read)
<id>.smartfront.ledState               current LED status as JSON (read)
<id>.smartfront.ledSet                 set LED(s), JSON array (write)
```

Global:

```
info.connection                at least one device reachable
control.closeAllShutters       button: ALL configured channels -> "close"
control.openAllShutters        button: ALL configured channels -> "open"
control.stopAllShutters        button: ALL configured channels -> "stop"
```

## Object roles and "kind"

The zrap API itself does not distinguish between a light and a shutter channel - that
is purely a matter of wiring/the actuator. So that visualizations (VIS, possibly a
future ioBroker.iot/Alexa integration) can still classify channels meaningfully, the
"kind" can be set per device:

| Kind | `<ch>.val` role | `stop`/`open`/`close` role |
|---|---|---|
| Shutter/blind | `level.blind` | `button.stop` / `button.open.blind` / `button.close.blind` |
| Light | `level.dimmer` | generic `button` |
| unknown (default) | `value` | generic `button` |

Important: `level.blind` does **not** fake genuine position feedback - per the Feller
documentation, `chscan`/`chnotify` for a shutter channel almost always returns `-1`
(unknown), since the hardware itself does not report a blind position. The role only
improves recognition by VIS widgets; the numeric value generally remains uninformative.

## Hail alert usage

```javascript
// JavaScript adapter example
on({id: 'weather.0.warnings.hail', val: true}, function () {
    setState('zeptrion.0.control.closeAllShutters', true);
});
```

Failures on individual devices (offline, etc.) do not interrupt the remaining channels -
each failed channel is logged individually and recorded in `<id>.info.lastError`.

## Known limitations / deliberate decisions

- **Smartbutton webhook programming** (`zapi/smartbt/prgm`/`prgn`/`prgs`) is not
  implemented: this would have the switch call a URL on ioBroker directly on a button
  press (true push, no polling at all). That would require an incoming HTTP server in
  the adapter, which does not currently exist - a larger architectural extension, not a
  small addition. Documented as a possible future enhancement.
- **Write access to `zrap/net`** is not implemented - changing an actuator's WLAN
  credentials via script is risky (loss of connection, reboot required). Can be added
  if needed.
- **Scheduler (`zrap/scheduler`)** and the **zeptrionAir Smartfront services**
  (`zapi/smartfront/*`, `zapi/smartbt/*`) are not implemented, as they are not relevant
  to the shutter/hail use case. The existing `zrapGet`/`zrapPost` structure
  in `main.js` can easily be extended.
- Per the documentation, `chctrl` returns HTTP 302 without a body - redirects are
  deliberately not followed (`maxRedirects: 0`) to avoid unnecessary extra requests.
- On repeated failures for a device, the poll interval is extended up to a maximum of
  5x (simple backoff).

## Development / Tests

```bash
npm install
npm run lint
npm test              # package consistency + unit tests
npm run test:integration   # starts a real js-controller (takes longer)
```

## Changelog

### 1.0.16 (2026-09-13)

- Docs only: changed the contact email in the copyright lines from a personal address to iobroker@mailcarrier.ch. No functional changes.

### 1.0.15 (2026-09-13)

- Fix: the v1.0.14 changelog entry itself repeated the exact same mistake it was fixing - translations were a condensed summary instead of a proper full translation. Caught by running the official repochecker locally against the live repository. Expanded to proper, complete translations. Also confirmed via the same repochecker run that the E4048, W0034, and S5026 findings from v1.0.14 are now resolved. No functional code changes.

### 1.0.14 (2026-09-13)

- Docs/metadata only, no code changes: added a contact email to the copyright lines in README.md, LICENSE, and package.json's author field. Expanded the common.news translations for versions 1.0.7-1.0.13 in all 8 languages that were significantly shorter than the English original. Bumped a few devDependencies to their current recommended versions and added the release-script-plugin-manual-review plugin.

### 1.0.13 (2026-08-11)

- Fix E5606 (untranslated i18n entries): testDeviceOk was never actually translated for de/es/it/nl/pl/pt (silently kept the English copy). Also fixed the identical issue in fr, missed by the checker's exact-match heuristic due to a spacing difference. Verified with a full sweep of all 11 i18n files against the English source - no other matches found.

### 1.0.12 (2026-08-10)

- Fix a real i18n gap found during independent end-to-end testing of v1.0.11: embedded field-validation messages in the CSV import report stayed English even in the localized report. validateDeviceRow() now returns structured {key, args} entries with two explicit renderers: always-English for logs, I18n.translate() for the UI. Added 13 new i18n keys across all 11 languages. Also added the missing README_de.md to package.json's "files" allowlist - npm auto-includes README.md in every package but NOT README_de.md, so it was silently absent from the published tarball. Verified end-to-end: loaded the real I18n module directly, confirmed log output stays English regardless of active UI language across EN/DE/FR/ZH, and downloaded + extracted the real published npm tarball to confirm packaging.

### 1.0.11 (2026-08-10)

- Fix: v1.0.10 translated all onMessage() UI text to plain English only. Implemented full multi-language support instead, using the official @iobroker/adapter-core I18n module (reads system.config.common.language automatically, falls back to English for unsupported languages). Added a new i18n/ directory with all 11 required languages. ioBroker log entries remain English-only; only the admin-dialog result text is now localized. Also fixed a packaging bug: the new i18n/ folder was missing from package.json's "files" allowlist, which would have excluded it from the published npm package - caught via an actual npm pack + tarball-extraction test before pushing. Verified round-trip in German, English, and French.

### 1.0.10 (2026-08-10)

- Fix all remaining findings from the follow-up review: translated 18 German error messages in validateDeviceRow(), the 5 error-code-to-message translations in handleDeviceError(), 9 German strings in thrown Error objects, and the bonjour-service install-hint rejection message. Per explicit maintainer direction, all UI-facing result text in onMessage (CSV import report, device test results, discovery summary) is now English as well, superseding the earlier decision to keep it German for the target audience. No migration needed - none of these fixes touch persisted object common properties.

### 1.0.9 and older

Older changelog entries can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Stefan Bühler <iobroker@mailcarrier.ch>

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