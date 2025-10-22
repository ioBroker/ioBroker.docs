![Logo](admin/fb-checkpresence.png)
# ioBroker.fb-checkpresence
![GitHub license](https://img.shields.io/github/license/afuerhoff/iobroker.fb-checkpresence)
[![Downloads](https://img.shields.io/npm/dm/iobroker.fb-checkpresence.svg)](https://www.npmjs.com/package/iobroker.fb-checkpresence)
![GitHub repo size](https://img.shields.io/github/repo-size/afuerhoff/iobroker.fb-checkpresence)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/afuerhoff/iobroker.fb-checkpresence)
![GitHub commits since latest release (by date)](https://img.shields.io/github/commits-since/afuerhoff/iobroker.fb-checkpresence/latest)
![GitHub last commit](https://img.shields.io/github/last-commit/afuerhoff/iobroker.fb-checkpresence)
![GitHub issues](https://img.shields.io/github/issues/afuerhoff/iobroker.fb-checkpresence)
[![Known Vulnerabilities](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence/badge.svg)](https://snyk.io/test/github/afuerhoff/ioBroker.fb-checkpresence)

[![NPM](https://nodei.co/npm/iobroker.fb-checkpresence.png?downloads=true)](https://nodei.co/npm/iobroker.fb-checkpresence/)

![Number of Installations (latest)](https://iobroker.live/badges/fb-checkpresence-installed.svg)
![Stable version](https://iobroker.live/badges/fb-checkpresence-stable.svg)
[![Latest NPM version](https://img.shields.io/npm/v/iobroker.fb-checkpresence.svg)](https://www.npmjs.com/package/iobroker.fb-checkpresence)

**Tests:** ![Test and Release](https://github.com/afuerhoff/ioBroker.fb-checkpresence/workflows/Test%20and%20Release/badge.svg)

## fb-checkpresence adapter for ioBroker

The adapter checks the presence of family members over the fritzbox. 
You must fill in the name of the family member and the mac-address (or ip-address) of the used device. 
The comment is optional and you can enable or disable the family member. 
The datapoint is based on the member name.

### Used open source code
#### npm dateformat v4.5.3
(c)  2007-2009 Steven Levithan <stevenlevithan.com>
npm: https://www.npmjs.com/package/dateformat
github: https://github.com/felixge/node-dateformat
license: MIT

### Adapter pre conditions
For the correct function you have to install a history adapter. You can choose
one of the following adapters:
* History
* SQL
* InfluxDB

## Used device
For this adapter the AVM Fritzbox is used. Here you can find informations about
the Fritzbox https://avm.de/produkte/fritzbox/.
The fritzbox services are used over the TR-064 protocol.

### Fritzbox conditions

The used TR-064 interface from the fritzbox is described here: https://avm.de/service/schnittstellen/.
Following TR-064 services and actions are used:
* Hosts:1 - X_AVM-DE_GetHostListPath (supported since 2017-01-09)
* Hosts:1 - X_AVM-DE_GetMeshListPath
* Hosts:1 - GetSpecificHostEntry
* Hosts:1 - X_AVM-DE_GetSpecificHostEntryByIP (supported since 2016-05-18)
* DeviceInfo:1 - GetSecurityPort
* DeviceInfo:1 - GetInfo
* WANPPPConnection:1 - GetInfo
* WANIPConnection:1 - GetInfo
* WLANConfiguration3 - SetEnable
* WLANConfiguration3 - GetInfo
* WLANConfiguration3 - GetSecurityKeys
* X_AVM-DE_HostFilter - DisallowWANAccessByIP
* X_AVM-DE_HostFilter - GetWANAccessByIP
* DeviceConfig:1 - Reboot
* LANConfigSecurity1 - X_AVM-DE_GetCurrentUser

By default, the TR-064 interface is not activated. However, this can easily be changed via the 
FritzBox web interface. To do this log in into your FritzBox and ensure that the expert view is activated. 
Then you will find below "Home Network »Home Network Overview» Network Settings" the point 
"Allow access for applications". There you have to activate the checkbox and then restart the FritzBox once.

Hint: After changing the options, don't forget the restart of the Fritzbox !
<img src="doc/access_settings_network.JPG"/>

## Configuration dialog

### General
The configuration values are validated and only correct values can be saved. Otherwise the save button is disabled.

### Fritzbox IP-address, user and password
The configuration of ip-address, user and password is necessary to get the device data from the fritzbox.
Therefore a user has to be created in the fritzbox. This is required with newer 
firmware version (>= 7.25)of the fritzbox. See here fore information: https://avm.de/fileadmin/user_upload/Global/Service/Schnittstellen/Empfehlungen%20zur%20Benutzerfu%CC%88hrung%20bei%20der%20Anmeldung%20an%20einer%20FRITZ%21Box_v1.1.pdf 
The password is encrypted and wasn't saved in clear text. The user name and password may have a maximum of 
32 characters. See for information: https://service.avm.de/help/de/FRITZ-Box-Fon-WLAN-7490/014/hilfe_zeichen_fuer_kennwoerter#:~:text=Namen%20f%C3%BCr%20Benutzer,Kennwortfeld%20darf%20nicht%20leer%20sein.
Hint: In some cases it could be that the fritzbox blocked the user if the password was not correctly inserted.
Often a timeout message is in the log. Please check than the if you has insert the correct username and password.Then you have to reboot the fritzbox. 

### Ssl option
In some cases the adapter could not connect to the fritzbox. It could help to disable this option.
In this case the adapter tries to connect without https. 

### Interval
You have separate intervals for family members and Fritzbox devices.
The interval for Fritzbox devices can be configured from 10s to 3600s. Normally a value between 60 and 300 seconds is an optimal interval to read the fritzbox data. Family members could be configured from 10s to 600s. Every new cycle starts if the previous cycle is finished.

### Filter time
If the filter time is greater than 0s the state of a family member is checked twice (after the filter time) if the state is changing to false. If the state is true the state is immediate set.  

### History adapter
Over the history adapter some values are calculated. You can choose, if the history, the sql or the influxdb adapter is used for this calculations. The history adapter must be installed preliminary and can then selected in the configuration dialog. 
If the history configuration is disabled then the calculation of some values could not be realized. 

### Dateformat
The date format mask options are described on this web page: https://www.npmjs.com/package/dateformat.
The format mask is used for formatting the html and json table objects. 

### Creation of FB devices
If this option is checked, the objects for every device in the Fritzbox device list are created.
If this option is disabled, then also the mesh informations are disabled.

### Resynchronisation of FB device objects
If this option is checked, then the FB device object are re-synchronized with the device list fom Fritzbox.

### Creation of mesh information
This option can be checked if the creation of FB devices is allowed. If this option is checked, 
the mesh objects for every device in the Fritzbox device list are created.

### guest information
If this option is checked the states for guests are created. 

### qr-code generation
If this option is checked the qr-code from guest wlan is generated.
You can show this QR code in your VIS with the widget "Basic Boolesches SVG".
Please use following settings:
<img src="doc/QRCode.png"/>

### Family member settings
For a configured family member you should enter the member name, the hostname, the mac- and ip-address, a comment and you can enable or disable the member. A group is optional. 
If you leave the group empty and set the compatibility flag to true the behaviour is like an older version of the adaper. You can use the presence state from the family member or the state directly mapped to the family member name. In a future version you must use the presence state. This behaviour could be switched on/off with the compatibility checkbox:
-> compatibility = true: behaviour as an older version with empty group. 
-> compatibility = true and group not empty: new behaviour. All states beneath the familymembers folder. 
-> compatibility = false: new behaviour. All states beneath the familymembers folder.

For every member the adapter creates a presence state and checks if the member is present or absent. The state was changed if the presence state changed. 
You can also enable the filtering for a member. If the state is true the state changes immediately to true. If it is false then the value will checked after the filter time again.
If the state is in both cases false then the state changes to false. Otherwise it does not change.

To get the speed information in the objects you have to select fb-devices option.

### Manually trigger presence
In javascript you can trigger the presence manually. When you send the message to the adapter 
every new message is blocked for 10 seconds. You receive a negative result (false) if the message is blocked.
True if the message is received from the adapter. 
`
sendTo('fb-checkpresence.0', 'triggerPresence', {}
    , function (result) {
        log(result, 'info');
});
`

### Whitelist settings
In the white list you can insert every known device. Any unknown devices are listed in the blacklist object. 
If you check the checkbox in the headline of the table all devices are selected.

In Javascript you can send an item to the whitelist. 
The sent data (hostname, MAC) is compared with the Fritzbox device list. If the entry is present, it is checked whether it is already saved in the whitelist. If not, the entry is saved in the whitelist configuration table.

sendTo('fb-checkpresence.0', 'addDeviceToWhitelist', 
    {
        hostname: 'devicename',
        mac: '00:00:00:00:00:00'
    }
    , function (result) {
        log(result, 'info');
});

## Features

### AVM support check
The function checks the availability of used fritzbox features. The availability is logged as info. If you have problems look if the features are all set to true. Also the access rights are checked for the user and
the feature is set to false if the acces right is not correct.

### Switch on / off the guest wlan
Under the folder guest you can set the state wlan to true or false and then the guest wlan switches on or off.

### QR code of guest wlan
The QR code of the guest wlan is saved in the state wlanQR in the guest folder. The QR code can show in vis in the basic - Bool SVG widget.   

### Switch on / off the internet access of Fritzbox devices
Under the folder FB-devices you could set the disabled state to true or false and the the internet access of this device
is blocked in the Fritzbox.

### Get guests, blacklist
In this function it is checked if any user is logged in as guest. Also is checked if any device is not in the white list listed.
This devices are added to the blacklist.

### Get Active
For every family member the presence, the comming and going dates and several other infos are calculated and saved in the member object if a history adapter is selected. 

### Host number, active devices
The amount of devices and how many are active are get from the fritzbox.

## Objects

### Object presenceAll
If all family members are present then the object is true.

### Object presence
If one family member ist present then the object is true.

### Object devices
These are all listed devices in the fritzbox

### Object activeDevices
These are the amount of all active devices in the fritzbox

### Object html, json
These objects are tables (json and html) with the comming and going information of all family members in it.

### Object info
Here are informations listed about the last update and the connection status from the adapter.

### Object guest
Here are informations listed about the amount of active guests and table objects with the device information in it.

### Object blacklist
Here are informations listed about the amount of unknown devices and table objects with the unknown device information in it.

### Object member.present
Here you will find information about the presence of a member on the current day and how long the member has been the status true since the last change. 
 
### Object member.absent
Here you will find information about the absence of a member on the current day and how long the member has been the status false since the last change.

### Object member.comming, member.going
Here you will find information when the family member arrives or leaving home.

### Object member.history, member.historyHtml
Here you will find information about the history of the current day. 

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) dependencies updated
* (afuerhoff) package.json issues fixed [#350](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/350)
* (afuerhoff) npm security changes
* (afuerhoff) filter time extended to 300s
* (afuerhoff) guest wlan bug fixed [#353](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/353)
* (afuerhoff) deprecated functions changed

### 1.4.1 (2025-09-19)
* (afuerhoff) dependencies updated
* (afuerhoff) repository checker & code scanning issues fixed

### 1.4.0 (2025-05-28)
* (afuerhoff) dependencies updated
* (afuerhoff) error handling optimized
* (afuerhoff) enhancement  [#336](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/336)
* (afuerhoff) issue [#337](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/337)
* (afuerhoff) issue [#335](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/335)

### 1.3.1 (2025-03-02)
* (afuerhoff) dependencies updated
* (afuerhoff) bug fixed [#333](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/333)
* (afuerhoff) bug fixed [#305](https://github.com/afuerhoff/ioBroker.fb-checkpresence/issues/305)

### 1.3.0 (2025-02-14)
* (afuerhoff) dependencies updated
* (afuerhoff) eslint setup changed
* (afuerhoff) ipv6 ip-address and prefix added

### 1.2.8 (2024-11-20)
* (afuerhoff) bugfix configuration
* (afuerhoff) dependencies updated

## License
MIT License

Copyright (c) 2019-2025 Achim Fürhoff <achim.fuerhoff@outlook.de>

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