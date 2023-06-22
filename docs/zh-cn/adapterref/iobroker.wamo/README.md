---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: WKinYaFEFw1eXdHpi7raxiioJyEMKwflJSrV2PZmEtY=
---
![标识](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![NPM版本](https://img.shields.io/npm/v/iobroker.wamo.svg)
![下载](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![安装数量](https://iobroker.live/badges/wamo-installed.svg)
![稳定存储库中的当前版本](https://iobroker.live/badges/wamo-stable.svg)
![依赖状态](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![国家公共管理](https://nodei.co/npm/iobroker.wamo.png?downloads=true)

# IoBroker.wamo
**测试：** ![测试与发布](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

# IoBroker 的 WAMO 适配器
该适配器为您的 ioBroker 安装添加了“wamo”漏电保护监控。

该适配器连接到您的 **SYR SafeTech Connect 2422** 或 **POLYGONVATRO** 漏电保护设备，以便从设备中读取数据、创建一些统计数据（例如水消耗历史记录）并控制设备。
自**SafeFlo Connect 版本*以来，您还可以将此类设备添加到适配器并从这些设备读取数据。

有关 **SYR SaveTech Connect 2422** 设备的更多详细信息，请参阅[SYR SaveTech Connect 2422 详细信息网页](https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect)。有关 **SafeFloor Connect** 设备的更多详细信息也可以在相关的 [SYR afeFloor Connect 详细信息网页上找到](https://www.syr.de/de/Produkte/699373BB-C8BE-4992-9CFA-2CB15A5A6166/SafeFloor-Connect#FocusContent)。

POLYGONVATRO 装置在内部是一个 SYR SaveTech Connect 2422 装置，但没有压力、温度和电导率传感器。 POLYGONVATRO 装置目前不可用。

## 重要
除其他事项外，`SafeFloor Connect release` 还实现了 SafeFlore Connect 设备的新功能。目前您最多可以添加 4 个设备。
要使用当前的 SafeFloor 传感器固件（版本 2.21）读取该传感器，请仔细阅读下面的 **免责声明/警告** 部分。

有关旧版本的重要信息，请阅读 [维基百科](https://github.com/smarthausleben/ioBroker.wamo/wiki/Importent-release-related-information) 中的 `Importent release related information` 中的相关章节。

### 免责声明/警告
**SafeFloor Connect** 数据读出功能尚未真正有用地实现到设备固件中。目前，地板传感器醒来后会立即进入睡眠模式，并将信息发送到 SYR 云。因此，在此期间还没有办法捕获该设备。因此，为了使用此 ioBroker 适配器读取该传感器，您必须在适配器设置选项卡“SAFEFLOOR UNITS”中激活选项“Keep online”，并通过按一次设备内部的按钮来唤醒设备。但这意味着设备不再进入睡眠模式，因此设备电池将很快耗尽。目前唯一可行的解决方案是使用电池适配器。您可以从亚马逊轻松获得此适配器。您可以在我的网站上针对此 [项目](https://smarthausleben.de/wasserwaechter/) 的特定硬件部分找到我使用的适配器的链接。

## 支持这个项目
如果您发现此适配器有用并且想要支持该项目，我们将非常感谢您的善意。您可以轻松支持我[这里。](https://www.paypal.com/paypalme/smarthausleben)谢谢😊

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**

* ======================================================================== (max broad of READMR.md page )
-->

### **WORK IN PROGRESS**
* (smarthausleben) FIX: Profile parameter PV1 ... PV8 maximum value set to 9000 **_(Issue #24)_** `State objects PV1 ... PV8 need to be deleted first in order to be create correctly during adapter start`
* ========================================================================
* (smarthausleben) ADD: [SafeFloor Device] New **SafeFloor Units** Tab in adapter settings to manage up to 4 **_SafeFloor Connect_** devices
* (smarthausleben) ADD: New option **_"Hide all trigger info logging messages"_** in Tab **_"Advanced Options"_** to `hide all info logging messages at trigger events`
* (smarthausleben) ADD: New option **_"Allow SERVICE and FACTORY state changes"_** in Tab **_"Advanced Options"_** to enable/disable changes of objects protected by the manufacturer
* (smarthausleben) ADD: State `CLRALA` - **_DeviceControl State_** to clear current alarm and reopen main valve
* (smarthausleben) ADD: State `BFT` - **_Button filter threshold_**
* (smarthausleben) ADD: State `BPT` - **_Button proximity threshold_**
* (smarthausleben) ADD: State `CNF` - **_Conductivity factor_**
* (smarthausleben) ADD: State `CNL` - **_Conductivity limit_**
* (smarthausleben) ADD: State `DBD` - **_MLT pressure drop_**
* (smarthausleben) ADD: State `DBT` - **_MLT pressure drop time_**
* (smarthausleben) ADD: State `DCM` - **_MLT test time close_**
* (smarthausleben) ADD: State `DOM` - **_MLT test time open_**
* (smarthausleben) ADD: State `DPL` - **_MLT pulses_**
* (smarthausleben) ADD: State `DST` - **_MLT test time NOPULS_**
* (smarthausleben) ADD: State `DTC` - **_MLT verification cycles_**
* (smarthausleben) ADD: State `DTT` - **_Micro-Leakage-Test start time_**
* (smarthausleben) ADD: State `HTD` - **_Disable HTTPS connection (only MQTT)_**
* (smarthausleben) ADD: State `MQT` - **_MQTT connection type_**
* (smarthausleben) ADD: State `MRT` - **_Maintenance (Husty) server connection_**
* (smarthausleben) ADD: State `MSC` - **_MQTT reconnect time_**
* (smarthausleben) ADD: State `DSV` - **_Micro-Leakage-Test state_**
* (smarthausleben) ADD: State `FSL` - **_Paired Floorsensors list_**
* (smarthausleben) ADD: State `ALH` - **_Alarm history file_**
* (smarthausleben) ADD: State `STH` - **_Statistics history file_**
* (smarthausleben) ADD: State `PAH` - **_Parameters history file_**
* (smarthausleben) ADD: State `WFL` - **_WiFi scan_**
* (smarthausleben) ADD: State `BUZ` - **_Buzzer parameters_**
* (smarthausleben) ADD: State `ALM` - **_Alarm memory_**
* (smarthausleben) ADD: State `TTM` - **_Turbine no pulse max. time_**
* (smarthausleben) ADD: State `TYP` - **_Safe-Tec type_**
* (smarthausleben) ADD: State `WNS` - **_WiFi AP disabled_**
* (smarthausleben) ADD: State `HWV` - **_Hardware version_**
* (smarthausleben) ADD: State `DKI` - **_Safe-Tec device kind ID_**
* (smarthausleben) ADD: State `FSA` - **_Add (Pair) Floorsensor_**
* (smarthausleben) ADD: State `WFK` - **_WiFi key_** After entering the WiFi key into the WFK state the key will be send to device and afterwards state value will be cleared imediatly
* (smarthausleben) ADD: Device Control State `UPG` set to true initiates **_Firmware upgrase_** (only if new firmware is available)
* (smarthausleben) ADD: Device Control State `DEX` set to 1 initiates **_MLT (Micro Leake Test)_**
* (smarthausleben) ADD: Warn message in log if a new firmware for SafeTech Connect device is available
* (smarthausleben) REM: Removed **_testing loop_** functionality
* ========================================================================
* = The following objects need to be deleted first in order to get the new functionality
* = Since objects will be checked and created only during startup of the adapter follow this procedure
* = (stop wamo adapter -> delete state object -> start wamo -> object will be created)
* ========================================================================
* (smarthausleben) CHG: State `ALD` - **_Alarm duration (signaling time)_** can now be changed by user
* (smarthausleben) CHG: State `CLP` - **_Cluster Profile can_** now be changed by user
* (smarthausleben) CHG: State `SLO` - **_Self learning offset_** can now be changed by user
* (smarthausleben) CHG: State `SLP` - **_Self learning phase_** can now be changed by user
* (smarthausleben) CHG: State `SMF` - **_Self learning minimum flow_** can now be changed by user
* (smarthausleben) CHG: State `SOF` - **_Self learning offset flow_** can now be changed by user
* (smarthausleben) CHG: State `TMZ` - **_Time zone_** can now be changed by user
* (smarthausleben) CHG: State `WFC` - **_WiFi connect (SSID)_** can now be changed by user
* (smarthausleben) CHG: State `71` - **_Leakage protection deactivated_** - State moved from **_Settings_** to **_Device-Control_** (please delete Object **_71_** in object _Settings_ folder )
* (smarthausleben) CHG: State `71` - **_Leakage protection deactivated_** - is now changable (warn message appears in log if Leakage protection is deaktivated) 
* ========================================================================

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