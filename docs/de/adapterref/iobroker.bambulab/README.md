---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bambulab/README.md
title: ioBroker.bambulab
hash: 6xz78qe47l9UjQdyv3+SKEGq4UogHIcdLUi8NTCG5no=
---
![NPM-Version](https://img.shields.io/npm/v/iobroker.bambulab.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bambulab.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bambulab-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bambulab-stable.svg)
![NPM](https://nodei.co/npm/iobroker.bambulab.png?downloads=true)
![Test und Freigabe](https://github.com/DrozmotiX/ioBroker.bambulab/workflows/Test%20and%20Release/badge.svg)

<img src="admin/bambulab.png" alt="Logo" width="200"/>

# ioBroker.bambulab

## Bambulab 3D-Druckadapter für ioBroker

## Erste Schritte

Mit freundlicher Genehmigung von [kmxak](https://forum.iobroker.net/user/kmxak) , [djalexz](https://forum.iobroker.net/user/djalexz) und allen anderen Beteiligten und inspiriert von [diesem Forum-Thread](https://forum.iobroker.net/topic/61585/bambu-lab-3d-drucker-mqtt-integration) integriert dieser Adapter Bambulab 3D-Drucker in ioBroker.

Bitte geben Sie in den Adaptereinstellungen die IP-Adresse, das API-Token und die Seriennummer Ihres Druckers an. Diese Angaben sind für eine lokale Verbindung (ohne Cloud-Anbindung) zu Ihrem Drucker erforderlich. Die Zugangsdaten werden lokal gespeichert und nicht an Dritte weitergegeben.

## API-Token und Seriennummer finden

Der Speicherort des API-Tokens und der Seriennummer hängt von Ihrem Druckermodell ab:

### A1/A1 Mini-Serie

1. Navigieren Sie auf dem Display Ihres Druckers zu **Einstellungen** → **Netzwerk.**
2. Aktivieren Sie **„Nur LAN-Modus“** (nur Lan-Modus)
3. Nach der Aktivierung werden IP-Adresse, Zugriffstoken und Seriennummer angezeigt.

### P1S-Serie

1. Navigieren Sie auf dem Display Ihres Druckers zu **Einstellungen** → **Netzwerk.**
2. Das Zugriffstoken ist direkt in den Netzwerkeinstellungen sichtbar (kein LAN-Modus erforderlich).
3. Die Seriennummer finden Sie im selben Menü oder in den Geräteinformationen.

### X1/X1C-Serie

1. Navigieren Sie auf dem Display Ihres Druckers zu **Einstellungen** → **Netzwerk.**
2. Das Zugriffstoken ist direkt in den Netzwerkeinstellungen sichtbar.
3. Die Seriennummer finden Sie im selben Menü oder in den Geräteinformationen.

**Hinweis:** Sie müssen Ihr Druckermodell in den Adaptereinstellungen korrekt auswählen. Nur die X1-Serie unterstützt das Senden von Nachrichten, die P1x-Serie erfordert eine Anfrage im eingestellten Intervall (standardmäßig alle 5 Sekunden).

## Unterstützte Modelle

| Druckermodell | Status               |
| ------------- | -------------------- |
| AMS           | :white\_check\_mark: |
| A1            | :white\_check\_mark: |
| P1p           | :white\_check\_mark: |
| P1s           | :white\_check\_mark: |
| X1            | :white\_check\_mark: |

## Unterstützte Befehle

| Befehl                     | X1C                  | X1                   | P1P                             | P1S                             | A1                              |
| -------------------------- | -------------------- | -------------------- | ------------------------------- | ------------------------------- | ------------------------------- |
| Benutzerdefinierter G-Code | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |
| Pause                      | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |
| Wieder aufnehmen           | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |
| Stoppen                    | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |
| Lüfter-Zusatz              | :white\_check\_mark: | :white\_check\_mark: | :interrobang: falls vorhanden   | :white\_check\_mark:            | :x: Keine Hardwareunterstützung |
| Lüfterkammer               | :white\_check\_mark: | :white\_check\_mark: | :interrobang: falls vorhanden   | :white\_check\_mark:            | :x: Keine Hardwareunterstützung |
| Lüfter-Werkzeugkopf        | :white\_check\_mark: | :white\_check\_mark: | :interrobang: falls vorhanden   | :white\_check\_mark:            | :white\_check\_mark:            |
| Lichtkammer                | :white\_check\_mark: | :white\_check\_mark: | :interrobang: falls vorhanden   | :white\_check\_mark:            | :white\_check\_mark:            |
| Lichtlogo                  | :white\_check\_mark: | :white\_check\_mark: | :x: Keine Hardwareunterstützung | :x: Keine Hardwareunterstützung | :x: Keine Hardwareunterstützung |
| Temperatur-Bett            | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |
| Temperaturdüse             | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |
| Geschwindigkeitsstufe      | :white\_check\_mark: | :white\_check\_mark: | :white\_check\_mark:            | :white\_check\_mark:            | :white\_check\_mark:            |

## Aufgabenliste

\[ ] Aktuelle Steuerungszustände im Steuerungsordner umstrukturieren/vervollständigen \[ ] Definitionen der Zustandsattribute optimieren

## Unterstützt mich

Wenn Ihnen meine Arbeit gefällt, erwägen Sie bitte eine persönliche Spende.\
&#x20;(Dies ist ein persönlicher Spendenlink für DutchmanNL und steht in keiner Verbindung zum ioBroker-Projekt!)\
[![Spenden](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Was ist Sentry.io und was wird an die Server dieses Unternehmens gemeldet?

Sentry.io ist ein Dienst, der Entwicklern einen Überblick über Fehler in ihren Anwendungen bietet. Genau dies wird in diesem Adapter implementiert.

Wenn der Adapter abstürzt oder ein anderer Codefehler auftritt, wird diese Fehlermeldung, die auch im ioBroker-Protokoll erscheint, an Sentry übermittelt. Wenn Sie der iobroker GmbH die Erfassung von Diagnosedaten gestatten, wird auch Ihre Installations-ID (eine eindeutige ID **ohne** weitere Informationen wie E-Mail-Adresse, Name usw.) übermittelt. Dadurch kann Sentry Fehler gruppieren und die Anzahl der betroffenen Benutzer anzeigen. All dies hilft mir, fehlerfreie Adapter bereitzustellen, die praktisch nie abstürzen.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL & Copilot) Update all dependencies to latest versions, consolidating 17 Dependabot PRs
* (DutchmanNL & Copilot) Synchronize admin translations with jsonConfig.json - add missing translations and remove orphaned keys (#202)
* (DutchmanNL) Raise minimum Node.js to 22, modernise CI (Node 24, testing-action-check v2) and release tooling, and resolve repository checker findings

### 0.4.3 (2025-09-16)
* (DutchmanNL) Improve error messages if printer is offline or not reachable.
* (DutchmanNL) Added HD2 printer to the selection menu for easier access (#142)
* (DutchmanNL) Solve several type definition issues. #203, #202, #201, #200, #199, #198
* (DutchmanNL) Implemented a buffer system to reduce CPU usage and improve performance (#145)
* (DutchmanNL & Copilot) Fix type conversion errors by replacing deprecated `tonumber` with proper `TOINTEGER`/`TOFLOAT` modifiers. #197
* (DutchmanNL & Copilot) Add missing state attribute definitions for HD2 printer during printing (height, platform, tool, mapping). Fixes #194
* (DutchmanNL & Copilot) Fix repository checker issues: update devDependencies to latest versions and correct news entries

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

Older changes can be found at [CHANGELOG_OLD.md](https://github.com/DrozmotiX/ioBroker.bambulab/blob/main/CHANGELOG_OLD.md).

## License
MIT License

Copyright (c) 2025-2026 DutchmanNL <oss@drozmotix.eu>

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