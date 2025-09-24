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

1. Node.js 20 (oder neuer)
2. js-controller 6.0.0 (oder neuer)
3. Admin Adapter 6.6.0 (oder neuer)

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
### 10.3.0-alpha.2 (2025-09-22)

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

### 10.1.0 (2025-06-30)

* (@klein0r) Allow infinite event listeners
* (@klein0r) Added transformed voltage for voltmeter
* (@klein0r) Improved logging of mqtt authentication failures
* (@klein0r) Acknowledge new encryption keys for bthome encryption

### 10.0.0 (2025-05-30)

* (@mcm1957) ATTENTION: Adapter requires BLE Script v1.0 now. See [documentation](https://github.com/iobroker-community-adapters/ioBroker.shelly/blob/master/docs/en/ble-devices.md).
* (@klein0r) Moved BTHome decoding to adapter (save memory on devices)
* (@klein0r) Allow encrypted payloads of BTHome devices (set encryption key in state)

### 9.5.1 (2025-05-10)

* (@mcm1957) ATTENTION: Reworked configuration of inputs could effect some devices.
* (@mcm1957) ResetPower has been added to Shelly switches supporting power measurement. [#1156]
* (@mcm1957) ResetPower has been added to Gen2+ PM type devices.
* (@mcm1957) Shelly Plus Uni (shellyplusuni) - configuration of inputs reworked.
* (@mcm1957) Shelly Plus Uni (shellyplusuni) - support to reset counters added.
* (@mcm1957) Added sensors (Temperature, Voltmeter, Humidity, analog Input) to Shelly Plus Uni (shellyplusuni).
* (@mcm1957) Issues reported by repositor checker have been fixed.
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