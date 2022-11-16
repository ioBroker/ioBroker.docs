---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: nrMyL/9foi7/L0LIs3PVRgaOmMS3aEEcBPu8ekFqpow=
---
# IoBroker.tado

![Anzahl der Installationen](http://iobroker.live/badges/tado-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tado.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Testen und freigeben](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Tado-Adapter für ioBroker
tado° sorgt für ein angenehmes und gesundes Klima und spart dabei bis zu 31 % Heizkosten.

## Wichtige Änderungen in 0.4.0
* Erfordert NodeJS 14.16 oder höher
* Erfordert ioBroker-Host (js-Controller) 4.0 oder höher

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende machen (dies ist ein persönlicher Spenden-Link für DutchmanNL, keine Verbindung zum ioBroker-Projekt! [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.tado/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Dinge, die du steuern kannst
| Zustand | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Räume.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Räume.[z].Einstellung.Temperatur.Celsius | Temperatur definieren |
| tado.[x].[yyyyyy].Räume.[z].overlayClearZone | Wechseln Sie in den Automatikmodus |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Zeitplanmodus einstellen |
| tado.[x].[yyyyyy].Räume.[z].overlay.termination.durationInSeconds | Legen Sie fest, wie lange der Zeitplanmodus gelten soll |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Temperatur-Offset |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Kindersicherung ein/aus |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Wählen Sie aktiven Zeitplan |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Erkennung offener Fenster am Thermostat aktivieren/deaktivieren |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Timeout, wie lange Thermostate ausgeschaltet werden, wenn ein offenes Fenster erkannt wird |
| tado.[x].[yyyyyy].Räume.[z].activateOpenWindow | Thermostate ausschalten, wenn ein offenes Fenster erkannt wird (funktioniert nur, wenn der Thermostat ein offenes Fenster erkennt) |
| tado.[x].[yyyyyy].Home.state.presence | Modus ZUHAUSE oder ABWESEND einstellen |
| tado.[x].[yyyyyy].Home.Hauptschalter | Alle Geräte ein-/ausschalten |
| tado.[x].[yyyyyy].Räume.[z].setting.mode | AC-Modus (nur AC-Geräte) |
| tado.[x].[yyyyyy].Räume.[z].setting.fanspeed | Fanspeed (nur AC-Geräte mit V3 und älteren Versionen) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlabel (nur AC-Geräte mit Version V3+) |
| tado.[x].[yyyyyy].Räume.[z].setting.verticalSwing | Vertikalschwenk (nur AC-Geräte mit Version V3+) |
| tado.[x].[yyyyyy].Räume.[z].setting.horizontalSwing | Horizontalschwenk (nur AC-Geräte mit V3 und älteren Versionen) |

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.0 (2022-09-05)
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Bump is-online from 9.0.1 to 10.0.0

### 0.3.16 (2022-08-01)
* (HGlab01) Support light (issue #519)
* (HGlab01) Add attributes vattenfallBannerDiscountCode, thresholdModeActive, mountingStateWithError, isAirComfortEligible

### 0.3.15 (2022-02-27)
* (DutchmanNL) move to jsonConfig.json (Admin 5)
* (ilueckel) Support steering of ActivateOpenWindow, OpenWindowDetection, childLockEnabled 
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.9
* (HGlab01) js-controller 4.0 readiness

### 0.3.14 (2022-01-21)
* (HGlab01) Improve hotwater handling
* (HGlab01) Improve AC Control v3 devices 
* (HGlab01) Support swing ON/OFF for AC v3 devices

### 0.3.13 (2022-01-03)
* (HGlab01) Optimize internet-check by using isOnline-library
* (HGlab01) Support Smart AC Control V3+ (issue #403)
* (HGlab01) Offset temperature rounding to max. 2 digits

## License
MIT License

Copyright (c) 2022 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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