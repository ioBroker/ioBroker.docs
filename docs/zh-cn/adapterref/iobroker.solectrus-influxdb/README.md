---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solectrus-influxdb/README.md
title: ioBroker.solectrus-influxdb
hash: rCq4ma/IZnq76/UJR10TNI1+fJB+aYyekLmp8R/XtsM=
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

# 🌞 SOLECTRUS InfluxDB 适配器（适用于 ioBroker）
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
### 1.7.0 (2026-04-10)

* (patricknitsch) Increased max value from 10.000W to 15.000W
* (copilot) Zero-value alive monitoring: when a sensor timeout fires and the current value is 0, log info instead of warn and retry after 60 minutes
* (copilot) Sensor overview: numeric value row shows current value with unit (W) left-aligned and max value with unit (W) right-aligned
* (copilot) Sensor overview: timestamp row shows last timestamp left-aligned and auto-computed next expected update timestamp right-aligned (no manual input needed)
* (copilot) Sensor overview: change Format

### 1.6.0 (2026-04-06)

* (patricknitsch) Catch max. Values - settable in Config
* (patricknitsch) Increase Version from 20 to 24 becauso of deploy error
* (copilot) Add Alive monitoring: configurable timeout warns when sensor values are not updated

### 1.5.0 (2026-03-21)

* (patricknitsch) Fix Issues RepoChecker
* (copilot) Add Tab for SOLECTRUS iFrame

### 1.4.1 (2026-03-18)

* (copilot) Update Tab Format
* (copilot) Update Readme
* (patricknitsch) Update Packages

### 1.4.0 (2026-03-16)

* (copilot) Fix String Handling in Formula Engine
* (copilot) Fix Formula Engine when using state formulas
* (copilot) New Page for smart Sensor Overview
* (patricknitsch) Update Readme and Doc

### 1.3.1 (2026-03-06)

* (claude) Fix DS Tick time budget

### 1.3.0 (2026-03-04)

* (claude) Fix DS Tick time budget
* (patricknitsch) Update Admin Package
* (claude) Change Admin to easy and expert mode
* (claude) Add information in easy mode 
* (claude) Add type json for sending json, i.e. forecast
* (claude) Update Readme

### 1.2.2 (2026-02-24)

* (claude) Synchronize Formal Engine with Repo from Felliglanz
* (claude) Add Warning after first start, if value is negative
* (claude) Add Comment on first page, that SOLECTRUS doesn't accept negative values
* (claude) Update Readme and Translations

### 1.2.1 (2026-02-13)

* (patricknitsch) Fix wrong package

### 1.2.0 (2026-02-13)

* (claude) Concurrent collect and flush without delay of 5s

### 1.1.2 (2026-02-13)

* (patricknitsch) Fix Eslint-Warnings

### 1.1.1 (2026-02-12)

* (patricknitsch) Fix Eslint-Errors

### 1.1.0 (2026-02-12)

* (claude) Add Formula Engine to build own sensors

### 1.0.0 (2026-01-31)

* (patricknitsch) change Config for Encryption -> Credentials must be re-entered

### 0.3.5 (2026-01-30)

* (patricknitsch) Using node:package format
* (patricknitsch) encrypt sensitive information -> Token must be re-entered
* (patricknitsch) onStateChange ignores ack flag
* (patricknitsch) creation of intermediate objects missing
* (patricknitsch) using this.setTimeout
* (patricknitsch) check and limit configurable timeouts/intervals
* (patricknitsch) Extend Readme

### 0.3.4 (2026-01-19)

* (patricknitsch) Update Readme and split it in two own docs

### 0.3.3 (2026-01-19)

* (patricknitsch) Try fixing automatic npm release

### 0.3.2 (2026-01-19)

* (patricknitsch) change Repo from ssh to https

### 0.3.1 (2026-01-19)

* (Felliglanz) Fix some issues in UI

### 0.3.0 (2026-01-18)

* (patricknitsch) Better handling of Influx Connection, also if no sensor is active
* (Felliglanz) Rebuild of UI with actual status of each sensor

### 0.2.0 (2026-01-18)

* (patricknitsch) Refactoring code and improve readability
* (patricknitsch) Buffer values and send to Influx if Influx is online
* (patricknitsch) Save max. 100000 values and send all to Influx if Influx is online again
* (patricknitsch) Split Data Collecting and Influx writing
* (patricknitsch) Updated Translations

### 0.1.5 (2026-01-17)

* (Felliglanz) Improve sensor configuration UI (accordion)

### 0.1.4 (2026-01-15)

* (patricknitsch) Bugfix with Icon

### 0.1.3 (2026-01-15)

* (patricknitsch) Bugfix for License
* (patricknitsch) Bugfix for Interval
* (patricknitsch) Synchronize Names, Measurements and Fields to SOLECTRUS Documentation

### 0.1.2 (2026-01-14)
* (patricknitsch) change UI to look for Source in Tree

### 0.1.1 (2026-01-14)
* (patricknitsch) add more Debugging
* (patricknitsch) optimize translation

### 0.1.0 (2026-01-14)
* (patricknitsch) initial release

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