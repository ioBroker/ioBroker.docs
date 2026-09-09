---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enpal/README.md
title: ioBroker-Adapter für Enpal Solar
hash: UEDnBkX44k8a83OVriSLWBXzMf815tvYa3IEimBRMT0=
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

# ioBroker-Adapter für Enpal Solar

---

## Was dieser Adapter bewirkt

Liest Energiedaten von der lokalen InfluxDB 2.x-Instanz, die von Enpal Solar Systems bereitgestellt wird, und stellt ioBroker-Zustände für die Hausautomation bereit:

- Überwachung der Solarstromproduktion
- Akkuladestand (SoC) verfolgen
- Netzverbrauch und Einspeiseleistung analysieren
- Automatisierung basierend auf der Stromerzeugung
- Visualisieren Sie Energieflüsse im ioBroker-Dashboard
- Optional kann die Enpal-Wandbox (Lademodus, Start/Stopp) über die lokale Enpal-Box-Weboberfläche gesteuert werden.

## Merkmale

Der Adapter verbindet sich direkt mit der **lokalen InfluxDB** , in die die Enpal-Box schreibt – ein Cloud-Konto oder Internetzugang ist nicht erforderlich.

- Automatische Erkennung aller in Ihrem InfluxDB-Bucket gespeicherten Messungen, Geräte und Felder
- Dynamische Zustandserzeugung unter`enpal.0.<measurement>.<device>.<field>`
- Konfigurierbares Abfrageintervall (Standard: 60 Sekunden)
- Verbindungsstatus über`info.connection` — Die Adapterinstanz wird rot, wenn die Datenbank nicht erreichbar ist.
- Optionale **Steuerung der Wallbox** (Lademodus, Start/Stopp) über die Enpal Box Blazor Weboberfläche – verwendet denselben Host wie die InfluxDB URL (Port 80).

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

> Die tatsächlichen Feldnamen hängen von Ihrer Enpal-Systemversion und Hardwarekonfiguration ab.

### Wallbox-Steuerung (`wallbox_control` )

Wenn **die Wallbox-Steuerung** in der Adapterkonfiguration aktiviert ist, wird ein fester Kanal erstellt (unabhängig von der automatischen InfluxDB-Erkennung):

```
enpal.0.wallbox_control.<state>
```

| Zustand                 | Typ   | Lesen | Schreiben | Beschreibung                                                                                                                                                    |
| ----------------------- | ----- | ----- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`                 | Taste | NEIN  | Ja        | Ladevorgang starten (einstellen auf`true` (auslösen)                                                                                                            |
| `stop`                  | Taste | NEIN  | Ja        | Ladevorgang stoppen (eingestellt auf`true` (auslösen)                                                                                                           |
| `mode`                  | Wert  | Ja    | Ja        | Lademodussteuerung:`eco` ,`solar` ,`full` , oder`smart` Die Daten werden auch von der Wanddose synchronisiert, wenn der Modus über die Enpal-App geändert wird. |
| `currentMode`           | Text  | Ja    | NEIN      | Aktueller Lademodus, der von der Wallbox gemeldet wird (z. B.`Eco` ,`Solar` ,`Full` )                                                                           |
| `connectorStatus`       | Text  | Ja    | NEIN      | OCPP-Anschlussstatus von der Wanddose (siehe [Anschlussstatuswerte](#connector-status-values) )                                                                 |
| `automaticChargeStatus` | Text  | Ja    | NEIN      | Automatisches Laden beim Einstecken (`On` /`Off` (Schreibgeschützt, Änderungen über die Enpal-App möglich)                                                      |

**So funktioniert es**

- **Steuerung** (Modus, Start, Stopp): Der Adapter wird angeschlossen an`http://<enpal-box>/wallbox` via Blazor SignalR (gleicher Ansatz wie bei der [Home Assistant Enpal-Integration](https://github.com/derolli1976/enpal) ) und simuliert Tastendrücke.
- **Status** (`currentMode` ,`connectorStatus` ,`automaticChargeStatus` ): Lesen Sie von der Enpal Box-Seite`http://<enpal-box>/deviceMessages` (`Mode.Charge.Connector.1` ,`Status.Wallbox.Connector.1` ,`Wallbox.Settings.AutomaticChargeStatus.Connector.1` Wird bei jedem Synchronisierungsintervall und nach Steuerungsaktionen aktualisiert. Das beschreibbare`mode` Der Status wird ebenfalls aktualisiert (mit`ack: true` ) damit die VIS-Dropdown-Menüs synchronisiert bleiben, wenn der Modus außerhalb von ioBroker geändert wird.

#### Verbindungsstatuswerte

`connectorStatus` Meldet den [OCPP-](https://www.openchargealliance.org/) Anschlussstatus der Enpal/StarCharge-Wanddose. Die Werte werden auf die kanonische Schreibweise normalisiert (z. B. 0x0 ...`SuspendedEV` , nicht`Suspendedev` ).

| Wert            | Bedeutung                                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Available`     | Anschlussfrei, kein Fahrzeug angeschlossen                                                                       |
| `Preparing`     | Fahrzeug verbunden, Sitzung noch nicht gestartet (keine Stromzufuhr)                                             |
| `Charging`      | Aktives Laden – es wird Strom zugeführt                                                                          |
| `SuspendedEV`   | Fahrzeug hat den Ladevorgang unterbrochen (z. B. Batterie voll, BMS-Grenze erreicht); weiterhin angeschlossen    |
| `SuspendedEVSE` | Die Stromversorgung der Wallbox wurde unterbrochen (z. B. Lastmanagement); das Fahrzeug ist weiterhin verbunden. |
| `Finishing`     | Sitzung beendet, Kabel noch angeschlossen oder Fahrzeug noch nicht bewegt                                        |
| `Reserved`      | Anschluss für eine zukünftige Sitzung reserviert                                                                 |
| `Unavailable`   | Vorübergehend nicht nutzbar (Wartungsarbeiten, deaktiviert)                                                      |
| `Faulted`       | Fehler, der von der Wallbox gemeldet wurde                                                                       |
| `Connected`     | Fahrzeug verbunden (Enpal-spezifisch; kann anstelle oder vor anderen Zuständen erscheinen)                       |

> **Hinweis:** Nach vollständiger Aufladung werden Sie häufig sehen`SuspendedEV` — Das ist normal. Das Auto hat aufgehört, Strom zu ziehen; trennen Sie es gegebenenfalls vom Stromnetz oder starten Sie den Ladevorgang neu.

**Anforderungen**

- Enpal Box Firmware **8.50+** (Blazor Wallbox-Seite)
- Die Kontrollkästchen-Steuerung für die Wandbox ist in der Adapterkonfiguration aktiviert.
- Der ioBroker-Host muss die Enpal-Box im lokalen Netzwerk erreichen können (gleiche IP-Adresse wie InfluxDB, HTTP-Port 80).

**Nicht unterstützt**

- Automatisches Laden beim Einstecken über ioBroker ändern (Einstellung bleibt schreibgeschützt; zum Umschalten die Enpal-App verwenden)

## Installation

1. Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
2. Erstellen Sie eine neue Instanz
3. Konfigurieren Sie die folgenden Einstellungen (Registerkarte „ **Einstellungen“** ):
   - **InfluxDB-URL** : Adresse Ihrer lokalen InfluxDB (z. B.`http://192.168.1.100:8086` )
   - **API-Token** : Ihr InfluxDB-API-Token (Lesezugriff genügt)
   - **Organisations-ID** : Ihre InfluxDB-Organisation
   - **Bucket** : Der Bucket, in den Enpal schreibt (typischerweise`enpal` oder ähnliches)
   - **Aktualisierungsintervall** : Datenaktualisierungsintervall in Sekunden (Standard:`60` )
   - **Wallbox-Steuerung** (optional): Aktivieren, um zu erstellen`wallbox_control` Status und Lademodus/Start/Stopp über die Enpal Box-Weboberfläche ermöglichen (keine zusätzliche URL – der Host wird von der InfluxDB-URL übernommen). Ist diese Option aktiviert, erläutert die **Hilfe-Registerkarte der Wallbox** Datenpunkte, Lademodi und Verbindungsstatuswerte.
4. Speichern und Instanz starten

### So finden Sie Ihre InfluxDB-Zugangsdaten

1. Melden Sie sich an der Weboberfläche Ihrer Enpal-Box an oder stellen Sie eine Verbindung über SSH her.
2. Öffnen Sie die InfluxDB-Benutzeroberfläche unter`http://<enpal-box-ip>:8086`
3. Gehen Sie zu **Daten → API-Tokens** und erstellen Sie ein schreibgeschütztes Token.
4. Notieren Sie sich den Organisationsnamen und den Bucket unter **Daten → Buckets**

## Datenschutz und Datenverarbeitung

- Dieser Adapter verbindet sich nur mit Ihrer **lokalen InfluxDB** – es werden keine Daten an einen Cloud-Dienst gesendet.
- Bei aktivierter Wallbox-Steuerung verbindet sich der Adapter auch mit Ihrer **lokalen Enpal Box** (HTTP und WebSocket auf demselben Host wie InfluxDB) – Cloud-Zugriff ist weiterhin nicht möglich.
- Ihr API-Token wird verschlüsselt in der ioBroker-Datenbank gespeichert.
- Es werden keine externen Server kontaktiert.

## Ältere Änderungen

- [CHANGELOG\_OLD.md](https://github.com/inventwo/ioBroker.enpal/blob/main/CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.4.3 (2026-07-21)
- (skvarel) Sync wallbox_control.mode from status when charge mode is changed via the Enpal app

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