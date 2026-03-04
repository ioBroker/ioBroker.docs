![Logo](admin/mitsubishi-local-control.png)

# ioBroker.mitsubishi-local-control

[![NPM version](https://img.shields.io/npm/v/iobroker.mitsubishi-local-control.svg)](https://www.npmjs.com/package/iobroker.mitsubishi-local-control)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mitsubishi-local-control.svg)](https://www.npmjs.com/package/iobroker.mitsubishi-local-control)
![Number of Installations](https://iobroker.live/badges/mitsubishi-local-control-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/mitsubishi-local-control-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.mitsubishi-local-control.png?downloads=true)](https://nodei.co/npm/iobroker.mitsubishi-local-control/)

[![Test and Release](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/actions/workflows/test-and-release.yml) [![Reviewdog](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/actions/workflows/code-quality.yml/badge.svg)](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/actions/workflows/code-quality.yml) [![Known Vulnerabilities](https://snyk.io/test/github/Black-Thunder/ioBroker.mitsubishi-local-control/badge.svg)](https://snyk.io/test/github/Black-Thunder/ioBroker.mitsubishi-local-control)

## mitsubishi-local-control adapter for ioBroker

The **mitsubishi-local-control** adapter integrates Mitsubishi Electric air conditioning systems into **ioBroker** using a **direct local connection**.

## Features

- Direct local control via Mitsubishi Wi-Fi interface
- No cloud, no external dependencies
- Read and write device states
- Periodic polling of device status
- Support for multiple devices
- Automatic device state synchronization

## Documentation:

- [English description](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/en/mitsubishi-local-control.md)
- [Deutsche Beschreibung](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/de/mitsubishi-local-control.md)

## Discussion:

- [ioBroker Forum](https://forum.iobroker.net/topic/83267)

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Black-Thunder) Adapter requires admin version >=7.6.20 now

### 1.0.5 (2026-01-13)

- (Black-Thunder) Creation of adapter objects was fixed

### 1.0.4 (2026-01-11)

- (Black-Thunder) Dependencies were updated

### 1.0.3 (2025-12-29)

- (Black-Thunder) Cleaned up some code

### 1.0.2 (2025-12-25)

- (Black-Thunder) Implemented command coalescing and mapped AUTO mode correctly

### 1.0.1 (2025-12-21)

- (Black-Thunder) Refactored energy and power state properties

### 1.0.0 (2025-12-18)

- (Black-Thunder) initial release

## Acknowledgements

Special thanks und credits to [niobos](https://github.com/pymitsubishi/pymitsubishi) for reverse engineering the API!

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
