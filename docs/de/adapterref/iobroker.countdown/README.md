---
chapters: {"pages":{"en/adapterref/iobroker.countdown/README.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/README.md"},"en/adapterref/iobroker.countdown/docs/en/countdown.md":{"title":{"en":"ioBroker.countdown"},"content":"en/adapterref/iobroker.countdown/docs/en/countdown.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.countdown/README.md
title: ioBroker.countdown
hash: mixwTZB0DWtO4unou3v/Ea2riVej8uFSe40Y/9eaouI=
---
![Logo](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Greenkeeper-Abzeichen](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Anzahl der Installationen](http://iobroker.live/badges/countdown-stable.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)
![NPM](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# ioBroker.countdown

[![Baustatus Travis](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown)

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## Countdown-Adapter für ioBroker

Ziel des Adapters ist es, Ihnen die Möglichkeit zu geben, Countdowns für zukünftige Ereignisse mit Jahren, Monaten, Tagen, Stunden und Minuten zu erstellen. Er liefert Ihnen jeden dieser Werte separat sowie zwei Zeichenketten mit einer kurzen und einer langen Version des Datums.

## Wie man es benutzt

[Englische Beschreibung](/#/docs/adapterref/iobroker.countdown/docs/en/countdown.md) [Deutsche Anleitung](https://github.com/iobroker-community-adapters/ioBroker.countdown/blob/master/docs/de/countdown.md)

## Hinzufügen von Funktionen

- Möglichkeit, ein Skript als Parameter hinzuzufügen und es nach Ablauf des Countdowns zu starten.
- Möglichkeit, Plus und Minus in addminutes und den anderen Additionsfunktionen zu verwenden

## Credits

Dieser Adapter wäre ohne die großartige Arbeit von @jack-blackson ( <https://github.com/jack-blackson> )", der Vorversionen dieses Adapters vor V3.xx erstellt hat, nicht möglich gewesen.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**0
-->
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 3.1.0 (2026-02-23)
- (R3dRuM) Added option to sort countdowns by date in HTML and JSON output

### 3.0.1 (2026-02-23)
- (copilot) Adapter requires admin >= 7.7.22 now

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.countdown/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2025-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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