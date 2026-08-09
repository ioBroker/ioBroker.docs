---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zwavews/README.md
title: ioBroker.zwavews
hash: c3DIl7iUjKXS61DgcIgwuMGaiFHGtV8JbOblN/mG93k=
---
![Версия NPM](https://img.shields.io/npm/v/iobroker.zwavews.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.zwavews.svg)
![Количество установок](https://iobroker.live/badges/zwavews-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/zwavews-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.zwavews.png?downloads=true)

<img src="admin/zwavews.png" width="200" />

# IoBroker.zwavews
**Тесты:** ![Тестирование и выпуск](https://github.com/arteck/ioBroker.zwavews/workflows/Test%20and%20Release/badge.svg) ![CodeQL](https://github.com/arteck/ioBroker.zwavews/actions/workflows/codeql.yml/badge.svg?branch=main)

## Адаптер zwave-WS для ioBroker
Адаптер `zwavews` подключает [`zwave-js-ui`](https://zwave-js.github.io/zwave-js-ui/#/) к ioBroker и создает соответствующие точки данных для устройств, значений и статусов. Это позволяет удобно использовать устройства Z-Wave в визуализациях, логике и автоматизации.

### Функции
* **Обмен данными в реальном времени**: Мгновенно получает обновления значений и статусов устройства через WebSocket или MQTT.
* **Автоматическое обнаружение**: Автоматически создает и обновляет структуру устройства и состояния в ioBroker из узлов `zwave-js-ui`.
* **Управление устройством**: Просматривайте уровень заряда батареи, состояние подключения и подробные показатели устройства прямо из интерфейса ioBroker.
* **Обновление прошивки**: Отслеживайте ход обновления прошивки непосредственно через журналы и состояния адаптера.
* **Управление состоянием**: Отправляйте команды и обновляйте значения непосредственно через дерево объектов ioBroker.
* **Поддержка нескольких протоколов**: Вы можете подключиться к `zwave-js-ui` с помощью WebSocket, внешнего MQTT-сервера или внутреннего фиктивного MQTT-сервера.

## Документация по адаптеру
Необходимо установить zwave-js-ui (возможно перенести устройства zwave2 в zwave-js-ui. Скопируйте файл кэша JSON из /opt/iobroker/iobroker-data/zwave2/ в каталог хранилища Z-Wave JS UI, затем запустите zwave-js-ui) и активировать связь WS.<br> Переключиться с адаптера Z-Wave 2 очень просто, поскольку вся информация хранится на координаторе.<br> Для повторного считывания данных с устройств с батарейным питанием достаточно один раз активировать zwave-js-ui или выполнить миграцию с zwave2.<br>

<img width="1444" height="740" alt="графика" src="https://github.com/user-attachments/assets/876a81d3-04ab-43c6-914e-86772d0188e1" /><p></p>

Активируйте настройки WS-сервера в разделе `zwave-js-ui`. Для этого мы используем настройки Home Assistant:

<img width="1887" height="479" alt="графика" src="https://github.com/user-attachments/assets/6ed8cf36-2d91-435f-91d7-86e430bb0c6c" />

### **РАБОТА В ПРОЦЕССЕ**
* (arteck) fix reconnect ws
* (arteck) добавить кнопку повторного интервью

## Changelog
### 1.0.4 (2026-07-23)
* (arteck) reconnect optimization
* (arteck) notification handling
* (arteck) fix energy values

### 1.0.3 (2026-07-15)
* (arteck) fix thermostat set point

### 1.0.2 (2026-07-15)
* (arteck) fix notification messages (check you scripts)

### 1.0.1 (2026-07-15)
* (arteck) fix bulb set color
* (arteck) add delete null states button into adapter settings

### 1.0.0 (2026-07-08)
* (arteck) add notification

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License

Copyright (c) 2026 Arthur Rupp <arteck@outlook.com>,

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