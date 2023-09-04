---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: L8p1zCvIrtdtSi1KJXiwaU3syYEVmB4aLoaGFcFdju4=
---
![标识](../../../en/adapterref/iobroker.deyeidc/admin/deyeidc.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.deyeidc.svg)
![下载](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)
![安装数量](https://iobroker.live/badges/deyeidc-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/deyeidc-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)

# IoBroker.deyeidc
**测试：** ![测试与发布](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 deyeidc 适配器
数据采集器或 Deye 兼容逆变器

＃＃ 用法
要调试适配器，除了以下页面中的 IP 地址和记录器序列号之外，还必须在 GUI 中输入寄存器范围和线圈。已经有一个示例条目。
某些值不是由逆变器提供的，必须单独计算。为此，可以在“计算”表中输入每行两个值，然后将它们相乘。

### 免责声明
所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何关联子公司有任何隶属关系或认可！这个个人项目是在业余时间维护的，没有商业目标。 DEYE 是版权所有 © 2023 宁波德业科技有限公司（地址：浙江省宁波市北仑甬江南路 26 号，邮编：315806 VR China）的商标。

＃＃＃ 入门
该适配器可以从本地网络中的逆变器读取数据。该数据通过已知的 Modbus 端口检索并存储在数据点中。这是在“Deye 兼容”逆变器上开发和测试的。因此，在其他型号上，要查询的寄存器可能有所不同。
为此，只需输入逆变器的 IP 和记录器的序列号。如果端口与默认值不同，也可以进行调整。 60 秒已预设为采样率的实用值。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### 0.0.9 (2023-07-10)

-   (raschy) minor bugs fixed

### 0.0.8 (2023-07-10)

-   (raschy) Day reset for offline operation

### 0.0.7 (2023-05-27)

-   (raschy) release for npm and ioBroker latest

### 0.0.6 (2023-05-27)

-   (raschy) Some processes optimized

### 0.0.5 (2023-04-27)

-   (raschy) Calculations modified with formulas
-   (raschy) Error messages in English

### 0.0.4 (2023-03-21)

-   (raschy) release for npm

### 0.0.3 (2023-03-21)

-   (raschy) release

### 0.0.2 (2023-03-21)

-   (raschy) initial release

## License

MIT License

Copyright (c) 2023 raschy <raschy@gmx.de>

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