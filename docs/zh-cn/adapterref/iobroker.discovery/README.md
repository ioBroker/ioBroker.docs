---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovery/README.md
title: ioBroker 发现适配器
hash: 8ZC7Dm35Xlje6vXUX0PcjjVgWk0L6sXeaxRpbl3uHyM=
---
![标识](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![安装数量](http://iobroker.live/badges/discovery-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.discovery.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker 发现适配器
![测试与发布](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **使用所有已知方法检测设备。**

这是一个特殊的适配器，它尝试查找可以从 iobroker 主机访问的所有可能的设备。
现在它可以通过 ping、UPnP（计划使用串行）进行检测。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

## 确实支持
### 自动发现
- 空气-Q
- 倍福 PLC
- 博世智能家居
-Bose Soundtouch
- 博联
- BSBLan
- Chromecast
- 大金气候控制
- deConz
- 天龙 / 马兰士
- DoorBird
- e3dc-rscp
- 电动巴士
- 埃基
- 能源经理（E.ON/Solarwatt）
- 埃内特 (荣格)
- 爱普生 Stylus PX830
- Fakeroku（和谐）
- 弗吉尼亚医学与医学中心
-FireTV
- Fritzdect
- 伏能士
- Frontier_silicon
- G-Homa 插头
- 和谐
- 赫奥斯
- 家庭助理
- Homematic CCU (hm-rpc、hm-rega)
- 家庭飞行员
- HP-lio
- 飞利浦 HUE
- Plex
- InfluxDB
- KLF-200
- KNX（实际上已被禁用）
- Keba KeContact P30
- 科迪
- LaMetric
- Landroid
- LG电视
- 照明
- Loxone
- 卢普塞克
- MAX! 立方体
- 麦克莱丁
- MegaD
- Miele
- Miele 云服务
- 米家智能家居
- 米克罗蒂克
- MiLight 桥 (v6)
- mpd
- 音乐广播
- 我的Dlink
- Mysensors USB/串行（9600、38400、57600、115200）
- 我的巴士
- nanoleaf 灯板/帆布
- 网络工具
-Nuki2
螺母
- 安桥
- OpenHAB
-OpenKNX
- 平
- Plex
- 普罗克斯莫克斯
- RFLink（串行 57600 波特）
- 三星电视
- 斯玛
- 斯玛皮
- Solarlog
- 索恩
-索诺斯
- Stiebel-Eltron/Tecalor ISG（加号）
- SQL（MySQL，MSSQL，PostgreSQL）
- 挤压箱
-SqueezeboxRPC
Synology
TR-064 型
- 翻译
- 通用即插即用
- ValloxMV
- 无线上网
白光发光二极管
- 雅马哈
-Yeelight
- Z-wave USB（经 Aeon Labs 测试）

### 作为附加适配器提供
- 云
- 历史记录（如果未找到 SQL 或 InfluxDB）
- 物联网
- 智能控制
- eCharts（存在历史适配器时提供）
- JavaScript
- 信息
- 可见
- 网络

## 如果适配器找不到 IP...
适配器对当前主机 IP（x.y.z.1..255）的网络执行 ping 操作。此外，UPnP 和 mDNS 用于检测 IP。
如果未找到所有 IP，请检查 iobroker 用户是否可以执行 `/bin/ping`。
您可以执行 `sudo setcap cap_net_raw+p /bin/ping` 来添加缺少的功能/权限。

＃＃ 去做
- artnet？（Bluefox）
- B-Control-Em？（Bluefox）
- cul / maxcul (Bluefox)
- Foobar200（安装程序）
- fritzbox（ruhr70）
- km200（坦率的笑话）
- megaesp (ausHaus)
- modbus（Bluefox）
- mqtt/mqtt-客户端 (Bluefox)
- owfs (蓝狐)
- rpi2（如果 ioBroker 在 Raspberry 上运行）
- rwe-smarthome (PArns)
- s7（蓝狐）
- 智能电表（Apollon77）
- unifi（jens-maus）
- 狼 (微笑杰克)
- xs1（坦率的笑话）

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 4.5.0 (2024-04-21)
* (pr0crstntr) Added Air-Q

### 4.4.0 (2024-02-23)
* (klein0r) Added WLED
* (klein0r) Added LaMetric
* (Jey-Cee) Removed net-tools from proposals

### 4.3.0 (2024-02-21)
* (bluefox) Replaced vis with vis-2

### 4.2.0 (2023-10-09)
* (pdbjjens) Changed detection of myvbus and resol

### 4.1.0 (2023-09-25)
* (pdbjjens) Added detection of myvbus and resol

## License

The MIT License (MIT)

Copyright (c) 2017-2024, Denis Haev ak Bluefox <dogafox@gmail.com>

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