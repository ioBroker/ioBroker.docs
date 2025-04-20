---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.solax.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.solax.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/solax-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/solax-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg
BADGE-License: https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
---
![Logo](../../admin/solax.png)
 # ioBroker.solax

[![NPM version](http://img.shields.io/npm/v/iobroker.solax.svg)](https://www.npmjs.com/package/iobroker.solax)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solax.svg)](https://www.npmjs.com/package/iobroker.solax)
![Number of Installations (latest)](http://iobroker.live/badges/solax-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/solax-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.solax)
![Test and Release](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)](https://github.com/simatec/ioBroker.solax/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)



**************************************************************************************************************

**Wenn Ihnen ioBroker.solax gefällt, denken Sie bitte über eine Spende nach::**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

## Solax Adapter for ioBroker

**************************************************************************************************************

### Solax Cloud-Verbindung

Solax Wechselrichter API-Cloud-Verbindung

Dieser Adapter ruft die Daten deines Wechselrichters vom Hersteller Solax für iobroker ab.

Was dazu benötigt wird, ist ein Konto bei Solax, eine Token-ID und die Seriennummer des Pocket Wifi oder LAN Sticks.

### API-Token

<span><img src="../img/solax_api.png"></span>

### Seriennummer

<span><img src="../img/wifi-stick.png"></span>


### Experteneinstellungen

Die lokale Verbindung wird aktuell nur von dem Pocket Wifi Sticks unterstützt. LAN-Sticks können nur im Cloud-Modus betrieben werden.

Achtung, wer in den Experteneinstellungen den lokalen Modus aktiviert sollte im Vorfeld zwingend die aktuelle Firmwareversion seines Pocket Wifi Sticks prüfen.
Eine Firmware Version größer 2.30.20 (Wifi-Pocket V1/V2) und kleiner als 3.001 (Wifi-Pocket V3) darf der Stick nicht installiert haben, da Solax in höheren Versionen den lokalen Zugriff blockiert und es zu einem Absturz des Wifi Sticks führt.

Wie man die Firmware Version prüfen kann und ein Downgrade auf die korrekte Version hinbekommt, wird hier erklärt.

Um die Firmware auf dem Stick zu prüfen, müsst ihr euch mit dem Hotspot des Sticks verbinden.
Der Name des Hotspots sollte bei euch wie folgt aussehen: `Solax_SWXXXXXXXX` oder `Wifi_SWXXXXXXXX`. XXXXXXXX wird durch eure Seriennummer ersetzt.

Wenn ihr mit dem Hotspot verbunden seit, dann geht ihr mit folgender IP-Adresse in euren Browser auf das Webinterface des Wifi-Sticks: `5.8.8.8`<br>
Solltet ihr euer Passwort bei der Ersteinrichtung nicht geändert haben, sind die Standard Login-Daten admin:admin

<span><img src="../img/webif.png"></span>

Im Webinterface geht ihr auf den Tab "System" und findet dort die aktuell installierte Firmware-Version.<br>
Sollte die Version größer 2.033.20 (Wifi-Pocket V1/V2) und kleiner 3.001 (Wifi-Pocket V3) sein, könnt ihr im gleichen Tab über den Menüpunkt "Update Firmware (.usb)" die korrekte Version flashen.

Die Version 2.033.20 könnt ihr euch unter folgenden Link herunterladen:

[Download Pocket Wifi Firmware](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

Die Zip-Datei muss entpackt werden und es muss die Datei mit der Endung ".usb" ausgewählt werden.<br>
Nun könnt Ihr den Downgrade starten und werdet nach ca. 20-30 Sekunden eine Meldung bekommen, dass das Update erfolgreich war und der Stick neu gestartet wird.

Nach erfolgreichen Neustart könnt ihr nun über den Hotspot mit der IP-Adresse `5.8.8.8` oder auch über eure lokale IP in eurem Netzwerk auf den Wifi-Stick zugreifen.

Prüft bitte vor einer Verbindung zu dem Adapter noch einmal, ob der Downgrade erfolgreich war und die korrekte Firmware installiert ist.
Der Stick aktualisiert die Firmware nicht automatisch und ist mit der Version 2.033.20 voll funktionsfähig.

Im Adapter müssen die lokale IP-Adresse (nicht die Hotspot IP) und das Passwort des Webinterfaces eingetragen werden, und ihr habt nun eine sekundengenaue lokale Analyse eures Wechselrichters

Aktuell werden im lokalen Modus folgende Umrichter unterstützt:

* X1 mini
* X1 boost
* X3-Hybiyd/Fit
* X3-20K/30K
* X3-MIC/PRO
* X3-Hybrid-G4
* X3-MIC/PRO-G2
* X1-Hybrid-G4
* X1/X3-EVC Wallbox

Wer gerne weitere Umrichter integriert haben möchte, sollte die Datenauswertung des lokalen Requests als Issue zur Verfügung stellen.

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 0.9.17 (2025-04-07)
* (simatec) Dependencies updated
* (simatec) Cleaned up code
* (simatec) migrated to json5

### 0.9.16 (2025-02-22)
* (simatec) Dependencies updated
* (simatec) small fix

### 0.9.15 (2025-01-23)
* (simatec) Fix Request
* (simatec) Code Fix
* (simatec) Dependencies updated

### 0.9.14 (2025-01-08)
* (simatec) eslint-config fix
* (simatec) Code fix
* (simatec) Dependencies updated
* (simatec) License updated

### 0.9.13 (2024-11-27)
* (simatec) Dependencies updated
* (simatec) small Design fix
* (simatec) Issue Action added
* (simatec) eslint-config added

### 0.9.12 (2024-09-26)
* (simatec) Fix for Admin 7.1.5

### 0.9.11 (2024-09-21)
* (simatec) small Design fix

### 0.9.10 (2024-09-17)
* (simatec) small fix
* (simatec) Dependencies updated
* (simatec) Responsive Design added

### 0.9.9 (2024-06-27)
* (simatec) Fix X1-Mini G4

### 0.9.8 (2024-06-27)
* (simatec) Dependencies updated
* (simatec) X1-Mini G4 added

### 0.9.7 (2024-06-19)
* (simatec) Cloud-URL updated
* (simatec) Dependencies updated

### 0.9.6 (2024-02-05)
* (simatec) small Design Fix

### 0.9.5 (2024-02-04)
* (simatec) Dependencies updated
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.4 (2024-01-22)
* (simatec) adapter-dev added
* (simatec) delete Gulp
* (Andre-0815-4711) Data for X1/X3-EVC Wallbox added

### 0.9.3 (2024-01-14)
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Fix Inverter data
* (simatec) Dependencies updated

### 0.9.2 (2024-01-13)
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.1 (2024-01-02)
* (simatec) Fix Inverter data
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Update Docu

### 0.9.0 (2024-01-02)
* (simatec) Cloud URL Check added
* (simatec) X1/X3-EVC added
* (simatec) Inverter Data for X3-Hybrid-G4 updated
* (simatec) Fix Inverter Data for X1 Hybrid G4
* (simatec) Dependencies updated

### 0.8.0 (2023-10-23)
* (simatec) X1-Hybrid-G4 added

### 0.7.7 (2023-09-06)
* (simatec) Dependencies updated
* (simatec) small Bugfix

### 0.7.6 (2023-07-30)
* (simatec) X3-Hybrid-G4 data updated
* (simatec) Dependencies updated
* (simatec) small Bugfix
* (simatec) Ukrainian translation added

### 0.7.5 (2023-05-29)
* (simatec) X3-MIC/PRO-G2 added
* (simatec) small Fix
* (simatec) Dependencies updated

### 0.7.4 (2023-05-04)
* (simatec) connection state added
* (simatec) suncalc package added
* (simatec) change from dawn und dusk calc

### 0.7.3 (2023-05-03)
* (simatec) small Bugfix
* (simatec) X3-Hybrid data added
* (simatec) Dependencies updated

### 0.7.2 (2023-04-27)
* (simatec) small Bugfix

### 0.7.1 (2023-04-27)
* (simatec) small Bugfix

### 0.7.0 (2023-04-26)
* (simatec) Dependencies updated
* (simatec) Config for Firmware Version added
* (simatec) small Bugfix

### 0.6.0 (2023-03-04)
* (simatec) Dependencies updated
* (simatec) Fix URL
* (simatec) small Bugfix

### 0.5.7 (2022-11-01)
* (simatec) Dependencies updated

### 0.5.6 (2022-09-21)
* (simatec) local mode for X1 boost added

### 0.5.5 (2022-09-21)
* (simatec) small Bugfixes

### 0.5.4 (2022-09-20)
* (simatec) small Bugfixes

### 0.5.3 (2022-09-20)
* (simatec) Hybrid-G4 added
* (simatec) small Bugfixes
* (simatec) appveyor test removed
* (simatec) travis test removed

### 0.5.1 (2022-09-13)
* (simatec) feedin added

### 0.5.0 (2022-09-12)
* (simatec) Dependencies updated
* (simatec) small Bugfixes
* (clausmuus) Add support for firmware version 3.001

### 0.4.6 (2022-04-11)
* (simatec) Fix states

### 0.4.5 (2022-04-04)
* (simatec) Dependencies updated
* (simatec) small Bugfixes

### 0.4.4 (2022-03-14)
* (simatec) Dependencies updated
* (simatec) battery data for local request added
* (simatec) night mode turn on/off added

### 0.4.3 (2022-02-03)
* (simatec) refactoring Sourcecode
* (simatec) Dependencies updated
* (simatec) Fix API Request

### 0.4.2 (2022-01-27)
* (simatec) Fix json state

### 0.4.1 (2022-01-26)
* (simatec) Fix react Translatation

### 0.4.0 (2022-01-25)
* (simatec) local request for Wifi Pocket Stick added
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Number of days of history data added
* (simatec) Expert-Mode added
* (simatec) Docu updated
* (simatec) Bugfixes

### 0.3.7 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.6 (2021-08-04)
* (simatec) deps fixed

### 0.3.5 (31.07.2021)
* (simatec) await/async functions fixed

### 0.3.4 (30.07.2021)
* (simatec) code cleanig
* (simatec) await functions fixed

### 0.3.3 (29.07.2021)
* (simatec) Formatted objects
* (simatec) await functions fixed
* (simatec) query interval changed
* (simatec) Dependencies updated

### 0.3.2 (28.07.2021)
* (simatec) fix for latest repo

### 0.3.1 (11.06.2021)
* (simatec) fix for latest repo
* (simatec) API-Token encrypted

### 0.3.0 (09.06.2021)
* (simatec) state settings changed
* (simatec) sentry plugin added
* (simatec) readme added
* (simatec) sunposition added
* (simatec) nightmode added

### 0.2.0 (07.06.2021)
* (simatec) powerdc 1-4 added
* (simatec) battPower added
* (simatec) many small bugfixes

### 0.1.1 (02.06.2021)
* (simatec) small Bugfixes

### 0.1.0 (02.06.2021)
* (simatec) first beta

## License
MIT License

Copyright (c) 2021 - 2025 simatec

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