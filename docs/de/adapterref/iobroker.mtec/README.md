---
chapters: {"pages":{"en/adapterref/iobroker.mtec/README.md":{"title":{"en":"ioBroker.mtec"},"content":"en/adapterref/iobroker.mtec/README.md"},"en/adapterref/iobroker.mtec/docs/profile-json.md":{"title":{"en":"Input profile `json`"},"content":"en/adapterref/iobroker.mtec/docs/profile-json.md"},"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md":{"title":{"en":"Input profile `mtecmqtt`"},"content":"en/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mtec/README.md
title: ioBroker.mtec
hash: 8kX9dheVcSIoWW/c48pzV5yaqUs+CWrCXfWaIPNrT2s=
---
# ioBroker.mtec

Liest einen M-TEC **Energy Butler** (Hybrid-Wechselrichter mit PV und Batterie) und eine M-TEC **Wärmepumpe** von einem MQTT-Broker, erstellt typisierte ioBroker-Datenpunkte und analysiert die Energieflüsse: Hausverbrauch, Selbstversorgungsgrad, Batterieprognose, PV-Überschuss, Kosten, Einsparungen und Tageswerte.

Der Adapter liest nur. Er schreibt niemals etwas zurück an die Geräte.

Hersteller: [M-TEC Systems](https://www.mtec-systems.com/en/) ( [Energie-Butler](https://www.mtec-systems.com/en/products/energy-butler/) , [Wärmepumpen](https://www.mtec-systems.com/en/heat-pumps/) )

> Dieser Adapter ist ein privates Community-Projekt. Er steht **in keiner Verbindung zu M-TEC und wird weder von M-TEC unterstützt noch empfohlen** . Alle Produktnamen gehören ihren jeweiligen Eigentümern.

Deutsche Beschreibung: [docs/de/README.md](https://github.com/derDennis99/ioBroker.mtec/blob/main/docs/de/README.md)

## Datenquellen

Der Adapter kommuniziert nicht direkt mit den Geräten. Er liest deren Werte von einem MQTT-Broker in einem von zwei Formaten („Eingabeprofile“). Die Datenquelle wird pro Gerät ausgewählt:

| Profil     | Geräte                        | Quelle                                                                                                                                                                                                                           |
| ---------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `json`     | Energie-Butler und Wärmepumpe | Ein Thema pro Gerät mit einer JSON-Nachricht `fields` Und `timestamp` Jede beliebige Quelle kann es erzeugen, beispielsweise Node-RED oder ein Skript. [Formatbeschreibung](/#/docs/adapterref/iobroker.mtec/docs/profile-json.md) |
| `mtecmqtt` | Energie-Butler                | Der MQTT-Ausgang von [MTECmqtt](https://github.com/croedel/MTECmqtt) . [Details und Zuordnung](/#/docs/adapterref/iobroker.mtec/docs/profile-mtecmqtt.md)                                                                        |

Der Energiebutler kann beispielsweise über folgende Wege kommen: `mtecmqtt` und die Wärmepumpe über `json` gleichzeitig.

Ein direkter Zugriff über Modbus (ohne zusätzliche Software) ist für eine spätere Version geplant.

## Installation

Voraussetzungen: Node.js 22 oder neuer, js-controller 6.0.11 oder neuer, admin 7.6.20 oder neuer.

Der Adapter ist auf npm veröffentlicht und wird dem ioBroker-Repository hinzugefügt. Sobald er dort gelistet ist, suchen Sie in der Adapterliste der Administration nach „mtec“, installieren Sie ihn und erstellen Sie eine Instanz.

## Konfiguration

| Einstellung                               | Bedeutung                                                                                                                                                                                                                                     |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Energie-Butler, Wärmepumpe                | Datenquelle pro Gerät: `json`, `mtecmqtt` (Nur Energie-Butler) oder „nicht vorhanden“                                                                                                                                                          |
| Themen (`json`)                          | Ein Thema pro Gerät                                                                                                                                                                                                                           |
| Themenpräfix, Seriennummer (`mtecmqtt`)  | `MQTT_TOPIC` von MTECmqtt (Standard) `MTEC`); leere Seriennummer = erste gesehene                                                                                                                                                             |
| Daten gelten als veraltet, wenn           | Limit für `info.stale` (Standardwert 20 s)                                                                                                                                                                                                     |
| Langsame MTECmqtt-Gruppen werden nach dem | Grenzwert für Phasen- und PV-Stringwerte (Standardwert 180 s)                                                                                                                                                                                 |
| Broker, Port, Benutzer, Passwort          | Verbindung zum MQTT-Broker, nur erforderlich für `json` Und `mtecmqtt` Das Passwort wird verschlüsselt gespeichert.                                                                                                                             |
| Analyse                                   | Nutzbare Batteriekapazität, minimaler Ladezustand, Netzpreis und Einspeisevergütung (Cent pro kWh, 0 = nicht festgelegt, Werte unter 1 werden als Währungseinheiten pro kWh gelesen), Währung, Schwellenwert für „überschüssige Solarenergie“ |

Die Einstellungen der Version 0.4 und älter (ein Eingabeprofil für beide Geräte) werden beim ersten Start automatisch übernommen; die Instanz wird einmal neu gestartet.

Wenn alles funktioniert, `mtec.0.info.connection` Ist `true` die unten stehenden Datenpunkte `mtec.0.butler.*` (Und `mtec.0.heatpump.*`) auffüllen und `info.stale` Ist `false` Die

## Datenpunkte

| Weg                              | Inhalt                                                                      |
| -------------------------------- | --------------------------------------------------------------------------- |
| `info.connection`                | `true` wenn alle konfigurierten Datenquellen verbunden sind                 |
| `heatpump.<field>`               | 25 Werte der Wärmepumpe mit Einheit und Funktion, Statuscodes mit Texten    |
| `butler.<field>`                 | 16 Werte des Energiebutlers                                                 |
| `butler.mtecmqtt.<group>.<name>` | Weitere Werte von MTECmqtt (Profil) `mtecmqtt` nur)                          |
| `<device>.info.connection`       | Verbindung der Datenquelle des Geräts (mit `json` Und `mtecmqtt` (der Makler) |
| `<device>.info.lastMeasurement`  | Zeitpunkt der letzten Messung (ms)                                          |
| `<device>.info.stale`            | `true` wenn die letzte Messung älter als der konfigurierte Grenzwert ist    |
| `butler.info.serial`             | Seriennummer (Profil) `mtecmqtt` nur)                                        |

- **Messzeitpunkt:** Mit `json` Jeder Wert erhält den Messzeitpunkt aus der Nachricht. `ts` Historienadapter speichern daher die Echtzeit-Messzeit.
- **Fehlend ist nicht 0:** Ein Wert, der nicht gemeldet wird, wird zu `null` mit Qualität `0x82` (Sensor meldete keinen Wert); ein alter Wert wird nicht gespeichert.
- **Aus eigener Logik:** Immer prüfen `info.stale` bevor ein Wert für eine Schaltentscheidung verwendet wird.

## Analyse

Unten `analysis` Der Adapter berechnet die Werte anhand der Live-Werte des Energy Butler:

| Datenpunkt                                                                                 | Inhalt                                                                                                                              |
| ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `house_power_w` /`house_without_heatpump_w`                                                | Aktueller Hausverbrauch (PV + Import + Entladung − Export − Laden), mit und ohne Wärmepumpe                                         |
| `autarky_percent` /`self_consumption_percent`                                              | Selbstversorgung und PV-Eigenverbrauch jetzt                                                                                        |
| `surplus_w` /`surplus_available`                                                           | PV-Überschuss (5-Minuten-Mittelwert) und „Solarstromreserve“ (mit Hysterese)                                                        |
| `battery_energy_kwh`, `battery_full_in_min`, `battery_empty_in_min`, `battery_status_text` | Akkuinhalt und Prognose, z. B. „vollständig in 2 Stunden 15 Minuten (ca. 14:35 Uhr)“                                                |
| `cost_now_per_h` /`savings_now_per_h`                                                      | Stromkosten und Einsparungen pro Stunde jetzt (nur bei einem festgelegten Preis)                                                    |
| `grid_balance_per_h` /`grid_balance_text`                                                  | Netzbilanz jetzt: + Einspeiseerlös / − Importkosten pro Stunde, als Zahl und als Text ("+0,27 €/h")                                 |
| `today.*`                                                                                  | Tageswerte seit Mitternacht: PV, Import, Export, Batterie, Haus, Wärmepumpe (Strom, Wärme, COP), Selbstversorgung, `cost`, `savings` |

Die Beträge werden in der konfigurierten Währung angegeben. Die Texte entsprechen der Systemsprache (Deutsch oder Englisch).

Die Tageswerte werden aus der Leistung geschätzt (Leistung × Zeit seit der vorherigen Messung, Lücken von mehr als 60 s werden übersprungen) und überstehen einen Neustart am selben Tag. Mit dem Profil `mtecmqtt` Die tatsächlichen täglichen Energiezähler des Energy Butler ersetzen die Schätzung.

## Überprüfung eines Brokers

Für das Profil `json`, `tools/mqtt-check.mjs` hört einige Sekunden lang zu und vergleicht die Felder mit den Definitionen des Adapters. `--user` Es fragt nach dem Passwort (verstecktes Eingabefeld oder von `MQTT_PASSWORD`):

```bash
node tools/mqtt-check.mjs --host <broker> --user <user>
```

## Entwicklung

```bash
npm install
npm test
```

Die Tests umfassen sowohl die Eingangsprofile als auch die Analyse und den gesamten Pfad durch einen lokalen MQTT-Broker (aedes). `npm run test:integration` zusätzlich startet der Adapter in einem echten js-Controller und überprüft den Datenfluss von einem lokalen Broker. `npm run lint` prüft den Code-Stil und `npm run check` die Typen (TypeScript auf den JavaScript-Quellen).

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.5.1 (2026-11-15)

- No more "DB closed" errors in the log when the settings of 0.4 are taken over: the instance now only restarts and starts working after the restart

### 0.5.0 (2026-11-15)

- Data source per device (`butlerSource`, `heatpumpSource`, also "not present"), the MQTT broker is only needed for MQTT sources. Existing settings are taken over automatically.
- New data points `butler.info.connection` and `heatpump.info.connection`; `info.connection` is `true` if all configured data sources are connected
- Profile `json`: new fields are only created if their name consists of a-z, 0-9 and _ (starting with a letter, not `info` or `mtecmqtt`); other names are ignored with a warning, so a message can no longer create IDs with dots or overwrite `<device>.info.*`
- Profile `mtecmqtt`: IDs below `butler.mtecmqtt` are always lowercase
- Link to the manufacturer in the README
- (dev) Type checking of the sources (`npm run check`, also in CI), VS Code schema settings, automerge for Dependabot updates, older changelog entries moved to CHANGELOG_OLD.md

### 0.4.2 (2026-10-18)

- Data point and channel names in all ioBroker languages

### 0.4.1 (2026-10-18)

- Timers use the adapter API (setInterval/setTimeout of the adapter)
- German description moved to docs/de/README.md
- Author contact added

### 0.4.0 (2026-10-17)

- (breaking) Money data points renamed: `analysis.cost_now_eur_h` → `cost_now_per_h`, `savings_now_eur_h` → `savings_now_per_h`, `grid_balance_eur_h` → `grid_balance_per_h`, `today.cost_eur` → `today.cost`, `today.savings_eur` → `today.savings`. Today's values are taken over, the old objects are deleted.
- New input profile `mtecmqtt`: Energy Butler via the MQTT output of MTECmqtt, including further values and real daily energy counters
- Input profile selection in the admin interface
- English as base language: log messages, data point names (English and German), admin interface with translations; texts follow the system language
- Public description of the `json` format
- (breaking) Requires Node.js 22, js-controller 6.0.11 and admin 7.6.20 or newer
- Admin interface and adapter description in all ioBroker languages
- New adapter icon

Older changes: CHANGELOG_OLD.md

## License

MIT License

Copyright (c) 2026 derDennis99 <mc@nucs.eu>

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