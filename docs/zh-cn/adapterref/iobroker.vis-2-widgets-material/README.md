---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-material/README.md
title: ioBroker.vis 2.0 的材料小部件
hash: cKHRTVBeG8kUHylekx+2Num3as39qjPPHxLFVCu95Ak=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-material/admin/vis-2-widgets-material.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-material-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-material.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-material.svg)
![NPM](https://nodei.co/npm/iobroker.vis-2-widgets-material.png?downloads=true)

# IoBroker.vis 2.0 的材料小部件
## 小工具
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
使用此小部件，您可以控制一台设备。布尔值或数字。

- 数字

![简单状态](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-1.png)

- 控制

![简单状态](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-simple-state-2.png)

### 在小部件中查看
![在小部件中查看](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-1.png)

不是按钮：视图可以全尺寸显示，您可以控制视图中的元素。

![在小部件中查看 - 按钮](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-view-in-widget-2.png)

作为按钮：您可以显示视图的小缩略图，按下它，它将以全尺寸显示。

###恒温器
![温控器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-thermostat-1.png)

此外，如果您激活它，它可以显示历史记录。

### 带图表的实际值
![实际价值](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-1.png)

![带图表的实际值](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-actual-value-2.png)

### 静态信息
![静态信息](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-static-info-1.png)

![静态信息](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-static-info-2.png)

＃＃＃ 安全控制
![安全控制](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-0.png)

![安全控制](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-1.png)

您可以以秒为单位定义延迟。

通过激活，定义的 ID 将写入延迟秒数，延迟结束后，定义的 ID 将设置为 0，警报 ID 设置为真。

![安全控制](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-security-2.png)

### 播放器
![播放器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-player.png)

＃＃＃ 地图
![播放器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-map-1.png)

＃＃＃ 相机
![播放器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-camera-1.png)

### HTML模板
![播放器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-html-1.png)

### 百叶窗
![百叶窗](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-1.png)

![播放器](../../../en/adapterref/iobroker.vis-2-widgets-material/img/material-blinds-2.png)

### 彩灯
### 时间选择器
<!-- 下一个版本的占位符（在行首）：

### **正在进行中** -->

## Changelog
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

Copyright (c) 2022-2023 bluefox <dogafox@gmail.com>

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