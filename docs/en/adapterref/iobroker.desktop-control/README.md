---
chapters: {"pages":{"en/adapterref/iobroker.desktop-control/README.md":{"title":{"en":"ioBroker.desktop-control"},"content":"en/adapterref/iobroker.desktop-control/README.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md":{"title":{"en":"Command reference"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.md"},"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md":{"title":{"en":"Befehlsreferenz"},"content":"en/adapterref/iobroker.desktop-control/docs/COMMANDS.de.md"}}}
---
![Logo](admin/desktop-control.png)
# ioBroker.desktop-control

[![NPM version](https://img.shields.io/npm/v/iobroker.desktop-control.svg)](https://www.npmjs.com/package/iobroker.desktop-control)
[![Downloads](https://img.shields.io/npm/dm/iobroker.desktop-control.svg)](https://www.npmjs.com/package/iobroker.desktop-control)
![Number of Installations](https://iobroker.live/badges/desktop-control-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/desktop-control-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.desktop-control.png?downloads=true)](https://nodei.co/npm/iobroker.desktop-control/)

**Tests:** ![Test and Release](https://github.com/ipod86/ioBroker.desktop-control/workflows/Test%20and%20Release/badge.svg)

## desktop-control adapter for ioBroker

Controls Windows PCs from ioBroker: popups, programs, audio, text-to-speech, screenshots, power, keyboard/mouse and more. On each PC runs the small **WinCtl** agent (a single exe, no installer); adapter and agent talk via **MQTT**.

The agent describes itself: it publishes all its commands, parameters and states as a manifest, and the adapter creates the data points from it. New agent commands therefore appear without an adapter update.

## Requirements

- Node.js >= 22.12, js-controller >= 6.0.11, admin >= 7.8.23
- The WinCtl agent on every PC to control: download `WinCtl.exe` from [the releases](https://github.com/ipod86/WinCtl/releases)
- Nothing else: the adapter has a built-in MQTT broker. An existing broker (Mosquitto, ioBroker MQTT adapter) can be used instead.

## Setup

1. Adapter settings: keep "Built-in broker" (port 1886 by default). Optionally set a user name and password – the agents then have to use them.
2. Start `WinCtl.exe` on the PC. In its settings enter the **IP address of the ioBroker server**, the port (1886) and the login.
3. Each PC appears as a device as soon as it connects.

### Broker: built-in or existing

Adapter and agents exchange everything through an MQTT broker. Two options:

| | Built-in broker (default) | Existing broker |
|---|---|---|
| Layout | `WinCtl.exe` → **adapter** (port 1886) | `WinCtl.exe` → broker ← adapter |
| Adapter setting | "Built-in broker", port, optional user/password | "Existing broker" + address, port and login of the broker |
| In the agent | IP of the ioBroker server, port 1886, login from the adapter | address, port and login of the broker |
| Good for | most installations – nothing else to install | Mosquitto or the ioBroker MQTT adapter already runs, ACLs/TLS wanted, or other programs should read along |

The built-in broker uses port 1886 on purpose, not 1883, so it does not clash with an existing broker or the MQTT adapter.

## Data points

### Overview

| Data point | Description |
|---|---|
| `info.connection` | Adapter connected to the MQTT broker |
| `<pc>.online` | Agent of this PC connected |
| `<pc>.lastSeen` | Time of the last message from the agent |
| `<pc>.info.*` | Information about the PC (see below) |
| `<pc>.state.*` | Values reported by the agent (see States) |
| `<pc>.event.*` | Events of the PC (see below) |
| `<pc>.cmd.*` | One data point per command (see Commands) |
| `<pc>.cmd.result` | Result of the last command, e.g. the answer of `ask` |
| `<pc>.screenshot` | Path of the last screenshot in the ioBroker file storage, e.g. `/desktop-control.0/screenshots/<pc>.jpg` |
| `<pc>.cmd.wake` | Switches the PC on via Wake-on-LAN – handled by the adapter, so it works while the PC is off |
| `all.cmd.*` | Sends a command to all PCs at once (`all.cmd.wake` wakes all PCs that are off) |

### Info (`<pc>.info.*`)

| Data point | Description |
|---|---|
| `hostname` | Computer name |
| `ip` | IP address |
| `version` | Version of the agent |
| `os` | Windows version |
| `user` | Logged-in user |
| `started` | Start time of the agent |
| `mac` | MAC address of the network card (for Wake-on-LAN) |
| `apps` | Program aliases the agent may start (JSON list) |

### Events (`<pc>.event.*`)

Written on every event (also when the content is the same), so a trigger with `change: 'any'` fires every time. The value is JSON, e.g. `{"ts":"2026-10-23T12:00:00Z"}`.

| Data point | When |
|---|---|
| `lock` / `unlock` | Screen locked / unlocked |
| `logon` / `logoff` | User logged on / off |
| `remote_connect` / `remote_disconnect` | Remote desktop session connected / disconnected |
| `suspend` / `resume` | PC goes to standby / wakes up |
| `hotkey` | A hotkey from the agent settings was pressed: `{"name":"szene_kino","keys":"ctrl+alt+1"}` |

### Commands (`<pc>.cmd.*`)

- **Button:** commands without options – click to run.
- **Button + `_json` input:** commands whose options are all optional (e.g. `screenshot`, `mute`, `beep`): the button runs with the defaults, `cmd.<command>_json` takes the options.
- **Input:** commands with a required option. Write one of:
  - the **short form**: just the value of the main option, e.g. `Hello` into `cmd.speak`
  - **JSON** with any options, e.g. `{"text":"Hello","rate":2}`
  - `true` – runs the command with its default options
- The object description of every command data point lists its options and an example.
- The result appears in `<pc>.cmd.result`.
- Security relevant commands (e.g. `shell`) and commands switched off in the agent get no data point; they can only be sent via `sendTo`. `run` and `kill` get a data point as long as the agent only starts programs from its alias list ("allow any program" off); `cmd.run` offers the aliases as a selection.

<!-- generated:start -->
_Generated from the agent (agent version 0.6.4). Examples and all option descriptions: [docs/COMMANDS.md](/#/docs/adapterref/iobroker.desktop-control/docs/COMMANDS.md); the object description of each command data point lists its options and an example._

#### System

| Command | Description | Data point | Short form | Options |
|---|---|---|---|---|
| `ping` | Sign of life, answers with time and agent version | button |  |  |
| `get_state` | Publishes all state values again | button |  |  |
| `reload_config` | Reloads the agent config and reconnects | button |  |  |
| `exit` | Stops the agent | only `sendTo` |  |  |
| `list_commands` | Returns the list of all commands | button |  |  |
| `check_update` | Checks for a newer agent version (GitHub releases) | button |  |  |
| `update` | Installs the newest agent version and restarts the agent | button |  |  |

#### Power & session

| Command | Description | Data point | Short form | Options |
|---|---|---|---|---|
| `lock` | Locks the screen (Win+L) | button |  |  |
| `sleep` | Standby | button |  |  |
| `hibernate` | Hibernate | button |  |  |
| `shutdown` | Shuts the PC down | button + `shutdown_json` | `delay` | `delay`, `force` |
| `restart` | Restarts the PC | button + `restart_json` | `delay` | `delay`, `force` |
| `logoff` | Logs the user off | button |  |  |
| `cancel_shutdown` | Cancels a planned shutdown/restart | button |  |  |
| `monitor_off` | Turns the monitors off | button |  |  |
| `monitor_on` | Wakes the monitors up | button |  |  |
| `screensaver` | Starts the screen saver (the one set in Windows or a .scr file) | button + `screensaver_json` | `file` | `file` |
| `keep_awake` | Prevents standby and screen saver | button + `keep_awake_json` | `state` | `state`, `display` |

#### Programs & windows

| Command | Description | Data point | Short form | Options |
|---|---|---|---|---|
| `run` | Starts a program (alias from the agent settings) | input (alias list only) | `path` | `path`*, `args`, `workdir`, `hidden`, `window` (normal/minimized/maximized), `admin`, `wait`, `timeout` |
| `open` | Opens a URL, file or folder with the default app | input | `target` | `target`* |
| `kill` | Ends processes by name or PID | input (alias list only) | `name` | `name`, `pid` |
| `list_processes` | Lists running processes | input | `filter` | `filter` |
| `list_windows` | Lists visible windows | button |  |  |
| `focus_window` | Brings a window to the front (title contains …) | input | `title` | `title`* |
| `close_window` | Closes a window (title contains …) | input | `title` | `title`* |
| `minimize_all` | Minimizes all windows (show desktop) or restores them | button + `minimize_all_json` |  | `undo` |
| `empty_recycle_bin` | Empties the recycle bin | button |  |  |
| `shell` | Runs a PowerShell/cmd command and returns the output | only `sendTo` | `command` | `command`*, `shell` (powershell/cmd), `timeout` |

#### Audio

| Command | Description | Data point | Short form | Options |
|---|---|---|---|---|
| `volume` | Sets the master volume (0-100) | input | `level` | `level`* |
| `volume_change` | Changes the volume relatively | button + `volume_change_json` | `delta` | `delta` |
| `mute` | Mute / unmute / toggle | button + `mute_json` | `state` | `state` |
| `media` | Sends a media key | input | `key` | `key`* (playpause/next/prev/stop/volume_up/volume_down/mute) |
| `speak` | Text to speech | input | `text` | `text`*, `voice`, `rate`, `volume`, `wait`, `interrupt` |
| `list_voices` | Lists the installed voices | button |  |  |
| `play_sound` | Plays an audio file (mp3/wav/wma, path or URL) | input | `source` | `source`*, `wait` |
| `stop_sound` | Stops play_sound / speak | button |  |  |
| `beep` | Simple beep | button + `beep_json` |  | `freq`, `ms` |

#### Display

| Command | Description | Data point | Short form | Options |
|---|---|---|---|---|
| `show_image` | Shows an image as popup, full screen or in a corner | input | `source` | `source`*, `base64`, `fit` (contain/stretch/center), `mode` (popup/fullscreen/corner), `seconds`, `monitor`, `position` (top-left/top/top-right/left/center/right/bottom-left/bottom/bottom-right), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg` |
| `show_video` | Plays a video with Edge/Chromium (mp4, WebM, …) | input | `source` | `source`*, `loop`, `muted`, `volume`, `controls`, `close_when_done`, `engine` (auto/edge/ie), `mode` (popup/fullscreen/corner), `seconds`, `monitor`, `position` (top-left/top/top-right/left/center/right/bottom-left/bottom/bottom-right), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg` |
| `show_web` | Shows a web page (vis, Lovelace, camera stream) with Edge/Chromium in a window or full screen, also several pages in turn (slideshow) | input | `url` | `url`, `urls`, `interval`, `zoom`, `engine` (auto/edge/ie), `mode` (popup/fullscreen/corner), `seconds`, `monitor`, `position` (top-left/top/top-right/left/center/right/bottom-left/bottom/bottom-right), `size`, `margin`, `border`, `border_color`, `caption_size`, `caption_color`, `caption`, `slot`, `click_close`, `opacity`, `activate`, `bg` |
| `show_text` | Shows text as an overlay | input | `text` | `text`*, `seconds`, `size`, `color`, `bg`, `opacity`, `position` (top/center/bottom), `monitor`, `bold`, `font`, `click_through`, `slot`, `max_width`, `padding`, `margin` |
| `ask` | Shows a dialog with buttons/input and returns the answer | input | `text` | `text`*, `title`, `buttons`, `input`, `default`, `password`, `timeout`, `width`, `font_size`, `monitor` |
| `notify` | Shows a Windows notification | input | `text` | `text`*, `title`, `icon` (info/warning/error/none), `seconds` |
| `close_popups` | Closes all popups, overlays and dialogs | button |  |  |
| `screenshot` | Takes a screenshot (stored in the ioBroker file storage) | button + `screenshot_json` |  | `monitor`, `scale`, `quality`, `format` (jpeg/png), `inline` |
| `set_wallpaper` | Sets the desktop wallpaper | input | `source` | `source`* |
| `brightness` | Sets the brightness (internal laptop displays only) | input | `level` | `level`* |

#### Input

| Command | Description | Data point | Short form | Options |
|---|---|---|---|---|
| `start_menu` | Opens or closes the start menu (Windows key) | button |  |  |
| `send_keys` | Sends key presses (SendKeys syntax) | input | `keys` | `keys`* |
| `type_text` | Types text into the active window | input | `text` | `text`* |
| `mouse` | Moves/clicks the mouse | button + `mouse_json` |  | `x`, `y`, `relative`, `click` (none/single/double), `button` (left/right/middle), `wheel` |
| `clipboard_set` | Sets the clipboard text | input | `text` | `text`* |
| `clipboard_get` | Reads the clipboard text | button |  |  |

\* = required

### States (`<pc>.state.*`)

| Data point | Type | Unit | Writable | Description |
|---|---|---|---|---|
| `state.locked` | boolean |  |  | Screen locked |
| `state.user_present` | boolean |  |  | User active (not locked and input within the idle threshold) |
| `state.idle` | number | s |  | Seconds since the last mouse/keyboard input |
| `state.active_window` | string |  |  | Title of the active window |
| `state.active_process` | string |  |  | Process of the active window |
| `state.volume` | number | % | yes | Master volume |
| `state.muted` | boolean |  | yes | Muted |
| `state.cpu` | number | % |  | CPU load |
| `state.ram` | number | % |  | RAM usage |
| `state.ram_free_gb` | number | GB |  | Free memory |
| `state.uptime_min` | number | min |  | Time since Windows start |
| `state.battery` | number | % |  | Battery level (devices with battery only) |
| `state.charging` | boolean |  |  | Power supply connected (devices with battery only) |
| `state.monitors` | number |  |  | Number of monitors |
| `state.ip` | string |  |  | Local IPv4 address |
| `state.user` | string |  |  | Logged-in user |
| `state.keep_awake` | boolean |  | yes | keep_awake active |
| `state.webcam_in_use` | boolean |  |  | Camera in use (e.g. video call) |
| `state.webcam_app` | string |  |  | Program(s) using the camera |
| `state.mic_in_use` | boolean |  |  | Microphone in use |
| `state.mic_app` | string |  |  | Program(s) using the microphone |
| `state.web_url` | string |  |  | Page that show_web currently displays (empty = none) |
| `state.update_available` | boolean |  |  | Newer agent version available (checked at start and every 12 h) |
| `state.latest_version` | string |  |  | Newest agent version on GitHub |
| `state.disk.<drive>_free_gb` | number | GB |  | Free space per drive, e.g. `disk.C_free_gb` |
| `state.disk.<drive>_used_percent` | number | % |  | Usage per drive, e.g. `disk.C_used_percent` |
| `state.proc.<name>` | boolean |  |  | Watched program is running (agent settings "Processes") |
<!-- generated:end -->

## Scripts (sendTo)

```js
// command to one PC (device id or host name), the answer is the result of the agent
sendTo('desktop-control.0', 'cmd', { device: 'office-pc', command: 'speak', params: { text: 'Dinner is ready' } }, res => log(JSON.stringify(res)));

// short form for the main parameter
sendTo('desktop-control.0', 'cmd', { device: 'office-pc', command: 'volume', params: 30 });

// question with buttons, waits for the answer (ask timeout from the settings)
sendTo('desktop-control.0', 'cmd', {
    device: 'living-room',
    command: 'ask',
    params: { text: 'Start movie mode?', buttons: ['Yes', 'No'], timeout: 30 },
}, res => log(res.result && res.result.button));

// all PCs, list of devices
sendTo('desktop-control.0', 'cmd', { device: 'all', command: 'lock' });
sendTo('desktop-control.0', 'devices', {}, list => log(JSON.stringify(list)));
```

The answer has the form `{ ok, command, result, error }`.

## Wake-on-LAN

The agent reports the MAC address of its network card; the adapter keeps it, so `cmd.wake` also works after a restart while the PC is off. Requirements: Wake-on-LAN enabled in the BIOS/UEFI and in the network card settings (Device Manager → network card → Power Management / Advanced), PC connected by cable, ioBroker in the same network. Windows "Fast startup" can prevent waking from shutdown – switch it off if needed.

## Updating the agent

The agent checks GitHub for a new version at start and every 12 hours (can be switched off in the agent settings, first tab after the connection). It **does not install by itself**, it only reports:

- `<pc>.state.update_available` – `true` when a newer version exists
- `<pc>.state.latest_version` – newest version on GitHub; the installed one is in `<pc>.info.version`

Installing:

- **from ioBroker:** button `<pc>.cmd.update` – downloads the new exe, checks the checksum, swaps it and restarts the agent. After a few seconds the PC is online again with the new version in `info.version`.
- **on the PC:** tray icon → menu entry to check for updates – shows the changes and asks whether to install.
- `<pc>.cmd.check_update` checks right away without installing.

Automatically with a script:

```js
on({ id: /^desktop-control\.0\.[^.]+\.state\.update_available$/, val: true }, obj => {
    setState(obj.id.replace('state.update_available', 'cmd.update'), true);
});
```

Requirement: the exe is in a folder the user can write to (e.g. `C:\Tools\WinCtl` or Downloads, not `C:\Program Files`).

## Security

Whoever may write to `winctl/+/cmd/#` controls the PC. Secure the broker with user/password and ACLs, use TLS if needed. By default the agent only starts programs from its alias list and `shell` is off.

**Built-in broker:** it listens on all network interfaces (`0.0.0.0`) and, as long as no user name is set, accepts every client – any device in the LAN could then send commands to the PCs or fake agent data. Setting a user name and password in the adapter settings is recommended (the agents then log in with them); alternatively limit "Listen on" to one network interface. Without a login the adapter logs a warning at startup.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.2 (2026-11-12)
* (ipod86) timeouts are checked in code (invalid values use the default)
* (ipod86) object ids that differ only in case from existing ones are not created (warning in the log)
* (ipod86) security hint and startup warning for the built-in broker without login
* (ipod86) role `media.mute` is kept; manifest states without a command stay read-only
* (ipod86) English documentation (docs/COMMANDS.md, docs/PROTOCOL.md)

### 0.1.1 (2026-10-25)
* (ipod86) release published by the GitHub workflow (trusted publishing); news only for versions on npm; normalized repository URL

### 0.1.0 (2026-10-25)
* (ipod86) first public release: controls Windows PCs via the WinCtl agent over MQTT – built-in MQTT broker, popups, images, videos and web pages (Microsoft Edge), programs, audio and text-to-speech, screenshots, power, keyboard/mouse, Wake-on-LAN, camera/microphone in use, agent update from ioBroker

Older changelogs are available in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

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