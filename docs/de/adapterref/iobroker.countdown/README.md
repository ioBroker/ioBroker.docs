---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: CeHtNWb87z7pisv1sXaJ8M+fV9QSQdwh5eV+eTzC/hY=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.countdown
[![Build-Status Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Countdown-Adapter für ioBroker ------------------------------- --------------------------------

Das Ziel des Adapters besteht darin, Ihnen die Möglichkeit zu bieten, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten durchzuführen. Sie erhalten jeden dieser Werte separat sowie zwei Zeichenfolgen mit einer kurzen und einer langen Version des Datums.

## Wie man es benutzt
[Englische Beschreibung](docs/en/countdown.md) [Deutsche Anleitung](docs/de/countdown.md)

## Funktionen zum Hinzufügen
* Möglichkeit, ein Skript als Parameter hinzuzufügen und es zu starten, wenn der Countdown endet
* Möglichkeit, Plus und Minus in Addminuten und den anderen Additionsfunktionen zu verwenden

## Changelog

### 2.1.0 (2023-07-XX) 
* (jack-blackson) Ability to use the countdown "backwards" - e.g. for calculating age of a baby
* (jack-blackson) Adjustments for "in words" -> fixed year/years and adjusted which detail level is shown at which point of time

### 2.0.2 (2023-07-16) 
* (jack-blackson) Bugfix month calculation

### 2.0.1 (2023-05-24) 
* (jack-blackson) Added objects for total number of months and years

### 2.0.0 (2023-05-07) 
* (jack-blackson) Reworked adapter due to wrong process layout
* (jack-blackson) Added headers for HTML and JSON

### 1.3.1 (2023-05-01) 
* (jack-blackson) Bugfix date calculation (thanks to Lueghi for the hint)

### 1.3.0 (2023-02-22) 
* (jack-blackson) Updates for dependencies

### 1.2.5 (2021-06-16) 
* (jack-blackson) Bugfix to delete countdown with sendto

### 1.2.4 (2021-06-09) 
* (jack-blackson) Small bugfixes, translations

### 1.2.3 (2021-05-27) 
* (jack-blackson) Small bugfixes, translations

### 1.2.2 (2021-05-25) 
* (jack-blackson) Small bugfixes, added weblate for translations

### 1.2.1 (2021-05-09) 
* (jack-blackson) Small Bugfixes

### 1.2.0 (2021-05-09) 
* (jack-blackson) Updated packages, added Sentry
* (jack-blackson) Fixes for JS-controller 3.3
* (jack-blackson) Fix that countdowns are created immediatly


### 1.1.0 (2020-04-02) 
* (jack-blackson) bugfix Read-Me link
* (jack-blackson) bugfix repeatCycle

### 1.0.9 (2020-03-31)
* (jack-blackson) Bugfix log messages

### 1.0.8 (2020-03-31)
* (jack-blackson) Repeat countdown in defined period (e.g. every year)

### 1.0.7 (2020-03-30)
* (jack-blackson) Added new date-type for settings: YYYY-MM-DD
* (jack-blackson) Add countdown directly in adapter settings

### 1.0.6 (2020-03-20)
* (DutchmanNL) Fixed adapter type

### 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix for alarm at midnight -> thanks to @Lueghi

### 1.0.4 (2019-08-25)
* (jack-blackson) Reordered release infos

### 1.0.3 (2019-08-10)
* (jack-blackson) Changes for Compact Mode
* (jack-blackson) Various bugfixes
* (jack-blackson) Having multiple instances of the adapater are now possible

### 1.0.2 (2019-07-22)
* (jack-blackson) Release version

### 0.7.0 (2019-07-07)
* (jack-blackson) Bugfixes
* (jack-blackson) addminutes and addhours are now also possible
* (jack-blackson) datapoint in setup is now editable
* (jack-blackson) added total no. of weeks

### 0.6.0 (2019-07-06)
* (jack-blackson) adjustable date format for input and output
* (jack-blackson) delete countdowns with sendto
* (jack-blackson) ability to add countdowns by "days/months/weeks from now)

### 0.5.0 (2019-07-04)
* (jack-blackson) adjust the data in the table
* (jack-blackson) bugfix date import 

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

## License
The MIT License (MIT)

Copyright (c) 2019-2023 jack-blackson <blacksonj7@gmail.com>

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