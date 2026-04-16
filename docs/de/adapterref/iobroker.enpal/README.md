---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.enpal/README.md
title: kein Titel
hash: vKO+Q2VLzuldwLkkQcycfuE09hl4BBMfd8Wbup5+i+A=
---
![Logo](../../../en/adapterref/iobroker.enpal/admin/enpal_logo.svg)

![Anzahl der Installationen](https://iobroker.live/badges/enpal-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/enpal-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.enpal.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.enpal.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## IoBroker-Adapter für Enpal Solar
## Was dieser Adapter bewirkt
Liest Energiedaten von der lokalen InfluxDB 2.x-Instanz, die von Enpal Solar Systems bereitgestellt wird, und stellt ioBroker-Zustände für die Hausautomation bereit:

- Überwachung der Solarstromproduktion
- Überwachung des Batterieladezustands (SoC)
- Netzverbrauch und Einspeiseleistung analysieren
- Automatisierung basierend auf der Stromerzeugung
- Visualisierung von Energieflüssen im ioBroker-Dashboard

## Merkmale
Der Adapter verbindet sich direkt mit der **lokalen InfluxDB**, in die die Enpal-Box schreibt – ein Cloud-Konto oder Internetzugang ist nicht erforderlich.

- Automatische Erkennung aller in Ihrem InfluxDB-Bucket gespeicherten Messungen, Geräte und Felder
- Dynamische Zustandserzeugung unter `enpal.0.<measurement>.<device>.<field>`
- Konfigurierbares Abfrageintervall (Standard: 60 Sekunden)
- Verbindungsstatus über `info.connection` — die Adapterinstanz wird rot, wenn die Datenbank nicht erreichbar ist

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

## Installation
1. Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
2. Erstellen Sie eine neue Instanz
3. Konfigurieren Sie die folgenden Einstellungen:
- **InfluxDB-URL**: Adresse Ihrer lokalen InfluxDB (z. B. `http://192.168.1.100:8086`)
- **API-Token**: Ihr InfluxDB-API-Token (Lesezugriff genügt)
- **Organisations-ID**: Ihre InfluxDB-Organisation
- **Bucket**: Der Bucket, in den Enpal schreibt (typischerweise `enpal` oder ähnlich)
- **Aktualisierungsintervall**: Datenaktualisierungsintervall in Sekunden (Standard: `60`)
4. Speichern und Instanz starten

### So finden Sie Ihre InfluxDB-Zugangsdaten
1. Melden Sie sich an der Weboberfläche Ihrer Enpal-Box an oder stellen Sie eine SSH-Verbindung her.
2. Öffnen Sie die InfluxDB-Benutzeroberfläche unter `http://<enpal-box-ip>:8086`
3. Gehen Sie zu **Daten → API-Tokens** und erstellen Sie ein schreibgeschütztes Token.
4. Notieren Sie sich den Organisationsnamen und den Bucket unter **Daten → Buckets**.

## Datenschutz und Datenverarbeitung
Dieser Adapter verbindet sich ausschließlich mit Ihrer **lokalen InfluxDB** – es werden keine Daten an einen Cloud-Dienst gesendet.
Ihr API-Token wird verschlüsselt in der ioBroker-Datenbank gespeichert.
Es werden keine externen Server kontaktiert.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.2.0 (2026-04-06)
- (skvarel) Updated minimum Node.js version requirement to >=22
- (skvarel) Normalize unit display: "Percent" is now shown as "%"

### 0.1.10 (2026-04-04)
- (skvarel) Fix prettier formatting in main.js

### 0.1.9 (2026-04-04)
- (skvarel) Update node version to 24.x for check-and-lint workflow

### 0.1.8 (2026-04-04)
- (skvarel) Fixed display of unit "None" in data points - now hidden for cleaner UI

### 0.1.7 (2026-04-04)
- (skvarel) Title and description edited

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