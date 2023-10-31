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
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
---
![Logo](../../admin/shelly.png)

# ioBroker.shelly

This is the German documentation - [🇺🇸 English version](../en/README.md)

## Inhaltsverzeichnis

- [MQTT Protokoll](protocol-mqtt.md)
- [CoAP Protokoll](protocol-coap.md)
- [Geschützter Login](restricted-login.md)
- [Zustandsänderungen](state-changes.md)
- [Debug](debug.md)
- [FAQ](faq.md)

## Anforderungen
1. Node.js 16.0 (oder neuer)
2. js-controller 3.3.22 (oder neuer)
4. Admin Adapter 6.0.0 (oder neuer)

## Geräte-Generationen

Für mehr Informationen, siehe *supported devices*.

- **Gen1**: ESP8266 Geräte, [CoAP](protocol-coap.md) oder [MQTT](protocol-mqtt.md)
- **Gen2**: ESP32 Geräte, [MQTT](protocol-mqtt.md)

## Allgemein

Der Adapter kann über MQTT (empfohlen) oder CoAP/CoIoT mit den Geräten kommunizieren.

- Der Standard-Modus des Adapters ist MQTT (siehe [Dokumentation](protocol-mqtt.md) für mehr Informationen)
- CoAP ist ausschließlich mit Gen1 Geräten kompatibel!
- **Falls Gen2-Geräte integriert werden sollen, muss MQTT konfiguriert werden!**

Fragen? Schaue zuerst in die [FAQ](faq.md)!

![iobroker_general](./img/iobroker_general.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 6.6.1 (2023-10-20)

* (klein0r) Fixed stop reason for Shelly 2.5 / Shelly 2
* (klein0r) Added humidity of Shelly Plus Addon
* (klein0r) Not all devices have external power

### 6.6.0 (2023-10-17)

* (klein0r) Added BLE devices as states to `shelly.0.ble.*` (Shelly Scripting required)

### 6.5.0 (2023-10-17)

* (klein0r) Added Shelly Plus Smoke
* (klein0r) Added Shelly Bluetooth Low Energy Gateway
* (theimo1221) More Shelly TRV Datapoints

### 6.4.5 (2023-09-26)

* (klein0r) Added Shelly Pro Dual Cover/Shutter PM
* (klein0r) Added Shelly Pro 3 EM 400A
* (JuniperChris929) Added support of Shelly Plus 1 Mini + Shelly Plus 1 PM Mini
* (BooosesThaSnipper) Added support of Shelly Plus AddOn for Gen2 Devices.
* (D1gitaldad) Added support of Plus PM Mini

### 6.4.1 (2023-04-23)

* (viper4gh) Added Shelly Pro 3 EM energy data
* (klein0r) Fixed IP handling in Docker containers

## License

The MIT License (MIT)

Copyright (c) 2018-2023 Thorsten Stueben <thorsten@stueben.de>,
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