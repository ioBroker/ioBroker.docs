![Logo](admin/intex.png)
# ioBroker.intex

[![NPM version](https://img.shields.io/npm/v/iobroker.intex.svg)](https://www.npmjs.com/package/iobroker.intex)
[![Downloads](https://img.shields.io/npm/dm/iobroker.intex.svg)](https://www.npmjs.com/package/iobroker.intex)
![Number of Installations](https://iobroker.live/badges/intex-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/intex-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.intex.png?downloads=true)](https://nodei.co/npm/iobroker.intex/)

**Tests:** ![Test and Release](https://github.com/TA2k/ioBroker.intex/workflows/Test%20and%20Release/badge.svg)

## intex adapter for ioBroker

Adapter for Intex Whirlpool with wifi modul

## The strategy how to communicate with the pool and the cloud

### About clouds

#### Cloud secondary; Pool locally if available

In this mode, the system attempts to issue the control command and update command locally. If there is an error in local communication, the system switches to cloud operation until the adapter is started again.

IP address and port come from the cloud. If the IP address is the same, the pool must be registered again in the app. Long press the connect button and search the pool. Deleting it from the app is usually not necessary.

#### Cloud secondary; Pool only local

In this mode, the system issues the control command and update command locally. If there is an error in local communication, the system does not switch to cloud operation.

The interval can be set to 0.5 minutes here.

IP address and port come from the cloud. If the IP address is the same, the pool must be registered again in the app. Long press the connect button and search the pool. Deleting it from the app is usually not necessary.

#### Cloud only

In this mode, the system only sends the control command and update command via the cloud.


##### Login

Enter the Intex app mail and password.

### Local

#### Local only

In local operation, functions are currently also offered that the pool does not support. Either the DNS name of the pool on the router or the IP address of the pool must be specified under Address.

The interval can also be set to 0.5 minutes here.

The IP address of the pool can be searched for using the search button. However, this can be prevented by routers if e.g. B. WLAN devices are not allowed to communicate with each other or ports or on-board casting are blocked in the local firewall of the computer.

## Controlling the functions of the spa

"intex.0.-id-.remote.-command-" set to true controls the respective command.

"intex.0.-id-.control.-command-" set to true or false controls the pool command's state.



## Discussion and questions in German
https://forum.iobroker.net/topic/47932/test-intext-app-v0-0-x

## Changelog

### 0.1.0
* (rbartl/PLCHome) Support local IP. Both via cloud and only locally without cloud. Thanks to Austria to Robert Bartl.
* (PLCHome) Confirm directly after switching via Control.

### 0.0.7
* (PLCHome) Switching via remote works again.
* (PLCHome) After switching via Control, the previous traffic status can be transmitted from the cloud. This can lead to a toggling of the status.

### 0.0.6
* (PLCHome) Defined setting of states
* (PLCHome) Change Fahrenheit Celsius
* (PLCHome) "control.temperature", read only, object from 0.0.5 must be deleted once.

### 0.0.5
* (PLCHome) Set temperature added, object must be deleted once.
* (PLCHome) Decoding of status information

### 0.0.1
* (TA2k) initial release

## License
MIT License

Copyright (c) 2021 - 2023 TA2k <tombox2020@gmail.com>

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
