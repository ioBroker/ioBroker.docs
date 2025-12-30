# ioBroker.myvbus

![Logo](admin/myvbus.png)

![Number of Installations (latest)](http://iobroker.live/badges/myvbus-installed.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.myvbus.svg)](https://www.npmjs.com/package/iobroker.myvbus)
![Number of Installations (stable)](http://iobroker.live/badges/myvbus-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.myvbus.svg)](https://www.npmjs.com/package/iobroker.myvbus)
**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/iobroker.myvbus/workflows/Test%20and%20Release/badge.svg)  

[![NPM](https://nodei.co/npm/iobroker.myvbus.svg?data=d,s)](https://www.npmjs.com/package/iobroker.myvbus/)

## ioBroker Adapter for Resol VBus

This adapter connects ioBroker to various VBus-based devices using resol-vbus, a JavaScript library for the acquisition of RESOL VBus data, provided by Daniel Wippermann.

<https://github.com/danielwippermann/resol-vbus>

<https://www.npmjs.com/package/resol-vbus>

## Features

* Enables reading of the measurement data from various RESOL(R) VBus(R) devices - preferably solar and system controllers from the DeltaSol(R) series including built-in heat quantity meters (HQM) - using DL3 or DL2 data loggers, KM2 communication modules, VBus/LAN interface adapters or serial/LAN gateways locally via TCP/IP.
* Device access using the VBus/USB serial interface adapter or via VBus.net(R) using DLx/KMx is also supported.
* Processes live VBus data streams and makes them available as ioBroker states.
* Values are updated with a configurable cycle time.
* Reading or setting the VBus device configuration parameters is not supported. The tools provided by Resol should be used for this, e.g. via VBus.net or the parameterization tool RPT.  
A derived version of this adapter supporting control of VBus devices is available at <https://github.com/Grizzelbee/ioBroker.resol>
* Reading DL3 channel 0 (sensors directly connected to the DL3 device) is not supported due to limitations of the DL3 interface.

## Configuration hints

* The connection device type e.g. VBus/LAN or DL2. Must be explicitly selected, otherwise no connection will be established.
* TCP connection port: Only relevant or LAN-based access. The default setting 7053 should not be changed
* Device password: The password which you have set in your connection device (default: vbus)
* DL3 channel: Only relevant for DL3/DL2Plus - leave at "None" for all other connection devices.  
(allowed values: 1-6, channel 0 cannot be read out)
* Via Tag: Only relevant for DL3, DL2, KM2 access via VBus.net - leave blank for all other connection devices.
* Update interval: The time between updates of the measured values (default 30s)
* The correct settings for direct serial interface access for VBus/USB are:
  * Connection Device: VBus/USB
  * Device Address: The path to the serial port to which the serial interface adapter is connected like  
  '/dev/ttyUSB0' or  
  '/dev/serial/by-id/usb-Silicon_Labs_USB-Modul_UO2102_TDEB6I8DAVDLGAGC-if00-port0' or  
  '/dev/serial/by-path/platform-fd500000.pcie-pci-0000:01:00.0-usb-0:1.4.1:1.0-port0' for Linux or  
  'COM5' for Windows-based ioBroker platforms
* The correct settings for direct LAN access for VBus/LAN, DL3, DL2, KM2 are:
  * Connection Device: VBus/LAN or KM2/DL2 or DL3/DL2Plus
  * Device Address: IP address (e.g. 192.168.178.188) or FullyQualifiedHostName (e.g. myKM2.fritz.box)
* The correct settings for the DL3, DL2, KM2 access via VBus.net are:
  * Connection Device: DL3/DL2Plus or DL2/KM2
  * Device Address: vbus.net (or vbus.io) - both without http:// and Via identifier!  
  * Via Tag: YourViaIdentifier (e.g. d1234567890) - without http:// before or .vbus.io behind

## Changelog
<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.6.1-alpha.0 (2025-10-21)

* (pdbjjens) Fix: Add GitHub as npm Trusted Publisher
* (pdbjjens) Change: Update dependencies
* (pdbjjens) Change: Update npm badge

### 0.6.0 (2025-08-29) - 2025H2 maintenance release

* (pdbjjens) Change: node>=20, js-controller>=7.0.7 and admin>=7.6.17 required
* (pdbjjens) Change: Cleanup devDependencies

### 0.5.1 (2025-02-15)

* (pdbjjens) Fix: Removed attribute "contributor" from package.json (#718)

### 0.5.0 (2025-01-30) - 2025H1 maintenance release

* (pdbjjens) New: Accept serial port paths /dev/serial/by-id/usb-xxxxxxxxxxxxxxxxxxx or /dev/serial/by-path/platform-xxxxxxxxxxxxxxxxxxx
* (pdbjjens) Change: Migration to ESLint 9
* (simatec) Responsive Design added

### 0.4.0 (2024-08-13) - 2024H2 maintenance release

* (pdbjjens) Change: node>=18, js-controller>=5 and admin>=6 required
* (pdbjjens) Change: Removed .npmignore
* (pdbjjens) New: Updated dependencies

## Legal Notices

RESOL, VBus, VBus.net, DeltaSol and others are trademarks or registered trademarks of RESOL - Elektronische Regelungen GmbH
<https://www.resol.de/en>

All other trademarks are the property of their respective owners.
The authors are in no way endorsed by or affiliated with RESOL GmbH, or any associated subsidiaries, logos or trademarks.

## Contributors

* DutchmanNL
* grizzelbee <hanjo@hingsen.de>

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2025 Jens-Peter Jensen <jjensen@t-online.de>

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
