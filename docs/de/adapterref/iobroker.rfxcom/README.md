---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.rfxcom/README.md
title: ioBroker.rfxcom
hash: 7nbcRLPBSS10VFNTYxZ596/gHlhYGkY1VLwYo0fOZNc=
---
![Logo](../../../en/adapterref/iobroker.rfxcom/admin/rfxcom.png)

![Anzahl der Installationen](http://iobroker.live/badges/rfxcom-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.rfxcom.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.rfxcom.svg)

# IoBroker.rfxcom
![Testen und freigeben](https://github.com/ioBroker/ioBroker.rfxcom/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/rfxcom/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dieser Adapter kommuniziert mit [rfxcom](http://www.rfxcom.com).
Wird zum Empfangen der Daten von Wettersensoren und drahtlosen Leistungsschaltern verwendet.

Ausführliche Dokumentation zu RfxCom lesen [Hier](http://www.rfxcom.com/WebRoot/StoreNL2/Shops/78165469/MediaGallery/Downloads/RFXtrx_User_Guide.pdf)

## Verwendungszweck
Um das Einlernen von Sensoren zu ermöglichen, müssen Sie den „Einschlussmodus“ aktivieren.
Der Inklusionsmodus wird standardmäßig für 5 Minuten (300000 ms) aktiviert und nach 5 Minuten automatisch deaktiviert.

Um den Inklusionsmodus für immer zu aktivieren, setzen Sie einfach "Inclusion timeout" auf 0.

## Paar
Bei jedem Batteriewechsel erhalten die Geräte die neue Adresse.

Es muss also nach dem Batteriewechsel neu eingelernt werden.

Drücken Sie dazu kurz vor dem Einlegen der Batterie die Pair-Taste und das Gerät wird mit der neuen Adresse angelernt.

## Machen
**Im Moment werden nur Somfy-, Curtain- und Lighting3-Geräte unterstützt.**

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __LAUFENDE ARBEIT__ -->

## Changelog

### 2.0.2 (2021-11-10)
* (bluefox) Fixed error by deleting of object

### 2.0.1 (2021-06-29)
* (peterbaumert) update packages
* (bluefox) Breaking change: no linux with 32 bit support

### 1.0.1 (2020-08-05)
* (bluefox) Compact mode
* (bluefox) Support of node 10 added
* (bluefox) Refactoring

### 0.1.0 (2016-07-05)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2021, Bluefox<dogafox@gmail.com>

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