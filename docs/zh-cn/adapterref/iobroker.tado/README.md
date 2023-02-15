---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: KXxKax0NFNwCyfYeQhzwzMl39r3rJCPv2LdKDjNUqqs=
---
![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![NPM](https://nodei.co/npm/iobroker.tado.png?downloads=true)

#ioBroker.tado
<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![测试和发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
tado° 确保舒适健康的气候，同时节省高达 31% 的取暖费。

## 你可以驾驭的东西
|状态 |说明 |
| ----- | ----------- |
| tado.[x].[yyyyyy].房间.[z].setting.power |打开/关闭设备 |
| tado.[x].[yyyyyy].房间.[z].setting.temperature.celsius |定义温度 |
| tado.[x].[yyyyyy].房间.[z].overlayClearZone |切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp |设置时间表模式 |
| tado.[x].[yyyyyy].房间.[z].overlay.termination.durationInSeconds |设置时间表模式应用多长时间 |
| tado.[x].[yyyyyy].房间.[z].设备.[RUaaaaaaaaaa].offset.offsetCelsius |温度偏移 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled |儿童锁开/关 |
| tado.[x].[yyyyyy].房间.[z].timeTables.tt_id |选择活动时间表 |
| tado.[x].[yyyyyy].房间.[z].openWindowDetection.openWindowDetectionEnabled |在恒温器上启用/禁用开窗检测 |
| tado.[x].[yyyyyy].房间.[z].openWindowDetection.timeoutInSeconds |超时检测到打开的窗口时恒温器关闭多长时间 |
| tado.[x].[yyyyyy].房间.[z].activateOpenWindow |当检测到打开的窗户时关闭恒温器（仅当恒温器检测到打开的窗户时才有效）|
| tado.[x].[yyyyyy].Home.state.presence |设置在家或外出模式 |
| tado.[x].[yyyyyy].主页.masterswitch |打开/关闭所有设备 |
| tado.[x].[yyyyyy].房间.[z].setting.mode |交流模式（仅限交流设备）|
| tado.[x].[yyyyyy].房间.[z].setting.fanspeed | Fanspeed（仅限 V3 及更早版本的 AC 设备）|
| tado.[x].[yyyyyy].房间.[z].setting.fanLebel | Fanlebel（仅限V3+版本的交流设备）|
| tado.[x].[yyyyyy].房间.[z].setting.verticalSwing |垂直摆动（仅限 V3+ 版本的交流设备）|
| tado.[x].[yyyyyy].房间.[z].setting.horizontalSwing |水平摆动（仅限 V3 及更早版本的交流设备）|

## 要求
* NodeJS 14.16 或更高版本
* ioBroker 主机 (js-controller) 4.0 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.4.4 (2023-02-03)
* (HGlab01) Add attribute 'energyIqReminder' and 'specialOffersEnabled'
* (HGlab01) Bump axios to 1.3.1
* (HGlab01) Fix 'Invalid value TADO_MODE' (#585)

### 0.4.3 (2022-12-06)
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.10 (#551)
* (HGlab01) Bump axios to 1.2.1 (final fix for #561)
* (HGlab01) Improve logs

### 0.4.2 (2022-11-27)
* (HGlab01) Downgrade axios to 1.1.3 (#561)

### 0.4.1 (2022-11-24)
* (HGlab01) Add attribute isBalanceAcEligible
* (HGlab01) Bump axios from 0.27.2 to 1.2.0
* (HGlab01) Bump simple-oauth2 from 4.3.0 to 5.0.0

### 0.4.0 (2022-09-05)
* (HGlab01) !Breaking change! NodeJS 14.16 or higher required
* (HGlab01) !Breaking change! ioBroker js-controller 4.0 or higher required
* (HGlab01) Bump is-online from 9.0.1 to 10.0.0

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