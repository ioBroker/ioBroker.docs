---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.absolutehumidity/README.md
title: ioBroker.absolutehumidity
hash: pxolOQQ3Q/QufA1tbipa/QNfsycC3gF9on8BGcCvTNw=
---
![Logo](../../../en/adapterref/iobroker.absolutehumidity/admin/absolutehumidity.svg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.absolutehumidity.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.absolutehumidity.svg)
![NPM](https://nodei.co/npm/iobroker.absolutehumidity.png?downloads=true)
![Test und Freigabe](https://github.com/BenAhrdt/ioBroker.absolutehumidity/workflows/Test%20and%20Release/badge.svg)

# ioBroker.absolutehumidity

![Anzahl der Installationen](https://ioBroker.live/badges/absolutehumidity-installed.svg)![Aktuelle Version im stabilen Repository](https://ioBroker.live/badges/absolutehumidity-stable.svg)

## Adapter für absolutefeuchtigkeit für ioBroker

Die absolute Luftfeuchtigkeit wird aus der tatsächlichen Temperatur und der relativen Luftfeuchtigkeit berechnet.

## Berechnungsmethode

Der Adapter verwendet empirische Magnus-Näherungsformeln, um den Sättigungsdampfdruck aus Temperatur und relativer Luftfeuchtigkeit zu berechnen.

- Die absolute Feuchte wird aus dem Sättigungsdampfdruck mithilfe der Magnus/Bolton-Näherung und des idealen Gasgesetzes berechnet. Das Ergebnis wird in g/m³ angegeben.
- Die Taupunkttemperatur wird mithilfe der Magnus-Formel mit Sonntag-Koeffizienten berechnet. Das Ergebnis wird in °C angegeben.

Geringfügige Abweichungen von Online-Tabellen sind zu erwarten, da in verschiedenen Tabellen oft unterschiedliche Koeffizientensätze nach Magnus, Tetens, Sonntag, Bolton oder Buck verwendet werden.

<img width="927" height="590" alt="image" src="https://github.com/user-attachments/assets/15aad0cf-144b-4ccb-8d38-c8d7710aab48" />

Die Instanzseite ist interaktiv und ermöglicht die Berechnung von absoluter Luftfeuchtigkeit, Taupunkttemperatur und Lüftungsempfehlungen auf Basis von Daten, die analog oder manuell erfasst wurden. Geben Sie einfach die Werte ein, und das Ergebnis wird automatisch angezeigt.

## Installation

Solange der Adapter noch nicht im stabilen Repository gelistet ist, kann er manuell über NPM installiert werden. Hinweis: Installieren Sie ihn NIEMALS über GitHub.

Installationslink: <https://github.com/BenAhrdt/ioBroker.absolutehumidity>

<img width="955" height="703" alt="image" src="https://github.com/user-attachments/assets/d7c43f37-30be-4a16-99f0-6e7e34164478" />

## Erstellen Sie einen Tab in der Tableiste.

Verwenden Sie die Stecknadel, um einen Tab in der Tableiste zu erstellen. Verwenden Sie „+ Gerät hinzufügen“, um ein Gerät hinzuzufügen.

<img width="747" height="621" alt="image" src="https://github.com/user-attachments/assets/ec36adbc-4e2b-4a26-85f1-34413f02d5b9" />

## Gerät hinzufügen

Um ein Gerät hinzuzufügen, müssen Sie ihm einen Namen geben und die beiden Zustände für Temperatur und relative Luftfeuchtigkeit auswählen. Optional können Sie festlegen, ob diese beiden Werte auch (erneut) in die Objekte des Adapters aufgenommen werden sollen.

<img width="795" height="437" alt="image" src="https://github.com/user-attachments/assets/4160b3ec-3e49-4a5a-81ae-a826de288698" />

## Kachelansicht

Die Fliesen für den Außenbereich sind grün, die für den Innenbereich blau dargestellt. In der Fliesenansicht sind die Fliesen aufsteigend sortiert, also von trocken zu feuchter. (Erscheint die grüne Fliese zuerst, empfiehlt sich möglicherweise das Lüften des Raumes.)

<img width="1147" height="428" alt="image" src="https://github.com/user-attachments/assets/b08264af-3350-4ffb-85ed-3ce7d15e2f5a" />

## Objektansicht

<img width="935" height="386" alt="image" src="https://github.com/user-attachments/assets/de0d67d2-4935-428b-a3c8-199c9b1bdcce" />

## Link zum iBroker-Forum

<https://forum.iobroker.net/topic/85455/test-adapter-absolut-humidity>

## Zusammenarbeit

Der Adapter wurde in Zusammenarbeit mit Jörg Froehner entwickelt.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.6 (2026-09-28)
* Rename the visible Device Manager references to Config Manager in the adapter configuration and translations.
* Add delayed device configuration backups with manual restore and startup recovery when no device configuration exists.

### 0.1.5 (2026-09-27)
* Update the repository-check dependencies and test the adapter on Node.js 26.

### 0.1.4 (2026-09-21)
* Keep long Device Manager measurements readable with a smaller value font and at most two decimal places.

### 0.1.3 (2026-09-21)
* Restore the regular adapter configuration page with interactive outdoor and indoor preview cards, and provide a link to the Device Manager in Config Manager.

### 0.1.2 (2026-09-20)
* Keep the Device Manager in the adapter configuration instead of a separate Admin tab. Render the four live measurements through one shared HTML row template per card; Admin's read-only numeric state control otherwise adds a progress indicator for percent and bounded states.

## License
MIT License

Copyright (c) 2026 BenAhrdt <github@ben-schmidt.net>

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