![Logo](admin/openmediavault.png)

# ioBroker.openmediavault

[![NPM version](https://img.shields.io/npm/v/iobroker.openmediavault.svg)](https://www.npmjs.com/package/iobroker.openmediavault)
[![Downloads](https://img.shields.io/npm/dm/iobroker.openmediavault.svg)](https://www.npmjs.com/package/iobroker.openmediavault)
![Number of Installations](https://iobroker.live/badges/openmediavault-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/openmediavault-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.openmediavault.png?downloads=true)](https://nodei.co/npm/iobroker.openmediavault/)

**Tests:** ![Test and Release](https://github.com/Scrounger/ioBroker.openmediavault/workflows/Test%20and%20Release/badge.svg)

## openmediavault adapter for ioBroker

This adapter allows to read informations from your OpenMediaVault using the rpc interface.

## Configuration

You need the url of your OpenMediavault server and the password of your admin account.
**Note**: using admin account is neccessary because rpc interface is only avaiable for admin

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.3.0 (2025-11-24)

- (Scrounger) s.m.a.r.t. error indicator added
- (Scrounger) filesystem status, isOnline, hasErrors indicators added

### 1.2.0 (2025-11-23)

- (Scrounger) using disk uuid as channel id for disk and s.m.a.r.t -> Breaking Change !!!
- (Scrounger) bug fixes

### 1.1.0 (2025-11-21)

- (Scrounger) additonal s.m.a.r.t. attributes added
- (Scrounger) dependencies updated

### 1.0.4 (2025-10-19)

- (Scrounger) auto translation bug fix
- (Scrounger) bug fixes

### 1.0.3 (2025-09-30)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.2 (2025-09-27)

- (Scrounger) bug fixes

### 1.0.1 (2025-09-21)

- (Scrounger) dependencies updated
- (Scrounger) bug fixes

### 1.0.0 (2025-09-11)

- (Scrounger) automatic role assignment implemented
- (Scrounger) translation added

### 1.0.0-beta.2 (2025-08-31)

- (Scrounger) adapter config layout bug fixes
- (Scrounger) converted to esm project
- (Scrounger) bug fixes

### 1.0.0-beta.1 (2025-07-08)

- (Scrounger) devices blacklist / whitelist added
- (Scrounger) bug fixes

### 1.0.0-beta.0 (2025-07-07)

- (Scrounger) initial release

## License

MIT License

Copyright (c) 2025 Scrounger <scrounger@gmx.net>

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
