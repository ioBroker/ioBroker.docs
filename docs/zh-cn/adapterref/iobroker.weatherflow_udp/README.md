---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: QCPPsp5PMI7rB5nvJLnERX/8HOpbjGMKGO2+2y9ruaw=
---
![标识](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.weatherflow_udp?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.weatherflow_udp?label=npm%20downloads&style=flat-square)
![节点-lts](https://img.shields.io/node/v-lts/iobroker.weatherflow_udp?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.weatherflow_udp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/woessmich/iobroker.weatherflow_udp?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub提交活动](https://img.shields.io/github/commit-activity/m/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub 最新提交](https://img.shields.io/github/last-commit/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![已知漏洞](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![GitHub 工作流状态](https://img.shields.io/github/actions/workflow/status/woessmich/iobroker.weatherflow_udp/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Beta](https://img.shields.io/npm/v/iobroker.weatherflow_udp.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![已安装](http://iobroker.live/badges/weatherflow_udp-installed.svg)

# Weatherflow UDP
## 版本
## IoBroker 的 weatherflow_udp 适配器
Weatherflow UDP接收器适配器，用于接收和解析[来自 [Weatherflow](www.weatherflow.com) 等智能气象站（例如 [Weatherflow Tempest](www.weatherflow.com)）的 UDP 消息](https://weatherflow.github.io/Tempest/api/udp/v171/)](https://weatherflow.com/tempest-weather-system/)。

该适配器应该也能解析旧版气象站，例如“Air”和“Sky”（但未经测试）。

新增2026硬件支持（包含一些未记录的消息字段）。

适配器默认监听端口为50222，但可在设置中更改。

＃＃ 设置
该适配器提供了一组最基本的设置选项。

监听端口可以更改，但据我所知，由于气象站集线器发送的端口无法更改，因此应该不需要更改监听端口。

气象站海拔高度（以米为单位）用于计算由气象站提供的当地气压对应的折减气压。只需使用与应用程序中输入的相同高度即可。根据所使用的公式，计算结果可能与应用程序中的折减气压略有差异。该适配器使用德国气象局 (DWD) 的公式 (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [这里](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen))。

选中调试复选框后，适配器会在日志文件中生成大量输出。此功能仅应用于调试目的。

## 天气流数据和状态
适配器提供所有通过 UDP 协议发送的参数。状态位于集线器和站点 ID 下方的树状结构中。<b>注意</b>：将数据发送到数据库进行长期存档时，应使用状态别名，以避免设备更换时数据序列丢失。这与 Tempest-App 提供的数据略有不同，因为该应用程序会从 weatherflow 服务器获取已处理的数据。在电池电量充足的情况下，“device_status”和“obs_st”数据每分钟更新一次，“rapid_wind”每 3 秒更新一次。“evt_precip”和“evt_strike”仅在事件发生时更新（并创建）。“hub_status”每 10 秒更新一次。来自站点和适配器计算的值（见下文）仅在接收到或需要计算时创建。这意味着可能需要长达 24 小时才能看到所有内容，但降雨开始和闪电事件可能需要数天、数周甚至数月才会显示 ;-)

## 适配器计算状态
除了系统提供的数据外，适配器还会计算一些额外的数据，这些数据的名称后缀均为“适配器计算”：

- 蒲福风级中的平均风力、阵风和风速骤降
- 根据温度和湿度计算露点
体感温度是根据温度、湿度和平均风速计算得出的。根据温度和风速，或者温度和湿度，要么只显示气温，要么计算风寒指数或热指数。
- 提供当前小时、过去一小时以及今天和昨天的降水量、降水持续时间和日照持续时间（≥120 W/m²）。使用过去一小时和昨天的数据，可以方便地将数值变化的数据存储到数据库中。
降水强度按以下等级划分：无(0): 0 毫米/小时；极小(1): > 0, < 0.25 毫米/小时；小(2): ≥ 0.25, < 1.0 毫米/小时；中(3): ≥ 1.0, < 4.0 毫米/小时；大(4): ≥ 4.0, < 16.0 毫米/小时；特大(5): ≥ 16.0, < 50 毫米/小时；极端(6): > 50.0 毫米/小时
- 降雨状态在 precip_evt 中以布尔值（true，false）显示。如果接收到降雨事件且降雨量大于 0，则该值设置为 true。3 分钟后，如果不再下雨，则该值重置。
阳光强度也以布尔值表示，如果大于等于 120 W/m²，则为真；如果小于等于 120 W/m²，则为假。
- 风向用基本字母表示（NSWE），由风向度数计算得出。

此外，该适配器还提供了今天和昨天参数的一系列有用的最小值和最大值。

- sensor_status 以文本形式显示，以便在发生这种情况时轻松查看哪个传感器出现故障。
- 从 sensor_status 位中提取电源模式（实验性）

闪电距离
当未检测到闪电时，该协议会发送闪电距离值为 0 的信号。为了避免误认为闪电就在头顶正上方，0 的值会被修正为 999。

## Changelog

### 0.1.6
(womi) maintenance; Adapter requires node.js >= 22 now
### 0.1.5
(womi) maintenance;
### 0.1.4
(womi) updated to reflect latest requirements on dependencies, node.js, js-controller etc.
### 0.1.3 
(Scrounger) calculation of absolute humidity added
### 0.1.2
(womi) Update js-controller >3.0.0; checked compatibility with js-controller 4.0 
### 0.1.1
(womi) Fixed "invalid date" in timestamps 
### 0.1.0
(womi) Compatibility with Admin 5; Stable version

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
MIT License

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

Copyright (c) 2026 womi <woessmich@gmail.com>