---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hmip/README.md
title: Адаптер ioBroker HomeMatic IP Cloud AccessPoint
hash: ROYKPghAX5l6O5CwpV5igdwihIhItCQHbISMzvUv7mY=
---
![Логотип](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Количество установок](http://iobroker.live/badges/hmip-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hmip.svg)

# Адаптер ioBroker HomeMatic IP Cloud AccessPoint
![Тестируйте и выпускайте](https://github.com/Apollon77/iobroker.hmip/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/hmip/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

## Описание
Этот адаптер обеспечивает связь с HomematicIP CloudAccessPoint через Rest API облака Homematic IP.

**Важное примечание:** Пожалуйста, ограничьте запросы управления до минимума, потому что EQ-3 начал блокировать IP-адреса, когда вы делаете слишком много!

## Установка
Этому адаптеру требуется node-js версии >= 10.0.

Вот пошаговое видео по установке на YouTube https://youtu.be/kXWfJRUYJIA

## Информация
Большинство IP-устройств Homematic уже работают с последней версией адаптера.

Я буду улучшать его постоянно, но на это потребуется время. Любая помощь от сообщества, например. Запрос на вытягивание будет высоко оценен.

Для неработающих устройств HmIP создайте проблему с этой информацией (по одной на каждое устройство и, если возможно, с техническим названием в теме).
Переключите логирование адаптера в ioBroker в глупый режим и добавьте json устройства, которое печатается в лог в тикете.
Мне также может понадобиться json изменения состояния.

Спасибо

Если вы ищете информацию, если настройки сигнализации активны, вы должны проверить активное состояние групп ВНУТРЕННЯЯ и ВНЕШНЯЯ, они представляют собой комбинацию трех состояний сигнализации. ВНУТРЕННИЕ и ВНЕШНИЕ активные значения означают В гостях, только ВНЕШНИЕ активные означают, что активен только периметр.

## Важная информация, что можно сделать с этим адаптером
!!! С помощью этого адаптера вы можете запускать только те события, которые можно запускать через исходное приложение Homematic IP.
Например, прямые соединения между устройствами не имеют событий в приложении и также не могут быть запущены через этот адаптер!!!

## Настройки
* введите свой SGTIN (на задней панели точки доступа) и PIN-код (если он был установлен ранее) и подтвердите данные, нажав кнопку с синим светодиодом. Это создаст токен аутентификации.

## Специальные настройки
### HMIP-DLD (привод дверного замка)
Если вы назначили PIN-код замку в приложении HmIP (Настройки / Авторизация доступа — немецкий: «Zutrittsberechtigungen»), то PIN-код необходимо установить в состоянии PIN-кода объектов устройств. Это НЕ ПИН-код вашей системы! если вы не установили PIN-код в настройках, вы также можете оставить его пустым в состоянии PIN-кода.
Дополнительно, пожалуйста, добавьте клиент "iobroker" в список клиентов контроля доступа в настройках приложения HmIP!

## Спасибо
* @coreGreenberet за его библиотеку Python (https://github.com/coreGreenberet/homematicip-rest-api)

*

## Обсуждение на форуме ioBroker https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter
## Запрос адаптера на GitHub
https://github.com/ioBroker/AdapterRequests/issues/62

## Changelog
### 1.15.4 (2022-02-19)
* (Apollon77) Fix sendDoorCommand for HmIP-MOD-HO

### 1.15.3 (2022-01-22)
* (Apollon77) Add windowOpen indicator to two more places
* (Apollon77) Optimize reconnection handling
* (Apollon77) Optimize automatic initialization of unknown devices and channels

### 1.15.2 (2022-01-04)
* (Apollon77) Wait 10s until no new "unknown state update" was received before updating the whole system

### 1.15.0 (2022-01-02)
* Node.js 10.x is now minimum required version for this adapter
* (Apollon77) Optimize WebSocket reconnection Logic
* (Apollon77) Optimize current value handling and re-set value if a state change is not processed because of an unchanged value
* (Apollon77) Implement startImpulse call for ImpulseOutputChannels for e.g. HM-WGC
* (Apollon77) Implement support for HMIP-DLD to set the lock state and also an option PIN if needed (see notes above)
* (Apollon77) Detect new and unknown devices and channels and reinitialize the structure to add the new objects on the fly
* (Apollon77) Implement DOOR_LOCK_SENSOR_CHANNEL
* (Apollon77) Ignore HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, FLOOR_TERMINAL_BLOCK_CHANNEL and CHANGE_OVER_CHANNEL because no data to prevent logs
* (Apollon77) optimize unload handling

### 1.14.0 (2021-11-07)
* (Apollon77) Lower loglevel for state change logs to debug
* (Apollon77) Add verification when reading some data to prevent crashes
* (Apollon77) Removed some generic (error/info) states that only exists on chosen devices to re-add later in a generic way

### 1.13.2 (2021-08-25)
* (Apollon77) Fix warning on js-controller 3.3 with two datapoints

### 1.13.1 (2021-08-06)
* (Apollon77) Fix warning on js-controller 3.3 with "sabotage" datapoint

### 1.13.0 (2021-06-23)
* (Apollon77) Add support for HM-WGC/IMPULSE_OUTPUT_CHANNEL

### 1.12.2 (2021-06-04)
* (Apollon77) Fix a warning in js-controller 3.3

### 1.12.1 (2021-05-13)
* (Apollon77) Fix a warning in js-controller 3.3

### 1.12.0 (2021-05-13)
* (Apollon77) Implement NOTIFICATION_MP3_SOUND_CHANNEL

### 1.11.1 (2021-05-08)
* (Apollon77) IMPORTANT: The adapter now requires js-controller 3.1 at least!
* (Apollon77) Update objects on startup to make sure definition is current
* (Apollon77) prevent warnings in js-controller 3.3

### 1.11.0 (2021-04-25)
* (Apollon77) Implement CARBON_DIOXIDE_SENSOR_CHANNEL

### 1.10.0 (2021-04-12)
* (Apollon77) Implement TEMPERATURE_SENSOR_2_EXTERNAL_DELTA_CHANNEL, DOOR_LOCK_CHANNEL and ACCESS_AUTHORIZATION_CHANNEL

### 1.9.0 (2021-02-16)
* (Apollon77) Round temperature values to nearest 0.5 degrees
* (Apollon77) Only send values to HMIP when changed (reduce traffic!)
* (Apollon77) Add debouncing to setPointTemperature changes (means value is sent out when "stable" for 5s!) (reduce traffic!)
* (Apollon77) Add throttling to other change requests (means other changes are blocked for 1s) (reduce traffic!)
* (Apollon77) Implement ANALOG_ROOM_CONTROL_CHANNEL (Sentry IOBROKER-HMIP-1X)

### 1.7.2 (2021-02-09)
* (Apollon77) Try to detect websocket connection failures start over

### 1.7.0 (2021-01-26)
* (Apollon77) add Heating Absence Permanent state and functionality
* (Apollon77) add support for MULTI_MODE_INPUT_BLIND_CHANNEL

### 1.6.2 (2021-01-21)
* (Apollon77) Add check when HMIP domain could not be determined.

### 1.6.1 (2021-01-12)
* (Apollon77) Prevent crash case (Sentry IOBROKER-HMIP-1N)

### 1.6.0 (2020-12-24)
* Important note: Please limit control requests to the bare minimum because EQ-3 started to block IPs when you do too much!
* (Apollon77) Add support for WALL_MOUNTED_THERMOSTAT_CHANNEL

### 1.5.2 (2020-12-15)
* (Apollon77) ignore DEVICE_CHANNEL_EVENT for now and also log as debug to not flood log

### 1.5.0 (2020-11-09)
* (Apollon77) Add control options for primary/secondaryShadingLevel datapoints

### 1.4.1 (2020-11-03)
* (Apollon77) fix potential crash case (Sentry IOBROKER-HMIP-1N)

### 1.4.0 (2020-10-29)
* (Apollon77) Add ROTARY_WHEEL_CHANNEL and RAIN_DETECTION_CHANNEL, ACCESS_CONTROLLER_WIRED_CHANNEL
* (Apollon77) Read home anew if no home object is provided for SECURITY_JOURNAL_CHANGED event

### 1.3.1 (2020-09-18)
* (Apollon77) Fix missing write permission for Notification Light "On" channel

### 1.3.0 (2020-09-18)
* (SliX185) Add MAINS_FAILURE_CHANNEL
* (Apollon77) Add DEVICE_RECHARGEABLE_WITH_SABOTAGE, ACCESS_CONTROLLER_CHANNEL, FLOOR_TERMINAL_BLOCK_MECHANIC_CHANNEL, DEVICE_BASE_FLOOR_HEATING, MULTI_MODE_INPUT_DIMMER_CHANNEL, MULTI_MODE_INPUT_SWITCH_CHANNEL, ANALOG_OUTPUT_CHANNEL, ACCELERATION_SENSOR_CHANNEL, TILT_VIBRATION_SENSOR_CHANNEL, SHADING_CHANNEL
* (Apollon77) try to add dim/rgb support for NotificationLight. You might need to delete/recreate the states if it is not working.
* (Apollon77) add additional functions for setOperationLock, setClimateControlDisplay, setMinimumFloorHeatingValvePosition, setRgbDimLevel. You might need to delete/recreate the states if it is not working.
* (Apollon77) adjusted some roles. You might need to delete/recreate the states if it is not working.

### 1.2.2 (2020-08-17)
* (Apollon77) Prevent Crash case (Sentry IOBROKER-HMIP-1B)

### 1.2.1 (2020-08-10)
* (Apollon77) Fix pairing process

### 1.2.0 (2020-07-26)
* (saschaabraham) Added an active property INTERNAL and EXTERNAL groups for alarm zones
* (marcus0303/slix185) added DOOR_CHANNEL properties

### 1.1.1 (2020-07-23)
* (Apollon77) Crash prevented if object is deleted by state changed (Sentry IOBROKER-HMIP-Y)

### 1.1.0 (2020-07-14)
* (Apollon77) Remember already sent unknown channel infos to not spam Sentry
* (Apollon77) Handle reconnects better (Sentry IOBROKER-HMIP-G)
* (Apollon77) Try to prevent crashes on i valid server reponses, warning is logged
* (SliX185) Add HMIP-SPDR (PASSAGE_DETECTOR_CHANNEL)

### 1.0.1 (2020-05-16)
* (Apollon77) Make sure invalid data do not crash adapter (Sentry IOBROKER-HMIP-7)
* (Apollon77) code cleanup
* (Apollon77) fix several roles (role info is not allowed)

### 1.0.0 (2020-05-12)
* (Apollon77) Add Sentry for error/crash reporting
* (Apollon77) multiple fixes and optimizations
* (Apollon77) prevent adapter crashes in some places
* (Apollon77) 
* (ApolloSK) add vaporAmount for WeatherSensorPro
* (ApolloSK) fix HmIP-SWO-PR wrong DataType actualTemperature
* (marcus0303) Added DEVICE_GLOBAL_PUMP_CONTROL, FLOOR_TERMINAL_BLOCK_LOCAL_PUMP_CHANNEL and DEVICE_INCORRECT_POSITIONED, Fixed role in _createWaterSensorChannel and function call in _createWeatherSensorPlusChannel
* (marcus0303) Added CONTACT_INTERFACE_CHANNEL for HmIP-SCI (see Issue #70 ), Added FLOOR_TERMINAL_BLOCK_CHANNEL, HEAT_DEMAND_CHANNEL, DEHUMIDIFIER_DEMAND_CHANNEL, CHANGE_OVER_CHANNEL, but without functionality, because it's not implemented in REST-API. Only to supress Warnings in Log.

### 0.0.12
* (jogibear9988) multiple fixes

### 0.0.11
* (jogibear9988) multiple fixes

### 0.0.10
* (jogibear9988) added ping/pong, enable setBoots, more units, more hardware

### 0.0.9
* (jogibear9988) fullrx and operationlock channel

### 0.0.8
* (jogibear9988) fixes a few devices

### 0.0.7
* (jogibear9988) fixes wrong state handling

### 0.0.6
* (jogibear9988) fixes for more devices, alarm handling

### 0.0.5
* (jogibear9988) more devices and big refactoring (switched from DeviceType to FunctionalChannelType)

### 0.0.4
* (jogibear9988) more devices, bugfixes. thanks to TobiasF1986, steckenpferd and Ma-ster77

### 0.0.3
* (jogibear9988) bugfixes and more devices

### 0.0.2
* (jogibear9988) bugfixes, more devices and initial support of groups

### 0.0.1
* (jogibear9988) initial release

## License
The MIT License (MIT)

Copyright (c) 2018-2022 jogibear9988 <jochen.kuehner@gmx.de>, Apollon77

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