---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: 0ZcS+L2l6rWq/BTpl4sDy6dZEdwFIlHLGQPkO1XWA0k=
---
![Logo](../../../en/adapterref/iobroker.deyeidc/admin/deyeidc.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.deyeidc.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)
![Anzahl der Installationen](https://iobroker.live/badges/deyeidc-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/deyeidc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)

# IoBroker.deyeidc
**Tests:** ![Test und Freigabe](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## Deyeidc-Adapter für ioBroker
Datensammler für Deye-kompatiblen Wechselrichter

### Erste Schritte
Dieser Adapter ermöglicht das Auslesen von Daten eines Wechselrichters im lokalen Netzwerk. Hierzu müssen lediglich die IP des Wechselrichters und die Seriennummer des Loggers eingegeben werden. Sollte der Port vom Standardwert abweichen, kann dieser ebenfalls angepasst werden. Als praktikabler Wert für die Abtastrate sind 60 Sekunden voreingestellt.

Die Daten selbst werden über bekannte Modbus-Register abgerufen und in den Datenpunkten gespeichert. Dies wurde an einem „Deye-kompatiblen“ Wechselrichter entwickelt und getestet. Die abzufragenden Register können daher bei anderen Modellen abweichen.

## Verwendung
Zur Inbetriebnahme des Adapters müssen auf den folgenden Seiten auch die Registerbereiche und Spulen in der GUI eingegeben werden. Mittlerweile gibt es auf Github bereits Beispieleinträge für verschiedene Typen (z. B. https://github.com/raschy/ioBroker.deyeidc/blob/main/deyeidc.MI600.json).
Grundsätzlich sind die Register aus der jeweiligen Dokumentation zu ermitteln. Je nach Art des Inhalts erfolgt die Dekodierung über die „Regeln“.

Hier gilt:

| Regeln | Beschreibungen |
| ----- | ------------ |
| 0 | raw_signed |
| 1 | für vorzeichenlose 16-Bit-Werte |
| 2 | für 16-Bit-Werte mit Vorzeichen |
| 3 | für vorzeichenlose 32-Bit-Werte |
| 4 | für 32-Bit-Werte mit Vorzeichen |
| 5 | für Seriennummer |
| 6 | für Temperatur |
| 7 | für Versionsnummer |
| 8 | für SingleBytes (MSB) |
| 9 | für SingleBytes (LSB) |

Aus der Dokumentation geht auch hervor, ob der Dezimalpunkt um eine oder zwei Stellen verschoben werden muss. Hierzu dient der Eintrag „Faktor“. Hiermit können keine weiteren sinnvollen Berechnungen durchgeführt werden.

Bestimmte Werte werden vom Wechselrichter nicht geliefert und müssen eigenständig berechnet werden. Hierzu können pro Zeile zwei Werte in die Tabelle „compute“ eingetragen werden, die dann berechnet werden.
Ein typisches Beispiel ist „DV1 \* DC1“, wobei das Ergebnis dann in „Key“ mit der entsprechenden Einheit im Datenbaum gespeichert wird. Bitte beachten Sie, dass pro Zeile nur eine Grundberechnungsart verarbeitet werden kann. Klammerregeln sind daher nicht möglich und werden nicht unterstützt.

### HAFTUNGSAUSSCHLUSS
Alle Produkt- und Firmennamen oder Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Deren Nutzung impliziert keinerlei Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und hat kein geschäftliches Ziel. DEYE ist eine Marke von Copyright © 2023 Ningbo Deye Technology Co., Ltd., No.26 South Yongjiang Road, Beilun, Ningbo, Zhejiang, 315806 VR China.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.11 (2023-08-26)

-   (raschy) wrong implementation msb/lsb of 32-bit values recorrected

### 0.0.10 (2023-08-25)

-   (raschy) Calculation of 32-bit values corrected
-   (raschy) Ready for launch into the stable repository

### 0.0.9 (2023-07-10)

-   (raschy) minor bugs fixed

### 0.0.8 (2023-07-10)

-   (raschy) Day reset for offline operation

### 0.0.7 (2023-05-27)

-   (raschy) release for npm and ioBroker latest

### 0.0.6 (2023-05-27)

-   (raschy) Some processes optimized

### 0.0.5 (2023-04-27)

-   (raschy) Calculations modified with formulas
-   (raschy) Error messages in English

### 0.0.4 (2023-03-21)

-   (raschy) release for npm

### 0.0.3 (2023-03-21)

-   (raschy) release

### 0.0.2 (2023-03-21)

-   (raschy) initial release

## License

MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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