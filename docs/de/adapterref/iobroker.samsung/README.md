---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.samsung/README.md
title: kein Titel
hash: yV2UJS2q2NC3u9uj++eNNGbe8+MrMbJdbL2+4YYtkvI=
---
![Logo](../../../en/adapterref/iobroker.samsung/admin/samsung.png)

![Anzahl der Installationen](http://iobroker.live/badges/samsung-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.samsung.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.samsung.svg)

### IoBroker.samsung
![Testen und Freigeben](https://github.com/iobroker-community-adapters/ioBroker.samsung/workflows/Test%20and%20Release/badge.svg) <!-- [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/samsung/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) -->

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

**Wichtiger Hinweis für Windows-Benutzer: Dieser Adapter erfordert die systemweite Installation von Git**

#### Beschreibung
Adapter für Samsung-Fernseher

### Erste Erstellung
Dieser Adapter wurde ursprünglich von @soef unter https://github.com/soef/ioBroker.samsung erstellt, aber nicht mehr gepflegt, daher haben wir ihn in die iobroker-community verschoben, damit Fehler behoben werden konnten. Danke @soef für seine Arbeit.
Der Adapter wurde seitdem von jogibear9988 und mwp007 mit weiteren APIs erweitert.

#### Aufbau
Geben Sie die IP Ihres Samsung-Fernsehers ein.
Wählen Sie Ihre API: Samsung Remote – Fernseher vor 2014 Nach der Installation müssen Sie die neue Verbindung auf Ihrem Fernseher bestätigen Samsung HJ – 2014 und 2015 Nach der ersten Verbindung müssen Sie die auf Ihrem Fernseher angezeigte PIN eingeben.
Samsung2016 – selbsterklärend SamsungTV – Tizen-Fernseher nach 2016

#### Anforderungen
Samsung-Fernseher<br> HJ-Serie von mir auf UE55HU7200 getestet. Support für Geräte seit 2016 experimentell, wenn etwas nicht funktioniert, schauen Sie im Protokoll nach.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.0 (2024-05-24)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Adapter uses adapter-core now
* (Apollon77) Only Wake-On-Lan SamsungTVs on adapterstart if no token is configured
* (mcm1957) Dependencies have been updated

### 0.5.11 (2022-06-02)
* (Apollon77) Optimize checkOnOff logic on adapter start

### 0.5.10 (2022-05-27)
* (Apollon77) Fix crash cases reported by Sentry

### 0.5.9 (2022-05-27)
* (Apollon77) fix crash when initializing a SamsungTV (Tizen)

### 0.5.8 (2022-04-23)
* (Apollon77) Fix crash cases reported by Sentry

## License
The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
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