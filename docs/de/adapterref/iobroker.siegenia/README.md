---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.siegenia/README.md
title: ioBroker.siegenia
hash: rHbPlGxnGQWGgWc6lrO0q1AyYILl0gKk7ZcQ7fSvqw4=
---
![Anzahl der Installationen](http://iobroker.live/badges/siegenia-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.siegenia.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.siegenia.svg)

#ioBroker.siegenia
<img src="./admin/siegenia_logo.jpg"/>

![Testen und freigeben](https://github.com/Apollon77/ioBroker.siegenia/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/siegenia/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Dieser Adapter bietet ioBroker-Unterstützung für Siegenia Klima- und Luftsteuerungsgeräte (https://www.siegenia.com).

Der Adapter erfordert mindestens Nodejs 8.x.

## Funktionsumfang
Alle aktuellen Geräte werden von diesem Adapter unterstützt:

* AEROPAC
* AEROMAT VT
* ANTRIEB axxent DK/MH
* SENSOAIR
* AEROVITAL-Ambiente
* MHS-Familie
* AEROTUBE
* Universalmodul

Der Adapter ist in der Lage, die Siegenia-Geräte im selben Netzwerk wie ioBroker automatisch zu erkennen und in seiner Admin-Oberfläche aufzulisten. Sie müssen nur den Benutzer und das Kennwort nach der Erkennung korrigieren. Sie können IPs und Login-Daten aber auch manuell eingeben.

Alle verfügbaren Datenfelder des erkannten Gerätes werden in Objekten angezeigt und liefern aktuelle Daten und/oder ermöglichen die Änderung von Daten.

Timer und andere komplexere Daten werden vom Adapter angezeigt, können aber nur über die Siegenia App geändert werden.

## Changelog

### 1.1.1 (2021-07-06)
* (thost96/Apollon77) Optimize for js-controller 3.3

### 1.1.0 (2021-01-22)
* (Apollon77) Prevent crash case (Sentry IOBROKER-SIEGENIA-1)
* (Apollon77) js-controller 2.0 is now required at least

### 1.0.1 (2020-12-24)
* (Apollon77) update dependencies
* (Apollon77) disconnect device if authentication was not successful

### 1.0.0
* (Apollon77) initial release

## License
MIT License

Copyright (c) 2019-2021 Apollon77 iobroker@fischer-ka.de

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