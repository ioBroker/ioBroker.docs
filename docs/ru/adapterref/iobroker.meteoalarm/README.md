---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.meteoalarm/README.md
title: ioBroker.meteoalarm
hash: 7xEbq/dyKmo40+xa6zqeS1JsKI1pscmmUptRfdGTdZc=
---
![Логотип](../../../en/adapterref/iobroker.meteoalarm/admin/meteoalarm.png)

![версия NPM](http://img.shields.io/npm/v/iobroker.meteoalarm.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.meteoalarm.svg)
![Количество установок](http://iobroker.live/badges/meteoalarm-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.meteoalarm.png?downloads=true)

# IoBroker.meteoalarm
**Этот адаптер использует библиотеки Sentry для автоматического сообщения об исключениях и ошибках кода разработчикам.** Дополнительные сведения и информацию о том, как отключить отчеты об ошибках, см. в [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются, начиная с js-controller 3.0.

Адаптер meteoalarm для ioBroker ------------------------------------------------------------- -------------------------------- Этот адаптер извлекает предупреждения о погоде с сайта https://meteoalarm.org, включая информацию о ветре. , снег, дождь, высокая и низкая температура и т. д. Эта информация доступна на местном языке и для подробных регионов.

ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ: Возможны временные задержки между этим веб-сайтом и веб-сайтом www.meteoalarm.org. Для получения самой последней информации об уровнях оповещения, опубликованной участвующими национальными метеорологическими службами, используйте https://www.meteoalarm.org.

Разработчик не может гарантировать своевременную обработку предупреждений или наличие ошибок и проблем, из-за которых предупреждения вообще не обрабатываются!

## Как это использовать
Выберите свою страну, а затем регион, для которого вы хотите получать предупреждения. Если вы не знаете, как называется ваш регион, перейдите на https://meteoalarm.org и попробуйте найти его на карте.

[английское описание](docs/en/meteoalarm.md)

[Deutsche Anleitung](docs/de/meteoalarm.md)

## 2.3.3 (09.02.2023)
* (jack-blackson) Добавлена возможность определять уровни тревоги для виджета, JSON и уведомлений
* (jack-blackson) Добавлен украинский язык

## 2.3.2 (07.01.2023)
* (jack-blackson) Исправление для правильной очистки предупреждений
* (jack-blackson) Исправлена ошибка для pushover при использовании нескольких экземпляров.

## 2.3.1 (2022-09-15)
* (jack-blackson) Возможность отправки сигналов тревоги на другие адаптеры (Telegramm, eMail, Pushover, Signal, Synochat)
* (jack-blackson) Фикс ссылки в папке будильников

## 2.2.1 (2022-07-28)
* (jack-blackson) Исправление noOfAlarms и нумерации объектов

## 2.2.0 (2022-07-05)
* (jack-blackson) Добавлен объект JSON, содержащий все ошибки активации в формате JSON (например, для пользователей iqontrol)
* (jack-blackson) Первый шаг к избавлению от повторяющихся сообщений об ошибках

## 2.1.5 (2022-06-13)
* (jack-blackson) Исправлена ошибка «Ошибка из InMemDB: Ошибка: не существует»

## 2.1.4 (2022-05-26)
* (jack-blackson) Добавлена навигационная цепочка для Sentry, чтобы увидеть, в каком месте возникла ошибка.
* (jack-blackson) Начать отслеживание в Sentry при отправке XML без геокода

## 2.1.3 (23 мая 2022 г.)
* (jack-blackson) Обработка предупреждений, отправленных без геокода -> Sentry IOBROKER-METEOALARM-3B

## 2.1.2 (2022-05-16)
* (jack-blackson) Исправление для изменения в xml (использовалась неправильная ссылка для предупреждения) -> Sentry IOBROKER-METEOALARM-2Y и IOBROKER-METEOALARM-31

## 2.1.1 (2022-02-08)
* (jack-blackson) Обновлена информация о лицензии
* (jack-blackson) Исправлены ошибки для js-controller 4.x

## 2.1.0 (03.02.2022)
* (джек-блэксон) Добавлена Швейцария

## 2.0.10 (2021-12-10)
* (jack-blackson) Исправление ошибки Sentry IOBROKER-METEOALARM-2K
* (jack-blackson) Исправление для Ирландии

## 2.0.9 (27.11.2021)
* (jack-blackson) Правильно вычисляйте дату на словах - на этот раз по-настоящему :)

## 2.0.10 (2021-12-10)
* (jack-blackson) Исправление ошибки Sentry IOBROKER-METEOALARM-2K
* (джек-блэксон) Исправление ошибки для Ирландии

## 2.0.9 (27.11.2021)
* (jack-blackson) Правильно вычисляйте дату на словах - на этот раз по-настоящему :)
* (jack-blackson) Исправление ошибки Sentry IOBROKER-METEOALARM-2N

## 2.0.8 (2021-11-26)
* (jack-blackson) Добавлена новая точка данных "Количество активных тревог"
* (jack-blackson) Скорректирована информация о пакете
* (jack-blackson) Исправлено представление даты в HTML Виджет для предупреждений на 2 дня вперед

## 2.0.7 (2021-10-01)
* (джек-блэксон) Исправление

## 2.0.6 (2021-09-29)
* (джек-блэксон) Добавлена Северная Македония
* (jack-blackson) Исправление ошибки «result.feed.entry.forEach не является функцией»

## 2.0.5 (2021-08-15)
* (jack-blackson) Дата исправления прописью

## 2.0.4 (2021-08-13)
* (jack-blackson) Ссылка на readme исправления

## 2.0.3 (2021-08-09)
* (jack-blackson) Показывать дату прописью вместо дня в виджете HTML
* (jack-blackson) Добавлен языковой код для Бельгии.

## 2.0.2 (15.07.2021)
* (джек-блэксон) Исправление

## 2.0.1 (2021-07-08)
* (jack-blackson) Изменено имя папки будильника на Alarm_X
* (jack-blackson) Определите в настройках, какие будильники вы хотите видеть
* (jack-blackson) Сортировать тревоги по дате вступления в силу

## 2.0.0 (2021-07-06)
* (jack-blackson) Перейти на Meteoalarm.org, полностью восстановить

## 1.2.1 (2021-06-05)
* (jack-blackson) Исправление для обработки неправильного XML (если используется страна вместо региона)
* (джек-блэксон) Добавлен Люксембург

## 1.2.0 (2021-05-16)
* (jack-blackson) Новая настройка: «Нет цвета фона в HTML-виджете», «Определить предупреждающие цвета» и «Использовать белые значки».
* (джек-блэксон) Новые иконки

## 1.1.11 (09.05.2021)
* (Джек-Блэксон) Обновления пакетов

## 1.1.9 (2021-05-07)
* (Джек-Блэксон) Обновления пакетов

## 1.1.5 (2021-05-02)
* (jack-blackson) Исправление ошибок JS-Controller 3.3.1, обработка ошибок без определения языка

## 1.1.4 (2021-04-05)
* (jack-blackson) Обработка сообщения об ошибке ENOTFOUND, добавлен Sentry

## 1.1.3 (2021-03-29)
* (jack-blackson) Исправлена ошибка проверки адаптера

## 1.1.2 (2021-03-29)
* (jack-blackson) Исправление неработающего обновления данных, удалена автогенерация ссылок из-за ошибок CORS

## 1.1.1 (28.10.2020)
* (jack-blackson) Исправление HTML-данных

## 1.1.0 (2020-03-29)
* (джек-блэксон) Исправление в Германии

## 1.0.9 (2020-02-06)
* (джек-блэксон) Исправление в Германии

## 1.0.8 (2019-11-15)
* (jack-blackson) Добавлены Польша, Молдова, Греция, Румыния
* (jack-blackson) Добавлена новая точка данных для получения ссылки на карту погоды.

## 1.0.7 (2019-11-13)
* (jack-blackson) Добавлены Чехия, Ирландия, Израиль, Литва, Латвия, Черногория, Мальта, Сербия, Швеция

## 1.0.6 (2019-10-19)
* (джек-блэксон) Добавлены Швейцария и Словакия

## 1.0.5 (2019-09-22)
* (jack-blackson) Небольшие корректировки логирования

## 1.0.4 (2019-09-11)
* (джек-блэксон) Ошибка Трэвиса

## 1.0.3 (2019-09-09)
* (jack-blackson) Небольшие исправления, изменение типа "демон" на "расписание"

## 1.0.2 (2019-08-25)
* (jack-blackson) Информация о релизе изменена

### 1.0.1 (2019-08-18)
* (jack-blackson) Исправлено отсутствие значка будильника

### 1.0.0 (2019-08-12)
* (джек-блэксон) Релизная версия

### 0.6.0 (05.08.2019)
* (jack-blackson) Хранить иконки погоды локально в адаптере

### 0.5.0 (21 июля 2019 г.)
* (Джек-Блэксон) Обработка тайм-аутов
* (jack-blackson) Переводы на все языки
* (джек-блэксон) проверка URL

### 0.4.0 (20 июля 2019 г.)
* (jack-blackson) Добавлены данные для NL,NO,HR,FI,ES
* (jack-blackson) Добавлен текст для ввода текста, текст теперь пуст, если уровень равен 1 (без предупреждений).
* (джек-блэксон) Скорректированы цвета

### 0.3.0 (2019-07-13)
* (джек-блэксон) Добавлен HTML-виджет
* (джек-блэксон) Значок исправления

### 0.2.0 (2019-07-12)
* (jack-blackson) Добавлены данные "Завтра"

### 0.1.0 (11 июля 2019 г.)
* (джек-блэксон) начальная версия

## Кредиты
Иконка колокольчика, разработанная Freepik с сайта www.flaticon.com.

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