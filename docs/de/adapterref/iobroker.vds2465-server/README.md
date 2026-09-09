---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vds2465-server/README.md
title: ioBroker.vds2465-Server
hash: GPA+sUr8uEvtOAYqv6pPPSMP8hADy6IHfDXKxnBdgbo=
---
![Logo](../../../en/adapterref/iobroker.vds2465-server/admin/vds2465-server.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.vds2465-server.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.vds2465-server.svg)
![Anzahl der Installationen](https://iobroker.live/badges/vds2465-server-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/vds2465-server-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/Hirsch-DE/iobroker.vds2465-server.svg)
![NPM](https://nodei.co/npm/iobroker.vds2465-server.png?downloads=true)
![Test und Freigabe](https://github.com/Hirsch-DE/ioBroker.vds2465-server/workflows/Test%20and%20Release/badge.svg)

# ioBroker.vds2465-Server

## vds2465-Serveradapter für ioBroker

Empfänger von VdS2465-Meldungen

Der Adapter empfängt Meldungen von Wählgeräten mit dem VdS2465-S2 Protokoll. Dabei sind folgende Varianten möglich

1. bedarfsgesteuert unverschlüsselt
2. stehend unverschlüsselt
3. bedarfsgesteuert verschlüsselt (AES-128-Bit)
4. stehend verschlüsselt (AES-128-Bit)

Bei bestehenden Verbindungen kann vom Adapter aus der Status von Ein- und Ausgängen abgefragt, sowie bei Ausgängen der Zustand umgeschaltet werden.

Die Relais werden über die Adapter-Konfiguration als Objekt angelegt.

Es werden zusätzliche Inhalte wie

- Priorität
- .
- Testmeldung
- Datum und Uhrzeit
- Zeichen
- Herstelleridentifikation
- Gerätefunktionen
- Transportdienstkennung
- Telegrammzähler

Ausgewertet.

Von diesem Adapter wird auch das „Service Request“ unterstützt, welches in einigen Wählgeräten auch beim alten VdS2465-Protokoll aktiviert werden kann.

## Changelog
### 1.1.1
* (Hirsch-DE) Dependencies updated
* (Hirsch-DE) Minimum node.js version is 22.x
### 1.1.0
* (Hirsch-DE) devDependencies updated
* (Hirsch-DE) Änderung create in extendObject
* (Hirsch-DE) ConnectionStatus auf dem Device anzeigen
### 1.0.3
* (Hirsch-DE) Fix npm publish
* (Hirsch-DE) dependencies updated
### 1.0.2
* (Hirsch-DE) Packages updated
### 1.0.1
* (Hirsch-DE) Packages updated
* (Hirsch-DE) Design Anpassungen
### 1.0.0
* (Hirsch-DE) Packages updated
* (Hirsch-DE) Minimum node.js version is 18.x

[Older changelogs can be found there](https://github.com/Hirsch-DE/ioBroker.vds2465-server/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2022-2026 Hirsch-DE <github731@hirschfeldonline.de>

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