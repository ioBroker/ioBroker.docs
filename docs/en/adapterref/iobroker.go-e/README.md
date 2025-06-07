![Logo](admin/go-echarger.png)
# ioBroker.go-echarger

[![NPM version](http://img.shields.io/npm/v/iobroker.go-e.svg)](https://www.npmjs.com/package/iobroker.go-e)
![Apache 2.0](https://img.shields.io/github/license/MK-2001/ioBroker.go-eCharger)
[![Downloads](https://img.shields.io/npm/dm/iobroker.go-e.svg)](https://www.npmjs.com/package/iobroker.go-e)
![Number of Installations (latest)](http://iobroker.live/badges/go-e-installed.svg)
![Version of Installations (stable)](http://iobroker.live/badges/go-e-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/MK-2001/ioBroker.go-e/badge.svg)](https://snyk.io/test/github/MK-2001/ioBroker.go-e)
[![NPM](https://nodei.co/npm/iobroker.go-e.png?mini=true)](https://nodei.co/npm/iobroker.go-e/)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/34be1ff5fb7943c4aab5ec6a06f0e4a5)](https://www.codacy.com/gh/MK-2001/ioBroker.go-e/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=MK-2001/ioBroker.go-e&amp;utm_campaign=Badge_Grade)

# The go-eCharger Wallbox
![Product Image](admin/go-eCharger-HOME-Wallbox.png)
For more details please visit https://go-e.co/

## Notice
This Adapter is currently only running with API v1. The new API v2 support is currently pending.
Please make sure that in the App you turned on the API v1.

Dieser Adapter unterstützt derzeit die API v1 und benötigt zur vollen funktionalität auch die V2. Bitte stelle sicher, dass in der APP die API v1 und v2 aktiviert wurde.

## go-eCharger adapter for ioBroker
**EN**
go-e is an invitation to move electrically. E-mobility is our drive, whereby our core competence is the charging technology for electric cars. From the individual charging station for e-cars to photovoltaic connections to load management of entire buildings, we are providers of holistic system solutions for all requirements of modern e-mobility.

**DE**
go-e ist die Aufforderung, sich elektrisch zu bewegen. e-Mobilität ist unser Antrieb, wobei unsere Kernkompetenz die Ladetechnik für Elektroautos ist. Von der einzelnen Ladestation für e-Autos über Photovoltaik-Anbindung bis hin zum Lastmanagement von ganzen Gebäuden, sind wir Anbieter gesamtheitlicher Systemlösungen für sämtliche Anforderungen der modernen e-Mobilität.

## ioBroker-Adapter manual / Quick start guide

The Manual for installation and configuration you can find here:
[Adapter Manual](./docs/Readme.md)

## Developer manual

Join the adapter Community
https://t.me/goECharger

Official API Documentation:
https://github.com/goecharger/go-eCharger-API-v1
https://github.com/goecharger/go-eCharger-API-v2

Official Product Support:
https://go-e.co/support/

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

[Additional moved here](./CHANGELOG_OLD.md)

## Translations
The most of the translations are coming from https://translator-ui.iobroker.in feel free to contribute, if something went wrong during the translations.

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

## Copyright
Copyright (c) 2024 MK-2001 go-e@itinsi.de