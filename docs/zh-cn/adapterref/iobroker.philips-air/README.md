---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: X+YdpIAw4RaMRUYwa08X+jRrEXHIlrD+88onxnxrIjA=
---
![标识](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![安装数量](http://iobroker.live/badges/philips-air-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![下载](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 适用于 ioBroker 的飞利浦空气净化器适配器
将飞利浦空气净化器与 ioBroker 连接起来。
**仅使用 AC2729 进行了测试**，但应该可以与通过 COAP 加密通信的新净化器配合使用。
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[链接至飞利浦网站](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

＃＃ 用法
仅需要设备的 IP 地址。在路由器中找到它（例如 `MiCO`）。
可能会发生某些设备没有所有变量的情况，并且它们在对象树中保持未填充状态。

![对象](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.0 (2024-04-25)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.3 (2022-12-23)
* (Apollon77) Finalized and optimized HTTP communication protocol
* (Apollon77) Fixed type issues with device.error

### 1.0.2 (2022-11-16)
* (bluefox) Small fixes done
* (bluefox) Added HTTP communication protocol (untested!)
* (mdax82) Added `gentle/GT` for AC2939

### 0.1.7 (2022-05-19)
* (Apollon77) Upgrade coap library

### 0.1.4 (2022-03-23)
* (Apollon77) Downgrade coap library to restore functionality for some devices
* (Apollon77) Prevent crash case and make control more flexible
* (Apollon77) correctly handle `control.function` state

### 0.1.3 (2022-03-12)
* (Apollon77) General updates and optimizations

### 0.1.1 (2020-10-14)
* (bluefox) initial release

## License
MIT License

Copyright (c) 2023-2024 ioBroker Community Developers <iobroker-community-adapters@gmx.de>  
Copyright (c) 2020-2022 ioBroker <dogafox@gmail.com>

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