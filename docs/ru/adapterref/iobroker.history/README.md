---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.history/README.md
title: ioBroker.история
hash: PtdWXDfO7iyz5LSlWyu5E++pME8W7qWuproQAaoXRFc=
---
![Логотип](../../../en/adapterref/iobroker.history/admin/history.png)

![Количество установок](http://iobroker.live/badges/history-stable.svg)
![версия NPM](http://img.shields.io/npm/v/iobroker.history.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.history.svg)
![Тесты](http://img.shields.io/travis/ioBroker/ioBroker.history/master.svg)
![НПМ](https://nodei.co/npm/iobroker.history.png?downloads=true)
![Значок Гринкипера](https://badges.greenkeeper.io/ioBroker/ioBroker.history.svg)

# IoBroker.история
Этот адаптер сохраняет историю состояний в двухэтапном процессе.

## Конфигурация
* [Описание на английском языке](docs/en/README.md)
* [deutsche Beschreibung](docs/de/README.md)

## 1.9.0 (16.01.2020)
* (foxriver76) удалено использование adapter.objects
* __требуется js-контроллер >= 2.0.0__

### 1.8.7 (2019-09-02)
* (paul53) старые файлы должны удаляться автоматически

### 1.8.6
* Исправлено несколько мелких проблем и оптимизированы некоторые тексты.

### 1.8.5 (2018-07-02)
* (Apollon77) Исправлена ошибка в storeState

### 1.8.4 (2018-06-24)
* (Apollon77) Исправление/разрешить отключение записи начальных и конечных значений

### 1.8.0 (2018-06-19/24)
* (Apollon77) Добавлена возможность записи данных в другой идентификатор, чтобы упростить смену устройства. Получение данных работает для обоих идентификаторов

### 1.7.4 (2018-04-03)
* (AlCalzone) Исправлена обработка имен файлов для состояний со специальными символами.

### 1.7.3 (28 марта 2018 г.)
* (Apollon77) Уважайте параметр «сохранять навсегда» для сохранения конфигурации точки данных.

### 1.7.2 (2018-02-05)
* (bondrogeen) Исправления Admin3

### 1.7.1 (31 января 2018 г.)
* (Bluefox) Исправления Admin3

### 1.7.0 (17 января 2018 г.)
* (bluefox) Готов к Admin3

### 1.6.6 (20.12.2017)
* (синий лис) переводы

### 1.6.5 (2017-10-05)
* (Apollon77) исправить функцию значения relog

### 1.6.4 (2017-08-12)
* (bluefox) добавить опцию "сохранить последнее значение"

### 1.6.3 (2017-08-03)
* (Apollon77) исправлено поведение интервала журнала, чтобы всегда регистрировать текущее значение

### 1.6.2 (2017-04-07)
* исправлено преобразование типов данных

### 1.6.0 (28 февраля 2017 г.)
* (Apollon77) Заменены некоторые символы в именах файлов истории

### 1.5.3 (22 февраля 2017 г.)
* (Apollon77) Небольшое исправление для старых конфигураций.

### 1.5.2
* (Apollon77) Улучшена логика Min-Delta для точек данных из смешанного типа.

### 1.5.1 (2017-01-16)
* (bluefox) Исправлена обработка значений с плавающей запятой в конфигурации адаптера и конфигурации точки данных.

### 1.5.0 (2016-12-01)
* (Apollon77) Добавление сообщений enableHistory/disableHistory
* (Apollon77) добавлена поддержка регистрации изменений только в том случае, если значение отличается от минимального значения для чисел
* (Apollon77) Исправление агрегатного расчета

### 1.4.0 (29 октября 2016 г.)
* (Apollon77) добавлена возможность повторной регистрации неизмененных значений, чтобы упростить визуализацию.
* (Apollon77) добавлены скрипты конвертера для перемещения данных истории в db

### 1.3.1 (2016-09-25)
* (Apollon77) Исправлено: ts назначается как val
* (bluefox) Фикс селектора для объектов истории

### 1.3.0 (30 августа 2016 г.)
* (bluefox) совместим только с новым админом

### 1.2.0 (27 августа 2016 г.)
* (bluefox) изменить имя объекта с истории на пользовательское

### 1.1.0 (27 августа 2016 г.)
* (bluefox) исправить агрегацию последней точки
* (bluefox) агрегация нет, просто доставляются необработанные данные без какой-либо агрегации

### 1.0.5 (2016-07-24)
* (bluefox) фикс агрегации на больших интервалах

### 1.0.4 (2016-07-05)
* (bluefox) исправить агрегацию по секундам

### 1.0.3 (31 мая 2016 г.)
* (bluefox) рисовать линию до конца, если игнорировать null

### 1.0.2 (29 мая 2016 г.)
* (bluefox) переключить максимум и минимум друг с другом

### 1.0.1 (28 мая 2016 г.)
* (bluefox) также рассчитать конечные/начальные значения для "при изменении"

### 1.0.0 (20 мая 2016 г.)
* (bluefox) изменить имя агрегации по умолчанию

### 0.4.1 (2016-05-14)
* (bluefox) поддержка sessionId

### 0.4.0 (05.05.2016)
* (bluefox) использовать файл агрегации из адаптера sql
* (bluefox) исправлено сохранение значений при выходе
* (bluefox) сохранять все кешированные данные каждые 5 минут
* (bluefox) поддержка мс

### 0.2.1 (2015-12-14)
* (bluefox) добавить описание настроек
* (bluefox) функция агрегата помещена в отдельный файл, чтобы разрешить совместное использование с другими адаптерами.
* (улыбается-Джек) Добавить генерировать демо-данные
* (улыбается-Джек) получить историю в своем форке
* (bluefox) добавить флаг storeAck
* (bluefox) мокап для onchange

### 0.2.0 (2015-11-15)
* (Smiling_Jack) сохранять и загружать в адаптер, а не в js-контроллер
* (Smiling_Jack) агрегация точек данных
* (Smiling_Jack) поддержка пути хранения

### 0.1.3 (2015-02-19)
* (bluefox) исправить небольшую ошибку в истории (спасибо Dschaedl)
* (bluefox) обновить страницу администратора

### 0.1.2 (20 января 2015 г.)
* (bluefox) включить кнопку сохранения и закрытия в конфигурации

### 0.1.1 (10 января 2015 г.)
* (bluefox) проверить, не было ли удалено состояние

### 0.1.0 (2015-01-02)
* (bluefox) включить установку npm

### 0.0.8 (25.12.2014)
* (bluefox) поддержка интервала устранения отказов

### 0.0.7 (01.11.2014)
* (bluefox) сохранять все изменения и не только lc != ts

### 0.0.6 (2014-10-19)
* (bluefox) добавить страницу конфигурации

## Changelog

## License

The MIT License (MIT)

Copyright (c) 2014-2020 Bluefox <dogafox@gmail.com>, Apollon77

Copyright (c) 2016 Smiling_Jack

Copyright (c) 2014 hobbyquaker

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