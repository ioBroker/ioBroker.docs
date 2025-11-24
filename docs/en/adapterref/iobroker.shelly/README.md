---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.shelly?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.shelly?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.shelly?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.shelly?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/iobroker-community-adapters/iobroker.shelly?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.shelly?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.shelly/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.shelly.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/shelly-stable.svg
BADGE-Installed: http://iobroker.live/badges/shelly-installed.svg
chapters: {"pages":{"en/adapterref/iobroker.shelly/README.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/README.md"},"en/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/protocol-coap.md"},"en/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/protocol-mqtt.md"},"en/adapterref/iobroker.shelly/restricted-login.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/restricted-login.md"},"en/adapterref/iobroker.shelly/state-changes.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/state-changes.md"},"en/adapterref/iobroker.shelly/faq.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/faq.md"},"en/adapterref/iobroker.shelly/debug.md":{"title":{"en":"ioBroker.shelly"},"content":"en/adapterref/iobroker.shelly/debug.md"}}}
---
![Logo](../../admin/shelly.png)

# ioBroker.shelly

This is the English documentation - [🇩🇪 German version](../de/README.md)

## Table of contents

- [MQTT protocol](protocol-mqtt.md)
- [CoAP/CoIoT protocol](protocol-coap.md)
- [Restricted login](restricted-login.md)
- [State changes](state-changes.md)
- [Debug](debug.md)
- [FAQ](faq.md)

## Requirements

1. Node.js 20 (or later)
2. js-controller 6.0.0 (or later)
3. Admin Adapter 6.6.0 (or later)

## Device generations

Check the list of *supported devices* for more details.

- **Gen 1**: ESP8266 devices, [CoAP/CoIoT](protocol-coap.md) or [MQTT](protocol-mqtt.md)
- **Gen 2+**: ESP32 devices, [MQTT](protocol-mqtt.md)

## General

The adapter can be used in MQTT (recommended) or CoAP/CoIoT mode.

- The default mode of the adapter is MQTT (see [documentation](protocol-mqtt.md) for details)
- CoAP/CoIoT is just compatible with Gen1 devices!
- **If you want to use Gen2 devices, you must use MQTT!**

Questions? Check the [FAQ](faq.md) section first!

![iobroker_general](./img/iobroker_general.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (@klein0r) Added speed, dewpoint, uv_index, pressure, direction and precipitation for weather station WS 90

### 10.4.2-alpha.1 (2025-11-12)
* (@mcm1957) Changes to mqtt connect handling hav ebeen applied. This should fix err 'Unable to get MQTT.Prefix'[#931].
* (@mcm1957) Dependencies have been updated

### 10.4.1 (2025-11-03)
* (@mcm1957) Shelly pro 3em400 has been added as dedicated device to improve detectio (shellypro3em400) [#1269].
* (@mcm1957) Missing energy states have been added to Shelly Dimmer Gen 3 (shellydimmerg3) [#1274].
* (@klein0r) Added distance support to ble sensors
* (@mcm1957) Dependencies have been updated

### 10.4.0 (2025-10-13)

* (@mcm1957) Slat control added to Shelly ProDualCoverPM, Shelly Pro2PM, Shelly Shutter, Shelly Plus 2PM, Shelly 2PM Gen 3 and Shelly 2PM Gen 4.
* (@mcm1957) Log adapter version if unknown device is detected.
* (@mcm1957) posControl indicator has been added to devices supporting cover operation.
* (@mcm1957) Shelly Frankever Smart Sprinkler Controller (irrigation) has been added as prototype for diagnostic purposes only.
* (@mcm1957) Shelly LinkedGo Smart Thermost (st1820) has been added as prototype for diagnostic purposes only.
* (@mcm1957) Dependencies have been updated

### 10.3.0 (2025-10-06)

* (@klein0r) Rssi for ble has been added to script.
* (@mcm1957) Shelly Flood Gen 4 (shellyfloodg4) has been added.
* (@mcm1957) Shelly Power Strip Gen 4 (shellypstripg4) has been added with partial support.

### 10.2.0 (2025-09-09)

* (@mcm1957) Role definitions for anergy states has been corrected [#1195].
* (@mcm1957) Shelly Dali Dimmer Gen 3 (shellyddimmerg3) has been added.
* (@mcm1957) Shelly1L Gen 3 (shelly1lg3) has been added.
* (@mcm1957) Shelly2L Gen 3 (shelly2lg3) has been added.
* (@mcm1957) Shelly2PM Gen 4 (shelly2pmg4) has been added.
* (@klein0r) Shelly Shutter Gen 3 (shellyshutter) has been added.
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required now.
* (@mcm1957) Dependencies have been updated

## License

The MIT License (MIT)

Copyright (c) 2018-2025 Thorsten Stueben <thorsten@stueben.de>,
                        Apollon77 <iobroker@fischer-ka.de> and
                        Matthias Kleine <info@haus-automatisierung.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.