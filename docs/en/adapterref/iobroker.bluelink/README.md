![Logo](admin/bluelink.png)
# ioBroker.bluelink

[![NPM version](https://img.shields.io/npm/v/iobroker.bluelink.svg)](https://www.npmjs.com/package/iobroker.bluelink)
[![Downloads](https://img.shields.io/npm/dm/iobroker.bluelink.svg)](https://www.npmjs.com/package/iobroker.bluelink)
![Number of Installations (latest)](https://iobroker.live/badges/bluelink-installed.svg)
![Number of Installations (stable)](https://iobroker.live/badges/bluelink-stable.svg)
![Test and Release](https://github.com/Newan/iobroker.bluelink/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/bluelink/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)


[![NPM](https://nodei.co/npm/iobroker.bluelink.png?downloads=true)](https://nodei.co/npm/iobroker.bluelink/)


## bluelink adapter for ioBroker

Adapter to control Hyundai or Kia vehicle (until 2023)

[Discussion](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo)

[Login Infos](https://developers.kia.com/web/v1/kia/specification/account/account_authorize)

[Token generieren](https://github.com/Newan/ioBroker.bluelink/tree/master/py) or [workaround with Token](https://forum.iobroker.net/topic/43592/adapter-hyundai-bluelink-oder-kia-uvo/2249?_=1761189451343)

[Wiki](https://github.com/Newan/ioBroker.bluelink/wiki)

------------------------------------------------------------------------------------
## Changelog
### 3.1.31 (2026-08-11)
* (arteck) Dependencies have been updated

### 3.1.30 (2026-08-11)
* (meistermopper) Fix vehicle location data extraction for Kia and Hyundai CCS2 vehicles and prioritize dedicated location API
* (meistermopper) Add control.force_location button and implement live telematics POST location/status polling directly from vehicle hardware
* (meistermopper) Fix TypeScript type definitions and unsafe property access in status parsing

### 3.1.29 (2026-08-05)
* (copilot) Adapter requires node.js >= 22 now
* (ipod86) add Tokenmanager

### 3.1.28 (2026-04-08)
* (arteck) Dependencies have been updated
* (arteck) better LOG

### 3.1.27 (2026-04-06)
* (arteck) fix position_text 
* (arteck) Dependencies have been updated

[Older changelogs can be found there](CHANGELOG_OLD.md)

## Donation
[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)


## License
MIT License

Copyright (c) 2025-2026 Newan <info@newan.de>

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
