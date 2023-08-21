---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solaredge/README.md
title: ioBroker.solaredge
hash: zlhrpvyeYWTS168uwVvoa9+Wkm0V54c4roTC+tUct18=
---
![标识](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![安装数量（最新）](http://iobroker.live/badges/solaredge-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/solaredge-stable.svg)
![依赖状态](https://img.shields.io/david/92lleo/iobroker.solaredge.svg)
![已知漏洞](https://snyk.io/test/github/92lleo/ioBroker.solaredge/badge.svg)
![国家公共管理](https://nodei.co/npm/iobroker.solaredge.png?downloads=true)
![特拉维斯-CI](http://img.shields.io/travis/92lleo/ioBroker.solaredge/master.svg)

# IoBroker.solaredge
## IoBroker 的 Solaredge 适配器
从 Solaredge 监控门户获取数据。
目前，仅 /overview 数据点用于获取当前功率和日/月/年/生命周期能量读数。

如果 Solaredge 设备较新，您还可以在 Solaredge 设备上启用 modbus 并直接读取数据。

您需要站点 ID 和 API 密钥才能使用此适配器。要获取这些信息，请访问 https://monitoring.solaredge.com 站点 id：登录，站点 id 是右侧的“ID”，例如 12345 api 密钥：登录，转到管理设置并在那里启用 api 访问。如果您没有看到管理员设置，请发送邮件至 Solaredge 为您的帐户启用管理员。

路线图：

* 添加功率和能量详细信息
* 添加逆变器以外的其他设备

## Changelog

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

## License
MIT License

Copyright (c) 2019-2021 Leonhard Kuenzler <leonhard@kuenzler.io>

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