---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.net-tools/README.md
title: 网络工具
hash: bxjSmJf72AXeKIg4SIx7hCk4hhVjPTSRo5U6FBK2BLE=
---
![商标](../../../en/adapterref/iobroker.net-tools/admin/net-tools.png)

![安装数量](http://iobroker.live/badges/net-tools-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.net-tools.svg)
![下载](https://img.shields.io/npm/dm/iobroker.net-tools.svg)
![测试](https://travis-ci.org/jey-cee/ioBroker.net-tools.svg?branch=master)
![新产品管理](https://nodei.co/npm/iobroker.net-tools.png?downloads=true)

# 网络工具
| [赞助商](https://github.com/iobroker-community-adapters/ioBroker.net-tools/blob/master/SPONSORS.md) | |
|---|---|
| [![捐赠](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=95YZN2LR59Q64&source=url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> |
| [![捐赠](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.wled/master/admin/button.png)](https://www.paypal.com/cgi-bin/ webscr?cmd=_s-xclick&amp;hosted_button_id=95YZN2LR59Q64&amp;source=url) | <a href="https://discord.gg/33w6jUh"><img src="https://discordapp.com/api/guilds/743167951875604501/widget.png?style=banner2"></a> |

### 发现网络上的设备
将发现对象设置为 true 以发现网络上的设备，此过程需要一段时间。
此功能由发现适配器提供，这意味着如果没有安装，则发现将被安装并且必须运行。

备注：此功能仅限于 ioBroker 主机的子网。

### Ping 配置的 IP 地址
在定义的时间间隔内 Ping 指定的 IP 地址并监控结果。 （活着，rps，时间）

### 局域网唤醒
将 wol 对象设置为 true，然后将 3 个 WOL 包以 750 毫秒的暂停时间发送到您的设备。

###端口扫描
将 scan 设置为 true，这将扫描 0-65535 范围内的所有开放端口。这个过程需要一段时间。
结果将写入对象端口。

---

## 对于开发人员
####获取特定设备的mac
`sendToAsync('net-tools.X, 'getMac', 'IP ADDRESS')`

备注：此功能仅限于 ioBroker 主机的子网。

#### Ping 特定 IP 地址
`sendToAsync('net-tools.X, 'ping', 'IP ADDRESS')`

#### 局域网唤醒
`sendToAsync('net-tools.x', 'wake', 'MAC ADDRESS')`

---

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

## Changelog

### 0.1.5
* changes on testing

### 0.1.4
* fixes for js-controller 3.3

### 0.1.3
* fixes for js-controller 3.3

### 0.1.2
* added device discovery to configuration page
* start discovery if it is not started and stop it afterwards


### 0.1.1 
* initial release

## License

The MIT License (MIT)

Copyright (c) 2020-2021, Jey Cee <jey-cee@live.com>

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