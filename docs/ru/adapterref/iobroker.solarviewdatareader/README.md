---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarviewdatareader/README.md
title: ioBroker.solarviewdatareader
hash: qQ89mfWA4OhgZOGhnPzzMrTC5iiGari5AcH8qy9ZR1k=
---
![Логотип](../../../en/adapterref/iobroker.solarviewdatareader/admin/solarviewdatareader.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.solarviewdatareader.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarviewdatareader.svg)
![Количество установок (последнее)](https://iobroker.live/badges/solarviewdatareader-installed.svg)
![Количество установок (стабильно)](https://iobroker.live/badges/solarviewdatareader-stable.svg)
![Известные уязвимости](https://snyk.io/test/github/afuerhoff/ioBroker.solarviewdatareader/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.solarviewdatareader.png?downloads=true)

# IoBroker.solarviewdatareader
**Тесты:** ![Тест и выпуск](https://github.com/afuerhoff/ioBroker.solarviewdatareader/workflows/Test%20and%20Release/badge.svg)

## Адаптер solarviewdatareader для ioBroker
Адаптер считывает данные с регистратора данных Solarview.
Здесь вы можете найти дополнительную информацию о Solarview: https://www.solarview.info/solarlogger.aspx

## Конфигурация
### IP-адрес, Порт
Чтобы получить данные с регистратора данных, необходимо ввести IP-адрес и порт с вашего TCP-сервера solarview.
Стандартный порт — 15000. Пожалуйста, обратитесь к документации Solarview https://www.solarview.info/solarlogger.aspx.

### D0-конвертер
Если у вас есть преобразователь D0, подключенный к регистратору данных Solarview, вы можете включить эту опцию.
По вопросам обращайтесь к документации Solarview.

### Сумма счетчика собственного потребления и 1 к 4
Если у вас есть счетчик S0, вы можете включить эту опцию.
Вы можете иметь до 4 счетчиков собственного потребления и сумму со всех счетчиков.
По вопросам обращайтесь к документации Solarview.

### Инвертор 1 в 4
Каждый инвертор можно включить отдельно.
Если у вас есть вопросы, обратитесь к документации Solarview.

### Интервал, начало интервала, конец интервала
Здесь вы можете настроить временной диапазон и интервал. Временной диапазон для 24 часов составляет от 00:00 до 23:59.
Не от 00:00 до 00:00.

### Установить системную переменную CCU, Системная переменная
Это специальная функция для домашнего CCU. Вы можете определить системную переменную в CCU.
В этой системной переменной сохраняется фактическое значение PAC.
Вы должны заполнить состояние ioBroker для этой системной переменной -> **например, "hm-rega.0.12345"**

### Созданные состояния
#### Pvig, pvi1..4, d0supply, d0consumption
daily = дневная выработка (кВт·ч) monly = месячная выработка (кВт·ч) yearly = годовая выработка (кВт·ч) total = общая выработка (кВт·ч) current = мощность генератора в Вт UDC, UDCB, UDCC, UDCD = напряжения генератора в вольтах на MPP-Tracker IDC, IDCB, IDCC, IDCD = ток генератора в амперах на MPP-Tracker UL1, IL1 = напряжение сети, фаза питания сети 1 UL2, IL2 = напряжение сети, фаза питания сети 2 UL3, IL3 = напряжение сети, фаза питания сети 3 TKK= Температурный инвертор

## Changelog
### **WORK IN PROGRESS**
* (afuerhoff) adapter checker changes
* (afuerhoff) dependencies updated
* (afuerhoff) automatic restart [#170](https://github.com/afuerhoff/ioBroker.solarviewdatareader/issues/170)

### 1.1.1 (2024-06-28)
* (afuerhoff) change to typescript
* (afuerhoff) dependencies updated
* (afuerhoff) bugfix CCU variable
* (afuerhoff) documentation changed

### 1.1.0 (2024-05-29)
* (afuerhoff) code optimizations
* (afuerhoff) jsonConfig added
* (afuerhoff) dependencies updated
* (afuerhoff) node >= 18, js-controller >= 5.0.19
* (afuerhoff) admin >= 6.17.13 due to timePicker failure

### 1.0.8 (2024-01-18)
* (afuerhoff) dependencies updated
* (afuerhoff) translations updated

### 1.0.7 (2022-12-21)
* (afuerhoff) dependencies updated

### 1.0.6 (2022-07-04)
* (afuerhoff) dependencies updated
* (afuerhoff) Interval settings changed from minutes to seconds
* (afuerhoff) States only writen after changes

## License
MIT License

Copyright (c) 2019-2024 Achim Fürhoff <achim.fuerhoff@outlook.de>

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