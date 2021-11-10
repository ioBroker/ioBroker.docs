---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.discovery/README.md
title: ioBroker 发现适配器
hash: WSxh2vB/89J2wIGBvg02ZcDCRwhLMB1RkMUg9R4NfCc=
---
![标识](../../../en/adapterref/iobroker.discovery/admin/discovery.png)

![安装数量](http://iobroker.live/badges/discovery-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.discovery.svg)
![下载](https://img.shields.io/npm/dm/iobroker.discovery.svg)

# IoBroker 发现适配器
![测试和发布](https://github.com/ioBroker/iobroker.discovery/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/discovery/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget) **使用所有已知方法检测设备。**

这是一个特殊的适配器，它试图找到所有可能的设备，可以从主机访问。
刚才它可以通过ping，UPnP（串行计划）进行检测。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅 [Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用哨兵报告。

##实际支持
### 自动发现
- 倍福 PLC
- 博世智能家居
- Bose Soundtouch
- 广联
- BSBL
- Chromecast
- 大金气候控制
- 德康兹
- 天龙/马兰士
- 门鸟
- 巴士
- ekey
- 能源管理器（E.ON/Solarwatt）
- enet (荣格)
- 爱普生触控笔 PX830
- Fakeroku（和谐）
- FHEM
- 消防电视
- 弗里茨检测
- 弗洛纽斯
- G-Homa 插头
- 和谐
- Heos
- 家庭助理
- Homematic CCU (hm-rpc, hm-rega)
- Homepilot
- HP-lio
- 飞利浦 HUE
- 丛
- 流入数据库
- KLF-200
- KNX（实际上已禁用）
- Keba KeContact P30
- 科迪
- 安卓
- LGTV
- 点亮
- Loxone
- 卢普塞克
- 最大限度！立方体
- 麦克莱特
- MegaD
- 美诺
- Miele 云服务
- 米家智能家居
- 米克罗蒂克
- MiLight 桥 (v6)
- Mpd
- 音乐广播
- myDlink
- Mysensors USB/串口（9600、38400、57600、115200）
- nanoleaf 灯板/帆布
- 网络工具
- 努基2
- 螺母
- 安桥
- OpenHAB
- 平
- 丛
- Proxmox
- RFLink (Serial 57600baud)
- 三星电视
- Smappe
- 太阳能日志
- 索嫩
- 索诺斯
- Stiebel-Eltron/Tecalor ISG（加）
- SQL（MySQL、MSSQL、PostgreSQL）
- 挤压盒
- SqueezeboxRPC
- 群晖
- TR-064
- 特拉德弗里
- UPnP
- 瓦洛克斯MV
- 无线上网
- 雅马哈
- Yeelight
- Z-wave USB（经 Aeon Labs 测试）

### 作为附加适配器提供
- 云
- 历史（如果没有找到 SQL 或 InfluxDB）
- 物联网
- 电子图表（当存在历史适配器时提供）
- JavaScript
- 信息
- 可见
- 网络

## 如果适配器找不到 IPs ...
适配器 ping 当前主机 (x.y.z.1..255) 的 IP 的网络。此外，UPnP 和 mDNS 用于检测 IP。

如果未找到所有 IP，请检查 iobroker 用户是否可以执行 `/bin/ping`。
您可以执行 `sudo setcap cap_net_raw+p /bin/ping` 以添加缺少的功能/权限。

＃＃ 去做
- 艺术网？ (蓝狐)
- B-Control-Em？ (蓝狐)
- cul / maxcul（蓝狐）
- Foobar200（安装器）
- fritzbox (ruhr70)
- km200（坦率的笑话）
- megaesp (ausHaus)
- modbus（蓝狐）
- mqtt/mqtt-client (Bluefox)
- owfs（蓝狐）
- rpi2（如果 ioBroker 在 Raspberry 上运行）
- rwe-smarthome (PARns)
- s7（蓝狐）
- 智能电表 (Apollon77)
- unifi (jens-maus)
- 狼（微笑杰克）
- xs1（坦率的笑话）

<!-- 下一个版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### 2.7.5 (2021-11-09)
* (Apollon77) Fix kecontact detection (Sentry IOBROKER-DISCOVERY-3P)

### 2.7.4 (2021-11-09)
* (bluefox) Replaced flot with eCharts
* (bluefox) info Adapter removed

### 2.7.3 (2021-10-05)
* (Sneak-L8) updated kecontact detection

### 2.7.2 (2021-08-31)
* (Sneak-L8) support KeBa KeContact P30

### 2.7.0 (2021-07-01)
* (hacki11) Add discovery for BSBLan and ValloxMV
* (Apollon77) Optimize for js-controller 3.3

### 2.6.3 (2021-05-03)
* (bluefox) Added support of Admin5

### 2.6.2 (2021-04-13)
* (Apollon77) Fix crash case in mihome discovery (Sentry IOBROKER-DISCOVERY-30)
* (Apollon77) Fix crash case in ping logic (Sentry IOBROKER-DISCOVERY-2Y)
* (Apollon77) Fix crash case in hf-lpb100 logic (Sentry IOBROKER-DISCOVERY-34)

### 2.6.1 (2021-02-28)
* (JeyCee) added iot and net-tools
* (Apollon77) Adjust and optimize UDP and UPnP discoveries
* (Apollon77) Add option to specify the "own IP address" and netmask to also allow discovery for e.g. docker cases where an external network should be scanned
* (Apollon77) Fix ping progress counter when scanning multiple ip ranges
* (JeyCee) removed mobile
* (Apollon77) fix sonos and synology
* (JeyCee) UI adjustments
* (Apollon77) Fix crash cases (Sentry IOBROKER-DISCOVERY-2Q)

### 2.5.0 (2021-01-11)
* (Zefau) Replace nuki2 with nuki-extended
* (Zefau) Suggest jarvis for discovery as advice
* (Apollon77) Add checks on broadlink2 discovery to prevent crash case (Sentry IOBROKER-DISCOVERY-2H)

### 2.4.1 (2020-12-06)
* (Apollon77) Fix potential crash case in lightify (Sentry IOBROKER-DISCOVERY-2D)
* (Apollon77) Fix potential crash case (Sentry IOBROKER-DISCOVERY-2C)

### 2.4.0 (2020-11-29)
* (withstu) add heos

### 2.3.11 (2020-08-08)
* (Grizzelbee) Added MieleCloudService

### 2.3.10 (2020-07-26)
* (MiSchroe) Discovery Velux KLF-200 updated to new firmware

### 2.3.9 (2020-07-17)
* (Apollon77) Add error handling to onvif discovery (Sentry IOBROKER-DISCOVERY-13)
* (Apollon77) Add error handling to smapee discovery (Sentry IOBROKER-DISCOVERY-14)
* (Apollon77) Add error handling to synology discovery (Sentry IOBROKER-DISCOVERY-1A)
* (Apollon77) Update mndp library to prevent crashes (Sentry IOBROKER-DISCOVERY-15+)

### 2.3.7 (2020-06-11)
* (Apollon77) Add error handling for Synology detection (Sentry IOBROKER-DISCOVERY-E)

### 2.3.6 (2020-05-02)
* (Garfonso) add mydlink adapter
* (haba1234) New adapter added: Onvif
* (Apollon77) serial device discovery fixed

### 2.3.4 (2020-04-30)
* (Apollon77) make sure to check if initialization was done when ending (Sentry IOBROKER-DISCOVERY-8) 
* (APollon77) fix megad discovery error

### 2.3.3 (2020-04-23)
* (Apollon77) correct access to wrong variable (Sentry IOBROKER-DISCOVERY-3)
* (Apollon77) catch http errors better (Sentry IOBROKER-DISCOVERY-2)

### 2.3.2 (2020-04-18)
* (Apollon77) Fix potential crash in knx discovery

### 2.3.1 (2020-04-16)
* (instalator) Add Synology, Onkyo, Mpd, Mikrotik
* (instalator) Fixed eKey, Mihome, Broadlink2, Plex
* (instalator) Several optimizations and fixing of crash causes
* (Apollon77) Add Sentry Crash Reporting for js-controller 3.0
* (bluefox) Refactoring

### 2.2.2 (2020-02-13)
* (dkleber89) Add discovery for Beckhoff PLC
* (forelleblau) Add discovery for Solarlog
* (oweitman) Add discovery for SqueezeboxRPC

### 2.1.0 (2020-01-21)
* (foxriver76) no longer use `adapter.objects`
* __js-controller > 2.0.0 required__

### 2.0.0 (2019-05-15)
* (thewhobox) Code refactoring
* (thewhobox) add emby detection
* (frankjoke) boradlink => broadlink2
* (bluefox) Small fixes
* (Apollon77) Support for nodejs 12 added, nodejs 4 is no longer supported!

### 1.3.0 (2019-01-04)
* (bluefox) Support of compact mode
* (ldittmar) info Adapter added

### 1.2.4 (2018-09-22)
* (bluefox) Small GUI update was made
* (rg-engineering) Added ebus

### 1.2.3 (2018-09-13)
* (bluefox) Proxmox was fixed
* (unltdnetworx) solarwatt
* (Michael Schroeder) klf200
* (bluefox) Use OpenStreetMap
* (MeisterTR) yeelight
* (unltdnetworx) stiebel-isg
* (BuZZy1337) doorbird

### 1.2.1 (2018-07-28)
* (bluefox) New adapter added: DENON

### 1.1.1 (2018-03-27)
* (bluefox) New adapter added: ekey, Home Assistant, FHEM

### 1.1.0 (2018-01-23)
* (Apollon77) Upgrade Serialport Library

### 1.0.2 (2018-01-13)
* (bluefox) ready for admin3

### 1.0.1 (2017-12-28)
* Fix Epson Stylus PX830
* Add Bose Soundtouch

### 1.0.0 (2017-10-18)
* (pix) Add Epson Stylus PX830
* (pix) Add Homepilot
* (Samuel Weibel) Loxone

### 0.4.5 (2017-08-25)
* (Apollon77) Fixes in mihome

### 0.4.4 (2017-06-01)
* (bluefox) Add lgtv
* (bluefox) disable serial by default. It must be explicit enabled every time
* (bluefox) add mihome

### 0.4.2 (2017-05-17)
* (bluefox) Add discovery methods selection

### 0.4.0 (2017-05-01)
* (soef) add SamsungTV, Lightify, Miele and yamaha
* (soef) add new discovery method mDNS
* (bluefox) add openhab, Broadlink

### 0.3.3 (2017-04-15)
* (bluefox) add philips HUE

### 0.3.2 (2017-04-12)
* (bluefox) Add mysensors USB/Serial

### 0.3.1 (2017-04-01)
* (apollon77) Add Daikin climate control

### 0.3.0 (2017-03-27)
* (bluefox) Fixed serial discovery

### 0.2.3 (2017-03-18)
* (bluefox) fix license dialog
* (bluefox) add zwave
* (bluefox) add sqllite and flot
* (bluefox) ack => ignore
* (bluefox) add megad
* (apollon77) add history
* (apollon77) enhance/fix sql-sqlite
* (apollon77) add InfluxDB
* (ykuendig) german translation updated

### 0.2.2 (2017-03-18)
* (bluefox) Fix typo

### 0.2.1 (2017-03-15)
* (bluefox) initial commit

## License

The MIT License (MIT)

Copyright (c) 2017-2021, Bluefox <dogafox@gmail.com>

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