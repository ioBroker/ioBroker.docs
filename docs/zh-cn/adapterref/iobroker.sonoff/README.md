---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sonoff/README.md
title: ioBroker Sonoff
hash: Ge7msvsKgnKuu8OqBfenaEgv5YtfGW0hyL376lwHpUI=
---
![标识](../../../en/adapterref/iobroker.sonoff/admin/sonoff.png)

![安装数量](http://iobroker.live/badges/sonoff-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.sonoff.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sonoff.svg)

# IoBroker Sonoff
![测试与发布](https://github.com/ioBroker/ioBroker.sonoff/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/sonoff/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 使用 MQTT 协议的 ioBroker 适配器比较
如果您的 Tasmotas 仅支持 MQTT 协议，请选择 `ioBroker.sonoff`。

对于其他情况，请考虑以下选项：

| 功能 | ioBroker.sonoff | [ioBroker.mqtt（代理模式）| ioBroker.mqtt（客户端模式）| ioBroker.mqtt-client](https://github.com/Pmant/ioBroker.mqtt-client/) |
|-----------------------------------------------|------------------------|--------------------------------------------------------------------------------|------------------------------------------------------------------------------|------------------------------------------------------------------------|
| 内置 MQTT 代理 | 是 | 是 | 否 | 否 |
| 将消息转发给其他 MQTT 订阅者 | 否！！！ | 是 | 不适用 | 不适用 |
| 外部 MQTT 代理 | 可选（桥接模式） | 不支持 | 必需 | 必需 |
| Tasmota MQTT 消息到 ioBroker 对象 | 智能处理 | 所有消息一对一处理 | 已订阅消息一对一处理 | 已订阅消息一对一处理 |
| 非 Tasmota MQTT 消息到 ioBroker 对象 | 不进行处理 | 一对一处理所有消息 | 一对一处理已订阅消息 | 一对一处理已订阅消息 |
| 将 ioBroker 值发布为 MQTT 消息 | 无 | 已配置的子树 | 已配置的子树 | 单独配置的值 |

＃＃ 用法
该适配器通过 MQTT 与运行 Tasmota 固件的 Sonoff 设备或 ESP 设备通信。

预计讨论的主题如下：

- `tele/DeviceNAME/STATE`
- `tele/DeviceNAME/SENSOR`
- `tele/DeviceNAME/INFOx`
- `tele/DeviceNAME/ENERGY`
- `cmnd/DeviceNAME/POWERx`
- `stat/DeviceNAME/POWERx`
- `/DeviceNAME/BM280/Temperature`
- `/DeviceNAME/BM280/Humidity`
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
- `/DeviceNAME/BM280/Today`
- `/DeviceNAME/BM280/heute`
- `/DeviceNAME/BM280/Yesterday`
- `/DeviceNAME/BM280/gestern`
- `/DeviceNAME/BM280/Faktor`
- `/DeviceNAME/BM280/Factor`
- `/DeviceNAME/BM280/Power`
- `/DeviceNAME/BM280/Leistung`
- `/DeviceNAME/BM280/Voltage`
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
- `/DeviceNAME/BM280/大约海拔高度`
- `/DeviceNAME/BM280/模块`
- `/DeviceNAME/BM280/Version`
- `/DeviceNAME/BM280/Hostname`
- `/DeviceNAME/BM280/IPAddress`
- `/DeviceNAME/BM280/IP地址`
- `/DeviceNAME/BM280/RestartReason`
- `/DeviceNAME/BM280/二氧化碳`
- `/DeviceNAME/DHT11/Illuminance`
- `/DeviceNAME/SonoffSC/Light`
- `/DeviceNAME/SonoffSC/Noise`
- `/DeviceNAME/SonoffSC/AirQuality`
- `/DeviceNAME/SDS0X1/PM2.5`
- `/DeviceNAME/SDS0X1/PM10`
- `/DeviceNAME/SDS0X1/UvLevel`
- `/DeviceNAME/SDS0X1/纬度`
- `/DeviceNAME/SDS0X1/Longitude`
- `/DeviceNAME/SR04/Distance`

**注意**：此列表可以轻松扩展。请将 `Pull Requests` 或未知状态的*调试数据*发送给开发者（通过 issue）。

## 桥接模式
默认情况下，适配器运行一个内置的 TCP 代理，Tasmota 设备直接连接到该代理。如果您已经运行了一个专用的 MQTT 代理（例如 Mosquitto），则可以改用桥接模式——适配器将作为客户端连接到您现有的代理。

＃＃＃ 配置
在适配器设置中，启用“使用外部 MQTT 代理”选项，并将“外部代理 URL”设置为您的代理地址，例如 `mqtt://192.168.1.10:1883` 或 `192.168.1.10:1883`。您还可以选择设置用户名和密码。如果禁用此选项（或未输入 URL），则会像之前一样启动内置代理。

**要订阅的主题** 定义了适配器监听的主题，默认为 `tele/#, stat/#, +/tele/+, +/stat/+`。如果您的设备使用其他主题，例如 OpenBeken 设备（发布到 `<devicename>/...`）或完整主题中的全局前缀 (`myPrefix/tele/#`)，请扩展此列表。

您可以选择设置代理服务器使用的**客户端 ID**（默认值为 `iobroker_sonoff_<instance>`）、**保持活动状态**间隔和**清理会话**。如果代理服务器需要在适配器未运行时存储设备消息，请禁用清理会话。

### 完整主题结构
Tasmota `FullTopic` 的常规设置受支持，并会自动检测每个设备，命令以相同的结构发送回：

| 完整主题 | 示例 | 命令 |
|---|---|---|
| `%prefix%/%topic%/`（默认） | `tele/lamp/STATE` | `cmnd/lamp/POWER` |
| `gateway/%prefix%/%topic%/` | `gateway/tele/lamp/STATE` | `gateway/cmnd/lamp/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |
| `gateway/%topic%/%prefix%/` | `gateway/lamp/tele/STATE` | `gateway/lamp/cmnd/POWER` |

嵌套主题（例如 `tele/house/floor1/lamp/STATE`）也适用。完整主题（例如，同一代理上的多个网关）前的固定前缀（最后两行）仅在订阅涵盖该前缀时才会被识别，因此请将例如 `gateway/tele/#, gateway/stat/#` 添加到“要订阅的主题”中。`%topic%/%prefix%/` 结构也一样，默认情况下它由 `+/tele/+, +/stat/+` 涵盖。

### 加密连接
使用 `mqtts://broker:8883`（或 `wss://`）作为 URL。对于自签名证书，请禁用“检查代理的证书”选项，或输入您的 **CA 证书** 的路径。如果代理需要客户端证书，也可以输入 **客户端证书** 和 **客户端密钥** 的路径。这些文件将从 ioBroker 主机的文件系统中读取。

### 设备命名
在桥接模式下，适配器无法看到设备的 MQTT CONNECT 数据包（MQTT 协议的限制），因此设备的名称取自其消息：

1. `stat/<topic>/STATUS6` 中的 `MqttClient`——这是 MQTT 客户端 ID，因此设备名称与内置代理的名称相同。适配器会在出现未知设备时立即请求此信息（`cmnd/<topic>/Status 6`）。
2. 如果设备未响应状态请求，则从 `tele/<topic>/STATE`、`tele/<topic>/INFO2` 或 `stat/<topic>/STATUS5` 获取 `Hostname`。
3. 如果在 30 秒内没有任何回复（例如，使用自定义固件的设备），则主题本身会发生变化。

只有当新名称来自相同或更佳来源时，设备才会被重命名，因此对象不会来回更改。如果在 Tasmota 中重命名设备，适配器会重命名相应的 ioBroker 对象，但其他适配器（历史记录、VIS 等）中的引用必须手动调整。

由于外部代理在适配器重启期间持续运行，设备不会重复执行启动消息。为了填充 `INFO.Hostname`、`INFO.IPAddress` 和 `INFO.Version`，适配器会在首次检测到设备时请求它们（`cmnd/<topic>/Status 5` 和 `cmnd/<topic>/Status 2`）。`Module`（来自 INFO1）无法请求，因此保持为空。

### 可用性
使用内置代理时，`alive` 状态跟随设备的 TCP 连接。在桥接模式下，则使用最后一个遗嘱主题（`tele/<topic>/LWT`）：`Online` 将 `alive` 设置为 true，将 `Offline` 设置为 false。

## 自动创建对象
在 Web 配置中，您可以确定哪些 MQTT 电报会创建默认数据点之外的新对象：

* `TELE_SENSOR` - 从 `tele/xxx/SENSOR` 电报创建对象
* `TELE_STATE` - 从 `tele/xxx/STATE` 电报创建对象
* `STAT_RESULT` - 从 `stat/xxx/RESULT` 电报创建对象

通常情况下，TELE_SENSOR 对大多数用户来说就足够了。

* `创建对象树` 会将对象创建为树状结构。

**警告！** 此选项会破坏您的 Sonoff 对象树！您需要重新设置所有存储设置……

将对象结构保存为 JSON 文件，以便您可以重建旧结构。

最佳方法是停止适配器，删除 Sonoff 下的所有对象，然后重新启动适配器。

## LED控制器标志
只有当设备具有以下状态之一时，才会创建模式状态：

- `红色`、`绿色`、`蓝色`、`WW`、`CW`、`颜色`、`RGB_功率`、`WW_功率`、`CW_功率`、`色调`、`饱和度`

各州：

* `modeLedExor` - 白色 LED 和彩色 LED 的异或运算 => 如果白色 LED 打开，则彩色 LED 关闭，反之亦然（默认为 true）
* `modeReadColors` - 允许从 MQTT 读取颜色（默认为 false）

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 4.0.0 (2026-08-13)
* (ioBroker-Bot) Adapter requires js-controller >= 6.0.11 now.
* (stony2k) Add bridge mode to connect to an external MQTT broker instead of running a built-in broker
* (stony2k) Fix alive state object not being created (warning "has no existing object")
* (bluefox/GreatSUN) Fixed the names of data points inside a group: since 3.3.0 e.g. `SML_Total_in` was created as `SML_in` (#489)
* (bluefox/baetzst) The MAC address and the other network and firmware information of a device are stored as data points (`INFO.Mac`, `INFO.Gateway`, `INFO.Hardware`, ...) (#513)
* (bluefox) Server mode: the adapter requests `Status 5` and `Status 2` from a device with its first message, so the INFO states are filled even if the device did not reboot
* (bluefox) The states which were created with a shortened name by 3.3.x are listed in the log on start, so they can be deleted (#489)
* (bluefox) Bridge mode: the topics to subscribe are configurable now and nested full topics as well as OpenBeken topics are supported
* (bluefox) Bridge mode: devices are named after their MQTT client ID like with the built-in broker and are no longer renamed by less reliable sources
* (bluefox) Bridge mode: the `alive` state is set from the last will topic (LWT), so devices are recognized as offline
* (bluefox) Commands for auto-created states are sent to `cmnd/...` again, also for nested full topics
* (bluefox) `info.connection` contains the list of the connected clients again (server mode), in bridge mode the URL of the broker
* (bluefox/patricknitsch) Bridge mode: support for the full topic structure `%topic%/%prefix%/` (device first), detected automatically per device
* (bluefox/patricknitsch) Bridge mode: encrypted connections with CA/client certificates and optional certificate check, configurable client ID, keepalive and clean session
* (bluefox/patricknitsch) Bridge mode: a fix prefix in front of the full topic (e.g. `gateway/tele/device/STATE`) is recognized and used for the commands
* (@Apollon77/@copilot) Add support for OpenBeken LED datapoints (led_enableAll, led_dimmer, led_temperature, led_basecolor_rgb, led_finalcolor_rgbcw, led_basecolor_rgbcw, led_hue, led_saturation) - enables control of OpenBeken LED devices with automatic topic mapping for /get and /set suffixes
* (@Apollon77/@copilot) Add PulseTime1-PulseTime16 datapoint support - users can now read and set PulseTime values directly from ioBroker to control relay auto-off timers
* (@GermanBluefox) Breaking: minimal supported Node.js version is now 22

### 3.3.0 (2025-09-20)
* (@Apollon77/@copilot) **IMPORTANT**: Commands now correctly use cmnd/ prefix instead of tele/ prefix
* (@Apollon77/@copilot) Added configuration for advanced MQTT settings
* (@Apollon77/@copilot) Fix shutter command mapping to use correct Tasmota format - Transforms Shutter1_Position to ShutterPosition1 for proper device control
* (@Apollon77/@copilot) Fix IRHVAC Power, Light and Mode fields showing NULL instead of actual string values
* (@Apollon77/@copilot) Add Zigbee device control support for Tasmota coordinators - users can now control Zigbee devices (Power/Dimmer) through ioBroker states via automatic ZbSend command generation
* (@Apollon77/@copilot) Add support for Tasmota tele/MARGINS messages enabling integration of PowerLow, PowerHigh, and PowerDelta limits
* (@Apollon77/@copilot) Fix POW R2 energy datapoints not being created by enabling TELE_STATE by default
* (@Apollon77/@copilot) Fix pressure and temperature unit display to respect PressureUnit and TempUnit from Tasmota MQTT messages
* (@Apollon77/@copilot) Add support for decoupled button actions in Tasmota devices - creates Button1-Button8 datapoints for button events
* (@Apollon77/@copilot) Fix RESULT message processing bug where tele/*/RESULT messages were incorrectly processed as WAKEUP instead of RESULT
* (@Apollon77/@copilot) Fix deprecated value.power.consumption role for ENERGY_Power datapoint to improve device detection
* (@Apollon77/@copilot) Add support for SHUTTER5-SHUTTER16 datapoints for ESP32 shutter32 devices
* (@Apollon77/@copilot) Update admin UI responsive design to use ioBroker standard values for mobile compatibility
* (@Apollon77/@copilot) Add support for Sonoff B1 (RGB LED) and Sonoff SC (Environmental Sensor) devices with proper value ranges
* (@Apollon77/@copilot) Add meaningful state labels for Scheme datapoint (color animation schemes)
* (@Apollon77/@copilot) Add configuration option to suppress "not connected" warnings for temporarily offline devices
* (@Apollon77/@copilot) Add Switch5-Switch28 datapoint definitions for consistent boolean mapping
* (@Apollon77/@copilot) Fix write flag for all Switch datapoints to enable proper control from ioBroker

### 3.2.1 (2024-10-07)

* (bluefox) Sanitize the IDs of the clients

### 3.2.0 (2024-08-28)
* (bluefox) Added information about connected clients in the server mode

### 3.1.2 (2024-08-17)
* (mattreim) updated packages

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

The MIT License (MIT)

Copyright (c) 2017-2026, bluefox <dogafox@gmail.com>

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