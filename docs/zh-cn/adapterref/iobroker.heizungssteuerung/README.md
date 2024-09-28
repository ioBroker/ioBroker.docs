---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.heizungssteuerung/README.md
title: ioBroker.heizungssteuerung
hash: SLEQGS3SNTdTr/oW8nwQtR2kQ0/Z0t0u8fgAHgisX6s=
---
![标识](../../../en/adapterref/iobroker.heizungssteuerung/admin/heizungssteuerung.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.heizungssteuerung.svg)
![下载](https://img.shields.io/npm/dm/iobroker.heizungssteuerung.svg)
![安装数量](https://iobroker.live/badges/heizungssteuerung-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/heizungssteuerung-stable.svg)
![依赖状态](https://img.shields.io/david/jbeenenga/iobroker.heizungssteuerung.svg)
![新平台](https://nodei.co/npm/iobroker.heizungssteuerung.png?downloads=true)

# IoBroker.heizungssteuerung
**测试：**![测试与发布](https://github.com/jbeenenga/ioBroker.heizungssteuerung/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Heizungssteuerung 适配器
此适配器可用于管理供暖系统。您可以选择制冷或供暖模式，并为某个房间启用升温或暂停。此外，您还可以覆盖某个房间的目标温度。

＃＃ 配置
要使用适配器，您必须将房间添加到房间枚举中，并将传感器和引擎添加到房间。
此外，您必须将温度、湿度和引擎功能添加到正确的状态。枚举将在适配器首次启动后创建。如果您没有湿度传感器，您可以将其留空。
![配置示例](../../../en/adapterref/iobroker.heizungssteuerung/img/configExample.png)

### 主要设置
####加热模式
您可以选择制冷或制热。

#### 在适配器启动时将温度重置为默认值
如果此设置处于活动状态，则所有温度状态将被默认温度和 targetUntil 覆盖。因此，下一次温度检查将把温度设置为周期内设置的配置温度。

#### 如果湿度高于，则停止冷却
如果湿度达到，冷却将停止。只有当您将湿度传感器添加到功能和房间时，它才有效。

#### 更新间隔（秒）
定义适配器检查温度并设置引擎的频率

#### 默认温度
定义当房间没有匹配的时间段时要设置的温度

#### 暂停结束时间（分钟）
定义暂停状态重置为非活动状态的时间（分钟）

#### 提升结束时间（分钟）
定义升压状态重置为非活动状态的时间（分钟）

#### 与目标温度的差异直到开始或停止加热
定义与目标温度之间的差异，直到适配器开始或停止加热。例如，如果目标温度为 20°，则此设置为 0.5，并且发动机关闭，如果温度低于 19.5°，将启动加热，如果温度高于 20.5°，将停止加热。

### 句号
您可以为每个房间和时间定义时间段。此外，您还可以定义此时间段是用于制冷还是制热。如果制热模式与主设置上的设置模式不匹配，则将忽略该时间段。

### 动作
在适配器运行时，您可以使用操作来更改特殊情况的处理。这些操作可在适配器下方的 *Actions* 文件夹中的对象中找到。有些操作适用于所有房间和特殊房间。

#### 缺席 若要停用供暖控制（例如假期），您可以在 *Actions attendanceUntil* 中的对象中插入缺席截止日期。在这里，您可以输入格式为 *dd.MM.yyyy hh:mm* 的日期（例如 *01.01.2024 14:00*）。如果激活，时间段将被忽略，温度将设置为 [默认温度](#default-temperature)。
此配置一般适用于所有房间。

＃＃＃＃ 暂停
要暂时停止加热，您可以激活暂停。暂停状态将在[设置](#time-until-pause-will-be-end-in-minutes) 中定义的时间后重置为停用状态。如果暂停处于活动状态，则将忽略时间段，并且不会进行加热。

此配置适用于所有一般房间以及特殊房间。

＃＃＃＃ 促进
要暂时停止加热，您可以激活升压。在[设置](#time-until-boost-will-be-end-in-minutes) 中定义的时间过后，升压状态将重置为停用状态。如果升压处于活动状态，则将忽略时间段并执行加热。

此配置适用于所有一般房间以及特殊房间。

图片
主图由 Freepick 创建（https://www.flaticon.com/de/kostenloses-icon/heizung_1295221）

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 2.0.0 (2024-09-17)
* (jbeenenga) update dependencies
* (jbeenenga) add absence mode
* (jbeenenga) fix pause and boost for cooling mode

### 1.7.0 (2023-01-05)
* (jbeenenga) fix bug for end boost or pause mode
* (jbeenenga) provide corrent humidity in temperatures

### 1.6.7 (2022-12-16)
* (jbeenenga) fix date format

### 1.6.5 (2022-12-16)
* (jbeenenga) add possibility to reset temperatures on adapter start

### 1.6.4 (2022-12-16)
* (jbeenenga) add more debug outputs
* (jbeenenga) fixed incorrect period to room mapping

### 1.6.3 (2022-12-15)
* (jbeenenga) removed unnecessary debug output

### 1.6.2 (2022-12-15)
* (jbeenenga) fix for temperature calculation

### 1.5.0 (2022-09-25)
* (jbeenenga) add possibility to overwrite temperature temporarily
* (jbeenenga) add config for temperature offset
* (jbeenenga) add boost and pause function

## License
MIT License

Copyright (c) 2024 jbeenenga <j.beenenga@gmail.com>

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