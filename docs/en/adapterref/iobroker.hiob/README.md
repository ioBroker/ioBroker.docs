![Logo](admin/hiob.png)

# ioBroker.hiob

**Infos:** </br>
[![GitHub license](https://img.shields.io/github/license/moba15/ioBroker.hiob)](https://github.com/moba15/ioBroker.hiob/blob/main/LICENSE)
[![NPM version](https://img.shields.io/npm/v/iobroker.hiob.svg)](https://www.npmjs.com/package/iobroker.hiob)
[![Downloads](https://img.shields.io/npm/dm/iobroker.hiob.svg)](https://www.npmjs.com/package/iobroker.hiob)
![Number of Installations](https://iobroker.live/badges/hiob-installed.svg)</br>
![GitHub commits since latest release](https://img.shields.io/github/commits-since/moba15/ioBroker.hiob/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/moba15/ioBroker.hiob)

**Version:** </br>
![Beta](https://img.shields.io/npm/v/iobroker.hiob.svg?color=red&label=beta)

[![NPM](https://nodei.co/npm/iobroker.hiop.png?downloads=true)](https://nodei.co/npm/iobroker.hiob/)

**Tests:** </br>
[![Test and Release](https://github.com/moba15/ioBroker.hiob/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/moba15/ioBroker.hiob/actions/workflows/test-and-release.yml)

## HioB adapter for ioBroker
This app allows you to control your ioBroker Smarthome system via the hiob app. It is an simpler and faster alternative to comparable projects with fewer configuration possibilities. It is mainly intended for Android devices, but also works on Windows and Linux desktops.

## Requirements

-   Node >= 18
-   Android Phone

## Tested with

-   Samsung Android Phones
-   Google Pixel Android Phones
-   Sony Pixel Android Phones
-   Xiaomi Phones
-   Android 10/11/13

## APP Code

[APP Code](https://github.com/moba15/hiob_app)

## Description

🇬🇧 [Description](/docs/en/README.md)</br>
🇩🇪 [Dokumentation](/docs/de/README.md)

## Examples

🇬🇧 [Examples](/docs/en/example.md)</br>
🇩🇪 [Beispiele](/docs/de/example.md)

## Questions

🇩🇪 [Fragen](https://forum.iobroker.net/topic/55250/neuer-adapter-hiob-handy-app)

## Known Issues
- 0.1.4: The blockly element shouldn't be in this release. It doesn't work at the time

## Roadmap
- Rework concept of Templates/Widgets [30%]
    - Simplify process of adding new Templates/Widgets features
    - Remove Advance Template and split into multiple Widgets
    - Allow Popup Menu for all widgets
    - Allow Theme rules for every widget
- Add graphs for history data [0%]
- Simplify process of adding devices by listing all [0%]
- Automatically create widgets based on selected device [0%]

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- Updated packages
- Refactor API between App and Adapater
- Integrating new workflow

### 0.1.6 (2024-08-17)
- Updated Packages
- Prepared lates release

### 0.1.5 (2024-06-23)
- Removed blockly
- Fixed some bugs 
- Updated dependencies

### 0.1.4 (2024-04-24)
- (Lucky-Esa) added docs and more examples
- (moba15) Implement suggestions for latest release

### 0.1.3 (2024-03-29)
- (Lucky-ESA) fixed common.keywords
- (mob15) updated dependencies

### 0.1.2 (2024-03-27)
- (Lucky-ESA) changed license Information

### 0.1.1 (2024-03-27)
- (moba15) fixed package.json

### 0.1.0 (2024-03-27)
- (Lucky-ESA) added more docs
- (moba15) fixed backlog warning
- (moba15) changed node version to min. 18

### 0.0.67 (2024-03-25)
 - (moba15) fixed icon
 - (moba15) added notifications backlog, if client is not connected (up to 250 messages)
 - (moba15) fixed login

### 0.0.67-beta.1 (2024-03-25)
 - (moba15) Fixed missing io-package config due to missing commit

### 0.0.67-beta.0 (2024-03-25)
 - (moba15) Fixed #25
 - (moba15) sendTo support for notifications
 - (Lucky-ESA) Handling sensitive data & timeouts #22

### 0.0.66 (2024-03-23)
- Added some docs

### 0.0.66-beta.0 (2024-03-22)
- First implementation of notifications

### 0.0.65 (2024-03-15)
 - (moba15) fixed linter

### 0.0.64 (2024-03-15) 
- (moba15) changed icon
- fixed code linter problems

### 0.0.62 (2024-03-04)
- (moba15) fixed bug, where broadcasted messages where sent without type

### 0.0.62 (2024-03-04)
- (moba15) fixed bug, where broadcasted messages where sent without type

### 0.0.61 (2024-03-04)
- (moba15) fixed secure connection bug (#20)

### 0.0.61-beta.0 (2024-03-01)
- (Lucky-ESA) Preperation of lastest request
- (moba15) fixed some smaller issues

### 0.0.60 (2024-02-25)

-   (Lucky-ESA) Added simple AES encryption
-   (Lucky-ESA) Preperation for latest request
-   (moba15) Fixed login errors if AES encryption is disabled

### 0.0.55 (2023-02-11)

-   (moba15) Fixed Adapter crash if data point does not exist
-   (moba15) Fixed some login errors

### 0.0.54 (2023-12-31)

-   (moba15) Added secure login
-   (moba15) Added secure connetion
-   (moba15) Automatic acceptance of incoming connections for 60 seconds

### 0.0.1 (2023-03-26)

-   (moba15) initial release

## 🎉 Hall of Fame 🎉
A heartfelt thank you to everyone who has contributed to this project! Whether through code, bug reports, feature suggestions, or spreading the word, your support helps make this project better for everyone. 
### Special thanks goes to:
- @Lucky-ESA
- @ManniBac

## License

MIT License

Copyright (c) 2023-2024 mor15Euro [hiob@bachmaiers.de](http://localhost:5000/u/bh3bIYvKVLQXD837pc8JlAJHx3Z2)

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
