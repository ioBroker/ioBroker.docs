---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: u6RHwdGE8h+6GmwqJEo0/eXOOBqw568qHzRfz6s4tKk=
---
# IoBroker.tado

![Anzahl der Installationen](http://iobroker.live/badges/tado-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tado.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Tado-Adapter für ioBroker
tado° sorgt für ein angenehmes und gesundes Klima und spart gleichzeitig bis zu 31 % Ihrer Heizkostenrechnung.

## Dinge, die Sie steuern können
| Staat | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Temperatur definieren |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | In den Automatikmodus wechseln |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Zeitplanmodus einstellen |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Legen Sie fest, wie lange der Zeitplanmodus gelten soll |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Temperaturoffset |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Kindersicherung ein/aus |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Aktiven Zeitplan auswählen |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Erkennung offener Fenster am Thermostat aktivieren/deaktivieren |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Timeout, wie lange Thermostate ausgeschaltet werden, wenn ein offenes Fenster erkannt wird |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Thermostate ausschalten, wenn ein offenes Fenster erkannt wird (funktioniert nur, wenn der Thermostat ein offenes Fenster erkennt) |
| tado.[x].[yyyyyy].Home.state.presence | Heim- oder Abwesenheitsmodus einstellen |
| tado.[x].[yyyyyy].Home.masterswitch | Alle Geräte ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | AC-Modus (nur AC-Geräte) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Lüftergeschwindigkeit (nur AC-Geräte mit V3 und älteren Versionen) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (nur AC-Geräte mit V3+-Version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Vertikaler Schwenk (nur AC-Geräte mit V3+-Version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Horizontaler Schwenk (nur AC-Geräte mit V3 und älteren Versionen) |

## Erfordert
* NodeJS 16 oder höher
* ioBroker-Host (JS-Controller) 4.0 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__

-->
### 0.4.10 (2023-09-26)
* (HGlab01) Add attribute 'isBalanceHpEligible'
* (HGlab01) improve axios keep_a_live

### 0.4.9 (2023-07-05)
* (HGlab01) Add attribute 'zonesCount'
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.4.8 (2023-05-12)
* (HGlab01) Add attribute 'isHeatSourceInstalled'
* (HGlab01) Bump axios to 1.4.0

### 0.4.7 (2023-04-26)
* (HGlab01) Add attribute 'generation'
* (HGlab01) improve axios error handling
* (HGlab01) Bump axios to 1.3.6

### 0.4.6 (2023-04-12)
* (HGlab01) Add attribute 'isEnergyIqEligible' (#613)
* (HGlab01) improve ETIMEDOUT issue
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.11
* (HGlab01) js-controller v5 readiness (#618)

## License
MIT License

Copyright (c) 2023 HGlab01 & DutchmanNL <rdrozda@hotmail.com>

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