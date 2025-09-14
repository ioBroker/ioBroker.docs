---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.energy-tracker/README.md
title: ioBroker.energy-tracker
hash: n55Qf5xNASOOJMjfcnMUc0QoYCHIL7D+SDwykDxQuF4=
---
![Logo](../../../en/adapterref/iobroker.energy-tracker/admin/energy-tracker.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.energy-tracker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.energy-tracker.svg)
![Installationen](https://iobroker.live/badges/energy-tracker-installed.svg)
![Stabile Version](https://iobroker.live/badges/energy-tracker-stable.svg)

# IoBroker.energy-tracker
Adapter zum Senden von Zählerständen an die Energy Tracker-Plattform.
Er überträgt regelmäßig Werte aus konfigurierten ioBroker-Zuständen über die öffentliche REST-API.

## Anforderungen
1. **Registrieren Sie ein Konto:**

   👉 [Erstellen Sie Ihr Konto](https://www.energy-tracker.best-ios-apps.de/en-US/register)

2. **Erstellen Sie ein persönliches Zugriffstoken** (Anmeldung erforderlich)

   👉 [Token generieren](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Faccess-token)

3. **Holen Sie sich Ihre Geräte-IDs aus den API-Dokumenten** (Anmeldung erforderlich)

   👉 [API-Dokumentation](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Frest-api)

## Konfiguration
Folgende Felder müssen im Adapter konfiguriert werden:

- **Persönliches Zugriffstoken**
- **Geräteliste** mit:
- `deviceId` (Energy Tracker-Geräte-ID)
- `sourceState` (ioBroker-Status, der das Lesen bereitstellt)
- Rundung von Werten aktivieren

**Zusätzlich müssen Sie in ioBroker einen Zeitplan erstellen, um den Adapter in regelmäßigen Abständen auszulösen.** Ohne Zeitplan ruft der Adapter keine Daten automatisch ab oder überträgt sie.

## Sicherheit
- Der Zugriffstoken wird verschlüsselt gespeichert.
- Es werden nur Daten **gesendet** – es werden keine Messwerte abgerufen.

## Changelog

### 0.2.8

- Improved API reliability, added request timeout, and addressed review feedback.

### 0.2.7

- Updated ESLint to v9, fixed repository URL in package.json, and improved test coverage.

### 0.2.6

- Added README note: schedule required in ioBroker.

### 0.2.5

- Updated dependencies for testing and added Node.js v24 to adapter tests.

### 0.2.4

- Removed old news entries (fix W132 warning)

### 0.2.3

- Reduced build size

### 0.2.2

- Improved support for integration testing

### 0.2.1

- Added default schedule configuration for scheduled adapter mode

### 0.2.0

- Changed adapter type to 'schedule' to reflect intended usage. Fixed repository metadata and added missing GitHub test workflows.

### 0.1.3

- Fixed repository metadata and performed required minor adjustments

### 0.1.2

- Fixed repository metadata and performed required minor adjustments

### 0.1.1

- Fixed repository metadata

### 0.1.0

- Initial version with full Admin UI configuration
- Supports multiple devices and configurable intervals

## License

MIT – see [LICENSE](LICENSE).

Copyright (c) 2017-2025 Bluefox <dogafox@gmail.com>
Copyright (c) 2015-2025 energy-tracker support@best-ios-apps.de