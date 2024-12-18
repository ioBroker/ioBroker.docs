---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-информация
hash: b8YIDN5UrVOEjnNuFYJ5RH86vGY42dQtaDnYBja3ul4=
---
![Логотип](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Количество установок (стабильно)](http://iobroker.live/badges/apg-info-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Количество установок (последнее)](http://iobroker.live/badges/apg-info-installed.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-информация
[![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Тест и выпуск](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Apg-info адаптер для ioBroker
Этот адаптер предоставляет пиковые часы для австрийской электросети (только австрийские значения!), когда потребление электроэнергии следует избегать. Кроме того, адаптер предоставляет цены PHELIX Day-Ahead (EPEX Spot) для Австрии, Швейцарии и Германии (настраиваются в настройках адаптера). Плата поставщика, налоги, расходы на сеть могут быть добавлены по желанию в конфигурации (вкладка Расчет).
`[..].marketprice.today.jsonChart` и `[..].marketprice.tomorrow.jsonChart` можно использовать с https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart.
Со стандартной конфигурацией адаптер работает в 00:00, 13:00 и 15.00 часов. Настоятельно рекомендуется не удалять запуск в 00:00, иначе смена дня (завтра --> сегодня) не будет работать должным образом.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 18 или выше
* ioBroker хост (js-контроллер) 5.0 или выше

## Швейцарский рынок
Для швейцарского рынка необходим токен от entsoe.eu. Пожалуйста, добавьте свой токен в конфигурацию адаптера на вкладке &quot;ENTSOE TOKEN&quot;. Зарегистрируйтесь на странице https://transparency.entsoe.eu/ и затем отправьте письмо на адрес transparent@entsoe.eu с просьбой о доступе к RESTFUL API для зарегистрированного вами адреса электронной почты.<br> Более подробную информацию можно найти на сайте https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.11 (2024-10-20)
* (HGlab01) improve UI config (#296)

### 0.1.10 (2024-10-04)
* (HGlab01) fix issue #290
* (HGlab01) bump axios to 1.7.7

### 0.1.9 (2024-08-21)
* (HGlab01) Support eslint9

### 0.1.8 (2024-07-31)
* (HGlab01) Swiss market support; Token needed! Check readme!
* (HGlab01) Bump json-explorer to 0.1.16

### 0.1.7 (2024-05-27)
* (HGlab01) Add date to today and tomorrow to make the date of today and tomorrow clear
* (HGlab01) bump axios to 1.7.2

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