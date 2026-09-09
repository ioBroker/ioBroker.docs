---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.hydrawise/README.md
title: ioBroker.hydrawise
hash: AiuiMTnyXaA3/MZFrZTbYLzp2haB3rke2rMy/+RYqCk=
---
![Logo](../../../en/adapterref/iobroker.hydrawise/admin/hydrawise.jpg)

![NPM-Version](https://img.shields.io/npm/v/iobroker.hydrawise.svg?style=flat-square)
![Downloads](https://img.shields.io/npm/dm/iobroker.hydrawise.svg?label=npm%20downloads&style=flat-square)
![node-lts](https://img.shields.io/node/v-lts/iobroker.hydrawise?style=flat-square)
![Libraries.io-Abhängigkeitsstatus für die neueste Version](https://img.shields.io/librariesio/release/npm/iobroker.hydrawise?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/sentiq/iobroker.hydrawise?style=flat-square)
![GitHub-Repository-Größe](https://img.shields.io/github/repo-size/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub-Commit-Aktivität](https://img.shields.io/github/commit-activity/m/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![Letzter Commit auf GitHub](https://img.shields.io/github/last-commit/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub-Probleme](https://img.shields.io/github/issues/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub-Workflow-Status](https://img.shields.io/github/actions/workflow/status/sentiq/iobroker.hydrawise/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.hydrawise.svg?color=red&label=beta)
![Stabil](http://iobroker.live/badges/hydrawise-stable.svg)
![Installiert](http://iobroker.live/badges/hydrawise-installed.svg)

# ioBroker.hydrawise

## Versionen

Integrieren Sie Ihren Hydrawise-Controller in ioBroker.

Beide APIs bieten Zonen und Zeitpläne. **v2 (GraphQL)** Standardmäßig (gleiche Anmeldedaten wie für die Hydrawise-App). **v1 (REST)** Die Verwendung eines API-Schlüssels dient als Fallback, falls GraphQL nicht verfügbar ist. Aktivieren Sie eine oder beide Optionen.

- **v2** (empfohlen): E-Mail-Adresse/Passwort wie in der App — `zones.*`, `sensors.*`, `weather.*`, `water.*`, `controller.*` (plus Wetterdaten, Messwerte von Sensoren, Leckageanzeige, GraphQL-Zonenbefehle).
- **v1** (Fallback): API-Schlüssel — `schedule.*` / `customer.*` (gleiche Zonen und Zeitpläne, keine Wetter- oder Messsensoren).

## Dokumentation

### v2 API (empfohlen)

v2 ist die inoffizielle GraphQL-API, die von der Hydrawise-App verwendet wird (`app.hydrawise.com/api/v2/graph`). Aktivieren **v2 API (GraphQL)** In den Instanzeinstellungen müssen Sie dieselbe E-Mail-Adresse und dasselbe Passwort wie auf hydrawise.com eingeben.

### v1 API (Fallback)

Nur erforderlich, wenn GraphQL nicht verfügbar ist:

- einloggen <https://app.hydrawise.com/config/account-details>
- Generieren Sie einen API-Schlüssel, indem Sie unter „Kontoeinstellungen“ auf „API-Schlüssel generieren“ klicken.
- Fügen Sie den Schlüssel in die Registerkarte „v1“ ein.
- API-Dokumentation: <https://support.hydrawise.com/hc/en-us/articles/360008965753-Hydrawise-API-Information>

| Objektbaum                                          | Quelle                          | Steuert die Bewässerung?                                        |
| --------------------------------------------------- | ------------------------------- | --------------------------------------------------------------- |
| `schedule.*`                                        | v1 REST                         | Ja (`setzone.php`)                                              |
| `zones.*`                                           | v2 GraphQL                      | Ja (GraphQL-Mutationen), aber nur wenn Version 2 aktiviert ist. |
| `water.*`, `sensors.*`, `weather.*`, `controller.*` | v2 GraphQL                      | Nur lesbar                                                      |
| `info.connection`                                   | Instanz (alle aktivierten APIs) | —                                                               |
| `info.connectionV2`                                 | v2 GraphQL-only                 | —                                                               |

Die Admin-Ampel (`info.connection`) ist nur dann grün, wenn **jede aktivierte API** ist online. v1 aktiviert, aber fehlerhaft, v2 OK → gelb/rot. Nur v2 und verbunden → grün. `info.connectionV2` bleibt immer dann wahr, wenn GraphQL funktioniert.

v1 `schedule.sensors.*` enthält nur Sensor _Konfiguratio&#x6E;_&#x47;emessene Durchflussmengen, Niederschlagsmengen und Leckageverdachtsdaten stammen aus Version 2. `sensors.*` / `water.leakSuspected`.

Das Standard-Abfrageintervall von v2 ist **300 Sekunden** (Mindestens 120). GraphQL ist pro Konto (einschließlich der offiziellen App) ratenbegrenzt. Reduzieren Sie diesen Wert nicht ohne triftigen Grund.

`customerdetails.php` Die Abfrage erfolgt in einem eigenen 5-Minuten-Takt mit Backoff nach HTTP 429. Befehle rufen diesen Endpunkt niemals auf.

> **Notiz**\
> Nach dem Update von Version 0.0.15 müssen Sie Ihren API-Schlüssel erneut eingeben.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2026-09-03)

* (SentiQ) **FIXED**: Instance `info.connection` follows every enabled API (v2-only no longer stays red)

### 2.0.0 (2026-09-02)

* (SentiQ) **NEW**: Optional Hydrawise v2 GraphQL API (water usage, live sensors, weather, leak indicator, zone commands)
* (SentiQ) **ENHANCED**: customerdetails.php polls on its own 5-minute timer with backoff after rate limits

### 1.1.0 (2026-09-01)

* (SentiQ) **FIXED**: Relay ID mapping no longer writes onto the Object constructor
* (SentiQ) **FIXED**: runDefault reset no longer accidentally stops the zone
* (SentiQ) **ENHANCED**: Object creation only on structure change; poll overlap protection
* (SentiQ) **ENHANCED**: Replaced axios with native fetch; timers cleaned up on unload
* (SentiQ) **TESTING**: Unit tests for helpers (name2id, URL builder, structure signature)

### 1.0.6 (2026-08-09)

- (SentiQ) updated dependencies
- (SentiQ) Adapter requires node.js >= 22 now

### 1.0.5 (2025-12-05)

- (SentiQ) updated js-controller dependency
- (SentiQ) updated @iobroker/adapter-dev dependency

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 SentiQ <yves.nuesser@proton.me>

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