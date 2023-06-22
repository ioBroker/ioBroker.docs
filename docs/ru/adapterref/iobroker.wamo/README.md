---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: WKinYaFEFw1eXdHpi7raxiioJyEMKwflJSrV2PZmEtY=
---
![Логотип](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.wamo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![Количество установок](https://iobroker.live/badges/wamo-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/wamo-stable.svg)
![Статус зависимости](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![НПМ](https://nodei.co/npm/iobroker.wamo.png?downloads=true)

# IoBroker.wamo
**Тесты:** ![Тестируйте и выпускайте](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

# Адаптер WAMO для ioBroker
Этот адаптер добавляет мониторинг защиты от утечек «wamo» к вашей установке ioBroker.

Адаптер подключается к вашему устройству защиты от утечек **SYR SafeTech Connect 2422** или **POLYGONVATRO**, чтобы считывать данные с устройства, создавать некоторые статистические данные, такие как история потребления воды, и управлять устройством.
А начиная с **SafeFlor Connect Release* вы также можете добавлять такие устройства к адаптеру и считывать данные с этих устройств.

Более подробную информацию об устройстве **SYR SaveTech Connect 2422** можно найти в [Подробная веб-страница SYR SaveTech Connect 2422] (https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect). Дополнительные сведения об устройстве **SafeFloor Connect** также можно найти на соответствующей веб-странице [SYR afeFloor Connect.](https://www.syr.de/de/Produkte/699373BB-C8BE-4992-9CFA-2CB15A5A6166/SafeFloor-Connect#FocusContent).

Блок POLYGONVATRO представляет собой блок SYR SaveTech Connect 2422, но без датчиков давления, температуры и электропроводности. Блок POLYGONVATRO в настоящее время недоступен.

## ВАЖНО
Среди прочего, в рамках `SafeFloor Connect release` была реализована новая функциональность для устройств SafeFlore Connect. В настоящее время вы можете добавить до 4 устройств.
Чтобы прочитать показания этого датчика с помощью текущей прошивки датчика SafeFloor (версия 2.21), внимательно прочитайте раздел **Отказ от ответственности/Предупреждение** ниже.

Для получения важной информации о более старых версиях, пожалуйста, прочтите соответствующий ограничитель в `Importent release related information` в [Вики](https://github.com/smarthausleben/ioBroker.wamo/wiki/Importent-release-related-information).

### Отказ от ответственности / Предупреждение
Функция считывания данных **SafeFloor Connect** еще не очень полезна, реализована в прошивке устройства. В настоящее время датчики пола сразу после пробуждения переходят в спящий режим и отправляют свою информацию в облако SYR. Поэтому возможности поймать аппарат в этот период пока нет. Таким образом, чтобы считывать данные с датчиков с помощью этого адаптера ioBroker, вам необходимо активировать опцию «Поддерживать онлайн» на вкладке настроек адаптера «БЛОКИ SAFEFLOOR» и разбудить устройство, нажав кнопку внутри устройства один раз. Но это означает, что устройство больше не переходит в спящий режим, и поэтому батарея устройства будет разряжаться очень быстро. На данный момент единственным жизнеспособным решением является использование адаптера батареи. Эти адаптеры вы можете легко получить от Amazon. Ссылку на адаптер, который я использую, вы можете найти в разделе аппаратного обеспечения для этого [проект](https://smarthausleben.de/wasserwaechter/) на моем веб-сайте.

## Поддержите этот проект
Если вы найдете этот адаптер полезным и захотите поддержать этот проект, ваша доброта будет высоко оценена. Вы можете легко поддержать меня [здесь.](https://www.paypal.com/paypalme/smarthausleben) Спасибо 😊

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