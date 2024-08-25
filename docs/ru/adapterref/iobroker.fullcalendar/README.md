---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fullcalendar/README.md
title: ioBroker.fullcalendar
hash: aK2B2glZDSol529TZiHY9yAAyRGwmFS9/XwsNgsuvEU=
---
![Логотип](../../../en/adapterref/iobroker.fullcalendar/admin/fullcalendar.png)

![Количество установок](http://iobroker.live/badges/fullcalendar-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.fullcalendar.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.fullcalendar.svg)
![НПМ](https://nodei.co/npm/iobroker.fullcalendar.png?downloads=true)

# IoBroker.fullcalendar
Расписания с [полный календарь](https://fullcalendar.io).

## Планируйте события (управляйте своими устройствами)
Вы не должны использовать какие-либо внешние ресурсы, планирование обрабатывается только в ioBroker и не будет сочетаться с какими-либо внешними службами, такими как «календарь Google» или «iTunes».

![Пример](../../../en/adapterref/iobroker.fullcalendar/img/example.png)

Вы можете управлять своими событиями с помощью календаря и планировать их периодическое управление.

## Моделирование событий
Вы можете записать свое поведение и воспроизвести его позже.
Например, вы можете создать две записи для рабочего дня и для выходных и воспроизвести их в соответствующие дни.

Или вы можете записать всю неделю и воспроизвести ее в следующие недели, когда вас нет дома.

Как использовать:

- Перейти на вкладку моделирования
- Создайте новую симуляцию, нажав кнопку «+», и выберите тип симуляции: день или неделя.
- Нажмите кнопку записи и подождите 24 часа или 7 дней, пока симуляция не прекратится для записи событий.
- Теперь вы можете воспроизвести симуляцию, нажав на кнопку воспроизведения. Кроме того, вы можете определить время начала моделирования.

## Делать
- Неделя и день должны прокручиваться до текущего времени

<!-- Заполнитель для следующей версии (в начале строки):

### **В РАБОТЕ** -->

## Changelog
### 2.2.1 (2023-04-25)
* (bluefox) Corrected stop of the recording

### 2.2.0 (2023-04-24)
* (bluefox) Added simulation of events

### 2.0.8 (2023-03-24)
* (bluefox) Corrected vis-2 widgets

### 2.0.5 (2023-03-07)
* (bluefox) New material design
* (bluefox) License changed to MIT
* (bluefox) Allowed deletion of events

### 1.2.0 (2021-12-14)
* (bluefox) Updated to use with js-controller 3.3 and admin 5

### 1.1.0 (2020-01-12)
* (foxriver76) Updated to use with js-controller 2.x

### 1.0.0 (2019-11-17)
* (bluefox) Support of compact mode added

### 0.2.4 (2017-11-23)
* Translations

### 0.2.3 (2017-11-22)
* (bluefox) Fix interval settings
* (bluefox) Update fullcalendar library

### 0.2.1 (2017-09-25)
* (bluefox) Fixed error

### 0.2.0 (2017-08-06)
* (bluefox) Support of new admin

### 0.1.1 (2017-07-13)
* (bluefox) fix double event by creation

### 0.1.0 (2017-03-20)
* (bluefox) initial commit

## License
The MIT License (MIT)

Copyright (c) 2017-2023 Bluefox <dogafox@gmail.com>

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
