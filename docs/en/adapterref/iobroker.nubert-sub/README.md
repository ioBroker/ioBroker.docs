![Logo](admin/nubert-sub.png)

# ioBroker.nubert-sub

[![NPM version](https://img.shields.io/npm/v/iobroker.nubert-sub.svg)](https://www.npmjs.com/package/iobroker.nubert-sub)
[![Downloads](https://img.shields.io/npm/dm/iobroker.nubert-sub.svg)](https://www.npmjs.com/package/iobroker.nubert-sub)
![Test and Release](https://github.com/Smallfeuer/ioBroker.nubert-sub/workflows/Test%20and%20Release/badge.svg)

Control a **Nubert X-Sub** subwoofer from ioBroker via Bluetooth LE.
Manufacturer: [Nubert electronic GmbH](https://www.nubert.de/).

> **Unofficial project.** Not affiliated with, endorsed or supported by Nubert electronic GmbH.
> "Nubert" and "X-Sub" are trademarks of their respective owner and are used here only to describe
> which device this adapter works with. Use at your own risk.

**[German guide](https://github.com/Smallfeuer/ioBroker.nubert-sub/blob/main/docs/de/README.md)**

## Features

| State | Type | Description |
|---|---|---|
| `power` | boolean, rw | on (`true`) / standby (`false`) |
| `level` | number, rw | level in dB, −15 … +6 |
| `lowpass` | number, rw | low-pass frequency in Hz, 35 … 140 (5 Hz steps) |
| `phase180` | boolean, rw | phase 0° / 180° |
| `roomEq` | boolean, ro | room EQ active |
| `refresh` | button | read status now |
| `firmware`, `lastReply`, `error` | string, ro | diagnostics |
| `raw` | string, rw | send raw hex bytes (experts only) |
| `info.connection` | boolean, ro | sub reachable (last connect succeeded) – instance status green/red |
| `bleConnected` | boolean, ro | BLE link open right now (only for a few seconds per command) |

The sub accepts **only one BLE connection**. The adapter connects on demand and disconnects a few
seconds after the last activity, so the X-Remote app can still be used in between.
Status is read at start-up, right after switching on, and once after the last command (default 60 s).
There is no periodic polling.

## Setup guide

### 1. Requirements

- Linux with **BlueZ** and a Bluetooth LE adapter (built-in or USB dongle), within ~10 m of the sub
- ioBroker with js-controller ≥ 6, Node.js ≥ 22

Check on the ioBroker machine:

```bash
bluetoothctl show        # must list a controller with "Powered: yes"
```

| Platform | What to do |
|---|---|
| **Raspberry Pi OS** | Usually nothing. If `bluetoothctl show` says *No default controller available*: `sudo rfkill unblock bluetooth && sudo systemctl enable --now bluetooth` |
| **Debian / Ubuntu** | `sudo apt install bluez && sudo systemctl enable --now bluetooth` |
| **Proxmox VM** | Pass the USB dongle through to the VM: `qm set <vmid> -usb1 host=<vendor>:<product>` (IDs from `lsusb` on the host). Do not use the dongle on the host at the same time. Inside the VM install BlueZ as above. |
| **Docker** *(untested)* | BlueZ runs on the host. Mount the system D-Bus into the container: `-v /run/dbus:/run/dbus:ro` |
| **Proxmox LXC** *(untested)* | Like Docker: BlueZ on the host, bind-mount `/run/dbus` into the container |

If the log shows `org.freedesktop.DBus.Error.AccessDenied`, allow the ioBroker user to use BlueZ:

```bash
sudo usermod -aG bluetooth iobroker
iobroker restart
```

### 2. Install the adapter

Install it in the ioBroker Admin: **Adapters** → search for "nubert-sub" → install, then add an instance.
(While the adapter is new, it is available in the "latest" repository.)

### 3. Configure

1. Make sure the sub is powered and the **X-Remote app is disconnected** (close it on the phone).
2. Open the instance settings and press **Search sub (10 s)**.
   The address of the nearest Nubert device is entered and saved automatically.
3. Alternatively enter the address by hand. Find it with `bluetoothctl` → `scan le` → line *nubert X-Sub*.

Other settings: Bluetooth adapter (empty = default, e.g. `hci1` for a second dongle),
delay of the status read-back, idle time until disconnect.

### 4. Status and error messages

- **Instance status** ("connected to device or service"): green while the sub is reachable,
  red after the start or after a command failed to connect (5 attempts).
- State **`error`**: text of the last error, empty again after the next success.
- **Log**: `error` = sub or Bluetooth adapter not reachable, `warn` = single command failed,
  `info` = start, search results, connect needed several attempts, `debug` = all bytes sent/received.
- There is no automatic retry in the background; the next command or `refresh` tries again.

### 5. Troubleshooting

| Symptom | Cause / fix |
|---|---|
| *sub not reachable (… attempts; …)* | Close the X-Remote app (while it is connected the sub is invisible), check power and distance. |
| *Search sub*: nothing found | Sub without power, app connected, or too far away. |
| *Bluetooth adapter … not available* | No controller: see step 1, or wrong name in "Bluetooth adapter". |
| Kernel log `command 0x200c tx timeout`, adapter resets | Known issue of Realtek RTL8761B dongles. The adapter retries; a dongle with another chip (Intel, CSR, Broadcom) avoids it. |
| Switching takes several seconds | First connect attempt aborted by BlueZ (`le-connection-abort-by-local`); the adapter retries after 1 s. Enable debug log for details. |

## Protocol

Protocol details were determined for interoperability purposes. See also the independent
projects [nubertctl](https://github.com/trougnouf/nubertctl) and
[nubert-bluetooth](https://www.npmjs.com/package/nubert-bluetooth).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.6 (2026-11-18)
- All 11 languages for the name of `info.connection` (object check E6001)
- Timer settings also limited in code (read-back 5 to 600 s, idle 2 to 300 s)
- "Search sub": error text translated via admin i18n instead of an own language switch
- README: link to the manufacturer

### 0.4.5
- Type checking (tsconfig, `npm run check`), admin >= 7.6.20
- Clean shutdown without "delay called" warning
- Dependabot: auto-merge of patch/minor updates after all checks passed
- Older changelog moved to CHANGELOG_OLD.md

### 0.4.3
- Object names in all ioBroker languages; role of `bleConnected` is now `indicator`

### 0.4.2
- Fixes from the ioBroker repository check: adapter timers instead of plain setTimeout, current dependencies, tests with Node.js 26, German guide moved to docs/de

### 0.4.1
- Release via npm trusted publishing (no tokens)

### 0.4.0
- Translations (11 languages), icon, automatic tests, npm release

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 Smallfeuer <small@dclu.de>

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