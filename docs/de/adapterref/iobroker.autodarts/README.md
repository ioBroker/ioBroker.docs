---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodarts/README.md
title: kein Titel
hash: RWoaggK0UrH75aAvOtIv8j7fdEFI9RfEQPr3VKfKwxc=
---
![Logo](../../../en/adapterref/iobroker.autodarts/admin/autodarts.svg)

![Anzahl der Installationen](https://iobroker.live/badges/autodarts-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/autodarts-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.autodarts.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.autodarts.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

## Adapter für die Autodarts-Integration
## Was dieser Adapter bewirkt
Verbindet sich mit Ihrem lokalen Autodarts Board Manager (über IP und Port, z. B. `192.168.x.x:3180`) und stellt ioBroker-Zustände für die Hausautomation bereit:

- Schalte das Licht ein, wenn ein Spiel beginnt
- Spiele einen Ton auf die Zielscheibe
- Den nächsten Wurf per Text-zu-Sprache (TTS) ankündigen
- Hardware der Steuerplatine (Beleuchtung, Stromversorgung)
- Jede andere ioBroker-Automatisierung basierend auf Dart-Ereignissen auslösen

## Dokumentation
- 🇺🇸 [Dokumentation](./docs/en/README.md)
- 🇩🇪 [Dokumentation](./docs/de/README.md)

## Merkmale
### Spielstand & Würfe
- **`visit.score`**: Gesamtpunktzahl des letzten vollständigen Besuchs (3 Darts)
- **`throw.current`**: Numerische Punktzahl des zuletzt geworfenen Darts
- **`trigger.isTriple`**: Boolescher Wert für dreifache Treffer innerhalb eines konfigurierbaren Segmentbereichs (Standard: 1–20)
- **`trigger.isDouble`**: Boolescher Wert, der nur Doppeltreffer (alle Segmente) berücksichtigt
- **`trigger.isBullseye`**: Boolescher Wert, der nur Treffer im Bullseye zulässt.
- **`trigger.isMiss`**: Boolescher Wert, der wahr ist, wenn der Dart kein gültiges Wertungssegment trifft (rein verfehlt, keine Punkte).

### Vorstandsstatus
- **`status.boardStatus`**: Statusanzeige des Board-Ereignisses (z. B. `"Stopped"`, `"Calibration finished"`, `"Started"`).
- **`status.trafficLightColor`**: HEX-Farbe des aktuellen Status der Verkehrstafel
- **`status.trafficLightState`**: Statusanzeige
- `grün` = Spieler darf werfen
- `yellow` = Pfeile entfernen
- `rot` = Board offline/Fehler

### Systeminformationen
- **`system.software.*`**: Autodarts-Versionen (boardVersion, desktopVersion), Betriebssystem- und Plattformdetails
- **`system.hardware.*`**: CPU-Modell, Kernelarchitektur, Hostname
- **`system.cams.cam0/1/2`**: Kamerakonfiguration (Breite, Höhe, fps) als JSON

### Hardwaresteuerung
- **`system.hardware.light`**: Beleuchtung der Steuerplatine (bidirektional mit externen Zuständen)
- **`system.hardware.power`**: Stromversorgung der Steuerplatine (bidirektional mit externen Zuständen)

### Laufzeitkonfiguration
- **`config.tripleMinScore/tripleMaxScore`**: Schwellenwerte für die Dreifachauslösung zur Laufzeit anpassen
- **`config.triggerResetSec`**: Automatische Rücksetzzeit für Triple-/Double-/Bullseye-/Miss-Flags

### Tools Addon Integration
- **`tools.RAW`**: Eingabestatus, der zum Empfangen von Ereignissen von Browsertools verwendet wird (z. B. busted, gameon, gameshot, 180, matchshot, takeout).
- **`trigger.is180/isBusted/isGameon/isGameshot/isMatchshot/isTakeout`**: Schreibgeschützte Trigger-Flags, die gesetzt werden, wenn entsprechende Ereignisse über `tools.RAW` empfangen werden.
- **`tools.config.url*`**: Vorab generierte HTTP-URLs (einfache API-Aufrufe), die in die Browsererweiterung Tools for Autodarts kopiert werden können.

## Was dieser Adapter NICHT leistet
- ❌ Es werden keine Daten an das Internet oder an Server von Drittanbietern gesendet.
- ❌ Es werden keine Verlaufsdaten, Statistiken oder personenbezogenen Daten gespeichert oder weitergegeben.
- ❌ Kein Zugriff auf die Boards anderer Nutzer oder auf entfernte Boards über das Internet
- ❌ Keine Cloud-Funktionen oder Analysen

Alle Daten bleiben lokal auf Ihrem ioBroker-System.

## Konfiguration
![Konfigurations-Screenshot](../../../en/adapterref/iobroker.autodarts/docs/config-screenshot.png)

### Die Adaptereinstellungen sind in vier Registerkarten unterteilt: **OPTIONEN**, **ZUORDNUNGEN**, **TOOLS ADDON-INTEGRATION** und **HILFE & FAQ**.
### Registerkarte: OPTIONEN
Unter **OPTIONEN** konfigurieren Sie, wie der Adapter eine Verbindung zu Ihrem lokalen Autodarts Board Manager herstellt und wie oft er Daten abfragt:

- **Board Manager IP**

IP-Adresse Ihres Autodarts Board Managers (z. B. `192.168.178.50` oder `127.0.0.1`).

- **Hafen**

TCP-Port des Board Managers (üblicherweise `3180`).

- **Dreifache Auslösereichweite**

Zwei Dropdown-Menüs zur Festlegung der **minimalen** und **maximalen** Feldanzahl (1–20), die für `trigger.isTriple` berücksichtigt werden soll. Tripel außerhalb dieses Bereichs lösen das Flag nicht aus.

- **Trigger-Reset(s)**

Zeit in Sekunden, nach der die Flaggen für Dreifach-, Doppel-, Volltreffer- und Fehlschüsse zurückgesetzt werden.

`0` bedeutet, dass kein automatischer Reset erfolgt.

- **Abfrageintervall (s)**

Wie oft der Adapter den Board Manager nach neuen Daten abfragt (z. B. `0.5`, `1`, `2` Sekunden).

### Tab: KARTEN
In **MAPPINGS** können Sie bestehende ioBroker-Zustände mit den hardwarebezogenen Adapterzuständen verknüpfen:

- **Lichtziel-ID**

ioBroker-Status-ID, die mit `system.hardware.light` synchronisiert wird (z. B. `0_userdata.0.Autodarts.LIGHT` oder ein Status einer intelligenten Lampe/eines LED-Rings).

- **Leistungsziel-ID**

ioBroker-Status-ID, die mit `system.hardware.power` synchronisiert wird (z. B. `0_userdata.0.Autodarts.POWER` oder ein Status eines Smart Plugs).

Wenn die Konfiguration erfolgt, werden Änderungen auf beiden Seiten (Adapterstatus oder externer Status) bidirektional synchronisiert, sodass Sie das Board sowohl von ioBroker aus steuern als auch auf Board-Ereignisse reagieren können.

### Registerkarte: WERKZEUGE-ADDON-INTEGRATION
- Konfigurieren Sie IP, Port und Instanz so, dass der Adapter HTTP-URLs generieren kann, die auf Ihren ioBroker simple-api-Endpunkt verweisen.

​

Die endgültigen URLs für Busted, Game On und Gameshot werden als Zustände unter autodarts.X.tools.config.urlBusted/urlGameon/urlGameshot angezeigt und können in die Browsererweiterung Tools for Autodarts kopiert werden.

### Registerkarte: Hilfe & Häufig gestellte Fragen
Unter **HILFE & FAQ** finden Sie allgemeine Informationen und Hilfestellungen zum Adapter und seiner Konfiguration.

## Datenschutz und Datenverarbeitung
- Dieser Adapter liest Daten nur von Ihrem **lokalen** Autodarts Board Manager in Ihrem eigenen Netzwerk.
Es werden keine personenbezogenen Daten an externe Server gesendet oder in der Cloud gespeichert.
- Alle Daten verbleiben auf Ihrem eigenen System; es werden weder Statistiken noch Wurfhistorien erfasst oder weitergegeben.
- Dieser Adapter ist nur für die Verwendung mit Ihrer eigenen Dartscheibe konzipiert, nicht mit Fernbedienungen oder Dartscheiben anderer Personen.

## Ältere Änderungen
- [CHANGELOG_OLD.md](CHANGELOG_OLD.md)

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.0.7 (2026-03-01)
- (skvarel) CI/CD: Updated GitHub Copilot instructions template to version 0.5.7 with latest ioBroker best practices (fixes #21, #25)

### 1.0.6 (2026-02-28)
- (skvarel) TESTING: Fixed test cleanup issues - added settled flag to httpHelper for proper Promise handling and --exit flag to test script to prevent hanging tests

### 1.0.5 (2026-02-28)
- (skvarel) FIXED: Updated outdated dependencies - release-script packages to v5.1.x and admin globalDependency to v7.6.20 (fixes #23)

### 1.0.4 (2026-01-24)
- (skvarel) FIXED: Reverted to setState() from deprecated setStateAsync()

### 1.0.3 (2026-01-21)
- (copilot) FIXED: Use setStateAsync() instead of setState() for trigger resets in throw.js to ensure database reliability
- (copilot) ENHANCED: Corrected API endpoints in copilot-instructions.md - now documents /api/state, /api/config, /api/host, /api/version correctly
- (copilot) TESTING: Added comprehensive unit tests for core modules (throw, visit, config, trafficLight, httpHelper)

## License
MIT License

Copyright (c) 2026 skvarel <sk@inventwo.com>

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