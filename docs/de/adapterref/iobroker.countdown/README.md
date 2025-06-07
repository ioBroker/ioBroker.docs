---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: Mshzbk4TQhCKT93kVH8aGuM+N/0LseiLQ95SkaHMHck=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
[![Build-Status Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Einzelheiten und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Countdown-Adapter für ioBroker ------------------------------------------------------------------------------

Ziel des Adapters ist es, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten zu ermöglichen. Jeder dieser Werte wird separat angezeigt, außerdem gibt es zwei Strings mit einer Kurz- und einer Langversion des Datums.

## Wie man es benutzt
[Englische Beschreibung](docs/en/countdown.md) [Deutsche Anleitung](docs/de/countdown.md)

## Hinzuzufügende Funktionen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und es zu starten, wenn der Countdown endet
* Möglichkeit zur Verwendung von Plus und Minus in Addminutes und den anderen Add-Funktionen

## Credits
Dieser Adapter wäre ohne die großartige Arbeit von @jack-blackson (https://github.com/jack-blackson) nicht möglich gewesen, der Versionen dieses Adapters vor V3.x.x erstellt hat.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**0
-->
### 3.0.0 (2025-06-05)
* (mcm1957) Adapter has been migrated to iobroker-community-adapters organisation.
* (mcm1957) Adapter requires node.js 20, js-controller 6.0.11 and admin 7.4.10 now.
* (mcm1957) @iobroker/eslint-config has been added and linter error have been fixed.
* (mcm1957) Dependencies have been updated.

### 2.3.0 (2024-09-20) 
* (jack-blackson) Compatibility for js-controller 7
* (jack-blackson/bagsik) Added new object fullJSON with all objects included - thanks to bagsik who had the idea and created the code!

### 2.2.1 (2024-09-14) 
* (jack-blackson) Additional check to avoid not allowed signs in countdown name
* (jack-blackson) Updated dependencies
* (jack-blackson) Small adjustments in package files

### 2.2.0 (2023-08-25) 
* (jack-blackson) Added ability to maintain, adjust and delete countdowns in adapter settings
* (jack-blackson) Bugfix with incorrect spaces as first character in "in words long" and "in words short"
* (jack-blackson) Bugfix incorrect calculation totalYears
* (bagsik) added "totalJSON" object in each countdown

### 2.1.0 (2023-07-22) 
* (jack-blackson) Ability to use the countdown "backwards" - e.g. for calculating age of a baby
* (jack-blackson) Adjustments for "in words" -> fixed year/years and adjusted which detail level is shown at which point of time

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