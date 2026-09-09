---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.wamo/README.md
title: ioBroker.wamo
hash: RrR3153+sHSNaddmuJxncpHSDF1WMPRXJLzlJjOV+nU=
---
![Логотип](../../../en/adapterref/iobroker.wamo/admin/wamo.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.wamo.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.wamo.svg)
![Количество установок](https://iobroker.live/badges/wamo-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/wamo-stable.svg)
![Статус зависимости](https://img.shields.io/david/smarthausleben/iobroker.wamo.svg)
![НПМ](https://nodei.co/npm/iobroker.wamo.png?downloads=true)
![Тестирование и выпуск](https://github.com/smarthausleben/ioBroker.wamo/workflows/Test%20and%20Release/badge.svg)

# ioBroker.wamo

# Адаптер WAMO для ioBroker

Этот адаптер добавляет функцию мониторинга утечек "wamo" в вашу установку ioBroker.

Адаптер подключается к вашему устройству защиты от протечек **SYR SafeTech Connect 2422** или **POLYGONVATRO** для считывания данных с устройства, создания статистических данных, таких как история потребления воды, и управления устройством. А начиная с \* _версии SafeFlor Connect,_ вы также можете добавлять такие устройства к адаптеру и считывать данные с них.

Более подробную информацию об устройстве **SYR SaveTech Connect 2422** можно найти на [странице с подробным описанием SYR SaveTech Connect 2422.](https://www.syr.de/de/Produkte/CB9D9A72-BC51-40CE-840E-73401981A519/SafeTech-Connect) Дополнительную информацию об устройстве **SafeFloor Connect** можно найти на соответствующей [странице с подробным описанием SYR SafeFloor Connect](https://www.syr.de/de/Produkte/699373BB-C8BE-4992-9CFA-2CB15A5A6166/SafeFloor-Connect#FocusContent) .

Блок POLYGONVATRO по своей конструкции представляет собой устройство SYR SaveTech Connect 2422, но без датчиков давления, температуры и проводимости. В настоящее время блок POLYGONVATRO недоступен для приобретения.

## ВАЖНО

Внутри`SafeFloor Connect release` В числе прочего, была реализована новая функциональность для устройств SafeFlore Connect. В настоящее время можно добавить до 4 устройств. Чтобы считать данные с этого датчика с помощью текущей версии прошивки SafeFloor Sensor (версия 2.21), пожалуйста, внимательно ознакомьтесь с разделом **«Предупреждение/Отказ от ответственности»** ниже.

Для получения важной информации о более старых версиях, пожалуйста, ознакомьтесь с соответствующим разделом.`Importent release related information` в [Вики](https://github.com/smarthausleben/ioBroker.wamo/wiki/Importent-release-related-information) .

### Предупреждение / Отказ от ответственности

Функция считывания данных **SafeFloor Connect** пока не очень полезна в прошивке устройства. В настоящее время датчики пола сразу после пробуждения и отправки информации в облако SYR переходят в спящий режим. Поэтому пока нет возможности отследить устройство в этот период. Для считывания данных с датчиков с помощью адаптера ioBroker необходимо активировать опцию «Поддерживать онлайн» на вкладке настроек адаптера «SAFEFLOOR UNITS» и разбудить устройство, нажав кнопку внутри устройства. Но это означает, что устройство больше не переходит в спящий режим, и, следовательно, батареи устройства будут разряжаться очень быстро. На данный момент единственным жизнеспособным решением является использование адаптера для батарей. Такие адаптеры легко можно приобрести на Amazon. Ссылка на используемый мной адаптер находится в разделе оборудования для этого [проекта](https://smarthausleben.de/wasserwaechter/) на моем веб-сайте.

## Поддержите этот проект

Если этот адаптер окажется для вас полезным и вы хотите поддержать этот проект, ваша помощь будет высоко оценена. Вы можете легко поддержать меня [здесь.](https://www.paypal.com/paypalme/smarthausleben) Спасибо 😊

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**

* ======================================================================== (max broad of READMR.md page )
-->
### **WORK IN PROGRESS**
* (smarthausleben) UPDATE: dependencies (Node 18)

### 0.4.1 (2023-08-08)
* (smarthausleben) FIX: Statusupdate `ALA` and `VLV` after alarm clearing (`CLRALA` command)

### 0.4.0 (2023-07-26)
* (smarthausleben) ADD: Since there are important things to consider before you update, which can be squeezed into this section here, `please read the release related information section "0.4.0 (SafeFloor Connect pre release)"` in the [Wiki](https://github.com/smarthausleben/ioBroker.wamo/wiki/Importent-release-related-information) carefully.

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

## License
The MIT License (MIT)

Copyright (c) 2024 smarthausleben <info@smarthausleben.de>