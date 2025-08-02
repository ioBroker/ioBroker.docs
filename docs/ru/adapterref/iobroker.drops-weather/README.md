---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.drops-weather/README.md
title: ioBroker.drops-погода
hash: 7+tfV2pZIo87TP/OQvVnoyhyu7Eg4jxVxPpBPVerwqI=
---
![Логотип](../../../en/adapterref/iobroker.drops-weather/admin/drops-weather.png)

![версия НПМ](https://img.shields.io/npm/v/iobroker.drops-weather.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.drops-weather.svg)
![Количество установок](https://iobroker.live/badges/drops-weather-installed.svg)
![Статус зависимости Libraries.io для последней версии](https://img.shields.io/librariesio/release/npm/iobroker.drops-weather?label=npm%20dependencies&style=flat-square)
![GitHub](https://img.shields.io/github/license/iobroker-community-adapters/iobroker.drops-weather?style=flat-square)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/drops-weather-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.drops-weather.png?downloads=true)

# IoBroker.drops-weather
![Тест и выпуск](https://github.com/iobroker-community-adapters/ioBroker.drops-weather/workflows/Test%20and%20Release/badge.svg)

## Адаптер для защиты от падений и погодных условий для ioBroker
Этот адаптер предоставляет данные о дожде с https://www.drops.live

## Функции
Этот адаптер считывает данные о дожде с интервалом в 5 минут с веб-сайта.
Существует точка данных диаграммы, которая может напрямую использоваться виджетом BarChart из виджетов Material Designs.
![Логотип](../../../en/adapterref/iobroker.drops-weather/img/ChartDrops2.png)

Данные за 5 минут и 1 час хранятся в разных состояниях.
![Логотип](../../../en/adapterref/iobroker.drops-weather/img/statesDrops.png)

## Конфигурация
Местоположение GPS больше не доступно на сайте drops.live.

Вам нужно знать код города вашего местонахождения или города. Чтобы получить этот код, просто введите название вашего города (или используйте свое местоположение) на https://www.drops.live.

Код вашего города вы найдете в URL-адресе:

![Логотип](../../../en/adapterref/iobroker.drops-weather/img/citycode.png)

В этом примере вы найдете 6573 для Берлина.

## Примечание для пользователей архитектуры arm (т.е. raspberry pi)
Этот адаптер пытается установить пакет 'chromium-browser' на архитектуре linux / arm. Это необходимо, поскольку стандартная установка puppeteer не обеспечивает работающий headless-браузер на этой архитектуре. Если установка не удалась, можно установить любой совместимый браузер и указать путь к браузеру в конфигурации экземпляра.

## Кредиты
Создание этого адаптера было бы невозможно без огромной работы @inbux (https://github.com/inbux), который создал версии этого адаптера до V1.x.x.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.2.4 (2025-06-04)
- (mcm1957) fix language default.
- (mcm1957) dependencies have been updated

### 1.2.3 (2025-03-29)
- (arteck) Text is now deleted if no text is available

### 1.2.2 (2025-03-29)
- (arteck) Puppeteer-extra and puppeteer-extra-plugin-stealth have been added

### 1.2.1 (2025-03-25)
- (arteck) Language support has been added.
- (mcm1957) Unused dependencies have been removed.

### 1.2.0 (2025-03-24)
- (mcm1957) Timeout has been encreased to 15s.
- (mcm1957) Logging has been reduced.
- (arteck) Adapter has been converted to scheduled operation. 
- (mcm1957) A spelling error blocking chromium-browser manual selection has been corrected.

## License

MIT License

Copyright (c) 2025, iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2024 inbux <inbux.development@gmail.com>

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