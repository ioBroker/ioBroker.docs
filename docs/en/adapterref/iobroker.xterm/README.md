![Logo](admin/xterm.png)
# ioBroker.xterm

![Number of Installations](http://iobroker.live/badges/xterm-installed.svg)
![Number of Installations](http://iobroker.live/badges/xterm-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.xterm.svg)](https://www.npmjs.com/package/iobroker.xterm)

![Test and Release](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.xterm.svg)](https://www.npmjs.com/package/iobroker.xterm)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

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
### 0.3.1 (2022-03-18)
* (Apollon77) Fix a crash case reported by Sentry

### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework info.connection status to show that server is connected also as green by using "none" to show that no one is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

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

Copyright (c) 2021-2022 ioBroker <dogafox@gmail.com>

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
