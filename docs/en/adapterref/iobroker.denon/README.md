---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.denon.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.denon.svg
BADGE-Number of Installations: https://iobroker.live/badges/denon-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/denon-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.denon.png?downloads=true
BADGE-Test and Release: https://github.com/iobroker-community-adapters/ioBroker.denon/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"en/adapterref/iobroker.denon/README.md":{"title":{"en":"ioBroker.denon"},"content":"en/adapterref/iobroker.denon/README.md"},"en/adapterref/iobroker.denon/docs/en/states.md":{"title":{"en":"All states"},"content":"en/adapterref/iobroker.denon/docs/en/states.md"},"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md":{"title":{"en":"Upgrading from 1.x to 2.0"},"content":"en/adapterref/iobroker.denon/docs/en/upgrade-1x.md"}}}
---
![Logo](admin/denon.png)

# ioBroker.denon

[![NPM version](https://img.shields.io/npm/v/iobroker.denon.svg)](https://www.npmjs.com/package/iobroker.denon)
[![Downloads](https://img.shields.io/npm/dm/iobroker.denon.svg)](https://www.npmjs.com/package/iobroker.denon)
![Number of Installations](https://iobroker.live/badges/denon-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/denon-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.denon.png?downloads=true)](https://nodei.co/npm/iobroker.denon/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.denon/workflows/Test%20and%20Release/badge.svg)

> [!IMPORTANT]
> This adapter cannot be installed from github

## Denon/Marantz AVR adapter for ioBroker

Control your Denon or Marantz AV receiver from ioBroker: power, volume, input, surround mode, zone 2/3, tuner and many
sound and video settings. Changes made on the receiver (e.g. with the remote) show up in ioBroker immediately.

[🇩🇪 Deutsche Dokumentation](https://github.com/iobroker-community-adapters/ioBroker.denon/blob/master/docs/de/README.md)

## Disclaimer

DENON and Marantz are trademarks of D&M Holdings Inc.
The developers of this module are in no way endorsed by or affiliated with D&M Holdings Inc.,
or any associated subsidiaries, logos or trademarks.

## Quick start

1. On the receiver, set "Network" → "Network Control" to **"Always On"** (details [below](#network-setup-of-the-av-receiver)).
2. In ioBroker open the tab "Adapters", search for **denon** and click "+".
3. Enter the IP address of the receiver in the instance settings (or pick it from the list of found devices) and save.
4. After a few seconds `info.connection` turns green and the states of your receiver appear under `denon.0`.

That's all. Which states are created depends on the model: the adapter only creates what your receiver supports.

Requirements: Denon or Marantz AV receiver in the network (LAN or WLAN), Node.js >= 22.19, js-controller >= 7.2.5, admin >= 8.3.5.

## Most important states

For VIS, Blockly or scripts these are usually enough (`zone2` and `zone3` work the same as `main`):

| State | Purpose | Example |
|---|---|---|
| `denon.0.system.power` | whole receiver on / standby | `true` = on, `false` = everything off |
| `denon.0.main.power` | main zone only on/off | `true` |
| `denon.0.main.volume` | volume (0 ... 98, as on the display) | `40` |
| `denon.0.main.mute` | mute | `true` |
| `denon.0.main.input` | select input | `TV` or the name from the receiver menu, e.g. `TV Audio` |
| `denon.0.main.quickSelect` | recall quick select (Marantz: smart select) | `1` |
| `denon.0.main.surroundMode` | surround mode | `STEREO` |
| `denon.0.info.connection` | connected to the receiver | `true` |

Buttons like `main.volumeUp` or `remote.up` are triggered with `true`. All other states: [All states](/#/docs/adapterref/iobroker.denon/docs/en/states.md).

## Configuration

Usually only the IP address has to be entered.

| Setting | Meaning |
|---|---|
| IP address of the receiver | e.g. `192.168.1.50` (IPv6 and hostnames work too). While the instance is running, receivers found in the network are suggested. The search only finds devices in the same network as ioBroker, otherwise enter the address manually. |
| Update interval (ms) | How often values the receiver does not report by itself are read (e.g. sleep timer). Default 7000 = every 7 seconds |
| Pause between commands (ms) | Only increase it if the receiver misses commands. Default 100, minimum 50 |
| Port | Always 23. Only change it for a serial-to-network converter |
| Detect brand, model and zones automatically | Recommended. Reads brand, model and number of zones from the receiver at startup. Control always uses port 23 |

## Network setup of the AV receiver

1. Press the SETUP button on the remote, the menu appears on the front display and the TV
2. Select "Network" → "Settings" and configure
    * DHCP: "On" if a DHCP server (e.g. router) is available, otherwise set IP address, subnet mask and gateway manually
    * Proxy: "Off"
3. Select "Network" → "Network Control" (on some models "IP Control") and set it to **"Always On"**.
   With "Off In Standby" the receiver ignores network commands in standby and cannot be switched on by ioBroker.

Tip: give the receiver a fixed IP address in your router, so the address does not change.

## FAQ

**`info.connection` does not turn green**
* Is the IP address correct? It is shown in the receiver menu under "Network" → "Information" or in the device list of your router.
* The receiver allows only **one** control connection. If another app controls it (Home Assistant, a second ioBroker, a script), the adapter gets no connection.
* Is "Network Control" set to "Always On"?

**The receiver cannot be switched on**
* "Network Control" is probably set to "Off In Standby". Set it to "Always On".

**A state is missing**
* The adapter only creates states the receiver answers to. If one is missing, your model does not have this function (e.g. bass/treble in zone 2 on the AVR-X2200W).
* Some values are only reported while the zone is switched on.

**An input is missing in the list or has another name**
* The list comes from the receiver: inputs hidden in the receiver menu are hidden here too, renamed inputs show the new name. Restart the instance after changing this in the receiver.

**Display, cover or playback buttons are missing**
* Models with HEOS (from about 2016) do not provide this information via the control connection.
* For playback control, now playing information and cover on these models use the [HEOS adapter](https://github.com/withstu/ioBroker.heos) in addition to this adapter. Both can run at the same time.

## Upgrading from 1.x

Version 2.0 renames all states (e.g. `zoneMain.powerZone` → `main.power`) and deletes the old object tree on the first start.
Scripts, VIS and aliases have to be adjusted, history settings on the states are lost. Please make a backup first.
The complete table old → new: [Upgrading from 1.x](/#/docs/adapterref/iobroker.denon/docs/en/upgrade-1x.md)

## All states and details

* [All states](/#/docs/adapterref/iobroker.denon/docs/en/states.md) – every state with description
* [Multi zone amplifiers (DENON POA-3012CI)](/#/docs/adapterref/iobroker.denon/docs/en/states.md#multi-zone-amplifiers-denon-poa-3012ci)
* [Technical details](/#/docs/adapterref/iobroker.denon/docs/en/states.md#technical-details) – connection, command pacing, Denon/Marantz differences

## Missing functions & bugs

If you are missing any functions or detected a bug, please open an [issue](https://github.com/iobroker-community-adapters/ioBroker.denon/issues).
Please add a debug log and the model of your receiver.

Version 2.0 is tested with a Denon AVR-X2200W. Testers reported it working with a Marantz CINEMA 60 and a Marantz SR6011.

## Credits

This adapter would not have been possible without the great work of @foxriver76 (https://github.com/foxriver76), who developed former releases of this adapter.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2026-11-20)
* (Schimi1983) README: hint to the HEOS adapter for playback and now playing on HEOS models
* (Schimi1983) Marantz Cinema: new state `main.audio.autoLipSync`, `tuner.preset` shows `0` when no preset is selected (`TPANOFF`)

### 2.0.2 (2026-11-19)
* (Schimi1983) new settings from the Marantz Cinema protocols: M-DAX, IMAX Enhanced, DAC filter, illumination; Bass Sync
* (Schimi1983) README shortened: list of all states and upgrade table moved to the docs folder

### 2.0.1 (2026-11-19)
* (Schimi1983) value lists are updated with extendObject instead of setObject, old workflow file removed (#451)
* (Schimi1983) Marantz Cinema: option lines (`OPINF…`) are no longer logged as unhandled
* (Schimi1983) audio signal code 12 is shown as "No signal" (Marantz Cinema sends it in standby)

### 2.0.0 (2026-11-17)
* (Schimi1983) **Breaking change:** complete rework of the adapter. All states have new names (e.g. `zoneMain.powerZone` → `main.power`), the old object tree is deleted on the first start. Scripts, VIS and aliases must be adjusted, see "Upgrade from 1.x" in the README
* (Schimi1983) stable connection with automatic reconnect, new configuration page, input names from the receiver, states only for functions the receiver supports
* (Schimi1983) requires Node.js 22.19 or newer, js-controller 7.2.5 or newer and admin 8.3.5 or newer
* (Schimi1983) adapter is now maintained by iobroker-community-adapters

Older changes can be found in CHANGELOG_OLD.md

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2026 Moritz Heusinger <moritz.heusinger@gmail.com>

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