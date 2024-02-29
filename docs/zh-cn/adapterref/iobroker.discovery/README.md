---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovery/README.md
title: ioBroker 发现适配器
hash: 9q9hk+XosZMUV7Kv3DKTr9Qi0BuHcX5rQtJlRBo/RRg=
---
![标识](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![安装数量](http://iobroker.live/badges/discovery-stable.svg)
![NPM版本](http://img.shields.io/npm/v/iobroker.discovery.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker 发现适配器
![测试与发布](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **使用所有已知方法检测设备。**

这是一个特殊的适配器，它尝试查找可从 iobroker 主机访问的所有可能的设备。
目前可以通过 ping、UPnP（串行计划）进行检测。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 实际支持
### 自动发现
- 倍福PLC
- 博世智能家居
- Bose Soundtouch
- 宽联
- BSBLan
- Chromecast
- 大金气候控制
- 德康兹
- 天龙/马兰士
- 门鸟
- e3dc-rscp
- 电动巴士
- 电子钥匙
- 能源管理器（E.ON/Solarwatt）
- 埃内特（荣格）
- 爱普生手写笔 PX830
- Fakeroku（和声）
- FHEM
- 消防电视
- 弗里茨德克特
- 伏能士
- Frontier_silicon
- G-Homa 插头
- 和谐
- 赫奥斯
- 家庭助理
- Homematic CCU（hm-rpc、hm-rega）
- 主页导航
- HP-lio
- 飞利浦 HUE
- 丛
- InfluxDB
- KLF-200
- KNX（实际上已禁用）
- 柯巴柯Contact P30
- 科迪
- 拉米特里克
- 安卓
- LG电视台
- 轻化
- 洛克索内
- 卢普塞克
- 最大限度！立方体
- 麦克莱特
- 梅加迪
- 美诺
- Miele 云服务
- 米家智能家居
- 米克罗蒂克
- MiLight 桥 (v6)
- MPD
- 音乐广播
- 我的Dlink
- Mysensors USB/串行（9600、38400、57600、115200）
- myvbus
- nanoleaf 灯板/画布
- 网络工具
- 努基2
- 坚果
- 安桥
- 开放HAB
- OpenKNX
- 平
- 丛
- 普罗克斯莫克斯
- RFLink（串行 57600 波特）
- 三星电视
- Sma-em
- 斯马皮
- 太阳能日志
- 索南
- 索诺斯
- Stiebel-Eltron/Tecalor ISG（增强）
- SQL（MySQL、MSSQL、PostgreSQL）
- 挤压盒
- SqueezeboxRPC
- 群晖科技
- TR-064
- 特拉德弗里
- 通用即插即用
- 瓦洛克斯MV
- 无线网络
- 白光LED
- 雅马哈
- Yeelight
- Z-wave USB（经 Aeon Labs 测试）

### 作为附加适配器提供
- 云
- 历史记录（如果没有找到 SQL 或 InfluxDB）
- 物联网
- i控制
- eCharts（当存在历史适配器时提供）
- JavaScript
- 信息
- 可见
- 网络

## 如果适配器找不到 IP ...
适配器 ping 当前主机 IP 的网络 (x.y.z.1..255)。此外，UPnP 和 mDNS 用于检测 IP。
如果未找到所有 IP，请检查 iobroker 用户是否可以执行`/bin/ping`。
您可以执行`sudo setcap cap_net_raw+p /bin/ping`来添加缺少的功能/权限。

＃＃ 去做
- 艺术网？ （蓝狐）
- B-控制-Em？ （蓝狐）
- cul / maxcul (Bluefox)
- Foobar200（安装器）
- 弗里茨盒 (ruhr70)
- km200（坦白笑话）
- megaesp (ausHaus)
- MODBUS（蓝狐）
- mqtt/mqtt-客户端（Bluefox）
- owfs（蓝狐）
- rpi2（如果 ioBroker 在 Raspberry 上运行）
- rwe-smarthome (PArns)
- s7（蓝狐）
- 智能电表（Apollon77）
- unifi (jens-maus)
- 狼（微笑杰克）
- xs1（坦白笑话）

<!-- 下一个版本的占位符（在行的开头）：

### **正在进行中** -->

## Changelog
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

### 4.0.0 (2023-09-04)
* (pdbjjens) Added: frontier_silicon, sma-em, and speedwire
* (bluefox) Dropped node14 support, refactoring

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