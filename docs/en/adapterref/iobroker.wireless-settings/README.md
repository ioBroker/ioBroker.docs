![Logo](admin/wireless-settings.png)

# ioBroker.wireless-settings

[![NPM version](http://img.shields.io/npm/v/iobroker.telemetry.svg)](https://www.npmjs.com/package/iobroker.wireless-settings)
[![Downloads](https://img.shields.io/npm/dm/iobroker.telemetry.svg)](https://www.npmjs.com/package/iobroker.wireless-settings)
![Number of Installations (latest)](http://iobroker.live/badges/wireless-settings-installed.svg)
![Number of Installations (stable)](http://iobroker.live/badges/wireless-settings-stable.svg)
[![Dependency Status](https://img.shields.io/david/ioBroker/iobroker.wireless-settings.svg)](https://david-dm.org/ioBroker/iobroker.wireless-settings)
[![Known Vulnerabilities](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings/badge.svg)](https://snyk.io/test/github/ioBroker/ioBroker.wireless-settings)

[![NPM](https://nodei.co/npm/iobroker.telemetry.png?downloads=true)](https://nodei.co/npm/iobroker.wireless-settings/)

## Adapter for Wi-Fi and Ethernet settings on Raspberry Pi / Linux

This fork can configure network interfaces managed by NetworkManager.

### Supported functions

- Connect and disconnect Wi-Fi networks
- Show current interface information (IPv4/IPv6, gateway, DNS)
- Change Ethernet IPv4 settings
- Change IPv4 settings of active Wi-Fi profiles
- Switch between DHCP and static IPv4 configuration
- Configure subnet mask/prefix, gateway and DNS servers

**Tested logic is based on `nmcli` / NetworkManager.**

## Required permissions

This adapter assumes that the `iobroker` user may execute the following command:

- `/usr/bin/nmcli`

You can add the rights by calling:

```shell
sudo chmod +x /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
sudo /opt/iobroker/node_modules/iobroker.wireless-settings/wlan_rights.sh
```

## Notes

- Applying new network settings can briefly interrupt the current Admin connection.
- When the device IP changes, reopen ioBroker Admin with the new address.
- For Ethernet interfaces without an existing profile, the adapter creates a dedicated NetworkManager profile automatically.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog
### 1.2.2 (2026-04-19)

- Detect docker

### 1.2.1 (2026-04-19)

- Added editable Ethernet and IPv4 settings in the Admin UI
- Added DHCP/static IPv4 switching with subnet, gateway and DNS handling
- Improved command execution by using argument-based process calls instead of raw shell strings
- Migrated GUI to vite

### 1.0.2 (2024-10-04)

- (@GermanBluefox) Updated for raspberry 5
- (@GermanBluefox) Change name to "wireless-settings"

### 0.4.0 (2024-10-03)

- (@GermanBluefox) Change name to "network-settings"

### 0.3.0 (2023-06-27)

- (@GermanBluefox) Change name to "network-settings"

### 0.2.2 (2023-06-27)

- (@GermanBluefox) Updated the GUI to the latest version

### 0.1.0 (2021-01-18)

- (ioBroker) fixed build scripts

### 0.0.1 (2021-01-18)

- (ioBroker) initial release

## License

MIT License

Copyright (c) 2021-2026 @GermanBluefox <dogafox@gmail.com>

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
