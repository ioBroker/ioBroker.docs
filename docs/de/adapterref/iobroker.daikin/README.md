---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.daikin/README.md
title: ioBroker.daikin
hash: RhZwkRatGElEOeIGnsqYbOI4z4q4/Wq/JsbyYcG+We0=
---
![Logo](../../../en/adapterref/iobroker.daikin/admin/daikin.jpg)

![Anzahl der Installationen](http://iobroker.live/badges/daikin-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.daikin.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.daikin.svg)

# IoBroker.daikin
![Testen und Freigeben](https://github.com/Apollon77/iobroker.daikin/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/daikin/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Dieser Adapter wird an ein Daikin-Klimagerät angeschlossen und ermöglicht dessen Steuerung und das Auslesen von Werten.
Das Daikin-Gerät muss mit einem Daikin-WLAN-Controller ausgestattet sein. Normalerweise werden alle WLAN-Controller unterstützt, die von der Daikin-App unterstützt werden.

Laut den Supportdokumenten von Daikin sollten (mindestens) die folgenden Geräte kompatibel sein:

Kompatible Geräte in Kombination mit **BRP069A41**: FTXG20LV1BW, FTXG20LV1BS , FTXG25LV1BW, FTXG25LV1BS, FTXG35LV1BW, FTXG35LV1BS, FTXG50LV1BW, FTXG50LV1BS, FTXJ20LV1BW, FTXJ20LV1BS, FTXJ25LV1BW, FTXJ25LV1BS, FTXJ35LV1BW, FTXJ35LV1BS, FTXJ50LV1BW, FTXJ50LV1BS ,

Kompatible Geräte in Kombination mit **BRP069A42**: FTXZ25NV1B, FTXZ35NV1B, FTXZ50NV1B, FTXS35K2V1B, FTXS35K3V1B, FTXS42K2V1B, FTXS42K3V1B, FTXS50K2V1B, FTXS50K3V1B, FTXLS25K2V1B, FTXLS35K2V1B,FTXM35K3V1B, FTXM42K3V1B, FTXM50K3V1B, , FTXS60GV1B, FTXS71GV1B, ATXS35K2V1B, ATXS35K3V1B, ATXS50K2V1B, ATXS50K3V1B, , FTX50GV1B, FTX60GV1B, FTX71GV1B, , FVXG25K2V1B, FVXG35K2V1B, FVXG50K2V1B, , FVXS25FV1B, FVXS35FV1B, FVXS50FV1B, , FLXS25BAVMB, FLXS25BVMA, FLXS25BVMB, FLXS35BAVMB, FLXS35BAVMB9, FLXS35BVMA, FLXS35BVMB, FLXS50BAVMB, FLXS50BVMA, FLXS50BVMB, FLXS60BAVMB, FLXS60BVMA, FLXS6BVMB,

Kompatible Geräte in Kombination mit **BRP069A43 (?)**: CTXS15K2V1B, CTXS15K3V1B, FTXS20K2V1B, FTXS20K3V1B, FTXS25K2V1B, FTXS25K3V1B, CTXS35K2V1B, CTXS35K3V1B, FTXM20K3V1B, FTXM25K3V1B, , ATXS20K2V1B, ATXS20K3V1B, ATXS25K2V1B, ATXS25K3V1B, , FTX20J2V1B, FTX25J2V1B, FTX35J2V1B, FTX20J3V1B, FTX25J3V1B, FTX35J3V1B, , FTXL25J2V1B, FTXL35J2V1B, , FTX20KV1B, FTX25KV1B, FTX35KV1B, FTX20GV1B, FTX25GV1B, FTX35GV1B, , ATX20J2V1B, ATX20J3V1B, ATX25J2V1B, ATX25J3V1B, ATX35J2V1B, ATX35J3V1B, ATX20KV1B, ATX25KV1B, ATX35KV1B, , ATXL25J2V1B, ATXL35J2V1B,

Kompatible Geräte in Kombination mit **BRP069A44 (?)**: FTX50KV1B, FTX60KV1B

Hinweis: Laut bisherigen Berichten behalten die Adapter hier ihre lokale API auch nach einem Upgrade auf die Firmware, die die Nutzung der Daikin Cloud ermöglicht. Daher sollte dieser Adapter weiterhin mit diesen Geräten funktionieren.

Hinweis: Für Geräte mit neueren WLAN-Adaptern wie **BRP069C4x**, die nur von der Onecta-App verwendet werden können, verwenden Sie stattdessen den Adapter [Daikin-Cloud](https://github.com/Apollon77/ioBroker.daikin-cloud).

## Haftungsausschluss
**Alle Produkt- und Firmennamen sowie Logos sind Warenzeichen™ oder eingetragene Warenzeichen® ihrer jeweiligen Inhaber. Ihre Verwendung stellt keine Verbindung zu oder Billigung durch diese oder verbundene Tochterunternehmen dar! Dieses persönliche Projekt wird in meiner Freizeit gepflegt und verfolgt kein Geschäftsziel.** **Daikin ist eine Marke von DAIKIN INDUSTRIES, LTD.**

## Beschreibung der Parameter
### DaikinIp
Die IP des WLAN-Controllers vom Gerät

### PollingIntervall
Intervall in Sekunden zur Aktualisierung der Daten vom Gerät. Zusätzlich werden die Werte bei jeder Änderung aktualisiert.

## Beschreibung der verfügbaren Instanzobjekte/Zustände
Nachdem der Adapter eine Verbindung zum Daikin-Gerät hergestellt hat, wird eine Objektstruktur erstellt:

* deviceInfo.* : Allgemeine Informationen zum Daikin-Gerät, schreibgeschützt
* control.* : Hauptsteuerwerte vom Gerät wie Zieltemperatur, Modus und dergleichen, **lese- und beschreibbar**
* controlInfo.* : Zusätzliche Steuerinformationen vom Gerät, schreibgeschützt
* modelInfo.* : Informationen über das Gerät selbst und die unterstützten Funktionen, schreibgeschützt
* sensorInfo.* : Sensordaten vom Gerät wie die gemessene Innen- und Außentemperatur

## Aufgaben
* Tests verbessern: Statusprüfungen und SetStates
* Modellinformationen/unterstützte Funktionen prüfen
* Dokumente für die Webseite
* VIS-Widget

## Changelog
### 1.5.1 (2025-05-25)
* (@Matze2) Handles potential error case when using demand control data

### 1.5.0 (2025-05-24)
* (@Matze2) Added states to set demand control percentage
* (@Apollon77) Prevented some error logs and fix internal flow issues

### 1.4.2 (2022-07-25)
* (Apollon77) Make sure polling still works after setting special mode states

### 1.4.1 (2022-06-27)
* (Apollon77) Prevent crash case reported by Sentry

### 1.4.0 (2022-06-09)
* (Apollon77) Add Connection identifier for Admin and Device
* (Apollon77) Optimize unload handling

### 1.3.3 (2021-06-24)
* (Apollon77) Prevent crash case when no temperature was read out (Sentry IOBROKER-DAIKIN-D, IOBROKER-DAIKIN-M)

### 1.3.2 (2021-06-05)
* (Apollon77) Handle modes correctly where no temperature or humidity parameters are required

### 1.3.1 (2021-05-14)
* (Apollon77) Prepare for js-controller 3.3

### 1.3.0 (2021-01-14)
* (Apollon77) Prevent warnings in js-controller 3.2
* (Apollon77) Allow overwriting the name in Daikin channel object
* (Apollon77) Require at least js-controller 2.0

### 1.2.0 (2020-12-27)
* add compact mode

### 1.1.3 (2020-11-19)
* add experimental support for lpw parameter
* crash cases prevented (Sentry IOBROKER-DAIKIN-7)

### 1.1.2 (2020-08-06)
* crash cases prevented (Sentry IOBROKER-DAIKIN-2, IOBROKER-DAIKIN-3, IOBROKER-DAIKIN-4)

### 1.1.1 (2020-08-02)
* better handle case where configuration is missing (Sentry IOBROKER-DAIKIN-1)

### 1.1.0 (2020-07-21)
* Adjust Texts and translate
* create daikin.X ads device object and add one role
* Update dependencies

### 1.0.4 (2019-06-25)
* Daikin library updated, communication error handling optimized

### 1.0.3 (2019-02-xx)
* Daikin library updated, communication errors optimized

### 1.0.2 (2018-04-29)
* Daikin library updated

### 1.0.1 (2018-04-13)
* Fix Admin

### 1.0.0 (2018-01-1x)
* Admin3 readieness
* Support older Daikin-WLAN-Firmwares with special config flag

### 0.2.3 (2017-04-01)
* Add control.lastResult to see if a change was successfull

### 0.2.2
* reduce debug logging

### 0.2.0
* first finalized version

### 0.1.x
* development and first tests

## License

The MIT License (MIT)

Copyright (c) 2017-2025 Apollon77 <ingo@fischer-ka.de>

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