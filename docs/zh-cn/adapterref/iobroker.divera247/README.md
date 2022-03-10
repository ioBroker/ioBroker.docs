---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.divera247/README.md
title: ioBroker.divera247
hash: LyHEz+a45NCnsQ0Y2SDqeWhCuAvLD11aWtvFJ1vjonQ=
---
![商标](../../../en/adapterref/iobroker.divera247/admin/divera247_long.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.divera247.svg)
![下载](https://img.shields.io/npm/dm/iobroker.divera247.svg)
![安装数量（最新）](http://iobroker.live/badges/divera247-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/divera247-stable.svg)
![已知漏洞](https://snyk.io/test/github/TKnpl/ioBroker.divera247/badge.svg)
![新PM](https://nodei.co/npm/iobroker.divera247.png?downloads=true)

# IoBroker.divera247
**测试：** ![测试和发布](https://github.com/TKnpl/ioBroker.divera247/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 diera247 适配器
警报服务<a href="https://www.divera247.com/" target="_blank">Divera 24/7</a>的适配器

＃＃ 要求
为了充分利用此适配器，您的组织必须至少订阅 Divera 24/7 服务的“警报”计划，否则，适配器将无法工作或无法完全工作。

##此适配器的配置
您必须在此适配器中输入您的“Divera 24/7”登录凭据。

此外，您可以限制特定用户或警报组的警报。
为此，您必须在此适配器的管理页面中输入 Divera 用户 ID 或警报组编号。可以指定多个用户 ID 和/或报警组编号，用逗号 (,) 分隔。
该适配器在检查组之前首先检查用户 ID。第一次点击将触发警报并更新所有状态。用户 ID 和警报组的组合目前是不可能的。

要订阅**所有警报**，只需将输入字段留空。

## Changelog

### 0.2.0
* (TKnpl) complete renewal of the adapter

### 0.1.3
* (TKnpl) general revision of the adapter

### 0.1.2
* (TKnpl) added alarmed vehicles datapoint

### 0.1.1
* (TKnpl) small changes - wording

### 0.1.0
* (TKnpl) added possibility to specify alarm groups

### 0.0.10
* (TKnpl) bug in info.connection fixed and handling of user ids expanded

### 0.0.9
* (TKnpl) added default values for admin page

### 0.0.8
* (TKnpl) Changed API call from intervall to timeout, added states 'group' and 'foreign_id'

### 0.0.7
* (TKnpl) added object 'priority' and 'alarm' object updates only in case of an new alarm or when an alarm was closed

### 0.0.6
* (TKnpl) state handling while active alarm and connection check improved, fixed object types

### 0.0.5
* (TKnpl) fixed io-package news issue

### 0.0.4
* (TKnpl) Connection check to api improved, added timestamp of latest alert

### 0.0.3
* (TKnpl) added title, text, address, latitude, longitude, general formatting

### 0.0.2
* (TKnpl) adjusted translation

### 0.0.1
* (TKnpl) initial commit

## License
MIT License

Copyright (c) 2022 TKnpl <dev@t-concepts.de>

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