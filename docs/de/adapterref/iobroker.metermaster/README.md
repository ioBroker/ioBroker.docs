---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.metermaster/README.md
title: ioBroker MeterMaster Adapter
hash: NEDjPcvQ2UIQKo6i8RNszFoHSPh/t3BeY1DzGEMi5wY=
---
# IoBroker MeterMaster Adapter

![Version](https://img.shields.io/badge/version-0.9.4-blue.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D22-brightgreen.svg)

[![MeterMaster Banner](https://github.com/MPunktBPunkt/ioBroker.metermaster/raw/main/github-banner.svg)](https://github.com/MPunktBPunkt/ioBroker.metermaster)

Empfängt Zählerstände vom **[Die Android-App MeterMaster (https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) speichert Zählerstände als ioBroker-Datenpunkte und steuert ESP32-Display-Knoten zur Anzeige der Zählerwerte auf OLED-Displays. Quellcode: [GitHub]](https://github.com/MPunktBPunkt/MeterMaster).

---

## Merkmale
- **HTTP-Empfänger** – empfängt Messwerte direkt von der App
- **Automatische Datenpunkte** – Zustände werden bei der ersten Synchronisierung automatisch erstellt.
- **Korrekte Zeitstempel** – der Status `ts` spiegelt das tatsächliche Lesedatum wider
- **Verlauf** – Jeder Zähler speichert ein vollständiges `readings.history`-Array.
- **Basisauthentifizierung** – optionaler Benutzername/Passwortschutz
- **Web-UI** – integrierter Browser-Viewer mit 5 Registerkarten (Daten, Knoten, Import, Protokolle, System)
- **Diagramme & CSV** – Verlaufsdiagramme, monatlicher Verbrauch und CSV-Export pro Zähler
- **DE/EN** – Sprachumschaltung in der Web-Benutzeroberfläche
- **Import** – App-Backup (Schema 2.0) über die Web-Oberfläche
- **ESP32-Knotenverwaltung** – Registrierte Anzeigeknoten anzeigen und konfigurieren
- **Fernsteuerung** – Steuerung der Messbereichsauswahl und der LEDs der ESP32-Knoten über die Web-Oberfläche

---

## Screenshots
Die integrierte Web-Benutzeroberfläche bietet fünf Registerkarten – Übersicht:

| | |
|---|---|
| **Daten** – Zählerkarten mit Verbrauchs-KPIs, Verlauf, Diagramm & CSV | ![Daten-Registerkarte](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-daten.png) |
| **Knoten** – ESP32-Status, IP, Firmware | ![Registerkarte „Knoten“](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-nodes.png) |
| **Import** – App-Backup per Drag & Drop | ![Registerkarte „Importieren“](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-import.png) |
| **Protokolle** – Echtzeitprotokoll mit Filter- und Exportfunktion | ![Registerkarte „Protokolle“](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-logs.png) |
| **System** – Statistik- und Versionsprüfung | ![Registerkarte „System“](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-system.png) |
| **System** – Statistiken & Versionsprüfung | ![Registerkarte „System“](../../../en/adapterref/iobroker.metermaster/docs/screenshots/webui-system.png) |

---

## Installation
Installieren Sie den Adapter aus der offiziellen ioBroker-Adapterliste:

1. Öffnen Sie **ioBroker Admin** → **Adapter**
2. Suche nach **MeterMaster**
3. Klicken Sie auf **Installieren** und erstellen Sie eine Instanz.

Von der Kommandozeile auf dem ioBroker-Host:

```bash
iobroker add metermaster
iobroker start metermaster
```

Öffnen Sie bei Bedarf die Firewall: `sudo ufw allow 8089/tcp`

Weitere Details: [INSTALLATION.md](INSTALLATION.md)

---

## Instanzkonfiguration
Nach der Installation → ioBroker Admin → **Adapter → MeterMaster** → Instanz erstellen:

| Einstellung | Standard | Beschreibung |
|---|---|---|
| HTTP-Port | `8089` | Port, an dem der Adapter lauscht |
| Benutzername | `metermaster` | Benutzername für die Basisauthentifizierung |
| Passwort | – | Passwort für die Basisauthentifizierung |
| Protokollpuffer | `500` | Max. gespeicherte Protokolleinträge |
| Verlauf speichern | `0` | 0 = unbegrenzt |
| Verlauf speichern | `0` | 0 = unbegrenzt |

---

## MeterMaster Android-App
Zählerstände erfassen und mit ioBroker synchronisieren:

| | |
|---|---|
| **Google Play** | [**MeterMaster**](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster) – App installieren, Zählerstände ablesen und an den Adapter senden |
| **GitHub** | [**MPunktBPunkt/MeterMaster**](https://github.com/MPunktBPunkt/MeterMaster) – Quellcode, APK-Build und Dokumentation |

[![Jetzt bei Google Play herunterladen](https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png)](https://play.google.com/store/apps/details?id=com.propertymanagement.metermaster)

---

## Konfigurieren Sie die MeterMaster-App
**Einstellungen → ioBroker → MeterMaster-Adapter:**

| Feld | Wert |
|---|---|
| ioBroker aktivieren | ein |
| IP / Hostname | IP-Adresse des ioBroker-Servers |
| Adapteranschluss | `8089` |
| Benutzername | wie im Adapter konfiguriert |
| Passwort | wie im Adapter konfiguriert |

"Testverbindung" sollte `MeterMaster adapter reachable ✓` zurückgeben.

---

## Web-Benutzeroberfläche
Ohne Passwort zugänglich:

```
http://{ioBroker-IP}:8089/
```

| Registerkarte | Inhalt |
|---|---|
| **Daten** | Alle empfangenen Zählerstände gruppiert nach Haus/Wohnung, mit Verlauf, Diagrammdarstellung und CSV-Export |
| **Knoten** | Registrierte ESP32-Knoten: Status, IP-Verbindung, Firmware, Zähler-Dropdown, LED-Steuerung |
| **Importieren** | App-Backup (JSON-Schema 2.0) per Drag & Drop |
| **Protokolle** | Echtzeitprotokoll mit Filter, automatischem Scrollen und Exportfunktion |
| **System** | Statistik- und Versionsprüfung |

Screenshots: siehe [Screenshots](#screenshots) oben.

---

## ESP32-Displayknoten
Der Adapter unterstützt [MeterMaster ESP32-Knoten](https://github.com/MPunktBPunkt/esp32.MeterMaster) als OLED-Display-Begleitgerät.

### Fließen
1. Der ESP32 sendet alle 60 Sekunden einen Heartbeat: `POST :8089/api/register`
2. Der Adapter erstellt automatisch Zustände vom Typ `metermaster.0.nodes.{MAC}.*`.
3. Der ESP32 fragt alle 15 Sekunden ab: `GET :8089/api/nodes/{MAC}/config`
4. Der Adapter gibt die Konfiguration und optionale Sofortbefehle (cmd) zurück.

### Registerkarte „Knoten“
- Online-/Offline-Abzeichen (grün, wenn Herzschlag < 120 s)
- IP-Adresse als anklickbarer Link → öffnet die ESP32-Weboberfläche
- Dropdown-Menü für Zähler: Zähler zuweisen → ESP32 erkennt ihn bei der nächsten Abfrage
- LED-Tasten: Ein/Aus → Sofortbefehl über cmd-Status

---

## Erstellte Datenpunkte
```
metermaster.0.
├── info.connection        bool    Adapter connected
├── info.lastSync          number  Timestamp of last sync (ms)
├── info.readingsReceived  number  Total readings received
│
├── {House}/{Apartment}/{Meter}/
│   ├── readings.latest      number  Latest value (ts = reading date)
│   ├── readings.latestDate  string  ISO-8601 date
│   ├── readings.history     string  JSON array of all readings
│   ├── name                 string
│   ├── unit                 string
│   └── typeName             string
│
└── nodes/{MAC}/
    ├── ip          string  ESP32 IP address
    ├── name        string  Device name
    ├── version     string  Firmware version
    ├── lastSeen    number  Timestamp of last heartbeat (ms)
    ├── config      string  JSON config (adapter writes, ESP32 reads)
    ├── configAck   string  Acknowledgement by ESP32
    └── cmd         string  Immediate command (adapter writes, ESP32 reads+clears)
```

---

## HTTP-API
### Ohne Authentifizierung
| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/` | Web-UI |
| GET | `/api/stats` | Statistiken (Messwerte, Betriebszeit, Knoten) |
| GET | `/api/data` | Alle zwischengespeicherten Messwerte |
| GET | `/api/logs` | Log-Puffer (mit `?level=&category=&text=` Filter) |
| GET | `/api/nodes` | Alle registrierten ESP32-Knoten |
| GET | `/api/discover` | Bekannte Zählerstatus-IDs |
| POST | `/api/register` | ESP32-Heartbeat (keine Authentifizierung erforderlich) |
| POST | `/api/register` | ESP32-Heartbeat (keine Authentifizierung erforderlich) |

### Mit Basisauthentifizierung
| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/api/ping` | Verbindungstest |
| POST | `/api/readings` | Stapelmesswerte speichern |
| POST | `/api/import` | App-Backup importieren |
| GET | `/api/nodes/{MAC}/config` | Konfiguration für ESP32 abrufen |
| POST | `/api/nodes/{MAC}/config` | Konfiguration für ESP32 festlegen |
| POST | `/api/nodes/{MAC}/configAck` | Empfangen Sie die Konfigurationsbestätigung |
| POST | `/api/nodes/{MAC}/cmd` | Sofortbefehl senden (LED, Messgerät) |
| POST | `/api/nodes/{MAC}/cmd` | Sofortbefehl senden (LED, Messgerät) |

### Beispiel: Einzelmessung
```
POST http://host:8089/api/reading
Authorization: Basic base64(user:password)
Content-Type: application/json

{
  "house":       "MyHouse",
  "apartment":   "West",
  "meter":       "HotWater",
  "value":       128.75,
  "unit":        "m³",
  "typeName":    "HotWater",
  "readingDate": "2024-02-12T09:30:00.000Z"
}
```

### Beispiel: Sofortbefehl an ESP32
```
POST http://host:8089/api/nodes/C8C9A3CB7B08/cmd
Authorization: Basic base64(user:password)
Content-Type: application/json

{ "ledOn": true }
```

---

## Aktualisieren
### Über die Web-Benutzeroberfläche
`http://IP:8089/` → Registerkarte **System** → "Nach Updates suchen" (zeigt die Verfügbarkeit an; Installation über die Befehlszeile siehe unten)

### Befehlszeile
```bash
iobroker upgrade metermaster
iobroker restart metermaster.0
```

---

## Changelog

### 0.9.4
- All adapter log messages and API JSON error responses in English
- State common names and roles corrected (readings channel, date/text/json roles, info.firmware for nodes)
- Web UI i18n: full DE/EN coverage, English default HTML
- Config validation: clamped port (1024–65535), logBufferSize (50–5000), keepHistory (0–100000)
- Removed `/api/update` endpoint and one-click Web UI update (CLI commands card retained)
- `migrateStateRoles()` uses `getAdapterObjectsAsync` (own adapter states only)
- Removed dead `houseName` config; import default house is `MyHouse`
- Fixed redundant state check in stateChange handler
- `@types/node` pinned to `^22.0.0`

### 0.9.3
- Fix state roles for ioBroker object structure check (repochecker E1008/E1009/E1011)
- Migration of existing objects on adapter start

### 0.9.2
- Adapter checker compliance: npm news cleanup, devDependencies, trusted publishing
- npm publish via GitHub Actions with provenance

### 0.9.1
- Lowered admin dependency to >=7.6.20 (fixes startup when admin 7.7.x is installed)

### 0.9.0
- Finalized for ioBroker repository: CI/CD testing, adapter checker compliance
- English README, updated dependencies (Node.js >= 22, adapter-core 3.4.x)
- Admin config i18n, encrypted password storage
- Requires js-controller >= 6.0.11 and admin >= 7.6.20

### 0.8.3
- Chart: linear time axis, yearly consumption projection toggle, README screenshots

### 0.8.2
- Bugfix: chart modal close button and range filters

### 0.8.1
- Bugfix: literal newline in CSV export JS broke Web UI

### 0.8.0
- Charts per meter, consumption KPI, CSV export, DE/EN language switch

See [io-package.json](io-package.json) `common.news` for full history. Older entries: [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

---

## License

Copyright (c) 2026 MPunktBPunkt

MIT License – see [LICENSE](LICENSE) for the full license text.