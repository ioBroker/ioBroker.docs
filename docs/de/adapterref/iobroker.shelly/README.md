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
- [CoAP/CoIoT Protokoll](protocol-coap.md)
- [Geschützter Login](restricted-login.md)
- [Zustandsänderungen](state-changes.md)
- [Debug](debug.md)
- [FAQ](faq.md)

## Anforderungen
1. Node.js 18 (oder neuer)
2. js-controller 5.0.0 (oder neuer)
4. Admin Adapter 6.0.0 (oder neuer)

## Geräte-Generationen

Für mehr Informationen, siehe *supported devices*.

- **Gen 1**: ESP8266 Geräte, [CoAP/CoIoT](protocol-coap.md) oder [MQTT](protocol-mqtt.md)
- **Gen 2+**: ESP32 Geräte, [MQTT](protocol-mqtt.md)

## Allgemein

Der Adapter kann über MQTT (empfohlen) oder CoAP/CoIoT mit den Geräten kommunizieren.

- Der Standard-Modus des Adapters ist MQTT (siehe [Dokumentation](protocol-mqtt.md) für mehr Informationen)
- CoAP/CoIoT ist ausschließlich mit Gen1 Geräten kompatibel!
- **Falls Gen2-Geräte integriert werden sollen, muss MQTT konfiguriert werden!**

Fragen? Schaue zuerst in die [FAQ](faq.md)!

![iobroker_general](./img/iobroker_general.png)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 8.1.0 (2024-08-25)

* (esusxunil) Added Shelly Pro EM 2x50A

### 8.0.0 (2024-08-25)

* (imperial929) Added Shelly 1 PM Gen3
* (imperial929) Added Shelly 1 Gen3
* (klein0r) Breaking change: Renamed input states (now digital/analog) of Shelly Plus Addon (Ext)
* (klein0r) Added Shelly Plus Uni
* (klein0r) Added Shelly H&T (Gen3)
* (klein0r) Improved structure of ble events (receivedBy) - see documentation for details
* (bluefox) Improved the color of icons in the admin interface

### 7.0.0 (2024-04-29)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Added Shelly 1 Mini (Gen3)
* (svenbluege) Added Shelly 1 PM Mini (Gen3)
* (klein0r) Added Shelly PM Mini (Gen3)
* (klein0r) Added Shelly Pro Dimmer 1 PM and Pro Dimmer 2 PM
* (klein0r) Fixed Shelly Wall Display integration
* (klein0r) Added device list of ble events (receivedBy) - removed rssi state
* (klein0r) Added Switch Addon for Shelly Pro 3 EM

### 6.9.0 (2024-03-12)

* (klein0r) Added Shelly Plus 0-10V
* (klein0r) Admin notification for available firmware updates

### 6.8.0 (2024-02-17)

* (klein0r) Updated BLE script to 0.2 (new shelly motion firmware)
* (klein0r) Updated Shelly i3 number limits
* (klein0r) Added screenshots to instance configuration

## License

The MIT License (MIT)

Copyright (c) 2018-2024 Thorsten Stueben <thorsten@stueben.de>,
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