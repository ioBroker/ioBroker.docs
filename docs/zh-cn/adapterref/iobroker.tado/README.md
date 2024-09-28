---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: wcKDGuZTcAl+b0gv/mO1IAPS9wElt49zMNjRAsMdLH8=
---
# IoBroker.tado

![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![新平台](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![测试与发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
Tado° (https://www.tado.com) 是家庭智能供暖和能源管理方面的专家，在德国设计和开发。与我们一起节省能源并降低成本 - 享受舒适而可持续的家居。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 塔多° X
此适配器**目前不支持** Tado X。此适配器支持 Tado V3、V3+ 和 V2。
如果有人支持添加 Tado X 功能，请提交工单或发送电子邮件至 <myiobrokeradapters@gmail.com>。您需要支持一些调试会话并与适配器开发人员进行交互。

## 你可以控制的事情
| 状态 | 描述 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | 打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | 定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | 切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | 设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | 设置时间表模式的应用时间长度 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | 温度偏移 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | 儿童锁开启/关闭 |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | 选择活动时间表 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | 启用/禁用恒温器上的开窗检测 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | 当检测到打开的窗户时，恒温器关闭的超时时间 |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | 当检测到打开的窗户时关闭恒温器（仅当恒温器检测到打开的窗户时有效）|
| tado.[x].[yyyyyy].Home.state.presence | 设置在家、外出或自动模式 |
| tado.[x].[yyyyyy].Home.masterswitch | 打开/关闭所有设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | 空调模式（仅限空调设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | 风扇速度（仅限 V3 及更早版本的空调设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel（仅限 V3+ 版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | 垂直摆动（仅限 V3+ 版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | 水平摆动（仅限 V3 及更早版本的 AC 设备）|
| tado.[x].[yyyyyy].meterReadings | 带有 {"date":"YYYY-MM-DD","reading": 1234} 的 JSON 对象可用于将电表读数上传到 Energy IQ |

## 需要
* Node.js 18 或更高版本
* ioBroker 主机 (js-controller) 5.0 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.5.7-alpha.1 (2024-09-25)
* (HGlab01) Change of attribute "light" supported
* (HGlab01) Add attribute 'connection'
* (HGlab01) Add attribute 'supportsFlowTemperatureOptimization'
* (HGlab01) Bump axios to 1.7.7
* (HGlab01) EnergyIQ meter-readings can be uploaded

### 0.5.6 (2024-08-06)
* (HGlab01) Improve AccessToken Management
* (HGlab01) Bump axios to 1.7.3
* (HGlab01) Add attribute 'language'
* (HGlab01) Add attribute 'isHeatPumpInstalled'

### 0.5.5 (2024-06-25)
* (HGlab01) Bump axios to 1.7.2

### 0.5.4 (2024-04-18)
* (HGlab01) Add attribute 'runningOfflineSchedule'
* (HGlab01) Bump axios to 1.6.8

### 0.5.3 (2024-01-29)
* (HGlab01) Improve axios handling
* (HGlab01) Bump axios to 1.6.7

## License
MIT License

Copyright (c) 2024 HGlab01 <myiobrokeradapters@gmail.com> & DutchmanNL <oss@drozmotix.eu>

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