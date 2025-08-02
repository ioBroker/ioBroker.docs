---
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.solax.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.solax.svg
BADGE-Number of Installations (latest): http://iobroker.live/badges/solax-installed.svg
BADGE-Number of Installations (stable): http://iobroker.live/badges/solax-stable.svg
BADGE-Known Vulnerabilities: https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg
BADGE-License: https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat
BADGE-Donate: https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg
BADGE-: https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solax/README.md
title: ioBroker.solax
hash: RZW6F+kMWyyDPRGfkXmz1YZ5xP43u5qCgjakymep7ZI=
---
![标识](../../../en/admin/solax.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.solax.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solax.svg)
![安装数量（最新）](http://iobroker.live/badges/solax-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/solax-stable.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

# IoBroker.solax
![测试与发布](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

***

**如果您喜欢，请考虑捐赠：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

***

## Solax 云连接
Solax逆变器API云连接

该适配器将来自制造商 Solax 的逆变器数据调用到 iobroker 中。

为此，您需要一个 Solax 帐户、您的令牌 ID 和 WiFi 模块的序列号。

## API 令牌
<span><img src="../img/solax_api.png"></span>

＃＃ 序列号
<span><img src="../img/wifi-stick.png"></span>

## 专家设置
当前仅 Pocket Wifi 棒支持本地连接。 LAN 棒只能在云模式下操作。

注意，如果您在专家设置中激活本地模式，您应该提前检查您的 Pocket Wifi Stick 的当前固件版本。<br>该棒安装的固件版本不得高于 2.30.20 (Wifi-Pocket V1/V2) 且小于 3.001 (Wifi-Pocket V3)，因为 Solax 会阻止更高版本的本地访问并导致 Wifi 棒崩溃。

这里解释了如何检查固件版本以及如何降级到正确的版本。

要检查棒上的固件，您必须连接到棒的热点。
您的热点名称应如下所示：`Solax_SWXXXXXXXX` 或 `Wifi_SWXXXXXXXX`。 XXXXXXX 将替换为您的序列号。

如果您已连接到热点，请使用以下 IP 地址在浏览器中转至 Wifi 棒的 Web 界面：`5.8.8.8`<br>如果您在初始设置期间没有更改密码，则默认登录数据为 admin:admin

<span><img src="../img/webif.png"></span>

在网络界面中，转到“系统”选项卡，您将在那里找到当前安装的固件版本。<br>如果版本大于 2.033.20 (Wifi-Pocket V1/V2) 且小于 3.001 (Wifi-Pocket V3)，您可以通过“更新固件 (.usb)”菜单项在同一选项卡中刷新正确的版本。

您可以从以下链接下载版本2.033.20：

[下载袖珍 Wifi 固件](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

必须解压 zip 文件并选择扩展名为“.usb”的文件。<br>现在您可以开始降级，大约 20-30 秒后您将收到一条消息，表明更新成功，并且棒将重新启动。

成功重启后，您现在可以通过 IP 地址为`5.8.8.8` 的热点或通过网络中的本地 IP 访问 WiFi 棒。

在连接适配器之前，请再次检查降级是否成功以及是否安装了正确的固件。
幸运的是，该棒不执行自动固件升级，并且在 2.033.20 版本中功能齐全。

必须在适配器中输入本地 IP 地址（不是热点 IP）和 Web 界面的密码，现在您就可以对逆变器进行精确到秒的本地分析。

本地模式目前支持以下逆变器：

* X1迷你
* X1 提升
* X3-混合/飞度
* X3-20K/30K
* X3-麦克风/PRO
* X3-混合动力-G4
* X3-MIC/PRO-G2
* X1-混合-G4
* X1/X3-EVC 墙盒

如果您想集成其他逆变器，则应将本地请求的数据评估作为一个问题提供。

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### __WORK IN PROGRESS__
* (simatec) Dependencies updated

### 0.9.6 (2024-02-05)
* (simatec) small Design Fix

### 0.9.5 (2024-02-04)
* (simatec) Dependencies updated
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.4 (2024-01-22)
* (simatec) adapter-dev added
* (simatec) delete Gulp
* (Andre-0815-4711) Data for X1/X3-EVC Wallbox added

### 0.9.3 (2024-01-14)
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Fix Inverter data
* (simatec) Dependencies updated

### 0.9.2 (2024-01-13)
* (simatec) Fix Data for X1/X3-EVC Wallbox

### 0.9.1 (2024-01-02)
* (simatec) Fix Inverter data
* (simatec) Fix Data for X1/X3-EVC Wallbox
* (simatec) Update Docu

### 0.9.0 (2024-01-02)
* (simatec) Cloud URL Check added
* (simatec) X1/X3-EVC added
* (simatec) Inverter Data for X3-Hybrid-G4 updated
* (simatec) Fix Inverter Data for X1 Hybrid G4
* (simatec) Dependencies updated

### 0.8.0 (2023-10-23)
* (simatec) X1-Hybrid-G4 added

### 0.7.7 (2023-09-06)
* (simatec) Dependencies updated
* (simatec) small Bugfix

### 0.7.6 (2023-07-30)
* (simatec) X3-Hybrid-G4 data updated
* (simatec) Dependencies updated
* (simatec) small Bugfix
* (simatec) Ukrainian translation added

### 0.7.5 (2023-05-29)
* (simatec) X3-MIC/PRO-G2 added
* (simatec) small Fix
* (simatec) Dependencies updated

### 0.7.4 (2023-05-04)
* (simatec) connection state added
* (simatec) suncalc package added
* (simatec) change from dawn und dusk calc

### 0.7.3 (2023-05-03)
* (simatec) small Bugfix
* (simatec) X3-Hybrid data added
* (simatec) Dependencies updated

### 0.7.2 (2023-04-27)
* (simatec) small Bugfix

### 0.7.1 (2023-04-27)
* (simatec) small Bugfix

### 0.7.0 (2023-04-26)
* (simatec) Dependencies updated
* (simatec) Config for Firmware Version added
* (simatec) small Bugfix

### 0.6.0 (2023-03-04)
* (simatec) Dependencies updated
* (simatec) Fix URL
* (simatec) small Bugfix

### 0.5.7 (2022-11-01)
* (simatec) Dependencies updated

### 0.5.6 (2022-09-21)
* (simatec) local mode for X1 boost added

### 0.5.5 (2022-09-21)
* (simatec) small Bugfixes

### 0.5.4 (2022-09-20)
* (simatec) small Bugfixes

### 0.5.3 (2022-09-20)
* (simatec) Hybrid-G4 added
* (simatec) small Bugfixes
* (simatec) appveyor test removed
* (simatec) travis test removed

### 0.5.1 (2022-09-13)
* (simatec) feedin added

### 0.5.0 (2022-09-12)
* (simatec) Dependencies updated
* (simatec) small Bugfixes
* (clausmuus) Add support for firmware version 3.001

### 0.4.6 (2022-04-11)
* (simatec) Fix states

### 0.4.5 (2022-04-04)
* (simatec) Dependencies updated
* (simatec) small Bugfixes

### 0.4.4 (2022-03-14)
* (simatec) Dependencies updated
* (simatec) battery data for local request added
* (simatec) night mode turn on/off added

### 0.4.3 (2022-02-03)
* (simatec) refactoring Sourcecode
* (simatec) Dependencies updated
* (simatec) Fix API Request

### 0.4.2 (2022-01-27)
* (simatec) Fix json state

### 0.4.1 (2022-01-26)
* (simatec) Fix react Translatation

### 0.4.0 (2022-01-25)
* (simatec) local request for Wifi Pocket Stick added
* (simatec) Dependencies updated
* (simatec) test and release updated
* (simatec) Number of days of history data added
* (simatec) Expert-Mode added
* (simatec) Docu updated
* (simatec) Bugfixes

### 0.3.7 (2021-11-17)
* (simatec) Dependencies updated
* (simatec) test and release updated

### 0.3.6 (2021-08-04)
* (simatec) deps fixed

### 0.3.5 (31.07.2021)
* (simatec) await/async functions fixed

### 0.3.4 (30.07.2021)
* (simatec) code cleanig
* (simatec) await functions fixed

### 0.3.3 (29.07.2021)
* (simatec) Formatted objects
* (simatec) await functions fixed
* (simatec) query interval changed
* (simatec) Dependencies updated

### 0.3.2 (28.07.2021)
* (simatec) fix for latest repo

### 0.3.1 (11.06.2021)
* (simatec) fix for latest repo
* (simatec) API-Token encrypted

### 0.3.0 (09.06.2021)
* (simatec) state settings changed
* (simatec) sentry plugin added
* (simatec) readme added
* (simatec) sunposition added
* (simatec) nightmode added

### 0.2.0 (07.06.2021)
* (simatec) powerdc 1-4 added
* (simatec) battPower added
* (simatec) many small bugfixes

### 0.1.1 (02.06.2021)
* (simatec) small Bugfixes

### 0.1.0 (02.06.2021)
* (simatec) first beta

## License
MIT License

Copyright (c) 2021 - 2024 simatec

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