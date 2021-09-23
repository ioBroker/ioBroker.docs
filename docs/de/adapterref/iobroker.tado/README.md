---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: OLUxMuMNdnihxXi8rb+UiZ7OaKyLtsjQfjnmAjL1CsI=
---
![Anzahl der Installationen](http://iobroker.live/badges/tado-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tado.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/DrozmotiX/iobroker.tado.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

#ioBroker.tado
<img src="./admin/tado.png" width="50" height="50">

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![Testen und freigeben](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Tado-Adapter für ioBroker
tado° sorgt für ein angenehmes und gesundes Klima und spart bis zu 31% Heizkosten.

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, können Sie gerne eine persönliche Spende zukommen lassen (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt ! [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.tado/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Wichtige Änderungen in v0.3.x
Empfehlung: Löschen Sie nach Möglichkeit zuerst die alte Adapterinstallation oder löschen Sie alle Zustände, damit keine nicht unterstützten Zustände in der Installation verbleiben.
Upgrade von 0.2.x auf v0.3.x beinhaltet ein technisches Re-Factoring mit Breaking Changes. Einige Staaten haben ihren Namen/Pfad geändert, z.B.

| v0.2.x | v0.3.x |
| ------ | ------ |
| tado.[x].[yyyyy].Rooms.[z].setting.temperature |tado.[x].[yyyyy].Rooms.[z].setting.temperature.celsius |
| tado.[x].[yyyyy].Rooms.[z].overlay.clearZoneOverlay | tado.[x].[yyyyy].Rooms.[z].overlayClearZone |
| tado.[x].[yyyyy].Rooms.[z].Ist_Temperatur | tado.[x].[yyyyy].Rooms.[z].sensorDataPoints.insideTemperature.celsius |
| tado.[x].[yyyyy].Rooms.[z].Actual_Humidity | tado.[x].[yyyyy].Rooms.[z].sensorDataPoints.humidity.percentage |
| tado.[x].[yyyyy].Zimmer.[z].heatingPower | tado.[x].[yyyyy].Rooms.[z]..activityDataPoints.heatingPower.percentage |
| tado.[x].[yyyyy].Weather.solarIntensity | tado.[x].[yyyyy].Wetter.solarIntensity.Prozent |
| tado.[x].[yyyyy].Wetter.outsideTemperature | tado.[x].[yyyyy].Wetter.outsideTemperature.celsius |

Im Allgemeinen sind Werte jetzt NULL, wenn die API NULL oder einfach nichts sendet. In v0.2.x wurde manchmal der alte Wert beibehalten, manchmal durch 0 ersetzt, manchmal wurde NULL verwendet.
** Gerne weitere wichtige Änderungen basierend auf Ihrem Feedback!**

## Dinge, die du steuern kannst
| Staat | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Temperatur definieren |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | In den Automatikmodus wechseln |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Fahrplanmodus einstellen |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Legen Sie fest, wie lange der Fahrplanmodus gelten soll |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Temperatur-Offset |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Aktiven Fahrplan auswählen |
| Lüftergeschwindigkeit | Lüftergeschwindigkeit (nur AC-Geräte) |
| Modus | AC-Modus (nur AC-Geräte) |

**Bitte geben Sie für die letzten beiden Leitungen konkrete AC-Gerätepfade an, wenn Sie ein AC-Gerät haben!**

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.3.7 (2021-08-24)
* (HGlab01) ActiveTimeTable can be set (#337)
* (HGlab01) Improve logs and change code structure a little bit
* (HGlab01) manage min/max temperature for heating (5-25 celsius) and hotwater (30-80 celsius) to avoid API crashes (#341)

### 0.3.6 (2021-08-16)
* (HGlab01) support attribute 'orientation' (Sentry: IOBROKER-TADO-35)

### 0.3.5 (2021-08-05)
* (HGlab01) fix issue 'hot water cannot be switched on' (#309)
* (HGlab01) change to new sentry dsn
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.2

### 0.3.4 (2021-07-24)
* (HGlab01) add attribute 'location' to blacklist (Sentry IOBROKER-TADO-2Y)
* (HGlab01) support attribute 'swing' (Sentry: IOBROKER-TADO-2G)
* (HGlab01) support attribute 'end' and 'commandTableUploadState' (Sentry: IOBROKER-TADO-1M)

### 0.3.3 (2021-07-19)
* (HGlab01) Add attributes title, ssid and code
* (HGlab01) Improve sentry handling by bumping iobroker-jsonexplorer to v0.1.1

### 0.3.2 (2021-07-15)
* (HGlab01) Use password handling from JS-Controller framework

### 0.3.1 (2021-07-15)
* (HGlab01) Works with Node 12.x or higher (simple-oauth2 update dependency)
* (HGlab01) Bump simple-oauth2 from 2.5.2 to 4.2.0
* (HGlab01) Prepare for first stable version

### 0.3.0 (2021-06-26)
* (HGlab01) Technical re-factoring of state management !BREAKING CHANGES! (see above)
* (HGlab01) implement offset functionality
* (HGlab01) Set minimum refresh time to 30 seconds
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.0

### 0.2.7 (2021-05-11)
* (HGlab01) prepare for js-controller v3.3.x (has wrong type "xxxx" but has to be "yyyy") (#214)
* (HGlab01) improve state creation by using iobroker-jsonexplorer
* (HGlab01) improve CPU usage (#192)
* (HGlab01) add attribute enabledFeatures (#226)

### 0.2.6 (2021-03-20)
* (HGlab01) apply formatting for main.js
* (HGlab01) add quickActionsEnabled (#164)
* (HGlab01) support HOT_WATER devices (#138)
* (HGlab01) support AIR_CONDITIONING devices (#146)
* (HGlab01) Implement pool handling for setZoneOverlay
* (HGlab01) fix issue: state has no existing object (#184)
* (HGlab01) add cleaning function for existing timer 'polling'
* (HGlab01) state_attr.js: attribute 'support' was defined twice

### 0.2.5 (2020-12-16)
* (HGlab01) add childLockEnabled

### 0.2.4 (2020-11-19)
* (HGlab01) Improve overlay modes + solve merge issue of version 0.2.3 

### 0.2.3 (2020-11-18)
* (HGlab01) add overlay methods 'timer'
* (HGlab01) deal with JSON object overlay or openWindow is null
* (HGlab01) Bugfix : Cannot read property 'percentage' of undefined

### 0.2.2 (2020-11-02)
* (HGlab01) add typeSkillBasedApp
* (HGlab01) add autoAssistFreeTrialEnabled
* (HGlab01) Add support for autoAssistFreeTrialEnabled
* (HGlab01) Overlay methods 'manual' and 'next time block'

### 0.2.1 (2020-10-22)
* (DutchmanNL) Update dependency's
* (DutchmanNL) Update testing, remove node 8 and add node 14
* (DutchmanNL) Implement automated deployment with githubActions
* (HGlab01) Support incident Detection
* (LutzHelling) Bugfix : Add orientation
* (LutzHelling) Bugfix : legacyHeatingInstallationsEnabled
* (HGlab01) Bugfix : Add legacyHeatingInstallationsEnabled to DoHome
* (HGlab01) Bugfix : Fix unhandled information found in DoReadDevices

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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