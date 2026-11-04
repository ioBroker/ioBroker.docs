# ioBroker.anycubic-cloud

[![NPM version](https://img.shields.io/npm/v/iobroker.anycubic-cloud.svg)](https://www.npmjs.com/package/iobroker.anycubic-cloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.anycubic-cloud.svg)](https://www.npmjs.com/package/iobroker.anycubic-cloud)
[![Test and Release](https://github.com/hwiedermann/ioBroker.anycubic-cloud/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/hwiedermann/ioBroker.anycubic-cloud/actions/workflows/test-and-release.yml)

[Deutsche Anleitung](docs/de/README.md)

## Description

Reads the status of Anycubic 3D printers and the ACE Pro filament box from the Anycubic cloud: print job,
temperatures, fans, ACE slots and the filament used per slot. The adapter is read-only and sends no
commands to the printer.

Tested with a [Kobra S1](https://www.anycubic.com/products/kobra-s1-combo) and ACE 2 Pro, manufacturer: [Anycubic](https://www.anycubic.com). Other models that work with the Anycubic app should work as well;
feedback is welcome.

> [!WARNING]
> Unofficial. Anycubic has no public API. The adapter uses the same cloud requests as Anycubic Slicer Next
> and loads the app credentials and certificates from the open source project
> [anycubic-cloud-api](https://pypi.org/project/anycubic-cloud-api/) at runtime. If Anycubic changes its
> cloud, the adapter may stop working.

The printer must be connected to the Anycubic cloud. In LAN-only mode it is not reachable.

## Installation

The adapter is not in the ioBroker repository yet. Install it from npm:

```bash
iobroker url iobroker.anycubic-cloud
```

Requirements: Node.js 22.19 or newer, js-controller 6.0.11 or newer, Admin 7.6.20 or newer.

## Configuration

| Setting | Description |
| --- | --- |
| Slicer token | Access token of Anycubic Slicer Next, see below |
| REST resync | Interval of the full resync via REST in minutes (default 10) |
| Token warning | Days before expiry when `info.tokenExpiring` is set (default 14) |

### Obtaining the token

Anycubic offers no API login with username and password. The adapter uses the access token that Anycubic
Slicer Next stores after you log in. It is valid for about 90 days.

On Windows the script [`tools/get-token.ps1`](https://github.com/hwiedermann/ioBroker.anycubic-cloud/blob/main/tools/get-token.ps1)
does the work. It is not part of the npm package, download it from GitHub.

1. Start Anycubic Slicer Next and log in.
2. Run `powershell -ExecutionPolicy Bypass -File .\get-token.ps1`.
3. The script reads the slicer configuration. Newer slicer versions encrypt it; the script then asks for
   a dump file: Task Manager, tab "Details", right-click `AnycubicSlicerNext.exe`, "Create dump file".
   Run the script again, it finds the file in `%TEMP%`.
4. The token is copied to the clipboard. Paste it into the instance settings.

The script only reads files and sends nothing over the network. It is not signed, so Windows may ask
for confirmation (`Unblock-File .\get-token.ps1` or "More info, Run anyway").

Without the script: older slicer versions keep the token in plain text in
`%APPDATA%\AnycubicSlicerNext\AnycubicSlicerNext.conf` (`anycubic_cloud.access_token`). In a dump file
the token is a long string starting with `eyJ` and containing two dots.

## States

One device per printer, named by its cloud ID.

| State | Description |
| --- | --- |
| `status` | idle, downloading, checking, leveling, heating, printing, paused, resuming, finished, stopping, stopped, error |
| `online`, `busy`, `model`, `firmware`, `firmwareUpdate` | Printer info |
| `light`, `lightBrightness` | Chamber light |
| `job.*` | File, progress, remaining and elapsed time, layers, filament (mm, g, planned), start, end, pause reason |
| `temperature.*` | Nozzle and bed, current and target |
| `fan.*` | Part cooling, auxiliary and ACE fan |
| `ace.*` | Temperature, humidity, active slot, drying |
| `ace.slotN.*` | Color, material, SKU, remaining amount in %. `manual` is true for spools entered by hand without RFID; they have no remaining value. |
| `usage.last`, `usage.history` | Filament used per slot for the last print and the last 30 prints (JSON) |
| `event.finished` | true when a print has finished, false when the next one starts |
| `message.*` | Last error or notice from the printer |
| `info.tokenExpiry`, `info.tokenDaysLeft`, `info.tokenExpiring` | Token expiry |

The printer sends temperatures often only while the app or slicer is open; otherwise the values are
updated by the REST resync.
The ACE temperature and humidity are taken from MQTT only: the REST response reports fixed values for them.

### Not supported

- Controlling the printer (pause, stop, light, drying). Possible via the cloud, but not implemented yet.
- Camera images. The cloud offers only a live stream, no snapshots.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-10-31)

- (hwiedermann) Printer IDs from the cloud are restricted to letters, digits, `-` and `_`, every other character becomes `_`
- (hwiedermann) Adapter requires Node.js >= 22.19.0 now

### 0.3.6 (2026-10-27)

- (hwiedermann) Requests to the Anycubic cloud and to PyPI time out after 30 s instead of waiting indefinitely
- (hwiedermann) Printer IDs from the cloud are cleaned of forbidden characters before they are used as object IDs

### 0.3.5 (2026-10-08)

- (hwiedermann) ACE humidity no longer jumps to a fixed cloud value (e.g. 22 %) with every REST resync, only MQTT reports the real value

### 0.3.4 (2026-10-08)

- (hwiedermann) ACE temperature no longer drops to a fixed cloud value (e.g. 30 °C) with every REST resync, only MQTT reports the real value
- (hwiedermann) Printer is shown online again right after waking up from sleep (`lastWill/onlineReport` with state `online`)

### 0.3.3 (2026-10-05)

- (hwiedermann) Name and role of existing objects are updated on start, not only when a new value arrives

## License

GPL-3.0-or-later, see [LICENSE](LICENSE) and [COPYING](COPYING). Based on findings of the
[anycubic-cloud-api](https://pypi.org/project/anycubic-cloud-api/) project (GPL-3.0).

Copyright (c) 2026 Hendrik <iobroker@hwiedermann.de>