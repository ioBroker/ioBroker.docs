---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarview 数据读取器
hash: giiX9+hLwLWA5HvDhp/CfEdsy2+ubQ+cvWtQJK0h248=
---
![标识](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![安装数量（最新）](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![新PM](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
**测试：** ![测试和发布](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 solarviewdatareader 适配器
适配器从 Solarview 数据记录器中读取数据。
在这里您可以找到有关 Solarview 的更多信息：https://www.solarview.info/solarlogger.aspx

＃＃ 配置
### IP 地址，端口
要从数据记录器中获取数据，您必须从您的 solarview TCP 服务器输入 IP 地址和端口。
标准端口为 15000。请参考 Solarview 文档 https://www.solarview.info/solarlogger.aspx。

### D0转换器
如果您将 D0 转换器连接到 Solarview 数据记录器，您可以启用此选项。
如有问题，请参阅 Solarview 文档。

###自耗表和1到4
如果您有 S0 仪表，则可以启用此选项。
您最多可以有 4 个自用电表和所有电表的总和。
如有问题，请参阅 Solarview 文档。

### 逆变器 1 至 4
您可以单独启用每个逆变器。
如有问题，请参阅 Solarview 文档。

### 间隔，间隔开始，间隔结束
在这里您可以配置时间范围和间隔。 24 小时的时间范围是 00:00 到 23:59。
不是 00:00 到 00:00。

###设置系统变量CCU，系统变量
这是 homematic CCU 的一个特殊功能。您可以在 CCU 中定义系统变量。
在此系统变量中保存实际的 PAC 值。
您必须填写该系统变量的 ioBroker 状态 -> **e.g. “hm-rega.0.12345”**

### 创建状态
#### Pvig，pvi1..4，d0supply，d0consumption
每日 = 日发电量 (kWh) 每月 = 月发电量 (kWh) 每年 = 年发电量 (kWh) 总计 = 总发电量 (kWh) 当前 = 发电机功率，单位为 W UDC、UDCB、UDCC、UDCD = 每个 MPP-Tracker 的发电机电压，单位为伏特IDC、IDCB、IDCC、IDCD = 每个 MPP-Tracker 的发电机电流，单位为安培 UL1、IL1 = 电源电压、电源相位 1 UL2、IL2 = 电源电压、电源相位 2 UL3、IL3 = 电源电压、电源相位 3 TKK = 温度逆变器

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.6 (2022-07-04)
* (afuerhoff) dependencies updated
* (afuerhoff) Interval settings changed from minutes to seconds
* (afuerhoff) States only writen after changes

### 1.0.5 (2022-02-17)
* (afuerhoff) dependencies updated
* (afuerhoff) test and release updated
* (afuerhoff) smaller changes

### 1.0.4 (2022-02-09)
* (afuerhoff) dependencies updated
* (afuerhoff) issue #20 fixed

### 1.0.3 (2021-12-08)
* (afuerhoff) dependencies updated

### 1.0.2 (2021-05-07)
* (afuerhoff) node.js 14 and 16 compatibilty
* (afuerhoff) dependencies updated

## License
MIT License

Copyright (c) 2019-2022 Achim Fürhoff <achim.fuerhoff@outlook.de>

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