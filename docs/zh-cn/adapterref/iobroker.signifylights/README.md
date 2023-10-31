---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.signifylights/README.md
title: ioBroker.signifylights
hash: jpUQ+tfhgmQ6g52wkjjx1e1umiIRldRNMrcgAASm6Tc=
---
![标识](../../../en/adapterref/iobroker.signifylights/admin/signifylights.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.signifylights.svg)
![下载](https://img.shields.io/npm/dm/iobroker.signifylights.svg)
![安装数量](https://iobroker.live/badges/signifylights-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/signifylights-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.signifylights.png?downloads=true)

# IoBroker.signifylights
**测试：** ![测试与发布](https://github.com/disaster123/ioBroker.signifylights/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的signifylights 适配器
Signify 灯适配器适用于所有类型的 Signify WLAN 灯，例如 WIZ、飞利浦 WLAN 等等...

问题和讨论在这里：https://forum.iobroker.net/topic/69656/test-adapter-signifylights

### 免责声明
该项目不隶属于 WIZ、Signify 或飞利浦，也不受其资助或以任何方式与之相关。所有品牌和产品名称均为其各自所有者的商标或注册商标。
提及公司或产品名称并不意味着批准或推荐该公司或产品，而排除其他公司或产品。

## Changelog
### 0.3.0 (2023-10-27)
* several translation fixes
* replace logo
* use adapter interval instead of timeout
* new DEVICES: ESP24_SHRGBC_01 + ESP25_SHWRGB_01 + ESP15_SHRGB1S_01I
* config: allow to run without udp mac and ip set

### 0.2.0 (2023-05-02)
* more setTimeout fixes

### 0.1.1 (2023-05-01)
* fix setTimeout calls in async functions

### 0.1.0 (2023-05-01)
* various fixes and changes to become an official adapter

### 0.0.6 (2023-04-30)
* first release under new name

## License
MIT License

Copyright (c) 2023 disaster123 <stefan-iobroker@prie.be>

originally developed by Copyright (c) 2022 nxtstep <privat@konzeptplus.net>

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