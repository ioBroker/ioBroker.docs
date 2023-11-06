---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.iopooleco/README.md
title: ioBroker.iopooleco
hash: 4/YQ1WAsIXZEc1AuCEa3U22YSOAXKWaL76itHNzrTS8=
---
![标识](../../../en/adapterref/iobroker.iopooleco/admin/iopooleco.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.iopooleco.svg)
![下载](https://img.shields.io/npm/dm/iobroker.iopooleco.svg)
![安装数量](https://iobroker.live/badges/iopooleco-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/iopooleco-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.iopooleco.png?downloads=true)

# IoBroker.iopooleco
**测试：** ![测试与发布](https://github.com/mule1972/ioBroker.iopooleco/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 iopooleco 适配器
从 iopool (https://iopool.com) 连接到您的泳池计量仪 ECO，并每 15 分钟通过 ioBroker 接收 ORP、PH 和温度。

只需安装此适配器并从 iopool 应用程序输入您的 API 密钥即可。
API 密钥可以在 iopool 应用程序的“更多/设置/API 密钥”下生成。

## Changelog
### 0.5.1 (2023-10-25)
improve scheduler calculation
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.5.0 (2023-10-25)
update readme & secure API key & change scheduler & bugfixes

### 0.4.1 (2023-10-19)
change repo URL to https

### 0.4.0 (2023-10-16)
some bugfixes & added offsets for temperature, ORP and pH if meter is inaccurate

### 0.3.0 (2023-10-13)
add error handling for invalid measurements

### 0.2.3 (2023-10-13)
minor changes to error handling

### 0.2.2 (2023-10-13)
minor changes to readme

### 0.2.1 (2023-10-13)
minor changes to readme

### 0.2.0 (2023-10-12)
* (Mule) initial release

### 0.0.1 (2023-10-12)
* (Mule) initial test release

## License
MIT License

Copyright (c) 2023 Mule

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