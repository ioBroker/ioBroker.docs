---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.mitsubishi-local-control/README.md
title: ioBroker.mitsubishi-local-control
hash: 1qJ6gtA+lRsSdjDDmnBQ2zHVIxtheukE5AKkYM1VSJo=
---
![标识](../../../en/adapterref/iobroker.mitsubishi-local-control/admin/mitsubishi-local-control.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.mitsubishi-local-control.svg)
![下载](https://img.shields.io/npm/dm/iobroker.mitsubishi-local-control.svg)
![安装数量](https://iobroker.live/badges/mitsubishi-local-control-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/mitsubishi-local-control-stable.svg)
![NPM](https://nodei.co/npm/iobroker.mitsubishi-local-control.png?downloads=true)
![已知漏洞](https://snyk.io/test/github/Black-Thunder/ioBroker.mitsubishi-local-control/badge.svg)

# IoBroker.mitsubishi-local-control
## 适用于 ioBroker 的 mitsubishi-local-control 适配器
**mitsubishi-local-control** 适配器通过**直接本地连接**将三菱电机空调系统集成到**ioBroker**中。

＃＃ 特征
- 通过三菱Wi-Fi接口进行直接本地控制
无需云端，无需外部依赖
- 读取和写入设备状态
- 定期轮询设备状态
- 支持多种设备
- 自动设备状态同步

## 文档：
- [英文描述](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/en/mitsubishi-local-control.md)
- [德语描述](https://github.com/Black-Thunder/ioBroker.mitsubishi-local-control/tree/main/docs/de/mitsubishi-local-control.md)

＃＃ 讨论：
- [ioBroker 论坛](https://forum.iobroker.net/topic/83267)

## 致谢
特别感谢 [尼俄柏斯](https://github.com/pymitsubishi/pymitsubishi) 对 API 的逆向工程！

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (Black-Thunder) Adapter requires admin version >=7.6.20 now

### 1.0.5 (2026-01-13)

- (Black-Thunder) Creation of adapter objects was fixed

### 1.0.4 (2026-01-11)

- (Black-Thunder) Dependencies were updated

### 1.0.3 (2025-12-29)

- (Black-Thunder) Cleaned up some code

### 1.0.2 (2025-12-25)

- (Black-Thunder) Implemented command coalescing and mapped AUTO mode correctly

### 1.0.1 (2025-12-21)

- (Black-Thunder) Refactored energy and power state properties

### 1.0.0 (2025-12-18)

- (Black-Thunder) initial release

## License

MIT License

Copyright (c) 2025-2026 Black-Thunder <glwars@aol.de>

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