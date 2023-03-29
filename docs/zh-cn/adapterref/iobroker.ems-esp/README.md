---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ems-esp/README.md
title: ioBroker.ems-esp
hash: Ft42eUkODbXzui6lWz8gv5B+qZ4u1CNzC9GfXTBVTaw=
---
![标识](../../../en/adapterref/iobroker.ems-esp/admin/ems-esp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.ems-esp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ems-esp.svg)
![安装数量（最新）](https://iobroker.live/badges/ems-esp-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/ems-esp-stable.svg)
![依赖状态](https://img.shields.io/david/tp1de/iobroker.ems-esp.svg)
![NPM](https://nodei.co/npm/iobroker.ems-esp.png?downloads=true)

# IoBroker.ems-esp
**测试：** ![测试和发布](https://github.com/tp1de/ioBroker.ems-esp/workflows/Test%20and%20Release/badge.svg)

## 带有 km200 / IP-inside 和/或 ems-esp 接口的 Bosch / Buderus 加热系统
该适配器支持使用 EMS 或 EMS+ 总线连接博世集团供暖系统的接口。
（Buderus / Junkers / Netfit 等）。

## 它可以通过使用 Web-API 调用来连接加热系统：
* km200、km200 hrv、km100、km50、HMC300 或 IP-inside（来自博世集团）
* ems-esp 接口 (https://github.com/emsesp/EMS-ESP32) 具有最新的开发版本（见下文）和 ESP32 芯片。

* 不再支持带有 API V2 的旧 ESP8266 网关！！

ems-esp 适配器可以向两个网关读取和写入数据，以控制所有加热组件。
它可以用于原始的博世集团网关或 ems-esp 或同时用于两者。

该适配器已针对 ESP32 >= v3.4.0 最新固件版本的 ems-esp 网关进行测试。

## EMS-ESP 中的重要设置：
* 布尔格式的格式选项必须为 1/0，而枚举格式值/数字的格式选项必须为 1/0。
* 必须启用 ems-esp 中的启用 API 写入命令设置
* 必须设置 API 调用的绕过访问令牌授权或必须输入令牌。

选中复选框时，ems-esp 数据字段使用类似 km200 的设备结构或保留原始 EMS-ESP 设备视图：锅炉、恒温器、搅拌器等。并行使用 km200 网关时，建议使用 km200 数据结构。然后所有实体/状态都在 ioBroker 的对象结构中的相同位置。

## 轮询
此适配器通过 http get 请求从 ems-esp 和 km200 读取起始值，并能够订阅状态更改并将相应的 http（post）命令发送回 ems-esp 硬件或 km200 网关。

* EMS-ESP 读取轮询是一个参数（标准 60 秒），不能设置低于 15 秒。
* KM200 轮询也是一个参数（标准 300 秒），可设置的最小值为 90 秒。
* km200 记录（能耗和温度统计）每小时更新一次

## 公里200
向/从 km200 网关的 web-api 调用是加密的。对于加密/解密，需要两个密码：

* 网关标签上的网关密码格式为：xxxx-xxxx-xxxx-xxxx（区分大小写）
* 使用 Buderus **MyDevice** 应用程序设置的私人密码（请勿使用 myBuderus 或类似应用程序！）

要使用的字段可以通过轮询 km200 结构 (*) 或适配器实例参数中的相应 csv 文件来定义。

对于第一个适配器启动，建议使用“*”来选择所有 km200 数据字段。
然后，适配器在 ../iobroker-data/ems-esp/{instance} 目录中创建一个 km200.csv 文件。

该文件可用于下次启动适配器实例。
可以删除不需要的行（字段）以减少要读取的 km200 字段的数量。 （制作副本并重命名文件）

## Km200记录（能量和温度统计）
大多数现代供暖系统都有一个 ip-inside 网关并支持能源统计：

* 记录功耗和温度统计
* 对于这些系统以及此记录数据可用的地方，相应的统计数据将被轮询并存储在状态中。

可用的是每小时、每天和每月的统计数据，并以数组数据的形式存储在状态中，如果选择了数据库实例，也会在充满数据库条目的状态中存储。（状态名称以“_”开头）

* 必须启用复选框记录并且必须定义数据库实例（mySQL 或 InfluxDB）。 SQL 或 InfluxDB History 适配器需要安装并处于活动状态才能使用此选项。
* web-api调用读取的原始录音数据存储在状态结构km200下。
* 在 flot graphs 或 grafana 中显示的 DB 统计数据仅适用于 mySQL 和 InfluxDB 数据库。
* 对于 InfluxDB V1，保留策略必须设置为至少 170 周。 （更改 iobroker 持续时间 170w 的全局保留策略；）
* 对于 InfluxDB V2，全局保留策略由 influxdb 适配器设置 - 请在 influxdb 适配器中将存储保留时间设置为“不自动删除”！

该适配器然后创建相应的记录状态，启用 sql 统计信息并使用 sql 命令写入历史数据库条目并更新记录。更新频率为每小时。

重要提示：如果各自的状态值显示 NULL() 值，请不要生气。
在某些情况下，管理对象浏览器中的值未正确显示 - 请使用 FLOT 或 GRAFANA 来显示！！！

## Km200 记录 - 解释
一些字段值被设置为“可记录”。然后这些字段将具有“记录”。
根据加热系统的类型，这些记录存储在 recordings/... 或 energyMonitoring/...

对于每分钟记录的状态，在 km200 网关内收集一个样本。
每小时值应该有 60 个样本，每天 24*60=1440 个样本，每月 1440 x #days。
必须通过 3 个 API 调用在适配器中读取每个时间段：

* 每小时值：今天、昨天、前天
*每日值：实际月份，上个月，月份-2
* 月值：实际年份、去年、-2年

在 web-api 读取的数据字段中，样本值的总和存储在 y 值中，没有样本存储在 c 值中。
（请参阅 km200... 字段中的 json-data 中的原始值。）

由于有时样本会丢失，因此可以内插能量值。插值是可配置的（开/关）。
对于某些月份（> 12 个月前），某些数据可能会丢失。 （代码中的博世错误？）

对于实际月份的能源消耗，适配器计算每日值的总和，并使用该总和来获得更准确的数据。

＃＃ 统计数据
可以启用锅炉统计显示：

* ems-esp 和/或 km200 网关读取和状态处理的轮询周期处理时间
* 每小时 / 24 小时的锅炉和 ww 启动次数
* 每小时的锅炉利用率 (0-100%)。
* 需要一个活动的数据库实例（见上文）来计算统计信息。

## 锅炉效率
如果填写参数，则可以计算锅炉效率。 （仅限燃气和燃油锅炉）

* 锅炉效率可以根据平均锅炉温度计算：（锅炉温度+回水温度）/ 2。
* 当返回温度在 km200/ems-esp 中不可用时，效率计算没有意义 - 请禁用以避免错误
* 查看锅炉的数据表以相应地调整效率表。
* 在某些供暖系统上，此功能会产生错误 - 请关闭！！！
* 更改逻辑与版本 >= v1.30.0

## 状态结构的变化
每当新的 EMS-ESP 固件添加新的数据字段和/或更改数据字段名称时，它们都会在适配器运行期间进行处理。尽管如此，适配器不会自动删除过时的数据字段。
有一个选项可以通过在适配器重新启动时删除状态来重建状态结构（保留具有历史记录/数据库条目的状态）

## 热需求控制
热需求计算和配置说明。仅提供德语版本：https://github.com/tp1de/ioBroker.ems-esp/wiki

# Iobroker.ems-esp

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* update efficience calculation to support external sensor for return temperature
* when 3 state fields are empty then standard fields are used.
* when state field(s) are filled, than this state(s) are used - e.g. own sensor for return temp

### 1.29.0 (2023-03-08)
* update dependencies

### 1.28.0 (2023-03-08)
* update dependencies

### 1.27.0 (2023-03-08)
* update dependencies

### 1.26.0 (2023-02-27)
* error corrections due to changes since v1.21

### 1.25.0 (2023-02-26)
* set acknowledge to true when re-reading changed values from ems-esp

### 1.24.0 (2023-02-26)
* error corrections for version 1.22 and 1.23

### 1.23.0 (2023-02-26)
* correct ww states from v1.22

### 1.22.0 (2023-02-17)
* support multiple mixer devices

### 1.21.0 (2023-01-02)
* am200 from ems-esp adjustments to changed structure

### 1.20.0 (2022-12-29)
* am200 from ems-esp - redefine to heatSources/hsa for km200 structure mode

### 1.19.0 (2022-12-29)
* am200 - alternative heatsource adjustments

### 1.18.0 (2022-12-24)
* Statistics
* alternative heat souces (am200)

### 1.17.1 (2022-12-04)
* correct actualweight statistics within heatdemand function

### 1.17.0 (2022-12-02)
* add actual weight per thermostat in heatdemand object structure
* add heatdemand difference values

### 1.16.2 (2022-11-21)
* adjustments for ems-esp sensors v3.5

### 1.16.1 (2022-11-20)
* error correction sensors

### 1.16.0 (2022-11-20)
* ems-esp V2 NOT SUPPORTED ANYMORE !!!!
* pepare for enum as values and not just index
* new parameters for "Room" and "Function" for adapter states
* adjust for latest ems-esp dev version 3.5 
* units of measument for ems-esp sensors
* support name changes within ems-esp for sensors

### 1.15.0 (2022-06-06)
* adjustments for ems-esp RC310 holiday modes

### 1.14.0 (2022-05-18)
* split parameters for dallas & analog sensors
* improve warning messages if sensors are missing

### 1.13.0 (2022-05-17)
* add visibility attributes within ems-esp states
* error processing dallas / analog sensors of ems-esp

### 1.12.1 (2022-05-16)
* corrections for heatdemand function
* enable expert view
* vis views for syslog analysis in expert views

### 1.12.0 (2022-05-15)
* add analog sensors for ems-esp gateway, remove ems-esp settings

### 1.11.2 (2022-04-27)
* code optimization and error processing for ems-esp gateway

### 1.11.1 (2022-04-25)
* error corrections on invalid heatdemand states

### 1.11.0 (2022-04-24)
* corrections on hourly recordings for temperature
* make interpolation (missing of c-counts) in energy recordings configurable (on/off)
* error corrections on heatdemand with empty data

### 1.10.0 (2022-04-23)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit 
* error corrections on efficiency calculation - make fields used configurable
* some other error corrections

### 1.9.0 (2022-04-18)
* beta test new version (github only)
* add heatdemand customization & calculation with automatic switch (on/off) per heating circuit

### 1.4.0 (2022-03-16)
* recordings new logic and now working without database instance as well

### 1.3.3 (2022-02-26)
* avoid null values in recordings

### 1.3.2 (2022-02-25)
* correction for recordings without reference object
* corrections for mySQL recordings

### 1.3.1 (2022-02-24)
* correction on temperature recordings (months and days)

### 1.3.0 (2022-02-23)
* new logic and state-structure for km200 recordings
* recordings stored in states [array of values] and within database
* please adjust adapter configuration
* support of Buderus heatpump with Logamatic HMC300 IP-Inside

### 1.2.1 (2022-02-18)
* adjust for js-controller v4 - part 2
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.2.0 (2022-02-18)
* Adjust for js-controller v4 - part 1
* private password encryption by admin instead of own code (if necessary please re-enter pw)

### 1.1.1 (2022-02-11)
* Improve tests on km200 ip-address and passwords

### 1.1.0 (2022-02-07)
* last tested version for old ems-esp ESP8266 with API V2.
* support for KM200 HRV (ventilation)
* corrections for km200 recordings and statistics module
* prepare for ems-esp firmware 3.4

## License
MIT License

Copyright (c) 2023 Thomas Petrick <tp1degit@gmail.com>

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