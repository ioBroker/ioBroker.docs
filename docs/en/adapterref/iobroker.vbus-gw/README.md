# ioBroker.vbus-gw

![Logo](admin/vbus-gw.png)

[![NPM version](https://img.shields.io/npm/v/iobroker.vbus-gw.svg)](https://www.npmjs.com/package/iobroker.vbus-gw)
![Current version in stable repository](https://iobroker.live/badges/vbus-gw-stable.svg)
![Number of Installations](https://iobroker.live/badges/vbus-gw-installed.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.vbus-gw.svg)](https://www.npmjs.com/package/iobroker.vbus-gw)
**Tests:** ![Test and Release](https://github.com/pdbjjens/ioBroker.vbus-gw/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.vbus-gw.png?downloads=true)](https://nodei.co/npm/iobroker.vbus-gw/)

## vbus-gw adapter for ioBroker

Allows TCP access to serial port based VBus devices

This ioBroker Adapter is based on work by Daniel Wippermann.  
<https://github.com/danielwippermann/resol-vbus/tree/master/examples/serial-to-tcp>  
Copyright and license see section "License"

## Overview

There are two types of VBus hardware adapters:

- TCP based: DL2, DL3, KM2, VBus/LAN
- Serial port based: VBus/USB, USB port of DeltaSol SLT and other controllers  

This ioBroker adapter connects to one or more serial port based hardware adapters and exposes them over TCP. This allows:

- transmitting VBus data over longer distances than USB or serial ports would normally permit
- accessing serial port based adapters from applications that only support TCP based ones

## Configuration

Configurable items are:

- The TCP port on which the service is listening for incoming connections.  
Default is port: 7053, which should not be changed.
- The http port on which the service is listening for discovery requests.  
Default is port: 80, alternatively port 3000 can be selected.
- The password of the VBus gateway.  
Allows access to all serial port connected VBus devices. Default is "vbus".  
- A list of serial ports to connect to with the following parameters for each serial port:  

- channel: The vbus channel to which the serial port is assigned.  
If you only want to connect to a single serial port it is recommended to configure that to use channel 0, since most applications will by default try and connect that channel 0.
- path: The path to the serial port like '/dev/tty.usbmodem141301' or 'COM5'
- baudrate: The baudrate of the serial port. Default is 9600, which normally does not need to be changed.

## Known issues

- This adapter currently supports up to 3 VBus devices connected via serial ports.
- The passwords for all VBus'es connected to the serial ports are the same.  
- VBus.net connected devices are not emulated. Sending the CONNECT (via tag) command returns +OK although no connection is established.  
- Sending the DATA command with a non-existing channel selected returns +OK, but immediately closes the connection afterwards.

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.0 (2024-08-13) - 2024H2 maintenance release

- (pdbjjens) Change: node>=18, js-contoller>=5 and admin>=6 required
- (pdbjjens) New: Updated dependencies
- (pdbjjens) New: Ensure that vbus-gw is started before myvbus or resol

### 0.0.7 (2024-02-24)

- (pdbjjens) Fix: VBus write fixed
- (pdbjjens) Fix: Password logging removed

### 0.0.6 (2024-01-23)

- (pdbjjens) New: Use resol-vbus v0.29.0
- (pdbjjens) New: Logging of denied connection events

### 0.0.5 (2024-01-21)

- (pdbjjens) New: Use resol-vbus v0.28.0
- (pdbjjens) New: Configurable password for the VBus gateway
- (pdbjjens) Fix: Channel forwarding to the requesting connections only

### 0.0.4 (2023-10-03)

- (pdbjjens) New: Selectable discovery port
- (pdbjjens) New: Check for default password
- (pdbjjens) New: support for up to 3 serial ports

## License

MIT License  
Copyright (c) 2024 Jens-Peter Jensen <jjensen@t-online.de>  
Copyright (c) 2013-present, Daniel Wippermann.

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
