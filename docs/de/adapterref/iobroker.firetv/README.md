---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.firetv/README.md
title: kein Titel
hash: pOm/5LBNSRiNn5BvRP02FbYVawba7EUpppRwQ2e4x4I=
---
![Logo](../../../en/adapterref/iobroker.firetv/admin/firetv.png)

![Anzahl der Installationen](http://iobroker.live/badges/firetv-community-installed.svg)
![Stabile Version](http://iobroker.live/badges/firetv-community-stable.svg)
![NPM-Version](https://badge.fury.io/js/iobroker.firetv.svg)
![Tests](https://img.shields.io/travis/soef/iobroker.firetv/master.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)
![Build-Status](https://secure.travis-ci.org/soef/iobroker.firetv.svg?branch=master)

### ioBroker.firetv

<!--
-->

Mit diesem Adapter können Sie einige Funktionen Ihres Fire TV oder Fire TV Stick steuern. Zum Beispiel:

- Ein/Aus
- Wichtige Ereignisse senden
- Senden Sie Textzeichenfolgen an Eingabefelder
- Apps starten/stoppen
- Neustart
- Shell-Befehle ausführen

#### Einige Infos

Dieser Adapter nutzt Funktionen der „Android Debug Bridge“, kurz „adb“. ADB ist Bestandteil des Android Developer SDK. Da Fire TV über ein Android-Betriebssystem verfügt, kann es über ADB gesteuert werden.

#### Anforderungen

Um diesen Adapter zu verwenden, müssen Sie mindestens das ADB-Paket des Android SDK installieren. Um nicht das gesamte Android SDK installieren zu müssen, sollten Sie _Minimal ADB und Fastboot_ installieren.

Suchen Sie bei Google nach „Minimal ADB und Fastboot“, um den neuesten Download-Link zu finden.

Alternativ können Sie _adbLink_ verwenden.

## Changelog
<!-- 
    ### **WORK IN PROGRESS** 
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 2.2.0 (2026-03-07)
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (mcm1957) Dependencies have been updated

### 2.1.0 (2024-04-07) 
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.0.2 (2023-09-09) 
* (jonaskn) A crash has been fixed (#56)

### 2.0.1 (2023-09-07)
* (Grothesk242) make compatible with Node.js 18+
* (bluefox) a minimum node.js version is 16

### 1.0.0 (2020-04-09)
* (foxriver76) compatibility for js-c 3

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/iobroker.firetv/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2024-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2023 soef <soef@gmx.net> and Community developers

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