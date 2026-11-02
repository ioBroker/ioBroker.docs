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

#### Latency and packet loss

Each ping sends several packets (setting "Packets per ping" of the device, default 4, maximum 20). From the answers net-tools calculates:

| State | Meaning |
|---|---|
| `ping` | Round trip time of the last answer (ms) |
| `pingMin` / `pingMax` / `pingAvg` | Minimum / maximum / average round trip time of the ping (ms) |
| `packetLoss` | Lost packets of the ping in percent |

Without any answer the times are `null` and `packetLoss` is 100. Each ping takes about one second per packet.

#### Extended detection (smartphones)

Smartphones like iPhones often do not answer pings while sleeping and would be shown as offline.
Enable "Extended detection (smartphones)" in the settings of the device (device manager). If the device does not answer the ping,
net-tools sends a UDP packet to port 5353 and tries a TCP connection to port 62078, which wakes up the WLAN of the device,
and then checks whether the device answers ARP with its MAC address. No root rights and no additional tools (like hping3) are needed.

- Works only for devices in the subnet of the ioBroker host (ARP does not pass routers).
- On Linux the state of the ARP entry is checked (`ip neigh`), so outdated entries are not counted. On other systems the ARP table is used, which may show a device as present for some time after it left.
- iPhone: set "Private Wi-Fi Address" for your home network to "Fixed" or "Off". With "Rotating" the MAC address changes and the device can no longer be detected.

#### Service monitoring (TCP ping)

In the settings of a device (device manager) you can add services in the table "Services (TCP ports)". Each entry has its own settings:

| Column | Meaning |
|---|---|
| Port | TCP port of the service, e.g. `80`, `443`, `1883` |
| Interval (s) | How often the port is checked. Empty = ping interval of the device, minimum 5 s |
| Tolerance (failures) | Number of failed checks in a row that are ignored before the service is shown as not reachable. `0` = immediately |

net-tools tries to establish a TCP connection to the port (timeout 2 s), independent of the ping result.
The state `net-tools.X.<device>.services.port_<port>` is `true` if the connection was established and `false` after more than "Tolerance" failed checks in a row.
States of ports that are removed from the table are deleted. Changes take effect immediately.

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

The command `'wol'` works as well. Returns `true` if the packets were sent.

#### Port scan

`sendToAsync('net-tools.x', 'portScan', { ip: 'IP ADDRESS', ports: '22,80,443' })`

`ports` is optional, without it the port list from the adapter settings is used. Returns `{ host, ports: [open ports], error? }`.

#### Blockly

The adapter provides Blockly blocks in the "SendTo" category of the JavaScript adapter:

- **Ping (net-tools)** – pings an IP address or host name
- **Port scan (net-tools)** – scans the ports of an IP address or host name
- **Wake-on-LAN (net-tools)** – sends Wake-on-LAN packets to a MAC address
- **net-tools device** – selects a device found by net-tools and returns its IP or MAC address. Can be plugged into the IP/MAC inputs of the blocks above. The IP is read when the script runs, so IP changes are taken into account.
- **net-tools result** – returns reachable, response time, open ports, host or error of the surrounding ping or port scan block. Use it only inside "then" of these blocks.

---

## Changelog
### 1.3.0 (2026-10-11)
- (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (Jey Cee) Migrate from oui to oui-data
- (Jey Cee) Add port scan action to device management
- (Jey Cee) Show IP address and open ports in device details
- (Jey Cee) Create quicklinks for web ports found by port scan
- (Jey Cee) Call ping.exe directly on Windows instead of using process.env (compact mode)
- (Jey Cee) Update @all-smart/all-smart-tools to 1.0.16
- (Jey Cee) Fix adapter crash when port scan runs on an offline device (#63)
- (Jey Cee) Use default port list if port list in configuration is missing or empty
- (Jey Cee) Fix sendTo commands (wake/wol, ping, getMac, addDevice, deleteDevice, updateDevice) being ignored (#71)
- (Jey Cee) Fix "Wake-on-LAN with IP" sending packets to localhost (#71)
- (Jey Cee) Wake-on-LAN: also send to the broadcast address of the device subnet, log sent packets, no endless retries on errors
- (Jey Cee) Add sendTo command portScan
- (Jey Cee) Add Blockly blocks for ping, port scan and Wake-on-LAN
- (Jey Cee) Add Blockly block to select a device found by net-tools
- (Jey Cee) Add extended detection for devices that do not answer pings while sleeping (e.g. iPhone)
- (Jey Cee) Fix changed device settings (Wake-on-LAN with IP) not being applied until restart
- (Jey Cee) Add service monitoring via TCP ping for multiple ports per device, with interval and tolerance per port
- (Jey Cee) Device settings dialog uses the available width (multi-column layout)
- (Jey Cee) Add latency (ping, min, max, avg) and packet loss per device, with configurable packets per ping
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 1.2.3 (2025-11-09)
* Change link to license

### 1.2.2 (2025-11-09)
* Fix ip and mac check while add manual new device

### 1.2.1 (2025-11-09)
* Refactor port scan

### 1.2.0 (2025-06-11)
* Added network interface information for localhost to device manager

## License
Attribution-NonCommercial 4.0 (CC BY-NC 4.0)

Copyright (c) 2025-2026 Jey Cee <iobroker@all-smart.net>

http://creativecommons.org/licenses/by-nc/4.0/

The complete license text can be found in the [LICENSE](https://github.com/Jey-Cee/ioBroker.net-tools/blob/master/LICENSE) file.

Short content:
Licensees may copy, distribute, display and perform the work and make derivative works based on it only if they give the author or licensor the credits in the manner specified by these.
Licensees may copy, distribute, display, and perform the work and make derivative works based on it only for noncommercial purposes.
(Free for non-commercial use).