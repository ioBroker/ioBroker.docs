---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.ekey/README.md
title: ioBroker.ekey
hash: Nkx4VLbQXdwu9O5NOlM4Dn25Z/zrFviSu7hvWSkACIg=
---
![Logo](../../../en/adapterref/iobroker.ekey/admin/ekey.png)

![Greenkeeper-Abzeichen](https://badges.greenkeeper.io/ioBroker/ioBroker.ekey.svg)
![Anzahl der Installationen](http://iobroker.live/badges/ekey-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.ekey.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.ekey.svg)
![Abhängigkeitsstatus](https://gemnasium.com/badges/github.com/ioBroker/ioBroker.ekey.svg)
![Code Climate](https://codeclimate.com/github/ioBroker/ioBroker.ekey/badges/gpa.svg)
![Travis-CI](http://img.shields.io/travis/ioBroker/ioBroker.ekey/master.svg)
![AppVeyor](https://ci.appveyor.com/api/projects/status/github/ioBroker/ioBroker.ekey?branch=master&svg=true)
![NPM](https://nodei.co/npm/iobroker.ekey.png?downloads=true)

# ioBroker.ekey

Dieser Adapter für ioBroker stellt eine Verbindung zu einem ekey-Connector UDP her.

Umgesetzt wie beschrieben in:

- <https://descargas.futurasmus-knxgroup.org/doc/en/ekey/13002/operating_instructions_ekey_converter_udp_rs485_id51.pdf>
- NET-Protokoll: <https://www.ekey.net/wp-content/dokumente/Operating_instructions_ekey_net_4.4_en_web_ID181_3006.pdf> (Seite 189)

![Bild](../../../en/adapterref/iobroker.ekey/img/ekey.png)

## Serielle Schnittstelle

Experimentelle Funktion zur Verbindung mit ekey über die serielle Schnittstelle. Diese Funktion ist noch nicht getestet.

Sie können die serielle Schnittstelle aktivieren, um Daten über einen USB-RS485- oder RS-232-Konverter zu empfangen. Aktuell wird nur der Finger-Hash unterstützt. Um die Dekodierung weiterer Daten vom Gerät zu erleichtern, erstellen Sie bitte ein Ticket mit den empfangenen Daten.

## Changelog
<!--
	### **WORK IN PROGRESS**
-->
### 1.2.3 (2022-11-22)
* (bluefox) Added `net` protocol support
* (bluefox) Added serial port support

### 1.1.0
* (bluefox) Added compact mode
* (bluefox) Own port is now configurable

### 1.0.0
* (bluefox) Configuration dialog under firefox was corrected

### 0.2.1
* (bluefox) tests were added

### 0.1.0
* (bluefox) initial release

## License

The MIT License (MIT)

Copyright (c) 2018-2022 ioBroker <dogafox@gmail.com>

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