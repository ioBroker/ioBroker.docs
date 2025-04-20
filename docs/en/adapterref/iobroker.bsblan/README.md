![Logo](admin/bsblan.png)
# ioBroker.bsblan

[![NPM version](https://img.shields.io/npm/v/iobroker.bsblan.svg)](https://www.npmjs.com/package/iobroker.bsblan)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bsblan.svg)](https://www.npmjs.com/package/iobroker.bsblan)
![Number of Installations](https://iobroker.live/badges/bsblan-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/bsblan-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.bsblan.png?downloads=true)](https://nodei.co/npm/iobroker.bsblan/)
[![Known Vulnerabilities](https://snyk.io/test/github/hacki11/ioBroker.bsblan/badge.svg)](https://snyk.io/test/github/hacki11/ioBroker.bsblan)

## bsb_lan adapter for ioBroker

This adapter connects the [BSB_LAN Interface](https://github.com/fredlcore/bsb_lan) to ioBroker.
The BSB_LAN Interface brings the BSB (Boiler System Bus) to LAN. This adapter connects it to ioBroker.

[BSB_LAN Interface User manual](https://docs.bsb-lan.de)

## Supported devices
- BSB/LPB compatible devices (e.g. Brötje, Elco, MHG, Fujitsu)
- see for details: [Supported Devices](https://docs.bsb-lan.de/supported_heating_systems.html)

## Usage
- BSB_LAN Interface is up and running
- Install Adapter
- Configure 
    - IP
    - User and password (if basic auth activated)
    - Poll interval in seconds (10 is minimum)
    - IDs which should be polled or changed (comma- or newline separated, see Webinterface of BSB_LAN for available ids)

## Writing Values
- Activate all or specific IDs as Writable in 
  * en: [Readonly or read/write access](https://1coderookie.github.io/BSB-LPB-LAN_EN/chap05.html)
  * de: [Zugriff des Adapters auf den Regler](https://1coderookie.github.io/BSB-LPB-LAN/kap05.html)
  * for all: `bsb_lan_config.h: #define DEFAULT_FLAG 0`
  * compile & upload 
- Add IDs which should be written to Adapter instance config (see Usage)
- Numbers, Enums and hr:min types are now writable (of course only writable IDs can be written)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* Maintenance release
* Setup Eslint 9, Prettier and Dev Container
* Migrate to newest adapter-creator version

### 0.3.4
* Fix order of individual destinations (They need to be queried sorted by destination, starting with default destination)

### 0.3.3
* Support for individual destinations e.g. `710!7`
### 0.3.2
* Support dot-separated parameter ids like `20200.0`, `20200.1`. `.0` is omitted from object view as it is also omitted in the bsb_lan response.

### 0.3.1
* Code Quality Improvements

### 0.3.0
* Add support for BSB_LAN 2.x
* BREAKING: Names of 24h Average values changed (e.g. Außentemperatur_(8700) => 24h Durchschnittswert. Außentemperatur_(20050))

### 0.2.2
* Replace invalid characters: https://github.com/ioBroker/ioBroker.js-controller/issues/198

### 0.2.1
* Fix write issue with new bsb_lan2 firmware

### 0.2.0
* Add 24h averages (needs BSB_LAN FW 1.1)

### 0.1.2
* Support INF interface for setting external room temperatures

### 0.1.1
* Support unit micro
* Made robust against invalid or non existing IDs

### 0.1.0
* Support write access

### 0.0.3
* dynamically create states
* IDs without whitespaces
* add textarea for configuration

### 0.0.1
* (hacki11) initial release

## License
MIT License

Copyright (c) 2025 hacki11

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

## Credits
- Icon made by [Freepik](https://www.freepik.com/home) from www.flaticon.com
