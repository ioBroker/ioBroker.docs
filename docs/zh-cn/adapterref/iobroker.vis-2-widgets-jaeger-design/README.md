---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.vis-2-widgets-jaeger-design/README.md
title: ioBroker.vis 2.0 的特殊 Jaeger Design 小部件
hash: ww2pwFXi5G9qk35KbU8FU+RCGd8leK5XMwH7ajEJbwQ=
---
![标识](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/admin/vis-2-widgets-jaeger-design.png)

![安装数量](http://iobroker.live/badges/vis-2-widgets-jaeger-design-stable.svg)
![NPM 版本](http://img.shields.io/npm/v/iobroker.vis-2-widgets-jaeger-design.svg)
![下载](https://img.shields.io/npm/dm/iobroker.vis-2-widgets-jaeger-design.svg)

# IoBroker.vis 2.0 的特殊 Jaeger Design 小部件
![YouTube](../../../en/adapterref/iobroker.vis-2-widgets-jaeger-design/img/youtube.jpg)

您可以找到有关如何使用小部件[这里](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe)（德语）的视频。

视频 wie die Widgets benutzt werden können，kann man [hier](https://www.youtube.com/playlist?list=PLddhldeLVrtl5Bhj6AAbkLabuIuyV0bVe) finden。

德语版本 [hier](docs/README_de.md)

商业用途
请注意，此适配器没有免费版本。必须购买许可证才能使用这些小部件（当前价格：50 欧元（含增值税））。
不过，您可以免费安装并在编辑器中试用它们。

## 使用“VIS-2 JAEGER 设计适配器”创建智能家居界面概述
＃＃＃ 要求
- ioBroker 系统
- JAEGER 设计适配器（约 50 欧元）
- 使用 ioBroker 的基本知识

＃＃＃ 介绍
JAEGER 设计适配器基于 vis-2 适配器，允许您通过点击和拖放操作创建界面。您可以添加和自定义各种小部件来控制智能家居设备。

### 界面基本结构
该界面由几个区域组成：

- **主菜单**：左侧有一列主菜单项，可以轻松创建。
- **状态栏**：在顶部，您可以添加各种重要的状态指示器。
- **中间区域**：可显示场景、操作和通知。右侧区域可自由配置，可显示安全、天气、家电、能耗等信息。

  ![iobroker 付款方式1](https://github.com/user-attachments/assets/d0323e58-ba6e-455c-8a06-81f9acda9ef9)

＃＃＃ 灯光
在主菜单中，您可以选择不同的楼层。底层的楼层平面图显示了所有以图标表示的灯光。有些图标只能打开或关闭，而有些则可以调暗。长按图标会打开一个弹出窗口，其中包含一个用于调节亮度的滑块。
![iobroker-jaeger-设计-beleuchtung](https://github.com/user-attachments/assets/7e4a4ee9-b1b4-4ab1-88cb-eddf0a1fc707) 右侧的照明场景可以轻松访问，照明设置也可以保存：![iobroker-jaeger-设计-beleuchtung_szenen_speichern](https://github.com/user-attachments/assets/d9099048-0d26-4cfb-9b74-04a36b07131b)

### 百叶窗
在“百叶窗”菜单中，您可以查看遮光状态。图标指示百叶窗的位置，点击图标会弹出一个窗口，用于调整高度和帘片角度。
![智能家居经纪商介绍](https://github.com/user-attachments/assets/a808b0c2-0e84-4586-b482-3d63b49e4706)

＃＃＃ 活力
在“能源”菜单中，您可以查看每个房间的室温。图标显示实际温度和目标温度，以及暖气和窗户的状态。点击图标后，会弹出一个窗口，您可以更改目标温度并控制其他操作，例如空调或暖风系统。
![iobroker-jaeger-设计-raumtemperatur_ueberblick](https://github.com/user-attachments/assets/b34ab5bb-e05a-438f-b0d6-649a34d1dfde)

![iobroker-jaeger-设计-raumtemperatur](https://github.com/user-attachments/assets/282f5f01-827c-4976-8cbc-78084f076ac1)

＃＃＃ 安全
在“安全”菜单中，可以查看窗口的状态。打开的窗口显示为红色。
![iobroker-jaeger-设计-sicherheit](https://github.com/user-attachments/assets/9e0234ac-aa0a-4811-b971-ac33237502f5)

### 附加功能
您还可以创建自由定义的界面，例如“消耗”适配器的消耗显示或 Nightscout 糖尿病显示。在“设置”菜单中，您可以进行各种设置。
![iobroker-jaeger-设计-Energieueberwachung](https://github.com/user-attachments/assets/92e09c5f-88d9-48b3-b97f-0401a8839946)

![iobroker-jaeger-设计-糖尿病](https://github.com/user-attachments/assets/39d0a043-6025-4f9d-96f4-e8c9bd2245bd)

![iobroker-jaeger-设计-安装](https://github.com/user-attachments/assets/bff91b52-c04e-4482-9dd8-e17a9a7c762c)

### YouTube 教程
有关详细说明和更多信息，建议观看链接的 YouTube 教程。

<!-- 下一个版本的占位符（在行首）：

### **工作正在进行** -->

## Changelog
### 1.4.3 (2025-05-31)
* (bluefox) Implemented the full-screen mode for cameras
* (bluefox) Added the possibility of disabling "swipe to open the menu" in the mobile view
* (bluefox) Corrected issue with confirmation dialog for the state widget
* (bluefox) Added settings for submenu width and gap between submenu items

### 1.4.2 (2025-05-25)
* (bluefox) Allowed setting ON value for dimmer
* (bluefox) Allowed inverting values in the popup dialog for shutter and blinds control
* (bluefox) Added the control dialog for state widget
* (bluefox) Allowed setting up the title padding
* (bluefox) Added possibility to show the last change time for scenes

### 1.4.1 (2025-05-20)
* (bluefox) Migrated to TypeScript and vite
* (bluefox) Corrected error with license check

### 1.3.12 (2025-04-29)
* (bluefox) Corrected min/max by thermostat

### 1.3.9 (2024-12-05)
* (bluefox) Corrected confirmation dialog. Close now works
* (bluefox) Caught the possible error in thermostat

### 1.3.6 (2024-12-04)
* (bluefox) Corrected the icon dialog
* (bluefox) Corrected the ID select dialog
* (bluefox) Corrected the scene buttons

### 1.3.3 (2024-11-25)
* (bluefox) Corrected "close on click" option for shutter and dimmer
* (bluefox) Improved the build pipeline

### 1.3.1 (2024-09-23)
* (bluefox) Removed gulp from a build process
* (bluefox) Added the possibility to select camera from the "cameras" adapter

### 1.2.7 (2024-07-17)
* (bluefox) allowed multi-line buttons for the thermostat

### 1.2.6 (2024-07-16)
* (bluefox) Corrected the power state of the thermostat

### 1.2.5 (2024-07-12)
* (bluefox) Added possibility to control other IDs with memory buttons (Dimmer, Shutter)
* (bluefox) Added the power option for thermostat
* (bluefox) Implemented the writing of specific values for state widget
* (bluefox) Added label to state widget

### 1.2.1 (2024-07-07)
* (bluefox) Removed withStyles usage
* (bluefox) Added confirmation dialog

### 1.1.27 (2024-05-27)
* (bluefox) Added descriptions

### 1.1.26 (2024-05-23)
* (bluefox) Corrected font-size of thermostat

### 1.1.22 (2024-05-14)
* (bluefox) Added possibility to show a simple state without a border
* (bluefox) Added possibility to add a caption for some widgets

### 1.1.21 (2024-05-01)
* (bluefox) Changed layout for mobile view

### 1.1.20 (2024-04-09)
* (bluefox) Allowed changing font size for thermostat

### 1.1.19 (2024-03-12)
* (bluefox) Allowed changing the palette for every widget

### 1.1.15 (2024-03-06)
* (bluefox) Improved dimmer widget

### 1.1.14 (2024-02-21)
* (bluefox) Added top info in the mobile view

### 1.1.12 (2024-02-20)
* (bluefox) Corrected some layout issues

### 1.1.10 (2024-01-19)
* (bluefox) Small changes on layout and added new distance settings

### 1.1.8 (2024-01-18)
* (bluefox) Corrected info button in mobile view

### 1.1.5 (2023-12-05)
* (bluefox) Added an option to start action or scene from new line

### 1.1.0 (2023-11-29)
* (bluefox) Corrected license check
* (bluefox) Added class names to all important layout components

### 1.0.12 (2023-11-22)
* (bluefox) Allowed reordering of the actions and scenes
* (bluefox) Added a new option to show scenes before actions
* (bluefox) Added option to show value in dimmer
* (bluefox) Added option for adjustable width of the right view on the home page
* (bluefox) Added option to provide icons for scenes and actions
* (bluefox) Added option set the distance between menu items
* (bluefox) Added possibility to set control value for scenes
* (bluefox) Added possibility to adjust font size for scenes and actions

### 1.0.11 (2023-11-10)
* (bluefox) Corrected error local variables and controls

### 1.0.10 (2023-11-08)
* (bluefox) Corrected error with scenes
* (bluefox) Improved state widget with custom icons

### 1.0.9 (2023-11-07)
* (bluefox) Allowed setting distance between actions and scenes on the home page

### 1.0.8 (2023-11-06)
* (bluefox) Corrected the cameras widget

### 1.0.7 (2023-10-31)
* (bluefox) Added possibility to reorder info on status bar

### 1.0.5 (2023-10-17)
* (bluefox) Corrected error with fakeView

### 1.0.4 (2023-10-10)
* (bluefox) Corrected layout of thermostat

### 1.0.3 (2023-10-10)
* (bluefox) Corrected error if shutter was inverted

### 1.0.2 (2023-09-28)
* (bluefox) Corrected touch behavior for dimmer and shutter

### 1.0.1 (2023-09-26)
* (bluefox) Corrected small issues

### 1.0.0 (2023-08-11)
* (bluefox) Changed style of shutter and state widgets

### 0.6.5 (2023-08-09)
* (bluefox) Corrected view selector and empty menu item

### 0.6.4 (2023-07-31)
* (bluefox) Set constant width and height of thermostat icons

### 0.6.3 (2023-07-25)
* (bluefox) Added many new features

### 0.6.1 (2023-07-21)
* (bluefox) Added max height/width for floors

### 0.6.0 (2023-07-19)
* (bluefox) Corrected some errors with information

### 0.5.2 (2023-07-02)
* (bluefox) Support of false for scenes

### 0.5.0 (2023-06-28)
* (bluefox) Added support for the new vis
* (bluefox) Added page configurable margins

### 0.4.6 (2023-06-19)
* (bluefox) Corrected sub menu

### 0.4.5 (2023-06-13)
* (bluefox) Corrected visualization of view

### 0.4.0 (2023-05-31)
* (bluefox) Added exclusions
* (bluefox) Added possibility to show information on the very top of layout

### 0.3.2 (2023-04-05)
* (bluefox) Corrected license problem

### 0.3.1 (2023-03-22)
* (bluefox) Corrected build process

### 0.3.0 (2023-03-21)
* (bluefox) Implemented dark mode

### 0.2.3 (2023-03-09)
* (bluefox) update packages

### 0.2.2 (2023-03-06)
* (bluefox) Updated thermostat widget

### 0.2.1 (2023-02-03)
* (bluefox) Mobile views tuned

### 0.2.0 (2023-02-01)
* (bluefox) implemented mobile view

### 0.1.3 (2023-01-30)
* (bluefox) initial commit

## License
Copyright (c) 2022-2025 bluefox <dogafox@gmail.com>
All rights reserved.