---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.countdown/README.md
title: ioBroker.обратный отсчет
hash: YriSKJ2tSBYLXy04DTVTy1F66xYqwnTd/C+pkBNEdy4=
---
![Логотип](../../../en/adapterref/iobroker.countdown/admin/countdown.png)

![Значок Гринкипера](https://snyk.io/test/github/jack-blackson/ioBroker.countdown/badge.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.countdown.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.countdown.svg)
![Количество установок](http://iobroker.live/badges/countdown-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.countdown.png?downloads=true)

# IoBroker.обратный отсчет
[![Статус сборки Трэвис](https://travis-ci.com/jack-blackson/ioBroker.countdown.svg?branch=master)](https://travis-ci.com/jack-blackson/ioBroker.countdown) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/countdown/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер обратного отсчета для ioBroker ------------------------------------------------------------- --------------------------------

Цель адаптера — предоставить вам возможность вести обратный отсчет для будущих событий с годами, месяцами, днями, часами и минутами. Он предоставит вам каждое из этих значений отдельно, а также две строки с короткой и длинной версией даты.

## Отображение обратного отсчета
Адаптер автоматически предоставляет вам таблицу json и таблицу HTML. Для json выберите виджет "basic-table". Для html выберите «базовый — строка (без экранирования)».

Можно отображать краткий текст или длинный текст.
![Логотип](../../../en/adapterref/iobroker.countdown/admin/countdown_json.png)

## Как создать обратный отсчет
Есть два способа настроить обратный отсчет:

* Создать обратный отсчет можно в настройках адаптера, во вкладке "Создать обратный отсчет".
* Вы можете создать ручное состояние в настройках устройства. Имя объекта — это имя тревоги, а значением будет дата. Дата должна быть в формате «ДД.ММ.ГГГГ ЧЧ:мм:сс».
* Вы можете создать будильник с помощью sendto. Там вы можете либо отправить компоненты (минимум год, месяц, дата), либо строку даты. Для строки даты вы можете настроить формат в настройках адаптера.

![Логотип](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky.png)

* Вы можете добавлять дни, месяцы и годы с помощью sendto к сегодняшней дате. Поэтому, пожалуйста, отправьте компонент "name" и либо "addminutes", "addhours", "adddays", "addmonths" или "addyears" в качестве значения int.

![Логотип](../../../en/adapterref/iobroker.countdown/admin/countdown_blocky_add.png)

## Как удалить обратный отсчет
Вы можете удалить обратный отсчет с помощью команды sendto. Поэтому отправьте в адаптер только имя с помощью sendto, и обратный отсчет будет удален автоматически.

## Повторение обратного отсчета
Если вы хотите, чтобы обратный отсчет повторялся в определенный период (например, вы не можете вести обратный отсчет до дня свадьбы каждый год), вы также можете сделать это с помощью этого адаптера. Поэтому либо заполняйте поле "Период повторения" в настройках адаптера, либо добавляйте период после даты при создании обратного отсчета с типом "дата". SendTo будет выглядеть так для обратного отсчета, который должен закончиться 1 апреля 2020 года и повторяться каждый год:

sendTo("countdown.0", "send", { "name": 'День свадьбы', "date": '01.04.2020 00:01+1Y' });

## Посчитать
Недавно добавлена функция «подсчета» — то есть подсчета дней от даты в прошлом. Это можно сделать либо в настройках адаптера, либо добавив «#» к строке даты, например.

sendTo("countdown.0", "send", { "name": 'Дата рождения', "date": '01.04.2020 00:01# });

Параметры здесь:

* Г: Годы
* М: Месяцы
* Д: дни
* Ч: Часы
* м: минуты

## Доступные выходы
|Тип данных|Описание|
|:---:|:---:|
|минуты|Минуты до окончания обратного отсчета (не всего!)|
|hours|Часы до окончания обратного отсчета (не всего!)|
|days|Дней до окончания обратного отсчета (не всего!)|
|months|Месяцы до окончания обратного отсчета (не всего!)|
|years|Годы до окончания обратного отсчета (не всего!)|
|имя|имя обратного отсчета|
|endDate|Конечная дата обратного отсчета – в формате, указанном в настройке|
|inWordsShort|Совокупное значение минут, часов,... - например, 1Г 5М 4D|
|inWordsLong|Совокупное значение минут, часов,... - например, 1 год 5 месяцев 4 дня|
|totalHours|Общее количество часов до даты окончания|
|totalDays|Общее количество дней до даты окончания|
|totalWeeks|Всего кол. недель до даты окончания|
|totalMonths|Всего месяцев до даты окончания|
|totalYears|Всего кол. лет до даты окончания|

|reached|Логическое поле, определяющее, была ли достигнута дата окончания|
|repeatEvery|Обратный отсчет повторяется через этот период после достижения конечной даты|

## Функции для добавления
* Возможность добавить скрипт в качестве параметра и запускать его по окончанию обратного отсчета
* Возможность использовать плюс и минус в аддминутах и других функциях добавления

## Changelog

### 2.1.0 (2023-07-XX) 
* (jack-blackson) Ability to use the countdown "backwards" - e.g. for calculating age of a baby
* (jack-blackson) Adjustments for "in words" -> fixed year/years and adjusted which detail level is shown at which point of time

### 2.0.2 (2023-07-16) 
* (jack-blackson) Bugfix month calculation

### 2.0.1 (2023-05-24) 
* (jack-blackson) Added objects for total number of months and years

### 2.0.0 (2023-05-07) 
* (jack-blackson) Reworked adapter due to wrong process layout
* (jack-blackson) Added headers for HTML and JSON

### 1.3.1 (2023-05-01) 
* (jack-blackson) Bugfix date calculation (thanks to Lueghi for the hint)

### 1.3.0 (2023-02-22) 
* (jack-blackson) Updates for dependencies

### 1.2.5 (2021-06-16) 
* (jack-blackson) Bugfix to delete countdown with sendto

### 1.2.4 (2021-06-09) 
* (jack-blackson) Small bugfixes, translations

### 1.2.3 (2021-05-27) 
* (jack-blackson) Small bugfixes, translations

### 1.2.2 (2021-05-25) 
* (jack-blackson) Small bugfixes, added weblate for translations

### 1.2.1 (2021-05-09) 
* (jack-blackson) Small Bugfixes

### 1.2.0 (2021-05-09) 
* (jack-blackson) Updated packages, added Sentry
* (jack-blackson) Fixes for JS-controller 3.3
* (jack-blackson) Fix that countdowns are created immediatly


### 1.1.0 (2020-04-02) 
* (jack-blackson) bugfix Read-Me link
* (jack-blackson) bugfix repeatCycle

### 1.0.9 (2020-03-31)
* (jack-blackson) Bugfix log messages

### 1.0.8 (2020-03-31)
* (jack-blackson) Repeat countdown in defined period (e.g. every year)

### 1.0.7 (2020-03-30)
* (jack-blackson) Added new date-type for settings: YYYY-MM-DD
* (jack-blackson) Add countdown directly in adapter settings

### 1.0.6 (2020-03-20)
* (DutchmanNL) Fixed adapter type

### 1.0.5 (2020-02-05)
* (jack-blackson) Bugfix for alarm at midnight -> thanks to @Lueghi

### 1.0.4 (2019-08-25)
* (jack-blackson) Reordered release infos

### 1.0.3 (2019-08-10)
* (jack-blackson) Changes for Compact Mode
* (jack-blackson) Various bugfixes
* (jack-blackson) Having multiple instances of the adapater are now possible

### 1.0.2 (2019-07-22)
* (jack-blackson) Release version

### 0.7.0 (2019-07-07)
* (jack-blackson) Bugfixes
* (jack-blackson) addminutes and addhours are now also possible
* (jack-blackson) datapoint in setup is now editable
* (jack-blackson) added total no. of weeks

### 0.6.0 (2019-07-06)
* (jack-blackson) adjustable date format for input and output
* (jack-blackson) delete countdowns with sendto
* (jack-blackson) ability to add countdowns by "days/months/weeks from now)

### 0.5.0 (2019-07-04)
* (jack-blackson) adjust the data in the table
* (jack-blackson) bugfix date import 

### 0.4.0 (2019-06-04)
* (jack-blackson) restructuring - creation of alarms with sendto or manually with datapoint is now possible

### 0.3.0 (2019-05-24)
* (jack-blackson) added total No. of days and hours

### 0.2.0 (2019-05-21)
* (jack-blackson) adjusted packages

### 0.1.0 (2019-04-29)
* (jack-blackson) initial version

## License
The MIT License (MIT)

Copyright (c) 2019-2023 jack-blackson <blacksonj7@gmail.com>

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