---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bshb/README.md
title: ioBroker.bshb
hash: lbdq852w9y/1jTosknS6lWfROArC6m/OQkQ+8aCGy9U=
---
![Logo](../../../en/adapterref/iobroker.bshb/admin/bshb-logo.jpg)

![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.bshb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bshb.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/bshb-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/bshb-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/holomekc/ioBroker.bshb/badge.svg)
![Hauptsächlich](https://github.com/holomekc/iobroker.bshb/actions/workflows/test.yml/badge.svg)
![NPM](https://nodei.co/npm/iobroker.bshb.png)

# ioBroker.bshb

## Bosch Smart Home Bridge Adapter für ioBroker

Dieser Adapter ermöglicht die Kommunikation mit Bosch Smart Home-Geräten.

[Bosch Smart Home Controller](https://www.bosch-smarthome.com/de/de/produkte/smart-system-solutions/smart-home-controller)

Um dies zu erreichen, verwendet es die Bibliothek [bosch-smart-home-bridge](https://github.com/holomekc/bosch-smart-home-bridge) , die die Informationen der offiziellen [Bosch Smart Home Controller Local REST API](https://github.com/BoschSmartHome/bosch-shc-api-docs) nutzt.

Diskussion im IoBroker-Forum zum BSHB-Adapter: <https://forum.iobroker.net/topic/25370/test-adapter-bshb-bosch-smart-home-v0-0-x/>

Beispiele: <https://github.com/holomekc/ioBroker.bshb/wiki/Examples>

In Arbeit. Feedback erwünscht.

Wenn Sie die Arbeit unterstützen möchten, würde ich mich über eine kleine Spende freuen. Diese ist selbstverständlich freiwillig und für die Nutzung des Adapters nicht erforderlich. Den Link finden Sie oben.

## Changelog
### 0.6.3 (2026-05-15)

* (holomekc) Migrate from yarn to npm
* (holomekc) Adopt ioBroker standard release workflow
* (holomekc) Drop Node.js 20, require >= 22
* (holomekc) Update dependencies
* (holomekc) Use node: prefix for built-in modules

### 0.6.2

* (holomekc) update dependency

### 0.6.1

* (holomekc) adapter post install step
* Dependencies updated

### 0.6.0

* (holomekc) semantic-release
* (holomekc) release
* (holomekc) yarn
* (holomekc) update dependencies and fix missing room bug
* Dependencies updated

### 0.5.2

* Dependencies updated

## License

The MIT License (MIT)

Copyright (c) 2025-2026 Christopher Holomek <holomekc.github@gmail.com>

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