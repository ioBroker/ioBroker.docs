---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.enigma2/README.md
title: ioBroker enigma2
hash: CMhfYP3QyUUKiVNuORpPGTP5bZbsc8c3fhhCmrAFUBI=
---
![标识](../../../en/adapterref/iobroker.enigma2/admin/enigma2.png)

![NPM版本](http://img.shields.io/npm/v/iobroker.enigma2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.enigma2.svg)
![国家公共管理](https://nodei.co/npm/iobroker.enigma2.png?downloads=true)

----

# IoBroker enigma2
- ioBroker 的适配器，用于从 enigma2 接收器检索信息并发送命令
-（适配器仅在一台主机上运行！使用客户端安装目前仍然存在问题。）

- (DE) 适配器用于 ioBroker um Informationen von einem enigma2 Receiver abzufragen und Befehle zu senden
- (DE)（适配器 läuft nur auf einem Host！bei einer 客户端安装 gib 的 aktuell noch 问题。）

## 论坛
[![ioBroker](https://forum.iobroker.net/assets/uploads/system/site-logo.png)](https://forum.iobroker.net/topic/25112/enigma2-adapter-ab-v1-2-3)

----

### 功能
- BOX_IP
- 网络
- CHANNEL_SERVICEREFERENCE
- CHANNEL_SERVICEREFERENCE_NAME
- 渠道
- 活动描述
- 活动持续时间
- EVENTDURATION_MIN
- 剩余活动
- EVENTREMAINING_MIN
- EVENT_PROGRESS_PERCENT
- EVENT_TIME_START
- EVENT_TIME_END
- EVENT_TIME_PASSED
- 硬盘容量
- HDD_FREE
- MESSAGE_ANSWER
- 模型
- 静音
- 节目
- 程序_信息
- PROGRAMM_AFTER
- PROGRAMM_AFTER_INFO
- 支持
- 体积
- WEB_IF_VERSION
- 正在录音
- 定时器已设置
- MOVIE_LIST（仅限 openwebif）
- 定时器列表
- CHANNEL_PICON（Picon 路径 - 仅 openwebif）

----

＃＃＃ 主要的
- enigma2-连接

----

＃＃＃ 命令
- 命令.CHANNEL_DOWN
- 命令.CHANNEL_UP
- 命令.DOWN
- 命令.UP
- 命令.EPG
- 命令.退出
- 命令.LEFT
- 命令.MENU
- 命令.MUTE_TOGGLE
- 命令.确定
- 命令.暂停
- 命令.PLAY
- 命令.RADIO
- 命令.REC
- 命令.远程控制
- 命令.RIGHT
- 命令.SET_VOLUME
- 命令.STANDBY_TOGGLE
- 命令.STOP
- 命令.TV
- 命令.UP
- 命令.VOLUME_DOWN
- 命令.VOLUME_UP
- command.ZAP = 发送无效的服务引用

----

### 主命令
- main_command.DEEP_STANDBY = 深度待机
- main_command.REBOOT = 重新启动
- main_command.RESTART_GUI = 重新启动 Enigma2 (GUI)
- main_command.STANDBY = 待机
- main_command.WAKEUP_FROM_STANDBY = 从待机状态唤醒

----

＃＃＃ 信息
 - Message.Text = 消息文本（输入 -> 发送）
 - Message.Type = 0 到 3 之间的数字（0= 是/否；1= 信息；2=消息；3=注意）
 - Message.Timeout = 消息超时（以秒为单位）。可以为空或消息消失后的秒数。

----

### Alexa_Command
 - Alexa_Command.Mute = Alexa 命令
 - Alexa_Command.Standby = Alexa 命令

----

 ＃＃＃ 发给
####（在 Blockly 中）
 - 消息 = 消息文本
 - msgType = 0 到 3 之间的数字（0= 是/否；1= 信息；2=消息；3=注意）
 - 超时 = 消息超时（以秒为单位）。可以为空或消息消失后的秒数。

![图片文字](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message2.png)

### 或 ![图片文字](../../../en/adapterref/iobroker.enigma2/admin/enigma2_message.png)
[> zum 块导入 <](admin/Blockly_Import.md)

####（在java中）
```
sendTo("enigma2.0", "send", {
   "message": 'Test Nachricht', /* Text of Message */
   "timeout": 26,               /* timeout of Message in sec. (Can be empty or the Number of seconds the Message should disappear after.) */
   "msgType": 1                 /* Number from 0 to 3 (0= Yes/No ; 1= Info ; 2=Message ; 3=Attention) */
});
```

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 2.0.2 (2023-08-17)
* (Lucky-ESA) Bugfixes: [#61](https://github.com/Matten-Matten/ioBroker.enigma2/issues/61)
* (Lucky-ESA) Bugfixes: undefined e2eventlist
* (bluefox) Added json config
* (mcm1957) Adapter now requires node 16

### 1.5.0 (2023-05-05)
* (mcm1957) The adapter has been moved into iobroker-community-adapters organisation
* (mcm1957) changed: Testing has been added and changed to support node 16, 18 and 20
* (mcm1957) changed: Dependencies have been updated
* (mcm1957) changed: issues reported by adapter-checker have been fixed (#15)

### 1.4.0 (2022-04-11)
* (foxriver76) compatibility to js-controller v5

### 1.3.3 (2021-06-07)
* (TDCroPower)          Bugfixes: [#48](https://github.com/Matten-Matten/ioBroker.enigma2/issues/48)

### 1.3.2 (2020-08-22)
* (Matten-Matten)       add: `.command.VOLUME_UP` & `.command.VOLUME_DOWN`([#41](https://github.com/Matten-Matten/ioBroker.enigma2/issues/41))

### 1.3.1 (2020-08-20)
* (Matten-Matten)       correction in `.enigma2.Timer_is_set` & `.enigma2.isRecording` with login handling

### 1.3.0 (2020-02-08)
* (Matten-Matten)       add: `connectionType` and `dataSource` in `io-package.json`
* (Matten-Matten)       bugfix: in `.enigma2.CHANNEL_PICON`

### 1.2.9 (2019-12-10)
* (Scrounger)           bugfix: Movielist generates high load [#33](https://github.com/Matten-Matten/ioBroker.enigma2/issues/33)
* (Matten-Matten)       bugfix: Blockly [#31](https://github.com/Matten-Matten/ioBroker.enigma2/issues/31)

### 1.2.8 (2019-11-30)
* (Matten-Matten)       add: `.enigma2.CHANNEL_PICON` (Picon path - only openwebif)
* (Matten-Matten)       add: Select / Deselect Timer List in the Adapter Config mask
* (Matten-Matten)       add: Select / Deselect Movie List in the Adapter Config mask
* (Matten-Matten)       add: new Logo

### 1.2.7 (2019-11-30)
* (Matten-Matten)       correction in (Blockly Block) to sending Messages

### 1.2.6 (2019-11-29)
* (Matten-Matten)       add: `sendTo` (Blockly) to sending Messages
* (Scrounger)           add: `.enigma2.MOVIE_LIST`

### 1.2.5 (2019-11-17)
* (Scrounger)           add: `.enigma2.Timer_list` [#25](https://github.com/Matten-Matten/ioBroker.enigma2/issues/25) (Merge pull request [#28](https://github.com/Matten-Matten/ioBroker.enigma2/issues/28))

### 1.2.4 (2019-10-20)
* (Matten-Matten)       add: `.enigma2.Timer_is_set` ([#23](https://github.com/Matten-Matten/ioBroker.enigma2/issues/23))

### 1.2.3 (2019-09-15)
* (Matten-Matten)       authentication correction in `.enigma2.isRecording` check
* (Matten-Matten)       correction in `.enigma2.isRecording` check after shutdown

### 1.2.2 (2019-09-05)
* (Matten-Matten)       correction in `.enigma2.isRecording` check

### 1.2.1 (2019-08-07)
* (Matten-Matten)       add: `.enigma2.isRecording` ([#12](https://github.com/Matten-Matten/ioBroker.enigma2/issues/12))

### 1.2.0 (2019-05-14)
* (Matten-Matten)      ([#17](https://github.com/Matten-Matten/ioBroker.enigma2/issues/17)) `.Alexa_Command.Mute` & `.Alexa_Command.Standby` now with status feedback
* (Matten-Matten)       add: `.enigma2.EVENT_TIME_PASSED`

### 1.1.9 (2019-02-04)
* (Matten-Matten)      (#14) add enigma2.EVENTDURATION_MIN in Minute
* (Matten-Matten)      (#14) add enigma2.EVENTREMAINING_MIN in Minute
* (Matten-Matten)      Troubleshooting in standby toggle
* (Matten-Matten)      Troubleshooting in the "eventlist" query

### 1.1.8 (2019-01-10)
* (Matten-Matten)      enigma2.EVENTDURATION decoded in H:M:S
* (Matten-Matten)      enigma2.EVENTREMAINING decoded in H:M:S

### 1.1.7 (2019-01-09)
* (Matten-Matten)      enigma2.EVENT_PROGRESS_PERCENT
* (Matten-Matten)      enigma2.EVENT_TIME_START
* (Matten-Matten)      enigma2.EVENT_TIME_END

### 1.1.6 (2018-11-18)
* (Matten-Matten)      command.ZAP (send an invalid servicereference)

### 1.1.5 (2018-11-17)
* (Matten-Matten)      add Alexa_command

### 1.1.4 (2018-11-16)
* (Matten-Matten)      add main_command

### 1.1.3 (2018-11-15)
* (Matten-Matten)      remove Timer

### 1.1.2 (2018-11-01)
* (Matten-Matten)      Bug Fix

### 1.1.1 (2018-10-26)
* (NightWatcher)      CodeCleaning

### 1.1.0 (2018-10-26)
* (Matten-Matten)      add Timer, max 8 Timer
* (Matten-Matten)      add manually updating Timer states
* (Matten-Matten)      optimizations 
* (Matten-Matten)      auto Check HDD (max.2 HDD)
* (Matten-Matten)      add manually updating Enigma2 states
* (Matten-Matten)      read the device information only at the adapter start
* (Matten-Matten)      fixed hard disk (HDD) update Time every 30 sec.

### 1.0.0 (2018-10-23)
* (Matten-Matten)      add command.REMOTE-CONTROL
* (Matten-Matten)      Message optimized
* (Matten-Matten)      Command-Button integrated (no extra script needed!)

### 0.4.3 (2018-10-21)
* (Matten-Matten)      Nicht bestätigte Werte und zustände (rot angezeigt) angepasst
* (Matten-Matten)      Message um ein Objekt erweitert "ANSWER_IS"
* (Matten-Matten)      Button BUTTON SCRIPT auf V3.4 angepasst

### 0.4.2 (2018-10-05)
* (Matten-Matten)      Button Probleme bei Dreamwebif angepasst
* (Matten-Matten)      Button BUTTON SCRIPT auf V3.1 angepasst

### 0.4.1 (2018-09-21)
* (Matten-Matten)      Button werden gelöscht wenn in der Config "BUTTON SCRIPT" deaktiviert wird
* (Matten-Matten)      Alexa (Mute,Standby)

### 0.3.3 (2018-09-20)
* (Matten-Matten)      Message senden hinzugefügt
* (Matten-Matten)      Message answer (true/false) hinzugefügt
* (Matten-Matten)      Message.Question_Activ hinzugefügt

### 0.3.0 (2018-08-19)
* (Matten-Matten)      enigma2-CONNECTION hinzugefügt
* (Matten-Matten)      Update Configurationsmaske
* (Matten-Matten)      Update ENIGMA 2 BUTTON SCRIPT V2.0 (nur noch manuell die Adapter Instanz im Script festlegen)

### 0.2.3 (2018-08-17)
* (Matten-Matten)      Admin V3.51

### 0.2.2 (2018-05-12)
* (Matten-Matten)      Button hinzugefügt

### 0.2.1 (2018-03-22)
* (Matten-Matten)      Fehlerbehebung in der HDD Abfrage

### 0.2.0 (2018-03-22)
* (Matten-Matten)      keine Fehlermeldung mehr wenn Box in DeepStandby
* (Matten-Matten)      Erweiterung (PROGRAMM_AFTER ; PROGRAMM_AFTER_INFO ; WEB_IF_VERSION ; NETWORK) hinzugefügt

### 0.1.0 (2018-03-21)
* (Matten-Matten)      installierbar

### 0.0.11 (2018-03-19)
* (Matten-Matten)                  Adapterkonfigurationsmaske (für Admin3) überarbeitet
* (wendy2702 & Matten-Matten)      Admin3

### 0.0.10 (2018-03-19)
* (Matten-Matten)  Umstellungsversuch Admin3

### 0.0.9 (2018-02-07)
* (Matten-Matten)  Kategorie geändert
* (Matten-Matten)  Abfrage Werte sind nur noch lesbar nicht mehr beschreibbar.

### 0.0.8 (2017-11-25)
* (Matten-Matten)  Fehlerbehebung in HDD Abfrage
* (Matten-Matten)  Fehlerbehebung wenn Box Heruntergefahren (nicht erreichbar)
                    jetzt nur noch mit: info	received error: connect ECONNREFUSED 192.168. ...
* (Matten-Matten)  Konfigurations-Maske vereinfacht

### 0.0.7 (2017-09-20)
* (Matten-Matten) add Fehlerbehebung in der MUTED Abfrage

### 0.0.6 (2017-09-19)
* (Matten-Matten) add Erweiterung der Adapterkonfiguration

### 0.0.5 (2017-09-18)
* (Matten-Matten) add grafische Optimierung der Adapterkonfiguration

## License
MIT License

Copyright (c) 2023 iobroker-community-adapters

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