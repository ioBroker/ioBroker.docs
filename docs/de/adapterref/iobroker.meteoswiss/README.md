---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.meteoswiss/README.md
title: ioBroker.meteoswiss
hash: ExtNW5ClzTt/fCQctltaZFRRN0cIVzBOkc+0+aFZnmw=
---
![Logo](../../../en/adapterref/iobroker.meteoswiss/admin/meteoswiss.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.meteoswiss.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.meteoswiss.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/meteoswiss-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/meteoswiss-stable.svg)
![NPM](https://nodei.co/npm/iobroker.meteoswiss.png?downloads=true)

# IoBroker.meteoswiss
**Tests:** ![Test und Freigabe](https://github.com/deMynchi/ioBroker.meteoswiss/workflows/Test%20and%20Release/badge.svg)

## Meteoswiss-Adapter für ioBroker
Liefert Wetterinformationen von MeteoSwiss

## Staatsnamen
Um die Bundesstaatskennungen kurz und übersichtlich zu halten, verwenden viele Bundesstaaten lediglich Zahlen zur Unterscheidung. Alle Bundesstaaten haben aussagekräftige Namen. Um die Bedeutung aller Bundesstaaten zu verstehen, müssen Sie möglicherweise die Spalte „Name“ in ioBroker.admin aktivieren.

## Wetteraktualisierungen
MeteoSwiss aktualisiert seine Wetterdaten alle 10 Minuten. Dieser Adapter versucht, die Wetterdaten so schnell wie möglich nach der Änderung abzurufen und passt seinen Aktualisierungstimer entsprechend an. Die Wetterdaten sind in der Regel nicht älter als 11 Minuten.

## Unbekannte Werte
Bestimmte Werte werden nicht immer von allen Wetterstationen oder Vorhersagestandorten gemeldet. Diese Werte werden durch den Wert `null` gekennzeichnet, um unbekannte Werte eindeutig von bekannten „0“-Werten zu unterscheiden.

## Aggregation von Werten
Bestimmte Messwerte und Vorhersagen werden häufiger gemeldet als das vom Adapter vorgegebene 3-Stunden-Intervall. Daher werden diese Werte logisch aggregiert (Minimum ist der niedrigste Wert im Bereich, Maximum ist der höchste Wert usw.).

## Wetterwarnungen
Alle Zustände `warning-xx` zeigen die aktuell wichtigste aktive Warnung der jeweiligen Kategorie an. Es können mehrere Warnungen derselben Kategorie gleichzeitig vorliegen, dieser Adapter zeigt jedoch nur die wichtigste an. Warnungen höherer Priorität und Warnungen, die nicht als „Outlook“ gekennzeichnet sind, werden als wichtiger eingestuft als Warnungen niedrigerer Priorität oder solche, die als „Outlook“ gekennzeichnet sind.

Wenn keine Warnung einer bestimmten Kategorie aktiv ist, hat der Zustand `warning-xx.level` den Wert `0` (Keine) und alle anderen Zustände dieser Kategorie haben den Wert `null`.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.2 (2026-01-21)

- (deMynchi) Fixes to satisfy code review

### 1.0.1 (2026-01-06)

- (deMynchi) Fixes to satisfy repochecker

### 1.0.0 (2026-01-06)

- (deMynchi) Update to API version 3
- (deMynchi) Remove subscription (no longer working)
- (deMynchi) Use latest create-adapter template
- (deMynchi) Switch to pure TypeScript adapter (no more build)

### 0.2.1 (2021-07-13)

- (deMynchi) Fixed issue where sometimes the wrong warning texts were shown when there are multiple warnings from different categories.

### 0.2.0 (2021-07-08)

- (deMynchi) Added warnings for PLZ entries.

### 0.1.2 (2021-03-22)

- (deMynchi) Fixed connection state always yellow.

### 0.1.1 (2021-03-22)

- (deMynchi) Fixed initial download of sqlite db that was broken

### 0.1.0 (2021-03-21)

- (deMynchi) initial release

## License

MIT License

Copyright (c) 2026 deMynchi

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