![Logo](admin/mikrotik_admin.png)
ioBroker MikroTik Router adapter
=================
![Number of Installations](http://iobroker.live/badges/mikrotik-installed.svg) ![Number of Installations](http://iobroker.live/badges/mikrotik-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.mikrotik.svg)](https://www.npmjs.com/package/iobroker.mikrotik)
[![Downloads](https://img.shields.io/npm/dm/iobroker.mikrotik.svg)](https://www.npmjs.com/package/iobroker.mikrotik)
[![Tests](http://img.shields.io/travis/instalator/ioBroker.mikrotik/master.svg)](https://travis-ci.org/instalator/ioBroker.mikrotik)  
[![NPM](https://nodei.co/npm/iobroker.mikrotik.png?downloads=true)](https://nodei.co/npm/iobroker.mikrotik/)

## Using
### add_firewall
Add address to firewall list and enable.  
e.g. `name,127.0.0.1,comment`.
### raw
Send command api to mikrotik  
e.g. `/ip/firewall/address-list/add\n=list=2vpn\n=address=195.82.146.0/24\n=comment=rutracker.org`.
### reboot, shutdown
Reboot/shutdown mikrotik
### usb_reset
Reset power USB in mikrotik


*The created objects are not deleted automatically when deleted in the router.*

## Changelog

#### 1.0.10
* (instalator) added name object
* (instalator) fix error

#### 1.0.6
* (instalator) added in interface RX/TX (packets) [issues#20](https://github.com/instalator/ioBroker.mikrotik/issues/20)
* (instalator) Added Support for Compact mode
* (instalator) Refactoring

#### 1.0.5
* (instalator) Update Login Protocol [issues#23](https://github.com/instalator/ioBroker.mikrotik/issues/23)

#### 1.0.4
* (instalator) fix add_firewall command [issues#18](https://github.com/instalator/ioBroker.mikrotik/issues/18#issue-358331248)

#### 1.0.3
* (instalator) added checkboxes - receive the following data

#### 1.0.2
* (bondrogeen) added support for the Admin 3
* (instalator) fixed some bugs
* (instalator) added in settings time polling

#### 1.0.1
* (instalator) Change in objects symbol "*" to "_", see [issues#10](https://github.com/instalator/ioBroker.mikrotik/issues/10)
* (instalator) fix [issues#9](https://github.com/instalator/ioBroker.mikrotik/issues/9)
* (instalator) add to settings Timeout get
* (instalator) add firewall list [issues#7](https://github.com/instalator/ioBroker.mikrotik/issues/7) and command 'add_firewall' e.g. "name,127.0.0.1,comment"

#### 1.0.0
* (instalator) up to stable

#### 0.0.20
* (instalator) add mask for password in settings dialog
* (instalator) added info error login or password

#### 0.0.12
* (instalator) change logic connect

#### 0.0.11
* (instalator) added WAN address to systeminfo

#### 0.0.10
* (instalator) change logo
* (instalator) fix error

#### 0.0.4
* (instalator) added commands usb power reset
* (instalator) fix error

#### 0.0.2
* (instalator) added command 'disbled ' for: filter, interface, filter nat.
* (instalator) fix error
* (instalator) added list dhcp and wifi client

#### 0.0.1
* (instalator) initial version

## License

The MIT License (MIT)

Copyright (c) 2020 instalator <vvvalt@mail.ru>

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
