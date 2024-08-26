---
BADGE-NPM: https://nodei.co/npm/iobroker.fullybrowser.png?downloads=true
BADGE-NPM version: http://img.shields.io/npm/v/iobroker.fullybrowser.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fullybrowser.svg
BADGE-GitHub last commit: https://img.shields.io/github/last-commit/arteck/ioBroker.fullybrowser
BADGE-GitHub issues: https://img.shields.io/github/issues/arteck/ioBroker.fullybrowser
BADGE-License: https://img.shields.io/badge/License-MIT-blue.svg
BADGE-Number of Installations: http://iobroker.live/badges/fullybrowser-installed.svg
BADGE-Beta: https://img.shields.io/npm/v/iobroker.fullybrowser.svg?color=red&label=beta
BADGE-Stable: https://iobroker.live/badges/fullybrowser-stable.svg
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fullybrowser/README.md
title: без заголовка
hash: KsmbgnWJZz4LQf3vFtp3jSzjdp/2sdxgNWfoJ0c0kkc=
---
![Логотип](../../../en/admin/fully-mqtt_500.png)

## Об этом адаптере
С помощью этого адаптера [Полностью киоск-браузер] (https://www.complete-kiosk.com) (с лицензией Plus) можно контролировать. Через [REST API](https://www.fully-kiosk.com/en/#rest) различные команды, такие как «включение/выключение экрана», «включение/выключение заставки» и т. д., можно отправлять на Fully.

Кроме того, события [MQTT](https://www.fully-kiosk.com/en/#mqtt) (например, «включение экрана») всегда немедленно передаются адаптеру и устанавливаются в соответствующие состояния. Кроме того, Fully Browser всегда автоматически отправляет всю информацию об устройстве через MQTT, по крайней мере, каждые 60 секунд, которые соответствующим образом устанавливаются в состояние информации. Обратите внимание, что все команды отправляются через REST API, а не MQTT, поскольку Fully Browser не поддерживает отправку команд через MQTT.

## Полнобраузерные настройки
### Активировать удаленное администрирование
1. На планшете откройте приложение Fully Browser и откройте настройки Fully Browser.
1. Откройте пункт меню **Удаленное администрирование (ПЛЮС)**.
1. Включите **Включить удаленное администрирование**.
1. **Пароль удаленного администратора**: введите пароль.
1. Включите **Удаленное администрирование из локальной сети**.

![Логотип](../../../en/adapterref/_img/fully-browser-settings-remote-admin.png)

### Активировать MQTT
1. На планшете откройте приложение «Полный браузер» и откройте «Настройки». Кроме того, вы также можете открыть удаленное администрирование с другого устройства (например, ПК) из браузера, URL-адрес обычно всегда http://ip-адрес:2323, вам будет предложено ввести пароль, назначенный выше.
2. Откройте: **Настройки** -> **Другие настройки** -> **Интеграция MQTT (PLUS)**.
3. Включите **Включить MQTT**.
4. **URL-адрес MQTT-брокера**: введите в формате `mqtt://iobroker-ip-address:3000`, где `iobroker-ip-address` — это IP-адрес ioBroker, а `3000` — это номер порта, используемый для соединения MQTT.
5. **Имя пользователя MQTT Broker**: здесь вы можете дополнительно ввести имя пользователя.
6. **Пароль брокера MQTT**: здесь вы можете дополнительно ввести пароль.
7. **Идентификатор клиента MQTT**: можно оставить пустым.
8. **Тема с информацией об устройстве MQTT**: здесь вы можете оставить настройку по умолчанию, она не будет использоваться адаптером.
8. **Тема события MQTT**: здесь вы можете оставить настройку по умолчанию, она не будет использоваться адаптером.

![Логотип](../../../en/adapterref/_img/fully-browser-settings-mqtt.png)

## Настройки адаптера
### Полностью браузерные устройства
Добавьте устройство(а) Fully Browser, то есть планшеты с Fully Browser, соответственно:

1. **Имя устройства**: любое имя, которое также используется как часть объектов/состояний, например. «Tablet Flur» становится «full-mqtt.0.Tablet-Flur».
1. **Протокол**: оставьте `http` как есть. Если следует использовать https: см. примечания в разделе [Удаленное администрирование](https://www.full-kiosk.com/en/#remoteadmin).
1. **Пароль удаленного администратора**: введите пароль, указанный выше.

### Конфигурация MQTT
 * **Порт**: используйте тот же номер порта, что указан выше в настройках Fullybrowser MQTT (например, `3000`).
 * **Не проверять пользователя и пароль**: можно активировать, чтобы отключить проверку имени пользователя и пароля.
 * **Имя пользователя**: необязательно.
 * **Пароль**: необязательно.

### Экспертные настройки: MQTT
 * **Не обрабатывать опубликованную информацию чаще, чем каждые x секунд**: Согласно [Полной документации](https://www.fully-kiosk.com/en/#mqtt), информация публикуется только каждые 60 секунд, но в в моих тестах это происходило чаще, поэтому с помощью этой опции можно установить ограничение.
 * **Всегда обновлять информационные объекты**: Обычно все информационные состояния устанавливаются/обновляются только в случае изменения. Если эта опция включена, состояния всегда будут обновляться (с ack:true), даже если не было никаких изменений по сравнению с предыдущим значением.
 * **Ошибки клиента и соединения в виде информации в журнале**: если эта функция активирована, ошибки клиента и соединения всегда выводятся в журнал как информация, а не как ошибка. Это позволяет поддерживать чистоту журнала и не заполнять его без необходимости только потому, что планшет ненадолго выходит из системы и снова входит в систему через несколько секунд. «Долгосрочные» ошибки и предупреждения всегда соответственно отображаются в журнале.

### Экспертные настройки: удаленное администрирование (REST API)
 * **Тайм-аут запроса**: по истечении этого числа миллисекунд запросы REST API (т. е. отправка команд) в случае неудачи прерываются.

 ## Ссылки
* [ioBroker-Forum: Полностью браузерный адаптер с MQTT](https://forum.iobroker.net/topic/69729/)
* [REST APIfull-kiosk.com](https://www.complete-kiosk.com/en/#rest)
* [интеграция MQTT Full-kiosk.com](https://www.complete-kiosk.com/en/#mqtt)

## Changelog
### 3.0.3 (2023-11-04)
 * (arteck) setStringSettings corr

### 3.0.2 (2023-11-02)
* (arteck) add motionDetection
* (arteck) for Rooted Devices add rebootDevice

### 3.0.0 (2023-11-02)
* (arteck) breaking change - new structure from fully-mqtt Adapter from Acgua
* here is the Orginal https://github.com/Acgua/ioBroker.fully-mqtt

#----------------------------------------------------------------------

### 2.2.0 (2023-10-27)
* (arteck) intervall corr

### 2.1.6 (2022-11-23)
* (arteck) add name of device to admin
* (arteck) corr status when login fail
* (arteck) corr psw typo

### 2.1.2 (2022-04-05)
* (arteck) encodeUri in psw

### 2.1.1 (2022-02-07)
* (arteck) js-controller 4.x

### 2.1.0 (2022-02-07)
* (arteck) js-controller 4

### 2.0.14 (2022-01-31)
* (arteck) life tick error


...
...
...

### 1.0.1 (2019-06-20)
* (arteck) encodeURL

## License
The MIT License (MIT)

Copyright (c) 2014-2023 Arthur Rupp arteck@outlook.com

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
