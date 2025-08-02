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
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Anzahl Installationen (stabil)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
**Tests:** ![Testen und Freigeben](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## SolarviewDatareader-Adapter für ioBroker
Der Adapter liest die Daten aus dem Solarview Datenlogger.
Hier finden Sie weitere Infos zu Solarview: https://www.solarview.info/solarlogger.aspx

## Konfiguration
### IP-Adresse, Port
Um die Daten vom Datenlogger abzurufen, müssen Sie die IP-Adresse und den Port Ihres Solarview-TCP-Servers eingeben.
Der Standardport ist 15000. Bitte beachten Sie die Solarview-Dokumentation https://www.solarview.info/solarlogger.aspx.

### D0-Konverter
Wenn Sie einen D0-Konverter an den Solarview-Datenlogger angeschlossen haben, können Sie diese Option aktivieren.
Bei Fragen lesen Sie bitte die Solarview-Dokumentation.

### Eigenverbrauchszähler Summe und 1 bis 4
Wenn Sie einen S0-Zähler haben, können Sie diese Option aktivieren.
Sie können bis zu 4 Eigenverbrauchszähler und die Summe aller Zähler haben.
Bei Fragen lesen Sie bitte die Solarview-Dokumentation.

### Wechselrichter 1 bis 4
Sie können jeden Wechselrichter einzeln aktivieren.
Bei Fragen lesen Sie bitte die Solarview-Dokumentation.

### Intervall, Intervallbeginn, Intervallende
Hier können Sie den Zeitbereich und das Intervall konfigurieren. Der Zeitbereich für 24h ist 00:00 bis 23:59.
Nicht 00:00 bis 00:00.

### Setze Systemvariable CCU, Systemvariable
Dies ist eine spezielle Funktion für die Homematic CCU. Sie können eine Systemvariable in der CCU definieren.
In dieser Systemvariable wird der aktuelle PAC-Wert gespeichert.
Sie müssen den ioBroker-Status für diese Systemvariable eingeben -> **z. B. „hm-rega.0.12345“**

### Erstellte Staaten
#### Pvig, pvi1..4, d0Angebot, d0Verbrauch
daily = Tagesertrag (kWh) montly = Monatsertrag (kWh) yearly = Jahresertrag (kWh) total = Gesamtertrag (kWh) current = Generatorleistung in W UDC, UDCB, UDCC, UDCD = Generatorspannungen in Volt je MPP-Tracker IDC, IDCB, IDCC, IDCD = Generatorstrom in Ampere je MPP-Tracker UL1, IL1 = Netzspannung Netzphase 1 UL2, IL2 = Netzspannung Netzphase 2 UL3, IL3 = Netzspannung Netzphase 3 TKK = Temperatur Wechselrichter

## Changelog
### 1.1.3 (2024-09-17)
* (afuerhoff) adapter checker changes [#176](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/176)
* (afuerhoff) dependencies updated

### 1.1.2 (2024-09-13)
* (afuerhoff) adapter checker changes
* (afuerhoff) dependencies updated
* (afuerhoff) automatic restart [#170](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/170)

### 1.1.1 (2024-06-28)
* (afuerhoff) change to typescript
* (afuerhoff) dependencies updated
* (afuerhoff) bugfix CCU variable
* (afuerhoff) documentation changed

### 1.1.0 (2024-05-29)
* (afuerhoff) code optimizations
* (afuerhoff) jsonConfig added
* (afuerhoff) dependencies updated
* (afuerhoff) node >= 18, js-controller >= 5.0.19
* (afuerhoff) admin >= 6.17.13 due to timePicker failure

### 1.0.8 (2024-01-18)
* (afuerhoff) dependencies updated
* (afuerhoff) translations updated

## License
MIT License

Copyright (c) 2019-2024 Achim Fürhoff <achim.fuerhoff@outlook.de>

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