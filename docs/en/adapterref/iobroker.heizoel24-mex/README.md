![Logo](admin/heizoel24-mex.png)

# ioBroker.heizoel24-mex

[![NPM version](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)](https://www.npmjs.com/package/iobroker.heizoel24-mex)
[![Downloads](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)](https://www.npmjs.com/package/iobroker.heizoel24-mex)
![Number of Installations](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/heizoel24-mex-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)](https://nodei.co/npm/iobroker.heizoel24-mex/)

**Tests:** ![Test and Release](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## heizoel24-mex adapter for ioBroker

The MEX is a heating oil level measuring device. This adapter reads the MEX data from the Heizoel24 server.

See: https://www.heizoel24.de/mex


## Use:
Simply enter the login data from your Heizoel24 account (e-mail and password).<br>
The MEX data is stored in the data point heizoel24-mex.<br>
The adapter starts by default every 3 hours. This is completely sufficient, as the MEX only sends data once a day.<br>
The data points CalculatedRemaining/JsonForEcharts (calculated remaining quantity) and OilUsage/JsonForEcharts can used directly with eCharts.<br>
The adapter can send data via MQTT.<br>
The original app always calculates annual usage as of December 31.<br>
This is impractical, since that is in the middle of the heating season.<br>
This adapter can calculate annual usage based on a specific month.<br>

## Changelog
### 1.10.1 (2026-06-12)

- allowScripts esbuild and protobufjs

### 1.10.0 (2026-05-29)

- More translations added

### 1.9.3 (2026-05-29)

- Translation issues resolved

### 1.9.2 (2026-05-26)

- Fix: Prevent crash on network errors by safely handling axios exceptions…
- Issues E0036 & E5050 resolved

### 1.9.1 (2026-05-22)

- Fix: Prevent crash on network errors by safely handling axios exceptions & Remove unused main1.js backup file

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2025-2026 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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
