---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.paperless-ngx/README.md
title: ioBroker.paperless-ngx
hash: ZkzC9py3/esrWeFLHf1YwoPN/3M0hgdfQgWFaB9EYX0=
---
![标识](../../../en/adapterref/iobroker.paperless-ngx/admin/paperless-ngx.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.paperless-ngx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.paperless-ngx.svg)
![安装数量](https://iobroker.live/badges/paperless-ngx-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/paperless-ngx-stable.svg)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![新平台](https://nodei.co/npm/iobroker.paperless-ngx.png?downloads=true)

# IoBroker.paperless-ngx
![测试与发布](https://github.com/BenAhrdt/ioBroker.paperless-ngx/workflows/Test%20and%20Release/badge.svg)

* Papaerless-ngx 官方网站：https://docs.paperless-ngx.com/

## IoBroker 的 paperless-ngx 适配器
paperless-ngx API 用于从 paperless-ngx 获取正在运行的实例的信息。
例如，您可以读取 paperless 实例的标签、文档、文档类型、用户或通讯员。

设置以下数据以登录实例：![替代文本](../../../en/adapterref/iobroker.paperless-ngx/image.png)

选择刷新周期和读取数据类型：（无，基本或详细）![替代文本](../../../en/adapterref/iobroker.paperless-ngx/image-1.png)

## 免责声明
该项目与 Paperless-ngx 没有正式关联，即他们不维护该项目。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2024-12-20)
* (BenAhrdt) replace forbidden chars with "_" and add timeout 3000ms to axios

### 0.2.0 (2024-12-05)
* (BenAhrdt) update eslint

### 0.1.4 (2024-11-25)
* (BenAhrdt) add responsive tags for xs, s, l .... to json config

### 0.1.3 (2024-11-23)
* (BenAhrdt) implemt tag and blocked tag search / insert comments

### 0.1.2 (2024-10-25)
* catching config of wrong API Adress

### 0.1.1 (2024-10-24)
* implents correspondents

### 0.1.0 (2024-10-11)
* First implementation of searching in documents with specific tags

### 0.0.15 (2024-08-10)
* (BenAhrdt) changes for check and service bot

### 0.0.14 (2024-08-09)
* (BenAhrdt) add keyword ioBroker to package.json

### 0.0.13 (2024-08-08)
* (BenAhrdt) added current step

### 0.0.12 (2024-08-08)
* (BenAhrdt) Implekents "all" to some folders

### 0.0.11 (2024-08-08)
* (BenAhrdt) remove the "" from links

### 0.0.10 (2024-08-07)
* (BenAhrdt) Added common.name to results

### 0.0.9 (2024-08-07)
* (BenAhrdt) implements search in documents (additional to global search)

### 0.0.8 (2024-08-06)
* (BenAhrdt) implements new icons and additionObjectinformations

### 0.0.7 (2024-08-05)
* (BenAhrdt) change structure for indexing documents / tags etc.

### 0.0.6 (2024-08-05)
* (BenAhrdt) new structure for results. number assigned, because foreign named dokuments are maby not allowed

### 0.0.5 (2024-08-04)
* (BenAhrdt) first query function implemented

### 0.0.4 (2024-08-03)
* (BenAhrdt) readoutlevel for dataconnection

### 0.0.3 (2024-08-02)
* (BenAhrdt) bugfixes for set states wrigth

### 0.0.2 (2024-08-02)
* (BenAhrdt) initial release

## License
MIT License

Copyright (c) 2024 BenAhrdt <bsahrdt@gmail.com>

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