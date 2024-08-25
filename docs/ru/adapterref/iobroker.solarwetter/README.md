---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solarwetter/README.md
title: ioBroker.solarwetter
hash: N9jcCi7jpOsufYNjUhK1MpH6xfIXnNOyJE9q1vy1Amc=
---
![Логотип](../../../en/adapterref/iobroker.solarwetter/admin/solarwetter.png)

![Количество установок](http://iobroker.live/badges/solarwetter-stable.svg)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.solarwetter.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solarwetter.svg)
![НПМ](https://nodei.co/npm/iobroker.solarwetter.png?downloads=true)

# IoBroker.solarwetter
## Описание
Этот адаптер предоставляет прогноз ежедневного количества солнечной энергии для определенного региона от поставщика [http://www.auswahl-plz-bereich.solar-wetter.com](http://solar-wetter.com).

## Конфигурация
### Пользователь/пароль
С 2022/03 аутентификация больше не требуется.

### Расположение
Выберите свой регион, выбрав из списка почтовых индексов.
Введите мощность вашей солнечной электростанции, чтобы рассчитать выходную мощность.

### Солнечная электростанция
Введите общую мощность вашей солнечной электростанции, чтобы рассчитать ежедневный прогноз производства энергии (возможны десятичные разделители).

### Прогноз на 4 дня
Выберите город, чтобы адаптер создал ссылку на диаграмму прогноза на 4 дня (точка данных `solarwetter.0.forecast.chart.__url__`).

![альтернативный текст](../../../en/adapterref/iobroker.solarwetter/img/solarwetterSettingScreenshot.jpg "Настройки скриншотов")

## Расписание
Адаптер запускается один раз в день.

## Состояния
`solarwetter.0.forecast.__clearSky__` (*значение*)

`solarwetter.0.forecast.__realSky_min__` (*значение*)

`solarwetter.0.forecast.__realSky_max__` (*значение*)

`solarwetter.0.forecast.__Datum__` (*строка, без метки времени*)

`solarwetter.0.forecast.__Region__` (*значение*)

`solarwetter.0.forecast.home.__clearSky__` (*значение*)

`solarwetter.0.forecast.home.__realSky_min__` (*значение*)

`solarwetter.0.forecast.home.__realSky_max__` (*значение*)

`solarwetter.0.forecast.home.__Leistung__` (*значение*)

`solarwetter.0.forecast.chart.__city__` (*значение*)

`solarwetter.0.forecast.chart.__url__` (*значение*)

## Делать
* Перевод точек данных
* Русский перевод окна настроек

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 1.1.5 (2023-08-15)
* (motuditli) Adjusted for Website Changes - removal of authentication
* (bluefox) Added compact mode and JSON config

### 1.0.0 (2017-10-15)
* (pix) End of beta, Node.js 4 or higher required

### 0.3.0 (2017-05-28)
* (pix) Login with website password & username

### 0.2.0 (2017-01-05)
* (pix) Travis CI testing added

### 0.1.2 (2016-06-21)
* (pix) city selection fixed

### 0.1.1 (2016-06-20)
* (pix) 4-Day-Forecast Chart

### 0.1.0 (2016-06-12)
* (pix) publish on npm

### 0.0.6 (2016-06-09)
* (pix) Adapter.stop() fixed

### 0.0.5 (2016-05-14)
* (pix) Settings now show correct location if already defined

### 0.0.4 (2016-05-13)
* (pix) Appearance of settings window

### 0.0.3 (2016-05-13)
* (pix) Calculates power of own solar plant

### 0.0.2 (2016-05-13)
* (pix) Post code area selectable

### 0.0.1 (2016-05-12)
* (pix) first release

## License

The MIT License (MIT)

Copyright (c) 2020-2023 pix

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

---
*Logo is partly crafted by CHALLENGER* :+1:
