---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lgtv-rs/README.md
title: ioBroker LG TV RS232-Adapter
hash: Fd3OcKpG4vM1G1G4W4qa2bvzSGds4hV42NrpI17GAQI=
---
![Logo](../../../en/adapterref/iobroker.lgtv-rs/admin/lg_admin.png)

![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker LG TV RS232-Adapter
Der ioBroker LG TV RS232 Adapter dient zur Steuerung Ihres LG TV über RS232 in Verbindung mit dem Etnernet Gateway.
Die Liste der Modelle und Befehle ist in der Datei `admin/commands.json` enthalten.

##Hardware
Der Treiber ermöglicht die Verbindung mit dem LG TV über [Adapter](http://blog.instalator.ru/archives/744) RS232 zu Ethernet.

Als RS232-Gateway zu Ethernet wird jede Arduino-kompatible Karte verwendet, auf die Sie [dieser Code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) herunterladen müssen.
Sie benötigen außerdem ein Ethernet Shield W5100 oder W5500 und einen RS232-zu-TTL-Konverter.

## Unterstützung
Unterstützte Modelle: LD750 soll...

## Changelog

### 0.1.1
  (instalator) change test

### 0.1.0
  (instalator) support compact mode
  (instalator) support admin3
  (instalator) refactoring

### 0.0.4
  (instalator) fix error

### 0.0.3
  (instalator) alfa

### 0.0.1
  (instalator) initial

## License
The MIT License (MIT)

Copyright (c) 2021 instalator <vvvalt@mail.ru>

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