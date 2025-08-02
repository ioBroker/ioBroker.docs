---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.onlycat/README.md
title: ioBroker.onlycat
hash: kpSbfAe9D4coZUjPmQ+JhNEK13XZWOy3TnIcs/UfvBI=
---
![标识](../../../en/adapterref/iobroker.onlycat/admin/onlycat.png)

![稳定存储库中的当前版本](https://iobroker.live/badges/onlycat-stable.svg)
![NPM 版本](https://img.shields.io/npm/v/iobroker.onlycat.svg)
![下载](https://img.shields.io/npm/dm/iobroker.onlycat.svg)
![安装数量](https://iobroker.live/badges/onlycat-installed.svg)
![新公共管理](https://nodei.co/npm/iobroker.onlycat.png?downloads=true)

# IoBroker.onlycat
**测试：**![测试和发布](https://github.com/Author/ioBroker.onlycat/workflows/Test%20and%20Release/badge.svg)

## 适用于 OnlyCat® 猫门的适配器，带猎物检测功能
带有猎物检测功能的 OnlyCat® 猫门适配器。

<p align="center"> <img src="/admin/onlycat-flap.webp" /> </p> <p align="center"> <img style="max-width: 300px" src="/admin/screenshot.jpg" /> </p>

＃＃ 配置
在适配器配置页面添加设备令牌。
令牌可在 OnlyCat 应用的“帐户”页面中找到。

＃＃ 描述
该适配器提供来自 OnlyCat 猫门的事件，即进入、退出和猎物检测。

该适配器需要 Node 20 或更新版本。

## 注释
OnlyCat® 是 [VirtualV 贸易有限公司](https://www.onlycat.com/) 的注册商标

## Changelog

### 0.3.0 (2025-06-04)

* (Sickboy78) code improvements from review

### 0.2.0 (2025-05-09)

* (Sickboy78) use pet names from RFID profiles

### 0.1.0 (2025-05-03)

* (Sickboy78) event classification and trigger source schema updated
* (Sickboy78) dependency updates

### 0.0.1 (2025-04-18)

* (Sickboy78) initial release

## License

MIT License

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

Copyright (c) 2025 Sickboy78 <asmoday_666@gmx.de>