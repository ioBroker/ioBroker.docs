---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.cleveron/README.md
title: ioBroker.cleveron
hash: xJZmOkM6vMAT5CXYfxAI2NCdYqJBiD5wlXsNlc9mkIY=
---
![Logo](../../../en/adapterref/iobroker.cleveron/admin/cleveron.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.cleveron.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.cleveron.svg)
![Anzahl der Installationen](https://iobroker.live/badges/cleveron-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/cleveron-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/iobroker-community-adapters/iobroker.cleveron.svg)
![NPM](https://nodei.co/npm/iobroker.cleveron.png?downloads=true)

# IoBroker.cleveron
**Tests:** ![Testen und freigeben](https://github.com/iobroker-community-adapters/ioBroker.cleveron/workflows/Test%20and%20Release/badge.svg)

## Cleveron-Adapter für ioBroker
Erhalte deine Daten aus der CLEVERON - API (<https://www.cleveron.ch>)

## Handbuch
- Sie benötigen lediglich Ihre cleveron-Login-Daten.
- Der Adapter bekommt alle Gebäude-, Raum- und Gerätedaten, die von der cleveron API bereitgestellt werden.

- Fügen Sie das gewünschte Polling - Intervall in Minuten hinzu.

- Starten Sie den Adapter neu, wenn Sie neue Geräte, Räume oder Wohnungen hinzugefügt oder Einstellungen geändert haben.

## Changelog

### v0.0.4

-   changed ecrypting to 'encryptedNative'

### 0.0.3

-   added folders, devices, channels & fixed bugs

### 0.0.2

-   'request' replaced by 'got', secret encryption added, reviewed accordingly 'development and coding best practices'

### 0.0.1 First try

-   (forelleblau) initial release

## License

MIT License

Copyright (c) 2022 forelleblau <mailto:marceladam@gmx.ch>

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