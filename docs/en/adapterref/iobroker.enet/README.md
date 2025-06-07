![Logo](admin/enet.png)
# ioBroker.enet

![Number of Installations](http://iobroker.live/badges/enet-installed.svg) ![Number of Installations](http://iobroker.live/badges/enet-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.enet.svg)](https://www.npmjs.com/package/iobroker.enet)
[![Downloads](https://img.shields.io/npm/dm/iobroker.enet.svg)](https://www.npmjs.com/package/iobroker.enet)

[![NPM](https://nodei.co/npm/iobroker.enet.png?downloads=true)](https://nodei.co/npm/iobroker.enet/)

**Tests:** Linux/Mac: [![Travis-CI](https://travis-ci.org/SebastianSchultz/ioBroker.enet.svg?branch=master)](https://travis-ci.org/SebastianSchultz/ioBroker.enet)
Windows: [![AppVeyor](https://ci.appveyor.com/api/projects/status/9ow8uf5dq6u8fpfv/branch/master?svg=true)](https://ci.appveyor.com/project/SebastianSchultz/iobroker-enet/branch/master)

Jung/Gira eNet Smarthome Adapter for [ioBroker smart home system](https://www.iobroker.net)

Control Jung/Gira eNet smarthome devices using the Jung/Gira eNet Mobile Gate Wireless IP gateway (https://www.gira.com/en_GB/gebaeudetechnik/systeme/enet/enet-produkte/bediengeraete/enet-mobile-gate.html) or the Jung/Gira eNet Smart Home Server.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 2.0.3 (2025-06-05)
* switched configUI to JSON

   #### Gateway version
* "discover.js" and "gateway.js" replaced by files from Version 1.2.2\
   and reformatted accroding to requirements from ESLINT\
   **no logical code changed**\
   Gateway function activated again,\
   eNet Gateway version should now be running again (depending on outstanding tests)

  #### Server version

  **Breaking Change**
* username/password are stored encrypted, **you need to input username/password <ins>once</ins> again**
* fixed wrong type-errors/warnings,   **you should delete project and scenes folder**\
  (will be rebuild during Adapter start)

### 2.0.2 (2025-05-30)
* (stoffel7) fixed error in io-package.json (materialize)
* index.html removed
* fixed JSDoc issues
  
* Gateway version actually not supported, please remain on Version 1.0.1

### 2.0.1 (2025-05-26)
* (stoffel7) adpter takeover and added some changes to requests from adapter creator
* added PING function, ( config-> interval=0 no PING)

### 1.2.2 (2023-09-28)

-   minor changes/fixes for js-controller 5

### 1.2.0 (2023-09-19)
* (stoffel7) fixed some bugs, check for js-contoller 5.0 ( uploaded source)

### 1.1.0 (2022-11-29)
* (stoffel7) fixed some minor bugs ( uploaded orignal source)

### 1.0.52 (2021-03-23)
* (stoffel7) fixed some errors ( deltree.fct, valueChanged..)

### 1.0.2 (2021-03-19)
* (stoffel7) reprogrammed eNet-Server

### 1.0.1 (2019-01-21)
* (SebastianSchultz) added support for compact mode

### 1.0.0 (2019-01-21)
* (SebastianSchultz) first release

## License

The MIT License (MIT)

Copyright (c) 2025 stoffel7

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
