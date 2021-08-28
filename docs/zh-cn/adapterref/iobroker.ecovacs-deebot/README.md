---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.ecovacs-deebot/README.md
title: 适用于 ioBroker 的 Ecovacs Deebot 适配器
hash: PhlLZ7EtzBVxzkvEaZfs/k2Z8YOBt1MFWzfD/y+XLeQ=
---
![标识](../../../en/adapterref/iobroker.ecovacs-deebot/admin/ecovacs-deebot.png)

![稳定版](http://iobroker.live/badges/ecovacs-deebot-stable.svg)
![最新版本](http://img.shields.io/npm/v/iobroker.ecovacs-deebot.svg)
![安装数量](http://iobroker.live/badges/ecovacs-deebot-installed.svg)
![每月下载次数](https://img.shields.io/npm/dm/iobroker.ecovacs-deebot.svg)
![下载次数](https://img.shields.io/npm/dt/iobroker.ecovacs-deebot.svg)

# Ecovacs Deebot ioBroker 适配器
[![github-workflow](https://github.com/mrbungle64/iobroker.ecovacs-deebot/actions/workflows/node.js.yml/badge.svg)](https://github.com/mrbungle64/iobroker.ecovacs-deebot)

此适配器使用 [ecovacs-deebot.js](https://github.com/mrbungle64/ecovacs-deebot.js) 库。

＃＃ 特征
一些值得注意的功能是：

* 检索信息（例如电池、清洁日志、耗材、清洁和充电状态）
* 发送清洁命令（例如自动、点区域、自定义区域）和各种其他命令（例如播放声音、重置耗材）
* 保存上次运行的自定义区域并重新运行保存的区域
* 真空功率（清洁速度）和水位的调节
* 在清洁过程中检索信息（例如当前位置和区域）
*检索地图信息，包括。点区域和虚拟边界
* 删除、保存和重新创建单个虚拟边界以及全套虚拟边界 *)
* 加载当前地图图像的函数 *)

*) 实验性的

请注意：某些功能仅适用于某些型号

＃＃ 楷模
### 支持的模型
* Deebot 900/901
* Deebot OZMO 930
* Deebot OZMO 920/950

列出的型号是我自己使用的型号，或者在技术上与这些型号相同。

### 这些模型应该正常工作或至少部分工作
* Deebot Slim 2
* Deebot N79 系列
* Deebot M88
* Deebot 600/601/605
* Deebot 710/711/711s
* Deebot OZMO 610
* Deebot OZMO 900/905
* Deebot OZMO Slim 10/11
* Deebot OZMO T5
* Deebot U2 系列
* Deebot N3 MAX
* 地宝 N7
* Deebot N8 系列
* Deebot T8系列
* Deebot T9系列

列出的模型要么是已知的，要么在技术上与这些模型相似。
然而，功能可能会受到部分限制。

我尝试实现广泛的功能，但根据复杂性和其他各种标准逐案决定。
当然，没有要求提供完整的功能。

＃＃ 安装
建议使用 Node.js 的 12.x 或 14.x 版本。

所需的最低版本仍然是 10.x，**但可能很快就会改变**。

此适配器使用 [节点画布](https://www.npmjs.com/package/canvas) 库来实现一些与地图相关的功能，这些功能可能需要安装一些附加包。

对于没有地图功能的模型，画布的安装是可选的，不是必需的，但对于完整的功能范围，请安装以下软件包。

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
*有关各州的信息可以在[这里](https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/States-%28EN%29)(英文)和[这里](https://github .com/mrbungle64/ioBroker.ecovacs-deebot/wiki/Datenpunkte-%28DE%29)（德语）

＃＃ 常问问题
* 常见问题可以在这里找到（https://github.com/mrbungle64/ioBroker.ecovacs-deebot/wiki/FAQ）

＃＃ 已知的问题
* 对于某些型号（例如 Deebot OZMO 930），建议每天一次[安排重启](https://www.iobroker.net/#en/documentation/admin/instances.md#The%20page%20content)因为有一些报告说大约在大约之后连接丢失了。 24小时
* 某些清洁功能可能不适用于 Deebot 710/711/711s。请暂时使用 0.5.8 版本。
* “边缘”功能不适用于 Deebot U2（改为启动自动清洁）
* T9 系列上的一些“cleaninglog”状态为空（“last20Logs”、“lastCleaningDate”和“lastCleaningMapImageURL”）

## 免责声明
我与 ECOVACS 没有任何关系。

## Changelog

### 1.2.3 (alpha)
* Using library version 0.6.2 (alpha)
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

Copyright (c) 2021 Sascha Hölzel <mrb1232@posteo.de>

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