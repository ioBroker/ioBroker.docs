---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: /jy4O1qaZHoOv/kGR7OZoKXOSS2F1t7QxxflAn4JrX0=
---
![Логотип](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![версия НПМ](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Количество установок (стабильное)](http://iobroker.live/badges/apg-info-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Количество установок (последнее)](http://iobroker.live/badges/apg-info-installed.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Тестирование и выпуск](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Apg-info адаптер для ioBroker
Этот адаптер предоставляет данные о пиковых нагрузках в австрийской энергосистеме (только австрийские значения!), когда потребление электроэнергии следует избегать. Кроме того, адаптер предоставляет цены PHELIX Day-Ahead (EPEX Spot) для Австрии, Швейцарии и Германии (настраиваются в настройках адаптера). Плата поставщика, налоги и стоимость подключения к сети могут быть добавлены в конфигурацию (вкладка «Расчет»).
`[..].marketprice.today.jsonChart` и `[..].marketprice.tomorrow.jsonChart` можно использовать с https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart.
В стандартной конфигурации адаптер работает в 00:00, 13:00 и 15:00. Настоятельно рекомендуется не отключать запуск в 00:00, иначе смена дня (завтра -> сегодня) не будет работать корректно.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения дополнительных сведений и информации о том, как отключить сообщение об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 20 или выше
* ioBroker host (js-controller) 5.0 или выше

## Рыночные цены за четверть часа
Эти рыночные цены собираются Exaa и, в качестве резерва, Entsoe. Поэтому рекомендуется *запросить токен Entsoe*, если настроены цены ежеквартально.

## Швейцарский рынок
Для швейцарского рынка требуется токен от entsoe.eu. Добавьте свой токен в конфигурацию адаптера на вкладке «ENTSOE TOKEN».

## Как получить токен Entsoe
Зарегистрируйтесь на странице https://transparency.entsoe.eu/, а затем отправьте электронное письмо на адрес transparent@entsoe.eu с просьбой предоставить вам доступ к RESTFUL API для зарегистрированного вами адреса электронной почты.<br> Более подробную информацию можно найти по ссылке: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.24 (2025-11-05)
* (HGlab01) Provider Entsoe is used as backup for quarter-hourly market prices. Request a token to be on the safe side
* (HGlab01) Bump axios to 1.13.1
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.2

### 0.1.23 (2025-10-29)
* (HGlab01) extend to two market data providers for quarter-hourly market prices
* (HGlab01) add turn on/off quarter-hourly and hourly market prices
* (HGlab01) refactorings

### 0.1.22 (2025-10-21)
* (HGlab01) Implement retry mechanism for API calls
* (HGlab01) add turn on/off for peak hours and market prices

### 0.1.21 (2025-10-13)
* (HGlab01) Support quater-hourly tarifs
* (HGlab01) Bump iobroker-jsonexplorer to 0.2.1

### 0.1.20 (2025-10-06)
* (HGlab01) prepeare iobroker-jsonexplorer readiness for v0.2.0
* (HGlab01) Bump axios to 1.12.2

## License
MIT License

Copyright (c) 2025 HGlab01 <myiobrokeradapters@gmail.com>

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