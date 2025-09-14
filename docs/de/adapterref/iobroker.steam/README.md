---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.steam/README.md
title: ioBroker.steam
hash: 3IsZC6sGoAbu/vEEiNS99z+Zq4WrUYMO/0JetlssxRk=
---
![Logo](../../../en/adapterref/iobroker.steam/admin/steam.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.steam.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.steam.svg)
![Anzahl der Installationen](https://iobroker.live/badges/steam-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/steam-stable.svg)
![NPM](https://nodei.co/npm/iobroker.steam.png?downloads=true)

# IoBroker.steam
## IoBroker.steam
Mit diesem Adapter können Sie Informationen aus der Steam-API in Ihr ioBroker-System integrieren.

## Merkmale
* **Steam-Profilinformationen:**
* **Spielername:** Zeigt den aktuellen Steam-Namen des Spielers an.
* **Profil-URL:** Gibt die URL zum Steam-Profil an.
* **Avatar-URL:** Zeigt die URL zum Avatar des Spielers an.
* **Spielerstatus:** Zeigt den aktuellen Status des Spielers an (z. B. Online, Im Spiel, Abwesend).
* **Zusätzliche Spielinformationen:** Zeigt Informationen zum aktuell gespielten Spiel an (sofern verfügbar).
* **Steam ID64:** Die eindeutige 64-Bit-Steam-ID des Benutzers.

* **Spielüberwachung:**
* **Zu überwachende Spiele:** Konfigurieren Sie eine Liste der zu überwachenden Spiele.
* **Spiel-App-ID:** Speichert die Steam-App-ID für jedes überwachte Spiel.
* **Spielnachrichten:** Ruft alle 6 Stunden (4 Mal täglich) die neuesten Nachrichten für jedes überwachte Spiel ab und aktualisiert sie.
* **Spielnamenvorschläge:** Wenn ein Spiel nicht gefunden werden kann (z. B. aufgrund eines Tippfehlers), protokolliert der Adapter eine Warnung und schlägt bis zu 5 ähnliche Spielnamen aus der Steam-App-Liste vor.
* **Autovervollständigung:** Beim Hinzufügen von Spielen vervollständigt der Adapter fehlende Informationen automatisch – wenn Sie einen Spielnamen angeben, findet er die AppID und umgekehrt.
* **Import eigener Spiele:** Importiert alle Ihre eigenen Spiele mit einem einzigen Klick aus Ihrer Steam-Bibliothek.
* **Erweiterte Spielinformationen:** Zeigt Spielsymbole, Logos, URLs mit Community-Statistiken, Spielzeitstatistiken und mehr an.
* **Automatische Spielerkennung:** Erkennt und erstellt automatisch Zustände für Spiele, während sie gespielt werden.

* **API-Anforderungsverwaltung:**
* **GetPlayerSummaries:** Fordert Spielerzusammenfassungen in einem konfigurierbaren Intervall an (mindestens 15 Sekunden, Standard 60 Sekunden).
* **Tägliche Anforderungsanzahl:** Überwacht die Anzahl der GetPlayerSummaries-API-Anforderungen, um zu vermeiden, dass das Limit von 10.000 Anforderungen pro Tag überschritten wird.
* **Automatisches Zurücksetzen:** Setzt die tägliche Anforderungsanzahl automatisch um 0:00 (Mitternacht) zurück.
* **Optimierte API-Nutzung:** Verhindert doppelte API-Aufrufe und fügt angemessene Abkühlzeiten zwischen den Anfragen hinzu.
* **Steam AppList Caching:** Speichert die Steam-Anwendungsliste effizient im Cache, um API-Aufrufe zu reduzieren.

## Konfiguration
1. **Steam-Name:** Geben Sie Ihren Steam-Benutzernamen ein.
2. **Steam-API-Schlüssel:** Geben Sie Ihren Steam-API-Schlüssel ein. Sie können [hier](https://steamcommunity.com/dev/apikey) einen API-Schlüssel generieren.
3. **Intervall der Spielerzusammenfassung:** Legen Sie fest, wie oft Spielerzusammenfassungen angefordert werden sollen (mindestens 15 Sekunden).
4. **Spielvorschläge aktivieren:** Schalten Sie um, ob ähnliche Spielnamen vorgeschlagen werden sollen, wenn ein Spiel nicht gefunden werden kann.
5. **Eigene Spiele aktivieren:** Importieren Sie alle Ihre eigenen Spiele von Steam in Ihre Konfiguration (erfordert einen Neustart des Adapters).
6. **Zu überwachende Spiele:** Fügen Sie zu überwachende Spiele hinzu. Sie können entweder den Namen oder die AppID angeben – der Adapter ergänzt die fehlenden Informationen automatisch.

## Verwendung
Nach der Installation und Konfiguration des Adapters stehen die Steam-Profilinformationen, Spielneuigkeiten, kürzlich gespielten Spiele und API-Anforderungsstatistiken als Status in ioBroker zur Verfügung.

Der Adapter erstellt mehrere Statusordner:

- **steam.0** – Enthält allgemeine Profilinformationen und Verbindungsstatus
- **steam.0.games** – Enthält überwachte Spiele mit ihren AppIDs, Neuigkeiten und Statistiken

Wenn ein Spiel gespielt wird, wird sein Status `isPlaying` auf „true“ gesetzt und alle Daten für dieses Spiel werden automatisch aktualisiert.

## Changelog

### 0.5.6 (2025-06-28)
* (bloop16)
    * release version

### 0.5.3 (2025-06-14)
* (bloop16)
    * fixed state roles.
    * fixed io-package.json (`info.connention`)
    * removed uneeded `getState`
    * added trigger to `onReady`for `onStateChange`

### 0.5.2 (2025-06-14)
* (bloop16)
    * Fixed `onStateChange`to work correct with `currentGameAppId`

### 0.5.1 (2025-05-04)
* (bloop16)
    * Automatic detection and addition of newly played games to the monitored list (no adapter restart required)
    * Full internationalization (i18n) for all log messages and UI texts
    * Improved game lookup: supports AppID/name, fuzzy search, and suggestions for typos
    * Import all owned Steam games with one click
    * Enhanced management and updating of game states (icons, logos, stats, news)
    * Optimized API request handling (rate limits, backoff, random intervals)
    * Automatic creation and cleanup of objects/states
    * Improved error handling and logging

### 0.4.5 (2025-05-02)
* (bloop16)
    * Corrected state roles to align with ioBroker standards
    * Replaced standard `setTimeout`/`setInterval` with adapter versions (`this.setTimeout`/`this.setInterval`) for better lifecycle management.
    * Ensured the standard `info` device object is created in `io-package.json`.

### 0.4.4 (2025-05-01)
* (bloop16) changed view log message log levels, ready for latest

### 0.4.3 (2025-05-01)
* (bloop16)
    * Update package.json: Upgrade Node.js engine requirement and dependencies

### 0.4.2 (2025-04-21)
* (bloop16)
    * Improved rate limit handling: only shows warnings after 3 consecutive rate limits

### 0.4.1 (2025-04-21)
* (bloop16)
    * Added randomness API request vary +-5sec

### 0.4.0 (2025-04-21)
* (bloop16)
    * Button "Get owned games" in admin UI now reliably triggers fetching 
    * Improved error handling and logging for owned games import
    * Removed unnecessary debug/info logs and startup messages
    * Optimized interval and timer handling for all background tasks
    * Improved translation coverage for all user-facing messages

### 0.3.0 (2025-04-18)
* (bloop16)
    * Added auto-completion for game names and AppIDs
    * Added import of all owned games from Steam library
    * Enhanced game information with icons, logos, and community stats
    * Fixed adapter termination issues
    * Added automatic game detection when player starts playing
    * Optimized API usage with reduced duplicate calls

### 0.2.3 (2025-04-18)
* (bloop16)
    * Fix APIRequest

### 0.2.1 (2025-04-16)
* (bloop16)
    * Fix APIRequest

### 0.2.0 (2025-04-16)
* (bloop16)
    * Added function to suggest up to 5 similar game names if a game cannot be found (typo-tolerant search and warning in log).

### 0.1.2 (2025-04-15)
* (bloop16)
    * Added configurable interval for GetPlayerSummaries (min 15s, default 60s)
    * Added fetching and updating of game news every 6 hours (4x per day)
    * Added fetching of recently played games every 15 minutes
    * Improved API request management and daily request counter reset
    * Cleaned up code and improved error handling

### 0.0.3 (2025-04-13)
* (bloop16)  
    * fixed state directory

### 0.0.2 (2025-04-13)
* (bloop16) First working Version  
    * Steam profile information integration  
    * API request management with daily limits  
    * Automatic reset of request counter  
    * Secure API key storage

## License
MIT License

Copyright (c) 2025 bloop16 <bloop16@hotmail.com>

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