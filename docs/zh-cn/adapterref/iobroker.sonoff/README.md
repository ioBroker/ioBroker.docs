---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonoff/README.md
title: ioBroker 索诺夫
hash: wPAup01SFAbWUNZvoOWrvxxZqchVQG19zEZZKPS8SAk=
---
![标识](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![安装数量](http://iobroker.live/badges/sonoff-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker 索诺夫
![测试与发布](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 使用 MQTT 协议的 ioBroker 适配器比较
如果您只有使用 MQTT 协议的 Tasmotas，请选择`ioBroker.sonoff`。
对于其他场景，请考虑不同的选项：

|特色 | ioBroker.sonoff | ioBroker.sonoff | [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/)（在代理模式下）| [ioBroker.mqtt](https://github.com/ioBroker/ioBroker.mqtt/)（客户端模式）| [ioBroker.mqtt-客户端](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------|-------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
|拥有内置 MQTT 代理 |是的 |是的 |没有|没有|
|将消息转发给其他 MQTT 订阅者 |不！！！ |是的 |不适用 |不适用 |
|外部 MQTT 代理 |不支持 |不支持 |必填|必填|
|发送至 ioBroker 对象的 Tasmota MQTT 消息 |智能处理|所有消息1:1处理|订阅消息1:1处理 |订阅消息1:1处理 |
|发送至 ioBroker 对象的非 Tasmota MQTT 消息 |没有处理|所有消息1:1处理 |订阅消息1:1处理 |订阅消息1:1处理 |
|将 ioBroker 值发布为 MQTT 消息 |无 |配置子树 |配置子树 |单独配置的值|

＃＃ 用法
该适配器通过 MQTT 与具有 Tasmota 固件的 Sonoff 设备或 ESP 设备进行通信。

预计将讨论以下主题：

- `tele/DeviceNAME/STATE`
- `tele/设备名称/传感器`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- `cmd/DeviceNAME/POWERx`
- `stat/DeviceNAME/POWERx`
- `/DeviceNAME/BM280/温度`
- `/DeviceNAME/BM280/湿度`
- `/DeviceNAME/BM280/Temperatur`
- `/DeviceNAME/BM280/Feuchtigkeit`
- `/DeviceNAME/BM280/Vcc`
- `/DeviceNAME/BM280/VCC`
- `/DeviceNAME/BM280/Laufzeit`
- `/DeviceNAME/BM280/RSSI`
- `/DeviceNAME/BM280/POWER`
- `/DeviceNAME/BM280/POWER1`
- `/DeviceNAME/BM280/POWER2`
- `/DeviceNAME/BM280/POWER3`
- `/DeviceNAME/BM280/POWER4`
- `/DeviceNAME/BM280/Switch1`
- `/DeviceNAME/BM280/Switch2`
- `/DeviceNAME/BM280/Total`
- `/DeviceNAME/BM280/今天`
- `/DeviceNAME/BM280/heute`
- `/DeviceNAME/BM280/昨天`
- `/DeviceNAME/BM280/gestern`
- `/DeviceNAME/BM280/Faktor`
- `/DeviceNAME/BM280/Factor`
- `/DeviceNAME/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/设备名称/BM280/电压`
- `/DeviceNAME/BM280/Spannung`
- `/DeviceNAME/BM280/Current`
- `/DeviceNAME/BM280/Strom`
- `/DeviceNAME/BM280/Punkt`
- `/DeviceNAME/BM280/Counter1`
- `/DeviceNAME/BM280/Counter2`
- `/DeviceNAME/BM280/Counter3`
- `/DeviceNAME/BM280/Counter4`
- `/DeviceNAME/BM280/Pressure`
- `/DeviceNAME/BM280/SeaPressure`
- `/DeviceNAME/BM280/Druck`
- `/DeviceNAME/BM280/大约。海拔高度`
- `/DeviceNAME/BM280/Module`
- `/DeviceNAME/BM280/版本`
- `/DeviceNAME/BM280/主机名`
- `/DeviceNAME/BM280/IPAddress`
- `/设备名称/BM280/IP地址`
- `/DeviceNAME/BM280/RestartReason`
- `/DeviceNAME/BM280/二氧化碳`
- `/DeviceNAME/DHT11/照度`
- `/DeviceNAME/SonoffSC/Light`
- `/DeviceNAME/SonoffSC/Noise`
- `/DeviceNAME/SonoffSC/AirQuality`
- `/DeviceNAME/SDS0X1/PM2.5`
- `/DeviceNAME/SDS0X1/PM10`
- `/DeviceNAME/SDS0X1/UvLevel`
- `/DeviceNAME/SDS0X1/Latitude`
- `/DeviceNAME/SDS0X1/经度`
- `/DeviceNAME/SR04/距离`

**注意**：该列表可以轻松扩展。请将未知状态的`Pull Requests`或*调试数据*发送给开发人员（通过问题）。

## 自动创建对象
在 Web 配置中，您可以确定哪些 MQTT 电报创建不在默认数据点中的新对象：

* `TELE_SENSOR` - 从 `tele/xxx/SENSOR` 电报创建对象
* `TELE_STATE` - 从 `tele/xxx/STATE` 电报创建对象
* `STAT_RESULT` - 从 `stat/xxx/RESULT` 电报创建对象

通常 TELE_SENSOR 对于大多数用户来说应该足够了。

* `创建对象树` 将对象创建为树结构

**警告！** 此选项会弄乱您的 sonoff 对象树！您必须重做所有存储设置...
将对象结构存储为 JSON 文件，以便您可以重新创建旧结构。
最好的方法是停止适配器，删除 sonoff 下的所有对象，然后再次启动适配器。

## LED 控制器的标志
仅当设备具有以下状态之一时才会创建模式状态：

- `红色`、`绿色`、`蓝色`、`WW`、`CW`、`颜色`、`RGB_POWER`、`WW_POWER`、`CW_POWER`、`色调`、`饱和度`

状态：

* `modeLedExor` - 白色 LED 和彩色 LED 的异或 => 如果白色 LED 打开，彩色 LED 关闭，反之亦然（默认 true）
* `modeReadColors` - 允许从 MQTT 读取颜色（默认 false）

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
### 2.5.7 (2023-07-07)
* (mcm1957) Disabled the logging of username and password during connection errors
* (bluefox) added json config

### 2.5.3 (2023-03-30)
* (GreatSUN) Implemented potential `.STATE.POWER` update

### 2.5.1 (2022-04-23)
* (Apollon77) Fixed the crash case reported by Sentry

### 2.5.0 (2022-03-21)
* (GreatSUN) Implement writing of NSPanel Widget changes
* (Apollon77) Fixed the crash case reported by Sentry

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
* (anwa) Fixed the wrong unit for humidity
* (anwa) Config option to create a complete object tree instead of a flat structure
* (anwa) Change Action type to string
* (Apollon77) js-controller 2.0 is required at least

### 2.3.3 (2019-11-27)
* (bluefox) Error with the empty packet was caught

### 2.3.2 (2019-10-23)
* (bluefox) Fixed the password input in the configuration
* (bluefox) Allowed setting the IP interface for server
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

Copyright (c) 2017-2023, bluefox <dogafox@gmail.com>

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