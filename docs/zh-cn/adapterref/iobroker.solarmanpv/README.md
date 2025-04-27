---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solarmanpv/README.md
title: ioBroker.solarmanpv
hash: VhS3pTYYrpO3rIsPG7f3yUT7appDZmkozDHtisOm57U=
---
![标识](../../../en/adapterref/iobroker.solarmanpv/admin/solarmanpv.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.solarmanpv.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solarmanpv.svg)
![安装数量](https://iobroker.live/badges/solarmanpv-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/solarmanpv-stable.svg)
![依赖状态](https://img.shields.io/david/raschy/iobroker.solarmanpv.svg)
![新公共管理](https://nodei.co/npm/iobroker.solarmanpv.png?downloads=true)

# IoBroker.solarmanpv
**测试：**![测试和发布](https://github.com/raschy/ioBroker.solarmanpv/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 solarmanpv 适配器
读取阳台发电厂数据

＃＃＃ 入门
该适配器用于在ioBroker中显示阳台电站的数据，该电站由“Bosswerk MI600”逆变器提供。该逆变器与Deye系列的其他产品兼容。

我假设到目前为止，该工厂是由“Solarman”应用程序监控的。
此适配器从该云获取数据。

首先，您需要联系 Solarman 支持团队 <service@solarmanpv.com> 获取所需的凭证（app_id 和 app_secret）。
可能还会有人询问：“请问您使用的是什么平台？您的职位是什么？您是个人用户、运维服务商、制造商还是分销商？能否提供您的 API 邮箱地址？”。就我而言，接下来又有人询问：“您为什么要申请 API？”。我礼貌地回答了这个问题，第二天就收到了必要的数据。

在管理页面上，这 4 个字段必须符合描述。
此适配器创建为“计划”适配器。
由于云端数据大约每 6 分钟更新一次，因此无需更频繁地启动适配器。

自 0.3.0 版本起，与之前的版本相比，新增了黑名单功能。这意味着 API 提供的所有值都会被读取，用户可以通过黑名单过滤掉不需要的值。相应的数据点也可以删除，从而使对象数量更加清晰。

自 2023 年 4 月 16 日起，Solarman 已切换到新平台 - 版本 0.4.0。
API 的现有版本尚未进行进一步调整。

在 0.5.2 到 0.6.x 版本中，仅进行了开发人员调整。

在 0.7.0 版本中，node-js 被提升至推荐版本 20.x，并且 js-controller >6 成为必备条件。Email 和 app-secret 均已加密。因此，更新后必须重新输入这两个值！

在0.7.1版本中，仅对实例视图进行了微小的调整。

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.7.1 (2025-04-25)
* (raschy) jsonConfig customized

### 0.7.0 (2025-04-23)
* (raschy) NodeJS >= 20.x and js-controller >= 6 is required
* (raschy) email and appsecret is now encrypted, please re-enter!

### 0.6.4 (2025-02-06)
* (raschy) Developer system to nodejs 22.x updated

### 0.6.3 (2025-01-02)
* (raschy) Design edited
* (raschy) Migration from ESLint 8.x to 9.x

### 0.6.2 (2024-11-08)
* (raschy) responsive-design customized
* (raschy) updated to adapter-core 3.2.2

### 0.6.1 (2024-08-15)
* (raschy)  renewed version without changes
* (raschy) 	Dependencies require minor releases

### 0.6.0 (2024-08-15)
* (raschy) 	Dependencies require minor releases

### 0.5.3 (2024-08-14)
* (raschy) 	Warning in schema corrected

### 0.5.2 (2024-08-10)
* (raschy) 	updated dependencies
* (raschy)  NodeJS >= 18.x and js-controller >= 5 is required

### 0.5.1 (2023-09-04)
* (raschy) Expanded number of modules

### 0.5.0 (2023-06-16)
* (raschy) Set selected values to zero

### 0.4.3 (2023-06-12)
* (raschy) Blacklist also deletes data points
* (raschy) Fixed error with multiple inverters

### 0.4.2 (2023-05-31)
* (raschy) Module selection activated

### 0.4.1 (2023-05-27)
* (raschy) Do not display devices that are not required

### 0.4.0 (2023-04-16)
* (raschy) Solarman has switched to a new platform

### 0.3.2 (2023-03-28)
* (raschy) Error 'DB-closed' fixed

### 0.3.1 (2023-02-19)
* (raschy) Inverter-Filter deactivated

### 0.3.0 (2023-02-17)
* (raschy) Blacklist added

### 0.2.2 (2023-02-08)
* (raschy) Release for github/npm

### 0.2.1 (2023-02-08)
* (raschy) Timeout extended, type error fixed during setup, some data added from BMS

### 0.2.0 (2022-11-07)
* (raschy) Adding the battery data from hybrid inverters

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

### 0.0.1 (2022-06-16)
* (raschy) initial release

## License
MIT License

Copyright (c) 2022-2025 raschy <raschy@gmx.de>

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