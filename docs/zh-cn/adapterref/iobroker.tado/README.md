---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: fxDUb+ewLgqw9B7cs1nMbtDhciGpVjNg8zxzfTyb2bY=
---
# IoBroker.tado

![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.tado)
![国家公共管理](https://nodei.co/npm/iobroker.tado.png?downloads=true)

<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)![测试与发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
tado° 确保舒适健康的气候，同时节省高达 31% 的供暖费用。

## 你可以掌控的事情
|状态|描述 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power |打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.温度.celsius |定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone |切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp |设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds |设置时间表模式应用多长时间 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius |温度偏移|
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].childLockEnabled |童锁开/关 |
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id |选择活动时间表 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.openWindowDetectionEnabled |启用/禁用恒温器上的开窗检测 |
| tado.[x].[yyyyyy].Rooms.[z].openWindowDetection.timeoutInSeconds |检测到打开的窗户时关闭恒温器的超时时间 |
| tado.[x].[yyyyyy].Rooms.[z].activateOpenWindow |检测到打开的窗户时关闭恒温器（仅当恒温器检测到打开的窗户时才起作用）|
| tado.[x].[yyyyyy].Home.state.presence | tado.[x].[yyyyyy].Home.state.presence |设置“在家”、“外出”或“自动”模式 |
| tado.[x].[yyyyyy].Home.masterswitch |打开/关闭所有设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.mode | AC 模式（仅限 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | tado.[x].[yyyyyy].Rooms.[z].setting.fanspeed | Fanspeed（仅限 V3 及更早版本的交流设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.fanLebel | Fanlebel（仅限 V3+ 版本的 AC 设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing | tado.[x].[yyyyyy].Rooms.[z].setting.verticalSwing |垂直摆动（仅限 V3+ 版本的交流设备）|
| tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing | tado.[x].[yyyyyy].Rooms.[z].setting.horizontalSwing |水平摆动（仅限 V3 及更早版本的交流设备）|

## 需要
* NodeJS 16 或更高版本
* ioBroker 主机（js-controller）4.0 或更高版本

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__

-->
### 0.4.11 (2023-10-09)
* (HGlab01) Bump json-explorer to 0.1.14
* (Garfonso) add AUTO for *.Home.state.presence (in addtion to HOME and AWAY)

### 0.4.10 (2023-09-26)
* (HGlab01) Add attribute 'isBalanceHpEligible'
* (HGlab01) improve axios keep_a_live

### 0.4.9 (2023-07-05)
* (HGlab01) Add attribute 'zonesCount'
* (HGlab01) Bump ioBroker-jsonExplorer to 0.1.12

### 0.4.8 (2023-05-12)
* (HGlab01) Add attribute 'isHeatSourceInstalled'
* (HGlab01) Bump axios to 1.4.0

### 0.4.7 (2023-04-26)
* (HGlab01) Add attribute 'generation'
* (HGlab01) improve axios error handling
* (HGlab01) Bump axios to 1.3.6

## License
MIT License

Copyright (c) 2023 HGlab01 & DutchmanNL <rdrozda@hotmail.com>

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