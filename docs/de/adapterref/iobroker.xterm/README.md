---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.xterm/README.md
title: ioBroker.xterm
hash: yUz3ldjCTS+rHznLQDtBRUNUoyt13EdVQGBZ5/F0/2I=
---
![Logo](../../../en/adapterref/iobroker.xterm/admin/xterm.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.xterm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.xterm.svg)
![Anzahl der Installationen (spätestens)](http://iobroker.live/badges/xterm-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/xterm-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/bluefox <dogafox@gmail.com>/iobroker.xterm.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/bluefox <dogafox@gmail.com>/ioBroker.xterm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.xterm.png?downloads=true)

# IoBroker.xterm
## Xterm-Adapter für ioBroker
Dieser Adapter ermöglicht die Ausführung von Shell-Befehlen auf dem ioBroker-Host. Er ersetzt den `ioBroker.terminal` Adapter.

Terminalserver zum Öffnen der Befehlszeilenschnittstelle.
Bitte verwenden Sie es nur für Verwaltungszwecke.

Basierend auf xterm.js- und node-pty-Paketen.

Wenn die Authentifizierung aktiviert ist, kann sich nur der ioBroker-Benutzer "admin" anmelden.

## Verwendungszweck
Adapter unterstützt 2 Modi:

- Startet cmd.exe (Windows) oder Bash (Linux). Unter Linux läuft die Bash unter dem Benutzer `iobroker`, und vielleicht sollten Sie zu einem anderen Benutzer mit mehr Rechten wechseln (über `su USER`).
- Oder simulieren Sie Shell mit node.js (Sie können diese Option aktivieren, wenn die erste Option nicht funktioniert)

Hinweis: Einige Terminalbefehle mit Interaktivität funktionieren nicht. Z.B. `nano` und einige andere.

## MACHEN
- Simulation: Strg + R (Verlauf)
- Simulation: Mehr Kodierungsseiten. Wenn Sie eine Codepage finden, die zu Ihrem System passt, erstellen Sie bitte ein Problem. Mögliche Coding-Seiten finden Sie [hier](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).
- Unterstützen Sie mehr als eine Sitzung (Tabs)

<!-- Platzhalter für die nächste Version (am Zeilenanfang):

### __ARBEITEN IN PROGRESS__ -->

## Changelog
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

Copyright (c) 2021 ioBroker <dogafox@gmail.com>

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