---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.autodarts/README.md
title: ioBroker-Adapter für AUTODARTS
hash: KYaeq07pHKclZ08zRgY/YoIOWyYRAC+s3Csw9GQe2iU=
---
![Logo](../../../en/adapterref/iobroker.autodarts/admin/autodarts.svg)

![Anzahl der Installationen](https://iobroker.live/badges/autodarts-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/autodarts-stable.svg)
![NPM-Version](https://nodei.co/npm/iobroker.autodarts.svg?style=shields&data=v,u,d&color=orange)
![Downloads](https://img.shields.io/npm/dm/iobroker.autodarts.svg)
![GEMEINSCHAFT](https://img.shields.io/badge/community%20-ioBroker%20|%20forum-blue.svg)
![WARTUNGSKRAFT](https://img.shields.io/badge/maintainer-skvarel%20@%20inventwo-yellowgreen.svg)
![KI](https://img.shields.io/badge/ai%20assisted-cursor-blue.svg)
![PayPal-Spende](https://img.shields.io/badge/paypal-donate%20|%20spenden-green.svg)

# ioBroker-Adapter für AUTODARTS

---

## Was dieser Adapter bewirkt

Verbindet sich mit Ihrem lokalen Autodarts Board Manager (über IP und Port, z. B.`192.168.x.x:3180` ) und stellt ioBroker-Zustände für die Hausautomation bereit:

- Schalte das Licht ein, wenn ein Spiel beginnt
- Spiele einen Ton auf die Zielscheibe
- Den nächsten Wurf per Text-zu-Sprache (TTS) ankündigen
- Hardware der Steuerplatine (Beleuchtung, Stromversorgung)
- Löse beliebige andere ioBroker-Automatisierungen basierend auf Dart-Ereignissen aus.

## Dokumentation

- 🇺🇸 [Dokumentation](./docs/en/README.md)
- 🇩🇪 [Dokumentation](./docs/de/README.md)

## Merkmale

### Spielstand & Würfe

- **`visit.score`** Gesamtpunktzahl des letzten vollständigen Besuchs (3 Darts)
- **`throw.current`** : Numerische Punktzahl des zuletzt geworfenen Dartpfeils
- **`trigger.isTriple`** : Boolescher Wert für drei Treffer innerhalb eines konfigurierbaren Segmentbereichs (Standard: 1–20)
- **`trigger.isDouble`** : Boolescher Wert für Doppeltreffer (alle Segmente)
- **`trigger.isBullseye`** : Boolescher Wert für nur Volltreffer
- **`trigger.isMiss`** : Boolescher Wert, der auf „true“ gesetzt ist, wenn der Dartpfeil kein gültiges Wertungssegment trifft (rein verfehlt, keine Punkte).

### Vorstandsstatus

- **`status.boardStatus`** : Statusanzeige eines Ereignisses im Vorstand (z. B.`"Stopped"` ,`"Calibration finished"` ,`"Started"` ).
- **`status.trafficLightColor`** : HEX-Farbe des aktuellen Platinenstatus
- **`status.trafficLightState`** : Statusanzeige
  - `green` Der Spieler darf werfen
  - `yellow` = Pfeile entfernen
  - `red` = Board offline/Fehler

### Systeminformationen

- **`system.software.*`** Autodarts-Versionen (Board-Version, Desktop-Version), Betriebssystem- und Plattformdetails
- **`system.hardware.*`** : CPU-Modell, Kernel-Architektur, Hostname
- **`system.cams.cam0/1/2`** : Kamerakonfiguration (Breite, Höhe, fps) als JSON

### Hardwaresteuerung

- **`system.hardware.light`** : Beleuchtung der Steuereinheit (bidirektional mit externen Zuständen)
- **`system.hardware.power`** : Stromversorgung der Steuerplatine (bidirektional mit externen Zuständen)

### Laufzeitkonfiguration

- **`config.tripleMinScore/tripleMaxScore`** : Dreifach-Trigger-Schwellenwerte während der Laufzeit anpassen
- **`config.triggerResetSec`** Automatische Rücksetzzeit für Dreifach-/Doppel-/Volltreffer-/Fehlschuss-Flaggen

### Tools-Addon-Integration

- **`tools.RAW`** : Eingabestatus, der zum Empfangen von Ereignissen von Browser-Tools verwendet wird (z. B. busted, gameon, gameshot, 180, matchshot, takeout).
- **`trigger.is180/isBusted/isGameon/isGameshot/isMatchshot/isTakeout`** : Schreibgeschützte Trigger-Flags werden gesetzt, wenn entsprechende Ereignisse empfangen werden über`tools.RAW` Die
- **`tools.config.url*`** : Vorgefertigte HTTP-URLs (einfache API-Aufrufe), die in die Browsererweiterung Tools for Autodarts kopiert werden können.

## Was dieser Adapter NICHT leistet

- ❌ Es werden keine Daten an das Internet oder an Server von Drittanbietern gesendet.
- ❌ Es werden weder Verlaufsdaten, Statistiken noch personenbezogene Daten gespeichert oder weitergegeben.
- ❌ Kein Zugriff auf die Boards anderer Nutzer oder entfernte Boards über das Internet
- ❌ Keine Cloud-Funktionen oder Analysen

Alle Daten bleiben lokal auf Ihrem ioBroker-System.

## Konfiguration

![Konfigurations-Screenshot](../../../en/adapterref/iobroker.autodarts/docs/config-screenshot.png)

### Die Adaptereinstellungen sind in vier Registerkarten unterteilt: **OPTIONEN** , **ZUORDNUNGEN** , **TOOLS ADDON-INTEGRATION** und **HILFE & FAQ** .

### Registerkarte: OPTIONEN

Unter **OPTIONEN** konfigurieren Sie, wie der Adapter eine Verbindung zu Ihrem lokalen Autodarts Board Manager herstellt und wie oft er Daten abfragt:

- **Board Manager IP**\
  &#x20;IP-Adresse Ihres Autodarts Board Managers (z. B.`192.168.178.50` oder`127.0.0.1` ).

- **Hafen**\
  &#x20;TCP-Port des Board Managers (normalerweise`3180` ).

- **Dreifacher Abzugsbereich**\
  &#x20;Zwei Dropdown-Menüs zur Festlegung der **minimalen** und **maximalen** Feldanzahl (1–20), die berücksichtigt werden soll für`trigger.isTriple` Die\
  &#x20;Dreiergruppen außerhalb dieses Bereichs lösen keine Flagge aus.

- **Trigger-Reset(s)**\
  &#x20;Zeit in Sekunden, nach deren Ablauf die Flaggen für Dreifach-, Doppel-, Bullseye- und Fehlschüsse zurückgesetzt werden.\
  `0` bedeutet, dass kein automatischer Reset erfolgt.

- **Abfrageintervall (s)**\
  &#x20;Wie oft der Adapter den Board Manager nach neuen Daten abfragt (z. B.`0.5` ,`1` ,`2` Sekunden).

### Registerkarte: KARTEN

In **MAPPINGS** können Sie bestehende ioBroker-Zustände mit den hardwarebezogenen Adapterzuständen verknüpfen:

- **Lichtziel-ID**\
  &#x20;ioBroker-Status-ID, die mit`system.hardware.light`\
  &#x20;(z.B`0_userdata.0.Autodarts.LIGHT` oder ein Zustand einer intelligenten Leuchte/eines LED-Rings).

- **Leistungsziel-ID**\
  &#x20;ioBroker-Status-ID, die mit`system.hardware.power`\
  &#x20;(z.B`0_userdata.0.Autodarts.POWER` oder ein Zustand eines intelligenten Steckers).

Wenn die Konfiguration erfolgt, werden Änderungen auf beiden Seiten (Adapterstatus oder externer Status) bidirektional synchronisiert, sodass Sie das Board sowohl von ioBroker aus steuern als auch auf Board-Ereignisse reagieren können.

### Registerkarte: WERKZEUGE-ADDON-INTEGRATION

- Konfigurieren Sie IP-Adresse, Port und Instanz, damit der Adapter HTTP-URLs generieren kann, die auf Ihren ioBroker simple-api-Endpunkt verweisen.
- Die endgültigen URLs für Busted, Game On und Gameshot werden als Zustände unter autodarts.X.tools.config.urlBusted/urlGameon/urlGameshot angezeigt und können in die Browsererweiterung Tools for Autodarts kopiert werden.

### Registerkarte: Hilfe & Häufig gestellte Fragen

Unter **HILFE & FAQ** finden Sie allgemeine Informationen und Hilfestellungen zum Adapter und seiner Konfiguration.

## Datenschutz und Datenverarbeitung

- Dieser Adapter liest Daten nur von Ihrem **lokalen** Autodarts Board Manager in Ihrem eigenen Netzwerk.
- Es werden keine personenbezogenen Daten an externe Server gesendet oder in der Cloud gespeichert.
- Alle Daten verbleiben auf Ihrem eigenen System; es werden weder Statistiken noch Wurfhistorien erfasst oder weitergegeben.
- Dieser Adapter ist nur für die Verwendung mit Ihrer eigenen Dartscheibe konzipiert, nicht mit Fernbedienungen oder Dartscheiben anderer Personen.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.0.12 (2026-06-28)
- (skvarel) Fixed admin i18n labels flagged as untranslated by the repository checker (fixes #67)

### 1.0.11 (2026-06-10)
- (skvarel) Added meta object types for adapter and instance namespace

### 1.0.10 (2026-06-05)
- (skvarel) Migrated project rules from GitHub Copilot to Cursor rules
- (skvarel) Updated @alcalzone/release-script to 5.2.1 (fixes #59)
- (skvarel) Replaced plain setInterval() and setTimeout() with adapter-managed this.setInterval(), adapter.setTimeout() and corresponding clear methods (fixes #59)

### 1.0.9 (2026-05-25)
- (skvarel) Adapter requires node.js >= 22 now
- (skvarel) Updated @alcalzone/release-script und Plugins auf 5.2.0 aktualisiert (fixes #56)
- (skvarel) Downgraded @types/node auf ^22.0.0 heruntergestuft (fixes #56)

### 1.0.8 (2026-04-13)
- (skvarel) Removed react and mui
- (skvarel) Removed admin/style.css

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