![Logo](admin/kisshome-research.png)

# ioBroker KISSHome research

![Number of Installations](http://iobroker.live/badges/kisshome-research-installed.svg)
![Number of Installations](http://iobroker.live/badges/kisshome-research-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.kisshome-research.svg)](https://www.npmjs.com/package/iobroker.kisshome-research)

![Test and Release](https://github.com/ioBroker/ioBroker.kisshome-research/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/kisshome-research/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.kisshome-research.svg)](https://www.npmjs.com/package/iobroker.kisshome-research)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

This special adapter was developed for the KISSHome research project. It is not intended for general use.

To use this adapter, you must first register on the [KISSHome research](https://kisshome-research.if-is.net) website and get the confirmation email.

To run this adapter, you need:

-   More than 3 smart home devices
-   Fritz!Box Router. Without `Fritz!Box`, the adapter will not work.
-   iobroker must run on debian/raspbian (or at least on linux, where the following commands are available: `which`, `rsync`)

## Todo

Detect IP addresses from:
-   [ ] homeconnect,

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.1.1 (2024-10-30)
-   (bluefox) Removed unused code
-   (bluefox) Creation of META file if not exists
-   (bluefox) Description for address must be longer than three characters
-   (bluefox) Added adapter version to the meta file name

### 1.0.13 (2024-10-17)
-   (gsenkowski) Used actual IP and TCP header length for the PCAP file

### 1.0.11 (2024-09-26)
-   (bluefox) Trying to fix CI
-   (bluefox) Do not allow the traffic recording of FritzBox 
-   (bluefox) Do not allow recording the traffic if no any MAC provided
-   (bluefox) Corrected links to web page

### 1.0.7 (2024-09-21)
-   (bluefox) Corrected the error if MAC address cannot be determined

### 1.0.6 (2024-09-21)
-   (ChrisDietrich) Corrected the link in readme.md
-   (bluefox) Corrected the Big-Endian PCAP format
-   (bluefox) the Fixed build pipeline

### 1.0.4 (2024-09-19)

-   (bluefox) Corrected GUI
-   (bluefox) Filter out not used interfaces
-   (bluefox) Added notification to admin if public key not accepted
-   (bluefox) Try to detect zero bytes interfaces

### 1.0.2 (2024-09-15)

-   (bluefox) Added error logging

### 1.0.1 (2024-09-14)

-   (bluefox) Implemented the support for the big endian format of a PCAP file

### 1.0.0 (2024-09-06)

-   (bluefox) Corrected configuration page

### 0.3.1 (2024-08-31)

-   (bluefox) Added detection of some IPs

### 0.2.1 (2024-08-28)

-   (bluefox) used valid URL address

### 0.1.1 (2024-08-20)

-   (bluefox) Used MD5 for the file consistency check

### 0.1.0 (2024-08-19)

-   (bluefox) File upload was implemented

### 0.0.3 (2024-08-14)

-   (bluefox) Added the recording enabled option

### 0.0.2 (2024-07-22)

-   (bluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2024 Denis Haev <dogafox@gmail.com>

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
