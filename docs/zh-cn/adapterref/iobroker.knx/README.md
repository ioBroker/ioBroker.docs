---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.knx/README.md
title: ioBroker.knx
hash: yAp86KmeXQAQiaNEOn928YYT8VWxt8WjMp8pT/XXcVo=
---
![商标](../../../en/adapterref/iobroker.knx/admin/knx.png)

![NPM 版本](http://img.shields.io/npm/v/iobroker.knx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.knx.svg)
![新产品管理](https://nodei.co/npm/iobroker.knx.png?downloads=true)

# IoBroker.knx
＃＃ 描述
如：[Установка и базовая настройка адаптера](doc/ru/readme.md)

en: 此适配器允许从 ETS 导入 knxproj 文件。它生成 KNX-group 地址和 ioBroker 之间的转换，并将设备放入房间（尤其是 MobileUI）。

它连接到标准 KNX/LAN 网关。

开始之前： com.Objects 的每个 DPT 都应该在您的 ETS 项目中设置。每个设备都应分类到您的设施结构中。

＃＃ 特征：
* 导入 `knxproj` 文件
* 生成类似 ETS 的对象结构
* 寻找并结合行为通道和状态通道（启发式）
* 在开始时更新所有状态
* 向 KNX-Bus 发出 READ，同时写入状态对象
* 将通道分类到房间

## 适配器配置
安装此适配器后，打开适配器配置。填写：

### KNX 网关 IP
<您的 KNX/Lan GW 的 IP> 使用 IPv4 格式

＃＃＃ 港口
这通常是端口 3671。

###物理。欧洲投资银行地址
填写免费 phys。地址对应于您的 KNX 架构，**但不是您的 KNX 网关的地址！** 不得以 0 结尾！

### 调试级别
扩展适配器的输出电平以进行调试。

### 上传 knxproj
您可以在此处以 `knxproj` 格式上传您的 ETS 导出。

成功导入后，会出现一个对话框，显示导入对象的数量。现在按“保存并关闭”，适配器应该会启动。
在启动时，适配器读取带有 read-Flag 的所有组地址。这可能需要一段时间，并且会在您的 KNX 总线上产生高负载。但是您的 vis 中的值会在启动后更新。

### 对象
这是 knx.0 下的组地址树，就像您的 ETS 项目中一样。

### 枚举
如果您的 ETS 中有带有相应设备的建筑结构，则会在此处显示。在“成员”下是从该组中带有发送标志的设备中列出的组地址的名称。

＃＃＃ 用法
如果适配器成功启动，您的数据点将可用于您喜欢做的任何事情。

### 数据点类型
所有符合 KNX 协会“系统规范、互通、数据点类型”的 DPT 均可用。这意味着您可以获得两种类型的信息：1) 值或字符串 2) 逗号分隔值或值数组（目前我不知道什么是更好的处理方式）

例如，DPT5.001 被编码为 8 位无符号整数。这给出了一个单一的值。 DPT3.007（控制调光）编码为 1Bit(Boolean)+3Bit(unsigned Int)。
这导致例如在像“0,5”这样的值中，其中“0”表示“减少”，“5”表示间隔数。

## Wie werden die Datenpunkte generiert (Deutsch)
### 1) Auslesen aller Kommunikationsobjektreferenzen (im folgenden KOR)
Dabei werden den Gruppenaddressreferenz (im folgenden GAR) ID der jeweilige DPT der KOR zugeordnet，wenn er vorhanden ist。 Ausserdem bekommt der erste Eintrag die 属性 write=yes 和 read=no。 Alle darauf folgenden GAR ID 的 bekommen nur den DPT zugeordnet

### 2) Erzeugen der Gruppenadressstruktur (im folgenden GAS)
Hier wird die GAS anhand der GAR IDs erzeugt und ebenfalls die DPTs zugeordnet，falls dies unter 1) noch nicht geschehen ist。

### 3) Herausfinder der Schalt- 和 Statusaddressen
In dem ETS-Export sind die Schalt- und Statusadressen nichthinterlegt。 Somit führe ich eine Ähnlichkeitsprüfung aller Gruppenadressnamen durch mit der Auswertung auf status und state。
Wird ein Pärchen gefunden, dessen Ähnlichkeit mehr als 90% beträgt, dann wird angenommen, dass die GA1 die Schaltadresse und GA2 die Statusadresse ist。大北erhält GA1 das write=true und read=false und GA2 das write=false und read=true。
Außerdem werden die DPT aus der jeweilig korrespondierenden GA。 Aus diesem Grundist es schwierig, Pärchen zu finden, wenn die Gruppenadressbeschriftungen nicht konsistent sind。

Weiterhin werden die den Gerätekonfigurationen betrachtet 中的旗帜。 Dabei werden die Flags wie folgt umgesetzt:

| KNX | | |经纪商| | |
|-------|-----------|------------|----------|----------|-------------------------------------------------|
|莱森 |施赖本 |超原 |莱森 |施赖本|重要信息 |
| - | - | - | - | - | der wert wird über GroupValueResponse aktualiesiert |
| × | - | - | × | × | ein 触发器 darauf löst GroupValueRead aus|
| - | × | - | - | × | Schreibt denanggegeben Wert mit GroupValueWrite auf den KNX-Bus|
| - | - | × | × | - | der Wert wird über GroupValueResponse aktualisiert |
| × | - | × | × | × | ein 触发器 darauf löst GroupValueRead aus|

### 4) Erzeugen der Datenpunktpaare (im folgenden DPP)
Ein DPP wird erzeugt、wenn die GA、GAR und der DPT 有效信件。 Mitdiesen DPP arbeitet der Adapter。 Fehlen 也是 einer GA 中的 DPT，wei er auf keiner der o。 A. Wege gefunden werden konnte, so wird für diese GA kein DPP erzeugt und sie ist im Weiteren nicht nutzbar。

Im Idealfall werden somit für einen Schaltkanal 2 DPP erzeugt。 Das erste ist das Schalten。在diesemist die GAR ID des Status DPPhinterlegt。 Das zweite ist dann das Status DPP ohne weitere Referenz。

## Beim Start des Adapters
Alle mit dem Lesen-Flag markierten DPP werden beim Start abgefragt。 Dies verursacht u.U. eine höhere Buslast und dauert einen 时刻。 Im Anschluss sind aber alle aktuellen Werte verfügbar。

##（隐藏）特点：
Durch senden eines Wertes auf eine Statusadresse werden die Kommunikationsobjekte innerhalb dieser Gruppenadresse per GroupValueRead abgefragt。

### Vermeidung von Problemen
1) saubere ETS Programmierung und saubere ETS Programmierung und saubere ETS Programmierung

* zuweisen der DPTs！！
* einheitliche Beschriftung der GA-Namen（z.B“EG Wohnen Decke Licht schalten”和“EG Wohnen Decke Licht schalten status”）
* Vermeidung von Sonderzeichen ",./;\&%$§[]" (kann zu Problemen bei der Erzeugung der GAS führen)

2) Prüfen ob das KNX/LAN GW erreichbarist。 Wenn es das nicht ist, versucht der Adapter sich kontinuierlich zu verbinden。

3) Physikalische Adresse richtig wählen ( wichtig beim Einsatz von Linienkopplern )。 ！！！ ACHTUNG: 网络物理地址网络网关地址网络网关和 darf nicht auf 0 enden !!!

4) Der Port der LAN Schnittstelle ist i.d.R. 3671

5) Durch die Möglichkeit der Statusabfrage ist eines zu beachten：Es ist sicherzustellen, dass nicht mehr als 40 Anfragen pro Sekunde vom ioBroker generiert werden, denn diese können dann physikalisch beditrerget necken.

##计划功能
* 将地址添加到对象描述 (id)
* 选择性导入 knx-project
* 需要节点版本 >8.9.4！

## Changelog
### 1.0.45 (2021_03_22)
* import of ETS v5.7.5 projects

### 1.0.44 (2021_01_22)
* fixed act and state handling
* added some new datapoint types
* fix facility and room recognition and device allocation

### 1.0.42 (2020_09_03)
* Fixed problem with missing index_m.html

### 1.0.41
* fixed bug on GroupValue_Response event
* corrected connection to Gira GW

### 1.0.40
* fixed some import errors for ETS 5.7.x
* fixed bug on GroupValue_Response event

### 1.0.39
* fixed import error

### 1.0.38
* fixed some bugs on import
* show warning if import-file ist password protected

### 1.0.37 (2010-01-31)
* update for ETS 5.7.3 import

### 1.0.36 (2019-10-16)
* some bugs fixed 

### 1.0.35 (2019-09-15)
* fixed permanent reconnects, if no traffic on knx-bus

### 1.0.34 (2019-09-15)
* changes on importer for detecting project-id

### 1.0.33 (2019-09-12)
* fixed bug while writing to bus
* added units to states
* fixed "read/write of undefined" error

### 1.0.32 (2019-09-03)
* updated importer for ETS V5.7.2, some changes in KNX-stack state-machine

### 1.0.31
* some fixes on ETS5.7.2 importer
* small changes in knx-stack statemachine
* added (again) phys address to admin config dialog

### 1.0.31
* fixed bug in deviceTree generation

### 1.0.30
* new Importer for ETS5.7.2 knxproj files
* extended accepted Data point types
* new adapter configuration menu
* implemented a switch for the user to decide to use "true" and "false" or "0" or "1" for binary values
* fixed bug in GroupValue_Read
* implemented a selector for local network interface for KNX to Gateway communication
* extended State Object for later features
* fixed some small other bugs

### 1.0.20
* fixed bug in handling KNX-data packages, which occurs periodical reconnects
* fixed bug in KNX-project file upload procedure

### 1.0.19
* reverted to true/false handling for DPT1.x

### 1.0.18
* fixed upload issue with ETS5.6.x project files
* switched values for "boolean" from 1 and 0 to true false 
* fixed recognition of role set for DPT1.x to switch
* fixed DPT16.xxx writing to KNX-Bus with values < 14Byte

### 1.0.17 (2018-08-16)
* Better state processing
* Add configurable package rate
* corrected Bug in "import only new objects"

### 1.0.15 (2018-07-18)
* change ChID on reconnect
* on Startup read wait for response of State channel or timeout

### 1.0.13 (2018-07-04)
* elimination of special signs while importing
* small bug-fixes

### 1.0.12 (2018-06-19)
* reduced and sorted log output
* small bug-fixes
* NEW Feature: request State/Val of stateObject from KNX-Bus

### 1.0.11 (2018-05-27)
* fixed DPT1 correcting value problem
* fixed reconnect problem
* other small optimizations and fixes

### 1.0.10 (2018-05-04)
* closing local port in case of undefined connection state
* added advanced debug-level via adapter-config
* many fixes

### 1.0.9 (2018-04-29)
* changed to state-wise processing
* fixed "disconnect-request"
* changed connection handling with knxd
* many small fixes

### 1.0.8 (2018-04-04)
* modified package queue
* fixed ACK if sending to KNX-Bus
* many small fixes

### 1.0.7 (2018-03-16)
* fixed Adapter-lock while uploading projects

### 1.0.6 (2018-03-11)
* fixed connection problem
* corrected package counter

### 1.0.5 (2018-03-01)
* fixed empty objects, related to DPT1 (error message [object Object] unknown Input value)
* fixed path variable
* fixed bug with GA's containing a "/" in the name (on proj-import)
* start implementing crosswise property update on corresponding DPT (on proj-import)

### 1.0.4 (2018-02-27)
* schema update for room enumeration coming up with ETS 5.6

### 1.0.2 (2018-02-27)
* kleine Fehler beseitigt

### 1.0.1 (2018-02-26)
* fixed certificate error

### 1.0.0 (2018-02-25)
* substitution of used KNX-stack with own from scratch build stack
* implemented full scale of DPT according to "System Specifications, Interworking, Datapointtypes" from KNX Association
* hardening connection handling for tunneling connections
* upgrade Adapter-configuration Interface to be ready with Admin3
* removed "Delay Slider" because of the new knx-stack
* many other small changes
* fixed post-comma values to scale-value of DPT
* implemented "add" mode for knxproject upload (existing Objects stay as they are, only new Objects where added)

### 0.8.6 (2017-06-17)
* some small bug-fixes
* insert slider to set a sendDelay for slow KNX/LAN Gateways to prevent connection loss

### 0.8.5 (2017-06-05)
* project loader rebuild, dpt13-fix

### 0.8.3 (2017-04-24)
* added act channel update of corresponding state
* fix bug in state-vis update
* optimized knxproj upload

### 0.8.2 (2017-02-26)
* implemented device-config parsing from knxproj
* better choice of state/val of DP objects

### 0.8.1 (2017-02-06)
* fixed DPT1 switch problem

### 0.8.0 (2017-02-xx) comming soon

### 0.7.3 (2016-12-22)
* (chefkoch009) more DPT's are supported
* faster Startup
* implemented generation of room list with device dependencies

### 0.7.2 (2016-11-20)
* (chefkoch009) added necessary dependencies

### 0.7.1 (2016-11-19)
* (chefkoch009) Support standard KNX/LAN Gateways.

### 0.7.0 (2016-10-13)
* (chefkoch009) Support of project export

### 0.6.0 (2016-07-20)
* (chefkoch009) redesign

### 0.5.0
  (vegetto) include vis widget

#### 0.4.0
* (bluefox) fix errors with grunt

#### 0.2.0
* (bluefox) initial release

## License
The CC-NC-BY License (CC-NC-BY)

Copyright (c) 2016-2021 K.Ringmann <info@punktnetzwerk.net>

THE WORK IS PROVIDED UNDER THE TERMS OF THIS CREATIVE
COMMONS PUBLIC LICENSE ("CCPL" OR "LICENSE"). THE WORK IS PROTECTED BY
COPYRIGHT AND/OR OTHER APPLICABLE LAW. ANY USE OF THE WORK OTHER THAN AS
AUTHORIZED UNDER THIS LICENSE OR COPYRIGHT LAW IS PROHIBITED.

BY EXERCISING ANY RIGHTS TO THE WORK PROVIDED HERE, YOU ACCEPT AND AGREE
TO BE BOUND BY THE TERMS OF THIS LICENSE. TO THE EXTENT THIS LICENSE MAY
BE CONSIDERED TO BE A CONTRACT, THE LICENSOR GRANTS YOU THE RIGHTS
CONTAINED HERE IN CONSIDERATION OF YOUR ACCEPTANCE OF SUCH TERMS AND
CONDITIONS.

Read full license text in [LICENSE](LICENSE)