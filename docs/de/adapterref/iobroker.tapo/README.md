---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.tapo/README.md
title: ioBroker.tapo
hash: RfiNbbyj4P5BGxOht9yHSwECxWi6Gi6dTc+McamHXX8=
---
![Logo](../../../en/adapterref/iobroker.tapo/admin/tapo.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.tapo.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.tapo.svg)
![Anzahl der Installationen](https://iobroker.live/badges/tapo-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/tapo-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.tapo.svg)
![NPM](https://nodei.co/npm/iobroker.tapo.png?downloads=true)

# IoBroker.tapo
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.tapo/workflows/Test%20and%20Release/badge.svg)

## Tapo-Adapter für ioBroker
Adapter für TP-Link Tapo

basierend auf https://github.com/apatsufas/homebridge-tapo-p100

## Anmeldeablauf
Die Tapo Mail und Passwort eingeben. Es werden die Geräte via Cloud abgerufen, aber lokal gesteuert.
Wenn die IP nicht gefunden wird, muss sie manuell unter tapo.0.id.ip gesetzt werden.

## Steuern
tapo.0.id.remote auf true/false setzen steuert den jeweiligen Befehl. Der Befehl WIRD lokal an das Gerät gesendet.

##Diskussion und Fragen
<https://forum.iobroker.net/topic/57336/test-adapter-tp-link-tapo/>

## Changelog

### 0.0.2

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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