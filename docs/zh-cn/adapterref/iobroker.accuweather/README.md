---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: TadMzyLupLTq8YRjYAiMbsBteDVD8BaYJr2j8x5OzSo=
---
![标识](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![安装数量](http://iobroker.live/badges/accuweather-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![新平台](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)

# IoBroker.accuweather
## IoBroker 的 accuweather 适配器
使用 AccuWeather API 进行天气预报。

适配器接收

- 当前状况（每小时更新一次），（24 个请求）
- 5 天每日预报（每天大约早上 7 点和晚上 8 点更新），（2 个请求）
- 以及 12 小时预报（每六小时更新一次，分别为凌晨 12 点、早上 6 点、中午 12 点和下午 6 点）。（4 个请求）

默认情况下，适配器仅在重新启动时更新过时的数据。
每天允许 50 次请求，每次重新启动都需要 3 次请求来更新所有数据。

＃＃ 入门
### 获取 API 密钥
要获取 API 密钥，请在 https://developer.accuweather.com/ 上注册并在 `My Apps` 菜单中创建应用程序。
创建应用程序后，您将获得一个 API 密钥。
免费使用时，每天可以向 API 发出 50 个请求。
请注意，要使 API 正常工作，最好使用以下设置（请选择您的国家/地区！）：![设置](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### 获取位置密钥
为了获取位置密钥，请访问 https://www.accuweather.com/ 并输入您的城市名称，或尝试输入您拥有的坐标（纬度、经度），例如在 ioBroker 设置中。
您的位置密钥将是预报 URL 末尾的数字。

### 在 Lovelace 可视化中使用（从 1.1.0 版本开始）
摘要频道包含当前和每日预报，以及类型检测器支持的角色/状态类型。
新功能可用于在 Lovelace UI 中显示天气预报。
为了更好地查看，创建了一个自定义 lovelace 卡 - 请参阅 https://github.com/algar42/IoB.lovelace.accuweather-card

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
* (ticaki) Missing Http error handling added
* (ticaki) For error codes from the 400 series, do not attempt any unscheduled reconnections. 

### 2.1.0-alpha.0 (2025-01-19)
* (ticaki) Change: min. js-controller to 6.0.11
* (ticaki) Change: Outdated data is updated at startup.
* (ticaki) New: Photo link added in current weather
* (ticaki) New: Metric and Imperial are available for selection - Will be taken into account with the next data update.
* (ticaki) New: In the event of a data retrieval error, an attempt is made again after 10 minute
* (ticaki) Remove admin option (restart blocking)
* (ticaki) Rewritten in Typescript

### 2.0.1 (2025-01-18)
* (ticaki) BREAKING: Requires Nodejs 20 or higher
* (ticaki) BREAKING: Command states are now buttons and only respond to ack=false. 
* (ticaki) admin option: No data is updated on adapter startup (default: true). 
* (ticaki) apikey renamed and encrypted
* (ticaki) Dependencies and eslint updated
* (devtronic) Add nextHour.CloudCover

### 1.5.0 (2024-06-23)
* (xdaamg) limit updates to once an hour, this fixes part of issue #273.
* (mcm1957) Adapter requires js-controller >= 5 and admin >= 6 now
* (mcm1957) Node 22 support has been added to testing
* (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-02)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.2 (2023-12-04)
* (ticaki) fixed: dependencies
* (ticaki) fixed: error message [object Object]

### 1.3.1 (2023-08-15)
* (isi07) added the Wind Direction Text und Cloud Cover
* (bluefox) Added json config

### 1.2.4 (2022-02-08)
* (algar42) Depency updates

### 1.2.3 (2021-12-29)
* (algar42) HoursOfSun Parameter added to the Daily forecast

### 1.2.1 (2021-07-22)
* (bluefox) Updated logo

### 1.2.0 (2021-07-03)
* (Garfonso) adjust roles to properly detect weather forecast in Summary folder. (Summary objects need to be deleted and adapter restarted after that)

### 1.1.7 (2021-06-24)
* (bluefox) Create device for device-detector

### v1.1.6 (2021-05-05)
Minor bug fixes to `Object.common` section

### 1.1.5 (2021-01-25)
* (algar42) Resolve log Warning for js-controller 3.2

### 1.1.4
* (HGlab01) small bugfix regarding setTimeout range

### 1.1.3 (2020-03-04)
* (algar42) Minor updates for compact mode

### 1.1.0 (2019-11-09)
* (algar42) Summary channel added to support type-detector and automatic weather device creation

### 1.0.2 (2019-09-12)
* (algar42) Production Release

## License
MIT License

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2021-2023 algar42 <igor.aleschenkov@gmail.com>

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