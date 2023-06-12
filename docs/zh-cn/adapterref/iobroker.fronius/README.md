---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.fronius/README.md
title: ioBroker.fronius
hash: GKi98IwoluJMwH+FOLLvAeQRHvU3pc566UGgNXHdEL0=
---
![标识](../../../en/adapterref/iobroker.fronius/admin/fronius.png)

![GitHub 许可证](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.fronius)
![下载](https://img.shields.io/npm/dm/iobroker.fronius.svg)
![GitHub 存储库大小](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.fronius)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.fronius)
![GitHub 自最新版本以来提交（按日期）](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.fronius/latest)
![GitHub 最后一次提交](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.fronius)
![GitHub 问题](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.fronius)
![NPM 版本](http://img.shields.io/npm/v/iobroker.fronius.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/fronius-stable.svg)
![安装数量](https://iobroker.live/badges/fronius-installed.svg)

#ioBroker.fronius
[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/fronius/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **版本：** </br> </br> **测试：** </br> [![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.fronius/actions/workflows/codeql.yml)

<!--

## Sentry **此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。
-->
## IoBroker 的 Fronius 逆变器适配器
这是一个 ioBroker 适配器，适用于 Fronius PV 逆变器，Fronius Datalogger Web 从 2.0.4-1 版本开始，Fronius Datamanager 从 3.0.3-1 版本开始和 Symo Gen24。

＃＃ 安装
安装不需要特殊设置。只需安装适配器并启动实例。然后转到适配器配置。在配置部分输入逆变器的 IP 地址或 URL。然后你需要按下“检查IP”按钮。这是触发检查和读取系统配置所必需的。稍后需要此系统配置来控制 API 调用。

## 请求附加参数
如果您想要额外的参数或 API 调用，请在票证中提供您已执行的调用，以及包含对该调用的 JSON 响应的文件，以便将其添加到系统和测试环境中。在任何情况下，请提供来自此调用的系统信息 http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System 以便系统设置清晰。

## 报告问题
如果您发现任何问题，请在 [Github](https://github.com/iobroker-community-adapters/ioBroker.fronius/issues) 上报告并提供以下信息

- 安装了适配器版本
- 当前行为的详细日志（日志级别 Debug 或 Silly）
- 关于问题的详细描述
- 如果来自 http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System 的系统信息有用（需要调整 IP 地址）

## 执行的 API 调用
以下请求被发送到 API。但是可用的数据点在很大程度上取决于总线上的特定设备。因此，如果缺少数据点，请先检查 API 是否提供了此信息。 IP 地址和 DeviceId 参数必须根据您自己的设置进行调整。

### 一般系统信息
- http://192.168.0.1/solar_api/v1/GetActiveDeviceInfo.cgi?DeviceClass=System

###逆变器数据
- http://192.168.0.1/solar_api/v1/GetInverterInfo.cgi
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=3PInverterData
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CommonInverterData
- http://192.168.0.1/solar_api/v1/GetInverterRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxInverterData
- http://192.168.0.1/solar_api/v1/GetArchiveData.cgi?Scope=System&StartDate=02.06.2023&EndDate=02.06.2023&Channel=Current_DC_String_1&Channel=Current_DC_String_2&Channel=Temperature_Powerstage&Channel=Voltage_DC_Str ing_1&Channel=Voltage_DC_String_2

###欧姆导频数据
- http://192.168.0.1/solar_api/v1/GetOhmPilotRealtimeData.cgi?Scope=System

### 存储数据
- http://192.168.0.1/solar_api/v1/GetStorageRealtimeData.cgi?Scope=Device&DeviceId=0

### 智能电表数据
- http://192.168.0.1/solar_api/v1/GetMeterRealtimeData.cgi?Scope=Device&DeviceId=0

### 传感器卡数据
- http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowSensorData
- http://192.168.0.1/solar_api/v1/GetSensorRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=MinMaxSensorData

### 字符串数据
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=NowStringControlData
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=LastErrorStringControlData
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Day
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Year
- http://192.168.0.1/solar_api/v1/GetStringRealtimeData.cgi?Scope=Device&DeviceId=1&DataCollection=CurrentSumStringControlData&TimePeriod=Total

### Powerflow 数据（逆变器/站点）
- http://192.168.0.1/solar_api/v1/GetPowerFlowRealtimeData.fcgi

### 站点数据
- http://192.168.0.1/solar_api/v1/GetLoggerInfo.cgi

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.1 (2023-06-04)

-   (mcm1957) Deploy mechanism at github has been reactivated.

### 2.0.0 (2023-06-04)

-   (nkleber78) Several errors resulting in missing data have been fixed. (#152, #242, #175)
-   (nkleber78) Several errors due to missing objects have been solved. (#206, #129, #76)
-   (nkleber78) The usage of the ping utility has been removed. (#169)
-   (nkleber78) Reading of mpp values has been added. (#78)
-   (nkleber78) 'Request' module has been replaced by 'axios'.
-   (mcm1957) Dependencies and toolset have been updated.

### 1.2.0 (2021-12-18)

-   (nkleber78) Fixed changes related to GEN24 API update for latest FW incl. object creation for storage objects

### 1.1.6 (2021-03-xx)

-   (nkleber78) Fixed issue #97, Added some new predefined objects
-   (nkleber78) Added Inverter Temperature readout (#86)

### 1.1.3 (2021-03-15)

-   (nkleber78) Split main.js into multiple files for better maintenance
-   (nkleber78) Prevent creating info objects which are not supported by the inverters
-   (schweigel) Added archive request values
-   (schweigel) Added archive polling intervall
-   (schweigel) Added devicetype string

### 1.1.1 (2020-11-30)

-   (schweigel) Added missing units
-   (schweigel) Added inverterinfo

### 1.1.0 (2020-11-24)

-   (nkleber78) Implementation change for support of SYMO GEN24
-   (nkleber78) Fix issue with adapters connected state

### 1.0.5 (2019-01-18)

-   (ldittmar) compact mode compatibility added
-   (ldittmar) add chinese support

### 1.0.4

-   (ldittmar) Fix assignment to constant variable error

### 1.0.3

-   (ldittmar) Ready for Admin 3

### 1.0.2

-   (tobintax) Bugfix - Inverter Query regarding PAC adjusted.

### 1.0.1

-   (tobintax) Added more values from Smartmeter
-   (tobintax) Added more Powerflow Values
-   (tobintax) Removed Value "EnergyReal_WAC_Minus_Relative" . This Value had no result and is undocumented in the fronius api documentation.

### 1.0.0

-   (ldittmar) Fixed little errors

### 0.0.5

-   (ldittmar) Read storage data and error/status codes

### 0.0.4

-   (ldittmar) Read more data

### 0.0.3

-   (ldittmar) Improved installation routine

### 0.0.2

-   (ldittmar) First data is read

### 0.0.1

-   (ldittmar) initial commit

## License

The MIT License (MIT)

Copyright (c) 2023 ldittmar <iobroker@lmdsoft.de>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.