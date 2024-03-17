![Logo](admin/net-tools.png)
# ioBroker.net-tools

[![NPM version](https://img.shields.io/npm/v/iobroker.net-tools.svg)](https://www.npmjs.com/package/iobroker.net-tools)
[![Downloads](https://img.shields.io/npm/dm/iobroker.net-tools.svg)](https://www.npmjs.com/package/iobroker.net-tools)
![Number of Installations](https://iobroker.live/badges/net-tools-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/net-tools-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)](https://nodei.co/npm/iobroker.net-tools/)

**Tests:** ![Test and Release](https://github.com/jey-cee/ioBroker.net-tools/workflows/Test%20and%20Release/badge.svg)

## net-tools adapter for ioBroker

This adapter cyclic polls configured IPs, can send wake-on-lan packages and scan for open ports.

This discovery feature is provided by discovery adapter, which means discovery will be installed if is not and it has to run.
Remark: This feature is limited to the subnet of the ioBroker host.

### Important: You have to buy a license to use this adapter. You can buy one here -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/
### Wichtig: Für die Nutzung dieses Adapters müssen Sie eine Lizenz erwerben. Sie können eine hier kaufen -> https://www.all-smart.net/produkt/iobroker-net-tools-v1-lizenz/

### Auto discovery

There is automatic search feature to find devices. It is also possible to execute it scheduled.
Note: If you are using ioBroker within a docker container this feature will not work depending on your network configuration.

### Pings configured IP addresses

Pings specified IP addresses in defined interval and monitors the results. (alive, rps, time)
The ping interval can be specified on device level.

### Wake-on-LAN

Set the wol object to true and 3 WOL packages are sent, with a pause of 750ms, to your device.

### Port scan

You can enter a list of ports or an range in config that should be scanned by default. If this field is empty the range 0-65535 will be taken as default.
It is also possible to specify a list or range for every device which will be used for a single scan.

Enter a list or range of ports in object portList, if you want. This overwrites the setting in config.
Set scan to true, this will scan for all open ports in the range of 0-65535 or what is defined in portList. This process takes a while.
The result will be written to object ports.

---

### iPhone 

iPhones try to protect users against tracking while changing the mac address. 
Read more about it and how to disable for private networks: https://support.apple.com/en-us/102509

---

## For Developers

#### Get mac for specific device

`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

Remark: This feature is limited to the subnet of the ioBroker host.

#### Ping specific IP address

`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### Wake-on-LAN

`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.0.6 04.03.2024
* (Jey Cee) Reduce system load during discovery process to prevent adapter crash

### 1.0.5 04.02.2024
* (Jey Cee) remove discovery adapter as dependency
* (Jey Cee) add possibility to choose the interface which will be used for ping operations
* (Jey Cee) add possibility to enter IP range for device discovery
* (Jey Cee) add auto search by configurable schedule
* (Jey Cee) fix/catch crash if device was deleted in objects and not in device management
* (Jey Cee) fix ping rights on lxc containers which prevent to ping devices

### 1.0.2 20.01.2024
* (Jey Cee) bugfix require

### 1.0.1 19.01.2024
* (Jey Cee) add device manager to configuration
* (Jey Cee) add use of license

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2024 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).