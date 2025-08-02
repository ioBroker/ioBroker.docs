---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: me8TkQFULVxyMbpJjYpqSYrGcAilUysqCKL2D1+NPxg=
---
![Logo](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Anzahl der Installationen](http://iobroker.live/badges/meteoalarm-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Meteoalarm-Adapter für ioBroker ------------------------------------------------------------------------------ Dieser Adapter ruft Wetteralarme von https://meteoalarm.org ab, die Wind, Schnee, Regen, Höchst- und Tiefsttemperaturen usw. umfassen. Diese Informationen sind in der Landessprache und für detaillierte Regionen verfügbar.

HAFTUNGSAUSSCHLUSS: Es sind Zeitverzögerungen zwischen dieser Website und der Website www.meteoalarm.org möglich. Die aktuellsten Informationen zu den von den teilnehmenden nationalen Wetterdiensten veröffentlichten Warnstufen finden Sie unter https://www.meteoalarm.org.

Der Entwickler kann nicht garantieren, dass die Warnungen rechtzeitig behandelt werden oder dass es Fehler und Probleme gibt, die dazu führen, dass Warnungen überhaupt nicht behandelt werden!

## Wie man es benutzt
Wählen Sie Ihr Land und anschließend die Region, für die Sie Warnungen wünschen. Wenn Sie sich nicht sicher sind, wie Ihre Region heißt, besuchen Sie https://meteoalarm.org und versuchen Sie, sie auf der Karte zu finden.

[Englische Beschreibung](docs/en/meteoalarm.md)

[Deutsche Anleitung](docs/de/meteoalarm.md)

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @jack-blackson (https://github.com/jack-blackson) nicht möglich gewesen, der Versionen dieses Adapters vor V4.x.x erstellt hat.

Glocke im Symbol, entworfen von Freepik von www.flaticon.com

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 4.0.0 (2025-06-06)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation.
* (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) @iobroker/eslint-config has been added and linter error have been fixed.
* (mcm1957) Dependencies have been updated.

### 3.0.3 (2024-08-11)
* (jack-blackson) Updated repositories
* (jack-blackson) Small adjustments in package settings

### 3.0.2 (2024-02-24)
* (jack-blackson) Bugfix for notification text - missing space
* (jack-blackson) Bugfix for notification text - fix to just show "warning level in words" in the notification if it is ticked in the setup

### 3.0.1 (2024-02-29)
* (jack-blackson) Bugfix for location names
* (jack-blackson) Removed necessity to choose country, this is now automatically detected

### 3.0.0 (2024-02-26)
* (jack-blackson) Breaking change: switch to locations instead of choosing geocodes to be able to also handle warnings coming with polygons (e.g. Switzerland)

## License
The MIT License (MIT)

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2019-2024 jack-blackson <blacksonj7@gmail.com>

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