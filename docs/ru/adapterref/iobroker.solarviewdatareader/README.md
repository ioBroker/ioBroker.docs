---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: DGtXy5iIPV0aJXSBR+TGxY/qUvt9Dhwsqoorf7fJtlU=
---
![Логотип](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Количество установок (последнее)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Статус зависимости](https://img.shields.io/david/afuerhoff/iobroker.solarviewdatareader.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
** Тесты: ** ![Тестирование и выпуск](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## Адаптер solarviewdatareader для ioBroker
Адаптер считывает данные из регистратора данных Solarview.
Здесь вы можете найти дополнительную информацию о Solarview: https://www.solarview.info/solarlogger.aspx

## Конфигурация
### IP-адрес, порт
Чтобы получить данные от регистратора данных, вы должны ввести IP-адрес и порт вашего TCP-сервера Solarview.
Стандартный порт - 15000. См. Документацию Solarview https://www.solarview.info/solarlogger.aspx.

### Конвертер D0
Если у вас есть преобразователь D0, подключенный к регистратору данных Solarview, вы можете включить эту опцию.
По вопросам обращайтесь к документации Solarview.

### Сумма счетчика собственного потребления и от 1 до 4
Если у вас есть измеритель S0, вы можете включить эту опцию.
Вы можете иметь до 4-х счетчиков собственного потребления и сумму со всех счетчиков.
По вопросам обращайтесь к документации Solarview.

### Инверторы с 1 по 4
Каждый инвертор можно включить отдельно.
По вопросам обращайтесь к документации Solarview.

### Интервал, начало интервала, конец интервала
Здесь вы можете настроить временной диапазон и интервал. Диапазон времени для 24 часов - с 00:00 до 23:59.
Не с 00:00 до 00:00.

### Установить системную переменную CCU, Системную переменную
Это особенность Homematic CCU. Вы можете определить системную переменную в CCU.
В этой системной переменной сохраняется фактическое значение PAC.
Вы должны указать состояние ioBroker для этой системной переменной -> **например. "hm-rega.0.12345"**

### Созданные состояния
#### Pvig, pvi1..4, d0supply, d0потребление
daily = дневная выработка (кВтч) ежемесячно = ежемесячная выработка (кВтч) годовая = годовая выработка (кВтч) общая = общая выработка (кВтч) ток = мощность генератора в Вт UDC, UDCB, UDCC, UDCD = напряжение генератора в вольтах на MPP-Tracker IDC, IDCB, IDCC, IDCD = ток генератора в амперах на MPP-Tracker UL1, IL1 = напряжение сети, фаза 1 питания сети UL2, IL2 = напряжение сети, фаза 2 питания сети UL3, IL3 = напряжение сети, фаза 3 питания сети TKK = Инвертор температуры

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.2 (2021-05-07)
* (afuerhoff) node.js 14 and 16 compatibilty
* (afuerhoff) dependencies updated

### 1.0.1 (2021-05-01)
* (afuerhoff) changes due to js-controller 3.3.x

### 1.0.0 (2021-04-25)
* (afuerhoff) dependencies updated
* (afuerhoff) documentation changed
* (afuerhoff) minor changes
* (afuerhoff) due to stable state version set to 1.0.0

### 0.2.1
* (afuerhoff) self consumption meter optimized
### 0.2.0
* (afuerhoff) Error handling optimized, self consumption meter implemented

## License
MIT License

Copyright (c) 2019-2021 Achim Fürhoff <achim.fuerhoff@outlook.de>

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