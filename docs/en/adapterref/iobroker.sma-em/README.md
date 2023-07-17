---
BADGE-Number of Installations: http://iobroker.live/badges/sma-em-installed.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.sma-em.svg
BADGE-Stable version: http://iobroker.live/badges/sma-em-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.sma-em.svg
BADGE-NPM: https://nodei.co/npm/iobroker.sma-em.png?downloads=true
---
# SMA Energy Meter Adapter documentation

## General information

The SMA Energy Meter Adapter receives multicast datagrams from the Energy Meter or the Sunny Home Manager. These send data packets with their measurement data into the network every second or more often. The transmission interval of 200ms, 600ms or 1000ms can be set in Sunny Portal.

## Administration / Admin page

![Adapter_admin_config](img/adminpage1-en.png)

- Tab Multicast Settings
  - Multicast IP: The default setting and predefined by SMA is the IP address 239.12.255.254.
  - Multicast Port: The default setting and predefined by SMA is the UDP port 9522.
  - Own Network Interface IPs: Select box showing all available Network Interface IPv4s on ioBroker Server. Select the Network Interface IP to listen for Multicasts from this box.
  - Selected Network Interface IP: Currently selected Network Interface IP listening for Multicast messages. IP 0.0.0.0 means that the adapter listens on all available Network Interfaces.

![Adapter_admin_config2](img/adminpage2-en.png)

- Tab Options
  - Extended Mode: Provides more detailed information such as reactive power, apparent power, cosphi, voltages, amperage etc. This setting is disabled by default.
  - Details L1 - L3: These selection points can be used to display details of each phase.
  - Real-time update interval: The update interval for real-time data such as instantaneous power or grid frequency is set here. This serves to reduce the system load. Example: With a data packet rate of 5/s (200ms transmission interval), all values are summed up during a real-time update interval of one second and only at the end of the interval is the mean value or the median for frequency and phase updated in the corresponding ioBroker data point.
  - Non-real-time update interval: The update interval for non-real-time data such as meter readings is set here. Here the last received value is updated in the corresponding ioBroker data point only at the end of the interval.

## Folder structure / objects

![Adapter_overview](img/overview-en.png)

After installing and starting the adapter, the folder structure shown in the picture is created. The entire data of the Energy Meter is located in the root folder. If they have been configured, the values of the individual phases are located in the subfolders L1-L3.
If there are several Energy Meters or Sunny Home Managers in the network, the object folders for each device are created in the same sma-em instance.

## Explanation of object IDs

The letters p, q and s are derived from electrical engineering and represent:

- P - Active power
- Q - Reactive power
- S - Apparent power

- The word "regard" here means "consumption". (power received from the grid)
- The word "surplus" here means "feed-in". (power fed into the grid)
- The word "counter" here means "energy meter".

From this, the object names are put together, e.g.

- pregard - active power received from the grid
- psurplus - active power fed into the grid
- pregardcounter - energy meter for the active power received from the grid
- qregard - reactive power received from the grid
- ...

## Changelog

### __WORK IN PROGRESS__

- (pdbjjens) New: Selectable own network device IP (single or all) to listen for multicast messages
- (ticaki) Fix: Catch interface errors
- (pdbjjens) New: Detect SMA-EM1.0 SUSy270

### 0.7.0 (2023-03-14)

- (pdbjjens) New: Configurable data point update intervals to reduce system load
- (pdbjjens) New: Use JSON config

### 0.6.6 (2023-02-28)  2023 maintenance release

- (pdbjjens) Updated dependencies
- (pdbjjens) New: Use adapter-dev instead of gulp translate

### 0.6.5 (2022-02-19)

- Updated dependencies
- Compatibility check for js-controller 4.0
- Prevent onUnload warnings

### 0.6.4 (2021-08-19)

- (TGuybrush) Bug fixes
- Prevent warnings regarding non-existent objects upon adapter instance creation and start-up under js-controller 3.2.x
- Improved check of SMA Energy Meter multicast messages to prevent ghost devices and warnings regarding unknown OBIS values.

### 0.6.3 (2021-03-04)

- (TGuybrush) The adapter binds now to all external IPv4 addresses.

## License

The MIT License (MIT)

Copyright (c) 2023 IoBroker-Community

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