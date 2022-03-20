---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.philips-air/README.md
title: ioBroker.philips-air
hash: 6a/jPRtdR/DfVuGhoLx+Fo57e3c0pWDg9gcKiVUJKmo=
---
![商标](../../../en/adapterref/iobroker.philips-air/admin/philips-air.png)

![安装数量](http://iobroker.live/badges/philips-air-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.philips-air.svg)
![下载](https://img.shields.io/npm/dm/iobroker.philips-air.svg)

# IoBroker.philips-air
![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.philips-air/workflows/Test%20and%20Release/badge.svg)[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/philips-air/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry 插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## 用于 ioBroker 的飞利浦空气净化器适配器
将飞利浦空气净化器与 ioBroker 连接。
**仅使用 AC2729 测试**，但应与通过 COAP 进行加密通信的新净化器一起使用。
![AC2729](../../../en/adapterref/iobroker.philips-air/img/device.png)

[飞利浦网站链接](https://www.philips.de/c-m-ho/luftreiniger-und-luftbefeuchter/kombi)

＃＃ 用法
只需要设备的 IP 地址。在您的路由器中找到它（例如`MiCO`）。
可能会发生某些设备并非所有变量，并且它们将在对象树中保持未填充状态。

![对象](../../../en/adapterref/iobroker.philips-air/img/objects.png)

## Changelog
### 0.1.3 (2022-03-12)
* (Apollon77) General updates and optimizations

### 0.1.1 (2020-10-14)
* (bluefox) initial release

## License
MIT License

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