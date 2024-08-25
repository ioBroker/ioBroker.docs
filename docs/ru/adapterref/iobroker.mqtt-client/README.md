---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.mqtt-client/README.md
title: ioBroker.mqtt-клиент
hash: zW4LoHreN+gpPCnvEs3vSptN0V+v1rINjKN992x61hE=
---
![Логотип](../../../en/adapterref/iobroker.mqtt-client/admin/mqtt-client.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.mqtt-client?style=flat-square)
![Загрузки](https://img.shields.io/npm/dm/iobroker.mqtt-client?label=npm%20downloads&style=flat-square)
![узел-lts](https://img.shields.io/node/v-lts/iobroker.mqtt-client?style=flat-square)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.mqtt-client?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.mqtt-client?style=flat-square)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/iobroker.mqtt-client?logo=github&style=flat-square)
![Статус рабочего процесса GitHub](https://img.shields.io/github/actions/workflow/status/iobroker-community-adapters/iobroker.mqtt-client/test-and-release.yml?branch=master&logo=github&style=flat-square)
![Бета](https://img.shields.io/npm/v/iobroker.mqtt-client.svg?color=red&label=beta)
![Стабильный](http://iobroker.live/badges/mqtt-client-stable.svg)
![Установлен](http://iobroker.live/badges/mqtt-client-installed.svg)

# IoBroker.mqtt-клиент
## Версии
Публикация и подписка состояний ioBroker на MQTT Brokers.

## Часовой
**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Настройки адаптера
![Адаптер](../../../en/adapterref/iobroker.mqtt-client/img/settings.png)

### При подключении темы и сообщения
```on connect message``` публикуется в ```on connect topic``` каждый раз, когда клиент подключается или повторно подключается к серверу.

### При отключении темы и сообщения
```on disconnect message``` публикуется в ```on disconnect topic```, когда адаптер корректно останавливается.

### Последняя тема и сообщение
```last will message``` публикуется в ```last will topic``` каждый раз, когда клиент подключается или повторно подключается к серверу.
Сервер сохранит это сообщение и отправит его своим подписчикам, когда клиент неожиданно отключится.

### Подписки
Список тем, разделенных запятыми, которые не охвачены существующими штатами.
Полученные сообщения преобразуются в состояния в пространстве имен адаптера (например, mqtt.0) и подписываются.
Вы можете удалять темы после создания всех состояний.

### Префикс публикации
При публикации это будет добавлено ко всем темам.
По умолчанию пусто (без префикса).

### Префикс подписки
При подписке это будет добавлено ко всем темам.
По умолчанию пусто (без префикса).

## Настройки состояния
![Состояние](../../../en/adapterref/iobroker.mqtt-client/img/dialog.png)

### Включено
Включает или отключает функциональность mqtt-client для этого состояния.
Отключение приведет к удалению всех настроек mqtt-клиента из этого состояния.

### Тема
Тема, в которой опубликовано это состояние и на которую подписано.
по умолчанию: идентификатор состояния преобразован в тему mqtt.

### Опубликовать
* Состояние ```enable``` будет опубликовано
* ```changes only``` состояние будет опубликовано только при изменении его значения.
* ```as object``` все состояние будет опубликовано как объект
* ```qos``` см. <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```сохранить``` см. <http://www.hivemq.com/blog/mqtt-essentials-part-8-retained-messages>

### Подписаться
* Тема ```enable``` будет подписана, и состояние будет соответствующим образом обновлено.
* ```changes only``` состояние будет записано только при изменении значения
* Сообщения ```as object``` будут интерпретироваться как объекты
* ```qos``` см. <http://www.hivemq.com/blog/mqtt-essentials-part-6-mqtt-quality-of-service-levels>
* ```ack``` при обновлении состояния флаг подтверждения будет установлен соответствующим образом.

#### Примечание
* когда для ack установлено значение true, объекты ack будут перезаписаны, см. ```as object```
* во избежание зацикливания сообщений, если включены и публикация, и подписка, для подписки всегда включен параметр «Только изменения».

<!-- Заполнитель следующей версии (в начале строки):

### __РАБОТА В ПРОГРЕССЕ__ -->

## Changelog
### __WORK IN PROGRESS__
* (@klein0r) Added missing information in configuration dialog

### 2.0.0 (2024-06-21)
* (klein0r) Password is now encrypted - you have to re-renter your password in instance settings!
* (klein0r) Use jsonConfig instead of materialize (for instance settings)

### 1.8.0 (2024-04-07)
* (mcm1957) Adapter requires node.js 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.7.0 (2023-10-30)

* (mcm1957) Dependencies have been updated
* (mcm1957) Adapter requires nodejs 16 now

### 1.6.5 (2023-09-28)
* (foxriver76) prevent crash cases on invalid subscribe

### 1.6.4 (2023-07-26)
* (DutchmanNL) Option to allow self-signed certificates in adapter settings added.

### 1.6.3 (2022-06-16)
* (Apollon77) Prevent potential crash cases reported by Sentry

### 1.6.2 (2022-04-02)
* (Apollon77) Prevent potential crash cases reported by Sentry

### 1.6.1 (2022-02-24)
* (Pmant) fix subscriptions
* (Pmant) fix unsubscribing
* (Pmant) use prefix for LWT topic

### 1.6.0 (2022-02-19)
* (Pmant) add option to select protocol version
* (Pmant) add websocket support
* (Pmant) publish values once on enabling publishing
* (Pmant) Upgrade to MQTT version 4 (resolves many connection issues)
* (Pmant) fix LWT documentation
* (Pmant) optionally publish a message when disconnecting gracefully

### 1.5.0 (2022-01-26)
* IMPORTANT: This adapter now required at least js-controller 3.3.x
* (Apollon77) Fix crash cases

### 1.4.1 (2022-01-26)
* (bluefox) js-controller 3.3 optimizations

### 1.4.0 (2021-07-16)
* IMPORTANT: This adapter now required at least js-controller 2.0.0
* (Apollon77) js-controller 3.3 optimizations
* (AlCalzone) Unpublished expired states
* (AlCalzone) Only handle stat values if state exists

### 1.3.2 (2021-04-19)
* (bluefox) Added support of admin5

### 1.3.1 (2020-03-17)
* (bluefox) mqtt package moved back to 2.x

### 1.3.0 (2020-03-11)
* (bluefox) mqtt package was updated
* (bluefox) Fixed the error with "custom" view

### 1.2.1 (2019-10-17)
* (algar42) Fix adapter restarting
* (algar42) Fix mqtt issues

### 1.2.0 (2019-10-14)
* (bluefox) Support of js-controller 2.0 was added

### 1.1.1 (2018-01-30)
* (bluefox) small fixes

### 1.1.0 (2017-12-30)
* (bluefox) Translations
* (bluefox) Update of MQTT module

### 1.0.1 (2017-11-16)

### 1.0.0 (2017-11-16)
* (bluefox) Update io-package.json

### 0.3.2 (2016-11-18)
* (Pmant) fix initial object parsing
* (Pmant) fix objects view

### 0.3.1 (2016-11-16)
* (Pmant) fix crash

### 0.3.0 (2016-09-08)
* (Pmant) add optional publish and subscribe prefixes

### 0.2.5 (2016-09-08)
* (Pmant) reduce logging -> debug

### 0.2.0 (2016-09-08)
* (Pmant) use new custom settings

### 0.1.1 (2016-06-09)
* (Pmant) fix possible loop

### 0.1.0 (2016-06-08)
* (Pmant) initial commit

## License
The MIT License (MIT)

Copyright (c) 2024, iobroker-community-adapters <iobroker-community-adapters@gmx.de>
Copyright (c) 2016-2023 Pmant

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
