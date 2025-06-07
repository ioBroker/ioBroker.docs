---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: Z+Gz0BFzpoYSG/LsgdOZ7/JEJkNp4KJJA4Jciqk4Te4=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.bmw.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![Knoten-lts](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![GitHub-Repo-Größe](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Letzter GitHub-Commit](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Bekannte SNYK-Sicherheitslücken](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/bmw-stable.svg)
![Installiert](https://iobroker.live/badges/bmw-installed.svg)
![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="Logo" width="200">

# IoBroker.bmw
## Versionen
# BMW Adapter für ioBroker
Dieser Adapter integriert BMW-Fahrzeuge nahtlos in ioBroker und ermöglicht Ihnen die Überwachung und Steuerung Ihres BMW direkt über die ioBroker-Plattform. Er ruft Daten aller BMW-Modelle ab, die über die offizielle BMW-App mit Ihrem BMW-Konto verknüpft sind, und aktualisiert diese. Er stellt Fahrzeugeigenschaften bereit und unterstützt Fernsteuerungen.

## Merkmale
- Ruft BMW-Fahrzeugdaten vom BMW ConnectedDrive-Dienst ab und aktualisiert sie.
- Aktiviert Remote-Befehle für Ihren BMW unter „bmw.0.VIN.remotev2“.

## Anmeldevorgang
1. Geben Sie in den Instanzoptionen Ihre Anmeldedaten für das BMW-Konto ein und schließen Sie die CAPTCHA/reCAPTCHA-Verifizierung ab, wenn Sie dazu aufgefordert werden.
2. Wählen Sie Ihren Fahrzeugtyp.
3. Da das API-Kontingent begrenzt ist, können Sie das Abrufen bestimmter Statistiken deaktivieren, um die Nutzung zu optimieren.
4. Legen Sie ein Aktualisierungsintervall fest, das Ihrem Datenbedarf entspricht. Möglicherweise sind einige Versuche erforderlich, um das maximale Kontingent einzuhalten.
5. Um das Kontingent zu erhöhen, können Sie optional ein zweites Benutzerkonto hinzufügen.
6. Erste Daten können nach einer kurzen Verzögerung oder nach der ersten Aktivität des Fahrzeugs (z. B. einer Fahrt) erscheinen.

## Datenstruktur
Fahrzeugspezifische Daten sind unter `bmw.0.VIN.properties` abrufbar, wobei `VIN` die Fahrzeugidentifikationsnummer Ihres BMW darstellt.

## Remote-Befehle
Die Fernsteuerung Ihres BMW ist unter `bmw.0.VIN.remotev2` verfügbar. Unterstützte Aktionen können je nach BMW Modell und ConnectedDrive-Funktionen das Ver- und Entriegeln von Türen, das Aktivieren der Klimaanlage oder das Auslösen anderer Fahrzeugfunktionen sein.

*Hinweis: Die verfügbaren Felder und Remote-Funktionen variieren je nach BMW-Modell und ConnectedDrive-API.*

## Quelle
Dieser Adapter ist erhältlich unter: [https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

### **WORK IN PROGRESS**

- BREAKING: Dropped support for Node.js 18 (#88)
- (hombach) BREAKING: Dropped support for js-controller 5 (#111)
- (hombach) BREAKING: change to admin 7.4.10 as recommended by ioBroker (#111)
- (hombach) encrypt and protect second user password - has to be reentered (#111)
- (hombach) bump dependencies

### 2.9.5 (2025-05-18)

- (hombach) update axios
- (hombach) fixing issues detected by repository checker (#88)
- (hombach) some small code cleanups/modernisations
- (hombach) add/translate description
- (hombach) update logo

### 2.9.4 (2025-02-26)

- fix for Mitbenutzer Feature

### 2.9.3 (2025-01-29)

- fix remote controls
- add Mitbenutzer Login for remote controls

### 2.9.0 (2024-11-28)

- added new remotes as switch and updated values
- added retry logic for remotes

### 2.8.4 (2024-11-21)

- improved charging session parsing
- added remote to fetch charging session from a specific month
- added raw JSON of charging session for export

### 2.8.3 (2024-11-18)

- login fixed

### 2.8.2 (2024-10-05)

- fix error getvehicles v2 failed

### 2.8.1 (2024-09-30)

- fix remote commands

### 2.7.1

- Bugfixes

### 2.5.5

- Fix login

### 2.5.0

- Fix login

### 2.4.1

- Add support for MINI and force refresh remote

### 2.3.0

- Disable v1 Endpoints

### 2.1.1

- Upgrade to statusV2 and remoteV2

### 2.0.0

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2025 TA2k <tombox2020@gmail.com>

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