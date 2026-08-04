---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.egigeozone2/README.md
title: ioBroker.egigeozone2
hash: Cfr9WnmNeCnurvDgWVRG/lnVVMtpRuuHpUu2hZU/XEY=
---
![логотип](../../../en/adapterref/iobroker.egigeozone2/admin/egigeozone.png)

![Количество установок](http://iobroker.live/badges/egigeozone2-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.egigeozone2.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.egigeozone2.svg)
![НПМ](https://nodei.co/npm/iobroker.egigeozone2.png?downloads=true)

# IoBroker.egigeozone2
[![Тестирование и выпуск](https://github.com/obakuhl/ioBroker.egigeozone2/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/obakuhl/ioBroker.egigeozone2/actions/workflows/test-and-release.yml) [![[Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/egigeozone2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках в коде.** Для получения более подробной информации и сведений о том, как отключить отправку сообщений об ошибках, см. [Документация по плагину Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отправка сообщений Sentry используется начиная с js-controller 3.0.

## Описание
Это адаптер ioBroker для приложения геозонирования Android "EgiGeoZone" ([веб-сайт](https://egigeozone.de/)). Он способен получать события геозонирования в виде HTTP-запросов при входе в заданную область или выходе из нее с помощью вашего мобильного устройства.

## Советы по безопасности
Не рекомендуется предоставлять доступ к этому адаптеру из общедоступного интернета (например, открывая настроенный порт в вашем маршрутизаторе). Это означает, что любой запрос к этому порту будет перенаправлен на экземпляр ioBroker, на котором работает адаптер. Существует несколько вариантов повышения безопасности доступа к этому адаптеру:

* Всегда используйте VPN-соединение для запросов или
* Интегрировать прокси-сервер (например, nginx) для фильтрации входящих запросов.

## Конфигурация
Внутри EgiGeoZone URL-адрес следует определять, используя следующий синтаксис:

протокол://адрес:порт/человек

* **Протокол** может быть **http** или **https**.
* **address** должен быть адресом, по которому доступен экземпляр адаптера.
* **port** — это порт, на котором адаптер принимает запросы.
* **person** — это человек, который будет указан в массиве atHome.

### Примеры
* https://my-domain:7654/John или
* http://my-domain:7654/Paul

## Благодарности
Реализация в основном основана на адаптере [ioBroker.geofency](https://github.com/ioBroker/ioBroker.geofency) & BasGo's [ioBroker.egigeozone](https://github.com/BasGo/ioBroker.egigeozone) из библиотеки dschaedl.

## Changelog

### 1.0.10
* (obakuhl) Updating dependencies
* (copilot) Adapter requires node.js >= 22 now

### 1.0.9
* (obakuhl) Updating dependencies

### 1.0.8
* (obakuhl) Updating dependencies

### 1.0.7
* (obakuhl) Fully implemented responsive design
* (obakuhl) Minor adjustments

### 1.0.6
* (obakuhl) Improved object definition
* (obakuhl) New icon

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

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
This adapter is licensed under the [MIT license](../blob/master/LICENSE) which is part of this repository.

Copyright (c) 2025-2026 obakuhl <hello@obakuhl.com>

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