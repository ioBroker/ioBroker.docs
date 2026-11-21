---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.corrently/README.md
title: ioBroker.currently
hash: h35TtgBmMnxiQNQuCE4ML+8Em7mKQjFwzak/WZQGtu4=
---
![Logo](../../../en/adapterref/iobroker.corrently/admin/corrently.png)

![Anzahl der Installationen](https://iobroker.live/badges/corrently-installed.svg)
![Stabile Version](https://iobroker.live/badges/corrently-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.corrently.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.corrently.svg)
![NPM](https://nodei.co/npm/iobroker.corrently.png?downloads=true)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.corrently/workflows/Test%20and%20Release/badge.svg)

# ioBroker.currently

## Aktueller Adapter für ioBroker

Lesen Sie den Green Energy Index unter [https://www.corrently.de/gsi/PLZ](https://www.corrently.de/gsi/80999) . Folgende Daten werden bereitgestellt:

- `data.json` - JSON-Tabelle für die nächsten 36 Stunden mit grünem Index
- `data.start` - Startzeitpunkt der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
- `data.duration` - Dauer der nächsten oder aktuellen Periode mit grüner Energie 0 - 24
- `data.green` - ist es jetzt grüne Energie oder nicht?
- `data.price` - grüner Preis für den aktuellen Moment

## Konfiguration

Der Adapter wird stündlich ausgeführt (kann beispielsweise als Zeitplan festgelegt werden) und der Benutzer muss den Beitragsindex in der Konfiguration eingeben.

<!--
    ### **WORK IN PROGRESS**
-->

## Changelog
### 0.1.2 (2026-10-14)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (@GermanBluefox) Adapter requires node.js >= 22 and admin >= 7.6.17 now
- (@GermanBluefox) Updated packages, migrated to ESLint 9 and removed the outdated admin files
- (@GermanBluefox) The tests run on Windows and macOS too

### 0.1.1 (2023-03-12)
* (Maverick78de) URL was corrected
* (bluefox) Randomize the minutes of the schedule
* (bluefox) Implemented solar chart for the next 5 days

### 0.0.2
* (bluefox) CRON schedule was changed to "1 * * * *"

### 0.0.1
* (bluefox) initial release

## License
MIT License

Copyright (c) 2019-2026 bluefox

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