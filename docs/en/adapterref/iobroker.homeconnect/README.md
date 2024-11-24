![Logo](admin/homeconnect.png)

# ioBroker.homeconnect

[![GitHub license](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.homeconnect)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/iobroker.homeconnect.svg)](https://www.npmjs.com/package/iobroker.homeconnect)
![GitHub repo size](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.homeconnect)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/homeconnect/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br>
![GitHub commit activity](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.homeconnect/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.homeconnect)
![GitHub issues](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.homeconnect)
</br>
**Version:** </br>
[![NPM version](http://img.shields.io/npm/v/iobroker.homeconnect.svg)](https://www.npmjs.com/package/iobroker.homeconnect)
![Current version in stable repository](https://iobroker.live/badges/homeconnect-stable.svg)
![Number of Installations](https://iobroker.live/badges/homeconnect-installed.svg)
</br>
**Tests:** </br>
[![Test and Release](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/test-and-release.yml)
[![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.homeconnect/actions/workflows/codeql.yml)

## Sentry

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

## Homeconnect Adapter for ioBroker

## Requirements before installation

At least Node.js version 18 must be installed!

A ClientID is required for the adapter. Use the settings for each step to register.

<https://developer.home-connect.com>

![Screenshot](img/registrierung1.JPG)

For **Default Home Connect User Account for Testing**, specify the e-mail address with which the Home Connect app is to be sent.
was registered, this is also required later in the authorization process.

![Screenshot](img/registrierung2.JPG)

For **Account Type** select Individual. Add the remaining data if available (no idea if this will be checked).

![Screenshot](img/application1.JPG)

Then go to **Applications** and then to **Register Application**.

![Screenshot](img/application2.JPG)

For **Application ID** enter a name for the application, e.g. ioBroker. With **OAuth Flow** Device Flow select.
**Home Connect User Account for Testing** can remain empty. For **Success Redirect** enter a URI, e.g. https://example.com.
Then save and you have the required ClientID.

## Configuration

Please add Homeconnect App username, password and generated cleintId into adapter config.

## Usage

With the states in commands you can stop, pause and resume a program.
With the states in settings you can turn off or turn on the device
Change the value of programs.active.BSH_Common_Root_ActiveProgram leads to starting a program
Update iQ300: You need to set the program name in this variable. If programs.selected.BSH_Common_Root_SelectedProgram is copied, the machine user can predefine the wanted program at the machine and it will be started via ioBroker
Change the value of programs.selected.BSH_Common_Root_SelectedProgram leads to selecting a program or options

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.4.3 (2024-11-19)

- (TA2k) fix for -001 devices
- (simatec) Adapter has been adapted to meet Responsive Design rules.

### 1.4.2 (2024-10-25)

- (TA2k) fix for devices with object values

### 1.4.1 (2024-07-02)

- (foxriver76) fixed invalid min/max values

### 1.4.0 (2024-04-18)

- (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
- (mcm1957) Dependencies have been updated

### 1.3.0 (2023-12-15)

- fix login

## License

The MIT License (MIT)

Copyright (c) 2024 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2023 dna909 <dna909@googlemail.com>, TA2k

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
