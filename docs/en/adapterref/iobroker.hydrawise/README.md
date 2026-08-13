![Logo](admin/hydrawise.jpg)

# ioBroker.hydrawise

[![NPM version](https://img.shields.io/npm/v/iobroker.hydrawise.svg?style=flat-square)](https://www.npmjs.com/package/iobroker.hydrawise)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hydrawise.svg?label=npm%20downloads&style=flat-square)](https://www.npmjs.com/package/iobroker.hydrawise)
![node-lts](https://img.shields.io/node/v-lts/iobroker.hydrawise?style=flat-square)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/iobroker.hydrawise?label=npm%20dependencies&style=flat-square)

![GitHub](https://img.shields.io/github/license/sentiq/iobroker.hydrawise?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/sentiq/iobroker.hydrawise?logo=github&style=flat-square)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/sentiq/iobroker.hydrawise/test-and-release.yml?branch=master&logo=github&style=flat-square)

## Versions

![Beta](https://img.shields.io/npm/v/iobroker.hydrawise.svg?color=red&label=beta)
![Stable](http://iobroker.live/badges/hydrawise-stable.svg)
![Installed](http://iobroker.live/badges/hydrawise-installed.svg)

Integrate your Hydrawise controller into iobroker.
You can see all controller information, schedules and sensors. It is also possible to suspend planned watering by x seconds.

## Documentation

- log into https://app.hydrawise.com/config/account-details
- generate API Key by clicking "Generate API Key" under "Account Settings"
- paste key into adapter settings
- API documentation: https://support.hydrawise.com/hc/en-us/articles/360008965753-Hydrawise-API-Information

> **Note**  
> After updating from 0.0.15 you have to re-enter your API key

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.0.6 (2026-08-09)

- (SentiQ) updated dependencies
- (copilot) Adapter requires node.js >= 22 now

### 1.0.5 (2025-12-05)

- (SentiQ) updated js-controller dependency
- (SentiQ) updated @iobroker/adapter-dev dependency

### 1.0.4 (2025-12-05)

- (SentiQ) fixed dependencies
- (SentiQ) fixed schema URLs

### 1.0.3 (2025-12-05)

- (SentiQ) updated dependencies

### 1.0.2 (2024-09-24)

- (SentiQ) fixed issues detected by repository checker

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2025-2026 SentiQ <yves.nuesser@proton.me>

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
