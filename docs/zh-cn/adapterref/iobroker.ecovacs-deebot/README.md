---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 适用于 ioBroker 的科沃斯 Deebot 适配器
hash: 713ZW7GDu30w1y02dO7S5QJvaboY7I2w0irmkat0788=
---
![标识](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![稳定版](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![最新版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![安装数量](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![每月下载量](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![下载次数](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# 适用于 ioBroker 的 Ecovacs Deebot 适配器
[![github-workflow](https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

该适配器使用[ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js)库。

＃＃ 特征
### 基本特征
* 清洁功能（例如自动、区域和自定义区域清洁）和各种其他基本功能（例如播放声音、重置耗材、重新定位）
* 检索信息（例如电池电量、清洁日志、耗材状态、清洁和充电状态）以及各种其他扩展信息（例如充电位置、地图相关信息）
* 设置吸尘器功率、水位和其他基本调整以及各种扩展设置（例如连续清洁、请勿打扰模式、音量、AIVI/TrueDetect 3D）
* 检索地图信息，包括区域、虚拟边界和禁止拖地区域，以及清洁过程中的信息（例如当前位置和区域）
* 加载当前地图图像

### 扩展功能（仅限 ioBroker 适配器）
* 保存并重新创建全套虚拟边界和无拖把区
* 有关每个区域最后出现的日期和时间的信息
* 返回充电站或进入/离开区域时的一些功能
* 保存上次使用的自定义区域并重新运行保存的区域
* 静音清洁和定位功能
* 设置单独的区域名称

＃＃＃ 重要笔记
* 某些功能（例如“静音接近”）仅适用于某些型号（主要是当前型号）
* 有些仍处于实验阶段（例如，“加载当前地图图像”、处理虚拟边界集）
* 不保证所有型号的适配器的功能（见下文）

＃＃ 楷模
### 支持的型号
以下模型是我自己拥有的，因此它们得到了广泛的支持：

* 地宝 OZMO 920/950
* 地宝 OZMO T8 AIVI
* 地宝 X1 Turbo
* 空中机器人Z1

### 其他型号
以下模型应该可以正常工作或至少部分正常工作。
它们要么已知可以工作，要么在技术上与这些模型相似。
然而，功能可能会受到部分限制。

我尝试实现广泛的功能，但根据复杂性和各种其他标准逐案决定。
当然，没有声称拥有全部功能。

#### 科沃斯 Deebot
* 地宝N8系列
* 地宝T8系列
* 地宝T9系列
* 地宝T10系列
* 地宝T20系列
* 地宝X1系列
* 地宝X2系列

#### 耶迪
* 怡迪K650
* 耶迪 2 混合动力车
* Yeedi 真空混合动力
* 耶迪真空最大
* 耶迪真空吸尘器 2 专业版
* Yeedi拖把站

**注意**：所有这些列表可能并不完整

### 旧型号（即将停产）
使用 XML 进行数据传输的旧模型（例如 Deebot OZMO 930、Deebot 900/901）大多数仍在运行，但对这些模型的支持迟早会停止。

请查看[本自述文件](https://github.com/mrbungle64/ecovacs-deebot.js#legacy-models-soon-to-be-discontinued)了解更多信息。

＃＃ 安装
### 先决条件
要使用此适配器，您需要已安装[io经纪商](iobroker.net)。

Node.js 所需的最低版本是 16.x。

### 可选先决条件
此适配器使用 [节点画布](https://www.npmjs.com/package/canvas) 库来实现某些与地图相关的功能，这可能需要安装一些附加软件包。

画布的安装是可选的，对于没有地图功能的型号来说不是必需的，但对于完整的功能范围，请安装以下软件包。

对于基于 Debian 的 Linux 系统，应执行以下命令：

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

在执行下一个命令之前可能需要重新启动

```bash
npm install canvas --unsafe-perm=true
```

有关其他系统的说明，请访问 https://www.npmjs.com/package/canvas#compiling

＃＃ 常问问题
常见问题可参见[这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

＃＃ 用法
有关如何使用此适配器的信息，请参阅[这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

＃＃＃ 状态
有关各州的信息，请参见 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29)（英语）和 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29)（德语）

＃＃ 已知的问题
* “移动”功能因型号而异，因此不通用
* 地图图像的生成在32位系统上不稳定
* 与地宝X1系列及其他当前型号仍无法正常工作

## 免责声明
我与科沃斯机器人有限公司或亿迪科技有限公司没有任何关系。

## Changelog

### 1.4.15 (alpha)
* Breaking change: Bump minimum required version of Node.js to 18.x
* Improvements and optimizations

### 1.4.14
* Breaking change: Bump minimum required version of Node.js to 16.x
* Bumped ecovacs-deebot.js to 0.9.6 (alpha)
* Many improvements for AIRBOT Z1 and Z1 Air Quality Monitor
* and also several improvements for the T20 and X2 series
* Bumped max number of devices to 20
* Added Australia, the United Arab Emirates and "Other countries" as "country"
* Bumped some dependencies
* Some further improvements and optimizations

### 1.4.13 (latest stable)
* Several improvements and optimizations for X1 series (e.g. for the cleaning station and mopping functions)
* Added Air Freshener life span component
* Some further improvements and optimizations

### 1.4.12
* Bumped ecovacs-deebot.js to 0.9.2 (beta)
* Spot area related functions for models with native "goToPosition" function (from the Video Manager):
  * Implemented "goToCalculatedCenterPosition" function
  * Implemented "silentApproach" cleaning
* Some further improvements and optimizations

### 1.4.11
* Bumped ecovacs-deebot.js to 0.9.2 (alpha)
* Added channel for the auto empty station (incl. dust bag full)
* Added state for changing the scrubbing pattern (OZMO Pro)
* Added option to save the used go to position values
* Added function to also save the current deebot position as a "goToPosition"
* Automatically set the last time dustbox removed when the dust bag has been emptied by the auto empty station
* Some further improvements and some fixes

### 1.4.10
* Bumped ecovacs-deebot.js to 0.9.1
* Added channel with information about the last cleaned spot area
* Implemented "markForNextSpotAreaCleaning" function

### 1.4.9
* Bumped ecovacs-deebot.js to 0.9.1-beta.3
* Several improvements for T9 based models (e.g. N8/T9/T10/X1)
* Implemented option for automatic download of the last cleaning image
* The generated base64 map image will also be stored to the filesystem now
* Some further improvements and some fixes

### 1.4.8
* Breaking change: Bumped minimum required version of Node.js to 14.x
* Bumped ecovacs-deebot.js to 0.9.0-beta.2
* Bumped several other dependencies

### 1.4.7
* Bumped ecovacs-deebot.js to 0.8.3-beta.2 (Hotfix XMPP devices)

### 1.4.6
* Added option for native "goToPosition" function (e.g. Deebot OZMO T8 AIVI)
* Some improvements and fixes

### 1.4.5
* Added states for time and cleaned area since last dustbox removal
* Added button for manually trigger dustbox removal
* Removed some options from settings
* Some other changes to settings
* Bumped ecovacs-deebot.js to the latest beta version
* Initial Support for yeedi accounts
* and also for a few models
  * yeedi k650
  * yeedi 2 hybrid
  * yeedi vac hybrid
  * yeedi mop station

### 1.4.4
* Bumped ecovacs-deebot.js to 0.8.2
* Bugfix for non 950 type models with mopping system (e.g. OZMO 930)
* Some minor improvements

### 1.4.3
* Bumped ecovacs-deebot.js to the latest beta version
* Improved last time presence functionality
* Added state for Clean Preference (e.g. T8/T9 series)
* Added state for the last 20 errors
* Added state for cleaning schedule (read-only)
* Some further improvements and some fixes

### 1.4.2
* Bumped ecovacs-deebot.js to 0.8.1 (beta)
* Added states for cleaning cloth reminder and auto-boost suction (e.g. OZMO 920/950, T8/T9 series)
* Added states for mopping type and scrubbing type (models with OZMO Pro mopping system)
* Added option to choose between "pause" and "stop" for "PauseBeforeDockingChargingStation..." functionality
* Some further improvements

### 1.4.1
* Bumped ecovacs-deebot.js to 0.8.0
* Improved "lastTimePresence" functionality
* Added option to reset the vacuum power (cleanSpeed) to standard on return
* Added option to keep modified spot area names (pre-selection on non 950 type models)
* Added states for current used custom and spot areas (currentUsedSpotAreas and customUsedCustomAreaValues)
* Handle error code 110 ("NoDustBox: Dust Bin Not installed")
* Bumped some dependencies

### 1.4.0
* Bumped ecovacs-deebot.js to 0.8.0 (beta)
* Implemented last time presence function (still experimental)
* Implemented "cleanCount" (permanent clean count) function (T8/T9/X1 series)
* Implemented "trueDetect" (enable/disable) function (T8/T9/X1 series)
* Added "unitCare" to consumables (T8/T9/X1 series)
* Added Deebot X1 series
* Some improvements and fixes

### 0.0.1 - 1.3.4
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive))

## License

MIT License

Copyright (c) 2024 Sascha Hölzel <mrb1232@posteo.de>

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