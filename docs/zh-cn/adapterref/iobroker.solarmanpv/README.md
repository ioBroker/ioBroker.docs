---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: bRItCNbofa25MfaA9pBBL9XzNJj3BMY3g013zNFi12A=
---
![标识](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![安装数量](https://iobroker.live/badges/solarmanpv-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/solarmanpv-stable.svg)
![依赖状态](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![新PM](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**测试：** ![测试和发布](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 solarmanpv 适配器
从阳台电厂读取数据

＃＃＃ 入门
该适配器用于显示阳台发电厂的数据，由 ioBroker 中的逆变器“Bosswerk MI600”提供。

我假设到目前为止，该工厂由应用程序“Solarman”监控。
这个适配器从这个云中获取数据。

首先，您必须向 Solarman 支持 <service@solarmanpv.com> 请求所需的凭据（app_id 和 app_secret）。
可能还有一个类型的查询，“我想问一下你用的是什么平台？你的角色是什么？你是个人，运维商，制造商，还是分销商？可以给我你的API邮箱吗？” ”。在我的情况下，另一个查询来了：“你为什么要申请 API？”。我也礼貌地回答了这个问题，并在第二天收到了必要的数据。

在管理页面上，4 个字段必须根据描述。
此适配器被创建为“预定”适配器。
由于云中的数据大约每 6 分钟更新一次，因此不会更频繁地启动适配器。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.1.5 (2022-10-17)
* (raschy) Added support for hybrid inverters and 4 MPPTs

### 0.1.4 (2022-09-17)
* (raschy) Corrections after first review

### 0.1.3 (2022-08-19)
* (raschy) Adapter termination code changed

### 0.1.2 (2022-07-30)
* (raschy) Added device status, structure reduced

### 0.1.1 (2022-07-27)
* (raschy) Clean up the code and start delay

### 0.1.0 (2022-07-26)
* (raschy) Also for multiple inverter per station

### 0.0.14 (2022-07-13)
* (raschy) Extension for multiple plants

### 0.0.13 (2022-07-11)
* (raschy) Clean up the debug values

### 0.0.13-alpha.0 (2022-07-10)
* (raschy) ApiClient swapped to separate file

### 0.0.12 (2022-07-04)
* (raschy) test and release workflow for npm activated

### 0.0.11 (2022-07-03)
* (raschy) Create to release

### 0.0.10 (2022-07-03)
* (raschy) User warnings addet

### 0.0.9 (2022-06-20)
* (raschy) Errorhandling addet

### 0.0.8 (2022-06-19)
* (raschy) Try after clearing folder

### 0.0.7 (2022-06-19)
* (raschy) Try first release

### 0.0.6 (2022-06-19)
* (raschy) Crypto version corrected

### 0.0.5 (2022-06-19)
* (raschy) Crypto version changed

### 0.0.4 (2022-06-19)

* (raschy) Dependecies addet

### 0.0.3 (2022-06-19)

* (raschy) ReadMe changed

### 0.0.2 (2022-06-19)

* (raschy) changed to jsonConfig

### 0.0.1 (2022-06-16

* (raschy) initial release

## License
MIT License

Copyright (c) 2022 raschy <raschy@gmx.de>

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