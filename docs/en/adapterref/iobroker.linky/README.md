![Logo](admin/linky.png)
# ioBroker.linky

[![NPM version](https://img.shields.io/npm/v/iobroker.linky.svg)](https://www.npmjs.com/package/iobroker.linky)
[![Downloads](https://img.shields.io/npm/dm/iobroker.linky.svg)](https://www.npmjs.com/package/iobroker.linky)
![Number of Installations](https://iobroker.live/badges/linky-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/linky-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.linky.png?downloads=true)](https://nodei.co/npm/iobroker.linky/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.linky/workflows/Test%20and%20Release/badge.svg)

## linky adapter for ioBroker

Read data from Linky smart electricity meters, in fact any meter supporting the French Teleinfo protocol: https://www.enedis.fr/sites/default/files/Enedis-NOI-CPT_54E.pdf

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.0 (2026-05-14)
- (copilot) Adapter requires node.js >= 22 now
- (raintonr) Clean up states: read only, `value.power.consumption` has been replaced with `value.energy` & `value.power.reactive` added.

### 0.0.3 (2026-04-06)
- (copilot) Adapter requires admin >= 7.7.22 now
- (raintonr) Added layout options

### 0.0.2 (2026-03-31)
- (raintonr) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2026 Robin Rainton <robin@rainton.com>

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