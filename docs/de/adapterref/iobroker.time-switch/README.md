---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.time-switch/README.md
title: ioBroker.time-switch
hash: sr/D7Fs0JlS8GzfCFSY4TuC8LkeTtLXtbox25LIjREY=
---
![Logo](../../../en/adapterref/iobroker.time-switch/admin/time-switch.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.time-switch.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.time-switch.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/walli545/iobroker.time-switch.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/walli545/ioBroker.time-switch/badge.svg)
![Travis-CI](http://img.shields.io/travis/walli545/ioBroker.time-switch/master.svg)
![Codecov](https://codecov.io/gh/walli545/ioBroker.time-switch/branch/master/graph/badge.svg)
![NPM](https://nodei.co/npm/iobroker.time-switch.png?downloads=true)

# ioBroker.time-switch

[![Installationen](https://camo.githubusercontent.com/5d62363be94ae20ae8302ef5dc2f3c533268742d/687474703a2f2f696f62726f6b65722e6c6976652f6261646765732f74696d652d7377697463682d696e7374616c6c65642e737667)]()

## Zeitschalteradapter für ioBroker

Dieser Adapter ermöglicht es dem Benutzer, Geräte mithilfe von Zeitplänen ein- und auszuschalten. Die Zeitpläne lassen sich vollständig über ein Vis-Widget konfigurieren. Ein Zeitplan schaltet einen oder mehrere ioBroker-Zustände und besteht aus einem oder mehreren Triggern, die festlegen, wann und wie der Zustand umgeschaltet werden soll. Es ist möglich, die Uhrzeit und die Wochentage für die Auslösung des Triggers zu konfigurieren. Auch Astro-Trigger können erstellt werden. Zudem lassen sich benutzerdefinierte Ein-/Ausschaltwerte festlegen. Im Widget kann der Zeitplan vorübergehend deaktiviert und der geschaltete Zustand manuell gesteuert werden.

![Vorschau](../../../en/adapterref/iobroker.time-switch/widgets/time-switch/img/prev/prev-device-schedule.jpg)

## Aufstellen

Die Installationsanleitung finden Sie im [Wiki](https://github.com/walli545/ioBroker.time-switch/wiki) (auch auf Deutsch verfügbar).

## Mögliche Funktionen in der Zukunft

- Countdown-Trigger
- Umschalten beliebiger Werte

## Changelog
### 2.2.2
* (walli545)
  * (Fix) Astro triggers not executing after time change (#133)
  * (Fix) Set common.dataSource and common.connectionType in io-package.json (#135)


### 2.2.1
* (walli545)
    * (Fix) Set js-controller dependency to >= 2.0.0

### 2.2.0
* (walli545)
    * (New) Conditional triggers that only execute when a certain condition is met (#31)
    * (New) Option to hide edit name button in widget (#119)
    * (Fix) Astro triggers not executing on days after initial creation (#123)
    * (Fix) Improved error handling (#61)

### 2.1.0
* (walli545)
    * Added astro triggers which can trigger on sunrise, noon, sunset with +- 120 min offset (#30)
    * Added custom styling via css custom properties
    * Fixed a bug which lead to undefined button behaviour when the widget is used together with material design theme by Uhula (#62)
    * Changed state listening to be a be ack based and removed unused on object change listener (#6)

### 2.0.0
**Attention**: Due to breaking changes in the schedule data structure, schedules created with versions 1.x are not compatible with 2.x.

*Before upgrading, remove all schedules in the instance settings and remove widgets in vis.*
* (walli545)
    * Value type can now be configured, this enables switching of real booleans and numbers (#19)
    * Added a new state for each schedule to disable/enable automatic switching (#24)
    * Added option to hide current value switch in widget (#23)
    * Switching of multiple states with one schedule. This allows the creation of groups for devices of the same type
    * Added translations to widget (#35)
    * Fixed widget not working on Safari and fully browser

### 1.1.0
* (walli545) 
    * New option to hide switched oid in widget (#20)
    * Fixed admin page not working on Firefox (#18)
    * Showing full schedule oid in admin page (e.g. time-switch.0.schedule0 instead of schedule0).

### 1.0.0
* (walli545) initial release, features:
    * Admin settings to create schedules
    * vis widget to edit schedules and add actions

## License
MIT License

Copyright (c) 2019-2021 walli545 <walli5446@gmail.com>

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