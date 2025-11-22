![Logo](docs/_media/ioBroker.euSec.png)
# ioBroker.euSec

[![NPM version](https://img.shields.io/npm/v/iobroker.eusec.svg)](https://www.npmjs.com/package/iobroker.eusec)
[![Downloads](https://img.shields.io/npm/dm/iobroker.eusec.svg)](https://www.npmjs.com/package/iobroker.eusec)
[![Total Downloads](https://img.shields.io/npm/dt/iobroker.eusec.svg)](https://www.npmjs.com/package/iobroker.eusec)
![Node version requirement](https://img.shields.io/node/v/iobroker.eusec)
![Number of Installations (latest)](https://iobroker.live/badges/eusec-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/eusec-stable.svg)
[![Dependency Status](https://img.shields.io/librariesio/release/npm/iobroker.eusec)](https://libraries.io/npm/iobroker.eusec)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.eusec/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.eusec.png?downloads=true)](https://nodei.co/npm/iobroker.eusec/)

This is an [ioBroker](https://www.iobroker.net) adapter that uses the [eufy-security-client](https://github.com/bropat/eufy-security-client) library to comunicate with Eufy devices.

**This project is not affiliated with Anker and Eufy (Eufy Security). It is a personal project that is maintained in spare time.**

## Description

This adapter allows to control [Eufy security devices](https://us.eufylife.com/collections/security) by connecting to the Eufy cloud servers and local/remote stations.

You need to provide your Cloud login credentials. The adapter connects to your cloud account and polls for all device data via HTTPS. Now a local or remote P2P connection to the Eufy stations/devices is also supported. However, a connection to the Eufy Cloud is always a prerequisite.

One Adapter instance will show all devices from one Eufy Cloud account and allows to control them.

## Documentation

Checkout the documentation [here](https://iobroker-community-adapters.github.io/ioBroker.eusec/).

## Known working devices

Information about supported devices can be found [here](https://github.com/bropat/eufy-security-client#known-working-devices).

## Credits

This adapter would not have been possible without the great work of Patrick Broetto (brobat) <https://github.com/bropat>, who created previous releases of this adapter.

## IMPORTANT information when upgrading to node.js 22

Adapter 2.0.3 and newer support node.js 22. Prior node.js version require a special setup which became invalid with node.js 22. So when upgrading node.js form any version lower then 22.x.x to node.js 22 please follow these steps:

- If you have node.js < 22 and adapter < 2.0.0 installed, please update node.js first and install adapter 2.0.3 afterwards.
- If you have adapter >= 2.0.0 installed with any node release prio than 22 you MUST reinstall the adapter. A detailled description (in german) is available at our forum (https://forum.iobroker.net/topic/82651/test-adapter-eusec-v2-0-x)
  
## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.3 (2025-10-26)
- (mcm1957) Remove fix for CVE-2023-46809 for node.js 22 and newer

### 2.0.0 (2025-10-26)

- (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation
- (mcm1957) Adapter requires node.js >= 20, js-controller >= 6.0.11 and admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 1.3.3 (2024-09-28)

* (bropat) Updated version of the package eufy-security-client (3.1.1)
* (bropat) Further details can be found in the changelog of eufy-security-client (3.1.1)

### 1.3.2 (2024-09-10)

* (bropat) Fixed issue #440

### 1.3.1 (2024-09-08)

* (bropat) Fixed issue #436
* (bropat) Fixed issue #439

## License

MIT License

Copyright (c) 2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2024 bropat <patrick.broetto@gmail.com>

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
