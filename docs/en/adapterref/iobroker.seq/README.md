![Logo](admin/seq.png)

# ioBroker.seq

[![NPM version](http://img.shields.io/npm/v/iobroker.seq.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.seq)
[![Downloads](https://img.shields.io/npm/dm/iobroker.seq.svg?dummy=unused)](https://www.npmjs.com/package/iobroker.seq)
![Number of Installations (latest)](https://iobroker.live/badges/seq-installed.svg?dummy=0.2.7)
![Number of Installations (stable)](https://iobroker.live/badges/seq-stable.svg?dummy=0.2.7)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/seq/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

[![NPM](https://nodei.co/npm/iobroker.seq.png?downloads=true)](https://nodei.co/npm/iobroker.seq/)

## Seq adapter for ioBroker

This adapter allows you to push your ioBroker log into the system of [Seq](https://datalust.co/seq).  
It is also possible to apply a filter to the log levels and also to the adapters.

## Configuration

1. Create a new instance of the adapter
2. Fill the URL/IP and port of the [Seq](https://datalust.co/seq) instance
3. Specify which log events you want to push to [Seq](https://datalust.co/seq)
4. Save the settings

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 1.0.2 (2026-04-06)
* (arteck) back to seq-logging 2.2.0

### 1.0.1 (2026-04-06)
* (arteck) Dependencies have been updated

### 1.0.0 (2026-04-05)
* (arteck) new admin

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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
