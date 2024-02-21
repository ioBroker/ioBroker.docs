---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sun2000/README.md
title: ioBroker.sun2000
hash: RVmKGccUo9q5Qds+xUXuVjjDKjGCan0KwwdncCYwuKg=
---
![标识](../../../en/adapterref/iobroker.sun2000/admin/sun2000.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.sun2000.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sun2000.svg)
![安装数量](https://iobroker.live/badges/sun2000-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/sun2000-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.sun2000.png?downloads=true)

# IoBroker.sun2000
**测试：** ![测试与发布](https://github.com/bolliy/ioBroker.sun2000/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 sun2000 适配器
使用Modbus TCP读取华为SUN2000逆变器和LUNA2000电池的寄存器数据。

欢迎关注德语版的讨论[iobroker论坛](https://forum.iobroker.net/topic/71768/test-adapter-sun2000-v0-1-x-huawei-wechselrichter)

Modbus接口定义（2023-02-16第5期）：https://forum.iobroker.net/assets/uploads/files/1699119419919-solar-inverter-modbus-interface-definitions-v5.pdf

## 支持的硬件
* 华为逆变器SUN2000系列（M0、M1）
* 华为智能适配器-WLAN-FE / 分钟。软件版本：V100R001C00SPC133（SDongleA-05）
* 华为Luna2000电池
* 华为智能功率传感器DTSU666-H或DDSU666-H

[华为产品信息](https://solar.huawei.com/en/professionals/all-products?residential-smart-pv)

## 功能列表
* 最多可处理 5 个逆变器（主/从），每个逆变器配有一个电池模块（最大 15kWh）。
* 以固定间隔读取输入功率、输出功率、充放电功率、电网消耗等实时值。
* 仅针对来自逆变器的更改数据写入状态。这减轻了 iobroker 实例的负担。
* 可以使用“已更新”触发元素来监视“收集”路径中的“inputPower”或“activePower”状态。因为这些状态总是在设定的时间间隔内写入的。

## 主要设置
* `address`: 逆变器IP地址
* `port`：逆变器modbus端口（默认：502）
* `modbusIds`：逆变器ID，以“,”分隔（默认：1，最多5个逆变器）
* `updateInterval`: 快速更新间隔（默认：20秒，每个逆变器最小5秒）

## Modbus 时序
* `timeout`: modbus 连接超时(默认: 10000 ms)
* `delay`: modbus 请求之间的延迟（默认值：0 ms）
* `连接延迟`: modbus 连接后的延迟 (默认: 5000 ms)
* `auto-adjust`: 自动调整modbus设置

## 配置逆变器
为了使用Modbus连接，所有华为设备必须使用最新的固件功能。您可以直接在FusionSolar门户的“升级”下执行最新固件。
在FusionSolar设置中，您仍然需要激活WLAN加密狗上的Modbus并设置访问授权。将FusionSolar-App下载到手机上，并使用它直接通过逆变器的WLAN热点连接。
单击页脚菜单中的 `Me` (Ich) > `Commission Device` (“Inbetriebnahme des Geräts”) > `log in` (am Wechselrichter anmelden)。

要以 `installer` 身份登录应用程序，您通常需要密码：`00000a` 或 `0000000a` 您可能还需要密码才能连接到逆变器自己的 WLAN：`Changeme`

登录逆变器后，转至 `Settings` (Einstellungen) > `Communication configuration` (Kommunikationskonfiguration) > `Dongle parameter settings` (Dongle‐Parametereinstellungen) > `Modbus TCP` > 激活 `connection without restriction` ( Verbindung uneingeschränkt aktivieren)。您还可以输入Modbus通讯地址同时读出。
如果您使用两个逆变器，则连接到第二个逆变器并读取那里的通信地址。

[如何激活“Modbus TCP” - 来自华为论坛](https://forum.huawei.com/enterprise/en/modbus-tcp-guide/thread/789585-100027)

＃＃ 灵感
该适配器的开发灵感来自于论坛帖子 https://forum.iobroker.net/topic/53005/huawei-sun2000-iobroker-via-js-script-funktioniert 和 iobroker javascript https://github 的讨论。 com/ChrisBCH/SunLuna2000_iobroker.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.3.1 (2024-02-12)
* state `sun2000.0.collected.chargeDischargePowercharge` is not always refreshed #47

### 0.3.0 (2024-02-10)
* add battery unit information for example temperature #40
* modbus timeout, connect delay and delay can be configured #34
* device status as plain text `sun2000.0.inverter.x.derived.deviceStatus`
* Introduction of a driver model. A separate driver can be created for each device #41

### 0.2.1 (2024-02-02)
* Requirements from [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)

### 0.2.0 (2024-01-24)
* [Add sun2000 to latest](https://github.com/ioBroker/ioBroker.repositories/pull/3219)
* improve error handling (#34)
* add simple optimizer info 
* Riemann sum of input power with energy loss for new state `dailySolarYield`
* try to recreate the `yield today` from the fusion portal

### 0.1.3 (2024-01-17)
* display the data from PV strings (#27)
* optimize the timing of interval loop
* improved handling of read timeouts from more then 2 inverters

### 0.1.2 (2024-01-12)
* fix: no Data if interval less 20 sec (#24)
* prepare collected values more precisely
* expand up to 5 inverters #18
* fix: problems with multiple inverters

### 0.1.1 (2024-01-07)
* fix some collected values

### 0.1.0 (2024-01-06)
* watchdog implemented #11
* state values are cached - only changed data should be stored 
* derived and collected values for example `inputPowerEffective` or `inputYield`
* deploy more register

### 0.0.2 (2023-12-19)
Dependency and configuration updates

### 0.0.1 
initial release

## License
MIT License

Copyright (c) 2024 bolliy <stephan@mante.info>

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