![Logo](admin/xterm.svg)
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

With admin newer than 8.2.0, the tab in admin runs through the port of admin (`/proxy/xterm.0/`), so the port of xterm does not have to be reachable from the browser.
If you are logged in to admin as an administrator, the terminal opens without a second login (option "Accept the login of admin").

## Usage
The adapter starts cmd.exe (Windows) or bash (Linux) via a real pseudo-terminal (node-pty).
On Linux, bash runs under the `iobroker` user — you can switch to another user with more privileges via `su USER`.

### Persistent terminals
The shells run in the adapter and not in the browser. If the connection is lost or the page is reloaded,
the terminals keep running and are restored including their content — long-running commands are not interrupted.

A terminal is terminated if it is explicitly closed, or if no browser comes back within the configured
**session timeout** (5 minutes by default; `0` terminates the shells immediately when the browser disconnects).

### HTTP/2
With HTTPS enabled, the web server speaks HTTP/2: the browser loads the page and all its files over a single
connection with many parallel requests. Clients that do not offer HTTP/2 fall back to HTTP/1.1 automatically,
and the terminal connection keeps working - browsers open web sockets on a separate HTTP/1.1 connection.
Without HTTPS the option has no effect, as browsers use HTTP/2 over TLS only.

If a client has problems with it, switch the option **Use HTTP/2** (`http2`) off to stay with HTTP/1.1.

### Used port
The adapter opens one TCP port (8099 by default) for the web interface and the terminal connection.
With js-controller 8 or newer, the port it really listens on is reported to the host and shown in the overview
of the used resources, so another instance does not get configured to the same port.

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
### **WORK IN PROGRESS**
* (@GermanBluefox) The tab in admin runs through the port of admin, the login of admin is accepted

### 4.0.2 (2026-10-14)
* (@GermanBluefox) Admin 7.6.20+ is required. Compact mode no longer can exit the whole host process. The tests run on Windows and macOS too
* (@GermanBluefox) Added HTTP/2 (with HTTP/1.1 fallback) for HTTPS, can be switched off with the option "Use HTTP/2"
* (@GermanBluefox) The used port is reported to js-controller 8+
* (@GermanBluefox) macOS: the shells could not start, because the `spawn-helper` of node-pty was not executable

### 4.0.1 (2026-08-07)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (@GermanBluefox) Dropped support of Node.js 20
* (@GermanBluefox) Added SVG icon
* (@GermanBluefox) The terminals now run on the server: they survive a reload or a lost connection and are restored with their content
* (@GermanBluefox) Added the setting for the session timeout
* (@GermanBluefox) Fixed the HTTPS mode: the adapter did not start the web server at all if `secure` was enabled
* (@GermanBluefox) Fixed the shown client IP addresses in `info.connection`
* (@GermanBluefox) Errors of the web socket connection do not terminate the adapter anymore
* (@GermanBluefox) A shell that cannot be started is not restarted endlessly anymore
* (@GermanBluefox) All shells are terminated now if the adapter stops
* (@GermanBluefox) Fixed the double connections of the GUI after a connection timeout

### 3.1.0 (2026-06-04)
* (bluefox) Added the icon in the GUI
* (bluefox) Added possibility to run under a specified user on Linux
* (bluefox) Implemented paste on right mouse click
* (bluefox) Implemented authentication for the terminal

### 3.0.0 (2026-04-12)
* (bluefox) Migrated the adapter to Typescript
* (bluefox) Added multiple terminal sessions

### 2.0.1 (2023-09-18)
* (bluefox) xterm library updated
* (bluefox) Move Lets encrypt settings to acme adapter
* (bluefox) Minimal supported node.js version is 16

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