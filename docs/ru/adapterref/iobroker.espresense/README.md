---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.espresense/README.md
title: ioBroker.espresense
hash: JDBUWyJH7Tl4/I3NvHTgusANe4VtARCXjZOCsDTUz4Y=
---
![Логотип](../../../en/adapterref/iobroker.espresense/admin/espresense.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.espresense.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.espresense.svg)
![Количество установок](https://iobroker.live/badges/espresense-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/espresense-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.espresense.png?downloads=true)

# IoBroker.espresense
**Тесты:** ![Тестирование и выпуск](https://github.com/ticaki/ioBroker.espresense/workflows/Test%20and%20Release/badge.svg)

## Адаптер espresense для ioBroker
Подключиться к [ESPresense](https://espresense.com)

- Сервер MQTT и клиентский модуль
- `Запустить собственный сервер mqtt` активировать режим сервера
- `Server ip` используется только для внешнего сервера mqtt.
- «Порт, имя пользователя и пароль» внутреннего или внешнего сервера mqtt.

- Если в конфигурацию были добавлены устройства, в объектах будут отображаться только они.
- Два времени настройки связаны, проверка присутствия всегда выполняется вместе с обработкой сообщений MQTT.

Рекомендация: соедините устройства, которые будут отслеживаться, с espresense и отфильтруйте выходные данные, чтобы избежать ненужного сетевого трафика.

Для помощи используйте вопрос или если вы понимаете немецкий https://forum.iobroker.net/topic/71189/test-adapter-espresense

* Используемый mqtt-сервер является полностью совместимым сервером MQTT 3.1 и 3.1.1, но адаптер отвечает только на тему espresense/#

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.4.4 (2024-01-18)
* (ticaki) The time period over which incoming Mqtt messages are collected can be configured. min. 1 sec max. (2^31-1) / 1000 sec

### 0.4.3 (2024-01-14)
* (ticaki) Collect incoming MQTT messages and process them every 5 seconds

### 0.4.2 (2024-01-05)
* (ticaki) New state for actual distance/conversion factor and calculated distance

### 0.4.1 (2023-12-30)
* (ticaki) fixed: no names. (2. try)

### 0.4.0 (2023-12-30)
* (ticaki) fixed: no names.
* (ticaki) Added: global esp32 configuration (retained)

### 0.3.0 (2023-12-23)
* (ticaki) Breaking Change: move datadir from node_modules/iobroker.espresense/mydp to iobroker-data/espresense.0 (instance). move the files there and use iobroker fix after it.

### 0.2.1 (2023-12-21)
* (ticaki) fixed: object not exist sometimes.

### 0.2.0 (2023-12-21)
* (ticaki) Add/Remove Devices

### 0.1.3 (2023-12-21)
* (ticaki) prepare for lastest

### 0.1.2 (2023-12-21)
* (ticaki) add common.name to states

### 0.1.1 (2023-12-20)
* (ticaki) fixed: sometimes adapter crashed after login.

### 0.1.0 (2023-12-20)
* (ticaki) Added: send configuration datapoints to esp

### 0.0.3 (2023-12-19)
* (ticaki) Added: Mqtt Server with file db

### 0.0.2 (2023-12-18)
* (ticaki) initial release

## License
MIT License

Copyright (c) 2024 ticaki <github@renopoint.de>

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