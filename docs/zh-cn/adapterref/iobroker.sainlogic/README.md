---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: u/ldqTcFTj1tVqfjoiD1RjkyUuNKLfkXlqH2T+r3bGs=
---
![标识](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![安装数量（最新）](http://iobroker.live/badges/sainlogic-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sainlogic-stable.svg)
![依赖状态](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![已知漏洞](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![新PM](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## IoBroker 的 sainlogic 适配器
从基于 sainlogic 的气象站读取数据

## 支持的设备
基本上任何使用 sainlogic 硬件的设备，固件通常报告为“EasyWeather Vx.x.x)”。

已知的工作设备：

1. ELV WS980Wifi
1. Eurochron EFWS2900（仅限监听模式）
1、蛙吉特WH400SE
1. Froggit DP1500（仅限Ecowitt协议）
1. Sainlogic WS3500（仅限监听模式）
1. WH51湿度传感器
1. Ecowitt GW1000
1. Froggit WH3000SE（仅限监听模式）

＃＃ 用法
该适配器支持两种显示气象站数据的模式。

在侦听器模式下，如果从您的气象站交付，适配器确实支持额外的传感器。目前支持的是温度和湿度。如果您还有其他传感器，请提出 github 问题并发布您的数据字符串，因为这有助于我扩展功能。

### 监听器模式：
使用最新的固件版本，气象站支持将数据发送到自定义服务器。适配器将充当这样的服务器。设置需要两个步骤：

#### 配置气象站
使用移动设备上的“WS View”应用程序来配置气象站。为自定义服务器设置配置以下设置：

- 服务器：您的 IOBroker 服务器的 IP/主机名
- 路径：任何东西，只要记住它的适配器配置

*注意：* 在某些站点上，在路径末尾添加问号已被证明是成功的。有些人在没有它的情况下工作。最好两个都试试。

- 端口：1024 到 65000 之间的任何数字（默认为 45000），需要在您的 IOBroker 系统上是唯一且免费的
- 站号：未使用

*注意：* 一些站仍然需要设置任何值

- 站键：未使用

*注意：* 一些站仍然需要设置任何值

- 协议类型：WeatherUnderground
- 上传间隔：您的气象站支持的任何内容

#### 配置监听器
在实例配置中，选择“Listener”选项卡并设置以下内容：

- 主动：真
- IP：选择气象站能够连接到的 IOBroker 的 IP（默认为 0.0.0.0 以允许所有 IP），这主要与您有多个网络有关，否则默认即可
- 端口：输入与 WS View 应用程序中相同的端口
- 路径：输入与 WS View 应用程序中相同的路径
- 转发 URL：如果您想将接收到的数据转发给另一个消费者，您可以指定一个附加地址。例如。您可能会收到 WU 格式的数据，但仍希望将其转发到 WeatherUnderground。

节省。
侦听器将启动并等待传入连接。根据您的时间间隔，您应该在日志中看到一条带有数据的消息“Listener received update: ...”。

### 调度模式：
如果您的气象站支持提取数据，您可以配置调度程序来执行此操作。使用的协议基于[WS980 文档](https://github.com/RrPt/WS980)。

#### 配置调度器
在实例配置中选择“调度程序”选项卡并设置以下内容：

- 主动：真
- IP：选择你的气象站的IP，你应该确保IP是固定的，不会改变
- 端口：输入要连接的端口（默认为 45000）
- 间隔：以秒为单位输入间隔（我建议至少 10 秒以免系统或网络过载）

节省。

调度程序将在第一个间隔时间后启动并连接到气象站。您应该会在日志中看到类似“调度程序拉取新数据”的消息。如果您将日志模式设置为调试，您还将看到收到的数据字符串。

## 车站特定信息
###蛙吉特DP1500
It seems this station does not send any data when WeatherUnderground is selected as protocol.它与 Ecowitt 一起正常工作。

### Eurochron EFWS290
Station 不响应调度程序命令，因此仅支持侦听器模式。

### 赛恩逻辑 WS3500
Station 不响应调度程序命令，因此仅支持侦听器模式。

## 学分
致谢：lemuba、StrathCole、Glasfaser、Latzi：对我的错误的不懈测试 :) Lisa 为她的 [在标题中转换风度的代码](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.8.2 Updated UVRaw to maxvalue 4000

#### 0.8.1 Bugfix for timestamp and listener

#### 0.8.0 Added time stamps for daily min and max values

#### 0.7.3 Dependency updates and Travis testing updates

#### 0.7.2 Dependency updates for security vulnerabilities 

#### 0.7.1 Fix Soilbatt mapping

#### 0.7.0 Support for Soil Moisture devices like attached to DP1500

#### 0.6.6 Adressed github issue #53 - warning on non existing object

#### 0.6.5 Removed unneeded events

#### 0.6.4 For WH2650: Adding model name and weather station communication frequency datapoint

#### 0.6.3 Fixed outdoor humidity

#### 0.6.2 Added additional sensor support


For detailed change log or previous versions check io-package.json

## License
MIT License

Copyright (c) 2022 Fogg <foggch@gmail.com>

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