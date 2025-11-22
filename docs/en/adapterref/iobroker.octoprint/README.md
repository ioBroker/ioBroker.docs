---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.octoprint?style=flat-square
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.octoprint?label=npm%20downloads&style=flat-square
BADGE-node-lts: https://img.shields.io/node/v-lts/iobroker.octoprint?style=flat-square
BADGE-Libraries.io dependency status for latest release: https://img.shields.io/librariesio/release/npm/iobroker.octoprint?label=npm%20dependencies&style=flat-square
BADGE-GitHub: https://img.shields.io/github/license/klein0r/iobroker.octoprint?style=flat-square
BADGE-GitHub repo size: https://img.shields.io/github/repo-size/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub commit activity: https://img.shields.io/github/commit-activity/m/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub issues: https://img.shields.io/github/issues/klein0r/iobroker.octoprint?logo=github&style=flat-square
BADGE-GitHub Workflow Status: https://img.shields.io/github/actions/workflow/status/klein0r/iobroker.octoprint/test-and-release.yml?branch=master&logo=github&style=flat-square
BADGE-Beta: https://img.shields.io/npm/v/iobroker.octoprint.svg?color=red&label=beta
BADGE-Stable: http://iobroker.live/badges/octoprint-stable.svg
BADGE-Installed: http://iobroker.live/badges/octoprint-installed.svg
---
![Logo](../../admin/octoprint.png)

# ioBroker.octoprint

**Tested with [OctoPrint](https://github.com/OctoPrint/OctoPrint/releases) 1.10.3**

## Features

### Information

- Get version information
- Get printer information (when ``operational``)
- Get current print job information (when ``printing``)
- Get file list information (when not ``printing``)

### Tools

- Set tool temperature (when ``operational``)
- Set bed temperature (when ``operational``)
- Extrude / Retract (when ``operational``)

### Commands

- Printer: Connect, disconnect and home
- Job: Start, Pause, Resume, Cancel, Restart
- SD-Card: Init, Refresh, Release
- Custom Printer Commands
- System Commands
- Jog X, Y and Z axis
- Select a file or print it

### Supported Plugins

- [Display Layer Progress](https://github.com/OllisGit/OctoPrint-DisplayLayerProgress) - tested with version 1.28.0 (requires **adapter version 2.1.0** or later)
- [Slicer Thumbnails](https://github.com/jneilliii/OctoPrint-PrusaSlicerThumbnails) - tested with version 1.0.0 (requires **adapter version 2.2.0** or later)

## Important!

DO NOT restart your OctoPrint instance (or any other instance) with code like this:

```javascript
var obj = getObject('system.adapter.octoprint.0');
obj.common.enabled = false;
setObject('system.adapter.octoprint.0', obj);
```

Since the `API key` is a protected attribute since version 1.1.0, this will remove the configured API key. The reason is, that `getObject` doesn't return protected information (so the api key is not included in the returned object). When you save the object, you will save an object without the key.

Please use state `system.adapter.octoprint.0.alive` to stop/start the instance.

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**

* (@klein0r) Updated dependencies

### 6.0.1 (2025-08-25)

* (@klein0r) Updated dependencies
* (@klein0r) admin 7.6.17 and js-controller 6.0.11 (or later) are required

### 6.0.0 (2025-01-07)

NodeJS >= 20.x and js-controller >= 6 is required

Tested with OctoPrint 1.10.3

### 5.1.0 (2023-10-25)

NodeJS 16.x is required

Tested with OctoPrint 1.9.3

* (klein0r) Added admin icons

### 5.0.1 (2023-05-30)

* (klein0r) Allow self-signed certificates

### 5.0.0 (2023-05-24)

Tested with OctoPrint 1.9.0

* (klein0r) Removed binary states (deprecated)
* (klein0r) Allow self-signed certificates
* (klein0r) Added Ukrainian language

## License

The MIT License (MIT)

Copyright (c) 2025 Matthias Kleine <info@haus-automatisierung.com>

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