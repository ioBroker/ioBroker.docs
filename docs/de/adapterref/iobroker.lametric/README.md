---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.lametric?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.lametric?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.lametric?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.lametric?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.lametric?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.lametric/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.lametric.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/lametric-stable.svg
BADGE-Installed: http://iobroker.live/badges/lametric-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.lametric/README.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/README.md"},"de/adapterref/iobroker.lametric/apps.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/apps.md"},"de/adapterref/iobroker.lametric/my-data-diy.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/my-data-diy.md"},"de/adapterref/iobroker.lametric/notifications.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/notifications.md"},"de/adapterref/iobroker.lametric/blockly.md":{"title":{"de":"ioBroker.lametric"},"content":"de/adapterref/iobroker.lametric/blockly.md"}}}
---
![Logo](../../admin/lametric.png)

# ioBroker.lametric

## Inhaltsverzeichnis

- [Apps](apps.md)
- [Blockly](blockly.md)
- [My Data DIY](my-data-diy.md)
- [Notifications](notifications.md)

## Anforderungen

- nodejs 14.5 (oder neuer)
- js-controller 4.0.15 (oder neuer)
- Admin Adapter 6.0.0 (oder neuer)
- _LaMetric Time_ mit Firmware _2.3.7_ (_3.0.16_ auf dem 2022er Modell) (oder neuer)

[Firmware-Changelog](https://firmware.lametric.com) [Firmware-Changelog Time2](https://firmware.lametric.com/?product=time2)

## Configuration

Du bekommst deinen Geräte-Schlüssel (API-Key) [hier](https://developer.lametric.com/user/devices).

![api-key](./img/api-key.png)

## Features

- Verändern der Display-Helligkeit (prozentual, Automatik/Manueller Modus)
- Verändern der Lautstärke (prozentual)
- Konfiguration des Bildschirmschoners (aktivieren/deaktivieren, Zeitbasiert, wenn dunkel)
- Bluetooth aktivieren/deaktivieren, Bluetooth Name verändern
- Zwischen Apps wechseln (nächste, vorige, gehe zu spezifischer App)
- Versenden von Notifications (mit konfigurierbarer Priorität, Sound, Icons, Text, ...)
- Kontrolle von speziellen Apps wie `clock`, `radio`, `stopwatch` oder `weather`
- Nutzung der _My Data (DIY)_ LaMetric App um regelmäßig Informationen darzustellen

Alle Funktionen sind nur durch die [offizielle API](https://lametric-documentation.readthedocs.io/en/latest/reference-docs/lametric-time-reference.html) limitiert.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

NodeJS 16.x is required

### 3.0.0 (2023-09-13)

* (klein0r) Added push option for My Data DIY
* (klein0r) Added option to force app reload
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.7 (3.0.16)

### 2.4.2 (2023-09-08)

* (klein0r) Updated LaMetric firmware version recommendation to 2.3.6

### 2.4.1 (2023-06-10)

* (klein0r) Blockly bugfix

### 2.4.0 (2023-05-10)

* (klein0r) Allow to change device mode via state (manual, auto, kiosk, schedule)
* (klein0r) Added state for available firmware update
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.5

### 2.3.2 (2023-02-21)

* (klein0r) Optimized setState logic

## License

The MIT License (MIT)

Copyright (c) 2023 Matthias Kleine <info@haus-automatisierung.com>

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