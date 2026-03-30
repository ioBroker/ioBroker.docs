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
chapters: {"pages":{"de/adapterref/iobroker.shelly/README.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/README.md"},"de/adapterref/iobroker.shelly/ble-devices.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/ble-devices.md"},"de/adapterref/iobroker.shelly/protocol-coap.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-coap.md"},"de/adapterref/iobroker.shelly/protocol-mqtt.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/protocol-mqtt.md"},"de/adapterref/iobroker.shelly/restricted-login.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/restricted-login.md"},"de/adapterref/iobroker.shelly/state-changes.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/state-changes.md"},"de/adapterref/iobroker.shelly/faq.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/faq.md"},"de/adapterref/iobroker.shelly/debug.md":{"title":{"de":"ioBroker.shelly"},"content":"de/adapterref/iobroker.shelly/debug.md"}}}
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
-->
### 11.0.0-alpha.1 (2026-03-30)
- (copilot) Adapter requires admin >= 7.8.18 now
- (@GermanBluefox) Added support for Device manager: info and control of devices and provisioning
- (@GermanBluefox) Added detection of new devices in the background
- (mcm1957) DISABLE all PLUG*_UI functionality due to unrecoverable HW faults.
- (@mcm1957) Dependencies have been updated

### 10.6.1 (2026-02-23)
- (HGlab01) OnUnload handling has been improved. [#1279]
- (@mcm1957) shellypill: missing input 202 has been added, nonexisting analog input has been removed.

### 10.6.0 (2026-02-08)
* (@mcm1957) The-Pill-By-Shelly (shellypill) has been added. [#1232]
* (@mcm1957) Shelly EM mini Gen 4 (shellyemminimg4) and Plug M Gen 3 (shellyplugmg3) have been added. [#1327,#1332]
* (@mcm1957) Shelly BLU H&T Display ZB support for light attribute has been added. [#1230]
* (@mcm1957) Support for favorites for Gen 2+ devices with cover support has been added. [#1001]
* (@mcm1957) Power metering support has been added to RGB and RGBW components. [#1339]
* (@mcm1957) FrankEver Smart Watervalve (watervalve) has been added. [#1341]
* (@mcm1957) LinkedGo ST1820 (st1820) has been added. [#1257]
* (@mcm1957) Dependencies have been updated

### 10.5.2 (2025-12-28)
* (@mcm1957) Monophase profile support has been fixed for shellypro3em and shellypro3em400.

### 10.5.1 (2025-12-27)
* (@mcm1957) Monophase profile support has been added to shellypro3em, shellypro3em63 and shellypro3em400. [#1016]
* (@mcm1957) ResetCounters functionality has been added to components EMData and EM1Data. This effect shellypro3em* but also other shellyem* devices gen2 and later.
* (@mcm1957) Changes to shellypro3em could affect shellyemg3 and shellyproem50.
* (@HGlab01) Several fixes for Shelly Ecowitt WS90 have been implemented. [#1293]

## License

The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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