---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: 7yLbgbElOKGLdbPXvmA+mjat20QDtzBYxvZoOhg61A4=
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
Tado° (https://www.tado.com) ist Ihr Experte für intelligentes Heizen und Energiemanagement für Ihr Zuhause – entwickelt und hergestellt in Deutschland. Sparen Sie mit uns dauerhaft Energie und Kosten – für ein behagliches und nachhaltiges Zuhause.

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## !WICHTIG! Tado° wird API-Aufrufbeschränkungen einführen.
Tado führt ein Limit für API-Aufrufe ein. Nutzer ohne Auto-Assist-Abonnement sind auf 100 Aufrufe pro Tag beschränkt, mit einem Abonnement sind es bis zu 20.000 Aufrufe.

Weitere Informationen finden Sie im Artikel [Das](https://support.tado.com/en/articles/12165739-limitation-for-rest-api-usage).
Der Tado ioBroker-Adapter wurde um eine neue Funktion erweitert, die neue Konfigurationsmöglichkeiten zur Verwaltung der API-Nutzung bietet. Das tägliche Limit von 100 Aufrufen bedeutet jedoch, dass der Adapter ohne Auto-Assist-Abonnement nicht nutzbar ist. Dies entspricht nur etwa vier Anfragen pro Stunde, was die Funktionalität des Adapters erheblich einschränkt.
Wenn Sie mit Tados Entscheidung nicht einverstanden sind, sollten Sie ihnen das mitteilen! [wissen](https://support.tado.com/de/articles/3590239-wie-kann-ich-den-kundensupport-von-tado-kontaktieren)

## Tado° X
Grundlegende Unterstützung für Tado° X ist verfügbar.
Falls Ihre Konfiguration nicht funktioniert, melden Sie bitte ein Problem mit der ID [Ticket](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01&labels=enhancement&projects=&template=Enhancement.md&title=). Sie müssen einige Debugging-Sitzungen durchführen und sich mit dem Entwickler des Adapters in Verbindung setzen, um die Funktionen von Tado° X zu verbessern.

## Lenkbare Elemente bei Tado° V3+, V3, V2
| Bundesland | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | Temperatur definieren |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | In den Automatikmodus wechseln |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | Zeitplanmodus festlegen |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | Legt fest, wie lange der Zeitplanmodus gelten soll |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | Temperatur-Offset |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | Kindersicherung ein/aus |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | Aktiven Stundenplan auswählen |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | Fenstererkennung am Thermostat aktivieren/deaktivieren |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | Timeout, nach dem Thermostate bei Erkennung eines offenen Fensters ausgeschaltet bleiben |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | Thermostate ausschalten, wenn ein offenes Fenster erkannt wird (funktioniert nur, wenn der Thermostat ein offenes Fenster erkennt) |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | AC-Modus (nur AC-Geräte) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Lüftergeschwindigkeit (nur AC-Geräte mit Version V3 und älter) |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel (nur AC-Geräte ab Version V3) |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | Vertikale Schwenkfunktion (nur AC-Geräte ab Version V3) |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | Horizontale Schwenkfunktion (nur AC-Geräte mit V3 und älteren Versionen) |
| tado.[x].[yyyyyy].Home.state.presence | Modus einstellen: ZUHAUSE, ABWESEN oder AUTO |
| tado.[x].[yyyyyy].Home.masterswitch | Alle Geräte ein-/ausschalten |
| tado.[x].[yyyyyy].meterReadings | Ein JSON-Objekt mit {"date":"YYYY-MM-DD","reading": 1234} kann verwendet werden, um Zählerstände zu Energy IQ hochzuladen |

## Dinge, die Sie auf dem Tado° X steuern können
| Bundesland | Beschreibung |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | Gerät ein-/ausschalten |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.value | Temperatur definieren |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.controlType | Zeitplanmodus festlegen |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.remainingTimeInSeconds | Dauer im Timer-Modus |
| tado.[x].[yyyyyy].Rooms.[z].resumeScheduleRoom | Zurück zum automatischen Modus für diesen Raum |
| tado.[x].[yyyyyy].Rooms.[z].devices.[VAaaaaaaaaaa].temperatureOffset | Offset des Geräts ändern |
| tado.[x].[yyyyyy].Rooms.resumeScheduleHome | Zurück zum Automatikmodus für alle Räume |
| tado.[x].[yyyyyy].Rooms.allOff | Alle Räume ausschalten |
| tado.[x].[yyyyyy].Rooms.boost | Alle Räume in den Boost-Modus schalten |
| tado.[x].[yyyyyy].Home.state.presence | Modus einstellen: ZUHAUSE, ABWESEN oder AUTO |
| tado.[x].[yyyyyy].meterReadings | Ein JSON-Objekt mit {"date":"YYYY-MM-DD","reading": 1234} kann verwendet werden, um Zählerstände zu Energy IQ hochzuladen |

## Erfordert
* Node.js 20 oder höher
* ioBroker-Host (js-Controller) Version 7.0.6 oder höher
* iorBroker.admin 7.7.2 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.8.3 (2025-11-13)
* (HGlab01) add capability to set OffSet [TadoX]
* (HGlab01) Implement deboucing also for TadoX
* (HGlab01) fix nextScheduleChange is missing the required property "common.type" [TadoX]

### 0.8.2 (2025-11-07)
* (HGlab01) add retry mechanism when it comes to timeouts
* (HGlab01) add attribute 'isRoomLinkRestricted'
* (HGlab01) finally fix definition missing for 'awayMode' with value 'null' [TadoX]
* (HGlab01) finally fix definition missing for 'holidayMode' with value 'null' [TadoX]
* (HGlab01) bump iobroker-jsonExplorer to 0.2.2
* (HGlab01) bump axios to 1.13.2

### 0.8.1 (2025-11-04)
* (HGlab01) code refactorings
* (HGlab01) fix issue 'definition missing for holidayMode' [TadoX]
* (HGlab01) fix issue 'cannot read properties of undefined (reading 'match')'
* (HGlab01) fix issue openWindow data not up to date #1086

### 0.8.0 (2025-10-07)
* (HGlab01) new configuration capabilities to manage API usage quota (#1047, #1048)
* (HGlab01) Implement API debouncing
* (HGlab01) Refactorings Tado API calls
* (HGlab01) fix issue 'definition missing for awayMode' [TadoX]
* (HGlab01) fix issue 'definition missing for preheating' [TadoX]
* (HGlab01) Additional guidance/log when it comes to RefreshToken issue
* (HGlab01) fix Object of state "tado.0.xxxxx.Rooms.y.openWindow" is missing the required property "common.type" (#1059)
* (HGlab01) Bump axios to 1.12.2
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.0

### 0.7.10 (2025-04-25)
* (HGlab01) further token refresh optimizations

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