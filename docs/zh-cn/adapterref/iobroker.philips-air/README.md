---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: czNXaH7IM55KRCCAIKNzjIkKYChgIu2vKeJGUh2E1Rw=
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

**已使用AC2729和飞利浦/Versuni CX3550/01进行测试**，但应该也适用于通过本地CoAP加密通信的新型净化器。

![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[飞利浦网站链接](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

＃＃ 用法
仅需设备的 IP 地址。请在您的路由器中查找（例如 `MiCO`）。

某些设备可能缺少部分变量，因此在对象树中将保持空白。

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

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
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

### 1.2.0 (2025-02-10)
* (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now.
* (mcm1957) Adapter migrated to eslint 9 / @iobroker/eslint-config
* (mcm1957) Materialize UI support has been removed
* (mcm1957) jsonConfig responsive design size attributes have been added
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