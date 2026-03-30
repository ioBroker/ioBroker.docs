---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.apg-info/README.md
title: ioBroker.apg-info
hash: Q563Dth9hJZtJntiWYmZrKhRrVqsc6Ay5TzTIfrva+4=
---
![Логотип](../../../en/adapterref/iobroker.apg-info/admin/apg-info.png)

![Версия NPM](http://img.shields.io/npm/v/iobroker.apg-info.svg)
![Количество установок (стабильных)](http://iobroker.live/badges/apg-info-stable.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.apg-info.svg)
![Количество установок (последние)](http://iobroker.live/badges/apg-info-installed.svg)
![Статус зависимости](https://img.shields.io/librariesio/release/npm/iobroker.apg-info)
![Известные уязвимости](https://snyk.io/test/github/HGlab01/ioBroker.apg-info/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.apg-info.png?downloads=true)

# IoBroker.apg-info
[![Статус FOSSA](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_shield) ![Тестирование и выпуск](https://github.com/HGlab01/ioBroker.apg-info/workflows/Test%20and%20Release/badge.svg)

## Адаптер apg-info для ioBroker
Этот адаптер предоставляет данные о пиковых периодах потребления электроэнергии в австрийской энергосистеме (только австрийские значения!), когда потребление электроэнергии следует избегать. Кроме того, адаптер предоставляет спотовые цены PHELIX на следующий день (EPEX Spot) для Австрии, Швейцарии и Германии (настраивается в параметрах адаптера). Плата за услуги провайдера, налоги и стоимость электроэнергии в сети могут быть добавлены по желанию в конфигурации (вкладка «Расчет»).
`[..].marketprice.today.jsonChart` и `[..].marketprice.tomorrow.jsonChart` можно использовать с https://github.com/Scrounger/ioBroker.vis-materialdesign#json-chart.
При стандартной конфигурации адаптер работает в 00:00, 13:00 и 15:00. Настоятельно рекомендуется не отключать работу в 00:00, иначе смена дня (завтра --> сегодня) не будет работать должным образом.

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)!

## Требует
* Node.js 20 или выше
* ioBroker host (js-controller) 5.0 или выше

## Рыночные цены с интервалом в четверть часа
Эти рыночные цены собираются компанией Exaa, а в качестве резервной копии используются компанией Entsoe. Поэтому рекомендуется *запросить токен Entsoe*, если настроены цены с интервалом в четверть часа.

## Швейцарский рынок
Для швейцарского рынка необходим токен с сайта entsoe.eu. Пожалуйста, добавьте свой токен в конфигурацию адаптера на вкладке "ENTSOE TOKEN".

## Как получить токен Entsoe
Зарегистрируйтесь на странице https://transparency.entsoe.eu/ и затем отправьте электронное письмо на адрес transparency@entsoe.eu с просьбой предоставить доступ к RESTFUL API для указанного вами адреса электронной почты.<br> Более подробную информацию можно найти по ссылке: https://transparency.entsoe.eu/content/static_content/Static%20content/web%20api/Guide.html#_authentication_and_authorisation

## Расчет стоимости электроэнергии по времени (НОВИНКА)
На рынках (например, в Австрии), характеризующихся переменными во времени тарифами на электроэнергию (например, сниженными тарифами в полдень летом), параметры теперь можно настраивать с помощью таблицы. В справочной таблице показан необходимый формат ввода данных. Эта функция находится в настройках адаптера на вкладке «Расчеты».

**Важно:** Табличный вид работает с Admin 7.7.23 и более поздними версиями. В более старых версиях поле даты отображается некорректно (https://github.com/ioBroker/ioBroker.admin/issues/3344).

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### __WORK IN PROGRESS__
-->
### 0.1.30 (2026-02-24)
* (@HGlab01) finetune timeout management

### 0.1.29 (2026-02-14)
* (HGlab01) add time based grid costs calculation (see above)
* (HGlab01) Bump axios to 1.13.5

### 0.1.28 (2025-12-11)
* (HGlab01) add Energy-Charts as third data provider

### 0.1.27 (2025-11-19)
* (HGlab01) disable data provider Epex (not a stable option)

### 0.1.26 (2025-11-15)
* (HGlab01) optimize handling for source Entsoe
* (HGlab01) optimize handling when data provider runs in timeout
* (HGlab01) market price details can be switched on/off
* (HGlab01) enhanced logs when it comes to retries

## License
MIT License

Copyright (c) 2023-2026 HGlab01 <myiobrokeradapters@gmail.com>

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

#### Disclaimer data providers
Three data providers are used for this adapter
* Exaa (https://www.exaa.at/)
* Entso-e (https://www.entsoe.eu/data/transparency-platform/)
* Energy Charts (https://api.energy-charts.info/) licensed under the CC BY 4.0 license




[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FHGlab01%2FioBroker.apg-info?ref=badge_large)