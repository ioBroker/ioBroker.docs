---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: FDeUA8Sz2ytPQVx+0HI4Ezf0Q0WHIYrxRFwe8K/Jr4A=
---
# ioBroker.tado

![Anzahl der Installationen](http://iobroker.live/badges/tado-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.tado.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tado.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![Abhängigkeitsstatus](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)
![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

## tado-Adapter für ioBroker

Tado° ( <https://www.tado.com> ) ist Ihr Experte für intelligentes Heizen und Energiemanagement für Ihr Zuhause – entwickelt und hergestellt in Deutschland. Sparen Sie mit uns dauerhaft Energie und Kosten – für ein behagliches und nachhaltiges Zuhause.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## WICHTIG! Tado° hat API-Aufruflimits eingeführt.

Tado hat eine Begrenzung für API-Aufrufe eingeführt. Nutzer ohne Auto-Assist-Abonnement sind auf 100 Aufrufe pro Tag beschränkt.\
&#x20;Weitere Informationen finden Sie in [diesem](https://support.tado.com/en/articles/12165739-limitation-for-rest-api-usage) Artikel.\
&#x20;Der Tado ioBroker-Adapter wurde um eine neue Funktion erweitert, die erweiterte Konfigurationsmöglichkeiten zur Verwaltung der API-Nutzung bietet. Aufgrund des täglichen Limits von 100 Aufrufen ist der Adapter jedoch ohne ein Auto-Assist-Abonnement nicht nutzbar. Dies entspricht lediglich etwa vier Anfragen pro Stunde, was die Funktionalität des Adapters erheblich einschränkt.\
&#x20;Wenn Sie mit Tados Entscheidung nicht einverstanden sind, sollten Sie ihnen [das mitteilen](https://support.tado.com/de/articles/3590239-wie-kann-ich-den-kundensupport-von-tado-kontaktieren) !

## Tado° X

Grundlegende Unterstützung für Tado° X ist verfügbar. Sollte Ihre Konfiguration nicht funktionieren, erstellen Sie bitte ein [Ticket](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01\&labels=enhancement\&projects=\&template=Enhancement.md\&title=) . Sie müssen einige Debugging-Sitzungen unterstützen und mit dem Adapterentwickler zusammenarbeiten, um die Funktionen von Tado° X zu verbessern.

## Lenkbare Funktionen bei Tado° V3+, V3, V2

| Zustand                                                                       | Beschreibung                                                                                                                             |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.power                                  | Gerät ein-/ausschalten                                                                                                                   |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.temperature.celsius                    | Temperatur definieren                                                                                                                    |
| tado.\[x].\[yyyyyy].Rooms.\[z].overlayClearZone                               | In den Automatikmodus wechseln                                                                                                           |
| tado.\[x].\[yyyyyy].Rooms.\[z].overlay.termination.typeSkillBasedApp          | Zeitplanmodus einstellen                                                                                                                 |
| tado.\[x].\[yyyyyy].Rooms.\[z].overlay.termination.durationInSeconds          | Legen Sie fest, wie lange der Zeitplanmodus gelten soll.                                                                                 |
| tado.\[x].\[yyyyyy].Rooms.\[z].devices.\[RUaaaaaaaaaa].offset.offsetCelsius   | Temperaturabweichung                                                                                                                     |
| tado.\[x].\[yyyyyy].Rooms.\[z].devices.\[RUaaaaaaaaaa].childLockEnabled       | Kindersicherung ein/aus                                                                                                                  |
| tado.\[x].\[yyyyyy].Rooms.\[z].timeTables.tt\_id                              | Aktiven Zeitplan auswählen                                                                                                               |
| tado.\[x].\[yyyyyy].Rooms.\[z].openWindowDetection.openWindowDetectionEnabled | Fensteröffnungserkennung am Thermostat aktivieren/deaktivieren                                                                           |
| tado.\[x].\[yyyyyy].Rooms.\[z].openWindowDetection.timeoutInSeconds           | Timeout-Wert: Wie lange bleiben Thermostate ausgeschaltet, wenn ein offenes Fenster erkannt wird?                                        |
| tado.\[x].\[yyyyyy].Rooms.\[z].activateOpenWindow                             | Schaltet die Thermostate aus, wenn ein offenes Fenster erkannt wird (funktioniert nur, wenn der Thermostat ein offenes Fenster erkennt). |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.mode                                   | AC-Modus (nur AC-Geräte)                                                                                                                 |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.fanspeed                               | Lüftergeschwindigkeit (nur AC-Geräte mit V3 und älteren Versionen)                                                                       |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.fanLebel                               | Fanlebel (nur AC-Geräte ab Version V3)                                                                                                   |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.verticalSwing                          | Vertikale Schwenkfunktion (nur AC-Geräte ab Version V3)                                                                                  |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.horizontalSwing                        | Horizontale Schwenkfunktion (nur Wechselstromgeräte mit V3 und älteren Versionen)                                                        |
| tado.\[x].\[yyyyyy].Home.state.presence                                       | Stellen Sie den Modus „Zuhause“, „Abwesend“ oder „Auto“ ein.                                                                             |
| tado.\[x].\[yyyyyy].Home.masterswitch                                         | Alle Geräte ein-/ausschalten                                                                                                             |
| tado.\[x].\[yyyyyy].meterReadings                                             | Ein JSON-Objekt mit {"date":"YYYY-MM-DD","reading": 1234} kann verwendet werden, um Zählerstände in Energy IQ hochzuladen.               |

## Dinge, die man auf dem Tado° X steuern kann

| Zustand                                                                        | Beschreibung                                                                                                               |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.power                                   | Gerät ein-/ausschalten                                                                                                     |
| tado.\[x].\[yyyyyy].Rooms.\[z].setting.temperature.value                       | Temperatur definieren                                                                                                      |
| tado.\[x].\[yyyyyy].Rooms.\[z].manualControlTermination.controlType            | Zeitplanmodus einstellen                                                                                                   |
| tado.\[x].\[yyyyyy].Rooms.\[z].manualControlTermination.remainingTimeInSeconds | Dauer des Timer-Modus                                                                                                      |
| tado.\[x].\[yyyyyy].Rooms.\[z].resumeScheduleRoom                              | Für diesen Raum wieder in den Automatikmodus wechseln.                                                                     |
| tado.\[x].\[yyyyyy].Rooms.\[z].devices.\[VAaaaaaaaaaa].temperatureOffset       | Geräte-Offset ändern                                                                                                       |
| tado.\[x].\[yyyyyy].Rooms.resumeScheduleHome                                   | Zurück zum Automatikmodus für alle Räume                                                                                   |
| tado.\[x].\[yyyyyy].Rooms.allOff                                               | Alle Räume ausschalten                                                                                                     |
| tado.\[x].\[yyyyyy].Rooms.boost                                                | Schalte alle Räume in den Boost-Modus                                                                                      |
| tado.\[x].\[yyyyyy].Home.state.presence                                        | Stellen Sie den Modus „Zuhause“, „Abwesend“ oder „Auto“ ein.                                                               |
| tado.\[x].\[yyyyyy].meterReadings                                              | Ein JSON-Objekt mit {"date":"YYYY-MM-DD","reading": 1234} kann verwendet werden, um Zählerstände in Energy IQ hochzuladen. |

## Erfordert

- Node.js 22 oder höher
- ioBroker-Host (JS-Controller) Version 7.0.6 oder höher
- iorBroker.admin 7.7.2 oder höher

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 0.8.5 (2026-06-19)
* (HGlab01) improve code quality
* (HGlab01) add attribute adminUserId
* (HGlab01) use automated translation into several languages
* (HGlab01) bump axios to 1.8.0

### 0.8.4 (2026-02-24)
* (HGlab01) checkExpire for termination-attributes
* (HGlab01) add attributes 'smartReminders' & 'smartRemindersInAppEnabled'
* (HGlab01) fix #1107 masterswitch turning OFF does not work any longer
* (HGlab01) fix #1117 Request failed with status code 400 with response "Unsupported content type"
* (HGlab01) bump axios to 1.13.5

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

[Older changelogs can be found there](https://github.com/DrozmotiX/ioBroker.tado/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2020-2026 HGlab01 <myiobrokeradapters@gmail.com>

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