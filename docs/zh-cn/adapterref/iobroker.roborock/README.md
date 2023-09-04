---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.roborock/README.md
title: ioBroker.roborock
hash: 5CvbgpBIpg504IjBMTa826zNHoz3HCBexv6pl7jDdek=
---
![标识](../../../en/adapterref/iobroker.roborock/admin/roborock.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.roborock.svg)
![下载](https://img.shields.io/npm/dm/iobroker.roborock.svg)
![安装数量](https://iobroker.live/badges/roborock-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/roborock-stable.svg)
![国家公共管理](https://nodei.co/npm/iobroker.roborock.png?downloads=true)

# IoBroker.roborock
**测试：** ![测试与发布](https://github.com/copystring/ioBroker.roborock/workflows/Test%20and%20Release/badge.svg)

**翻译：** [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/roborock/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

## IoBroker 的 Roborock 适配器
该适配器允许您控制、获取状态、清洁历史记录并查看在 Roborock 应用程序中设置的 Roborock 真空吸尘器的地图。

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!从 js-controller 3.0 开始使用 Sentry 报告。

## 支持的机器人有：
- 石头扫地机器人S4
- 石头扫地机器人S5
- 石头扫地机器人S5 Max
- 石头扫地机器人S6
- 石头扫地机器人S6 Pure
- 石头扫地机器人S6 MaxV
- 石头扫地机器人S7
- 石头扫地机器人S7 MaxV（超）
- 石头扫地机器人Q7 Max
- 石头扫地机器人S7 Pro Ultra

## 区域清洁
仅当在适配器选项中启用地图创建时，此功能才有效！

 - 有一个网络服务器正在运行。默认端口为 6824
 - 在浏览器中打开http://iobroker:6824/map.html（将http://iobroker更改为您的ioBroker主机名或ip！！！）
 - 画出用于清洁的正方形。 Roborock 同时支持最多 4 个清洁区域。

 ![](https://github.com/copystring/ioBroker.roborock/blob/main/images/Rockrock_zone_cleaning.gif)

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2023-07-12)
* (copystring) Fix adapter options

### 0.2.0 (2023-07-11)
* (copystring) Make adapter turn green only when username & password are correct
* (copystring) Add vacuum online status and deviceInfo
* (copystring) Add support for Camera of MaxV models
* (copystring) Add support for titles of obstacles
* (copystring) Make options a little prettier
* (copystring) Add support to check for new firmware
* (copystring) Add Support for Roborock S8, S8 Pro Ultra, S4 Max, Q7, S7 Max Ultra
* (copystring) Loads of bug fixes
* (copystring) Add option to sniff traffic via mitmproxy

### 0.1.6 (2023-03-13)
* (copystring) Add touch support for zones in web interface
* (copystring) Fix room mapping
* (copystring) Refactor map creation code
* (copystring) Fix robot rotation when parked
* (copystring) Display obstacles of Roborock S6 MaxV (and maybe others) on map
* (copystring) Add support for virtual walls
* (copystring) Add support for no mop zones

### 0.1.5 (2023-03-13)
* (copystring) Fix bug with sendRequest

### 0.1.4 (2023-03-12)
* (copystring) Correctly process map on web interface with multiple robots
* (copystring) Fix robot running detection to start map updater correctly
* (copystring) Fix huge memory leak when creating maps
* (copystring) Fix consumables for S6 MaxV
* (copystring) Start webserver and websocket server only when map creation is enabled
* (copystring) Update homedata without fully reinitializing the adapter
* (copystring) Add ability to reset consumables
* (copystring) Add clean count for room cleaning
* (copystring) Add resume_segment_clean and resume_zoned_clean

### 0.1.4-beta.6 (2023-03-12)
* (copystring) Correctly process map on web interface with multiple robots

### 0.1.4-beta.5 (2023-03-11)
* (copystring) Fix bug when getting isCleaning state outside of vacuum.js

### 0.1.4-beta.4 (2023-03-11)
* (copystring) Fix robot running detection to start map updater correctly
* (copystring) Fix robot list duplicate entries on map update
* (copystring) Better error handling for map creation

### 0.1.4-beta.3 (2023-03-10)
* (copystring) Fix charger position

### 0.1.4-beta.2 (2023-03-08)
* (copystring) Temporarily disable sendRequest timeout

### 0.1.4-beta.1 (2023-03-08)
* (copystring) Fix huge memory leak when creating maps

### 0.1.4-beta.0 (2023-03-06)
* (copystring) Create and clear update interval for each vacuum correctly
* (copystring) Fix consumables for S6 MaxV
* (copystring) Start webserver and websocket server only when map creation is enabled
* (copystring) Update homedata without fully reinitializing the adapter
* (copystring) Add clean count for room cleaning
* (copystring) Ability to reset consumables
* (copystring) Add clean count for room cleaning
* (copystring) Add resume_segment_clean and resume_zoned_clean

### 0.1.3 (2023-03-03)
* (copystring) "retry" on getMap() is not an error
* (copystring) Fix *_life calculation
* (copystring) Fix reconnect

### 0.1.2 (2023-03-01)
* (copystring) Fix ignoring get_carpet_clean_mode and get_water_box_custom_mode for S6 and older vacuums

### 0.1.1 (2023-03-01)
* (copystring) Encrypt username & password. This means you need to re-enter username and password in the options
* (copystring) Use Sentry Plugin instead native sentry
* (copystring) Convert setInterval()/setTimeout() to this.setInterval()/this.setTimeout()
* (copystring) Correctly clear intervals and timeouts on unload and reconnect
* (copystring) Update consumables code

### 0.1.0 (2023-02-28)
* (copystring) Fix a lot of my seriously shitty robot coords and pixel XY code
* (copystring) Fix connecting to websocket for hosts with more than one network card
* (copystring) Disable buttons on webinterface when they can't be used
* (copystring) Improve deleting/addin zones in webinterface
* (copystring) map_status the currently selected map when bitwise shifted by 2 to the right
* (copystring) use currently selected map to get floor rooms of selected map
* (copystring) Update map only once on start of adapter
* (copystring) Automatically send current map to webinterface when updating map
* (copystring) Update clean summary only after once after cleaning and once at start
* (copystring) Implement charger and robot angle on map
* (copystring) Fix zone positions
* (copystring) Locating should not be an error. Make this an info instead
* (copystring) Fix robot position and rotation
* (copystring) Fix mop path detection at start of robot
* (copystring) Don't process is_Locating for starting the map updater
* (copystring) Add go to and go to predicted path feature in webinterface
* (copystring) Make the actual path slightly transparent
* (copystring) New robot image on map
* (copystring) Add pause, stop, dock buttons to webinterface
* (copystring) Reconnect websocket after 10 seconds of disconnection
* (copystring) Remove unnecessary getMap() calls
* (copystring) Improve reconnect logic
* (copystring) Add Sentry
* (copystring) Correct mop_mode state
* (copystring) Add consumables life in percent

### 0.0.10-alpha.0 (2023-02-21)
* (copystring) Fix a few lint errors and fix bugs regarding zone cleaning (JSON conversion to string and back to JSON)

### 0.0.9-alpha.0 (2023-02-21)
* (copystring) Added zone cleaning

### 0.0.8-alpha.0 (2023-02-08)
* (copystring) Update translations
* (copystring) Enable translations via weblate
* (copystring) Fix robot commands
* (copystring) Fix map size (height and width were swapped)
* (copystring) Add all mqtt client events

### 0.0.7-alpha.0 (2023-02-06)
* (copystring) Fix cleaningInfo for Roborock S4 to S6
* (copystring) Add optional map with selectable update intervall
* (copystring) Prepare for npm releases
* (copystring) Fix crashes on initialisation
* (copystring) Fix type m³ to m²
* (copystring) Add ukranian language
* (copystring) Fix map creation check

### 0.0.6-alpha.0 (2023-01-29)
* (copystring) report unknown attributes

### 0.0.5-alpha.0 (2023-01-28)
* (copystring) remove old and unused deviceInfo code

### 0.0.4-alpha.0 (2023-01-28)
* (copystring) add missing mop and carpet commands

### 0.0.3-alpha.0 (2023-01-28)
* (copystring) randomize the client ID

### 0.0.2-alpha.0 (2023-01-28)
* (copystring) initial release

## License
MIT License

Copyright (c) 2023 copystring <copystring@gmail.com>

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