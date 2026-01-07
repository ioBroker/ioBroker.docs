![Logo](admin/seplos-v3-sniffer.jpg)
# ioBroker.seplos-v3-sniffer

[![NPM version](https://img.shields.io/npm/v/iobroker.seplos-v3-sniffer.svg)](https://www.npmjs.com/package/iobroker.seplos-v3-sniffer)
[![Downloads](https://img.shields.io/npm/dm/iobroker.seplos-v3-sniffer.svg)](https://www.npmjs.com/package/iobroker.seplos-v3-sniffer)
![Number of Installations](https://iobroker.live/badges/seplos-v3-sniffer-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/seplos-v3-sniffer-stable.svg)

[![NPM](https://nodei.co/npm/iobroker.seplos-v3-sniffer.png?downloads=true)](https://nodei.co/npm/iobroker.seplos-v3-sniffer/)

**Tests:** ![Test and Release](https://github.com/DpunktS/ioBroker.seplos-v3-sniffer/workflows/Test%20and%20Release/badge.svg)

## seplos-v3-sniffer adapter for ioBroker

[www.seplos.com](https://www.seplos.com/)

This adapter was developed to read the Seplos V3 BMS in a multipack configuration. In the V3 generation, the first BMS acts as the Modbus master, while all other BMS act as slaves. In this configuration, it is no longer possible to access the BMS via Modbus from a third device, since two master devices cannot exist in an RS-485 Modbus system. The adapter passively detects the communication between the devices, which means that the communication of the individual BMS is not disrupted. It can communicate either via a local interface (e.g. /dec/ttyS0) or via Ser2Net (tcp://ip:2001).

The adapter automatically detects the number of available devices and creates the corresponding data points. The BMS transmits a new data set every 200 ms. The update interval can be adjusted on the adapter's configuration page (default value: 5 seconds).

![seplos 4x](https://github.com/user-attachments/assets/9d710287-069d-44b6-acda-e96764642a33)

To establish a connection, pins 1/8 (B), 2/7 (A) and 5 (GND) must be connected to the RS485 adapter. Various RS485 adapters can be used, such as RS485 to USB or RS485 to TTL. It is important to check how the system has detected the respective adapter and enter the interface accordingly in "serial adapter" (e.g. /dev/ttyUSB0 or ​​/dev/ttyS0). If Ser2Net is used, the address tcp://ip:2001 should be entered. The Ser2Net server must be configured to provide the data in RAW format. An easy way is to use an ESP8266/ESP32 with ESPHome (see my example below).

In my tests, I found that the 120 ohm terminator in the adapter is not necessary. There is also no terminator in the original Seplos V3 USB adapter. If only one BMS is to be read, it is necessary to connect pin 6 (B) to pin 5 (GND) so that the master can send data independently.

![pinout](https://github.com/user-attachments/assets/1c8ec271-d20f-4a5d-baf4-87e5a98fc35a)

The Ser2Net connection was tested with ESPHome.
```
external_components:
  - source: github://oxan/esphome-stream-server

uart:
- id: seplos
  tx_pin: GPIO17
  rx_pin: GPIO16
  baud_rate: 19200
  rx_buffer_size: 2048

stream_server:
   uart_id: seplos
   port: 2001
   buffer_size: 2048
```

The following data points are currently read out:
```
pack_voltage
current
remaining_capacity
total_capacity
total_discharge_capacity
soc
soh
cycle_count
average_cell_voltage
average_cell_temp
max_cell_voltage
min_cell_voltage
max_cell_temp
min_cell_temp
maxdiscurt
maxchgcurt
cell_1_voltage
cell_2_voltage
cell_3_voltage
cell_4_voltage
cell_5_voltage
cell_6_voltage
cell_7_voltage
cell_8_voltage
cell_9_voltage
cell_10_voltage
cell_11_voltage
cell_12_voltage
cell_13_voltage
cell_14_voltage
cell_15_voltage
cell_16_voltage
cell_temp_1
cell_temp_2
cell_temp_3
cell_temp_4
case_temp
power_temp
system_status
active_balancing_cells
cell_temperature_alarms
cell_voltage_alarms
FET_status
active_alarms
active_protections
```

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (DpunktS) Node.js >= 20

### 0.1.1 (2025-02-28)
* (DpunktS) bugfix

### 0.1.0 (2025-02-25)
* (DpunktS) infos, alarms and protections messages added

### 0.0.8 (2025-02-22)
* (DpunktS) ioBroker repository checker bugfix

### 0.0.7 (2025-02-19)
* (DpunktS) ioBroker repository checker Issues #9 fix

### 0.0.6 (2025-02-13)
* (DpunktS) adapter-dev 1.0.1 > 1.3.0

### 0.0.5 (2025-02-12)
* (DpunktS) connections status added

### 0.0.4 (2025-02-12)
* (DpunktS) bugfix

### 0.0.3 (2025-02-12)
* (DpunktS) bugfix

### 0.0.2 (2025-02-12)
* (DpunktS) npm release

### 0.0.1 (2025-01-11)
* (DpunktS) initial release

## License
MIT License

Copyright (c) 2025-2026 DpunktS <dpunkts@online.de>

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
