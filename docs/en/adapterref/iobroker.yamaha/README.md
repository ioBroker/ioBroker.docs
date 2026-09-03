# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.yamaha)](https://www.npmjs.com/package/iobroker.yamaha) ![stable](https://iobroker.live/badges/yamaha-stable.svg) ![Installations](https://iobroker.live/badges/yamaha-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.yamaha)](https://www.npmjs.com/package/iobroker.yamaha)

**Build:** [![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE) [![Sentry](https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white)](https://github.com/ioBroker/plugin-sentry#plugin-sentry)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Controls [Yamaha](https://www.yamaha.com/) AV receivers and MusicCast devices from
ioBroker over the local network. It unites the three protocols Yamaha speaks —
YNCA (the text control protocol of the networked receivers), MusicCast / Yamaha
Extended Control (the richer JSON protocol of the MusicCast generation), and the
legacy XML protocol of the oldest pre-2010 models — behind one object tree.

## Features

- **Three protocols, one adapter** — YNCA, MusicCast (Yamaha Extended Control) and the legacy XML protocol of the pre-2010 models
- **Protocols run in parallel** — a MusicCast receiver combines YNCA amplifier control with MusicCast multiroom, equalizer and media on one object tree
- **Instant updates** — MusicCast pushes its changes, YNCA reports over its live connection
- **Self-healing connections** — an offline receiver joins once it answers; a single protocol reconnects on its own while the others keep running
- **Typed datapoints** — booleans, dropdowns and numbers with unit and range instead of raw text
- **Now playing, per zone** — one player block per zone shows source, playback state, title, artist, cover art and the transport buttons for whatever that zone is playing; zones 2–4 carry their own block
- **Presets and favourites** — recall tuner presets and stored network/USB favourites by number, step through presets, save the current station to a preset slot or bookmark it, and read the stored lists with their names (MusicCast); recently-played recall on MusicCast devices
- **Menu browsing** — page through the Net Radio, media-server and USB menus like with the remote: the visible menu lines as datapoints, select-by-line, and a path datapoint that navigates to a favourite in one write
- **Scenes with their names** — recall a scene by number or by its title from a dropdown that shows the names the receiver reports, per zone — plus a scene list for visualizations
- **On-screen remote** — cursor pad and menu keys as datapoints on MusicCast devices, for driving the receiver's own on-screen menus
- **Clock & alarm view** — MusicCast desk-audio devices show their clock and alarm settings
- **Capability-driven** — states are generated from what each device reports, no hardcoded model list
- **Automatic discovery** — an empty device list finds and sets up MusicCast devices at startup
- **Device manager** — receivers as admin cards with model, address, live protocol indicators and a device-type icon (receiver, stereo, speaker, soundbar, CD)

## Sentry / Error reporting

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** Reporting only happens if you have enabled error reporting in the ioBroker diagnostics (**System settings → Diagnostics and error reporting**). Only an anonymous installation ID is transmitted — no name, e-mail address or IP address.

For details and how to disable it, see the [Sentry plugin documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry). Error reporting requires js-controller 3.0 or newer.

## Requirements

- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 8.0.11

## Ports

- **UDP 41100 (listening)** — MusicCast devices push their change events to this port on the ioBroker host.
- **UDP 1900 (multicast, outgoing)** — the SSDP discovery search at startup.
- **TCP 50000 (outgoing)** — the YNCA control connection to each receiver.
- **TCP 80 (outgoing)** — the MusicCast and XML protocol requests to each device.

## Configuration

Devices are managed in the admin as cards. **Leave the list empty** and the adapter finds MusicCast devices on the network by itself at startup, or add devices by IP via the **"+" dialog** to run only those. Discovery searches on every network interface by default; the optional **network interface** selector confines it to one.

Older Yamaha receivers (before ~2010, the XML protocol) do not announce themselves on the network and must be added manually. The **XML query interval** sets how often they are polled (default 60 seconds).

The **Data points** section switches whole groups of datapoints on or off — **Playback & browsing**, **Tuner**, **Multiroom**, **HDMI**, **Scenes**, **Sound**, **Advanced** and **Clock & alarm**. A switched-off group is removed from the tree and not even queried, which also speeds up the startup; the amplifier core (power, volume, mute, input, sound program, sleep) always stays on.

## State Tree

Each receiver becomes one device node with themed groups — the same groups the
**Data points** switches control. Only what your device reports is created.

- **Amplifier core** (always on) — power, volume, mute, input, sound program, sleep, plus the device info with model, firmware, IP address and connection; MusicCast devices add an on-screen `remote` (cursor pad, menu keys).
- **`player`** — ONE "now playing" block per zone: `player.source` says what the zone is listening to, and playback state, artist, album, track, cover art, times and the transport buttons always describe exactly that — whatever source is playing. Zones 2–4 get their own block under `multiroom.zoneN.player`. The source folders keep only what is genuinely their own: preset recall & save for net radio/server/USB, the MusicCast favourite/recent/playlist/queue lists under `player.netPlayer`, the CD drive states, Bluetooth pairing and the AirPlay volume interlock. The `player.browse` folder mirrors the device's media menu: the eight visible lines (folders and titles marked by symbol), `selectLine` acts like OK on the remote, page/back/root buttons, a `rows` JSON for widgets and a `path` datapoint that walks e.g. `Bookmarks>Radio Paradise` on one write.
- **`tuner`** — one band, one frequency (kHz on every generation) and one preset for AM, FM and DAB, plus RDS texts and reception flags; only genuinely DAB-specific detail (service, ensemble, DLS, …) sits under `tuner.dab`.
- **`multiroom`** — zones 2–4 (each with its own player and scene block), Zone B, the all-zones switches (master power, party mode) and the MusicCast device group in its own `multiroom.group` folder.
- **`hdmi`** — the HDMI outputs and the two lip-sync offsets.
- **`scene`** — a recall dropdown carrying the titles the receiver reports (writable by number or title) and a `scene.list` JSON with every scene slot — titled where the device reports titles; zones with their own scenes carry theirs under `multiroom.zoneN.scene`.
- **`sound`** — tone and sound processing: bass/treble, DSP modes, enhancer, the equalizer in its own `sound.equalizer` folder and the current audio signal under `sound.signal` on MusicCast devices.
- **`advanced`** — setup-level datapoints: maximum/initial volume, the speaker configuration (A/B switches included) under `advanced.speakers`, input names.
- **`clock`** — the clock and alarm settings of MusicCast desk-audio devices (read-only).

## Troubleshooting

### Upgrading from 1.x

Version 2.0.0 reworks the object tree. On the first start the adapter removes the old datapoints itself and creates the new ones: the per-source player copies become one `player` block per zone, the scene name datapoints become the recall dropdown plus `scene.list`, the two tuner frequencies become one `tuner.frequency` in kHz, the equalizer and signal info move under `sound.equalizer`/`sound.signal`, the lip-sync offsets under `hdmi`, and the speaker A/B switches under `advanced.speakers`. Point scripts and visualizations at the new paths.

### Upgrading from 0.5.x

Version 1.0.0 is a complete rebuild. On the first start after the update the old datapoints (`volume`, `power`, `Commands.*`, `Realtime.*`, …) are removed and your receiver is recreated as a device; its IP address is carried over automatically. Point scripts and visualizations at the new paths — for example `yamaha.0.<device>.power` instead of `yamaha.0.power`.

### Receiver is not found automatically

Only MusicCast devices announce themselves on the network — older receivers must be added manually via the **"+" dialog**. If discovery comes up empty on a host with several network interfaces, check the **network interface** setting.

### Datapoints are missing

Check the group's toggle in the **Data points** settings, and remember the tree only carries what your device reports. Zone datapoints sit under `multiroom`, not at the top level.

### Values update slowly

If MusicCast changes only refresh every few minutes, another application is occupying UDP port 41100 and the adapter fell back to polling — the startup log notes this.

### First start takes a while

On the very first contact the adapter asks the receiver which functions it supports — up to half a minute per YNCA device. The answers are remembered per device (and survive restarts), so every later start brings the device online in seconds and refreshes the current values in the background. A firmware update or a different device behind the same address is detected and re-asked automatically.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.2.0 (2026-09-03)

- (krobipd) Changed: the playback times are now a number in seconds, so the media player, Alexa and Google can show them on every receiver
- (krobipd) New: the readable playback times ("1:23") moved to their own datapoints, next to the seconds — bind whichever form your visualization needs
- (krobipd) Fixed: after a restart the adapter asks the receiver again instead of trusting what it remembered, so the menu, the tuner band and each zone's source are the current ones
- (krobipd) Fixed: setting a tuner frequency on a MusicCast device never reached it — the command was incomplete
- (krobipd) Fixed: commands to a receiver from before 2010 are now sent the way every comparable program sends them; older models can reject the previous form outright
- (krobipd) Fixed: a scene you renamed at the receiver now appears while the adapter runs, and recalling a scene by an unknown name says so in the log instead of doing nothing
- (krobipd) Fixed: after a restart the tuner of an older receiver no longer shows the station of the previous session until the next poll
- (krobipd) Fixed: an incomplete answer from a MusicCast device is no longer kept as that device's capabilities, and a device that answers nothing is no longer shown as connected
- (krobipd) Fixed: going one menu level back on an older receiver no longer jumps two levels when the reply gets lost
- (krobipd) Fixed: a play or pause sent from a script or a visualization now reaches the receiver in every case
- (krobipd) Improved: each of the 23 input-name datapoints now carries the input it names, instead of all reading the same

### 2.1.1 (2026-09-02)

- (krobipd) Fixed: on an updated instance the info datapoints now get the translated names too, instead of keeping the ones an older version had written

### 2.1.0 (2026-09-02)

- (krobipd) New: every datapoint name is now shown in your ioBroker language, in eleven languages; a name you changed yourself stays untouched
- (krobipd) Fixed: the empty "Media server" folder left behind by the 2.0.0 object tree is removed, together with any other folder that no longer holds a datapoint
- (krobipd) Fixed: the menu view starts empty after a restart instead of still showing the menu from the last time you browsed
- (krobipd) Fixed: a receiver that gets a new address from your router is found again and reconnected there, instead of staying offline for good
- (krobipd) Fixed: deleting an automatically found receiver now really removes it — the connection is closed, its datapoints are gone, and the next search does not bring it back
- (krobipd) Fixed: the DAB date, the audio signal fields and the tuner preset list no longer show the receiver's own placeholder text — they stay empty, and only stored presets are listed
- (krobipd) Fixed: on a receiver with both an analogue and a DAB tuner the AM band stays selectable and every band change reaches the right tuner
- (krobipd) Fixed: a hiccup of the ioBroker database while the adapter starts no longer stops the instance — it says so in the log and keeps the receivers running

### 2.0.4 (2026-09-02)

- (krobipd) Fixed: a short outage of the ioBroker database no longer restarts the adapter — a failed write is logged once and the next value is written normally
- (krobipd) Fixed: the protocol badges on the device card are reset when a device starts and when the adapter stops, so a crash no longer leaves a green badge next to a red dot
- (krobipd) Fixed: stopping or restarting the adapter while it is still searching the network now stops it completely — it no longer keeps working half-started until the next restart
- (krobipd) Fixed: the scene list keeps its titles on MusicCast receivers that also answer over XML or YNCA — the title-less MusicCast list no longer replaces it at startup
- (krobipd) Fixed: a timeout while probing an older receiver for scenes or menus is asked again on the next connect instead of being remembered as "none" until the next restart
- (krobipd) Fixed: writing one equalizer band before the receiver reported all three no longer sends zeros for the other two — the zone status is fetched first
- (krobipd) Improved: a receiver that is off for a while is retried no later than the configured maximum wait, and an oversized answer from a wrong host can no longer eat the adapter's memory

### 2.0.3 (2026-09-01)

- (krobipd) Fixed: the update cleanup now removes every never-filled leftover datapoint — a history recording setting no longer shields it, because nothing was ever recorded there and nothing is lost

[Older changelogs can be found there](CHANGELOG_OLD.md)

## History

The yamaha adapter has a long lineage on ioBroker, and this version continues it —
for existing users it is simply a new version of the same adapter:

- **[soef](https://github.com/soef)** created the adapter in 2015 and built the
  original control over Yamaha's XML network protocol, with realtime state updates
  and multi-zone support.
- **[Garfonso](https://github.com/Garfonso)**, **[Sneak-L8](https://github.com/Sneak-L8)**
  and **[Apollon77](https://github.com/Apollon77)** contributed over the following
  years — admin compatibility, fixes and Sentry crash reporting.
- The **[ioBroker Community Adapters](https://github.com/iobroker-community-adapters)**
  team — notably [foxriver76](https://github.com/foxriver76) and
  [mcm1957](https://github.com/mcm1957) — maintained the adapter from 2020 to 2026,
  releasing versions up to 0.5.4.
- Since 2026, [krobi](https://github.com/krobipd) maintains the adapter in the community
  organisation and rebuilt it from the ground up, uniting the YNCA, MusicCast (YXC)
  and legacy XML protocols behind one object tree.

## Support

- [ioBroker Forum](https://forum.iobroker.net/)
- [GitHub Issues](https://github.com/iobroker-community-adapters/ioBroker.yamaha/issues)

### Support Development

This adapter is free and open source. If you find it useful, consider buying me a coffee:

[![Ko-fi](https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

## License

The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>  
Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 krobi <krobi@power-dreams.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---

_Developed with assistance from Claude.ai_
