---
BADGE-Number of Installations: http://iobroker.live/badges/pvforecast-stable.svg
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.pvforecast.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.pvforecast.svg
chapters: {"pages":{"de/adapterref/iobroker.pvforecast/README.md":{"title":{"de":"ioBroker.pvforecast - Adapter zu vorhersage eurer PV Erträge"},"content":"de/adapterref/iobroker.pvforecast/README.md"},"de/adapterref/iobroker.pvforecast/vis.md":{"title":{"de":"ioBroker.pvforecast - VIS"},"content":"de/adapterref/iobroker.pvforecast/vis.md"}}}
translatedFrom: de
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.pvforecast/README.md
title: ioBroker.pvforecast - 预测您的 PV 收益的适配器
hash: Bbhc7irZCl3O4bKUIc/psLdgMbVDh9FMDUbbAD7eTnU=
---
![商标](../../../de/admin/pvforecast.png)

# IoBroker.pvforecast - 用于预测您的 PV 收益的适配器
此适配器替换了 [ioBroker论坛](https://forum.iobroker.net/topic/26068/forecast-solar-mit-dem-systeminfo-adapter) 中的 JavaScript

适配器使用以下数据从 https://api.forecast.solar 获取基本数据：

## 设置
1. 经度（-180（西）…180（东））
2. 纬度 -90（南）… 90（北）
3.链接到页面
4. API密钥
5. Y轴阶段图
6. 安排数据检索（分钟）- 安排每 x 分钟从服务器检索数据。

![预测选项](https://user-images.githubusercontent.com/76852173/155196476-8c8210d9-bdb2-456b-a0aa-1dd411efea5e.JPG)

也可以使用 API 密钥获取天气。

1. datetime - 日期和时间
2. 天空 - 晴空的百分比值在 0 到 1 之间 [1 = 晴空]。
3. 温度 [°C]
4.状态-文本
5.图标-文字+数字
6. 风速 - [km/h]
7. 风角 - 北 0°[顺时针方向]。 （如果风速为零，则该值未定义）
8. 风向 - 简称
9. 更高的时间分辨率

## 以下设置可用于系统
1.倾斜（0°-90°）
2. 方位角（-180 = 北，-90 = 东，0 = 南，90 = 西，180 = 北）
3.厂电（千瓦时）
4、植物名称
5. 图表图例名称
9.图表颜色
10.图表标签颜色

![光伏预测光伏系统](https://user-images.githubusercontent.com/76852173/155196535-6828775a-8234-4a6a-b2a3-03d7fd88c80d.JPG)

所有这些信息都是确保适配器正常工作所必需的。

如果经度和纬度已经存储在系统中，系统会自动将数据输入到字段中。

## 可视化示例
在加载示例之前，请安装：[物料设计](https://github.com/Scrounger/ioBroker.vis-materialdesign)。
如果你想在 ioBroker Vis 中使用 Json 图和表，你会在这里找到一个[例子](./vis.md)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (Apollon77) Added Sentry for crash reporting
* (klein0r) Dropped Admin 5 support
* (klein0r) Added Ukrainian language

### 2.4.0 (2022-12-09)
* (stromdao) Added SolarPredictionAPI

### 2.3.0 (2022-06-26)
* (klein0r) Add summary values to InfluxDB
* (klein0r) Use cron to ensure update on day change
* (klein0r) Removed visibility from weather data (doesn't exist in response)

### 2.2.1 (2022-06-23)
* (klein0r) Fixed tilt validation - allow zero tilt (0)

### 2.2.0 (2022-06-09)
* (klein0r) Added raw JSON data states for own graphs
* (klein0r) Improved debug log
* (klein0r) Updated azimuth image for dark theme

### 2.1.5 (2022-06-03)
* (klein0r) Added installed peak power as state
* (klein0r) Fixed time shift when using solcast

## License
MIT License

Copyright (c) 2021-2023 Patrick-Walther
                   Matthias Kleine <info@haus-automatisierung.com>

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