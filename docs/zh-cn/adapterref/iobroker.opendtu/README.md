---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.opendtu/README.md
title: ioBroker.opendtu
hash: alLXbwYFsoM6loMs4wtm8WG7PEhiR+WLYwwf3XsM8wg=
---
![标识](../../../en/adapterref/iobroker.opendtu/admin/opendtu.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.opendtu.svg)
![下载](https://img.shields.io/npm/dm/iobroker.opendtu.svg)
![安装数量](https://iobroker.live/badges/opendtu-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/opendtu-stable.svg)
![新平台](https://nodei.co/npm/iobroker.opendtu.png?downloads=true)

# IoBroker.opendtu
**测试：**![测试和发布](https://github.com/o0shojo0o/ioBroker.opendtu/workflows/Test%20and%20Release/badge.svg) [![CodeQL](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml/badge.svg)](https://github.com/o0shojo0o/ioBroker.opendtu/actions/workflows/codeql.yml)

## IoBroker 的 opendtu 适配器
此适配器可实时获取项目[开放DTU](https://github.com/tbnobody/OpenDTU) 中的可用数据点。
此外，还可通过适配器使用以下数据点来控制 OpenDTU 的功率限制。

```
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_absolute
- opendtu.0.xxxxxx.power_control.limit_nonpersistent_relative
- opendtu.0.xxxxxx.power_control.limit_persistent_absolute
- opendtu.0.xxxxxx.power_control.limit_persistent_relative
```

有关数据点的更多信息，请参阅其描述或单击[这里](https://github.com/tbnobody/OpenDTU/blob/master/docs/MQTT_Topics.md#inverter-limit-specific-topics)。

## 致谢
如果没有@o0Shojo0o (https://github.com/o0Shojo0o) 的出色工作，这个适配器就不可能实现，他开发了此适配器的早期版本。

## 如何报告问题和功能请求
理想情况下，请使用 GitHub 问题来实现这一点，最佳方法是将适配器设置为调试日志模式（实例 -> 专家模式 -> 列日志级别）。然后通过“log”ioBroker 子目录从磁盘检索日志文件，**不是**从 Admin 检索，这样会切断线路。

＃＃ 配置
1. 创建适配器的新实例
2. 填写 [OpenDTU](https://github.com/tbnobody/OpenDTU) 硬件的安全性 *(默认 http)*、IP 地址和端口 *(默认 80)*
3. 设置 WebUI 密码（这是强制性的，如果不正确则无法设置限制！）**
4.保存设置

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (mattreim) Description has benn translated into supported languages.
- (mattreim) Admin-UI has been adapted for some display sizes.

### 3.0.1 (2024-10-26)
- (simatec) Admin-UI has been adapted for small displays.
- (mcm1957) Dependencies have been updated.

### 3.0.0 (2024-10-19)
- (mcm1957) Adapter has been moved to iobroker-community-adapter organisation.
- (mcm1957) Adapter requires js-controller 5, admin 6 and node.js 20 now.
- (mcm1957) Dependencies have been updated.

### 2.1.0 (2024-10-11)

- (o0shojo0o) update dependencies
- (mattreim) support small screens
- (mattreim) update translations
- (mattreim) update object names
- (mattreim) add variable polling intervall [1-59s]

### 2.0.0 (2024-08-13)

- (o0shojo0o) changes for new websocket structure ([#129](https://github.com/o0shojo0o/ioBroker.opendtu/issues/129))
- (o0shojo0o) `Efficiency`, `YieldTotal`, `YieldDay` and `DC Power` moved from the AC section to the INV (old data points must be removed manually)
- (mattreim) update to current OpenDTU logo ([#156](https://github.com/o0shojo0o/ioBroker.opendtu/issues/156))
- (mattreim) update dependencies ([#162](https://github.com/o0shojo0o/ioBroker.opendtu/issues/162)), ([#179](https://github.com/o0shojo0o/ioBroker.opendtu/issues/179))
- (mattreim) fix GUI translation ([#163](https://github.com/o0shojo0o/ioBroker.opendtu/issues/163))

### 1.0.1 (2023-10-29)

- (o0shojo0o) fixed `power_control.current_limit_absolute" has value "-1" less than min "0"`

## License
MIT License

Copyright (c) 2024 Dennis Rathjen <dennis.rathjen@outlook.de>

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