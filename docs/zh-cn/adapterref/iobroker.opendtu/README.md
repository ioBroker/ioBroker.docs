---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.opendtu/README.md
title: ioBroker.opendtu
hash: iL8WZu4JPaW2bMkFx9uIvF37y/hmAHtlwdE2mgGHVJw=
---
![标识](../../../en/adapterref/iobroker.opendtu/admin/opendtu.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.opendtu.svg)
![下载](https://img.shields.io/npm/dm/iobroker.opendtu.svg)
![安装数量](https://iobroker.live/badges/opendtu-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/opendtu-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)

# IoBroker.opendtu
**测试：** ![测试和发布](https://github.com/o0shojo0o/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/o0shojo0o/ioBroker.opendtu /actions/workflows/codeql.yml/badge.svg)](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml)

# 我正在寻找这个适配器的新维护者，如果您有兴趣，请通过问题与我联系！
## IoBroker 的 opendtu 适配器
该适配器实时获取来自项目[开放式DTU](https://github.com/tbnobody/OpenDTU)的数据点。
此外，可以通过适配器使用以下数据点来控制 OpenDTU 的功率限制。

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative
```

有关数据点的更多信息，请参阅其描述或单击[这里](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics)。

＃＃ 配置
1. 创建适配器的新实例
2.填写[OpenDTU](https://github.com/tbnobody/OpenDTU)硬件的Scheme*(默认http)*、WebUi-Address和WebUi-port*(默认80)*
3.设置WebUi密码**（此为必填项，如果不正确则无法设置限制！）**
4. 保存设置

## Changelog
<!--
 https://github.com/AlCalzone/release-script#usage
    npm run release major -- -p iobroker license --all 0.9.8 -> 1.0.0
    npm run release minor -- -p iobroker license --all 0.9.8 -> 0.10.0
    npm run release patch -- -p iobroker license --all 0.9.8 -> 0.9.9
    npm run release prerelease beta -- -p iobroker license --all v0.2.1 -> v0.2.2-beta.0
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.0.1 (2023-10-29)

- (o0shojo0o) fixed `power_control.current_limit_absolute" has value "-1" less than min "0"`

### 1.0.0 (2023-10-01)

- (o0shojo0o) Increase to the first major release, as it has now reached a stable level. 
- (o0shojo0o) added yieldtotal Protection against incorrect zeroing when the OpenDTU restarts if the inverter is not accessible
- (o0shojo0o) added option `Set the states to 0 if the inverter is not accessible.` ([#97](https://github.com/o0shojo0o/ioBroker.opendtu/issues/97))

### 0.1.8 (2023-09-22)

- (o0shojo0o) added option `Protect self-set names from being overwritten by the adapter` ([#76](https://github.com/o0shojo0o/ioBroker.opendtu/issues/76))
- (o0shojo0o) allow multiple AdminTabs for multiple instances ([#88](https://github.com/o0shojo0o/ioBroker.opendtu/issues/88))
- (o0shojo0o) fixed password with special characters ([#35](https://github.com/o0shojo0o/ioBroker.opendtu/issues/35))
- (o0shojo0o) fixed incorrect handling of zeroing of `yield*` data points by OpenDTU ([#96](https://github.com/o0shojo0o/ioBroker.opendtu/issues/96))
- (o0shojo0o) remove zeroing of `yield*` data points by this adapter ([#96](https://github.com/o0shojo0o/ioBroker.opendtu/issues/96))

### 0.1.7 (2023-06-30)

- (o0shojo0o) workaround for incorrectly used button data point

### 0.1.6 (2023-06-30)

- (o0shojo0o) fixed power control (power_off)

### 0.1.5 (2023-05-15)

- (o0shojo0o) code optimizations

### 0.1.4 (2023-03-23)

- (o0shojo0o) fixed power control `on`, `off`, `restart`
- (o0shojo0o) support for password protected liveview
- (o0shojo0o) other small fixes

### 0.1.2 (2023-03-03)

- (o0shojo0o) fixed yield* values

### 0.1.1 (2023-02-24)

- (o0shojo0o) state rolls corrected
- (o0shojo0o) add DTU datapoint `rssi` and `ip`
- (o0shojo0o) repeated writing of the yieldtotal set to 00:01:00. (is necessary for e.g. sourceanalytix)

### 0.1.0 (2023-02-17)

- (o0shojo0o) initial release

## License
MIT License

Copyright (c) 2023 Dennis Rathjen <dennis.rathjen@outlook.de>

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