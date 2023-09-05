---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: 0ZcS+L2l6rWq/BTpl4sDy6dZEdwFIlHLGQPkO1XWA0k=
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

＃＃＃ 入门
该适配器可以从本地网络中的逆变器读取数据。为此，只需输入逆变器的 IP 和记录器的序列号。如果端口与默认值不同，也可以进行调整。 60秒被预设为采样率的实用值。

数据本身通过已知的 Modbus 寄存器检索并存储在数据点中。这是在“Deye 兼容”逆变器上开发和测试的。因此，对于其他型号，要查询的寄存器可能有所不同。

＃＃ 用法
要调试适配器，还必须在后续页面的 GUI 中输入寄存器区域和线圈。同时，github 上已经有各种类型的示例条目（例如 https://github.com/raschy/ioBroker.deyeidc/blob/main/deyeidc.MI600.json）。
基本上，寄存器必须根据相应的文档来确定。根据内容的类型，解码是通过“规则”完成的。

以下内容适用于此：

|规则|描述 |
| ----- | ------------ |
| 0 |原始签名 |
| 1 |对于 16 位无符号值 |
| 2 |对于 16 位有符号值 |
| 3 |对于 32 位无符号值 |
| 4 |对于 32 位有符号值 |
| 5 |获取序列号 |
| 6 |对于温度 |
| 7 |版本号 |
| 8 |对于单字节 (MSB) |
| 9 |对于单字节 (LSB) |

该文档还显示小数点是否必须移动一位或两位数字。条目“因素”就是为了这个目的。因此无法进行进一步有意义的计算。

某些值不是由逆变器提供的，必须单独计算。为此，可以在表“计算”中输入每行两个值，然后计算这些值。
一个典型的例子是“DV1 \* DC1”，然后将结果与数据树中相应的单元一起存储在“Key”中。请注意，每行只能处理一种基本计算类型。因此，括号规则是不可能的并且不受支持。

### 免责声明
所有产品和公司名称或徽标均为其各自所有者的商标™或注册®商标。使用它们并不意味着与它们或任何关联子公司有任何隶属关系或认可！这个个人项目是在业余时间维护的，没有商业目标。 DEYE 是版权所有 © 2023 宁波德业科技有限公司（地址：浙江省宁波市北仑甬江南路 26 号，邮编：315806 VR China）的商标。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.0.11 (2023-08-26)

-   (raschy) wrong implementation msb/lsb of 32-bit values recorrected

### 0.0.10 (2023-08-25)

-   (raschy) Calculation of 32-bit values corrected
-   (raschy) Ready for launch into the stable repository

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