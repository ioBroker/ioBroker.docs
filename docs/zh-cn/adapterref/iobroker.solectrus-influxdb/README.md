---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: Ft6MNdsDi/S4yAN52SJfevQ7eH1DOariBM1/5zxBbBk=
---
# IoBroker.solectrus-influxdb

![NPM 版本](https://img.shields.io/npm/v/iobroker.solectrus-influxdb.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solectrus-influxdb.svg)
![安装数量](https://iobroker.live/badges/solectrus-influxdb-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/solectrus-influxdb-stable.svg)
![NPM](https://nodei.co/npm/iobroker.solectrus-influxdb.png?downloads=true)
![ioBroker](https://img.shields.io/badge/ioBroker-Adapter-blue)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D20-green)
![InfluxDB](https://img.shields.io/badge/InfluxDB-2.x-orange)
![执照](https://img.shields.io/badge/License-MIT-lightgrey)

**测试：** ![测试与发布](https://github.com/patricknitsch/ioBroker.solectrus-influxdb/workflows/Test%20and%20Release/badge.svg)

## 🌞 SOLECTRUS InfluxDB 适配器（适用于 ioBroker）
---

＃＃ 概述
SOLECTRUS InfluxDB 适配器将选定的 ioBroker 状态存储到 InfluxDB 2.x 数据库中，并可选择使用内置公式引擎计算派生值。

它专为光伏装置、电池储能、热泵、壁挂式储能箱、电网进出口监测和定制传感器等能源监测系统而设计。

＃＃＃ 特征
- **传感器映射** -- 将任何 ioBroker 状态映射到 InfluxDB 测量/字段，数据类型可配置（int、float、bool、string）
- **可靠的缓冲** -- 持久写入缓冲区（最多 10 万个数据点）即使在 InfluxDB 服务中断和适配器重启后也能正常工作
- **Data-SOLECTRUS 公式引擎**（可选）—— 使用公式、源镜像或基于规则的状态机，从多个输入计算派生值。
- **状态机模式** -- 根据规则条件（先匹配获胜）生成字符串/布尔状态，非常适合用于状态标签和操作模式
- **公式生成器** -- 可视化编辑器，支持拖放式构建模块、实时预览、运算符提示和示例模式
- **文件夹分组** -- 将计算值整理到文件夹中，以便更好地概览

### 快速入门
1. 通过 ioBroker 管理界面安装适配器
2. 在“InfluxDB”选项卡上配置 InfluxDB 连接（URL、组织、存储桶、令牌）。
3. 在“传感器”选项卡上映射您的 ioBroker 状态
4. （可选）启用 **Data-SOLECTRUS** 复选框，以解锁包含 **数据值** 和 **数据运行时** 选项卡的公式引擎。
5. 保存并启动适配器

---

## 文档
[🇺🇸 文档](./docs/en/README.md)

[🇩🇪 文献](./docs/de/README.md)

---

＃＃＃ 要求
- ioBroker >= 最新稳定版
- Node.js 版本 >= 20
- InfluxDB 2.x

---

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.8.6 (2026-05-25)
* (copilot) Fixes for Repo Checker

### 1.8.5 (2026-05-23)
* (copilot) Add Icons in Notification

### 1.8.4 (2026-05-23)
* (patricknitsch) Fix missing unit in Formula-Engine

### 1.8.3 (2026-05-21)
* (copilot) Modify notification manager to work with instances
* (copilot) Update Dependencies

### 1.8.2 (2026-05-03)
* (copilot) Adapter requires node.js >= 22 now
* (copilot) Fix sensor duplicate: stale draft cache caused wrong sensor data to appear in the detail panel after duplicating or deleting a sensor
* (copilot) Update Dependencies

## License

MIT License

Copyright (c) 2026 patricknitsch <patricknitsch@web.de>

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