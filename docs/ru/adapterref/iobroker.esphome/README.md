---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.esphome/README.md
title: ioBroker.eshome
hash: brop47b6AkIPnnPCn7pqlRZ51YIu/FdYQHtS4QKGH4g=
---
![НПМ-версия](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Количество установок (последних)](http://iobroker.live/badges/esphome-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/esphome-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Тесты:** ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Более подробную информацию и информацию о том, как отключить отчеты об ошибках, см. в [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Адаптер ESPHome для ioBroker
Управляйте своим ESP8266/ESP32 с помощью простых, но мощных файлов конфигурации, созданных и управляемых ESPHome.
Встроенная интеграция управляемого устройства ESPHome (включая панель мониторинга) с помощью собственного API и обеспечение синхронизации всех данных (обработка событий в реальном времени, без опроса данных! :)

![Логотип](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

Этот адаптер использует [esphome-native-api](https://github.com/Nafaya/esphome-native-api#readme) со всей благодарностью @Nafaya за взаимодействие с [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## [Документация](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
Всю документацию по нашему адаптеру можно найти по адресу [Страница документа DrozmotiX](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/).

## Предварительные условия
    * NodeJS >= 18.x
    * API активирован в YAML
    * Для вкладок администратора (необязательно)
        * IP-адрес панели управления ESPHome указан в настройках экземпляра.

### Активировать API в YAML
```
api:
  password: 'MyPassword'
```

### Пример конфигурации
Пример конфигурации, дополнительные примеры см. в [Страница документа DrozmotiX](https://DrozmotiX.github.io) или [Документация ESPHome](https://esphome.io/index.html).

<details><summary>Показать пример конфигурации</summary>

esphome: имя: Sensor_badkamer Платформа: ESP32 Плата: esp-wrover-kit

Wi-Fi: use_address: 192.168.10.122 ssid: «xxxxxx» пароль: «xxxxxx»

    # Включить API ESPHome
API: пароль: 'MyPassword'

# Активировать шину i2c i2c: sda: 21 scl: 22 scan: True id: bus_a
    # Пример конфигурации для bh1750
    датчик:

      - платформа: bh1750

имя: «Hal_Illuminance» адрес: 0x23 время измерения: 69 интервал_обновления: 10 с

    # Пример конфигурации выхода GPIO
    выход:

      - платформа: gpio

контакт: 12 перевернутый: истинный идентификатор: gpio_12

    # Пример конфигурации, связывающей переключатель с предыдущим определенным выходом
    выключатель:

      - платформа: выход

имя: «Общий вывод» вывод: «gpio_12» </details>

## Тасмота / ESPEПростая миграция
Миграция с предыдущих установок Sonoff Tasmota или ESPEasy очень проста. Вам просто нужно, чтобы ESPHome создал для вас двоичный файл, а затем загрузил его в веб-интерфейс.
Более подробную информацию см. в разделе [Страница документа](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html).

**_ПРИМЕЧАНИЕ:_** Сгенерированные файлы yaml хранятся в ```/opt/iobroker/iobroker-data/iobroker.esphome.>instance</>device<.yaml

## Поддержите меня
Если вам нравится моя работа, рассмотрите возможность личного пожертвования (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать](https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
    * (DutchmanNL) 
-->
### 0.4.1 (2023-11-05)
* (DutchmanNL) Bugfix: Password / connection issues in previous beta resolves #179
* (DutchmanNL) Bugfix: Allow individual API password or encryption keys for devices, resolves #174
* (DutchmanNL) Support ESPHome device Encryption Key (you should migrate from API password to Encryption Key ! resolves #152)

### 0.4.0 (2023-11-03)
* (DutchmanNL) Added cleanup capability for unused channels & states after initialisation of device, resolves #39
* (DutchmanNL) Added button to info channel which allows to delete all offline devices from adapter tree. resolves #39
* (DutchmanNL) [Breaking] Backup strategy changed, requires [BackitUp v2.9.1](https://github.com/simatec/ioBroker.backitup) and activate option for ESPHome, fixes #129

### 0.3.2 (2023-11-01)
* (DutchmanNL) Improved error handling if devices are not reachable/disconnected
* (DutchmanNL) Bugfix: Allow control of brightness and color for light component, resolves #173

### 0.3.1 (2023-10-31)
* (DutchmanNL) Bugfix: Show online state of ESP Device correctly, resolves #106

### 0.3.0 (2023-10-31) - Bugfixes & Improvements
* (Dutchman & SimonFischer04) Several Bugfixes
* (SimonFischer04) Support type "select device"
* (DutchmanNL) ESPHome dashboard default disabled
* (SimonFischer04) Migrate to @2colors/esphome-native-api
* (DutchmanNL) Automatically create needed directories, resolves #168
* (SimonFischer04) Migrate usage of python to new structure, should solve all ESPHome Dashboard related installation issues

## License
MIT License

Copyright (c) 2023 DutchmanNL <rdrozda86@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.