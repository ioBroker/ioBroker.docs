![Logo](admin/smartfriends.png)

# ioBroker.smartfriends

[![NPM version](http://img.shields.io/npm/v/iobroker.smartfriends.svg)](https://www.npmjs.com/package/iobroker.smartfriends)
[![Downloads](https://img.shields.io/npm/dm/iobroker.smartfriends.svg)](https://www.npmjs.com/package/iobroker.smartfriends)
![Number of Installations (latest)](http://iobroker.live/badges/smartfriends-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/smartfriends-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Black-Thunder/ioBroker.smartfriends/badge.svg)](https://snyk.io/test/github/Black-Thunder/ioBroker.smartfriends)

[![NPM](https://nodei.co/npm/iobroker.smartfriends.png?downloads=true)](https://nodei.co/npm/iobroker.smartfriends/)

[![Test and Release](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/test-and-release.yml) [![Reviewdog](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.smartfriends/actions/workflows/code-quality.yml)

## smartfriends adapter for ioBroker

This adapter enables a direct **local integration** of the **SmartFriends Box** (e.g. Smart Friends Box by Schellenberg, ABUS, Paulmann, STEINEL, etc.) into ioBroker – **without using the official cloud**.

The adapter establishes a direct connection to the gateway to control and query devices locally.

## Documentation:

- [English description](https://github.com/Black-Thunder/ioBroker.smartfriends/tree/master/docs/en/smartfriends.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.smartfriends/tree/master/docs/de/smartfriends.md)

## Discussion:

- [ioBroker Forum](https://forum.iobroker.net/topic/83202)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 2.0.0 (2026-06-01)

- (copilot) Adapter requires node.js >= 22 now
- (Black-Thunder) Additional irrelevant gateway messages are now ignored
- (Black-Thunder) Dependencies were updated

### 1.3.6 (2026-03-13)

- (Black-Thunder) Connection and reconnection logic to the gateway was refactored
- (Black-Thunder) Additional irrelevant gateway messages are now ignored
- (Black-Thunder) Adapter requires admin version >=7.6.20 now

### 1.3.5 (2026-02-24)

- (Black-Thunder) Additional logging when connection parameters are incorrect was added
- (Black-Thunder) Validation of the adapter configuration in the GUI was added

### 1.3.4 (2026-01-21)

- (Black-Thunder) Additional irrelevant gateway messages are now ignored
- (Black-Thunder) Unknown gateway messages are now logged as warning instead of error

### 1.3.3 (2026-01-18)

- (Black-Thunder) Special characters in device definitions (e.g. "<>") are now correctly handled
- (Black-Thunder) Boolean values in device definitions are now correctly handled
- (Black-Thunder) Numeric sensor values are no longer rounded

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Acknowledgements

Special thanks und credits to [LoPablo](https://github.com/LoPablo/SchellenbergApi) for reverse engineering the API!

## License

MIT License

Copyright (c) 2025-2026 Black-Thunder <glwars@aol.de>

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
