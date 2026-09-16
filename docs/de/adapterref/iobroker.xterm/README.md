---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: 0uuabNMYkIc1bZGSRLdEUxqWU4GqkDMo793/0LOQttM=
---
![Logo](../../../en/adapterref/iobroker.xterm/admin/xterm.svg)

![Anzahl der Installationen](http://iobroker.live/badges/xterm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Test und Freigabe](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg)
![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# ioBroker.xterm

**Dieser Adapter nutzt die Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in [der Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry) . Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

## xterm-Adapter für ioBroker

Dieser Adapter ermöglicht die Ausführung von Shell-Befehlen auf dem ioBroker-Host. Er ersetzt den`ioBroker.terminal` Adapter.

Terminalserver zum Öffnen der Befehlszeilenschnittstelle. Bitte verwenden Sie ihn nur für administrative Zwecke.

Basierend auf den Paketen xterm.js und node-pty.

Wenn die Authentifizierung aktiviert ist, kann sich nur der ioBroker-Benutzer "admin" anmelden.

## Verwendung

Der Adapter startet cmd.exe (Windows) oder bash (Linux) über ein echtes Pseudo-Terminal (node-pty). Unter Linux läuft bash unter dem`iobroker` Benutzer – Sie können zu einem anderen Benutzer mit mehr Berechtigungen wechseln über`su USER` Die

### Persistente Terminals

Die Shells laufen im Adapter und nicht im Browser. Bei Verbindungsverlust oder Seitenneuladung bleiben die Terminals aktiv und werden inklusive ihres Inhalts wiederhergestellt – auch langlaufende Befehle werden nicht unterbrochen.

Ein Terminal wird beendet, wenn es explizit geschlossen wird oder wenn innerhalb des konfigurierten **Sitzungs-Timeouts** (standardmäßig 5 Minuten) kein Browser zurückkehrt;`0` (Die Shells werden sofort beendet, wenn die Browserverbindung getrennt wird.)

## Tastenkombinationen

| Abkürzung           | Aktion                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Strg+Umschalt+V** | Dialog zum Einfügen öffnen (nützlich bei HTTP-Verbindungen, bei denen die Zwischenablage-API nicht verfügbar ist) |
| **Strg+Umschalt+F** | Suche im Terminal-Scrollback                                                                                      |
| **Rechtsklick**     | Aus der Zwischenablage einfügen (HTTPS) oder Einfügedialog öffnen (HTTP)                                          |
| Text auswählen      | Automatische Kopiert in die Zwischenablage (PuTTY-Stil)                                                           |

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 4.0.1 (2026-08-07)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@GermanBluefox) Dropped support of Node.js 20
* (@GermanBluefox) Added SVG icon
* (@GermanBluefox) The terminals now run on the server: they survive a reload or a lost connection and are restored with their content
* (@GermanBluefox) Added the setting for the session timeout
* (@GermanBluefox) Fixed the HTTPS mode: the adapter did not start the web server at all if `secure` was enabled
* (@GermanBluefox) Fixed the shown client IP addresses in `info.connection`
* (@GermanBluefox) Errors of the web socket connection do not terminate the adapter anymore
* (@GermanBluefox) A shell that cannot be started is not restarted endlessly anymore
* (@GermanBluefox) All shells are terminated now if the adapter stops
* (@GermanBluefox) Fixed the double connections of the GUI after a connection timeout

### 3.1.0 (2026-06-04)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under a specified user on Linux
* (bluefox) Implemented paste on right mouse click
* (bluefox) Implemented authentication for the terminal

### 3.0.0 (2026-04-12)
* (bluefox) Migrated the adapter to Typescript
* (bluefox) Added multiple terminal sessions

### 2.0.1 (2023-09-18)
* (bluefox) xterm library updated
* (bluefox) Move Lets encrypt settings to acme adapter
* (bluefox) Minimal supported node.js version is 16

### 1.1.0 (2022-10-08)
* (Apollon77) Updated the xterm library
* (Apollon77) Prepared for future js-controller versions

[Older changelogs can be found there](https://github.com/ioBroker/ioBroker.xterm/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2021-2026 ioBroker <dogafox@gmail.com>

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