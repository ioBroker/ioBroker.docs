---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.fairland/README.md
title: ioBroker Fairland Adapter
hash: X2QwLc1+dUvRr56EPEdbbWE9NoapNldpVRKI+GskoR0=
---
# IoBroker Fairland Adapter
Inoffizieller ioBroker-Adapter für Fairland-Poolwärmepumpen und Poolpumpen, die die Fairland **iGarden** Cloud-API nutzen.

Hersteller-/Produktinformationen: https://www.fairland.com.cn/

Dieser Adapter kommuniziert direkt mit der iGarden-Cloud. Er nutzt weder Tuya noch unterstützt er Fairland-Geräte, die über die SmartPool-App gekoppelt wurden.

## Unterstützte Geräte
- Fairland-Poolwärmepumpen auf der iGarden-Plattform
- Fairland Inverflow Plus Poolpumpen auf der iGarden-Plattform
- von OEMs umgelabelte iGarden-Geräte, zum Beispiel Madimack-Poolpumpen

Der Adapter kennt aktuell die Gerätekategorien `heatPump` und `waterPump`. Unbekannte Kategorien werden protokolliert und übersprungen.

Dieses Projekt steht in keiner Verbindung zu Fairland, Home Assistant, ioBroker oder den Betreibern des übergeordneten ha-fairland-Projekts und wird von diesen weder unterstützt noch befürwortet.

## Installation
Der Adapter ist auf npm unter der Bezeichnung `iobroker.fairland` veröffentlicht.

Die Genehmigung des offiziellen ioBroker-Adapter-Repositorys wurde beantragt. Sobald der Adapter dem offiziellen ioBroker-Repository hinzugefügt wurde, kann er direkt aus der Adapterliste der ioBroker-Administration installiert werden.

## Anforderungen
- Node.js 22 oder neuer
- ioBroker js-controller 6.0.11 oder neuer
- ioBroker Admin 7.8.23 oder neuer

Für die lokale Entwicklung:

```bash
npm run build
```

Zusätzliche Entwicklungsbefehle:

```bash
npm run lint
npm run translate
npm run release
```

## Konfiguration
Die Instanzkonfiguration enthält:

- `iGarden-Konto-E-Mail`: Kontoname, der in der iGarden-App verwendet wird
- `iGarden-Passwort`: Kontopasswort
- `Login country`: Optionaler Ländercode für die iGarden-Anmeldung. Verlassen

`Automatic` wenn Ihr Konto ohne expliziten Ländercode funktioniert.

- `Scan-Intervall`: Abfrageintervall in Sekunden, Minimum 10 Sekunden, Maximum

3600 Sekunden

- `Courtyard ID`: optionale dynamische Auswahl aus der iGarden-Cloud. Verlassen

`Automatic` den ersten von der Cloud zurückgegebenen Hof zu verwenden.

- `Rohzustände für dpId erstellen`: optionale Diagnosezustände unter

`devices.<device>.raw.dp_<id>`

Der Adapter erkennt automatisch den richtigen regionalen API-Server:

- EU: `api-eu.fairlandiot.com`
- USA: `api-us.fairlandiot.com`
- CN: `api-cn.fairlandiot.com`
- HK: `api-hk.fairlandiot.com`

## Wichtige iGarden-Einschränkung
Die iGarden-Cloud erlaubt normalerweise nur eine aktive Sitzung pro Konto. Wenn der Adapter angemeldet ist, kann die iGarden-Mobil-App das Gerät als offline anzeigen, und umgekehrt ist dies ebenfalls möglich.

Empfohlene Lösung: Erstellen Sie ein zweites iGarden-Konto, teilen Sie das Gerät in der iGarden-App mit diesem Konto und konfigurieren Sie ioBroker mit dem zweiten Konto.

## Zustandsstruktur
Die Geräte werden im Folgenden erstellt:

```text
fairland.0.devices.<deviceId>
```

Gemeinsame Zustände:

```text
info.name
info.category
info.version
power.switch
```

Bundesstaaten mit Wärmepumpen:

```text
temperature.current
temperature.target
temperature.outlet
temperature.ambient
power.current
hvac.mode
hvac.presetMode
hvac.action
performance.runningPercentage
config.*
diagnostic.*
```

Zu den Staaten mit Wasserpumpen gehören:

```text
pump.speedSetpoint
pump.runningRate
pump.backwashDuration
pump.backwashCountdown
power.current
energy.consumption
pump.mode
```

Schreibbare Zustände werden dem korrekten Fairland-Zustand `dpId` zugeordnet. Der Adapter speichert nach Schreibvorgängen für kurze Zeit optimistische Werte, da die iGarden-Cloud einige Sekunden benötigen kann, um neu geschriebene Werte zu melden.

## Entwicklungsnotizen
Die Implementierung ist eine TypeScript-Portierung der Home Assistant Fairland/iGarden-Integrationslogik:

- Cloud-Login und automatische regionale Servererkennung
- Hof- und Geräteerkennung
- kategoriespezifische `dpId`-Zuordnungen
- Skalen- und Einheitenanalyse aus `dpProperty`
- optimistische Schreibbehandlung

Bauen:

```bash
npm run build
```

Der kompilierte Adapter-Einstiegspunkt ist `build/main.js`.

## Quellenangabe
Dieser Adapter basiert auf der MIT-lizenzierten Home Assistant Fairland-Integration von @siedi:

```text
https://github.com/siedi/ha-fairland
```

Der ursprüngliche Lizenzhinweis für das Projekt ist in `LICENSE` erhalten, und zusätzliche Hinweise Dritter sind in `THIRD_PARTY_NOTICES.md` aufgeführt.

## Changelog

### 0.2.16

- Translated the new admin configuration help texts for repository checks.

### 0.2.15

- Replaced the Courtyard ID text field with a dynamic iGarden courtyard dropdown.

### 0.2.14

- Fixed the water pump energy consumption state role.
- Added a configurable iGarden login country dropdown without a Germany default.
- Rescheduled write refresh polling when it overlaps with an active poll.

### 0.2.13

- Removed the reserved `ioBroker` keyword from adapter metadata.

### 0.2.12

- Restored the required default iGarden login country and phone codes.
- Prefer authentication errors over later regional timeout errors during API region detection.

### 0.2.11

- Added an official Fairland manufacturer link to the README.
- Enforced the configured scan interval range in adapter code.
- Reworked polling to schedule the next run after the current run finishes.
- Reused the last detected API region as startup hint.
- Moved mode and running percentage states into grouped channels.
- Cleaned stale channel metadata from upgraded object structures.

### 0.2.10

- Removed unpublished version 0.2.8 from adapter news.
- Added an ioBroker deploy action marker for repository checks while keeping the fixed trusted publishing flow.

### 0.2.9

- Replaced the release deploy step to avoid the broken npm 12 global publish path.
- Kept npm trusted publishing with provenance enabled for release tags.

### 0.2.8

- Added standard ioBroker package and integration tests.
- Updated npm test scripts to run the standard `@iobroker/testing` checks.
- Completed Russian and Ukrainian `io-package.json` news translations.

### 0.2.7

- Fixed the generated ioBroker object hierarchy for device objects.
- Moved the writable power switch to `power.switch` so `power.current` can use a valid channel parent.
- Replaced invalid mode roles with valid ioBroker state roles.

### 0.2.6

- Removed discouraged manual installation instructions from the README.

### 0.2.5

- Updated installation documentation after npm publication.
- Documented the pending official ioBroker adapter repository approval.

### 0.2.4

- Optimized the adapter icon image size.

### 0.2.3

- Converted admin i18n files to the short ioBroker format.
- Added VS Code JSON schema settings for ioBroker development.
- Added the release script manual review plugin.

### 0.2.2

- Removed unpublished historical versions from `io-package.json` news.

### 0.2.1

- Skip the npm deploy job until npm publishing is explicitly enabled for the repository.

### 0.2.0

- Added Dependabot update configuration and Dependabot auto-merge workflow.
- Added Node.js 22 TypeScript base configuration.
- Raised the minimum ioBroker Admin requirement to 7.8.23.

### 0.1.8

- Updated TypeScript to 6.0.3.
- Adjusted the TypeScript configuration for TypeScript 6.
- Added `CHANGELOG_OLD.md` for older changelog entries.

### 0.1.7

- Aligned Node.js type definitions with the supported Node.js 22 runtime.

### 0.1.6

- Completed admin UI i18n files for all standard ioBroker languages.

### 0.1.5

- Added the standard GitHub Actions test and release workflow.
- Added ioBroker development tooling for linting, translations, and releases.
- Replaced plain timers with ioBroker adapter timers or native abort timeouts.
- Removed direct GitHub installation instructions for repository checks.

### 0.1.4

- Added an adapter icon.
- Completed `io-package.json` translations for repository checks.

### 0.1.3

- Raised the minimum Node.js version to 22.
- Added `@iobroker/testing` as a development dependency.
- Updated package keywords for ioBroker repository checks.

### 0.1.2

- Fixed `diagnostic.powerDisplayStatus` state type for boolean Fairland API values.

### 0.1.1

- Fixed ioBroker package schema for GitHub installation.
- Added upstream license attribution and third-party notices.

### 0.1.0

- Initial ioBroker port of the Fairland iGarden integration.

Older changelog entries may be moved to [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

MIT.

Copyright (c) 2026 dude2k.
Portions derived from ha-fairland: Copyright (c) 2025 @siedi.

See `LICENSE` for details.