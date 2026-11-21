---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bmw/README.md
title: ioBroker.bmw
hash: uc8/ZDSKvcDBas1kQfL7/JlJX+tkarFmbZSHwLt62QM=
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

# ioBroker.bmw

## Versionen

## BMW-Adapter für ioBroker

Dieser Adapter integriert BMW-Fahrzeuge in ioBroker mithilfe der neuen BMW CarData API mit OAuth2-Authentifizierung und Echtzeit-MQTT-Streaming. Er ermöglicht die umfassende Überwachung von Fahrzeugdaten für alle mit Ihrem BMW-Konto verknüpften BMW-Modelle.

## Sentry

Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden. Weitere Informationen und Hinweise zum Deaktivieren der Fehlerberichterstattung finden Sie in der [Dokumentation des Sentry-Plugins](https://github.com/ioBroker/plugin-sentry#plugin-sentry) !

## Datenaktualisierung während des Ladevorgangs

Während des Ladevorgangs kann es vorkommen, dass der Akkustand nicht per Stream aktualisiert wird, da sich das Fahrzeug im Schlaf-/Standby-Modus befindet. Beim Einschalten des Fahrzeugs werden die Daten aktualisiert. Sie können eine Aktualisierung über die API auslösen. `bmw.0.vin.remote.fetchViaAPI`

## Datenpunktbeschreibung

Eine detaillierte Beschreibung der Datenpunkte finden Sie hier: [telematic.json](https://github.com/TA2k/ioBroker.bmw/blob/master/telematic.json)

## Einrichtungsanleitung

### 1. BMW ConnectedDrive Portal einrichten

1. Besuchen Sie das BMW ConnectedDrive Portal: **<https://www.bmw.de/de-de/mybmw/vehicle-overview>** oder <https://www.mini.de/de-de/mymini/vehicle-overview>
2. Navigieren Sie zum Bereich **BMW CarData** (dort sehen Sie verschiedene Servicekategorien).

![BMW Portal – Übersicht](../../../en/adapterref/iobroker.bmw/img/bmw-portal-overview.png)

3. Klicken Sie auf die Schaltfläche **„CarData-Client erstellen“** .
4. Kopieren Sie die Client-ID.
5. Warten Sie 30 Sekunden
6. Klicken Sie auf CarData API
7. Warten Sie 30 Sekunden
8. Klicken Sie auf CarData Streaming

![CarData-Client-Einrichtung](../../../en/adapterref/iobroker.bmw/img/cardata-client-setup.png)

## **WICHTIG** : Klicken Sie auf einen Dienst und warten Sie 30 Sekunden, falls eine Fehlermeldung erscheint. Klicken Sie dann erneut. Klicken Sie nicht auf „Gerät Authentifizieren“. Geben Sie die Client-ID in den iobroker-Einstellungen ein. Falls dies nicht funktioniert, versuchen Sie es mit Kleinbuchstaben.

### 2. CarData-Streaming-Konfiguration

**SIE MÜSSEN CARDATA STREAMING KONFIGURIERN UND ALLE 244 DATENPUNKTE AUSWÄHLEN**

Nachdem Sie Ihre Client-ID erstellt haben, konfigurieren Sie das Streaming:

1. Suchen Sie im Abschnitt CarData nach **„CARDATA STREAMING“.**
2. Der Konfigurationsstatus sollte als **„bereit“** angezeigt werden.
3. Beachten Sie den Zeitstempel **„Letztes Konfigurationsupdate“** .

![CarData-Streaming-Einrichtung](../../../en/adapterref/iobroker.bmw/img/cardata-streaming-setup.png)

4. Klicken Sie auf die Schaltfläche **„Datenauswahl ändern“** .
5. **Wählen Sie ALLE Kategorien aus** (Fahrzeugstatus, Ladevorgang, Fahrtdaten usw.).
6. **Überprüfen Sie alle 244 einzelnen Datenpunkte manuell.**
7. Oder geben Sie dies in der Google Developer Console ein und drücken Sie F12. `document.querySelectorAll('label.chakra-checkbox:not([data-checked])').forEach(l => l.click());`
8. Speichern Sie Ihre Konfiguration, indem Sie gegebenenfalls auf **„Stream löschen“** klicken, um sie zurückzusetzen, und konfigurieren Sie sie anschließend neu.

**Ohne die Auswahl aller Datenpunkte liefert MQTT-Streaming keine vollständigen Daten!**

### 3. Adapterkonfiguration

1. Geben Sie Ihre **Client-ID** in den Adaptereinstellungen ein.
2. Wählen Sie Ihre **Fahrzeugmarke** (BMW, Mini, Toyota Supra)
3. **Aktualisierungsintervall** festlegen (mindestens 10 Minuten aufgrund des API-Kontingents)
4. Konfigurieren Sie bei Bedarf **die Liste der zu ignorierenden Fahrgestellnummern.**

### 3a. Optionale Live-Telemetrie von ABRP (A Better Route Planner).

Der Adapter kann Telemetriedaten der BMW-Hochvoltbatterie ohne OBD-Dongle an ABRP weiterleiten. Diese Funktion ist standardmäßig deaktiviert und erzeugt keine zusätzlichen BMW-API-Aufrufe. Sie verwendet ausschließlich aktuelle Daten, die der Adapter bereits über BMW MQTT-Streaming oder die konfigurierte Telematikaktualisierung empfängt. Die primäre SoC-Datenquelle ist `vehicle.drivetrain.batteryManagement.header`; `vehicle.powertrain.electric.battery.stateOfCharge.displayed` wird als Kompatibilitäts-Fallback verwendet.

Sie benötigen zwei ABRP-Zugangsdaten:

1. Erstellen Sie einen kostenlosen **Telemetry-API-Schlüssel** unter <https://abetterrouteplanner.com/home/app/api-keys/telemetry> .
2. In ABRP speichern/wählen Sie Ihr Fahrzeug aus, öffnen Sie die Live-Dateneinstellungen, verknüpfen Sie den **generischen** Anbieter und kopieren Sie das fahrzeugspezifische Token.
3. Aktivieren Sie ABRP in den BMW-Adaptereinstellungen und geben Sie den Telemetrie-API-Schlüssel ein.
4. Fügen Sie pro Fahrzeug eine Zeile mit der BMW-Fahrzeugidentifikationsnummer (VIN) und dem entsprechenden ABRP-Generic-Token hinzu.
5. Speichern/starten Sie die Instanz neu und warten Sie auf ein aktuelles BMW SoC-Update.

Es werden nur diese Werte übertragen:

- `soc`: Aktueller Ladezustand der Hochvoltbatterie in Prozent
- `utc`: Originaler BMW-Messzeitstempel
- `is_charging`: `1` während des aktiven Ladevorgangs, ansonsten `0`
- `is_dcfc`: `1` für Gleichstromladung und `0` Für Wechselstrom, wird nur während des Ladevorgangs gesendet.
- `est_battery_range` Verbleibende elektrische Reichweite in Kilometern

Der Adapter sendet weder die Fahrzeugidentifikationsnummer (VIN), den Standort, die Geschwindigkeit, die Route noch den Fahrverlauf an ABRP. API-Schlüssel und generische Token werden als geschützte, verschlüsselte Einstellungen gespeichert und niemals in Adapterstatus oder Protokolle geschrieben.

Die ABRP-Konfiguration erfordert ioBroker Admin 8.2.0 oder neuer, damit die Fahrzeugtoken in der Konfigurationstabelle korrekt verschlüsselt und entschlüsselt werden. Installationen, die von der älteren Doppelverschlüsselungskonfiguration betroffen sind, werden zur Laufzeit wiederhergestellt. Geben Sie nach dem Update jedes generische Token erneut ein und speichern Sie es, um die gespeicherten Einstellungen zu migrieren.

Der ABRP-Telemetrie-API-Schlüssel wird in den v1-APIs übertragen. `Authorization: APIKEY ...` Im Header werden lediglich das fahrzeugspezifische generische Token und die Telemetrie-JSON-Daten als URL-codierte Anfrageparameter gesendet; der API-Schlüssel ist nicht in der Anfrage-URL enthalten.

ABRP erlaubt maximal zwei Telemetrieanfragen pro Sekunde und API-Schlüssel. Der Adapter wendet einen gemeinsamen Limiter auf alle konfigurierten Fahrzeuge, Wiederholungsversuche und manuelle Sendevorgänge an. Wenn BMW MQTT einen Burst sendet, werden ältere, noch nicht gesendete Werte durch die neuesten SoC-Werte für die jeweilige Fahrgestellnummer ersetzt, anstatt unbegrenzt in der Warteschlange zu bleiben.

Der Status ist unten verfügbar. `bmw.0.VIN.abrp.*` Diese Objekte werden aus der lokalen ABRP-Konfiguration vor der BMW-Fahrzeugerkennung erstellt und stehen daher auch dann zur Verfügung, wenn das BMW REST-Kontingent erschöpft ist. `lastAttempt` protokolliert eine ausgehende Anfrage, `lastSuccess` Und `lastSoc` werden erst aktualisiert, nachdem ABRP sie akzeptiert hat, und `lastError` Enthält den HTTP-Status sowie, falls verfügbar, die bereinigte Fehlermeldung von ABRP. Der Adapter protokolliert außerdem die erste akzeptierte Aktualisierung auf Informationsebene und abgelehnte Aktualisierungen auf Warnebene. `sendNow` Die Schaltfläche sendet lediglich einen zwischengespeicherten, noch aktuellen SoC erneut und löst niemals eine BMW API-Anfrage aus. Die Verfügbarkeit von „Live“ ist weiterhin davon abhängig, wann BMW CarData einen neuen SoC veröffentlicht; ein Fahrzeug im Ruhemodus wird möglicherweise nicht sofort aktualisiert.

Nach jedem Start des Adapters wird der zuletzt gültige gespeicherte SoC-Wert einmalig als aktueller Initialisierungswert gesendet. Dadurch kann die ABRP-Verbindung getestet werden, während sich das Fahrzeug im geparkten Zustand oder im Ruhemodus befindet. Dieser einmalige Startwert verwendet die Sendezeit als `utc` Alle späteren Live-Updates verwenden den ursprünglichen BMW-Messzeitstempel und müssen die übliche Aktualitätsprüfung bestehen. Für den Seed wird kein zusätzlicher BMW-API-Aufruf durchgeführt.

### 4. Authentifizierungsprozess

1. Schalten Sie den Adapter ein.
2. Überprüfen Sie die Protokolle auf die OAuth2-Autorisierungs-URL.
3. Besuchen Sie die URL und melden Sie sich mit Ihrem BMW-Konto an.
4. Autorisieren Sie die Anwendung
5. Der Adapter wird nach der Autorisierung automatisch fortgesetzt.

## Datenstruktur

Fahrzeugdaten sind organisiert unter `bmw.0.VIN.*` Wo `VIN` steht für Ihre Fahrzeugidentifikationsnummer:

### Hauptordnerstruktur

- ** `bmw.0.VIN.api.*` ** - API-Daten (regelmäßige Aktualisierungen)
  - Die Daten wurden über die BMW CarData REST API via .remote abgerufen.
  - Nutzt das API-Kontingent (50 Aufrufe pro 24 Stunden).

- ** `bmw.0.VIN.stream.*` ** - Streamdaten (Echtzeit-MQTT)
  - Daten, die über Echtzeit-MQTT-Streaming oder remote.fetchViaAPI empfangen werden.
  - Sofortige Aktualisierungen bei Änderungen der Fahrzeugdaten
  - Beinhaltet alle 244 konfigurierten Datenpunkte

### Verfügbare API-Endpunkte (konfigurierbar)

Sie können diese Endpunkte in den Adaptereinstellungen aktivieren/deaktivieren (BMW CarData API v1):

- `bmw.0.VIN.api.basicData.*` - Fahrzeuginformationen, Modell, Marke, Baureihe ✅ **(Standard: Aktiviert)**
- `bmw.0.VIN.api.chargingHistory.*` - Ladevorgänge und Verlauf ✅ **(Standard: Aktiviert)**
- `bmw.0.VIN.api.image.*` - Fahrzeugbild dient nur zu Darstellungszwecken
- `bmw.0.VIN.api.locationBasedChargingSettings.*` - Standortspezifische Ladepräferenzen und -einstellungen
- `bmw.0.VIN.api.smartMaintenanceTyreDiagnosis.*` - Intelligentes Reifenwartungssystem und Reifendiagnose

### Metadaten

- `bmw.0.VIN.lastStreamViaAPIUpdate` - Zeitstempel der letzten Datenaktualisierung (API)
- `bmw.0.VIN.lastStreamUpdate` - Zeitstempel der letzten Aktualisierung des MQTT-Streams

## Echtzeit-Updates

Der Adapter empfängt Echtzeit-Updates per MQTT-Streaming, wenn:

- Das Auto befindet sich nicht im Schlaf-/Standby-Modus.
- Fahrzeugstatusänderungen (Türen, Fenster, Lichter)
- Aktualisierungen zum Ladestatus
- Standortänderungen während der Fahrt
- Klimaanlagenaktivierung
- Servicebenachrichtigungen

## Fernbefehle

**Verfügbare Fernbedienungen:**

Die BMW CarData API ist schreibgeschützt, daher bietet dieser Adapter keine Fahrzeugsteuerungsfunktionen. Für Fernsteuerungsfunktionen verwenden Sie bitte:

**Offizielle BMW Lösungen:**

- **MyBMW Mobile App** – Volle Fernbedienungsfunktionalität
- **BMW ConnectedDrive Portal** – Webbasierte Fahrzeugverwaltung
- **BMW Alexa Skill** – Sprachsteuerungsintegration mit Amazon Alexa für Befehle wie:
  - „Alexa, bitte BMW, mein Auto zu verriegeln.“
  - "Alexa, bitte BMW, die Klimaanlage einzuschalten."
  - "Alexa, bitte BMW, meine Lichter blinken zu lassen."

**In diesem Adapter verfügbare Fernbedienungen:**

- `fetchViaAPI` - Aktuelle Telematikdaten über die Container-API abrufen
- `basicData` - Fahrzeuggrundinformationen aktualisieren (Modell, Marke, Baureihe)
- `chargingHistory` - Ladevorgänge der letzten 30 Tage abrufen
- `image` - Aktuelles Fahrzeugbild abrufen
- `locationBasedChargingSettings` - Standortbasierte Ladepräferenzen abrufen
- `smartMaintenanceTyreDiagnosis` - Reifendiagnosedaten abrufen

_Hinweis: Dies sind ausschließlich Datenabrufbefehle – Fahrzeugsteuerungsbefehle werden von der BMW CarData API nicht unterstützt._

## Fehlerbehebung

### Authentifizierungsprobleme (400 Bad Request)

Falls Authentifizierungsfehler auftreten:

1. Überprüfen Sie, ob die CarData-API für Ihre Client-ID aktiviert ist.
2. Stellen Sie sicher, dass CarData Streaming aktiviert ist.
3. Prüfen Sie, ob alle 244 Datenpunkte ausgewählt sind.
4. Erwägen Sie, Ihre Client-ID neu zu generieren.

### Keine MQTT-Daten

Falls Sie keine Echtzeit-Updates erhalten:

1. Überprüfen Sie, ob CarData Streaming abonniert und aktiv ist.
2. Stellen Sie sicher, dass alle Datendeskriptoren (244 Punkte) ausgewählt sind.
3. Prüfen Sie, ob Ihr Fahrzeug CarData-Streaming unterstützt.
4. Starten Sie den Adapter nach Änderungen der Deskriptorkonfiguration neu.

### API-Kontingent überschritten

Der Adapter verwaltet das Limit von 50 API-Aufrufen pro 24 Stunden automatisch:

- **Deaktivieren Sie unnötige API-Endpunkte** in den Adaptereinstellungen, um die Kontingentnutzung zu reduzieren.
- Erhöhen Sie das Aktualisierungsintervall, wenn Sie häufig an Ihre Kontingentgrenzen stoßen.
- MQTT-Streaming wird nicht auf das API-Kontingent angerechnet und liefert Echtzeitdaten.
- Jeder aktivierte API-Endpunkt verwendet einen Kontingentaufruf pro Aktualisierungsintervall

### Fehlende Daten im API-Ordner

Wenn Sie die erwarteten Daten nicht sehen in `VIN.api.*`:

1. Prüfen Sie, ob der entsprechende Endpunkt in den Adaptereinstellungen aktiviert ist.
2. Prüfen Sie, ob Sie Ihr API-Kontingent überschritten haben (Adapterprotokolle prüfen).
3. Einige Endpunkte sind möglicherweise nicht für alle Fahrzeugtypen verfügbar.
4. Prüfen Sie die Adapterprotokolle auf spezifische Endpunktfehler (404, 403 usw.).

### Datenquellen verstehen

- ** `VIN.api.*` ** - Wird regelmäßig basierend auf dem Intervall und den aktivierten Endpunkten aktualisiert
- ** `VIN.stream.*` ** - Aktualisierung in Echtzeit via MQTT bei Änderungen der Fahrzeugdaten
- ** `VIN.lastUpdate` ** - Zeitstempel der letzten Datenaktualisierung (API oder MQTT)
- ** `VIN.lastStreamUpdate` ** - Zeitstempel der letzten Aktualisierung des MQTT-Streams

## Quelle

Dieser Adapter ist verfügbar unter: <https://github.com/TA2k/ioBroker.bmw>

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 5.0.6 (2026-11-18)

- (hombach) report MQTT as connected only after a successful subscription acknowledgement
- (TA2k) add optional ABRP live telemetry using per-vehicle Generic tokens
- (TA2k) send charging state, DC charging state, and estimated electric range alongside SoC
- (TA2k) enforce the ABRP limit of two requests per second and API key across all vehicles and retries
- (TA2k) encrypt and protect ABRP credentials and expose sanitized delivery status states
- (TA2k) create ABRP diagnostics independently of BMW REST quota and log ABRP response errors without credentials
- (TA2k) stop further BMW CarData REST calls temporarily after the server reports quota error `CU-429` and preserve that cooldown across adapter restarts
- (TA2k) prevent BMW OAuth refresh tokens from appearing in debug logs
- (hombach) updated iobroker/testing
- (hombach) updated dependencies

### 5.0.5 (2026-10-26)

- (TA2k) container now includes non-streaming data keys again (e.g. charging level), so the adapter shows more values
- (TA2k) existing installations update to the new container automatically

### 5.0.4 (2026-10-19)

- (TA2k) fixed unnecessary container cleanup that used up the daily API request limit
- (TA2k) fixed telematic data fetching (CU-400): the container now uses only the data keys BMW accepts
- (TA2k) existing installations update to the new container automatically
- (hombach) fixed repochecker error
- (hombach) fixed translations
- (hombach) updated dependencies

### 5.0.2 (2026-08-11)

- (TA2k) added a staged telematic container fallback on CU-403: full catalogue (294) -> without endpoint-bound keys (290) -> all streaming-capable keys plus extras (252) -> curated reduced set (75), keeping as much coverage as BMW accepts instead of failing
- (TA2k) expanded the reduced/fallback container to a curated 75-key set covering EV charging/HV battery, range/mileage/fuel, location, doors, windows, tyres, service and status for both EV and combustion vehicles
- (TA2k) log the active container's state, version and name for diagnostics
- (TA2k) auto-upgrade an outdated reduced container via a version marker in the container purpose, while never deleting a working full container

### 5.0.1 (2026-08-10)

- (TA2k) fixed CU-103 "token-scope is not CarData" by requesting the cardata:api:read scope explicitly in the device code flow
- (TA2k) fixed MQTT streaming: use the token gcid as username and topic prefix (matching BMW's broker ACL), fixing the "Unspecified error" subscribe failure
- (TA2k) fixed container cleanup deleting with an undefined containerId (CU-121)
- (TA2k) removed the CarData Streaming Username setting - the gcid is now taken automatically from the token
- (TA2k) added an option to create a reduced telematic container (workaround for CU-403 on container creation)
- (hombach) updated adapter-core
- (hombach) fixed adapterchecker errors: downgraded @types/node to ^22, added Sentry notice to README, added @iobroker/adapter-dev
- (hombach) replaced native setInterval/setTimeout with adapter-managed equivalents in main.js
- (hombach) moved all jsonConfig.json inline translations to i18n files
- (hombach) updated dependencies

### Old Changes see CHANGELOG OLD

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