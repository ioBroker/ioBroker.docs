---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yr/README.md
title: ioBroker.yr
hash: kHJRFHx1Jtc5V1ZJAdTrNxLCKuWfpgZQIgTYS78ts54=
---
![商标](../../../en/adapterref/iobroker.yr/admin/yr.png)

![安装数量](http://iobroker.live/badges/yr-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.yr.svg)
![下载](https://img.shields.io/npm/dm/iobroker.yr.svg)

# IoBroker.yr
![测试和发布](https://github.com/ioBroker/ioBroker.yr/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/yr/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## Yr.no ioBroker 适配器
从 [年号](yr.no) 获取 10 天天气预报

[yr.no](yr.no) 是[挪威气象研究所](met.no) 和[挪威广播公司](nrk.no)

https://api.met.no/weatherapi/locationforecast/2.0/documentation

**注意** - 如果 _“将丢失的翻译发送到 iobroker.net”_ 被激活（默认）丢失的翻译将被发送到 iobroker.net 服务器。不会存储或分析 IP 或任何其他信息。只是缺少翻译。

## 图标
图标取自此处 [https://api.met.no/weatherapi/weathericon/2.0/documentation](https://api.met.no/weatherapi/weathericon/2.0/documentation) 并且属于 yr.no。

＃＃ 去做
* 添加气象图（png 可能会因新 API 停止使用）
* 根据每小时预测添加每日预测
* 添加html表格

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->
## 1.0.4 [2016-07-06]
* (bluefox) 修复自述文件链接

### 1.0.3 [2016-05-17]
* (bluefox) 更改自述文件路径

### 1.0.2 [2016-05-16]
* (bluefox) 添加翻译

### 1.0.1 [2016-04-25]
* (bluefox) 添加翻译

### 1.0.0 [2016-03-15]
* (bluefox) 更改城市解析

### 0.1.9 [2015-10-28]
* (bluefox) 修复翻译错误

### 0.1.8 [2015-10-27]
* (bluefox) 翻译
* (bluefox) 自动将丢失的翻译上传到 iobroker.net

### 0.1.7 [2015-07-10]
* (bluefox) 使 yr 与 Metro 小部件配合使用

### 0.1.6 [2015-06-12]
* (bluefox) 翻译

### 0.1.5 [2015-03-26]
* (bluefox) 翻译

### 0.1.4 [2015-03-24]
* (bluefox) 删除“风向”的单位“%”

### 0.1.3 [2015-03-22]
* (bluefox) 修复明天和后天的错误

### 0.1.2 [2015-03-08]
* (bluefox) 正确链接到 yr.no 网站

### 0.1.1
* (bluefox) 为天气状态添加其他语言的翻译

### 0.1.0
* (bluefox) 在新的对象模型上更新 yr

### 0.0.4
* (hobbyquaker) 加上“预测”。陈述身份

### 0.0.3
* (hobbyquaker) 设置用户界面，自动完成位置
* (hobbyquaker) 将 yr_forecast 重命名为预测
* (hobbyquaker) 添加了 children 属性
* (hobbyquaker) 减少日志冗长
* (hobbyquaker) 修复

### 0.0.2
* (hobbyquaker) 修复

### 0.0.1
* (hobbyquaker) 首次发布

＃＃ 去做
* 设置状态预测对象

## Changelog

### 3.0.1 (2021-07-06)
* (Apollon77) Optimizations and Fixes
* (Apollon77) Add Sentry crash reporting

### 3.0.0 [2021-06-06]
* (withstu) Switch to new JSON API and change data Structure (breaking)
* (withstu) Update project dependencies
* (arteck) Type of state was corrected  

### 2.0.3 [2018-10-10]
* (bluefox) add translations

### 2.0.2 [2018-08-01]
* (bluefox) Warning! Breaking changes! States are renamed.
* (bluefox) Refactoring of states and roles

### 1.0.6 [2017-05-27]
* (Andre) Update iconset

### 1.0.5 [2016-10-10]
* (bluefox) move weather widgets to this adapter

## License
The MIT License (MIT)

Copyright (c) 2014-2021 hobbyquaker <hq@ccu.io>, Bluefox

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