---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enpal/README.md
title: ioBroker-Adapter für Enpal Solar
hash: Bh8A0oHG4rVcna8B6lrzEWUvAZCzrobxt4wsJQstvQE=
---
![Logo](../../../en/adapterref/iobroker.enpal/admin/enpal_logo.svg)

![Anzahl der Installationen](https://iobroker.live/badges/enpal-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/enpal-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.enpal.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker-Adapter für Enpal Solar
---

## Was dieser Adapter bewirkt
Liest Energiedaten von der lokalen InfluxDB 2.x-Instanz, die von Enpal Solar Systems bereitgestellt wird, und stellt ioBroker-Zustände für die Hausautomation bereit:

- Überwachung der Solarstromproduktion
- Überwachung des Batterieladezustands (SoC)
- Netzverbrauch und Einspeiseleistung analysieren
- Automatisierung basierend auf der Stromerzeugung
- Visualisierung von Energieflüssen im ioBroker-Dashboard
- Optional kann die Enpal-Wandbox (Lademodus, Start/Stopp) über die lokale Enpal-Box-Weboberfläche gesteuert werden.

## Merkmale
Der Adapter verbindet sich direkt mit der **lokalen InfluxDB**, in die die Enpal-Box schreibt – ein Cloud-Konto oder Internetzugang ist nicht erforderlich.

- Automatische Erkennung aller in Ihrem InfluxDB-Bucket gespeicherten Messungen, Geräte und Felder
- Dynamische Zustandserzeugung unter `enpal.0.<measurement>.<device>.<field>`
- Konfigurierbares Abfrageintervall (Standard: 60 Sekunden)
- Verbindungsstatus über `info.connection` — die Adapterinstanz wird rot, wenn die Datenbank nicht erreichbar ist
- Optionale **Wallbox-Steuerung** (Lademodus, Start/Stopp) über die Enpal Box Blazor Weboberfläche — verwendet denselben Host wie die InfluxDB-URL (Port 80)

## Datenpunkte
Datenpunkte werden dynamisch basierend auf dem Inhalt Ihres InfluxDB-Buckets erstellt. Die Struktur folgt folgendem Muster:

```
enpal.0.<measurement>.<device>.<field>
```

Typische Beispiele (abhängig von Ihrem Wechselrichter und Ihrer Enpal-Konfiguration):

- `enpal.0.solar.inverter.power` — Aktuelle PV-Leistung (W)
- `enpal.0.solar.inverter.energy` — Heute erzeugte Energie (Wh)
- `enpal.0.battery.storage.soc` — Ladezustand der Batterie (%)
- `enpal.0.grid.meter.power` — Netzimport-/Netzexportleistung (W)
- `enpal.0.info.connection` — Verbindungsstatus zu InfluxDB

Die tatsächlichen Feldnamen hängen von Ihrer Enpal-Systemversion und Hardwarekonfiguration ab.

### Wallbox-Steuerung (`wallbox_control`)
Wenn **Wallbox-Steuerung** in der Adapterkonfiguration aktiviert ist, wird ein fester Kanal erstellt (unabhängig von der automatischen InfluxDB-Erkennung):

```
enpal.0.wallbox_control.<state>
```

| Status | Typ | Lesen | Schreiben | Beschreibung |
|-------|------|------|-------|-------------|
| `start` | Taste | nein | ja | Ladevorgang starten (auf `true` einstellen, um den Ladevorgang auszulösen) |
| `mode` | Wert | ja | ja | Lademodus einstellen: `eco`, `solar`, `full` oder `smart` |
| `currentMode` | Text | Ja | Nein | Aktueller Lademodus, der von der Wallbox gemeldet wird (z. B. `Eco`, `Solar`, `Full`) |
| `connectorStatus` | Text | Ja | Nein | OCPP-Anschlussstatus von der Wanddose (siehe [Verbindungsstatuswerte](#connector-status-values)) |
| `automaticChargeStatus` | Text | Ja | Nein | Automatisches Laden beim Einstecken (`On` / `Off`; schreibgeschützt, Änderung über die Enpal-App möglich) |
| `automaticChargeStatus` | Text | Ja | Nein | Automatisches Laden beim Einstecken (`Ein` / `Aus`; schreibgeschützt, Änderung über die Enpal-App möglich) |

**So funktioniert es**

- **Steuerung** (Modus, Start, Stopp): Der Adapter verbindet sich über Blazor SignalR mit `http://<enpal-box>/wallbox` (gleicher Ansatz wie bei der [Home Assistant Enpal-Integration](https://github.com/derolli1976/enpal)) und simuliert Tastendrücke.
- **Status** (`currentMode`, `connectorStatus`, `automaticChargeStatus`): Wird von der Enpal Box-Seite `http://<enpal-box>/deviceMessages` (`Mode.Charge.Connector.1`, `Status.Wallbox.Connector.1`, `Wallbox.Settings.AutomaticChargeStatus.Connector.1`) gelesen. Wird bei jedem Synchronisierungsintervall und nach jeder Steuerungsaktion aktualisiert.

#### Konnektorstatuswerte
`connectorStatus` meldet den Verbindungsstatus [OCPP](https://www.openchargealliance.org/) der Enpal/StarCharge-Wandbox. Die Werte sind auf die kanonische Schreibweise normalisiert (z. B. `SuspendedEV`, nicht `Suspendedev`).

| Wert | Bedeutung |
|-------|---------|
| `Available` | Anschluss frei, kein Fahrzeug angeschlossen |
| `Charging` | Aktives Laden — Strom wird geliefert |
| `SuspendedEV` | Fahrzeug hat den Ladevorgang unterbrochen (z. B. Batterie voll, BMS-Grenze); weiterhin angeschlossen |
| `SuspendedEVSE` | Stromzufuhr der Wallbox unterbrochen (z. B. Lastmanagement); Fahrzeug weiterhin angeschlossen |
| `Finishing` | Sitzung beendet, Kabel noch angeschlossen oder Fahrzeug noch nicht bewegt |
| `Reserved` | Konnektor für eine zukünftige Sitzung reserviert |
| `Unavailable` | Vorübergehend nicht nutzbar (Wartungsarbeiten, deaktiviert) |
| `Faulted` | Fehler, der von der Wallbox gemeldet wurde |
| `Connected` | Fahrzeug verbunden (Enpal-spezifisch; kann anstelle oder vor anderen Zuständen erscheinen) |
| `Verbunden` | Fahrzeug verbunden (Enpal-spezifisch; kann anstelle oder vor anderen Zuständen erscheinen) |

**Hinweis:** Nach vollständiger Aufladung wird häufig `SuspendedEV` angezeigt – dies ist normal. Das Fahrzeug hat die Stromaufnahme gestoppt; trennen Sie das Fahrzeug vom Stromnetz oder starten Sie den Ladevorgang gegebenenfalls neu.

**Anforderungen**

- Enpal Box Firmware **8.50+** (Blazor Wallbox-Seite)
- Die Kontrollkästchen-Steuerung für die Wandbox ist in der Adapterkonfiguration aktiviert.
- Der ioBroker-Host muss die Enpal-Box im lokalen Netzwerk erreichen können (gleiche IP-Adresse wie InfluxDB, HTTP-Port 80).

**Nicht unterstützt**

- Automatisches Laden über ioBroker ändern (Einstellung bleibt schreibgeschützt; zum Umschalten die Enpal-App verwenden)

## Installation
1. Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
2. Erstellen Sie eine neue Instanz
3. Konfigurieren Sie die folgenden Einstellungen (Registerkarte **Einstellungen**):
- **InfluxDB-URL**: Adresse Ihrer lokalen InfluxDB (z. B. `http://192.168.1.100:8086`)
- **API-Token**: Ihr InfluxDB-API-Token (Lesezugriff genügt)
- **Organisations-ID**: Ihre InfluxDB-Organisation
- **Bucket**: Der Bucket, in den Enpal schreibt (typischerweise `enpal` oder ähnlich)
- **Aktualisierungsintervall**: Datenaktualisierungsintervall in Sekunden (Standard: `60`)
- **Wallbox-Steuerung** (optional): Aktivieren Sie diese Option, um `wallbox_control`-Zustände zu erstellen und den Lademodus sowie Start- und Stoppvorgänge über die Web-Oberfläche der Enpal Box zu steuern (keine zusätzliche URL – der Host wird von der InfluxDB-URL übernommen). Ist die Option aktiviert, werden im **Wallbox-Hilfe-Tab** Datenpunkte, Lademodi und Verbindungsstatuswerte erläutert.
4. Speichern und Instanz starten

### So finden Sie Ihre InfluxDB-Zugangsdaten
1. Melden Sie sich an der Weboberfläche Ihrer Enpal-Box an oder stellen Sie eine SSH-Verbindung her.
2. Öffnen Sie die InfluxDB-Benutzeroberfläche unter `http://<enpal-box-ip>:8086`
3. Gehen Sie zu **Daten → API-Tokens** und erstellen Sie ein schreibgeschütztes Token.
4. Notieren Sie sich den Organisationsnamen und den Bucket unter **Daten → Buckets**.

## Datenschutz und Datenverarbeitung
Dieser Adapter verbindet sich ausschließlich mit Ihrer **lokalen InfluxDB** – es werden keine Daten an einen Cloud-Dienst gesendet.
- Bei aktivierter Wallbox-Steuerung verbindet sich der Adapter auch mit Ihrer **lokalen Enpal Box** (HTTP und WebSocket auf demselben Host wie InfluxDB) – Cloud-Zugriff ist weiterhin nicht möglich.
Ihr API-Token wird verschlüsselt in der ioBroker-Datenbank gespeichert.
Es werden keine externen Server kontaktiert.

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->

### 0.4.2 (2026-06-12)
- (skvarel) Fixed missing wallbox_help_readme translation in English and German admin UI
- (skvarel) Replaced plain timers in wallbox client with adapter-core setInterval, setTimeout and delay helpers
- (skvarel) Updated iobroker/types for js-controller 7.1 compatibility

### 0.4.1 (2026-06-10)
- (skvarel) Typed adapter and instance root namespaces as meta folders for a cleaner object tree

### 0.4.0 (2026-06-07)
- (skvarel) Added read-only wallbox state automaticChargeStatus (automatic charge on plug-in, from /deviceMessages)
- (skvarel) Fixed connectorStatus normalization for OCPP values (e.g. SuspendedEV instead of Suspendedev)
- (skvarel) Documented wallbox connector status values in README
- (skvarel) Added conditional wallbox help tab with data point and status documentation

### 0.3.0 (2026-06-07)
- (skvarel) Added optional wallbox control via Enpal Box web interface (Blazor SignalR)
- (skvarel) New config option: wallbox_enabled (checkbox); Enpal Box URL is derived automatically from InfluxDB URL
- (skvarel) New states under wallbox_control: start, stop, mode, currentMode, connectorStatus

### 0.2.2 (2026-06-05)
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules
- (skvarel) Updated @alcalzone/release-script to 5.2.1 to fix repository checker error E0036
- (skvarel) Updated @tsconfig/node22 to 22.0.5
- (skvarel) Fixed mixed indentation in admin/jsonConfig.json

## License
MIT License

Copyright (c) 2026 skvarel <skvarel@inventwo.com>

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