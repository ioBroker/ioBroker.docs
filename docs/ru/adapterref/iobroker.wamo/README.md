---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: WnzSTJpviwrVOACza9hw9Prl9+fd3ajJe1vBA9XkMaw=
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

Адаптер подключается к вашему устройству защиты от протечек **SYR SafeTech Connect 2422** или **POLYGONVATRO**, чтобы считывать данные с устройства и создавать некоторые статистические данные, такие как история потребления воды.

Подробную информацию о SYR SaveTech Connect 2422 можно найти в [здесь.](https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect)

Блок POLYGONVATRO представляет собой блок SYR SaveTech Connect 2422, но без датчиков давления, температуры и электропроводности. Блок POLYGONVATRO в настоящее время недоступен.

## ВАЖНО
Начиная с выпуска **_Jam Protection_** было добавлено запланированное перемещение главного клапана, которое можно активировать и запланировать в области настроек адаптера (вкладка: Задачи).

Будьте очень осторожны с этой функцией, потому что она будет **_закрывать_** и **_открывать_** главный клапан, чтобы предотвратить его застревание в открытом положении и, следовательно, не закрыть в случае утечки.

**_Jam Protection_** можно спланировать с помощью расписания CRON, которое также будет настроено в настройках адаптера на вкладке **_Tasks_**.
Будьте очень осторожны и здесь, потому что, если вы запланируете защиту от заклинивания, например, каждую 1 минуту, у вас будут большие проблемы, потому что ваш главный клапан будет закрываться и открываться каждую минуту!

Во время действия **_Jam Protection_** никакие обычные состояния (клапан, аварийные сигналы и т. д.) не будут обновляться, чтобы предотвратить ложное срабатывание, которое вы, возможно, установили в этих состояниях.

Если главный клапан уже находится в положении **_закрыт_**, действие **_Защита от заклинивания_** не будет выполняться, чтобы предотвратить открытие главного клапана.
Если при запуске **_Защиты от замятия_** есть потребление воды, действие будет отложено на 1 минуту. После 10 неудачных попыток (вода все еще течет) **_Защита от замятия_** будет прервана.

### Отказ от ответственности / Предупреждение
Если во время действия **_Jam Protection_** связь с устройством будет потеряна или адаптер WAMO или ioBroker выйдет из строя или будет остановлен, главный клапан останется в последнем заданном положении! Это означает, что если что-то пойдет не так, клапан может быть закрыт, и его нужно будет открыть самостоятельно с помощью соответствующего приложения или кнопки на самом устройстве.

## Поддержите этот проект
Если вы найдете этот адаптер полезным и захотите поддержать этот проект, ваша доброта будет высоко оценена. Вы можете легко поддержать меня [здесь.](https://www.paypal.com/paypalme/smarthausleben) Спасибо 😊

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