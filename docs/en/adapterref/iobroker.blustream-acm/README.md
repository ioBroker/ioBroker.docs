# ioBroker.blustream-acm

[![NPM version](https://img.shields.io/npm/v/iobroker.blustream-acm.svg)](https://www.npmjs.com/package/iobroker.blustream-acm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.blustream-acm.svg)](https://www.npmjs.com/package/iobroker.blustream-acm)
![Number of Installations](https://iobroker.live/badges/blustream-acm-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/blustream-acm-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.blustream-acm.png?downloads=true)](https://nodei.co/npm/iobroker.blustream-acm/)

**Tests:** ![Test and Release](https://github.com/AlanSRU/ioBroker.blustream-acm/workflows/Test%20and%20Release/badge.svg)

## Blustream ACM Matrix Controller for ioBroker

Controls Blustream ACM advanced control modules for HDMI-over-IP audio/video distribution. Discovers connected transmitters and receivers via the controller's telnet interface and exposes routing/status states for each. The available commands and states depend on the controller model, which you select in the adapter configuration.

> **Renamed from `iobroker.blustream-acm200`.** This adapter now supports several ACM models, so it is no longer tied to the ACM200 name. Existing `blustream-acm200.0` installs must be reconfigured under the new `blustream-acm.0` namespace.

### Supported hardware

- **ACM200** — [Blustream ACM200](https://www.blustream.com/product/acm200/) (routing + transmitter audio source)
- **ACM210** — routing, breakaway (IR/RS232/USB/CEC), output power/mute, Dante audio matrix + ARC
- **ACM500** — routing, breakaway, output power/mute
- **ACM1000** — routing, breakaway, output power/mute, Dante audio matrix + ARC
- **Manufacturer:** [Blustream](https://www.blustream.com/)

This adapter is not affiliated with or endorsed by Blustream; all trademarks belong to their respective owners.

## Features

- Automatic discovery of connected transmitters and receivers
- Model-aware capabilities — the adapter only creates states and accepts commands the selected model supports
- Video/audio routing control (combined and independent per stream)
- Breakaway routing of IR / RS232 / USB / CEC streams (ACM210/500/1000)
- Output power and mute control (ACM210/500/1000)
- Dante/analogue/HDMI audio matrix and ARC control (ACM210/1000)
- Transmitter audio source selection (HDMI / ANA)
- "Route to all displays" commands (audio+video, video only, audio only)
- Status monitoring for all devices
- Preview image URLs (served by the controller's built-in capture endpoint)

## Installation

Install the adapter from the ioBroker admin interface (Adapters → search for "blustream").

## Configuration

### Main Settings

- **Controller Model**: Select your ACM controller model (ACM200 / ACM210 / ACM500 / ACM1000). This determines which commands and states are available.
- **IP Address**: IP address of your ACM controller (default: 192.168.0.225)
- **Port**: Telnet port (default: 23)

### Advanced Settings

- **Polling Interval (ms)**: How often to poll for status updates (default: 30000). Must be at least twice the command timeout so each poll can finish before the next one starts — lower values are raised automatically and a warning is written to the log.
- **Command Timeout (ms)**: Timeout for a single command sent to the controller (default: 10000, minimum 1000). Raise it if a large system reports command timeouts in the log.

## States

States marked _(model)_ are only created when the selected controller model supports the capability.

### System

- `info.connection` — Connection status to the controller
- `system.status.connected` — Same as info.connection (legacy)
- `system.status.lastUpdate` — Timestamp of the last status update
- `system.status.nextScheduledRefresh` — When the next nightly full refresh will run
- `system.status.lastFullRefresh` — Timestamp of the last full refresh
- `system.status.fullRefreshRunning` — True while a full refresh is in progress
- `system.commands.routeAll` — Write a transmitter ID to route audio + video to all displays
- `system.commands.routeAllVideo` — Write a transmitter ID to route video only to all displays
- `system.commands.routeAllAudio` — Write a transmitter ID to route audio only to all displays

#### Refresh commands

The two refresh buttons do different amounts of work:

- `system.commands.refresh` — sends one `STATUS` query, the same one used by regular polling. Updates routes, names and online state for every device in a single command. Cheap; use this after changing something outside ioBroker.
- `system.commands.refreshAll` — queries `IN<id>` / `OUT<id>` for every known device, which fills in the per-device details `STATUS` does not report (firmware version, MAC, output mode, breakaway routes). Sends one command per device, so it takes noticeably longer. It also runs automatically once a night, at a random time between 02:45 and 03:15 so that multiple instances do not all poll at the same moment.

### Transmitters (per transmitter)

- `transmitters.<id>.id` — Transmitter ID
- `transmitters.<id>.name` — Display name
- `transmitters.<id>.ip` — IP address
- `transmitters.<id>.connected` — Connection status
- `transmitters.<id>.edid` — EDID setting
- `transmitters.<id>.audioSource` — Audio source selection (HDMI/ANA)
- `transmitters.<id>.audioMatrixMode` — _(ACM210/1000)_ Input-side audio matrix path (HDMI/Analogue/Dante)
- `transmitters.<id>.previewUrl` — URL to preview image (if preview service is enabled)

### Receivers (per receiver)

- `receivers.<id>.id` — Receiver ID
- `receivers.<id>.name` — Display name
- `receivers.<id>.ip` — IP address
- `receivers.<id>.connected` — Connection status
- `receivers.<id>.route` — Combined audio+video route (write a transmitter ID)
- `receivers.<id>.videoRoute` — Video-only route
- `receivers.<id>.audioRoute` — Audio-only route
- `receivers.<id>.irRoute` / `.rs232Route` / `.usbRoute` / `.cecRoute` — _(ACM210/500/1000)_ Breakaway routes (write a transmitter ID)
- `receivers.<id>.power` — _(ACM210/500/1000)_ Output power on/off
- `receivers.<id>.mute` — _(ACM210/500/1000)_ Output mute on/off
- `receivers.<id>.audioOutputMode` — _(ACM210/1000)_ Output-side audio matrix path
- `receivers.<id>.arcMode` — _(ACM210/1000)_ ARC mode (Off/HDMI/Optical)
- `receivers.<id>.resolution` — Output resolution
- `receivers.<id>.previewUrl` — URL to preview image

## Usage examples

Route transmitter 2 to receiver 1:

```javascript
setState('blustream-acm.0.receivers.001.route', '002');
```

Route transmitter 3 to all receivers:

```javascript
setState('blustream-acm.0.system.commands.routeAll', '003');
```

## Troubleshooting

- If the adapter cannot connect, verify the IP address, port, and that the controller's telnet interface is enabled.
- Make sure the configured **Controller Model** matches your hardware — the wrong model may send commands your device does not understand or hide states it does support.
- If transmitters or receivers are missing after start-up, trigger a refresh via `system.commands.refresh`.
- Enable debug logging in Admin → instance → log level to see telnet traffic.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.3.2 (2026-08-07)
- (Alan Paris) Fixed: the adapter stopped retrying for good if the controller was unreachable at start or when a cable was pulled
- (Alan Paris) Fixed: a command timing out while queued removed the wrong queue entry
- (Alan Paris) Command Timeout now applies to all commands, not just the handshake; default raised 5000 to 10000 ms
- (Alan Paris) Routing writes are validated; a non-numeric transmitter id is rejected instead of sent to the controller
- (Alan Paris) The nightly full refresh is now spread over 02:45-03:15 instead of firing at exactly 03:00
- (Alan Paris) Polling interval is floored at twice the command timeout
- (Alan Paris) Preview URLs are only rewritten when the previewed source changes
- (Alan Paris) Clarified the refresh and refreshAll button labels; existing installs are updated on start
- (Alan Paris) Corrected the Command Timeout help text in the configuration UI
- (Alan Paris) Per-device detail parsing logs at debug level instead of flooding the info log
- (Alan Paris) Receiver mode shows Matrix or Video Wall instead of the raw MX and VW tokens
- (Alan Paris) A transient object database error during a status parse no longer stops the instance

### 0.3.1 (2026-07-17)
- (Alan Paris) Object role corrections for ioBroker repository review: per-device `connected` states now use `indicator.reachable`; transmitter/receiver `id` states use the `text` role
- (Alan Paris) Remove a stale command-timeout comment

### 0.3.0 (2026-07-17)
- (Alan Paris) Renamed adapter from `blustream-acm200` to `blustream-acm` to reflect multi-model support
- (Alan Paris) Added a Controller Model setting (ACM200 / ACM210 / ACM500 / ACM1000); states and commands are now model-aware
- (Alan Paris) Added breakaway routing (IR/RS232/USB/CEC) and output power/mute for ACM210/500/1000
- (Alan Paris) Added Dante/analogue/HDMI audio matrix and ARC control for ACM210/1000
- (Alan Paris) Preview image URLs now use the configured controller host instead of a hardcoded address

### 0.2.4 (2026-07-03)
- (Alan Paris) Remove unused username/password settings — the ACM200 telnet interface requires no login
- (Alan Paris) Transmitter/receiver name states are now read-only (they are reported by the device and cannot be set from the adapter)
- (Alan Paris) Validate and clamp polling interval and command timeout to safe ranges
- (Alan Paris) Add Blustream product/manufacturer links to the documentation

### 0.2.3 (2026-07-03)
- (Alan Paris) Resolve adapter-checker errors: use framework-managed timers, add missing config help translations, and clean up redundant devDependencies

**Older changes have been moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)**

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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
