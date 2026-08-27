---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.steam/README.md
title: ioBroker.steam
hash: gMuV3gFX6s2hFU7VmyVC07P0mBzCQ8OQMtfaikPKWf8=
---
![Logo](../../../en/adapterref/iobroker.steam/admin/steam.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.steam.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.steam.svg)
![Anzahl der Installationen](https://iobroker.live/badges/steam-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/steam-stable.svg)
![NPM](https://nodei.co/npm/iobroker.steam.png?downloads=true)

# IoBroker.steam
## IoBroker.steam
Dieser Adapter integriert Steam-Profil- und Spielaktivitätsinformationen in ioBroker.

## Anforderungen
- Node.js >= 22
- ioBroker.js-controller >= 6.0.11
- ioBroker.admin >= 7.6.20

## Merkmale
* **Steam-Profilinformationen:**
* **Spielername:** Zeigt den aktuellen Steam-Namen des Spielers an.
* **Profil-URL:** Gibt die URL zum Steam-Profil an.
* **Avatar-URL:** Zeigt die URL zum Avatar des Spielers an.
* **Spielerstatus:** Zeigt den aktuellen Status des Spielers an (z. B. Online, Im Spiel, Abwesend).
* **Zusätzliche Spielinformationen:** Zeigt Informationen über das aktuell gespielte Spiel an (sofern verfügbar).
* **Steam ID64:** Die eindeutige 64-Bit-Steam-ID des Benutzers.

* **Spielüberwachung:**
* **Zu überwachende Spiele:** Konfigurieren Sie eine Liste der zu überwachenden Spiele.
* **Spiel-App-ID:** Speichert die Steam-App-ID für jedes überwachte Spiel.
* **Spielneuigkeiten:** Ruft alle 6 Stunden (4 Mal täglich) die neuesten Nachrichten für jedes überwachte Spiel ab und aktualisiert sie.
* **Spielnamenvorschläge:** Falls ein Spiel nicht gefunden werden kann (z. B. aufgrund eines Tippfehlers), protokolliert der Adapter eine Warnung und schlägt bis zu 5 ähnliche Spielnamen aus der Steam-App-Liste vor.
* **Automatische Vervollständigung:** Beim Hinzufügen von Spielen vervollständigt der Adapter automatisch fehlende Informationen – wenn Sie einen Spielnamen angeben, findet er die AppID und umgekehrt.
* **Import eigener Spiele:** Importiert mit einem einzigen Klick alle Ihre Spiele aus Ihrer Steam-Bibliothek.
* **Erweiterte Spielinformationen:** Zeigt Spielsymbole, Logos, URLs zu Community-Statistiken, Spielzeitstatistiken und mehr an.
* **Automatische Spielerkennung:** Erkennt und erstellt automatisch Spielzustände während des Spielverlaufs.

* **API-Anfrageverwaltung:**
* **GetPlayerSummaries:** Fordert Spielerzusammenfassungen in einem konfigurierbaren Intervall an (mindestens 15 Sekunden, Standard 60 Sekunden).
* **Tägliche Anfrageanzahl:** Überwacht die Anzahl der GetPlayerSummaries-API-Anfragen, um ein Überschreiten des Limits von 10.000 Anfragen pro Tag zu vermeiden.
* **Automatische Zurücksetzung:** Die tägliche Anzahl der Anfragen wird automatisch um 0:00 Uhr (Mitternacht) zurückgesetzt.
* **Optimierte API-Nutzung:** Verhindert doppelte API-Aufrufe und fügt angemessene Wartezeiten zwischen den Anfragen ein.
* **Steam AppList Caching:** Speichert die Steam-Anwendungsliste effizient im Cache, um API-Aufrufe zu reduzieren.

## Konfiguration
1. **Steam-Name / SteamID64**

Gib deinen Steam-Benutzernamen oder die 17-stellige SteamID64 aus deinem öffentlichen Profil ein.

2. **Steam-API-Schlüssel**

Melde dich in deinem Browser bei Steam an, öffne die Datei [Steam-API-Schlüsselseite](https://steamcommunity.com/dev/apikey), erstelle einen Schlüssel und kopiere ihn in die Adapterkonfiguration.
Dein Steam-Community-Profil muss auf „Öffentlich“ eingestellt sein.

3. **Spielerübersicht**

Legen Sie das Abfrageintervall für die Spielerzusammenfassungen fest (mindestens 15 Sekunden).

4. **Spielvorschläge aktivieren**

Aktiviert fehlertolerante Spielnamenvorschläge in Protokolldateien.

5. **Eigene Spiele aktivieren**

Importiert eigene Spiele in die Konfiguration (Adapterneustart erforderlich).

6. **Zu überwachende Spiele**

Fügen Sie den Spielnamen oder die App-ID hinzu. Fehlende Informationen werden vom Adapter automatisch vervollständigt.

## Verwendung
Nach der Installation und Konfiguration des Adapters stehen die Steam-Profilinformationen, Spielneuigkeiten, zuletzt gespielte Spiele und API-Anfragestatistiken als Zustände in ioBroker zur Verfügung.

Der Adapter erstellt mehrere Statusordner:

- **steam.0** - Enthält allgemeine Profilinformationen und den Verbindungsstatus
- **steam.0.games** - Enthält überwachte Spiele mit ihren App-IDs, Neuigkeiten und Statistiken

Wenn ein Spiel gespielt wird, wird sein `isPlaying`-Status auf „true“ gesetzt, und alle Daten für dieses Spiel werden automatisch aktualisiert.

## Changelog

### WORK IN PROGRESS

### 0.5.11 (2026-07-02)
- (bloop16) Fixed repo-checker issues E5600/S5601 by fully migrating admin i18n to short format.
- (bloop16) Fixed W5606 by completing missing translations and correcting placeholder formatting.
- (bloop16) bumped key dependencies (axios, adapter-core).
- (bloop16) #113 follow-up fixes: release-script minimum update, Node 22 tsconfig alignment, and ESLint/dependency cleanup.

### 0.5.10 (2026-05-29)
- (bloop16) Improved Steam onboarding and setup guidance
- (bloop16) Fixed editor and test typing diagnostics for JavaScript adapter workflow
- (bloop16) Updated README to ioBroker release format and moved legacy entries to [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

### 0.5.9 (2026-03-22)
- (bloop16) Added concurrency configuration to CI workflow
- (bloop16) Removed obsolete dependabot workflow file

Older changelog entries are archived in [CHANGELOG_OLD.md](CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 bloop16 <bloop16@hotmail.com>

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