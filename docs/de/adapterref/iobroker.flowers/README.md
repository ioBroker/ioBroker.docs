---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flowers/README.md
title: ioBroker.flowers
hash: IPVnZBXI8WrCHJI+HNruuBA8EghNZ6EzPvlJUG+BrQQ=
---
# ioBroker.flowers

![Stabil](https://iobroker.live/badges/flowers-stable.svg)
![NPM-Version](https://img.shields.io/npm/v/iobroker.flowers.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.flowers.svg)
![Lizenz](https://img.shields.io/github/license/sadam6752-tech/ioBroker.flowers.svg)
![NPM](https://nodei.co/npm/iobroker.flowers.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.flowers/actions/workflows/test-and-release.yml/badge.svg)
![Anzahl der Installationen](https://iobroker.live/badges/flowers-installed.svg)

![Logo](../../../en/adapterref/iobroker.flowers/admin/flowers.png)

Überwachen Sie Ihre Zimmerpflanzen mithilfe von Bodenfeuchtigkeits-, Temperatur- und Batteriesensoren und nutzen Sie Telegram-Benachrichtigungen.

Dieser Adapter funktioniert mit **allen in ioBroker integrierten Sensoren** (Zigbee, WLAN, Bluetooth, Z-Wave usw.) – es ist keine spezielle Hardware erforderlich. Beliebte kompatible Sensoren:

- [Xiaomi Mi Flora / HHCC Pflanzensensor](https://www.mi.com/global/mi-flora) – Bluetooth-fähiger Sensor für Bodenfeuchtigkeit, -temperatur und -licht
- [Zigbee-Bodenfeuchtesensoren](https://www.zigbee2mqtt.io/supported-devices/#s=soil) (z. B. Tuya TS0601, MOES) – über ioBroker Zigbee-Adapter
- Jeder Sensor, der Feuchtigkeits-/Temperatur-/Batteriezustände in ioBroker anzeigt

Benachrichtigungen werden über den [ioBroker Telegram-Adapter](https://github.com/ioBroker/ioBroker.telegram) versendet.

## Merkmale

- Überwachen Sie mehrere Pflanzen mit individuellen Sensorzuweisungen
- Integrierte Pflanzenprofile (Ficus, Orchidee, Kaktus, Monstera, Farn, Sukkulente, Palme, Pothos, Aloe Vera, Friedenslilie, Coffea arabica, Rhapis excelsa, Calathea zebrina, Sansevieria Laurentii, Benutzerdefiniert)
- Benutzerdefinierte Profile: Erstellen Sie Ihre eigenen Pflanzenprofile mit individuellen Schwellenwerten auf der Registerkarte „Profile“.
- Konfigurierbare Schwellenwerte pro Anlage (überschreiben die Standardeinstellungen des Profils)
- Automatische Bewässerung: Die Bewässerung wird aktiviert, sobald die Bodenfeuchtigkeit unter einen Mindestwert sinkt.
- Konfigurierbare Bewässerungsdauer (Minuten)
- Telegram-Benachrichtigungen via `sendTo('telegram.X', ...)`
- Anti-Spam: Maximale Anzahl an Nachrichten pro Tag + konfigurierbare Abklingzeit pro Alarmtyp
- Nachtmodus: Benachrichtigungen während ruhiger Stunden unterdrücken.
- Tägliche und wöchentliche Anlagenstatusberichte mit manuellen Auslöseknöpfen
- Offline-Sensorerkennung

## Konfiguration

### Registerkarte „Einstellungen“

| Parameter                           | Beschreibung                                                |
| ----------------------------------- | ----------------------------------------------------------- |
| Telegram-Instanz                    | Instanznummer des Telegram-Adapters                         |
| Telegram-Nutzer                     | Durch Kommas getrennte Benutzernamen (leer = alle Benutzer) |
| Prüfintervall                       | Wie oft sollten die Sensorwerte überprüft werden?           |
| Maximale Anzahl Nachrichten pro Tag | Anti-Spam-Limit                                             |
| Offline-Schwellenwert               | Stunden bevor der Sensor als offline gilt                   |
| Nachtmodus                          | Benachrichtigungen während der Nachtstunden unterdrücken    |
| Tages-/Wochenbericht                | Geplante Statusberichte                                     |

### Registerkarte „Pflanzen“

Fügen Sie Ihre Pflanzen hinzu und weisen Sie jedem Sensor eine ioBroker-Status-ID zu. Wählen Sie ein Profil aus – Schwellenwerte werden automatisch angewendet. Sie können die Schwellenwerte für jede Pflanze individuell anpassen.

Für die automatische Bewässerung weisen Sie eine **Bewässerungsstatus** -ID zu (z. B. einen Schalter, der eine Pumpe oder ein Ventil steuert). Wenn die Bodenfeuchtigkeit unter den Mindestwert sinkt, stellt der Adapter diesen Status ein. `true` für die konfigurierte Bewässerungsdauer, dann wird es wieder auf den vorherigen Wert zurückgesetzt. `false` Die

### Registerkarte „Profile“

Übersicht der integrierten Profile mit empfohlenen Schwellenwerten. Sie können auch **benutzerdefinierte Profile** in der Tabelle oben erstellen – geben Sie dazu einen Namen und Schwellenwerte ein und verwenden Sie diesen Namen anschließend im Feld „Benutzerdefiniertes Profil“ auf der Registerkarte „Pflanzen“.

## Staaten

Der Adapter erzeugt Zustände unter `flowers.X.plants.<plant_name>`:

| Zustand       | Beschreibung                 |
| ------------- | ---------------------------- |
| `humidity`    | Aktuelle Bodenfeuchtigkeit % |
| `temperature` | Aktuelle Temperatur °C       |
| `battery`     | Aktueller Akkustand in %     |

Und unter `flowers.X`:

| Zustand                          | Beschreibung                                         |
| -------------------------------- | ---------------------------------------------------- |
| `info.connection`                | Adapterverbindungsstatus                             |
| `notifications.totalToday`       | Benachrichtigungen wurden heute versendet            |
| `notifications.sendDailyReport`  | Schaltfläche: Täglichen Bericht manuell auslösen     |
| `notifications.sendWeeklyReport` | Schaltfläche: Wöchentlichen Bericht manuell auslösen |

### Automatische Bewässerung

Weisen Sie einen **Bewässerungsstatus** zu (z. B. `zigbee.0.pump.state`) im Reiter „Pflanzen“. Wenn die Luftfeuchtigkeit unter den Mindestwert sinkt:

1. Der Adapter stellt den Bewässerungszustand ein auf `true`
2. Wartet die konfigurierte **Bewässerungsdauer** (Minuten) ab
3. Setzt den Zustand zurück auf `false`

Pro Pflanze wird jeweils nur ein Bewässerungszyklus durchgeführt. Die Dauer kann unter Einstellungen → Automatische Bewässerung konfiguriert werden.

## Changelog

### **WORK IN PROGRESS**
- (sadam6752-tech) `@iobroker/testing` 6.3.2 (repository checker W0037)

### 0.4.8
- (sadam6752-tech) Fix W1032: reduce common.news to the latest 7 entries

### 0.4.7
- (sadam6752-tech) Fix W0037: update @iobroker/testing to 6.3.0

### 0.4.6
- (sadam6752-tech) Fix E6029/W6030: add the missing changelog entry for 0.4.5
- (sadam6752-tech) Fix W6034: complete MIT license text in the README
- (sadam6752-tech) CI: Node.js 26 in the test matrix and a new deploy job using npm Trusted Publishing (OIDC) with provenance

### 0.4.5
- (sadam6752-tech) Fix S0064: update @alcalzone/release-script-plugin-license to 5.2.2

### 0.4.4
- (sadam6752-tech) Fix S0082: update @tsconfig/node22 devDependency to 22.0.5

### 0.4.3
- (sadam6752-tech) Fix W0034: update declared @iobroker/adapter-core range to ^3.4.3
- (sadam6752-tech) Fix S5601: migrate i18n to short format ({lang}.json)
- (sadam6752-tech) Fix W1032: trim news to 7 entries

### 0.4.2
- (sadam6752-tech) Update @iobroker/adapter-core to 3.4.3
- (sadam6752-tech) Downgrade @types/node to ^22 (fix W0066)
- (sadam6752-tech) Add @tsconfig/node22 with extends in tsconfig.json (fix S0085/S0088)
- (sadam6752-tech) Trim old news entries (fix W1032)

### 0.4.1 (2026-06-20)
- (sadam6752-tech) Fix W5612: add missing i18n keys for Custom Profiles and placeholder fields
- (sadam6752-tech) Update engines.node to >=22; remove Node.js 20 from test matrix
- (sadam6752-tech) Add prettier.config.mjs, tsconfig.json, @types/node; update devDependencies

### 0.4.0 (2026-05-14)
- (sadam6752-tech) Fix object hierarchy: change plants container from `channel` to `folder` type to allow device children

### 0.3.9 (2026-04-30)
- (sadam6752-tech) Fix button state roles: set `read=false` for `sendDailyReport` and `sendWeeklyReport` buttons (required by ioBroker role spec)

### 0.3.8 (2026-04-30)
- (sadam6752-tech) Auto-cleanup: remove ioBroker objects for plants deleted from config on adapter start

### 0.3.7 (2026-04-30)
- (sadam6752-tech) Fix E8915: add dependabot cooldown (`default-days: 7`) for npm ecosystem
- (sadam6752-tech) Update CI/CD: `check-and-lint` and `deploy` steps to Node.js 24.x
- (sadam6752-tech) Remove redundant `eslint` devDependency (included via `@iobroker/eslint-config`)
- (sadam6752-tech) Add CHANGELOG_OLD.md for older changelog entries

### 0.3.6 (2026-03-31)
- (sadam6752-tech) Fix dependabot config to track all package.json in subdirectories (W8905)
- (sadam6752-tech) Add .github/auto-merge.yml for dependabot automerge configuration (S8914)

### 0.3.5 (2026-03-31)
- (sadam6752-tech) Fix .releaseconfig.json plugins format (array instead of object)

### 0.3.4 (2026-03-31)
- (sadam6752-tech) Add unit tests for MonitorService, NotificationManager and messages (106 tests total)
- (sadam6752-tech) Update README with links to compatible devices and Telegram adapter
- (sadam6752-tech) Remove mocha from devDependencies (already included in @iobroker/testing)

### 0.3.3 (2026-03-30)
- (sadam6752-tech) Fix object hierarchy: create device/channel parent objects before states
- (sadam6752-tech) Use correct state roles: value.humidity, value.temperature, value.battery
- (sadam6752-tech) Improve unload: null timers after clearing, guard monitor null check

### 0.3.2 (2026-03-30)
- (sadam6752-tech) Custom profiles: users can create own plant profiles in Profiles tab
- (sadam6752-tech) Custom profile field in Plants table for direct profile name entry

For older changelog entries see CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2025-2026 sadam6752-tech <sadam6752@gmail.com>

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