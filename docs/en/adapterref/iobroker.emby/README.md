![Logo](admin/emby.png)
# ioBroker.emby

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.emby)](https://github.com/iobroker-community-adapters/ioBroker.emby/blob/master/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.emby.svg)](https://www.npmjs.com/package/iobroker.emby)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.emby)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/emby/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.emby)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.emby/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.emby)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.emby)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.emby.svg)](https://www.npmjs.com/package/iobroker.emby)
![Current version in stable repository](https://iobroker.live/badges/emby-stable.svg)
![Number of Installations](https://iobroker.live/badges/emby-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.emby/actions/workflows/test-and-release.yml)

## Emby adapter for ioBroker

Connects ioBroker to an [Emby](https://emby.media) media server. The adapter receives the active client sessions via WebSocket (what is playing, playback state, user) and can control clients that support remote control (play/pause, mute, volume, messages, navigation).

## Credits

This adapter would not have been possible without the great work of @thewhobox <iobroker@mikegerst.de>, who wrote the initial versions of this adapter and donated it to the iobroker-community-adapters organization.

## Requirements

- Node.js >= 22
- js-controller >= 6.0.11, admin >= 7.7.22
- Emby Server (tested with 4.10) reachable from the ioBroker host
- An Emby API key for controlling clients (Emby dashboard > Advanced > API Keys)

## Configuration

| Setting | Description |
| ------------- | ------------- |
| IP/Domain | Address of the Emby server **with port**, e.g. `192.168.0.100:8096` |
| Connection requires SSL | Use `https`/`wss` (e.g. behind a reverse proxy) |
| API Key | Key from the Emby dashboard. Stored encrypted. Without a key the adapter only receives data and cannot control clients. |
| Session or device IDs to ignore | Comma separated list. Matches the session ID (object name below `emby.0`) or the Emby device ID. |
| Delay for pause/idle | Time in ms before `media.state` changes from `playing` to `paused`/`idle`. Prevents flickering between two episodes. |
| Poll interval for sessions | Seconds between REST queries of the sessions (default 60, 0 = off). Emby pushes only changes, the poll keeps `info.lastActivity` current and runs the cleanup. Requires the API key. |
| Remove objects of clients deleted in Emby | Default on. When a client is removed in the Emby dashboard (Devices), its objects are deleted as soon as the server no longer reports its session. |
| Remove objects of inactive clients after | Days without activity after which the objects of a client the server no longer reports are deleted (default 0 = off). Scripts and history settings on these objects are lost. |

The adapter creates a device for every session the server reports. The object ID is the Emby session ID, the object name is the device name shown in Emby (it can be changed in the Emby dashboard under Devices). Emby only reports a session while the client is connected, so open an Emby app or the web client once to see the first device.

Note: Emby assigns a new session ID when a client reconnects. The adapter then removes the objects of the old session of the same client automatically, so only one device per client remains. Scripts that use the session ID in the object path have to be adjusted in that case. Devices of clients that are not seen again are kept with `info.online = false`; they are removed when the client is deleted in the Emby dashboard or after the configured number of inactive days (see Configuration), or can be deleted manually.

## Objects

### Adapter

| Object | Description |
| ------------- | ------------- |
| info.connection | `true` while the WebSocket connection to the server is open |

### Info

| Object | Description | Info |
| ------------- | ------------- | ------------- |
| x.info.online | Session is currently reported by the server | `false` after the client was closed or switched off |
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
| x.command.mute | Mute | Button |
| x.command.unmute | Unmute | Button |
| x.command.togglemute | Toggle mute | Button |
| x.command.goHome | Go to the home screen | Button |
| x.command.goToSearch | Open the search | Button |
| x.command.back | Navigate back | Button |
| x.command.volume | Volume 0-100 | Also shows the current volume reported by the client. Many clients (e.g. TV apps) do not control the TV volume. |
| x.command.message | Show a message for 5 seconds | Text |
| x.command.dialog | Show a dialog that stays until it is closed | `Header\|Text`, without `\|` the header is "ioBroker" |

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
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

### 1.3.0 (2026-03-03)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 1.2.0 (2024-04-14)

* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.1.1 (2023-11-20)
-   (mcm1957) Dependencies have been updated.

### 1.1.0 (2023-11-20)
-   (mcm1957) Adapter requires nodejs 16 now.
-   (mcm1957) Adapter has been moved into iobroker-community-adapters oragnization.
-   (thewhobox) An error causing multiple 'undefined' messages has been fixed. [#23]
-   (mcm1957) Dependencies have been updated.

### 1.0.3
* Added more info for playing item

## License

MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2023 thewhobox

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