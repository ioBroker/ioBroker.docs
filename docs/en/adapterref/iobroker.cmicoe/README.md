![Logo](admin/cmicoe.png)
# ioBroker.cmicoe

[![NPM version](https://img.shields.io/npm/v/iobroker.cmicoe.svg)](https://www.npmjs.com/package/iobroker.cmicoe)
[![Downloads](https://img.shields.io/npm/dm/iobroker.cmicoe.svg)](https://www.npmjs.com/package/iobroker.cmicoe)
![Number of Installations](https://iobroker.live/badges/cmicoe-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/cmicoe-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.cmicoe.png?downloads=true)](https://nodei.co/npm/iobroker.cmicoe/)

**Tests:** ![Test and Release](https://github.com/FreDeko06/ioBroker.cmicoe/workflows/Test%20and%20Release/badge.svg)

## cmicoe adapter for ioBroker

Adapter to communicate with the [CMI by Technische Alternative via CoE](https://www.ta.co.at/x2-bedienung-schnittstellen/cmi)

### DISCLAIMER

This application is an independent product and is not affiliated with, endorsed by, or sponsored by Technische Alternative. All trademarks, logos, and brand names are the property of their respective owners.
This application is designed to work with the C.M.I. but is not an official product of Technische Alternative. Compatibility with all versions of the device cannot be guaranteed.

## Setup C.M.I.
### Enable CoE V2
On the C.M.I. web interface, go to Settings > CAN and choose `CoE V2 (4byte)` as CoE-Version

### Configure Output
On the C.M.I. web interface, go to Settings > Outputs > CoE and add an analog or digital output with following settings:

#### IP
Enter the iobroker server ip

#### Node number / Network Output
Enter the same number you specified in the inputs setting of the adapter

## Setup adapter

### Settings
#### Local IP
The IP-address, iobroker listens for CoE-Packages by the C.M.I.

#### Local Port
The port, iobroker listens for CoE-Packages by the C.M.I.  
By default, the C.M.I. sends all CoEv2-Packages via port 5442  
**This adapter only supports CoE V2!**

#### C.M.I. ip address
The IP-address, iobroker sends the CoE-Packages to

#### C.M.I. port
The port, iobroker sends the CoE-Packages to

#### send interval
The interval in seconds, in which all outputs are sent to the C.M.I.

#### send on change
If checked, the adapter also sends an output once it changes. 


## Changelog
### 1.2.4 (2025-12-13)
* bump @types/node to 25.0.1
* bump @tsconfig/node20 to 20.0.8
* bump glob
* bump actions/checkout to 6
* more dependency updates

### 1.2.3 (2025-10-25)
* migrate to npm trusted publishing

### 1.2.2 (2025-10-18)
* added export/import to config tables

### 1.2.1 (2025-10-12)
* Bump @types/node to 24.7.2
* Bump @alcalzone/release-script-plugin-license to 4.0.0
* Bump rimraf to 6.0.1
* updated other dependencies
* fixed forbidden chars in ids

### 1.2.0 (2025-10-11)
* used iobroker prettier config
* changed title
* improved state roles and attributes
* limited send interval to 1 day
* fixed deletion of empty node channels
* removed old node string config

### 1.1.3 (2025-09-23)
* used @iobroker/eslint
* changed .vscode schema
* updated adapter-core dependency

### 1.1.2 (2025-09-23)
* fixed delete unused states

### 1.1.1 (2025-09-23)
* added logo
* upgrade to node 20
* updated dependencies

### 1.1.0 (2025-08-18)
* added units from https://fci.ta.co.at/docu/developer
* removed factors, decimals are computed automatically from the unit
* fixed problems with negative numbers

### 1.0.5 (2025-08-14)
* fixed layout

### 1.0.4 (2025-08-14)
* update dependencies

### 1.0.3 (2025-08-14)
* added factors to inputs/outputs settings
* update README

### 1.0.2 (2025-08-13)
* fixed degree, cubic meter symbol

### 1.0.1 (2025-08-13)
* fixed adapter crash on first start

### 1.0.0 (2025-08-13)
* improved config ui
* added support for units
* added support for names and descriptions for inputs/outputs
* BREAKING: state names now contain names from config

### 0.3.1 (2025-02-18)
* fix: negative values crashed adapter

### 0.3.0 (2025-02-17)
* added support for multiple messages in one packet (receiving and sending)
* added error handling

### 0.2.0 (2025-02-17)
* created bind and port options

### 0.1.2 (2025-02-17)
* downgrade to node 18
* create channel/devices before states
* performance improvements

### 0.1.1 (2025-02-16)
* improved log messages
* added log message if address/ip are already in use (probably two instances started)

### 0.1.0 (2025-02-16)
* (FreDeko) initial release

## License
MIT License

Copyright (c) 2025 FreDeko <freddegenkolb@gmail.com>

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
