---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.twinkly/README.md
title: ioBroker.twinkly
hash: g+uZEvhJdPzbmG2b4LIhXUgwTew2pTN7Ldc+JQm3rc8=
---
![标识](../../../en/adapterref/iobroker.twinkly/admin/twinkly.png)

![安装数量（最新）](http://iobroker.live/badges/twinkly-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/twinkly-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.twinkly.svg)
![下载](https://img.shields.io/npm/dm/iobroker.twinkly.svg)
![依赖状态](https://img.shields.io/david/patrickbs96/iobroker.twinkly.svg)
![已知漏洞](https://snyk.io/test/github/patrickbs96/ioBroker.twinkly/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.twinkly.png?downloads=true)
![应用程序](https://ci.appveyor.com/api/projects/status/github/patrickbs96/ioBroker.twinkly?branch=master&svg=true)

#ioBroker.twinkly
**测试：** Linux/Mac：[![Travis-CI](https://travis-ci.com/patrickbs96/ioBroker.twinkly.svg)](https://travis-ci.com/github/patrickbs96/ioBroker.twinkly)

##用于ioBroker的twinkly适配器
与 [闪烁的灯光](https://www.twinkly.com/) 通信的适配器。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

##设置
以下设置可用：![管理.png](../../../en/adapterref/iobroker.twinkly/img/admin.png)

在表格中，您可以添加所有要控制的 Twinkly 灯。

|专栏 |说明 |
|--------------|------------------------------------|
| `Enabled` |是否可以访问此连接？ |
| `IP Address` |闪烁灯的 IP 地址 |
| `IP 地址` |闪烁灯的 IP 地址 |

选中时，将为每个设备创建以下附加状态：

* 设备信息
* 网络状态
* MQTT

以下状态可用：

|状态 |可写 |说明 |
|-------------------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `activePlaylistMovie` | :x: |活动播放列表电影（模式 `Playlist`）|
| `bri` | :heavy_check_mark: |亮度（通过设置 -1 停用控制）|
| `color` | :heavy_check_mark: | HSV/RGB(宽)/HEX |
| `connected` | :x: |设备已连接 |
| `effect` | :heavy_check_mark: |效果（模式`Effect`）|
| `firmware` | :x: |固件 |
| `mode` | :heavy_check_mark: |模式：开、播放列表、颜色、关、实时（尚不支持）、演示、效果 |
| `movie` | :heavy_check_mark: |活动电影，如果在播放列表功能中添加了多个电影，则可以在此处选择它们。 （模式`On`）|
| `mqtt` | :heavy_check_mark: | MQTT-连接|
| `name` | :heavy_check_mark: |姓名 |
| `network` | :x: |网络信息|
| `on` | :heavy_check_mark: |开/关开关 |
| `paused` | :heavy_check_mark: |暂停与 Twinkly 的连接，以便您可以在应用程序中进行更改。否则，您可能会在应用程序中工作时断开连接 |
| `reloadMovies` | :heavy_check_mark: |重新加载可用电影 |
| `sat` | :heavy_check_mark: |饱和度 0-100（通过设置 -1 停用控制）|
| `timer` | :heavy_check_mark: |更新计时器 |
| `定时器` | :heavy_check_mark: |更新计时器 |

[私有 API 信息](https://xled-docs.readthedocs.io/en/latest/) 由 [Pavol Babinčák]](https://github.com/scrool)

## Changelog

### 0.2.4 (2021-12-03)
* (patrickbs96) Handle wrong input so it does not cause exceptions
* (patrickbs96) Add Feature to change Effect

### 0.2.2 (2021-11-30)
* (patrickbs96) Add Feature to change Color

### 0.2.0 (2021-11-28)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-J, IOBROKER-TWINKLY-K, IOBROKER-TWINKLY-M, IOBROKER-TWINKLY-N, IOBROKER-TWINKLY-P)
* (patrickbs96) Add Pause-Feature, to work with app. (Twinkly only allows one active connection...)
* (patrickbs96) Add Feature, activate uploaded Movies (Playlist) 

### 0.1.15 (2021-10-26)
* (patrickbs96) Add new Value `network.accesspoint.password_changed` from API-Response (Sentry IOBROKER-TWINKLY-A)

### 0.1.14 (2021-10-23)
* (patrickbs96) Add new Value `network.station.status` from API-Response (Sentry IOBROKER-TWINKLY-A, IOBROKER-TWINKLY-B)
* (patrickbs96) Add new Value `network.details.product_version` from API-Response (Sentry IOBROKER-TWINKLY-E)
* (patrickbs96) Add new Value `network.details.rssi` from API-Response (Sentry IOBROKER-TWINKLY-D)
* (patrickbs96) Add new Value `color` from API-Response (Sentry IOBROKER-TWINKLY-7)

### 0.1.13 (2021-10-13)
* (patrickbs96) Add new Value `network.station.rssi` from API-Response (Sentry IOBROKER-TWINKLY-8)

### 0.1.12 (2021-09-13)
* (patrickbs96) Added new Values from Response (Sentry IOBROKER-TWINKLY-7)
* (patrickbs96) Prevent excessive Sentry Logging 

### 0.1.10 (2021-09-04)
* (patrickbs96) Update API values to Firmware 2.7.1

### 0.1.8 (2021-02-06)
* (patrickbs96) Changes from the Review

### 0.1.6
* (patrickbs96) Update dependencies

### 0.1.5
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

### 0.1.4
* (patrickbs96) Temporary removing Reset as API path not exists

### 0.1.1
* (patrickbs96) Prevent Crash Case at HTTP Error (Sentry IOBROKER-TWINKLY-3)

## License
MIT License

Copyright (c) 2021 patrickbs96 <patrickbsimon96@gmail.com>

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