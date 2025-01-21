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

[Wiki](https://github.com/Newan/ioBroker.bluelink/wiki)

<!--
    Placeholder for the next version (at the beginning of the line):

    https://github.com/AlCalzone/release-script#usage
    npm run release major -- -p iobroker license --all 0.9.8 -> 1.0.0
    npm run release minor -- -p iobroker license --all 0.9.8 -> 0.10.0
    npm run release patch -- -p iobroker license --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- -p iobroker license --all v0.2.1 -> v0.2.2-beta.0
    ### **WORK IN PROGRESS**
-->



## Changelog
### 3.1.2 (2025-01-11)
* (arteck) error on create dp fix

### 3.1.1 (2025-01-07)
* (arteck) monthlyReport for phev/hev
* (arteck) trip corr for ev cars

### 3.1.0 (2024-10-05)
* (arteck) SOC corr 
* (arteck) dependency update

### 3.0.4 (2024-10-03)
* (arteck) typo

### 3.0.3 (2024-10-02)
* (arteck) add city to position text

### 3.0.2 (2024-10-01)
* (arteck) corr for hev

### 3.0.1 (2024-09-27)
* (arteck) activate jsonconfig

### 3.0.0 (2024-09-27)
* (arteck) new structure jsonconfig

### 2.3.11 (2024-09-27)
* (arteck) redesign

### 2.3.10 (2024-09-27)
* (arteck) add address as text using openstreetmap

### 2.3.9 (2024-09-26)
* (arteck) add ccs2 car status

### 2.3.8 (2024-02-25)
* (arteck) corr steerWheelHeat

### 2.3.7 (2024-02-04)
* (arteck) set default force_update to server

### 2.3.6 (2023-08-05)
* (arteck) corr crash

### 2.3.5 
* (arteck) add force_login button
* (arteck) corr history bug

### 2.3.4 (2023-07-19)
* (arteck) clima control is redesigned

### 2.3.3 (2023-07-19)
* (arteck) charge_limit_fast and charge_limit_slow is now in control folder

### 2.3.2 (2023-04-12)
* (arteck) force update only selected vin
* (arteck) add buttons for force_refresh_from_server and force_refresh_from_car

### 2.3.1 (2023-04-10)
* (arteck) io-package update

### 2.3.0 (2023-04-10)
* (arteck) force update
* (stefan.cloer) force_update corr, lastInfoUpdate corr, typo corr
* (arteck) add batteryControlState12V init is 60
* (arteck) max requests set to 400
* (arteck) vin id for force_refresh 
* (arteck) positionURL

### 2.2.7 (2023-03-07)
* (arteck) fix / clima control
* (arteck) force update add to admin
* (devdev24) Fixed error causing dead on-board batteries
* (arteck) door status is correct

### 2.2.6 (2022-11-04)
* (arteck) fix / extend clima & errorcounter

### 2.2.3 (2022-04-06)
* (Newan) Update dependencies

### 2.2.0
* (Newan) Test release for 503 Error

### 2.2.0

* (TA2k, Newan) Adding refresh stop if 12V battery is under 50%.

### 2.1.2
* (TA2k, Newan) Update lib bluelinky

### 1.1.1
* (Newan) Bug fixes vehicle location

### 1.0.9
* (Newan) + (dklinger) Bug fixes

### 1.0.8
* (Newan)Add charge start/stop option

### 1.0.7
* (Newan)Fix for KIA Sorento (Diesel)

### 1.0.6
* (Newan) Fix for server connection

### 1.0.3
* (Newan) Changes for PHEV

### 1.0.2
* (Newan) New lib

### 1.0.0
* (Newan) First stable version

## Donation
[![](https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=L55UBQJKJEUJL)


## License
MIT License

Copyright (c) 2025 Newan <info@newan.de>

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
