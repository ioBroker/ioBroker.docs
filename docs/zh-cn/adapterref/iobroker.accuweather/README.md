---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.accuweather/README.md
title: ioBroker.accuweather
hash: On/fFF4r+ZCWa0rqet1IurukKyyXPW/+FChGXPNRW7k=
---
![商标](../../../en/adapterref/iobroker.accuweather/admin/accuweather.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.accuweather.svg)
![下载](https://img.shields.io/npm/dm/iobroker.accuweather.svg)
![依赖状态](https://img.shields.io/david/algar42/iobroker.accuweather.svg)
![已知漏洞](https://snyk.io/test/github/algar42/ioBroker.accuweather/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.accuweather.png?downloads=true)
![特拉维斯CI](http://img.shields.io/travis/algar42/ioBroker.accuweather/master.svg)

# IoBroker.accuweather
## IoBroker 的 accuweather 适配器
使用 AccuWeather API 进行天气预报。

适配器接收当前状况（每小时更新一次）、5 天每日预报（每天大约上午 7 点更新一次）和 12 小时预报（每 6 小时在上午 12 点、上午 6 点、下午 12 点和下午 6 点更新）。

＃＃ 入门
### 获取 API 密钥
要获取 API 密钥，请在 https://developer.accuweather.com/ 上注册并在“我的应用程序”菜单中创建应用程序。创建应用程序后，您将生成 API 密钥。
对于免费使用，每天可以向 API 发出 50 个请求。
有人指出，要使 API 工作，首选以下设置（请选择您所在的国家/地区！）：![设置](../../../en/adapterref/iobroker.accuweather/admin/image.png)

### 获取位置键
要获取位置密钥，请访问 https://www.accuweather.com/ 并输入您的城市名称，或尝试输入您拥有的坐标（纬度、经度），例如在 ioBroker 设置中。
您的位置键将是预测 URL 末尾的数字。

### 在 Lovelace 可视化中使用（从 1.1.0 版开始）
摘要频道包含当前和按天的预测，以及类型检测器支持的角色/状态类型。
新功能可用于在 Lovelace UI 中显示天气预报。
为了更好地查看创建的自定义 lovelace 卡 - 请参阅 https://github.com/algar42/IoB.lovelace.accuweather-card

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行中** -->
＃＃＃ **工作正在进行中** *

## Changelog
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

Copyright (c) 2021 algar42 <igor.aleschenkov@gmail.com>

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