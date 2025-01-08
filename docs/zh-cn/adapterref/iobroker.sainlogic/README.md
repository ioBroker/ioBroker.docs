---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: e4+rrm8uaFo9jxAnnikRymtzrB1vJicFveWkpv7f5Zo=
---
![标识](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![安装数量（最新）](http://iobroker.live/badges/sainlogic-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/sainlogic-stable.svg)
![依赖状态](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![已知漏洞](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![新平台](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic ioBroker 适配器
从基于 sainlogic 的气象站读取数据

## 支持的设备
基本上任何与 sainlogic 硬件配合使用的设备，固件通常报告为“EasyWeather Vx.x.x)”。

已知工作设备：

1.ELV WS980Wifi
1. Eurochron EFWS2900（仅限监听模式）
1.Froggit WH400SE
1. Froggit DP1500（仅限 Ecowitt 协议）
1.Sainlogic WS3500（仅限监听器模式）
1.WH51湿度传感器
1.Ecowitt GW1000
1. Froggit WH3000SE（仅限监听模式）

＃＃ 用法
该适配器支持两种模式来显示气象站的数据。

在侦听器模式下，适配器支持从您的气象站提供的附加传感器。当前支持温度和湿度。如果您有其他附加传感器，请提出 github 问题并发布您的数据字符串，因为这有助于我扩展功能。

### 监听器模式：
使用最新固件版本，气象站支持将数据发送到自定义服务器。适配器将充当这样的服务器。设置需要两个步骤：

#### 配置气象站
使用移动设备上的“WS View”应用程序配置气象站。配置以下设置以进行自定义服务器设置：

- 服务器：您的 IOBroker 服务器的 IP/主机名
- 路径：任意，只要记住它用于适配器配置即可

*注意：*在某些站点，在路径末尾添加问号已被证明是有效的。有些站点没有问号也可以。最好两种方法都试一下。

- 端口：1024 至 65000 之间的任意数字（默认为 45000），在您的 IOBroker 系统上必须是唯一的且免费的
- 站点ID：未使用

*注：*有些站点仍然需要设置任何值

- 站台键：未使用

*注：*有些站点仍然需要设置任何值

- 协议类型：WeatherUnderground
- 上传间隔：气象站支持的任何间隔

配置监听器
在实例配置中选择“监听器”选项卡并设置以下内容：

- 活动：真
- IP：选择气象站能够连接的 IOBroker 的 IP（默认为 0.0.0.0，允许所有 IP），这主要适用于您有多个网络的情况，否则将使用默认设置
- 端口：输入与 WS View 应用程序中相同的端口
- 路径：输入与 WS View 应用程序中相同的路径
- 转发 URL：如果您想要将收到的数据转发给另一个消费者，您可以指定一个附加地址。例如，您可能收到 WU 格式的数据，但仍想将其转发给 WeatherUnderground。

*注意*：转发 URL 需要以尾随问号 (?) 结尾。示例：https://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?

保存。
侦听器将启动并等待传入连接。根据您的间隔，您应该在日志中看到一条消息“侦听器收到更新：...”以及数据。

### 调度程序模式：
如果您的气象站支持提取数据，您可以配置调度程序来执行此操作。使用的协议基于[WS980 文档](https://github.com/RrPt/WS980)。

配置调度程序
在实例配置中选择“调度程序”选项卡并设置以下内容：

- 活动：真
- IP：选择您的气象站的 IP，您应该确保 IP 是固定的并且不会改变
- 端口：输入要连接的端口（默认为 45000）
- 间隔：输入间隔（以秒为单位）（我建议至少 10 秒，以免系统或网络过载）

节省。

调度程序将在第一个间隔时间后启动并连接到气象站。您应该在日志中看到类似“调度程序正在提取新数据”的消息。如果您将日志模式设置为调试，您还将看到收到的数据字符串。

## 车站具体信息
### Froggit DP1500
当选择 WeatherUnderground 作为协议时，该站似乎不发送任何数据。它与 Ecowitt 配合正常。

### Eurochron EFWS290
站点不响应调度程序命令，因此仅支持监听模式。

### Sainlogic WS3500
站点不响应调度程序命令，因此仅支持监听模式。

## 致谢
感谢：lemuba、StrathCole、Glasfaser、Latzi：感谢他们坚持不懈地测试我的错误 :) Lisa 感谢她的[用于翻译航向中风度的代码](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

Latest version

#### 0.11.5 ECOWITT forwarding fixed

#### 0.11.4 Fix yearlyrain max value and mapping for CO2 sensors

#### 0.10.5 Bugfix for state initialization, removed log messages for forwarding

#### 0.10.4 Bugfix for lightning count, new battery states for additional sensors

#### 0.10.3 Bugfixes

#### 0.10.2 Bugfixes

#### 0.10.0 Added new sensors for Lightning, Piezo elements, DP250 and minor fixes

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

Copyright (c) 2024 Fogg <foggch@gmail.com>

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