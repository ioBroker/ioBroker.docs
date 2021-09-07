---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.benq/README.md
title: ioBroker BenQ Projektoradapter
hash: LkqF9K34d1UeWB7DB6vf83rG2pjH2T/wKUk11feC7lM=
---
![Logo](../../../en/adapterref/iobroker.benq/admin/benq-logo.png)

![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)

# IoBroker BenQ Projektoradapter
Der ioBroker BenQ Projektoradapter wird verwendet, um Ihren BenQ Projektor über RS232 in Verbindung mit dem Etnernet Gateway zu steuern.
Die Liste der Modelle und Befehle ist in der Datei `admin/commands.json` enthalten.

##Hardware
Der Treiber ermöglicht Ihnen die Verbindung zu den Projektoren BenQ über die [Adapter](http://blog.instalator.ru/archives/744) RS232 zu Ethernet.

Als RS232-Gateway zu Ethernet wird jede Arduino-kompatible Karte verwendet, auf die Sie [dieser Code](https://github.com/stepansnigirev/ArduinoSerialToEthernet) herunterladen müssen.
Sie benötigen außerdem ein Ethernet Shield W5100 oder W5500 und einen RS232-zu-TTL-Konverter.

## Unterstützung
Unterstützte Modelle: W1200, W1070, W1080 werden...

## Changelog

### 0.2.7
 * (instalator) fix error
### 0.2.4
 * (instalator) change test

### 0.2.2
 * (instalator) fixed clearTimeout

### 0.2.1
 * (instalator) support compact mode
 * (instalator) support admin3
 * (instalator) refactoring

### 0.0.6
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