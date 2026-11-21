---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alpha-ess/README.md
title: ioBroker.alpha-ess
hash: 0sy426DMRu447/TNVSaYXQoInBH95iLwwWIEbai1qrs=
---
![Logo](../../../en/adapterref/iobroker.alpha-ess/admin/alpha-ess.png)

![Anzahl der Installationen (aktuell)](https://iobroker.live/badges/alpha-ess-installed.svg)
![Anzahl der Installationen (stabil)](https://iobroker.live/badges/alpha-ess-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.alpha-ess.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alpha-ess.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/Gaspode69/ioBroker.alpha-ess/badge.svg)

# ioBroker.alpha-ess

## Alpha ESS-Adapter für ioBroker

Dieser Adapter verbindet ioBroker mit der offiziellen [Alpha ESS Open API](https://open.alphaess.com/) . Er liest Daten zu Leistung, Energie, System, Batteriekonfiguration und Wallbox aus. Unterstützte Batterie- und Wallbox-Einstellungen können auch über ioBroker geändert werden.

Die verfügbaren Werte hängen vom Systemmodell und den von Alpha ESS für dieses System bereitgestellten Funktionen ab.

## Merkmale

- Echtzeit-Leistungsdaten für PV-Anlagen, Netz, Lasten, Batterien und angeschlossene Ladegeräte
- Tägliche Gesamtenergiemengen und Systeminformationen
- Lade- und Entladepläne und SOC-Grenzwerte
- Zusammenfassende Werte, einschließlich monatlicher und jährlicher Statistiken
- Ausweich-Leistungsdaten für Systeme ohne Echtzeit-API-Unterstützung
- Wallbox-Status, Start-/Stopp-Steuerung und aktuelle Einstellung
- Statusinformationen zur Verbindungsqualität und zu API-Fehlern

## Anforderungen

- ioBroker mit js-controller 6.0.11 oder neuer und Admin 7.6.20 oder neuer
- Node.js 22 oder neuer
- Ein Alpha ESS-Konto und ein im Open API-Entwicklerportal registriertes System.
- Eine persönliche Anwendungs-ID, ein Anwendungsgeheimnis und die Seriennummer des Alpha ESS-Systems

Der Adapter nutzt die Cloud-API und benötigt daher einen Internetzugang. Er stellt keine direkte Verbindung zum Wechselrichter her und bietet auch keine Modbus-Verbindung.

## Aufstellen

1. Melden Sie sich im [Alpha ESS Open API-Portal](https://open.alphaess.com/) an und registrieren Sie das System.
2. Erstellen oder wählen Sie eine persönliche Anwendung aus, um deren Anwendungs-ID und geheimes Geheimnis zu erhalten.
3. Ermitteln Sie die Systemseriennummer (SN) und den Prüfcode. Alpha ESS dokumentiert den Registrierungsprozess im [Open-API-Repository](https://github.com/alphaess-developer/alphacloud_open_api) .
4. Installieren Sie den Adapter von der ioBroker-Adapterseite und erstellen Sie eine Instanz.
5. Geben Sie in den Instanzeinstellungen die Anwendungs-ID, das Anwendungsgeheimnis und die Systemseriennummer ein.
6. Aktivieren Sie nur die für das System erforderlichen Datengruppen und speichern Sie die Konfiguration.

Das Anwendungsgeheimnis wird von ioBroker als verschlüsselte und geschützte native Einstellung gespeichert. Veröffentlichen Sie es nicht in Fehlerberichten oder Protokollauszügen.

## Konfiguration

| Option                               | Einheit  | Beschreibung                                                                              |
| ------------------------------------ | -------- | ----------------------------------------------------------------------------------------- |
| Persönliche Anwendungs-ID            | —        | Anwendungs-ID aus dem Alpha ESS Open API-Portal                                           |
| Geheimnis der persönlichen Anwendung | —        | Geheimnis, das zur Anwendungs-ID gehört                                                   |
| Alpha ESS System-ID                  | —        | Systemseriennummer (SN)                                                                   |
| Echtzeitdaten                        | Sekunden | Leistungs- und SOC-Werte; Mindestintervall: 10 Sekunden                                   |
| Systeminformationen                  | Sekunden | Modell- und Systemmetadaten; Mindestintervall: 10 Sekunden                                |
| Aktuelle Leistungsdaten              | behoben  | Ruft alle 5 Minuten alternative Leistungsdaten für Systeme ohne Echtzeitunterstützung ab. |
| Energiedaten                         | Minuten  | Tägliche Energiegesamtmenge; Mindestintervall: 5 Minuten                                  |
| Ladeeinstellungen                    | Minuten  | Ladeplan und SOC-Grenze; Mindestintervall: 1 Minute                                       |
| Entladeeinstellungen                 | Minuten  | Entladeplan und SOC-Abschaltschwelle; Mindestintervall: 1 Minute                          |
| Zusammenfassende Daten               | Minuten  | Statistische Zusammenfassungen; Mindestintervall: 5 Minuten                               |
| Wallbox-Daten                        | Minuten  | Status der Wandbox und Start-/Stopp-Steuerung; Mindestintervall: 1 Minute                 |
| Wanddose aktuell                     | Sekunden | Aktuelle Einstellung der Wanddose; Mindestintervall: 10 Sekunden                          |
| Status unverändert aktualisieren     | —        | Schreibt eine neue Statusaktualisierung, auch wenn sich der Wert nicht geändert hat.      |

Kurze Intervalle erzeugen mehr Cloud-Anfragen. Verwenden Sie das längste für die Automatisierung geeignete Intervall und beachten Sie die Grenzen der Alpha ESS Open API.

## Datenpunkte

Die aktivierten und unterstützten Datengruppen werden unten angezeigt. `alpha-ess.<instance>`:

| Ordner               | Inhalt                                                 | Schreibbare Werte                   |
| -------------------- | ------------------------------------------------------ | ----------------------------------- |
| `Realtime`           | Aktuelle PV-, Netz-, Last-, Batterie- und Ladeleistung | —                                   |
| `Recent`             | Fünf-Minuten-Fallback-Stromdaten                       | —                                   |
| `System`             | Systemidentifikation und Metadaten                     | —                                   |
| `Energy`             | Tägliche Energiegesamtmenge                            | —                                   |
| `Settings_Charge`    | Ladezeiträume und Lade-SOC-Grenze                      | Alle Einstellungen in diesem Ordner |
| `Settings_Discharge` | Entladezeiten und SOC-Grenzwert                        | Alle Einstellungen in diesem Ordner |
| `Summary`            | Tages-, Monats-, Jahres- und Gesamtstatistiken         | —                                   |
| `Wallbox`            | Seriennummer, Modell, Status und Ladekontrolle         | `Charging_Start`, `Charging_Stop`  |
| `Wallbox_Current`    | Haushaltsstromeinstellung für die Wanddose             | Aktuelle Einstellung                |

Ordner und Zustände werden nur dann erstellt, wenn der entsprechende Endpunkt aktiviert ist und die API das Attribut zurückgibt. Nicht unterstützte oder deaktivierte Zustände können daher fehlen.

### Schreibeinstellungen

Schreiben Sie mit Bestätigung in einen beschreibbaren Zustand (`ack`) auf gesetzt `false`, wie ioBroker es bei Änderungen in der Objektansicht oder durch `setState(id, value, false)` Der Adapter sendet die gesamte Einstellungsgruppe an Alpha ESS und liest die Werte nach der Anfrage zurück. Vermeiden Sie mehrere gleichzeitige Schreibvorgänge auf Werte in derselben Gruppe.

Die Wallbox-Unterstützung verwaltet derzeit eine Wallbox pro Alpha ESS-System. Bevor Sie den Ladevorgang oder Stromänderungen automatisieren, überprüfen Sie bitte den zulässigen Bereich und das Verhalten des installierten Wallbox-Modells.

## Staatsqualität

Der `q` Das Attribut zeigt an, ob ein Wert aktuell ist:

| Qualität | Bedeutung                                                                                       |
| -------- | ----------------------------------------------------------------------------------------------- |
| `0x00`   | Der Wert ist aktuell.                                                                           |
| `0x01`   | Der Wert wurde nicht im erwarteten Intervall aktualisiert; siehe Debug-Protokoll.               |
| `0x02`   | Netzwerk- oder Cloud-Verbindungsproblem                                                         |
| `0x12`   | Der Adapter ist gestoppt oder getrennt.                                                         |
| `0x44`   | Die API hat einen Fehler zurückgegeben oder der Adapter hat einen internen Fehler festgestellt. |

`info.connection` Ist `true` nach einer erfolgreichen API-Antwort und `false` wenn die Kommunikation scheitert.

## Fehlerbehebung

- **Es wurden keine Zustände erstellt:** Stellen Sie sicher, dass die Datengruppe aktiviert ist, und überprüfen Sie das Debug-Protokoll. Einige Alpha ESS-Systeme unterstützen nicht alle Endpunkte.
- **Authentifizierung fehlgeschlagen:** Überprüfen Sie die Anwendungs-ID und das geheime Schlüsselwort und stellen Sie sicher, dass die System-SN für diese Anwendung im Open API-Portal registriert ist.
- **Zeitstempelfehler (`6006`):** Synchronisieren Sie die Hostuhr und die Zeitzone des ioBroker mithilfe von NTP.
- **Die Werte bleiben veraltet:** Überprüfen Sie die Statusqualität und das Debug-Protokoll, erhöhen Sie das Abfrageintervall und prüfen Sie, ob die Alpha ESS-Cloud erreichbar ist.
- **Ein geschriebener Wert ändert sich wieder:** Die API-Antwort ist maßgebend. Überprüfen Sie den vom System akzeptierten Wertebereich und das Format und vermeiden Sie es, dieselbe Einstellungsgruppe gleichzeitig zu schreiben.

Melden Sie ein Problem bitte mit folgenden Angaben: Adapterversion, Node.js- und js-Controller-Versionen, Systemmodell, betroffene Status-ID und ein Debug-Log einer fehlgeschlagenen Anfrage. Entfernen Sie zuvor das Anwendungsgeheimnis und alle anderen Zugangsdaten.

## Unterstützung

- [GitHub-Probleme](https://github.com/Gaspode69/ioBroker.alpha-ess/issues)
- [ioBroker-Forumsthread](https://forum.iobroker.net/topic/60009/)
- [Storion4you-Community-Thread](https://www.storion4you.de/thread/683)

## Haftungsausschluss

**Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele.**

## Changelog
### **WORK IN PROGRESS**
- (Gaspode) Adapter requires Node.js 22 or newer
- (Gaspode) Added Node.js 26 tests and updated development tooling
- (Gaspode) Improved setup, configuration, data point, and troubleshooting documentation
- (Gaspode) Improved the configuration layout on small screens

### 4.1.0 (2026-02-14)

- (Gaspode) Read and write wallbox current

### 4.0.0 (2025-11-01)

- (Gaspode) Update dependencies, Node.js version 20 or later is now required

### 3.0.1 (2024-12-22)

- (Gaspode) Optimizations of reading pseudo-realtime power data for slow systems

### 3.0.0 (2024-12-21)

- (Gaspode) **Breaking Change:** Renamed state "Charging_period 1_end" to "Charging_period_1_end"
- (Gaspode) Optimizations in configuration dialog

### 2.3.0 (2024-12-20)

- (Gaspode) Provides the ability to read pseudo-realtime power data using the API function getTodayPowerBySn. This feature is useful for systems that lack "realtime data support." When activated, data is fetched every 5 minutes and stored in the "Recent" folder.

### 2.2.0 (2024-12-16)

- (Gaspode) Provide system information data (getEssList)

### 2.1.6 (2024-12-01)

- (Gaspode) Migrated to ESLint 9

### 2.1.5 (2024-11-14)

- (Gaspode) Optimized GUI for all screen resolutions (responsive design)

### 2.1.4 (2024-08-13)

- (Gaspode) Updated some formal stuff

### 2.1.3 (2024-08-07)

- (Gaspode) Increased read timeout from 10 to 20 s

### 2.1.2 (2024-08-07)

- (Gaspode) Quality of states optimized

### 2.1.1 (2024-08-07)

- (Gaspode) Do not longer report read timeouts as error. It should be enough to set the quality of concerned states to values according the table above and to display warnings, if values were not updated for a long time. To see details, debug log level must be enabled by the user.

### 2.1.0 (2024-08-01)

- (Gaspode) Adapter requires node.js >= 18 and js-controller >= 5 now
- (Gaspode) Dependencies updated
- (Gaspode) Adapter logo updated. Alpha-ESS has kindly permitted to use the Alpha-ESS logo. This does not imply any affiliation with Alpha-ESS! Alpha-ESS is not the developer or provider of this adapter!

### 2.0.2 (2024-01-12)

- (Gaspode) Updated Copyright year

### 2.0.1 (2024-01-03)

- (Gaspode) Adapted timeout to new API restrictions

### 2.0.0 (2023-12-02)

- (Gaspode) Breaking Change: Removed support of Closed API

### 1.3.0 (2023-11-22)

- (Gaspode) Support wallbox with Open API
- (Gaspode) Start and stop charging of wallbox with Open API

### 1.2.1 (2023-11-11)

- (Gaspode) Fixed severe error in ClosedAPI

### 1.2.0 (2023-11-10)

- (Gaspode) Added additional realtime attributes for OpenAPI

### 1.1.1 (2023-11-04)

- (Gaspode) Closed API adapted to latest Alpha-ESS changes and enabled again

### 1.1.0 (2023-11-04)

- (Gaspode) Closed API disabled (temporarily?) because API has been changed by Alpha-ESS
- (Gaspode) Read back changed settings values 2 seconds after they have been changed

### 1.0.2 (2023-10-05)

- (mcm1957) Updated required node version to 16 or newer

### 1.0.1 (2023-10-03)

- (Gaspode) Adapted fetching energy values using 'Closed API' to latest API changes by Alpha-ESS

### 1.0.0 (2023-06-20)

- (Gaspode) Support also the new official OpenAPI provided by Alpha-ESS
- (Gaspode) Set state quality accordingly to status of data
- (Gaspode) Writing charging and discharging settings implemented for 'Closed API' and OpenAPI
- (Gaspode) Remove no more supported states at startup automatically

### 0.4.0 (2023-02-16)

- (Gaspode) Optimized deletion of group states
- (Gaspode) Added new Realtime state for pmeter_dc

### 0.3.0 (2023-02-11)

- (Gaspode) Read selected statistical data
- (Gaspode) Added Summary data
- (Gaspode) Refactored complete implementation
- (Gaspode) Changed the unit of settings for all intervals, except of realtime data, to minutes (Caution: settings are reset to defaults)
- (Gaspode) Remove disabled states at adapter startup
- (Gaspode) Removed no more supported value 'createtime' (state ID Realtime.Last_update).
- (Gaspode) Optimized rounding for selected values
- (Gaspode) Added states EV1_power, EV2_power, EV3_power and EV4_power to Realtime folder

### 0.1.0 (2023-01-15)

- (Gaspode) First release for Latest repository
- (Gaspode) Corrected typo in state ID Battery_SOC
- (Gaspode) Implemented improvements as suggested in code review
- (Gaspode) Slow down requests in case of permanent errors
- (Gaspode) Changed adapter type from metering to energy
- (Gaspode) Correction for NPM
- (Gaspode) Enable NPM

### 0.0.5

- (Gaspode) Use meaningful state names
- (Gaspode) Use suitable state roles
- (Gaspode) Added new state for Alpha-ESS settings parameter 'upsReserve'

### 0.0.4

- (Gaspode) use axios to perform Alpha-ESS API calls instead of deprecated request
- (Gaspode) New option "Update unchanged states" added

### 0.0.3

- (Gaspode) refactored API calls, added daily energy values

### 0.0.2

- (Gaspode) corrected api call for realtime data

### 0.0.1

- (Gaspode) initial release

## License

MIT License

Copyright (c) 2025-2026 Gaspode <gaspode69@online.de> (**NO SUPPORT VIA EMAIL**)

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