---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.proxmox?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.proxmox?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.proxmox?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.proxmox?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.proxmox?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.proxmox?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.proxmox/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.proxmox.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/proxmox-stable.svg
BADGE-Installed: https://iobroker.live/badges/proxmox-installed.svg
---
![Logo](../../admin/proxmox.png)

# ioBroker.proxmox

## Anforderungen
- Node.js 22.19 (or later)
- js-controller 6.0.11 (or later)
- Admin Adapter 7.7.22 (or later)

## Available updates of the nodes
With the option **Request available updates** the adapter reads the available package updates (apt) of every node that is online.
It does so in the first poll after the start and then in the configured interval (default 60 minutes, at least 10 minutes).

| State | Description |
| --- | --- |
| `node_<name>.updates.count` | Number of available updates |
| `node_<name>.updates.list` | The updates as JSON, for example `[{"package": "pve-manager", "oldVersion": "9.0.1", "version": "9.0.2", "origin": "Proxmox"}]` |
| `node_<name>.updates.refresh` | Button: refreshes the package index of the node (like `apt-get update`) and reads the updates again |

Proxmox refreshes the package index itself once a day. The button is only needed if new updates should show up at once.
The device manager shows the updates in the details of a node.

Permissions of the Proxmox user on `/nodes/<name>`: `Sys.Audit` for reading, `Sys.Modify` for the button.

Only the updates of the Proxmox host are detected. What is installed inside a container or a VM is not available through the Proxmox API.

## vis-2 widget

The widget set "Proxmox" contains a widget for one VM or container. Select the machine from the list. The widget shows the state, uptime, CPU and RAM, and has buttons to start and stop the machine.

- **Show uptime:** the uptime is shown while the machine is running.
- **Show icon:** the color of the icon shows the state. Use **Icon** to choose your own icon, or **Image** to choose your own image file. An image takes precedence over the icon and keeps its own colors.
- **Show controls:** without this option, the widget only displays the state. Use it if a vis project is reachable by people who should not be able to stop machines. The confirmation is no access protection.
- **Stop button:** by default it shuts the machine down cleanly. "Power off immediately" uses the Proxmox command `stop`, which can lose unsaved data.
- After a command, the state updates with the next poll, about 10 seconds later. Until then, the widget shows "In progress".

### Widget "Proxmox node"

The second widget of the set shows a Proxmox node: state, uptime, CPU and RAM, and the available updates. Select the node from the list.

- **Available updates:** "Show and refresh" shows the number of updates and a button that refreshes the package index of the node (like `apt update`). "Show only" shows only the number, "Do not show" hides both. The packages are listed in the tooltip of the indicator.
- The indicator needs the option **Request available updates** in the adapter, the button also needs the permission `Sys.Modify` of the Proxmox user.
- While the package index is refreshed, the button shows "Refreshing". This can take up to two minutes.
- The updates are still installed in the Proxmox web interface, the API cannot do that.
- Uptime, symbol, icon, image and "Without card" work like in the widget for VMs and containers.

## Widgets for devices and web components

The two widgets also exist for the devices adapter and as web components:

- **devices:** "Proxmox VM or container" and "Proxmox node" in the set "Proxmox". Size 1x1 is a tile with the state and one button, 2x0.5 a row, 2x1 a card with CPU and RAM.
- **Web components:** `<iob-proxmox-machine>` and `<iob-proxmox-node>` for Aura and every other UI that shows web components. They adapt to the size of their box: a small box shows a tile, a wide one a card with CPU and RAM. devices offers its own widgets instead of them.

In devices, first select the instance, then the VM, container or node from the list. The list comes from the instance, so it has to be running. In the web components, select the channel in the object tree, for example `proxmox.0.lxc_web` or `proxmox.0.node_pve`. The other settings are the same as in the vis-2 widgets. In devices, a widget that the access rights only allow to read cannot send commands. The confirmation before stopping is no access protection.

After an update of the adapter, run `iobroker upload proxmox` if the new widgets do not appear.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (bluefox) Added the detection of available package updates of the nodes (`node_<name>.updates`)
- (bluefox) Added the vis-2 widget "Proxmox node" with the available updates and a button to refresh them
- (bluefox) Added the widgets "Proxmox VM or container" and "Proxmox node" for the devices adapter and as web components for Aura and other UIs
- (bluefox) Added a notice about the changed object IDs for users updating from 2.x (#717)

### 3.0.0 (2026-11-08)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (bluefox) The adapter was refactored to TypeScript. It can only be installed from npm now, not from GitHub
- (bluefox) Fixed the cleanup button in the configuration dialog, it never got an answer from the adapter
- (bluefox) Repaired the translations of the configuration dialog, which were broken since 2.5.0
- (bluefox) VMs and containers with the same name no longer share their states and buttons: all of them get the object ID `<name>_<vmid>`. Other object IDs do not change (#702)
- (bluefox) Buttons no longer execute their command twice when the states are stored in Redis (#703)
- (bluefox) With several individual nodes, the instances no longer delete each other's objects, which caused a restart loop and missing data. If a node does not answer during the start, old objects are kept until the next start (#697, #622, #612)
- (bluefox) The first poll runs right after the start instead of after the configured interval, so the instance turns green sooner (#678)
- (bluefox) Individual hosts with the same node name, or with VMs and storages of the same name, no longer share their objects: all of them get `_<host>` added to the object ID, for example `node_pve_192-168-1-10`. A button now always reaches the host it belongs to. Other object IDs do not change
- (bluefox) Added the device manager: nodes, VMs and containers with status, CPU and RAM, and start, shutdown, reboot and stop with a confirmation
- (bluefox) Added a vis-2 widget that shows the state of a VM or container and can start and stop it. An option hides the controls
- (bluefox) The device manager cards show an icon per type, the status in color, the uptime, the load with warning colors and a details dialog
- (bluefox) The widget selects the machine from a list and shows the uptime and load bars. An own icon or image can be selected
- (bluefox) Added the state `uptime_text` to nodes, VMs and containers, for example `3 d 4 h`

### 2.6.3 (2026-07-31)
* (arteck) fix next node reconnect
* (arteck) add state info.node for actual node ip

### 2.6.2 (2026-07-15)
* (arteck) restructure ceph health message

### 2.6.1 (2026-05-21)
* (arteck) fix reconnect

### 2.6.0 (2026-05-13)
* (arteck) fix high i/o
* (copilot) Adapter requires node.js >= 22 now

Older changes can be found in CHANGELOG_OLD.md

## License

The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2023 MeisterTR <meistertr.smarthome@gmail.com>

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