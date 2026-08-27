---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.flowers/README.md
title: ioBroker.flowers
hash: NrIRdHNMqL1rfOJL/gF7gA5hLcnFhfCCU6AhtMtAuVs=
---
# IoBroker.flowers
![Logo](../../../en/adapterref/iobroker.flowers/admin/flowers.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.flowers.svg)
![Lizenz](https://img.shields.io/badge/license-MIT-blue.svg)

Überwachen Sie Ihre Zimmerpflanzen mithilfe von Bodenfeuchtigkeits-, Temperatur- und Batteriesensoren und nutzen Sie Telegram-Benachrichtigungen.

Dieser Adapter funktioniert mit **allen in ioBroker integrierten Sensoren** (Zigbee, WLAN, Bluetooth, Z-Wave usw.) – es ist keine spezielle Hardware erforderlich. Beliebte kompatible Sensoren:

- [Xiaomi Mi Flora / HHCC Pflanzensensor](https://www.mi.com/global/mi-flora) — Bluetooth-basierte Messung von Bodenfeuchtigkeit, -temperatur und -licht
- [Zigbee-Bodenfeuchtesensoren](https://www.zigbee2mqtt.io/supported-devices/#s=soil) (z. B. Tuya TS0601, MOES) — über ioBroker Zigbee-Adapter
- Jeder Sensor, der Feuchtigkeits-/Temperatur-/Batteriezustände in ioBroker anzeigt

Benachrichtigungen werden über [ioBroker Telegram-Adapter](https://github.com/ioBroker/ioBroker.telegram) versendet.

## Merkmale
- Überwachung mehrerer Pflanzen mit individuellen Sensorzuweisungen
- Integrierte Pflanzenprofile (Ficus, Orchidee, Kaktus, Monstera, Farn, Sukkulente, Palme, Pothos, Aloe Vera, Friedenslilie, Coffea arabica, Rhapis excelsa, Calathea zebrina, Sansevieria Laurentii, Benutzerdefiniert)
- Benutzerdefinierte Profile: Erstellen Sie Ihre eigenen Pflanzenprofile mit individuellen Schwellenwerten auf der Registerkarte „Profile“.
- Konfigurierbare Schwellenwerte pro Anlage (überschreiben die Standardeinstellungen des Profils)
- Automatische Bewässerung: Die Bewässerung wird aktiviert, sobald die Bodenfeuchtigkeit unter einen Mindestwert sinkt.
- Konfigurierbare Bewässerungsdauer (Minuten)
- Telegram-Benachrichtigungen über `sendTo('telegram.X', ...)`
- Anti-Spam: Maximale Anzahl an Nachrichten pro Tag + konfigurierbare Abklingzeit pro Alarmtyp
- Nachtmodus: Benachrichtigungen während ruhiger Stunden unterdrücken.
- Tägliche und wöchentliche Anlagenstatusberichte mit manuellen Auslöseknöpfen
- Offline-Sensorerkennung

## Konfiguration
### Registerkarte „Einstellungen“
| Parameter | Beschreibung |
|-----------|-------------|
| Telegram-Instanz | Instanznummer des Telegram-Adapters |
| Telegram-Nutzer | Durch Komma getrennte Benutzernamen (leer = alle Nutzer) |
| Prüfintervall | Wie oft sollen die Sensorwerte geprüft werden? |
| Maximale Anzahl Nachrichten pro Tag | Anti-Spam-Limit |
| Offline-Schwellenwert | Stunden, bevor ein Sensor als offline gilt |
| Nachtmodus | Benachrichtigungen während der Nachtstunden unterdrücken |
| Tages-/Wochenbericht | Geplante Statusberichte |

### Pflanzen-Registerkarte
Fügen Sie Ihre Pflanzen hinzu und weisen Sie jedem Sensor eine ioBroker-Status-ID zu. Wählen Sie ein Profil aus – Schwellenwerte werden automatisch angewendet. Sie können die Schwellenwerte für jede Pflanze individuell anpassen.

Für die automatische Bewässerung weisen Sie eine **Bewässerungs**-Status-ID zu (z. B. einen Schalter, der eine Pumpe oder ein Ventil steuert). Sobald die Bodenfeuchtigkeit unter den Mindestwert sinkt, setzt der Adapter diesen Status für die konfigurierte Bewässerungsdauer auf `true` und anschließend wieder auf `false`.

### Registerkarte „Profile“
Übersicht der integrierten Profile mit empfohlenen Schwellenwerten. Sie können außerdem **benutzerdefinierte Profile** in der Tabelle oben erstellen – geben Sie dazu einen Namen und Schwellenwerte ein und verwenden Sie diesen Namen anschließend im Feld „Benutzerdefiniertes Profil“ auf der Registerkarte „Pflanzen“.

## Staaten
Der Adapter erzeugt Zustände unter `flowers.X.plants.<plant_name>`:

| Bundesland | Beschreibung |
|-------|-------------|
| `humidity` | Aktuelle Bodenfeuchtigkeit % |
| `battery` | Aktueller Akkustand in % |
| `Batterie` | Aktueller Batteriestand in % |

Und unter `flowers.X`:

| Bundesland | Beschreibung |
|-------|-------------|
| `info.connection` | Adapterverbindungsstatus |
| `notifications.sendDailyReport` | Schaltfläche: Täglichen Bericht manuell auslösen |
| `notifications.sendWeeklyReport` | Schaltfläche: Wöchentlichen Bericht manuell auslösen |
| `notifications.sendWeeklyReport` | Schaltfläche: Wöchentlichen Bericht manuell auslösen |

### Automatische Bewässerung
Weisen Sie im Reiter „Pflanzen“ einen **Bewässerungsstatus** zu (z. B. `zigbee.0.pump.state`). Wenn die Luftfeuchtigkeit unter den Mindestwert sinkt:

1. Der Adapter setzt den Bewässerungsstatus auf `true`.
2. Wartet die konfigurierte **Bewässerungsdauer** (Minuten) ab.
3. Setzt den Zustand wieder auf `false`.

Pro Pflanze wird jeweils nur ein Bewässerungszyklus durchgeführt. Die Dauer kann unter Einstellungen → Automatische Bewässerung konfiguriert werden.

## Changelog

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

For older changelog entries see [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT License  
Copyright (c) 2025-2026 sadam6752-tech <sadam6752@gmail.com>