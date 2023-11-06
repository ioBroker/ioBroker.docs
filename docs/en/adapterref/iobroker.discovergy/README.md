![alt text](https://raw.githubusercontent.com/DrozmotiX/ioBroker.discovergy/master/admin/Discovergy_logo.png)
![alt text](https://travis-ci.org/DrozmotiX/ioBroker.discovergy.svg?branch=master)
![Number of Installations](http://iobroker.live/badges/discovergy-installed.svg) ![Number of Installations](http://iobroker.live/badges/discovergy-stable.svg) [![NPM version](http://img.shields.io/npm/v/iobroker.discovergy.svg)](https://www.npmjs.com/package/iobroker.discovergy)
[![Downloads](https://img.shields.io/npm/dm/iobroker.discovergy.svg)](https://www.npmjs.com/package/iobroker.discovergy)


# ioBroker.discovergy

This is an ioBroker adapter for your Discovergy Power measurement meter.
It uses the Discovergy API to read data of your meters and synchronise it's current values to ioBroker.

https://api.discovergy.com/docs/

Please feel free to add issue for your wanted functionality or problems you see so i can take a look at it !

Remark : I don't have all possible devices and also the demo-account does not provide all existing values devices can provide.
If you receive the following error :

				Information received from Discovergy which is not yet part of this adapter"
				"Send this information to developer : xxxxx

Please go to your logfile and download it, create an issue here on github with the provided values.
Do not copy-paste from Admin webinterface, information is missing here which i need !

You can test this adapter by using the demo credentials of discovergy (or with your own :-)):
username = demo@discovergy.com
pass = demo

## Support me
If you like my work, please feel free to provide a personal donation  
(this is an personal Donate link for DutchmanNL, no relation to the ioBroker Project !)  
[![Donate](https://raw.githubusercontent.com/DrozmotiX/ioBroker.wled/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### __WORK IN PROGRESS__
* (DutchmanNL) Migrate admin settings to JSON config. Fixes #211

### 0.5.13 (2023-10-31)
* (sbeh) Support more characters in login credentials fixes #117, #227

### 0.5.12 (2023-10-29)
* (DutchmanNL) Ignore meters not providing any data (like removed devices) fixes #84

### 0.5.11 (2023-10-27) - Bugfixes
* (DutchmanNL) Error handling improved in cases data processing fails
* (DutchmanNL) Fixes #214 #215 #200 #219 #220 #224 #229 #235 #236 #237 #238 #506 #507

### 0.5.8 (2021-08-17)
* (DutchmanNL) Minor dependency & configuration updates, stable release candidate

### 0.5.7 (2021-03-19)
* (DutchmanNL) Change why of password encryption, you my need to re-enter your credentials !
* (DutchmanNL) Bugfix : State "system.this.discovergy.0.alive" has no existing object, this might lead to an error in future versions

## Contributors
* AlCalzone
* zoernert

## License
MIT License

Copyright (c) 2023 DutchmanNL

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