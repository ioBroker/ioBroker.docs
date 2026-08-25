---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: +tbCESlGG5fdNULnJ0UmXUthVpC4zt2f2QJ+qUltyKA=
---
![标识](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![安装数量](http://iobroker.live/badges/philips-air-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![下载](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## 适用于 ioBroker 的飞利浦空气净化器适配器
将飞利浦空气净化器和部分飞利浦/Versuni风扇与ioBroker连接。

**已使用AC2729和飞利浦/Versuni风扇CX3550/01及CX7550/01进行测试**，但应该也适用于通过本地CoAP加密通信的新型净化器。

![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[飞利浦网站链接](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

＃＃ 用法
输入您设备的 IP 地址或主机名。您可以在路由器中找到它，设备通常显示为 `MiCO`。

大多数设备通过 CoAP 协议连接，这是默认协议。一些较旧的设备，例如 AC2729 和 AC3829，仅通过 HTTP 协议响应——如果连接失败，请在实例设置中切换协议。

然后选择您的设备型号，以便适配器创建与您的设备匹配的控件。如果您的型号不在列表中，请选择 `Generic`：您仍然可以获得所有只读值，只是没有特定于型号的控件。

有时设备可能不会报告所有变量；这些变量在对象树中将保持未填充状态。适配器无法识别的原始值将收集在 `unknownStates` 下。

我应该选择哪款设备型号？
| 您的设备 | 选择型号 |
| --- | --- |
| AC2889 和其他经典净化器，例如 AC1214、AC2729、AC2939、AC3059 或 AC3829 | `AC2889` |
| CX3550/01 落地扇 | `CX3550` |
| CX7550/01 塔扇 | `CX7550` |
| 还有其他问题吗？或者如果您不确定 | `Generic` |
| 还有其他问题吗？或者如果您不确定 | `通用` |

经典净化器都使用相同的明文密钥（`pwr`、`om`、`mode` 等），因此一个条目即可涵盖整个系列。目前已在以下硬件上验证：AC2729、AC2889、AC3221、AC3829、CX3550/01 和 CX7550/01。

如果您不确定，请先连接到 `Generic`，然后查看 `unknownStates` 下的原始密钥：诸如 `pwr` 或 `pm25` 之类的纯名称表示传统设备，诸如 `D03102` 之类的密钥表示下一代设备。如果您的设备是列表中未包含的下一代型号，请提交一个包含调试日志的问题——CX7550/01 和 AC3221 就是这样被添加进来的。

![对象](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## 飞利浦/Versuni CX3550/01 风扇
CX3550/01 支持本地加密的 CoAP 连接，不使用 Philips、Versuni 或 HomeID 云 API。

已测试CX3550/01功能：

- 电源开/关
风扇速度 1、2 和 3
- 睡眠模式
自然微风
- 振荡开/关
- 蜂鸣器开/关
- 通过本地 CoAP 读取状态
- 定时器状态读取

CX3550/01 的定时器控制功能是故意不支持的。本地定时器写入操作可能会导致固件将 `D03102` 设置为 `0`，从而关闭风扇。因此，该适配器仅以只读状态公开 CX3550/01 的定时器信息。

更多详情请参阅[docs/CX3550.md](docs/CX3550.md)。

## Philips/Versuni CX7550/01 塔式风扇
CX7550/01（“智能塔式风扇 7000 系列”）使用相同的本地加密 CoAP 连接，但原始值与 CX3550/01 不同 - 选择 `CX7550` 作为设备型号。

已测试CX7550/01功能：

- 电源开/关
- 风扇速度 1 至 12 档，并支持自动适应
- 睡眠模式
自然微风
- 振荡开/关
- 定时器（关闭，1 至 12 小时）- 此型号可写入
- 蜂鸣器开/关
- 显示亮度、温度、颜色显示以及显示屏的常亮内容
- 室温

更多详情请参阅[docs/CX7550.md](docs/CX7550.md)。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.0 (2026-08-23)

- (tt-tom17) New "Device model" setting: pick your model so the adapter shows the correct controls for your device
- (tt-tom17) Added support for the AC3221 next-generation purifier (MatthiasBosch)
- (tt-tom17) Added support for the CX7550/01 tower fan (DrBakterius)
- (tt-tom17) The adapter now warns in the log when the selected model does not seem to match the connected device
- (tt-tom17) Values the adapter does not recognise are collected under "unknownStates"
- (tt-tom17) IMPORTANT: all state IDs starting with "cx" were renamed to generic names (for example "fanMode" instead of "cxFanMode"). Please select your device model once in the settings; the old "cx*" objects can be deleted manually
- (tt-tom17) Fixed switches that did nothing when a script or visualisation wrote them as the text "true"/"false" instead of a real on/off value
- (tt-tom17) Fixed devices connected via HTTP logging "Cannot parse: undefined" every time a command was sent; the device answer is now read correctly
- (tt-tom17) Fixed devices using the HTTP protocol (for example the AC3829 and AC2729) that stopped connecting in version 1.4.0 and only logged "fetch failed (UND_ERR_SOCKET)"; requests are sent the way these devices expect again

### 1.6.1 (2026-07-03)
- (Holly86) Added support for Philips/Versuni CX3550/01 pedestal fan.
- (Holly86) Added CX fan modes, oscillation, beep and read-only timer state.
- (Holly86) Timer control is intentionally not exposed because local timer writes can switch the fan off.

### 1.5.0 (2026-06-24)
- (tt-tom17) CoAP connection now stays stable instead of disconnecting every few minutes
- (tt-tom17) Fixed adapter checker warnings

### 1.4.0 (2026-06-17)
- (tt-tom17) Connection to CoAP and HTTP devices is much more reliable now: several cases that could crash the adapter, freeze the connection or stop it from reconnecting have been fixed
- (tt-tom17) Air quality, filter and on/off values are now shown with the correct type and update reliably
- (tt-tom17) Clearer log messages, including a hint to switch to CoAP when a device does not answer on HTTP
- (tt-tom17) HTTP mode no longer needs the extra "philips-air" package and its outdated dependencies
- (tt-tom17) The device address field now accepts an IP address or a hostname and warns about invalid input
- (tt-tom17) Dependencies updated

### 1.3.0 (2026-06-15)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
* (mcm1957) Dependencies have been updated

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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