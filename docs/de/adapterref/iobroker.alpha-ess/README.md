---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: +vNc4HxdWT6Q/JEMl3VqnqIDDbQytpvcCpJiumZ5+RI=
---
![Logo](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Anzahl der Installationen (neueste)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/alpha-ess-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# IoBroker.alpha-ess
## Alpha-ess-Adapter für ioBroker
Dieser Adapter meldet sich bei der Web-API von [Alpha-ESS](https://www.alphaess.com/) an und ruft Informationen für Ihre Alpha ESS-Geräte ab.\ Abhängig von Ihrem Alpha ESS-Produkt ist es möglich, Echtzeitdaten und Konfigurationsdaten für Ihre Geräte abzurufen. Welche Datenpunkte von der API zurückgegeben werden, hängt von Ihrer Alpha ESS-Ausrüstung ab.

Dieser Adapter basiert auf der großartigen Arbeit von [Charles Gillanders](https://github.com/CharlesGillanders/alphaess), der die Alpha ESS-Web-API rückentwickelt hat. Dies ist eine interne API, die jederzeit von Alpha ESS geändert werden kann.

Derzeit erstellt dieser Adapter für jeden Datenpunkt, den ich identifizieren konnte, einen Zustand mit einem hoffentlich selbsterklärenden Namen. Alle anderen Datenpunkte werden ignoriert. Beim Adapterstart werden diese Datenpunkte als Infomeldung protokolliert.

Grundsätzlich ist es möglich, ausgewählte Konfigurationseinstellungen über die Alpha ESS Web API zu ändern. Dies ist noch nicht implementiert.

## Einstellungen:
**Benutzername:** Der Benutzername Ihres Alpha ESS-Kontos\ **Passwort:** Das Passwort Ihres Alpha ESS-Kontos\ **Alpha ESS-System-ID:** Die Systemkennung Ihres Alpha ESS-Geräts\ **Intervall bis Echtzeitdaten lesen:** Einheit: Sekunden.\ **Intervall zum Lesen von Energiedaten:** Einheit: Minuten.\ **Intervall zum Lesen von Einstellungsdaten:** Einheit: Minuten.\ **Intervall zum Lesen statistischer Daten für die aktueller Tag:** Einheit: Minuten.\ **Intervall zum Lesen der Zusammenfassungsdaten:** Einheit: Minuten.

Es besteht die Möglichkeit, ein von Alpha ESS bereitgestelltes Demokonto zu nutzen. Die Anmeldeinformationen (Benutzername, System-ID) sind als Standardwerte innerhalb des Adapters festgelegt.
Das Passwort wird verschlüsselt gespeichert und muss daher manuell eingegeben werden: demo

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit zu oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und hat kein geschäftliches Ziel.**

## Changelog
### 0.3.0 (2023-02-11)
* (Gaspode) Rearranged statistical data and added more values. Many thanks to [Thorsten](https://github.com/ThorstenBoettler) for his valuable contribution in testing the early alpha versions of this release and providing informative suggestions and recommendations for new data points.
* (Gaspode) Added Summary data 
* (Gaspode) Refactored complete implementation
* (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
* (Gaspode) Remove disabled states at adapter startup
* (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update). 
* (Gaspode) Optimized rounding for selected values

### 0.2.1-beta.0 (2023-01-31)
* (Gaspode) Read selected statistical data

### 0.2.0 (2023-01-19)
* (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)
* (Gaspode) First release for Latest repository
* (Gaspode) Corrected typo in state ID Battery_SOC
* (Gaspode) Implemented improvements as suggested in code review

### 0.0.6-beta.5 (2023-01-07)
* (Gaspode) Slow down requests in case of permanent errors

### 0.0.6-beta.4 (2023-01-03)
* (Gaspode) Changed adapter type from metering to energy

### 0.0.6-beta.3 (2023-01-02)
* (Gaspode) Correction for NPM

### 0.0.6-beta.2 (2023-01-02)
* (Gaspode) Enable NPM

### 0.0.5
* (Gaspode) Use meaningful state names
* (Gaspode) Use suitable state roles
* (Gaspode) Added new state for Alpha ESS settings parameter 'upsReserve'

### 0.0.4
* (Gaspode) use axios to perform Alpha ESS API calls instead of deprecated request
* (Gaspode) New option "Update unchanged states" added

### 0.0.3
* (Gaspode) refactored API calls, added daily energy values

### 0.0.2
* (Gaspode) corrected api call for realtime data

### 0.0.1
* (Gaspode) initial release

## License
MIT License

Copyright (c) 2023 Gaspode <gaspode69@online.de>

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