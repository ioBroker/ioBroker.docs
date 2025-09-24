---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: 1FE1vzrNGINQ6iiDnOBkccJ3iCl6Y5Iy0cfnXMDm5hA=
---
# IoBroker.tado

![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![新公共管理](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![测试和发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
Tado° (https://www.tado.com) 是家居智能供暖和能源管理专家，产品在德国设计和开发。与我们携手，节能降耗，打造舒适可持续的家居环境。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。**有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-Plugin 文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 重要！Tado° 将引入 API 调用限制
Tado 将对 API 调用进行限制。未订阅 Auto-Assist 的用户每日调用次数限制为 100 次，订阅 Auto-Assist 的用户每日调用次数限制为 20,000 次。
更多信息，请参阅[这](https://support.tado.com/en/articles/12165739-limitation-for-rest-api-usage) 文章。
Tado ioBroker 适配器新增了一项功能，提供新的配置功能来管理 API 的使用情况。然而，每日 100 次调用的限制意味着，如果没有 Auto-Assist 订阅，该适配器将无法使用。这意味着每小时只能发出大约 4 个请求，这严重影响了适配器的功能。
如果您对 Tado 的决定不满意，请告知他们[知道](https://support.tado.com/de/articles/3590239-wie-kann-ich-den-kundensupport-von-tado-kontaktieren)！

## 多度° X
提供对 Tado° X 的基本支持。
如果您的设置无法正常工作，请提交[票](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01&labels=enhancement&projects=&template=Enhancement.md&title=)。您需要支持一些调试会话并与适配器开发人员互动，以改进 Tado° X 功能。

## 您可以在 Tado° V3+、V3、V2 上操控的东西
| 状态 | 描述 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | 打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | 定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | 切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | 设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | 设置时间表模式的应用时长 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | 温度偏移 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | 儿童锁开/关 |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | 选择活动时间表 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | 启用/禁用恒温器上的开窗检测 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | 检测到打开的窗户时恒温器关闭的超时时间 |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | 当检测到打开的窗户时关闭恒温器（仅当恒温器检测到打开的窗户时才有效）|
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | 空调模式（仅限空调设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | 风扇速度（仅限 V3 及更早版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel（仅限 V3+ 版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | 垂直摆动（仅限 V3+ 版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | 水平摆动（仅限 V3 及更早版本的 AC 设备）|
| tado.[x].[yyyyyy].Home.state.presence | 设置在家、外出或自动模式 |
| tado.[x].[yyyyyy].Home.masterswitch | 打开/关闭所有设备 |
| tado.[x].[yyyyyy].meterReadings | 带有 {"date":"YYYY-MM-DD","reading": 1234} 的 JSON 对象可用于将电表读数上传到 Energy IQ |

## 您可以在 Tado° X 上操控的东西
| 状态 | 描述 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | 打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.value | 定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.controlType | 设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.remainingTimeInSeconds | 定时器模式的持续时间 |
| tado.[x].[yyyyyy].Rooms.[z].resumeScheduleRoom | 返回此房间的自动模式 |
| tado.[x].[yyyyyy].Rooms.resumeScheduleHome | 所有房间恢复自动模式 |
| tado.[x].[yyyyyy].Rooms.allOff | 关闭所有房间 |
| tado.[x].[yyyyyy].Rooms.boost | 将所有房间切换到增强模式 |
| tado.[x].[yyyyyy].Home.state.presence | 设置在家、外出或自动模式 |
| tado.[x].[yyyyyy].meterReadings | 带有 {"date":"YYYY-MM-DD","reading": 1234} 的 JSON 对象可用于将电表读数上传到 Energy IQ |

## 要求
* Node.js 20 或更高版本
* ioBroker 主机 (js-controller) 7.0.6 或更高版本
* iorBroker.admin 7.7.2 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.8.0-alpha.0 (2025-09-22)
* (HGlab01) fix issue 'definition missing for awayMode' [TadoX]
* (HGlab01) fix issue 'definition missing for preheating' [TadoX]
* (HGlab01) Additional guidance/log when it comes to RefreshToken issue
* (HGlab01) new configuration capabilities to manage API usage quota (#1047, #1048)
* (HGlab01) Bump axios to 1.12.2

### 0.7.10 (2025-04-25)
* (HGlab01) further token refresh optimizations

### 0.7.9 (2025-04-17)
* (HGlab01) fix issue 'refreshToken() failed'

### 0.7.8 (2025-04-10)
* (HGlab01) fix issue 'definition missing for balanceControl' [TadoX]

### 0.7.7 (2025-04-08)
* (HGlab01) optimize sentry usage
* (HGlab01) improve retry-mechanism when it comes to erros

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com> & DutchmanNL <oss@drozmotix.eu>

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