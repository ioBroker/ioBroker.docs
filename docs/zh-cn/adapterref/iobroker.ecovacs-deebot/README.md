---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 用于 ioBroker 的 Ecovacs Deebot 适配器
hash: zGQyWlxu2yuyzMud9BLBEfkleWc9C1h3vtEutAf4tNA=
---
![标识](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![稳定版](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![最新版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![安装数量](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![每月下载次数](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![下载次数](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# 用于 ioBroker 的 Ecovacs Deebot 适配器
[![github-workflow](https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

此适配器使用 [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) 库。

＃＃ 特征
一些值得注意的特点是：

* 基本清洁功能（如自动清洁、光点区域、自定义区域等）
* 和其他各种命令（例如播放声音、重置消耗品、重新定位位置等）
* 检索基本信息（例如电池电量、清洁日志、耗材、清洁和充电状态等）
* 以及各种扩展信息（如充电位置、当前地图、网络信息）
* 在清洁过程中检索信息（例如当前位置和当前点区域）
* 设置基本和高级设置（例如连续清洁、请勿打扰模式、TrueDetect 3D、音量等）
* 真空功率和水位的调整
* 保存上次使用的自定义区域并重新运行保存的区域
*检索地图信息，包括。斑点区域、虚拟边界和无拖布区域
* 删除、保存和重新创建单个虚拟边界以及一整套虚拟边界
* 关于每个单点区域最后出现的日期和时间的信息
* 返回充电站或进入/离开充电桩区域时的一些功能
* 加载当前地图图像的函数
* 设置个别点区域名称

请注意：某些功能仅适用于某些型号，有些仍处于试验阶段

＃＃ 楷模
### 支持的机型
* 地宝 900/901
* 地宝 OZMO 930
* 地宝 OZMO 920/950
* Deebot T8 AIVI（T8 系列）

列出的模型是我自己使用的或在技术上与这些模型相同的模型。

### 这些模型应该正常工作或至少部分工作
* 地宝超薄 2
* 地宝 N79 系列
* 地宝 M88
* 地宝 500
* 地宝 600/601/605
* 地宝 710/711
* 地宝 OZMO 610
* 地宝 OZMO 900/905
* Deebot OZMO Slim 10/11
* 地宝 OZMO T5
* 地宝 U2 系列
* 地宝 N8 系列
* 地宝 T8 系列
* 地宝 T9 系列
* 地宝 X1 系列

列出的模型要么已知可以工作，要么在技术上与这些模型相似。
然而，功能可能会受到部分限制。

我尝试实现广泛的功能，但根据复杂性和各种其他标准逐案决定。
当然，没有人声称拥有完整的功能。

＃＃ 安装
建议使用 Node.js 的 12.x 或 14.x 版本。最低要求版本为 12.x

此适配器使用 [节点画布](https://www.npmjs.com/package/canvas) 库来实现一些与地图相关的功能，这些功能可能需要安装一些额外的包。

canvas 的安装是可选的，对于没有地图功能的模型不是必需的，但要获得完整的功能范围，请安装以下软件包。

对于基于 Debian 的 Linux 系统，应执行以下命令：

```bash
sudo apt-get update
sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

在执行下一个命令之前可能需要重新启动

```bash
sudo npm install canvas --unsafe-perm=true
```

有关其他系统的说明，请访问 https://www.npmjs.com/package/canvas#compiling

＃＃ 用法
* 有关如何使用此适配器的信息，请参见 [此处](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki)

＃＃＃ 状态
* 可以在 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29)（英文）和 [这里](https://github) 找到有关各州的信息.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29)（德语）

＃＃ 常问问题
* 常见问题可以在 [这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ) 找到

＃＃ 已知的问题
* 地图图像的生成目前在 32 位系统上不稳定
* 对于某些型号（例如 Deebot OZMO 930），建议使用

[安排重启](https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content) 每天一次，因为有一些报告称连接在大约 1 分钟后丢失。 24小时

* “边缘”功能不适用于 Deebot U2（改为启动自动清洁）
* T9 系列上的一些“cleaninglog”状态为空（“last20Logs”、“lastCleaningDate”和“lastCleaningMapImageURL”）

## 免责声明
我与 ECOVACS 没有任何关系。

## Changelog

### 1.4.1 (alpha)
* Bumped ecovacs-deebot.js to 0.8.0
* Improved last time presence functionality
* Added option to reset the vacuum power (cleanSpeed) to standard on return
* Added option to keep modified spot area names (pre-selection on non 950 type models)
* Added states for current used custom and spot areas (currentUsedSpotAreas and customUsedCustomAreaValues)
* Handle error code 110 ("NoDustBox: Dust Bin Not installed")
* Bumped some dependencies

### 1.4.0
* Bumped ecovacs-deebot.js to 0.8.0 (beta)
* Implemented last time presence function (still experimental)
* Implemented cleanCount (permanent clean count) function (T8/T9/X1 series)
* Implemented trueDetect (enable/disable) function (T8/T9/X1 series)
* Added unit care to consumables (T8/T9/X1 series)
* Added Deebot X1 series
* Some improvements and fixes

### 1.3.4
* Bumped ecovacs-deebot.js to 0.7.2 (beta)
* Implemented some experimental functions for auto empty stations
* Some refactoring

### 1.3.3
* Bumped ecovacs-deebot.js to 0.7.1 (incl. fix for CVE-2022-0155)

### 1.3.2
* Bumped follow-redirects to 1.14.7 (fix for CVE-2022-0155) and some other dependencies
* Added N8 PRO+

### 1.3.1
* Fix the cleaning functions for the Deebot 710 series

### 1.3.0
* Using library version 0.7.0 (beta)
* The minimum required version of Node.js is now 12.x
* Some improvements for newer models (e.g. T9 series)
* Some other improvements and fixes

### 1.2.4
* Using library version 0.6.8
* Some optimizations
* Preparations for changing the minimum required Node.js version to 12.x

### 1.2.3
* Using library version 0.6.6
* Lots of code refactoring, optimizations and some fixes

### 1.2.2
* Added function to load current map image (non 950 type models, e.g. OZMO 930, Deebot 901)

### 1.2.1
* Some enhancements and fixes
* (benep) Added state to play sound by id

### 1.2.0
* Using library version 0.6.1
* Added functions for deleting, saving and recreating saved virtual boundaries (950 type models, e.g. OZMO 920/950, T8 series)
* Added functions for saving and recreating sets of virtual boundaries (950 type models, e.g. OZMO 920/950, T8 series)
* Added options to control clean speed and water level separately for each spot area
* Added function to save current spot area values
* Added function to load current map image (950 type models, e.g. OZMO 920/950, T8 series)
* Added some cleaning log values and some states for current cleaning stats
* Removed "Use alternative API call for lastCleaningMapImageURL and lastCleaningTimestamp" option
* Moved some states from "info" channel to sub channels "info.library" and "info.network"
* Quite a lot of improvements for processing map data, spot areas and virtual boundaries
* Some optimisations for js-controller 3.3
* Improved support for N8 series
* Initial support for T9 series
* Some improvements and fixes

### 1.1.1
* Using library version 0.6.0
  * Updated login process
  * Support for Chinese server login
* Initial support for some models (e.g. N3, N7 and N8 series)

### 1.1.0
* Stable release

### 1.0.13
* Using library version 0.5.6
* Some improvements and fixes

### 1.0.12
* Using library version 0.5.5
* Added some more T8 models
* Several improvements and fixes

### 1.0.11
* Enabled some features for OZMO 900
* Several minor improvements

### 1.0.10
* Using library version 0.5.4
* Several improvements and fixes
* Added available spot area boundaries to "map" channel (read only)

### 1.0.9
* Using library version 0.5.3
* Added some experimental features (for a few models only)
* Added option for virtual boundaries and some further improvements to adapter config
* Some improvements for js-controller 3.2.x

### 1.0.8
* Using library version 0.5.2
* Added available virtualBoundaries channel for Deebot 900/901 and Ozmo 930 (read only)
* Added "volume" and buttons for resetting consumable values for 950 type models (920/950/T8)
* Improved synchronization of spot area buttons
* Add option for setting the language for spot area names
* Added some experimental features (for a few models only)
* Several enhancements and fixes
* Bump some dependencies

### 1.0.7
* Using library version 0.5.1
* Initial support for Deebot U2 series
* Improved support for Ozmo T8 models
* (boriswerner) Fixed cleaning log for 950 type models (920/950/T8)
* (boriswerner) Added available virtualBoundaries to "map" channel (currently read only)
* Improved handling of device classes
* Several enhancements and fixes

### 1.0.6
* Using library version 0.5.0
* Fix for running multiple devices
* Support for additional Ozmo T8 models
* Add option to synchronize spotArea buttons
* Set state value for triggered buttons to false
* Add option to suppress "unknown" value for "map.deebotPositionCurrentSpotAreaID" state
* Further enhancements and fixes

### 1.0.5
* Bump library to 0.4.25
* Initial support for Ozmo T8 and T8+
* Implement buttons for resetting consumable values (currently Deebot 900/901 and Ozmo 930 only)
* Several enhancements and fixes

### 1.0.4
* Bump library to 0.4.21
* Remove canvas from dependencies
* Several bugfixes and improvements (especially for N79 series)
* Possibility to specify the number of reruns for a spot area
* Spot areas in the "control" channel are now created automatically
* Remove number of spot areas from adapter settings
* Some refactoring
* Bump dependencies

### 1.0.1 - 1.0.3
* Added support for Ozmo T8 AIVI
* Compact mode support
* Added a button to save the last used custom area values
* Added buttons to rerun saved custom areas
* Some enhancements and fixes

### 1.0.0
* Stable release

### 0.0.1 - 0.6.5
* [Changelog archive](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Changelog-(archive)#059)

## License

MIT License

Copyright (c) 2022 Sascha Hölzel <mrb1232@posteo.de>

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