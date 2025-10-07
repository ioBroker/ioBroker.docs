---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: /u7lTibuTChR3pNxT1eoPHUWSPRhIN6Jie1/3qqnl60=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bambulab-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bambulab-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)

<img src="admin/bambulab.png" alt="Logo" width="200"/>

# IoBroker.bambulab
**Tests:** ![Testen und Freigeben](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

## Bambulab 3D-Druckadapter für ioBroker
## Erste Schritte
Mit Dank an [kmxak](https://forum.iobroker.net/user/kmxak), [djalexz](https://forum.iobroker.net/user/djalexz), alle anderen Beteiligten und Inspirierten von [diesem Forenthread](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) integriert dieser Adapter Bambulab 3D-Drucker in ioBroker.

Bitte geben Sie in den Adaptereinstellungen Ihre Drucker-IP-Adresse, Ihr API-Token und Ihre Seriennummer an. Diese sind für eine lokale Verbindung (ohne Cloud-Einbindung) zu Ihrem Drucker erforderlich.
Diese Anmeldeinformationen werden lokal gespeichert und nicht an Dritte weitergegeben.

## API-Token und Seriennummer finden
Der Speicherort des API-Tokens und der Seriennummer hängt von Ihrem Druckermodell ab:

### A1/A1 Mini-Serie
1. Navigieren Sie auf Ihrem Druckerdisplay zu **Einstellungen** → **Netzwerk**
2. Aktivieren Sie **"LAN Mode Only"** (nur Lan-Modus)
3. Nach der Aktivierung werden IP-Adresse, Zugriffstoken und Seriennummer angezeigt

### P1S-Serie
1. Navigieren Sie auf Ihrem Druckerdisplay zu **Einstellungen** → **Netzwerk**
2. Der Zugriffstoken ist direkt in den Netzwerkeinstellungen sichtbar (kein LAN-Modus erforderlich)
3. Die Seriennummer finden Sie im selben Menü oder in den Geräteinformationen

### X1/X1C-Serie
1. Navigieren Sie auf Ihrem Druckerdisplay zu **Einstellungen** → **Netzwerk**
2. Der Zugriffstoken ist direkt in den Netzwerkeinstellungen sichtbar
3. Die Seriennummer finden Sie im selben Menü oder in den Geräteinformationen

**Hinweis:** Sie müssen Ihr Druckermodell in den Adaptereinstellungen korrekt auswählen. Nur die X1-Serie ermöglicht das Senden von Nachrichten. Die P1x-Serie muss die Nachrichten per Intervalleinstellung anfordern (Standard: alle 5 Sekunden).

## Unterstützte Modelle
| Druckermodell | Status |
|---------------|-------------------------|
| AMS | :weißes Häkchen: |
| A1 | :weißes_Häkchen: |
| P1p | :weißes Häkchen: |
| P1s | :weißes Häkchen: |
| X1 | :weißes_Häkchen: |

## Unterstützte Befehle
| Befehl | X1C | X1 | P1P | P1S | A1 |
|--------------------|---------------------|---------------------|--------------------------|--------------------------|--------------------------|
| Benutzerdefinierter G-Code | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |
| Pause | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |
| Lebenslauf | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |
| Stopp | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |
| Fan-Aux | :weißes_Häkchen: | :weißes_Häkchen: | :interrobang: falls vorhanden | :weißes_Häkchen: | :x: Keine Hardwareunterstützung |
| Fan-Chamber | :weißes_Häkchen: | :weißes_Häkchen: | :interrobang: falls vorhanden | :weißes_Häkchen: | :x: Keine Hardwareunterstützung |
| Fan-ToolHead | :weißes_Häkchen: | :weißes_Häkchen: | :interrobang: falls vorhanden | :weißes_Häkchen: | :weißes_Häkchen: |
| Lichtkammer | :weißes_Häkchen: | :weißes_Häkchen: | :interrobang: falls vorhanden | :weißes_Häkchen: | :weißes_Häkchen: |
| Light-Logo | :weißes_Häkchen: | :weißes_Häkchen: | :x: Keine Hardwareunterstützung | :x: Keine Hardwareunterstützung | :x: Keine Hardwareunterstützung |
| Temperatur-Bett | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |
| Temperatur-Düse | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |
| Geschwindigkeitsstufe | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: | :weißes_Häkchen: |

## Aufgaben
[ ] Aktuelle Kontrollzustände im Kontrollordner neu strukturieren/vervollständigen [ ] Definitionen der Zustandsattribute optimieren

## Unterstütze mich
Wenn Ihnen meine Arbeit gefällt, denken Sie bitte über eine persönliche Spende nach (dies ist ein persönlicher Spendenlink für DutchmanNL, keine Verbindung zum ioBroker-Projekt!) [![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?
Sentry.io ist ein Dienst für Entwickler, der ihnen einen Überblick über Fehler in ihren Anwendungen verschafft. Und genau das ist in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt.
Wenn Sie der iobroker GmbH erlauben, Diagnosedaten zu sammeln, wird auch Ihre Installations-ID (dies ist lediglich eine eindeutige ID **ohne** weitere Informationen über Sie, E-Mail, Name usw.) mitgeliefert.
So kann Sentry Fehler gruppieren und anzeigen, wie viele einzelne Benutzer von einem solchen Fehler betroffen sind.
All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.4.2 (2025-09-16)
* (DutchmanNL) Improve error messages if printer is offline or not reachable. #xxx
* (DutchmanNL) Solve several type definition issues. #203, #202, #201, #200, #199, #198
* (DutchmanNL & Copilot) Fix type conversion errors by replacing deprecated `tonumber` with proper `TOINTEGER`/`TOFLOAT` modifiers. #197
* (DutchmanNL & Copilot) Add missing state attribute definitions for HD2 printer during printing (height, platform, tool, mapping). Fixes #194

### 0.4.1 (2025-09-13)
* (DutchmanNL & Copilot) Fix HMS error code translations timeout error handling (#183)
* (DutchmanNL & Copilot) Block dangerous G-code commands during printing for safety (#185)
* (DutchmanNL & Copilot) Fix P1S fan speed display issues - double conversion and incorrect mapping (#184)
* (DutchmanNL & Copilot) Add comprehensive API token location documentation for all Bambulab printer models (#182)

### 0.4.0 (2025-09-13)
* (DutchmanNL) Add missing state definitions to resolve adapter warnings (#181)
* (DutchmanNL) Empty finishTime and avoid time calculation when not printing (#179)
* (DutchmanNL) Fix MQTT reconnection to prevent maximum call stack size exceeded error (#177)

### 0.3.5 (2025-09-13)
* (DutchmanNL & Copilot) Fix several type mismatches #143 #139 #130
* (DutchmanNL) Updated missing definitions for full MQTT API incl H2D
* (DutchmanNL & Copilot) Fix repository checker issues and improve admin UI compatibility

### 0.3.4 (2024-10-28) - Door Indicator Fixes #115
* (DutchmanNL) Added doorOpen indicator, Fixes [#115](https://github.com/DrozmotiX/ioBroker.bambulab/issues/115)

### 0.3.3 (2024-10-27) - Bugfixes
* (DutchmanNL) update state definitions, (solves [#77](https://github.com/DrozmotiX/ioBroker.bambulab/issues/77) [#58](https://github.com/DrozmotiX/ioBroker.bambulab/issues/58))
* (DutchmanNL) update connection handling, show connection error only once (Solves #99 #78 #74)

## License
MIT License

Copyright (c) 2025 DutchmanNL <oss@drozmotix.eu>

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