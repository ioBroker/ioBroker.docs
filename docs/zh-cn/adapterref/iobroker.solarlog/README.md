---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarlog/README.md
title: ioBroker.solarlog
hash: QvJCpUjrFP0Cyiu8k4Dc1frlxjH9u5B27o1uXAnifF0=
---
![标识](../../../en/adapterref/iobroker.solarlog/admin/solarlog.png)

![安装数量](http://iobroker.live/badges/solarlog-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.solarlog.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarlog.svg)
![新平台](https://nodei.co/npm/iobroker.solarlog.png?downloads=true)

# IoBroker.solarlog
用于 Solarlog 设备的 ioBroker 适配器

## Solarlog-设置
必须在 Solarlog 的配置菜单中激活开放的 JSON 接口（打开 JSON 接口）（配置 - 系统 - 控制 - 打开 JSON 接口：激活。）

## 适配器 - 设置
＃＃＃ 基本设置
设置 Solarlog - IP 地址（192.XXX.X.XXX）、端口（可选）和轮询 - 消费/生产间隔（秒）（“实时”数据，最少 10 秒）。

安全性：您可以在 Solarlog 中激活“用户” - 密码和“用户登录已激活”复选框并在适配器配置中添加密码，或者您可以在没有用户密码的情况下运行 Solarlog 和适配器。如果激活了用户登录，建议在使用 solarlog - 用户界面时停止适配器（否则您需要在适配器的每次请求后重新登录）。

＃＃＃ 高级设置
检查是否要收集所有逆变器/子电表/设备/智能能源数据。

设置轮询 - 平均值和总值的间隔（以分钟为单位）（最少 5 分钟）。

检查是否要收集历史数据并设置更新历史数据对象的时间。

预测：适配器可选择使用 Forecast.Solar API 获取预测数据。实际上，预测的是今天和明天的总千瓦时，每小时刷新一次。可根据要求提供更详细或额外的数据（请打开问题）。

＃＃ 硬件
测试设备：Solarlog 200PM+ / 300PM+ / 500 / 1200Meter / 50

SolarLog 50：SolarLog 50 设备没有开放的 JSON 接口。因此，“信息”和“状态”通道中的某些值将为“拒绝访问”。如果您更喜欢其他解决方案，请打开问题或在相应问题中发布您的偏好。

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.3.0 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 2.2.8

-   ready for js-controller 5.0, enhanced error-handling, dependecies updated

### 2.2.6

-   bug in 'forecast' fixed, dependecies updated

### 2.2.5

-   testing fixed

### 2.2.4

-   polling-bug fixed, dependecies updated

## License

The MIT License (MIT)

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2023 forelleblau marceladam@gmx.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.