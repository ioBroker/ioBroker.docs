![Logo](admin/melcloud.png)

_Icon made by [Freepik](https://www.flaticon.com/authors/freepik) from [www.flaticon.com](https://www.flaticon.com/")_

# ioBroker.melcloud

[![NPM version](http://img.shields.io/npm/v/iobroker.melcloud.svg)](https://www.npmjs.com/package/iobroker.melcloud)
[![Downloads](https://img.shields.io/npm/dm/iobroker.melcloud.svg)](https://www.npmjs.com/package/iobroker.melcloud)
![Number of Installations (latest)](http://iobroker.live/badges/melcloud-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/melcloud-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud/badge.svg)](https://snyk.io/test/github/Black-Thunder/ioBroker.melcloud)

[![NPM](https://nodei.co/npm/iobroker.melcloud.png?downloads=true)](https://nodei.co/npm/iobroker.melcloud/)

[![Test and Release](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/test-and-release.yml) [![Reviewdog](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.melcloud/actions/workflows/code-quality.yml)

## melcloud adapter for ioBroker

This adapter integrates Mitsubishi Electric devices via MELCloud (https://www.melcloud.com/) into ioBroker.

Documentation:

- [English description](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/en/melcloud.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.melcloud/tree/master/docs/de/melcloud.md)

Discussion:

- [ioBroker Forum](https://forum.iobroker.net/topic/40705/)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 3.0.4 (2026-04-10)

- (Black-Thunder) Retry and queue handling was added when device information is missing

### 3.0.3 (2026-01-21)

- (Black-Thunder) Setting ATW device zone operation modes was fixed
- (Black-Thunder) Dependencies were updated

### 3.0.2 (2025-12-07)

- (Black-Thunder) Dependencies were updated

### 3.0.1 (2025-08-13)

- (Black-Thunder) Setting a state value is now more tolerant of strings.
- (Black-Thunder) Fixed a bug that caused subsequent commands to fail after a failed state change.

### 3.0.0 (2025-07-29)

- (Black-Thunder) Adapter requires node.js >= 20, admin >= 7.4.10 and js-controller >= 6 now
- (Black-Thunder) Experimental support for ERV devices was added
- (Black-Thunder) Dependencies were updated and code refactorings applied

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
