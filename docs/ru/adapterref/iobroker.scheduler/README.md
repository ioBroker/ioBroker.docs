---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.scheduler/README.md
title: Адаптер планировщика ioBroker
hash: 32jCsXKqdnXNCB4EKsz3xjm452DBZjh48kYgvIr3Mgc=
---
![Логотип](../../../en/adapterref/iobroker.scheduler/admin/scheduler.png)

![Количество установок](http://iobroker.live/badges/scheduler-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.scheduler.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.scheduler.svg)
![НПМ](https://nodei.co/npm/iobroker.scheduler.png?downloads=true)

# Адаптер планировщика ioBroker
Этот адаптер предназначен для управления устройствами по расписанию. Например, управление отоплением или поливом.

Вы можете создавать профили с разным приоритетом: нормальный (например, рабочие дни), высокий (например, выходные) и самый высокий (например, для праздников).
Профиль с более высоким приоритетом перегружает другие профили.

Для каждого профиля будет создана активная переменная.
Но пользователь может выбрать собственную переменную активации, например, для управления праздниками.

Пользователь должен добавить устройства в профиль, и для всех устройств в профиле будет установлено одно и то же значение.

Этот адаптер имеет виджет vis2.

![Скриншот](../../../en/adapterref/iobroker.scheduler/img/scheduler.png)

<!-- Заполнитель следующей версии (в начале строки):

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 1.3.2 (2024-04-05)
* (bluefox) Corrected widget errors
* (bluefox) Implemented custom types
* (bluefox) Added possibility to control devices on holidays

### 1.2.1 (2024-04-03)
* (bluefox) Added two options: "Ignore values if same as previous" and "Do not control if device already in desired state"
* (bluefox) Corrected 15-minute intervals
* (bluefox) GUI improvements for mobile view

### 1.1.14 (2024-04-02)
* (bluefox) Corrected widget and profile

### 1.1.12 (2024-03-13)
* (bluefox) Packages updated

### 1.1.10 (2023-10-19)
* (bluefox) Packages updated

### 1.1.9 (2023-06-28)
* (bluefox) Packages updated

### 1.1.7 (2023-03-24)
* (bluefox) Worked on the build process

### 1.1.6 (2023-03-14)
* (bluefox) update packages

### 1.1.4 (2023-03-06)
* (bluefox) Tried to fix vis-2 widget

### 1.1.3 (2023-03-06)
* (bluefox) Added widget for vis-2

### 1.0.4 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.0.3 (2022-06-22)
* (bluefox) Made it work with ioBroker cloud

### 1.0.2 (2022-06-20)
* (bluefox) Corrected the problem with `socket.io`

### 1.0.1 (2022-06-20)
* (bluefox) Allowed working behind reverse proxy

### 1.0.0 (2022-03-22)
* (bluefox) GUI migrated to material@5

### 0.1.3 (2022-03-22)
* (bluefox) Just the packages were updated

### 0.1.2 (2021-09-14)
* (bluefox) "Sentry" was added

### 0.1.1 (2021-09-13)
* (bluefox) Initial release

### 0.1.0 (2021-05-19)
* (bluefox) Initial commit

## License
The MIT License (MIT)

Copyright (c) 2021-2024 bluefox <dogafox@gmail.com>

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