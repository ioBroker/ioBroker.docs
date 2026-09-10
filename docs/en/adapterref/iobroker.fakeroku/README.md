---
BADGE-npm version: https://img.shields.io/npm/v/iobroker.fakeroku
BADGE-stable: https://iobroker.live/badges/fakeroku-stable.svg
BADGE-Installations: https://iobroker.live/badges/fakeroku-installed.svg
BADGE-npm downloads: https://img.shields.io/npm/dt/iobroker.fakeroku
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.fakeroku/actions/workflows/test-and-release.yml/badge.svg
BADGE-Node: https://img.shields.io/badge/node-%3E%3D22-brightgreen
BADGE-TypeScript: https://img.shields.io/badge/TypeScript-strict-blue
BADGE-License: https://img.shields.io/badge/license-MIT-green
BADGE-Sentry: https://img.shields.io/badge/error%20reporting-Sentry-362d59?logo=sentry&logoColor=white
BADGE-Ko-fi: https://img.shields.io/badge/Ko--fi-Support%20me-ff5e5b?logo=ko-fi
BADGE-PayPal: https://img.shields.io/badge/Donate-PayPal-blue.svg
---
# fakeroku — emulated Roku devices for your remote

This adapter makes ioBroker look like one or more **Roku streaming devices** on your
local network. A remote control that speaks Roku's protocol — a Logitech Harmony hub
or a Sofabaton X1/X2 — finds the emulated device, and every button you press on it
becomes a datapoint in ioBroker that your scripts and visualisations can react to.

It is the **input** counterpart to the Logitech Harmony adapter: instead of ioBroker
controlling a device, a device controls ioBroker.

> **The official Roku mobile app does not work with this adapter.** The app talks to
> real Rokus over a proprietary, encrypted channel that cannot be reproduced. Use a
> Harmony hub or a Sofabaton — those speak the open protocol this adapter serves.

## Requirements

- Node.js 22 or newer
- js-controller 7.2.2 or newer
- admin 8.0.11 or newer
- A remote or hub on the **same local network** as your ioBroker host

## Setting it up

### 1. Create the instance

Install the adapter and create one instance. It works out of the box: the instance
comes with one emulated Roku already configured, named "Roku" on port 8060.

### 2. Choose the network interface (usually: don't)

Leave **Network interface** on "all interfaces". The adapter then detects the
routable address of your ioBroker host by itself and announces that.

Pick a specific address only if your ioBroker host sits on **several networks** and
the remote is reachable on just one of them.

### 3. Add or edit the emulated Rokus

Each card under **Emulated Roku devices** is one Roku your remote can find.

- **Name** — appears as the device name on the remote and as the folder in the
  object tree. Pick something you will recognise, for example the room.
- **ECP port** — the network port this Roku answers on. `8060` is the port a real
  Roku uses. Each emulated Roku needs **its own** port; the dialog pre-selects a free
  one and refuses a port already taken.
- **Type**
  - **Player** (a streaming box) offers the 16 standard navigation and playback keys.
  - **TV** offers those plus volume, power, channel and input keys. Choose it only if
    you actually want those extra buttons as triggers in ioBroker.

### 4. Teach your remote

**Logitech Harmony:** add a device in the Harmony app, choose **Roku** as the
manufacturer, and point it at your ioBroker host. The hub finds the emulated Roku on
its own and reads the port from the announcement — you do not have to enter it.

**Sofabaton X1/X2:** add a Roku device in the Sofabaton app while the app is on the
same network. The adapter reports a current Roku version, which is what these remotes
check before they accept a device.

## What you get in the object tree

At instance level:

| Datapoint         | Type               | Meaning                                                                                                                                                                                                                      |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection` | boolean, read-only | True only while **every** configured Roku is actually listening. If one of them cannot start — almost always because its port is already in use — the instance stays disconnected and the log names the device and the port. |

For each emulated Roku, below `fakeroku.0.<name>`:

| Datapoint     | Type               | Meaning                                                                                                                                           |
| ------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`     | string, read-only  | The last command as readable text: `Home`, `Lit_a`, `launch:12`, `search:news`.                                                                   |
| `commandType` | string, read-only  | What kind of command it was: `keypress`, `keydown`, `keyup`, `launch`, `install`, `input` or `search`.                                            |
| `keys.<Key>`  | boolean, read-only | One datapoint per remote key. A key press sets it to `true` for a moment and back to `false`; holding a key keeps it `true` until it is released. |

Typing on the remote's keyboard (`Lit_a`) and app launches appear in `command` only —
they do not get datapoints of their own.

## Using it in a script

The usual way is to react to a key becoming `true`:

```javascript
on({ id: "fakeroku.0.Living_room.keys.Play", val: true }, () => {
  // your action
});
```

Or watch `command` if you want to handle several buttons in one place:

```javascript
on({ id: "fakeroku.0.Living_room.command" }, obj => {
  log("Remote sent: " + obj.state.val);
});
```

The key datapoints are reset to `false` every time the adapter starts, so a key that
was left pressed when ioBroker stopped cannot block your rule afterwards. A key release
is never dropped, not even while the adapter is shedding a flood of commands.

## Ports the adapter uses

- **TCP 8060** (one per emulated Roku, configurable) — the control protocol. Your
  remote sends its key presses here.
- **UDP 1900** (multicast) — device discovery, so the remote finds the emulated
  Rokus. This port is fixed by the standard and shared by all of them.

Only devices on your own local network are answered. A request from the internet is
refused, and a discovery search from outside is ignored.

When you stop the instance, the emulated Rokus announce their departure, so a remote
drops them from its list instead of sending key presses into the void for another hour.

You can run more than one instance on the same machine — give each one its own ECP
ports. Discovery is shared: whichever instance starts first takes UDP 1900, and the
others keep working without it, so remotes already paired with them still get through.

The adapter also runs in ioBroker's compact mode, where several adapters share one
process instead of each starting their own. On a small box that saves memory and
startup time. You switch it on in the instance settings; nothing here needs changing.

## Troubleshooting

**The remote does not find any device.**
Check that the hub and the ioBroker host are on the same network and that no
firewall blocks UDP port 1900. On a host with several network cards, select the
right one under **Network interface**. If discovery is unavailable the adapter says
so in the log and keeps working for remotes that were already paired.

**The remote finds nothing, and the log says "advertising on 172.17.x.x".**
That address belongs to a Docker bridge on the host, not to your home network — no
remote can reach it. The adapter prefers a real network address on its own, so this
only shows up when the host has nothing else to offer at that moment. Pick the correct
card under **Network interface** and restart the instance.

**The instance stays "not connected".**
At least one configured Roku could not start. The log names the device and its port —
almost always the port is already used by something else (including another emulated
Roku with the same port). Give it a free port.
The adapter keeps trying such a device once a minute and says so in the log when it
comes up, so a port that was still held by the previous process after a restart sorts
itself out without you doing anything.

**I press a button and nothing happens in ioBroker.**
Set the instance log level to `debug` for a moment. Every received command is logged
with the key name and the address it came from. If nothing appears, the remote is not
reaching the adapter; if it appears, the command arrived and the problem is in the
script reading the datapoint.

**Play and pause do the same thing.**
That is the Roku protocol, not the adapter: the remote sends the _same_ command for
play and for pause, so the two cannot be told apart here.

**The app buttons on my Harmony do nothing.**
Harmony's app buttons (Netflix, YouTube …) are bound to Harmony activities and are
never sent to the device, so the adapter never sees them.

## Privacy

The adapter talks only to devices on your local network. It contacts no cloud
service and sends no data anywhere. Optional error reporting via Sentry is off
unless you enabled diagnostics in the ioBroker system settings; it transmits an
anonymous installation id and the error itself, no personal data.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.6.1 (2026-09-07)

- (krobipd) Changed: installing straight from GitHub is no longer offered — the adapter is built before publishing, so it is installed from the ioBroker repository instead.

### 1.6.0 (2026-09-07)

- (krobipd) Fixed: saving a device in the admin could change its identity on the network, so a paired Harmony or Sofabaton lost it.
- (krobipd) Fixed: with the device list open twice, editing or deleting a card could hit a different emulated Roku than the one clicked.
- (krobipd) Fixed: releasing a key was dropped while the adapter shed a flood of commands, so the key could stay pressed for half a minute.
- (krobipd) Fixed: an ECP port still held after a restart left that device dead until you restarted the instance; it is retried every minute now.
- (krobipd) Fixed: stopping the instance now takes the emulated Rokus out of the remote's list instead of leaving them there for up to an hour.
- (krobipd) Fixed: an emulated Roku whose server died is no longer offered for discovery.
- (krobipd) Fixed: a configured port no server can bind falls back to 8060 instead of leaving the device unstarted.
- (krobipd) Changed: the device dialog refuses a reserved or colliding name right away instead of reporting it after saving.
- (krobipd) Changed: the adapter can now run in compact mode, sharing one process with other adapters instead of claiming its own.
- (krobipd) Changed: more than one instance may run on the same machine again; only the ports have to differ.

### 1.5.0 (2026-09-03)

- (krobipd) Fixed: deleting the last emulated Roku left all of its datapoints behind for good. They are now removed whenever the configuration says a device is gone.
- (krobipd) Fixed: on a host running Docker the adapter could announce itself under a container address no remote can reach. A real network address is preferred now.
- (krobipd) Fixed: an emulated Roku whose server died while running left the instance showing "connected". It now reports the failure and names the device.

### 1.4.0 (2026-09-03)
- (krobipd) Fixed: renaming an emulated Roku could change its identity on the network, so a paired Harmony or Sofabaton lost the device and had to be set up again.
- (krobipd) Fixed: a remote key that was pressed when the adapter stopped stayed on for good. All key datapoints are now released at start-up, so the next press works again.
- (krobipd) Fixed: a device named "info" entered by hand into the configuration replaced the instance's own status channel. The name is refused now and leftovers are removed.
- (krobipd) Changed: every datapoint now carries a translated name and, where useful, a short description — in all eleven languages, in existing installations as well.
- (krobipd) Improved: a remote with a globally routable IPv6 address is accepted when it sits in the same network as the ioBroker host, not just on the reserved IPv6 ranges.
- (krobipd) New: user documentation in English and German, shown in the ioBroker documentation portal.

### 1.3.0 (2026-09-01)
- (krobipd) Fixed: a malformed keyboard keypress from a remote (a bad %-escape in the URL) could crash the adapter.
- (krobipd) Fixed: remotes on an IPv6-only local network were refused; link-local and unique-local IPv6 addresses now count as LAN.
- (krobipd) Fixed: the adapter icon in the admin is now the same one shown on GitHub.
- (krobipd) Changed: requires admin >= 8.0.11.
- (krobipd) Improved: discovery answers only searches from your own network, and the device dialog in the admin keeps working after the device list was edited by hand.
- (krobipd) Improved: the emulated Roku reports Roku OS 15.0 (was 14.1), and the command-type datapoint lists its possible values so the admin shows them as labels.
- (krobipd) New: a misbehaving device on your network can no longer flood ioBroker — more than 25 commands per second per emulated Roku are dropped and reported in the log.

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