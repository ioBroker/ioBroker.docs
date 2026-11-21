---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.solaredge/README.md
title: ioBroker.solardge
hash: AV7QafEOMWoi9lsm6f9H2AJfS02iCQ3ciu5yipRU+HE=
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
![Версия NPM](https://img.shields.io/npm/v/iobroker.solaredge.svg)
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

Получайте данные с портала мониторинга SolarEdge через API мониторинга SolarEdge версии 2. Адаптер считывает текущую потребляемую мощность и количество энергии за день/месяц/год/вес за весь период эксплуатации, а также, при необходимости, текущий поток энергии (SolarEdge предоставляет данные о потоке энергии только для платных тарифов; при использовании OAuth2 Site Access это в настоящее время работает и на бесплатном тарифе, но может измениться).

Если ваше устройство SolarEdge более новой модели, вы также можете включить Modbus и считывать данные напрямую.

### Настраивать

API мониторинга версии 1 (ключ API из портала мониторинга) был отключен компанией SolarEdge 1 ноября 2026 года. Ключи API версии 1 не работают с версией 2.

**Идентификатор сайта:** при использовании OAuth2 идентификатор сайта берется из URL-адреса перенаправления. `site_id=...`) автоматически. Используя ключ API, войдите в систему по адресу <https://monitoring.solaredge.com> , идентификатор сайта — это "ID", указанный для вашего сайта, например, 12345.

**Доступ к сайту (OAuth2, домовладельцы):**

1. Создайте учетную запись на [портале разработчиков SolarEdge](https://developer.solaredge.com/) и создайте приложение Site Access с указанием области действия. `SITE_DATA` В качестве URI перенаправления введите значение, указанное в настройках экземпляра (по умолчанию). `https://localhost/` Целевой объект перенаправления не обязательно должен существовать. Совет: используйте адрес вашей административной панели ioBroker (например, `http://192.168.1.10:8081/`), тогда после предоставления доступа браузер откроет административную панель вместо страницы ошибки. URI перенаправления в приложении и в настройках экземпляра должны быть идентичными.
2. Введите идентификатор клиента и секретный ключ клиента приложения в настройках экземпляра и сохраните.
3. Скопируйте ссылку авторизации, указанную в настройках экземпляра, откройте ее в браузере, войдите в систему и предоставьте доступ.
4. Браузер перенаправляется на URI перенаправления (страница может не загрузиться). Скопируйте полный URL из адресной строки в поле «Код авторизации или URL перенаправления» и сохраните. Коды авторизации быстро истекают, экземпляр запускается сразу после сохранения и запрашивает токены.

Токены хранятся в зашифрованном виде. `solaredge.X.info.auth` и обновляются автоматически. Если срок действия авторизации истекает или она отзывается (токены обновления истекают через 30 дней без использования), повторите шаги 3 и 4.

**Доступ к автопарку (ключ API, установщики):** выберите тип доступа «Доступ к автопарку» и введите ключ API приложения.

**Кредиты:** каждый вызов API потребляет 1 кредит вашей учетной записи разработчика SolarEdge (бесплатный уровень: 2000 кредитов в месяц, распределяется между всеми приложениями учетной записи). Адаптер разработан таким образом, чтобы потребление было значительно ниже этого уровня:

- Расписание по умолчанию — каждые 30 минут. В случаях, когда использовалось старое расписание по умолчанию (каждые 15 минут), оно изменяется один раз при обновлении.
- 1 вызов на один запуск: энергия за сегодняшний день в четверть часа, что дает энергию за сегодняшний день и текущую мощность (среднее значение за последнюю полную четверть часа).
- Два звонка в день, по одному на месяц, год и на весь период до полуночи; к ним добавляется энергия за сегодняшний день.
- Запрет на звонки в ночное время (опция "Запрет на вызовы API в ночное время" использует местоположение из системных настроек): с 30 минут до восхода солнца до 1 часа после захода солнца.

Это примерно 1200 звонков в месяц летом (в Германии) и меньше зимой. Расписание с интервалом в 15 минут требует около 2300 звонков в месяц летом, что больше, чем позволяет бесплатный тариф. Функция «Чтение текущего потока мощности» добавляет 1 звонок за запуск (около 2400 звонков в месяц летом с интервалом в 30 минут), поэтому при использовании потока мощности на бесплатном тарифе используйте расписание с интервалом в один час.

## Кредиты

Этот адаптер не был бы возможен без замечательной работы @92lleo ( <https://github.com/92lleo> ), который написал код для первых версий и опубликовал его в сообществе ioborker-community-adapters.

<!--
	### **WORK IN PROGRESS**
-->

## Changelog

### **WORK IN PROGRESS**
- (copilot) Adapter requires node.js >= 22.19.0 now
### 2.0.0 (2026-10-16)
- (mcm1957) BREAKING: Adapter has been migrated to SolarEdge Monitoring API v2. A new API key must be generated at https://developer.solaredge.com/ — v1 keys are not valid in v2.
- (mcm1957) BREAKING: The `currentPowerFlow` feature now requires a Business Pro or Enterprise tier subscription at SolarEdge.
- (Garfonso) OAuth2 Site Access (client id/secret of your own SolarEdge app) has been added, Fleet Access API key is optional. See README for setup.
- (Garfonso) Time ranges are now sent in local time and API units are converted correctly.
- (Garfonso) Power flow reads the v2 response; new states for battery power, charge level and grid/battery status. Power flow currently also works on the free tier with OAuth2 Site Access.
- (Garfonso) API calls reduced to about 1 per run and 2 per day, no calls at night. Default schedule is every 30 minutes now, existing instances with every 15 minutes are changed once.
- (Garfonso) Instance settings are responsive for all screen sizes. The OAuth2 setup steps are shown next to the related fields.
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now

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