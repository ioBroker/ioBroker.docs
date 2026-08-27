---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.foxesscloud/README.md
title: ioBroker-Adapter für FoxESS Cloud
hash: j3tAwn9sZsaTptBNbAboNgwf1PDEDs9is5loNQ1Gvcw=
---
![Logo](../../../en/adapterref/iobroker.foxesscloud/admin/foxesscloud-logo.png)

![Anzahl der Installationen](https://iobroker.live/badges/foxesscloud-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/foxesscloud-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.foxesscloud.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.foxesscloud.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
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
- **`pv1Power` … `pv24Power`**: Leistungen einzelner PV-Strings (kW) – es werden nur die auf dem Gerät vorhandenen Strings automatisch berechnet.
- **`generationPower`**: Gesamterzeugungs-/Ausgangsleistung (kW)
- **`Last`**: Aktuelle Last/Leistungsaufnahme (kW)
- **`gridConsumption`**: Vom Netz bezogene Leistung (kW)
- **`feedinPower`**: Ins Netz eingespeiste Leistung (kW)

### Batterie
- **`soc`**: Ladezustand der Batterie (%)
- **`batCharge`**: Ladeleistung der Batterie (kW)
- **`batDischarge`**: Batterieentladeleistung (kW)
- **`batTemperature`**: Batterietemperatur (°C) – wird automatisch erstellt, wenn das Gerät einen Wert meldet.

### Temperatur & Status
- **`invTemperature`**: Interne Temperatur des Wechselrichters (°C) – wird automatisch erstellt, wenn das Gerät einen Wert meldet; Warnungen im Protokoll bei ≥ 65 °C und ≥ 80 °C
- **`runningState`**: Aktueller Betriebszustand des Wechselrichters (Zeichenkette)

### Verbindungsstatus
- **`info.connection`**: Verbindungsstatus

### Energieberichterstattung (optional)
Wenn diese Funktion auf der Registerkarte *Berichterstellung* aktiviert ist, leitet der Adapter die Periodensummen aus den von der API zurückgegebenen kumulierten Werten über die gesamte Lebensdauer ab:

- **`report.day.*`**: Heutige Erzeugung, Einspeisung und Netzbezug (kWh)
- **`report.week.*`**: Die Gesamtmenge dieser Woche (kWh)
- **`report.month.*`**: Die Gesamtsumme dieses Monats (kWh)
- **`report.year.*`**: Die diesjährigen Gesamtwerte (kWh)

### PV-Leistungs-JSON-Statistiken (optional)
Wenn diese Funktion auf der Registerkarte *Statistiken* aktiviert ist, erfasst der Adapter die akkumulierte PV-Energie und veröffentlicht JSON-Tabellen zur Verwendung in VIS-Dashboards – siehe [PV-Leistungs-JSON-Statistiken für VIS-Dashboards](#pv-power-json-statistics-for-vis-dashboards) unten.

### API-Ratenbegrenzung (Open API)
Der [FoxESS Open API](https://www.foxesscloud.com/public/i18n/en/OpenApiDocument.html) erlaubt **1440 API-Aufrufe pro Tag und API-Schlüssel** (nicht pro Adapterinstanz). Die Nutzung in der FoxESS-App oder im Webportal wird nicht auf dieses Open-API-Kontingent angerechnet.

| Einrichtung | API-Aufrufe pro Tag (24 Stunden) |
|-------|--------------------------|
| 1 Instanz im 60-Sekunden-Intervall | 1440 (volles Kontingent) |
| 2 Instanzen à 60 s (gleicher API-Schlüssel) | ~2880 → Limit wird oft nach ~12 h überschritten |
| 1 Instanz im 120-Sekunden-Intervall | 720 |

Bei dem empfohlenen **60-Sekunden-** Intervall verbraucht eine einzelne Instanz das gesamte Tageskontingent (1440 Minuten = 24 Stunden).

**Wichtig:** Alle Open-API-Clients, die denselben API-Schlüssel verwenden, teilen sich ein Kontingent – beispielsweise mehrere ioBroker-Instanzen, Home-Assistant-Integrationen oder Skripte. Eine Überschreitung des Limits kann zu zeitweiligen API-Fehlern führen (z. B. `40400`, `40402`). Die verbleibenden API-Aufrufe können Sie im FoxESS-Portal unter **Profil → API-Verwaltung** überprüfen.

Für zusätzliche Wechselrichter erstellen Sie pro Gerät eine Adapterinstanz (eine Seriennummer pro Instanz) und planen Sie das Abfrageintervall entsprechend, oder verwenden Sie separate API-Schlüssel, falls Ihr Konto dies zulässt.

## Datenpunkte
Der Adapter erzeugt die folgenden Datenpunkte:

### Echtzeit-Stromversorgung (wird immer erzeugt)
- `foxesscloud.0.pvPower` - PV-Leistung (kW)
- `foxesscloud.0.generationPower` - Erzeugungsleistung/Ausgangsleistung (kW)
- `foxesscloud.0.soc` - Ladezustand des Akkus (%)
- `foxesscloud.0.load` - Lastleistung (kW)
- `foxesscloud.0.gridConsumption` - Netzverbrauch/Netzimport (kW)
- `foxesscloud.0.feedinPower` - Einspeise-/Ausspeiseleistung (kW)
- `foxesscloud.0.batCharge` - Akkuladeleistung (kW)
- `foxesscloud.0.batDischarge` - Batterieentladeleistung (kW)
- `foxesscloud.0.runningState` - Betriebszustand des Wechselrichters
- `foxesscloud.0.info.connection` - Verbindungsstatus

### Dynamisch (wird bei Bedarf beim ersten Wert ungleich null erstellt)
- `foxesscloud.0.pv1Power` … `foxesscloud.0.pv24Power` - PV-String 1–24 Leistung (kW)
- `foxesscloud.0.invTemperature` - Interne Temperatur des Wechselrichters (°C)
- `foxesscloud.0.batTemperature` - Batterietemperatur (°C)

### Energieberichterstattung (falls auf der Registerkarte *Berichterstattung* aktiviert)
- `foxesscloud.0.report.day.generation` - Heutige PV-Erzeugung (kWh)
- `foxesscloud.0.report.day.feedin` - Heutige Einspeiseleistung (kWh)
- `foxesscloud.0.report.day.gridConsumption` - Heutiger Netzstromverbrauch (kWh)
- `foxesscloud.0.report.week.generation` - PV-Stromerzeugung dieser Woche (kWh)
- `foxesscloud.0.report.week.feedin` - Einspeiseleistung dieser Woche (kWh)
- `foxesscloud.0.report.week.gridConsumption` - Stromverbrauch dieser Woche (kWh)
- `foxesscloud.0.report.month.generation` - PV-Erzeugung dieses Monats (kWh)
- `foxesscloud.0.report.month.feedin` - Einspeisemenge dieses Monats (kWh)
- `foxesscloud.0.report.month.gridConsumption` - Netzstromverbrauch dieses Monats (kWh)
- `foxesscloud.0.report.year.generation` - PV-Erzeugung dieses Jahres (kWh)
- `foxesscloud.0.report.year.feedin` - Die diesjährige Einspeiseleistung (kWh)
- `foxesscloud.0.report.year.gridConsumption` - Netzstromverbrauch dieses Jahres (kWh)

### PV-Leistungs-JSON-Statistiken (falls auf der Registerkarte *Statistiken* aktiviert)
- `foxesscloud.0.pvPowerJSON.daily` - Tägliche Energiestatistik (JSON-Format) - aktuelle Woche von Montag bis Sonntag
- `foxesscloud.0.pvPowerJSON.weekly` - Wöchentliche Energiestatistik (JSON-Format) - alle Wochen des aktuellen Monats
- `foxesscloud.0.pvPowerJSON.monthly` - Monatliche Energiestatistik (JSON-Format) - alle 12 Monate des aktuellen Jahres

## Installation
1. Installieren Sie den Adapter über die ioBroker-Administrationsoberfläche.
2. Erstellen Sie eine neue Instanz
3. Konfigurieren Sie die Registerkarte **Allgemein**:
- **API-Token**: Ihr API-Schlüssel aus dem FoxESS Cloud-Portal
- **Seriennummer (SN)**: Die Seriennummer Ihres Wechselrichters
- **Aktualisierungsintervall**: Datenaktualisierungsintervall in Sekunden (Standard: 60, Minimum: 60)
4. Optional können Sie die Registerkarte **Statistiken** konfigurieren:
- **Aktivieren der PV-Leistungs-JSON-Generierung**: Aktivieren Sie die JSON-Tabellengenerierung für VIS-Widgets
- **Tägliche Statistiken**: Generiert tägliche Energiedaten für die laufende Woche (Montag-Sonntag)
- **Wöchentliche Statistiken**: Generiert wöchentliche Energiedaten für alle Wochen des aktuellen Monats
- **Monatliche Statistiken**: Generierung monatlicher Energiedaten für alle 12 Monate des laufenden Jahres
- **Preis pro kWh**: Optional – Geben Sie Ihren Strompreis pro kWh für die Kostenberechnung in den JSON-Tabellen ein.
- **Täglicher/Wöchentlicher/Monatlicher Startwert**: Optionale anfängliche kWh-Werte für die Betriebsperioden, falls der Adapter erst nach Produktionsbeginn aktiviert wird.
5. Optional können Sie die Registerkarte **Berichterstellung** konfigurieren:
- **Energieberichterstattung aktivieren**: Periodenbasierte Energieberichterstattung aktivieren (Tag / Woche / Monat / Jahr)
6. Speichern und Instanz starten

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
- **Wöchentlich**: Sammelt wöchentliche Daten (Montag-Sonntag), zeigt alle Wochen des aktuellen Monats an und beinhaltet die laufende Woche.
- **Monatlich**: Sammelt monatliche Daten (1. bis letzter Tag), zeigt alle 12 Monate des aktuellen Jahres an und beinhaltet den laufenden Monat.

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

## Energieberichterstattung
Wenn die *Energieberichterstattung aktivieren*-Option im **Berichts-Tab** aktiviert ist, ermittelt der Adapter die Periodensummen (Tag/Woche/Monat/Jahr) aus den kumulierten Werten, die von der FoxESS Cloud API zurückgegeben werden. Es sind keine zusätzlichen API-Aufrufe erforderlich – die Werte werden in die reguläre Echtzeitabfrage integriert.

### So funktioniert es
Bei jeder Abfrage liest der Adapter drei Lebensdauerwerte von der API:

- `Generation` — seit der Installation insgesamt erzeugte Energie (kWh)
- `feedin` — Gesamtenergie, die seit der Installation ins Netz eingespeist wird (kWh)
- `gridConsumption` — Gesamtenergieverbrauch aus dem Stromnetz seit der Installation (kWh)

Zu Beginn jedes Zeitraums (neuer Tag / neue ISO-Woche / neuer Kalendermonat / neues Jahr) werden die aktuellen Lebensdauerwerte als Basiswert gespeichert. Der gemeldete Statuswert ist immer `current lifetime value − baseline`.

Die Baselines werden in `report._baselines` gespeichert, sodass sie auch nach einem Neustart des Adapters erhalten bleiben.

### Bericht Staaten
| Bundesland | Beschreibung |
|-------|-------------|
| `foxesscloud.0.report.day.generation` | PV-Erzeugung heute (kWh) |
| `foxesscloud.0.report.day.gridConsumption` | Heute aus dem Netz verbrauchte Energie (kWh) |
| `foxesscloud.0.report.week.generation` | PV-Erzeugung in dieser ISO-Woche (kWh) |
| `foxesscloud.0.report.week.feedin` | Einspeisung in dieser ISO-Woche (kWh) |
| `foxesscloud.0.report.week.gridConsumption` | Netzverbrauch in dieser ISO-Woche (kWh) |
| `foxesscloud.0.report.month.generation` | PV-Erzeugung diesen Monat (kWh) |
| `foxesscloud.0.report.month.feedin` | Einspeisemenge diesen Monat (kWh) |
| `foxesscloud.0.report.month.gridConsumption` | Netzverbrauch diesen Monat (kWh) |
| `foxesscloud.0.report.year.generation` | PV-Erzeugung in diesem Jahr (kWh) |
| `foxesscloud.0.report.year.feedin` | Einspeisemenge dieses Jahr (kWh) |
| `foxesscloud.0.report.year.gridConsumption` | Netzverbrauch dieses Jahr (kWh) |
| `foxesscloud.0.report.year.gridConsumption` | Netzverbrauch in diesem Jahr (kWh) |

## Datenschutz und Datenverarbeitung
Dieser Adapter liest Daten ausschließlich von der **FoxESS Cloud API** mithilfe Ihres persönlichen API-Tokens.
Ihr API-Token wird verschlüsselt in der ioBroker-Datenbank gespeichert.

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 0.6.4 (2026-06-10)
- (skvarel) Added meta object types for adapter and instance namespace

### 0.6.3 (2026-06-05)
- (skvarel) Fixed repository checker error E0036

### 0.6.2 (2026-06-02)
- (skvarel) Documented Open API rate limit (per API key, multiple instances) in README and admin General tab
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules

### 0.6.1 (2026-05-29)
- (skvarel) Revised config and i18n

### 0.6.0 (2026-05-27)
- (StephanBeutel) Added support for up to 24 PV strings with dynamic state creation on first occurrence
- (StephanBeutel) Added report states for daily, weekly, monthly, and yearly energy totals derived from lifetime API values
- (StephanBeutel) Fixed null value handling for inverter and battery temperature states
- (StephanBeutel) Extracted reusable makeApiRequest() method for cleaner API communication
- (StephanBeutel) Centralized all state name translations into a single STATE_NAMES constant
- (skvarel) Fixed report states not updating during current period (values were only written at period rollover)
- (skvarel) Made energy reporting configurable via a new Reporting tab in the admin UI

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