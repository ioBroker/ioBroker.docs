---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.scheduler/README.md
title: Адаптер планировщика ioBroker
hash: jaR2G1Z9ybzfi/jsgg5FlS2Ynf3eN1g9q1TD0/IjCbY=
---
![Логотип](../../../en/adapterref/iobroker.scheduler/admin/scheduler.png)

![Количество установок](http://iobroker.live/badges/scheduler-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.scheduler.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.scheduler.svg)
![НПМ](https://nodei.co/npm/iobroker.scheduler.png?downloads=true)

# Адаптер планировщика ioBroker
Этот адаптер предназначен для управления устройствами по расписанию. Например, управление отоплением или поливом.

Вы можете создавать профили с разным приоритетом: нормальный (например, рабочие дни), высокий (например, выходные) и самый высокий (например, праздничные дни).
Профиль с более высоким приоритетом перегружает другие профили.

Для каждого профиля будет создана активная переменная. Но пользователь может выбрать собственную переменную активации, например. контролировать праздники.

Пользователь должен добавить устройства в профиль, и все устройства в профиле будут иметь одинаковое значение.

Этот адаптер имеет виджет vis2.

![Скриншот](../../../en/adapterref/iobroker.scheduler/img/scheduler.png)

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 1.1.2 (2023-03-02)
* (bluefox) Added widget for vis-2

### 1.0.4 (2022-12-23)
* (bluefox) Updated GUI packages

### 1.0.3 (2022-06-22)
* (bluefox) Made it work with ioBroker cloud

### 1.0.2 (2022-06-20)
* (bluefox) Corrected the problem with `socket.io`

### 1.0.1 (2022-06-20)
* (bluefox) Allowed to work behind reverse proxy

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

Copyright (c) 2021-2023 bluefox <dogafox@gmail.com>

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