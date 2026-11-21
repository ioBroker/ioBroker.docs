<img src="admin/jellyfin.png" alt="Logo" width="100">

# ioBroker.jellyfin

[![NPM version](https://img.shields.io/npm/v/iobroker.jellyfin.svg)](https://www.npmjs.com/package/iobroker.jellyfin)
[![Downloads](https://img.shields.io/npm/dm/iobroker.jellyfin.svg)](https://www.npmjs.com/package/iobroker.jellyfin)
![Number of Installations](https://iobroker.live/badges/jellyfin-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/jellyfin-stable.svg)

**Tests:** ![Test and Release](https://github.com/Schimi1983/ioBroker.jellyfin/workflows/Test%20and%20Release/badge.svg)

**🇩🇪 Deutsche Anleitung: [docs/de/README.md](https://github.com/Schimi1983/ioBroker.jellyfin/blob/main/docs/de/README.md)**

See what is playing on your [Jellyfin](https://jellyfin.org) apps and control them from ioBroker – pause the movie when the doorbell rings, dim the lights when a film starts or show the cover in your visualization.

## What you can do

- See on every Jellyfin app (TV, phone, browser) what is playing: title, series, episode, cover, position
- Start a film, a series, an episode, an album or a song by its title
- Play, pause, stop, skip forward and back, jump to a position
- Change the volume or mute
- Show a message on the TV screen (e.g. "Someone is at the door")
- Start a scan of your libraries

## What you need

- A Jellyfin server, version 12 or newer
- The Jellyfin app on the devices you want to see or control

## Setup in 3 steps

1. **Create a key in Jellyfin:** open Jellyfin in the browser → **Dashboard** → **API keys** → **+**, name it `ioBroker` and copy the key.
2. **Install the adapter** in ioBroker and open the instance settings.
3. **Enter the server address** exactly as you open Jellyfin in the browser (with port, e.g. `http://192.168.1.10:8096`) and the **key**, then save.

That's it. Every Jellyfin app that is connected to the server now appears as a device below `jellyfin.0`.

## Using the values

Each device has three folders:

| Folder | What is in it |
|---|---|
| `info` | Name of the device, app, user, whether it is connected and whether it can be controlled |
| `media` | What is playing: `state` (play / pause / stop), `title`, `series`, `season`, `episode`, `cover`, `elapsed`, `duration`, and `seek`, `volume`, `mute` |
| `command` | Buttons: `play`, `pause`, `playPause`, `stop`, `next`, `previous`, `forward`, `rewind`, `volumeUp`, `volumeDown`, `toggleMute`, `playTitle` and `message` |

**Examples**

- **Dim the light when a film starts:** react to `jellyfin.0.<device>.media.state` changing to `play`.
- **Start a film:** write its title into `jellyfin.0.<device>.command.playTitle`, e.g. `Home Alone`.
- **Pause when the doorbell rings:** set `jellyfin.0.<device>.command.pause` to `true`.
- **Message on the TV:** write the text into `jellyfin.0.<device>.command.message`.
- **Cover in VIS:** use `jellyfin.0.<device>.media.cover` as image address.
- **Jump to the middle:** write `50` into `media.seek` (percent of the film).

Below `jellyfin.0.server` you see the server version, whether an update or restart is pending, how many devices are connected and playing, and the button `refreshLibrary` to scan all libraries.

## Good to know

- **One device, two connections:** the Jellyfin apps for phones, tablets and TVs register twice with the server (the app and its player). The adapter combines both into one device: you see what the player shows and the commands go to the app.
- **A device shows "cannot be controlled"** (`info.remoteControl` = false) although the app is open: restart the app. If that does not help, log out in the app and log in again.
- **Volume** works differently on every device:

| Device | Volume value | Louder / quieter | Mute |
|---|---|---|---|
| Browser | ✔ | ✔ | ✔ |
| TV app (Fire TV, NVIDIA SHIELD, Android TV) | ✘ only a small step | ✔ | ✔ (not when the sound goes to an AV receiver) |
| Phone / tablet app | ✘ (system volume) | ✘ | ✔ |

- **Android phone app:** with the integrated player (default) you see what is playing, but the app does not accept commands. Remote control works with the **web player** (app settings) – a film started from ioBroker then waits until you tap play once on the phone.
- **iPad app:** works out of the box, a film started from ioBroker plays immediately.
- **Messages:** TV apps hide messages with a display time after 2–3 seconds, no matter which time is set. In the browser, messages without a display time stay until they are closed.
- **A device shows "not connected":** the app is closed or the device is off. As soon as the app connects again, everything updates automatically.
- A command is only sent if the app accepts it at that moment. Otherwise you find a short note in the log.
- **Old devices** are never deleted automatically, so you keep your scripts and VIS links when a device is off for a while. You can delete a device you no longer use in the **Objects** tab.
- **Option "Only show devices that can be controlled":** new devices are only added if they accept commands. Devices that already exist stay – delete them in the **Objects** tab if you do not want them.

## Questions and problems

- **"The Jellyfin server rejected the API key"** – check the key, or create a new one in the Jellyfin dashboard.
- **"Jellyfin was not found at this address"** – check the address, port and – if Jellyfin runs behind a reverse proxy – the path (e.g. `https://example.com/jellyfin`).
- **"Cannot reach the Jellyfin server"** – is the server running and reachable from the ioBroker computer?
- **"Jellyfin … is not supported"** – the adapter needs Jellyfin 12 or newer, please update the server.
- Something else? Please open an [issue](https://github.com/Schimi1983/ioBroker.jellyfin/issues) and add the log (log level *debug*).

<details>
<summary>For advanced users</summary>

### All states of a device

| State | Type | Access | Description |
|---|---|---|---|
| `info.name` | string | read | device name |
| `info.client` / `info.version` | string | read | app and version |
| `info.user` | string | read | Jellyfin user |
| `info.reachable` | boolean | read | session exists on the server |
| `info.remoteControl` | boolean | read | the session accepts commands right now |
| `info.lastActivity` | number | read | last activity (timestamp in ms) |
| `media.state` | string | read | `play`, `pause`, `stop` |
| `media.title`, `media.type`, `media.series`, `media.season`, `media.episode`, `media.artist`, `media.album`, `media.genre`, `media.year` | string | read | current item |
| `media.cover` | string | read | cover URL (no login needed) |
| `media.duration` / `media.elapsed` | number (s) | read | length and position |
| `media.seek` | number (%) | read/write | position in percent, write to jump |
| `media.volume` | number (%) | read/write | volume (only filled if the app reports its volume) |
| `media.mute` | boolean | read/write | mute (only filled if the app reports its volume) |
| `media.repeat` | number | read/write | `0` off, `1` all, `2` one (only filled if the app supports it) |
| `media.itemId` | string | read | Jellyfin id of the current item |
| `command.*` | boolean | write | buttons |
| `command.playTitle` | string | read/write | title (search, exact match preferred; a series starts with its first episode) or Jellyfin item id |
| `command.message` | string | read/write | text or JSON `{"text":"…","header":"…","timeoutMs":5000}` |
| `command.generalCommand` | string | read/write | any Jellyfin command, e.g. `GoHome` or `{"Name":"SetVolume","Arguments":{"Volume":"30"}}` |

Device ids: browsers use their own (shortened) id; apps are identified by app, device name and user (16-character hash), so both connections of an app end up in the same device.

### Message via script

```typescript
// all devices that can show messages
sendTo('jellyfin.0', 'message', { text: 'Someone is at the door', header: 'Doorbell' });
// one device (object id or part of the device name)
sendTo('jellyfin.0', 'message', { text: 'Dinner is ready', device: 'SHIELD' }, (res) => log(JSON.stringify(res)));
```

The answer is `{ sent: <number of devices>, errors: [...] }`.

### Expert settings

Visible in the instance settings with the expert mode switched on: update interval (how often the server sends the playback status, default 5 s), cover height (default 300 px, 0 = original) and request timeout.

</details>

## Support

The adapter is free and stays free. If it is useful to you and you want to say thanks, you can support the development:

[![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Schimi1983)
[![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)](https://paypal.me/Schimi1983)

Bug reports and ideas in the [issues](https://github.com/Schimi1983/ioBroker.jellyfin/issues) help just as much.

## Disclaimer

Jellyfin is a free software project. This adapter is not affiliated with or endorsed by the Jellyfin project. The Jellyfin logo is © the Jellyfin contributors ([jellyfin-ux](https://github.com/jellyfin/jellyfin-ux)), licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-11-20)

- (Schimi1983) The elapsed time (`media.elapsed`, `media.seek`) now counts on every second while playing, instead of jumping with each report of the server

### 0.1.6 (2026-11-16)

- (Schimi) Outdated value lists of states are replaced without `setObject()` (repository checker S5054)
- (Schimi) Errors while marking devices as not connected after a lost connection are logged instead of being swallowed

### 0.1.5 (2026-11-12)

- (Schimi) Devices that are offline at adapter start also get the updated objects (`media.repeat` as number, `info.client` role) and their old repeat value is converted

### 0.1.4 (2026-11-12)

- (Schimi) **Changed:** `media.repeat` is now a number with role `media.mode.repeat` (0 off, 1 all, 2 one) instead of the Jellyfin names; scripts that write `RepeatNone`/`RepeatAll`/`RepeatOne` keep working
- (Schimi) Device ids that contain uppercase letters are hashed, so two ids can never differ only in case
- (Schimi) The connection to Jellyfin is given up and retried if it cannot be opened within the request timeout
- (Schimi) `info.client` uses the role `text`

### 0.1.3 (2026-11-01)

- (Schimi) Existing installations also get the translated names of `info` and `info.connection`

## License

MIT License

Copyright (c) 2026 Schimi <github@world-mg.de>

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