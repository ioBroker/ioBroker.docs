---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lg-thinq/README.md
title: ioBroker.lg-thinq
hash: Ydb/GntLH+ARrzo4EkkPGRrtd9VMI9Sws/Ubh9ZmQfo=
---
![Logo](../../../en/adapterref/iobroker.lg-thinq/admin/lg-thinq.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.lg-thinq.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.lg-thinq.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/lg-thinq-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/lg-thinq-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.lg-thinq.svg)
![NPM](https://nodei.co/npm/iobroker.lg-thinq.png?downloads=true)

# IoBroker.lg-thinq
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.lg-thinq/workflows/Test%20and%20Release/badge.svg)

## LG-Thinq-Adapter für ioBroker
Adapter für LG ThinQ

## Unterstützte Geräte
**GERÄT**: lg-thinq.0.xxx.deviceType -> z.B. G. 101</br> **PLATTFORM**: lg-thinq.0.xxx.platformType -> e. G. Thinq2

* Gerät -> 101 Kühlschrank -> Thinq2 + Thinq1
* Gerät -> 201 Waschmaschine + Signatur -> Thinq2 + Thinq1
* Gerät -> 202 Trockner -> Thinq2 + Thinq1
* Gerät -> 401 AC -> Thinq2 + Thinq1
* Gerät -> 406 Wärmepumpe -> Thinq2

## Beschreibung
🇬🇧 [Beschreibung](/docs/en/README.md)</br> 🇩🇪 [Beschreibung](/docs/de/README.md)

## Fragen
🇩🇪 [Fragen](https://forum.iobroker.net/topic/46498/test-adapter-lg-thinq-v0-0-1)

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### **WORK IN PROGRESS**

-   (Lucky-ESA) Added device 406 (heat pump)
-   (Lucky-ESA) Added description
-   (Lucky-ESA) Bugfixe

### 0.2.0

-   (Lucky-ESA) Added automatic terms acceptance
-   (Lucky-ESA) Added 401 Thinq1 device
-   (Lucky-ESA) Added 101 Thinq1 device
-   (TA2k) Bugfix

### 0.1.4

-   (TA2k) Added warning for not supported devices

### 0.1.1

-   (TA2k) Added AC Device 401 thinq2
-   (TA2k) Bugfix

### 0.1.0

-   (TA2k) Added MQTT connection for live status updates

### 0.0.3

-   (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2023 TA2k <tombox2020@gmail.com>

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