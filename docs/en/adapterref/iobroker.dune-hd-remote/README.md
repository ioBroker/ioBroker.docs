# ioBroker.dune-hd-remote

![Logo](admin/dune-hd-remote.png)

Control [Dune HD](https://dune-hd.com/) media players via IP network from ioBroker.

[Dune HD](https://dune-hd.com/) produces high-quality network media players supporting 4K HDR playback, Blu-ray, and a wide range of media formats. All Linux-based Dune HD players support IP control via HTTP API, which this adapter uses to provide full remote control from ioBroker.

## Features

- Full playback control (play, pause, stop, seek, prev/next, fast-forward/rewind)
- Navigation (D-pad, enter, return, menus)
- Volume and mute control
- Status polling (player state, position, duration, volume, bitrate, audio language, video resolution)
- Built-in PWA web remote — use your phone as a remote control
- Smart offline polling — reduces poll frequency when player is unreachable
- PWA text input — send text directly to the player's on-screen keyboard
- PWA Play URL — start media playback from any URL directly from the remote

## Supported Models

All Dune HD media players with IP control support (Linux-based firmware).  
Tested on: **Dune HD Pro 4K** (firmware with XML response format).

| Model type | Default port |
|---|---|
| Linux-based (Pro 4K, Solo 4K, etc.) | 80 |
| Android/ATV-based | 11080 |

## Configuration

### Player
| Field | Description |
|---|---|
| Player Name | Display name (for reference only) |
| Player IP Address | IP address of the Dune HD player |
| Player Port | HTTP port (default: 80) |
| Connection Timeout | Request timeout in ms (default: 5000) |

### Status Polling
| Field | Description |
|---|---|
| Enable Status Polling | Enable periodic status updates |
| Polling Interval | Interval in seconds when player is online (default: 5) |
| Offline Polling Interval | Interval in seconds when player is unreachable (default: 30) |

### PWA Remote Control
Enable the built-in web remote to control the player from any browser or mobile device.

| Field | Description |
|---|---|
| Enable PWA Remote Control | Start the built-in web server |
| Bind IP Address | Network interface to bind to (0.0.0.0 = all interfaces) |
| PWA Server Port | Port for the web remote (default: 8765) |

After enabling, open `http://<iobroker-host>:8765/` in your browser.  
The URL is also stored in the `info.pwaUrl` state.

**PWA features:**
- Main tab: D-pad, playback controls, volume, seek
- Main tab: text input field — sends text to the active player keyboard (`set_text` API)
- Main tab: Play URL field — starts media playback from any URL (`launch_media_url` API)
- Digits tab: number keys, color buttons (A/B/C/D), subtitle, zoom, eject, REC
- Settings tab: dark/light theme, connection settings
- Works as installable PWA on iOS and Android (Add to Home Screen)

### Dune Notify Plugin

Show notifications from ioBroker **on top of the video** during playback.  
Requires the **dune-notify** PHP plugin installed on the player (see `dune-notify/` folder).

| Field | Description |
|---|---|
| Enable Notifications | Enable the dune-notify integration |
| Notify Request Timeout | HTTP request timeout in ms (default: 3000) |

## States

| State | Type | Description |
|---|---|---|
| `info.connection` | boolean | Player reachable |
| `info.pwaUrl` | string | PWA remote URL |
| `info.playerModel` | string | Player model name |
| `info.firmwareVersion` | string | Firmware version |
| `status.playerStatus` | string | playing / stopped / paused |
| `status.position` | number | Playback position (seconds) |
| `status.duration` | number | Total duration (seconds) |
| `status.volume` | number | Volume level |
| `status.mute` | boolean | Mute state |
| `status.caption` | string | Current media title |
| `status.audioLang` | string | Audio language |
| `status.videoWidth/Height` | number | Video resolution |
| `status.bitrate` | number | Current bitrate (bit/s) |
| `control.play/pause/stop` | boolean | Trigger playback actions |
| `control.volume` | number | Set volume |
| `navigation.up/down/left/right/ok/back` | boolean | Navigation buttons |
| `media.playUrl` | string | Play media from URL |
| `media.seek` | number | Seek to position (seconds) |
| `notify.send` | string | Send notification (text or JSON) |
| `notify.hide` | boolean | Hide current notification |
| `notify.lastResult` | string | Result of last notification request |

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.2.3
- Fix W0066: downgrade @types/node to >=22 <23
- Add extends clause to tsconfig.json (@tsconfig/node22)
- Add 1.2.2 changelog entry to README

### 1.2.2
- Fix W5612: add missing i18n keys for notify section (all 11 languages)
- Add prettier.config.mjs, tsconfig.json, @types/node, @tsconfig/node22
- Update devDependencies (eslint-config 2.3.4, release-script 5.2.1)
- Fix jsdoc types in lib files

### 1.2.1
- Fix E8915: add dependabot cooldown (7 days) to reduce supply chain risk
- Fix deploy step: use Node.js 24 for trusted publishing compatibility
- Remove redundant `eslint` and `prettier` devDependencies (included via `@iobroker/eslint-config`)
- Add manufacturer link and device description to README
- Add CHANGELOG_OLD.md for older changelog entries

### 1.2.0
- Add dune-notify plugin integration: show notifications on screen during playback
- New states: `notify.send`, `notify.hide`, `notify.lastResult`
- New config options: `notifyEnabled`, `notifyTimeout`

### 1.1.5
- Fixed README: added missing changelog entry for 1.1.4

### 1.1.4
- Fixed README changelog (E6006), added `needs: check-and-lint` to adapter-tests job (S3014)

### 1.1.3
- Use standard workflow and testing scripts as provided by create-adapter
- Added `needs: check-and-lint` to adapter-tests job
- Restructured test directory to match ioBroker.example template

### 1.1.2
- Use `node:` prefix for all built-in Node.js modules (fs, http, path, url)

### 1.1.1
- Fixed prettier formatting errors in lib files
- Added `test:integration` script for CI/CD compatibility

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT © 2026 sadam6752-tech

Copyright (c) 2026 sadam6752-tech <sadam6752@gmail.com>
