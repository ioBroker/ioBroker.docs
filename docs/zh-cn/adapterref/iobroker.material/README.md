---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.material/README.md
title: ioBroker.material
hash: ZCJIXtNoy74A2TitzsIc9y7cTKVAPQpXAj50tzdOw5o=
---
![商标](../../../en/adapterref/iobroker.material/admin/material.png)

![安装数量](http://iobroker.live/badges/material-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.material.svg)
![下载](https://img.shields.io/npm/dm/iobroker.material.svg)
![新产品管理](https://nodei.co/npm/iobroker.material.png?downloads=true)

# IoBroker.material
React 和 Material UI 界面。

![截图](../../../en/adapterref/iobroker.material/img/screenshot1.png)

＃＃ 安装
**重要！** 这个适配器不能直接从 github 安装。仅来自 npm。

＃＃ 用法
重要的是要知道，该适配器仅显示添加到某些类别的设备，例如 *rooms* 或 *function*。
如果每个设备都属于这两个类别，那就更好了。因为每个设备都有类型和位置。

## 支持的类型
＃＃＃ 转变
###调光器
＃＃＃ 媒体播放器
＃＃＃ 体积
###组音量
＃＃ 去做
* 凸轮（通过额外的适配器）
* 事件（通过额外的适配器）
* 主屏幕
* 图表
* 窄菜单
* 吸尘器
* 显示滑块以指示位置
* 支持质量代码
* 地图（OpensStreetMap）
* X秒后切换到默认屏幕
* 信息中的订单状态
* 在天气中使用图标而不是文本

##学分
- 从 flaticon 使用的图标
- 来自 [here](https://codepen.io/blucube/pen/cudAz) 的音量旋钮 [Ed Hicks](https://twitter.com/blucube) - 灵感来自 [运球镜头](https:/ /dribbble.com/shots/753124-Volume-Knob) 作者 [Ricardo Salazar](https://twitter.com/rickss)

<!-- 下一版本的占位符（在行首）：

### __工作进行中__ -->

## Changelog
### __WORK IN PROGRESS__
### 1.0.0 (2021.07.13)
* (bluefox) Redesign

### 0.13.9 (2020.08.22)
* (bluefox) Added support for new socket.io

### 0.13.8 (2020.03.19)
* (bluefox) Added sorting of rooms

### 0.13.5 (2020.03.12)
* (bluefox) Fixed error with stacked rooms

### 0.13.1 (2020.03.11)
* (bluefox) rebuild react

### 0.13.0 (2020.02.10)
* (Apollon77) compatibility to web 3.0

### 0.12.1 (2019.11.06)
* (bluefox) Packages were updated

### 0.10.6 (2019.01.29)
*  Added Chinese support

### 0.10.5 (2018.10.15)
* (bluefox) fix error with settings

### 0.10.3 (2018.09.02)
* (bluefox) implement color temperature
* (bluefox) implement cache of objects

### 0.10.1 (2018.09.02)
* (bluefox) GUI corrections
### 0.10.0 (2018.08.30)
* (bluefox) RGB was corrected

### 0.9.12 (2018.08.19)
* (bluefox) RGB was implemented

### 0.9.11 (2018.08.14)
* (bluefox) Fixed error with empty page

### 0.9.10 (2018.08.08)
* (bluefox) Crop of images was implemented
* (bluefox) Background of tiles is possible
* (bluefox) Double width of every tile is possible
* (bluefox) Group light control
* (bluefox) Custom URLs implemented

### 0.9.9 (2018.08.03)
* (bluefox) Order of tiles is implemented
* (bluefox) Support of dwd data

### 0.9.7 (2018.07.30)
* (bluefox) Implemented the weather widget

### 0.9.4 (2018.07.26)
* (bluefox) Bug-fixes

### 0.9.3 (2018.07.25)
* (bluefox) Many changes

### 0.9.2 (2018.07.21)
* (bluefox) Update logic was implemented (only with web 2.4.1)

### 0.9.1 (2018.07.20)
* (bluefox) Volume control was implemented

### 0.8.9 (2018.07.17)
* (bluefox) React app

### 0.5.7 (2018.01.24)
* (bluefox) Ready for cloud services

### 0.5.6 (2017.10.11)
* (bluefox) fix undefined names
* (bluefox) fix detection of switches

### 0.5.3 (2017.08.11)
* (bluefox) fix dimmer

### 0.5.2 (2017.07.30)
* (bluefox) fix action icons

### 0.5.1
* (bluefox) edit of visibility

## License
CC-BY-NC

Copyright (c) 2017-2021, bluefox <dogafox@gmail.com>

Commercial use is not allowed without permission.