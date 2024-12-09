---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: MQlhZDufCij98ZD1mBBFOylZ/vD+HChaCplicsJj9ZI=
---
![Logo](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/alpha-ess-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/alpha-ess-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# IoBroker.alpha-ess
## Alpha-ess-Adapter für ioBroker
---

### Für Support öffnen Sie bitte ein GitHub-Problem oder besuchen Sie
https://forum.iobroker.net/post/892023 https://www.storion4you.de/thread/683

---

### Aufgrund der aktuellen Umstände bitte beachten!
[Ankündigung einer Schnittstellenbeschränkung](https://github.com/alphaess-developer/alphacloud_open_api/issues/54)

---

Dieser Adapter meldet sich bei der Web-API von [Alpha-ESS](https://www.alphaess.com/) an und ruft Informationen zu Ihrem Alpha-ESS-Gerät ab.\ Abhängig von Ihrem Alpha-ESS-Produkt ist es möglich, Echtzeitdaten und Konfigurationsdaten für Ihr Gerät abzurufen. Welche Datenpunkte von der API zurückgegeben werden, hängt von Ihrem Alpha-ESS-Gerät ab.

Dieser Adapter verwendet die Alpha-ESS Open API, eine offizielle und dokumentierte API für Alpha-ESS-Geräte.

Das Qualitätsattribut jedes Zustands wird entsprechend seinem Status festgelegt:

| Qualität | Bedeutung |
|:--------|:--------------------------------------------------|
|0x00 |OK und aktuell |
|0x01 |Wert aus unbekanntem Grund nicht aktualisiert, siehe Debug-Protokoll |
|0x02 |Problem mit der Online-Verbindung für diesen Datenpunkt |
|0x12 |Adapter getrennt oder gestoppt |
|0x44 |API hat einen Fehler oder einen internen Fehler zurückgegeben, siehe Debug-Protokoll |

## Einstellungen:
Um die Alpha-ESS Open API nutzen zu können, müssen Sie Ihr Alpha-ESS-Gerät unter https://open.alphaess.com registrieren. Nach der Registrierung erhalten Sie eine Entwickler-ID und einen Entwicklerschlüssel (genannt „Secret“). Diese benötigen Sie, um Zugriff auf die Open API zu haben.
Wie Sie SN und Checkcode für die Registrierung finden, ist hier beschrieben: https://github.com/alphaess-developer/alphacloud_open_api

- **Persönliche Bewerbungs-ID:** Die Bewerbungs-ID (siehe oben)
- **Persönliches Bewerbungsgeheimnis:** Das Bewerbungsgeheimnis (siehe oben)
- **Alpha-ESS System-ID:** Die S/N (Seriennummer) Ihres Alpha-ESS-Geräts
- **Intervall zum Lesen von Echtzeitdaten:** Einheit: Sekunden.
- **Intervall zum Lesen der Energiedaten:** Einheit: Minuten.
- **Intervall zum Lesen der Ladeeinstellungen:** Einheit: Minuten.
- **Intervall zum Lesen der Entladeeinstellungen:** Einheit: Minuten.
- **Intervall zum Lesen der Zusammenfassungsdaten:** Einheit: Minuten.
- **Intervall zum Lesen der Wallbox-Daten:** Einheit: Minuten. Achtung: Aktuell wird nur eine Wallbox unterstützt.
- **Unveränderte Zustände aktualisieren:** Ist diese Option aktiviert, werden Zustände auch dann geändert, wenn der zugehörige Wert unverändert bleibt.

## Haftungsausschluss
**Alle Produkt- und Firmennamen oder Logos sind Warenzeichen™ oder eingetragene® Warenzeichen ihrer jeweiligen Inhaber. Ihre Verwendung impliziert keine Zugehörigkeit oder Billigung durch sie oder verbundene Tochtergesellschaften! Dieses persönliche Projekt wird in der Freizeit gepflegt und verfolgt kein Geschäftsziel.**

## Changelog
### 2.1.6 (2024-12-01)

- (Gaspode) Migrated to ESLint 9

### 2.1.5 (2024-11-14)

- (Gaspode) Optimized GUI for all screen resolutions (responsive design)

### 2.1.4 (2024-08-13)

- (Gaspode) Updated some formal stuff

### 2.1.3 (2024-08-07)

- (Gaspode) Increased read timeout from 10 to 20 s

### 2.1.2 (2024-08-07)

- (Gaspode) Quality of states optimized

### 2.1.1 (2024-08-07)

- (Gaspode) Do not longer report read timeouts as error. It should be enough to set the quality of concerned states to values according the table above and to display warnings, if values were not updated for a long time. To see details, debug log level must be enabled by the user.

### 2.1.0 (2024-08-01)

- (Gaspode) Adapter requires node.js >= 18 and js-controller >= 5 now
- (Gaspode) Dependencies updated
- (Gaspode) Adapter logo updated. Alpha-ESS has kindly permitted to use the Alpha-ESS logo. This does not imply any affiliation with Alpha-ESS! Alpha-ESS is not the developer or provider of this adapter!

### 2.0.2 (2024-01-12)

- (Gaspode) Updated Copyright year

### 2.0.1 (2024-01-03)

- (Gaspode) Adapted timeout to new API restrictions

### 2.0.0 (2023-12-02)

- (Gaspode) Breaking Change: Removed support of Closed API

### 1.3.0 (2023-11-22)

- (Gaspode) Support wallbox with Open API
- (Gaspode) Start and stop charging of wallbox with Open API

### 1.2.1 (2023-11-11)

- (Gaspode) Fixed severe error in ClosedAPI

### 1.2.0 (2023-11-10)

- (Gaspode) Added additional realtime attributes for OpenAPI

### 1.1.1 (2023-11-04)

- (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

- (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
- (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

- (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

- (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

- (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
- (Gaspode) Set state quality accordingly to status of data
- (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
- (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

- (Gaspode) Optimized deletion of group states
- (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

- (Gaspode) Read selected statistical data
- (Gaspode) Added Summary data
- (Gaspode) Refactored complete implementation
- (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
- (Gaspode) Remove disabled states at adapter startup
- (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
- (Gaspode) Optimized rounding for selected values
- (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

- (Gaspode) First release for Latest repository
- (Gaspode) Corrected typo in state ID Battery_SOC
- (Gaspode) Implemented improvements as suggested in code review
- (Gaspode) Slow down requests in case of permanent errors
- (Gaspode) Changed adapter type from metering to energy
- (Gaspode) Correction for NPM
- (Gaspode) Enable NPM

### 0.0.5

- (Gaspode) Use meaningful state names
- (Gaspode) Use suitable state roles
- (Gaspode) Added new state for Alpha-ESS settings parameter 'upsReserve'

### 0.0.4

- (Gaspode) use axios to perform Alpha-ESS API calls instead of deprecated request
- (Gaspode) New option "Update unchanged states" added

### 0.0.3

- (Gaspode) refactored API calls, added daily energy values

### 0.0.2

- (Gaspode) corrected api call for realtime data

### 0.0.1

- (Gaspode) initial release

## License

MIT License

Copyright (c) 2024 Gaspode <gaspode69@online.de> (**NO SUPPORT VIA EMAIL**)

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