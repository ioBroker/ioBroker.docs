---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: xF9K+twXSSsRjQblkO/bs0evJUr4bRoAZwa4pUEwSJg=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bambulab-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bambulab-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="Logo" width="200"/>

# IoBroker.bambulab
**Tests:** ![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Bambulab 3D-Druck-Adapter für ioBroker
## Erste Schritte
Mit Credits an [kmxak](https://forum.iobroker.net/user/kmxak), [djalexz](https://forum.iobroker.net/user/djalexz), alle anderen Beteiligten und inspiriert von [diesem Forenthread](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) integriert dieser Adapter Bambulab 3D-Drucker in ioBroker.

Bitte geben Sie in den Adaptereinstellungen die IP-Adresse Ihres Druckers, das API-Token und die Seriennummer ein. Diese sind für eine lokale Verbindung (ohne Cloud) zu Ihrem Drucker erforderlich.
Diese Anmeldeinformationen werden lokal gespeichert und nicht an Dritte weitergegeben.

Sie müssen Ihr Druckermodell auswählen, nur der X1 ermöglicht das Senden von Nachrichten, die P1x-Serie erfordert eine Anforderung per Intervalleinstellung (Standard alle 5 Sekunden).

## Unterstützte Modelle
| Druckermodell | Status |
|---------------|-------------------------|
| AMS | :white_check_mark: |
| A1 | :white_check_mark: |
| P1p | :white_check_mark: |
| P1s | :white_check_mark: |
| X1 | :white_check_mark: |

## Unterstützte Befehle
| Befehl | X1C | X1 | P1P | P1S | A1 |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
| Benutzerdefinierter G-Code | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Pause | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Lebenslauf | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Stopp | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Fan-Aux | :white_check_mark: | :white_check_mark: | :interrobang: falls vorhanden | :white_check_mark: | :x: Keine Hardwareunterstützung |
| Ventilatorkammer | :white_check_mark: | :white_check_mark: | :interrobang: falls vorhanden | :white_check_mark: | :x: Keine Hardwareunterstützung |
| Fan-ToolHead | :white_check_mark: | :white_check_mark: | :interrobang: falls vorhanden | :white_check_mark: | :white_check_mark: |
| Lichtkammer | :white_check_mark: | :white_check_mark: | :interrobang: falls vorhanden | :white_check_mark: | :white_check_mark: |
| Licht-Logo | :white_check_mark: | :white_check_mark: | :x: Keine Hardwareunterstützung | :x: Keine Hardwareunterstützung | :x: Keine Hardwareunterstützung |
| Temperaturbett | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Temperatur-Düse | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Geschwindigkeitsstufe | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

## Machen
[ ] Aktuelle Kontrollzustände im Kontrollordner neu strukturieren/vervollständigen. [ ] Zustandsattributdefinitionen optimieren

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, ziehen Sie bitte eine persönliche Spende in Betracht (dies ist ein persönlicher Spendenlink für DutchmanNL, kein Bezug zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, um einen Überblick über Fehler in ihren Anwendungen zu erhalten. Und genau das ist in diesem Adapter umgesetzt.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt.
Wenn Sie der iobroker GmbH erlauben, Diagnosedaten zu sammeln, wird auch Ihre Installations-ID (dies ist nur eine eindeutige ID **ohne** zusätzliche Informationen über Sie, E-Mail, Name oder ähnliches) enthalten.
Dadurch kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind.
All dies hilft mir, fehlerfreie Adapter bereitzustellen, die grundsätzlich nie abstürzen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.2 (2023-11-20)
* (DutchmanNL) Show finish time as ISO string

### 0.3.1 (2023-11-20)
* (DutchmanNL) Bugfix control P & A Series
* (DutchmanNL) Show end time as a separate state, resolves #53
* (DutchmanNL) Bugfix resolves missing fan speed value, resolves #36

### 0.3.0 (2023-11-19) - Release candidate
* (DutchmanNL) Update dependencies for state handling, resolves #50
* (DutchmanNL) Adjust log level for Unknown Message from error to debug, resolves #39
* (DutchmanNL) Add missing definitions to ensure correct creation of states, resolves #39
* (DutchmanNL) Reduce selection dropdown in admin config to printer series instead of a specific printer type
* (DutchmanNL) Update adapter code to support new firmware versions released by bambulab, please ensure your printer is up-to-date! resolves #46, resolves #38, resolves #26,

### 0.2.0 (2023-10-18) - Small fixes for new firmware version
* (DutchmanNL) Button for homing added, fixes #28
* (DutchmanNL) Bugfix: Translation of HMS-Error codes
* (DutchmanNL) Several bugfixes for situations no AMS is used
* (DutchmanNL) Remove control for LED calibration head (could damage hardware)

### 0.1.5 (2023-07-29) - HMS error codes Human readable, new functionalities added
#### Several state locations have been changed, advise to completely remove adapter & reinstall to upgrade
* (DutchmanNL) State for human-readable start time added
* (DutchmanNL) Speed level control implemented solves #10
* (DutchmanNL) Capability to control all fans implemented
* (DutchmanNL) Control bed & Nozzle temperature implemented
* (DutchmanNL) HMS error status indicator states implemented
* (DutchmanNL) Translations of HMS error codes implemented solves #9
* (DutchmanNL) Correct definitions for all temperature-related states
* (DutchmanNL) Control LED for tooling head Logo and calibration unit

### 0.1.4 (2023-07-28) - Support P1-series
* (DutchmanNL) Configuration page in admin updated
* (DutchmanNL) Information messages regarding incorrect type of bed-temperatures solved
* (DutchmanNL) Implemented P1-X printer series, polling interval required for this model (only X1 handles data push)

### 0.1.3 (2023-07-27) - Add new control options
* (DutchmanNL) add control for chamber fan, tooling head light and allow custom g-code

### 0.1.1 - Minor improvements
* (DutchmanNL) Translations added
* (DutchmanNL) Debug logging improved
* (DutchmanNL) Minor code improvements
* (DutchmanNL) Control states implemented
* (DutchmanNL) Test & release workflows updated
* (DutchmanNL) Encryption of token and device serial improved

### 0.1.0 initial release
* (DutchmanNL) initial release
* During startup adapter throws warnings, these can be ignored and will be solved in =< 0.5.0
* Control start/stop/resume and light available in >= 0.1.1

## License
MIT License

Copyright (c) 2023 DutchmanNL <oss@drozmotix.eu>

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