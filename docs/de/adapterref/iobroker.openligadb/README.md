---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.openligadb/README.md
title: ioBroker-Adapter zum Abrufen von Fußballspielergebnissen von OpenLigaDB
hash: EZx/SsTinYwHSuwQuPIFAI4xr49Fm2PzqxO+VrAjd/M=
---
![Logo](../../../en/adapterref/iobroker.openligadb/admin/openligadb_n.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.openligadb.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.openligadb.svg)
![Anzahl der Installationen](https://iobroker.live/badges/openligadb-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/openligadb-stable.svg)
![NPM](https://nodei.co/npm/iobroker.openligadb.png?downloads=true)

# IoBroker-Adapter zum Abrufen von Fußballspielergebnissen von OpenLigaDB
## Überblick
Adapter zum Anfordern von Spieldaten für Fußball oder andere Spiele von openligadb.de

## Aufbau
Füge eine Instanz des Adapters hinzu und klicke auf das Schraubenschlüsselsymbol. Im Formular kannst du die Verknüpfung einer Liga und einer Saison hinzufügen.
Bitte besuche openligadb.de für verfügbare Ligen, Saisons und Verknüpfungen. Wenn sich eine Saison über zwei Jahre erstreckt, gib bitte nur das Startjahr ein.

Beispieldaten für die 1. Deutsche Bundesliga sind Abkürzung = BL1 Saison = 2023

Wenn du die Konfiguration gespeichert und geschlossen hast, sollten kurze Zeit später neue Datenpunkte für deine Liga und Saison vorhanden sein.

## Vis und Widgets
Derzeit sind 5 Widgets verfügbar. Bitte geben Sie openligadb in den Widget-Filter ein.

### Tabelle v4
Dieses Widget zeigt das aktuelle Ranking deiner Liga an

### Pivotierbar v2
Dieses Widget zeigt alle Ergebnisse in einer Pivot-Tabelle an

### Torjäger v2
Dieses Widget zeigt die Torjäger dieser Saison

### Spieltag
Alle Spiele des aktuellen oder ausgewählten Spieltags. Es gibt viele Widget-Attribute, um den Umfang der angezeigten Daten zu konfigurieren

### Spiele der Lieblingsvereine
Alle aktuellen und zukünftigen Spiele deiner Lieblingsvereine anzeigen

Dokumentation für die Vis-Widgets finden Sie in Vis oder [Widget-Dokumentation/deutsch](https://htmlpreview.github.io/?https://github.com/oweitman/ioBroker.openligadb/blob/master/widgets/openligadb/doc.html)

## Machen
* Validierung im Widget, wenn der Benutzer nicht den richtigen Datenpunkt ausgewählt hat
* Übersetzung
* ~~Dokumentation für neue Widgets „PivotTable“ und „Goalgetters“~~
* ~~Tabellenmodi um 1. Runde und 2. Runde erweitern~~
* ~~neue Widget-Pivot-Tabelle der gespielten Spiele~~
* ~~neues Widget „Zielerreicher-Ranking“ mit Sortierfunktion~~
* ~~Tabelle mit Trendzeichen erweitern (Pfeil hoch/runter, Punkt für keine Veränderung)~~
* ~~Tabelle erweitern um mit den letzten x Spielen zu rechnen~~
* ~~Tabelle erweitern um Rangliste für einen bestimmten Spieltag zu berechnen~~
* ~~Dokumentationsadapter/Widget~~
* ~~Problem mit der dynamischen Spalte „Club“ behoben~~
* ~~Neues Widget: Nächste x Spiele des Clubs~~
* ~~Widget-Spieltagseinstellung für Spieltagbeginn und -länge (-1,3 = vorherigen Spieltag und 3 Spieltage danach anzeigen)~~
* ~~Ersatzwert für den Editiermodus, wenn Showgameday per Binding gesetzt ist~~
* ~~Lieblingsclub hervorheben~~
* ~~steuerbarer Spieltag im Spieltags-Widget~~

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
   ### **WOxRK IN PROGRESS**
-->
### 1.4.6 (2024-06-01)

* fix yml structure

### 1.4.5 (2024-06-01)

* fix yml structure

### 1.4.4 (2024-06-01)

* Enable NPM Publish
* Enable dependabot
* fix checks from adapter checker

### 1.4.3 (2024-06-01)

* remove files from eslint check

### 1.4.2 (2024-06-01)

* fix double qoutes
* remove files from eslint check

### 1.4.1 (2024-06-01)

* update package and io-broker files
* fix problems with vis2
* remove vis as a

### 1.2.4

* fix problems reported by adapter-checker

### 1.2.3

* add connectiontype and datasource to io-package.json

### 1.2.2

* fix result calculation

### 1.2.1

* fix object type

### 1.2.0

* fix display of goals if goals are without minutes and playername saved by openligadb

* fixed that sometimed request of states failed

### 1.1.0

* prepare v1.1.0

### 1.0.3

* change setstate/createobject logic

### 1.0.2

* remove deprecated widgets / change widget beta flag

* improve debug messages

### 1.0.1

* improve error message for requests

### 1.0.0

* prepare for stable repository

### 0.11.5

* pivottable: show only results for selected gameday
* table3: icon attributes, add image selection dialog
* table3: add an extra attribute for mode to use with binding
* all widgets: update documentation

### 0.11.4

* fixed build/test problem

### 0.11.3

* pivottable: fix problem with rank number

### 0.11.2

* pivottable: fix problem with sort and highlightontop
* fix problem with goalgetters

### 0.11.1

* change some template settings, goalgetter table get headers, add object change sensing
* widget goalgetters: add parameter highlight and showonlyhighlight
* widget pivottable: add sort option and choice to place favorite teams on top
* remove year from date for several widgets

### 0.11.0

* extend table to calculate with x last games and extend table to calculate ranking for a defined gameday, to ensure backward compatibility i have to create a new table v3 widget
* extend table with trend sign (arrow up/down, point for no change)
* new widget goal getter ranking with sort function
* new widget pivot table of played games
* extend table modes with 1st round,2nd round

### 0.10.3

* change computing and output logic of gameday widget to mark gameday header with favorite class
* improve documentation with css-klasses for  table widget
* bugfix for calculate gameday.

### 0.10.2

* Add data column goaldiff to table widget, improve more documentation (systax highlighting,copy code function), add example to control gameday with buttons,

### 0.10.1

* Improve documentation with more recipes and syntax highlighting, improve code to get and subscribe states

### 0.10.0

* New widget Table 2 that  includes the calculation of the total, home and away results. the previous widget is now deprecated, due to the different datapoint (allmatches) to be selected.

### 0.9.3

* Remove ES6 features due to compatibility with older browsers

### 0.9.2

* next try to fix the experimental javascript binding function

### 0.9.1

* fix bugs in calculation matchresults and highlight clubs in favgames

### 0.9.0

* new Function for vis Binding to search for games at the actual day for favorite clubs, css-classes für games at actual day, fix bug to show the right match results,

### 0.8.0

* push version for latest repository. fix some typos. fix a problem with date handling on different OS

### 0.0.11

* widget gameday: fix issue with not working gamedaycount

### 0.0.10

* widget gameday: optional you can show informations about the goalgetters

### 0.0.9

* optional weekday for widgets: gameday and gamesoffavclub,highlight the clubname in gamesoffavclub

### 0.0.8

* new widget games of favorite clubs with multi league support as replacement for the old one

### 0.0.7

* close connections and remove observers (timeouts/intervals)

### 0.0.6

* NPM deployment and preperation for the latest repository

### 0.0.5

* highlight favorite club,
* Replacement value for edit mode if showgameday is set with binding,
* widget gameday setting for start gameday an length (-1,3 = show previous gameday and 3 gamedays after that)
* some documentation
* remove unused code
* new widget: next x games of club
* fix issue for dynamic with of club column

### 0.0.4

* fixed more oids in vis runtime

### 0.0.3

* fixed getting oids in vis runtime

### 0.0.2

* add controlable gameday logic to gameday widget and adapter

### 0.0.1

* initial release

## License

MIT License

Copyright (c) 2024 oweitman

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