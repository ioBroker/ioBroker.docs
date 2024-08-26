---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solaredge/README.md
title: ioBroker.solaredge
hash: Uv/BNDX4bW4701AQMXPQLGoV5zYgoXQHED+G7shQuY0=
---
![Логотип](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![Размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
![Действия по фиксации GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![GitHub фиксирует с момента последнего выпуска (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![Последний коммит GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![Проблемы с GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
![НПМ-версия](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![Текущая версия в стабильном репозитории.](https://iobroker.live/badges/solaredge-stable.svg)
![Количество установок](https://iobroker.live/badges/solaredge-installed.svg)

# IoBroker.solaredge
[![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)</br> </br> **Версия:** </br> </br> **Тесты:** </br> [![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml) [![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml)

<!--

## Sentry **Этот адаптер использует библиотеки Sentry для автоматического сообщения разработчикам об исключениях и ошибках кода.** Для получения более подробной информации и информации о том, как отключить отчеты об ошибках, см. [Документация плагина Sentry](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Отчеты Sentry используются начиная с js-controller 3.0.
-->
## Адаптер Solaredge для ioBroker
Получите данные с портала мониторинга Solaredge.
В настоящее время для получения текущих показаний мощности и энергии за день/месяц/год/срок службы используется только точка данных /overview.

Вы также можете включить Modbus на своем устройстве Solaredge, если оно более новое, и напрямую считывать данные.

Чтобы использовать этот адаптер, вам понадобится идентификатор вашего сайта и ключ API. Чтобы получить их, перейдите на https://monitoring.solaredge.com.

- идентификатор сайта: войдите в систему, идентификатор сайта — это «ID» справа, например, 12345.
- Ключ API: войдите в систему, зайдите в настройки администратора и включите там доступ к API. Если вы не видите настройки администратора, отправьте письмо в Solaredge, чтобы включить администратора для вашей учетной записи.

## Кредиты
Этот адаптер был бы невозможен без великой работы @92lleo (https://github.com/92lleo), который написал код для первоначальных версий и опубликовал его для ioborker-community-adapters.

<!--

### **РАБОТА В ПРОГРЕССЕ** -->

## Changelog
### 1.2.0 (2023-12-06)
* (mcm1957) Adapter did not terminate in case of an exception. This has been fixed.
* (mcm1957) A response timeout has been added to network calls.
* (mcm1957) Adapter has been moved to iobroker-community-adapters organization
* (mcm1957) Dependencies have been updated

### 1.1.0 (2023-11-16)
* (bluefox) Added the current power flow data

### 1.0.1 (2023-08-18)
* (bluefox) Added JSON config and replaced `require` module with `axios`

### 0.3.0
* (Apollon77) Address review feedback from adapter review (see #19)

### 0.2.0
* (92lleo) Add default values for native config vars
* (92lleo) Set schedule to 15s to match api update rate
* (92lleo) Fix updating already created states (broken since new js-controller, see #9)
* (92lleo) Update dependencies
* (92lleo) Clear timer on unload
* (92lleo) Add a connection type and dataSource

### 0.1.1
* (92lleo) fix "object data is invalid" issue, now works with new js-controller
* (92lleo) update dependencies

### 0.1.0
* (92lleo) first beta release. overview data from inteverters are available

### 0.0.1
* (92lleo) initial release

## License
MIT License

Copyright (c) 2023 iobroker-community-adapters <mcm57@gmx.at>
Copyright (c) 2019-2023 Leonhard Kuenzler <leonhard@kuenzler.io>

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
