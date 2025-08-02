---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.yamaha/README.md
title: kein Titel
hash: 7OJuYFsy6VNYKUCbfYG3oHnTo5qf9BztKBSu3G86OrU=
---
![Logo](../../../en/adapterref/iobroker.yamaha/admin/yamaha.png)

![Anzahl der Installationen](http://iobroker.live/badges/yamaha-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.yamaha.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.yamaha.svg)

## IoBroker.yamaha
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.yamaha/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/yamaha/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

#### Beschreibung
Adapter für Yamaha AV-Receiver

Diskussion bitte auf github oder unter https://forum.iobroker.net/topic/53174/weiterentwicklung-yamaha-adapter

### Erste Erstellung
Dieser Adapter wurde ursprünglich von @soef unter https://github.com/soef/ioBroker.yamaha erstellt, aber nicht mehr gepflegt, daher haben wir ihn in die iobroker-community verschoben, damit Fehler behoben werden konnten. Danke @soef für seine Arbeit.

#### Aufbau
Derzeit ohne Autodiscover, Sie müssen die IP Ihres Receivers eingeben

#### Installation
über den ioBroker-Admin.

Andernfalls führen Sie den folgenden Befehl im iobroker-Stammverzeichnis (z. B. in /opt/iobroker) aus: `` npm install iobroker.yamaha iobroker upload yamaha ``

#### Echtzeit
Die Zustände werden erstellt, wenn sie auftreten. Verwenden Sie z. B. Ihre IR-Fernbedienung und ändern Sie etwas, dann werden die neuen Zustände angezeigt.
Von Yamaha-Geräten wird nur eine Verbindung akzeptiert.

#### Anforderungen
Yamaha-Empfänger

Sie müssen die Funktion "Netzwerk-Standby" in der Konfiguration Ihres Receivers aktivieren

## Changelog
### 0.5.4 (2024-06-14)
* (foxriver76) updated packages

### 0.5.3 (2022-06-17)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.2 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.1 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry
* (Sneak-L8) fix type of pureDirect

### 0.5.0 (2022-03-08)
* IMPORTANT: js-controller 2.0 is needed at least
* (Apollon77) Add Sentry for crash reporting

### 0.4.1
* (Sneak-L8) "toggleMute" now toggle mute state (instead of always muting)

### 0.4.0
* (Garfonso) added admin 3 compatibility and more meta-data stuff.
* (Garfonso) added compact mode support.

### 0.3.20
* (Garfonso) adjusted local copy of soef.js to js-controller 3.0
* (Garfonso) updated meta information (links etc) to iobroker-community-adapters

### 0.3.19
* (soef) Changelog added to readme

### 0.3.18
* (Apollon77) Update utils.js and usage, CI Testing and deps

### 0.3.17
* (Apollon77) update basic package-file testing

### 0.3.16
* (soef) node 0.12 removed from testing

### 0.3.15
* (soef) Enhance CI testing

### 0.3.14
* (soef) Possible exception in reconnect fixed

### 0.3.12
* (soef) Version incr. for npm

### 0.3.11
* (soef) reconnect overworked

### 0.3.10
* (soef) realtime Ping now configurable

### 0.3.8
* (soef) realtime states optimized

### 0.3.7
* (soef) fix typo in creating realtime states

### 0.3.6
* (soef) timeout to connect reduced

<!--

## License
The MIT License (MIT)

Copyright (c) 2015-2024 soef <soef@gmx.net>

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
-->