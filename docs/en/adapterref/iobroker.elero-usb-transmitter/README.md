# ioBroker.elero-usb-transmitter

![Logo](admin/elero-usb-transmitter.png)

[![NPM version](http://img.shields.io/npm/v/iobroker.elero-usb-transmitter.svg)](https://www.npmjs.com/package/iobroker.elero-usb-transmitter)
[![Downloads](https://img.shields.io/npm/dm/iobroker.elero-usb-transmitter.svg)](https://www.npmjs.com/package/iobroker.elero-usb-transmitter)
![Number of Installations (latest)](http://iobroker.live/badges/elero-usb-transmitter-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/elero-usb-transmitter-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter/badge.svg)](https://snyk.io/test/github/marc2016/ioBroker.elero-usb-transmitter)

[![NPM](https://nodei.co/npm/iobroker.elero-usb-transmitter.png?downloads=true)](https://nodei.co/npm/iobroker.elero-usb-transmitter/)

## elero-usb-transmitter adapter for ioBroker

Adapter to control Elero devices with the Elero USB Transmitter Stick.
You need the usb transmitter stick and have to connect the existing roller shutter motors to the stick. The adapter automatically detects the active channels and adds the devices. In the settings you can set the names for the devices and the interval for the update

## Changelog

## **WORK IN PROGRESS**

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
