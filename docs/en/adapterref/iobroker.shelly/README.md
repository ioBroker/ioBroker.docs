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
### 9.5.0-alpha.0 (2025-04-26)
* (@mcm1957) Added Shelly AZ Plug (shellyazplug).
* (@mcm1957) Added Shelly EM Gen 3 (shellyemg3).
* (@mcm1957) Added 'total returned energy' to Gen2+ EM devices.
* (@mcm1957) Added 'Relay' to Shelly Pro EM 50 [#1038].
* (@mcm1957) Added Ogemray 25A (ogemray25a).
* (@mcm1957) Added energy states to Shelly Plus RBGW PM (shellyrgbwpm) [#1099].
* (@mcm1957) Added energy states to Shelly Pro Dimmer 1 PM (shellyprodm1pm) [#1129].
* (@mcm1957) Added energy states to Shelly Pro Dimmer 2 PM (shellyprodm2pm) [#1067, #1056, #1037].
* (@mcm1957) Added energy states to Shelly Plus 0-10V Dimmer Gen 3 (shelly0110dimg3) [#1103].

### 9.4.1 (2025-04-17)

* (@mcm1957) Minimum value for min_brightness fixed for dimmer1/2 [#1166]

### 9.4.0 (2025-04-16)

* (@klein0r) Added Gen4 devices (see documentation for details)

### 9.3.0 (2025-04-14)

* (@klein0r) Adapter requires admin 7.4.10 now. 
* (@mcm1957) Added Shelly Outdoor Plug S Gen3
* (@mcm1957) Missing energy values for Switches (i.e. Shelly Outdoor Plug S Gen3) have been added
* (@mcm1957) Missing energy values for pmminigen3 have been added

### 9.2.0 (2025-03-13)

* (@fLaSk1n) Added Shelly Dimmer Gen3
* (@lennycb) Added Shelly 3EM63 Gen3
* (@mcm1957) Translations for Gen2 devices have been added
* (@mcm1957) State roles for Gen2 devices have been adapted
* (@tclas) Added handling of Total Active Energy

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