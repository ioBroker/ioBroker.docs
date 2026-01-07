---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ford/README.md
title: ioBroker.ford
hash: SwGh8ZuY/WUsnCeKE3ij6c8GDYf4Vseu3KQ/2C5ivuE=
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
Adapter für FordPass

## Verwendung
### OAuth 2.0-Anmeldung
Der Adapter verwendet OAuth 2.0-Authentifizierung. Führen Sie die folgenden Schritte zur Authentifizierung aus:

1. Starten Sie den Adapter – er zeigt eine Authentifizierungs-URL im Protokoll an.
2. **WICHTIG: Öffnen Sie die Entwicklertools (F12), BEVOR Sie auf die Anmelde-URL klicken.**
3. Wechseln Sie in den Entwicklertools zum Tab „Netzwerk“.
4. Kopieren Sie die OAuth-URL aus dem Protokoll und fügen Sie sie in Ihren Browser ein.
5. Melden Sie sich mit Ihren Ford-Kontodaten an.
6. Nach dem Login zeigt der Browser die Meldung „Seite kann nicht geöffnet werden“ an – das ist normal.
7. Suchen Sie auf der Registerkarte „Netzwerk“ die fehlgeschlagene Anfrage mit der roten URL, die mit `fordapp://userauthorized/?code=` beginnt.
8. Kopieren Sie die vollständige URL aus der Registerkarte „Netzwerk“.
9. Fügen Sie die URL in das Feld „v2 Code URL“ in den Adaptereinstellungen ein.
10. Speichern und Adapter neu starten

### Fernbedienungen
Der Adapter erzeugt Fernbedienungstasten für jedes Fahrzeug unter `{VIN}.remote.*`:

- **engine/start**: Motor starten oder stoppen (true = starten, false = stoppen)
- **Türen/Schloss**: Türen verriegeln oder entriegeln (true = verriegeln, false = entriegeln)
- **Status**: Fordert eine aktuelle Statusaktualisierung vom Fahrzeug an (sendet den Befehl statusRefresh)
- **Aktualisieren**: Aktualisiert die zwischengespeicherten Daten, ohne einen Befehl an das Fahrzeug zu senden.

### Konfigurationsoptionen
- **Aktualisierungsintervall**: Zeit in Minuten zwischen automatischen Datenaktualisierungen (Standard: 5 Minuten)
- **Standortaktualisierung**: Standortaktualisierungen aktivieren/deaktivieren. Durch Deaktivieren werden kürzere Aktualisierungsintervalle ermöglicht und der Akkuverbrauch reduziert.
- **Aktualisierung erzwingen**: Automatische Statusaktualisierung in jedem Intervall aktivieren (WARNUNG: Kann die 12-V-Batterie entladen. Nur aktivieren, wenn Ihr Fahrzeug diesen Befehl unterstützt).
- **12-V-Prüfung überspringen**: Deaktivieren Sie die 12-V-Batterieprüfung bei Verwendung von „Update erzwingen“.

### Batterieschutz
Der Adapter fragt standardmäßig in regelmäßigen Abständen zwischengespeicherte Fahrzeugdaten ab. Um aktuelle Daten vom Fahrzeug anzufordern, haben Sie folgende Möglichkeiten:

- Aktivieren Sie die Option "Update erzwingen" (nur wenn Ihr Fahrzeug dies unterstützt)
- Verwenden Sie die Schaltfläche `{VIN}.remote.status` manuell

**Hinweis:** Einige Fahrzeuge unterstützen den Befehl `statusRefresh` möglicherweise nicht und geben einen 404-Fehler zurück – dies ist normal. Deaktivieren Sie in diesem Fall „Aktualisierung erzwingen“ und verwenden Sie stattdessen die Schaltfläche `refresh`.

## Changelog

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

Copyright (c) 2021-2030 TA2k <tombox2020@gmail.com>

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