---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.material/README.md
title: ioBroker.材料
hash: ytR9sa7Pl14zF2yPap5R1x9Gqjs/HYShaPvqZwEkX8A=
---
![商标](../../../en/adapterref/iobroker.material/admin/material.png)

![安装数量](http://iobroker.live/badges/material-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.material.svg)
![下载](https://img.shields.io/npm/dm/iobroker.material.svg)
![NPM](https://nodei.co/npm/iobroker.material.png?downloads=true)

# IoBroker.材料
React 和 Material UI 界面。

![截图](../../../en/adapterref/iobroker.material/img/screenshot1.png)

＃＃ 安装
**重要！** 此适配器不能直接从 GitHub 安装。仅来自 npm。

＃＃ 用法
知道这一点非常重要，该适配器仅显示添加到某些类别的设备，例如 *rooms* 或 *function*。
如果每个设备都属于这两个类别，那就更好了。因为每个设备都有类型和位置。

## 支持的类型
＃＃＃ 转变
###调光器
＃＃＃ 媒体播放器
＃＃＃ 体积
### 组音量
＃＃ 去做
* 摄像头（通过额外的适配器）
* 事件（通过额外的适配器）
* 主屏幕
* 窄菜单
* 吸尘器
* 滑块显示栏以指示位置
* 支持质量代码
*地图（OpensStreetMap）
* X秒后切换到默认屏幕
*信息中的订单状态
* 在天气中使用图标而不是文本

##学分
- 使用 flaticon 的图标
- [此处](https://codepen.io/blucube/pen/cudAz) 的音量旋钮，作者：[Ed Hicks](https://twitter.com/blucube) - 灵感来自 [dribbble shot](https:/ /dribbble.com/shots/753124-Volume-Knob）作者：[Ricardo Salazar](https://twitter.com/rickss)

<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 1.3.0 (2022-12-27)
* (bluefox) Corrected URL widget

### 1.2.6 (2022-12-07)
* (bluefox) Corrected color of blinds in light mode

### 1.2.5 (2022-11-02)
* (bluefox) Corrected error with charts

### 1.2.2 (2022-10-18)
* (bluefox) migrated to MUIv5
* (bluefox) corrected error with blinds
* (bluefox) corrected error with echarts
* (bluefox) corrected error with background upload

### 1.1.2 (2021-12-28)
* (bluefox) Fixed double sending in the switch control

### 1.1.0 (2021-12-21)
* (bluefox) Changed the light style to be looks like old style

### 1.0.6 (2021-10-29)
* (bluefox) Added support of `iobroker.material` app

### 1.0.4 (2021-07-30)
* (bluefox) Corrected the size of icons

### 1.0.2 (2021-07-18)
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

Copyright (c) 2017-2022, bluefox <dogafox@gmail.com>

Commercial use is not allowed without permission.