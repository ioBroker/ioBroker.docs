---
chapters: {"pages":{"en/adapterref/iobroker.dwd/README.md":{"title":{"en":"ioBroker.dwd"},"content":"en/adapterref/iobroker.dwd/README.md"},"en/adapterref/iobroker.dwd/docs/en/README.md":{"title":{"en":"DWD widgets"},"content":"en/adapterref/iobroker.dwd/docs/en/README.md"}}}
---
![Logo](admin/dwd.png)
# ioBroker.dwd

![Number of Installations](http://iobroker.live/badges/dwd-installed.svg)
![Number of Installations](http://iobroker.live/badges/dwd-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.dwd.svg)](https://www.npmjs.com/package/iobroker.dwd)

![Test and Release](https://github.com/ioBroker/iobroker.dwd/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/dwd/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.dwd.svg)](https://www.npmjs.com/package/iobroker.dwd)

Copyright Deutscher Wetterdienst

Dieser Adapter lädt die Wetterwarnungen vom deutschen Wetterdienst über JSON link.

This adapter loads the weather warnings from the German weather service via JSON link.

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 3.0.1 (2026-10-27)
- (@GermanBluefox) A truncated JSONP answer of the DWD (no closing `}`) no longer hangs the adapter in an endless loop, it is logged as a parse error

### 3.0.0 (2026-10-11)
- (@BeSiRe1) Optional warncell ID of a municipality: its warnings are read from the DWD geoserver and written below `warncell.`, in addition to the region (idea from #306 by BeSiRe1)
- (@GermanBluefox) The vis-2 widget, the devices tile and the instance settings read the first warning from `warning` - `warning0` does not exist
- (@GermanBluefox) The instance settings now show the warnings that are currently active
- (@GermanBluefox) The vis widgets were ported to vis-2: the two templates became one widget with a layout setting ([documentation](/#/docs/adapterref/iobroker.dwd/docs/en/README.md))
- (@GermanBluefox) New widget for the ioBroker.devices dashboard
- (@GermanBluefox) Added the 24 missing inland lake regions (Bodensee, Chiemsee, Starnberger See, Müritz, Steinhuder Meer, ...)
- (@GermanBluefox) The adapter was refactored to TypeScript, the sources are now in `src/` and are compiled to `build/`
- (@GermanBluefox) The configuration dialog was migrated to JsonConfig
- (@GermanBluefox) Adapter requires node.js >= 22 now

### 2.8.7 (2026-05-19)
* (arteck) fix invalid JSON
* (arteck) add info.lastUpdate
* (arteck) add eslint
* (arteck) Dependencies have been updated
* (arteck) fix hint dp in widget

### 2.8.5 (2023-06-15)
* (Quarkmax) added the hint for warning instructions

### 2.8.3 (2022-03-23)
* (Apollon77) Do not add unused warning0

## License

The MIT License (MIT)

Copyright (c) 2016-2026 bluefox <dogafox@gmail.com>, hobbyquaker

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