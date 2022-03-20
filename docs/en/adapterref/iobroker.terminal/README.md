![Logo](admin/terminal.png)

# ioBroker.terminal

![Number of Installations](http://iobroker.live/badges/terminal-installed.svg)
![Number of Installations](http://iobroker.live/badges/terminal-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.terminal.svg)](https://www.npmjs.com/package/iobroker.terminal)

![Test and Release](https://github.com/ioBroker/ioBroker.terminal/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/terminal/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.terminal.svg)](https://www.npmjs.com/package/iobroker.terminal)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Based on [web-terminal](https://github.com/rabchev/web-terminal) from rabchev.

Terminal server to open command line interface.
Please use it only for administration purposes.

![Screenshot](img/screen1.png)

## Changelog
### 0.2.1 (2022-03-13)
* (Apollon77) Fix pot crash cases reported by Sentry (IOBROKER-TERMINAL-1)

### 0.2.0 (2022-03-12)
* (Apollon77) add info-connection state
* (Apollon77) General update and optimizations

### 0.1.2
* (bluefox) show connection state

### 0.1.1
* (bluefox) add command ll

### 0.1.0
* (bluefox) add css style selector

### 0.0.1
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2014-2022 bluefox

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
