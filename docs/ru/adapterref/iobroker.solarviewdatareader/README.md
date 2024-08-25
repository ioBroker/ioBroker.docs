---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: giiX9+hLwLWA5HvDhp/CfEdsy2+ubQ+cvWtQJK0h248=
---
![Логотип](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![версия NPM](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Количество установок (последние)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
**Тесты:** ![Тестируйте и выпускайте](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## Адаптер SolarViewDataReader для ioBroker
Адаптер считывает данные с регистратора данных Solarview.
Здесь вы можете найти дополнительную информацию о Solarview: https://www.solarview.info/solarlogger.aspx

## Конфигурация
### IP-адрес, порт
Для получения данных из регистратора данных необходимо ввести ip-адрес и порт с вашего TCP-сервера solarview.
Стандартный порт — 15000. См. документацию Solarview https://www.solarview.info/solarlogger.aspx.

### Преобразователь D0
Если у вас есть преобразователь D0, подключенный к регистратору данных Solarview, вы можете включить эту опцию.
Если у вас возникнут вопросы, обратитесь к документации Solarview.

### Сумма счетчика собственного потребления и от 1 до 4
Если у вас есть измеритель S0, вы можете включить эту опцию.
Вы можете иметь до 4 счетчиков собственного потребления и сумму со всех счетчиков.
Если у вас возникнут вопросы, обратитесь к документации Solarview.

### Инвертор с 1 по 4
Каждый инвертор можно включить отдельно.
Если у вас возникнут вопросы, обратитесь к документации Solarview.

### Интервал, начало интервала, конец интервала
Здесь вы можете настроить временной диапазон и интервал. Временной диапазон для 24-часового режима составляет от 00:00 до 23:59.
Не с 00:00 до 00:00.

### Установка системной переменной CCU, Системная переменная
Это специальная функция для домашнего CCU. Вы можете определить системную переменную в CCU.
В этой системной переменной сохраняется фактическое значение PAC.
Вы должны заполнить состояние ioBroker для этой системной переменной -> ** например. "hm-rega.0.12345"**

### Созданные состояния
#### Pvig, pvi1..4, d0supply, d0consumment
daily = дневная выработка (кВтч) monthly = месячная выработка (кВтч) yearly = годовая выработка (кВтч) total = общая выработка (кВтч) current = мощность генератора в Вт UDC, UDCB, UDCC, UDCD = напряжения генератора в вольтах на MPP-Tracker IDC, IDCB, IDCC, IDCD = ток генератора в амперах на MPP-Tracker UL1, IL1 = напряжение сети, фаза 1 сети UL2, IL2 = напряжение сети, фаза 2 сети UL3, IL3 = напряжение сети, фаза 3 сети TKK = Инвертор температуры

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### __WORK IN PROGRESS__
-->
### 1.0.6 (2022-07-04)
* (afuerhoff) dependencies updated
* (afuerhoff) Interval settings changed from minutes to seconds
* (afuerhoff) States only writen after changes

### 1.0.5 (2022-02-17)
* (afuerhoff) dependencies updated
* (afuerhoff) test and release updated
* (afuerhoff) smaller changes

### 1.0.4 (2022-02-09)
* (afuerhoff) dependencies updated
* (afuerhoff) issue #20 fixed

### 1.0.3 (2021-12-08)
* (afuerhoff) dependencies updated

### 1.0.2 (2021-05-07)
* (afuerhoff) node.js 14 and 16 compatibilty
* (afuerhoff) dependencies updated

## License
MIT License

Copyright (c) 2019-2022 Achim Fürhoff <achim.fuerhoff@outlook.de>

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
