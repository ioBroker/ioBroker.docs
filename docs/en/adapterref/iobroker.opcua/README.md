![Logo](admin/opcua.png)
# ioBroker OPC-UA Adapter

![Number of Installations](http://iobroker.live/badges/opcua-installed.svg) ![Number of Installations](http://iobroker.live/badges/opcua-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.opcua.svg)](https://www.npmjs.com/package/iobroker.opcua)
[![Downloads](https://img.shields.io/npm/dm/iobroker.opcua.svg)](https://www.npmjs.com/package/iobroker.opcua)
[![Tests](https://travis-ci.org/ioBroker/ioBroker.opcua.svg?branch=master)](https://travis-ci.org/ioBroker/ioBroker.opcua)

[![NPM](https://nodei.co/npm/iobroker.opcua.png?downloads=true)](https://nodei.co/npm/iobroker.opcua/)

## Client
**Actually, only client is implemented.**

## Server
The following data types are supported:
- number
- string
- boolean

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
## Changelog
### 3.0.0 (2026-08-13)
* (@GermanBluefox) The adapter no longer terminates the host process in compact mode
* (@GermanBluefox) Added the missing admin dependency and the role of `info.event`
* (@GermanBluefox) Fixed the authentication with user name and password (#64)
* (@GermanBluefox) Adapter requires js-controller >= 6.0.11 now
* (proarsing) The OPC UA server was fixed and the tags are structured now like a unified namespace
* (proarsing) Connected clients are shown in `info.connection`
* (@GermanBluefox) The server uses now the configured certificates
* (@GermanBluefox) The adapter was migrated to TypeScript
* (@GermanBluefox) GUI was migrated to React 19 and MUI 9
* (@GermanBluefox) GUI uses now the design of admin 8
* (@GermanBluefox) The password is stored encrypted now. It must be entered anew
* (@GermanBluefox) The client subscribes only on its own variables and no longer on all own objects
* (@GermanBluefox) Node.js 22 is required now

### 1.2.1 (2025-07-10)
* (bluefox) GUI was migrated vite
* (bluefox) Backend was changed for new js-controller

### 1.1.0 (2024-07-13)
* (bluefox) GUI was migrated to a non-style framework

### 1.0.3 (2024-03-03)
* (bluefox) License changes to the free license (MIT)
* (bluefox) Minimum node.js version 16

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026, Denis Haev (dogafox@gmail.com)

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
