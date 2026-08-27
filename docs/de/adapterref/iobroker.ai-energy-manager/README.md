---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.ai-energy-manager.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.ai-energy-manager.svg
BADGE-Number of Installations: https://iobroker.live/badges/ai-energy-manager-installed.svg
BADGE-GitHub license: https://img.shields.io/github/license/blabond/ioBroker.ai-energy-manager?style=flat-square
---
# ioBroker AI Energy Manager

[![NPM-Version](https://img.shields.io/npm/v/iobroker.ai-energy-manager.svg)](https://www.npmjs.com/package/iobroker.ai-energy-manager)
[![Downloads](https://img.shields.io/npm/dm/iobroker.ai-energy-manager.svg)](https://www.npmjs.com/package/iobroker.ai-energy-manager)
![Installationen](https://iobroker.live/badges/ai-energy-manager-installed.svg)
[![Test and Release](https://github.com/blabond/ioBroker.ai-energy-manager/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/blabond/ioBroker.ai-energy-manager/actions/workflows/test-and-release.yml)

Der AI Energy Manager Adapter verbindet ioBroker mit dem SmartEnergy Backend für dynamische Stromtarife, PV-Prognosen, Telemetrie, Batteriesteuerung, Wallbox-Integration und kontrollierte schreibbare Datenpunkte.

Der Adapter sendet fortlaufend normalisierte Energiedaten an das Backend, erhält eine benutzerspezifische Anlagenkonfiguration und setzt Steuerbefehle nur auf Datenpunkte um, die der Benutzer in ioBroker ausdrücklich ausgewählt hat. Unterstützt werden Haushaltszähler, PV-Anlagen, Balkonkraftwerke, Batteriespeicher, generische Speichersysteme, Energiezähler und Wallboxen.

## Dokumentation

[Englische Dokumentation](https://github.com/blabond/ioBroker.ai-energy-manager/blob/main/README.md)

## Funktionen

- Tokenbasierte Verbindung zum SmartEnergy Backend
- Servergesteuerte Adapterkonfiguration passend zur echten Benutzeranlage
- Telemetrieübertragung für Verbrauch, Netzbezug, Netzeinspeisung, PV-Erzeugung, Batterieleistung, Batteriestand und Wallboxwerte
- Automatische Einheitenerkennung und Normalisierung für Wh, kWh, W und kW
- Dynamische Datenpunkttabellen je Haushalt und Anlage
- ioBroker-Objektbrowser zur Auswahl der Datenpunkte
- Dashboard Lite mit Systemkacheln, 6-Stunden-Plan und Mustererkennung
- Vorheriger, aktueller und nächster 15-Minuten-Strompreis für den im Benutzerkonto gewählten Tarif
- Kontrollierte Batteriebefehle zum Laden, Entladen und Halten einer Reserve
- Schreibschutz: Befehle werden nur für konfigurierte und schreibbare Datenpunkte ausgeführt

## Voraussetzungen

- Node.js 22 oder neuer
- js-controller 6.0.11 oder neuer
- ioBroker Admin 7.6.20 oder neuer
- SmartEnergy Benutzerkonto mit Adapter-Token
- Konfigurierte ioBroker-Datenpunkte für die Zähler, Batterien, PV-Anlagen und Wallboxen, die verwendet werden sollen

## Installation

Installiere den Adapter über das ioBroker Adapter-Repository oder über npm.

## Konfiguration

Öffne die Adapterkonfiguration im ioBroker Admin.

1. Adapter-Token aus dem SmartEnergy Webfrontend einfügen.
2. Konfiguration speichern.
3. **Request Config** anklicken.
4. Reiter **Datenpunkte** öffnen.
5. Erforderliche ioBroker State-Paths über den Objektbrowser auswählen.
6. Konfiguration speichern.

Das Adapter-Token wird verschlüsselt und geschützt in der nativen Adapterkonfiguration gespeichert.

## Request Config

Der Button **Request Config** ruft die aktuelle Anlagenkonfiguration des Benutzers vom Backend ab. Die Antwort definiert die benötigten Haushaltswerte und die verfügbaren anlagenspezifischen Werte. Der Adapter zeigt danach eine Haushaltstabelle und je installierter Anlage eine weitere Tabelle an.

Die Anzahl der Anlagen ist nicht fest begrenzt. Wenn der Benutzer im Webfrontend Anlagen hinzufügt oder entfernt, erhält der Adapter beim nächsten Konfigurationsabruf die neue Struktur.

Bestehende Datenpunktzuordnungen bleiben erhalten, solange die logischen Schlüssel weiterhin vorhanden sind.

## Datenpunkte

Der Adapter arbeitet mit logischen Datenpunkten statt mit fest verdrahteten ioBroker-Pfaden. Typische Haushaltsdatenpunkte sind:

- Haushaltsverbrauch
- Netzbezugszähler
- Netzeinspeisezähler
- aktuelle Netzleistung
- Wallboxenergie

Typische Anlagendatenpunkte sind:

- PV-Erzeugung
- Batteriestand
- Batterieleistung
- Batteriekapazität
- steuerbare AC-Ausgangsleistung

Der Adapter normalisiert Quellwerte automatisch vor der Übertragung. Ein kWh-Datenpunkt kann beispielsweise als Wh-Telemetrie gesendet werden und ein kW-Datenpunkt als W-Telemetrie.

## Telemetrie

Der Adapter liest die ausgewählten ioBroker States und erzeugt daraus ein normalisiertes Telemetriepaket. Dieses Paket wird im konfigurierten Intervall an das Backend gesendet. Wenn `sendOnlyChanged` aktiv ist, werden unveränderte Pakete übersprungen, um Datenverkehr zu reduzieren.

Die Telemetrie wird im Backend verwendet für:

- täglichen Haushaltsverbrauch
- Netzbezug und Netzeinspeisung
- PV-Ertrag
- verfügbare Batteriekapazität
- Lade- und Entladeentscheidungen
- Mustererkennung
- Dashboard und 6-Stunden-Plan

## Batterie- und Wallboxsteuerung

Das Backend kann Steuerbefehle für erlaubte logische Ziele senden. Der Adapter ordnet diese Ziele den vom Benutzer ausgewählten ioBroker-Datenpunkten zu.

Unterstützte Steuerlogik:

- Batterie mit PV-Überschuss laden
- Batterie in günstigen Tariffenstern aus dem Netz laden
- Netzbetrieb mit Batterie halten oder kurzfristigem Batterieladen
- Batterie entladen, wenn der Plan Batteriestützung vorsieht

Der Adapter schreibt niemals auf beliebige State-IDs aus dem Backend. Ein Schreibvorgang erfolgt nur, wenn:

- das Ziel Teil der Serverkonfiguration ist
- der Benutzer einen Datenpunkt für dieses Ziel ausgewählt hat
- das ioBroker-Objekt existiert
- das Objekt schreibbar ist
- der Wert zum erwarteten Typ passt
- der konfigurierte Mindestabstand zwischen Schreibbefehlen eingehalten wird

## States

Der Adapter legt interne States unterhalb seiner Instanz an:

- `info.connection`
- `info.lastSync`
- `info.lastError`
- `info.configValid`
- `info.tokenValid`
- `info.detectedFeatures`
- `info.serverConfigVersion`
- `info.serverConfigRevision`
- `info.serverConfigLastRequest`
- `status.backendReachable`
- `status.lastPayload`
- `status.lastCommand`
- `status.lastCommandResult`

Das Adapter-Token wird nie in States geschrieben.

### Börsenstrompreise

Der Channel `electricityPrices` stellt die Tarifpreise bereit, die auch das SmartEnergy Webfrontend verwendet. Die Werte enthalten den Aufschlag des im Benutzerkonto gewählten Tarifanbieters sowie das für die Anlage konfigurierte Netzentgelt:

- `electricityPrices.last`: vorheriger 15-Minuten-Preis in `ct/kWh`
- `electricityPrices.current`: aktuell gültiger 15-Minuten-Preis in `ct/kWh`
- `electricityPrices.next`: nächster 15-Minuten-Preis in `ct/kWh`
- `electricityPrices.status`: Einstufung des aktuellen Preises

Der Status verwendet dieselben Preisfenster und Farben wie das Webfrontend:

- `0` — Standardbereich oder keine Einstufung
- `1` — günstiger Ladeslot (gelb)
- `2` — Brückenladeslot (blau)
- `3` — Strom meiden / niemals laden (schwarz; mindestens 150 % des 7-Tage-Maximums)

Wenn keine aktuellen Backend-Daten verfügbar sind, werden die Preis-States auf `0` zurückgesetzt.

## Sicherheit

- Das Adapter-Token wird verschlüsselt und geschützt gespeichert.
- Tokens werden in Logs maskiert.
- Backend-Befehle verwenden logische Ziele statt direkter ioBroker-Pfade.
- Schreibbare Datenpunkte müssen vom Benutzer ausdrücklich ausgewählt werden.
- Befehle werden nach der Verarbeitung gegenüber dem Backend quittiert.
- Die Backend-Kommunikation erfolgt per HTTPS.

## Fehlersuche

Wenn Telemetrie fehlt, prüfe im Reiter **Datenpunkte**, ob alle erforderlichen State-Paths gesetzt sind.

Wenn keine Backend-Verbindung besteht, prüfe:

- `info.connection`
- `info.tokenValid`
- `status.backendReachable`
- `info.lastError`

Wenn ein Befehl nicht ausgeführt wird, prüfe, ob der ausgewählte ioBroker State schreibbar ist und ob der Werttyp zum State passt.

## Changelog

### **WORK IN PROGRESS**

### 0.4.3 (2026-07-28)

- Update dependencies and GitHub Actions.
- Expose account-specific 15-minute electricity prices and the current web price classification.

### 0.4.2 (2026-07-14)

- General adapter improvements

### 0.4.1 (2026-07-06)

- FIX: React state object selector for ioBroker datapoint paths

### 0.4.0 (2026-07-06)

- Code Cleanup
- ioBroker checker changes.
- Update admin dependencies and keep the React/MUI admin UI compatible with the ioBroker Admin runtime.
- Fix ApiClient timer fallback

### 0.2.0 (2026-05-22)

- Initial release of the AI Energy Manager adapter.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Christoph Böhrs

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