---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: SIhWOYxcBJ83DoLTiizqHACmgParOWrWpsyTxKj9yAE=
---
![标识](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![安装数量（最新）](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![已知漏洞](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![GitHub 问题](https://img.shields.io/github/issues/baerengraben/ioBroker.swiss-weather-api?logo=github&style=flat-square)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/baerengraben/ioBroker.swiss-weather-api/test-and-release.yml?branch=master&logo=github&style=flat-square)
![新平台](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)

# IoBroker.swiss-weather-api
# IoBroker 的 swiss-weather-api 适配器
连接到出色的 SRF 天气 API - 版本 2 (https://developer.srgssr.ch/api-catalog/srf-weather/srf-weather-description)。
SRF 天气 REST API 允许您从瑞士 25,000 多个地点获取天气预报和报告。“免费增值”订阅允许您每天获得 50 个请求。

## **请注意：**
1.此适配器仅支持瑞士境内地区。
1.此适配器支持SRF Weather API V2。

## **将版本 1.x.x 更新至 2.0.x**
- 删除适配器（删除 ioBroker 中的所有适配器对象！）
- 安装全新适配器 => 将生成新对象
- 由于 SRF 已更改路径名，请更新您的 Visu：只需[重新导入视图]（https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views）。

＃＃ 入门
1. 在 https://developer.srgssr.ch/ 获取免费账户
1. 转到“应用程序”并添加新应用程序。在这里您可以选择一个 API 产品。“SRF-MeteoProductFreemium”是他们的免费产品。如果您只想要一个位置的预报并且每天只获得 50 个请求（每 30 分钟）或/并且不想为每天更多的请求付费，“SRF-MeteoProductFreemium”就是您想要的选择。现在，这将创建一个特定的 ConsumerKey 和 ConsumerSecret
1. 找出需要预报的所选位置的经度/纬度（十进制度）。如果您已在 ioBroker 设置（主设置）（通过地图）中设置了您的位置，则此信息是可选的。在这种情况下，您可以将纬度和经度字段留空。然后，适配器将使用 ioBroker 的设置。适配器配置中输入的纬度和经度将覆盖 ioBroker 设置。
1. 免费增值用户：请注意，SRG API 会记住所使用的位置。从第一次请求开始，在一定时间内，所使用的订阅只能针对此一个位置发送请求。
1. 在 ioBroker 上安装此适配器 => 这可能需要几分钟（Raspberry Pi 3 上约 7 分钟）
1. 在适配器配置中填写
1. 应用程序名称
1. App的ConsumerKey
1. App 的 ConsumerSecret
1. 需要预报的所选瑞士地点的经度/纬度。=> 请使用十进制度（例如苏黎世：47.36667 / 8.5）
1. 轮询间隔（分钟）（默认 60 分钟 - 25 个请求/天）

适配器启动 10 秒后进行第一次查询。首次启动后，查询将根据配置参数（轮询间隔（分钟））定期执行。
forecast.current_hour 中的对象将在首次启动 30 秒后创建，并通过从 Forecast.hours 复制相应值每小时更新一次。

### 可视化示例
###### 先决条件：
* 适配器 [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* 适配器 [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [将视图导入 Vis](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

＃＃＃＃＃＃ 例子
简单例子：![药片](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

扩展示例：![药片](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim2.gif)

周视图示例：![药片](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wochensicht_reduziert.png)

## Changelog
### 2.2.2 (2024-11-01)
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/125

### 2.2.1 (2024-11-01)
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/78

### 2.2.0 (2024-10-30)
* (baerengraben) [Wochensicht_reduziert neu als View und mit Legende](https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/112)

### 2.1.1 (2024-10-29)
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/124
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/123
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/122
* (baerengraben) Fix for https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/121

### 2.1.0 (2024-01-10)
* (baerengraben) Added additional Week-View. Credits goes to https://github.com/pingus01

## License
MIT License

Copyright (c) 2024 baerengraben <baerengraben@intelli.ch>

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