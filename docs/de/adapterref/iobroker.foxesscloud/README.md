---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.foxesscloud/README.md
title: ioBroker-Adapter für FoxESS Cloud
hash: NGU6JXedkBMtdUikAU5X0+04Q7QPIytB5IzX6ONtG7M=
---
![Logo](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![Anzahl der Installationen](https://iobroker.live/badges/foxesscloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/foxesscloud-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-copilot-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# IoBroker-Adapter für FoxESS Cloud
---

## Was dieser Adapter bewirkt
Ruft Daten von der FoxESS Cloud API für Solarwechselrichter (z. B. verwendet in Enpal-Systemen) ab und stellt ioBroker-Zustände für die Hausautomation bereit:

- Überwachung der Solarstromproduktion
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
- **`batCharge`**: Batterieladeleistung (kW)
- **`batDischarge`**: Batterieentladeleistung (kW)

### Verbindungsstatus
- **`info.connection`**: Verbindungsstatus in **1440 Anrufen pro Tag**. Bei einem Intervall von 60 Sekunden wird dieses Limit optimal genutzt (1440 Minuten = 24 Stunden).

## Datenpunkte
Der Adapter erzeugt die folgenden Datenpunkte:

- `foxesscloud.0.pvPower` - PV-Leistung (kW)
- `foxesscloud.0.pv1Power` - Leistung des PV-Strings 1 (kW)
- `foxesscloud.0.pv2Power` - PV-String 2 Leistung (kW)
- `foxesscloud.0.generationPower` - Erzeugungsleistung/Ausgangsleistung (kW)
- `foxesscloud.0.soc` - Ladezustand des Akkus (%)
- `foxesscloud.0.load` - Lastleistung (kW)
- `foxesscloud.0.gridConsumption` - Netzverbrauch/Netzimport (kW)
- `foxesscloud.0.feedinPower` - Einspeise-/Ausspeiseleistung (kW)
- `foxesscloud.0.batCharge` - Akkuladeleistung (kW)
- `foxesscloud.0.batDischarge` - Batterieentladeleistung (kW)
- `foxesscloud.0.batTemperature` - Batterietemperatur (°C)
- `foxesscloud.0.invTemperature` - Interne Temperatur des Wechselrichters (°C)
- `foxesscloud.0.runningState` - Betriebszustand des Wechselrichters
- `foxesscloud.0.info.connection` - Verbindungsstatus

### PV-Leistungs-JSON-Statistiken (falls aktiviert)
- `foxesscloud.0.pvPowerJSON.daily` - Tägliche Energiestatistik (JSON-Format) - aktuelle Woche von Montag bis Sonntag
- `foxesscloud.0.pvPowerJSON.weekly` - Wöchentliche Energiestatistik (JSON-Format) - letzte 4 Wochen einschließlich der aktuellen Woche
- `foxesscloud.0.pvPowerJSON.monthly` - Monatliche Energiestatistik (JSON-Format) - alle 12 Monate einschließlich des aktuellen Monats

## Installation
1. Installieren Sie den Adapter über die ioBroker-Administrationsschnittstelle.
2. Erstellen Sie eine neue Instanz
3. Konfigurieren:
- **API-Token**: Ihr API-Schlüssel aus dem FoxESS Cloud-Portal
- **Seriennummer (SN)**: Die Seriennummer Ihres Wechselrichters
- **Aktualisierungsintervall**: Datenaktualisierungsintervall in Sekunden (Standard: 60, Minimum: 60)
4. Optional: PV Power JSON-Statistiken aktivieren:
- **Aktivieren der PV-Leistungs-JSON-Generierung**: Aktivieren Sie die JSON-Tabellengenerierung für VIS-Widgets
- **Tägliche Statistiken**: Generiert tägliche Energiedaten für die laufende Woche (Montag-Sonntag)
- **Wöchentliche Statistiken**: Generierung wöchentlicher Energiedaten (letzte 4 Wochen einschließlich der aktuellen Woche)
- **Monatliche Statistiken**: Monatliche Energiedaten generieren (alle 12 Monate einschließlich des aktuellen Monats)
- **Preis pro kWh**: Optional - Geben Sie Ihren Strompreis pro kWh für die Kostenberechnung ein
- **Täglicher/Wöchentlicher/Monatlicher Startwert**: Optionale anfängliche kWh-Werte für die Betriebsperioden, falls der Adapter erst nach Produktionsbeginn aktiviert wird.
5. Speichern und Instanz starten

### So erhalten Sie Ihre API-Zugangsdaten
1. Melden Sie sich bei [FoxESS Cloud](https://www.foxesscloud.com) an.
2. Gehen Sie zu Ihrem Profil/Ihren Einstellungen.
3. Generieren Sie einen API-Schlüssel (Token)
4. Suchen Sie die Seriennummer Ihres Wechselrichters in der Geräteliste.

## PV-Leistungs-JSON-Statistiken für VIS-Dashboards
Wenn diese Option in der Konfiguration aktiviert ist, generiert der Adapter JSON-Tabellen mit Energiestatistiken, die in ioBroker VIS mithilfe von Widgets wie dem **inventwo JSON Widget** angezeigt werden können.

### JSON-Format
Die JSON-Tabellen enthalten Energiedaten mit folgender Struktur:

```json
[
  {"date": "Monday", "value": "1.904", "price": "0.58"},
  {"date": "Tuesday", "value": "4.653", "price": "1.42"},
   {"date": "Wednesday", "value": "0.417", "price": "0.13"},
   {"date": "Thursday", "value": "0", "price": "0"},
   {"date": "Friday", "value": "0", "price": "0"},
   {"date": "Saturday", "value": "0", "price": "0"},
   {"date": "Sunday", "value": "0", "price": "0"},
  {"date": "Total", "value": "6.843", "price": "2.09"}
]
```

- **Datum**: Wochentag (lokalisiert), Kalenderwoche (KW XX) oder Monatsname
- **Wert**: Erzeugte Energie in kWh (3 Dezimalstellen)
- **Preis**: Kosten in € (nur wenn ein Preis pro kWh konfiguriert ist, 2 Dezimalstellen)

### Datenerfassung
- **Täglich**: Zeigt die aktuelle Kalenderwoche von Montag bis Sonntag an und aktualisiert den aktuellen Tag live.
- **Wöchentlich**: Sammelt wöchentliche Daten (Montag-Sonntag), speichert die letzten 4 Wochen und beinhaltet die laufende Woche.
- **Monatlich**: Sammelt monatliche Daten (vom ersten bis zum letzten Tag), speichert alle 12 Monate und schließt den laufenden Monat mit ein.

Wird der Adapter im laufenden Produktivbetrieb aktiviert, können optionale Startwerte für den aktuellen Tag, die aktuelle Woche und den aktuellen Monat konfiguriert werden. Diese Werte werden einmalig zu Beginn des jeweiligen Laufzeitraums hinzugefügt.

Die Sprache der Datumsbezeichnungen (Tag-/Wochen-/Monatsnamen) passt sich automatisch an die Sprache Ihres ioBroker-Systems an:

- **Deutsch** (de): Montag, Dienstag, Januar, Februar usw.
- **Englisch** (en): Montag, Dienstag, Januar, Februar usw.

### Verwendung mit VIS
1. Aktivieren Sie die PV-Leistungs-JSON-Generierung in der Adapterkonfiguration.
2. Fügen Sie Ihrem VIS-Dashboard ein JSON-Widget hinzu.
3. Binden Sie das Widget an einen dieser Zustände:
- `foxesscloud.0.pvPowerJSON.daily` für tägliche Statistiken
- `foxesscloud.0.pvPowerJSON.weekly` für wöchentliche Statistiken
- `foxesscloud.0.pvPowerJSON.monthly` für monatliche Statistiken
4. Konfigurieren Sie das Widget so, dass die Energie-/Preisdaten in Tabellenform angezeigt werden.

## Datenschutz und Datenverarbeitung
Dieser Adapter liest Daten ausschließlich von der **FoxESS Cloud API** mithilfe Ihres persönlichen API-Tokens.
Ihr API-Token wird verschlüsselt in der ioBroker-Datenbank gespeichert.

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-05-25)
- (skvarel) Replaced process.env and process.exit usage in tools/api-test.js to fix compatibility issues reported by ioBroker repository checker (E5049, E5050)
- (skvarel) Downgraded @types/node from ^25 to ^22 to match supported Node.js version (W0066)

### 0.5.0 (2026-05-23)
- (skvarel) Added PV Power JSON statistics (daily, weekly, monthly) for VIS widget integration with optional cost calculation per kWh

### 0.4.0 (2026-05-19)
- (skvarel) Added PV string 1 and string 2 power datapoints (pv1Power, pv2Power)
- (skvarel) Added battery temperature datapoint (batTemperature)
- (skvarel) Added inverter running state datapoint (runningState)

### 0.3.1 (2026-05-19)
- (skvarel) Adjusted real-time API parsing to keep the typecheck green without changing runtime behavior

### 0.3.0 (2026-05-19)
- (skvarel) Added inverter internal temperature datapoint in °C

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