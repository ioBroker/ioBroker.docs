---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ping/README.md
title: PING 适配器
hash: +5lYN9qiDWSBQAH4sB07H5AywY1QfrPZQ7Td3Xynt1I=
---
![商标](../../../en/adapterref/iobroker.ping/admin/ping.png)

![安装数量](http://iobroker.live/badges/ping-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.ping.svg)
![下载](https://img.shields.io/npm/dm/iobroker.ping.svg)

# PING 适配器
![测试和发布](https://github.com/ioBroker/ioBroker.ping/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/ping/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## Ping 配置的 IP 地址。
在定义的时间间隔内 Ping 指定的 IP 地址并监控结果。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

＃＃ 已知的问题
* 如果无法 ping 你的 linux 客户端，请检查客户端上是否正确安装了 `iputils-ping`

## Changelog

### 1.5.0 (2021-07-14)
* js-controller 2.0 required at least
* (Apollon77) optimize for js-controller 3.3

### 1.4.12 (2020-09-18)
* (Apollon77) Prevent crash case when no devices are defined (Sentry IOBROKER-PING-R)

### 1.4.11 (2020-08-26)
* (Apollon77) update js-controller dependency to correct version (1.5.8)

### 1.4.8 (2020-06-29)
* (Apollon77) Prevent adapter crashes with invalid state/channel names, see error log! (Sentry IOBROKER-PING-H, IOBROKER-PING-P, IOBROKER-PING-B)

### 1.4.7 (2020-05-02)
* (Apollon77) finally try to catch spawn errors (Sentry IOBROKER-PING-2)

### 1.4.6 (2020-04-29)
* (Apollon77) Make sure adapter do not crash if ping command can not be executed (Sentry)
* (Apollon77) Catch error when ping.probe could not be started (Sentry IOBROKER-PING-2)

### 1.4.5 (2020-04-23)
* (Apollon77) Fixed potential crash case (Sentry)

### 1.4.4 (2020-04-17)
* (bluefox) Added support of Admin3 

### 1.4.3 (2020-04-17)
* (Apollon77) Add Sentry for js-controller 3.0
* (Apollon77) update dependencies

### 1.4.2 (2020-01-23)
* (JayVee2) Sort the IP addresses

### 1.4.1 (2019-01-08)
* (simatec) support compact mode

### 1.4.0 (2018-01-25)
* (vdemidov) refactored, added ping time and roundtrips per second for every host

### 1.3.2 (2017-09-20)
* (ldittmar) object values are converted to the valid type

### 1.3.0 (2017-02-21)
* (bluefox) allow to remove host name from state's name

### 1.2.0 (2016-12-09)
* (bluefox) change configuration dialog

### 1.1.3 (2016-11-16)
* (bluefox) catch error if no IP defined

### 1.1.1 (2016-04-10)
* (bluefox) remove ms

### 1.1.0 (2016-04-10)
* (bluefox) rewrite ping for windows

### 1.0.0 (2016-04-03)
* (bluefox) support of freebsd and all windows languages
* (bluefox) add tests

### 0.1.3 (2015-01-26)
* (bluefox) fix error if configuration changed

### 0.1.2 (2015-01-14)
* (bluefox) fix configuration page

### 0.1.1 (2015-01-03)
* (bluefox) enable npm install

### 0.1.0 (2014-11-26)
* (bluefox) use ping npm module instead of static one

### 0.0.5 (2014-11-21)
* (bluefox) make possible to have shorter ping intervals (down to 5 seconds)

### 0.0.4 (2014-11-07)
* (bluefox) fix ping node

### 0.0.3 (2014-11-03)
* (bluefox) fix ping node (do not forget to remove package from git when the npm get the update)

### 0.0.1 (2014-11-02)
* (bluefox) support of server (actual no authentication)

## License

The MIT License (MIT)

Copyright (c) 2014-2020, bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.