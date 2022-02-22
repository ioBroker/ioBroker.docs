---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: BuWs6Xf4dythFIb3T4+TK/e4TloQ+Q1DftYMt4kY/t8=
---
![标识](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![安装数量](http://iobroker.live/badges/sonoff-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker Sonoff
![测试和发布](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 使用 MQTT 协议的 ioBroker 适配器比较
||ioBroker.sonoff|[ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (在代理模式)|[ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/) (在客户端模式)|[ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/)|

||ioBroker.sonoff|[ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/)（在代理模式下）|[ioBroker.mqtt](https://github.com/ioBroker/ioBroker .mqtt/) (在客户端模式下)|[ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/)|
|---|---|---|---|---|
|有内置 MQTT 代理|是|是|否|否|
|将消息中继到其他 MQTT 订阅者|否!!!|是|不适用|不适用|
|外部 MQTT 代理|不支持|不支持|需要|需要|
|Tasmota MQTT消息到ioBroker Objects|智能处理|1:1处理所有消息|1:1处理订阅消息|1:1处理订阅消息|
|非 Tasmota MQTT 消息到 ioBroker 对象|不处理|1:1 处理所有消息|1:1 处理订阅消息|1:1 处理订阅消息|
|将 ioBroker 值发布为 MQTT 消息|无|配置的子树|配置的子树|单独配置的值|

＃＃ 用法
此适配器通过 MQTT 与具有 Tasmota 固件或 ESP 设备的 Sonoff 设备进行通信。

预计以下主题：

- `电话/设备名称/状态`
- `tele/DeviceNAME/SENSOR`
- `电话/设备名称/INFOx`
- `电话/设备名称/能源`
- `cmd/设备名称/POWERx`
- `stat/DeviceNAME/POWERx`
-`/设备名称/BM280/温度`
-`/设备名称/BM280/湿度`
-`/设备名称/BM280/温度`
-`/设备名称/BM280/Feuchtigkeit`
-`/设备名称/BM280/Vcc`
-`/设备名称/BM280/VCC`
-`/设备名称/BM280/Laufzeit`
-`/设备名称/BM280/RSSI`
-`/设备名称/BM280/POWER`
-`/设备名称/BM280/POWER1`
-`/设备名称/BM280/POWER2`
-`/设备名称/BM280/POWER3`
-`/设备名称/BM280/POWER4`
-`/设备名称/BM280/Switch1`
-`/设备名称/BM280/Switch2`
-`/DeviceNAME/BM280/Total`
-`/设备名称/BM280/今天`
-`/设备名称/BM280/heute`
-`/设备名称/BM280/昨天`
-`/设备名称/BM280/gestern`
-`/设备名称/BM280/Faktor`
-`/DeviceNAME/BM280/Factor`
-`/设备名称/BM280/电源`
-`/设备名称/BM280/Leistung`
-`/设备名称/BM280/电压`
-`/设备名称/BM280/Spannung`
-`/设备名称/BM280/当前`
-`/设备名称/BM280/Strom`
-`/设备名称/BM280/Punkt`
-`/DeviceNAME/BM280/Counter1`
-`/DeviceNAME/BM280/Counter2`
-`/DeviceNAME/BM280/Counter3`
-`/DeviceNAME/BM280/Counter4`
-`/设备名称/BM280/压力`
-`/设备名称/BM280/SeaPressure`
-`/设备名称/BM280/Druck`
-`/设备名称/BM280/大约。海拔`
-`/设备名称/BM280/模块`
-`/设备名称/BM280/版本`
-`/设备名称/BM280/主机名`
-`/设备名称/BM280/IPAddress`
-`/设备名称/BM280/IP地址`
-`/DeviceNAME/BM280/RestartReason`
-`/DeviceNAME/BM280/CarbonDioxide`
-`/设备名称/DHT11/照度`
-`/设备名称/SonoffSC/Light`
-`/DeviceNAME/SonoffSC/Noise`
-`/DeviceNAME/SonoffSC/AirQuality`
-`/设备名称/SDS0X1/PM2.5`
-`/设备名称/SDS0X1/PM10`
-`/设备名称/SDS0X1/UvLevel`
-`/设备名称/SDS0X1/纬度`
-`/设备名称/SDS0X1/经度`
-`/设备名称/SR04/距离`

**注意**：该列表可以轻松扩展。请将未知状态的`Pull Requests` 或 *调试数据* 发送给开发人员（通过问题）。

## 自动创建对象
在 Web 配置中，您可以确定哪些 MQTT 电报创建了不在默认数据点中的新对象：

* `TELE_SENSOR` - 从 `tele/xxx/SENSOR` 电报创建对象
* `TELE_STATE` - 从 `tele/xxx/STATE` 电报创建对象
* `STAT_RESULT` - 从 `stat/xxx/RESULT` 电报创建对象

通常 TELE_SENSOR 对于大多数用户来说应该足够了。

* `Create object tree` 将对象创建为树形结构

**警告！**这个选项会弄乱你的sonoff对象树！您必须重做所有存储设置...
将对象结构存储为 JSON 文件，以便您可以重新创建旧结构。
最好是停止适配器，删除sonoff下的所有对象，然后重新启动适配器。

## LED 控制器的标志
仅当设备具有以下状态之一时才会创建模式状态：

- `Red`、`Green`、`Blue`、`WW`、`CW`、`Color`、`RGB_POWER`、`WW_POWER`、`CW_POWER`、`Hue`、`Saturation`

状态：

* `modeLedExor` - 白色 LED 和彩色 LED 的 exor => 如果白色 LED 打开，彩色 LED 关闭，反之亦然（默认为 true）
* `modeReadColors` - 允许从 MQTT 读取颜色（默认为 false）

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 2.4.7 (2021-11-14)
* (Apollon77) Fix crash case (Sentry IOBROKER-SONOFF-1S)

### 2.4.6 (2021-11-13)
* (Apollon77) Fix some crash cases reported by Sentry (IOBROKER-SONOFF-B, IOBROKER-SONOFF-R, IOBROKER-SONOFF-4, IOBROKER-SONOFF-1, IOBROKER-SONOFF-13, IOBROKER-SONOFF-1J, IOBROKER-SONOFF-16, IOBROKER-SONOFF-3, IOBROKER-SONOFF-H)
* (Apollon77) Adjust Uptime to mixed because it seems that it can be number or string

### 2.4.5 (2021-07-21)
* (Apollon77) Fix some crash cases reported by Sentry

### 2.4.4 (2021-07-19)
* (bluefox) Added UvaIntensity and UvbIntensity

### 2.4.3 (2021-07-18)
* (bluefox) Better type detection for non-described states

### 2.4.2 (2021-07-17)
* (bluefox) Optimize for js-controller 3.3

### 2.4.1 (2021-07-17)
* (Apollon77/bluefox) Optimize for js-controller 3.3
* (Apollon77) Add Sentry for error reporting with js-controller 3.x+

### 2.4.0 (2021-02-04)
* (anwa) add several data points
* (anwa) Fix translation for 'ignorePings'
* (anwa) Fix wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed to set the IP interface for server
* (bluefox) Fixed tests for js-controller 2.0
* (bluefox) Fixed the monitoring of the client connection
* (bluefox) Changed "indicator.connected" to "indicator.reachable" for clients
* (bluefox) Supported `{POWERn: "true"}`
* (bluefox) Correct processing of `{temp: nan}`

### 2.2.3 (2019-01-10)
* (simatec) Support for compact mode

### 2.2.2 (2018-06-22)
* (bluefox) Configuration was fixed

### 2.2.1 (2018-06-20)
* (bluefox) '-' in names was allowed again

### 2.2.0 (2018-05-22)
* (gemu2015) auto generate objects, support for arrays (channel), led-controllers improved

### 2.1.3 (2018-05-08)
* (bluefox) Added HC-SR04 Ultrasonic Sensor

### 2.1.2 (2018-04-23)
* (bluefox) Added support of UvLight, Longitude and Latitude

### 2.1.1 (2018-04-13)
* (bluefox) Support of the particle concentration sensor

### 2.1.0 (2018-03-30)
* (gemu2015) Support of the devices control (many thanks :)
* (gemu2015) Support of many new values
* (modmax) Update alive status of the clients
* (modmax) Added POWER5-8 and Switch3-4

### 2.0.2 (2018-03-19)
* (modmax) Fixing reconnection of clients
* (bluefox) Add SeaPressure

### 2.0.1 (2018-03-17)
* (bluefox) Replace stream handler
* (bluefox) Add timeout for clients
* (bluefox) Add Light/Noise/AirQuality
* (bluefox) Do not send pingresp for invalid clients

### 1.0.3 (2018-03-03)
* (bluefox) Add Analog0/1/2/3 sensor

### 1.0.2 (2018-02-17)
* (Apollon77) Add Illuminance sensor

### 1.0.1 (2018-02-05)
* (bluefox) Ready for admin3
* (bluefox) Added CO2 sensor

### 1.0.0 (2017-11-27)
* (AlZiBa) typo @ alive
* (AlZiBa) add Today's power consumption for Sonoff POW
* (AlZiBa) unit of power consumption is kWh

### 0.3.3 (2017-11-03)
* (bluefox) Add counters

### 0.3.2 (2017-10-22)
* (Tan-DE) Small change for Switch1. Switch2 and additional IPaddress added.

### 0.3.1 (2017-10-12)
* (bluefox) Fix tests and LWT

### 0.3.0 (2017-10-06)
* (bluefox) Add INFO and ESP

### 0.2.0 (2017-10-05)
* (bluefox) Add ENERGY and DS18x20

### 0.1.0 (2017-10-01)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2021, bluefox <dogafox@gmail.com>

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