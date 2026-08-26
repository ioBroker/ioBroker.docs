---
BADGE-Number of Installations: http://iobroker.live/badges/admin-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.admin.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.admin.svg
---
# Admin

The admin adapter is used to configure the whole ioBroker-Installation and all its adapters. 
It provides a web-interface, which can be opened by "http://<IP-Address of the server>:8081" 
in the web browser. This adapter is automatically installed together with ioBroker.

## Configuration
The configuration dialog of the adapter "admin" provides the following settings: 

![img_002](img/admin_img_002.jpg)

**IP:** the IP-address of the "admin" web-server can be chosen here. 
Different IPv4 and IPv6 addresses can be selected. The default value is 0.0.0.0. 
If you think, that 0.0.0.0 is invalid setting, please let it stay there, because it 
is absolutely valid. If you change the address, you will be able to reach the web-server 
only through this address. **Port:** You can specify the port of the "admin" web-server. 
If there are more web servers on the PC or device the port must be customized to avoid problems 
of a double port allocation. **Coding:** enable this option if secure https protocol should be used. 

**Authentication:** If you want the authentication with login/password you should enable this check-box. 
Default password for user "admin" is "iobroker" **Buffer:** to speed up the load of the pages enable this option. 
Normally only the developer wants to have this option unchecked.

## Handling
The main page of the admin consist of several tabs. **Adapter:** Here the instances of 
a adapters can be installed or deleted. With the update button 

![img_005](img/admin_img_005.jpg)

on the top left we can get if the new versions of adapters are available. 

![img_001](img/admin_img_001.jpg)

The available and installed versions of the adapter is shown. For overall view the state of the 
adapter is coloured (red=in planning; orange=alpha; yellow=beta). The updates to a newer version of 
the adapter are made here also. If there is a newer version the lettering of the tab will be green. 
If the question mark icon in the last column is active you can get from there to web site with information of the adapter. 
The available adapter are sorted in alphabetical order. Already installed instance are in the upper part of the list. 

**Instance:** The already installed instance are listed here and can be accordingly configured. If the title of the 
instance are underlined you can click on it and the corresponding web site will be opened. 

![img_003](img/admin_img_003.jpg)

**Objects:** the managed objects (for example setup / variables / programs of the connected hardware) 

![img_004](img/admin_img_004.jpg)

**States:** the current states (values of the objects)   
If the adapter history is installed, you can log chosen data points. 
The logged data points are selected on the right and appear with a green logo. 

**Scripts:** this tab is only active if the "javascript" adapter is installed.

**Node-red:** this tab is only visible if the "node-red" adapter installed and enabled.

**Hosts:** the computer which ioBroker is installed on. Here the latest version of js-controller can be installed on. 
If there is a new version the letters of the tab are green. To search for a new version you have to click on the update 
icon on the bottom left corner. 

**Enumeration:** here the favourites, trades and spaces from the CCU are listed. 

**Users:** here the users can be added. To do this click on the (+). By default there is an admin. 

**Groups:** if you click on the (+) on the bottom left you can create user groups. From the pull-down menu the users get assigned to the groups. 

**Event:** A list of the running updates of the conditions. 

**Hosts:**
Information about the computer on which ioBroker is installed. The current version of the js controller can be updated here. If a new version is available, the label of the tab appears in green.

**Log:** here the log is displayed In the tab instance the the logged log level 
of the single instance can be set. In the selection Menu the the displayed minimum log level is selected. If an error occurs the 
lettering of the log appears in red.

**System settings:**
Settings such as language, time and date format and other system-wide settings are made in the menu that opens here.

![img_006](img/admin_img_006.jpg)

The repositories and security settings can also be set here.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 8.0.7 (2026-08-26)
- (@GermanBluefox) The JSON tabs (`common.adminTab.link`) are now validated against the JsonConfig schema too
- (SimonFischer04) Admin can now run behind a reverse-proxy sub-path (e.g. `/admin/`)
- (SimonFischer04) Prefix legacy jQuery adapter-icon URLs and inject `info.js` into `<HEAD>` as well
- (@GermanBluefox) Corrected layout of Config view

### 8.0.5 (2026-08-19)
- (@GermanBluefox) Corrected the doubled tiles in the quick access if more than one web instance is running
- (@GermanBluefox) Reworked the initial setup wizard: modern layout, navigation backwards and many corrections
- (@GermanBluefox) Rounded the options toolbar in the adapter update dialog
- (@GermanBluefox) Removed warning about not installed docker.

### 8.0.4 (2026-08-09)
- (@GermanBluefox) Better handling of autocompleteSendTo JsonConfig components

### 8.0.3 (2026-08-08)
- (@softwarecrash) Corrected the validation state in the custom settings if more than one instance is shown
- (@softwarecrash) Corrected the disabled save button in the custom settings after an invalid instance was switched off

### 8.0.2 (2026-08-07)
- (@GermanBluefox) Corrected charts
- (@GermanBluefox) Corrected the authentication for the OAuth2 callbacks
- (@GermanBluefox) Disabled the save button in the custom settings as long as a value is invalid
- (@GermanBluefox) Added the folder selection to the alias creation dialog
- (@GermanBluefox) Hidden the chart in the value editor in the mobile view
- (@GermanBluefox) Small GUI improvements

## License

The MIT License (MIT)

Copyright (c) 2014-2026 bluefox <dogafox@gmail.com>