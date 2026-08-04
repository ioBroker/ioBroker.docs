![Logo](admin/openmediavault.png)

# ioBroker.openmediavault

[![NPM version](https://img.shields.io/npm/v/iobroker.openmediavault.svg)](https://www.npmjs.com/package/iobroker.openmediavault)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)](https://www.npmjs.com/package/iobroker.openmediavault)
![Number of Installations](https://iobroker.live/badges/openmediavault-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openmediavault-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)](https://nodei.co/npm/iobroker.openmediavault/)

**Tests:** ![Test and Release](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg)

## OpenMediaVault adapter for ioBroker

This adapter allows to read informations from your OpenMediaVault using the rpc interface.

## Configuration

You need the url of your OpenMediavault server and the password of your admin account.<br>
**Note**: using admin account is neccessary because rpc interface is only avaiable for admin

## Known issues

The adapter prevents hard disks from going into standby mode during cyclic polling and wakes them up from standby mode when queried.<br>
The reason is that this is inherent in the design of the rpc api.<br>
[see Details](https://github.com/openmediavault/openmediavault/issues/2063)

To prevent this, the data can also be updated using a cron job.<br>
For example, you can schedule the adapter query for a time when the hard disks are not in standby mode anyway, such as during backup time.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.5.0 (2026-07-13)
- (Scrounger) dependencies updated
- (Scrounger) typescript 6.x bug fixes
- (Scrounger) authentication bug fix for >= v.8.5.x #63
- (copilot) Adapter requires node.js >= 22 now
- (ioBrokerTranslator) spanish language added #57

### 1.4.4 (2026-03-17)

- (Scrounger) dependencies updated

### 1.4.3 (2026-03-09)

- (Scrounger) translation updates
- (Scrounger) dependencies updated
- (Scrounger) downgrade @iobroker/adapter-core to v3.3.1 to prevent conflicts with js-controller < v7.1.0 in rare cases

### 1.4.2 (2025-12-04)

- (Scrounger) connection timeout bug fix

### 1.4.1 (2025-12-02)

- (Scrounger) session expired bug fix

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 Scrounger <scrounger@gmx.net>

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
