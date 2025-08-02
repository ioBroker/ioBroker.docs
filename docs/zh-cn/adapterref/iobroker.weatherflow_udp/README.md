---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherflow_udp/README.md
title: Weatherflow UDP
hash: hGAfz3t2ag9lo6Hj4I4jq+P26RipTF5tObr5GWVrJwM=
---
![标识](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.weatherflow_udp?style=flat-square)
![下载](https://img.shields.io/npm/dm/iobroker.weatherflow_udp?label=npm%20downloads&style=flat-square)
![节点](https://img.shields.io/node/v-lts/iobroker.weatherflow_udp?style=flat-square)
![Libraries.io 最新版本的依赖状态](https://img.shields.io/librariesio/release/npm/iobroker.weatherflow_udp?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/woessmich/iobroker.weatherflow_udp?style=flat-square)
![GitHub 仓库大小](https://img.shields.io/github/repo-size/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub 提交活动](https://img.shields.io/github/commit-activity/m/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub 上次提交](https://img.shields.io/github/last-commit/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![GitHub 问题](https://img.shields.io/github/issues/woessmich/iobroker.weatherflow_udp?logo=github&style=flat-square)
![已知漏洞](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![GitHub 工作流程状态](https://img.shields.io/github/actions/workflow/status/woessmich/iobroker.weatherflow_udp/test-and-release.yml?branch=master&logo=github&style=flat-square)
![测试版](https://img.shields.io/npm/v/iobroker.weatherflow_udp.svg?color=red&label=beta)
![稳定的](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![已安装](http://iobroker.live/badges/weatherflow_udp-installed.svg)

# Weatherflow UDP
## 版本
## IoBroker 的 weatherflow_udp 适配器
Weatherflow UDP 接收器适配器用于接收和解析 [来自 [Weatherflow](www.weatherflow.com) 智能气象站（例如 [Weatherflow Tempest]）的 UDP 消息](https://weatherflow.github.io/Tempest/api/udp/v143/)](https://weatherflow.com/tempest-weather-system/)。
该适配器还应能够解析较旧的电台，如“Air”和“Sky”（但尚未测试）。
适配器监听的标准端口是 50222，但可以在设置中更改。

＃＃ 设置
适配器提供了一组最少的设置选项。
可以更改监听端口，但据我所知，这应该不是必需的，因为气象站集线器发送的端口无法更改。

以海拔米为单位的站点高度用于计算站点提供的当地气压的减压值。只需使用与应用程序中输入的相同高度即可。根据使用的公式，与应用程序中的减压值相比可能会有细微差异。适配器使用德国气象服务 DWD 使用的公式（http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER；nur noch [耶尔](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen)）。

勾选调试复选框后，适配器会在日志文件中创建大量输出。仅应用于调试。

## 数据和状态由 weatherflow 提供
适配器提供通过 UDP 协议发送的所有参数。状态位于集线器和站点 ID 下方的树中。<b>注意</b>：将数据发送到数据库进行长期存档时，应使用状态别名，以免在需要更换单元时丢失系列。与 Tempest-App 提供的内容有一些不同，因为 App 从 weatherflow 服务器获取已处理的数据。如果电池电量充足，“device_status”和“obs_st”数据每分钟更新一次，“rapid_wind”每 3 秒更新一次。“evt_precip”和“evt_strike”仅在发生时更新（和创建）。“hub_status”每 10 秒更新一次。来自站点和适配器计算的值（见下文）仅在收到或需要计算时创建。这意味着可能需要长达 24 小时才能看到所有内容，除了降雨和雷击事件，这可能需要几天、几周、几个月才能出现 ;-)

## 适配器计算状态
除了系统提供的数据外，适配器还会计算一些额外的数据，这些数据都以“适配器计算”作为名称后缀：

- [蒲福风级](https://en.wikipedia.org/wiki/Beaufort_scale) 的平均风速、阵风和平静风速
- 根据温度和湿度计算露点
- 感觉就像根据温度、湿度和平均风速计算出的温度。根据温度和风速或温度或湿度，要么只显示空气温度，要么计算 [风寒指数](https://en.wikipedia.org/wiki/Wind_chill) 或 [热指数](https://en.wikipedia.org/wiki/Heat_index)。
- 提供当前和过去一小时以及今天和昨天的降水量和持续时间以及 [日照持续时间](https://en.wikipedia.org/wiki/Sunshine_duration) (>= 120 W/m2)。使用前一小时和昨天的数据可轻松将值的变化数据存储到数据库中。
- 降水强度按以下等级划分：无降水（0）：0 毫米/小时；非常小降水（1）：> 0，< 0.25 毫米/小时；轻微降水（2）：≥ 0.25，< 1.0 毫米/小时；中等降水（3）：≥ 1.0，< 4.0 毫米/小时；大降水（4）：≥ 4.0，< 16.0 毫米/小时；非常大降水（5）：≥ 16.0，< 50 毫米/小时；极端降水（6）：> 50.0 毫米/小时
- 降雨在 precip_evt 中也显示为布尔状态（真、假）。如果收到降水事件且降水值 >0，则将设置为真。如果 3 分钟后不再下雨，则重置
- 日照也显示为布尔状态，如果 >= 120 W/m2，则为真，如果小于，则为假
- 根据风向度数计算得出以基数字母表示的风向（NSWE）。

此外，适配器还提供了今天和昨天的参数的有用最小值和最大值的选择。

- sensor_status 为文本，以便轻松查看发生这种情况时哪个传感器发生故障。
- 从 sensor_status 位中提取电源模式（实验）

## 闪电距离
当未检测到闪电时，协议会发送闪电距离 0。0 的值被修改为 999，以避免给人留下闪电直接击中头顶的印象。

## Changelog

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

Copyright (c) 2024 womi <woessmich@gmail.com>