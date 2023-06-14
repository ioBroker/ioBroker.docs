---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.worx/README.md
title: ioBroker.worx
hash: Ol2vkPFqs9qkriLlPG0oWXLVC/aQEMmYbyvPCkshdVc=
---
![标识](../../../en/adapterref/iobroker.worx/admin/worx.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.worx.svg)
![下载](https://img.shields.io/npm/dm/iobroker.worx.svg)
![安装数量](https://iobroker.live/badges/worx-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/worx-stable.svg)
![NPM](https://nodei.co/npm/iobroker.worx.png?downloads=true)

#ioBroker.worx
**测试：** ![测试和发布](https://github.com/iobroker-community-adapters/ioBroker.worx/workflows/Test%20and%20Release/badge.svg)

## IoBroker 的 Worx（Kress、Landxcape 和 Ferrex）适配器
通过云和 mqtt 进行控制

此适配器通过云将 ioBroker 与您的 Landroid Kress Landxcape 或 Ferrex 割草机连接起来。
从割草机中读取温度、割草时间、电池电量和各种其他数据。
适配器可以控制割草机，您可以更改割草时间等配置参数。

最低节点版本 14.18

activityLog das Aktivitätenprotokoll aus der App areas Die Areas des Mähers calendar Der Mähkalender des Mähers modules Die verbauten Modules des Mähers mower Aufbereite Informationen des Mähers sowie Steuerung des Mähers product Produktinformationen zum Mäher rawMqtt dieRohaten die via MQTT vom Mäher kommen worx.0。 xx.割草机.firmware_available -> Verfügbare Firmware worx.0.xx.mower.firmware_available_date -> letzten Firmware worx.0.xx.mower.firmware_available_all 的数据更新 -> Firmware 历史 als JSON Update der Daten 24H worx.0.xx.product - > Informationen von eurem Mower welche Features, Board und Accessories 呃帽子。
更新 der Daten einmalig nach einem Neustart/Restart worx.0.xx.activityLog.last_update -> Letzte Aktualisierung worx.0.xx.activityLog.payload -> Alle Aktivitäten der letzten 8 Tage als JSON

## 设置
- 从配置中的 worx 帐户连接到割草机，输入电子邮件和密码。
- 切边延迟：如果切边从曲线或弯道开始，割草机可能会丢失电线并因故障而停止，或者刀片可能不会旋转。为此，可以设置叶片开始旋转的起点。
- Mäher ab eine Zone oder Meterzahl starten lassen：

设置 areas.area_0 auf die Meterzahl des gewünschten Startpunktes Setze areas.area_1, areas.area_2 und areas.area_3 jeweils auf 0 Setze areas.startSequence auf [0,0,0,0,0,0,0,0,0,0 ]

## 安排 setzen：
wochentagname/borderCut wochentagname/startTime wochentagname/workTime

Danach ein Timeout von 1,1 Sek。 und worx.0.xxxxxxxxxxx.calendar.calJson_tosend auf true setzen。
在 dieser Zeit darf natürlich nicht automatisch ein Update kommen 中，da die geänderten Zeiten wieder glöscht werden。 Wenn das zu oft vorkommt, dann muss ich leider einen weiteren Datenpunkt hinzufügen der Updates von MQTT 或 10 分钟刷新未绑定。

Das gleich gilt natürlich auch für diese: mower.oneTimeWithBorder mower.oneTimeWorkTime

Und dann nach 1,1 Sek。 worx.0.xxx.mower.oneTimeStart setzen

## 讨论与提问
<https://forum.iobroker.net/topic/4834/adapter-worx-landroid/>

**此适配器使用哨兵库自动向开发人员报告异常和代码错误。**有关更多详细信息和如何禁用错误报告的信息，请参阅[哨兵插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用哨兵报告。

## Changelog

### 2.1.3

Add ping option in the instance settings",

### 2.1.2

Improve reconnection for multiple mower

### 2.1.1

Change reconnection times

### 2.1.0

Move Calendar setState to one Json and other fixes to prevent blocking because of too many sending requests
Verschieben des Calendar in eine Json und andere Verbesserung, um ein 24h Block zu verhindern, der passiert wenn zu viele Anfragen gesendet werden.

### 2.0.3

Add manual refresh. Fix empty status and firmware format. Reduce info logs.

### 2.0.1

Adapter rewritten. Added product info and activity log. rawMqtt values improved and compatible with Node v18.

### 1.7.0 (2022-09-28)

-   (TA2k) fix login

### 1.6.6 (2022-06-25)

-   (MeisterTR) fix edgecut

### 1.6.5 (2022-06-19)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions also on second place

### 1.6.4 (2022-06-18)

-   (Apollon77) Remove logic to set a 0/0/0 nutrition level when deactivated again as it was in pre 1.6 versions
-   (Apollon77) fix error cases reported by Sentry

### 1.6.3 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.2 (2022-06-17)

-   (TA2k) fix issues introduced in 1.6.0

### 1.6.1 (2022-06-17)

-   (Apollon77) fix some error cases reported by Sentry

### 1.6.0 (2022-06-16)

-   (Apollon77) fix some error cases reported by Sentry

### 1.5.5 (2021-09-29)

-   (MeisterTR) fix error

### 1.5.0 (2021-09-26)

-   (MeisterTR) many fixes
-   (MeisterTR) add torque control
-   (MeisterTR) fixed States

### 1.4.3 (2021-07-25)

-   (MeisterTR) fix Partymode detection

### 1.4.2 (2021-07-24)

(MeisterTR) fix bug with OLMSwitch_Cutting
(MeisterTR) fix bug with PartyMode
(TA2k) fix error with wrong serialnumber (please delete all objects manually)
(MeisterTR) fix bug in autolock function

### 1.4.1 (2021-07-06)

-   (MeisterTR) fix bug in sendCommand (please remove state manually)

### 1.4.0 (2021-07-05)

-   update testing
-   add gps coordinates
-   add new status states
-   add new Autolock states
-   add new OffLinits states

### 1.3.7 (03.06.2021)

-   (TA2k) type fixes

### 1.3.6 (27.05.2021)

-   (MeisterTR) bugfixes
-   (MeisterTR) better errorhandling

### 1.2.9 (02.12.2020)

-   (MeisterTR) add sentry
-   (MeisterTR) Bugfix (error type of sc... again) (IOBROKER-WORX-3)

### 1.2.4 (15.11.2020)

-   (MeisterTR) Bugfix (error type of sc...)
-   (MeisterTR) change Testing to git

### 1.2.3 (29.08.2020)

-   (MeisterTR) add option to crate a Json Obj to set mowtime with scripts
-   (MeisterTR) add option to disable weather
-   (MeisterTR) add double Shedule, oneTimeShedule, PartyMode
-   (MeisterTR) fix setIntervall => setTimeout
-   (MeisterTR) fix error with Meter and Min. in Config
-   (MeisterTR) add Kress and Landxcape

### 1.0.0 (03.12.2019)

-   (MeisterTR) bump Version
-   (MeisterTR) transfer to community

### 0.4.0 (03.08.2019)

-   (MeisterTR) fix multimower
-   (MeisterTR) change loglevel
-   (MeisterTR) fix online Status

### 0.3.1 (12.06.2019)

-   (MeisterTR) add delay for edgecut in config
-   (MeisterTR) fix mowtime error

### 0.2.0 (01.06.2019)

-   (MeisterTR) add border
-   (MeisterTR) fix small errors
-   (MeisterTR) code cleanup

### 0.0.1

-   (MeisterTR) initial release

## License

MIT License

Copyright (c) 2022 TA2k <tombox2020@gmail.com>

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