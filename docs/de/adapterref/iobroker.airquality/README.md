---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.airquality/README.md
title: ioBroker.Luftqualität
hash: jikrEMuqCpJ/5qloEaSpyaN0sv//2SOzIVI//ESvCo0=
---
![Logo](../../../en/adapterref/iobroker.airquality/admin/airquality.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.airquality.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.airquality.svg)
![Anzahl der Installationen](https://iobroker.live/badges/airquality-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/airquality-stable.svg)
![NPM](https://nodei.co/npm/iobroker.airquality.png?downloads=true)

# IoBroker.airquality
**Tests:** ![Testen und Freigeben](https://github.com/raschy/ioBroker.airquality/workflows/Test%20and%20Release/badge.svg)

## Airquality-Adapter für ioBroker
Daten vom deutschen UBA abrufen

### Erste Schritte
In diesem Adapter muss in der Konfiguration mindestens eine Umweltstation eingetragen werden, von der Messwerte gesammelt werden sollen. Die Stationsnamen können auf der Internetseite des Umweltbundesamtes unter https://www.umweltbundesamt.de/themen/luft/luftqualitaet#luftdaten (dann auf ‚Nächstgelegene Station‘ klicken) anhand der angezeigten Karte ausgewählt werden.
Die Stationen beginnen immer mit ‚DE‘, gefolgt vom Bundesland ‚BW‘ und einer dreistelligen laufenden Nummer. Diese Kennung, z.B. ‚DEBW052‘, muss dann in der Konfigurationsseite des Adapters eingetragen werden (mit Enter bestätigen). Hier können auch weitere Stationen hinzugefügt werden.

Sind die Koordinaten in der Hauptkonfiguration des ioBrokers hinterlegt, versucht der Adapter beim ersten Start selbst die nächstgelegene Station zu finden.

## Hinweis
Es kommt gelegentlich vor, dass Messwerte nicht abgerufen werden können. Dies passiert häufig zu jeder vollen Stunde, da die Daten vermutlich intern komprimiert und verarbeitet werden. Aber auch nachts (gegen Mitternacht) ist es häufig nicht möglich, die Daten abzurufen. Als Warnung wird dann ein Logeintrag 'Keine Daten empfangen' geschrieben. Dies ist kein Defekt des Adapters, sondern systembedingt.

### HAFTUNGSAUSSCHLUSS
Bitte beachten Sie Urheberrechte und Markenrechte, wenn Sie Namen oder Logos eines Unternehmens verwenden, und fügen Sie Ihrer README-Datei einen Haftungsausschluss hinzu.
Sie können andere Adapter nach Beispielen durchsuchen oder in der Entwickler-Community nachfragen. Die unbefugte Verwendung eines Namens oder Logos eines Unternehmens kann rechtliche Probleme für Sie nach sich ziehen.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

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

## License

MIT License

Copyright (c) 2024-2025 raschy <raschy@gmx.de>

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