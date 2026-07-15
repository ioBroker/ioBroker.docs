![Logo](admin/onlycat.png)

# ioBroker.onlycat

![Current version in stable repository](https://iobroker.live/badges/onlycat-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.onlycat.svg)](https://www.npmjs.com/package/iobroker.onlycat)
[![Downloads](https://img.shields.io/npm/dm/iobroker.onlycat.svg)](https://www.npmjs.com/package/iobroker.onlycat)
![Number of Installations](https://iobroker.live/badges/onlycat-installed.svg)


[![NPM](https://nodei.co/npm/iobroker.onlycat.png?downloads=true)](https://nodei.co/npm/iobroker.onlycat/)

**Tests:** ![Test and Release](https://github.com/Author/ioBroker.onlycat/workflows/Test%20and%20Release/badge.svg)

## Adapter for OnlyCat® cat flaps with prey detection

Adapter for OnlyCat® cat flaps with prey detection.

<p align="center">
  <img src="/admin/onlycat-flap.webp" />
</p>
<p align="center">
  <img style="max-width: 300px" src="/admin/screenshot.jpg" />
</p>

## Configuration

Add device token on the adapter configuration page.
Token can be found in the OnlyCat App on the Account page.

## Description

The adapter provides the events from the OnlyCat cat flap, i.e. entries, exits and prey detection.
It also lets you set the active transit policy.

The adapter requires Node 20 or newer.

## Notes

OnlyCat® is a registered trademarks of [VirtualV Trading Ltd.](https://www.onlycat.com/)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

* (copilot) Adapter requires node.js >= 22 now

### 0.6.1 (2026-05-10)

* (Sickboy78) added image to events

### 0.6.0 (2026-05-04)

* (Sickboy78) added deletedAt, eventManualClassification, eventManualClassificationUserId and link states to events
* (Sickboy78) added rfid code to pet state
* (Sickboy78) fixed some minor bugs
* (Sickboy78) added more unit tests

### 0.5.4 (2026-02-09)

* (Sickboy78) added removal of deleted or renamed devices and transit policies
* (Sickboy78) fixed bug if device has no events

### 0.5.3 (2026-01-09)

* (Sickboy78) dependency updates
* (Sickboy78) add AlCalzone's Release Script

### 0.5.2 (2025-10-22)

* (Sickboy78) dependency updates
* (Sickboy78) migration to npm trusted publishing

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

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

Copyright (c) 2025-2026 Sickboy78 <asmoday_666@gmx.de>