---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: 7yLbgbElOKGLdbPXvmA+mjat20QDtzBYxvZoOhg61A4=
---
# IoBroker.tado

![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) ![测试与发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
Tado° (https://www.tado.com) 是德国设计研发的智能家居供暖和能源管理专家。选择 Tado°，永久节能省钱，享受舒适环保的可持续家居生活。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

## ！重要！Tado° 将引入 API 调用限制
Tado 将对 API 调用次数进行限制。未订阅 Auto-Assist 的用户每天最多只能调用 100 次，订阅用户则可调用 20,000 次。

更多信息，请参阅 [这](https://support.tado.com/en/articles/12165739-limitation-for-rest-api-usage) 文章。

Tado ioBroker 适配器新增了一项功能，提供新的配置选项来管理 API 使用情况。然而，每天 100 次调用的限制意味着，如果没有 Auto-Assist 订阅，该适配器将无法使用。这相当于每小时只能发出大约 4 个请求，严重影响了适配器的功能。

如果您对 Tado 的这项决定不满，请让他们 [知道](https://support.tado.com/de/articles/3590239-wie-kann-ich-den-kundensupport-von-tado-kontaktieren) ！

## Tado° X
已提供对 Tado° X 的基本支持。

如果您的配置出现问题，请提交 [票](https://github.com/DrozmotiX/ioBroker.tado/issues/new?assignees=HGlab01&labels=enhancement&projects=&template=Enhancement.md&title=) 错误报告。您需要配合一些调试工作，并与适配器开发者沟通，以改进 Tado° X 的功能。

## Tado° V3+、V3、V2 上可操控的功能
| 状态 | 描述 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | 打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius | 定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone | 切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp | 设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds | 设置时间表模式的应用时长 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius | 温度偏移 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled | 儿童锁开/关 |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id | 选择当前有效时间表 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled | 启用/禁用恒温器上的开窗检测 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds | 检测到窗户打开时，恒温器关闭的超时时间 |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow | 当检测到窗户打开时关闭恒温器（仅当恒温器检测到窗户打开时才有效） |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | 交流电模式（仅限交流电设备） |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | 风扇速度（仅限 V3 及更早版本的空调设备） |
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | 风扇标签（仅限 V3+ 版本的空调设备） |
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | 垂直摆动（仅限 V3+ 版本的空调设备） |
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | 水平摆动（仅限 V3 及更早版本的空调设备） |
| tado.[x].[yyyyyy].Home.state.presence | 设置 HOME、AWAY 或 AUTO 模式 |
| tado.[x].[yyyyyy].Home.masterswitch | 打开/关闭所有设备 |
| tado.[x].[yyyyyy].meterReadings | JSON 对象，包含 {"date":"YYYY-MM-DD","reading": 1234}，可用于将电表读数上传到 Energy IQ |

## 你可以在 Tado° X 上操控的事情
| 状态 | 描述 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power | 打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.value | 定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.controlType | 设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].manualControlTermination.remainingTimeInSeconds | 定时器模式的持续时间 |
| tado.[x].[yyyyyy].Rooms.[z].resumeScheduleRoom | 此房间恢复自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[VAaaaaaaaaaa].temperatureOffset | 更改设备温度偏移量 |
| tado.[x].[yyyyyy].Rooms.resumeScheduleHome | 返回所有房间的自动模式 |
| tado.[x].[yyyyyy].Rooms.allOff | 关闭所有房间 |
| tado.[x].[yyyyyy].Rooms.boost | 将所有房间切换至加速模式 |
| tado.[x].[yyyyyy].Home.state.presence | 设置 HOME、AWAY 或 AUTO 模式 |
| tado.[x].[yyyyyy].meterReadings | JSON 对象，包含 {"date":"YYYY-MM-DD","reading": 1234}，可用于将电表读数上传到 Energy IQ |

## 需要
* Node.js 20 或更高版本
* ioBroker 主机（js-controller）7.0.6 或更高版本
* iorBroker.admin 7.7.2 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.8.3 (2025-11-13)
* (HGlab01) add capability to set OffSet [TadoX]
* (HGlab01) Implement deboucing also for TadoX
* (HGlab01) fix nextScheduleChange is missing the required property "common.type" [TadoX]

### 0.8.2 (2025-11-07)
* (HGlab01) add retry mechanism when it comes to timeouts
* (HGlab01) add attribute 'isRoomLinkRestricted'
* (HGlab01) finally fix definition missing for 'awayMode' with value 'null' [TadoX]
* (HGlab01) finally fix definition missing for 'holidayMode' with value 'null' [TadoX]
* (HGlab01) bump iobroker-jsonExplorer to 0.2.2
* (HGlab01) bump axios to 1.13.2

### 0.8.1 (2025-11-04)
* (HGlab01) code refactorings
* (HGlab01) fix issue 'definition missing for holidayMode' [TadoX]
* (HGlab01) fix issue 'cannot read properties of undefined (reading 'match')'
* (HGlab01) fix issue openWindow data not up to date #1086

### 0.8.0 (2025-10-07)
* (HGlab01) new configuration capabilities to manage API usage quota (#1047, #1048)
* (HGlab01) Implement API debouncing
* (HGlab01) Refactorings Tado API calls
* (HGlab01) fix issue 'definition missing for awayMode' [TadoX]
* (HGlab01) fix issue 'definition missing for preheating' [TadoX]
* (HGlab01) Additional guidance/log when it comes to RefreshToken issue
* (HGlab01) fix Object of state "tado.0.xxxxx.Rooms.y.openWindow" is missing the required property "common.type" (#1059)
* (HGlab01) Bump axios to 1.12.2
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.0

### 0.7.10 (2025-04-25)
* (HGlab01) further token refresh optimizations

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