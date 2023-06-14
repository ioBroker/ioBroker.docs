---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: Ol2vkPFqs9qkriLlPG0oWXLVC/aQEMmYbyvPCkshdVc=
---
![Logo](../../../en/adapterref/iobroker.worx/admin/worx.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.worx.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.worx.svg)
![Anzahl der Installationen](https://iobroker.live/badges/worx-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/worx-stable.svg)
![NPM](https://nodei.co/npm/iobroker.worx.png?downloads=true)

# IoBroker.worx
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.worx/workflows/Test%20and%20Release/badge.svg)

## Worx-Adapter (Kress, Landxcape und Ferrex) für ioBroker
Steuerung über Cloud und mqtt

Dieser Adapter verbindet ioBroker über die Cloud mit Ihrem Landroid Kress Landxcape oder Ferrex Mäher.
Temperaturen, Mähzeiten, Akkustand und diverse andere Daten werden aus dem Mäher ausgelesen.
Der Adapter kann den Mäher steuern und Sie können Konfigurationsparameter wie Mähzeiten ändern.

Minimale Knotenversion 14.18

activityLog das AKTIVITÄTENProtokoll aus der App areas Die Areas des Mähers-Kalenders Der Mähkalender des Mähers-Module Die verbauten Module des Mähers-Mähers Aufbereite Informationen des Mähers sowie Steuerung des Mähers-Produkts Produktinformationen zum Mäher rawMqtt dieRohaten die via MQTT vom Mäher kommen worx.0.xx.mower .firmware_available -> Verfügbare Firmware worx.0.xx.mower.firmware_available_date -> Datum Update der letzten Firmware worx.0.xx.mower.firmware_available_all -> History der Firmware als JSON Update der Daten 24H worx.0.xx.product - > Informationen von eurem Mäher welche Features, Board und Zubehör er hat.
Update der Daten einmalig nach einem Neustart/Restart worx.0.xx.activityLog.last_update -> Letzte Aktualisierung worx.0.xx.activityLog.payload -> Alle Aktivitäten der letzten 8 Tage als JSON

## Einstellungen
- Um sich mit dem Mäher zu verbinden, geben Sie E-Mail und Passwort von Ihrem Worx-Konto in der Config ein.
- Verzögerung für Kantenschnitt: Wenn der Kantenschnitt in einer Kurve oder Biegung beginnt, kann der Rasenmäher das Kabel verlieren und mit einem Fehler stoppen, oder die Messer drehen sich möglicherweise nicht. Dazu kann der Startpunkt eingestellt werden, an dem sich die Messer zu drehen beginnen.
- Mäher ab eine Zone oder Meterzahl starten lassen:

Setze area.area_0 auf die Meterzahl des gewünschten Startpunktes Setze area.area_1, area.area_2 und area.area_3 jeweils auf 0 Setze area.startSequence auf [0,0,0,0,0,0,0,0,0,0 ]

## Zeitplan setzen:
wochentagname/borderCut wochentagname/startTime wochentagname/workTime

Danach ein Timeout von 1,1 Sek. und worx.0.xxxxxxxxxxx.calendar.calJson_tosend auf true setzen.
In dieser Zeit darf natürlich nicht automatisch ein Update kommen, da die geänderten Zeiten wieder gelöscht werden. Wenn das zu oft vorkommt, dann muss ich leider einen weiteren Datenpunkt hinzufügen der Updates von MQTT oder den 10 Minuten Refresh unterbindet.

Das gleiche gilt natürlich auch für diese: mower.oneTimeWithBorder mower.oneTimeWorkTime

Und dann nach 1,1 Sek. worx.0.xxx.mower.oneTimeStart setzen

## Diskussion und Fragen
<https://forum.iobroker.net/topic/4834/adapter-worx-landroid/>

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Changelog

### 2.1.3

Add ping option in the instance settings",

### 2.1.2

Improve reconnection for multiple mower

### 2.1.1

Change reconnection times

### 2.1.0

Move Calendar setState to one Json and other fixes to prevent blocking because of too many sending requests
Verschieben des Calendar in eine Json und andere Verbesserung, um ein 24h Block zu verhindern, der passiert wenn zu viele Anfragen gesendet werden.

### 2.0.3

Add manual refresh. Fix empty status and firmware format. Reduce info logs.

### 2.0.1

Adapter rewritten. Added product info and activity log. rawMqtt values improved and compatible with Node v18.

### 1.7.0 (2022-09-28)

-   (TA2k) fix login

### 1.6.6 (2022-06-25)

-   (MeisterTR) fix edgecut

### 1.6.5 (2022-06-19)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions also on second place

### 1.6.4 (2022-06-18)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions
-   (Apollon77) fix error cases reported by Sentry

### 1.6.3 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.2 (2022-06-17)

-   (TA2k) fix issues introduced in 1.6.0

### 1.6.1 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.0 (2022-06-16)

-   (Apollon77) fix some error cases reported by Sentry

### 1.5.5 (2021-09-29)

-   (MeisterTR) fix error

### 1.5.0 (2021-09-26)

-   (MeisterTR) many fixes
-   (MeisterTR) add torque control
-   (MeisterTR) fixed States

### 1.4.3 (2021-07-25)

-   (MeisterTR) fix Partymode detection

### 1.4.2 (2021-07-24)

(MeisterTR) fix bug with OLMSwitch_Cutting
(MeisterTR) fix bug with PartyMode
(TA2k) fix error with wrong serialnumber (please delete all objects manually)
(MeisterTR) fix bug in autolock function

### 1.4.1 (2021-07-06)

-   (MeisterTR) fix bug in sendCommand (please remove state manually)

### 1.4.0 (2021-07-05)

-   update testing
-   add gps coordinates
-   add new status states
-   add new Autolock states
-   add new OffLinits states

### 1.3.7 (03.06.2021)

-   (TA2k) type fixes

### 1.3.6 (27.05.2021)

-   (MeisterTR) bugfixes
-   (MeisterTR) better errorhandling

### 1.2.9 (02.12.2020)

-   (MeisterTR) add sentry
-   (MeisterTR) Bugfix (error type of sc... again) (IOBROKER-WORX-3)

### 1.2.4 (15.11.2020)

-   (MeisterTR) Bugfix (error type of sc...)
-   (MeisterTR) change Testing to git

### 1.2.3 (29.08.2020)

-   (MeisterTR) add option to crate a Json Obj to set mowtime with scripts
-   (MeisterTR) add option to disable weather
-   (MeisterTR) add double Shedule, oneTimeShedule, PartyMode
-   (MeisterTR) fix setIntervall => setTimeout
-   (MeisterTR) fix error with Meter and Min. in Config
-   (MeisterTR) add Kress and Landxcape

### 1.0.0 (03.12.2019)

-   (MeisterTR) bump Version
-   (MeisterTR) transfer to community

### 0.4.0 (03.08.2019)

-   (MeisterTR) fix multimower
-   (MeisterTR) change loglevel
-   (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)

-   (MeisterTR) add delay for edgecut in config
-   (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)

-   (MeisterTR) add border
-   (MeisterTR) fix small errors
-   (MeisterTR) code cleanup

### 0.0.1

-   (MeisterTR) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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