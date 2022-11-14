---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: nrMyL/9foi7/L0LIs3PVRgaOmMS3aEEcBPu8ekFqpow=
---
# IoBroker.tado

![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![新PM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![测试和发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
tado° 确保舒适健康的气候，同时节省高达 31% 的取暖费。

## 0.4.0 中的重大变化
* 需要 NodeJS 14.16 或更高版本
* 需要 ioBroker 主机 (js-controller) 4.0 或更高版本

＃＃ 支持我
如果您喜欢我的工作，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.tado/main/admin/button.png)](http://paypal.me/DutchmanNL)

## 你可以掌控的事情
|状态 |说明 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power |打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius |定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone |切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp |设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds |设置时间表模式应用多长时间 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius |温度偏移 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled |童锁开/关 |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id |选择活动时间表 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled |在恒温器上启用/禁用打开窗口检测 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds |检测到打开的窗口时关闭恒温器的超时时间 |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow |检测到打开的窗户时关闭恒温器（仅在恒温器检测到打开的窗户时才有效）|
| tado.[x].[yyyyyy].Home.state.presence |设置 HOME 或 AWAY 模式 |
| tado.[x].[yyyyyy].Home.masterswitch |打开/关闭所有设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode |交流模式（仅限交流设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Fanspeed（仅限 V3 和更早版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel（仅限 V3+ 版本的交流设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing |垂直摆动（仅限 V3+ 版本的交流设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing |水平摆动（仅限 V3 及更早版本的交流设备）|

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.0 (2022-09-05)
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Bump is-online from 9.0.1 to 10.0.0

### 0.3.16 (2022-08-01)
* (HGlab01) Support light (issue #519)
* (HGlab01) Add attributes vattenfallBannerDiscountCode, thresholdModeActive, mountingStateWithError, isAirComfortEligible

### 0.3.15 (2022-02-27)
* (DutchmanNL) move to jsonConfig.json (Admin 5)
* (ilueckel) Support steering of ActivateOpenWindow, OpenWindowDetection, childLockEnabled 
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.9
* (HGlab01) js-controller 4.0 readiness

### 0.3.14 (2022-01-21)
* (HGlab01) Improve hotwater handling
* (HGlab01) Improve AC Control v3 devices 
* (HGlab01) Support swing ON/OFF for AC v3 devices

### 0.3.13 (2022-01-03)
* (HGlab01) Optimize internet-check by using isOnline-library
* (HGlab01) Support Smart AC Control V3+ (issue #403)
* (HGlab01) Offset temperature rounding to max. 2 digits

## License
MIT License

Copyright (c) 2022 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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