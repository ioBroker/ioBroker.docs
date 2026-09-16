---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.sky-remote/README.md
title: ioBroker.sky-remote
hash: 0oMJWHO+YyxkzcHsnAyenfkq0LAJzTq0cR1eXuJbOfo=
---
# ioBroker.sky-remote

![NPM-Version](https://img.shields.io/npm/v/iobroker.sky-remote.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.sky-remote.svg)
![Anzahl der Installationen](https://iobroker.live/badges/sky-remote-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/sky-remote-stable.svg)
![Test und Freigabe](https://github.com/AlanSRU/ioBroker.sky-remote/workflows/Test%20and%20Release/badge.svg)

![Logo](../../../en/adapterref/iobroker.sky-remote/admin/sky-remote.png)

## Sky Remote Adapter für ioBroker

Sky Q-Boxen über Netzwerkbefehle steuern

Mit diesem Adapter können Sie Fernbedienungsbefehle über Ihr Netzwerk an Sky Q-Receiver senden. Er stellt Zustände für alle Fernbedienungstasten bereit und ermöglicht das Senden von Befehlssequenzen.

[Sky Q](https://www.sky.com/tv/boxes) ist eine Set-Top-Box von [Sky](https://www.sky.com/) .

## Voraussetzungen

- ioBroker-Installation
- Sky Q Box ist mit Ihrem Netzwerk verbunden
- IP-Adresse Ihrer Sky Q Box

## Installation

1. Installieren Sie den Adapter über ioBroker Admin.
2. Konfigurieren Sie die IP-Adresse Ihrer Sky Q Box in den Adaptereinstellungen.
3. Schalten Sie den Adapter ein.

## Konfiguration

In den Adaptereinstellungen müssen Sie Folgendes konfigurieren:

- IP-Adresse oder Hostname Ihrer Sky Q Box
- Anschluss (üblicherweise 49160 für Sky Q-Boxen)
- Verbindungsprüfungsfrequenz (in Millisekunden) – wie oft der Adapter prüft, ob die Sky-Box online ist

### Verbindungsüberwachung

Der Adapter überprüft regelmäßig die Verbindung zu Ihrer Sky Q Box und aktualisiert die Einstellungen.`sky-remote.X.info.connection` Status. Dieser Status zeigt an, ob der Adapter erfolgreich mit Ihrer Sky Q Box verbunden werden kann:

- `true` Die Sky Q Box ist online und erreichbar.
- `false` Die Sky Q Box ist offline oder nicht erreichbar.

Sie können diesen Status in Ihren Visualisierungen oder Skripten verwenden, um den Status Ihrer Sky Q Box zu überwachen.

### Tastenverhalten

Der Adapter stellt Tasten bereit, die als Momenttaster funktionieren. Sie sind nur beschreibbar und speichern keinen lesbaren Wert; ein Taster wird also ausschließlich durch Schreiben ausgelöst.`true` dazu:

1. Du schreibst`true` zu einem`buttons.*` Zustand
2. Der Befehl wird an die Sky Q Box gesendet.

Schreiben`true` „erneut“ löst den Befehl immer wieder aus, selbst wenn der Zustand bereits erfüllt ist.`true` Dadurch können Sie dieselbe Taste mehrmals hintereinander drücken, was für die Eingabe von Kanalnummern unerlässlich ist (z. B. Drücken von 1, 0, 2 für Kanal 102).

## Verwendung

### Staaten

Der Adapter erzeugt die folgenden Zustände:

- `sky-remote.X.buttons.*` - Zustände für jede Fernbedienungstaste (z.B.`sky-remote.0.buttons.power` ,`sky-remote.0.buttons.play` )
- `sky-remote.X.sendSequence` - Senden Sie eine durch Kommas getrennte Befehlsfolge

### Beispiele

- Zum Drücken des Netzschalters: Einstellen`sky-remote.0.buttons.power` Zu`true`
- So navigieren Sie zu einem Kanal: Einstellen`sky-remote.0.sendSequence` Zu`"1,0,6"` (für Kanal 106)
- So öffnen und navigieren Sie im Fernsehprogramm: Einstellen`sky-remote.0.sendSequence` Zu`"tvguide,right,right,select"`

### Verfügbare Befehle

| Befehl                   | Beschreibung             |
| ------------------------ | ------------------------ |
| Leistung                 | Ein-/Ausschalter         |
| wählen                   | Auswahl-/OK-Taste        |
| Backup                   | Zurück-Taste             |
| Kanalaufwärts            | Kanal hoch               |
| Kanalabschaltung         | Kanal runter             |
| interaktiv               | Interaktiver Button      |
| helfen                   | Hilfeschaltfläche        |
| Dienstleistungen         | Schaltfläche „Dienste“   |
| TV-Programm / Startseite | TV-Programm/Home-Taste   |
| ich                      | Informationsschaltfläche |
| Text                     | Textschaltfläche         |
| hoch                     | Pfeil nach oben          |
| runter                   | Pfeil nach unten         |
| links                    | Pfeil nach links         |
| Rechts                   | Pfeil nach rechts        |
| Rot                      | Roter Knopf              |
| Grün                     | Grüner Knopf             |
| Gelb                     | Gelber Knopf             |
| Blau                     | Blauer Knopf             |
| 0-9                      | Zifferntasten            |
| spielen                  | Spielen                  |
| Pause                    | Pause                    |
| stoppen                  | Stoppen                  |
| aufzeichnen              | Aufzeichnen              |
| Zeitsprung               | Schnellvorlauf           |
| zurückspulen             | Zurückspulen             |
| Theaterkasse             | Kassenschalter           |
| Himmel                   | Sky-Taste                |

Folgende Aliase werden ebenfalls akzeptiert in`sendSequence` (Sie entsprechen denselben Befehlen wie die Schaltflächen oben, daher wird kein separater Schaltflächenzustand erstellt):`dismiss` (= Backup),`sidebar` (= interaktiv),`search` (= Dienstleistungen).

## Integration mit Blockly

Sie können die visuelle Programmierschnittstelle Blockly in ioBroker verwenden, um Befehlssequenzen zu erstellen:

1. Erstelle ein neues Blockly-Skript
2. Verwenden Sie den „set state“-Block, um den Status festzulegen.`sendSequence` Zustand
3. Fügen Sie Ihre durch Kommas getrennte Befehlssequenz hinzu.

## Integration mit JavaScript

Beispiel zum Senden einer Befehlsfolge:

```javascript
// Press Guide, then right, then select
setState('sky-remote.0.sendSequence', 'tvguide,right,select');

// Turn on the TV and navigate to channel 101
setState('sky-remote.0.sendSequence', 'power,1,0,1');
```

## Fehlerbehebung

- Stellen Sie sicher, dass Ihre Sky Q Box eingeschaltet und mit Ihrem Netzwerk verbunden ist.
- Überprüfen Sie, ob die IP-Adresse Ihrer Sky Q Box korrekt ist.
- Prüfen Sie, ob Port 49160 geöffnet und erreichbar ist.
- Überprüfen Sie die Adapterprotokolle auf Verbindungsfehler.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### **WORK IN PROGRESS**
- (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.

### 1.0.6 (2026-08-19)
- (Alan Paris) Button states are now write-only (`read: false`) as required for the `button` role; existing installations are migrated on start
- (Alan Paris) Fixed info.connection latching at a stale value after a failed or successful command; all writers now share one code path
- (Alan Paris) An unknown command name in sendSequence no longer marks a reachable box as offline
- (Alan Paris) Stop writing states and drop the in-flight connection check when the instance is unloaded
- (Alan Paris) Stopped shadowing the adapter base class `host` property, which misrouted js-controller crash notifications
- (Alan Paris) A command now fails with an error instead of hanging silently when the Sky box closes the connection mid-command
- (Alan Paris) Corrected the German, Dutch and Chinese admin translations of "Port", which used the harbour sense of the word

### 1.0.5 (2026-07-05)
- (Alan Paris) Reset own button states via setState instead of setForeignState
- (Alan Paris) Validate and clamp the port and connection-check-frequency config in code (not only in the admin UI)
- (Alan Paris) Add a default value to the sendSequence state and more descriptive button names
- (Alan Paris) Document the sendSequence command aliases and add a Sky product link to the README

### 1.0.4 (2026-07-04)
- (Alan Paris) Removed the abandoned `sky-remote` third-party dependency; the Sky Q / Sky+HD control protocol is now built in and modernized (node:net, Buffer.from, promise-based, no deprecated APIs)

### 1.0.3 (2026-07-04)
- (Alan Paris) Verify automated release publishing via GitHub Actions trusted publishing (no functional changes)

### 1.0.2 (2026-07-04)
- (Alan Paris) Modernized adapter for community submission: jsonConfig admin UI, updated dependencies, CI/release tooling

### 1.0.0 (2025-05-05)
- (Alan Paris) Initial release

[Older changelogs can be found there](https://github.com/AlanSRU/ioBroker.sky-remote/blob/main/CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Alan Paris <alan.paris@scottish.rugby>

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