---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.judoisoft/README.md
title: ioBroker.judoisoft
hash: blRaZ9WWX/ThWUF+jJPu81QTwwdWs1IQ7MUn0zh0Wdk=
---
![Logo](../../../en/adapterref/iobroker.judoisoft/admin/judo.png)

![Anzahl der Installationen](http://iobroker.live/badges/judoisoft-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.judoisoft.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.judoisoft.svg)
![NPM](https://nodei.co/npm/iobroker.judoisoft.png?downloads=true)

# ioBroker.judoisoft

\=================

## judoisoft-Adapter für ioBroker

Ein kleiner Auszug aus den Befehlsoptionen:

![Möglichkeiten](https://github.com/arteck/iobroker.judoisoft/blob/master/doku/datenpunkte.png)

Verfügbare Einstellungen:

![Möglichkeiten](https://github.com/arteck/iobroker.judoisoft/blob/master/doku/settings.png)

Bei Geräten mit dem neuen JUDO-Konnektivitätsmodul aktivieren Sie `REST API (connectivity module)` in den Instanzeinstellungen. Dies verwendet die lokale Schnittstelle. `http://<ip>/api/rest/...` (Basisauthentifizierung). (Standardbenutzername/Passwort: 'admin' / 'Connectivity')

Die Cloud-Anmeldung hat Vorrang: Wenn sie aktiviert ist, wird die REST-API-Option ausgeblendet und ignoriert.

## Changelog
### 1.1.5 (2026-09-04)
- fix release

### 1.1.4 (2026-09-04)

- Add device selection for cloud connection - #194
- Fix issues detected by repository checker
- Derive `info.connection` from the active mode (local REST vs cloud) - #212
- Cloud login takes precedence over REST API when both are enabled

### 1.1.3 (2026-07-18)

- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (@SimonFischer04) support rest-api (#143). closes #32, closes #82
- (@arteck, @SimonFischer04) (dependency) bump / cleanups
- (@SimonFischer04) Migration to ESLint 9 and @iobroker/eslint-config. #114
- (@SimonFischer04) Migrate admin config to ioBroker jsonConfig. Closes #55

### 1.1.2 (2025-01-04)

- (arteck) corr some errors

### 1.1.1 (2024-09-26)

- (arteck) corr cloud connection

## License

The MIT License (MIT)

Copyright (c) 2018-2026 Arthur Rupp arteck@outlook.com

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