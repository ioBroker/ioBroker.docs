---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.androidtv.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.androidtv.svg
BADGE-Number of Installations: https://iobroker.live/badges/androidtv-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/androidtv-stable.svg
BADGE-Test and Release: https://github.com/Schimi1983/ioBroker.androidtv/workflows/Test%20and%20Release/badge.svg
BADGE-GitHub Sponsors: https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white
BADGE-PayPal: https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white
---
![Logo](admin/androidtv.png)

# ioBroker.androidtv

[![NPM version](https://img.shields.io/npm/v/iobroker.androidtv.svg)](https://www.npmjs.com/package/iobroker.androidtv)
[![Downloads](https://img.shields.io/npm/dm/iobroker.androidtv.svg)](https://www.npmjs.com/package/iobroker.androidtv)
![Number of Installations](https://iobroker.live/badges/androidtv-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/androidtv-stable.svg)

**Tests:** ![Test and Release](https://github.com/Schimi1983/ioBroker.androidtv/workflows/Test%20and%20Release/badge.svg)

**🇩🇪 Deutsche Anleitung: [docs/de/README.md](https://github.com/Schimi1983/ioBroker.androidtv/blob/main/docs/de/README.md)**

Control your **NVIDIA SHIELD**, other **Android TV / Google TV** devices and **Amazon Fire TV** from ioBroker: switch on and off, start apps, press remote buttons and see what is playing.

Product pages: [NVIDIA SHIELD TV](https://www.nvidia.com/en-us/shield/), [Android TV / Google TV](https://www.android.com/tv/), [Amazon Fire TV](https://www.amazon.com/firetv).

**Requirements:** Node.js 22, js-controller 6.0.11 and Admin 7.6.20 or newer. The device must be reachable from ioBroker in your network. No cloud account needed.

## Setup

### 1. Add the device

Instance settings › tab **Devices** › **Add device**: enter a name and the **IP address** of the device (network settings of the device; best give it a fixed IP in your router). Then choose the **device type**:

| Device type | For | What it can do | What you do once |
| --- | --- | --- | --- |
| **Android TV / Google TV – standard** | NVIDIA SHIELD, Chromecast with Google TV, TVs with Android TV / Google TV | on/off, apps, remote buttons, volume | enter a code shown on the TV |
| **Android TV / Google TV – with title and play/pause (ADB required)** | same devices | everything above + title, play/pause, position | enter the code + switch on *network debugging* on the device |
| **Amazon Fire TV** | Fire TV stick, cube, TVs with Fire TV | on/off, apps, remote buttons, title, play/pause | switch on *ADB debugging* on the device |

Not sure? Start with **standard** – you can switch later.

### 2. Connect

**Standard:** switch the device on, click **Pair device** on its card and enter the 6-character code from the TV. Done – the status dot on the card turns green.

**With title and play/pause:** pair as above. Then on the device open **Settings › Device Preferences › Developer options** and switch on **Network debugging** (no developer options? *About* › click **Build** 7 times). Some TVs (e.g. Philips) also need **USB debugging** switched on. Confirm **"Allow debugging?"** on the TV with **Always allow**.

**Amazon Fire TV:** on the Fire TV open **Settings › My Fire TV › Developer options** and switch on **ADB debugging** (no developer options? *About* › click the device name 7 times). Confirm **"Allow USB debugging?"** on the TV with **Always allow**.

> ADB (debugging) also lets other devices in your network access the TV. Only use it in your own, trusted network.

### 3. Optional: switch on from deep standby

Some devices (e.g. Fire TV) switch off their network in deep standby. Switch on **Wake on LAN** / **network standby** on the device and enter its **MAC address** in the device settings (gear button on its card) – take it from your router (with a cable: the MAC of the LAN port).

## Using the adapter

Each device appears as `androidtv.0.<name>`:

| What | Data point |
| --- | --- |
| Switch on / off, is it on? | `power` |
| Which app is running? | `currentAppName` (e.g. `Netflix`), app ID in `currentApp` |
| Start an app | buttons in `apps` |
| Remote buttons | buttons in `keys` (e.g. `keys.home`, `keys.playPause`, `keys.volumeUp`) |
| Type text | `sendText` |
| What is playing? | `media.title`, `media.state`, `media.position` (not with *standard*) |
| Connected? | `info.connected`, readable status in `info.status` |

Use them in scripts, Blockly, scenes or visualizations like any other data point.

### Devices tab

Every device is a card with status and the running app. The switch enables/disables the device, the controller button opens quick controls (on/off, mute, volume, play/pause, home), further buttons pair, reconnect, change the settings or remove the device. Changes are saved immediately and restart the instance – close the settings page afterwards without saving before you change anything else there.

### App favorites

Tab **App favorites**: each entry becomes a button for every device. Enter the app's **web link** or **app ID** (start the app on the TV and read `currentApp`).

| App | Android TV / SHIELD | Fire TV |
| --- | --- | --- |
| Netflix | `https://www.netflix.com/title` | same |
| YouTube | `https://www.youtube.com` | same |
| Disney+ | `https://www.disneyplus.com` | same |
| Prime Video | `https://app.primevideo.com` | `com.amazon.firebat` |

App IDs work on Fire TV and with the device type *with title and play/pause*. A link that would only open the web browser is not started (hint in the log).

## Messages for scripts and AI agents

The devices are controlled through the data points above. `sendTo('androidtv.0', 'help', {})` answers a description of them for AI agents (e.g. ioBroker.pi-agent) and script authors: `{ help, commands }`, where `commands` lists every command of the instance with `write` (whether it changes something); the `dm:*` commands belong to the device manager.

## Problems & solutions

- **"Pairing required"**: pair again (step 2) – needed after resetting the device.
- **"Not connected"**: the device is off or unreachable. The adapter reconnects by itself.
- **Cannot switch on after a while**: deep standby – set up Wake-on-LAN (step 3). Use the MAC from your router, not `info.mac` (that may be the Wi-Fi MAC). Different networks: enter the broadcast address in the device settings (e.g. `192.168.20.255`).
- **"Shut down" in the device menu** switches it off completely – then only its own remote can switch it on.
- **SHIELD turns itself on again after switching off**: the TV wakes it via HDMI-CEC while it shows the SHIELD's input. Switch the TV to another input first, or switch off the TV. With ADB the adapter detects this and shows `power` correctly.
- **TV keeps showing "Use keyboard on mobile device"**: untick *Current app & text input* in the device settings (gear icon on the card).
- **Volume shows nothing**: volume is controlled by the TV / AV receiver (HDMI-CEC); the volume buttons still work.
- **No title for Netflix or Prime Video** (Prime Video shows only "PrimeVideo"): these apps do not pass the title on to Android; play/pause and position work. YouTube shows title and channel.

## Technical details

<details>
<summary>For advanced users</summary>

### Connections

- **Standard**: Android TV Remote protocol v2 (as used by the Google TV app), TCP 6466/6467, TLS with a client certificate created by the adapter. Needs the system app *Android TV Remote Service* (missing on Fire TV). The device pushes power, app and volume – no polling.
- **ADB** (title/play/pause, Fire TV): network debugging on TCP 5555 (classic, not "wireless debugging"), built into the adapter – no adb program needed. Polled only while the device is on (default every 5 s); while off, a short power check every 60 s and after switching off detects a device woken again via HDMI-CEC.
- Web links and keys go via the remote protocol, app IDs via ADB. Keys via ADB take about 1 s on a Fire TV.
- Client certificate and ADB key are stored encrypted in the instance file storage.
- Firewall / VLAN: TCP 6466, 6467, 5555 from ioBroker to the device (IPv4 and IPv6 if used); Wake-on-LAN: UDP port 9.
- Reconnect after 2 s, then doubling up to 60 s (expert option). Errors only at log level debug. Unreachable for 30 s → `power = false`.

### All data points

| State | Access | Description |
| --- | --- | --- |
| `info.connected`, `info.status`, `info.pairingRequired` | read | connection, readable status, pairing needed |
| `info.model`, `info.manufacturer`, `info.mac`, `info.remoteServiceVersion` | read | reported by the device (`info.mac` may be the Wi-Fi MAC) |
| `info.adbConnected`, `info.adbAuthorizationPending` | read | ADB connected / confirmation on the TV pending |
| `power`, `muted` | read/write | screen on/off, mute |
| `currentApp`, `currentAppName` | read | app ID and readable name of the foreground app (name empty while off) |
| `volume`, `volumeMax` | read | `null` if controlled via HDMI-CEC |
| `launchApp`, `sendKey`, `sendText` | write | web link or app ID; key name (`HOME`, `DPAD_UP`, …, see [Android KeyEvent](https://developer.android.com/reference/android/view/KeyEvent)) or code; text |
| `media.state`, `media.title`, `media.subtitle`, `media.app`, `media.position` | read | `play`/`pause`/`stop`/`buffering`/`idle`, title, subtitle, app, seconds |
| `keys.*`, `apps.*` | write | remote buttons, app favorites |

### Known limitations

- The SHIELD accepts only web links via the remote protocol; app IDs are started via ADB.
- Title/subtitle come from the app; apps that do not report them show only their name (Prime Video) or nothing (Netflix); YouTube reports title and channel. No duration or cover.
- Absolute volume cannot be set. Google Cast is not supported – use the [chromecast adapter](https://github.com/iobroker-community-adapters/ioBroker.chromecast).

### Credits and disclaimer

The remote protocol implementation is based on the public documentation of the Android TV Remote protocol v2 and the projects [androidtvremote2](https://github.com/tronikos/androidtvremote2) (Apache-2.0) and [androidtv-remote](https://github.com/louis49/androidtv-remote) (MIT); the ADB implementation follows the Android Open Source Project. No code was copied.

Android TV, Google TV and Chromecast are trademarks of Google LLC, NVIDIA and SHIELD of NVIDIA Corporation, Amazon and Fire TV of Amazon.com, Inc. This adapter is not affiliated with or endorsed by these companies.

</details>

## Support

The adapter is free. If you want to say thanks: [![GitHub Sponsors](https://img.shields.io/badge/GitHub%20Sponsors-Schimi1983-ea4aaa?logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Schimi1983) [![PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?logo=paypal&logoColor=white)](https://paypal.me/Schimi1983)

Bugs and ideas: [issues](https://github.com/Schimi1983/ioBroker.androidtv/issues) · Questions and test reports: [ioBroker forum](https://forum.iobroker.net/topic/85827/test-adapter-androidtv-v0.2.x-latest)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (@GermanBluefox) Added the message "help": a description of all messages and data points for AI agents (e.g. pi-agent), and `common.supportedMessages.help`
- (Schimi) `currentAppName` shows "ORF ON" on Fire TV
- (Schimi) Clearer log hint when an app ID is started without ADB
- (Schimi) Setup hint: some TVs (e.g. Philips) also need USB debugging
- (Schimi) Playback info: if several apps report playback, the app in the foreground wins; changes of the playback info are written to the debug log

### 0.3.0 (2026-11-19)

- (Schimi, Voodoo2man) Devices are now managed as cards in the tab **Devices** (ioBroker device manager): status, quick controls, pairing, reconnect, settings and remove – replaces the device table (#5, #11)
- (Voodoo2man) Disabled devices no longer show the last online status (also `power`)
- (Schimi) New data point `currentAppName`: readable name of the running app (e.g. "Netflix" instead of `com.netflix.ninja`)
- (Schimi) `power` stays correct when the TV wakes the device again via HDMI-CEC right after switching it off (short check via ADB)
- (Schimi) Clearer device type names in the settings ("standard", "with title and play/pause (ADB required)", "Amazon Fire TV") with a short explanation
- (Schimi) Documentation rewritten: shorter, requirements, tips for Wake-on-LAN, HDMI-CEC and Prime Video; German guide linked in the adapter information

### 0.2.3 (2026-11-12)

- (Schimi) Device and app IDs are now unique regardless of upper/lower case
- (Schimi) Reconnect interval, playback update interval and ADB port are checked in the adapter, not only in the settings page
- (Schimi) README: links to the supported products
- (Schimi) Pairing and connection status texts in all 11 languages (was English/German only)
- (Schimi) The object for the internal files is now created from io-package.json

### 0.2.2 (2026-10-31)

- (Schimi) Object names translated into all 11 languages

### 0.2.1 (2026-10-31)

- (Schimi) Clearer error text for an invalid MAC address, translated into all languages
- (Schimi) Fast forward and rewind buttons use the official roles `button.fastforward` / `button.fastreverse`

### 0.2.0 (2026-10-29)

- (Schimi) Wake-on-LAN: `power` = on also switches on devices in deep standby without network (enter the MAC address in the device settings; optional broadcast address in the expert settings)
- (Schimi) Faster reconnect after Wake-on-LAN

Older changes: CHANGELOG_OLD.md

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