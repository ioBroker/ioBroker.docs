---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.absolutehumidity/README.md
title: ioBroker.absolutehumidity
hash: aYgm7Bq44V24geurjjoumX2gyesP86c6qhDTrp9v0sY=
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

<img width="908" height="627" alt="image" src="https://github.com/user-attachments/assets/849e0561-dc5d-4f99-bc29-a547481e9115" />

Die Instanzseite ist interaktiv und ermöglicht die Berechnung von absoluter Luftfeuchtigkeit, Taupunkttemperatur und Lüftungsempfehlungen auf Basis von Daten, die analog oder manuell erfasst wurden. Geben Sie einfach die Werte ein, und das Ergebnis wird automatisch angezeigt.

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
### 0.1.10 (2026-11-03)
* (BenAhrdt) Serialize per-device measurement updates to prevent duplicate output writes when source states change concurrently.

### 0.1.9 (2026-11-03)
* (BenAhrdt) Accept Unicode temperature units (`℃`/`℉`) and common relative humidity units (`% rF`/`% rH`) for source states.

### 0.1.8 (2026-10-14)
* (BenAhrdt) Ensure that the interactive preview card labels always use the language selected in Admin, even when browser and system languages differ.

### 0.1.7 (2026-10-14)
* (BenAhrdt) Clearly label the editable preview values as demonstration-only and explain that they are not saved.
* (BenAhrdt) Use the selected Admin language for the interactive preview card labels.

### 0.1.6 (2026-09-28)
* Rename the visible Device Manager references to Config Manager in the adapter configuration and translations.
* Add delayed device configuration backups with manual restore and startup recovery when no device configuration exists.

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