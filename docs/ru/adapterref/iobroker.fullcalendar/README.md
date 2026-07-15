---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fullcalendar/README.md
title: ioBroker.fullcalendar
hash: PipFNCmfF+NjqxglcGPuDRBSPI+4S6MBNoM0fQTqzqU=
---
![Логотип](../../../en/adapterref/iobroker.fullcalendar/admin/fullcalendar.png)

![Количество установок](http://iobroker.live/badges/fullcalendar-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)
![НПМ](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)

# IoBroker.fullcalendar
Приложения с [полный календарь](https://fullcalendar.io).

## Планируйте мероприятия (управляйте своими устройствами)
Запрещено использовать любые внешние ресурсы; планирование осуществляется исключительно в ioBroker и не будет интегрировано с какими-либо внешними сервисами, такими как «Google Calendar» или «iTunes».

![Пример](../../../en/adapterref/iobroker.fullcalendar/img/example.png)

Вы можете управлять своими событиями с помощью календаря и планировать периодическое управление ими.

## Моделирование событий
Вы можете записать свое поведение и воспроизвести запись позже.
Например, вы можете создать две записи: для рабочего дня и для выходных, и воспроизвести их в соответствующие дни.

Или вы можете записать всю неделю и прослушать запись в последующие недели, пока вас нет.

Способ применения:

- Перейдите на вкладку "Симуляция".
— Создайте новую симуляцию, нажав кнопку «+» и выбрав тип симуляции: день или неделя.
— Нажмите кнопку записи и подождите 24 часа или 7 дней, пока моделирование не остановится, чтобы записать события.
— Теперь вы можете повторно запустить симуляцию, нажав кнопку воспроизведения. Кроме того, вы можете указать время начала симуляции.

## Todo
- Время недели и дня недели должно отображаться текущим образом.

<!-- Заполнитель для следующей версии (в начале строки):

### **РАБОТА В ПРОЦЕССЕ** -->

## Changelog
### **WORK IN PROGRESS**
* (bluefox) Migrated GUI to vite

### 2.4.5 (2024-09-09)
* (bluefox) Corrected SelectID Dialog

### 2.4.4 (2024-09-09)
* (bluefox) Removed withStyles package

### 2.3.17 (2024-05-26)
* (bluefox) Corrected the simulation

### 2.3.16 (2024-05-25)
* (bluefox) Small UI fixes on widget

### 2.3.10 (2024-05-22)
* (bluefox) Small UI fixes

### 2.3.9 (2024-05-20)
* (bluefox) Corrected vis-2 widget

### 2.3.4 (2023-11-28)
* (bluefox) Corrected monthly events

### 2.3.1 (2023-11-27)
* (bluefox) Packages were updated
* (bluefox) Corrected vis-2 widget

### 2.2.6 (2023-07-27)
* (bluefox) Compatibility with vis-2

### 2.2.2 (2023-06-19)
* (bluefox) Corrected stop of the recording

### 2.2.0 (2023-04-24)
* (bluefox) Added simulation of events

### 2.0.8 (2023-03-24)
* (bluefox) Corrected vis-2 widgets

### 2.0.5 (2023-03-07)
* (bluefox) New material design added
* (bluefox) License changed to MIT
* (bluefox) Allowed deletion of events

### 1.2.0 (2021-12-14)
* (bluefox) Updated to use with js-controller 3.3 and admin 5

### 1.1.0 (2020-01-12)
* (foxriver76) Updated to use with js-controller 2.x

### 1.0.0 (2019-11-17)
* (bluefox) Support for compact mode is added

### 0.2.4 (2017-11-23)
* Translations

### 0.2.3 (2017-11-22)
* (bluefox) Fixed interval settings
* (bluefox) Update fullcalendar library

### 0.2.1 (2017-09-25)
* (bluefox) Fixed error

### 0.2.0 (2017-08-06)
* (bluefox) Support for new admin

### 0.1.1 (2017-07-13)
* (bluefox) Fixed double event by creation

### 0.1.0 (2017-03-20)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2026 Bluefox <dogafox@gmail.com>

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