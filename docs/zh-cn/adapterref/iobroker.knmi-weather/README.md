---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knmi-weather/README.md
title: ioBroker.knmi-weather
hash: 0R/wNtjz4kkUJDsvC8B9fxp3+luHbvhkJfU5G80ALE4=
---
![标识](../../../en/adapterref/iobroker.knmi-weather/admin/knmi-weather.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.knmi-weather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knmi-weather.svg)
![安装数量（最新）](http://iobroker.live/badges/knmi-weather-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/knmi-weather-stable.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/ioBroker.knmi-weather.svg)
![NPM](https://nodei.co/npm/ioBroker.knmi-weather.png?downloads=true)

# IoBroker.knmi-weather
![测试与发布](https://github.com/DrozmotiX/ioBroker.coronavirus-statistics/workflows/Test%20and%20Release/badge.svg)

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## IoBroker 的 KNMI 天气数据和警报
KNMI 提供了一个 API，该 API 基于研究所收集的所有传感器数据，每 10 分钟更新一次数据。

此适配器允许读取此 API（需要注册！），并将所有相关值以用户友好的状态存储，以便在通知（例如：Telegram/Pushover）或可视化中进一步处理。

API 每天最多可免费使用 300 次，因此适配器每 5 分钟调度一次。

以下数据可供参考：

* 天气警报
* 当前气候条件
* 预测今天、明天和后天的天气
* 当前雨量雷达地图由[Buienradar](https://www.buienradar.nl)提供

位置数据与存储在管理员配置中的 GPS 坐标相关。

更多信息请访问：http://weerlive.nl/index.php 在此获取您的免费 API 密钥：http://weerlive.nl/delen.php

## 支持我
如果您喜欢我的作品，欢迎您进行个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！）[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.knmi-weather/master/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### __WORK IN PROGRESS__
* (DutchmanNL) Maintenance: raise Node.js to 22, modernise CI and release tooling, update dependencies, resolve repository checker findings

### 1.0.2 (2021-08-30) - Optimize error message in case API limit is reached
* (DutchmanNL) Optimize error message in case API limit is reached

### 1.0.1 (2021-08-17)
* (DutchmanNL) Add support for windrgr
* (DutchmanNL) Minor fixes & dependency updates

### 1.0.0 (2020-09-15)
* (DutchmanNL) Final version release
* (DutchmanNL) Bugfixes

### 0.2.1
* (DutchmanNL) Updated dependency's
* (DutchmanNL) Release to stable repository
* (DutchmanNL) Bugfix : Solve incorrect Latitude/Longtitude configuration

### 0.2.0
* (DutchmanNL) improve propper adapter termination instead of guessing by timer
* (DutchmanNL) Release to stable repository

### 0.1.1
* (DutchmanNL) implement states for RainRadar

### 0.1.0
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2020-2026 DutchmanNL <rdrozda@hotmail.com>

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