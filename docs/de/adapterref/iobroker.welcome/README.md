---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.welcome/README.md
title: ioBroker.willkommen
hash: jkzi1/Siu0dakUu5BPH4ebgxGY3FGjGwTjgDSzN/9lc=
---
![Logo](../../../en/adapterref/iobroker.welcome/admin/welcome.png)

![Anzahl der Installationen](http://iobroker.live/badges/web-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.welcome.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.welcome.svg)

# IoBroker.welcome
![Test und Freigabe](https://github.com/ioBroker/ioBroker.welcome/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/web/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

Dieser Adapter zeigt alle Web- und Admin-Instanzen von ioBroker auf einer Seite auf Port 80 (konfigurierbar)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

![Willkommen](../../../en/adapterref/iobroker.welcome/img/screen.png)

Normalerweise sollte dieser Adapter auf Port 80 oder 443 laufen und zeigt verfügbare Adapter mit Webservern an.

Optional können Sie die Instanz angeben, zu der beim Öffnen der Willkommensseite automatisch weitergeleitet wird.
In diesem Fall wird beim Öffnen von http://IP sofort zu einer angegebenen Webinstanz umgeleitet.

<!-- Platzhalter für die nächste Version (am Anfang der Zeile):

### **ARBEIT IN ARBEIT** -->

## Changelog
### 0.0.5 (2023-10-16)
* (bluefox) Corrected the adapter list

### 0.0.4 (2023-10-16)
* (bluefox) First release

### 0.0.1 (2023-10-16)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2023 Denis Haev <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.