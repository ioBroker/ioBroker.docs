---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.witmotion/README.md
title: ioBroker WitMotion
hash: aiQstHCtBTep6w6TDMEZcwOqb+TMIMoQQZn56mt0azM=
---
![标识](../../../en/adapterref/iobroker.witmotion/admin/witmotion.png)

![安装数量](http://iobroker.live/badges/witmotion-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.witmotion.svg)
![下载](https://img.shields.io/npm/dm/iobroker.witmotion.svg)

# IoBroker WitMotion
![测试与发布](https://github.com/ioBroker/ioBroker.witmotion/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/witmotion/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

![WT901blecl](../../../en/adapterref/iobroker.witmotion/image/wit-wt901blecl-5-0.jpg)

通过 USB 读取 WT901blecl 5.0 蓝牙 5.0 9 轴 IMU 传感器 (MPU9250) 的数据，并将其写入 ioBroker 数据点。

以下数据将被读取并写入ioBroker：

- X/Y/Z轴加速度
- 陀螺仪 X/Y/Z
- 磁力计 X/Y/Z

## 支持的设备
- [WT901blecl 5.0](https://witmotion-sensor.com/products/bluetooth-5-0-accelerometer-inclinometer-wt901blecl-mpu9250-9-axis-imu-sensor)

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### 0.0.4 (2026-03-26)
* (@GermanBluefox) Tests fixed

### 0.0.3 (2026-01-23)
* (@GermanBluefox) Initial commit

## License

The MIT License (MIT)

Copyright (c) 2026, Denis Haev <dogafox@gmail.com>

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