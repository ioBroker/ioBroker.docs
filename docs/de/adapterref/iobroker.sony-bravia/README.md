---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sony-bravia/README.md
title: ioBroker.sony-bravia
hash: dT0fMSmlmJAsYHb91HN3lfMo1gz1KlyWrGlMGkGDjNE=
---
![Logo](../../../en/adapterref/iobroker.sony-bravia/admin/sony-bravia.png)

![Anzahl der Installationen](http://iobroker.live/badges/sony-bravia-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.sony-bravia.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/iobroker.sony-bravia/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/sony-bravia/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sony-bravia.svg)

# ioBroker.sony-bravia

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Ein Sony Bravia Android Smart-TV-Adapter für ioBroker

Dies ist ein ioBroker-Adapter für Ihren Sony Bravia Smart-TV mit Android-Betriebssystem. Getestet mit KD-65X8507C.

## TV-Einrichtung

- Schalten Sie Ihren Fernseher ein.
- Gehen Sie am Fernseher zu Einstellungen > Netzwerk > Heimnetzwerk-Einrichtung > Remote-Gerät/Renderer > Ein
- Gehen Sie am Fernseher zu Einstellungen > Netzwerk > Heimnetzwerk-Einrichtung > IP-Steuerung > Authentifizierung > Normaler und vorinstallierter Schlüssel
- Gehen Sie am Fernseher zu Einstellungen > Netzwerk > Heimnetzwerk-Einrichtung > Remote-Gerät/Renderer > Vorinstallierten Schlüssel eingeben > 0000 (oder wie auch immer Ihr PSK-Schlüssel lauten soll).
- Gehen Sie am Fernseher zu Einstellungen > Netzwerk > Heimnetzwerk-Einrichtung > Remote-Gerät/Renderer > Einfache IP-Steuerung > Ein

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.1.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.9 (2022-06-27)
* (Apollon77) Fix crash case on send introduced with last version

### 1.0.8 (2022-04-25)
* (Apollon77) Fix crash cases reported by sentry

### 1.0.7 (2022-04-24)
* (Apollon77) Fix tier definition

### 1.0.6 (2022-04-23)
* (ThomasBra) Audio volume/mute control
* (ThomasBra) value lists for AV Contents
* (Apollon77) Add Sentry error reporting

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.sony-bravia/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2022 ldittmar <iobroker@lmdsoft.de>

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