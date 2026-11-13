![Logo](admin/opensmartcity.png)
# ioBroker.OpenSmartCity

![Number of Installations](http://iobroker.live/badges/opensmartcity-installed.svg)
![Number of Installations](http://iobroker.live/badges/opensmartcity-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.opensmartcity.svg)](https://www.npmjs.com/package/iobroker.opensmartcity)

![Test and Release](https://github.com/iobroker/iobroker.opensmartcity/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/opensmartcity/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.opensmartcity.svg)](https://www.npmjs.com/package/iobroker.opensmartcity)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (@GermanBluefox) Added the short form of the web component manifests (tag, name, icon, size) to `common.webComponents`, so that hosts like Aura can list the components before the adapter is installed; the build writes it with `iob-web-components sync-io-package`

### 0.4.2 (2026-11-11)
- (@GermanBluefox) Removed the adapter from its own dependencies. It slipped into 0.4.1, which was therefore not published - this release brings its vis-2 widget fix

### 0.4.1 (2026-11-11)
- (@GermanBluefox) vis-2 widget: the widget set loads again. vis-2 2.20 loaded it as a classic script, which cannot run the ES module that Vite builds

### 0.4.0 (2026-11-08)
- (@GermanBluefox) Added the web component `<iob-opensmartcity-map>` - the map of the stations with their latest values - for Aura, admin and other hosts of `@iobroker/web-components` (`common.webComponents`)
- (@GermanBluefox) vis-2 widget: the setting "Zoom level" works now (0 = all stations fit into the map)

### 0.3.0 (2026-11-05)
- (copilot) Adapter requires node.js >= 22.19.0 now
- (@GermanBluefox) vis-2 widgets moved to Vite and rebuilt for React 19 and MUI 9 (vis-2 >= 2.20.2 needed), see ioBroker/ioBroker.vis-2#689
- (@GermanBluefox) The adapter was refactored to TypeScript, the gulp build was replaced by `tasks.ts`
- (@GermanBluefox) The settings dialog was moved to Vite, React 19, MUI 9 and `@iobroker/gui-components`
- (@GermanBluefox) The adapter can be installed only from npm now, not directly from GitHub
- (@GermanBluefox) Fixed: the `status` state of a station was never created
- (@GermanBluefox) Fixed: the list of stations in the settings stayed empty until the adapter restart, when the FROST server was not reachable at the start
- (@GermanBluefox) Fixed: the city selector in the settings showed nothing

### 0.2.3 (2026-10-14)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (@GermanBluefox) Adapter requires node.js >= 22 and admin >= 7.6.17 now
- (@GermanBluefox) Fixed the crash when the FROST server returns its data in several pages
- (@GermanBluefox) Updated packages, migrated to ESLint 9, added the standard tests (they run on Windows and macOS too)

## License
The MIT License (MIT)

Copyright (c) 2023-2026 ioBroker Community Developers

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