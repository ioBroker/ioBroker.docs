---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.sainlogic/README.md
title: ioBroker.sainlogic
hash: ui5LKeSUWb8382OPMMp/VDeTS/H8fFlzezR8V3MHz0s=
---
![标识](../../../en/adapterref/iobroker.sainlogic/admin/sainlogic.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.sainlogic.svg)
![下载](https://img.shields.io/npm/dm/iobroker.sainlogic.svg)
![安装数量（最新）](http://iobroker.live/badges/sainlogic-installed.svg)
![安装数量（稳定版）](http://iobroker.live/badges/sainlogic-stable.svg)
![依赖状态](https://img.shields.io/david/phifogg/iobroker.sainlogic.svg)
![已知漏洞](https://snyk.io/test/github/phifogg/ioBroker.sainlogic/badge.svg)
![NPM](https://nodei.co/npm/iobroker.sainlogic.png?downloads=true)

# IoBroker.sainlogic
## Sainlogic ioBroker 适配器
读取来自基于 Sainlogic 的气象站的数据

## 支持的设备
基本上任何使用 sainlogic 硬件的设备，其固件通常会显示为“EasyWeather Vx.x.x)”。

已知可用的设备：

1. ELV WS980Wifi
1. Eurochron EFWS2900（仅限监听模式）
1. Froggit WH400SE
1. Froggit DP1500（仅限 Ecowitt 协议）
1. Sainlogic WS3500（仅限监听模式）
1. WH51 湿度传感器
1. Ecowitt GW1000
1. Froggit WH3000SE（仅限监听模式）

＃＃ 用法
该适配器支持两种模式来显示您的气象站数据。

在监听模式下，适配器支持从气象站获取的其他传感器数据。目前支持温度和湿度。如果您有其他传感器数据，请在 GitHub 上提交 issue 并附上您的数据字符串，这有助于我扩展其功能。

### 监听模式：
最新固件版本支持将数据发送到自定义服务器。适配器将充当该服务器。设置过程需要两个步骤：

#### 配置气象站
使用移动设备上的“WS View”应用程序配置气象站。配置以下设置以进行自定义服务器设置：

- 服务器：您的 IOBroker 服务器的 IP 地址/主机名
- 路径：任意路径，只需记住它以便进行适配器配置即可

注：在某些站点，在路径末尾添加问号已被证明有效。而有些站点则无需添加问号。最好两种方法都尝试一下。

- 端口：1024 到 65000 之间的任意数字（默认值为 45000），必须在您的 IOBroker 系统中唯一且空闲。
- 站点 ID：未使用

注意：某些站点仍然需要设置一些值。

- 车站钥匙：未使用

注意：某些站点仍然需要设置一些值。

- 协议类型：WeatherUnderground
- 上传间隔：取决于您的气象站支持的任何设置

#### 配置监听器
在实例配置中，选择“监听器”选项卡，并进行以下设置：

- 已激活：是
- IP：选择您的 IOBroker 的 IP 地址，气象站将连接到该地址（默认值为 0.0.0.0，允许所有 IP 地址连接）。如果您有多个网络，则此设置尤为重要；否则，默认值即可。
- 端口：输入与 WS View 应用程序中相同的端口
- 路径：输入与 WS View 应用程序中相同的路径
- 转发 URL：如果您想将接收到的数据转发给其他用户，可以指定一个额外的地址。例如，您可能收到 WU 格式的数据，但仍希望将其转发给 WeatherUnderground。

注意：转发 URL 必须以问号 (?) 结尾。例如：https://weatherstation.wunderground.com/weatherstation/updateweatherstation.php?

保存。

监听器将启动并等待传入的连接。根据您设置的间隔，您应该会在日志中看到一条消息“监听器已收到更新：...”，其中包含数据。

### 调度器模式：
如果您的气象站支持数据拉取，您可以配置调度程序来实现这一点。所使用的协议基于[WS980 文档](https://github.com/RrPt/WS980)。

#### 配置调度器
在实例配置中，选择“调度程序”选项卡，并进行以下设置：

- 已激活：是
- IP地址：选择气象站的IP地址，请确保该IP地址固定不变。
- 端口：输入要连接的端口（默认值为 45000）
- 间隔：输入以秒为单位的间隔（建议至少 10 秒，以免系统或网络过载）

节省。

调度程序将在第一个时间间隔后启动并连接到气象站。您应该会在日志中看到类似“调度程序正在拉取新数据”的消息。如果您将日志模式设置为调试模式，您还可以看到接收到的数据字符串。

## 站点特定信息
### Froggit DP1500
当选择 WeatherUnderground 作为协议时，该站点似乎不发送任何数据。但它在使用 Ecowitt 时工作正常。

### Eurochron EFWS290
该站点不响应调度程序命令，因此仅支持监听模式。

### Sainlogic WS3500
该站点不响应调度程序命令，因此仅支持监听模式。

## 鸣谢
感谢 lemuba、StrathCole、Glasfaser 和 Latzi 对我的 bug 进行的不懈测试 :) 以及 Lisa 的 [用于将风向角度转换为方位角的代码](https://www.programmieraufgaben.ch/aufgabe/windrichtung-bestimmen/ibbn2e7d)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.1.1 (2025-12-29)

Changed max values for distance sensore (#262)

### 1.1.0 (2025-12-24)

Added deploy job for release script
Changed to Admin UI to jsonConfig

### 1.0.17 (2025-12-23)

Updates for releasescript changelog logic

### 1.0.16

Typo in io-package.json

## License

MIT License

Copyright (c) 2025 Fogg <foggch@gmail.com>

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