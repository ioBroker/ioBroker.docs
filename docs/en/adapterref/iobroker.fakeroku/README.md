# <img src="https://cdn.jsdelivr.net/gh/iobroker-community-adapters/ioBroker.fakeroku@master/admin/fakeroku.svg" width="48" align="top" /> ioBroker.fakeroku

**Release:** [![npm version](https://img.shields.io/npm/v/iobroker.fakeroku)](https://www.npmjs.com/package/iobroker.fakeroku) ![stable](https://iobroker.live/badges/fakeroku-stable.svg) ![Installations](https://iobroker.live/badges/fakeroku-installed.svg) [![npm downloads](https://img.shields.io/npm/dt/iobroker.fakeroku)](https://www.npmjs.com/package/iobroker.fakeroku)

**Build:** [![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.fakeroku/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fakeroku/actions/workflows/test-and-release.yml) ![Node](https://img.shields.io/badge/node-%3E%3D22-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue) [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**Support:** [![Ko-fi](https://img.shields.io/badge/Ko--fi-Support-ff5e5b?logo=ko-fi)](https://ko-fi.com/krobipd) [![PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/krobipd)

Emulates one or more **Roku devices** on your LAN so that ECP/SSDP remotes — a
Logitech Harmony Hub or a Sofabaton X1/X2 — can trigger events in
ioBroker. It is the **input** counterpart to the Logitech Harmony adapter: a button
on the remote becomes a datapoint in ioBroker.

Unlike the classic fake-Roku, this build answers the full Roku control surface
including `/query/device-info` with a **current** Roku version, so it works beyond a
classic Harmony hub.

> **The official Roku mobile app is not supported.** It drives Rokus over Roku's
> proprietary, undocumented ECP-2 WebSocket channel, which this emulator does not
> implement. Use a Harmony hub or a Sofabaton — those speak the classic ECP this
> adapter serves.

## Features

- Emulates one or more Roku devices on the LAN — the Roku control protocol (ECP) over HTTP plus SSDP discovery on port 1900.
- Full Roku control surface including `/query/device-info` with a current Roku version, beyond what a classic Harmony hub needs.
- Clean data model per device: a `command` datapoint plus fixed `keys.<Key>` states, all created up front.
- Several emulated Rokus from a single instance; discovery bound to the chosen network interface; command handling restricted to the LAN.

## Requirements

- Node.js >= 22
- js-controller >= 7.2.2
- admin >= 7.8.23

## Installation

Install the adapter from the ioBroker admin.

## Configuration

- **Network interface** — the network card the emulated Rokus bind to and advertise
  on. Leave it on "all interfaces" and the adapter runs out of the box — it detects
  the routable IP automatically. Pick a specific address only on a host with several
  network cards.
- **Emulated Roku devices** — managed as cards: **+ Add** opens a dialog with a
  **name**, an **ECP port** (`8060` the real Roku port; a free one is pre-selected,
  and the dialog refuses a name or port already in use) and a **type**. You can
  emulate several Rokus from one instance — each needs its own port.
- **Type** — *Player* (default) exposes the 16 standard navigation and playback keys;
  *TV* additionally exposes volume, power, channel and input keys. Choose *TV* only if
  you want those extra keys as ioBroker triggers.

To add the emulated Roku to a Harmony hub, add a "Roku" device in the Harmony app
and point it at the ioBroker host.

## Objects

For every emulated Roku (`fakeroku.0.<name>`):

| Datapoint | Type | Meaning |
|---|---|---|
| `.command` | string, read-only | The last command as plain text (`Home`, `Lit_a`, `launch:12`, `search:news`). One datapoint for everything — no object-per-character sprawl. |
| `.commandType` | string, read-only | `keypress` / `keydown` / `keyup` / `launch` / `install` / `input` / `search`. |
| `.keys.<Key>` | boolean, read-only | One state per remote key the device type exposes — a *Player* has the 16 navigation/playback keys, a *TV* adds Volume\*, Power, Channel\*, HDMI/AV inputs — all created up front. A keypress pulses it `true` for a moment; keydown/keyup hold it. |

Free keyboard input (`Lit_x`) and app launches show up in `.command` only — they do
not get their own objects.

> Note: the Roku remote sends the **same** `Play` command for play and pause, so
> play and pause cannot be told apart here — that is a protocol limitation, not an
> adapter one.

## Usage

In a script or Blockly rule, react to a key — e.g. when `fakeroku.0.<name>.keys.Play`
becomes `true`, or watch `.command` for the last button as text.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.0 (2026-08-05)
- (krobipd) First stable release — version 1.0.0 marks the complete rewrite as the mature, supported version of the adapter.
- (krobipd) Upgrading from an older version now shows a one-time notice that the button data points changed from text to real boolean values, so scripts and visualizations can be checked.

### 0.6.0 (2026-08-05)
- (krobipd) Complete rewrite. The adapter now answers the full Roku control surface — including device-info with a current Roku version — so Logitech Harmony and Sofabaton remotes pair and work reliably.
- (krobipd) Works out of the box: it detects the network address to advertise on its own, no manual interface picking.
- (krobipd) Manage multiple emulated Rokus from the admin UI, each as a Player or a TV.
- (krobipd) Cleaner object tree — one datapoint per remote button with the correct types, plus a last-command datapoint; leftover objects from older versions are removed on start.

### 0.5.1 (2026-08-05)
- (mcm1957) Adapter requires Node.js >= 22 now
- (mcm1957) Dependencies have been updated

### 0.5.0 (2026-07-30)
- Complete rewrite with the full Roku control surface, including `device-info` with a current Roku version — the part modern remotes check at pairing, beyond what a classic Harmony hub needs
- New clean data model: a `command` datapoint plus fixed `keys.<Key>` states, all created up front instead of appearing only after the first keypress
- Discovery binds to the chosen network interface, command handling is restricted to the local network

### 0.4.0 (2026-03-07)
- Adapter requires node.js >= 20, admin >= 7.7.22, js-controller >= 6.0.11

[Older changelogs can be found there](CHANGELOG_OLD.md)

## History

fakeroku has a long lineage on ioBroker, and this version continues it — for existing
users it is simply a new version of the same adapter:

- **[Pmant](https://github.com/Pmant)** created fakeroku in 2017 and built the original
  Roku emulation: SSDP discovery, the ECP surface and multi-device support.
- **[Apollon77](https://github.com/Apollon77)** kept the test and build tooling current
  over the following years.
- The **[ioBroker Community Adapters](https://github.com/iobroker-community-adapters)**
  team — notably [mcm1957](https://github.com/mcm1957) and
  [foxriver76](https://github.com/foxriver76) — maintained and modernized the adapter
  from 2023 to 2026, releasing versions up to 0.5.1.
- From **0.6.0** on, [krobi](https://github.com/krobipd) rewrote the adapter from the
  ground up in TypeScript and added the full ECP surface including `device-info`.

## License

The MIT License (MIT)

Copyright (c) 2017-2023 Pmant <patrickmo@gmx.de>  
Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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
