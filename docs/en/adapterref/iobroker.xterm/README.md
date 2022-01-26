![Logo](admin/xterm.png)
# ioBroker.xterm

[![NPM version](http://img.shields.io/npm/v/iobroker.xterm.svg)](https://www.npmjs.com/package/iobroker.xterm)
[![Downloads](https://img.shields.io/npm/dm/iobroker.xterm.svg)](https://www.npmjs.com/package/iobroker.xterm)
![Number of Installations (latest)](http://iobroker.live/badges/xterm-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/xterm-stable.svg)
[![Dependency Status](https://img.shields.io/david/bluefox <dogafox@gmail.com>/iobroker.xterm.svg)](https://david-dm.org/bluefox <dogafox@gmail.com>/iobroker.xterm)
[![Known Vulnerabilities](https://snyk.io/test/github/bluefox <dogafox@gmail.com>/ioBroker.xterm/badge.svg)](https://snyk.io/test/github/bluefox <dogafox@gmail.com>/ioBroker.xterm)

[![NPM](https://nodei.co/npm/iobroker.xterm.png?downloads=true)](https://nodei.co/npm/iobroker.xterm/)

## xterm adapter for ioBroker
This adapter allows executing shell commands on ioBroker host. It replaces the `ioBroker.terminal` adapter.

Terminal server to open command line interface. 
Please use it only for administration purposes.

Based on xterm.js and node-pty packages. 

If the authentication is enabled, only ioBroker "admin" user can log in.

## Usage
Adapter support 2 modes: 
- Starts cmd.exe(windows) or bash(linux). On Linux the bash runs under `iobroker` user, and maybe you should switch to other user with more privilegs (via `su USER`).
- Or simulate shell with node.js (You can activate this option if the first option does not work)

Note: Some terminal commands with interactivity do not work. E.g. `nano` and some others.  

## TODO
- Simulation: Ctrl + R (History)
- Simulation: More encoding pages. If you find code page that suits to your system, please create an issue. Possible coding pages could be found [here](https://github.com/ashtuchkin/iconv-lite/wiki/Supported-Encodings).
- Support more than one session (Tabs)

<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->

## Changelog
### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed type of the connection state to "string" 

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021 ioBroker <dogafox@gmail.com>

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