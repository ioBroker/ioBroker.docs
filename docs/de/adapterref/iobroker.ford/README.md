---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ford/README.md
title: ioBroker.ford
hash: oqlZLeXYRDuTAUgs++9W9xJncNE80NKLRBmsWfBtE/8=
---
![Logo](../../../en/adapterref/iobroker.ford/admin/ford.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.ford.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ford.svg)
![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/ford-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/ford-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.ford.svg)
![NPM](https://nodei.co/npm/iobroker.ford.png?downloads=true)

# IoBroker.ford
**Tests:** ![Test und Freigabe](https://github.com/TA2k/ioBroker.ford/workflows/Test%20and%20Release/badge.svg)

## Ford-Adapter für ioBroker
Adapter für Ford-Fahrzeuge unter Verwendung der offiziellen FordConnect Query API von Ford (EU-Datenschutzgesetz).

## Verwendung
### Voraussetzungen
Erstellen Sie eine App im Ford-Entwicklerportal unter <https://developer.ford.com/developer-eu>.

Verwenden Sie dieselbe E-Mail-Adresse wie für Ihr FordPass-Konto, legen Sie eine Umleitungs-URI fest (z. B.
`http://localhost:8080/callback`) und notieren Sie sich die generierte Client-ID und das Client-Geheimnis.

### Anmelden
1. Geben Sie Client-ID, Client-Geheimnis und Umleitungs-URI in den Adaptereinstellungen ein und speichern Sie die Einstellungen.
2. Starten Sie den Adapter – er gibt eine Anmelde-URL im Protokoll aus.
3. Öffnen Sie die URL in Ihrem Browser, melden Sie sich mit Ihrem FordPass-Konto an und autorisieren Sie die App.
4. Sie werden mit dem Parameter `?code=...` zu Ihrer Redirect-URI weitergeleitet.
5. Kopieren Sie die vollständige Weiterleitungs-URL aus der Adressleiste Ihres Browsers.
6. Fügen Sie die URL in das Feld „Code-URL“ in den Adaptereinstellungen ein, speichern Sie die Einstellungen und starten Sie den Adapter neu.

Der Adapter tauscht den Code gegen Tokens, speichert die Sitzung und aktualisiert sie automatisch.

### Daten
- `{VIN}.general` - Fahrzeuginformationen vom Werkstatt-Endpunkt
- `{VIN}.telemetry` - Telemetriedaten (SoC, Reichweite, Kilometerzähler, Standort, Reifendruck usw.)
- `{VIN}.vehicleHealthAlerts` - Fahrzeugzustandswarnungen
- `{VIN}.wallbox` - Wallbox-Daten (nur für Elektrofahrzeuge, falls verfügbar)
- `{VIN}.departureTimes` - Abfahrtszeiten für Elektrofahrzeuge (nur für Elektrofahrzeuge, falls verfügbar)
- `{VIN}.chargeSchedules` - Ladepläne für Elektrofahrzeuge (nur für Elektrofahrzeuge, falls verfügbar)
- `{VIN}.remote.refresh` - Schaltfläche zum sofortigen Abrufen der Daten

Endpunkte, die für ein Fahrzeug nicht verfügbar sind, werden stillschweigend übersprungen.
Die FordConnect-Abfrage-API ist schreibgeschützt, daher sind keine Befehle für Motor, Verriegelung oder Ladevorgang verfügbar.

### Konfigurationsoptionen
- **Client-ID / Client-Geheimnis**: Anmeldeinformationen aus dem Ford-Entwicklerportal
- **Umleitungs-URI**: Muss mit der im Entwicklerportal registrierten URI übereinstimmen.
- **Abfrageintervall**: Zeit in Minuten zwischen automatischen Telemetrieabfragen (Standard: 15)

Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst, der Entwicklern einen Überblick über Fehler in ihren Anwendungen bietet. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH die Erlaubnis erteilt haben, Diagnosedaten zu erfassen, wird auch Ihre Installations-ID (eine zufällig generierte, eindeutige ID ohne weitere Informationen) übermittelt. Dadurch kann Sentry Fehler gruppieren und die Anzahl der betroffenen Benutzer anzeigen. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Changelog

### 2.0.1 (2026-07-25)

- Switch to Ford's official FordConnect Query API (EU Data Act)
- Remove reverse-engineered FordPass login, Autonomic token and WebSocket to avoid account blocking
- Read-only telemetry: remote commands removed

### 1.1.5 (2025-12-29)

- update API headers to match latest FordPass app
- fix checkbox display in adapter configuration UI

### 1.1.4 (2025-12-27)

- fix login flow

### 1.0.5 (2024-07-09)

- Add location update option to reduce update requests

### 1.0.3 (2024-06-22)

- improve help text

### 1.0.2 (2024-05-24)

- improved failed login

### 1.0.0 (2024-05-24)

- added new login flow and public api. All new Datapoints

### 0.2.3 (2024-05-17)

- reverted domain ending setting to fix login

### 0.2.1 (2024-05-10)

- fixed login and added domain ending in settings

### 0.2.0

- Login Fix

### 0.0.14

- Improvements to prevent blocking from Ford

### 0.0.13

- removed not working detail api

### 0.0.12

- fix login

### 0.0.11

- fix login

### 0.0.8

- (TA2k) add remote control for refresh

### 0.0.7

- (TA2k) initial release

## License

MIT License

Copyright (c) 2021-2026 TA2k <tombox2020@gmail.com>

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