---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.zehnder-cloud/README.md
title: ioBroker.zehnder-云
hash: z0/lwnjDgEIGsMR6+GhY2Zd6+AuHWZdbdc2+Btfrr08=
---
![标识](../../../en/adapterref/iobroker.zehnder-cloud/admin/zehnder-cloud.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.zehnder-cloud.svg)
![下载](https://img.shields.io/npm/dm/iobroker.zehnder-cloud.svg)
![安装数量（最新）](https://iobroker.live/badges/zehnder-cloud-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/zehnder-cloud-stable.svg)
![依赖状态](https://img.shields.io/david/TA2k/iobroker.zehnder-cloud.svg)
![国家公共管理](https://nodei.co/npm/iobroker.zehnder-cloud.png?downloads=true)

# IoBroker.zehnder-云
**测试：** ![测试与发布](https://github.com/TA2k/ioBroker.zehnder-cloud/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 zehnder 云适配器
Zehnder Cloud API 适配器

## 登录ablauf
1. https://developer.beta.zehnder.cloud/profile

   在 zehnder 云中注册并创建订阅。复制适配器设置中的主键

2. https://mydevices.beta.zehnder.cloud/customer/settings/application

创建 API 密钥 在适配器设置中输入 API 名称和密钥

## 讨论和讨论
<https://forum.iobroker.net/topic/47856/test-adapter-zehnder-cloud-v-0-0-1>

## Changelog

### 2.0.0

- (TA2k) switch to new api from zehnder

### 0.0.8

- (TA2k) improve error messages

### 0.0.3

- (TA2k) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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