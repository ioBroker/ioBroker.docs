---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.netatmo/README.md
title: ioBroker.netatmo
hash: bk670U+rMWwr0qNMbyQuqQ1RYQFqNDk6YL86GaYfUMc=
---
![Логотип](../../../en/adapterref/iobroker.netatmo/admin/netatmo.png)

![Количество установок](http://iobroker.live/badges/netatmo-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.netatmo.svg)
![Тестирование и выпуск](https://github.com/PArns/iobroker.netatmo/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/netatmo/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.netatmo.svg)

# ioBroker.netatmo

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

Адаптер Netatmo для ioBroker

## **Важное примечание относительно событий в режиме реального времени (дверной звонок, приветствие, присутствие, датчики CO2/дыма).**

Для получения событий в реальном времени от Netatmo вам потребуется учетная запись iot/Pro-Cloud с лицензией Assistent или Remote-License и установленный экземпляр iot, подключенный к этой учетной записи. Версия iot Instance должна быть 1.14.0 или выше.

Пожалуйста, выберите экземпляр IoT в настройках адаптера и перезапустите адаптер.

В версиях адаптера Netatmo < 3.0 для передачи событий веб-хуков использовался сервис Heroku, но Heroku прекратил поддержку этого бесплатного сервиса. Поэтому все версии Netatmo < 3.0 больше не будут получать события в реальном времени с 28.11.2022! В связи с этим мы решили использовать проверенные и стабильные сервисы IoT/Pro-Cloud.

## **Важное примечание относительно изменений в аутентификации, внесенных в октябре 2022 года.**

Согласно Netatmo, «старый» способ аутентификации с помощью имени пользователя и пароля, вводимых непосредственно в адаптер, будет отключен к октябрю 2022 года.

В версии 2.0 адаптера исправлено это изменение и скорректирована аутентификация. Все обновления, выполненные до октября 2022 года, должны обеспечить беспроблемное обновление до версии 2.0.0 при первом запуске автоматически — в противном случае потребуется новая аутентификация.

## **Важное примечание для версии 2.0.0!**

В версии 2.0 адаптера структура объектов полностью изменится! Вместо имен мы решили использовать уникальные идентификаторы, чтобы гарантировать отсутствие проблем, связанных с дублирующимися или изменяющимися именами.

## Установка и настройка

Для аутентификации необходимо использовать свою учетную запись NetAtmo через пользовательский интерфейс администратора адаптера.

Сначала выберите все подходящие типы устройств, для которых вы хотите синхронизировать данные. При изменении типов устройств вам потребуется повторно пройти аутентификацию.

Если вы хотите использовать выделенный идентификатор клиента/секретный ключ (см. ниже), вы также можете ввести их перед аутентификацией.

Для запуска процесса аутентификации используйте кнопку «Аутентификация с Netatmo». Откроется новая вкладка с страницей входа в Netatmo. После входа в систему и подтверждения доступа к данным вы будете перенаправлены обратно на страницу администратора.

В случае успеха просто закройте окно и перезагрузите конфигурацию адаптера. В случае ошибки проверьте сообщение об ошибке и попробуйте снова.

По умолчанию для выполнения запросов используется общий ключ API, что ограничивает интервал обновления до 10 минут!

Чтобы увеличить интервал или получать обновления в режиме реального времени от Welcome & Presence, для датчиков угарного газа и дыма вам необходимо ввести собственный ID/секретный ключ в приложении NetAtmo. Для этого перейдите по следующему URL-адресу, войдите в свою учетную запись Netatmo и заполните необходимую форму по адресу <https://auth.netatmo.com/access/login?next_url=https%3A%2F%2Fdev.netatmo.com%2Fapps%2Fcreateanapp> !

Пожалуйста, убедитесь, что вы настроили ограничения, которые они учитывают: <https://dev.netatmo.com/guideline#rate-limits> (и имейте в виду, что эти ограничения действуют для ВСЕХ ПОЛЬЗОВАТЕЛЕЙ, даже если вы не используете собственный ID/секрет).

## Использование

Адаптер должен запрашивать все типы устройств, которые вы включили в конфигурацию. Если вы это измените, вам потребуется заново выполнить аутентификацию с помощью Netatmo.

Затем адаптер создает состояния с данными устройств и дополнительные состояния «событий» для устройств, которые это поддерживают. Для получения этих событий необходимо выбрать экземпляр IoT и добавить облачную учетную запись Pro (см. выше).

Некоторые устройства инициализируются последним событием соответствующего типа (если оно произошло в последний раз), например, камеры. Для других типов устройств (например, датчиков дыма/CO2) события не заполняются предварительно из прошлых данных, и эти состояния будут заполнены, как только будет получено следующее событие.

### Особое примечание к рольставням iDiamant/Bubendorff

API Netatmo не предоставляет данные об изменениях в работе рольставней в режиме реального времени. Это означает, что данные опрашиваются в заданном интервале опроса. По сути, это означает, что данные в режиме реального времени не будут точными, независимо от того, управляются рольставни напрямую или через приложение Netatmo.

При управлении устройствами через адаптер значения обновляются через 2 и 17 секунд после завершения управления, чтобы данные были более актуальными.

В зависимости от устройства, целевое положение может быть установлено на любое число от 0% до 100% ИЛИ только на 0% или 100% (и -1 для остановки). Но для этих действий также можно использовать удобные кнопки «открыть», «закрыть» и «остановить».

## отправить в службу поддержки

### убранство

Также можно использовать команду sendTo, чтобы установить статус «отсутствует» для всех пользователей (например, если система используется в качестве сигнализации).

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg'});
```

или

```
sendTo('netatmo.0', "setAway");
```

пометить всех людей как отсутствующих для всех камер

Также можно отметить одного или нескольких конкретных людей как отсутствующих.

```
sendTo('netatmo.0', "setAway", {homeId: '1234567890abcdefg', personsId: ['123123123123123']});
```

Параметр homeId — это строка, указанная после имени вашей камеры на вкладке «Объекты» (необязательно, если установлено несколько камер), personsId — это идентификатор в папке «Известные лица».

### setHome

По сути, та же функциональность, что описана выше для функции "setAway", также существует и для функции "setHome", позволяющей устанавливать статус "заняты" для отдельных лиц или целых домов.

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->

## Changelog

### __WORK IN PROGRESS__
* (@Apollon77) Removed the usage of a deprecated API from Netatmo which was used to enrich person data
* (@Apollon77) Added product type NACamDoorTag
* (@Apollon77) Allows value -2 for target position of Bubendorff roller shutters to put a Bubendorff shutter with jalousieable slats in jalousie mode

### 3.1.0 (2023-01-06)
* (Apollon77) Add support for Bubendorff roller shutters
* (Apollon77) Fix Monitoring State for Welcomes
* (Apollon77) Allow to just use CO2/Smoke sensors
* (Apollon77) Optimize Shutdown procedure

### 3.0.0 (2022-12-14)
* (Apollon77/bluefox) BREAKING CHANGE: Restructure Realtime events to be received via iot instance (iot >= 1.14.0 required)

### 2.1.2 (2022-11-17)
* (bluefox) Added missing objects for `Welcome` devices

### 2.1.1 (2022-09-30)
* (Apollon77) Make sure device types that require custom credentials are not selectable in UI without entering them
* (Apollon77) Fix a potential crash case

### 2.1.0 (2022-09-23)
* (Apollon77) Fix setAway
* (Apollon77) Adjust setAway/setHome message responses to return all errors/responses when multiple calls where done for multiple homes or persons

### 2.0.5 (2022-09-16)
* (Apollon77) Catch communication errors better

### 2.0.4 (2022-09-15)
* (Apollon77) Fix crash case with Smoke detector events

### 2.0.3 (2022-09-14)
* (Apollon77) Fixes and Optimizations for Doorbell devices

### 2.0.2 (2022-09-12)
IMPORTANT: This Adapter requires Admin 6.2.14+ to be configured!
* BREAKING: Object structure changes completely and now uses unique IDs instead of names!
* (Apollon77) Change the Authentication method as requested by Netatmo till October 2022
* (Apollon77) Doorbell integration
* (Apollon77) Converted to new APIs, values of several objects might be different
* (Apollon77) Fix crash cases reported by Sentry
* (Apollon77) Adjust setAway to the current API
* (Apollon77) Added setHome function (Welcome only) to mark all or specific persons as home (requires your own API key!)
* (Apollon77) setAway and setHome now also return the result of the call as callback tzo the message
* (Apollon77) Allow to edit floodlight and monitoring-state

### 1.7.1 (2022-03-30)
* (Apollon77) Fix Event cleanup

### 1.7.0 (2022-03-24)
* IMPORTANT: js-controller 3.3.19 is needed at least!
* (Apollon77) Activate events again (manually delete objects once if you get type errors)
* (Apollon77) Adjust some roles and written data to prevent warnings in logs

### 1.6.0 (2022-03-13)
* (Apollon77) Important: In person names (Welcome) in state IDs forbidden characters are now replaces by _!!
* (Apollon77) Fix another potential crash case reported by sentry

### 1.5.1 (2022-03-09)
* (Apollon77) Fix jsonconfig for Client secret

### 1.5.0 (2022-03-08)
* (kyuka-dom) Added support for netatmo carbon monoxide sensor.
* (kyuka-dom) Added support for netatmo smoke alarm.
* (foxriver76) prevent crashes if application limit reached
* (Apollon77) Allow to specify own id/secret in all cases
* (Apollon77/foxriver76) ensure that minimum polling interval of 10 minutes is respected if no individual ID/Secret is provided
* (Apollon77) Several pother fixes and optimizations
* (Apollon77) Add Sentry for crash reporting

### 1.4.4 (2021-07-21)
* (Apollon77) Fix typo that lead to a crash

### 1.4.3 (2021-06-27)
* (Apollon77) Fix typo to fix crash

### 1.4.2 (2021-06-27)
* (bluefox) Removed warnings about the type of states

### 1.4.0 (2021-06-24)
* (bluefox) Added the support of admin5 
* (bluefox) Removed warnings about the type of states

### 1.3.3
* (PArns) removed person history

### 1.3.2
* (PArns) Updated libs & merged pending patches
* (PArns) Changed update interval from 5 to 10 minutes (requested by Netatmo)

### 1.3.1
* (PArns) Fixed event cleanup crash

### 1.3.0
* (HMeyer) Added Netatmo Coach

### 1.2.2
* (PArns) Updated meta info

### 1.2.0
* (PArns) Fixed camera picture for events
* (PArns) Added camera vignette for events
* (PArns) Added camera video for events
* (PArns) Added new sub event type (human, vehicle, animal, unknown)
* (PArns) Added LastEventID within the LastEventData section

### 1.1.7
* (PArns) Added missing lib dependencies

### 1.1.6
* (PArns) Removed GIT requirement and included netatmo lib directly

### 1.1.5
* (PArns) Removed 502 error output if API has backend problems

### 1.1.4
* (PArns) Added support for unnamed modules

### 1.1.1
* (PArns) Simplified setAway

### 1.1.0
* (PArns) Added setAway function (Welcome only) to mark all or specific persons as away (requires your own API key!)

### 1.0.1
* (PArns) Fixed scope problems for presence & welcome (requires your own API key!)

### 1.0.0
* (PArns) Added live camera picture & stream for presence & welcome
* (PArns) Fixed known & unknown face image url for presence & welcome

### 0.6.2
* (PArns) Added name of last seen known face

### 0.6.1
* (PArns) Changed realtime server to use new general realtime server
* (PArns) Changed enums to channels to avoid enum creation
* (PArns) Simplified detection for movement-, known- & unknown- face events

### 0.6.0
* (PArns) Rewritten realtime updates to not need a local server any longer! Realtime updates are now turned on by default if a Welcome or Present cam is available

### 0.5.1
* (PArns) Optimized realtime updates to avoid updates if only movement was detected

### 0.5.0
* (PArns) Added realtime events for Netatmo Welcome

### 0.4.1
* (PArns) Removed log warnings for Wind sensor

### 0.4.0
* (PArns) Added absolute humidity
* (PArns) Added dewpoint

### 0.3.1
* (PArns) Reuse of preconfigured OAuth Client data
* (PArns) Added backward compatibility with existing installations

### 0.3.0
* (wep4you) Initial implementation of Netatmo welcome camera

### 0.2.2
* (PArns) Fixed SumRain24MaxDate & SumRain24Max which won't update in some rare cases

### 0.2.1
* (PArns) Corrected DateTime values & object types

### 0.2.0
* (PArns) Added SumRain1Max/SumRain1MaxDate & SumRain24Max/SumRain24MaxDate to get overall rain max since adapter installation

### 0.1.1
* (PArns) Fixed TemperatureAbsoluteMin/TemperatureAbsoluteMax

### 0.1.0
* (PArns) Fixed CO2 calibrating status
* (PArns) Added last update for devices
* (PArns) Added TemperatureAbsoluteMin/TemperatureAbsoluteMax to get overall temperature min/max since adapter installation

### 0.0.4
* (PArns) Fixed typo/missing parameter in GustStrength

### 0.0.3
* (PArns) Added error handling to prevent exceptions for missing parameters

### 0.0.2
* (PArns) Fixed rain sensor

### 0.0.1
* (PArns) Initial release

## License
MIT

Copyright (c) 2016-2025 Patrick Arns <iobroker@patrick-arns.de>