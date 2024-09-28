---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: giiX9+hLwLWA5HvDhp/CfEdsy2+ubQ+cvWtQJK0h248=
---
![标识](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![安装数量（最新）](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![安装数量（稳定）](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![已知漏洞](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![新平台](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
**测试：**![测试与发布](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## 用于 ioBroker 的 solarviewdatareader 适配器
适配器从 Solarview 数据记录器读取数据。
您可以在这里找到有关 Solarview 的其他信息：https://www.solarview.info/solarlogger.aspx

＃＃ 配置
### IP 地址，端口
要从数据记录器获取数据，您必须输入 solarview TCP 服务器的 ip 地址和端口。
标准端口为 15000。请参阅 Solarview 文档 https://www.solarview.info/solarlogger.aspx。

### D0 转换器
如果您有一个连接到 Solarview 数据记录器的 D0 转换器，则可以启用此选项。
如有疑问，请参阅 Solarview 文档。

### 自耗电表总和及1至4
如果您有 S0 电表，则可以启用此选项。
您最多可以拥有 4 个自耗电表以及所有电表的总和。
如有疑问，请参阅 Solarview 文档。

### 逆变器 1 至 4
您可以单独启用每个逆变器。
如有疑问，请参阅 Solarview 文档。

### 间隔，间隔开始，间隔结束
您可以在此处配置时间范围和间隔。24 小时的时间范围是 00:00 至 23:59。
不是 00:00 至 00:00。

### 设置系统变量 CCU，系统变量
这是 homematic CCU 的一个特殊功能。您可以在 CCU 中定义一个系统变量。
实际 PAC 值保存在此系统变量中。
您必须为该系统变量填写 ioBroker 状态 -> **例如“hm-rega.0.12345”**

### 创建状态
#### Pvig，pvi1..4，d0supply，d0consumption
daily = 日产量（kWh） montly = 月产量（kWh） annual = 年产量（kWh） total = 总产量（kWh） current = 发电机功率（W） UDC、UDCB、UDCC、UDCD = 发电机电压（伏特/MPP-Tracker） IDC、IDCB、IDCC、IDCD = 发电机电流（安培/MPP-Tracker） UL1、IL1 = 主电源电压，主电源相 1 UL2、IL2 = 主电源电压，主电源相 2 UL3、IL3 = 主电源电压，主电源相 3 TKK= 温度逆变器

## Changelog
### 1.1.3 (2024-09-17)
* (afuerhoff) adapter checker changes [#176](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/176)
* (afuerhoff) dependencies updated

### 1.1.2 (2024-09-13)
* (afuerhoff) adapter checker changes
* (afuerhoff) dependencies updated
* (afuerhoff) automatic restart [#170](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/170)

### 1.1.1 (2024-06-28)
* (afuerhoff) change to typescript
* (afuerhoff) dependencies updated
* (afuerhoff) bugfix CCU variable
* (afuerhoff) documentation changed

### 1.1.0 (2024-05-29)
* (afuerhoff) code optimizations
* (afuerhoff) jsonConfig added
* (afuerhoff) dependencies updated
* (afuerhoff) node >= 18, js-controller >= 5.0.19
* (afuerhoff) admin >= 6.17.13 due to timePicker failure

### 1.0.8 (2024-01-18)
* (afuerhoff) dependencies updated
* (afuerhoff) translations updated

## License
MIT License

Copyright (c) 2019-2024 Achim Fürhoff <achim.fuerhoff@outlook.de>

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