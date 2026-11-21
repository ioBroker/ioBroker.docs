---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.remko/README.md
title: ioBroker.remko
hash: 4KPtUQOzEkAEa1uVsA8l3v4zWlOWKJZ64iBnw7OpKOY=
---
![Logo](../../../en/adapterref/iobroker.remko/admin/remko.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.remko.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.remko.svg)
![Anzahl der Installationen](https://iobroker.live/badges/remko-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/remko-stable.svg)
![Spenden](https://img.shields.io/badge/paypal-donate%20%7C%20spenden-blue.svg)
![Test und Freigabe](https://github.com/mrdimixx/ioBroker.remko/workflows/Test%20and%20Release/badge.svg)

# ioBroker.remko

## REMKO Wärmepumpenadapter für ioBroker

Liest und steuert **REMKO-Wärmepumpen mit Smart-Web / Smart-Control** (Firmware 4.26 und neuer) lokal über MQTT. Keine Cloud und kein zusätzlicher MQTT-Broker erforderlich.

Getestet mit: REMKO WKF 100, Smart-Web Firmware 4.28. Feedback zu anderen Modellen (WKF, WSP, LWM, KWT …) ist sehr willkommen – bitte erstellen Sie ein Issue.

Hersteller: [REMKO GmbH & Co. KG](https://www.remko.de)

> **Haftungsausschluss:** Dieses Projekt steht in keiner Verbindung zu REMKO GmbH & Co. KG und wird weder von dieser unterstützt noch empfohlen. REMKO ist eine Marke des jeweiligen Inhabers. Nutzung auf eigene Gefahr.

## So funktioniert es

Die Smart-Control-Einheit betreibt einen eigenen MQTT-Broker (WebSocket-Port 9001, der auch von der Web-Oberfläche verwendet wird, und TCP-Port 1883). Beim Start liest der Adapter alle benötigten Daten **direkt von der Web-Oberfläche der Wärmepumpe** .

| Quelle                                   | Inhalt                                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `/js/smt.min.js`                         | Firmware-Version → Thema (z. B. `V04P28/SMTID`), MQTT-Zugangsdaten                                                                |
| `/json/smt18.json` +`/json/smtmain.json` | vollständige Registerdatenbank (\~2.150 Register): Typ, Bereich, Dezimalstellen, Einheit, Texte, Menüstruktur, Anzeigebedingungen |

Kein Register ist fest codiert – andere Modelle und Firmware-Versionen bringen ihre eigenen Definitionen mit.

Protokoll:

- lesen: `CLIENT2HOST` ←`{"FORCE_RESPONSE":true,"query_list":[1082,5039,…],"CLIENT_ID":"SMT123I0000000000000000"}`
- Antwort: `HOST2CLIENT` →`{"values":{"1082":"01C2","5039":"01DC",…}}` (Big-Endian-Hexadezimaldarstellung, skaliert gemäß der Registerdatenbank)
- schreiben: dieselbe Anfrage mit `"values":{"1082":"01E0"}`

## Konfiguration

| Option                                         | Beschreibung                                                                                                    |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| IP-Adresse                                     | IP-Adresse des Smart-Web / Smart-Control                                                                        |
| Transport / Hafen                              | WebSocket 9001 (Standard, wie die Web-Oberfläche) oder MQTT TCP 1883                                            |
| MQTT-Passwort / -Thema                         | Feld leer lassen – wird automatisch von der Web-Oberfläche gelesen.                                             |
| Schnelle Abfrage / vollständige Aktualisierung | Intervall der Schnellabfrage (Übersichtswerte) und der vollständigen Aktualisierung aller Register              |
| Welche Datenpunkte                             | wie die Web-Benutzeroberfläche (Benutzer, Status, Übersicht) oder zusätzlich Service / Experte / Inbetriebnahme |
| Beschreibbare Register                         | Aus, Benutzermenü (empfohlen) oder alle Parameter (Expertenmodus)                                               |

## Objekte

Der Adapter wertet die **Anzeigebedingungen der Web-Benutzeroberfläche** aus (z. B. „Solar nur, wenn eine Solaranlage aktiviert ist“), sodass nur Datenpunkte erstellt werden, die in Ihrer Anlage vorhanden sind. Die Struktur entspricht dem Menü des Controllers:

- `remko.0.information.<area>.<no>` – Benutzer → Information (z. B. `information.domestic_hot_water.5039`)
- `remko.0.settings.<area>.<no>` – Benutzer → Einstellungen (z. B. `settings.domestic_hot_water.1082`)
- `remko.0.status.<no>` – Statusseite
- `remko.0.overview…`, `remko.0.homescreen…` – Grundanzeige sowie Werte, die immer ausgelesen werden, aber keinen eigenen Menüeintrag haben.
- `remko.0.refrigerant_circuit.<no>` – Kältemittelkreislauf gemäß dem Schema „Wärmepumpe“ der Web-Benutzeroberfläche (Heißgas 5146, Sauggas 5612, Flüssigkeit 5139, Verdampfer/Register 5200, Expansionsventil 5615, 4-Wege-Ventil 5136); immer im Schnellzyklus auslesen, unabhängig von der Menüebene
- optional `service…`, `expert…`, `commissioning…`
- `remko.0.general.<no>` /`remko.0.additional.<no>` – Werte ohne Menü / alle anderen Werte (Option "alle anzeigen")

Die Ordner-IDs sind englisch: Sie werden aus den englischen Menütexten des Controllers abgeleitet (z. B. `settings`, `domestic_hot_water`, `meter_readings` Nur wenn der Controller keinen englischen Text für ein Menü hat, wird der deutsche Text verwendet.

Die Registernummer ist immer der letzte Teil der ID. Namen, Einheiten, Min-/Max-Werte und Aufzählungen (`common.states` Die Angaben stammen von der Wärmepumpe. Namen und Nummerierungstexte werden übersetzt, sofern die Steuerung englische Texte liefert; andernfalls wird der Text exakt so angezeigt, wie er vom Gerät empfangen wurde.

Wichtige Register (WKF 100):

| NEIN                        | Bedeutung                                                                           |
| --------------------------- | ----------------------------------------------------------------------------------- |
| 1079                        | Warmwassermodus (0 Komfort, 1 Eco, 2 Nur Solar/PV, 3 Aus)                           |
| 1082                        | Warmwasser-Sollwert                                                                 |
| 1951 / 1088                 | Raumklimamodus                                                                      |
| 1893 / 1894                 | Abwesenheit / Partei                                                                |
| 1946                        | kälter / wärmer                                                                     |
| 5693                        | 1x Warmwasserbereitung (Taste)                                                      |
| 1269 / 1270                 | Warmwasser-Sollwert, SG-Bereitschaftszustand 3/4                                    |
| 1902 / 1258                 | Heizsollwert SG-Bereitschaftszustand 3/4                                            |
| 2142, 1719–1722, 1679, 2164 | PV-Eigenverbrauch / Einfluss                                                        |
| 5001                        | aktueller Betriebsmodus                                                             |
| 5032 / 5039 / 5132 / 5581   | Außentemperatur / Warmwasser-Isttemperatur / Vorlauftemperatur / Rücklauftemperatur |
| 5320 / 5321                 | elektrische / thermische Leistung                                                   |
| 5105 / 5119                 | elektrische / thermische Energie                                                    |
| 5359 / 5565                 | PV-Leistung / PV-Ertrag (aus dem Eingangssignal des Wärmepumpenzählers)             |
| 5174 / 5572                 | Nutzschloss / verbleibende Schlosszeit                                              |

### Schreibschutz

- **Aus** : Nur lesen
- **Benutzermenü** (Standard): Nur Einträge, die auch im Benutzermenü des Reglers geändert werden können. Netzwerk-, Passwort- und Installationsregister sind immer gesperrt. Aktionen: Nur „1x Warmwasserbereitung“ und „Störung zurücksetzen“.
- **Alle Parameter** : Expertenmodus – inklusive Service-/Installationswerten und kritischen Aktionen (Aktualisierung, Neustart, Zurücksetzen). Vorsicht beim Umgang!

Werte außerhalb des zulässigen Bereichs werden vom Adapter abgelehnt.

## Test ohne Installation

```
node tools/probe.js <ip-of-heat-pump>                  # read only
node tools/probe.js <ip-of-heat-pump> --write 1082=46  # write one value
```

## Spenden

Wenn Ihnen dieser Adapter gefällt und Sie seine Weiterentwicklung unterstützen möchten, können Sie mir einen Kaffee spendieren:

## Credits

Das Protokollwissen basiert teilweise auf [Altrec/remko\_mqtt-ha](https://github.com/Altrec/remko_mqtt-ha) , [fuchsi585/remko\_http](https://github.com/fuchsi585/remko_http) und [Christoph-87/remko-smartweb-ha](https://github.com/Christoph-87/remko-smartweb-ha) .

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.6.2 (2026-11-03)
- (mrdimixx) objects are no longer deleted while the adapter is running: values that are currently hidden by a display condition (e.g. register did not answer yet, operating mode changed) keep their object and user settings and are still updated. Only on start, really obsolete objects are removed (renamed ids, registers that cannot appear with the current settings, empty folders)
- (mrdimixx) errors while processing MQTT messages are logged instead of restarting the adapter

### 0.6.1 (2026-10-24)
- (mrdimixx) **Breaking:** folder ids below the menu of the controller are now derived from its English menu texts (e.g. `einstellungen.warmwasser` → `settings.domestic_hot_water`, `information.zaehlerstaende` → `information.meter_readings`, `uebersicht` → `overview`). Old objects are removed automatically; user settings (e.g. history, SourceAnalytix) are taken over by register number. Please adapt scripts and visualisations.
- (mrdimixx) folder names are always translation objects (German controller text as fallback if there is no English text)
- (mrdimixx) timer intervals are limited to the maximum supported by Node.js
- (mrdimixx) writable energy registers get role `level`
- (mrdimixx) unused setting `httpPort` removed

### 0.6.0 (2026-10-22)
- (mrdimixx) **Breaking:** folder ids defined by the adapter are now English: `kaeltekreis` → `refrigerant_circuit`, `uebersicht` (values without menu) → `overview`, `allgemein` → `general`, `weitere` → `additional`, `experte` → `expert`, `inbetriebnahme` → `commissioning`. Old objects are removed automatically, user settings (e.g. history) are taken over. Please adapt scripts and visualisations.
- (mrdimixx) folder names and enumeration texts (`common.states`) are translated; English names never fall back to German texts
- (mrdimixx) `tools/probe.js` output is English
- (mrdimixx) cache meta object is created with `setObjectNotExistsAsync`
- (mrdimixx) dependencies updated

### 0.5.1 (2026-10-08)
- (mrdimixx) read-only values no longer get min/max (fixes warnings like `remko.0.status.5026 has value 1082 greater than max 999`)

### 0.5.0 (2026-10-08)
- (mrdimixx) all values are re-published during the full refresh (fresh timestamp), so visualisations started later also get rarely changing settings
- (mrdimixx) new folder `kaeltekreis` with the refrigerant circuit values of the web UI scheme (hot gas, suction gas, liquid, evaporator temperature, expansion valve, 4-way valve), read in the fast cycle

### 0.4.0 (2026-09-30)
- (mrdimixx) object structure fixed (ioBroker object checker): only valid roles (`value`/`level` instead of `value.mode`/`level.mode`), writable power settings use `level`
- (mrdimixx) actions are write-only buttons (`read: false`); actions that are not allowed are no longer created
- (mrdimixx) object names in all ioBroker languages (texts from the controller, English as fallback)
- (mrdimixx) existing objects are replaced on update so outdated attributes disappear (user settings like history are kept)

### 0.3.3 (2026-09-30)
- (mrdimixx) registers containing secrets (service/expert passwords, session id, unlock code, SMT-ID) are no longer read or created; existing objects are removed automatically

### 0.3.2 (2026-09-28)
- (mrdimixx) PayPal donation link added (README, GitHub sponsor button, npm funding)

### 0.3.1 (2026-09-28)
- (mrdimixx) release via GitHub Actions (npm trusted publishing with provenance)

### 0.3.0 (2026-09-28)
- (mrdimixx) prepared for the ioBroker repository: English README, translations, tests, GitHub Actions, npm deployment
- (mrdimixx) log messages in English

### 0.2.1 (2026-09-28)
- (mrdimixx) actions (e.g. 5693 "1x DHW heating", 2126 "reset fault") as buttons; critical actions only in write mode "all"
- (mrdimixx) role of the coefficient of performance fixed

### 0.2.0 (2026-09-28)
- (mrdimixx) only registers that are also shown by the web UI (display conditions)
- (mrdimixx) objects structured by menu; old 0.1 objects are removed automatically

Older changes can be found in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 mrdimixx <stoppeld@gmx.de>

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