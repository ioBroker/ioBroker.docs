---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 适用于 ioBroker 的 Ecovacs Deebot 适配器
hash: exeYPtF7DKxXrgZ40n/oNPMPX7lyA7Ndscy7KkM5Fnw=
---
![标识](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![稳定版](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![最新版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![安装数量](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![每月下载次数](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![下载次数](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# IoBroker 的 Ecovacs Deebot 适配器
[![github-workflow](https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

此适配器使用 [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) 库。

＃＃ 特征
一些值得注意的特点是：

* 基本清洁功能（例如自动清洁、定点区域、自定义区域）
* 和其他各种基本功能（例如播放声音、重置消耗品、重新定位）
* 检索基本信息（例如电池电量、清洁日志、耗材、清洁和充电状态）
* 以及各种扩展信息（如充电位置、地图相关信息、网络信息）
* 在清洁过程中检索信息（例如当前位置和当前点区域）
* 设置真空功率、水位等基本设置
* 设置扩展设置（例如连续清洁、请勿打扰模式、音量、TrueDetect 3D）
* 保存上次使用的自定义区域并重新运行保存的区域
* 检索地图信息，包括。现场区域、虚拟边界和无拖把区
* 删除、保存和重新创建单个虚拟边界以及全套虚拟边界
* 有关每个单点区域最后出现的日期和时间的信息
*返回充电站或进入/离开现场区域时的一些功能
* 加载当前地图图片的函数
* 设置单独的现货区域名称（在 ioBroker 中）
* 当前型号的静音接近功能

请注意：有些功能仅适用于部分型号，有些仍处于试验阶段

＃＃ 楷模
### 完全支持的模型
完全支持的模型是我自己拥有的模型：

* 地宝 OZMO 920
* 地宝T8 AIVI

### 其他支持的模型
这些模型应该可以正常或至少部分正常工作。
它们要么已知可以工作，要么在技术上与这些模型相似。
然而，功能可能会受到部分限制。

我尝试实现广泛的功能，但根据复杂性和其他各种标准逐案决定。
当然没有要求完整的功能。

#### 科沃斯地宝
* 地宝 OZMO 950
* 地宝N8系列
* 地宝U2系列
* 地宝T8系列
* 地宝T9系列
* 地宝T10系列
* 地宝X1系列

#### Yeedi（自1.4.5版本开始）
* 亿迪k650
* yeedi 2 混合动力车
* yeedi vac 混合动力车
* yeedi vac max
* yeedi vac 2 专业版
* yeedi拖把站

#### 遗留模型（即将停产）
这些模型使用 XML 进行数据传输，并且使用与当前模型不同的命令和事件特征。
我也不再使用我的 Slim 2、Deebot 901 和 OZMO 930。

**因此将很快停止对这些模型的支持**。

* 地宝超薄 2
* 地宝N79系列
* 地宝 M88
* 地宝 500
* 地宝 600/601/605
* 地宝 710/711
* 地宝 900/901
* 地宝 OZMO 610
* 地宝 OZMO 900/905
* 地宝 OZMO 930
* Deebot OZMO Slim 10/11

＃＃ 安装
###先决条件
要使用此适配器，您需要已经安装了 [io经纪人](iobroker.net)。

Node.js 的最低要求版本是 14.x。建议使用 14.x 或 16.x 版本

### 可选先决条件
此适配器使用 [节点画布](https://www.npmjs.com/package/canvas) 库来实现一些与地图相关的功能，这些功能可能需要安装一些额外的包。

canvas 的安装是可选的，对于没有地图功能的模型来说不是必需的，但是对于完整的功能范围，请安装以下包。

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
可以找到常见问题[这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ)

＃＃ 用法
有关如何使用此适配器的信息，请参见 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

＃＃＃ 状态
有关各州的信息可以在 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29)（英语）和 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29)（德语）中找到

＃＃ 已知的问题
* 地图图片的生成目前在32位系统上不稳定
*“边缘”功能不适用于 Deebot U2（改为启动自动清洁）
* “移动”功能不适用于 Deebot OZMO T8 AIVI（可能也适用于某些其他型号）
* 地宝X1系列无法正常生成地图图片

##免责声明
我与 Ecovacs Robotics Co., Ltd. 或 yeedi Technology Limited 没有任何关联。

## Changelog

### 1.4.13 (alpha)
* Several improvements and optimizations for X1 series (e.g. for the cleaning station and mopping functions)

### 1.4.12 (latest beta)
* Bumped ecovacs-deebot.js to 0.9.2 (beta)
* Spot area related functions for models with native "goToPosition" function (from the Video Manager):
  * Implemented "goToCalculatedCenterPosition" function
  * Implemented "silentApproach" cleaning
* Some further improvements and optimizations

### 1.4.11 (latest stable)
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

Copyright (c) 2023 Sascha Hölzel <mrb1232@posteo.de>

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