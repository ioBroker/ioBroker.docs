# ![Logo](./admin/broadlink2.png) Controls BroadLink compatible devices

[![NPM version](http://img.shields.io/npm/v/iobroker.broadlink2.svg)](https://www.npmjs.com/package/iobroker.broadlink2)
[![installed](http://iobroker.live/badges/broadlink2-installed.svg)](http://iobroker.live/badges/broadlink2-installed.svg)
[![Downloads](https://img.shields.io/npm/dm/iobroker.broadlink2.svg)](https://www.npmjs.com/package/iobroker.broadlink2)
[![Travis-CI](http://img.shields.io/travis/frankjoke/ioBroker.broadlink2/master.svg)](https://travis-ci.org/frankjoke/ioBroker.broadlink2)

[Deutsche Anleitung translated by google](https://translate.google.com/translate?sl=en&tl=de&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)

[Русские инструкции переведены с гуглом](https://translate.google.com/translate?sl=en&tl=ru&u=https%3A%2F%2Fgithub.com%2Ffrankjoke%2FioBroker.broadlink2%2Fblob%2Fmaster%2FREADME.md)


## Adapter for different Broadlink compatible WLan-devices (RM++,SP++,A1, Floureon, S1C, LB1)

This is an ioBroker adapter for multiple  Broadlink switch like RM2, RM3, RM Plus, SP1, SP2, SP3, Honeywell SP2, SPMini, SPMini2, SPMiniPlus and some OEM products from them.
ALso remote controllers are supported like RM2, RM Mini, RM Pro Phicomm, RM2 Home Plus, RM2 Home Plus GDT, RM2 Pro Plus, RM2 Pro Plus2 and RM2 Pro Plus BL. Multiple controllers will generate their own entries and need to be trained separately.
It scans the network to find compatible devices and installs them (currently only switches type SP?).

If you learned states for RM* and then rename their name the state-ID will change to the new name as well!

You can create also your own new commands in LearnedStates if you use 'code'+ your code as the value (with 'CODE_' preceeding the code or even better (because of it will remain if you rename the state) add a field 'code' to native with the admin.object pencil and put there the hex code (without 'CODE_'!).

The adapter has fixed states to send codes from RM-devices or to learn them It can also send individual scenes (actions on multiple devices).

If devices which are configured on a certain IP are not found again they will be flagged 'notReachable'! If they are connected again they will be useable normally.

If a device is not answering for 5 minutes in a row it's set to unreachable. ***notReachable*** devices will give a log warning message every x scans. After some scans the adapter will try to find them again on the same mac address before.

Please delete old devices from admin.objects in case you remove them permanentely or renamed them in your router!

The adapter tries to find the device at first by it's name and then by it's mac addresses. If name changes due to a change of ip address for example and mac address stays the same then device will continue to use old name. If device changes to a new device with new mac you can use rename device in config to use an old device name instead.

### Note on polling

* SP1 devices cannot be polled.
* If you use only RM devices polling can be set to 2 minutes (120 seconds) but should not be set higher because otherwise they might not be re-authorized
* If you use switches which can be switched manually then molling should be 30s-1 minute to reflect changes within a minute.

## Configuration

* Enter prefix of network address in configuration which should be removed when generating device names
* Enter the number of seconds between polls. On each poll all SP* devices expluding SP1 are asked what the switch status is. This feature can be disabled by setting the poll delay to 0. On some RM devices with temperature readout the temperature will be updated as well.
* You can add now ip addresses of to be found/included devices which are also on another network than the network of the adapter. In this case you need to make sure that the computer on which the adapter is running kno0ws by internal or external routing tables how to connect to this other network.
* The `use IP interface` option can be set to use a specified interface address, this may help if you have lan and wlan on the system running iobroker and you do not want to scan on first interface but on wlan only, it may help also if local interface is different from external one in some docker or VM environments. You need to enter the IPv4 address of the interface to be used as source address, otherwise adapter will use 0.0.0.0 and listen to all local interfaces only.

## How-To learn codes on RM's

* In Objects of ioBroker you can find "broadlink2.[devicename].Learn or LearnRF for '+' type of devices".
* For RM(x)+ (Plus) devices you get also a special RS-sweep learn button (_LearnRF) which can learn more devices than on normal 433MHz.
* Set this object to true. (you can click on the button in object view)
* Now press some button on your remote control within 30 seconds. in normal mode press them shortly with some time in between until learned.
* In RF-sweep learn you need to long press the button first for ~10-20 seconds, then release it and wait 2-3 seconds before you press it aggain for very short time.
* An new Object should now appear within the Object "broadlink.[n].[devicename].LearnedState" with the name ">>> Rename learned @ YYYYMMDDTHHmmSS"
* You can click on the button in object view to send the code.
* To rename the item click on the name (starting with `_Rename_learned_`) and change the name. It should not include `,`, `.` or `;` as well as some other characters, they will be replaced by '_';

It is also possible to use the codes from [RM-Bridge](http://rm-bridge.fun2code.de/).
Just create an object (state, type button) with value where you prepend "CODE_" or with native entry `code` without any 'CODE_'.

## Note on new RM4/LB1 devices

* Several new Broadlink-Devices support a new Broadlink-Cloud protocol which is automatically selected when you use the newer broadlink apps to bring in the device into your wifi network. THis new broadlink protocol is not compatible with the broadlink2-Adapter and you cannot use devices using this new protocol.
* To avoid this problem bring the device into the network using older Broadlink apps like `e smart home` or `e-control` and make sure your phone is on the same 2.4GHz wifi network which you want to bring it in!
* This newer devices need also re-authentication every 5-10 minutes which adapter does automatically.

## Use scenes

* Scenes can contain ID's or names as well as numbers separated by `,`. Normally the ID's will be executed/sent with 100ms time difference but if you need a longer pause between then you can write in a number which reflects the milli seconds to wait. For example `SP:dose=1, 1000, RM:your.L.StereoEin, 1000, RM:your.L.TVEin` would switch on an wireless plug named 'SP:dose', then wait one second (actually 1.1 seconds), Switch on the stero and after another second the tv. You can also switch devices of other adapters, like `hm-rpc.0.MEQ1435726.1.STATE=true` would switch this Homematic device on! Boolsche states can be switched with '=1/=on/=true/=ein', if you leave it without `=` than it will use true. To switch off a device you end it with '=0/=false/=aus/=off' which is necessary to be switched off!

## Use states

* You may create also states for your devices which combines an On and Off commands to a single state which can be switched like any other device..
* You need to list the commands for switching a state on and off in the separate columns, these can be multiple ones so state knows when your device is switched on/off by any of them
* If you set the state the to on or off onlöy the first on/off command will be sent
* If only on commands are present the switch will send the respective command on a numeric value-1, with means it will send the first command if it receives an `0`, the second if it receives a `1`. In this way you can simulate multiple states within one state.
* If you use only '+' as off command then you need to provide 10 on commands separated by ',' which reflect the numbers `0-9` on the remote control. You can send the sstate then a number, like `123`  (max is 9999) and it would send `1`, `2` and `3` with 1/3rd of a second delay between them! In this way you sen set for example the channel on TV to '33' by just write 'TVchannel=33' if the state name is TVchannel.
* If you use `-number`as off command like `-17` then you can store a number to the state where 17 would be subtracted and the the (x-17)th item in the on state would be sent. This way you can setup different fixed temperatures for devices which have different codes for each temperature.

## Use send messages to adapter

The adapter understands also 'sendTo' commands.

* `debug`: `sendTo('broadlink2.0','debug','on')` (also 0,1,on,off,ein,aus,true,false) would switch debug mode on.
* `get`:  `sendTo('broadlink2.0','get', 'RM2:RMPROPLUS.Temperature'` could request data from device like  `{ val: 29.9, ack: true, ts: 1505839335870, q: 0, from: 'system.adapter.broadlink2.0', lc: 1505839335870 }` zurück
* `switch`: can switch a plug on or off: `sendTo('broadlink2.0','switch','SP:your device id=on')`
* `switch_on`/`switch_off`:  sendTo('broadlink2.0','switch_on','SP:your device id')`
* `send`: `sendTo('broadlink2.0','send','RM:yourdev._Learn')` would start learn and `sendTo('broadlink2.0','send','RM:yourdev.L.yourid')` would send the code.
* `send_scene`: `sendTo('broadlink2.0','send_scene','scene xxx ')` würde den als message angegebenen Text als Szene ausführen
* `send_code`: `sendTo('broadlink2.0','send_code','RM:your remote.CODE_xxxxx')` würde den CODE_xxxx vom R:your name senden.

## Floureon or Beok313 Thermostats

* Most data can be set, the time can be set by writing anything to `_setTime` in which case the time of the device will be set to ioBroker system time. This will be done automatically also on adpter start.

## Config additional dnew devices

* You may add new devices which use same protocol by adding them with the device-ID (in hex or decimal) and the device class (löisted there (class = A1,MP1,RM,RMP,S1C,SP1,SP2,SP3P,T1). So you can add a new remote which the adapter finds only as unknown device with hex ID of 0x1234 to the RM list by 0x01234=RMP. 

## Rename devices

* Devices receive normally their network host name, or a combination of the device type, ID and mac address as their name with the first 2 letters of the type with ':' in front. You can rename such a device with `T1:BroadLink-OEM-T1-fa-83-7c=Beok313` in which case the original name will not be used but the new name used will be `Beok313`.

## Debug mode

* If you add an `!` at the end of the list of added new devices (even if it is empty) you can set the adapter to debug mode where it will log a lot of additional information even iof it is not set to 'info' mode in Admin.

## Known-Issues

* If you learn the same signal multiple times the code can be different everytime. This can not be changed.
* Sometimes it does not find devices if they do not respond to the search. Do a rescan or restart adapter to restart a new instance.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (mattreim) Several issues reported by adapter checker have been fixed

### 2.3.0 (2024-05-21)
* (mattreim) Adapter migrated to jsonConfig
* (mcm1957) Adapter requires admin >= 6 now
* (mcm1957) Dependencies have been updated

### 2.2.0 (2024-04-05)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.1.5

* beta to try to make 0x5f36 working

### 2.1.4

* bug corrections for RM4 temperatures & Humidity

### 2.1.2

* bug corrections for States and Scenes
* Names are now taken from DNS end which mean you may rename devices in router and set their fixed IP address there

### Todo for later revisions

* config of devices and codes in separate config tool

## Installation

with ioBroker admin, npm install iobroker.broadlink2 or from <https://github.com/frankjoke/ioBroker.broadlink2>

## License

The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2014-2020, frankjoke <frankjoke@hotmail.com>

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
