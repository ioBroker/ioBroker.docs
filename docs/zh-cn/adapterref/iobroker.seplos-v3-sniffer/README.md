---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.seplos-v3-sniffer/README.md
title: ioBroker.seplos-v3-嗅探器
hash: snOYxX39iBN2/nEN5uJR+Z0bTgu5GGF46xmmOhASu7w=
---
![标识](../../../en/adapterref/iobroker.seplos-v3-sniffer/admin/seplos-v3-sniffer.jpg)

![NPM 版本](https://img.shields.io/npm/v/iobroker.seplos-v3-sniffer.svg)
![下载](https://img.shields.io/npm/dm/iobroker.seplos-v3-sniffer.svg)
![安装数量](https://iobroker.live/badges/seplos-v3-sniffer-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/seplos-v3-sniffer-stable.svg)
![新平台](https://nodei.co/npm/iobroker.seplos-v3-sniffer.png?downloads=true)

# IoBroker.seplos-v3-嗅探器
**测试：**![测试与发布](https://github.com/DpunktS/ioBroker.seplos-v3-sniffer/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 seplos-v3-sniffer 适配器
[www.seplos.com](https://www.seplos.com/)

该适配器专为读取多包配置中的 Seplos V3 BMS 而开发。在 V3 代中，第一个 BMS 充当 Modbus 主设备，而所有其他 BMS 充当从设备。在这种配置中，不再可能从第三个设备通过 Modbus 访问 BMS，因为 RS-485 Modbus 系统中不能存在两个主设备。适配器被动检测设备之间的通信，这意味着单个 BMS 的通信不会中断。它可以通过本地接口（例如 /dec/ttyS0）或 Ser2Net（tcp://ip:2001）进行通信。

适配器自动检测可用设备的数量并创建相应的数据点。BMS 每 200 毫秒传输一组新数据集。更新间隔可以在适配器的配置页面上调整（默认值：5 秒）。

![塞普洛斯 4x](https://github.com/user-attachments/assets/9d710287-069d-44b6-acda-e96764642a33)

要建立连接，必须将引脚 1/8 (B)、2/7 (A) 和 5 (GND) 连接到 RS485 适配器。可以使用各种 RS485 适配器，例如 RS485 转 USB 或 RS485 转 TTL。重要的是检查系统如何检测相应的适配器，并在“串行适配器”中相应地输入接口（例如 /dev/ttyUSB0 或 /dev/ttyS0）。如果使用 Ser2Net，则应输入地址 tcp://ip:2001。必须配置 Ser2Net 服务器以提供 RAW 格式的数据。一种简单的方法是使用带有 ESPHome 的 ESP8266/ESP32（参见下面的示例）。

在我的测试中，我发现适配器中的 120 欧姆终端电阻是不必要的。原装 Seplos V3 USB 适配器中也没有终端电阻。如果只读取一个 BMS，则需要将引脚 6 (B) 连接到引脚 5 (GND)，以便主控可以独立发送数据。

![引脚排列](https://github.com/user-attachments/assets/1c8ec271-d20f-4a5d-baf4-87e5a98fc35a)

使用 ESPHome 测试了 Ser2Net 连接。

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

当前已读出以下数据点：

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

Copyright (c) 2025 DpunktS <dpunkts@online.de>

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