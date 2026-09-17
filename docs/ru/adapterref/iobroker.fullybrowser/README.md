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
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fullybrowser/README.md
title: без названия
hash: FYintamstHgPIG/rUvhp+YHu0bDQpomowQlWMG9AEWQ=
---
![Логотип](../../../en/admin/fully-mqtt_500.png)

## Об этом адаптере

С помощью этого адаптера можно управлять [браузером Fully Kiosk Browser](https://www.fully-kiosk.com) (с лицензией Plus). Через [REST API](https://www.fully-kiosk.com/en/#rest) можно отправлять различные команды, такие как «включение/выключение экрана», «включение/выключение заставки» и т. д., на устройство Fully.

Кроме того, события [MQTT](https://www.fully-kiosk.com/en/#mqtt) (например, «экран включен») всегда немедленно передаются адаптеру и устанавливаются в соответствующие состояния. Более того, Fully Browser всегда автоматически отправляет всю информацию об устройстве через MQTT как минимум каждые 60 секунд, которая соответствующим образом устанавливается в информационные состояния. Обратите внимание, что все команды отправляются через REST API, а не через MQTT, поскольку Fully Browser не поддерживает отправку команд через MQTT.

## Настройки всего браузера

### Активировать удаленное администрирование

1. На планшете откройте приложение Fully Browser и перейдите в настройки Fully Browser.
2. Откройте пункт меню **«Удаленное администрирование (PLUS)»**
3. Включить/ **Включить удаленное администрирование**
4. **Пароль удаленного администратора** : введите пароль
5. Разрешить **удаленное администрирование из локальной сети**

![Логотип](../../../en/adapterref/_img/fully-browser-settings-remote-admin.png)

### Активировать MQTT

1. На планшете откройте приложение Fully Browser и перейдите в «Настройки». В качестве альтернативы вы также можете открыть удаленную административную панель с другого устройства (например, ПК) через браузер; URL-адрес обычно всегда <http://ip-address:2323> , вам будет предложено ввести пароль, указанный выше.
2. Откройте: **Настройки** -> **Другие настройки** -> **Интеграция MQTT (PLUS)**
3. Включить **Включить MQTT**
4. **URL MQTT-брокера** : Введите в формате `mqtt://iobroker-ip-address:3000`, где `iobroker-ip-address` — это IP-адрес ioBroker, и `3000` — это номер порта, используемый для подключения по протоколу MQTT.
5. **Имя пользователя MQTT-брокера** : здесь вы можете по желанию ввести имя пользователя.
6. **Пароль MQTT-брокера** : здесь вы можете ввести пароль (по желанию).
7. **Идентификатор клиента MQTT** : может быть оставлен пустым.
8. В **теме "Информация об устройстве MQTT"** вы можете оставить настройки по умолчанию, они не будут использоваться адаптером.
9. **Тема события MQTT** : здесь вы можете оставить настройку по умолчанию, она не будет использоваться адаптером.

![Логотип](../../../en/adapterref/_img/fully-browser-settings-mqtt.png)

## Настройки адаптера

### Устройства с полнофункциональным браузером

Добавьте устройства, использующие Fully Browser, то есть планшеты, на которых запущен Fully Browser, следующим образом:

1. **Название устройства** : любое имя, которое также используется в составе объектов/состояний, например... `Tablet Flur` становится `fully-mqtt.0.Tablet-Flur`.
2. **Протокол** : уход `http` как есть. Если `https` следует использовать: см. примечания в разделе [«Удаленное администрирование»](https://www.fully-kiosk.com/en/#remoteadmin) .
3. **Пароль удаленного администратора** : введите пароль, указанный выше.

### Настройка MQTT

- **Порт** : Используйте тот же номер порта, что и в настройках MQTT Fullybrowser (например, `3000`).
- **Отключить проверку имени пользователя и пароля** : эту функцию можно активировать, чтобы отключить проверку имени пользователя и пароля.
- **Имя пользователя** : необязательно
- **Пароль** : необязателен

### Настройки эксперта: MQTT

- **Не обрабатывать опубликованную информацию чаще, чем каждые x секунд** : согласно [полной документации](https://www.fully-kiosk.com/en/#mqtt) , информация публикуется только каждые 60 секунд, но в моих тестах это происходило чаще, поэтому с помощью этой опции можно установить ограничение.
- **Всегда обновлять информационные объекты** : Обычно все состояния информации устанавливаются/обновляются только в случае изменения. Если эта опция включена, состояния будут обновляться всегда (с параметром ack:true), даже если значение не изменилось по сравнению с предыдущим.
- **Ошибки клиента и подключения в виде информации в журнале** : Если эта функция активирована, ошибки клиента и подключения всегда выводятся в журнал в виде информации, а не как ошибки. Это позволяет поддерживать чистоту журнала и не заполнять его без необходимости только потому, что планшет кратковременно выходит из системы и снова входит через несколько секунд. Более длительные ошибки и предупреждения всегда отображаются в журнале соответствующим образом.

### Настройки эксперта: Удаленное администрирование (REST API)

- **Тайм-аут запроса** : По истечении указанного количества миллисекунд запросы к REST API (т.е. отправка команд) прерываются, если они не увенчались успехом.

## Ссылки

- [ioBroker-Forum: Адаптер, полностью работающий в браузере, с поддержкой MQTT](https://forum.iobroker.net/topic/69729/)
- [REST API fully-kiosk.com](https://www.fully-kiosk.com/en/#rest)
- [Интеграция MQTT с fully-kiosk.com](https://www.fully-kiosk.com/en/#mqtt)

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 3.1.5 (2026-04-21)
* (arteck) fix aedes

### 3.1.4 (2026-04-21)
* (arteck) refactoring
* (arteck) fix aedes

### 3.1.3 (2026-04-12)
* (arteck) Dependencies have been updated

### 3.1.2 (2025-07-20)
* (arteck) add device name into the warning message
* (arteck) dependency update

### 3.1.1 (2025-02-19)
* (arteck) typo

### 3.1.0 (2025-02-16)
* (arteck) add new command takePicture, check new settings

### 3.0.13 (2025-01-05)
* (arteck) add setBooleanSetting

### 3.0.12 (2024-03-05)
* (arteck) set batteryLevel to 0 if tablet is offline is configurable

### 3.0.11 (2024-02-25)
* (arteck) translate api-type

### 3.0.10 (2024-02-06)
* (arteck) set batteryLevel to 0 when device is offline

### 3.0.9 (2023-12-07)
* (arteck) corr error message

### 3.0.8 (2023-12-05)
* (arteck) toForeground corr

### 3.0.7 (2023-11-20)
* (arteck) check credentials

### 3.0.6 (2023-11-11)
* (arteck) add mqttTimeout in settings

### 3.0.5 (2023-11-09)
* (arteck) add setRAW DP, this allows you to send a fullbrowser command directly

### 3.0.4 (2023-11-06)
* (arteck) set to zero corr

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

Copyright (c) 2014-2026 Arthur Rupp arteck@outlook.com

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