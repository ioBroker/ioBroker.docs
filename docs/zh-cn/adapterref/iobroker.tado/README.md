---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.tado/README.md
title: ioBroker.tado
hash: Z7CxzGNDPG5NM+CfvhcM9fc9SbEmmlJ2tK70SWV3ShM=
---
![安装数量](http://iobroker.live/badges/tado-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.tado.svg)
![下载](https://img.shields.io/npm/dm/iobroker.tado.svg)
![依赖状态](https://img.shields.io/david/DrozmotiX/iobroker.tado.svg)
![已知漏洞](https://snyk.io/test/github/DrozmotiX/ioBroker.tado/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.tado.png?downloads=true)

#ioBroker.tado
<img src="./admin/tado.png" width="50" height="50">

[![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/tado/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

![测试和发布](https://github.com/DrozmotiX/ioBroker.tado/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 tado 适配器
tado° 确保舒适健康的气候，同时节省高达 31% 的取暖费用。

＃＃ 支持我
如果您喜欢我的作品，请随时提供个人捐赠（这是 DutchmanNL 的个人捐赠链接，与 ioBroker 项目无关！[![捐赠](https://raw.githubusercontent.com/DrozmotiX/ioBroker.tado/main/admin/button.png)](http://paypal.me/DutchmanNL)

## V0.3.x 中的重大更改
建议：如果可能，首先删除旧的适配器安装或删除所有状态，以便安装中不会保留不受支持的状态。
从 0.2.x 升级到 v0.3.x 包括具有重大更改的技术重构。某些州更改了名称/路径，例如

| v0.2.x | v0.3.x |
| ------ | ------ |
| tado.[x].[yyyyy].Rooms.[z].setting.temperature |tado.[x].[yyyyy].Rooms.[z].setting.temperature.celsius |
| tado.[x].[yyyyy].Rooms.[z].overlay.clearZoneOverlay | tado.[x].[yyyyy].Rooms.[z].overlayClearZone |
| tado.[x].[yyyyy].Rooms.[z].Actual_Temperature | tado.[x].[yyyyy].Rooms.[z].sensorDataPoints.insideTemperature.celsius |
| tado.[x].[yyyyy].Rooms.[z].Actual_Humidity | tado.[x].[yyyyy].Rooms.[z].sensorDataPoints.humity.percentage |
| tado.[x].[yyyyy].Rooms.[z].heatingPower | tado.[x].[yyyyy].Rooms.[z]..activityDataPoints.heatingPower.percentage |
| tado.[x].[yyyyy].Weather.solarIntensity | tado.[x].[yyyyy].Weather.solarIntensity.percentage |
| tado.[x].[yyyyy].Weather.outsideTemperature | tado.[x].[yyyyy].Weather.outsideTemperature.celsius |

一般情况下，如果 API 发送 NULL 或什么都不发送，则值现在为 NULL。在 v0.2.x 中，有时会保留旧值，有时会替换为 0，有时会使用 NULL。
**很高兴根据您的反馈添加其他主要更改！**

## 你可以驾驭的东西
|状态 |说明 |
| ----- | ----------- |
| tado.[x].[yyyyyy].Rooms.[z].setting.power |打开/关闭设备 |
| tado.[x].[yyyyyy].Rooms.[z].setting.temperature.celsius |定义温度 |
| tado.[x].[yyyyyy].Rooms.[z].overlayClearZone |切换到自动模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.typeSkillBasedApp |设置时间表模式 |
| tado.[x].[yyyyyy].Rooms.[z].overlay.termination.durationInSeconds |设置时间表模式应用多长时间 |
| tado.[x].[yyyyyy].Rooms.[z].devices.[RUaaaaaaaaaa].offset.offsetCelsius |温度偏移|
| tado.[x].[yyyyyy].Rooms.[z].timeTables.tt_id |选择活动时间表 |
| tado.[x].[yyyyyy].Home.state.presence |设置 HOME 或 AWAY 模式 |
| tado.[x].[yyyyyy].Home.masterswitch |打开/关闭所有设备 |
|风扇速度| Fanspeed（仅限交流设备）|
|模式 | AC 模式（仅限 AC 设备）|

**如果您有 AC 设备，请随意为最后两行提供具体的 AC 设备路径！**

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.3.11-alpha.4 (2021-11-11)
* (HGlab01) support attributes 'showSwitchToAutoGeofencingButton', 'showHomePresenceSwitchButton' and 'additionalConsents'
* (HGlab01) enhance error messages if API-call fails
* (HGlab01) next time block fails (one reason for 422 error) if time blocks are not defined - fixed now
* (HGlab01) set HOME/AWAY is now suported by using state tado.x.yyyyyy.Home.state.presence
* (HGlab01) offset range -9.99/+10 validated
* (HGlab01) add masterswitch for power on/off

### 0.3.10 (2021-10-29)
* (HGlab01) API calls (except read) are queued and send one after the other
* (HGlab01) unhandled errors are now handled
* (HGlab01) Internet connection is checked before requests are placed
* (HGlab01) support attribute 'fanLevel' (Sentry: IOBROKER-TADO-35)
* (HGlab01) support structure element "folder", so now it is folder-->device-->channel
* (HGlab01) add home-states presence and presenceLock
* (HGlab01) Bump iobroker-jsonexplorer to 0.1.5

### 0.3.9 (2021-10-16)
* (DutchmanNL) force correct NodeJS dependency with error at install
* (HGlab01) implement queuing for API requests (avoids some status code 422 issues)

### 0.3.8 (2021-10-06)
* (HGlab01) support attributes 'orientfanLevelation', 'verticalSwing', 'horizontalSwing' (#352)
* (HGlab01) catch 422 issue in poolApiCall()

### 0.3.7 (2021-08-24)
* (HGlab01) ActiveTimeTable can be set (#337)
* (HGlab01) Improve logs and change code structure a little bit
* (HGlab01) manage min/max temperature for heating (5-25 celsius) and hotwater (30-80 celsius) to avoid API crashes (#341)

### 0.3.6 (2021-08-16)
* (HGlab01) support attribute 'orientation' (Sentry: IOBROKER-TADO-35)

### 0.3.5 (2021-08-05)
* (HGlab01) fix issue 'hot water cannot be switched on' (#309)
* (HGlab01) change to new sentry dsn
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.2

### 0.3.4 (2021-07-24)
* (HGlab01) add attribute 'location' to blacklist (Sentry IOBROKER-TADO-2Y)
* (HGlab01) support attribute 'swing' (Sentry: IOBROKER-TADO-2G)
* (HGlab01) support attribute 'end' and 'commandTableUploadState' (Sentry: IOBROKER-TADO-1M)

### 0.3.3 (2021-07-19)
* (HGlab01) Add attributes title, ssid and code
* (HGlab01) Improve sentry handling by bumping iobroker-jsonexplorer to v0.1.1

### 0.3.2 (2021-07-15)
* (HGlab01) Use password handling from JS-Controller framework

### 0.3.1 (2021-07-15)
* (HGlab01) Works with Node 12.x or higher (simple-oauth2 update dependency)
* (HGlab01) Bump simple-oauth2 from 2.5.2 to 4.2.0
* (HGlab01) Prepare for first stable version

### 0.3.0 (2021-06-26)
* (HGlab01) Technical re-factoring of state management !BREAKING CHANGES! (see above)
* (HGlab01) implement offset functionality
* (HGlab01) Set minimum refresh time to 30 seconds
* (HGlab01) Bump iobroker-jsonexplorer to v0.1.0

### 0.2.7 (2021-05-11)
* (HGlab01) prepare for js-controller v3.3.x (has wrong type "xxxx" but has to be "yyyy") (#214)
* (HGlab01) improve state creation by using iobroker-jsonexplorer
* (HGlab01) improve CPU usage (#192)
* (HGlab01) add attribute enabledFeatures (#226)

### 0.2.6 (2021-03-20)
* (HGlab01) apply formatting for main.js
* (HGlab01) add quickActionsEnabled (#164)
* (HGlab01) support HOT_WATER devices (#138)
* (HGlab01) support AIR_CONDITIONING devices (#146)
* (HGlab01) Implement pool handling for setZoneOverlay
* (HGlab01) fix issue: state has no existing object (#184)
* (HGlab01) add cleaning function for existing timer 'polling'
* (HGlab01) state_attr.js: attribute 'support' was defined twice

### 0.2.5 (2020-12-16)
* (HGlab01) add childLockEnabled

### 0.2.4 (2020-11-19)
* (HGlab01) Improve overlay modes + solve merge issue of version 0.2.3

### 0.2.3 (2020-11-18)
* (HGlab01) add overlay methods 'timer'
* (HGlab01) deal with JSON object overlay or openWindow is null
* (HGlab01) Bugfix : Cannot read property 'percentage' of undefined

### 0.2.2 (2020-11-02)
* (HGlab01) add typeSkillBasedApp
* (HGlab01) add autoAssistFreeTrialEnabled
* (HGlab01) Add support for autoAssistFreeTrialEnabled
* (HGlab01) Overlay methods 'manual' and 'next time block'

### 0.2.1 (2020-10-22)
* (DutchmanNL) Update dependency's
* (DutchmanNL) Update testing, remove node 8 and add node 14
* (DutchmanNL) Implement automated deployment with githubActions
* (HGlab01) Support incident Detection
* (LutzHelling) Bugfix : Add orientation
* (LutzHelling) Bugfix : legacyHeatingInstallationsEnabled
* (HGlab01) Bugfix : Add legacyHeatingInstallationsEnabled to DoHome
* (HGlab01) Bugfix : Fix unhandled information found in DoReadDevices

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda@hotmail.com> & HGlab01

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