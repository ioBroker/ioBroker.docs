---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.lametric?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.lametric?label=npm%20downloads&style=flat-square
BADGE-Snyk Vulnerabilities for npm package: https://img.shields.io/snyk/vulnerabilities/npm/iobroker.lametric?label=npm%20vulnerabilities&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.lametric?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.lametric?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.lametric?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.lametric?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/workflow/status/klein0r/iobroker.lametric/Test%20and%20Release?label=Test%20and%20Release&logo=github&style=flat-square
BADGE-Snyk Vulnerabilities for GitHub Repo: https://img.shields.io/snyk/vulnerabilities/github/klein0r/iobroker.lametric?label=repo%20vulnerabilities&logo=github&style=flat-square
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
- _LaMetric Time_ mit Firmware _2.3.3_ (oder neuer)

[Firmware-Changelog](https://firmware.lametric.com)

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
### 2.3.0 (2023-02-13)

* (klein0r) Fixed message responses
* (klein0r) Added icon button to instance configuration
* (klein0r) Added preview for web url in instance configuration

### 2.2.1 (2023-01-19)

* (klein0r) Format number values for My Data DIY

### 2.2.0 (2023-01-05)

* (klein0r) Added custom sound feature (mp3 via url)
* (klein0r) Added visible state of widgets
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.3

### 2.1.0 (2022-11-01)

NodeJS 14.5 is required

* (klein0r) Added web extension to get My Data DIY object
* (klein0r) Allow colon in My Data DIY object ID
* (klein0r) Fixed duration of My Data DIY frames (milliseconds)
* (klein0r) Updated LaMetric firmware version recommendation to 2.3.0
* (klein0r) Dropped Admin 5 support
* (klein0r) Minor optimizations

### 2.0.0 (2022-05-17)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Added states for clock alarm widget configuration
* (klein0r) Added duration for My Data DIY frame configuration
* (klein0r) Updated LaMetric firmware version recommendation to 2.2.3
* (klein0r) Updated dependencies
* (klein0r) Updated depedency for js-controller to 4.0.15

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