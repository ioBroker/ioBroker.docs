---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cctvql/README.md
title: ioBroker.cctvql
hash: zhl1HEiRIs5r2vb+G2rCYPPqUPRKSl+D4BWY4haQAl8=
---
<p align="center"><img src="docs/assets/cover.svg" alt="ioBroker.cctvql-Abdeckung" width="100%"></p>

<p align="center"><img src="docs/assets/logo.svg" alt="ioBroker.cctvql Logo" width="96" height="96"></p>

# IoBroker.cctvql
ioBroker-Adapter für [cctvQL](https://github.com/arunrajiah/cctvql) — eine Abfrageschicht in natürlicher Sprache für CCTV-Systeme.

Stellen Sie Fragen wie *„Waren gestern Abend Leute an der Haustür?“* direkt aus ioBroker-Skripten und Blockly-Flows und rufen Sie Live-Erkennungsereignisse von Frigate, Hikvision, Synology, Dahua, Milestone, ONVIF und mehr ab.

---

## Voraussetzungen
Ein laufender [cctvQL-Server](https://github.com/arunrajiah/cctvql):

```bash
docker run -p 8000:8000 \
  -e CCTVQL_ADAPTER=frigate \
  -e CCTVQL_FRIGATE_HOST=http://192.168.1.100:5000 \
  ghcr.io/arunrajiah/cctvql:latest
```

---

## Konfiguration
| Feld | Standardwert | Beschreibung |
|---|---|---|
| Host | `localhost` | cctvQL-Server-Hostname oder IP |
| Protokoll | `http` | `http` oder `https` |
| Protokoll | `http` | `http` oder `https` |
| Abfrageintervall | `30` s | Wie oft sollen Erkennungsereignisse abgerufen werden? |
| Abfrageintervall | 30 s | Wie oft sollen Erkennungsereignisse abgerufen werden? |

---

## Datenpunkte
### Abfrage
| ID | Typ | Beschreibung |
|---|---|---|
| `cctvql.0.query.send` | Zeichenkette (beschreibbar) | Geben Sie hier eine Frage in natürlicher Sprache ein, um eine Abfrage auszulösen |
| `cctvql.0.query.intent` | Zeichenkette | Erkannte Absicht (z. B. `query_events`) |
| `cctvql.0.query.intent` | Zeichenkette | Erkannte Absicht (z. B. `query_events`) |

### Veranstaltungen
| ID | Typ | Beschreibung |
|---|---|---|
| `cctvql.0.events.latest` | JSON-Zeichenkette | Array der letzten Erkennungsereignisse |
| `cctvql.0.cameras.<id>.lastEvent` | JSON-Zeichenkette | Letztes Ereignis pro Kamera (automatisch erstellt) |
| `cctvql.0.cameras.<id>.lastEvent` | JSON-Zeichenfolge | Letztes Ereignis pro Kamera (automatisch erstellt) |

### Status
| ID | Typ | Beschreibung |
|---|---|---|
| `cctvql.0.info.connection` | boolescher Wert | `true` wenn cctvQL erreichbar ist |

---

## Beispiel: Abfrage in einem Skript
```javascript
// In an ioBroker JavaScript adapter script:
setState('cctvql.0.query.send', 'Any cars in the driveway today?');

on({ id: 'cctvql.0.query.answer', change: 'any' }, (obj) => {
    log('cctvQL says: ' + obj.state.val);
    // → "Yes, a white SUV was detected at 14:32 and 17:10."
});
```

---

## Changelog

### 1.0.5 (2026-07-20)
* Remove spurious `localhost` key from all 11 i18n translation files
* Align polling interval UI minimum to 15 s (matches code floor)
* Remove PTZ claim from adapter descriptions and README intro

### 1.0.4 (2026-07-11)
* Remove npm-token from deploy step to enable OIDC trusted publishing (E3019)
* Add v1.0.3 and v1.0.4 entries to README changelog (E6029)
* Merge bot PRs: fix schema links, add CHANGELOG_OLD.md, optimize Dependabot config

### 1.0.3 (2026-06-27)
* Use self-rescheduling setTimeout for poll loop to prevent overlapping cycles
* Clamp pollingInterval in code (min 15 s, max 3600 s) independent of UI limits
* Remove unimplemented PTZ state handler
* Require Node.js >= 22; drop Node.js 20 (EOL) from test matrix

### 1.0.2 (2026-06-07)
* Update @alcalzone/release-script* to 5.2.x (checker E0036)
* Require Node.js >= 24; update CI deploy job to node 24 (checker E3022)
* Add i18n key for `placeholder` in jsonConfig host field (checker E5612)

### 1.0.1 (2026-04-27)
* Add bluefox as npm collaborator

### 1.0.0 (2026-04-21)
* Initial release — natural-language queries and event polling

---

## License

MIT License

Copyright (c) 2026 arunrajiah <arunrajiah@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.