---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.countdown/README.md
title: ioBroker.обратный отсчет
hash: r6I1FG7xQx245iTOHvnerFWAKe63AsJ5gONZzELKjik=
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
Адаптер автоматически предоставляет вам таблицу json. Вам просто нужно использовать его с таблицей json. Пожалуйста, отметьте там «Без заголовка». Можно отображать краткий текст или длинный текст.
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
|inWordsShort|Совокупное значение минут, часов и т. д. – например, 1Г 5М 4D|
|inWordsLong|Совокупное значение минут, часов,... - например, 1 год 5 месяцев 4 дня|
|totalHours|Общее количество часов до даты окончания|
|totalDays|Общее количество дней до даты окончания|
|totalWeeks|Общее количество недель до даты окончания|
|reached|Логическое поле, определяющее, была ли достигнута дата окончания|
|repeatEvery|Обратный отсчет повторяется через этот период после достижения конечной даты|

## Функции для добавления
* Возможность добавить скрипт в качестве параметра и запускать его по окончанию обратного отсчета
* Возможность использовать плюс и минус в аддминутах и других функциях добавления

## 1.3.0 (2023-02-22)
* (jack-blackson) Обновления для зависимостей

## 1.2.5 (2021-06-16)
* (jack-blackson) Исправлено удаление обратного отсчета с помощью sendto

## 1.2.4 (2021-06-09)
* (jack-blackson) Мелкие исправления, переводы

## 1.2.3 (2021-05-27)
* (jack-blackson) Мелкие исправления, переводы

## 1.2.2 (2021-05-25)
* (jack-blackson) Небольшие исправления, добавлен веб-сайт для переводов

## 1.2.1 (09.05.2021)
* (джек-блэксон) Мелкие исправления

## 1.2.0 (09.05.2021)
* (jack-blackson) Обновлены пакеты, добавлен Sentry
* (jack-blackson) Исправления для JS-контроллера 3.3
* (jack-blackson) Исправлено, что обратный отсчет создается сразу

## 1.1.0 (2020-04-02)
* (jack-blackson) исправление ошибки ссылка Read-Me
* (джек-блэксон) исправлена ошибка RepeatCycle

## 1.0.9 (31.03.2020)
* (jack-blackson) Сообщения журнала об исправлении ошибок

## 1.0.8 (31.03.2020)
* (джек-блэксон) Повторить обратный отсчет в определенный период (например, каждый год)

## 1.0.7 (30.03.2020)
* (jack-blackson) Добавлен новый тип даты для настроек: ГГГГ-ММ-ДД
* (jack-blackson) Добавить обратный отсчет прямо в настройках адаптера

## 1.0.6 (20.03.2020)
* (DutchmanNL) Фиксированный тип адаптера

## 1.0.5 (2020-02-05)
* (jack-blackson) Исправление для будильника в полночь -> спасибо @Lueghi

## 1.0.4 (2019-08-25)
* (jack-blackson) Информация о релизе изменена

## 1.0.3 (2019-08-10)
* (джек-блэксон) Изменения для компактного режима
* (jack-blackson) Различные исправления
* (jack-blackson) Теперь возможно иметь несколько экземпляров адаптера.

## 1.0.2 (2019-07-22)
* (джек-блэксон) Релизная версия

## 0.7.0 (07.07.2019)
* (джек-блэксон) Исправления
* (Джек-Блэксон) добавление минут и часов теперь также возможно
* (Джек-Блэксон) точка данных в настройках теперь доступна для редактирования
* (джек-блэксон) добавлено общее количество. недель

## 0.6.0 (2019-07-06)
* (джек-блэксон) настраиваемый формат даты для ввода и вывода
* (джек-блэксон) удалить обратный отсчет с помощью sendto
* (Джек-Блэксон) возможность добавлять обратный отсчет на "дни/месяцы/недели с сегодняшнего дня)

## 0.5.0 (2019-07-04)
* (джек-блэксон) скорректировать данные в таблице
* (Джек-Блэксон) исправление импорта даты

### 0.4.0 (2019-06-04)
* (jack-blackson) реструктуризация - теперь возможно создание алармов с sendto или вручную с datapoint

### 0.3.0 (2019-05-24)
* (джек-блэксон) добавлено общее количество дней и часов

### 0.2.0 (21 мая 2019 г.)
* (jack-blackson) скорректированные пакеты

### 0.1.0 (29 апреля 2019 г.)
* (джек-блэксон) начальная версия

## Changelog

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