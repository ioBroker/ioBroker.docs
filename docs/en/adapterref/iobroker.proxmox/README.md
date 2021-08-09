![Logo](admin/logo.png)
# ioBroker.proxmox
=================

![Build Status](https://github.com/iobroker-community-adapters/ioBroker.proxmox/workflows/Test%20and%20Release/badge.svg)
![Number of Installations](http://iobroker.live/badges/proxmox-installed.svg) ![Number of Installations](http://iobroker.live/badges/proxmox-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.proxmox.svg)](https://www.npmjs.com/package/iobroker.proxmox)
[![Downloads](https://img.shields.io/npm/dm/iobroker.proxmox.svg)](https://www.npmjs.com/package/iobroker.proxmox)

[![NPM](https://nodei.co/npm/iobroker.proxmox.png?downloads=true)](https://nodei.co/npm/iobroker.proxmox/)

This adapter reads out the data from your proxmox installation

## Requirements
At least Node 10.X.X is needed and js-controller 3.2.0 or above is required

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

### 1.3.4 (2021-05-07)
* (foxriver76) add dataSource and connectionType
* (foxriver76) add compact mode (closes #12, closes #49)

### 1.3.3 (2021-05-02)
* (foxriver76) we fixed some incorrect types

### 1.3.2 (2021-03-26)
* (foxriver76) status of vms is now a string instead of incorrectly a button

### 1.3.0 (2021-03-26)
* (foxriver76) Detect newly added VMs/storages/nodes during runtime and restart instance to initialize everything correctly
* (foxriver76) clean up deleted VM/storage/node objects
__Requires js-controller >= 2.2.8__
  
### 1.2.0 (2020-01-24)
* (foxriver76) Created info connection state + channel
* (foxriver76) status is a string and not a boolean, so set obj type correctly
* (foxriver76) fix bug which resulted in not all nodes objects being created during a single execution of the adapter
* (foxriver76) password can now only be read by own instance if controller version is new enough

__js-controller v2  or above required__
__node v10 or above required__

### 1.1.0 (10.08.2020)
* (Apollon77) Bug Update on features and stability and performance
* (ThetaGamma) Fix for failing Node shutdown/reboot commands

### 1.0.1 (05.03.2020)
* (MeisterTR) bump version to stable

### 0.5.2 (27.11.2019)
* (DutchmanNL) Fix issue with special character in password, now you can use $/&/* etc

### 0.5.1 (17.09.2019)
* (MeisterTR) add act. disk size form vm and lxc and disc size_level
* (MeisterTR) add start/stop and shutdown for vm an lxc (nodes must be testet my dev is on the node so i cant test stop node)

### 0.3.1 (03.10.2018)
* (MeisterTR) fixed mem_lev, error at install, catch error no node and vm

### 0.3.0 (28.09.2018)
* (MeisterTR) add storage
* (MeisterTR) add password encryption

### 0.2.0 (27.09.2018)
* (MeisterTR) add container

### 0.0.5 (25.09.2018)
* (MeisterTR) cleaning up

### 0.0.5 (02.05.2018)
* (MeisterTR) fixed wrong ram

### 0.0.5 (29.04.2018)
* (MeisterTR) Testing fixes, now ready for node4

### 0.0.3 (26.04.2018)
* (MeisterTR) first running version

### 0.0.2
* (MeisterTR) first running version

### 0.0.1
* (MeisterTR) initial release

## License

The MIT License (MIT)

Copyright (c) 2018 - 2021 MeisterTR <meistertr.smarthome@gmail.com>

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
