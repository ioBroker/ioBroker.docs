---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.trashschedule?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.trashschedule?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.trashschedule?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.trashschedule?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.trashschedule?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.trashschedule?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.trashschedule/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.trashschedule.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/trashschedule-stable.svg
BADGE-Installed: http://iobroker.live/badges/trashschedule-installed.svg
chapters: {"pages":{"de/adapterref/iobroker.trashschedule/README.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/README.md"},"de/adapterref/iobroker.trashschedule/providers.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/providers.md"},"de/adapterref/iobroker.trashschedule/blockly.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/blockly.md"},"de/adapterref/iobroker.trashschedule/faq.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/faq.md"},"de/adapterref/iobroker.trashschedule/javascript.md":{"title":{"de":"ioBroker.trashschedule"},"content":"de/adapterref/iobroker.trashschedule/javascript.md"}}}
---
![Logo](../../admin/trashschedule.png)

# ioBroker.trashschedule

## Inhaltsverzeichnis

- [Anbieter](providers.md)
- [Blockly](blockly.md)
- [JavaScript](javascript.md)
- [FAQ](faq.md)

## Anforderungen

1. nodejs 18.0 (oder neuer)
2. js-controller 5.0.0 (oder neuer)
3. Admin Adapter 6.0.0 (oder neuer)
4. iCal Adapter 1.12.1 (oder neuer) - *optional*

## Konfiguration

1. Erstelle eine ```trashschedule``` Instanz und wähle die ical-Instanz aus, welche den Müllkalender enthält. Alternativ können Anbieter direkt ausgewählt werden, welche über verschiedene Online-Dienste integriert werden.
2. Wechsle in das Tab "Abfalltypen" und füge so viele Zeilen ein, wie Du Abfalltypen hast
3. Vergib einen Namen für jeden Abfalltyp und lege fest, welche Termine im Kalender für diesen Typ relevant sind
4. Starte die Instanz

**Fragen?** Schaue in die [FAQ](./faq.md)

![Trashschedule](./img/trashschedule.png)

![Trashschedule Types](./img/trashschedule_types.png)

## Voraussetzungen für iCal

1. Erstelle eine neue Instanz des [ical Adapters](https://github.com/iobroker-community-adapters/ioBroker.ical)
2. Konfiguriere die URL zu deinem Müllkalender (zum Beispiel ein Google Kalender)
3. Setze die "Tagesvorschau" auf einen Wert, welcher möglichst jeden Abfalltyp mindestens zweimal enthält (z.B. 45 Tage)
4. Falls Du die "Ereignisse" verwendest, stelle sicher, dass bei jedem Ereignis "anzeigen" ausgewählt wurde, welches für den Müllkalender ebenfalls relevant ist (andernfalls werden die Termine vom iCal Adapter ausgeblendet)

![iCal](./img/ical.png)

## Abfall-Handling - Funktionsweise

- In den Instanzeinstellungen wird mit 'daysuntilaction' eine Vorlaufzeit eingestellt, wieviele Tage im Voraus über die bevorstehende Abholung informiert wird. Annahme: Der Standard dürfte bei vielen 1 Tag, also der Abend vor der Abholung sein.
- Wird diese Vorlaufzeit erreicht, wird der State `actionNeeded` auf `true` gesetzt.
- Wurde der Abfallbehälter an die Straße gestellt, wird dies über den State `completed` bestätigt. Daraufhin wird `actionNeeded` auf `false` gesetzt.
- Um mehrere gleichzeitig auf completed zu setzen gibt es folgende zusätzliche States:
    - `completedToday`= setzt alle Behälter, die heute fällig sind, auf completed
    - `completedTomorrow` = setzt alle Behälter, die morgen fällig sind, auf completed (einschließlich heute)
    - `completedAll` = setzt alle Behälter auf completed, die aktuell anstehen

ttd:
- Übersetzung der Texte
- '???' durch einen sinnvollen Text ersetzen

## VIS Widget (VIS version 1.x)

![VIS widget](./img/vis.png)

**VIS 2.x wird mit diesem Widget nicht unterstützt!**

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.3.0 (2024-04-28)

NodeJS >= 18.x and js-controller >= 5 is required

* (klein0r) Improved error reporting / log messages
* (klein0r) Fixed translations
* (klein0r) Added Abfall+ as Webservice

### 3.2.0 (2024-01-22)

* (klein0r) Added more providers

### 3.1.3 (2023-12-24)

* (klein0r) fixed configuration validation
* (klein0r) enhanced error logging
* (klein0r) some cities have no streets (API)

### 3.1.2 (2023-12-22)

* (klein0r) Fixed exception when cache dir doesn't exist

### 3.1.1 (2023-12-22)

* (klein0r) Fixed config validation / integration test

## License

MIT License

Copyright (c) 2024 Matthias Kleine <info@haus-automatisierung.com>

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