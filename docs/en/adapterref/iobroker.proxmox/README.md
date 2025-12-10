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
BADGE-Stable: http://iobroker.live/badges/proxmox-stable.svg
BADGE-Installed: http://iobroker.live/badges/proxmox-installed.svg
---
![Logo](../../admin/proxmox.png)

# ioBroker.proxmox

## Anforderungen
- Node.js 18 (or later)
- js-controller 5.0.19 (or later)
- Admin Adapter 6.13.16 (or later)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.4.2 (2025-12-07)
* (arteck) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
* (Scrounger) some improvements
* (arteck) Dependencies have been updated
* (arteck) migrate to eslint 9

### 2.4.0 (2025-01-27)
* (mcm1957) BREAKING: you must enter your configuration data again at the config page.

### 2.3.1 (2025-01-26)
* (arteck) new settings structure
* (arteck) fix storage request
* (arteck) add new eslint file
* (arteck) fix node message
* (arteck) refactor

### 2.3.0 (2024-04-26)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (jens-maus) fix ha and ceph object type
* (mcm1957) Dependencies have been updated

### 2.2.3 (2024-02-01)
* (arteck) add icon status available for lxc and vm
* (arteck) settings adjustment

## License

The MIT License (MIT)

Copyright (c) 2023-2025 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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