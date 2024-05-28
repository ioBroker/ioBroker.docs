---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-информация
hash: 8wDh7cXhCkzlq0x3E2224YMuZyf32PYekvxxEejClJQ=
---
![Логотип](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![НПМ-версия](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/apg-info-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Количество установок (последних)](http://iobroker.live/badges/apg-info-installed.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Тестирование и выпуск](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Адаптер apg-info для ioBroker
Этот адаптер обеспечивает работу австрийской энергосистемы в часы пик, когда необходимо избегать потребления электроэнергии. Кроме того, адаптер предоставляет цены PHELIX на сутки вперед (EPEX Spot) для Австрии и Германии (настраивается в настройках адаптера). Плату провайдера, налог, стоимость сети можно добавить опционально в конфиге (вкладка «Расчет»).
`[..].marketprice.today.jsonChart` и `[..].marketprice.tomorrow.jsonChart` можно использовать с https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart.
В стандартной конфигурации адаптер работает в 00:00, 13:00 и 15:00. Крайне не рекомендуется удалять прогон в 00:00, иначе смена дня (завтра --> сегодня) не будет работать корректно.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 18 или выше.
* Хост ioBroker (js-контроллер) 5.0 или выше

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.7 (2024-05-27)
* (HGlab01) Add date to today and tomorrow to make the date of today and tomorrow clear
* (HGlab01) bump axios to 1.7.2

### 0.1.6 (2024-03-17)
* (HGlab01) fix issue in debug-mode: Cannot read properties of null (reading 'data')
* (HGlab01) bump axios to 1.6.8

### 0.1.5 (2024-01-20)
* (HGlab01) Add fee, grid costs and tax calculation

### 0.1.4 (2024-01-15)
* (HGlab01) fix 'Cannot read properties of undefined (reading 'status')'

### 0.1.3 (2023-12-26)
* (HGlab01) Fix issue 'Request failed with status code 500' (#170)

## License
MIT License

Copyright (c) 2024 HGlab01 <myiobrokeradapters@gmail.com>

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

#### Disclaimer apg-powermonitor
More about the security of supply & all data, facts and figures regarding the world of electricity and the energy transition can be found at www.apg-powermonitor.at.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)