---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.comfoairq/README.md
title: ioBroker.comfoairq
hash: Eu/VPY8VZ2C7ZoExN1OK2V6rSex/3Wsj5mrbKSUXJeM=
---
![Logo](../../../en/adapterref/iobroker.comfoairq/admin/comfoairq.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.comfoairq?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.comfoairq?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.comfoairq?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.comfoairq?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/klein0r/iobroker.comfoairq?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/klein0r/iobroker.comfoairq?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.comfoairq/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.comfoairq.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/comfoairq-stable.svg)
![Installiert](http://iobroker.live/badges/comfoairq-installed.svg)

# IoBroker.comfoairq
## Versionen
Verbinden Sie Ihren Zehnder ComfoAirQ über ComfoConnect LAN C

*Getestet mit ComfoAirQ 350*

**Wichtig:** ComfoConnect LAN C unterstützt nur einen einzigen Client. Die ComfoControl App und der ioBroker-Adapter können nicht gleichzeitig verwendet werden!

## Gesponsert von
[![ioBroker Master Kurs](https://haus-automatisierung.com/images/ads/ioBroker-Kurs.png?2024)](https://haus-automatisierung.com/iobroker-kurs/?refid=iobroker-comfoairq)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 0.6.0 (2026-05-19)

* (copilot) Adapter requires node.js >= 22 now
* (@klein0r) admin 7.6.20 and js-controller 6.0.11 (or later) are required
* (@klein0r) Updated dependencies

### 0.5.1 (2025-04-14)

* (@klein0r) Updated dependencies

### 0.5.0 (2025-04-14)

NodeJS >= 20.x and js-controller >= 6 is required

* (@klein0r) Added messagebox for device discovery via admin
* (@klein0r) Added responsive admin layout

### 0.4.0 (2024-03-28)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Added icons to admin tabs
* (klein0r) Group sensors in admin config
* (klein0r) Limit sensor value refresh interval

### 0.3.0 (2022-12-14)

NodeJS 14.x is required (NodeJS 12.x is EOL)

* (klein0r) Updated depedency for js-controller to 4.0.15
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

[Older changelogs can be found there](CHANGELOG_OLD.md)## Credits

Development of this ioBroker Adapter was possible on the work performed by:

* Jan Van Belle (https://github.com/herrJones/node-comfoairq)
* Michael Arnauts (https://github.com/michaelarnauts/comfoconnect)
* Marco Hoyer (https://github.com/marco-hoyer/zcan) and its forks on github (djwlindenaar, decontamin4t0R)

## License

MIT License

Copyright (c) 2026 Matthias Kleine <info@haus-automatisierung.com>

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