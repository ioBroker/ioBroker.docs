---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: QgSorar90YOR3L8BE7JFLzk83P00C1JwBN96wkFsamA=
---
![标识](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![安装数量（最新）](https://iobroker.live/badges/ems-esp-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ems-esp-stable.svg)
![依赖状态](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![新PM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**测试：** ![测试和发布](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## Ems-esp 和 km200 / IP-inside 适配器
该适配器支持使用 EMS 或 EMS+ 总线连接到 Bosch Group 供暖系统的接口。
（布德鲁斯 / 容克斯 / Netfit 等）。

它可以通过使用 Web-API 调用来连接供暖系统：

* km200、km100、km50 或 IP-inside（来自博世集团）
* 具有最新开发版本（见下文）和 ESP32 芯片的 ems-esp 接口（https://github.com/emsesp/EMS-ESP32）。旧的 ESP8266 网关也得到部分支持。

ems-esp 适配器可以读取和写入数据到 ems 总线，以控制所有加热组件。
它可以用于原始的 Bosch-group 网关或 ems-esp 或两者并行使用。

该适配器已针对具有最新固件版本 ESP32 >= v3.3.0 的 ems-esp 网关进行测试。
带有 ESP 8266 的旧系统不再受到官方支持，但可能仍然有效。

EMS-ESP 中的重要设置：

* API V2：MQTT 设置必须是布尔格式 1/0 ！
* API V3：布尔格式的格式化选项必须是 1/0 和枚举格式编号
* 必须启用 ems-esp 中的启用 API 写入命令设置
* 必须设置 API 调用的绕过访问令牌授权或输入令牌。

选择复选框时，类似 km200 的设备结构用于 ems-esp 数据字段或保留原始 EMS-ESP 设备视图：锅炉、恒温器、混合器等。并行使用 km200 网关时，建议使用 km200 数据结构体。然后所有实体/状态都在 ioBroker 的对象结构中的同一位置。

与 km200 适配器不同，要使用的字段可以由适配器实例参数中的相应 csv 文件定义。对于第一个适配器启动，建议使用“*”，因此选择所有 km200 数据字段。然后适配器在 ../iobroker-data/ems-esp/{instance} 目录中创建一个 km200.csv 文件。该文件可用于适配器实例的下一次启动。可以删除不需要的行（字段）以减少要读取的 km200 字段的数量。 （复制一份）

该适配器通过 http get 请求从 ems-esp 和 km200 读取起始值，并且能够订阅状态更改并将相应的 http（post）命令发送回 ems-esp 硬件或 km200 网关。

* EMS-ESP 读取轮询是一个参数（标准 60 秒），不能低于 15 秒。
* KM200轮询也是一个参数（标准300秒），可以设置的最小值是90秒。

大多数现代供暖系统都有一个 ip-inside 网关并支持能源统计：

* 记录总耗电量和温水 (dhw)
* 对于这些系统以及该数据可用的情况，可以读取总耗电量和温水耗电量的耗电量统计数据（每小时/每天/每月）。
* 必须启用复选框记录并且必须定义数据库实例（mySQL 或 InfluxDB）。

SQL 或 InfluxDB 历史适配器需要安装并激活才能使用此选项。

* 这仅针对 mySQL 和 InfluxDB 数据库进行了测试
* 对于 InfluxDB < V2，保留策略必须设置为至少 170 周。
*（在 iobroker 持续时间 170w 上更改全局保留政策；）

然后，此适配器创建相应的记录状态，启用 sql 统计信息并使用 sql 命令写入历史数据库条目并更新记录。更新频率是每小时一次。然后可以使用图表工具显示这些值，例如Flot Charts 适配器或 Grafana。

可以启用锅炉统计显示：

* ems-esp 和/或 km200 网关读取和状态处理的轮询周期处理时间
* 每小时 / 24 小时锅炉和 ww 启动次数
* 锅炉每小时利用率 (0-100%)。

如果参数被填充，则可以计算锅炉效率。

* 锅炉效率可根据平均锅炉温度计算：（锅炉温度+回水温度）/2。
* 由于在 km200 中不再提供返回温度，当没有可用的 ems-esp 时，返回温度以锅炉温度 -10 °C 计算。
* 查看您的锅炉的数据表以相应地调整效率表。
* 需要一个数据库实例（见上文）来计算统计信息。

每当新的 EMS-ESP 固件添加新数据字段和/或更改数据字段名称时，它们都会在适配器运行期间进行处理。然而，适配器不会自动删除过时的数据字段。
可以选择通过在适配器重新启动时删除状态来重新构建状态结构（保留具有历史记录/数据库条目的状态）

#iobroker.ems-esp"

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.9 (2022-01-27)
* New code to avoid mysql duplicate key errors
* Further adjustments for ems firmware 3.4

### 1.0.8 (2022-01-24)
* Adjustments for ems-esp firmware 3.4 part 2

### 1.0.7 (2022-01-24)
* Adjustments for ems-esp firmware 3.4

### 1.0.6 (2022-01-21) 
* Adjustments for non-UTF-8 json data from ems-esp
* Recalculate km200 recordings based on actual no of samples vs. theroretical max. samples

### 1.0.5
* first stable version for ioBroker repository

### 1.0.4
* Prepare for ioBroker repository

### 1.0.3
* Corrections within statistics module

### 1.0.2
* Corrections on km200 energy consumptions

### 1.0.1 
* prepare for compact-mode, re-write code

### 0.9.8 and 0.9.9
* Supporting Dallas Sensors on ems-esp gateway

### 0.9.7
* Fixes for IP-adresses

### 0.9.6
* Corrections for writing switchpoints and array-data back to km200

### 0.9.5
* Corrections for different enum-formats in API V3 (text and numbers)

### 0.9.4
* Support for old ESP8266 EMS-ESP gateways and API V2 and new ESP32 with API V3

### 0.9.3
* Polling time for EMS-ESP and KM200 is now a parameter

### 0.9.2
* Adjust for enum formats

### 0.9.1
* Adjust for different boolean formats

### 0.9.0
* Rework Adapter for some statistics and prepare for heating control (under development)

### 0.8.0
* REST API V3 and js-controller v3.3.x and support of influxdb for recordings

## License
MIT License

Copyright (c) 2022 Thomas Petrick <tp1degit@gmail.com>

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
SOFTWARE."