---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.samsung/README.md
title: kein Titel
hash: iO9KPuQR+Ltsr3n2dODiDdixg230UDZhVUAk2hyrCK8=
---
![Logo](../../../en/adapterref/iobroker.samsung/admin/samsung.png)

![Anzahl der Installationen](http://iobroker.live/badges/samsung-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.samsung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.samsung.svg)

### IoBroker.samsung
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg) <!-- [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Wichtiger Hinweis für Windows-Benutzer: Dieser Adapter erfordert die systemweite Installation von Git.**

#### Beschreibung
Adapter für Samsung-Fernseher

### Erste Erstellung
Dieser Adapter wurde ursprünglich von @soef unter https://github.com/soef/ioBroker.samsung erstellt, aber nicht mehr weiterentwickelt. Daher haben wir ihn in die iobroker-community verschoben, damit Fehler behoben werden können. Vielen Dank an @soef für seine Arbeit. Der Adapter wurde seitdem von jogibear9988 und mwp007 um weitere APIs erweitert.

#### Konfiguration
Geben Sie die IP-Adresse Ihres Samsung-Fernsehers ein.
Wählen Sie Ihre API: Samsung Remote – Fernseher vor 2014. Nach der Installation müssen Sie die neue Verbindung auf Ihrem Samsung-Fernseher bestätigen. Samsung HJ – 2014 und 2015. Nach der ersten Verbindung müssen Sie die auf Ihrem Fernseher angezeigte PIN eingeben.
Samsung 2016 – selbsterklärend. Samsung TV – Tizen-Fernseher ab 2016.

#### Anforderungen
Samsung TV<br> Die HJ-Serie wurde von mir auf dem UE55HU7200 getestet. Die Unterstützung für Geräte ab 2016 ist experimentell. Falls etwas nicht funktioniert, schauen Sie im Protokoll nach.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **IN BEARBEITUNG** -->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now

### 0.7.0 (2026-02-14)
- (mcm1957) Adapter requires node.js >= 20 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now
- (mcm1957) Dependencies have been updated

### 0.6.1 (2024-09-28)
* (marian-t-web-de) Sending a key to TV logged an error [#210]
* (marian-t-web-de) Error connecting to Samsung HJ Series TV has been fixed [#202] [#138]
* (mcm1957) Dependencies have been updated

### 0.6.0 (2024-05-24)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Adapter uses adapter-core now
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured
* (mcm1957) Dependencies have been updated

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2015-2017 soef <soef@gmx.net>, 2018-2022 ioBroker Community

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