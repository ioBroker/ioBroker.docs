---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.owntracks/README.md
title: ioBroker.owntracks
hash: IAemSdd1zL0l6vbLjHNYPc7c0Afbdkgbf1C+h7zOyXw=
---
![Логотип](../../../en/adapterref/iobroker.owntracks/admin/owntracks.png)

![Количество установок](http://iobroker.live/badges/owntracks-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.owntracks.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.owntracks.svg)

# IoBroker.owntracks
![Тестируйте и выпускайте](https://github.com/iobroker-community-adapters/ioBroker.owntracks/workflows/Test%20and%20Release/badge.svg) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/owntracks/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

[собственные треки](http://owntracks.org/) – это приложение для Android и iOS.

Приложение постоянно отправляет вашу позицию (положение устройства) на определенный сервер. В нашем случае это будет сервер ioBroker. Для связи будет использоваться либо протокол MQTT, либо адаптер ioBroker.cloud/ioBroker.iot.

Ссылка для:

– Android: [https://play.google.com/store/apps/details?id=org.owntracks.android](https://play.google.com/store/apps/details?id=org.owntracks .андроид)
- iOS: [https://itunes.apple.com/de/app/owntracks/id692424691?mt=8](https://itunes.apple.com/de/app/owntracks/id692424691?mt=8)

## Инструкции по настройке
### Конфигурация подключения (с использованием MQTT-сервера)
Адаптер OwnTracks запускает на порту 1883 (настраиваемый) сервер MQTT для получения сообщений от устройств с координатами.
Проблема в том, что этот сервер должен быть доступен из Интернета.
Обычно имеется маршрутизатор или брандмауэр, который необходимо настроить для пересылки трафика.

### Конфигурация приложения и адаптера
Следующие настройки должны быть установлены в приложении Android / iOS соответственно в адаптере ioBroker:

- Соединение/режим - MQTT private
- Connection/Host/Host - IP-адрес вашей системы или домена DynDNS. Например. http://www.noip.com/ позволяет использовать доменное имя вместо IP-адреса.
- Connection/Host/Port - 1883 или ваш порт на роутере
- Соединение/хост/веб-сокеты - false
- Подключение/Идентификация/Имя пользователя - iobroker
- Соединение/Идентификация/Пароль - из настроек адаптера
- Connection/Identification/DeviceID - Имя устройства или человека. Для этого устройства будут созданы состояния. Например. если deviceID имеет значение «Mark», после первого контакта будут созданы следующие состояния:

    - owntracks.0.users.Mark.longitude
    - owntracks.0.users.Mark.latitude

- Соединение/Идентификация/TrackerID - Краткое имя пользователя (до 2 букв) для записи на карту.
- Соединение/Безопасность/TLS - выкл.
- Advanced/Encryption Key — необязательно, но рекомендуется: добавьте парольную фразу для шифрования

Убедитесь, что owntracks подключен к экземпляру iobroker через запись «Статус» в ящике:

![Настройки](../../../en/adapterref/iobroker.owntracks/img/connection.jpg)

### ВАЖНАЯ ЗАМЕТКА!
**Состояния в ioBroker будут генерироваться при получении конкретной полезной нагрузки!! Это означает, что локации в ioBroker будут генерироваться при первом входе или выходе пользователя из локации.** Ниже вы увидите целевую структуру.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/structure.png)

### Конфигурация регионов
Чтобы настроить местоположения в адаптере owntracks, вам необходимо создать регионы в приложении owntracks для Android / iOS.
Для этого перейдите в «Регионы» в ящике

![Настройки](../../../en/adapterref/iobroker.owntracks/img/regions1.jpg)

Создайте новый регион, нажав плюс (+) в правом верхнем углу.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/regions2.jpg)

Используйте кнопку местоположения в правом верхнем углу, чтобы получить текущее местоположение, или введите их самостоятельно в поля Широта и Долгота. Кроме того, укажите радиус для местоположения. Если вы делитесь местоположением, ваши Друзья (см. в выдвижном ящике приложения для Android/iOS) получают уведомление, когда вы входите в местоположение/покидаете его.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/regions3.jpg)

### Настройки значков (в адаптере ioBroker.owntracks)
Вы можете определить для каждого пользователя значок. Просто загрузите изображение путем перетаскивания или щелчком мыши. Он будет автоматически масштабирован до 64x64.

Имя должно совпадать с DeviceID в приложении OwnTracks.

![Настройки](../../../en/adapterref/iobroker.owntracks/img/settings1.png)

## Changelog
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

## License
The MIT License (MIT)

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
