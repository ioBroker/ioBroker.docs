---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovery/README.md
title: ioBroker 发现适配器
hash: D/72x86GmJCeDJxyqlcj3Bp2mAh8a6fxHgt7E6LOgpM=
---
![标识](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![安装数量](http://iobroker.live/badges/discovery-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.discovery.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker 发现适配器
![测试与发布](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **使用所有已知方法检测设备。**

这是一个特殊的适配器，它会尝试查找所有可以从 iobroker 主机访问的设备。

目前它可以通过 ping 和 UPnP（计划支持串口）进行检测。

**此适配器使用 Sentry 库自动向开发者报告异常和代码错误。** 更多详情以及如何禁用错误报告的信息，请参阅 [Sentry插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！Sentry 报告功能从 js-controller 3.0 开始使用。

实际支持
### 自动发现
- Air-Q
- 倍福公司
博世智能家居
- Bose Soundtouch
博联
- BSBLan
- Chromecast
大金空调
- deConz
- Denon / Marantz
- DoorBird
- e3dc-rscp
- ebus
- 电子密钥
- 能源管理器（E.ON/Solarwatt）
- 荣格
- 爱普生 Stylus PX830
- Fakeroku（和谐）
- FHEM
- FireTV
- Fritzdect
弗罗尼厄斯
- Frontier_silicon
G-Homa插头
- 和谐
希奥斯
- 家庭助手
- Homematic CCU（hm-rpc，hm-rega）
- Hoymiles HMS 逆变器（hoymiles）
- Homepilot
- HP-lio
- 飞利浦 Hue
- Plex
- InfluxDB
KLF-200
- KNX（实际上已禁用）
- Keba KeContact P30
- Kodi
- LaMetric
- Landroid
- LG电视
- Lightify
- 洛克松
- Lupusec
- MAX！立方体
麦闪电
- MegaD
- 美诺
- Miele 云服务
- 米家智能家居
- Mikrotik
- MiLight 桥接器（v6）
- MPD
- Musiccast
- myDlink
- Mysensors USB/串口（9600、38400、57600、115200）
- myvbus
- nanoleaf 灯板/画布
- 网络工具
- 努基2
坚果
- 安桥
OpenHAB
- OpenKNX
- Ping
- Plex
- Proxmox
- RFLink（串口 57600 波特）
- 三星电视
- Sma-em
- Smappee
- Solarlog
太阳
Sonos
- Stiebel-Eltron/Tecalor ISG（附加）
- SQL（MySQL、MSSQL、PostgreSQL）
- SqueezeboxRPC
- Synology
- TR-064
- Trådfri
- UPnP
- ValloxMV
- Wifilight
- 白光LED
雅马哈
- Yeelight
- Z-wave USB（经 Aeon Labs 测试）

### 可作为附加适配器提供
- 云
- 历史记录（如果未找到 SQL 或 InfluxDB）
- 物联网
- iControl
- eCharts（当存在历史适配器时提供）
- JavaScript
- 信息
- 可见
- 网站

如果适配器找不到 IP 地址……
适配器会 ping 当前主机 IP 地址（x.y.z.1..255）所在的网络。此外，还会使用 UPnP 和 mDNS 来检测 IP 地址。

如果未能找到所有 IP 地址，请检查 iobroker 用户是否拥有执行 `/bin/ping` 的权限。

您可以执行 `sudo setcap cap_net_raw+p /bin/ping` 来添加缺失的功能/权限。

## 待办事项
- artnet？（Bluefox）
- B-Control-Em？（Bluefox）
- cul / maxcul（Bluefox）
- Foobar200（安装程序）
- fritzbox (ruhr70)
- km200（frankjoke）
- megaesp（ausHaus）
- modbus（Bluefox）
- mqtt/mqtt-client（Bluefox）
- owfs（Bluefox）
- rpi2（如果 ioBroker 运行在 Raspberry Pi 上）
- rwe-smarthome（PARns）
- s7（Bluefox）
- 智能电表（Apollon77）
- unifi（jens-maus）
- 狼（微笑杰克）
- xs1（frankjoke）

<!-- 下一版本的占位符（位于行首）：

### **正在进行中** -->

## Changelog
### **WORK IN PROGRESS**
* (iobroker-bot) Adapter requires node.js >= 20 now.
* (UncleSamSwiss) Remove obsolete squeezebox adapter
* (GermanBluefox) Packages were updated

### 5.0.0 (2024-07-21)
* (bluefox) Packages updated
* (bluefox) Minimum node.js version is 18.x
* (bluefox) Updated licenses for knx and jarvis

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

## License

The MIT License (MIT)

Copyright (c) 2017-2026, Denis Haev ak Bluefox <dogafox@gmail.com>

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