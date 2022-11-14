---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: giiX9+hLwLWA5HvDhp/CfEdsy2+ubQ+cvWtQJK0h248=
---
![Logo](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Anzahl der Installationen (neueste)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
**Tests:** ![Testen und freigeben](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## Solarviewdatareader-Adapter für ioBroker
Der Adapter liest die Daten aus dem Solarview Datenlogger.
Hier finden Sie weitere Informationen zu Solarview: https://www.solarview.info/solarlogger.aspx

## Aufbau
### IP-Adresse, Port
Um die Daten des Datenloggers zu erhalten, müssen Sie die IP-Adresse und den Port Ihres solarview TCP-Servers eingeben.
Der Standardport ist 15000. Bitte beachten Sie die Solarview-Dokumentation https://www.solarview.info/solarlogger.aspx.

### D0-Konverter
Wenn Sie einen D0-Konverter an den Solarview-Datenlogger angeschlossen haben, können Sie diese Option aktivieren.
Bei Fragen konsultieren Sie bitte die Solarview-Dokumentation.

### Eigenverbrauch Zählersumme und 1 bis 4
Wenn Sie einen S0-Zähler haben, können Sie diese Option aktivieren.
Sie können bis zu 4 Eigenverbrauchszähler und die Summe aller Zähler haben.
Bei Fragen konsultieren Sie bitte die Solarview-Dokumentation.

### Wechselrichter 1 bis 4
Sie können jeden Wechselrichter separat freigeben.
Bei Fragen konsultieren Sie bitte die Solarview-Dokumentation.

### Intervall, Intervallstart, Intervallende
Hier können Sie den Zeitbereich und das Intervall konfigurieren. Der Zeitbereich für 24 Stunden ist 00:00 bis 23:59.
Nicht 00:00 bis 00:00.

### Systemvariable CCU, Systemvariable setzen
Dies ist eine Besonderheit für die homematic CCU. Sie können eine Systemvariable in der CCU definieren.
In dieser Systemvariable wird der aktuelle PAC-Wert gespeichert.
Sie müssen den ioBroker-Status für diese Systemvariable eingeben -> ** z. "hm-rega.0.12345"**

### Staaten erstellt
#### Pvig, pvi1..4, d0Versorgung, d0Verbrauch
täglich = Tagesertrag (kWh) monatlich = Monatsertrag (kWh) jährlich = Jahresertrag (kWh) gesamt = Gesamtertrag (kWh) Strom = Generatorleistung in W UDC, UDCB, UDCC, UDCD = Generatorspannungen in Volt pro MPP-Tracker IDC, IDCB, IDCC, IDCD = Generatorstrom in Ampere pro MPP-Tracker UL1, IL1 = Netzspannung Netz Phase 1 UL2, IL2 = Netzspannung Netz Phase 2 UL3, IL3 = Netzspannung Netz Phase 3 TKK = Temperaturinverter

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.6 (2022-07-04)
* (afuerhoff) dependencies updated
* (afuerhoff) Interval settings changed from minutes to seconds
* (afuerhoff) States only writen after changes

### 1.0.5 (2022-02-17)
* (afuerhoff) dependencies updated
* (afuerhoff) test and release updated
* (afuerhoff) smaller changes

### 1.0.4 (2022-02-09)
* (afuerhoff) dependencies updated
* (afuerhoff) issue #20 fixed

### 1.0.3 (2021-12-08)
* (afuerhoff) dependencies updated

### 1.0.2 (2021-05-07)
* (afuerhoff) node.js 14 and 16 compatibilty
* (afuerhoff) dependencies updated

## License
MIT License

Copyright (c) 2019-2022 Achim Fürhoff <achim.fuerhoff@outlook.de>

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