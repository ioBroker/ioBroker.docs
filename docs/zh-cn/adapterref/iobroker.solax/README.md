---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.solax/README.md
title: ioBroker.solax
hash: iVlWUUC4LgSLJ45K2qKDmTYfVZohJnXitCzR7fgVmNo=
---
![标识](../../../en/adapterref/iobroker.solax/admin/solax.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.solax.svg)
![下载](https://img.shields.io/npm/dm/iobroker.solax.svg)
![安装数量（最新）](http://iobroker.live/badges/solax-installed.svg)
![安装数量（稳定）](http://iobroker.live/badges/solax-stable.svg)
![已知漏洞](https://snyk.io/test/github/simatec/ioBroker.solax/badge.svg)
![执照](https://img.shields.io/github/license/simatec/ioBroker.solax?style=flat)
![捐](https://img.shields.io/badge/paypal-donate%20|%20spenden-blue.svg)
![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)

#ioBroker.solax
![测试和发布](https://github.com/simatec/ioBroker.solax/workflows/Test%20and%20Release/badge.svg)

**************************************************************************************************************

**如果喜欢，请考虑捐款：**

[![贝宝](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://paypal.me/mk1676)

**************************************************************************************************************

### 用于 ioBroker 的 Solax 适配器
**************************************************************************************************************

### 德文文献
#### Solax 云绑定
Solax Wechselrichter API-Cloud-Verbindung

Dieser Adapter ruft die Daten deines Wechselrichters vom Hersteller Solax für iobroker ab。

dazu benötigt wird，ist ein Konto bei Solax，eine Token-ID 和 Seriennummer des Pocket Wifi oder LAN Sticks。

#### API 令牌
<span><img src="docs/en/img/solax_api.png"></span>

#### 序列号
<span><img src="docs/en/img/wifi-stick.png"></span>

#### 专家指导
Die lokale Verbindung wird aktuell nur von dem Pocket Wifi Sticks unterstützt。 LAN-Sticks können nur im Cloud-Modus betrieben werden。

Achtung，wer 在 den Experteneinstellungen den lokalen Modus aktiviert sollte im Vorfeld zwingend die aktuelle Firmwareversion seines Pocket Wifi Sticks prüfen。
固件版本 größer 2.30.20 (Wifi-Pocket V1/V2) 和 kleiner als 3.001 (Wifi-Pocket V3) darf der Stick nicht installiert haben, da Solax in höheren Versionen den lokalen Zugriff blockiert und es zu einem Absturz des Wifi Sticks führt .

如果固件版本不可用，请先降级相关版本，然后再更新。

Um die Firmware auf dem Stick zu prüfen，müsst ihr euch mit dem Hotspot des Sticks verbinden。
Der Name des Hotspots solte bei euch wie folgt aussehen：`Solax_SWXXXXXXXX` 或 `Wifi_SWXXXXXXXX`。 XXXXXXXX wired durch eure Seriennummer ersetzt。

Wenn ihr mit dem Hotspot verbunden seit, dann geht ihr mit folgender IP-Addresse in euren Browser auf das Webinterface des Wifi-Sticks: `5.8.8.8`<br> Solltet ihr euer Passwort bei der Ersteinrichtung nicht geändert haben, sind die Standard Login-Daten admin:admin

<span><img src="docs/en/img/webif.png"></span>

Im Webinterface geht ihr auf den Tab“System”和 findet dort die aktuell installierte Firmware-Version。<br>更新版本 2.033.20 (Wifi-Pocket V1/V2) 和 kleiner 3.001 (Wifi-Pocket V3) sein, könnt ihr im gleichen Tab über den Menüpunkt &quot;Update Firmware (.usb)&quot; die korrekte Version flashen。

模具版本 2.033.20 könnt ihr euch unter folgenden 链接在此处：

[下载袖珍 Wifi 固件](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

Die Zip-Datei muss entpackt werden und es muss die Datei mit der Endung &quot;.usb&quot; ausgewählt werden。<br> Nun könnt Ihr den Downgrade starten undet nach ca. 20-30 Sekunden eine Meldung bekommen, dass das Update erfolgreich war und der Stick neu gestartet wird。

Nach erfolgreichen Neustart könnt ihr nun über den Hotspot mit der IP-Addresse `5.8.8.8` oder auch über eure lokale IP in eurem Netzwerk auf den Wifi-Stick zugreifen。

Prüft bitte vor einer Verbindung zu dem Adapter noch einmal，ob der Downgrade erfolgreich war und die korrekte Firmware installiert ist。
Der Stick aktualisiert die Firmware nicht automatisch und ist mit der Version 2.033.20 voll funktionsfähig。

Im Adapter müssen die lokale IP-Adresse (nicht die Hotspot IP) und das Passwort des Webinterfaces eingetragen werden, und ihr habt nun eine sekundengenaue lokale Analyze eures Wechselrichters

**************************************************************************************************************

### 英文文档
#### Solax 云连接
Solax逆变器API云连接

此适配器将您的逆变器数据从制造商 Solax 调用到 iobroker 中。

为此，您需要一个 Solax 帐户、您的令牌 ID 和 WiFi 模块的序列号。

#### API 令牌
<span><img src="docs/en/img/solax_api.png"></span>

＃＃＃＃ 序列号
<span><img src="docs/en/img/wifi-stick.png"></span>

#### 专家设置
当前仅袖珍 Wifi 棒支持本地连接。 LAN 棒只能在云模式下运行。

请注意，如果您在专家设置中启用了本地模式，您应该提前检查您的随身 Wifi Stick 的当前固件版本。<br>该棒不得安装大于 2.30.20 (Wifi-Pocket V1/V2) 和小于 3.001 (Wifi-Pocket V3) 的固件版本，因为 Solax 会阻止更高版本的本地访问并导致 Wifi 棒崩溃。

这里解释了如何检查固件版本以及如何降级到正确的版本。

要检查棒上的固件，您必须连接到棒的热点。
您的热点名称应如下所示：`Solax_SWXXXXXXXX` 或 `Wifi_SWXXXXXXXX`。 XXXXXXXX 将替换为您的序列号。

如果您已连接到热点，请使用以下 IP 地址在浏览器中转到 Wifi 棒的网络界面：`5.8.8.8`<br>如果您在初始设置期间未更改密码，则默认登录数据为 admin:admin

<span><img src="docs/en/img/webif.png"></span>

在 Web 界面中，转到“系统”选项卡，您会在那里找到当前安装的固件版本。<br>如果版本高于 2.033.20 (Wifi-Pocket V1/V2) 且低于 3.001 (Wifi-Pocket V3)，您可以通过“更新固件 (.usb)”菜单项在同一选项卡中刷新正确的版本.

您可以从以下链接下载 2.033.20 版本：

[下载袖珍 Wifi 固件](https://github.com/simatec/ioBroker.solax/raw/master/docs/files/618.00122.00_Pocket_WIFI_V2.033.20_20190313.usb.zip)

必须解压缩 zip 文件，并且必须选择扩展名为“.usb”的文件。<br>现在您可以开始降级，大约 20-30 秒后您会收到一条消息，提示更新成功，棒将重新启动。

成功重启后，您现在可以通过 IP 地址为 `5.8.8.8` 的热点或通过网络中的本地 IP 访问 WiFi 棒。

在连接适配器之前，请再次检查是否降级成功，是否安装了正确的固件。
幸运的是，该棒不会执行自动固件升级，并且在 2.033.20 版本中功能齐全。

必须在适配器中输入本地 IP 地址（不是热点 IP）和 Web 界面的密码，您现在可以对您的逆变器进行本地分析，精确到秒

**************************************************************************************************************

### 什么是 Sentry.io 以及向该公司服务器报告的内容？
Sentry.io 是一项服务，供开发人员从他们的应用程序中获取有关错误的概览。正是在这个适配器中实现了这一点。

当适配器崩溃或发生其他代码错误时，此错误消息也会出现在 ioBroker 日志中，并提交给 Sentry。当您允许 iobroker GmbH 收集诊断数据时，您的安装 ID（这只是一个唯一的 ID **没有**关于您、电子邮件、姓名等的任何其他信息）也包括在内。这允许 Sentry 对错误进行分组并显示有多少唯一用户受到此类错误的影响。所有这些都有助于我提供基本上不会崩溃的无错误适配器。

**************************************************************************************************************

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
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

Copyright (c) 2021 - 2023 simatec

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