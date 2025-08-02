---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.yeelight-2/README.md
title: ioBroker.yeelight-2
hash: LQx3Ecwqu+UAsQ6tKBY9Hs7TfKBTpH2ygoIwMmVSC64=
---
![标识](../../../en/adapterref/iobroker.yeelight-2/admin/yeelight.png)

![安装数量](http://iobroker.live/badges/yeelight-2-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.yeelight-2.svg)
![下载](https://img.shields.io/npm/dm/iobroker.yeelight-2.svg)

![测试与发布](https://github.com/iobroker-community-adapters/ioBroker.yeelight-2/workflows/Test%20and%20Release/badge.svg) [![翻译状态](https://weblate.iobroker.net/widgets/adapters/-/yeelight-2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**此适配器使用 Sentry 库自动向开发人员报告异常和代码错误。** 有关更多详细信息以及如何禁用错误报告的信息，请参阅[Sentry-插件文档](https://github.com/ioBroker/plugin-sentry#plugin-sentry)！从 js-controller 3.0 开始使用 Sentry 报告。

# IoBroker.yeelight-2
[德语说明](README_de.md)

此适配器通过您的本地网络控制您的 Yeelight 设备。

＃＃ 安装
对于您想要控制的所有 Yeelight，您需要在 yeelight 应用程序设置中启用“LAN 控制”。

![](../../../en/adapterref/iobroker.yeelight-2/admin/lan.jpg)

## 配置
您可以手动添加设备或在网络上查找设备。默认端口为 55443。如果您愿意，可以更改名称、IP、端口和智能名称。

### 智能名称
如果您输入智能名称，该设备将被添加到 iobroker.cloud 并可由 Alexa 控制。

### 查找设备
使用此按钮，您可以扫描网络中的设备，如果发现设备，则该设备将被添加到表中。扫描网络大约需要 20 秒。如果未找到设备，则表示未启用“LAN 控制”或设备位于不同的网络中。

### 设备不在列表中
如果您的设备不在列表中，例如 YLTD003，请在这种情况下使用具有相同功能的其他灯（台灯或 Color 或其他）。

设置场景
用法：此方法用于将智能 LED 直接设置为指定状态。如果设备处于关闭状态，则先将其打开，然后应用指定的命令。

参数：3～4。

“class” 可以是“color”、“hsv”、“ct”、“cf”、“auto_dealy_off”。

- “颜色”表示将智能LED改变为指定的颜色和亮度。
- “hsv”表示将智能 LED 更改为指定的颜色和亮度。
- “ct”表示将智能 LED 改变为指定的 ct 和亮度。
- “cf”表示以指定的方式启动彩色流。
- “auto_delay_off”表示将智能 LED 打开至指定亮度，并启动睡眠定时器，在指定分钟后关闭灯。

“val1”、“val2”、“val3” 是特定于类的。

请求示例：

- `["颜色", 65280, 70]`
- `["hsv", 300, 70, 100]`
- `["ct", 5400, 100]`
-`["cf",0,0,"500,1,255,100,1000,1,16776960,70"]`
- `["auto_delay_off", 50, 5]`

注意：“开”和“关”状态下均可接受。

对于上面的例子：

- 首先将颜色设置为“652280”，亮度设置为70%。
- 第二种是将颜色设置为色调：300、饱和度：70 和最大亮度。
- 第三是将CT设置为5400K和100％亮度。
- 第四种是在两个流元组上启动无限颜色流。
- 第五种是将灯打开至50％亮度，然后5分钟后关闭。

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.5.2 (2025-02-28)

-   (Black-Thunder) Incompatibilities with the dependency "joy" have been fixed and "joy" has been updated.

### 1.5.1 (2025-02-26)

-   (mcm1957) Update of joi has been reverted due to incompatibilities.

### 1.5.0 (2025-02-26)

-   (mcm1957) Adapter requires node.js >= 20, js-controller >= 6 and admin >= 6 now
-   (Black-Thunder) Online status for each device has been added (visible in admin object tree).
-   (Black-Thunder) Support for compact mode has been added.
-   (Black-Thunder) Code has been partially refeactored.
-   (mcm1957) Dependencies have been updated

### 1.4.0 (2024-04-29)

-   (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
-   (mcm1957) Dependencies have been updated

### 1.3.1 (2024-02-15)

-   (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
-   (Black-Thunder) Crashes at startup of adapter have been fixed. [#271, #227 and #222]
-   (mcm1957) Testing has been changed to support node 18 and 20
-   (mcm1957) Dependencies have been updated
-   (Apollon77) make sure reconnects work correctly

## License

The MIT License (MIT)

Copyright (c) 2024-2025 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2024 MeisterTR <meistertr.smarthome@gmail.com>, cahek2202 <cahek2202@mail.ru>

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