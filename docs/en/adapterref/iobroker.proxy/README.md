![Logo](admin/proxy.png)
# ioBroker.proxy

![Number of Installations](http://iobroker.live/badges/proxy-installed.svg) ![Number of Installations](http://iobroker.live/badges/proxy-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.proxy.svg)](https://www.npmjs.com/package/iobroker.proxy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.proxy.svg)](https://www.npmjs.com/package/iobroker.proxy)
[![Test and Release](https://github.com/ioBroker/ioBroker.proxy/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/ioBroker/ioBroker.proxy/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/iobroker.proxy.png?downloads=true)](https://nodei.co/npm/iobroker.proxy/)

## Usage
Allows accessing defined URLs or local files via one web server.

The configured routes are available under `http://ip:8082/proxy.0/context/...`. Port, protocol and `proxy.0` vary depending on the settings.

## Configuration
- Use as web adapter extension: the web instance that this proxy extends.
- Route path: path for the proxy. If it is `/proxy.0`, the routes are available under `http://webIP:8082/proxy.0/...`.
  Empty means `proxy.<instance>/`. Set it to `/` to install the routes directly below the root of the web server, e.g. a context `.well-known/acme-challenge/` is then available under `http://webIP:8082/.well-known/acme-challenge/...`
- Use simple proxy (no sockets): a very simple but robust method is used. It is not suitable for web sockets or POST requests. Use it if you have issues with the web instance or with the socket.io communication.
- Error timeout (ms): minimal interval between retries if the requested resource was unavailable or returned an error.
- Maximum Parallel Requests: default for all paths, how many requests may be in progress at the same time (not used by the simple proxy).

## Sample settings
| Context  | URL                            | Description                                                              |
|----------|--------------------------------|--------------------------------------------------------------------------|
| admin/   | http://localhost:8081          | access to admin page                                                     |
| router/  | http://192.168.1.1             | access to local router                                                   |
| cam/     | http://user:pass@192.168.1.123 | access to webcam (e.g. call http://ip:8082/proxy.0/cam/web/snapshot.jpg) |
| dir/     | /tmp/                          | access to local directory "/tmp/"                                        |
| dir/     | tmp/                           | access to local directory "/opt/iobroker/node_modules/tmp"               |
| file.jpg | /tmp/picture.jpg               | access to local file "/tmp/picture.jpg"                                  |

Relative paths of local files and directories are relative to the `node_modules` directory of ioBroker (e.g. `/opt/iobroker/node_modules`).

Every rule can have its own timeout and maximum number of parallel requests. If they are empty, the error timeout and the maximum parallel requests of the main settings are used.

**Not all devices can be accessed via proxy.**

Some devices want to be located in the root `http://ip/` and cannot run under `http://ip/proxy.0/context/`.

You can read more about context [here](https://www.npmjs.com/package/http-proxy-middleware#context-matching).
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
## Changelog
### 2.0.1 (2026-11-02)
- (bluefox) **Breaking change:** Node.js >= 22.19 and admin >= 7.6.20 are required now
- (bluefox) The adapter was refactored to TypeScript and JsonConfig; `request` was replaced by `axios` and `mime` by `mime-types`
- (bluefox) Fixed: files outside of a configured local directory could be read via ".." in the path
- (bluefox) Fixed: the timeout check was not stopped when web unloaded the extension
- (bluefox) Documented how to install the routes directly below the root of the web server (route path `/`) (#133)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (ipod86) Credentials are masked in all log lines (`user:pass@` and query parameters like `password`, `user`, `token`, `apikey`); the proxy options are logged at debug level only (#276)

### 1.3.2 (2022-10-01)
* (Apollon77) Allow to also proxy files directly

### 1.3.1 (2022-06-02)
* (Apollon77) Revert the automatic WS upgrade call added in 1.3.0 because produced sometimes issues with websocket connections

### 1.3.0 (2022-05-30)
* (Apollon77) Allow to configure the maximum parallel requests by route and/or globally. Default is 10 as of now too
* (Apollon77) Try to prevent crashes by socket errors

### 1.2.2 (2021-03-07)
* (Apollon77) Fallback to "application/octet-stream" when mime type for a file could not be determined
* (Apollon77) Cut filenames when looking them up in the filesystem if "?" or "#" are included

## License
The MIT License (MIT)

Copyright (c) 2017-2026 bluefox <dogafox@gmail.com>

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