![Logo](admin/traccar.png)

# ioBroker.traccar

[![NPM version](http://img.shields.io/npm/v/iobroker.traccar.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.traccar)
[![Downloads](https://img.shields.io/npm/dm/iobroker.traccar.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.traccar)
![Number of Installations (latest)](https://iobroker.live/badges/traccar-installed.svg?dummy=unused)
![Number of Installations (stable)](https://iobroker.live/badges/traccar-stable.svg?dummy=unused)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/traccar/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.traccar.png?downloads=true)](https://nodei.co/npm/iobroker.traccar/)

## Traccar adapter for ioBroker

This adapter imports in real time the position and the extended data from [Traccar](https://www.traccar.org) and makes them available in ioBroker.

## Configuration

1. Create a new instance of the adapter
2. Fill the URL/IP and port from Traccar server
3. Configur username and password
4. Save the settings
5. Have fun :)

## Changelog
### 1.2.1 (2026-08-06)
+ (copilot) Adapter requires node.js >= 22 now
* (arteck) add version check re-runs every 24 hours
* (arteck) Dependencies have been updated

### 1.2.0 (2026-04-23)
* (arteck) refactoring

### 1.1.7 (2026-04-14)
* (arteck) Dependencies have been updated

### 1.1.6 (2024-10-28)
-   (arteck) dependency update

### 1.1.5 (2024-09-26)
-   (arteck) transfer to arteck 
-   (arteck) add accuracy

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2024-2026  Arthur Rupp <arteck@outlook.com>,

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
