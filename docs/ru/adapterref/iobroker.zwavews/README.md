---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.zwavews/README.md
title: ioBroker.zwavews
hash: 78RGvtORJzvArh8nMXl+5J/Gmqb4+HTJBOQMqqEjYRQ=
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

## Changelog
### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now

### 0.2.0 (2026-04-26)
* (arteck) del deprectated setStateAsync

### 0.1.6 (2026-04-23)
* (arteck) add test

### 0.1.5 (2026-04-21)
* (arteck) upd devicemanager

### 0.1.4 (2026-04-16)
* (arteck) Dependencies have been updated
* (arteck) add vscode folder

### 0.1.3 (2026-04-03)
* (arteck) del last dot from DP
* (arteck) fix scene

### 0.1.2 (2026-03-15)
* (arteck) typo

### 0.1.1 (2026-03-15)
* (arteck) add debug information

### 0.1.0 (2026-03-08)
* (arteck) BREAKING CHANGE - dp name is now with underline
* (arteck) add deviceManager
* (arteck) fix dp's with a space
* (arteck) fix dp's with special chars

### 0.0.18 (2026-02-28)
* (arteck) add info.sendMessageAllowed object to allow sending the message to zwave-ui-js
* (arteck) add new checkbox to set info.sendMessageAllowed immediately after starting the adapter

### 0.0.17 (2026-02-20)
* (arteck) fix adapter start
* (arteck) Dependencies have been updated

### 0.0.16 (2026-02-09)
* (arteck) fix warning message

### 0.0.15 (2026-02-09)
* (arteck) typo
* (arteck) fix ready status if status is dead

### 0.0.14 (2026-02-09)
* (arteck) add event ready

### 0.0.13 (2026-02-07)
* (arteck) add event type "value notification"

### 0.0.12 (2026-02-01)
* (arteck) typo
* (arteck) fix dp channel name
* (arteck) add endpoint > 0 to value if exists

### 0.0.11 (2026-01-23)
* (arteck) fix dp types

### 0.0.10 (2026-01-17)
* (arteck) event value added

### 0.0.9 (2026-01-08)
* (arteck) convert status to lower case

### 0.0.8 (2026-01-06)
* (arteck) add warning message for inteview states

### 0.0.7 (2026-01-06)
* (arteck) add name if not in device info tree

### 0.0.6 (2026-01-06)
* (arteck) update title

### 0.0.5 (2026-01-06)
* (arteck) add online status

### 0.0.4 (2026-01-06)
* (arteck) fix overrideState

### 0.0.3 (2026-01-06)
* (arteck) fix title

### 0.0.2 (2026-01-06)
- (arteck) first release

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