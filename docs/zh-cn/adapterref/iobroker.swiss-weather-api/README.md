---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: 08DpwOoVWwsSq0OicV4KNdP1ZymY3oIxILltcZt36vY=
---
![标识](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![安装数量（最新）](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![已知漏洞](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![GitHub 问题](https://img.shields.io/github/issues/baerengraben/ioBroker.swiss-weather-api?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/baerengraben/ioBroker.swiss-weather-api/test-and-release.yml?branch=master&logo=github&style=flat-square)
![国家公共管理](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)

# IoBroker.swiss-weather-api
# IoBroker 的 swiss-weather-api 适配器
连接到强大的 SRF 天气 API - 版本 2 (https://developer.srgssr.ch/api-catalog/srf-weather/srf-weather-description)。
SRF Weather REST API 允许您获取瑞士 25,000 多个地点的天气预报和报告。 “免费增值”订阅允许您每天收到 25 个请求。

＃＃ **请注意：**
1. 此适配器仅支持瑞士境内的位置。
1. 适配器版本 1.0.6 之前支持 SRF Weather API V1。从版本 2.0.0 开始支持 SRF Weather API V2

## **将程序版本 1.x.x 更新到 2.0.x**
- 删除适配器（删除ioBroker中的所有适配器对象！）
- 安装全新的适配器 => 将生成新对象
- 由于 SRF 更改了路径名称，您必须更新您的 Visu。只需[重新导入视图](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)。

＃＃ 入门
1. 在 https://developer.srgssr.ch/ 上获取免费帐户
1. 进入“应用程序”并添加新的应用程序。您可以在此处选择 API 产品。 “SRF-MeteoProductFreemium”是他们的免费产品。如果您只想要一个地点的天气预报，并且每天仅收到 25 个请求（每 60 分钟）或/并且不想为每天更多的请求付费，那么“SRF-MeteoProductFreemium”就是您想要的选择。现在，这将创建一个特定的 ConsumerKey 和 ConsumerSecret
1. 找出需要预报的所选位置的经度/纬度（十进制度）。如果您已在 ioBroker 设置（主要设置）（通过地图）中设置您的位置，则此信息是可选的。在这种情况下，您可以将纬度和经度字段留空。然后适配器使用 ioBroker 的设置。在适配器配置中输入的纬度和经度会覆盖 ioBroker 设置。
1. 在 ioBroker 上安装此适配器 => 这可能需要几分钟（在 Raspberry Pi 3 上约为 7 分钟）
1. 在Adapter Configuration中填写
   1. 应用程序名称
   1. App的ConsumerKey
   1. App的ConsumerSecret
   1. 需要预报的所选瑞士地点的经度/纬度。 => 请使用十进制（例如苏黎世：47.36667 / 8.5）
   1. 轮询间隔（以分钟为单位）（默认 60 分钟 - 25 个请求/天）

第一个查询是在适配器启动 10 秒后进行的。第一次启动后，会根据配置参数（Poll Interval in Minutes）定期执行查询。
Forecast.current_hour 中的对象将在首次启动后 30 秒创建，并通过复制 Forecast.hours 中的相应值每小时更新一次。

### 可视化示例
######先决条件：
* 适配器 [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* 适配器 [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [导入视图到Vis](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

＃＃＃＃＃＃ 例子
简单示例：![药片](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

扩展示例：![药片](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim2.gif)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/102
* (baerengraben) Using ioBroker "formatDate" to format date_time attribut to "TT.MM.JJJJ SS:mm:ss"

### 2.0.4-alpha.0 (2023-08-03)
* (baerengraben) Adding four new hour-based Views 
* (baerengraben) JSON-Chart is now starting with 00:00 instead of 01:00 
* (baerengraben) SRF sometimes delivers more and sometimes less daily data. This can lead to old data in certain objects. To prevent this, I delete the entire object tree with each new call to rebuild it.

### 2.0.3 (2023-08-01)
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/94

### 2.0.2 (2023-07-31)
* (baerengraben) Just another freaking release-script test

### 2.0.1 (2023-07-31)
* (baerengraben) Just a release-script test

### 2.0.0 (2023-07-31) - Release for SRF Weather API Version 2!
* (baerengraben) Update SRF API version 1 to version 2 https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/94. With this Update new attributes are available: symbol24_code, DEWPOINT_C, RELHUM_PERCENT, FRESHSNOW_CM, PRESSURE_HPA, SUN_MIN, IRRADIANCE_WM2 and TTTFEEL_C

## License
MIT License

Copyright (c) 2023 baerengraben <baerengraben@intelli.ch>

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