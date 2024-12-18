![Logo](admin/synology.png)

# ioBroker Synology Router Manager Adapter

![Number of Installations](http://iobroker.live/badges/srm.svg)
![Number of Installations](http://iobroker.live/badges/srm.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.srm.svg)](https://www.npmjs.com/package/iobroker.srm)

![Test and Release](https://github.com/iobroker-community-adapters/iobroker.srm/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/srm/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.srm.svg)](https://www.npmjs.com/package/iobroker.srm)

## Description

This is an iobroker adapter to connect to [Synology](https://www.synology.com/) routers. The adapter uses the Synology API to get the data. The adapter is tested with the SRM version 1.3.1. and router model RT6600 but should work with other models as well.

## Usage

### Installation
Create a new instance of the adapter and enter the IP address of your router. The port is 8001 by default. Enter user name and password of your router. Make sure that the user is not using 2FA.

### Objects
The adapter creates the following objects:

#### router
* IPV4_IP: IP4 address of the router
* IPV4_status: Status of the IPV4 connection
* IPV6_IP: IP6 address of the router
* IPV6_status: Status of the IPV4 connection

#### devices
JSON table for the following device states:

* all: All known devices
* mesh: All mesh devices
* online: All online devices
* online_ethernet: All online devices connected via ethernet
* online wifi: All online devices connected via wifi

Each JSON table has the following objects for each device:

* connection: Connection type (Eternet, Wifi)
* dev_type: Device type (Computer, Mobile, etc.)
* hostname: Hostname of the device
* ip6_addr: IP6 address of the device
* ip_addr: IP4 address of the device
* is_banned: Is the device banned
* is_beamforming_on: Is beamforming enabled
* is_high_qos_on: Is high QOS enabled
* is_low_qos_on: Is low QOS enabled
* is_manual_device_type: Is the device type manually set
* is_manual_hostname: Is the hostname manually set
* is_online: Is the device online
* is_qos_on: Is QOS enabled
* is_wireless: Is the device connected via wifi
* mac: MAC address of the device
* mesh_node_id: ID of the mesh node
* mesh_node_name: Name of the mesh node

#### info
* connection: Status of the connection to the router

#### mesh
List of mesh nodes. Each mesh nodes has the following objects:

* band: Uplink band
* connected_devices: Number of connected devices
* current_tx_rate: Current transmission rate
* current_rx_rate: Current reception rate
* name: Name of the mesh node
* network_status: Status of the network
* node_id: ID of the mesh node
* node_status: Status of the mesh node
* parent_node_id: ID of the parent node
* signal_strength: Signal strength

#### wifi
List of wifi networks and settings. Wifi settings can only be changed every 3s to avoid conflicting changes. Each mesh nodes has the following objects:

* enable: Enable the wifi network (read/write)
* enable_client_isolation: Enable client isolation (read/write)
* hide_ssid: Hide the WIFI SSID (read/write)
* mac_filter: Enable MAC filter (read)
* schedule_enable: Enable schedule for network (read/write)


## Credits

This adapter would not have been possible without the great work of @stephan1827 (https://github.com/stephan18277), who developed the original releases of this adapter.  

Thanks to 

* [Nocilas](https://github.com/nioc) who provider the connector for the Synology API.
* The countless iobroker adapters that I used as a template, especially [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
## Changelog
### 1.0.0 (2024-12-12)
- (mcm1957) Adapter has been moved into iobroker-community-adapters organization
- (mcm1957) Adapter requires node.js 20 now.
- (mcm1957) Adapter requires js-controller 5 and admin 6 now.
- (mcm1957) Dependencies have been updated.

### 0.2.0 (2023-12-27)
- Added new section for WIFI settings. Some settings can be changed via the adapter.
- Account for different API versions

### 0.1.6 (2023-12-26)
- Account for different API versions

### 0.1.5 (2023-12-10)
- minor bug fixes

### 0.1.3 (2023-12-06)
- minor bug fixes

### 0.1.2 (2023-12-05)
- minor bug fixes

### 0.1.1 (2023-12-05)

- enabled NPM deployment

### 0.1.0 (2023-12-05)

- first public release

### Version 0.0.1

- initial release

## License
MIT License

Copyright (c) 2024 stephan stricker <stephan.stricker@outlook.com>

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
