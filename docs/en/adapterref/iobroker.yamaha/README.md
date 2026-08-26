# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.yamaha@master/admin/yamaha.svg" width="48" align="top" /> ioBroker.yamaha

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.yamaha)](https://www.npmjs.com/package/iobroker.yamaha) ![stable](https://iobroker.live/badges/yamaha-stable.svg) ![Installations](https://iobroker.live/badges/yamaha-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.yamaha)](https://www.npmjs.com/package/iobroker.yamaha)

**Build:** [![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.yamaha/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

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
- **Presets and favourites** — recall tuner presets and stored network/USB favourites by number, step through presets, save the current station to a preset slot or bookmark it, and read the stored lists with their names (MusicCast); recently-played recall on MusicCast devices
- **Menu browsing** — page through the Net Radio, media-server and USB menus like with the remote: the visible menu lines as datapoints, select-by-line, and a path datapoint that navigates to a favourite in one write
- **Clock & alarm view** — MusicCast desk-audio devices show their clock and alarm settings
- **Capability-driven** — states are generated from what each device reports, no hardcoded model list
- **Automatic discovery** — an empty device list finds and sets up MusicCast devices at startup
- **Device manager** — receivers as admin cards with model, address, live protocol indicators and a device-type icon (receiver, stereo, speaker, soundbar, CD)

## Requirements

- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 7.8.23

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

- **Amplifier core** (always on) — power, volume, mute, input, sound program, sleep, plus the device info with model, firmware and connection.
- **`player`** — one channel per playback source (Spotify, USB, server, net radio, CD, …) with playback state, artist, album, track, cover art and the transport buttons. The `player.browse` folder mirrors the device's media menu: the eight visible lines (folders and titles marked by symbol), `selectLine` acts like OK on the remote, page/back/root buttons, a `rows` JSON for widgets and a `path` datapoint that walks e.g. `Bookmarks>Radio Paradise` on one write.
- **`tuner`** — AM/FM and DAB radio including RDS texts and frequency.
- **`multiroom`** — zones 2–4, Zone B, the all-zones switches (master power, party mode) and the MusicCast device group in its own `multiroom.group` folder.
- **`hdmi`** — the HDMI outputs and lip sync.
- **`scene`** — the receiver's scene names and a scene recall.
- **`sound`** — tone and sound processing: bass/treble, DSP modes, enhancer, equalizer, ….
- **`advanced`** — setup-level datapoints: maximum/initial volume, speaker configuration, input names.
- **`clock`** — the clock and alarm settings of MusicCast desk-audio devices (read-only).

## Troubleshooting

### Upgrading from 0.5.x

Version 1.0.0 is a complete rebuild. On the first start after the update the old datapoints (`volume`, `power`, `Commands.*`, `Realtime.*`, …) are removed and your receiver is recreated as a device; its IP address is carried over automatically. Point scripts and visualizations at the new paths — for example `yamaha.0.<device>.power` instead of `yamaha.0.power`.

### Receiver is not found automatically

Only MusicCast devices announce themselves on the network — older receivers must be added manually via the **"+" dialog**. If discovery comes up empty on a host with several network interfaces, check the **network interface** setting.

### Datapoints are missing

Check the group's toggle in the **Data points** settings, and remember the tree only carries what your device reports. Zone datapoints sit under `multiroom`, not at the top level.

### Values update slowly

If MusicCast changes only refresh every few minutes, another application is occupying UDP port 41100 and the adapter fell back to polling — the startup log notes this.

### First start takes a while

On the first connect the adapter asks the receiver which functions it supports — up to half a minute per YNCA device. The result is remembered, later starts are faster.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

- (krobipd) Fixed: commands sent in quick succession all arrive — a scene switching power, input and volume in one go used to lose everything after the first command
- (krobipd) Fixed: a command the device rejects is now reported instead of counting as success, so a MusicCast device that stops answering is reconnected rather than silently freezing
- (krobipd) Fixed: names and menu entries containing "&" or other special characters now read and write correctly on the older XML protocol
- (krobipd) Fixed: writing one equalizer band no longer resets the other two when the device has not reported its bands yet
- (krobipd) Fixed: switching the tuner band and setting a frequency right after each other now applies the frequency to the new band
- (krobipd) Improved: startup with automatic discovery is much faster on networks with many devices, and a reconnect no longer re-asks what the device already told us
- (krobipd) Fixed: recalling a favourite, a recently played item or a tuner preset now goes to the zone that is actually listening instead of always switching the main zone
- (krobipd) Improved: stopping or restarting the adapter no longer leaves requests running that write to datapoints afterwards
### 1.3.0 (2026-08-26)

- (krobipd) New: menu browsing — page through the Net Radio, server and USB menus like with the remote: visible lines as datapoints, select-by-line, and a path datapoint for one-write navigation (#613)
- (krobipd) New: save presets from ioBroker — store the current tuner or network station to a preset slot and bookmark the playing Net Radio station on YNCA receivers.
- (krobipd) New: Bluetooth pairing and connect controls, FM mono mode and tuning indicators on YNCA receivers.

### 1.2.0 (2026-08-25)

- (krobipd) Fixed: volume writes work again — a written -38 dB reached the receiver as -3.8 dB, so most values were ignored; all numeric controls now send the proper wire format (#612)
- (krobipd) Fixed: the FM frequency datapoint now shows MHz (it was mislabelled kHz) and accepts direct frequency writes in the form the tuner expects.
- (krobipd) New: preset selection — recall tuner presets by number with up/down stepping, and recall stored network or USB favourites per source on YNCA receivers (#613)
- (krobipd) New: MusicCast selection lists — stored favourites and tuner presets with names, a recently-played list with recall by number, and the device's own allowed values as dropdowns.
- (krobipd) New: more device detail — CD track and drive info, DAB and RDS station data, and a read-only clock and alarm view with its own datapoint group switch in the admin settings.

### 1.1.1 (2026-08-22)

- (krobipd) Changed: Internal cleanup. No user-facing changes.

### 1.1.0 (2026-08-22)

- (krobipd) Fixed: a device carried over from the old adapter is no longer called by its IP — the object folder and the admin card now show the name the device reports, or its model.
- (krobipd) Improved: a device that has not reported a model yet already carries its device-class symbol instead of none.

### 1.0.1 (2026-08-22)

- (krobipd) Complete rebuild: one adapter now speaks YNCA, MusicCast and the legacy XML protocol — every protocol a device answers runs in parallel on one object tree.
- (krobipd) New object tree with typed datapoints built from what your device reports. Old datapoints are removed automatically, the address is carried over — point scripts at the new paths.
- (krobipd) Instant updates: MusicCast push events and the live YNCA connection replace polling; connections heal themselves, and one protocol's hiccup reconnects just that protocol.
- (krobipd) Auto-discovery sets up MusicCast devices by itself when the device list is empty, and the admin shows every receiver as a card with model, address and protocol indicators.
- (krobipd) Whole datapoint groups such as playback sources, tuner, multiroom or scenes can be switched off in the admin — and are then not even queried from the device.
- (krobipd) The multiroom folder tells the scope at a glance: switches that affect all zones say so in their name, and the MusicCast device group has its own `multiroom.group` folder.
- (krobipd) Every device shows a type icon — receiver, stereo receiver, speaker, soundbar or CD system, detected from the reported model — in the object tree and on its admin card; the adapter logo now stays readable in light and dark mode.
- (krobipd) Upgrading from 0.5.x shows a one-time notice explaining the new object tree before the update installs.
- (mcm1957) version has been rebuilt due to deploy problems

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
