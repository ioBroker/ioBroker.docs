---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fhem/README.md
title: ioBroker.fhem
hash: igYtZ/NfgmW0L1x8SIbwzI2ozrPkyAjQXaQBcR7yeN0=
---
![Logo](../../../en/adapterref/iobroker.fhem/admin/fhem.png)

![Anzahl der Installationen](http://iobroker.live/badges/fhem-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.fhem.svg)
![Test und Freigabe](https://github.com/iobroker-community-adapters/ioBroker.fhem/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/fhem/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.fhem.svg)

# ioBroker.fhem

Dieser Adapter ermöglicht die Verbindung von FHEM mit ioBroker.

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Um die Verbindung herzustellen, muss Telnet in FHEM aktiviert sein. Um es zu aktivieren (standardmäßig aktiviert), überprüfen Sie die folgenden Einstellungen in`fhem.cfg` :

`define telnetPort telnet 7072 global`

Für die Einstellungen des Adapters müssen exakt derselbe Port und dieselbe IP-Adresse wie auf dem FHEM-Host (oder localhost, falls FHEM und ioBroker auf demselben PC laufen) verwendet werden.

ioBroker sendet zu Beginn`jsonlist2` Befehl zum Abrufen aller`Readings` aus der Liste.

## Unterstützte Geräte

Normalerweise werden alle Geräte unterstützt. Einige sind jedoch besser integriert.

Die Probleme treten insbesondere bei der Zustandssteuerung auf. Da keine klare Attributstruktur existiert, versucht ioBroker zu erraten, welche Attributstruktur definiert ist.`PossibleSets` Es können Felder verwendet werden. Tatsächlich werden nur die folgenden Attribute unterstützt:

- RGB: Wenn RGB existiert in`PossibleSets` und in`Readings` Es wird zu einem einzigen Zustand zusammengefasst, der gelesen und geschrieben werden kann. Werte wie`#234567` wird automatisch umgewandelt in`234567` Die
- Ein-/Aus-Zustand: Wenn`on` Und`off` existieren in`PossibleSets` Und`state` In`Readings` Es wird in einem Bundesstaat unter dem Namen zusammengeführt.`state` Es kann mit „true“ und „false“ gesteuert werden, und die Befehle werden entsprechend geändert.`set DEVICE on` Und`set DEVICE off` Die

## Funktionen und Nutzung

- Wenn der Raum "ioBroker" in FHEM existiert, werden nur diese Objekte synchronisiert.
- Nach der Synchronisierung werden nicht verwendete FHEM-Objekte automatisch gelöscht.
- Interna wie`TYPE` ,`NAME` ,`PORT` ,`manufacturername` ,`modelid` ,`swversion` wird synchronisiert (`role=value.xxx` )
- Attribute wie`room` ,`alias` ,`disable` ,`comment` wird synchronisiert, und es ist möglich, Attribute in ioBroker zu bearbeiten.`role=state.xxx` )
- Rolle und andere Einstellungen während der Synchronisierung festlegen.
  - `Readings xxx` mit jedem`PossibleSets` wird festgelegt`role=state.xxx`
  - `Readings xxx` ohne PossibleSets wird gesetzt`role=value.xxx`
  - `Readings xxx` mit PossibleSets wird "noArg" gesetzt`role=button.xxx`
  - `Readings xxx` Mit PossibleSets wird der "Slider" eingestellt`role=level.xxx, min=slider(min), max=slider(max)`
  - `Readings "desired-temp"` wird festgelegt`role=level.temperature, min=5, max=35, unit=°C` Die
  - `Readings "pct, brightness,dim"` wird festgelegt`role=level.dimmer, min=0, max=100, unit=%`
  - `Readings "Volume, volume, GroupVolume"` wird festgelegt`role=level.volume, min=0, max=100, unit=%`
  - `Readings "GroupVolume"` wird festgelegt`role=level.volume.group` ,`min=0` ,`max=100` ,`unit=%`
- `SmartName` Der Cloud-Adapter wird automatisch mit einem Alias oder Namen (nur`fhem.0` und Objekte mit`role = level.temperature, level.dim, level.volume` )

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (@copilot) Adapter requires js-controller 6.0.11 now
- (mcm1957) Dependencies have been updated

### 3.0.0 (2024-07-22)
NodeJS >= 18.x and js-controller >= 5 is required

* (@LausiD) Removed warning from log
* (@klein0r) Updated tests and dependencies

### 2.0.5 (2023-08-13)
* (mcm1957) Dependencies have been updated
* (mcm1957) Adapter now requires node 16

### 2.0.4 (2023-08-13)
* (LausiD) Several problems have been fixed (#213, #214)

### 2.0.3 (2023-01-03)
* (Apollon77/LausiD) Made sure that all objects are initialized correctly

### 2.0.2 (2022-12-23)
* (bluefox) Corrected error with `members`

### 2.0.0 (2022-12-22)
* (bluefox) Refactoring
* (bluefox) Corrected some GitHub issues
* (bluefox) Added JSON config

### 1.6.3 (2021-07-26)
* (Apollon77) fix crash case

### 1.6.2 (2021-07-16)
* (LausiD) fix crash case

### 1.6.1 (2021-06-30)
* (LausiD) fix use Controller 3.3.x
* (Apollon77) js-controller 3.3 optimizations
* (Apollon77) Add Sentry crash reporting

### 1.6.0 (2021-04-09)
* (LausiD) Several fixes and changes

### 1.5.3 (2020-06-30)
* (LausiD) Several fixes

### 1.5.2 (2020-05-15)
* (Apollon77) Fix wrong method calls

### 1.5.0 (2020-05-08)
* (LausiD) Several fixes and changes

### 1.4.3 (2020-03-21)
* (LausiD) fix compact mode

### 1.4.2 (2020-01-10)
* (bluefox) Running timers will be stopped by unload

### 1.4.1 (2019-12-12)
* (LausiD) Several fixes and changes

### 1.4.0 (2019-10-22)
* (LausiD) Optimized adapter

### 1.3.0 (2019-07-14)
* (bluefox) Compact mode was added

### 1.2.2 (2019-06-12)
* (LausiD) Several fixes and changes

### 1.2.1 (2019-03-28)
* (LausiD) Several fixes and changes

### 1.2.0 (2019-02-16)
* (LausiD) Sync readingsGroup, set states ioBroker from FHEM, add different sensors

### 1.1.1 (2018-11-08)
* (LausiD) add debug mode

### 1.1.0 (2018-10-22)
* (LausiD) Sync objects from ioBroker to FHEM is possible

### 1.0.0 (2018-10-15)
* (LausiD) Min/max were defined as number

### 0.5.6 (2018-09-09)
* (LausiD) Some roles were updated

### 0.5.5 (2018-08-22)
* (LausiD) Several fixes and changes
* (bluefox) Admin3

### 0.5.0 (2018-04-29)
* (LausiD) Several fixes and changes

### 0.4.2 (2018-04-15)
* (TonyBostonTB) Fix wordings

### 0.4.1 (2017-04-14)
* (bluefox) add link to FHEM im admin

### 0.4.0 (2017-03-12)
* (LausiD) fix some types
* (bluefox) define custom prompt

### 0.3.0 (2017-02-25)
 * (LausiD) fix some types
 * (bluefox) add password for telnet

### 0.2.2 (2016-06-17)
* (bluefox) implement On/Off state and fix RGB
* (bluefox) add debug output by control

### 0.2.1 (2016-06-12)
* (bluefox) support of RGB values for control

### 0.2.0
* (bluefox) implemented write
* (bluefox) try to read meta information if unknown event received

### 0.1.0
* (bluefox) initial release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.fhem/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2025 bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.