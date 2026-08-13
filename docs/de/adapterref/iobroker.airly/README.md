---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.airly/README.md
title: ioBroker.airly
hash: popgyRv90eUL1n150zCAJ7SCNdSjdN37qDGQZVEbte8=
---
# IoBroker.airly
Der Adapter liest die Luftqualitätsdaten (PM2.5, PM10, CAQI-Index) für Ihren Standort von [Luftig](https://airly.org).

## Konfiguration
| Schauplatz | Bedeutung |
| ---------------- | --------------------------------------------------------------- |
| `apikey` | Airly API-Schlüssel (developer.airly.org) |
| `longitude` | Ihre Längengradangabe |
| `mode` | `point` — interpoliert für Ihre genauen Koordinaten (Standard); `nearest` — Daten der nächstgelegenen physischen Station |
| `maxDistanceKM` | Suchradius für die nächstgelegene Station (km); wird nur im Modus `nearest` verwendet |
| `pollInterval` | Häufigkeit der Messwertabfrage (Minuten) |
| `pollInterval` | Wie oft Messwerte abgerufen werden sollen (Minuten) |

Bei jeder Abfrage wird eine einzige Anfrage an den `measurements/point` (oder `measurements/nearest`) Endpunkt von Airly gesendet, der Ihre Koordinaten direkt entgegennimmt – es muss keine separate Stationssuche durchgeführt werden.

Airly beschränkt seine kostenlose öffentliche API auf **100 Aufrufe pro Tag** – das entspricht etwa einem Aufruf alle 15 Minuten. Um das Kontingent problemlos einzuhalten, sollte `pollInterval` mindestens 20 Minuten dauern (≈72 Aufrufe/Tag). Das verbleibende Tageskontingent wird bei jeder Abfrage im Debug-Log protokolliert.

## Staaten
| Bundesland | Beschreibung |
| ----------------------- | ---------------------------------------- |
| `pm25.value` | PM2,5-Konzentration (µg/m³) |
| `pm10.value` | PM10-Konzentration (µg/m³) |
| `pm10.limitPercent` | PM10 als % der Norm |
| `caqi.value` | CAQI-Indexwert |
| `caqi.level` | CAQI-Ebene (z. B. `LOW`, `MEDIUM`) |
| `caqi.description` | Für Menschen verständliche Beschreibung der Luftqualität |
| `info.connection` | API erreichbar / Daten gültig |
| `info.lastUpdate` | Zeitstempel der letzten Messung |
| `info.lastUpdate` | Zeitstempel der letzten Messung |

`caqi.level` und `caqi.description` sind Textwerte, die direkt von der Airly-API zurückgegeben werden. Ihre Sprache wird von Airly (basierend auf der Anfrage/dem API-Standard, üblicherweise Englisch) ausgewählt und **nicht** vom Adapter übersetzt, sodass sie möglicherweise nicht mit der Sprache der ioBroker-Benutzeroberfläche übereinstimmt.

## Installation
Öffnen Sie im ioBroker-Adminbereich den Tab **Adapter**, suchen Sie nach **Airly** und klicken Sie auf die Schaltfläche **+**, um es zu installieren und eine Instanz hinzuzufügen. Öffnen Sie anschließend die Instanzeinstellungen und geben Sie Ihren Airly-API-Schlüssel und die Koordinaten ein.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.7 (2026-08-07)
* (tnowak) Review feedback: removed the incomplete Sentry plugin configuration, enforced the poll-interval minimum (5 min) in code, and documented that caqi.level/description are API-provided and not translated

### 0.3.6 (2026-07-11)
* (tnowak) Read coordinates fresh on every poll and skip the request (instead of sending NaN) when they are invalid, logging the offending value; set info.connection = false on stop

### 0.3.5 (2026-07-08)
* (tnowak) Fixed the jsonConfig schema URL in .vscode/settings.json and bumped @iobroker/adapter-dev

### 0.3.4 (2026-07-08)
* (tnowak) Addressed repochecker suggestions: short-format i18n, CHANGELOG_OLD.md, .vscode settings, Dependabot automerge + higher PR limit, and @iobroker/adapter-dev

### 0.3.3 (2026-07-08)
* (tnowak) Removed chai and mocha from devDependencies (provided by @iobroker/testing) to satisfy the repository checker

Older entries are kept in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License

The MIT License (MIT)

Copyright (c) 2026 tnowak <tnowak@netventure.pl>

See [LICENSE](LICENSE) for the full text.