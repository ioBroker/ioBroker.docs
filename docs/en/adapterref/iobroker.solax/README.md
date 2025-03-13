---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.solax.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.solax.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/solax-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/solax-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg
BADGE-License: https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
---
![Logo](../../admin/solax.png)
# ioBroker.solax

[![NPM version](http://img.shields.io/npm/v/iobroker.solax.svg)](https://www.npmjs.com/package/iobroker.solax)
[![Downloads](https://img.shields.io/npm/dm/iobroker.solax.svg)](https://www.npmjs.com/package/iobroker.solax)
![Number of Installations (latest)](http://iobroker.live/badges/solax-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/solax-stable.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)](https://snyk.io/test/github/simatec/ioBroker.solax)
![Test and Release](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

[![License](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)](https://github.com/simatec/ioBroker.solax/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)](https://paypal.me/mk1676)
[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/simatec)



***

**If you like it, please consider a donation:**
  
[![paypal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

***


## Solax Cloud Connection

Solax Inverter API Cloud Connection

This adapter calls the data of your inverter from the manufacturer Solax into the iobroker.

What you need for this is an account with Solax, your token ID and the serial number of your WiFi module.

## API-Token

<span><img src="../img/solax_api.png"></span>

## serial number

<span><img src="../img/wifi-stick.png"></span>


## Expert settings

The local connection is currently only supported by the Pocket Wifi Sticks. LAN sticks can only be operated in cloud mode.

Attention, if you activate the local mode in the expert settings, you should check the current firmware version of your Pocket Wifi Stick in advance.<br>
The stick must not have a firmware version greater than 2.30.20 (Wifi-Pocket V1/V2) and smaler than 3.001 (Wifi-Pocket V3) installed, since Solax blocks local access in higher versions and causes the Wifi stick to crash.

How to check the firmware version and how to downgrade to the correct version is explained here.

To check the firmware on the stick, you have to connect to the stick's hotspot.
Your hotspot name should look like this: `Solax_SWXXXXXXXX` or `Wifi_SWXXXXXXXX`. XXXXXXXX will be replaced with your serial number.

If you are connected to the hotspot, go to the web interface of the Wifi stick in your browser with the following IP address: `5.8.8.8`<br>
If you did not change your password during the initial setup, the default login data is admin:admin

<span><img src="../img/webif.png"></span>

In the web interface you go to the "System" tab and you will find the currently installed firmware version there.<br>
If the version is greater than 2.033.20 (Wifi-Pocket V1/V2) and smaler than 3.001 (Wifi-Pocket V3), you can flash the correct version in the same tab via the "Update Firmware (.usb)" menu item.

You can download version 2.033.20 from the following link:

[Download Pocket Wifi Firmware](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

The zip file must be unpacked and the file with the ".usb" extension must be selected.<br>
Now you can start the downgrade and after about 20-30 seconds you will get a message that the update was successful and the stick will be restarted.

After a successful restart, you can now access the WiFi stick via the hotspot with the IP address `5.8.8.8` or via your local IP in your network.

Before connecting to the adapter, please check again whether the downgrade was successful and the correct firmware is installed.
Fortunately the stick does not perform an automatic firmware upgrade and is fully functional with version 2.033.20.

The local IP address (not the hotspot IP) and the password of the web interface must be entered in the adapter and you now have a local analysis of your inverter that is accurate to the second.

The following inverters are currently supported in local mode:

* X1 mini
* X1 boost
* X3-Hybiyd/Fit
* X3-20K/30K
* X3-MIC/PRO
* X3-Hybrid-G4
* X3-MIC/PRO-G2
* X1-Hybrid-G4
* X1/X3-EVC Wallbox

If you would like to have other inverters integrated, you should make the data evaluation of the local request available as an issue.

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 0.9.16 (2025-02-22)
* (simatec) Dependencies updated
* (simatec) small fix

### 0.9.15 (2025-01-23)
* (simatec) Fix Request
* (simatec) Code Fix
* (simatec) Dependencies updated

### 0.9.14 (2025-01-08)
* (simatec) eslint-config fix
* (simatec) Code fix
* (simatec) Dependencies updated
* (simatec) License updated

### 0.9.13 (2024-11-27)
* (simatec) Dependencies updated
* (simatec) small Design fix
* (simatec) Issue Action added
* (simatec) eslint-config added

### 0.9.12 (2024-09-26)
* (simatec) Fix for Admin 7.1.5

### 0.9.11 (2024-09-21)
* (simatec) small Design fix

### 0.9.10 (2024-09-17)
* (simatec) small fix
* (simatec) Dependencies updated
* (simatec) Responsive Design added

### 0.9.9 (2024-06-27)
* (simatec) Fix X1-Mini G4

### 0.9.8 (2024-06-27)
* (simatec) Dependencies updated
* (simatec) X1-Mini G4 added

### 0.9.7 (2024-06-19)
* (simatec) Cloud-URL updated
* (simatec) Dependencies updated

### 0.9.6 (2024-02-05)
* (simatec) small Design Fix

### 0.9.5 (2024-02-04)
* (simatec) Dependencies updated
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.4 (2024-01-22)
* (simatec) adapter-dev added
* (simatec) delete Gulp
* (Andre-0815-4711) Data for X1/X3-EVC Wallbox added

### 0.9.3 (2024-01-14)
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Fix Inverter data
* (simatec) Dependencies updated

### 0.9.2 (2024-01-13)
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.1 (2024-01-02)
* (simatec) Fix Inverter data
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Update Docu

### 0.9.0 (2024-01-02)
* (simatec) Cloud URL Check added
* (simatec) X1/X3-EVC added
* (simatec) Inverter Data for X3-Hybrid-G4 updated
* (simatec) Fix Inverter Data for X1 Hybrid G4
* (simatec) Dependencies updated

### 0.8.0 (2023-10-23)
* (simatec) X1-Hybrid-G4 added

### 0.7.7 (2023-09-06)
* (simatec) Dependencies updated
* (simatec) small Bugfix

### 0.7.6 (2023-07-30)
* (simatec) X3-Hybrid-G4 data updated
* (simatec) Dependencies updated
* (simatec) small Bugfix
* (simatec) Ukrainian translation added

### 0.7.5 (2023-05-29)
* (simatec) X3-MIC/PRO-G2 added
* (simatec) small Fix
* (simatec) Dependencies updated

### 0.7.4 (2023-05-04)
* (simatec) connection state added
* (simatec) suncalc package added
* (simatec) change from dawn und dusk calc

### 0.7.3 (2023-05-03)
* (simatec) small Bugfix
* (simatec) X3-Hybrid data added
* (simatec) Dependencies updated

### 0.7.2 (2023-04-27)
* (simatec) small Bugfix

### 0.7.1 (2023-04-27)
* (simatec) small Bugfix

### 0.7.0 (2023-04-26)
* (simatec) Dependencies updated
* (simatec) Config for Firmware Version added
* (simatec) small Bugfix

### 0.6.0 (2023-03-04)
* (simatec) Dependencies updated
* (simatec) Fix URL
* (simatec) small Bugfix

### 0.5.7 (2022-11-01)
* (simatec) Dependencies updated

### 0.5.6 (2022-09-21)
* (simatec) local mode for X1 boost added

### 0.5.5 (2022-09-21)
* (simatec) small Bugfixes

### 0.5.4 (2022-09-20)
* (simatec) small Bugfixes

### 0.5.3 (2022-09-20)
* (simatec) Hybrid-G4 added
* (simatec) small Bugfixes
* (simatec) appveyor test removed
* (simatec) travis test removed

### 0.5.1 (2022-09-13)
* (simatec) feedin added

### 0.5.0 (2022-09-12)
* (simatec) Dependencies updated
* (simatec) small Bugfixes
* (clausmuus) Add support for firmware version 3.001

### 0.4.6 (2022-04-11)
* (simatec) Fix states

### 0.4.5 (2022-04-04)
* (simatec) Dependencies updated
* (simatec) small Bugfixes

### 0.4.4 (2022-03-14)
* (simatec) Dependencies updated
* (simatec) battery data for local request added
* (simatec) night mode turn on/off added

### 0.4.3 (2022-02-03)
* (simatec) refactoring Sourcecode
* (simatec) Dependencies updated
* (simatec) Fix API Request

### 0.4.2 (2022-01-27)
* (simatec) Fix json state

### 0.4.1 (2022-01-26)
* (simatec) Fix react Translatation

### 0.4.0 (2022-01-25)
* (simatec) local request for Wifi Pocket Stick added
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Number of days of history data added
* (simatec) Expert-Mode added
* (simatec) Docu updated
* (simatec) Bugfixes

### 0.3.7 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.6 (2021-08-04)
* (simatec) deps fixed

### 0.3.5 (31.07.2021)
* (simatec) await/async functions fixed

### 0.3.4 (30.07.2021)
* (simatec) code cleanig
* (simatec) await functions fixed

### 0.3.3 (29.07.2021)
* (simatec) Formatted objects
* (simatec) await functions fixed
* (simatec) query interval changed
* (simatec) Dependencies updated

### 0.3.2 (28.07.2021)
* (simatec) fix for latest repo

### 0.3.1 (11.06.2021)
* (simatec) fix for latest repo
* (simatec) API-Token encrypted

### 0.3.0 (09.06.2021)
* (simatec) state settings changed
* (simatec) sentry plugin added
* (simatec) readme added
* (simatec) sunposition added
* (simatec) nightmode added

### 0.2.0 (07.06.2021)
* (simatec) powerdc 1-4 added
* (simatec) battPower added
* (simatec) many small bugfixes

### 0.1.1 (02.06.2021)
* (simatec) small Bugfixes

### 0.1.0 (02.06.2021)
* (simatec) first beta

## License
MIT License

Copyright (c) 2021 - 2025 simatec

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