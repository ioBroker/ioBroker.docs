![Logo](admin/iogopro.png)
# ioBroker.iogopro

[![NPM version](https://img.shields.io/npm/v/iobroker.iogopro.svg)](https://www.npmjs.com/package/iobroker.iogopro)
[![Downloads](https://img.shields.io/npm/dm/iobroker.iogopro.svg)](https://www.npmjs.com/package/iobroker.iogopro)
![Number of Installations (latest)](https://iobroker.live/badges/iogopro-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/iogopro-stable.svg)
[![Dependency Status](https://img.shields.io/david/nisiode/iobroker.iogopro.svg)](https://david-dm.org/nisiode/iobroker.iogopro)

[![NPM](https://nodei.co/npm/iobroker.iogopro.png?downloads=true)](https://nodei.co/npm/iobroker.iogopro/)

**Tests:** ![Test and Release](https://github.com/nisiode/ioBroker.iogopro/workflows/Test%20and%20Release/badge.svg)

## iogopro adapter for ioBroker

This adapter is connecting ioBroker to the mobile app ioGo PRO https://play.google.com/store/apps/details?id=de.nisnagel.iogopro.
Please visit www.iogo.app for more information on getting started.

## Configuration
You need a valid api-secret for this adapter, which you could generate in the ioGO-PRO App.

## States
All states are based on the role and the current value shown with a intuitive icon.
A list of all available mapped icons is available here: [icons.png](https://github.com/nisiode/ioBroker.iogopro/blob/342d92454401fdf93f6ebae0e6a12ccef68ee1b5/img/icons.png)

## Usage
You can send message to all authenticated users over messageBox `sendTo('iogo', 'New message')`
or to specific user `sendTo('iogo', {user: 'Username', text: 'Test message'})`.
User must be created before (please read the application documentation for further details).

It is possible to specify more than one recipient (just separate the Usernames by comma). For example: Recipient: "User1,User4,User5"

Example how to send notification customized message with javascript:
```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News'
});
```

And one example with blockly:

![blockly](img/blockly.png)

Callbacks are supported as well:
```
sendTo('iogo', {title: 'News', text: 'New message'}, function (res) {
    console.log('Sent to ' + res + ' users');
});
```

Just send the path to your image instead of text or use url attribute `sendTo('iogo.0', 'absolute/path/file.png')`
```
sendTo('iogo', {
    user:                   'Username',
    text:                   'New message',
    title:                  'VIP News',
    url:                    'absolute/path/file.png'
});
```

**Possible options**:
- `user`: Single user or list of users
- `text`: The message itself
- `title`: The notification's title
- `url`: Absolute path to an image
- `expiry`: Expiration time in seconds

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.2.5 (2021-10-27)
* (nis) Automatisches Löschen von Locations

### 0.2.4 (2021-10-18)
* (nis) simplify admin ui for blocked enums

### 0.2.2 (2021-10-04)
* (nis) change sync of enum member changes

### 0.2.1 (2021-09-21)
* (nis) bugfix blocked enums

### 0.2.0 (2021-09-21)
* (nis) sync states only when value has changed
* (nis) added list of blocked enums to instance config

### 0.1.0 (2021-09-12)
* (nis) migrate current state from ioBroker.iogo

### 0.0.1 (2021-08-29)
* (nis) initial release

## License
MIT License

Copyright (c) 2021 nis <info@iogo.app>

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