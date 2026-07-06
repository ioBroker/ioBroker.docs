![Logo](admin/xterm.png)
# ioBroker.xterm

![Number of Installations](http://iobroker.live/badges/xterm-installed.svg)
![Number of Installations](http://iobroker.live/badges/xterm-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.xterm.svg)](https://www.npmjs.com/package/iobroker.xterm)

![Test and Release](https://github.com/ioBroker/ioBroker.xterm/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/xterm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.xterm.svg)](https://www.npmjs.com/package/iobroker.xterm)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## xterm adapter for ioBroker
This adapter allows executing shell commands on ioBroker host. It replaces the `ioBroker.terminal` adapter.

Terminal server to open the command line interface. 
Please use it only for administration purposes.

Based on xterm.js and node-pty packages. 

If the authentication is enabled, only ioBroker "admin" user can log in.

## Usage
The adapter starts cmd.exe (Windows) or bash (Linux) via a real pseudo-terminal (node-pty).
On Linux, bash runs under the `iobroker` user — you can switch to another user with more privileges via `su USER`.

## Keyboard shortcuts
| Shortcut         | Action                                                                              |
|------------------|-------------------------------------------------------------------------------------|
| **Ctrl+Shift+V** | Open paste dialog (useful on HTTP connections where clipboard API is not available) |
| **Ctrl+Shift+F** | Search in terminal scrollback                                                       |
| **Right-click**  | Paste from clipboard (HTTPS) or open paste dialog (HTTP)                            |
| Select text      | Automatically copies to clipboard (PuTTY-style)                                     |

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 3.0.2 (2026-04-13)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under specified user on Linux

### 3.0.0 (2026-04-12)
* (bluefox) Migrated the adapter to Typescript
* (bluefox) Added multiple terminal sessions

### 2.0.1 (2023-09-18)
* (bluefox) xterm library updated
* (bluefox) Move Lets encrypt settings to acme adapter
* (bluefox) Minimal supported node.js version is 16

### 1.1.0 (2022-10-08)
* (Apollon77) Updated the xterm library
* (Apollon77) Prepared for future js-controller versions

### 1.0.0 (2022-08-29)
* (bluefox) Check only port of the interface and not of all interfaces

### 0.3.2 (2022-03-29)
* (Apollon77) Fix crash cases reported by Sentry

### 0.3.1 (2022-03-18)
* (Apollon77) Fix a crash case reported by Sentry

### 0.3.0 (2022-03-12)
* (Apollon77) Prevent some warnings in js-controller 3+
* (Apollon77) Add Fallback to the simulated shell if bash/cmd.exe is selected by node-pty was not installed correctly!
* (Apollon77) Rework `info.connection` status to show that server is connected also as green by using "none" to show that no one is connected
* (Apollon77) Update all dependencies
* (Apollon77) Add sentry for crash reporting

### 0.2.0 (2021-09-18)
* (bluefox) Added the real terminal (bash or cmd.exe) to the simulated one

### 0.1.0 (2021-09-18)
* (bluefox) changed the type of the connection state to "string"

### 0.0.3 (2021-09-16)
* (ioBroker) first working release

### 0.0.1
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2021-2026 ioBroker <dogafox@gmail.com>

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
