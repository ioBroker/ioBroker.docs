---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-material/README.md
title: ioBroker.vis 2.0 的 Material 小部件
hash: NbZzVpDRzjaniHO/LzukDm6Up4OwVLs7vxfalnkaoR8=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)
![新平台](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)

# IoBroker.vis 2.0 的 Material 小部件
## 小部件
### 按钮和开关
![开关](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches.png)

![开关](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons.png)

![开关](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-switches-buttons-2.png)

＃＃＃ 钟
- 模拟

![时钟模拟](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-1.png)

- 模拟变化

![时钟模拟 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-analog-2.png)

- 数字的

![数字的](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-1.png)

- Digital2（SVG 文本）

![数字2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-clock-digital-2.png)

### 简单状态
使用此小部件，您可以控制一个设备。布尔值或数字。

- 数字

![简单状态](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

- 控制

![简单状态](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### 在小部件中查看
![在小部件中查看](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

不像按钮：视图可以全尺寸显示，并且您可以控制视图中的元素。

![在小部件中查看 - 按钮](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

作为按钮：您可以显示视图的小缩略图，按下它后，它将以全尺寸显示。

### 恒温器
![恒温器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-thermostat-1.png)

此外，如果您激活了它，它可以显示历史记录。

### 带图表的实际值
![实际价值](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-1.png)

![带图表的实际值](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-2.png)

＃＃＃ 安全控制
![安全控制](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-0.png)

![安全控制](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-1.png)

您可以定义延迟（以秒为单位）。

通过激活，定义的ID将被写入延迟秒数，并且延迟结束后，定义的ID将被设置为0，并且警报ID将被设置为true。

![安全控制](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### 玩家
![玩家](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

＃＃＃ 地图
![玩家](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

位置可以定义为一种组合状态，如`9.2344;41.374652` - (经度;纬度)，或两个独立的状态。

＃＃＃ 相机
![玩家](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML 模板
![玩家](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

Html 模板可用于显示任何 html 代码。
此外，您还可以使用此小部件显示图像或 iframe。

### 百叶窗
![百叶窗](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![玩家](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### 彩灯
使用 RGB 灯小部件，您可以控制不同类型的 RGB 灯。以下是一些示例：

- RGB 颜色设置为一种状态，如“#RRGGBB”
- R/G/B 颜色设置为从 0 到 255 的不同状态
- RGBW 作为一个变量，如 '#RRGGBBWW'
- R/G/B/W 颜色设置为从 0 到 255 的不同状态
- 色调/饱和度/亮度为 3 种不同状态
- 色温为 2700 至 6500 之间的一种状态，或由物体的最小值/最大值定义
- 白色模式状态可通过特殊状态在RGB和白色模式之间切换

![RGB 灯 1](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-1.png)

![RGB 灯 2](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-rgb-2.png)

＃＃＃ 门锁
![门锁](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-lock.png)

＃＃＃ 吸尘器
此小部件主要用于小米吸尘器。但它也可以用于任何其他吸尘器。

唯一的区别是小米支持房间清洁。

![吸尘器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-vacuum.png)

### 时间选择器
＃＃ 去做
- 带百叶窗的窗帘

<!-- 下一版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
### 1.3.31 (2024-04-26)
* (bluefox) Improved wizard layout

### 1.3.28 (2024-04-19)
* (bluefox) Improved resolving of icons

### 1.3.27 (2024-04-09)
* (bluefox) Updated packages
* (bluefox) improved RGB widget

### 1.3.25 (2024-03-07)
* (bluefox) Corrected filter property in the widget settings

### 1.3.23 (2024-03-05)
* (bluefox) Added possibility to change the icon size in simple widget

### 1.3.21 (2024-02-22)
* (bluefox) Corrected small input fields

### 1.3.18 (2024-01-16)
* (bluefox) Corrected long click for RGB widget on touch devices
* (bluefox) Corrected dimmer widget

### 1.3.17 (2023-12-19)
* (bluefox) Added option to hide the line in switches widget

### 1.3.15 (2023-12-17)
* (foxriver76) Added option to rotate video

### 1.3.14 (2023-12-05)
* (bluefox) Allowed with on click on the widget toggling the ON/OFF state of RGB widget
* (bluefox) Added class names to ON/OFF widgets to allow styling

### 1.3.11 (2023-11-17)
* (bluefox) Allowed opening/closing dialogs of some widgets by command

### 1.3.9 (2023-11-10)
* (bluefox) updated packages

### 1.3.8 (2023-11-08)
* (bluefox) Corrected RGB widget if minimal is equal with maximal

### 1.3.5 (2023-11-06)
* (bluefox) Corrected layout of RGB widget
* (bluefox) Added option for RGB widget to hide brightness control
* (bluefox) Added option for white mode in RGB widget

### 1.3.3 (2023-10-26)
* (bluefox) Corrected layout of RGB widget
* (bluefox) Added color settings to actual
* (bluefox) Vacuum settings were hidden

### 1.3.2 (2023-10-14)
* (bluefox) Small improvements done

### 1.3.1 (2023-10-13)
* (bluefox) Added the vacuum cleaner widget

### 1.2.1 (2023-09-18)
* (bluefox) Added door lock, rgb and thermostat to switches widget

### 1.1.3 (2023-09-10)
* (bluefox) Door lock improved

### 1.1.0 (2023-09-08)
* (bluefox) Added door lock

### 1.0.0 (2023-08-21)
* (bluefox) Added RGB widget

### 0.8.5 (2023-08-11)
* (bluefox) Improvement of the widget loading

### 0.8.4 (2023-08-10)
* (bluefox) Improvement of wizard

### 0.8.3 (2023-07-30)
* (bluefox) Font styles are applied to all buttons

### 0.8.2 (2023-07-19)
* (bluefox) Corrected small layout problems

### 0.8.0 (2023-07-18)
* (bluefox) Added wizard for widgets

### 0.7.1 (2023-07-02)
* (bluefox) Added washer widget

### 0.6.2 (2023-06-29)
* (bluefox) Allowed usage without a frame for all widgets

### 0.6.0 (2023-06-28)
* (bluefox) Added blinds to switches widget
* (bluefox) Allowed to place widgets in widgets

### 0.5.3 (2023-06-21)
* (bluefox) Corrected errors with view in widget

### 0.5.1 (2023-06-20)
* (bluefox) Added widget to switch the theme
* (bluefox) Improved HTML widget to show iframe and image

### 0.4.0 (2023-06-16)
* (bluefox) Added button texts for switches widget
* (bluefox) Removed static widget, as it was replaced by switches widget

### 0.3.1 (2023-06-14)
* (bluefox) Improved buttons widget

### 0.2.13 (2023-03-22)
* (bluefox) BREAKING CHANGE: The names of widgets must be entered anew 
* (bluefox) update packages

### 0.2.9 (2023-02-27)
* (bluefox) Made this adapter singleton

### 0.2.2 (2023-02-22)
* (bluefox) Update packages

### 0.2.1 (2022-11-26)
* (bluefox) Implemented the blinds widget

### 0.1.5 (2022-10-27)
* (bluefox) First beta version

### 0.1.2 (2022-10-21)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2022-2024 Denis Haev <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.