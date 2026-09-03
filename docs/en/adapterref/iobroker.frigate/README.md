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

[🇺🇸 Documentation](./docs/en/README.md)

[🇩🇪 Dokumentation](./docs/de/README.md)

## Discussion and questions

[https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker](https://forum.iobroker.net/topic/64928/frigate-adapter-für-iobroker)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->
### 3.1.2 (2026-08-28)
- (@GermanBluefox) The Frigate directory can no longer be left empty by accident: the validator complained but did not stop the dialog from being saved. With an empty directory the plugin mounts named volumes instead of the chosen directory, while the adapter writes `config.yml` into the ioBroker data directory - Frigate then starts without its configuration
- (@GermanBluefox) Removed the `iobBackup=frigate_data` label: no volume of that name exists, so it never marked anything. The label works for named volumes only, and everything worth keeping lives in the bind-mounted Frigate directory - `config.yml` is generated from the instance settings, which an ioBroker backup contains anyway, and recordings and clips are far too large for one

### 3.1.1 (2026-08-24)
- (@GermanBluefox) Fixed the clip download failing with `Request failed with status code 400`: Frigate answers that while the recording segments of the event are not written yet, so the download is now retried with a growing delay and the message Frigate sent is written to the log instead of only the status code. The default wait time after the event end was raised from 5 to 10 seconds
- (@GermanBluefox) Added the missing translations for the LPR settings, the go2rtc restream column and the event history header, and corrected translations where the product name `Frigate`, state IDs and the `{{source}}`/`{{type}}` placeholders had been translated as words
- (@GermanBluefox) Fixed stale `.jpg` / `.mp4` files in the tmp folder: the cleanup no longer depends on `notificationActive`, aborted downloads and failed notifications no longer leave files behind, and every instance now uses its own tmp folder (`iobroker-frigate.<instance>`)
- (@GermanBluefox) Added a web extension: every camera is now served under `/frigate.0/<camera>/snapshot.jpg` and `/frigate.0/<camera>/stream.mjpeg` of the web adapter, behind the ioBroker authentication and without exposing Frigate itself
- (@GermanBluefox) Added two widgets for ioBroker.devices: a snapshot tile that works everywhere, and a live MJPEG tile
- (@GermanBluefox) Added the `snapshot` message, which returns the current picture of a camera as base64
- (Eistee82) Fixed zone object counters (e.g. `<zone>.person`) staying at their last value after the object left the zone. Per-zone object counts are now sourced solely from the Frigate MQTT occupancy topics, and the zone aggregator resets its active/stationary states to 0 and uses `current_zones` instead of the cumulative `entered_zones`.

### 3.0.3 (2026-06-09)
- (@GermanBluefox) Added a button to re-create the docker container

### 3.0.2 (2026-05-30)
- (@GermanBluefox) Replaced the track of objects with a drop down menu

### 3.0.0 (2026-05-16)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Added re-streaming support for live video feeds (experimental)
- (copilot) Added support for license plate recognition events from Frigate

[Older changelogs can be found there](CHANGELOG_OLD.md)

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
