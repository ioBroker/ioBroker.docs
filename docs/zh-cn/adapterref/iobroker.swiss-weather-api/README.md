---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.swiss-weather-api/README.md
title: ioBroker.swiss-weather-api
hash: udF67rX2FAX29ZcoIzOeAsDYEDd9rB4xWzwy1ajzloA=
---
![标识](../../../en/adapterref/iobroker.swiss-weather-api/admin/swiss-weather-api.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.swiss-weather-api.svg)
![下载](https://img.shields.io/npm/dm/iobroker.swiss-weather-api.svg)
![安装数量（最新）](http://iobroker.live/badges/swiss-weather-api-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/swiss-weather-api-stable.svg)
![已知漏洞](https://snyk.io/test/github/baerengraben/ioBroker.swiss-weather-api/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.swiss-weather-api.png?downloads=true)

# IoBroker.swiss-weather-api
**测试：** ![测试与发布](https://github.com/baerengraben/ioBroker.swiss-weather-api/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 swiss-weather-api 适配器
连接到强大的 SRF 天气 API (https://developer.srgssr.ch/apis/srf-weather)。
SRF Weather REST API 允许您获取瑞士 25,000 多个地点的天气预报和报告。 “免费增值”订阅允许您每天收到 50 个请求。

＃＃**请注意：
1. 该适配器仅支持瑞士境内的位置。和
1. 该适配器仅支持 RF Weather REST API 版本 1 - 版本 2 即将推出

**将程序版本 1.0.1 更新到 1.0.x**

- 只需在 ioBroker 中更新即可。无需特殊的额外步骤

＃＃＃ 入门
1. 在 https://developer.srgssr.ch/ 上获取免费帐户
1. 进入“我的应用程序”并创建一个新的应用程序。您可以在这里选择一个产品。 “免费增值”是他们的免费产品。如果您只想要一个位置的预测并且每天仅收到 50 个请求（每 30 分钟）或/并且不想为每天更多的请求付费，那么您需要选择“免费增值”。现在，这将创建一个特定的 ConsumerKey 和 ConsumerSecret
1. 找出需要预报的所选位置的经度/纬度（十进制度）。如果您已在 ioBroker 设置（主要设置）（通过地图）中设置您的位置，则此信息是可选的。在这种情况下，您可以将纬度和经度字段留空。然后适配器接管 ioBroker 的设置。在适配器配置中输入的纬度和经度会覆盖 ioBroker 设置。
1. 在 ioBroker 上安装此适配器 => 这可能需要几分钟（在 Raspberry Pi 3 上约为 7 分钟）
1. 在Adapter Configuration中填写
   1. 应用程序名称
   1. App的ConsumerKey
   1. App的ConsumerSecret
   1. 需要预报的所选瑞士地点的经度/纬度。 => 请使用十进制度（例如苏黎世：47.36667 / 8.5）
   1. 轮询间隔（以分钟为单位）（默认 30 分钟 - 50 个请求/天）

第一个查询是在适配器启动 10 秒后进行的。第一次启动后，会根据配置参数（Poll Interval in Minutes）定期执行查询。
Forecast.current_hour 中的对象将在首次启动后 30 秒创建，并通过复制 Forecast.60mines 中的相应值每小时更新一次。

### 可视化示例
######先决条件：
* 适配器 [Material Design Widgets](https://github.com/Scrounger/ioBroker.vis-materialdesign) >= 0.5.7
* 适配器 [Vis](https://github.com/iobroker/iobroker.vis/blob/master/README.md)
* [导入视图到Vis](https://github.com/baerengraben/ioBroker.swiss-weather-api/tree/master/views)

＃＃＃＃＃＃ 例子
![药片](../../../en/adapterref/iobroker.swiss-weather-api/doc/Wettervorhersage_visu_anim.gif)

## Changelog

<!--
  Placeholder for the next version (at the beginning of the line):
  ### **WORK IN PROGRESS**
-->

### 1.0.6
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/78
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/93
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/97

### 1.0.5
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/81
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/76
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/75

### 1.0.4
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/85
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/82

### 1.0.3
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/67
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/66
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/52

### 1.0.2
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/51
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/53

### 1.0.1
* (baerengraben) Fixing https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/57
This change makes it necessary to regenerate IDs. So, to install version 1.0.1, the currently running adapter instance must be completely removed and replaced with a new instance.

### 1.0.0
* (baerengraben) Bugfix https://github.com/baerengraben/ioBroker.swiss-weather-api/issues/64

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