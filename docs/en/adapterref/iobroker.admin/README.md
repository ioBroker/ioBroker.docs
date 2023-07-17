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

![img_002](img/admin_img_002.png)

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

![img_005](img/admin_img_005.png)

on the top left we can get if the new versions of adapters are available. 

![img_001](img/admin_img_001.jpg)

The available and installed versions of the adapter is shown. For overall view the state of the 
adapter is coloured (red=in planning; orange=alpha; yellow=beta). The updates to a newer version of 
the adapter are made here also. If there is a newer version the lettering of the tab will be green. 
If the question mark icon in the last column is active you can get from there to web site with information of the adapter. 
The available adapter are sorted in alphabetical order. Already installed instance are in the upper part of the list. 

**Instance:** The already installed instance are listed here and can be accordingly configured. If the title of the 
instance are underlined you can click on it and the corresponding web site will be opened. 

![img_003](img/admin_img_003.png)

**Objects:** the managed objects (for example setup / variables / programs of the connected hardware) 

![img_004](img/admin_img_004.png)

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

**Event:** A list of the running updates of the conditions. **Log:** here the log is displayed In the tab instance the the logged log level 
of the single instance can be set. In the selection Menu the the displayed minimum log level is selected. If an error occurs the 
lettering of the log appears in red.

## Changelog

### **WORK IN PROGRESS**
* (foxriver76) also show non-stable repo warning on hosts tab
* (foxriver76) fixed jsonConfig slider with different max/min values than 0/100
* (foxriver76) fixed jsonConfig number element arrows
* (foxriver76) fixed jsonConfig coordinates not triggering onChange and not being prefilled
* (foxriver76) fixed jsonConfig jsonEditor component
* (foxriver76) assume status as offline if status state value has been deleted (e.g. via `setState` with `expire` option)
* (foxriver76) fixed jsonConfig CheckLicense edge case error
* (foxriver76) added tooltip to ObjectBrowserValue to show that ack-flag cannot be used to control a device
* (foxriver76) fixed host name not being visible on some themes
* (foxriver76) fixed issue with jsonConfig CRON placeholder overlapping input
* (foxriver76) button color in non-expert mode will not change according to ack/q anymore
* (foxriver76) fixed multiple problems with jsonConfig coordinates when using `useSystemName` and separate `latitude`/`longitutde` states
* (foxriver76) when adding an icon to an object, to not show already uploaded non-existing image initially

### 6.6.0 (2023-07-05)
* (klein0r) New json config component added: accordion
* (bluefox) Added site name and corrected the system dialog

### 6.5.9 (2023-06-19)
* (bluefox) Added support for update of the js-controller slaves

### 6.5.8 (2023-06-12)
* (foxriver76) The log size will be parsed correctly for controller v5

### 6.5.7 (2023-06-06)
* (bluefox) ZIP archives will be saved in files and not in states

### 6.5.6 (2023-06-01)
* (bluefox) Sentry packages were updated

## License
The MIT License (MIT)

Copyright (c) 2014-2023 bluefox <dogafox@gmail.com>