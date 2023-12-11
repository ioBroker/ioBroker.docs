![](admin/synology.png)

## Table of Contents

-   [Introduction](#Introduction)
-   [Usage](#Usage)
-   [Revision History](#Revision-History)

<a name="Introduction"></a>

## Introduction

This is an iobroker adapter to connect to [Synology](https://www.synology.com/) routers. The adapter uses the Synology API to get the data. The adapter is tested with the SRM version 1.3.1. and router model RT6600 but should work with other models as well.

Thanks to 

* [Nocilas](https://github.com/nioc) who provider the connector for the Synology API.
* The countless iobroker adapters that I used as a template, especially [asuswrt](https://github.com/mcdhrts/ioBroker.asuswrt).

<a name="Requirements"></a>

## Usage

### Installation
Create a new instance of the adapter and enter the IP address of your router. The port is 8001 by default. Enter user name and password of your router. Make sure that the user is not using 2FA.

### Objects
The adapter creates the following objects:

## router
* IPV4_IP: IP4 address of the router
* IPV4_status: Status of the IPV4 connection
* IPV6_IP: IP6 address of the router
* IPV6_status: Status of the IPV4 connection

## devices
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

## info
* connection: Status of the connection to the router

## mesh
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

### Sentry

What is Sentry.io and what is reported to the servers of that company? `Sentry.io` is a service for developers to get an overview about errors from their applications. And exactly this is implemented in this adapter.

When the adapter crashes or another Code error happens, this error message that also appears in the ioBroker log is submitted to Sentry. When you allowed iobroker GmbH to collect diagnostic data then also your installation ID (this is just a unique ID **without** any additional infos about you, email, name or such) is included. This allows Sentry to group errors and show how many unique users are affected by such an error. 

<a name="Revision-History"></a>

## Changelog
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

Copyright (c) 2023 stephan stricker <stephan.stricker@outlook.com>

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