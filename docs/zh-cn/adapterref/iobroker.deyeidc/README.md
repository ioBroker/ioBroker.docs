---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.deyeidc/README.md
title: ioBroker.deyeidc
hash: Ds4rrNpll3XuGMXCxAEp43eyEX8PyN6yEyqSPFCovFA=
---
![标识](../../../en/adapterref/iobroker.deyeidc/admin/deyeidc.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.deyeidc.svg)
![下载](https://img.shields.io/npm/dm/iobroker.deyeidc.svg)
![安装数量](https://iobroker.live/badges/deyeidc-installed.svg)
![稳定仓库中的当前版本](https://iobroker.live/badges/deyeidc-stable.svg)
![NPM](https://nodei.co/npm/iobroker.deyeidc.png?downloads=true)

# IoBroker.deyeidc
**测试：** ![测试与发布](https://github.com/rasyxh/ioBroker.deyeidc/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 deyeidc 适配器
数据采集器 vor Deye 兼容逆变器

＃＃＃ 入门
此适配器可用于读取本地网络中逆变器的数据。为此，只需输入逆变器的 IP 地址和数据记录器的序列号即可。如果端口与默认值不同，也可以进行调整。采样率预设为 60 秒，这是一个实用值。

数据本身通过已知的 Modbus 寄存器检索并存储在数据点中。该功能已在“Deye 兼容”逆变器上开发和测试。因此，其他型号的逆变器需要查询的寄存器可能有所不同。

＃＃ 用法
要调试适配器，还需要在后续页面的图形用户界面 (GUI) 中输入寄存器区域和线圈信息。同时，GitHub 上已有各种类型的示例条目（例如 https://github.com/raschy/ioBroker.deyeidc/blob/main/deyeidc.MI600.json）。

基本上，寄存器信息必须根据相应的文档确定。解码则根据内容类型通过“规则”完成。

以下情况适用于此：

| 规则 | 说明 |
| ----- | ------------ |
| 0 | 原始符号 |
| 1 | 表示 16 位无符号值 |
| 2 | 用于 16 位有符号值 |
| 3 | 适用于 32 位无符号值 |
| 4 | 适用于 32 位有符号值 |
| 5 | 用于序列号 |
| 6 | 温度 |
| 7 | 版本号 |
| 8 | 代表单字节（最高有效位） |
| 9 | 表示单字节 (LSB) |

文档还会显示小数点需要移动一位还是两位。“因子”条目用于此目的。除此之外，无法进行任何其他有意义的计算。

某些值并非由逆变器提供，必须单独计算。在 0.3.2 版本之前，此处仅支持两个值。从 0.4.0 版本开始，可以在每个目标对象的“计算”表中输入包含多个操作数和运算符的表达式，例如“A + B – C _ D”，然后进行计算。当然，运算顺序遵循标准规则（_ 和 / 优先于 + 和 – 计算）（感谢 XHunter74）。目前仍不支持括号规则。

一个典型的例子是太阳能组件的输出功率。这必须使用“DV1 * DC1”的值进行计算，然后将结果（“PV1”）及其对应的单位存储在数据树的“Key”项下。

### 免责声明
所有产品和公司名称或标识均为其各自所有者的商标™或注册商标®。使用这些名称或标识并不意味着与上述所有者或其任何关联子公司有任何关联或得到其认可！此个人项目为业余时间维护，不以盈利为目的。DEYE是宁波德业科技有限公司的商标。版权所有© 2023，地址：中国浙江省宁波市北仑区永江南路26号，邮编：315806。

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**

- (raschy) Compute module redesigned and expanded (PR XHunter74)

### 0.3.2 (2026-05-31)

- (raschy) Less restrictive serial number check
- (raschy) NodeJS >= 22.x is required
- (raschy) Any necessary adjustments for nodeJS 22.x
- (raschy) translations i18n-short

### 0.3.1 (2025-10-01)

- (raschy) Reduction of info-log output

### 0.3.0 (2025-08-29)

- (raschy) Reduction of devDependencies
- (raschy) The auxiliary functions chai and chai-as-promised have been tacked onto the executable version
- (raschy) Control codes have been added for Modbus RTU requests
- (raschy) Extended Debugging can be switched
- (raschy) Modified method for offlineReset

### 0.2.0 (2025-02-06)

- (raschy) Dependabot run tracked manually

### 0.1.4 (2025-01-11)

- (raschy) Error message corrected
- (raschy) Function nullable repaired

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2023-2026 raschy <raschy@gmx.de>

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