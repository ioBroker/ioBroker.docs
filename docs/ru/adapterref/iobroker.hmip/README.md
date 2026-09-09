---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.hmip/README.md
title: ioBroker HomeMatic IP Cloud AccessPoint Adapter
hash: FrXVpPGvYEj7NmX5B3M+xPpqXtmePtMP42QH+ZVqgOQ=
---
![Логотип](../../../en/adapterref/iobroker.hmip/admin/homematic.png)

![Количество установок](http://iobroker.live/badges/hmip-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.hmip.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.hmip.svg)

# ioBroker HomeMatic IP Cloud AccessPoint Adapter

![Тестирование и выпуск](https://github.com/iobroker-community-adapters/iobroker.hmip/workflows/Test%20and%20Release/badge.svg)
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/hmip/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отчеты об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Система отчетности Sentry используется начиная с js-controller 3.0.

## Отказ от ответственности

**Все названия продуктов и компаний, а также логотипы являются товарными знаками™ или зарегистрированными® товарными знаками соответствующих владельцев. Их использование не подразумевает какой-либо связи с ними или их дочерними компаниями, а также не подразумевает одобрения с их стороны! Этот личный проект ведется в свободное время и не преследует коммерческих целей.**
**HomeMatic — товарный знак компании ELV Elektronik AG.**

## Описание

Этот адаптер обеспечивает связь с точкой доступа HomematicIP CloudAccessPoint через REST API облачной платформы HomematicIP Cloud.

**Важное примечание:** Пожалуйста, сведите количество запросов на управление к минимуму, поскольку EQ-3 начал блокировать IP-адреса при чрезмерном количестве запросов!

## Установка

Вот пошаговое видео по установке на YouTube.
<https://youtu.be/kXWfJRUYJIA>

## Информация

Большинство IP-устройств Homematic уже работают с последней версией адаптера.

Я буду постоянно его улучшать, но это займет время. Любая помощь от сообщества, например, через Pull Request, будет очень кстати.

Для неработающих устройств HmIP, пожалуйста, создайте заявку с указанием следующей информации (пожалуйста, по одной заявке на каждое устройство и, если возможно, укажите техническое название в теме письма). Переключите логирование адаптера в ioBroker в режим "silly mode" и добавьте JSON-данные устройства, которые выводятся в лог, в заявку. Мне также может понадобиться JSON-данные об изменении состояния.

Спасибо!

Если вас интересует информация о том, включена ли сигнализация, прочитайте следующее: `homes.<homeId>.functionalHomes.securityAndAlarm.securityZonesArmedMode`. Он отображает зоны вооружения в соответствии с терминологией панели управления, используемой в доме: `OFF`, `PRESENCE` (только по периметру) или `ABSENCE` (удален) на панели управления, основанной на запросах, и `OFF`, `INTERNAL`, `EXTERNAL` или `INTERNAL_AND_EXTERNAL` на классическом варианте. `internalZoneArmed` и `externalZoneArmed` Рядом с ним отображается та же информация, что и классическая пара логических значений на любой из панелей управления. Для постановки или снятия с охраны необходимо указать режим. `activateSecurityZones`.

Обратите внимание, что `functionalHomes.securityAndAlarm.active` Это не показатель наличия вооружения в доме — он сообщает, есть ли в доме вообще какое-либо средство обеспечения безопасности.

## Важная информация о том, что можно делать с этим адаптером.

!!! С помощью этого адаптера можно запускать только те события, которые можно запустить через оригинальное приложение Homematic IP. Например, прямые соединения между устройствами не имеют событий в приложении и также не могут быть запущены через этот адаптер!!!

## Настройки

- Введите SGTIN (на задней панели точки доступа) и PIN-код (если он был установлен ранее), а затем подтвердите данные, нажав синюю светодиодную кнопку. Это создаст токен аутентификации.

## Специальные настройки

### HMIP-DLD (привод дверного замка)

Если вы назначили PIN-код замку в приложении HmIP (Настройки / Авторизация доступа - на немецком: "Zutrittsberechtigungen"), то PIN-код необходимо установить в состоянии PIN-кода объектов устройства. Это НЕ ваш системный PIN-код! Если вы не установили PIN-код в настройках, вы также можете оставить поле состояния PIN-кода пустым. Кроме того, добавьте клиент "iobroker" в список клиентов контроля доступа в настройках приложения HmIP!

## Блок управления домом (БУД)

В работе с HCU изменился рабочий процесс.

Нажмите кнопку один раз перед началом создания токена. Это активирует удаленный доступ на 5 минут. Затем нажмите кнопку еще раз, когда это потребуется в процессе сопряжения.

Большое спасибо @dietzm за добавление поддержки HCU в этот адаптер.

## Спасибо

- Спасибо @coreGreenberet за его библиотеку Python (<https://github.com/coreGreenberet/homematicip-rest-api>)

## Обсуждение на форуме ioBroker

<https://forum.iobroker.net/topic/27532/homematic-ip-cloud-access-point-adapter>

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

## Changelog
### 3.2.0 (2026-09-08)
- (@Apollon77) Added the DISTANCE_SENSOR_CHANNEL, so the ELV-SH-DUSI ultrasonic distance sensor interface reports distance, calculatedHeight and referenceHeight in cm, measuringInterval in minutes, heightActivated and distanceSensorVoltage
- (@Apollon77) Added the FLOOR_TERMINAL_BLOCK_CHANNEL of the floor heating actuators (HmIP-FAL230-C6/C10, HmIP-FALMOT-C12), reporting valvePosition and the humidity limiter, dew point, external clock, emergency operation and frost protection states
- (@Apollon77) The FLOOR_TERMINAL_BLOCK_LOCAL_PUMP_CHANNEL now reports those same states in addition to its pump times
- (@Apollon77) The SINGLE_KEY_CHANNEL now reports acousticSendStateEnabled, actionParameter, doorBellSensorEventTimestamp, doublePressTime and visibleChannelIndex

### 3.1.1 (2026-08-29)
- (@Apollon77) Added functionalHomes.securityAndAlarm.securityZonesArmedMode, internalZoneArmed and externalZoneArmed, so the armed state of the alarm system is readable on the home instead of only on the security zone group
- (@Apollon77) Added functionalHomes.securityAndAlarm.activateSecurityZones: write OFF, PRESENCE, ABSENCE, INTERNAL, EXTERNAL or INTERNAL_AND_EXTERNAL to arm or disarm. Every mode works on both the classic and the request-based dashboard
- (@Apollon77) Fixed a home with both INTERNAL/EXTERNAL and ABSENCE/PRESENCE zones reading as disarmed while one of the families was armed
- (@Apollon77) A security journal event that carries no home now reads the configuration at most once every five minutes instead of once per event; some homes raise that event every few minutes

### 3.0.0 (2026-08-24)
- (@Apollon77) **Breaking:** shutterLevel, slatsLevel, dimLevel, primaryShadingLevel, secondaryShadingLevel and minimumFloorHeatingValvePosition now report 0..100 on the channels that declare that range, matching the ioBroker convention and the range the datapoint has always advertised. They previously advertised 0..100 but reported the cloud's 0..1 fraction. Writing is unchanged: a value above 1 is read as a percentage, anything else as a fraction
- (@Apollon77) Fixed arming/disarming the alarm system on the new request-based security dashboard (ABSENCE/PRESENCE security zones)
- (@Apollon77) On the request-based security dashboard a blocked alarm activation is now logged with the devices that prevented it, instead of looking like it succeeded
- (@Apollon77) On the request-based security dashboard a low battery no longer blocks arming; the affected devices are logged as a warning instead
- (@Apollon77) Fixed removed groups and clients being deleted from the wrong internal cache
- (@Apollon77) Fixed particulateNumberConcentrationTen never being filled on the HmIP-SFD, a mistyped state name wrote it to a nonexistent datapoint
- (@Apollon77) Added support for 45 further device channel types with 343 new states, covering the door lock pro, the keypads, the wired Wiegand interface, the watering actuator, the water supply stop, the soil moisture sensor, the universal actuator and dimmer, the wall switch status LEDs, the glass displays and thermostats, and devices bridged through the HCU including their weather, energy and battery readings
- (@Apollon77) Every device now reports its own hardware faults: overheated, overloaded, undervoltage, temperature out of range and the three co-processor states
- (@Apollon77) 3 channel types that carry no value of their own are no longer reported as unknown
- (@Apollon77) All device channel handling now comes from one table instead of 122 hand-written methods, with no change to any object or value
- (@Apollon77) The newly supported channels can now be controlled, not only read: the wall switch status LEDs, the display backlight, the universal dimmer and actuator, the door lock pro, the door opener, the watering actuator, bridged switches and lights, and bridged window coverings
- (@Apollon77) Fixed hue, saturationLevel and colorTemperature on universal lights, which were writable but dispatched to a command that did not exist (HmIP-RGBW)
- (@Apollon77) Fixed inAppWaterAlarmTrigger, which was writable but never sent to the cloud
- (@Apollon77) 18 states that were writable with no command behind them are now read-only, and changeOverDelay no longer throws when written
- (@Apollon77) Fixed the stop and resetEnergyCounter buttons being labelled "on" in the admin UI
- (@Apollon77) Added the remaining commands the HomematicIP cloud offers, 88 endpoints in total, and exposed the ones with a datapoint to attach to
- (@Apollon77) Switching groups can now be switched, and their shutter and slats levels set - the group on/off datapoint never reached the cloud before
- (@Apollon77) New controls: motion detection on and off, pull latch, watering toggle and water volume reset, passage counter reset, favourite shading position, MP3 sound file and volume, light scenes, whole-home cooling and the alarm zone activation delay
- (@Apollon77) Fixed the misspelled setNotificationSoundTyp endpoint, which meant the notification sound was never set
- (@Apollon77) Fixed motionBufferActive, endpositionAutoDetectionEnabled, dim2WarmActive and humanCentricLightActive, which switched the device on or off instead of doing what their name says
- (@Apollon77) Dimming, colour, optical signals and watering can now be given a time: set controlOnTime and/or controlRampTime on the channel and the command ramps instead of jumping. Both default to 0, which keeps the previous behaviour
- (@Apollon77) Fixed the dim level never being scaled for RGB and optical signal commands, where a state object was compared against a number
- (@Apollon77) Corrected the role of 54 writable datapoints, which carried a read-only role and so were not recognised by the ioBroker type detector - dimmers, blinds, switches and timers are now typed as such
- (@Apollon77) Fixed the dim level being sent unscaled by the light scene, hue/saturation and colour temperature commands, so a percentage reached a cloud endpoint that expects a fraction
- (@Apollon77) Fixed a valve with no reported position being published as 0 percent, and one that reports nothing at all as NaN
- (@Apollon77) A level command with a control time is no longer suppressed when the level is unchanged, so "switch on for 30 seconds" works at the level the device already has
- (@Apollon77) Silent alarm can now be set per zone, and each security zone reports its silent, window, motion, presence and sabotage state
- (@Apollon77) Heating profile mode can now be set on hot water and shutter profile groups, and those two group types are now supported
- (@Apollon77) Extended linked switching and notification groups are now supported, including their on time
- (@Apollon77) The home now reports its power meter currency, and its unit price can be set
- (@Apollon77) The security journal is now available (issue #31): the full list as JSON plus the newest entry split into its own datapoints, refreshed when the cloud announces a change and on demand
- (@Apollon77) Automation rules are now visible under `rules.<id>` and simple rules can be enabled, disabled and relabelled - the rule metadata the cloud sends was previously discarded
- (@Apollon77) Fixed vacation mode never working: the temperature was read off a promise instead of the state, the end time was sent under the wrong name, and the temperature datapoint could not be set at all
- (@Apollon77) A websocket the cloud drops silently is now noticed and reconnected, instead of leaving the adapter connected but permanently silent
- (@Apollon77) Fixed the websocket auto-reconnect being disabled for good after the first internal reconnect
- (@Apollon77) A home the cloud sends without functional homes no longer crashes the adapter
- (@Apollon77) Debounced writes no longer outlive the adapter being stopped
- (@Apollon77) Fixed datapoints that an earlier version published as writable still sending their old command after an upgrade, even though they are now read-only - writing a diagnostic datapoint could switch the device
- (@Apollon77) Corrected the role of 25 read-only datapoints that carried a controllable role, and made 2 datapoints readable that were published as neither readable nor writable
- (@Apollon77) A command meant for the channel's groups now reports that the channel belongs to none, instead of failing silently
- (@Apollon77) Fixed locking a door failing when no authorization PIN had been set
- (@Apollon77) On the request-based security dashboard an activation the panel accepts without reporting any detail is now logged as unconfirmed, instead of being reported as armed and possibly carrying a low-battery warning that implied it armed
- (@Apollon77) **Breaking:** valvePosition on a heating thermostat now reports 0..100 with a unit, like the floor terminal block already did - the cloud sends a 0..1 fraction for both and only one of them was scaled. The internal switch channel now reports its valvePosition too
- (@Apollon77) Rain counters now report the millimetres the sensor measured instead of the cloud's accumulated floating point drift, so 0.3 mm no longer arrives as 0.3000000000001819, and all nine of them carry the mm unit
- (@Apollon77) Fixed the device that raised an alarm never being reported: the cloud names it only inside alarmEventDeviceChannel, so alarmEventDeviceId was always empty and the channel datapoint was fed an object it could not hold. Both are filled now, and the device's label is published beside them

### 2.0.0 (2026-08-03)
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 8.0.0 now
- (mcm1957) Dependencies have been updated.
- (@GermanBluefox) Migrated to admin 8

### 1.27.0 (2025-03-24)
* (mcm1957) Adapter requires admin 7.6.3, js-controller 6.0.11 and node.js 20 now.
* (@GermanBluefox) GUI was migrated to TypeScript (Admin 7.6)
* (SliX185) Support to control opticalSignalBehaviour for HMIP-BSL has been added.
* (SliX185) Logging of PIN has been removed
* (mcm1957) Dependencies have been updated.

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
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