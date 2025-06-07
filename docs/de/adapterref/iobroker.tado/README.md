---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: cudsgO77sXpPgwId15gH8Ex4ig5OcbZp7Su9X66fyh4=
---
# IoBroker.tado

![Anzahl der Installationen](http://iobroker.live/badges/tado-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tado.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Bekannte Sicherheitslücken](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![Testen und Freigeben](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## Tado-Adapter für ioBroker
Tado° (https://www.tado.com) ist der Experte für intelligentes Heiz- und Energiemanagement für Ihr Zuhause, konzipiert und entwickelt in Deutschland. Sparen Sie mit uns dauerhaft Energie und Kosten – genießen Sie ein gemütliches und nachhaltiges Zuhause.

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Tado° X
Grundlegender Support für Tado° X verfügbar.
Wenn Ihr Setup nicht funktioniert, melden Sie bitte eine Fehlermeldung ([Ticket](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01&labels=enhancement&projects=&template=Enhancement.md&title=)). Sie müssen Debugging-Sitzungen durchführen und mit dem Adapterentwickler interagieren, um die Funktionen von Tado° X zu verbessern.

## Dinge, die Sie mit Tado° V3+, V3, V2 steuern können
| Bundesland | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Temperatur definieren |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | In den automatischen Modus wechseln |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Stundenplanmodus einstellen |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Legen Sie fest, wie lange der Zeitplanmodus gelten soll |
| tado.[x].[yyyyyy].Räume.[z].Geräte.[RUaaaaaaaaaaa].offset.offsetCelsius | Temperatur-Offset |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaaa].childLockEnabled | Kindersicherung ein/aus |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Aktiven Stundenplan auswählen |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Fenster-offen-Erkennung am Thermostat aktivieren/deaktivieren |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Timeout, wie lange Thermostate ausgeschaltet bleiben, wenn ein offenes Fenster erkannt wird |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Thermostate ausschalten, wenn ein offenes Fenster erkannt wird (funktioniert nur, wenn der Thermostat ein offenes Fenster erkennt) |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | AC-Modus (nur AC-Geräte) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Lüftergeschwindigkeit (nur AC-Geräte mit V3 und älteren Versionen) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (nur AC-Geräte mit V3+ Version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Vertikale Schwingung (nur AC-Geräte mit V3+ Version) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Horizontale Schwingung (nur AC-Geräte mit V3 und älteren Versionen) |
| tado.[x].[yyyyyy].Home.state.presence | Modus ZUHAUSE, ABWESEND oder AUTO einstellen |
| tado.[x].[yyyyyy].Home.masterswitch | Alle Geräte ein-/ausschalten |
| tado.[x].[yyyyyy].meterReadings | JSON-Objekt mit {"date":"YYYY-MM-DD","reading": 1234} kann zum Hochladen von Zählerständen zu Energy IQ verwendet werden |

## Dinge, die Sie mit Tado° X steuern können
| Bundesland | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.value | Temperatur definieren |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.controlType | Zeitplanmodus einstellen |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.remainingTimeInSeconds | Dauer für Timermodus |
| tado.[x].[yyyyyy].Rooms.[z].resumeScheduleRoom | Zurück zum Automatikmodus für diesen Raum |
| tado.[x].[yyyyyy].Rooms.resumeScheduleHome | Zurück zum Automatikmodus für alle Räume |
| tado.[x].[yyyyyy].Rooms.allOff | Alle Räume ausschalten |
| tado.[x].[yyyyyy].Rooms.boost | Alle Räume in den Boost-Modus schalten |
| tado.[x].[yyyyyy].Home.state.presence | Modus ZUHAUSE, ABWESEND oder AUTO einstellen |
| tado.[x].[yyyyyy].meterReadings | JSON-Objekt mit {"date":"YYYY-MM-DD","reading": 1234} kann zum Hochladen von Zählerständen zu Energy IQ verwendet werden |

## Erfordert
* Node.js 20 oder höher
* ioBroker-Host (js-Controller) 5.0 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (HGlab01) fix issue 'definition missing for awayMode' [TadoX]
* (HGlab01) fix issue 'definition missing for preheating' [TadoX]
* (HGlab01) Additional guidance/log when it comes to RefreshToken issue

### 0.7.10 (2025-04-25)
* (HGlab01) further token refresh optimizations

### 0.7.9 (2025-04-17)
* (HGlab01) fix issue 'refreshToken() failed'

### 0.7.8 (2025-04-10)
* (HGlab01) fix issue 'definition missing for balanceControl' [TadoX]

### 0.7.7 (2025-04-08)
* (HGlab01) optimize sentry usage
* (HGlab01) improve retry-mechanism when it comes to erros

### 0.7.5 (2025-03-31)
* (HGlab01) some further refactorings
* (HGlab01) Bump axios to 1.8.4

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com> & DutchmanNL <oss@drozmotix.eu>

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