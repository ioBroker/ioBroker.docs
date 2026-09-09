---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: HI5W07PzblI4ItyKbiWr53/3B4gRI7ZUqZMw4IrJcnc=
---
![Logo](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![NPM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)
![Test und Freigabe](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

# ioBroker.solarviewdatareader

## SolarViewDataReader-Adapter für ioBroker

Der Adapter liest die Daten vom Solarview-Datenlogger aus. Weitere Informationen zu Solarview finden Sie hier: <https://www.solarview.info/solarlogger.aspx>

## Konfiguration

### IP-Adresse, Port

Um die Daten vom Datenlogger abzurufen, müssen Sie die IP-Adresse und den Port Ihres SolarView-TCP-Servers eingeben. Der Standardport ist 15000. Weitere Informationen finden Sie in der SolarView-Dokumentation [unter https://www.solarview.info/solarlogger.aspx](https://www.solarview.info/solarlogger.aspx) .

### D0-Konverter

Wenn Sie einen D0-Konverter an den Solarview-Datenlogger angeschlossen haben, können Sie diese Option aktivieren. Bei Fragen konsultieren Sie bitte die Solarview-Dokumentation.

### Eigenverbrauchszählersumme und 1 bis 4

Wenn Sie einen S0-Zähler besitzen, können Sie diese Option aktivieren. Sie können bis zu vier Eigenverbrauchszähler einrichten und die Summe aller Zählerwerte berechnen. Bei Fragen konsultieren Sie bitte die Solarview-Dokumentation.

### Wechselrichter 1 bis 4

Jeder Wechselrichter kann einzeln aktiviert werden. Bei Fragen konsultieren Sie bitte die Solarview-Dokumentation.

### Intervall, Intervallbeginn, Intervallende

Hier können Sie den Zeitraum und das Intervall konfigurieren. Der Zeitraum für 24 Stunden ist 00:00 bis 23:59 Uhr. Nicht 00:00 bis 00:00 Uhr.

### Systemvariable CCU setzen, Systemvariable

Dies ist eine spezielle Funktion der Homematic CCU. Sie können in der CCU eine Systemvariable definieren. In dieser Systemvariable wird der aktuelle PAC-Wert gespeichert. Sie müssen den ioBroker-Status für diese Systemvariable angeben, z. **B. „hm-rega.0.12345“.**

### Geschaffene Staaten

#### pvig, pvi1..4, d0supply, d0consumption

täglich = Tagesertrag (kWh) monatlich = Monatsertrag (kWh) jährlich = Jahresertrag (kWh) gesamt = Gesamtertrag (kWh) Strom = Generatorleistung in W UDC, UDCB, UDCC, UDCD = Generatorspannungen in Volt pro MPP-Tracker IDC, IDCB, IDCC, IDCD = Generatorstrom in Ampere pro MPP-Tracker UL1, IL1 = Netzspannung, Netzleistung Phase 1 UL2, IL2 = Netzspannung, Netzleistung Phase 2 UL3, IL3 = Netzspannung, Netzleistung Phase 3 TKK = Temperatur-Wechselrichter

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) dependencies updated
* (afuerhoff) issues detected by repository checker fixed [#289]

### 1.2.5 (2026-05-16)
* (copilot) Adapter requires node.js >= 22 now
* (afuerhoff) dependencies updated
* (afuerhoff) dependabot.yml fixed [#246](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/246)
* (afuerhoff) license information updated

### 1.2.4 (2025-10-24)
* (afuerhoff) dependencies updated
* (afuerhoff) npm security changes
* (afuerhoff) repository checker warnings fixed

### 1.2.3 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker issues fixed
* (afuerhoff) typescript error fixed

### 1.2.2 (2025-05-30)
* (afuerhoff) dependencies updated
* (afuerhoff) testing updated [#217](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/217)
* (afuerhoff) @iobroker-bot warning fixed [#209](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/209)

### 1.2.1 (2025-02-26)
* (afuerhoff) dependencies updated

[Older changelogs can be found there](https://github.com/afuerhoff/ioBroker.solarviewdatareader/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2019-2026 Achim Fürhoff <achim.fuerhoff@outlook.de>

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