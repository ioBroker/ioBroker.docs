---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: SF6aKcWh7HrOOkgwFNHsAiMLssKtNtmSouPRzRKiiPw=
---
![标识](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![安装数量](http://iobroker.live/badges/accuweather-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![国家公共管理](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)

# IoBroker.accuweather
## IoBroker 的 Accuweather 适配器
使用 AccuWeather API 进行天气预报。

适配器接收当前状况（每小时更新一次）、5 天每日预报（每天上午 7 点左右更新一次）和 12 小时预报（每六小时更新一次，时间为上午 12 点、上午 6 点、中午 12 点和下午 6 点）。

＃＃ 入门
### 获取 API 密钥
要获取 API 密钥，请在 https://developer.accuweather.com/ 上注册并在 `My Apps` 菜单中创建应用程序。
创建应用程序后，您将生成一个 API 密钥。
免费使用时，每天可以向 API 发出 50 个请求。
请注意，要使 API 正常工作，首选以下设置（请选择您所在的国家/地区！）：![设置](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### 获取位置密钥
为了获取位置密钥，请访问 https://www.accuweather.com/ 并输入您的城市名称，或者尝试输入您拥有的坐标（纬度、经度），例如在 ioBroker 设置中。
您的位置键将是预测 URL 末尾的数字。

### 在 Lovelace 可视化中使用（从 1.1.0 版本开始）
摘要通道包含当前和每日预测，以及类型检测器支持的角色/状态类型。
新功能可用于在 Lovelace UI 中显示天气预报。
为了更好地查看，创建了自定义lovelace卡 - 请参阅https://github.com/algar42/IoB.lovelace.accuweather-card

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
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