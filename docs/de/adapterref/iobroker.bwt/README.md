---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.bwt/README.md
title: ioBroker.bwt
hash: PP+ePNmV2FiHn4oeaoQGofPdAYFxcCtScVo0M/FQwWI=
---
![Logo](../../../en/adapterref/iobroker.bwt/admin/bwt.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.bwt.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.bwt.svg)
![Anzahl der Installationen](https://iobroker.live/badges/bwt-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/bwt-stable.svg)
![Abhängigkeitsstatus](https://img.shields.io/david/TA2k/iobroker.bwt.svg)
![NPM](https://nodei.co/npm/iobroker.bwt.png?downloads=true)

# IoBroker.bwt
**Tests:** ![Testen und freigeben](https://github.com/TA2k/ioBroker.bwt/workflows/Test%20and%20Release/badge.svg)

## Bwt-Adapter für ioBroker
Adapter für bwt-Geräte

## Anmeldeablauf
Die lokale IP und Zugriffscode eingeben

Es WIRD der lokale Zugriffscode benötigt. Dazu muss man am Gerät die Cloud-Registrierung durchlaufen. Danach bekommt man den Zugriffs-Code per Email zugesendet.

Tipp zur Inbetriebnahme der Anbindung am Gerät: Bei WLAN-Anbindung muss die Option DHCP deaktiviert sein. DHCP bezieht sich nur auf die LAN-Anbindung ! Andersherum muss bei LAN-Anbindung DHCP aktiviert und WLAN ausgeschaltet sein. Es darf immer nur sterben Parameter Einer Schnittstelle konfiguriert sein, sonst klappts nicht.

##Diskussion und Fragen
<https://forum.iobroker.net/topic/49576/test-adapter-bwt-v0-0-x>

## Changelog

### 0.0.1
* (TA2k) initial release

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