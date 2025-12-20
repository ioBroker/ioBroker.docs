---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.serial-gps/README.md
title: ioBroker GPS（串口/USB）适配器
hash: irZI9P1HaevB1JfqsORV18PYiRQa6GtdObs6ErX+dS8=
---
![安装数量](http://iobroker.live/badges/serial-gps-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.serial-gps.svg)
![下载](https://img.shields.io/npm/dm/iobroker.serial-gps.svg)

<img src="admin/serial-gps.svg" style="width: 100px;"/>

# IoBroker GPS（串口/USB）适配器
![测试与发布](https://github.com/ioBroker/ioBroker.serial-gps/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/serial-gps/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

该适配器可从串行或 USB GPS 设备读取 GPS 数据，并将其提供给 ioBroker 使用。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

＃＃ 入门
将 USB 或串口 GPS 接收器插入 ioBroker 主机系统。确保操作系统能够识别该设备，并记下分配的串口（例如 Windows 系统上的 COM3 或 Linux 系统上的 /dev/ttyUSB0）。

进入适配器配置页面，选择串口和其他必要的参数（默认波特率通常为 4800 或 9600）。保存并启动适配器。稍等片刻，GPS 数据应该会出现在适配器的数据点中。

## 已测试设备
通常情况下，所有通过串口或 USB 接口传输 NMEA 数据的设备都应该可以正常工作。以下是一些已经过测试的设备：

GlobalSat BU-353N5 USB-GNSS接收器
VK-162 G-Mouse USB GPS
G72 G-Mouse USB

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 0.0.4 (2025-12-03)
- (@GermanBluefox) Corrected issues for repo checker

### 0.0.3 (2025-12-01)
- (@GermanBluefox) Initial release

## License

The MIT License (MIT)

Copyright (c) 2025 bluefox <dogafox@gmail.com>

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