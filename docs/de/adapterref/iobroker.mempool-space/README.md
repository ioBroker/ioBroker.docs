---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mempool-space/README.md
title: ioBroker.mempool-space
hash: AOtHUDsbZYkGUXfUtfUNExUfo3lKXyOJ32AFfs8AD2g=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.mempool-space.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.mempool-space.svg)
![Anzahl der Installationen](https://iobroker.live/badges/mempool-space-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/mempool-space-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mempool-space.png?downloads=true)

<!-- strg+k dann v Öffnet live Darstellung -->

![Logo](../../../en/adapterref/iobroker.mempool-space/admin/mempool-space.png)

# IoBroker.mempool-space
**Tests:** ![Testen und Freigeben](https://github.com/Hans-Wurst-21/ioBroker.mempool-space/workflows/Test%20and%20Release/badge.svg)

### Erleben Sie das Bitcoin-Netzwerk hautnah bei sich zu Hause!
Live-Daten von der mempool.space WebSocket API.

Dieser Adapter stellt Echtzeitinformationen zum Bitcoin-Netzwerk über WebSocket-Verbindungen zur mempool.space-API bereit. Er bietet eine breite Palette von Datenpunkten, darunter Blockinformationen, Transaktionsgebühren, Netzwerkstatistiken und Preisumrechnungen.

Es dauert mehrere Minuten, bis alle Daten übertragen sind. Warten Sie mindestens 2 Blöcke.

**Wichtig: Der Adapter oder mempool.space werden niemals nach Ihrem Seed fragen!**

**⚠️ NIEMALS ⚠️**

**Wenn Sie Ihren Samen weitergeben, verlieren Sie 100 % von allem!**

## Live-Daten-WebSocket
### Merkmale
1. **Echtzeitdaten**: Nutzt WebSocket-Verbindungen für Live-Updates aus dem Bitcoin-Netzwerk.

2. **Preisumrechnungen**:

- Umrechnungskurse von Bitcoin in USD und EUR
- Darstellung in „Moskauer Zeit“ (Satoshis pro USD/EUR)

3. **Transaktionsgebühren**:

- Schnellster Tarif, Halbstundentarif, Stundentarif, Economy-Tarif und Mindesttarif

4. **Blockinformationen**:

- Neueste Blockhöhe, Hash und Zeitstempel
- Zeit seit dem letzten Block
- Mining-Pool, der den letzten Block abgebaut hat

5. **Netzwerkstatistiken**:

- Durchschnittliche Blockzeit
- Aktuelle und vorherige Schwierigkeitsanpassungen
- Geschätzte Zeit bis zur nächsten Schwierigkeitsanpassung
- Geschätzte Zeit bis zur nächsten Halbierung

6. **Mempool-Informationen**:
- Anzahl der unbestätigten Transaktionen

### Konfiguration
In den Adaptereinstellungen können Sie folgende Option konfigurieren:

- **WebSocket-URL**:

Die URL für die mempool.space WebSocket-API (Standard: `wss://mempool.space/api/v1/ws`)

– Sie können eine öffentliche oder lokale mempool.space-Instanz verwenden.
- Informationen zu einer lokalen Instanz finden Sie in der Dokumentation Ihrer Bitcoin-Knotensoftware.

Es ist keine weitere Konfiguration erforderlich.
Alle Zustände und Verbindungen werden automatisch vom Adapter erstellt.

### Staaten
Der Adapter erstellt automatisch die folgenden Kanäle und Zustände:

- **Konvertierung**

- usd: Umrechnungskurs von Bitcoin in USD
- eur: Umrechnungskurs von Bitcoin in EUR
- moscowtimeUSD: Moskauer Zeit USD
- moscowtimeEUR: Moskauer Zeit EUR
- timestamp: Zeitstempel des letzten Konvertierungsupdates

- **Gebühren**

- am schnellsten: Schnellste Transaktionsgebühr
- halfHour: Honorarsatz für Bestätigung innerhalb einer halben Stunde
- Stunde: Gebührensatz für die Bestätigung innerhalb einer Stunde
- Economy: Economy-Gebührensatz
- Minimum: Mindestgebührensatz

- **blockieren**

- Höhe: Höhe des letzten Blocks
- Hash: Hash des letzten Blocks
- Zeitstempel: Zeitstempel des neuesten Blocks
- miningPool: Name des Pools, der den letzten Block abgebaut hat
- timeSinceLastBlock: Verstrichene Zeit seit dem letzten Block

- **Netzwerk**

- averageBlockTime: Durchschnittliche Blockzeit
- difficultyChange: Aktuelle Schwierigkeitsanpassung (in Prozent)
- previousDifficultyChange: Bisherige Schwierigkeitsanpassung (in Prozent)
- nextDifficultyAdjustment: Geschätzter Zeitstempel der nächsten Schwierigkeitsanpassung
- remainderTimeToDifficulty: Verbleibende Zeit bis zur nächsten Schwierigkeitsanpassung
- remainderTimeToHalving: Verbleibende Zeit bis zur nächsten Halbierung

- **Speicherpool**

- transactionCount: Anzahl der unbestätigten Transaktionen im Mempool

- **die Info**
- connectionn: Zeigt an, ob die WebSocket-Verbindung aktiv ist

## Bibliothek
- API-Dokumentation: https://mempool.space/docs/api/websocket
- npm-Modul: https://www.npmjs.com/package/@mempool/mempool.js
- luxon-Modul: https://github.com/moment/luxon

## Zu erledigen
- [ ] Vollständige Übersetzung
- [ ] Code bereinigen
- [ ] Beispiele hinzufügen
- [ ] Abfrage von benutzerdefinierten Adressen
- [ ] Abfrage von benutzerdefinierten Transaktionen
- [ ] Vielleicht Telegramm-Bot

## Besonderer Dank
Ein besonderer Dank geht an https://einundzwanzig.space und https://www.youtube.com/@haus_automation

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Hans-Wurst-21) Update version chai, @types/chai, chai-as-promised, @types/node, eslint, sinon-chai

### 0.0.4 (2024-11-27)

- (Hans-Wurst-21) Integrate standard iobroker linter setup
- (Hans-Wurst-21) Change setInterval/clearInterval to this.setInterval/clearInterval
- (Hans-Wurst-21) clean icon and i18n from examples
- (Hans-Wurst-21) change README.md
- (Hans-Wurst-21) add to ioBroker-latest

### 0.0.3 (2024-11-17)

- (Hans-Wurst-21) fix issue from ioBroker-Bot
- (Hans-Wurst-21) add bluefox at npm
- (Hans-Wurst-21) correction readme
- (Hans-Wurst-21) set ioBroker.admin to '>=6.17.14'
- (Hans-Wurst-21) add responsive design for adminconfig

### 0.0.2 (2024-11-16)

- (Hans-Wurst-21) npm release
- (Hans-Wurst-21) fix issue from ioBroker-Bot
- (Hans-Wurst-21) prepare for npm upload

## License

MIT License

Copyright (c) 2024 Hans-Wurst-21 <github+mempool-space@hansmail.net>

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