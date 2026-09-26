---
chapters: {"pages":{"en/adapterref/iobroker.frigate/README.md":{"title":{"en":"ioBroker.frigate"},"content":"en/adapterref/iobroker.frigate/README.md"},"en/adapterref/iobroker.frigate/docs/en/README.md":{"title":{"en":"ioBroker.frigate — Documentation"},"content":"en/adapterref/iobroker.frigate/docs/en/README.md"}}}
---
![Logo](admin/frigate.png)

# ioBroker.frigate

[![NPM version](https://img.shields.io/npm/v/iobroker.frigate.svg)](https://www.npmjs.com/package/iobroker.frigate)
[![Downloads](https://img.shields.io/npm/dm/iobroker.frigate.svg)](https://www.npmjs.com/package/iobroker.frigate)
![Number of Installations](https://iobroker.live/badges/frigate-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/frigate-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.frigate.png?downloads=true)](https://nodei.co/npm/iobroker.frigate/)

**Tests:** ![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.frigate/workflows/Test%20and%20Release/badge.svg)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## frigate adapter for ioBroker

Adapter for [Frigate NVR](https://frigate.video/) — an open-source, self-hosted video surveillance system with AI-powered object detection.

## Documentation

[🇺🇸 Documentation](/#/docs/adapterref/iobroker.frigate/docs/en/README.md)

[🇩🇪 Dokumentation](https://github.com/iobroker-community-adapters/ioBroker.frigate/blob/main/docs/de/README.md)

## Discussion and questions

[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.2.0 (2026-09-22)
- (@GermanBluefox) The live widget for `ioBroker.devices` still tried the stream relative to admin (port 8081) when the adapter did not report the address of the web instance in time. Without an address the widget now takes single pictures over the socket and tells the reason in the browser console; an address that arrives late still switches to the stream
- (@GermanBluefox) Added the names Frigate recognizes (face recognition, known license plates): `<zone>.sub_labels` lists the names in a zone right now, and `sub_labels.<name>` is `true` as long as a running event carries that name. With face recognition enabled, the names of the face library are created on start, so automations can be set up before somebody is recognized for the first time (#277)
- (@GermanBluefox) Fixed repochecker warnings: literal placeholders of the settings dialog are in the translation files, and dependabot also watches `src-devices`

### 3.1.5 (2026-09-22)
- (@GermanBluefox) The live widget for `ioBroker.devices` did not show the stream in admin: before the adapter had reported the address of the web instance, the widget already loaded the stream relative to admin (port 8081), and the error of that attempt stayed on the tile even after the right address had arrived. The widget now waits for the address, and if the stream still cannot be loaded (web instance not reachable, http stream inside an https admin), it switches to single pictures over the socket

### 3.1.4 (2026-09-14)
- (@GermanBluefox) The live widget for `ioBroker.devices` switches to single pictures over the socket by itself when the page is opened through the ioBroker cloud (iobroker.pro / iobroker.net): the cloud cannot relay the MJPEG stream, and the address of the web instance is not reachable from outside anyway

### 3.1.3 (2026-09-09)
- (@GermanBluefox) The camera name in the device manager tile moved below the picture: at the top of the tile the drag handle and the favourite star of the widget manager were drawn over it
- (@GermanBluefox) The build helper is written in TypeScript itself now.

### 3.1.2 (2026-08-28)
- (@GermanBluefox) The Frigate directory can no longer be left empty by accident: the validator complained but did not stop the dialog from being saved. With an empty directory the plugin mounts named volumes instead of the chosen directory, while the adapter writes `config.yml` into the ioBroker data directory - Frigate then starts without its configuration
- (@GermanBluefox) Removed the `iobBackup=frigate_data` label: no volume of that name exists, so it never marked anything. The label works for named volumes only, and everything worth keeping lives in the bind-mounted Frigate directory - `config.yml` is generated from the instance settings, which an ioBroker backup contains anyway, and recordings and clips are far too large for one

## License

MIT License

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024-2025 TA2k <tombox2020@gmail.com>

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