---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.airquality/README.md
title: ioBroker.airquality
hash: VESbSZ3qZ3zRFZAZWez5WMXmfqrmNJI2S98y6dEosT8=
---
![Logo](../../../en/adapterref/iobroker.airquality/admin/airquality.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.airquality.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.airquality.svg)
![Anzahl der Installationen](https://iobroker.live/badges/airquality-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/airquality-stable.svg)
![NPM](https://nodei.co/npm/iobroker.airquality.png?downloads=true)

# IoBroker.airquality
**Tests:** ![Test und Freigabe](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## Luftqualitätsadapter für ioBroker
Daten von der deutschen UBA abrufen

### Erste Schritte
In diesem Adapter muss mindestens eine Umweltmessstation, von der Messwerte erfasst werden sollen, in der Konfiguration hinterlegt werden. Die Stationsnamen können auf der Website des Umweltbundesamts unter https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten (anschließend auf „Nächstgelegene Station“ klicken) mithilfe der angezeigten Karte ausgewählt werden.
Die Stationsbezeichnungen beginnen stets mit „DE“, gefolgt vom Bundesland „BW“ und einer dreistelligen Kennnummer. Diese Kennnummer, z. B. „DEBW052“, muss anschließend auf der Konfigurationsseite des Adapters eingegeben und mit Enter bestätigt werden. Weitere Stationen können hier ebenfalls hinzugefügt werden.

Die Air Quality Data API ist aktuell in Version 4 (v4) verfügbar. Die Vorgängerversion (v3) wird vorerst parallel weitergeführt. Der Hauptunterschied zwischen den Versionen besteht in der Umstellung auf stündliche Daten für den Luftqualitätsindex (AQI) und einer neuen Klassifizierung der Indexkategorien.

Wenn die Koordinaten in der Hauptkonfiguration des ioBrokers hinterlegt sind, versucht der Adapter beim ersten Start selbst die nächstgelegene Station zu finden.

## Hinweis
Gelegentlich kommt es vor, dass Messwerte nicht abgerufen werden können. Dies geschieht häufig zur vollen Stunde, da die Daten vermutlich komprimiert und intern verarbeitet werden. Aber auch nachts (gegen Mitternacht) ist der Datenabruf oft nicht möglich. In diesem Fall wird als Warnung der Eintrag „Keine Daten empfangen“ im Protokoll gespeichert. Dies ist kein Fehler des Adapters, sondern systembedingt.

### HAFTUNGSAUSSCHLUSS
Bitte beachten Sie Urheberrechte und Markenrechte, wenn Sie Namen oder Logos von Unternehmen verwenden, und fügen Sie einen entsprechenden Hinweis in Ihre README-Datei ein.
Sie können sich Beispiele anderer Adapter ansehen oder in der Entwickler-Community nachfragen. Die Verwendung von Firmennamen oder -logos ohne Genehmigung kann rechtliche Konsequenzen haben.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (raschy) change to version 4
- (raschy) some dependency updates

### 0.1.7 (2025-08-22)

- (raschy) Station names visible again

### 0.1.6 (2025-08-22)

- (raschy) Removal of an unused state
- (raschy) improved error messages
- (raschy) improved retrieval logic

### 0.1.5 (2025-05-03)

- (raschy) Supplementary data points i18n
- (raschy) Data point type corrected 
- (raschy) @iobroker/adapter-core 3.2.3 is recommended

### 0.1.4 (2024-12-16)

- (raschy) Instructions for use in GUI added

### 0.1.3 (2024-12-12)

- (raschy) inclusive deploy

### 0.1.2 (2024-12-12)

- (raschy) Ready for latest and tests

### 0.1.1 (2024-12-11)

- (raschy) Migration to ESLint 9 and @iobroker/eslint-config

### 0.1.0 (2024-12-03)

- (raschy) CO data retrieval added
- (raschy) Conversion as scheduled adapter

### 0.0.4 (2024-10-31)

- (raschy) Readme text expanded
- (raschy) Issue 1 [E254] and [W040] corrected

### 0.0.3 (2024-10-28)

- (raschy) Auto detection for location activated

### 0.0.2 (2024-10-28)

- (raschy) initial release

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026 raschy <raschy@gmx.de>

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
SOFTWARE.# ioBroker.airquality