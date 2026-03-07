---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.foxesscloud/README.md
title: kein Titel
hash: RqMV8EnSC6IFUOtQBbkiYdIvCJmEOg0WY/uNku/rb7E=
---
![Logo](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![Anzahl der Installationen](https://iobroker.live/badges/foxesscloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/foxesscloud-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## IoBroker-Adapter für FoxESS Cloud
## Was dieser Adapter bewirkt
Ruft Echtzeitdaten von der FoxESS Cloud API für Solarwechselrichter (z. B. verwendet in Enpal-Systemen) ab und stellt ioBroker-Zustände für die Hausautomation bereit:

- Überwachung der Solarstromproduktion in Echtzeit
- Überwachung des Batterieladezustands (SoC)
- Netzverbrauch und Einspeiseleistung analysieren
- Automatisierung basierend auf der Stromerzeugung
- Visualisierung von Energieflüssen in ioBroker-Dashboards

## Merkmale
### Leistungswerte
- **`pvPower`**: Aktuelle PV-Stromerzeugung (kW)
- **`generationPower`**: Gesamterzeugungs-/Ausgangsleistung (kW)
- **`Last`**: Aktuelle Last/Leistungsaufnahme (kW)
- **`gridConsumption`**: Vom Netz bezogene Leistung (kW)
- **`feedinPower`**: Ins Netz eingespeiste Leistung (kW)

### Batterie
- **`soc`**: Ladezustand der Batterie (%)
- **`batCharge`**: Ladeleistung der Batterie (kW)
- **`batDischarge`**: Batterieentladeleistung (kW)

### Verbindungsstatus
- **`info.connection`**: Verbindungsstatus in **1440 Anrufen pro Tag**. Bei einem Intervall von 60 Sekunden wird dieses Limit optimal genutzt (1440 Minuten = 24 Stunden).

## Datenpunkte
Der Adapter erzeugt die folgenden Datenpunkte:

- `foxesscloud.0.pvPower` - PV-Leistung (kW)
- `foxesscloud.0.generationPower` - Erzeugungsleistung/Ausgangsleistung (kW)
- `foxesscloud.0.soc` - Ladezustand des Akkus (%)
- `foxesscloud.0.load` - Lastleistung (kW)
- `foxesscloud.0.gridConsumption` - Netzverbrauch/Netzimport (kW)
- `foxesscloud.0.feedinPower` - Einspeise-/Ausspeiseleistung (kW)
- `foxesscloud.0.batCharge` - Akkuladeleistung (kW)
- `foxesscloud.0.batDischarge` - Batterieentladeleistung (kW)
- `foxesscloud.0.info.connection` - Verbindungsstatus

## Installation
1. Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
2. Erstellen Sie eine neue Instanz
3. Konfigurieren:
- **API-Token**: Ihr API-Schlüssel aus dem FoxESS Cloud-Portal
- **Seriennummer (SN)**: Die Seriennummer Ihres Wechselrichters
- **Aktualisierungsintervall**: Datenaktualisierungsintervall in Sekunden (Standard: 60, Minimum: 60)
4. Speichern und Instanz starten

### So erhalten Sie Ihre API-Zugangsdaten
1. Melden Sie sich bei [FoxESS Cloud](https://www.foxesscloud.com) an.
2. Gehen Sie zu Ihrem Profil/Ihren Einstellungen.
3. Generieren Sie einen API-Schlüssel (Token)
4. Suchen Sie die Seriennummer Ihres Wechselrichters in der Geräteliste.

## Datenschutz und Datenverarbeitung
Dieser Adapter liest Daten ausschließlich von der **FoxESS Cloud API** mithilfe Ihres persönlichen API-Tokens.
Ihr API-Token wird verschlüsselt in der ioBroker-Datenbank gespeichert.

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.1.7 (2026-02-28)
- (skvarel) Fixed: Issue detected by repository checker.

### 0.1.6 (2026-02-01)
- (skvarel) Improved: Use node: prefix for core modules and adapter timer wrappers for better compatibility
- (skvarel) Fixed: Added .env.example to .gitignore

### 0.1.5 (2026-01-31)
- (skvarel) Improved: Removed unnecessary devDependencies (eslint, should, dotenv) to follow ioBroker best practices.
- (skvarel) Improved: Updated test scripts to use standard mocha command instead of hardcoded paths.
- (skvarel) Improved: Switched Node.js core module imports to node:xxx format where applicable.
- (skvarel) Improved: Enforced minimum and maximum interval limits for data polling to comply with Node.js timer restrictions.
- (skvarel) Improved: Code formatting and configuration files updated for consistency with ioBroker standards.
- (skvarel) Fixed: Addressed review feedback for ioBroker latest repository inclusion.
- (skvarel) Added: Full multi-language support for all state names (EN, DE, RU, PT, NL, FR, IT, ES, PL, UK, ZH-CN).

### 0.1.2 (2026-01-23)
- (skvarel) Fix .vscode/settings.json

### 0.1.1 (2026-01-23)
- (skvarel) Remove mocha from devDependencies (included in @iobroker/testing)
- (skvarel) Add .vscode/settings.json with JSON schema definitions

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