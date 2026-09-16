---
chapters: {"pages":{"en/adapterref/iobroker.sax-power/README.md":{"title":{"en":"ioBroker.sax-power"},"content":"en/adapterref/iobroker.sax-power/README.md"},"en/adapterref/iobroker.sax-power/docs/OBJECTS.md":{"title":{"en":"ioBroker object structure"},"content":"en/adapterref/iobroker.sax-power/docs/OBJECTS.md"},"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md":{"title":{"en":"Field reference"},"content":"en/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md"},"en/adapterref/iobroker.sax-power/docs/STATISTICS.md":{"title":{"en":"Historical energy statistics"},"content":"en/adapterref/iobroker.sax-power/docs/STATISTICS.md"},"en/adapterref/iobroker.sax-power/docs/BATTERY.md":{"title":{"en":"Battery models, equivalent full cycles and health"},"content":"en/adapterref/iobroker.sax-power/docs/BATTERY.md"},"en/adapterref/iobroker.sax-power/docs/MODBUS.md":{"title":{"en":"Modbus integration roadmap"},"content":"en/adapterref/iobroker.sax-power/docs/MODBUS.md"},"en/adapterref/iobroker.sax-power/docs/API.md":{"title":{"en":"SAX Power Cloud API"},"content":"en/adapterref/iobroker.sax-power/docs/API.md"},"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md":{"title":{"en":"Architecture"},"content":"en/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md"},"en/adapterref/iobroker.sax-power/docs/BRANDING.md":{"title":{"en":"Branding and trademarks"},"content":"en/adapterref/iobroker.sax-power/docs/BRANDING.md"},"en/adapterref/iobroker.sax-power/CONTRIBUTING.md":{"title":{"en":"Contributing"},"content":"en/adapterref/iobroker.sax-power/CONTRIBUTING.md"},"en/adapterref/iobroker.sax-power/SECURITY.md":{"title":{"en":"Security policy"},"content":"en/adapterref/iobroker.sax-power/SECURITY.md"},"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md":{"title":{"en":"Code of conduct"},"content":"en/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sax-power/README.md
title: ioBroker.sax-power
hash: 5fhtO0Veqn1R/K+aenb2ShyUkGTbeQb54Xl4zL3NhNI=
---
# ioBroker.sax-power

![NPM-Version](https://img.shields.io/npm/v/iobroker.sax-power.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sax-power.svg)
![Test und Freigabe](https://github.com/GodHunter/ioBroker.sax-power/actions/workflows/test-and-release.yml/badge.svg)
![Lizenz](https://img.shields.io/badge/License-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-brightgreen.svg)

ioBroker-Adapter für SAX Power-Batteriespeichersysteme.

Dieser unabhängige Community-Adapter verbindet ioBroker mit der SAX Power Cloud und liefert Live-Messwerte, Geräteinformationen und historische Energiestatistiken. Er unterstützt die automatische Geräteerkennung und aggregiert die Werte aller erkannten Speichersysteme.

Produkt- und Herstellerinformationen: [SAX Power GmbH](https://sax-power.net/)

> Dieses Projekt steht in keiner Verbindung zu SAX Power GmbH, wird weder von ihr unterstützt noch betreut.

## Merkmale

- SAX Power Cloud-Authentifizierung
- Automatische Erkennung aller dem Konto zugewiesenen Speichersysteme
- Aktuelle Werte für Photovoltaik-Erzeugung, Hausverbrauch, Netzstrom, Batterieleistung und Ladezustand
- Historische Energiestatistiken für heute, die Woche, den Monat, das Jahr und insgesamt
- SAX-gemeldete Zyklusanzahl plus transparente Berechnungen äquivalenter Vollzyklen pro Gerät und für die gesamte Installation
- Explizite Batteriemodellzuordnung mit Nenn- und Nutzkapazitäten
- Aggregierte Live-Werte und Statistiken über mehrere Speichersysteme hinweg
- Responsive, auf React basierende Administrationsschnittstelle
- Optionale Modbus-Konfiguration für zukünftige Steuerungsfunktionen vorbereitet
- Mindestens unterstütztes Abfrageintervall von **60 Sekunden** , um unnötige Belastung des SAX Power-Dienstes zu vermeiden.
- Dokumentiertes Objektmodell, API-Integration und Statistikverarbeitung

## Anforderungen

- ioBroker mit Admin **7.8.23 oder neuer**
- Node.js **22 oder neuer**
- Ein SAX Power-Konto mit Zugriff auf das SAX Power-Dashboard

## Installation

Installieren Sie den Adapter aus dem offiziellen ioBroker-Repository über die ioBroker-Admin-Oberfläche.

## Konfiguration

Öffnen Sie die Adapterkonfiguration in ioBroker Admin und geben Sie Folgendes ein:

- die E-Mail-Adresse des SAX Power Dashboards
- das entsprechende Passwort
- das Abstimmungsintervall
- das SAX Power-Modell für jedes automatisch erkannte Speichersystem

Das minimale Abfrageintervall beträgt **60 Sekunden** . Der SAX Power API-Endpunkt ist im Adapter integriert und kann nicht über die Verwaltungsschnittstelle geändert werden.

Das Passwort wird über ioBroker gespeichert.`encryptedNative` Konfigurationsmechanismus und Schutz vor gewöhnlichen Konfigurationslesevorgängen`protectedNative` Sie bleibt unverändert, wenn nicht damit zusammenhängende Einstellungen wie das Abfrageintervall oder das Batteriemodell gespeichert werden.

Die Verwaltungsschnittstelle trennt die Cloud-Anmeldung von den Adaptereinstellungen. Speichersysteme können nicht manuell hinzugefügt werden: Der Adapter erkennt sie über das SAX Power-Konto und fragt lediglich nach dem passenden Modell.

## Live-Dashboard

Die Verwaltungsschnittstelle zeigt aggregierte Live-Karten für Folgendes an:

- PV-Strom
- Haushaltsverbrauch
- Netzstrom
- Batteriebetrieb
- Anklagepunkt

Das Dashboard zeigt lediglich die Zustände von ioBroker an. Es führt keine zusätzlichen Cloud-Anfragen durch.

## Objektstruktur

Der Adapter erstellt für jedes erkannte SAX Power-Speichersystem separate Objektstrukturen. Alle installationsweiten Werte sind unten gruppiert.`summary` Sie dürfen daher nicht mit den Werten eines einzelnen Speichermediums verwechselt werden.

Typischer Aufbau:

```text
sax-power.0
├── info
├── devices
│   └── <device-id>
│       ├── info
│       ├── live
│       ├── battery
│       └── statistics
└── summary
    ├── battery
    └── statistics
        ├── info
        ├── day
        ├── week
        ├── month
        ├── year
        └── total
```

Ausführliche Referenzen finden Sie in:

- [Objektverweis](/#/docs/adapterref/iobroker.sax-power/docs/OBJECTS.md)
- [Feldreferenz](/#/docs/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md)
- [Statistiken](/#/docs/adapterref/iobroker.sax-power/docs/STATISTICS.md)
- [Batteriemodelle, Ladezyklen und Zustand](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md)

## Statistiken

Historische Werte werden vom SAX Power-Energiediagramm-Endpunkt abgerufen und ioBroker-Zuständen zugeordnet.

Unterstützte Zeiträume:

- Heute
- Woche
- Monat
- Jahr
- gesamt

Für Accounts mit mehreren Speichersystemen berechnet der Adapter auch aggregierte Statistiken.

Weitere Einzelheiten sind in [docs/STATISTICS.md](/#/docs/adapterref/iobroker.sax-power/docs/STATISTICS.md) dokumentiert.

Für die Berechnung äquivalenter Vollzyklen wird die dokumentierte Formel verwendet.`(charged energy + discharged energy) / (2 × nominal capacity)` Der Batteriezustand wird explizit anhand des Medians von fünf qualifizierten Entladezyklen geschätzt, die jeweils mindestens 40 SOC-Prozentpunkte abdecken. Gültige, erforderliche und verworfene Zyklen sowie der Fortschritt des aktuellen Zyklus bleiben während der Datenerfassung sichtbar. Die Integrationsmethode, Akzeptanzgrenzen, Persistenz und bekannte Genauigkeitsbeschränkungen sind in [docs/BATTERY.md](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md) dokumentiert.

## Modbus

Die Modbus-Konfiguration ist optional und unabhängig von der SAX Power Cloud-Verbindung.

Version 1.0.x stellt keine aktiven Modbus-Steuerungsfunktionen bereit. Die bestehende Konfiguration bildet die technische Grundlage für spätere Versionen, ohne die schreibgeschützte Cloud-Integration zu verändern.

Siehe [docs/MODBUS.md](/#/docs/adapterref/iobroker.sax-power/docs/MODBUS.md) .

## Dokumentation

- [API-Integration](/#/docs/adapterref/iobroker.sax-power/docs/API.md)
- [Architektur](/#/docs/adapterref/iobroker.sax-power/docs/ARCHITECTURE.md)
- [Batteriemodelle, Ladezyklen und Zustand](/#/docs/adapterref/iobroker.sax-power/docs/BATTERY.md)
- [Branding und Projektunabhängigkeit](/#/docs/adapterref/iobroker.sax-power/docs/BRANDING.md)
- [Feldreferenz](/#/docs/adapterref/iobroker.sax-power/docs/FIELD_REFERENCE.md)
- [Modbus](/#/docs/adapterref/iobroker.sax-power/docs/MODBUS.md)
- [Objektstruktur](/#/docs/adapterref/iobroker.sax-power/docs/OBJECTS.md)
- [Statistiken](/#/docs/adapterref/iobroker.sax-power/docs/STATISTICS.md)

## Unterstützung und Feedback

Bitte nutzen Sie GitHub Issues für Fehlerberichte und Funktionsanfragen:

- [Fehler melden](https://github.com/GodHunter/ioBroker.sax-power/issues)
- [Mitwirken](/#/docs/adapterref/iobroker.sax-power/CONTRIBUTING.md)
- [Sicherheitsrichtlinie](/#/docs/adapterref/iobroker.sax-power/SECURITY.md)
- [Verhaltenskodex](/#/docs/adapterref/iobroker.sax-power/CODE_OF_CONDUCT.md)

Das Feedback von Anwendern, die mehrere SAX Power-Speichersysteme betreiben, ist besonders wertvoll, da es dazu beiträgt, die Erkennung, Aggregation und das Verhalten mehrerer Geräte unter realen Bedingungen zu validieren.

## Entwicklung

Abhängigkeiten installieren:

```bash
npm ci
npm --prefix src-admin ci
```

Führen Sie die vollständige Projektprüfung durch:

```bash
npm run check
```

Verlaufstests ausführen:

```bash
npm run test:history
```

Paketvalidierung ausführen:

```bash
npm run test:package
```

## Changelog

### 1.2.4 (2026-08-20)

- Removed direct GitHub installation guidance in favor of installation from the official ioBroker repository.
- Standardized the custom administration interface on English until full ioBroker i18n support is implemented.
- Added a safe upper bound of 2,147,483 seconds for the polling interval to prevent Node.js timer overflow.
- Replaced deprecated directional power roles with `value.power.consumed` and `value.power.produced`.
- Removed inactive Modbus configuration fields that had no runtime effect.
- Added regression tests for the repository inclusion requirements and polling interval boundaries.

### 1.2.3 (2026-08-11)

- Added the missing `info` channel required by the instance information states.
- Corrected the `devices` container from `channel` to `folder` so device objects have a valid ioBroker parent.
- Added regression tests for both object hierarchy requirements.
- Existing state IDs and values remain unchanged.


### 1.2.2 (2026-08-10)

- Limited the adapter news history to the seven entries supported by the ioBroker repository builder.
- Added mandatory release checks for version metadata, release notes and the README changelog.
- Kept adapter runtime behavior unchanged.

### 1.2.1 (2026-08-10)

- Removed the deprecated `common.title` metadata in favor of `common.titleLang`.
- Replaced the direct npm installation command with ioBroker Admin installation guidance.
- Kept adapter runtime behavior unchanged.

### 1.2.0 (2026-08-10)

- Added automatically assigned battery models with documented nominal and usable capacities.
- Added SAX-reported and adapter-calculated equivalent full cycles per device and for the complete system.
- Added persistent, transparent battery-health estimation from qualified discharge runs, including valid, required and rejected run counters.
- Added the separate `devices.<serial>.*` and `summary.*` object structures and automatic cleanup of obsolete root objects.
- Redesigned the administration interface and fixed password persistence when saving unrelated settings.
- Documented health formulas, validation rules, object paths, data sources and known limitations in `docs/BATTERY.md` and the object references.

### 1.1.2 (2026-08-05)

- Updated the public project identity and maintainer contact.
- Corrected the donation address shown in the administration interface.
- Aligned the Node.js 22 TypeScript dependency declaration with ioBroker repository requirements.


### 1.1.1 (2026-08-05)

- Added detailed SAX Power Cloud connection states and HTTP status reporting.
- Improved authentication error messages, including guidance to re-enter and save the password after upgrading from an older adapter version.
- Updated the React admin interface with clear connection, authentication, timeout, network and server status messages.
- Updated `@tsconfig/node22` to 22.0.5 and removed the remaining backend ESLint warning.

### 1.1.0 (2026-08-05)

- Update the TypeScript configuration from `@tsconfig/node20` to `@tsconfig/node22`
- Commit the compiled backend to support direct GitHub installations
- Remove the unsupported `common.noGit` property
- Optimize the build workflow so admin dependencies are installed only once per full check
- Clean up conflicting and malformed `.gitignore` rules
- Keep runtime behavior and the existing SAX Power functionality unchanged


### 1.0.1 (2026-08-04)

- Require Node.js 22 or newer
- Raise the required ioBroker Admin version
- Align package metadata with current ioBroker repository requirements
- Modernize GitHub Actions and Dependabot configuration
- Replace the deprecated Dependabot auto-merge action
- Configure npm dependency cooldown and include the separate admin project
- Correct encrypted and protected native password declarations
- Remove unused template translations and obsolete `jsonConfig.json`
- Mark generated build files correctly for GitHub installations
- Replace the plain API request timer with `AbortSignal.timeout()`
- Keep the existing React administration interface and runtime behavior unchanged

### 1.0.0 (2026-08-03)

- Initial public release
- Automatic discovery of SAX Power systems
- Live monitoring
- Historical energy statistics
- Aggregated values across multiple systems
- Responsive React-based admin interface
- Optional Modbus configuration
- Comprehensive project documentation

## License

Copyright (c) 2026 GodHunter godhunter@posteo.de

MIT License

See [LICENSE](https://github.com/GodHunter/ioBroker.sax-power/blob/main/LICENSE) for the complete license text.