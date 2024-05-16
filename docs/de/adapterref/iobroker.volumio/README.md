---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.volumio/README.md
title: ioBroker.volumio
hash: lzXBMYVia1qv+k5tqmOTF0WgDWGQq9z0xDbFsTvfCDc=
---
![Logo](../../../en/adapterref/iobroker.volumio/admin/volumio.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.volumio.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.volumio.svg)
![Anzahl der Installationen (aktuell)](http://iobroker.live/badges/volumio-installed.svg)
![Anzahl Installationen (stabil)](http://iobroker.live/badges/volumio-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/a-i-ks/iobroker.volumio.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/a-i-ks/ioBroker.volumio/badge.svg)
![NPM](https://nodei.co/npm/iobroker.volumio.png?downloads=true)

# IoBroker.volumio
**Tests:** ![Testen und Freigeben](https://github.com/a-i-ks/ioBroker.volumio/workflows/Test%20and%20Release/badge.svg)

### Unterstütze mich
Wenn du mit diesem Adapter coole Automatisierungen in deinem SmartHome realisieren und die Entwicklungszeit verkürzen konntest, kannst du mich gerne auf eine Tasse Kaffee einladen :)

[![Spenden](https://raw.githubusercontent.com/a-i-ks/ioBroker.volumio/master/donate_button.png)](http://paypal.me/iske)

## Volumio-Adapter für ioBroker
Volumio-Adapter für ioBroker

Dies ist ein Adapter zur Fernsteuerung einer Volumio-Instanz.

Es verwendet die folgende REST-API: https://volumio.github.io/docs/API/REST_API.html

Zur Zeit sind folgende Funktionen implementiert:

* Spielerbefehle
* Stummschalten / Ton einschalten
* Weiter / Zurück
    * Spielen
* Spiele das n-te Lied aus der Playlist
    * Pause
* Zwischen Wiedergabe/Pause umschalten
    * Stoppen
    * Lautstärkeregelung
* Auf bestimmten Wert einstellen
* Lautstärke erhöhen / verringern
* Warteschlange
* Warteschlange löschen
* Titel wiederholen
* Shuffle-Modus
* Spielerstatus erhalten

Machen:

- [ ] Suchposition setzen
- [ ] Wiedergabelisten auflisten
- [ ] Durchsuchen

## Changelog
### 0.2.0
 * (André Iske) 
    - Updated to newest ioBroker adapter structure 
    - Fixed adapter crashes

### 0.1.3
* (André Iske) Security patches 

### 0.1.2
* (André Iske) Minor bug fixes 

### 0.1.0
* (André Iske) Complete reworked adapter
    * Switched codebase to typescript
    * Changed License to MIT

### 0.0.1
* (André Iske) initial release

## License
MIT License

Copyright (c) 2024 André Iske <andre.iske@mailbox.org>

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