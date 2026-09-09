---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.owntracks/README.md
title: ioBroker.owntracks
hash: cuJxeIjDYvc9sY/Z959OXbYlwQFHQlFGsc53NsuVCQ4=
---
![Логотип](../../../en/adapterref/iobroker.owntracks/admin/owntracks.png)

![Количество установок](http://iobroker.live/badges/owntracks-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.owntracks.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.owntracks/workflows/Test%20and%20Release/badge.svg)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/owntracks/svg-badge.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.owntracks.svg)

# ioBroker.owntracks

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Более подробную информацию, а также инструкции по отключению отправки сообщений об ошибках см. [в документации Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry) ! Система отчетности Sentry используется начиная с js-controller 3.0.

[OwnTracks](http://owntracks.org/) — это приложение для Android и iOS.

Приложение непрерывно отправляет ваше местоположение (местоположение устройства) на определенный сервер. В нашем случае это будет сервер ioBroker. Для связи будет использоваться либо протокол MQTT, либо адаптер ioBroker.cloud / ioBroker.iot.

Ссылка для:

- Android: <https://play.google.com/store/apps/details?id=org.owntracks.android>
- iOS: <https://itunes.apple.com/de/app/owntracks/id692424691?mt=8>

## Инструкции по установке

### Настройка подключения (с использованием MQTT-сервера)

Адаптер OwnTracks запускает на порту 1883 (настраиваемом) MQTT-сервер для приема сообщений от устройств с координатами. Проблема в том, что этот сервер должен быть доступен из интернета. Обычно для этого используется маршрутизатор или брандмауэр, которые необходимо настроить для переадресации трафика.

### Настройка приложения и адаптера

В адаптере ioBroker для Android/iOS необходимо установить следующие параметры:

- Режим подключения/Можный режим - Приватный MQTT

- Connection/Host/Host - IP-адрес вашей системы или домена DynDNS. Например, <http://www.noip.com/> — давайте используем доменное имя вместо IP-адреса.

- Подключение/Хост/Порт - 1883 или порт вашего маршрутизатора.

- Connection/Host/WebSockets - false

- Подключение/Идентификация/Имя пользователя - iobroker

- Подключение/Идентификация/Пароль — из настроек адаптера

- Connection/Identification/DeviceID - Имя устройства или пользователя. Для этого устройства будут созданы состояния. Например, если deviceID равен "Mark", после первого контакта будут созданы следующие состояния:

  - owntracks.0.users.Mark.longitude
  - owntracks.0.users.Mark.latitude

- Connection/Identification/TrackerID - Краткое имя пользователя (до 2 букв), которое нужно указать на карте.

- Подключение/Безопасность/TLS - выключено

- Расширенные параметры/Ключ шифрования — необязательно, но рекомендуется: добавьте парольную фразу для шифрования.

Пожалуйста, убедитесь, что owntracks подключен к экземпляру iobroker, проверив его состояние в разделе "Статус" в боковой панели:

![Настройки](../../../en/adapterref/iobroker.owntracks/img/connection.jpg)

### ВАЖНОЕ ЗАМЕЧАНИЕ!

**Состояния в ioBroker будут генерироваться при получении конкретной полезной нагрузки! Это означает, что местоположения в ioBroker будут генерироваться при первом выходе или входе пользователя в это местоположение.** Ниже вы увидите целевую структуру.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/structure.png)

### Конфигурация регионов

Для настройки местоположений в адаптере owntracks необходимо создать регионы в приложении owntracks для Android/iOS. Для этого перейдите в раздел «Регионы» в боковом меню.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/regions1.jpg)

Создайте новый регион, нажав на значок плюса (+) в правом верхнем углу.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/regions2.jpg)

Используйте кнопку «Местоположение» в правом верхнем углу, чтобы узнать текущее местоположение, или введите широту и долготу самостоятельно. Кроме того, укажите радиус для местоположения. Если вы поделитесь местоположением, ваши друзья (см. в боковой панели приложения для Android/iOS) получат уведомление, когда вы войдете в это местоположение или покинете его.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/regions3.jpg)

### Настройки значков (в адаптере ioBroker.owntracks)

Вы можете задать иконку для каждого пользователя. Просто загрузите изображение, перетащив его в окно, или щелкните по нему мышью. Оно будет автоматически масштабировано до размера 64x64.

Имя должно совпадать с DeviceID в приложении OwnTracks.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/settings1.png)

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### **WORK IN PROGRESS**
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.1.0 (2024-04-22)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.0.5 (2022-10-08)
* (Apollon77) Prepare for future js-controller versions

### 1.0.4 (2022-09-15)
* (Apollon77) Fix crash case reported by Sentry

### 1.0.3 (2022-06-17)
* (Apollon77) Fix several crash cases reported by Sentry

### 1.0.2 (2022-04-19)
* (Apollon77) Optimize handling for cases with invalid history state values

### 1.0.1 (2022-03-12)
* (Garfonso) fix roles for type detection
* (Apollon77) Add Sentry for crash reporting

### 1.0.0 (2020-12-06)
* (Apollon77) respect "bind" configuration, also for IPv6

### 0.6.3 (2020-05-12)
* (Apollon77) updated dependencies
* (bluefox) fixes some issues

### 0.6.2 (2019-02-14)
* (zefau) Added support for [ioBroker compact mode](https://forum.iobroker.net/viewtopic.php?f=24&t=20387#p213466)
* (zefau) Added support for Gulp translations

### 0.6.0 (2019-01-27)
* (zefau) Added Admin v3 / materialized support
* (zefau) Added option for websockets in the adapter settings

### 0.5.1 (2019-01-25)
* (zefau) fixed an error when connection got closed

### 0.5.0 (2018-10-14)
* (zefau) Added support for locations

### 0.4.0 (2018-10-14)
* (zefau) Added support for encryption key

### 0.3.0 (2018-06-05)
* (matspi) Fix handling of publish messages

### 0.2.0 (2017-01-03)
* (jp112sdl) added two properties timestamp and datetime

### 0.1.1 (2016-09-05)
* (bluefox) add pictures

### 0.1.0 (2016-09-04)
* (bluefox) initial release

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.owntracks/blob/master/CHANGELOG_OLD.md)

## License
The MIT License (MIT)


Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2016-2022 bluefox<dogafox@gmail.com>

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