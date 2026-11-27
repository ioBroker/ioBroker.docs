![Logo](admin/emby.png)
# ioBroker.emby

[![NPM version](https://img.shields.io/npm/v/iobroker.emby.svg)](https://www.npmjs.com/package/iobroker.emby)
[![Stable version](https://iobroker.live/badges/emby-stable.svg)](https://github.com/ioBroker/ioBroker.repositories)
[![Number of installations](https://iobroker.live/badges/emby-installed.svg)](https://www.iobroker.dev/adapter/iobroker-community-adapters/ioBroker.emby/statistics)
[![Downloads](https://img.shields.io/npm/dm/iobroker.emby.svg)](https://www.npmjs.com/package/iobroker.emby)
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml)
[![License](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)](https://github.com/iobroker-community-adapters/ioBroker.emby/blob/master/LICENSE)

> [!IMPORTANT]
> This adapter cannot be installed from GitHub. Install it from the adapter list in ioBroker Admin.

Connects ioBroker to your [Emby](https://emby.media) media server. You see in ioBroker what is playing on your Emby apps (TV, phone, tablet, web browser) and can control them, for example:

- show the title and poster of the current film or episode in your visualisation,
- pause the TV when the doorbell rings,
- show a message on the TV ("Someone is at the door"),
- turn the volume down at night.

## Quick start

1. **Install the adapter** from the adapter list in ioBroker Admin and create an instance.
2. **Create an API key in Emby:** open the Emby web interface, go to *Settings (gear icon) > Advanced > API Keys*, click *New API Key* (+) and enter a name, e.g. `ioBroker`. Copy the key. Without a key you can only see what is playing, but not control anything.
3. **Fill in the instance settings:**
   - *Address of the Emby server*: the IP address or host name **with port**, e.g. `192.168.0.100:8096`. You see it in the address bar of your browser when the Emby web interface is open.
   - *Secure connection (https)*: only tick it if you open Emby with `https://` (e.g. behind a reverse proxy).
   - *API key*: paste the key from step 2.
   - Save and close. The instance turns green as soon as it is connected to the server.
4. **Open an Emby app** (TV, phone, browser) and start something. Within a few seconds a folder with the name of the device appears in the object tree under `emby.0`. Emby only reports apps that are open, so every device appears the first time it is used.
5. **Use the objects** in your visualisation or scripts: what is playing is under `media`, the buttons and settings for controlling the device under `command` (see [Objects](#objects)).

Requirements: Emby Server (tested with 4.10) that ioBroker can reach, Node.js 22.19 or newer, js-controller 6.0.11 or newer, Admin 7.7.22 or newer.

## Settings

| Setting | What it does | Recommendation |
| ------------- | ------------- | ------------- |
| Address of the Emby server | IP address or host name of the Emby server with port | e.g. `192.168.0.100:8096` |
| Secure connection (https) | Connects with https instead of http | Only if you open Emby with `https://` |
| API key | Allows ioBroker to control your Emby apps. Stored encrypted. | Always enter one |
| Devices to ignore | Devices that should not be shown in ioBroker, separated by commas. Enter the folder name under `emby.0` (or the value of `info.deviceId`). Folders already created can then be deleted in the object tree. | Leave empty |
| Delay before "paused" / "idle" | When playback stops, `media.state` waits this long before it changes. Between two episodes the state then stays `playing` instead of flickering. | 500 ms; increase (e.g. 3000) if the state still flickers between episodes |
| Update interval | How often ioBroker asks the server for the current state of all devices. Emby reports changes immediately anyway; this keeps `info.lastActivity` up to date and is needed for the automatic cleanup. | 60 s |
| Remove devices deleted in Emby | If you delete a device in Emby (*Settings > Devices*), its folder in ioBroker is removed too. | On |
| Remove inactive devices after (days) | Removes the folders of devices that have not been used for this many days, e.g. old phones or browsers. Scripts and history settings on these objects are lost. | 0 (never); e.g. 90 if many old devices pile up |

## Devices in ioBroker

Every Emby app gets its own folder under `emby.0`. The folder name is derived from the device ID that Emby assigns to the app, so it stays the same after restarts and reconnects. The display name of the folder is the device name in Emby; you can change it in Emby under *Settings > Devices*.

- Several browser tabs with Emby count as one device.
- Devices that are switched off keep their folder with `info.online = false`, so scripts and visualisations keep working. They are removed as described in [Settings](#settings) or can be deleted by hand.
- Long device IDs (e.g. of web browsers) are shortened to a 16-character code.

### Upgrade from 2.x to 3.0.0

Up to version 2.x the folder names were the Emby session IDs, which change when an app reconnects. From 3.0.0 on they are derived from the device ID. Existing objects are moved automatically on the first start (version 2.x) or as soon as the app is used again (version 1.3.0), including values, history settings and room/function assignments. Scripts, visualisations and aliases that use the old IDs have to be adjusted; the log shows `Migrated objects of "…" from <old id> to <new id>` for every device. History data already recorded stays under the old IDs.

## Objects

The tables are a reference for scripts and visualisations. `x` stands for the folder of a device.

### Adapter

| Object | Description |
| ------------- | ------------- |
| info.connection | `true` while ioBroker is connected to the Emby server |
| server.name | Name of the Emby server |
| server.version | Version of the Emby server |
| server.updateAvailable | `true` if a server update is available |
| server.restartPending | `true` if the server has to be restarted (e.g. after a plugin update) |
| server.refreshLibrary | Button: scans all libraries |

The server states are read every 10 minutes and need the API key.

### Info

| Object | Description | Info |
| ------------- | ------------- | ------------- |
| x.info.online | Session is currently reported by the server | `false` after the client was closed or switched off |
| x.info.deviceId | Emby device ID of the client | |
| x.info.sessionId | Current Emby session ID | Changes when the client reconnects |
| x.info.deviceName | Name of the device |  |
| x.info.userName | Name of the user logged in on the device |  |
| x.info.supportedCommands | Commands supported by the client (JSON array) |  |
| x.info.lastActivity | Time of the last activity reported by the server | Timestamp (ms). Emby keeps sessions of closed clients for a while, so this shows whether a client is really in use |

### Media

| Object | Description | Info |
| ------------- | ------------- | ------------- |
| x.media.state | State of the client | `playing`, `paused`, `idle` |
| x.media.title | Title of the item |  |
| x.media.originaltitle | Original title |  |
| x.media.description | Description of the item |  |
| x.media.type | Type of the item | `Episode`, `Movie`, `Audio`, `None`, … |
| x.media.seriesName | Name of the series | Only for episodes, otherwise empty |
| x.media.seasonName | Name of the season | Only for episodes, otherwise empty |
| x.media.endtime | Expected end of playback | `HH:MM` |
| x.media.elapsed | Playback position in seconds | `null` if unknown. Emby reports the position only on changes (start, pause, seek) and with the session poll |
| x.media.duration | Duration of the item in seconds | `null` if unknown |
| x.media.rating | Community rating | `null` if unknown |
| x.media.agerating | Official age rating |  |
| x.media.year | Production year | `null` if unknown |
| x.media.genres | Genres (comma separated) |  |
| x.media.tags | Taglines (comma separated) |  |
| x.media.backdropimage | Backdrop image tags (comma separated) |  |
| x.media.ratio | Aspect ratio of the primary image | `null` if unknown |
| x.media.isMuted | Client is muted | Not all clients report this |

### Posters

| Object | Description | Info |
| ------------- | ------------- | ------------- |
| x.posters.main | URL of the main poster (movie or series) |  |
| x.posters.season | URL of the season poster | Only for episodes |
| x.posters.episode | URL of the episode image | Only for episodes |

### Commands

Only created for clients that support remote control, and only for commands the client reports.

| Object | Description | Info |
| ------------- | ------------- | ------------- |
| x.command.play | Resume playback | Button |
| x.command.pause | Pause playback | Button |
| x.command.toggleplay | Toggle play/pause | Button |
| x.command.stop | Stop playback | Button |
| x.command.next | Next item (episode, track) | Button |
| x.command.previous | Previous item | Button. The iOS app goes back reliably only after the item has played for a few minutes (see [Tested clients](#tested-clients)) |
| x.command.seek | Playback position in % | Also shows the current position; write a value 0-100 to jump there |
| x.command.generalCommand | Send any general command of the Emby API | JSON, e.g. `{"Name": "SetSubtitleStreamIndex", "Arguments": {"Index": 2}}`. The names the client supports are in `info.supportedCommands` |
| x.command.mute | Mute | Button |
| x.command.unmute | Unmute | Button |
| x.command.togglemute | Toggle mute | Button |
| x.command.goHome | Go to the home screen | Button |
| x.command.goToSearch | Open the search | Button |
| x.command.back | Navigate back | Button |
| x.command.volume | Volume 0-100 | Also shows the current volume reported by the client. The Android TV apps do not change the volume (see [Tested clients](#tested-clients)) |
| x.command.message | Show a short message | Text. The apps show it only for about 2-3 seconds. For important messages use `command.dialog` |
| x.command.dialog | Show a dialog that stays until it is closed | `Header\|Text`, without `\|` the header is "ioBroker" |

## Messages from scripts (sendTo)

Shows a message on a client, e.g. when the doorbell rings:

```js
sendTo('emby.0', 'message', {
    text: 'Someone is at the door',
    header: 'Doorbell', // optional, default "ioBroker"
    timeoutMs: 10000, // optional; without it the message stays until it is closed (recommended)
    device: 'Living room TV', // optional: device name, object ID, device ID or session ID; without it all connected clients that can show messages
}, result => log(JSON.stringify(result))); // { result: 'ok', sent: ['<object id>', ...] } or { error: '...' }
```

A plain string is accepted too: `sendTo('emby.0', 'message', 'Hello')`.

How long a message stays is decided by the app: with `timeoutMs` all tested apps showed it only for about 2-3 seconds, whatever the value. Without `timeoutMs` the message stays until it is closed (in the web client as a popup). For a doorbell, leave out `timeoutMs`.

## Tested clients

The adapter sends the same commands to every client; what happens depends on the Emby app. Tested with Emby Server 4.10.2:

| | Web client (Firefox) | Android phone | iPad (iOS) | Android TV (NVIDIA Shield, Fire TV) |
| --- | --- | --- | --- | --- |
| Play, pause, stop, seek, next | ✓ | ✓ | ✓ | ✓ |
| Previous | ✓ | ✓ | only after a few minutes of playback, otherwise the app restarts the item or skips forward | ✓ (tested after a few minutes of playback) |
| Volume, mute | ✓ | ✓ | ✓ | – (no effect) |
| Message with display time (`command.message`, `timeoutMs`) | about 2-3 s | about 2-3 s | about 2-3 s | about 2-3 s |
| Dialog (`command.dialog`, message without `timeoutMs`) | ✓ (popup) | ✓ | ✓ | ✓ |

Web browsers may block playback that is started without a click in the tab (autoplay).

## Problems?

| Problem | Solution |
| ------------- | ------------- |
| The instance stays red / yellow | Check the address and port (open `http://<address>` in a browser on the same network) and the *Secure connection* setting. The log of the instance shows the reason. |
| No device appears | Emby only reports apps that are open. Open an Emby app or the web interface and start something. Check that the device is not in *Devices to ignore*. |
| There is no `command` folder / buttons do nothing | Enter an API key. Some apps do not support remote control at all; the commands an app supports are listed in `info.supportedCommands`. |
| Volume and mute have no effect on the TV | The Emby apps for Android TV (NVIDIA Shield, Fire TV) ignore these commands, see [Tested clients](#tested-clients). |
| A message disappears after 2-3 seconds | That is decided by the app. Use `command.dialog` or `sendTo` without `timeoutMs`, see [Messages from scripts](#messages-from-scripts-sendto). |
| `media.state` jumps to `idle` between two episodes | Increase *Delay before "paused" / "idle"*. |
| Old devices pile up | Delete them in Emby (*Settings > Devices*) or set *Remove inactive devices after (days)*. |

## Credits

This adapter would not have been possible without the great work of @thewhobox <iobroker@mikegerst.de>, who wrote the initial versions of this adapter and donated it to the iobroker-community-adapters organization.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 3.1.2 (2026-11-17)
- (Schimi1983) Repository checker suggestions: @iobroker/testing updated to 6.3.2, .vscode/settings.json with JSON schemas added
- (Schimi1983) README rewritten for users without technical background (quick start, settings with recommendations, problem solving); texts of the settings page made clearer in all languages

### 3.1.1 (2026-11-04)
- (Schimi1983) Roles of existing states corrected to the official ioBroker state roles (e.g. button.play, media.genre, media.cover, text); object IDs and values are unchanged

### 3.1.0 (2026-11-03)
- (GermanBluefox) Repository maintenance: added email to copyright line in README and LICENSE (#330)
- (Schimi1983) New commands stop, next, previous, seek (in %) and generalCommand; new states media.elapsed and media.duration
- (Schimi1983) New server states (name, version, update available, restart pending) and button to scan all libraries
- (Schimi1983) Messages can be sent from scripts with sendTo('emby.0', 'message', {...})

### 3.0.0 (2026-10-29)
- (Schimi1983) **BREAKING:** Clients are identified by the Emby device ID instead of the session ID, so the object IDs no longer change when a client reconnects. Existing objects including values, history settings and room/function assignments are migrated automatically; scripts and visualisations using the old IDs have to be adjusted (see README)
- (Schimi1983) New states info.deviceId and info.sessionId; several sessions of one client (e.g. browser tabs) are shown as one device
- (Schimi1983) Objects that older versions created for ioBroker connections (other instances, version 1.3.0) are removed and no longer created
- (Schimi1983) Integration test against a mock Emby server added

### 2.0.0 (2026-10-29)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (Schimi1983) Connection is re-established after the server closes it (e.g. server restart), KeepAlive is sent, info.connection reflects the real state
- (Schimi1983) Only "Sessions" messages are processed as sessions, invalid messages no longer cause errors
- (Schimi1983) Fixed command.volume (always failed), command.unmute is created for clients reporting "Unmute"
- (Schimi1983) Messages and dialogs with quotes or line breaks work now
- (Schimi1983) Commands use https if SSL is enabled, API key is sent as header and no longer logged
- (Schimi1983) API key is stored encrypted, an existing key is converted automatically (one restart)
- (Schimi1983) New states info.online and info.lastActivity per session; sessions that disappear are reset to idle
- (Schimi1983) Current sessions are read via REST right after connecting, the server pushes them only on the next change
- (Schimi1983) Sessions are polled every 60 s (configurable) to keep info.lastActivity current
- (Schimi1983) Optional cleanup: objects of clients deleted in Emby (default on) or inactive for a configurable number of days (default off) are removed
- (Schimi1983) Object types of buttons fixed, empty numbers are written as null, states are only written on change
- (Schimi1983) Dependencies "request" and "websocket" replaced by native fetch and WebSocket
- (Schimi1983) API key is entered in a password field
- (Schimi1983) The adapter no longer shows up as its own device, it connects with a device ID per instance
- (Schimi1983) Objects of an old session are removed when the same client connects with a new session ID
- (Schimi1983) Command states are created as soon as a client reports remote control support, not only on adapter start
- (Schimi1983) Device names follow the display name set in the Emby dashboard; REST calls use the adapter's device ID so they do not appear as an extra client
- (Schimi1983) README updated: configuration, all objects, broken CodeQL badge removed
- (Schimi1983) Admin UI migrated to jsonConfig (based on #275), API key is entered in a password field, short-form i18n files
- (GermanBluefox) Dependencies updated (@iobroker/adapter-core 3.4.3)
- (GermanBluefox) Package content defined via "files" in package.json, tsconfig added for type checking
- (GermanBluefox) The adapter was refactored to TypeScript

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 thewhobox <admin@mikegerst.de>

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