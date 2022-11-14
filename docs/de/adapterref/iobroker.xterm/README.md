---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: Yd+XjBxXX/gFGwzCrttfIJrU0k9so6ikCV9JwSCDE1M=
---
![Logo](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![Anzahl der Installationen](http://iobroker.live/badges/xterm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.xterm.svg)

# IoBroker.xterm
![Testen und freigeben](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry-Berichte werden ab js-controller 3.0 verwendet.

## Xterm-Adapter für ioBroker
Dieser Adapter ermöglicht die Ausführung von Shell-Befehlen auf dem ioBroker-Host. Er ersetzt den Adapter `ioBroker.terminal`.

Terminalserver zum Öffnen der Befehlszeilenschnittstelle.
Bitte verwenden Sie es nur zu Verwaltungszwecken.

Basierend auf xterm.js- und node-pty-Paketen.

Wenn die Authentifizierung aktiviert ist, kann sich nur der ioBroker „admin“-Benutzer anmelden.

## Verwendungszweck
Adapter unterstützt 2 Modi:

- Startet cmd.exe (Windows) oder bash (Linux). Unter Linux läuft die Bash unter dem Benutzer „iobroker“, und vielleicht sollten Sie zu einem anderen Benutzer mit mehr Rechten wechseln (über „su USER“).
- Oder Shell mit node.js simulieren (Sie können diese Option aktivieren, wenn die erste Option nicht funktioniert)

Hinweis: Einige Terminalbefehle mit Interaktivität funktionieren nicht. Z.B. `nano` und einige andere.

## MACHEN
- Simulation: Strg + R (Verlauf)
- Simulation: Mehr Kodierungsseiten. Wenn Sie eine Codepage finden, die zu Ihrem System passt, erstellen Sie bitte ein Problem. Mögliche Codierungsseiten finden Sie [hier](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).
- Unterstützung von mehr als einer Sitzung (Tabs)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### **IN ARBEIT** -->

## Changelog
### 1.1.0 (2022-10-08)
* (Apollon77) Update xterm library
* (Apollon77) Prepare for future js-controller versions

### 1.0.0 (2022-08-29)
* (bluefox) Check only port of the interface and not of all interfaces

### 0.3.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.3.1 (2022-03-18)
* (Apollon77) Fix a crash case reported by Sentry

### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework info.connection status to show that server is connected also as green by using "none" to show that no one is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed type of the connection state to "string"

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021-2022 ioBroker <dogafox@gmail.com>

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