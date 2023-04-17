---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: WnzSTJpviwrVOACza9hw9Prl9+fd3ajJe1vBA9XkMaw=
---
![标识](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![NPM 版本](https://img.shields.io/npm/v/iobroker.wamo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![安装数量](https://iobroker.live/badges/wamo-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/wamo-stable.svg)
![依赖状态](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![NPM](https://nodei.co/npm/iobroker.wamo.png?downloads=true)

#ioBroker.wamo
**测试：** ![测试和发布](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

# IoBroker 的 WAMO 适配器
此适配器将“wamo”泄漏保护监控添加到您的 ioBroker 安装中。

该适配器连接到您的 **SYR SafeTech Connect 2422** 或 **POLYGONVATRO** 漏电保护设备，以便从设备读取数据并创建一些统计数据，例如耗水历史记录。

有关 SYR SaveTech Connect 2422 的详细信息，请参见[这里。](https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect)

POLYGONVATRO 装置在引擎盖下是 SYR SaveTech Connect 2422 装置，但没有压力、温度和电导率传感器。 POLYGONVATRO 装置目前不可用。

## 重要
自从 **_Jam Protection release_** 以来，添加了主阀的计划移动，并且可以在适配器设置区域（选项卡：任务）中激活和计划

使用此功能时要非常小心，因为它会 **_close_** 和 **_open_** 主阀，以防止它卡在打开位置，因此在发生泄漏时不会关闭。

**_Jam Protection_** 可以使用 CRON 计划进行规划，该计划也将在适配器设置 **_Tasks_** 选项卡中进行配置。
在那里也要非常小心，因为如果你安排一次堵塞保护，例如每 1 分钟一次，你就会遇到大麻烦，因为你的主阀每分钟都会关闭和打开！

在 **_Jam Protection_** 活动期间，不会更新任何常规状态（阀门、警报等），以防止您可能已设置这些状态的错误触发。

如果主阀已经处于 **_closed_** 位置，则不会执行 **_Jam Protection_** 活动以防止打开主阀。
如果在 **_Jam Protection_** 开始时有水消耗，该动作将延迟 1 分钟。 10 次失败尝试后（水仍在流动）**_Jam Protection_** 将中止。

### 免责声明/警告
如果在 **_Jam Protection_** 活动期间与设备的通信丢失或 WAMO 适配器或 ioBroker 本身崩溃或将停止，主阀将停留在最后一个命令位置！这意味着如果出现问题，阀门可能会关闭，需要使用相关应用程序或设备本身的按钮自行打开。

## 支持这个项目
如果您发现此适配器有用并且希望支持该项目，我们将不胜感激。你可以很容易地支持我[这里。](https://www.paypal.com/paypalme/smarthausleben)谢谢😊

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
* (smarthausleben) ADD: [SafeFloor Device] New **SafeFloor Units** Tab in adapter settings to manage up to 4 **_SafeFloor Connect_** devices
* (smarthausleben) ADD: New option **_"Enable executing test loop"_** in Tab **_"Advanced Options"_** to enable/disable cron based executed [Test Loop]

### 0.3.0 (2023-04-04) - ***Jam Protection*** release
* (smarthausleben) ADD: [Main valve jam protection] New State JPR for Jam protection running 
* (smarthausleben) ADD: [Main valve jam protection] New State JPA for Jam protection aktivated
* (smarthausleben) ADD: [Main valve jam protection] New State JPT for Jam protection timing (CRON)
* (smarthausleben) ADD: [Main valve jam protection] New **Task Tab** in adapter settings to manage a scheduled regular movement of the main valve in order to prevent a stuck valve
* (smarthausleben) FIX: [interfaceBusy] flag was not reset after AXIOS interface handler error **_(Issue #21)_**
* (smarthausleben) ADD: [WatchDog] function for interfaceBusy flag. Flag will be reset after defined amount of requests **_(Issue #21)_**

### 0.2.13 (2022-10-12)
* (smarthausleben) add: new property "createOnStartup" in DeviceParameter
* (smarthausleben) add: new property "saveRawData" in DeviceParameter
* (smarthausleben) change: creating all state objects during startup to avoid calling "setObjectNotExistsAsync" later on
* (smarthausleben) add: Profile parameter raw states
* (smarthausleben) change: default value for "factor_german_water_hardnes" changed to 0.0296041666666667
* (smarthausleben) FIX update german water hardnes factor object (GHARDFACTOR) during startup 

### 0.2.12 (2022-09-20)
* (smarthausleben) Release 0.2.12

### 0.2.11 (2022-09-19)
* (smarthausleben) Release 0.2.11

### 0.2.10 (2022-09-19)
* (smarthausleben) state types changed UNI, PSD, CSD, TSD, T2
* (smarthausleben) states changable UNI, PSD, CSD, TSD, T2
* (smarthausleben) added DeviceControls RST (restart device)
* (smarthausleben) new channel DeviceControl
* (smarthausleben) added unit for GHARDNESS (°dH)
* (smarthausleben) new state GHARDFACTOR (calculation factor German water hardnes)

## License
The MIT License (MIT)

Copyright (c) 2022-2023 smarthausleben <info@smarthausleben.de>