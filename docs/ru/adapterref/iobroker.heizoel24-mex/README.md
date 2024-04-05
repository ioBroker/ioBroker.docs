---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.heizoel24-mex/README.md
title: ioBroker.heizoel24-mex
hash: tw1pepMs2bnt9iPaEVBs3+H0IZPf9T/S1wr3GeJaJTs=
---
![Логотип](../../../en/adapterref/iobroker.heizoel24-mex/admin/heizoel24-mex.png)

![НПМ-версия](https://img.shields.io/npm/v/iobroker.heizoel24-mex.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.heizoel24-mex.svg)
![Количество установок](https://iobroker.live/badges/heizoel24-mex-installed.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/heizoel24-mex-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.heizoel24-mex.png?downloads=true)

# IoBroker.heizoel24-mex
**Тесты:** ![Тестирование и выпуск](https://github.com/ltspicer/ioBroker.heizoel24-mex/workflows/Test%20and%20Release/badge.svg)

## Адаптер heizoel24-mex для ioBroker
MEX – это прибор для измерения уровня печного топлива. Этот адаптер считывает данные MEX с сервера Heizoel24.

См.: https://www.heizoel24.de/mex.

## Использовать:
Просто введите данные для входа в свою учетную запись Heizoel24 (адрес электронной почты и пароль).
Данные MEX хранятся в точке данных heizoel24-mex.
Адаптер по умолчанию запускается каждые 3 часа. Этого вполне достаточно, поскольку MEX отправляет данные только один раз в день.
Точку данных CalculatedRemaining/JsonForEcharts (расчетное оставшееся количество) можно открыть непосредственно с помощью eCharts.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.1 (2024-03-24)

- CalculatedRemaining json data point for eCharts added

### 1.3.0 (2024-03-24)

- New README.md
- CalculatedRemaining data points removed

### 1.2.0 (2024-03-16)

- CalculatedRemaining data points renamed to "Today+XXXX Days"
- Limited to 52 data points
- Option for save CalculatedRemaining json

### 1.1.0 (2024-03-09)

- Superfluous logging function removed

### 1.0.1-alpha.0 (2024-03-08)

- Repo new triggering

### 1.0.0 (2024-03-08)

- Initial release for tests

## License
MIT License

Copyright (c) 2024 Daniel Luginbühl <webmaster@ltspiceusers.ch>

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