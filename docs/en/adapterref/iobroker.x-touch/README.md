![Logo](admin/x-touch.png)
# ioBroker.x-touch

[![NPM version](http://img.shields.io/npm/v/iobroker.x-touch.svg)](https://www.npmjs.com/package/iobroker.x-touch)
[![Downloads](https://img.shields.io/npm/dm/iobroker.x-touch.svg)](https://www.npmjs.com/package/iobroker.x-touch)
![Number of Installations (latest)](http://iobroker.live/badges/x-touch-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/x-touch-stable.svg)
![Test and Release](https://github.com/bannsaenger/iobroker.x-touch/workflows/Test%20and%20Release/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch/badge.svg)](https://snyk.io/test/github/Bannsaenger/ioBroker.x-touch)

[![NPM](https://nodei.co/npm/iobroker.x-touch.png?downloads=true)](https://nodei.co/npm/iobroker.x-touch/)

## x-touch adapter for ioBroker

Communicate with a Behringer X-Touch Control Surface (DAW Controller)

## ToDo
- Add the syncGlobal functionality
- Add the recreation of banks if option is set

## Message Box
There a two acepted commands:
* `export` exports the actual values stored in the states of the devicegroups to the userdata folder x-touch.0
* `import` imports the youngest file from the userdata folder. Additionally you can specify `file` and/or the `devicegroup` number to restore. If `path` is specified the entire filesystem will be used and a `file` name is mandatory.  

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.1 (2025-02-25)
* (Bannsaenger) updated admin dependency

### 0.7.0 (2025-02-17)
* (Bannsaenger) fixed some minor typos
* (Bannsaenger) updated to node 18.x - 22.x
* (Bannsaenger) updated dependencies, node 22 compatibility, workflow
* (Bannsaenger) added possibility to lock the desk
* (Bannsaenger) resend data on group membership change
* (Bannsaenger) removed createBanks from config dialog (too dangerous, delete by hand if neccessary)

### 0.6.5 (2023-12-30)
* (Bannsaenger) add CHANGELOG_OLD.md

### 0.6.4 (2023-12-21)
* (Bannsaenger) fixed console_layout.json
* (Bannsaenger) fixed sending items on channel 9, 17 etc.
* (Bannsaenger) use extendObject instead of Create......
* (Bannsaenger) updated dependencies

### 0.6.3 (2023-02-27)
* (Bannsaenger) updated dependencies
* (Bannsaenger) fixed bank and channel switching

## License
MIT License

Copyright (c) 2021-2025 Bannsaenger <bannsaenger@gmx.de>

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