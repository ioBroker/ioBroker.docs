---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.advansol-optimizer/README.md
title: ioBroker AdvanSol Optimizer Adapter
hash: o+V5YUEn2dXND5DQ2q7YTAaVTP3BQoSM+u3pszUUMS8=
---
# IoBroker AdvanSol Optimizer Adapter
ioBroker-Adapter für AdvanSol DCON-WIFI / MRO/MR-Optimierer, die über eine TCP-zu-RS485-Brücke, beispielsweise einen Waveshare ETH-zu-RS485-Adapter, verbunden sind.

Produkt- und Herstellerinformationen sind auf [offizielle AdvanSol Power-Website](https://www.advansol-power.com/) verfügbar.

Der Adapter basiert auf dem ursprünglichen ioBroker JavaScript-Skript `Advinsol Optimierer2` und verlagert die Logik in einen dedizierten ioBroker-Adapter-Namensraum.

![Systemübersicht](../../../en/adapterref/iobroker.advansol-optimizer/docs/images/system-overview.svg)

## Merkmale
- Verbindet sich mit einer TCP-RS485-Brücke.
- Liest die Seriennummer des Controllers.
- Erkennt automatisch angeschlossene Optimierungsmodule.
- Fragt die Modulwerte zyklisch ab.
- Schaltet jeden Optimizer-MOS über `module_X.switch` um.
- Überspringt die Abfrage während eines konfigurierbaren Nachtfensters.
- Zeigt den Verbindungsstatus und den Nachtmodus an.

## Typische Konfiguration
1. ioBroker läuft im lokalen Netzwerk.
2. Eine TCP-RS485-Brücke ist über LAN oder Wi-Fi erreichbar.
3. Die RS485-Seite der Brücke ist mit dem AdvanSol-Controller verbunden.
4. Der Controller kommuniziert mit den Optimierungsmodulen.

Empfohlene Brückenkonfiguration:

- Modus: TCP-Server
- Port: derselbe wie im Adapter konfiguriert, Standardwert `502`
- Serielle Einstellungen: Anpassung an den AdvanSol-Controller und den RS485-Bus
- RS485 A/B korrekt angeschlossen
- Nur ein aktiver Master am RS485-Bus

## Adaptereinstellungen
![Adaptereinstellungen](../../../en/adapterref/iobroker.advansol-optimizer/docs/images/adapter-settings.svg)

| Einstellung | Bedeutung | Standard |
| --- | --- | --- |
| `Host` | IP-Adresse oder Hostname der TCP-RS485-Brücke | leer |
| `Polling interval` | Zeit zwischen den Abfragezyklen in Millisekunden | `10000` |
| `Request timeout` | Maximale Wartezeit für eine Antwort | `5000` |
| `Switch retries` | Anzahl der wiederholten MOS-Schaltbefehle | `3` |
| `Switch retry delay` | Verzögerung zwischen Schaltversuchen | `4100` |
| `Night mode starts` | Stunde, in der die Abfrage übersprungen wird | `22` |
| `Night mode ends` | Stunde, in der die Abstimmung wieder aufgenommen wird | `5` |
| `Nachtmodus endet` | Stunde, zu der die Abfrage wieder aufgenommen wird | `5` |

Das Nachtfenster vermeidet unnötige Fehler, die auftreten, wenn Optimierer nachts oder bei fehlender PV-seitiger Spannung nicht reagieren.

## Staaten
![Objektbaum](../../../en/adapterref/iobroker.advansol-optimizer/docs/images/object-tree.svg)

Allgemeine Staaten:

| Zustand | Bedeutung |
| --- | --- |
| `info.connection` | Verbindung zur TCP-RS485-Brücke |
| `controller.sn` | Seriennummer des Controllers |
| `module_count` | Anzahl der gefundenen Optimierer |
| `last_poll` | Zeitpunkt der letzten erfolgreichen Abstimmung |
| `night_mode` | Adapter erkannt: Nachtmodus |
| `nachtmodus` | Adapter hat Nachtmodus erkannt |

Jeder Optimierer erhält einen Kanal mit der Bezeichnung `module_1`, `module_2`, `module_3` und so weiter.

| Bundesstaat | Bedeutung | Einheit |
| --- | --- | --- |
| `module_X.sn` | Seriennummer des Optimierers | |
| `module_X.mos` | MOS-Status, `0` aus und `1` an | |
| `module_X.software` | Softwareversion | |
| `module_X.hardware` | Hardwareversion | |
| `module_X.output_voltage` | Ausgangsspannung | V |
| `module_X.output_current` | Ausgangsstrom | A |
| `module_X.input_voltage` | Eingangsspannung | V |
| `module_X.input_current` | Eingangsstrom | A |
| `module_X.power` | Leistung | W |
| `module_X.energy` | Gesamtenergie | kWh |
| `module_X.temperature` | Temperatur | °C |
| `module_X.raw` | Rohantwort als Hexadezimalzeichenkette | |
| `module_X.last_update` | Letzte Modulaktualisierung | |
| `module_X.last_update` | Letzte Modulaktualisierung | |

## Schaltoptimierer
Der Zustand `module_X.switch` ist beschreibbar. Durch Setzen auf `true` wird der MOS-Ein-Befehl für die Modulseriennummer gesendet. Durch Setzen auf `false` wird der MOS-Aus-Befehl gesendet.

Der Adapter wiederholt den Befehl gemäß `Switch retries` und wartet `Switch retry delay` zwischen den Versuchen. Dies ist beabsichtigt, da TCP-RS485-Konverter und Optimierungsmodule möglicherweise nicht jeden Befehl sofort bestätigen.

## Fehlerbehebung
- Keine Verbindung: Überprüfen Sie die IP-Adresse, den Port und den TCP-Servermodus der Bridge.
- `TCP-Verbindungstimeout`: Die Bridge ist nicht erreichbar oder der Port ist falsch.
- Keine Module gefunden: Überprüfen Sie RS485 A/B, die Stromversorgung des Controllers und die PV-seitige Versorgung.
- Keine Antwort tagsüber: RS485-Parameter und Verkabelung prüfen.
- Keine Reaktionen in der Nacht: Normalerweise normal, wenn die Optimierer ohne PV-Spannung in den Ruhemodus wechseln. Das Nachtfenster anpassen.
- Der Wechsel funktioniert nicht: Die Seriennummer muss bekannt sein, das Modul muss reagieren, erhöhen Sie gegebenenfalls die Anzahl der Wechselversuche.
- Mehrere Systeme am Bus: Stellen Sie sicher, dass nicht mehr als ein aktiver Master Frames sendet.

## Changelog


### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 0.1.12

- Fixed all findings from the ioBroker latest-repository review.
- Added the official AdvanSol manufacturer link and removed direct-install instructions.
- Changed object names to English and improved state roles and units.
- Validated all configurable timing values and changed polling to sequential timeouts.
- Completed all required admin and adapter-description translations.

### 0.1.11

- Published the adapter with npm provenance.
- Completed repository checker cleanup.

### 0.1.8

- Configured npm token based release publishing for the automated deploy workflow.

### 0.1.7

- Kept the standard ioBroker test workflow focused on package and integration tests.

### 0.1.6

- Switched CI to the standard ioBroker testing actions.
- Added standard package and integration tests for the repository checker.
- Added ioBroker development tooling and release configuration.
- Enabled jsonConfig i18n files.

### 0.1.5

- Fixed remaining adapter checker findings for repository metadata, workflow configuration and admin configuration.

### 0.1.4

- Published through the automated GitHub Actions release workflow with npm provenance.

### 0.1.3

- Added GitHub Actions release workflow with npm provenance publishing.
- Added responsive admin configuration metadata.
- Added repository metadata required by the ioBroker adapter checker.
- Updated README content for English-only publication checks.

### 0.1.2

- Updated package metadata for ioBroker adapter checker compatibility.
- Added repository, testing, license information, tier and extended translations.

### 0.1.1

- Added adapter icon and localized admin configuration labels.

### 0.1.0

- Initial adapter version based on the existing ioBroker JavaScript optimizer script.

Older entries can be moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md) when the changelog grows.

## License

Copyright (c) 2026 TheBam

MIT License. See [LICENSE](LICENSE) for details.