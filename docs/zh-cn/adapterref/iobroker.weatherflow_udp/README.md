---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.weatherflow_udp/README.md
title: 天气流UDP
hash: yxgr2MEMcXFzQZVMqmC5+baOM6kYCy8UA0/+Jotrft4=
---
![标识](../../../en/adapterref/iobroker.weatherflow_udp/admin/weatherflow_udp.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.weatherflow_udp.svg)
![下载](https://img.shields.io/npm/dm/iobroker.weatherflow_udp.svg)
![安装数量（最新）](http://iobroker.live/badges/weatherflow_udp-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/weatherflow_udp-stable.svg)
![依赖状态](https://img.shields.io/david/woessmich/iobroker.weatherflow_udp.svg)
![已知漏洞](https://snyk.io/test/github/woessmich/ioBroker.weatherflow_udp/badge.svg)
![新产品管理](https://nodei.co/npm/iobroker.weatherflow_udp.png?downloads=true)
![特拉维斯CI](http://img.shields.io/travis/woessmich/ioBroker.weatherflow_udp/master.svg)
![应用程序](https://ci.appveyor.com/api/projects/status/github/woessmich/ioBroker.weatherflow_udp?branch=master&svg=true)

# Weatherflow UDP
**测试：**

## IoBroker 的 weatherflow_udp 适配器
Weatherflow UDP 接收器适配器接收和解析 [UDP 消息](https://weatherflow.github.io/Tempest/api/udp/v143/) 来自 [Weatherflow](www.weatherflow.com) 智能气象站，如 [Weatherflow Tempest](https://weatherflow.com/tempest-weather-system/)。
适配器也应该能够解析诸如“Air”和“Sky”之类的旧电台（但这未经测试）。
适配器监听的标准端口是 50222，但可以在设置中更改。

##设置
该适配器提供了一组最少的设置选项。
据我所知，可以更改侦听端口，这不应该是必需的，因为气象站集线器发送的端口无法更改。

以米为单位的站点海拔高度用于从站点提供的本地压力计算减压。只需使用与应用程序中输入的高度相同的高度即可。根据所使用的公式，与应用程序中的减压相比可能存在细微差异。适配器使用德国气象服务 DWD 使用的公式 (http://dk0te.ba-ravensburg.de/cgi-bin/navi?m=WX_BAROMETER; nur noch [上级](https://www.symcon.de/forum/threads/6480-Relativen-Luftdruck-aus-absoluten-Luftdruck-errechnen))。

勾选调试复选框后，适配器会在日志文件中创建大量输出。应该只用于调试。

## 天气流的数据和状态
适配器提供通过 UDP 协议发送的所有参数。状态位于中心和站点 ID 下方的树中。<b>注意</b>：将数据发送到数据库以进行长期存档时，如果单元需要更换，应使用状态的别名以免丢失系列。 Tempest-App 提供的内容存在一些差异，因为该应用程序从 Weatherflow 服务器获取已处理的数据。如果电池电量充足，“device_status”和“obs_st”数据每分钟更新一次，“rapid_wind”每 3 秒更新一次。 “evt_precip”和“evt_strike”仅在它们发生时更新（和创建）。 “hub_status”每 10 秒更新一次。来自站和适配器的计算值（见下文）仅在接收或计算时创建。这意味着可能需要长达 24 小时才能看到所有内容，但开始下雨和雷击事件可能需要几天、几周、几个月的时间；-)

## 适配器计算状态
除了系统提供的数据外，适配器还会计算一些额外的数据，这些数据都有“适配器计算”作为名称后缀：

- [博福特](https://en.wikipedia.org/wiki/Beaufort_scale) 的平均风速、阵风和平静
- 根据温度和湿度计算的露点
- 感觉就像根据温度、湿度和平均风速计算得出的温度。根据温度和风或温度或湿度，或者只是显示气温或 [风寒](https://en.wikipedia.org/wiki/Wind_chill) 或 [热指数](https://en.wikipedia. org/wiki/Heat_index) 计算。
- 提供当前和过去以及今天和昨天的降水量和持续时间以及 [阳光持续时间](https://en.wikipedia.org/wiki/Sunshine_duration) (>= 120 W/m2)。使用前一小时和昨天可以轻松地将有关值更改的数据存储到数据库中。
- 根据此比例提供降水强度：无（0）：0 毫米/小时；非常轻(1)：> 0, < 0.25 毫米/小时；光（2）：≥ 0.25，< 1.0 毫米/小时；中等(3)：≥ 1.0，< 4.0 毫米/小时；重型（4）：≥ 4.0，< 16.0 毫米/小时；非常重 (5)：≥ 16.0，< 50 毫米/小时；极端（6）：> 50.0 毫米/小时
- 下雨也在 precip_evt 中显示为布尔状态（真、假）。如果接收到降水事件并且降水值 >0，它将被设置为 true。 3 分钟后，如果不再下雨则重置
- 阳光也显示为布尔状态，如果 >= 120 W/m2，则为 true，如果小于，则为 false
- 从风向以度数计算的基数字母 (NSWE) 风向。

此外，该适配器还为今天和昨天提供了一系列有用的参数最小值和最大值。

- sensor_status 作为文本，以便在发生这种情况时轻松查看哪个传感器发生故障。
- 从 sensor_status 位，提取电源模式（实验性）

##闪电距离
当没有检测到闪电时，协议发送一个闪电距离 0。值 0 被修改为 999 以避免雷击直接在头顶上的印象。

## Changelog
### 0.1.1
(womi) Fixed "invalid date" in timestamps 
### 0.1.0
(womi) Compatibility with Admin 5; Stable version

## License
MIT License

Copyright (c) 2021 womi <woessmich@gmail.com>

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