---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.esphome/README.md
title: ioBroker.esphome
hash: xAXrVlj1KEjp5T55pPs4+ScYfjFy9mDtGyQ5Z/srTLE=
---
![Версия NPM](http://img.shields.io/npm/v/iobroker.esphome.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.esphome.svg)
![Количество установок (последнее)](http://iobroker.live/badges/esphome-installed.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/esphome-stable.svg)
![Статус зависимости](https://img.shields.io/david/DrozmotiX/iobroker.esphome.svg)
![Известные уязвимости](https://snyk.io/test/github/DrozmotiX/ioBroker.esphome/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.esphome.png?downloads=true)

<img src="./admin/esphome.png" width="10%" height="10%" align="center">

# IoBroker.esphome
[![Статус перевода] (https://weblate.iobroker.net/widgets/adapters/-/ESPHome/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

** Тесты: ** ![Тестирование и выпуск](https://github.com/DrozmotiX/ioBroker.esphome/workflows/Test%20and%20Release/badge.svg)

** Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода. ** Дополнительные сведения и информацию о том, как отключить отчет об ошибках, см. В [Документация Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Сторожевые отчеты используются начиная с js-controller 3.0.

## Адаптер ESPHome для ioBroker
Управляйте своим ESP8266 / ESP32 с помощью простых, но мощных файлов конфигурации, созданных и управляемых ESPHome.
Встроенная интеграция управляемого устройства ESPHome (включая Dashboard) с помощью собственного API и обеспечение синхронизации всех данных (обработка событий в реальном времени, без опроса данных! :)

![Логотип](../../../en/adapterref/iobroker.esphome/admin/img/dashboard.png)

Этот адаптер использует [esphome-native-api] (https://github.com/Nafaya/esphome-native-api#readme) со всеми кредитами @Nafaya для взаимодействия с [ESPHome API](https://esphome.io/components/api.html?highlight=api)!

## [Документация](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/)
Всю нашу документацию по адаптерам можно найти в [Страница документации DrozmotiX](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/).

## Предварительные требования
    * NodeJS> = 12.x
    * Python> = 3.7, <4.0
    * API активирован в YAML
    * Для вкладок администратора (необязательно)
        * IP-адрес панели управления ESPHome указывается в настройках экземпляра.

### Активировать API в YAML
```
api:
  password: 'MyPassword'
```

### Пример конфигурации
Пример конфигурации, дополнительные примеры см. В [Страница документации DrozmotiX] (https://DrozmotiX.github.io) или [ESPHome Documentation](https://esphome.io/index.html)

<details><summary>Показать пример конфигурации</summary>

esphome: name: sensor_badkamer platform: ESP32 board: esp-wrover-kit

Wi-Fi: use_address: 192.168.10.122 ssid: «xxxxx» пароль: «xxxxxx»

    # Включить ESPHome API
api: пароль: 'MyPassword'

# Активировать шину i2c i2c: sda: 21 scl: 22 scan: True id: bus_a
    # Пример конфигурации для bh1750
    датчик:

      - платформа: bh1750

имя: "Hal_Illuminance" адрес: 0x23 измерение_время: 69 интервал_обновления: 10 с

    # Пример конфигурации для выхода GPIO
    выход:

      - платформа: gpio

контакт: 12 перевернутый: true id: gpio_12

    # Пример конфигурации, связывающей переключатель с предыдущим определенным выходом
    выключатель:

      - платформа: выход

name: Вывод «Общий вывод»: 'gpio_12' </details>

## Миграция Tasmota / ESPEasy
Переход с предыдущих настроек Sonoff Tasmota или ESPEasy очень прост. Вам просто нужно, чтобы ESPHome создал для вас двоичный файл, а затем загрузил его в веб-интерфейс.
Для получения более подробной информации см. Наш [Страница документа](https://DrozmotiX.github.io/languages/en/Adapter/ESPHome/06.migration.html)

.. Примечание::

    Сгенерированные файлы yaml хранятся в ```/opt/iobroker/node_modules/iobroker.esphome/config/>device<.yaml```

## Поддержите меня
Если вам нравятся мои работы, рассмотрите возможность личного пожертвования (это личная ссылка для пожертвований для DutchmanNL, не имеющая отношения к проекту ioBroker!) [![Пожертвовать] (https://raw.githubusercontent.com/DrozmotiX/ioBroker.sourceanalytix/main/admin/button.png)](http://paypal.me/DutchmanNL)

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->

### 0.2.2 (2021-06-24)
* (DutchmanNL) [!!! Breaking !!!] Make YAML file persistent, backup your configuration before updating ! solves [#57](https://github.com/DrozmotiX/ioBroker.esphome/issues/57)
* (DutchmanNL) Update ESPHome Dashboard to 1.18.0, requires  Python >=3.7 (and ensure <4.0!)
* (DutchmanNL) Bugfix : Reconnect to devices without autodiscovery / MDNS-Broadcast in network, solves [#66](https://github.com/DrozmotiX/ioBroker.esphome/issues/66)

### 0.2.1-1 (2021-03-30)
* (DutchmanNL) add cover component
* (DutchmanNL) add transitionLength for lights

### 0.2.1-0 (2021-03-30)
* (DutchmanNL) Logging improved, solves [#48](https://github.com/DrozmotiX/ioBroker.esphome/issues/48)
* (DutchmanNL) Name of states changed, solves [#49](https://github.com/DrozmotiX/ioBroker.esphome/issues/49)

### 0.2.0 (2021-03-29)
* (DutchmanNL) Translations updated
* (DutchmanNL) Configuration page updated
* (DutchmanNL) Added to sentry error reporting
* (DutchmanNL) Native integration of ESPHome Dashboard added

### 0.1.5 (2021-03-21)
* (DutchmanNL) Add Translations

### 0.1.4 (2021-03-19)
* (DutchmanNL) Implemented RGBW
* (DutchmanNL) Ensure correct encryption and storage of passwords
* (DutchmanNL) Proper value ranges for type light (255 instead 100)
* (DutchmanNL) Implemented hex color state for type light (if RGB is available)

### 0.1.2 (2021-03-02)
* (DutchmanNL) Type Fan added
* (DutchmanNL) Type Light added
* (DutchmanNL) Error messages optimized
* (DutchmanNL) Device reconnect handling improved
* (DutchmanNL) [Breaking!] Change state name to default "state" for type BinarySensor / Climate / Sensor / TextSensor & Switch  
* (DutchmanNL) Autodiscovery improved, non-ESPHome devices excluded

### 0.1.0 (2021-02-27)
* (DutchmanNL) Autodiscovery implemented
* (DutchmanNL) Type Climat added
* (DutchmanNL) Type TextSensor added
* (DutchmanNL) Solved reconnection issues
* (DutchmanNL) Optimized error messages for unknown types
* (DutchmanNL & @xXBJXx) Adapter configuration page optimized

### 0.0.1
* (DutchmanNL) initial release

## License
MIT License

Copyright (c) 2021 DutchmanNL <rdrozda86@gmail.com>

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