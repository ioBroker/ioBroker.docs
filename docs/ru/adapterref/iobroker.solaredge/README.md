---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solaredge/README.md
title: ioBroker.solardge
hash: dNkc+63yZjGYGNeDnfd3YA4g6AoqX2O9HARX+BN3KCo=
---
![Логотип](../../../en/adapterref/iobroker.solaredge/admin/solaredge.png)

![Лицензия GitHub](https://img.shields.io/github/license/iobroker-community-adapters/ioBroker.solaredge)
![Загрузки](https://img.shields.io/npm/dm/iobroker.solaredge.svg)
![размер репозитория GitHub](https://img.shields.io/github/repo-size/iobroker-community-adapters/ioBroker.solaredge)
![Статус перевода](https://weblate.iobroker.net/widgets/adapters/-/solaredge/svg-badge.svg)
![активность коммитов на GitHub](https://img.shields.io/github/commit-activity/m/iobroker-community-adapters/ioBroker.solaredge)
![Количество коммитов на GitHub с момента последнего релиза (по дате)](https://img.shields.io/github/commits-since/iobroker-community-adapters/ioBroker.solaredge/latest)
![Последний коммит на GitHub](https://img.shields.io/github/last-commit/iobroker-community-adapters/ioBroker.solaredge)
![Проблемы на GitHub](https://img.shields.io/github/issues/iobroker-community-adapters/ioBroker.solaredge)
![Версия NPM](http://img.shields.io/npm/v/iobroker.solaredge.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/solaredge-stable.svg)
![Количество установок](https://iobroker.live/badges/solaredge-installed.svg)
![Тестирование и выпуск](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/test-and-release.yml/badge.svg)
![CodeQL](https://github.com/iobroker-community-adapters/ioBroker.solaredge/actions/workflows/codeql.yml/badge.svg)

# ioBroker.solardge

</br>
**Version:** </br>
</br>
**Tests:** </br>

<!--
## Sentry
**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.**
For more details and for information how to disable the error reporting see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.
-->

## Адаптер Solaredge для ioBroker

Получайте данные с портала мониторинга SolarEdge. В настоящее время для получения текущих значений мощности и показаний потребления энергии за день/месяц/год/весь период используется только точка данных /overview.

Если ваше устройство SolarEdge более новой модели, вы также можете включить Modbus и считывать данные напрямую.

Для использования этого адаптера вам потребуется идентификатор вашего сайта и ключ API. Чтобы получить их, перейдите по ссылке <https://monitoring.solaredge.com>

- Идентификатор сайта: для входа в систему идентификатор сайта — это "ID" справа, например, 12345.
- Ключ API: войдите в систему, перейдите в настройки администратора и включите там доступ к API. Если вы не видите настройки администратора, отправьте письмо в Solaredge, чтобы включить доступ к администратору для вашей учетной записи.

## Кредиты

Этот адаптер не был бы возможен без замечательной работы @92lleo ( <https://github.com/92lleo> ), который написал код для первых версий и опубликовал его в сообществе ioborker-community-adapters.

<!--
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22 now
- (iobroker-bot) Adapter requires node.js >= 20 now.
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

### 1.4.1 (2024-04-28)
* (mcm1957) Adapter requires node.js >= 18 and js-controller >= 5 now
* (mcm1957) Dependencies have been updated

### 1.3.0 (2024-02-15)
* (mcm1957) BREAKING: adapter requires node.js 18 or newer now.
* (mcm1957) Adapter translations have been linked to weblate.
* (mcm1957) Dependencies have been updated.

### 1.2.2 (2023-12-14)
* (bluefox) Added random seconds to the schedule
* (bluefox) Updated packages
* (bluefox) Allowed adapter execution by restart

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

[Older changelogs can be found there](https://github.com/iobroker-community-adapters/ioBroker.solaredge/blob/master/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2023-2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>
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