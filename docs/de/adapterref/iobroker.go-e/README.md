---
chapters: {"pages":{"en/adapterref/iobroker.go-e/README.md":{"title":{"en":"ioBroker.go-echarger"},"content":"en/adapterref/iobroker.go-e/README.md"},"en/adapterref/iobroker.go-e/docs/Readme.md":{"title":{"en":"Functionalities"},"content":"en/adapterref/iobroker.go-e/docs/Readme.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.go-e/README.md
title: ioBroker.go-echarger
hash: zX70YMf7v0mTpOjZafA6U5EiR0zjLuU5kd6ciU8vh84=
---
![Logo](../../../en/adapterref/iobroker.go-e/admin/go-echarger.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.go-e.svg)
![Apache 2.0](https://img.shields.io/github/license/MK-2001/ioBroker.go-eCharger)
![Downloads](https://img.shields.io/npm/dm/iobroker.go-e.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/go-e-installed.svg)
![Installationsversion (stabil)](http://iobroker.live/badges/go-e-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/MK-2001/ioBroker.go-e/badge.svg)
![NPM](https://nodei.co/npm/iobroker.go-e.png?mini=true)
![Codec-Abzeichen](https://app.codacy.com/project/badge/Grade/34be1ff5fb7943c4aab5ec6a06f0e4a5)

# ioBroker.go-echarger

# Die go-eCharger Wallbox

![Produktbild](../../../en/adapterref/iobroker.go-e/admin/go-eCharger-HOME-Wallbox.png) Weitere Informationen finden Sie unter <https://go-e.co/>

## Beachten

Dieser Adapter unterstützt derzeit nur API v1. Die Unterstützung für API v2 ist in Vorbereitung. Bitte stellen Sie sicher, dass Sie in Ihrer App API v1 aktiviert haben.

Dieser Adapter unterstützt derzeit die API v1 und benötigt zur vollen Funktionalität auch die V2. Bitte stellen Sie sicher, dass in der APP die API v1 und v2 aktiviert wurde.

## go-eCharger-Adapter für ioBroker

**EN** go-e lädt zur elektrischen Fortbewegung ein. Elektromobilität ist unser Antrieb, unsere Kernkompetenz liegt in der Ladetechnik für Elektroautos. Von der individuellen Ladestation über Photovoltaikanlagen bis hin zum Lastmanagement ganzer Gebäude bieten wir ganzheitliche Systemlösungen für alle Anforderungen moderner Elektromobilität.

**DE** go-e ist die Aufforderung, sich elektrisch zu bewegen. e-Mobilität ist unser Antrieb, wobei unsere Kernkompetenz die Ladetechnik für Elektroautos ist. Von der einzelnen Ladestation für e-Autos über Photovoltaik-Anbindung bis hin zum Lastmanagement ganzer Gebäuden, sind wir Anbieter gesamtheitlicher Systemlösungen für sämtliche Anforderungen der modernen e-Mobilität.

## ioBroker-Adapter-Handbuch / Schnellstartanleitung

Die Anleitung für Installation und Konfiguration finden Sie hier: [Adapterhandbuch](/#/docs/adapterref/iobroker.go-e/docs/Readme.md)

## Entwicklerhandbuch

Tritt der Adapter-Community bei [: https://t.me/goECharger](https://t.me/goECharger)

Offizielle API-Dokumentation: <https://github.com/goecharger/go-eCharger-API-v1> <https://github.com/goecharger/go-eCharger-API-v2>

Offizieller Produktsupport: <https://go-e.co/support/>

## Übersetzungen

Die meisten Übersetzungen stammen von [https://translator-ui.iobroker.in.](https://translator-ui.iobroker.in) Wenn bei den Übersetzungen etwas schiefgelaufen ist, können Sie gerne mitwirken.

## Copyright

Copyright © 2024 MK-2001 <go-e@itinsi.de>

## Changelog

### 1.0.42
* Changed Adapter Core


### 1.0.41
* Update of dependencies
* Default PSM Grid mode selectable
* Bug in negate when using go-e software (Thanks to Markus D.)
* ioBroker updates on core packes (dependencies update)

### 1.0.38
* Bug on Negate Watts if use Go-e charger

### 1.0.35
* switch between ioBroker and go-e Hardware logic for PV-Calculation
* Adding phaseSwitch Buffer to reduce switch on coudy days
* improved documentation
* Bug #232
* Wrong deafult value type

### 1.0.32
* Timer for loading

### 1.0.31
* Versioning updates

### 1.0.30
* added max ampere in settings
* Added level to switch 1-phase to 3 pahases
* enables phasesSwitchMode
* Only possible if V2 is enabled
* some bugs

### 1.0.29
* Bugfixes.

[Additional moved here](https://github.com/MK-2001/ioBroker.go-e/blob/master/CHANGELOG_OLD.md)

## License
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.