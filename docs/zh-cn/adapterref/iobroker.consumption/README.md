---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.consumption/README.md
title: ioBroker.消费
hash: IU3fuiA8q7+wtovCQhv0niK5RpmRWduO6XYklZ+qGVk=
---
![标识](../../../en/adapterref/iobroker.consumption/admin/consumption.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.consumption.svg)
![下载](https://img.shields.io/npm/dm/iobroker.consumption.svg)
![依赖状态](https://img.shields.io/david/bluefox/iobroker.consumption.svg)
![已知漏洞](https://snyk.io/test/github/bluefox/ioBroker.consumption/badge.svg)
![NPM](https://nodei.co/npm/iobroker.consumption.png?downloads=true)

# IoBroker.消费
## IoBroker 的消费适配器
计算定义的传感器和资源的消耗。

您可以定义不同的资源，如水、暖气、电力，并对其进行分析。

实现了 4 种不同的分析类型：

- 计划 - 今年与计划值和上一年相比的实际消费量（以欧元/美元表示）。
- 甜甜圈 - 以饼图/甜甜圈图的形式比较传感器或资源
- 堆栈 - 每个传感器和资源的每月消耗量与上一年的数据相比，以堆栈条形图的形式表示。
- 热图 - 今年资源的每小时消耗量
- 表格 - 每个传感器和资源的每月消耗量与上一年相比以表格形式

＃＃ 要求
适配器需要安装 my-SQL 或 postgres SQL DB 和 ioBroker.sql 适配器（它将自动安装）它也应该与 SQLite 一起工作，但由于性能原因不推荐使用。

MS-SQL 尚不支持，但如果需要可以轻松实现。

**适配器仍处于测试阶段。**

**免费版仅支持 4 个传感器和一个站点。**要支持更多传感器或站点，您需要一个有效的许可证。通过 info@iobroker.com 索取。

＃＃ 用法
你有资源（如水、能源、暖气、煤气等）、站点（如房屋、别墅、乡村别墅等）和传感器。

传感器是一个计数器，它总是增加它的值，就像电表一直在增长一样。

您必须首先将所有这些传感器分布到定义的资源中，然后再分布到站点中。

**实际上只支持一站！**

之后，您可以分析多年来的时间和资源消耗。

您可以将实际年份与上一年进行比较，并对消费做出一些预测。

计划当年的所有费用。
![预后](../../../en/adapterref/iobroker.consumption/img/planAll.png)

按资源分配成本。
![预后](../../../en/adapterref/iobroker.consumption/img/pieAll.png)

一种资源的传感器消耗分布。
![预后](../../../en/adapterref/iobroker.consumption/img/pieHeating.png)

传感器的消耗分布和一种资源的月数。
![预后](../../../en/adapterref/iobroker.consumption/img/stackBarWater.png)

当年一种资源消耗的热图。
![预后](../../../en/adapterref/iobroker.consumption/img/heatmap.png)

当年每个月一种资源的消耗表。
![预后](../../../en/adapterref/iobroker.consumption/img/tableHeating.png)

### 隐函数
传感器数据可以转换，但公式必须是线性的。
您可以用 javascript 编写公式，但注意结果必须是数字（浮点数）。
例子：

- Wh => kWh: `val / 1000`
- kWh => Wh: `val * 1000`
- °F => °C：`(val - 32) / 1.8`
- °C => °F：`val * 1.8 + 32`

## 更新echarts（仅供开发者使用）
前往 https://echarts.apache.org/en/builder.html 选择：

- 图表：条形图、折线图、饼图、热图，
- 坐标系：网格
- 组件：标题、图例、工具提示、MarkPoint、MarkArea、VisualMap、工具箱
- 其他：SVG 渲染器、实用程序、代码压缩

＃＃ 去做
- 每种传感器的价格
- 更改价格：
  - 按资源删除所有价格，
  - 每个传感器添加复选框：自己的价格
  - 如果每个传感器都有自己的价格，则隐藏站=>资源价格
  - 直接写入状态，不将价格保存在对象中

- 热图
  - 按年份显示
- 图表

- 将数据导出为 PDF
- 不止一站。
- 根据主题（单位、开始、结束）选择风格

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->
## 允许使用
一份许可授予执行一次软件安装的权利。
软件的每次额外安装都需要额外购买的许可证。

## Changelog
### 0.7.0 (2023-02-08)
* (bluefox) Added offset and factor to sensors

### 0.6.7 (2023-02-06)
* (bluefox) Added new features to table

### 0.6.0 (2023-01-30)
* (bluefox) Activated ignoring of null values by SQL

### 0.5.0 (2022-11-15)
* (bluefox) Charts were corrected

### 0.4.20 (2022-09-30)
* (bluefox) GUI was improved

### 0.4.18 (2021-07-09)
* (bluefox) The warnings were corrected

### 0.4.17 (2021-01-16)
* (bluefox) Corrected the conversion of values

### 0.4.15 (2021-01-06)
* (bluefox) Corrected forecast calculation based on current second of the month
* (bluefox) Added convert function

### 0.4.14 (2021-01-05)
* (bluefox) Corrected price calculation

### 0.4.13 (2020-12-13)
* (bluefox) Updated the select ID dialog

### 0.4.12 (2020-12-12)
* (bluefox) Added stations editor

### 0.4.11 (2020-12-10)
* (bluefox) Corrected the widget errors

### 0.4.9 (2020-12-06)
* (bluefox) Corrected error with the pie chart

### 0.4.7 (2020-11-16)
* (bluefox) Implemented the combine by unit

### 0.4.3 (2020-09-11)
* (bluefox) Fixed the layout in firefox

### 0.4.1 (2020-06-13)
* (bluefox) Ignore nulls and zeros

### 0.3.4 (2020-06-05)
* (bluefox) Added possibility to define the station

### 0.3.2 (2020-05-29)
* (bluefox) Fixed the units for heat-map

### 0.3.0 (2020-05-18)
* (bluefox) Calculate plan only in euro

### 0.2.7 (2020-05-16)
* (bluefox) Set index for every sensor

### 0.1.6 (2020-05-03)
* (bluefox) Implement planning start from

### 0.1.4 (2020-05-03)
* (bluefox) Make widget compatible with older devices
* (bluefox) Added price for every sensor

### 0.1.2
* (bluefox) finished

### 0.0.2
* (bluefox) initial release

## License

Commercial license.

(c) Copyright 2020-2023 Bluefox <dogafox@gmail.com>, all rights reserved.

This license is a legal agreement between you and ioBroker GmbH (“ioBroker”) for the use of `ioBroker.consumption` adapter (the “Software”).
By downloading of `ioBroker.consumption` adapter you agree to be bound by the terms and conditions of this license.
ioBroker GmbH reserves the right to alter this agreement at any time, for any reason, without notice.