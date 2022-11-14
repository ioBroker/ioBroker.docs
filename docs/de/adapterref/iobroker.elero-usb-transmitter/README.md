---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.elero-usb-transmitter/README.md
title: ioBroker.elero-usb-transmitter
hash: +jchsQ7wvg3ef2f53maFtyqUjc+JBFjWfQ1PKo9sK3g=
---
![Logo](../../../en/adapterref/iobroker.elero-usb-transmitter/admin/elero-usb-transmitter.png)

![NPM-Version](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)
![Anzahl der Installationen (neueste)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Anzahl der Installationen (stabil)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)
![NPM](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)

# IoBroker.elero-usb-transmitter
## Elero-USB-Transmitter-Adapter für ioBroker
Adapter zur Steuerung von Elero Geräten mit dem Elero USB Transmitter Stick.
Sie benötigen den USB-Sender-Stick und müssen die vorhandenen Rollladenmotoren an den Stick anschließen. Der Adapter erkennt automatisch die aktiven Kanäle und fügt die Geräte hinzu. In den Einstellungen können Sie die Namen für die Geräte und das Intervall für das Update festlegen

## Changelog

### 0.5.2

- Missing translation for title and description added

### 0.5.1

- Translation added

### 0.5.0

- Translations added
- Ignore state changes with ack=true in onStateChanged handler
- messages handler removed
- node-scheduler package removed

### 0.4.0

- Added channel for connection info.

### 0.3.0

- Use only open state to controle devices.

### 0.1.0

- Transmission time removed and code clean up.

### 0.0.3"

- Log messages added.

### 0.0.2

- bug fixes

### 0.0.1

- initial release

## License

MIT License

Copyright (c) 2022 marc <marc@lammers.dev>

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