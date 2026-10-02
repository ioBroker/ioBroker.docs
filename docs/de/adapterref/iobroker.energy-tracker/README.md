---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.energy-tracker/README.md
title: ioBroker.energy-tracker
hash: kpvqsRIOq80zlKCNoWG8YM/HNWiza2ioU3BdfMFdbzc=
---
![Logo](../../../en/adapterref/iobroker.energy-tracker/admin/energy-tracker.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.energy-tracker.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.energy-tracker.svg)
![Installationen](https://iobroker.live/badges/energy-tracker-installed.svg)
![Stabile Version](https://iobroker.live/badges/energy-tracker-stable.svg)

# ioBroker.energy-tracker

Adapter zum Senden von Zählerständen an die Energy Tracker-Plattform.\
&#x20;Es überträgt regelmäßig Werte aus konfigurierten ioBroker-Zuständen mithilfe der öffentlichen REST-API.

## Anforderungen

Erfordert Node.js 22 oder neuer, ioBroker js-controller 6.0.11 oder neuer und ioBroker Admin 7.6.20 oder neuer.

1. **Registrieren Sie ein Konto:**\
   &#x20;👉 [Konto erstellen](https://www.energy-tracker.best-ios-apps.de/en-US/register)

2. **Erstellen Sie ein persönliches Zugriffstoken** (Anmeldung erforderlich)\
   &#x20;👉 [Token generieren](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Faccess-token)

3. **Ihre Geräte-IDs finden Sie in der API-Dokumentation** (Anmeldung erforderlich).\
   &#x20;👉 [API-Dokumentation](https://www.energy-tracker.best-ios-apps.de/de/login?next=%2Faccount%2Frest-api)

## Konfiguration

Folgende Felder müssen im Adapter konfiguriert werden:

- **Persönliches Zugriffstoken** mit Berechtigung zur Erfassung von Zählerständen
- **Geräteliste** mit:
  - `deviceId` (Geräte-ID des Energietrackers)
  - `sourceState` (ioBroker-Zustand, der den Messwert liefert)
  - Serverseitiges Runden von Werten aktivieren
- **Wiederholungsversuche nach Timeout:** 0 (deaktiviert), 1 oder 2, mit einer konfigurierbaren Verzögerung von 1–60 Sekunden. Anfragen werden weiterhin nach 10 Sekunden abgebrochen. Bei einem Konflikt nach einem Timeout muss der Messwert im Energietracker überprüft werden.

Quellzustände können Zahlen oder einfache Dezimalzeichenketten enthalten. Verwenden Sie Dezimalzeichenketten, wenn exakte Dezimalgenauigkeit erforderlich ist. Werte werden vor dem Senden auf das API-Limit von sechs Dezimalstellen gekürzt; `allowRounding` Steuert serverseitiges Runden auf die Genauigkeit des Zählers.

**Darüber hinaus müssen Sie in ioBroker einen Zeitplan erstellen, um den Adapter in regelmäßigen Abständen auszulösen.**\
&#x20;Ohne einen Zeitplan ruft der Adapter keine Daten automatisch ab oder überträgt sie.

## Sicherheit

- Das Zugriffstoken wird verschlüsselt gespeichert.
- Es werden lediglich Daten **gesendet** – es werden keine Messwerte abgerufen.

## Changelog

### 1.0.0

**Before upgrading:** Node.js 22 or newer, ioBroker js-controller 6.0.11 or newer and ioBroker Admin 7.6.20 or newer are required.

- Send readings through the Energy Tracker SDK and API v3.
- Truncate readings to six decimal places before sending.
- Fix connection status for failed or incomplete batches.
- Add optional timeout retries with a fixed reading timestamp.
- Require Node.js 22 or newer and test on Node.js 22, 24 and 26.
- Update dependencies, release tools and adapter metadata.
- Publish releases through npm trusted publishing.

### 0.3.1

- Cleaned up dev dependencies and updated the admin adapter to version 7.6.17.

### 0.3.0

- Updated all adapter dependencies to current stable versions.
- Updated the API endpoint for submitting meter readings to the new v2 API.
- General maintenance and compatibility improvements.

### 0.2.8

- Improved API reliability, added request timeout, and addressed review feedback.

### 0.2.7

- Updated ESLint to v9, fixed repository URL in package.json, and improved test coverage.

## License

MIT – see [LICENSE](https://github.com/energy-tracker/ioBroker.energy-tracker/blob/main/LICENSE).

Copyright (c) 2017-2026 Bluefox <dogafox@gmail.com>  
Copyright (c) 2015-2026 energy-tracker support@energy-tracker.app