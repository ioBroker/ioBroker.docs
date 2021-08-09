---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.bosesoundtouch/README.md
title: ioBroker.bosesoundtouch
hash: EQkIheOfB3+GIXK55QxZ1pS+XER1FIKvlwMEdpzYPWY=
---
![标识](../../../en/adapterref/iobroker.bosesoundtouch/admin/bosesoundtouch.png)

![安装数量](http://iobroker.live/badges/bosesoundtouch-installed.svg)
![新产品管理](https://nodei.co/npm/iobroker.bosesoundtouch.png?downloads=true)

# IoBroker.boseoundtouch
适用于 ioBroker IoT 平台的 Bose SoundTouch 适配器

## 控制状态
要控制扬声器，可以编写以下对象：

|状态 |说明 |
| :---           | :---        |
|键 |要发送的以下键之一：<br><br>玩<br>暂停<br>停止<br>PREV_TRACK<br>下一条轨道<br>竖起大拇指<br>不看好<br>书签<br>力量<br>沉默的<br>提高音量<br>音量减小<br>预设_1<br>预设_2<br>预设_3<br>预设_4<br>预设_5<br>预设_6<br>辅助输入<br>SHUFFLE_OFF<br> SHUFFLE_ON<br> REPEAT_OFF<br> REPEAT_ONE<br> REPEAT_ALL<br> PLAY_PAUSE<br>添加_收藏夹<br>REMOVE_FAVORITE<br> INVALID_KEY |
|静音 |将设备静音或取消静音。 |
|上 |打开或关闭设备。 |
|到处玩|将扬声器定义为区域主控并在所有其他扬声器上播放其内容。 |
|音量 |在 0 到 100 之间更改设备音量。 |

## 信息状态
以下信息是从您的扬声器收集的（只读状态）：

＃＃＃ 设备信息
|状态 |说明 |
| :---       | :---        |
| ip地址 |设备 IP 地址，通常与您在适配器设置中配置的相同。 |
| mac地址 |设备MAC地址|
|姓名 |您使用 SoundTouch 应用程序配置的名称。 |
|类型 |设备类型（例如 SoundTouch 300）。 |

### 正在播放
|状态 |说明 |
| :---       | :---        |
|专辑 |当前播放的专辑。 |
|艺术 |源艺术的 URL。 |
|艺术家 |当前播放的艺术家。 |
|流派|当前播放曲目的类型。 |
|来源 |正在播放的服务的类型或名称。要确定产品是否处于待机模式，请检查 source == STANDBY。 |
|站 |电台或播放列表名称。 |
|跟踪|当前播放的曲目。 |

###预设
6 个可用预设中的每一个都有以下状态：

|状态 |说明 |
| :---       | :---        |
|图标网址 |源艺术的 URL。 |
|姓名 |专辑、电台、播放列表、歌曲、电话等名称取决于来源。 |
|来源 |服务的类型或名称。 |

### 区域
以下说明将帮助您使用多房间系统创建群组。只读字段由 soundtouch 设备自动更新，如果您通过 Soundtouch 应用程序本身更改组也是如此。

|状态 |说明 |
| :---       | :---        |

|大师|显示扬声器从机的MAC地址（以“;”分隔）（只读）|会员|显示此音箱主控的MAC地址（只读）| addMasterOf|添加您要添加到此主扬声器的扬声器的 MAC 地址。也可以放置不止一个扬声器（用“;”分隔）。
|移除MasterOf|添加要从此主扬声器中删除的扬声器的 MAC 地址。也可以放置不止一个扬声器（用“;”分隔）。

## Changelog

### 0.10.0 (2021-07-30)
* IMPORTANT: The adapter now requires at least js-controller 2.0
* (Apollon77) Optimize for js-controller 3.3

### 0.9.4 (07.05.2021)
* fixed vulnerability in NPM

### 0.9.3 (02.02.2021)

* transfer of adapter to iobroker-community-adapters

### 0.9.3 (10.01.2021)

* Added elapsed time, duration, status, keys and roles

### 0.9.2 (09.12.2019)

* We don't use adapter.objects anymore

### 0.9.1 (12.05.2019)

* Support for compact mode.
* Fixed bugs found by adapter checker.

### 0.9.0 (23.01.2019)

* Added possibility to change the source.  
  All available sources are listed as states in folder sources and can be used as play buttons.

### 0.2.4 (05.05.2019)

* Core Files/Testing Update and introduce adapter-core

### 0.2.3 (11.11.2018)

* fixed issue #24 "does not start"

### 0.2.2 (03.11.2018)

* Zones: objects moved to sub folder 'zones'

### 0.2.1 (12.10.2018)

* Update now playing info for source Deezer

### 0.2.0 (27.09.2018)

* Add support for zones

### 0.1.9 (07.03.2018)

* Update now playing info for source Amazon

### 0.1.8 (08.02.2018)

* Update now playing info for source Spotify
* now playing: added state 'genre'

### 0.1.7 (04.02.2018)

* fixed crash if no presets are defined

### 0.1.6 (17.01.2018)

* fixed crash if socket connection fails
* added setting: time to reconnect in seconds

### 0.1.5 (06.01.2018)

* added 'TUNEIN' to now playing info
* state playEverywhere falls back to false after activation
* admin/bose.png renamed to admin/bosesoundtouch.png to be shown correctly in adapter list
* added short adapter description in io-package.json

### 0.1.4 (30.12.2017)

* playEverywhere: support multi room (zones) to define one speaker as master for all others

### 0.1.3 (22.12.2017)

* revert last change

### 0.1.2 (22.12.2017)

* fixed typo in package.json

### 0.1.1 (20.12.2017)

* now playing: added state 'art' (URL to cover image if available)
* merged pull request from Apollon77 (basic config files for testing)
* renamed repository to 'ioBroker.bosesoundtouch'

### 0.1.0 (26.11.2017)

* objectChange/stateChange: log level 'debug'
* added 'STORED_MUSIC' to now playing info.

### 0.0.9 (22.11.2017)

* Merge pull request #1 from Apollon77/master: Add testing and fix things...

### 0.0.8 (19.11.2017)

* send value to correct instance when having multiple adapters installed
* first version of README.md

### 0.0.7 (09.11.2017)

* fixed logging in soundtouchsocket.js

### 0.0.6 (09.11.2017)

* renamed main.js to bosesoundtouch.js
* line ending: LF
* strings: single quote

### 0.0.5 and earlier (01.11.2017)

* Initial versions

## License

[The MIT License (MIT)](LICENSE)

Copyright (c) 2019-2021 SwedishChef <swedish.chef@gmx.at>