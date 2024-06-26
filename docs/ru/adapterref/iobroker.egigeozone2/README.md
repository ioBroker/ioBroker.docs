---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.egigeozone2/README.md
title: без заголовка
hash: ukMdhtpnvkfB8vxKtyXYZAvPl6qc2x9EJsiwjftHKGs=
---
![логотип](../../../en/adapterref/iobroker.egigeozone2/admin/egigeozone.png)

![Количество установок](http://iobroker.live/badges/egigeozone2-stable.svg)
![НПМ-версия](https://img.shields.io/npm/v/iobroker.egigeozone2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.egigeozone2.svg)
![НПМ](https://nodei.co/npm/iobroker.egigeozone2.png?downloads=true)

## IoBroker.egigeozone2
[![Тестирование и выпуск] (https://github.com/obakuhl/ioBroker.egigeozone2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/obakuhl/ioBroker.egigeozone2/actions/workflows/test-and-release.yml) [![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/egigeozone2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.

## Описание
Это адаптер ioBroker для приложения геозон Android «EgiGeoZone» ([Веб-сайт](https://egigeozone.de/)). Он может получать события геозоны в виде HTTP-запросов при входе или выходе из определенной области с помощью вашего мобильного устройства.

## Совет по безопасности
Не рекомендуется предоставлять этот адаптер общедоступному Интернету (например, открывая настроенный порт на маршрутизаторе). Это означает, что любой запрос к этому порту будет перенаправлен на экземпляр ioBroker, на котором работает адаптер. Существует несколько вариантов повышения безопасности доступа к этому адаптеру:

* Всегда используйте VPN-соединение для запросов или
* интегрировать прокси-сервер (например, nginx) для фильтрации входящих запросов.

## Конфигурация
Внутри EgiGeoZone URL-адрес должен быть определен с использованием следующего синтаксиса:

протокол://адрес:порт/человек

* **протокол** может быть **http** или **https**.
* **адрес** должен быть адресом, по которому доступен экземпляр адаптера.
* **port** должен быть портом, который прослушивает адаптер.
* **person** — это человек, который будет использоваться для перечисления внутри массива atHome.

### Примеры
* https://мой-домен:7654/Джон или
* http://мой-домен:7654/Пол

## Кредиты
Реализация в основном основана на [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) и адаптер BasGo [ioBroker.egigeozone](https://github.com/BasGo/ioBroker.egigeozone). Логотип взят из [Бесплатные Иконки PNG]](http://www.freeiconspng.com/images/maps-icon) dschaedl и была изменена для обеспечения прозрачного фона.

## Changelog

### 1.0.5
* (obakuhl) use `@iobroker/webserver`

### 1.0.4
* (obakuhl) Password encryption active, minor code improvements

### 1.0.3
* (obakuhl) Updating dependencies

### 1.0.2
* (obakuhl) Updating dependencies

### 1.0.1
* (obakuhl) Resolved minor issue when leaving location 
* (obakuhl) Raised minimum version of adapter-core to 3.1.4 and node >= 18

### 1.0.0
* (obakuhl) Refactoring
* (obakuhl) New name (ioBroker.egigeozone -> ioBroker.egigeozone2) necessary due to npm collaborators settings of [previous adapter ioBroker.egigeozone](https://github.com/BasGo/ioBroker.egigeozone)

## License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2024 obakuhl <hello@obakuhl.com>

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