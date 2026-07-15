---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: wXG9jNeA0kjQfS9C2uI1GqkbLX4/AyELs56eCubif4A=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.bmw.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bmw.svg)
![node-lts](https://img.shields.io/node/v-lts/iobroker.bmw?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.bmw?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/TA2k/iobroker.bmw?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/TA2k/iobroker.bmw?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/TA2k/iobroker.bmw?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/TA2k/iobroker.bmw/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Bekannte Schwachstellen von SNYK](https://snyk.io/test/github/TA2k/ioBroker.bmw/badge.svg)
![Beta](https://img.shields.io/npm/v/iobroker.bmw.svg?color=red&label=beta)
![Stabil](https://iobroker.live/badges/bmw-stable.svg)
![Installiert](https://iobroker.live/badges/bmw-installed.svg)
![NPM](https://nodei.co/npm/iobroker.bmw.png?downloads=true)

<img src="admin/bmw.png" alt="Logo" width="200">

# IoBroker.bmw
## Versionen
## BMW-Adapter für ioBroker
Dieser Adapter integriert BMW-Fahrzeuge in ioBroker mithilfe der neuen BMW CarData API mit OAuth2-Authentifizierung und Echtzeit-MQTT-Streaming. Er ermöglicht die umfassende Überwachung von Fahrzeugdaten für alle mit Ihrem BMW-Konto verknüpften BMW-Modelle.

## Wächter
Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Datenaktualisierung während des Ladevorgangs
Während des Ladevorgangs kann es vorkommen, dass der Akkustand nicht per Stream aktualisiert wird, da sich das Fahrzeug im Schlaf-/Standby-Modus befindet. Beim Einschalten des Fahrzeugs werden die Daten aktualisiert. Sie können eine Aktualisierung über die API `bmw.0.vin.remote.fetchViaAPI` auslösen.

## Datenpunktbeschreibung
Eine detaillierte Beschreibung des Datenpunkts finden Sie hier [telematic.json](telematic.json)

## Installationsanleitung
### 1. BMW ConnectedDrive Portal einrichten
1. Besuchen Sie das BMW ConnectedDrive Portal: **https://www.bmw.de/de-de/mybmw/vehicle-overview** oder https://www.mini.de/de-de/mymini/vehicle-overview
2. Navigieren Sie zum Abschnitt **BMW CarData** (dort sehen Sie verschiedene Servicekategorien).

![BMW Portal – Übersicht](../../../en/adapterref/iobroker.bmw/img/bmw-portal-overview.png)

3. Klicken Sie auf die Schaltfläche **"CarData-Client erstellen"** (CarData-Client erstellen).
4. Kopieren Sie die Client-ID.
5. Warten Sie 30 Sekunden.
6. Klicken Sie auf CarData API.
7. Warten Sie 30 Sekunden.
8. Klicken Sie auf CarData Streaming.

![CarData-Client-Einrichtung](../../../en/adapterref/iobroker.bmw/img/cardata-client-setup.png)

## **WICHTIG**: Klicken Sie auf einen Dienst und warten Sie 30 Sekunden, falls eine Fehlermeldung erscheint. Klicken Sie dann erneut. Klicken Sie nicht auf „Gerät Authentifizieren“. Geben Sie die Client-ID in den iobroker-Einstellungen ein. Falls dies nicht funktioniert, versuchen Sie es mit Kleinbuchstaben.
### 2. CarData-Streaming-Konfiguration
**SIE MÜSSEN CARDATA STREAMING KONFIGURIEREN UND ALLE 244 DATENPUNKTE AUSWÄHLEN**

Nachdem Sie Ihre Client-ID erstellt haben, konfigurieren Sie das Streaming:

1. Suchen Sie im Abschnitt CarData nach **"CARDATA STREAMING"**
2. Der Konfigurationsstatus sollte als **"bereit"** angezeigt werden.
3. Beachten Sie den Zeitstempel „Letztes Konfigurationsupdate“**

![CarData-Streaming-Einrichtung](../../../en/adapterref/iobroker.bmw/img/cardata-streaming-setup.png)

4. Klicken Sie auf die Schaltfläche **"Datenauswahl ändern"**
5. **Alle Kategorien auswählen** (Fahrzeugstatus, Ladevorgang, Fahrtdaten usw.)
6. **Alle 244 einzelnen Datenpunkte manuell prüfen**
7. Oder geben Sie Folgendes in der Google Developer Console ein (F12 drücken): `document.querySelectorAll('label.chakra-checkbox:not([data-checked])').forEach(l => l.click());`
8. Speichern Sie Ihre Konfiguration, indem Sie auf **„Stream löschen“** klicken. Falls nötig, müssen Sie die Konfiguration zurücksetzen und anschließend neu konfigurieren.

**Ohne die Auswahl aller Datenpunkte liefert MQTT-Streaming keine vollständigen Daten!**

### 3. Adapterkonfiguration
1. Geben Sie Ihre **Client-ID** in den Adaptereinstellungen ein.
2. Geben Sie Ihren **CarData Streaming-Benutzernamen** ein (zu finden im BMW Portal unter CarData > Streaming).
3. Wählen Sie Ihre Fahrzeugmarke (BMW, Mini, Toyota Supra)
4. **Aktualisierungsintervall** festlegen (mindestens 10 Minuten aufgrund des API-Kontingents)
5. Konfigurieren Sie bei Bedarf die **VIN-Ignorierliste**.

### 4. Authentifizierungsprozess
1. Schalten Sie den Adapter ein.
2. Überprüfen Sie die Protokolle auf die OAuth2-Autorisierungs-URL.
3. Besuchen Sie die URL und melden Sie sich mit Ihrem BMW-Konto an.
4. Den Antrag genehmigen.
5. Der Adapter fährt nach der Autorisierung automatisch fort.

## Datenstruktur
Die Fahrzeugdaten sind unter `bmw.0.VIN.*` organisiert, wobei `VIN` Ihre Fahrzeugidentifikationsnummer darstellt:

### Hauptordnerstruktur
- **`bmw.0.VIN.api.*`** - API-Daten (regelmäßige Aktualisierungen)
- Daten abgerufen über die BMW CarData REST API via .remote.
- Nutzt das API-Kontingent (50 Aufrufe pro 24 Stunden)

- **`bmw.0.VIN.stream.*`** - Streamdaten (Echtzeit-MQTT)
- Datenempfang über Echtzeit-MQTT-Streaming oder remote.fetchViaAPI
- Sofortige Aktualisierungen bei Änderungen der Fahrzeugdaten
- Beinhaltet alle 244 konfigurierten Datenpunkte

### Verfügbare API-Endpunkte (konfigurierbar)
Sie können diese Endpunkte in den Adaptereinstellungen aktivieren/deaktivieren (BMW CarData API v1):

- `bmw.0.VIN.api.basicData.*` - Fahrzeuginformationen, Modell, Marke, Baureihe ✅ **(Standard: Aktiviert)**
- `bmw.0.VIN.api.chargingHistory.*` - Ladevorgänge und -verlauf ✅ **(Standard: Aktiviert)**
- `bmw.0.VIN.api.image.*` - Fahrzeugbild zur Anzeige
- `bmw.0.VIN.api.locationBasedChargingSettings.*` - Standortspezifische Ladeeinstellungen
- `bmw.0.VIN.api.smartMaintenanceTyreDiagnosis.*` - Intelligentes Reifenwartungssystem: Zustands- und Diagnosefunktion

### Metadaten
- `bmw.0.VIN.lastStreamViaAPIUpdate` - Zeitstempel der letzten Datenaktualisierung (API)
- `bmw.0.VIN.lastStreamUpdate` - Zeitstempel der letzten MQTT-Stream-Aktualisierung

## Echtzeit-Updates
Der Adapter empfängt Echtzeit-Updates per MQTT-Streaming, wenn:

- Das Auto befindet sich nicht im Schlaf-/Standby-Modus.
- Fahrzeugstatusänderungen (Türen, Fenster, Lichter)
- Aktualisierungen des Ladestatus
- Standortänderungen während der Fahrt
- Aktivierung der Klimaanlage
- Servicebenachrichtigungen

## Fernbefehle
**Verfügbare Fernbedienungen:**

Die BMW CarData API ist schreibgeschützt, daher bietet dieser Adapter keine Fahrzeugsteuerungsfunktionen. Für Fernsteuerungsfunktionen verwenden Sie bitte:

**Offizielle BMW Lösungen:**

- **MyBMW Mobile App** - Volle Fernbedienungsfunktionalität
- **BMW ConnectedDrive Portal** - Webbasierte Fahrzeugverwaltung
- **BMW Alexa Skill** - Sprachsteuerungsintegration mit Amazon Alexa für Befehle wie:
- "Alexa, bitte BMW, mein Auto zu verriegeln"
- "Alexa, bitte BMW, die Klimaanlage einzuschalten"
- "Alexa, bitte BMW, meine Lichter blinken zu lassen"

**Fernbedienungen, die in diesem Adapter enthalten sind:**

- `fetchViaAPI` - Ruft die neuesten Telematikdaten über die Container-API ab.
- `basicData` - Fahrzeuggrundinformationen (Modell, Marke, Baureihe) aktualisieren
- `chargingHistory` - Ladevorgänge der letzten 30 Tage abrufen
- `image` - Aktuelles Fahrzeugbild abrufen
- `locationBasedChargingSettings` - Standortbasierte Ladeeinstellungen abrufen
- `smartMaintenanceTyreDiagnosis` - Reifendiagnosedaten abrufen

_Hinweis: Dies sind ausschließlich Datenabrufbefehle – Fahrzeugsteuerungsbefehle werden von der BMW CarData API nicht unterstützt._

## Fehlerbehebung
### Authentifizierungsprobleme (400 Bad Request)
Falls Authentifizierungsfehler auftreten:

1. Überprüfen Sie, ob die CarData-API für Ihre Client-ID aktiviert ist.
2. Stellen Sie sicher, dass CarData Streaming aktiviert ist.
3. Überprüfen Sie, ob alle 244 Datenpunkte ausgewählt sind.
4. Erwägen Sie, Ihre Client-ID neu zu generieren.

### Keine MQTT-Daten
Falls Sie keine Echtzeit-Updates erhalten:

1. Überprüfen Sie, ob CarData Streaming abonniert und aktiv ist.
2. Stellen Sie sicher, dass alle Datenbeschreibungen (244 Punkte) ausgewählt sind.
3. Prüfen Sie, ob Ihr Fahrzeug CarData-Streaming unterstützt.
4. Starten Sie den Adapter nach Änderungen der Deskriptorkonfiguration neu.

### API-Kontingent überschritten
Der Adapter verwaltet das Limit von 50 API-Aufrufen pro 24 Stunden automatisch:

- **Deaktivieren Sie unnötige API-Endpunkte** in den Adaptereinstellungen, um die Kontingentnutzung zu reduzieren.
- Erhöhen Sie das Aktualisierungsintervall, wenn Sie häufig an Ihre Kontingentgrenzen stoßen.
- MQTT-Streaming wird nicht auf das API-Kontingent angerechnet und liefert Echtzeitdaten
- Jeder aktivierte API-Endpunkt verwendet einen Kontingentaufruf pro Aktualisierungsintervall

### Fehlende Daten im API-Ordner
Falls Sie in `VIN.api.*` nicht die erwarteten Daten sehen:

1. Prüfen Sie, ob der entsprechende Endpunkt in den Adaptereinstellungen aktiviert ist.
2. Überprüfen Sie, ob Sie Ihr API-Kontingent überschritten haben (Adapterprotokolle prüfen).
3. Einige Endpunkte sind möglicherweise nicht für alle Fahrzeugtypen verfügbar.
4. Überprüfen Sie die Adapterprotokolle auf spezifische Endpunktfehler (404, 403 usw.).

### Datenquellen verstehen
- **`VIN.api.*`** - Wird regelmäßig basierend auf dem Intervall und den aktivierten Endpunkten aktualisiert
- **`VIN.stream.*`** - Wird in Echtzeit via MQTT aktualisiert, wenn sich Fahrzeugdaten ändern
- **`VIN.lastUpdate`** - Zeitstempel der letzten Datenaktualisierung (API oder MQTT)
- **`VIN.lastStreamUpdate`** - Zeitstempel der letzten MQTT-Stream-Aktualisierung

## Quelle
Dieser Adapter ist erhältlich unter: [https://github.com/TA2k/ioBroker.bmw](https://github.com/TA2k/ioBroker.bmw)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (hombach) updated adapter-core
- (hombach) fixed adapterchecker errors: downgraded @types/node to ^22, added Sentry notice to README, added @iobroker/adapter-dev
- (hombach) replaced native setInterval/setTimeout with adapter-managed equivalents in main.js
- (hombach) moved all jsonConfig.json inline translations to i18n files
- (hombach) updated dependencies

### 5.0.0 (2026-05-17)

- (copilot) BREAKING: Adapter requires node.js >= 22 now
- (hombach) fixed axios vulnerability
- (hombach) removed node 20 tests
- (hombach) added CHANGELOG_OLD.md
- (hombach) updated dependencies

### 4.3.5 (2026-04-11)

- (hombach) fix repo checker warnings
- (hombach) fix vulnerability
- (hombach) update dependencies
- (hombach) remove old admin files

### 4.3.4 (2026-02-28)

- enhance docu and logging
- (hombach) fix vulnerability
- (hombach) update dependencies

### 4.3.3 (2026-01-02)

- (hombach) year 2026 changes
- (hombach) update dependencies

### 4.3.2 (2025-12-15)

- update telemetry ids for container creation
- optimize dependabot config (#209)

### Old Changes see [CHANGELOG OLD](CHANGELOG_OLD.md)

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